import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AlertCircle, ChevronRight } from "lucide-react";
import { useState } from "react";
import CreateButton from "../components/CreateButton";
import DeleteButton from "../components/DeleteButton";
import { deleteSupplement } from "../lib/backendApi";
import type { Supplement } from "../lib/types";
import { checkExpirationWarning, formatDate } from "../utils/date";
import { Badge } from "./Badge";
import { Card } from "./Card";
import { ItemCard } from "./ItemCard";
import ItemForm from "./ItemForm";
import { Progress } from "./Progress";

interface SupplementCardProps {
  supplement: Supplement;
}

export function SupplementCard({ supplement }: SupplementCardProps) {
  const [isItemFormOpen, setIsItemFormOpen] = useState(false);
  const [selectedSupplement, setSelectedSupplement] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (supplementName: string) => deleteSupplement(supplementName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supplements"] });
    },
  });

  const onDeleteSupplement = (supplementName: string) => {
    mutation.mutate(supplementName);
  };
  const hasExpirationWarning = checkExpirationWarning(supplement.items);

  const getSupplyStatus = () => {
    if (supplement.totalRestOfSupplyDays <= 7) return "danger";
    if (supplement.totalRestOfSupplyDays <= 14) return "warning";
    return "success";
  };

  const supplyStatus = getSupplyStatus();

  return (
    <>
      <Card>
        <div className="p-5">
          <div className="flex items-start gap-4">
            <div className="flex-grow">
              <div
                className="flex items-center gap-2 cursor-pointer group"
                onClick={() => setSelectedSupplement(!selectedSupplement)}
              >
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {supplement.name}
                </h3>
                {hasExpirationWarning && (
                  <div className="inline-flex items-center relative">
                    <AlertCircle className="h-4 w-4 text-red-500 hover:opacity-80 peer" />
                    <div className="absolute left-0 top-6 w-48 p-2 bg-white rounded-lg shadow-lg text-sm text-red-600 opacity-0 peer-hover:opacity-100 transition-opacity z-10">
                      一部の商品で在庫がなくなる前に使用期限が切れます
                    </div>
                  </div>
                )}
                {supplement.items.length > 0 && (
                  <ChevronRight
                    className={`h-5 w-5 text-gray-400 transform transition-transform duration-300 ease-in-out group-hover:text-indigo-600 ${
                      selectedSupplement
                        ? "rotate-90"
                        : "group-hover:translate-x-1"
                    }`}
                  />
                )}
              </div>

              <div className="mt-2 flex items-center space-x-2">
                <Badge variant={supplyStatus}>
                  {supplement.totalRestOfSupplyDays > 0 && supplement.endAt
                    ? `${formatDate(supplement.endAt)}まで`
                    : "在庫切れ"}
                </Badge>
                <span className="text-sm text-gray-500">
                  {supplement.items.length}個の商品
                </span>
              </div>

              {supplement.totalRestOfSupplyDays > 0 && supplement.endAt && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>残り期間</span>
                    <span>
                      {supplement.totalRestOfSupplyDays > 0 && supplement.endAt
                        ? `残り${supplement.totalRestOfSupplyDays}日 / ${supplement.totalSupplyDays}日`
                        : "在庫切れ"}
                    </span>
                  </div>
                  <Progress
                    value={supplement.totalRestOfSupplyDays}
                    max={supplement.totalSupplyDays}
                    variant={supplyStatus}
                  />
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <CreateButton onAdd={() => setIsItemFormOpen(true)} />
              <DeleteButton
                onDelete={() => onDeleteSupplement(supplement.name)}
              />
            </div>
          </div>
        </div>
      </Card>
      <div
        className={`mt-4 space-y-4 overflow-hidden transition-all duration-300 ${
          selectedSupplement
            ? "max-h-[2000px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        {supplement.items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
      {isItemFormOpen && (
        <ItemForm
          supplement={supplement}
          onClose={() => setIsItemFormOpen(false)}
        />
      )}
    </>
  );
}
