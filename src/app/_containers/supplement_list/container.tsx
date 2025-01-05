export const dynamic = "force-dynamic";

import type { Supplement } from "@/app/_types/types";
import retry from "async-retry";
import { Suspense } from "react";
import { SupplementListSkeleton } from "./_components/SupplementListSkelton";
import { SupplementsPresentation } from "./presentational";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export default async function SupplementList() {
  return (
    <Suspense fallback={<SupplementListSkeleton />}>
      <SupplementListContainer />
    </Suspense>
  );
}

async function SupplementListContainer() {
  const response = await retry(
    async () => {
      const res = await fetch(`${BACKEND_API_URL}/api/supplements`, {
        next: { revalidate: 30 },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      return res;
    },
    {
      retries: 5,
      minTimeout: 2000,
      maxTimeout: 16000,
      factor: 2,
      onRetry: (error, attempt) => {
        console.log(`Retry attempt ${attempt}: Waiting for backend...`, error);
      },
    },
  );
  const supplements: Supplement[] | null = await response
    .json()
    .then((data) =>
      data.map((supplement: Supplement) => ({
        ...supplement,
        items: supplement.items.map((item) => ({
          ...item,
          expiredAt: new Date(item.expiredAt),
          startAt: new Date(item.startAt),
          endAt: new Date(item.endAt),
        })),
      })),
    )
    .catch((error) => {
      console.error(error);
      return null;
    });
  return <SupplementsPresentation supplements={supplements} />;
}
