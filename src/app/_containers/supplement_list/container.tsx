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
    async () =>
      await fetch(`${BACKEND_API_URL}/api/supplements`, {
        cache: "no-store",
      }),
    {
      retries: 4,
      minTimeout: 1000,
      maxTimeout: 16000,
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
