"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import FormInput from "../components/FormInput";
import { addItem } from "../lib/backendApi";
import type { ItemFormData, Supplement } from "../lib/types";

// 基本の日付スキーマ
const baseDateSchema = z
  .string()
  .min(1, "日付は必須です")
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

const schema = z.object({
  item_name: z.string().min(1, "商品名は必須です"),
  item_quantity: z.number().min(1, "総数量は必須です"),
  item_dosage_per_use: z.number().min(1, "1回の摂取量は必須です"),
  item_daily_intake_frequency: z.number().min(1, "1日の摂取回数は必須です"),
  item_expired_at: futureDateSchema,
  item_start_at: baseDateSchema,
});

interface ItemFormProps {
  supplement: Supplement | null;
  onClose: () => void;
}

function ItemForm({ supplement, onClose }: ItemFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (item: ItemFormData) => addItem(item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supplements"] });
      onClose();
    },
    onError: (error) => {
      console.log("商品の登録に失敗しました:", error.message);
    },
  });

  const [itemData, setItemData] = useState({
    name: "",
    quantity: 0,
    dosage_per_use: 0,
    daily_intake_frequency: 0,
    supply_days: 0,
    expired_at: "",
    start_at: "",
    end_at: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const item: ItemFormData = {
      supplementName: supplement?.name ?? "",
      itemName: itemData.name,
      quantity: itemData.quantity,
      dosagePerUse: itemData.dosage_per_use,
      dailyIntakeFrequency: itemData.daily_intake_frequency,
      expiredAt: new Date(itemData.expired_at),
      startAt: new Date(itemData.start_at),
    };

    mutation.mutate(item);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">商品登録</h2>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <FormInput
            id="item-name"
            label="商品名"
            value={itemData.name}
            onChange={(e) => setItemData({ ...itemData, name: e.target.value })}
            type="text"
            required={true}
            placeholder="例: DHC マルチビタミン 30日分"
          />
        </div>

        <FormInput
          id="item-quantity"
          label="総数量（錠）"
          value={itemData.quantity}
          onChange={(e) =>
            setItemData({
              ...itemData,
              quantity: Number.parseInt(e.target.value),
            })
          }
          type="number"
          required={true}
          placeholder="例: 30"
        />

        <FormInput
          id="item-dosage-per-use"
          label="1回の摂取量（錠）"
          value={itemData.dosage_per_use}
          onChange={(e) =>
            setItemData({
              ...itemData,
              dosage_per_use: Number.parseInt(e.target.value),
            })
          }
          type="number"
          required={true}
          placeholder="例: 1"
        />

        <FormInput
          id="item-daily-intake-frequency"
          label="1日の摂取回数"
          value={itemData.daily_intake_frequency}
          onChange={(e) =>
            setItemData({
              ...itemData,
              daily_intake_frequency: Number.parseInt(e.target.value),
            })
          }
          type="number"
          required={true}
          placeholder="例: 1"
        />

        <FormInput
          id="item-expired-at"
          label="使用期限"
          value={itemData.expired_at}
          onChange={(e) =>
            setItemData({ ...itemData, expired_at: e.target.value })
          }
          type="date"
          required={true}
          placeholder="例: 2025-01-01"
        />

        <FormInput
          id="item-start-at"
          label="使用開始日"
          value={itemData.start_at}
          onChange={(e) =>
            setItemData({ ...itemData, start_at: e.target.value })
          }
          type="date"
          required={true}
          placeholder="例: 2025-01-01"
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          キャンセル
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          登録する
        </button>
      </div>
    </form>
  );
}

export default ItemForm;
