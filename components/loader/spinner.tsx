import { Loader } from "lucide-react";

type SpinnerProps = {
  color?: string;
};

export const Spinner = ({ color }: SpinnerProps) => {
  return (
    <div role="status ">
      <Loader color={color || "#3e8505"} className="animate-spin" />
    </div>
  );
};
