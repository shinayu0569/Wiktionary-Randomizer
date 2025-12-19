import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import * as cheerio from "cheerio";
import { type ScraperStatus } from "@shared/schema";

let scraperStatus: ScraperStatus = "idle";
const BASE_URL = "https://en.wiktionary.org";
const CATEGORY_URL = "/wiki/Category:Proto-Germanic_verbs";

async function scrapeVerbs() {
  if (scraperStatus === "scraping") return;
  scraperStatus = "scraping";
  console.log("Starting scrape...");

  try {
    const verbsToStore: { term: string; url: string }[] = [];
    let nextUrl: string | null = CATEGORY_URL;

    // Safety limit to prevent infinite loops during dev
    let pagesScraped = 0;
    const MAX_PAGES = 50; 

    while (nextUrl && pagesScraped < MAX_PAGES) {
      console.log(`Scraping page: ${nextUrl}`);
      const response = await fetch(`${BASE_URL}${nextUrl}`);
      const html = await response.text();
      const $ = cheerio.load(html);

      // Select links in the category content
      // Wiktionary usually puts category members in #mw-pages
      const links = $("#mw-pages .mw-category-group ul li a");

      links.each((_, element) => {
        const href = $(element).attr("href");
        const term = $(element).text();

        // Ensure it's a Reconstruction link (typical for Proto-Germanic)
        // or just accept all in the category as requested.
        // User example: "Reconstruction:Proto-Germanic/bukkōną"
        if (href) {
            verbsToStore.push({
              term: term,
              url: `${BASE_URL}${href}`
            });
        }
      });

      // Find next page link
      // Wiktionary pagination: "next page" link usually has text "next page" or similar
      // It's often in a div with class 'mw-category-generated' -> 'a'
      // Or looking for text "next page"
      const nextLink = $("a:contains('next page')").attr("href");
      nextUrl = nextLink || null;
      
      pagesScraped++;
      
      // Be nice to Wiktionary
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    console.log(`Scraping complete. Found ${verbsToStore.length} verbs.`);
    await storage.setVerbs(verbsToStore);
    scraperStatus = "completed";

  } catch (error) {
    console.error("Scraping failed:", error);
    scraperStatus = "error";
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Start scraping on server start (in background)
  scrapeVerbs();

  app.get(api.verbs.random.path, async (req, res) => {
    const verb = await storage.getRandomVerb();
    if (!verb) {
       // If still scraping and no verbs yet
       if (scraperStatus === "scraping") {
         return res.status(503).json({ message: "Indexing in progress, please try again in a moment." });
       }
       return res.status(404).json({ message: "No verbs found." });
    }
    res.json(verb);
  });

  app.get(api.verbs.stats.path, async (req, res) => {
    const stats = await storage.getStats();
    res.json({
      count: stats.count,
      status: scraperStatus
    });
  });

  return httpServer;
}
