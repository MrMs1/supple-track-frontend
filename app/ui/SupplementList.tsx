"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { max } from "date-fns";
import { Calendar, ChevronRight, Pill, Plus, Trash2 } from "lucide-react";
import React from "react";
import CreateButton from "../components/CreateButton";
import DeleteButton from "../components/DeleteButton";
import ItemColumnDetailText from "../components/ItemColumnDetailText";
import SupplementColumnDetailText from "../components/SuppleColumnDetailText";
import { deleteSupplement, fetchSupplements } from "../lib/backendApi";
import type { Supplement } from "../lib/types";
import Item from "./Item";

interface SupplementListProps {
  selectedSupplement: Set<string>;
  onSelectSupplement: (supplementName: string) => void;
  onAddItem: (supplement: Supplement) => void;
  onAddSupplement: () => void;
}

const defaultData: Supplement[] = [
  {
    name: "ビタミンD",
    items: [
      {
        id: "1",
        name: "ビタミンD 1000IU",
        quantity: 100,
        dosagePerUse: 1,
        dailyIntakeFrequency: 1,
        supplyDays: 30,
        expiredAt: new Date(),
        endAt: new Date(),
        startAt: new Date(),
      },
      {
        id: "2",
        name: "ビタミンD 500IU",
        quantity: 100,
        dosagePerUse: 1,
        dailyIntakeFrequency: 1,
        supplyDays: 30,
        expiredAt: new Date(),
        endAt: new Date(),
        startAt: new Date(),
      },
    ],
  },
  {
    name: "クレアチン",
    items: [
      {
        id: "3",
        name: "クレアチン 1000mg カプセル",
        quantity: 100,
        dosagePerUse: 1,
        dailyIntakeFrequency: 1,
        supplyDays: 30,
        expiredAt: new Date(),
        endAt: new Date(),
        startAt: new Date(),
      },
    ],
  },
];

function SupplementList({
  selectedSupplement,
  onSelectSupplement,
  onAddItem,
  onAddSupplement,
}: SupplementListProps) {
  const {
    data: supplements,
    isLoading,
    error,
  } = useQuery<Supplement[]>({
    queryKey: ["supplements"],
    queryFn: fetchSupplements,
    initialData: defaultData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (supplementName: string) => deleteSupplement(supplementName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supplements"] });
    },
  });

  const onDeleteSupplement = (supplementName: string) => {
    mutation.mutate(supplementName);
  };
  const existItems = (supplement: Supplement) => {
    return supplement.items.length > 0;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Pill className="h-6 w-6 text-indigo-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900">サプリメント一覧</h2>
        </div>
        {supplements !== undefined && supplements.length > 0 && (
          <CreateButton onAdd={onAddSupplement} />
        )}
      </div>

      {supplements === undefined || supplements.length === 0 ? (
        <div className="text-center py-12">
          <Pill className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="my-2 text-sm font-medium text-gray-900">
            サプリメントが登録されていません
          </h3>
          <CreateButton onAdd={onAddSupplement} label="サプリメント登録" />
        </div>
      ) : (
        supplements.map((supplement) => {
          const isOpen = selectedSupplement.has(supplement.name);

          // todo ここはバックエンドに寄せる
          const latestEndDate = existItems(supplement)
            ? max(
                supplement.items.map((item) => new Date(item.endAt)),
              ).toLocaleDateString("ja-JP")
            : "-";

          // todo ここはバックエンドに寄せる
          const latestExpiryDate = existItems(supplement)
            ? max(
                supplement.items.map((item) => new Date(item.expiredAt)),
              ).toLocaleDateString("ja-JP")
            : "-";

          return (
            <div key={supplement.name} className="space-y-4">
              <div className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                <div className="flex justify-between items-center">
                  <div
                    className={`flex-grow ${existItems(supplement) ? "cursor-pointer" : ""}`}
                    {...(existItems(supplement) && {
                      role: "button",
                      onClick: () => onSelectSupplement(supplement.name),
                    })}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-gray-900">
                        {supplement.name}
                      </h3>
                    </div>
                    <div className="mt-2 flex gap-10">
                      <SupplementColumnDetailText
                        text="最終使用日: "
                        value={latestEndDate}
                      />
                      <SupplementColumnDetailText
                        text="最終期限: "
                        value={latestExpiryDate}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {existItems(supplement) && (
                      <ChevronRight
                        className={`h-5 w-5 text-gray-400 transform transition-transform duration-200 ${
                          isOpen ? "rotate-90" : ""
                        }`}
                      />
                    )}
                    <CreateButton onAdd={() => onAddItem(supplement)} />
                    <DeleteButton
                      onDelete={() => onDeleteSupplement(supplement.name)}
                    />
                  </div>
                </div>
              </div>

              {isOpen && (
                <div className="ml-8">
                  {supplement.items.map((item) => (
                    <Item key={item.id} item={item} />
                  ))}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

export default SupplementList;
