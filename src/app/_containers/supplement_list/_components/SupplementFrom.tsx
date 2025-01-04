"use client";
import FormInput from "@/app/components/FormInput";
import { supplementFormSchema } from "@/app/schema/supplementFormSchema";
import { FormProvider, getFormProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { X } from "lucide-react";
import { useActionState } from "react";
import type { z } from "zod";
import { createSupplementAction } from "./createSupplementAction";
interface SupplementFormProps {
  onClose: () => void;
}

type SupplementFormFields = z.infer<typeof supplementFormSchema>;

function SupplementForm({ onClose }: SupplementFormProps) {
  const [lastResult, action] = useActionState(
    createSupplementAction,
    undefined,
  );

  const [form] = useForm<SupplementFormFields>({
    lastResult,
    onSubmit: () => {
      onClose();
    },
    onValidate: ({ formData }) =>
      parseWithZod(formData, { schema: supplementFormSchema }),
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
        <FormProvider context={form.context}>
          <form
            {...getFormProps(form)}
            className="flex flex-col"
            action={action}
          >
            <div className="flex justify-between items-center p-4">
              <h2 className="text-xl font-bold text-gray-900">
                サプリメント新規登録
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-3">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    サプリメント情報
                  </h3>
                  <FormInput
                    fieldName="supplementName"
                    label="サプリメント名"
                    type="text"
                    placeholder="例: マルチビタミン、オメガ3など"
                  />
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    商品情報
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <FormInput
                      fieldName="itemName"
                      label="商品名"
                      type="text"
                      placeholder="例: DHC マルチビタミン 30日分"
                    />
                    <FormInput
                      fieldName="quantity"
                      label="総数量（錠）"
                      type="number"
                      placeholder="例: 30"
                    />
                    <FormInput
                      fieldName="dosagePerUse"
                      label="1回の摂取量（錠）"
                      type="number"
                      placeholder="例: 1"
                    />
                    <FormInput
                      fieldName="dailyIntakeFrequency"
                      label="1日の摂取回数"
                      type="number"
                      placeholder="例: 1"
                    />
                    <FormInput
                      fieldName="expiredAt"
                      label="使用期限"
                      type="date"
                    />
                    <FormInput
                      fieldName="startAt"
                      label="使用開始日"
                      type="date"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 p-4 bg-white">
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

export default SupplementForm;
