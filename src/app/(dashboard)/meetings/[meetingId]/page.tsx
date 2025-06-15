import { auth } from "@/lib/auth";
import MeetingIdView, {
  MeetingIdViewErrorState,
  MeetingIdViewLoading,
} from "@/modules/meetings/ui/view/meeting-id-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  params: Promise<{
    meetingId: string;
  }>;
}

const Page = async ({ params }: Props) => {
  const { meetingId } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  // TODO: Prefect get transcript
  return (
    <HydrationBoundary>
      <Suspense fallback={<MeetingIdViewLoading />}>
        <ErrorBoundary fallback={<MeetingIdViewErrorState />}>
          <MeetingIdView meetingId={meetingId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
