"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

import SuccessImg from "@/assets/success.png";
import UnSuccessfulImg from "@/assets/upset.png";

export default function QuizResult() {
  const data = [
    {
      id: "1",
      title: "Total errors",
      value: 3,
    },
    {
      id: "2",
      title: "Total score",
      value: (56.898).toFixed(2) + "%",
    },
  ];
  return (
    <div className="w-full min-h-screen bg-confirm p-4">
      <div className="border-b border-b-confirm-light text-center pb-4">
        <h1 className="text-2xl text-white font-bold">Results</h1>
      </div>

      <Image
        src={true ? SuccessImg : UnSuccessfulImg}
        width={200}
        height={200}
        className="mx-auto my-5 max-sm:w-[150px] max-sm:h-[150px]"
        sizes="(min-width:768px) 200px, 150px"
        priority
        loading="eager"
        alt="result-gif"
      />

      <div className="flex flex-col mb-4">
        {data.map((item, id) => (
          <div
            className={cn("flex items-center gap-4 text-white font-bold py-3", {
              "border-b border-bottom-confirm-light": id + 1 !== data.length,
            })}
            key={item.id}
          >
            <span className="text-lg">{item.title}</span>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
