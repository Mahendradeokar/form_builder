import SignUpForm from "@/screens/auth/component/SignUpForm";
import Link from "next/link";

export default function SigUp() {
  return (
    <div className="grid justify-center items-center h-screen">
      <div className="shadow-md p-5 rounded-sm w-full max-w-[35rem] border h-fit">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email below to create your account
          </p>
        </div>
        <SignUpForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="login"
            className="underline underline-offset-4 hover:text-primary"
          >
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
}
