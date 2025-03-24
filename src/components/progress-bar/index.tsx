import { cn } from "@/lib/utils";

type ProgressBarPropType = {
  progress: number;
};

export default function ProgressBar({ progress }: ProgressBarPropType) {
  const variants = {
    "bg-error": progress <= 0.3,
    "bg-warn": progress > 0.31 && progress <= 0.5,
    "bg-confirm": progress > 0.5,
  };

  return (
    <div className="rounded-lg h-4 bg-placeholder w-full overflow-hidden">
      <div
        className={cn(
          variants,
          "transition-all h-full rounded-lg duration-1000"
        )}
        style={{
          width: `${progress * 100}%`,
        }}
      />
    </div>
  );
}
