import FormList from "@/screens/home/component/FormList";
import HomePageHeader from "@/screens/home/component/header";

export default async function Home() {
  return (
    <>
      <HomePageHeader />
      <main className="max-w-[30rem] mx-auto">
        <FormList />
      </main>
    </>
  );
}
