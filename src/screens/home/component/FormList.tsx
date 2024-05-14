"use client";

import Loader from "@/components/ui/Loader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { getForm } from "@/lib/requests/form";
import { ComponentProps, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface FormData {
  name: string;
  _id: string;
}

const columns: ColumnDef<FormData>[] = [
  {
    id: "Index",
    header: "Sr no",
    cell: ({ column }) => <p>{column.getIndex() + 1}</p>,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      debugger;
      return <p>{row.getValue("name")}</p>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <Button asChild>
        <Link href={`/builder/${row.original._id}`}>Edit</Link>
      </Button>
    ),
  },
];

export default function FormList(props: ComponentProps<"div">) {
  const [formData, setFormData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const table = useReactTable<FormData>({
    columns,
    data: formData,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data, isSuccess } = await getForm();
      // console.log(data)
      if (isSuccess) {
        setFormData(data as any[]);
      }
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

  return (
    <>
      <div className="space-y-3">
        <h2 className="text-3xl">Form List</h2>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      console.log(cell.id, cell)
                      return (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    You have not created any form yet. Please create one.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
