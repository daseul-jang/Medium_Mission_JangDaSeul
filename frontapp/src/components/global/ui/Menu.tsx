interface Props {
  onClick?: () => void;
  children: React.ReactNode;
  style?: string;
  hover?: boolean;
}
export default function Menu({
  onClick,
  children,
  style,
  hover = true,
}: Props) {
  return (
    <li
      className={`${style} p-3 text-sm text-gray-500 ${
        hover ? 'hover:text-black' : ''
      }`}
      onClick={onClick}
    >
      {children}
    </li>
  );
}
