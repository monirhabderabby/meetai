import CommandSelect from "@/components/ui/command-select";
import { GeneratedAvatar } from "@/components/ui/generate-avatar";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useMeetingFilter } from "../../hooks/use-meeting-filter";

const AgentIdFilter = () => {
  const [filters, setFilters] = useMeetingFilter();
  const [agentSearch, setAgentSearch] = useState("");
  const trpc = useTRPC();

  const { data } = useQuery(
    trpc.agents.getMany.queryOptions({
      pageSize: 100,
      search: agentSearch,
    })
  );

  return (
    <CommandSelect
      className="h-9"
      placeholder="Agent"
      options={(data?.items ?? []).map((agent) => ({
        id: agent.id,
        value: agent.id,
        children: (
          <div className="flex items-center gap-x-2">
            <GeneratedAvatar
              variant="botttsNeutral"
              seed={agent.name}
              className="size-4"
            />
            {agent.name}
          </div>
        ),
      }))}
      onSelect={(val) => setFilters({ agentId: val })}
      onSearch={setAgentSearch}
      value={filters.agentId ?? ""}
    />
  );
};

export default AgentIdFilter;
