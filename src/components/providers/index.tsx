"use client";
import { PostHogProvider } from "@/components/providers/posthog-provider";
import { AppStore, store } from "@/lib/stores";
import React, { useRef } from "react";
import { Provider } from "react-redux";

export default function Providers(props: React.PropsWithChildren) {
  const storeRef = useRef<AppStore>(undefined);

  if (!storeRef.current) {
    storeRef.current = store();
  }

  return (
    <Provider store={storeRef.current}>
      <PostHogProvider>{props.children}</PostHogProvider>
    </Provider>
  );
}
