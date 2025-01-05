"use client";

import type { Supplement } from "@/app/_types/types";
import { Pill } from "lucide-react";
import React, { useOptimistic, useTransition } from "react";
import { CreateSupplementButton } from "./_components/CreateSupplementButton";
import { EmptySupplementCard } from "./_components/EmptySupplementCard";
import { deleteSupplementAction } from "./_components/deleteSupplementAction";
import { SupplementCard } from "./_components/supplement/SupplementCard";

interface SupplementsProps {
  supplements: Supplement[] | null;
}

export function SupplementsPresentation({ supplements }: SupplementsProps) {
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
