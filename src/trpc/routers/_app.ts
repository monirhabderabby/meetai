import { agentsRouter } from "@/modules/agents/server/procedures";
import { meetingRouter } from "@/modules/meetings/server/procedure";
import { createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  agents: agentsRouter,
  meetings: meetingRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
