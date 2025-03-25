"use client";
import Button from "@/components/ui/button";
import Image from "next/image";

import ErrorImg from "@/assets/error.jpg";
import { useRouter } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import { useCallback, useEffect } from "react";

type ErrorContentPropType = {
  type?: "error" | "not-found";
  error?: Error & { digest?: string };
  reset?: () => void;
};

export default function ErrorContent(props: ErrorContentPropType) {
  const { type = "error", error, reset } = props;

  const posthog = usePostHog();
  const router = useRouter();

  const onButtonClick = useCallback(() => {
    if (reset) {
      return reset();
    }
    router.push("/");
  }, [router, reset]);

  useEffect(() => {
    if (error) {
      posthog.captureException(error);
    }
  }, [error]);

  return (
    <div className="w-full flex flex-col gap-5 p-10 justify-center items-center grow">
      <Image
        src={ErrorImg}
        width={400}
        height={400}
        className="self-center max-md:w-full max-md:h-[calc(100vw-80px)] rounded-2xl overflow-hidden h-[400px] max-w-[400px] max-h-[400px]"
        sizes="(min-width:768px) 44vw, 100vw"
        alt="error-image"
      />
      <h2 className="text-4xl font-bold text-center">
        {type === "error"
          ? "Something went wrong!"
          : "This page doesn't exist!"}
      </h2>
      <Button onClick={onButtonClick}>
        {type === "error" ? "Try again" : "Go to home page"}
      </Button>
    </div>
  );
}
