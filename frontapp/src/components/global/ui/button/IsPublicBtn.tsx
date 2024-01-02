interface Props {
  children: React.ReactNode;
  onClick: () => void;
  selected: boolean;
}

export default function IsPublicBtn({ children, onClick, selected }: Props) {
  return (
    <button
      className={`${
        selected
          ? 'border-green-700 text-green-700'
          : 'border-base-200 text-gray-400'
      } p-3 border rounded-md shadow-sm flex basis-1/2 justify-center items-center text-lg font-bold`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
