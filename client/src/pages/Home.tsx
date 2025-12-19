import { useVerbStats, useRandomVerb } from "@/hooks/use-verbs";
import { VerbCard } from "@/components/VerbCard";
import { Loader2, RefreshCw, Database } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { data: stats } = useVerbStats();
  const { data: verb, refetch, isFetching: isVerbLoading, error: verbError, isError } = useRandomVerb();

  const handleDiscover = () => {
    refetch();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8 relative overflow-hidden">
      {/* Background decoration - scaled for mobile */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-48 h-48 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 md:w-[500px] md:h-[500px] bg-primary/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      </div>

      <header className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 sm:mb-12 md:mb-16 lg:mb-20 px-2 sm:px-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/20 flex-shrink-0">
            <span className="font-serif font-bold text-sm sm:text-xl">PG</span>
          </div>
          <div className="min-w-0">
            <h1 className="text-base sm:text-lg md:text-xl font-display text-primary truncate">Proto-Germanic</h1>
            <p className="text-xs text-muted-foreground tracking-widest uppercase truncate">Verb Archive</p>
          </div>
        </div>

        {/* Stats Pill - responsive visibility and size */}
        <div className="w-full sm:w-auto flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/60 backdrop-blur-sm border border-border/50 rounded-full shadow-sm text-xs sm:text-sm text-muted-foreground flex-shrink-0">
          <Database className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent flex-shrink-0" />
          <span className="truncate">
            {stats ? (
              <>
                <strong className="text-foreground">{stats.count.toLocaleString()}</strong>
                <span className="hidden sm:inline"> verbs</span>
                {stats.status === "scraping" && (
                  <span className="ml-1.5 inline-flex items-center gap-1 text-accent text-xs">
                    <Loader2 className="w-2.5 h-2.5 animate-spin" />
                  </span>
                )}
              </>
            ) : (
              <span className="opacity-50">Connecting...</span>
            )}
          </span>
        </div>
      </header>

      <main className="w-full max-w-6xl mx-auto flex-1 flex flex-col items-center justify-center relative z-10 min-h-[300px] sm:min-h-[400px] md:min-h-[500px] px-2 sm:px-0">
        
        <div className="w-full mb-8 sm:mb-10 md:mb-12">
          <VerbCard 
            verb={verb} 
            isLoading={isVerbLoading} 
            error={isError ? (verbError as Error) : null} 
          />
        </div>

        <motion.div 
          className="flex flex-col items-center gap-4 sm:gap-5 md:gap-6 w-full sm:w-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <button
            onClick={handleDiscover}
            disabled={isVerbLoading || stats?.status === 'scraping' && stats.count === 0}
            className={`
              relative group overflow-hidden w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 md:py-5 rounded-lg sm:rounded-xl font-display text-base sm:text-lg font-bold tracking-wide min-h-11 sm:min-h-12
              shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-out
              disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none
              ${isVerbLoading ? 'cursor-wait' : ''}
            `}
            data-testid="button-discover-verb"
          >
            <div className="absolute inset-0 bg-primary group-hover:bg-primary/90 transition-colors" />
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat group-hover:animate-[shimmer_1.5s_infinite] transition-all" />
            
            <span className="relative flex items-center justify-center gap-2 sm:gap-3 text-primary-foreground">
              {isVerbLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 animate-spin flex-shrink-0" />
                  <span className="truncate">Constructing...</span>
                </>
              ) : (
                <span className="truncate">Discover Verb</span>
              )}
            </span>
          </button>
          
          <p className="text-xs sm:text-sm text-muted-foreground/60 italic font-serif text-center px-2">
            "Words are the shadows of great actions."
          </p>
        </motion.div>

      </main>

      <footer className="w-full text-center py-6 sm:py-8 text-xs text-muted-foreground/40 mt-auto px-2">
        <p className="truncate sm:truncate-none">Data sourced from Wiktionary • Proto-Germanic Reconstruction Project</p>
      </footer>
    </div>
  );
}
