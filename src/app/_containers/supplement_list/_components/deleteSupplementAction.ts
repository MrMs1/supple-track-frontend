"use server";

import { revalidatePath, revalidateTag } from "next/cache";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export async function deleteSupplementAction(supplementName: string) {
  await fetch(`${BACKEND_API_URL}/api/supplement`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: supplementName }),
  });
  revalidateTag("supplements");
}
