"use server";

import { supplementFormSchema } from "@/app/_schema/supplementFormSchema";
import { parseWithZod } from "@conform-to/zod";
import { revalidateTag } from "next/cache";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export async function createSupplementAction(
  prevState: unknown,
  formData: FormData,
) {
  const submission = parseWithZod(formData, {
    schema: supplementFormSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const response = await fetch(`${BACKEND_API_URL}/api/supplement`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(submission.value),
  });

  if (!response.ok) {
    throw new Error("Failed to add supplement");
  }
  revalidateTag("supplements");

  return submission.reply();
}
