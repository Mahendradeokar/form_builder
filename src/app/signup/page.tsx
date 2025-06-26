import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignUpForm from "@/screens/auth/component/SignUpForm";
import Link from "next/link";

export default function SigUp() {
  return (
    <div className="grid justify-center items-center h-screen">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Create an account</CardTitle>
          <CardDescription className="text-center">
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
        <CardFooter>
          <CardDescription className="text-center">
            Already have an account?{" "}
            <Link
              href="login"
              className="underline underline-offset-4 hover:text-primary"
            >
              Log in here
            </Link>
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}
