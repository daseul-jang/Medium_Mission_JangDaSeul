interface Props {
  children: React.ReactNode;
  color?: string;
  fill?: boolean;
  outline?: boolean;
}

export default function Badge({
  children,
  color,
  fill = true,
  outline = true,
}: Props) {
  const baseClass = `px-2 py-1 text-xs rounded-full`;
  const outlineClass = outline && `outline outline-1`;
  const colorFillClass =
    fill && color ? `text-${color}-600 bg-${color}-200` : 'bg-base-300';
  const colorNotFillClass =
    !fill && color
      ? `text-${color}-600 outline-${color}-600`
      : 'border border-base-300';

  return (
    <span
      className={`${baseClass} ${outlineClass} ${
        fill ? colorFillClass : colorNotFillClass
      }`}
    >
      {children}
    </span>
  );
}
