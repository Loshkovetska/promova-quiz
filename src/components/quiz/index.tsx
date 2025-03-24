"use client";
import QuizContent from "@/components/quiz/quiz-content";
import QuizSubmit from "@/components/quiz/quiz-submit";
import { useAppSelector } from "@/lib/hooks/store.hook";
import { StrapiQuizOptionType, StrapiQuizStepType } from "@/types/strapi.type";
import { useCallback, useEffect, useState } from "react";

export default function Quiz(props: StrapiQuizStepType) {
  const {
    documentId,
    title,
    image,
    multiple,
    options,
    next,
    order,
    quiz: { stepsAmount },
  } = props;

  const { steps, quiz } = useAppSelector((state) => state.quiz);

  const [selected, setSelected] = useState<number[]>([]);

  const onSelect = useCallback(
    (option: StrapiQuizOptionType) => (e: React.MouseEvent) => {
      if (multiple) {
        return setSelected((prev) => {
          const inside = prev.find((opt) => opt === option.id);
          return !inside
            ? [...prev, option.id]
            : prev.filter((opt) => opt !== option.id);
        });
      }
      setSelected([option.id]);
    },
    [multiple]
  );

  useEffect(() => {
    if (quiz?.[documentId]) {
      const storedOptions = options
        .filter((opt) => quiz[documentId]?.includes(opt.title))
        .map((opt) => opt.id);

      setSelected(storedOptions);
    }
  }, [quiz, documentId, options]);

  return (
    <>
      <QuizContent
        image={image}
        title={title}
        options={options}
        onSelect={onSelect}
        isSelected={(id) => selected.includes(id)}
      />
      <QuizSubmit
        steps={steps}
        stepsAmount={stepsAmount}
        order={order}
        documentId={documentId}
        options={options}
        selected={selected}
        next={next}
        disabled={multiple ? selected.length < 2 : !selected.length}
      />
    </>
  );
}
