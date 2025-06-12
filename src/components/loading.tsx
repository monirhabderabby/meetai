import { Loader2Icon } from "lucide-react";

interface Props {
  title: string;
  description: string;
}

const LoadingState = ({ title, description }: Props) => {
  return (
    <div className="py-4 px-8 flex flex-1 items-center justify-center min-h-[calc(100vh-80px)]">
      <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm">
        <Loader2Icon className="size-6 animate-spin text-primary" />
        <div className="flex flex-col gap-y-2 text-center">
          <h6 className="text-lg font-medium">{title}</h6>
          <p className="teext-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
