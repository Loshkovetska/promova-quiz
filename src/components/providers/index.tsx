"use client";
import { PostHogProvider } from "@/components/providers/posthog-provider";
import { setInitialState } from "@/lib/slices/quiz.slice";
import { AppStore, store } from "@/lib/stores";
import React, { useEffect, useRef } from "react";
import { Provider } from "react-redux";

export default function Providers(props: React.PropsWithChildren) {
  const storeRef = useRef<AppStore>(undefined);

  useEffect(() => {
    storeRef.current?.dispatch(setInitialState());
  }, []);

  if (!storeRef.current) {
    storeRef.current = store();
  }

  return (
    <Provider store={storeRef.current}>
      <PostHogProvider>{props.children}</PostHogProvider>
    </Provider>
  );
}
