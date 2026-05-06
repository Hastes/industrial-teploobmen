"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export const PageReadyContext = createContext<{
  pageReady: boolean;
  setPageReady: () => void;
} | null>(null);

export function PageReadyProvider({ children }: { children: ReactNode }) {
  const [pageReady, setPageReadyState] = useState(false);
  const setPageReady = useCallback(() => setPageReadyState(true), []);
  return (
    <PageReadyContext.Provider value={{ pageReady, setPageReady }}>
      {children}
    </PageReadyContext.Provider>
  );
}

export function usePageReady() {
  const ctx = useContext(PageReadyContext);
  return ctx?.pageReady ?? false;
}
