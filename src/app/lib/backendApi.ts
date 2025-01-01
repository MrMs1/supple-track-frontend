import type { ItemFormData, Supplement, SupplementFormData } from "./types";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export const fetchSupplements = async () => {
  const response = await fetch(`${BACKEND_API_URL}/api/supplements`);
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
  const response = await fetch(`${BACKEND_API_URL}/api/supplement`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(supplementData),
  });

  if (!response.ok) {
    throw new Error("Failed to add supplement");
  }
};

export const addItem = async (itemData: ItemFormData) => {
  const response = await fetch(`${BACKEND_API_URL}/api/item`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(itemData),
  });

  if (!response.ok) {
    throw new Error("Failed to add item");
  }
};

export const deleteItem = async (itemId: string) => {
  const response = await fetch(`${BACKEND_API_URL}/api/item/${itemId}`, {
    method: "DELETE",
  });
};

export const deleteSupplement = async (supplementName: string) => {
  const response = await fetch(`${BACKEND_API_URL}/api/supplement`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: supplementName }),
  });
};
