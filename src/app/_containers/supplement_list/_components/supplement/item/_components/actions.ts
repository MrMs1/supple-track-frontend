"use server";

import { revalidatePath, revalidateTag } from "next/cache";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export async function deleteItemAction(itemId: string) {
  await fetch(`${BACKEND_API_URL}/api/item/${itemId}`, {
    method: "DELETE",
  });
  revalidateTag("supplements");
}
