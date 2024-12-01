interface ItemColumnDetailTextProps {
  text: string;
  value: string;
}

function ItemColumnDetailText({ text, value }: ItemColumnDetailTextProps) {
  return (
    <div className="w-28">
      <p className="text-sm font-medium text-gray-900 whitespace-normal break-words">
        {text}
      </p>
      <p className="text-sm font-medium text-gray-500 whitespace-normal break-words">
        {value}
      </p>
    </div>
  );
}

export default ItemColumnDetailText;
