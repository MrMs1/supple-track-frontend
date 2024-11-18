interface FormDisplayProps {
  label: string;
  value: string | number | null;
}

function FormDisplay({ label, value }: FormDisplayProps) {
  return (
    <div>
      <span className="block text-sm font-medium text-gray-700">{label}</span>
      <span className="block w-full text-gray-900 px-3 py-2.5">
        {value !== null && value !== undefined && value !== "" ? value : "-"}
      </span>
    </div>
  );
}

export default FormDisplay;
