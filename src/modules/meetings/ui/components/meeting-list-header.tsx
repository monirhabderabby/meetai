"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { PlusIcon, XCircleIcon } from "lucide-react";
import { useState } from "react";
import { useMeetingFilter } from "../../hooks/use-meeting-filter";
import AgentIdFilter from "./agent-id-filter";
import MeetingSearchFilter from "./meeting-search-filter";
import NewMeetingDialog from "./new-meeting-dialog";
import StatusFilter from "./status-filters";

const MeetingListHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [filters, setFilters] = useMeetingFilter();
  const isAnyFilterModified =
    !!filters.search || !!filters.agentId || !!filters.status;

  const onClearFilters = () => {
    setFilters({
      status: null,
      agentId: "",
      search: "",
      page: 1,
    });
  };

  return (
    <>
      <NewMeetingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4 w-full">
        <div className="flex items-center justify-between w-full">
          <h5 className="font-medium text-xl">My Meetings</h5>
          <Button onClick={() => setIsDialogOpen((p) => !p)}>
            <PlusIcon /> New Meeting
          </Button>
        </div>

        <ScrollArea>
          <div className="flex items-center gap-x-2 p-1">
            <MeetingSearchFilter />
            <StatusFilter />
            <AgentIdFilter />
            {isAnyFilterModified && (
              <Button variant="outline" onClick={onClearFilters}>
                <XCircleIcon /> Clear
              </Button>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
};

export default MeetingListHeader;
