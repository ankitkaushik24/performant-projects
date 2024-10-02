"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

type LoadingType = <T>(
  deferFn: () => Promise<T>,
  loaderId: string
) => Promise<T>;

type NotifierType = (amount: number) => void;

type LoaderContextType = {
  loading: LoadingType;
  state: Record<string, number>;
  attachNotfier: (loaderId: string, callbackFn: NotifierType) => void;
  disposeNotifier: (loaderId: string, callbackFn: NotifierType) => void;
};

const LoadersContext = createContext<LoaderContextType>(
  {} as LoaderContextType
);

export function LoadersProvider({ children }: { children: React.ReactNode }) {
  const stateRef = useRef<Record<string, number>>({});
  const notifiersRef = useRef<Record<string, Set<NotifierType>>>({});

  const attachNotfier = (loaderId: string, callbackFn: NotifierType) => {
    if (notifiersRef.current[loaderId]) {
      notifiersRef.current[loaderId].add(callbackFn);
    } else {
      notifiersRef.current[loaderId] = new Set([callbackFn]);
    }
  };

  const disposeNotifier = (loaderId: string, callbackFn: NotifierType) => {
    notifiersRef.current[loaderId]?.delete(callbackFn);
    if (!notifiersRef.current[loaderId]?.size) {
      delete notifiersRef.current[loaderId];
    }
  };

  function triggerLoading<T>(deferFn: () => Promise<T>, loaderId: string) {
    updateLoaders(loaderId, 1);
    return deferFn().finally(() => {
      updateLoaders(loaderId, -1);
    });
  }

  function updateLoaders(loaderId: string, amount: number) {
    const updatedAmount = (stateRef.current[loaderId] || 0) + amount;

    if (updatedAmount === 0) {
      delete stateRef.current[loaderId];
    } else {
      stateRef.current[loaderId] = updatedAmount;
    }

    notifiersRef.current[loaderId]?.forEach((callbackFn) =>
      callbackFn(updatedAmount)
    );
  }

  return (
    <LoadersContext.Provider
      value={{
        state: stateRef.current,
        loading: triggerLoading,
        attachNotfier,
        disposeNotifier,
      }}
    >
      {children}
    </LoadersContext.Provider>
  );
}

export function useIsLoading(loaderId: string): boolean {
  const { state, attachNotfier, disposeNotifier } = useContext(LoadersContext);
  const [isLoading, setIsLoading] = useState(state[loaderId] > 0);

  useEffect(() => {
    const onLoading = (amount: number) => {
      setIsLoading(amount > 0);
    };
    attachNotfier(loaderId, onLoading);
    return () => {
      disposeNotifier(loaderId, onLoading);
    };
  }, [attachNotfier, disposeNotifier, loaderId]);

  return isLoading;
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
  children: any;
}) {
  const isLoading = useIsLoading(loaderId);

  return isLoading && children;
}
