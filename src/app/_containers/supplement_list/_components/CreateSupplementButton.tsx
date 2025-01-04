"use client";

import CreateButton from "@/app/components/CreateButton";
import { useState } from "react";
import SupplementForm from "./SupplementFrom";

export function CreateSupplementButton() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <CreateButton onAdd={() => setIsFormOpen(true)} />
      {isFormOpen && <SupplementForm onClose={() => setIsFormOpen(false)} />}
    </>
  );
}
