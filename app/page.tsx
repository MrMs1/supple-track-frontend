"use client";

import { Package2 } from "lucide-react";
import { useState } from "react";
import type { Supplement } from "./lib/types";
import ItemForm from "./ui/ItemForm";
import SupplementForm from "./ui/SupplementForm";
import SupplementList from "./ui/SupplementList";

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isItemFormOpen, setIsItemFormOpen] = useState(false);
  const [selectedSupplement, setSelectedSupplement] = useState<Set<string>>(
    new Set(),
  );
  const [addTargetSupplement, setAddTargetSupplement] =
    useState<Supplement | null>(null);

  const handleSelectSupplement = (supplementName: string) => {
    setSelectedSupplement((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(supplementName)) {
        newSet.delete(supplementName);
      } else {
        newSet.add(supplementName);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <header className="bg-white shadow-lg">
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center">
                <Package2 className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-semibold text-gray-900">
                  サプリメント管理
                </span>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isFormOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
              <SupplementForm onClose={() => setIsFormOpen(false)} />
            </div>
          </div>
        )}

        {isItemFormOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
              <ItemForm
                supplement={addTargetSupplement}
                onClose={() => {
                  setAddTargetSupplement(null);
                  setIsItemFormOpen(false);
                }}
              />
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-xl p-6">
          <SupplementList
            selectedSupplement={selectedSupplement}
            onSelectSupplement={handleSelectSupplement}
            onAddItem={(supplement) => {
              setAddTargetSupplement(supplement);
              setIsItemFormOpen(true);
            }}
            onAddSupplement={() => setIsFormOpen(true)}
          />
        </div>
      </main>
    </div>
  );
}
