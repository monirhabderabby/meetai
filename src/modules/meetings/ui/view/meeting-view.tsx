"use client";

import EmptyState from "@/components/empty-state";
import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading";
import DataPagination from "@/components/ui/data-pagination";
import { DataTable } from "@/components/ui/datatable";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useMeetingFilter } from "../../hooks/use-meeting-filter";
import { meetingColumn } from "../components/column";

const MeetingView = () => {
  const trpc = useTRPC();
  const router = useRouter();
  const [filters, setFilters] = useMeetingFilter();
  const { data } = useQuery(
    trpc.meetings.getMany.queryOptions({
      ...filters,
    })
  );
  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable
        data={data?.items ?? []}
        columns={meetingColumn}
        onRowClick={(row) => router.push(`/meetings/${row.id}`)}
      />
      <DataPagination
        page={filters.page}
        totalPages={data?.totalPages ?? 1}
        onPageChange={(page) => setFilters({ page })}
      />

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
