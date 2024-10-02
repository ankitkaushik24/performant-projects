"use client";

import { createContext, useContext, useRef } from "react";
import { signal, useComputed, Signal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";

type LoadingType = <T>(
  deferFn: () => Promise<T>,
  loaderId: string
) => Promise<T>;

type LoaderContextType = {
  loading: LoadingType;
  getLoaderSignal: (loaderId: string) => Signal<number>;
};

export const LoadersContext = createContext<LoaderContextType>(
  {} as LoaderContextType
);

export function LoadersProvider({ children }: { children: React.ReactNode }) {
  const loaderSignalsRef = useRef(new Map<string, Signal<number>>());
  const loaderSignals = loaderSignalsRef.current;

  function getLoaderSignal(loaderId: string): Signal<number> {
    if (!loaderSignals.has(loaderId)) {
      loaderSignals.set(loaderId, signal(0));
    }
    return loaderSignals.get(loaderId)!;
  }

  function triggerLoading<T>(deferFn: () => Promise<T>, loaderId: string) {
    const loaderSignal = getLoaderSignal(loaderId);
    loaderSignal.value++;
    return deferFn().finally(() => {
      loaderSignal.value = Math.max(0, loaderSignal.value - 1);
    });
  }

  return (
    <LoadersContext.Provider
      value={{
        loading: triggerLoading,
        getLoaderSignal,
      }}
    >
      {children}
    </LoadersContext.Provider>
  );
}

export function useIsLoading(loaderId: string): Signal<boolean> {
  const { getLoaderSignal } = useContext(LoadersContext);
  const loaderSignal = getLoaderSignal(loaderId);
  return useComputed(() => loaderSignal.value > 0);
}

export function useIsLoadingSignal(loaderId: Signal<string>): Signal<boolean> {
  const { getLoaderSignal } = useContext(LoadersContext);
  return useComputed(() => getLoaderSignal(loaderId.value).value > 0);
}

export function useLoading() {
  const { loading } = useContext(LoadersContext);
  return loading;
}

export function IsLoading({
  loaderId,
  children,
}: {
  loaderId: string;
  children: React.ReactNode;
}) {
  useSignals();
  const isLoading = useIsLoading(loaderId);
  return isLoading.value && children;
}
