import { getInputProps, useField } from "@conform-to/react";

interface FormInputProps {
  label: string;
  fieldName: string;
  type:
    | "number"
    | "search"
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "month"
    | "password"
    | "radio"
    | "range"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week";
  placeholder?: string;
}

function FormInput({ label, fieldName, type, placeholder }: FormInputProps) {
  const [field] = useField(fieldName);
  const { key, ...inputProps } = getInputProps(field, {
    type,
    ariaAttributes: true,
  });

  return (
    <div>
      <div className="relative pb-5">
        <label
          htmlFor={field.id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
        <input
          key={key}
          {...inputProps}
          placeholder={placeholder}
          className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
            field.errors && field.errors.length > 0
              ? "border-red-500"
              : "border-gray-300"
          }`}
        />
        {field.errors && field.errors.length > 0 && (
          <div className="absolute bottom-0 left-0">
            <p className="text-red-500 text-sm">{field.errors[0]}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FormInput;
