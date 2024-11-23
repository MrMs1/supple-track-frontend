import { Plus } from "lucide-react";

interface CreateButtonProps {
  onAdd: () => void;
  label?: string;
}

function CreateButton({ onAdd, label }: CreateButtonProps) {
  const className = label ? "h-4 w-4 mr-2" : "h-4 w-4";
  return (
    <button
      type="button"
      onClick={onAdd}
      className="inline-flex items-center px-2 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <Plus className={className} />
      {label}
    </button>
  );
}

export default CreateButton;
