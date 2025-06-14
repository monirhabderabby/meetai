"use client";

import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading";
import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import useConfirm from "../../hooks/use-confirm";
import ActiveState from "../components/active-state";
import CancelledState from "../components/cancelled-state";
import MeetingIdViewHeader from "../components/meeting-id-view-header";
import ProcessingState from "../components/processing-state";
import UpcomingState from "../components/upcoming-state";
import UpdateMeetingDialog from "../components/update-meeting-dialog ";

interface Props {
  meetingId: string;
}
const MeetingIdView = ({ meetingId }: Props) => {
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const router = useRouter();

  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are you sure?",
    "The following action will be remove the meeting"
  );

  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({})
        );
        router.push("/meetings");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  const handleRemoveMeeting = async () => {
    const ok = await confirmRemove();

    if (!ok) return;

    removeMeeting.mutate({ id: meetingId });
  };

  const isActive = data.status === "active";
  const isUpcoming = data.status === "upcoming";
  const isCancelled = data.status === "cancelled";
  const isCompleted = data.status === "completed";
  const isProcessing = data.status === "processing";

  return (
    <>
      <RemoveConfirmation />
      <UpdateMeetingDialog
        initialvalue={data}
        open={updateDialogOpen}
        onOpenChange={setUpdateDialogOpen}
      />
      <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <MeetingIdViewHeader
          meetingId={meetingId}
          meetingName={data.name}
          onEdit={() => setUpdateDialogOpen(true)}
          onRemove={handleRemoveMeeting}
        />

        {isCancelled && <CancelledState />}
        {isProcessing && <ProcessingState />}
        {isUpcoming && (
          <UpcomingState
            meetingId={meetingId}
            onCancelMeeting={() => {}}
            isCencelling={false}
          />
        )}
        {isActive && <ActiveState meetingId={meetingId} />}
        {isCompleted && <></>}
      </div>
    </>
  );
};

export default MeetingIdView;

export const MeetingIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading Meeting"
      description="This may take a few second"
    />
  );
};

export const MeetingIdViewErrorState = () => {
  return (
    <ErrorState
      title="Error Loading Meeting"
      description="Something went wrong"
    />
  );
};
