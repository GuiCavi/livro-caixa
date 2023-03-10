type Props = {
  text: string;
};

function Badge({ text }: Props) {
  return <div className="text-xs font-bold uppercase bg-violet-200 px-3 py-1 rounded-full w-fit text-black">{text}</div>;
}

export default Badge;
