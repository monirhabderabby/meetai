// app/meetings/page.tsx
import { auth } from "@/lib/auth";
import MeetingListHeader from "@/modules/meetings/ui/components/meeting-list-header";
import MeetingView, {
  MeetingViewErrorState,
  MeetingViewLoading,
} from "@/modules/meetings/ui/view/meeting-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.meetings.getMany.queryOptions({}));

  return (
    <>
      <MeetingListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<MeetingViewLoading />}>
          <ErrorBoundary fallback={<MeetingViewErrorState />}>
            <MeetingView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
}
