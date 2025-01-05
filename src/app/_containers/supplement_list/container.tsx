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

async function checkConnection(): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1000);

    const response = await fetch(`${BACKEND_API_URL}/`, {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    return false;
  }
}
export const dynamic = "force-dynamic";
async function SupplementListContainer() {
  const response = await retry(
    async () => {
      // ヘルスチェックで準備状態を確認
      const isAvailable = await checkConnection();
      if (!isAvailable) {
        console.log("Backend is not ready yet, retrying...");
        throw new Error("Backend not ready");
      }

      // バックエンドの準備が確認できたら実際のデータを取得
      const res = await fetch(`${BACKEND_API_URL}/api/supplements`, {
        cache: "no-store",
      });

      if (!res.ok) {
        return null;
      }

      return res;
    },
    {
      retries: 4,
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
