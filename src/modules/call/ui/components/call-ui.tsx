import { StreamTheme, useCall } from "@stream-io/video-react-sdk";
import { useState } from "react";
import CallActive from "./call-active";
import EndedLobby from "./ended-lobby";
import Lobby from "./lobby";

interface Props {
  meetingName: string;
}

const CallUi = ({ meetingName }: Props) => {
  const call = useCall();
  const [show, setShow] = useState<"lobby" | "call" | "ended">("lobby");

  const handleJoin = async () => {
    if (!call) return;

    await call.join();
    setShow("call");
  };

  const handleLeave = async () => {
    if (!call) return;

    await call.endCall();
    setShow("ended");
  };

  return (
    <StreamTheme>
      {show === "lobby" && <Lobby onJoin={handleJoin} />}
      {show === "call" && (
        <CallActive onLeave={handleLeave} meetingName={meetingName} />
      )}
      {show === "ended" && <EndedLobby />}
    </StreamTheme>
  );
};

export default CallUi;
