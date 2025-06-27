import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreateForm from "@/screens/CreateForm/component/CreateForm";
import GoBack from "@/components/GoBack";

export default function Form() {
  return (
    <div className="flex flex-col h-screen p-8">
      <div>
        <GoBack className="mb-4" label="Back" />
      </div>
      <div className="flex-1 flex justify-center items-center">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold tracking-tight">
              Create an new Form
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Enter form name below to create your a new Form
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CreateForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
