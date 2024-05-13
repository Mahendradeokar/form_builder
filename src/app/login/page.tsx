import LoginForm from "@/screens/auth/component/LoginForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login",
  description: "Login",
};

export default function Login() {
  return (
    <>
      <div className="grid justify-center items-center h-screen">
        <div className="shadow-md p-5 rounded-sm w-full max-w-[35rem] border h-fit">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back!
            </h1>
            <p className="text-sm text-muted-foreground">
              Log in to your account
            </p>
          </div>
          <LoginForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="signup"
              className="underline underline-offset-4 hover:text-primary"
            >
              Sign up now
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
