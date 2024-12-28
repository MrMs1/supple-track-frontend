"use client";

import { FormProvider, getFormProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import type { z } from "zod";
import FormInput from "../components/FormInput";
import { addItem } from "../lib/backendApi";
import type { ItemFormData, Supplement } from "../lib/types";
import { itemFormSchema } from "../schema/itemFormSchema";

interface ItemFormProps {
  supplement: Supplement;
  onClose: () => void;
}

type ItemFormFields = z.infer<typeof itemFormSchema>;

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

  const [form] = useForm<ItemFormFields>({
    onSubmit: (event, { formData }) => {
      event.preventDefault();
      const item: ItemFormData = {
        supplementName: supplement.name,
        itemName: formData.get("itemName") as string,
        quantity: Number.parseInt(formData.get("itemQuantity") as string),
        dosagePerUse: Number.parseInt(
          formData.get("itemDosagePerUse") as string,
        ),
        dailyIntakeFrequency: Number.parseInt(
          formData.get("itemDailyIntakeFrequency") as string,
        ),
        expiredAt: new Date(formData.get("itemExpiredAt") as string),
        startAt: new Date(formData.get("itemStartAt") as string),
      };
      mutation.mutate(item);
    },
    onValidate: ({ formData }) => {
      return parseWithZod(formData, { schema: itemFormSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
        <FormProvider context={form.context}>
          <form {...getFormProps(form)} className="space-y-6">
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
              <FormInput
                fieldName="itemName"
                label="商品名"
                type="text"
                placeholder="例: DHC マルチビタミン 30日分"
              />

              <FormInput
                fieldName="itemQuantity"
                label="総数量（錠）"
                type="number"
                placeholder="例: 30"
              />

              <FormInput
                fieldName="itemDosagePerUse"
                label="1回の摂取量（錠）"
                type="number"
                placeholder="例: 1"
              />

              <FormInput
                fieldName="itemDailyIntakeFrequency"
                label="1日の摂取回数"
                type="number"
                placeholder="例: 1"
              />

              <FormInput
                fieldName="itemExpiredAt"
                label="使用期限"
                type="date"
                placeholder="例: 2025-01-01"
              />

              <FormInput
                fieldName="itemStartAt"
                label="使用開始日"
                type="date"
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
        </FormProvider>
      </div>
    </div>
  );
}

export default ItemForm;
