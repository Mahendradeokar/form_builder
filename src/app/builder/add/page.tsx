import CreateForm from "@/screens/CreateForm/component/CreateForm";

export default function Form() {
  return (
    <div className="grid justify-center items-center h-screen">
      <div className="shadow-md p-5 rounded-sm w-full max-w-[35rem] border h-fit">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an new Form
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter form name below to create your a new Form
          </p>
        </div>
        <CreateForm />
      </div>
    </div>
  );
}
