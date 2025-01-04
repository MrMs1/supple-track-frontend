"use client";

import { Skeleton } from "@nextui-org/skeleton";
import { Pill } from "lucide-react";
import React, { Suspense, useOptimistic, useTransition } from "react";
import type { Supplement } from "../../../lib/types";
import { CreateSupplementButton } from "./_components/CreateSupplementButton";
import { EmptySupplementCard } from "./_components/EmptySupplementCard";
import { deleteSupplementAction } from "./_components/deleteSupplementAction";
import { SupplementCard } from "./_components/supplement/SupplementCard";
function SupplementListSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Pill className="h-6 w-6 text-indigo-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900">サプリメント一覧</h2>
        </div>
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white border rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div className="flex-grow">
                <Skeleton className="rounded-lg">
                  <div className="h-7 w-32 rounded-lg bg-default-200" />
                </Skeleton>
                <div className="mt-2 grid grid-cols-2 gap-4 w-[400px]">
                  <Skeleton className="rounded-lg">
                    <div className="h-5 w-full rounded-lg bg-default-200" />
                  </Skeleton>
                  <Skeleton className="rounded-lg">
                    <div className="h-5 w-full rounded-lg bg-default-200" />
                  </Skeleton>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SupplementsPresentation({
  supplements,
}: {
  supplements: Supplement[] | null;
}) {
  const [_, startTransition] = useTransition();
  const [optimisticSupplements, setOptimisticSupplements] = useOptimistic(
    supplements,
    (currentSupplements, supplementName: string) =>
      currentSupplements?.filter(
        (supplement) => supplement.name !== supplementName,
      ) ?? [],
  );

  const handleDelete = (supplementName: string) => {
    startTransition(() => {
      setOptimisticSupplements(supplementName);
    });
    deleteSupplementAction(supplementName);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-xl p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Pill className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                サプリメント一覧
              </h2>
            </div>
            {optimisticSupplements && optimisticSupplements.length > 0 && (
              <CreateSupplementButton />
            )}
          </div>

          {optimisticSupplements?.length === 0 ? (
            <EmptySupplementCard />
          ) : (
            <>
              {optimisticSupplements?.map((supplement) => {
                return (
                  <SupplementCard
                    key={supplement.name}
                    supplement={supplement}
                    onDelete={handleDelete}
                  />
                );
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
}

interface SupplementsProps {
  supplements: Supplement[] | null;
}

export default function SupplementsWithSuspense({
  supplements,
}: SupplementsProps) {
  return (
    <Suspense fallback={<SupplementListSkeleton />}>
      <SupplementsPresentation supplements={supplements} />
    </Suspense>
  );
}
