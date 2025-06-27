import { Separator } from "@/components/ui/separator";
import FormList from "@/screens/home/component/FormList";
import HomePageHeader from "@/screens/home/component/header";

export default async function Home() {
  return (
    <div className="flex flex-col justify-start items-stretch min-h-screen">
      <HomePageHeader />
      <Separator />
      <main className="h-full flex-1 bg-secondary">
        <div className="mx-auto max-w-screen-xl py-10">
          <FormList />
        </div>
      </main>
    </div>
  );
}
