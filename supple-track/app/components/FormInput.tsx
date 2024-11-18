interface FormInputProps {
  id: string;
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "number" | "date";
  required?: boolean;
  placeholder?: string;
  min?: number;
}

function FormInput({
  id,
  label,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder,
  min,
}: FormInputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        required={required}
        placeholder={placeholder}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        value={value}
        onChange={onChange}
        min={min}
      />
    </div>
  );
}

export default FormInput;
