import { z } from 'zod';
import { verbs } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  verbs: {
    random: {
      method: 'GET' as const,
      path: '/api/verbs/random',
      responses: {
        200: z.custom<typeof verbs.$inferSelect>(),
        503: z.object({ message: z.string() }), // Service unavailable if scraping not done
      },
    },
    stats: {
      method: 'GET' as const,
      path: '/api/verbs/stats',
      responses: {
        200: z.object({
          count: z.number(),
          status: z.enum(["idle", "scraping", "completed", "error"]),
        }),
      },
    }
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type VerbResponse = z.infer<typeof api.verbs.random.responses[200]>;
export type StatsResponse = z.infer<typeof api.verbs.stats.responses[200]>;
