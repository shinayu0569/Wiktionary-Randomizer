import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const verbs = pgTable("verbs", {
  id: serial("id").primaryKey(),
  term: text("term").notNull(),
  url: text("url").notNull(),
});

export const insertVerbSchema = createInsertSchema(verbs).omit({ id: true });

export type Verb = typeof verbs.$inferSelect;
export type InsertVerb = z.infer<typeof insertVerbSchema>;

export type ScraperStatus = "idle" | "scraping" | "completed" | "error";

export interface ScraperStats {
  count: number;
  status: ScraperStatus;
  lastUpdated?: string;
}
