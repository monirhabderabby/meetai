"use client";

import ResponsiveDialog from "@/components/responsive-dialog";
import { AgentGetOne } from "../../types";
import AgentForm from "./agent-form";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValue: AgentGetOne;
}

const UpdateAgentADialog = ({ open, onOpenChange, initialValue }: Props) => {
  return (
    <ResponsiveDialog
      title="Edit Agent"
      description="Edit a agent"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValue}
      />
    </ResponsiveDialog>
  );
};

export default UpdateAgentADialog;
