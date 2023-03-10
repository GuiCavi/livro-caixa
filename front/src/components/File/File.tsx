import CSVIcon from "../icons/csv.png";

export type Props = {
  name: string;
};

function File({ name }: Props) {
  return (
    <li className="p-4 flex flex-col justify-center items-center gap-2 basis-16 text-center text-sm">
      <img src={CSVIcon} alt="" className="w-14" />
      <span className="text-white font-bold break-all">{name}</span>
    </li>
  );
}

export default File;
