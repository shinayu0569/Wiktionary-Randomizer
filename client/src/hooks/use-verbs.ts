import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useVerbStats() {
  return useQuery({
    queryKey: [api.verbs.stats.path],
    queryFn: async () => {
      const res = await fetch(api.verbs.stats.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch stats");
      return api.verbs.stats.responses[200].parse(await res.json());
    },
    refetchInterval: (query) => {
      // Poll more frequently if actively scraping
      return query.state.data?.status === "scraping" ? 1000 : 30000;
    },
  });
}

export function useRandomVerb() {
  return useQuery({
    queryKey: [api.verbs.random.path],
    queryFn: async () => {
      const res = await fetch(api.verbs.random.path, { credentials: "include" });
      if (res.status === 503) {
        throw new Error("Verbs are still being indexed. Please wait.");
      }
      if (!res.ok) throw new Error("Failed to fetch random verb");
      return api.verbs.random.responses[200].parse(await res.json());
    },
    enabled: false, // Don't fetch automatically on mount, wait for user action
  });
}
