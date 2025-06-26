import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Welcome back!</CardTitle>
            <CardDescription className="text-center">
              Log in to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
          <CardFooter>
            <CardDescription className="text-center">
              Don&apos;t have an account?{" "}
              <Link
                href="signup"
                className="underline underline-offset-4 hover:text-primary"
              >
                Sign up now
              </Link>
            </CardDescription>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
