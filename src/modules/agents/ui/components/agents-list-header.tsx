"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import NewAgentDialog from "./new-agent-dialog";

const AgentListHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <>
      <NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4 w-full">
        <div className="flex items-center justify-between w-full">
          <h5 className="font-medium text-xl">My Agents</h5>
          <Button onClick={() => setIsDialogOpen((p) => !p)}>
            <PlusIcon /> New Agent
          </Button>
        </div>
      </div>
    </>
  );
};

export default AgentListHeader;
