import { db } from "@/db";
import { agents } from "@/db/schema";
import {
  baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/trpc/init";
import { eq, getTableColumns, sql } from "drizzle-orm";
import { z } from "zod";
import { agentsInsertSchema } from "../schemas";

export const agentsRouter = createTRPCRouter({
  getOne: baseProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const [existingAgent] = await db
        .select({
          ...getTableColumns(agents),
          meetingCount: sql<number>`5`,
        })
        .from(agents)
        .where(eq(agents.id, input.id));

      // throw new TRPCError({ code: "BAD_REQUEST" });

      return existingAgent;
    }),
  getMany: baseProcedure.query(async () => {
    const data = await db.select().from(agents);

    // throw new TRPCError({ code: "BAD_REQUEST" });

    return data;
  }),

  create: protectedProcedure
    .input(agentsInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const [createdAgent] = await db
        .insert(agents)
        .values({
          ...input,
          userId: ctx.auth.user.id,
        })
        .returning();

      return createdAgent;
    }),
});
