import { Trash2 } from "lucide-react";

interface DeleteButtonProps {
  onDelete: () => void;
}

function DeleteButton({ onDelete }: DeleteButtonProps) {
  return (
    <button
      type="button"
      onClick={onDelete}
      className="inline-flex items-center px-2 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}

export default DeleteButton;
