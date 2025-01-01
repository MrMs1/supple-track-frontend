import { addDays, format } from "date-fns";

export function useSupplementCalculations() {
  // 使用予定日数を計算
  const calculateSupplyDays = (
    quantity: number,
    dosagePerUse: number,
    dailyIntakeFrequency: number,
  ) => {
    if (dosagePerUse <= 0 || dailyIntakeFrequency <= 0) return 0;
    return Math.floor(quantity / (dosagePerUse * dailyIntakeFrequency));
  };

  // 使用終了日を計算
  const calculateEndDate = (startDate: string, supplyDays: number) => {
    if (!startDate || supplyDays <= 0) return "";
    const endDate = addDays(new Date(startDate), supplyDays - 1);
    return format(endDate, "yyyy-MM-dd");
  };

  return {
    calculateSupplyDays,
    calculateEndDate,
  };
}
