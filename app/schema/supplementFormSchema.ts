import { z } from "zod";

// 基本の日付スキーマ
const baseDateSchema = z
  .string({ required_error: "この項目は必須です" })
  .transform((str) => {
    const date = new Date(str);
    if (Number.isNaN(date.getTime())) {
      throw new Error("無効な日付です");
    }
    return date;
  });

// 未来日付用のスキーマ
const futureDateSchema = baseDateSchema.refine(
  (date) => date >= new Date(new Date().toDateString()),
  "今日以降の日付を指定してください",
);

export const supplementFormSchema = z.object({
  supplementName: z
    .string({ required_error: "この項目は必須です" })
    .min(1, "サプリメント分類名は必須です"),
  itemName: z
    .string({ required_error: "この項目は必須です" })
    .min(1, "商品名は必須です"),
  itemQuantity: z
    .string({ required_error: "この項目は必須です" })
    .min(1, "総数量は必須です")
    .refine(
      (val) => !Number.isNaN(Number(val)) && Number(val) > 0,
      "1以上の数値を入力してください",
    ),
  itemDosagePerUse: z
    .string({ required_error: "この項目は必須です" })
    .min(1, "1回の摂取量は必須です")
    .refine(
      (val) => !Number.isNaN(Number(val)) && Number(val) > 0,
      "1以上の数値を入力してください",
    ),
  itemDailyIntakeFrequency: z
    .string({ required_error: "この項目は必須です" })
    .min(1, "1日の摂取回数は必須です")
    .refine(
      (val) => !Number.isNaN(Number(val)) && Number(val) > 0,
      "1以上の数値を入力してください",
    ),
  itemExpiredAt: futureDateSchema,
  itemStartAt: baseDateSchema,
});
