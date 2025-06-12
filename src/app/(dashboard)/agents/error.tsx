"use client";
import ErrorState from "@/components/error-state";

const Error = () => {
  return (
    <ErrorState
      title="Failed to load agents"
      description="Something went wrong"
    />
  );
};

export default Error;
