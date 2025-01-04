"use client";

import CreateButton from "@/app/components/CreateButton";
import type { Supplement } from "@/app/lib/types";
import { useState } from "react";
import ItemForm from "../ItemForm";

export function CreateItemButton({ supplement }: { supplement: Supplement }) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <CreateButton onAdd={() => setIsFormOpen(true)} />
      {isFormOpen && (
        <ItemForm
          supplement={supplement}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </>
  );
}
