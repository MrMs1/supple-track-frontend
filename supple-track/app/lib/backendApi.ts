import type { ItemFormData, Supplement, SupplementFormData } from "./types";

export const fetchSupplements = async () => {
  const response = await fetch("http://localhost:8080/api/supplements");
  return await response.json().then((data) =>
    data.map((supplement: Supplement) => ({
      ...supplement,
      items: supplement.items.map((item) => ({
        ...item,
        expiredAt: new Date(item.expiredAt),
        startAt: new Date(item.startAt),
        endAt: new Date(item.endAt),
      })),
    })),
  );
};

export const addSupplement = async (supplementData: SupplementFormData) => {
  const response = await fetch("http://localhost:8080/api/supplement", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(supplementData),
  });

  if (!response.ok) {
    throw new Error("Failed to add supplement");
  }
};

export const addItem = async (itemData: ItemFormData) => {
  const response = await fetch("http://localhost:8080/api/item", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(itemData),
  });

  if (!response.ok) {
    throw new Error("Failed to add item");
  }
};
