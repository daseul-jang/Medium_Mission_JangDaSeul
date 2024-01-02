interface Props {
  onClick: () => void;
  children: React.ReactNode;
  style?: string;
}
export default function Menu({ onClick, children, style }: Props) {
  return (
    <li
      className={`${style} p-3 text-sm text-gray-500 hover:text-black`}
      onClick={onClick}
    >
      {children}
    </li>
  );
}
