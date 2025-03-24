import Button from "@/components/ui/button";
import { getQuizStepByOrder } from "@/lib/actions/quizzes";
import { useAppDispatch } from "@/lib/hooks/store.hook";
import { updateState } from "@/lib/slices/quiz.slice";
import { StrapiQuizStepType } from "@/types/strapi.type";
import { sendGAEvent } from "@next/third-parties/google";
import { useRouter } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import { useCallback, useMemo } from "react";

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

  const isLastStep = useMemo(
    () => steps.indexOf(documentId) + 1 === stepsAmount,
    [documentId, steps, stepsAmount]
  );

  const selectedOptions = useMemo(() => {
    return options
      .filter((option) => selected.includes(option.id))
      .map((s) => s.title);
  }, [options, selected]);

  const nextStep = useMemo(() => {
    const selectedItemNext = options.find((option) =>
      selected.includes(option.id)
    )?.next_step;

    return selectedItemNext || next;
  }, [options, selected, next]);

  const onNext = useCallback(async () => {
    let idPath = isLastStep ? "result" : nextStep?.documentId;

    if (!idPath) {
      const quiz = await getQuizStepByOrder(
        order + 1 > stepsAmount ? 1 : order + 1
      );

      if (quiz.data?.[0]) {
        idPath = quiz.data?.[0]?.documentId;
      }
    }

    dispatch(
      updateState({
        key: documentId,
        selected: selectedOptions,
        next: idPath || "",
      })
    );

    const passingData = JSON.stringify({
      id: documentId,
      selected: selectedOptions,
    });

    posthog.capture("quiz-answer", {
      property: passingData,
    });

    sendGAEvent("event", "quiz-answer", {
      value: passingData,
    });

    const nextPath = `/quiz/${idPath}`;
    router.push(nextPath);
  }, [
    router,
    documentId,
    selectedOptions,
    nextStep,
    isLastStep,
    stepsAmount,
    order,
    posthog,
    dispatch,
  ]);

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
