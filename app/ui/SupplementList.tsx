"use client";

import { Skeleton } from "@nextui-org/skeleton";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { Pill } from "lucide-react";
import React, { Suspense } from "react";
import CreateButton from "../components/CreateButton";
import { deleteSupplement, fetchSupplements } from "../lib/backendApi";
import type { Supplement } from "../lib/types";
import { ItemCard } from "./ItemCard";
import { SupplementCard } from "./SupplementCard";

interface SupplementListProps {
  selectedSupplement: Set<string>;
  onSelectSupplement: (supplementName: string) => void;
  onAddSupplement: () => void;
}

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

function SupplementList({
  selectedSupplement,
  onSelectSupplement,
  onAddSupplement,
}: SupplementListProps) {
  const queryClient = useQueryClient();

  const { data: supplements, isSuccess } = useSuspenseQuery<Supplement[]>({
    queryKey: ["supplements"],
    queryFn: fetchSupplements,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Pill className="h-6 w-6 text-indigo-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900">サプリメント一覧</h2>
        </div>
        {isSuccess && supplements.length > 0 && (
          <CreateButton onAdd={onAddSupplement} />
        )}
      </div>

      {isSuccess && supplements.length === 0 ? (
        <div className="text-center py-20">
          <Pill className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="my-2 text-sm font-medium text-gray-900">
            サプリメントが登録されていません
          </h3>
          <CreateButton onAdd={onAddSupplement} label="サプリメント登録" />
        </div>
      ) : (
        <div className="space-y-4">
          {supplements.map((supplement) => {
            return (
              <div key={supplement.name} className="group">
                <SupplementCard
                  supplement={supplement}
                  selectedSupplement={selectedSupplement}
                  onSelectSupplement={onSelectSupplement}
                />

                <div
                  className={`mt-4 space-y-4 overflow-hidden transition-all duration-300 ${
                    selectedSupplement.has(supplement.name)
                      ? "max-h-[2000px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="ml-8 space-y-4">
                    {supplement.items.map((item) => (
                      <ItemCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function SupplementListWithSuspense(props: SupplementListProps) {
  return (
    <Suspense fallback={<SupplementListSkeleton />}>
      <SupplementList {...props} />
    </Suspense>
  );
}
