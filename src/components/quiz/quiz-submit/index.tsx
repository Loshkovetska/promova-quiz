import Button from "@/components/ui/button";
import { useAppDispatch } from "@/lib/hooks/store.hook";
import { StrapiQuizStepType } from "@/types/strapi.type";
import { useRouter } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import { useCallback } from "react";

type QuizSubmitPropType = {
  disabled: boolean;
  selected: number[];
  steps: string[];
  stepsAmount: number;
} & Pick<StrapiQuizStepType, "next" | "order" | "options" | "documentId">;

export default function QuizSubmit(props: QuizSubmitPropType) {
  const {
    disabled,
    documentId,
    selected,
    options,
    next,
    order,
    steps,
    stepsAmount,
  } = props;
  const posthog = usePostHog();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const isLastStep = false;

  const onNext = useCallback(async () => {}, []);

  return (
    <div className="fixed bottom-0 left-0 w-full py-3 px-4 bg-white">
      <Button
        className="w-full rounded-[32px]"
        disabled={disabled}
        onClick={onNext}
      >
        {isLastStep ? "Submit answers" : "Next"}
      </Button>
    </div>
  );
}
