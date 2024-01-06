interface Props {
  children: React.ReactNode;
  color: string;
  fill?: boolean;
  outline?: boolean;
}

interface ColorClasses {
  [key: string]: {
    fill: string;
    noFill: string;
  };
}

const colorClasses: ColorClasses = {
  green: {
    fill: 'text-green-600 bg-green-200',
    noFill: 'text-green-600 border-green-600',
  },
  gray: {
    fill: 'text-gray-600 bg-gray-200',
    noFill: 'text-gray-600 border-gray-600',
  },
};

export default function Badge({
  children,
  color,
  fill = true,
  outline = true,
}: Props) {
  const baseClass = `px-2 py-1 text-xs rounded-full`;
  const outlineClass = 'outline outline-1';
  const colorFillClass = fill ? colorClasses[color].fill : 'bg-base-300';
  const colorNotFillClass = !fill
    ? colorClasses[color].noFill
    : 'border border-base-300';

  return (
    <span
      className={`${baseClass} ${outline ? outlineClass : ''} ${
        fill ? colorFillClass : colorNotFillClass
      }`}
    >
      {children}
    </span>
  );
}
