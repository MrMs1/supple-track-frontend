"use server";

import { itemFormSchema } from "@/app/_schema/itemFormSchema";
import { parseWithZod } from "@conform-to/zod";
import { revalidateTag } from "next/cache";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export async function createItemAction(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, { schema: itemFormSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const response = await fetch(`${BACKEND_API_URL}/api/item`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(submission.value),
  });

  if (!response.ok) {
    throw new Error("Failed to add item");
  }

  revalidateTag("supplements");
  return submission.reply();
}
