import EmptyState from "@/components/empty-state";

const ProcessingState = () => {
  return (
    <div className="bg-whtie rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
        image="/processing.svg"
        title="Meeting is processing"
        description="This meeeting was completed, a summary will aprear soon"
      />
    </div>
  );
};

export default ProcessingState;
