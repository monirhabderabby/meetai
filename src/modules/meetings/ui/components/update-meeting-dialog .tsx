"use client";

import ResponsiveDialog from "@/components/responsive-dialog";
import { MeetingGetOne } from "../../types";
import MeetingForm from "./meeting-form";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialvalue: MeetingGetOne;
}

const UpdateMeetingDialog = ({ open, onOpenChange, initialvalue }: Props) => {
  return (
    <ResponsiveDialog
      title="Edit Meeting"
      description="Edit a  meeting"
      open={open}
      onOpenChange={onOpenChange}
    >
      <MeetingForm
        initialValues={initialvalue}
        onSuccess={() => {
          onOpenChange(false);
        }}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  );
};

export default UpdateMeetingDialog;
