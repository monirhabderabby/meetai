"use client";

import EmptyState from "@/components/empty-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useAgentFilter } from "../../hooks/use-agent-filter";
import { agentsColumn } from "../components/column";
import DataPagination from "../components/data-pagination";
import { DataTable } from "../components/data.table";

const AgentsView = () => {
  const trpc = useTRPC();
  const [filters, setFilters] = useAgentFilter();
  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({ ...filters })
  );

  return (
    <div className="flex-1 pb-4 px-4 md:px-8  flex-col gap-y-4">
      <DataTable data={data.items} columns={agentsColumn} />
      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
      {data.items.length === 0 && (
        <EmptyState
          title="Create your first agent"
          description="Create an agent to join your meetings. Each agent will follow your instruction and can interact with participants during call."
        />
      )}
    </div>
  );
};

export default AgentsView;
