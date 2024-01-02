export default function Underline({ style }: { style?: string }) {
  return <li className={`${style} w-full h-[1px] bg-base-200`}></li>;
}
