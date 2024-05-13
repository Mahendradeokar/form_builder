import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen grid place-content-center">
      <div className="grid place-content-center items-center gap-3 w-[20rem]">
        <h2 className="text-xl text-center">Not Found!</h2>
        <Link href={"/"}>Go To Home Page</Link>
      </div>
    </div>
  );
}
