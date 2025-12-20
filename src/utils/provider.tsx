"use client";

/* eslint-disable import/no-extraneous-dependencies */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import React, { useState } from "react";

import NotifyProvider from "./NotifyProvider";

// Tối ưu React Query configuration
const queryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      cacheTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 1,
    },
    mutations: {
      retry: 1,
    },
  },
};

function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => new QueryClient(queryClientConfig));
  return (
    <QueryClientProvider client={client}>
      <ReactQueryStreamedHydration>
        <NotifyProvider>{children}</NotifyProvider>
      </ReactQueryStreamedHydration>
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}

export default Providers;
