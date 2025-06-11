"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import DashboardCommand from "./dashboard-command";

const DashboardNavbar = () => {
  const [open, setOpen] = useState(false);
  const { state, toggleSidebar, isMobile } = useSidebar();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "g" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down as EventListener);

    return () => {
      document.removeEventListener("keydown", down as EventListener);
    };
  }, []);
  return (
    <>
      <DashboardCommand open={open} setOpen={setOpen} />
      <nav className="flex px-4 gap-x-2 items-center py-3 border-b bg-background">
        <Button className="size-9" variant="outline" onClick={toggleSidebar}>
          {state === "collapsed" || isMobile ? (
            <PanelLeftIcon className="size-4" />
          ) : (
            <PanelLeftCloseIcon className="size-4" />
          )}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setOpen((open) => !open)}
          className="h-9 w-[240px] justify-start font-normal text-muted-foreground"
        >
          <SearchIcon />
          Search
          <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <span className="text-xs">&#8984;</span>G
          </kbd>
        </Button>
      </nav>
    </>
  );
};

export default DashboardNavbar;
