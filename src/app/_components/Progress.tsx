interface ProgressProps {
  value: number;
  max: number;
  variant?: "default" | "success" | "warning" | "danger";
}

const variantStyles = {
  default: "bg-indigo-600",
  success: "bg-green-500",
  warning: "bg-yellow-500",
  danger: "bg-red-500",
};

export function Progress({ value, max, variant = "default" }: ProgressProps) {
  const percentage = Math.min(100, Math.round((value / max) * 100));

  return (
    <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden">
      <div
        className={`absolute left-0 top-0 h-full transition-all duration-500 ease-out ${variantStyles[variant]}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
