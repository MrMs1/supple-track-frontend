import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isBefore } from "date-fns";
import { AlertCircle, Calendar, Package } from "lucide-react";
import DeleteButton from "../components/DeleteButton";
import { deleteItem } from "../lib/backendApi";
import type { Item as ItemType } from "../lib/types";
import { formatDate } from "../utils/date";
import { Badge } from "./Badge";
import { Card } from "./Card";
import { Progress } from "./Progress";

interface ItemCardProps {
  item: ItemType;
}

export function ItemCard({ item }: ItemCardProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (itemId: string) => deleteItem(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supplements"] });
    },
  });

  const onDeleteItem = (itemId: string) => {
    mutation.mutate(itemId);
  };
  const hasExpirationWarning = isBefore(item.expiredAt, item.endAt);

  const getSupplyStatus = () => {
    if (item.restOfSupplyDays <= 7) return "danger";
    if (item.restOfSupplyDays <= 14) return "warning";
    return "success";
  };

  const supplyStatus = getSupplyStatus();

  return (
    <div className="ml-8 space-y-4">
      <Card className="transform transition-all duration-200 ">
        <div className="p-5">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Package className="h-5 w-5 text-indigo-500 mr-2" />
                    {item.name}
                  </h4>
                  {hasExpirationWarning && (
                    <div className="inline-flex items-center relative">
                      <AlertCircle className="h-4 w-4 text-red-500 hover:opacity-80 peer" />
                      <div className="absolute left-0 top-6 w-48 p-2 bg-white rounded-lg shadow-lg text-sm text-red-600 opacity-0 peer-hover:opacity-100 transition-opacity z-10">
                        在庫がなくなる前に使用期限が切れます
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={supplyStatus}>
                    {item.restOfSupplyDays > 0
                      ? `${formatDate(item.endAt)}まで`
                      : "使用期間終了"}
                  </Badge>
                </div>
              </div>
              <DeleteButton onDelete={() => onDeleteItem(item.id)} />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">総数量</p>
                <p className="text-lg font-semibold text-gray-900">
                  {item.quantity}錠
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">1回の摂取量</p>
                <p className="text-lg font-semibold text-gray-900">
                  {item.dosagePerUse}錠
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">1日の回数</p>
                <p className="text-lg font-semibold text-gray-900">
                  {item.dailyIntakeFrequency}回
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">供給日数</p>
                <p className="text-lg font-semibold text-gray-900">
                  {item.supplyDays}日分
                </p>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>残り期間</span>
                <span>
                  {item.restOfSupplyDays > 0
                    ? `残り${item.restOfSupplyDays}日 / ${item.supplyDays}日`
                    : "使用期間終了"}
                </span>
              </div>
              <Progress
                value={item.restOfSupplyDays}
                max={item.supplyDays}
                variant={supplyStatus}
              />
            </div>

            <div className="pt-4 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row sm:justify-between space-y-2 sm:space-y-0 text-sm">
                <div className="flex items-center text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>
                    使用期間: {formatDate(item.startAt)} 〜{" "}
                    {formatDate(item.endAt)}
                  </span>
                </div>
                <div className="flex items-center text-gray-500">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  <span>期限: {formatDate(item.expiredAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
