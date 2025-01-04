"use client";

import CreateButton from "@/app/components/CreateButton";
import { Pill } from "lucide-react";
import { useState } from "react";
import SupplementForm from "./SupplementFrom";

export function EmptySupplementCard() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <div className="text-center py-20">
        <Pill className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="my-2 text-sm font-medium text-gray-900">
          サプリメントが登録されていません
        </h3>
        <CreateButton onAdd={() => setIsFormOpen(true)} />
      </div>
      {isFormOpen && <SupplementForm onClose={() => setIsFormOpen(false)} />}
    </>
  );
}
