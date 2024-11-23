import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import ItemColumnDetailText from "../components/ItemColumnDetailText";
import { deleteItem } from "../lib/backendApi";
import type { Item as ItemType } from "../lib/types";

interface ItemProps {
  item: ItemType;
}

function Item({ item }: ItemProps) {
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

  return (
    <div
      key={item.id}
      className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200"
    >
      <div className="flex items-center justify-between">
        <h4 className="text-base font-bold text-gray-900">{item.name}</h4>
        {/* <button このボタンは後続の機能追加時に使用する
        type="button"
        onClick={() => onAddItem(supplement.id)}
        className="ml-4 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        編集
      </button> */}
        <button
          type="button"
          onClick={() => onDeleteItem(item.id)}
          className="ml-4 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <Trash2 size={16} />
        </button>
      </div>
      <div className="flex items-start">
        <div>
          <div className="mt-2 flex justify-between gap-10">
            <ItemColumnDetailText text="総数量" value={`${item.quantity}錠`} />
            <ItemColumnDetailText
              text="1回の摂取量"
              value={`${item.dosagePerUse}錠`}
            />
            <ItemColumnDetailText
              text="1日の摂取回数"
              value={`${item.dailyIntakeFrequency}回`}
            />
            <ItemColumnDetailText
              text="使用予定日数"
              value={`${item.supplyDays}日分`}
            />
            <ItemColumnDetailText
              text="使用期限"
              value={new Date(item.expiredAt).toLocaleDateString("ja-JP")}
            />
            <ItemColumnDetailText
              text="使用開始"
              value={new Date(item.startAt).toLocaleDateString("ja-JP")}
            />
            <ItemColumnDetailText
              text="使用終了"
              value={new Date(item.endAt).toLocaleDateString("ja-JP")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;
