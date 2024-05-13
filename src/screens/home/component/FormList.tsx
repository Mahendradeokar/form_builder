"use client";

import Loader from "@/components/ui/Loader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getForm } from "@/lib/requests/form";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ComponentProps, useEffect, useState } from "react";

export default function FormList(props: ComponentProps<"div">) {
  const [formData, setFormData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await getForm();
      setFormData(data as any[]);
      setLoading(false);
    })();
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Loader className="w-[100px] h-[100px]" />
      </div>
    );
  }

  if (!formData.length) {
    return (
      <div className="flex justify-center items-center">
        <p className="text-xl">
          You have not created any form yet. Please create one!
        </p>
      </div>
    );
  }
  return (
    <div className="justify-center items-center gap-3 grid grid-cols-2 md:grid-cols-4 min-h-screen place-content-center p-24 align-middle">
      {formData.map((form) => {
        return (
          <Card
            key={form._id}
            className={cn(
              "w-[150px] h-[150px] flex flex-col justify-between",
              props.className
            )}
            {...props}
          >
            <CardHeader>
              <CardTitle>{form.name}</CardTitle>
            </CardHeader>
            <CardFooter>
              <Link href={`builder/${form._id}`}>
                <Button className="w-full">Edit</Button>
              </Link>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
