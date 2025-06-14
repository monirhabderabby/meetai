import LoadingState from "@/components/loading";
import AgentsView from "@/modules/agents/ui/views/agent-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

import ErrorState from "@/components/error-state";
import { loadSearchParams } from "@/modules/agents/params";
import AgentListHeader from "@/modules/agents/ui/components/agents-list-header";
import { SearchParams } from "nuqs";
import { Suspense } from "react";

interface Props {
  searchParams: Promise<SearchParams>;
}

const Page = async ({ searchParams }: Props) => {
  const params = await loadSearchParams(searchParams);
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.agents.getMany.queryOptions({ ...params })
  );
  return (
    <>
      <AgentListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense
          fallback={
            <LoadingState
              title="Loading agents"
              description="This may take a few seconds"
            />
          }
        >
          <ErrorBoundary
            fallback={
              <ErrorState
                title="Failed to load agents"
                description="Something went wrong"
              />
            }
          >
            <AgentsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default Page;
