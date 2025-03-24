"use client";
import QuizContent from "@/components/quiz/quiz-content";
import QuizSubmit from "@/components/quiz/quiz-submit";
import { useAppSelector } from "@/lib/hooks/store.hook";
import { StrapiQuizOptionType } from "@/types/strapi.type";
import { useCallback, useState } from "react";

//todo: remove after strapi connection
const CONTENT = {
  id: 1,
  documentId: "1",
  title: "Who was known as ‘The King of Pop’?",
  image: {
    id: 1,
    documentId: "1",
    name: "image",
    alternativeText: null,
    previewUrl: null,
    url: "https://media.istockphoto.com/id/1208843679/uk/%D1%84%D0%BE%D1%82%D0%BE/%D0%BA%D0%B0%D0%B2%D0%BA%D0%B0%D0%B7%D1%8C%D0%BA%D0%B8%D0%B9-%D0%BF%D0%BE%D1%80%D1%82%D1%80%D0%B5%D1%82-%D1%81%D0%BF%D1%96%D0%B2%D0%B0%D1%87%D0%BA%D0%B8-%D1%96%D0%B7%D0%BE%D0%BB%D1%8E%D0%B2%D0%B0%D0%BB%D0%B8-%D0%BD%D0%B0-%D1%84%D1%96%D0%BE%D0%BB%D0%B5%D1%82%D0%BE%D0%B2%D0%BE%D0%BC%D1%83-%D1%81%D1%82%D1%83%D0%B4%D1%96%D0%B9%D0%BD%D0%BE%D0%BC%D1%83-%D1%82%D0%BB%D1%96-%D0%B2-%D0%BD%D0%B5%D0%BE%D0%BD%D0%BE%D0%B2%D0%BE%D0%BC%D1%83-%D1%81%D0%B2%D1%96%D1%82%D0%BB%D1%96.jpg?s=2048x2048&w=is&k=20&c=mr1ZHMcaXSTp7L2Qi9_aBkAN489OGj9bEJPnN4gtY2w=",
  },
  multiple: true,
  next: null,
  options: [
    { id: 1, documentId: "1", title: "Bob Marley", next_step: null },
    { id: 2, documentId: "1", title: "Snoop Dogg", next_step: null },
    { id: 3, documentId: "1", title: "Freddie Mercury", next_step: null },
    { id: 4, documentId: "1", title: "Michael Jackson", next_step: null },
  ],
  order: 1,
  quiz: { stepsAmount: 10 },
  createdAt: "",
  updatedAt: "",
  publishedAt: "",
};

export default function Quiz() {
  const {
    documentId,
    title,
    image,
    multiple,
    options,
    next,
    order,
    quiz: { stepsAmount },
  } = CONTENT;

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
