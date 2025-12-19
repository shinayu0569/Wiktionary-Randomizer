import { motion } from "framer-motion";
import { ExternalLink, BookOpen, Sparkles } from "lucide-react";
import type { VerbResponse } from "@shared/routes";

interface VerbCardProps {
  verb: VerbResponse | undefined;
  isLoading: boolean;
  error: Error | null;
}

export function VerbCard({ verb, isLoading, error }: VerbCardProps) {
  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto min-h-48 sm:min-h-56 md:min-h-64 rounded-xl sm:rounded-2xl border-2 border-dashed border-destructive/20 bg-destructive/5 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 text-center" data-testid="card-error">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-3 sm:mb-4 flex-shrink-0">
          <span className="text-lg sm:text-xl">⚠️</span>
        </div>
        <h3 className="text-base sm:text-lg font-serif font-bold text-destructive mb-1 sm:mb-2">Error Retrieving Verb</h3>
        <p className="text-xs sm:text-sm text-muted-foreground px-2">{error.message}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto min-h-56 sm:min-h-64 md:min-h-80 rounded-xl sm:rounded-2xl bg-white/50 border border-border/40 shadow-xl shadow-primary/5 flex items-center justify-center" data-testid="card-loading">
        <div className="flex flex-col items-center gap-3 sm:gap-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-3 sm:border-4 border-accent/20 border-t-accent rounded-full animate-spin flex-shrink-0" />
          <p className="font-serif text-sm sm:text-base text-primary/60 italic animate-pulse">Consulting the ancient texts...</p>
        </div>
      </div>
    );
  }

  if (!verb) {
    return (
      <div className="w-full max-w-4xl mx-auto min-h-56 sm:min-h-64 md:min-h-80 rounded-xl sm:rounded-2xl bg-white/50 border border-border/40 shadow-xl shadow-primary/5 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 text-center" data-testid="card-empty">
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/5 flex items-center justify-center mb-4 sm:mb-6 flex-shrink-0">
          <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-primary/40" />
        </div>
        <h3 className="text-lg sm:text-2xl font-serif text-primary mb-1 sm:mb-2">Ready to Discover</h3>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-md px-2">
          Press the button below to retrieve a random Proto-Germanic verb from the reconstructed archives.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="w-full max-w-4xl mx-auto relative group"
    >
      {/* Decorative backing layers */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-2xl sm:rounded-3xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div className="relative bg-parchment rounded-xl sm:rounded-2xl border border-border shadow-2xl shadow-primary/10 overflow-hidden">
        {/* Top decorative bar */}
        <div className="h-1.5 sm:h-2 bg-gradient-to-r from-primary/40 via-accent to-primary/40 w-full" />
        
        <div className="p-4 sm:p-6 md:p-8 lg:p-12 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-accent/10 text-accent-foreground text-xs font-bold tracking-wider uppercase mb-4 sm:mb-6 md:mb-8"
            data-testid="tag-proto-germanic"
          >
            <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-accent flex-shrink-0" />
            Proto-Germanic
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-primary mb-4 sm:mb-6 md:mb-8 tracking-tight break-words overflow-hidden"
            data-testid="text-verb-term"
          >
            {verb.term}
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center px-2"
          >
            <a 
              href={verb.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground hover:text-accent transition-colors duration-200 border-b border-transparent hover:border-accent pb-0.5 group/link flex-wrap justify-center"
              data-testid="link-wiktionary"
            >
              <span className="font-medium">View Definition on Wiktionary</span>
              <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform flex-shrink-0" />
            </a>
          </motion.div>
        </div>

        {/* Texture overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>
      </div>
    </motion.div>
  );
}
