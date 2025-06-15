"use client";

import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

const MeetingView = () => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.meetings.getMany.queryOptions({}));
  return <div>{JSON.stringify(data?.items, null, 2)}</div>;
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
