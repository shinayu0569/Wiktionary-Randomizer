import { type Verb, type InsertVerb } from "@shared/schema";
import { verbs } from "@shared/schema"; // We don't really need the schema for MemStorage but good for types
// import { db } from "./db"; // Not using DB for this MVP as requested, sticking to MemStorage for speed/simplicity
import { eq } from "drizzle-orm";

export interface IStorage {
  getVerbs(): Promise<Verb[]>;
  getVerb(id: number): Promise<Verb | undefined>;
  getRandomVerb(): Promise<Verb | undefined>;
  addVerb(verb: InsertVerb): Promise<Verb>;
  setVerbs(verbs: InsertVerb[]): Promise<void>;
  getStats(): Promise<{ count: number }>;
}

export class MemStorage implements IStorage {
  private verbs: Verb[];
  private currentId: number;

  constructor() {
    this.verbs = [];
    this.currentId = 1;
  }

  async getVerbs(): Promise<Verb[]> {
    return this.verbs;
  }

  async getVerb(id: number): Promise<Verb | undefined> {
    return this.verbs.find((v) => v.id === id);
  }

  async getRandomVerb(): Promise<Verb | undefined> {
    if (this.verbs.length === 0) return undefined;
    const randomIndex = Math.floor(Math.random() * this.verbs.length);
    return this.verbs[randomIndex];
  }

  async addVerb(insertVerb: InsertVerb): Promise<Verb> {
    const id = this.currentId++;
    const verb: Verb = { ...insertVerb, id };
    this.verbs.push(verb);
    return verb;
  }

  async setVerbs(insertVerbs: InsertVerb[]): Promise<void> {
    // Replace all verbs or append? Replace is safer for "re-scrape" logic
    // But let's just clear and add
    this.verbs = [];
    this.currentId = 1;
    for (const v of insertVerbs) {
      await this.addVerb(v);
    }
  }

  async getStats(): Promise<{ count: number }> {
    return { count: this.verbs.length };
  }
}

export const storage = new MemStorage();
