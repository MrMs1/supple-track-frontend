"use client";

import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 10 * 1000,
            retry: (failureCount, error: Error) => {
              const noRetryStatuses = [403, 500, 503];
              if (
                "status" in error &&
                noRetryStatuses.includes(error.status as number)
              ) {
                return false;
              }
              return failureCount < 5;
            },
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>{children}</NextUIProvider>
    </QueryClientProvider>
  );
}
