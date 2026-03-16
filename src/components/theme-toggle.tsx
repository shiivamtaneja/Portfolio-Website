"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { MoonStar, SunDim } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="dark:bg-zinc-800 bg-zinc-200 border-none dark:text-white text-zinc-900 dark:hover:bg-zinc-700 hover:bg-zinc-300 overflow-hidden"
    >
      <AnimatePresence mode="wait" initial={false}>
        {mounted && (
          <motion.div
            key={isDark ? "moon" : "sun"}
            initial={{ y: -20, opacity: 0, rotate: -30 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: 30 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {isDark ? (
              <MoonStar className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <SunDim className="h-[1.2rem] w-[1.2rem]" />
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
