"use client";

import EmptyState from "@/components/empty-state";
import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading";
import { DataTable } from "@/components/ui/datatable";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { meetingColumn } from "../components/column";

const MeetingView = () => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.meetings.getMany.queryOptions({}));
  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable data={data?.items ?? []} columns={meetingColumn} />

      {data?.items.length === 0 && (
        <EmptyState
          title="Create your first meeting"
          description="Create an meeting to join your meetings. Each meeting lets you collaborate, share ideas, and interact with participants in real time"
        />
      )}
    </div>
  );
};

export default MeetingView;

export const MeetingViewLoading = () => {
  return (
    <LoadingState
      title="Loading Metings"
      description="This may take a few second"
    />
  );
};

export const MeetingViewErrorState = () => {
  return (
    <ErrorState
      title="Error Loading Meetings"
      description="Something went wrong"
    />
  );
};
