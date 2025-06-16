"use client";

import { authClient } from "@/lib/auth-client";
import { generateAvatarUrl } from "@/lib/avatar";
import { Loader2 } from "lucide-react";
import CallConnect from "./call-connect";

interface Props {
  meetingId: string;
  meetingName: string;
}

const CallProvider = ({ meetingId, meetingName }: Props) => {
  const { data, isPending } = authClient.useSession();

  if (!data || isPending) {
    return (
      <div className="flex h-screen items-center justify-center bg-radial from-sidebar-accent to-sidebar">
        <Loader2 className="size-6 animate-spin text-white" />
      </div>
    );
  }

  return (
    <CallConnect
      meetingId={meetingId}
      meetingName={meetingName}
      userId={data.user.id}
      userName={data.user.name}
      userImage={
        data.user.image ??
        generateAvatarUrl({ seed: data.user.name, variant: "initials" })
      }
    />
  );
};

export default CallProvider;
