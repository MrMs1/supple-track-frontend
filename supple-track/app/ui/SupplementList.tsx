"use client";

import { useQuery } from "@tanstack/react-query";
import { max } from "date-fns";
import { Calendar, ChevronRight, Pill, Plus } from "lucide-react";
import React from "react";
import ItemColumnDetailText from "../components/ItemColumnDetailText";
import SupplementColumnDetailText from "../components/SuppleColumnDetailText";
import { fetchSupplements } from "../lib/backendApi";
import type { Supplement } from "../lib/types";
import Item from "./Item";

interface SupplementListProps {
  selectedSupplement: Set<string>;
  onSelectSupplement: (supplementName: string) => void;
  onAddItem: (supplement: Supplement) => void;
  onAddSupplement: () => void;
}

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
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Pill className="h-6 w-6 text-indigo-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900">サプリメント一覧</h2>
        </div>
        <button
          type="button"
          onClick={onAddSupplement}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          サプリメント登録
        </button>
      </div>

      {supplements === undefined || supplements.length === 0 ? (
        <div className="text-center py-12">
          <Pill className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            サプリメントが登録されていません
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            サプリメント登録ボタンからサプリメントを追加してください
          </p>
        </div>
      ) : (
        supplements.map((supplement) => {
          const isOpen = selectedSupplement.has(supplement.name);

          // todo ここはバックエンドに寄せる
          const latestEndDate = max(supplement.items.map((item) => item.endAt));
          // todo ここはバックエンドに寄せる
          const latestExpiryDate = max(
            supplement.items.map((item) => item.expiredAt),
          );
          return (
            <div key={supplement.name} className="space-y-4">
              <div className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                <div className="flex justify-between items-start">
                  <button
                    type="button"
                    className="flex-grow cursor-pointer"
                    onClick={() => onSelectSupplement(supplement.name)}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-gray-900">
                        {supplement.name}
                      </h3>
                      <ChevronRight
                        className={`h-5 w-5 text-gray-400 transform transition-transform duration-200 ${
                          isOpen ? "rotate-90" : ""
                        }`}
                      />
                    </div>
                    <div className="mt-2 flex gap-10">
                      {latestEndDate && (
                        <SupplementColumnDetailText
                          text="最終使用日: "
                          value={new Date(latestEndDate).toLocaleDateString(
                            "ja-JP",
                          )}
                        />
                      )}
                      {latestExpiryDate && (
                        <SupplementColumnDetailText
                          text="最終期限: "
                          value={new Date(latestExpiryDate).toLocaleDateString(
                            "ja-JP",
                          )}
                        />
                      )}
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => onAddItem(supplement)}
                    className="ml-4 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    商品追加
                  </button>
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
