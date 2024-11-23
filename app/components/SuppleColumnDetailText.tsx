interface SupplementColumnDetailTextProps {
  text: string;
  value: string;
}

function SupplementColumnDetailText({
  text,
  value,
}: SupplementColumnDetailTextProps) {
  return (
    <div>
      <span className="text-base font-medium text-gray-900">{text}</span>
      <span className="text-base font-medium text-gray-500">{value}</span>
    </div>
  );
}

export default SupplementColumnDetailText;
