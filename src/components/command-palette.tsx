"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Home,
  User,
  Briefcase,
  Award,
  Users,
  Moon,
  Sun,
  Laptop,
  FolderOpen,
} from "lucide-react";

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const [isMac, setIsMac] = React.useState(true);
  const [mounted, setMounted] = React.useState(false);
  const router = useRouter();
  const { setTheme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      setIsMac(
        navigator.userAgent.toUpperCase().indexOf("MAC") >= 0 ||
          navigator.platform.toUpperCase().indexOf("MAC") >= 0,
      );
    }

    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        // Ignore if typing in an input (like the chatbot)
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-50 hidden md:flex items-center gap-2 rounded-full border border-zinc-200/50 dark:border-zinc-800/50 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md px-4 py-2 text-sm font-medium shadow-sm transition-all hover:scale-105 active:scale-95 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
      >
        <span className="flex gap-1 items-center bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-1.5 py-0.5 rounded text-xs text-zinc-500 dark:text-zinc-400">
          <span className="text-[10px]">
            {!mounted || isMac ? "⌘ + K" : "Ctrl + K"}
          </span>
        </span>
        <span className="uppercase tracking-widest text-xs">TO COMMAND</span>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Navigation">
            <CommandItem onSelect={() => runCommand(() => router.push("/"))}>
              <Home className="mr-2 h-4 w-4" />
              <span>Jump to Home</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push("/contact"))}
            >
              <User className="mr-2 h-4 w-4" />
              <span>Contact Me</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push("/experience"))}
            >
              <Briefcase className="mr-2 h-4 w-4" />
              <span>Experience & Journey</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push("/projects"))}
            >
              <FolderOpen className="mr-2 h-4 w-4" />
              <span>Projects</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push("/certificates"))}
            >
              <Award className="mr-2 h-4 w-4" />
              <span>Certificates</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push("/mentorship"))}
            >
              <Users className="mr-2 h-4 w-4" />
              <span>Mentorship</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="System">
            <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
              <Sun className="mr-2 h-4 w-4" />
              <span>Light Theme</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
              <Moon className="mr-2 h-4 w-4" />
              <span>Dark Theme</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
              <Laptop className="mr-2 h-4 w-4" />
              <span>System Theme</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
