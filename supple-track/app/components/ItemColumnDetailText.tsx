interface ItemColumnDetailTextProps {
  text: string;
  value: string;
}

function ItemColumnDetailText({ text, value }: ItemColumnDetailTextProps) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-900">{text}</p>
      <p className="text-sm font-medium text-gray-500">{value}</p>
    </div>
  );
}

export default ItemColumnDetailText;
