interface Props {
  icon: React.ReactNode;
  name: string;
}

export default function Wrapper({ icon, name }: Props) {
  return (
    <div className="w-[7rem] shadow-md rounded-sm aspect-square grid justify-center items-center">
      <div className="flex gap-2 justify-center flex-col">
        <div className="mx-auto">{icon}</div>
        <p>{name}</p>
      </div>
    </div>
  );
}
