"use client";

import ErrorContent from "@/components/error-content";

type PropType = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: PropType) {
  return (
    <ErrorContent
      error={error}
      reset={reset}
    />
  );
}
