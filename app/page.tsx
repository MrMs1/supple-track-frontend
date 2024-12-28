"use client";

import { Package2 } from "lucide-react";
import { useState } from "react";
import SupplementForm from "./ui/SupplementForm";
import SupplementList from "./ui/SupplementList";

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedSupplement, setSelectedSupplement] = useState<Set<string>>(
    new Set(),
  );

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
        {isFormOpen && <SupplementForm onClose={() => setIsFormOpen(false)} />}

        <div className="bg-white rounded-lg shadow-xl p-6">
          <SupplementList
            selectedSupplement={selectedSupplement}
            onSelectSupplement={handleSelectSupplement}
            onAddSupplement={() => setIsFormOpen(true)}
          />
        </div>
      </main>
    </div>
  );
}
