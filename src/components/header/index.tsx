"use client";
import ProgressBar from "@/components/progress-bar";
import { useAppSelector } from "@/lib/hooks/store.hook";
import { useParams } from "next/navigation";
import { useMemo } from "react";

type HeaderPropType = {
  stepsAmount: number;
};

export default function Header({ stepsAmount }: HeaderPropType) {
  const { steps } = useAppSelector((state) => state.quiz);
  const params = useParams();

  const step = useMemo(() => {
    return !steps.length ? 1 : steps.indexOf(params?.id as string) + 1;
  }, [params.id, steps]);

  const progress = useMemo(() => step / stepsAmount, [step, stepsAmount]);

  return (
    <header className="w-full px-4 py-3 flex flex-col gap-5">
      <div className="flex items-center gap-4 justify-between w-full">
        <span className="font-bold text-lg block text-center w-14">
          {step || 1}/{stepsAmount}
        </span>
        <h1 className="font-bold text-xl">Quiz</h1>
        <span className="block w-14" />
      </div>
      <ProgressBar progress={progress} />
    </header>
  );
}
