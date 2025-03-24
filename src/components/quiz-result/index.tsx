"use client";

import { useAppSelector } from "@/lib/hooks/store.hook";
import { cn, compareTwoArrays } from "@/lib/utils";
import { QuizResultType } from "@/types";
import Image from "next/image";
import { Fragment, useMemo } from "react";

import SuccessImg from "@/assets/success.png";
import UnSuccessfulImg from "@/assets/upset.png";
import Loader from "@/components/loader";
import { redirect } from "next/navigation";

export default function QuizResult(result: QuizResultType) {
  const { quiz, steps } = useAppSelector((state) => state.quiz);

  const { totalErrors, totalScore, isLoading, errors } = useMemo(() => {
    const totalAmount = Object.keys(quiz).length;
    const errors: { [key in string]: boolean } = {};

    Object.entries(quiz).forEach(([key, value]) => {
      if (compareTwoArrays(value || [], result.right_anwers?.[key])) {
        errors[key] = true;
      }
    });
    const totalErrors = Object.keys(errors).length;

    return {
      isLoading: !steps.length,
      totalScore: ((totalAmount - totalErrors) / totalAmount) * 100,
      totalErrors,
      errors,
    };
  }, [result.right_anwers, quiz, steps]);

  const data = [
    {
      id: "1",
      title: "Total errors",
      value: totalErrors,
    },
    {
      id: "2",
      title: "Total score",
      value: totalScore.toFixed(2) + "%",
    },
  ];

  if (!isLoading && !Object.keys(quiz).length) return redirect("/");

  return (
    <div className="w-full min-h-screen bg-confirm p-4">
      <div className="border-b border-b-confirm-light text-center pb-4">
        <h1 className="text-2xl text-white font-bold">Results</h1>
      </div>

      {!isLoading && (
        <Image
          src={!totalErrors ? SuccessImg : UnSuccessfulImg}
          width={200}
          height={200}
          className="mx-auto my-5 max-sm:w-[150px] max-sm:h-[150px]"
          sizes="(min-width:768px) 200px, 150px"
          priority
          loading="eager"
          alt="result-gif"
        />
      )}
      {isLoading && (
        <Loader className="max-sm:size-[150px] size-[200px] mx-auto my-5" />
      )}

      <div className="flex flex-col mb-4">
        {data.map((item, id) => (
          <div
            className={cn("flex items-center gap-4 text-white font-bold py-3", {
              "border-b border-bottom-confirm-light": id + 1 !== data.length,
            })}
            key={item.id}
          >
            <span className="text-lg">{item.title}</span>
            {!isLoading && <span>{item.value}</span>}
          </div>
        ))}
      </div>

      {!isLoading && (
        <div className="flex flex-col gap-3">
          {steps.map((key) => {
            if (key === "result") return <Fragment key={key} />;
            return (
              <div
                className={cn(
                  "flex gap-4 text-white p-4 rounded-xl flex-col",
                  errors?.[key] ? "bg-error" : "bg-success"
                )}
                key={key}
              >
                <h2 className="text-md font-bold">{result.data[key]}</h2>
                <div className="flex gap-2 flex-col border-t border-t-white pt-3">
                  <span className="font-bold">{quiz[key]?.join(", ")}</span>
                  {errors?.[key] && (
                    <span className="font-semibold text-base text-sm">
                      Right answer: {result.right_anwers[key].join(", ")}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
