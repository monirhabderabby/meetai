"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import NewMeetingDialog from "./new-meeting-dialog";

const MeetingListHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

        <div className="flex items-center gap-x-2 p-1"></div>
      </div>
    </>
  );
};

export default MeetingListHeader;
