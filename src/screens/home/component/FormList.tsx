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
import { EditIcon } from "lucide-react";

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
      return <p>{row.getValue("name")}</p>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <Button variant={"link"} className="flex gap-1">
        <EditIcon className="h-4 w-4" />
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
        <Loader className="w-[100px] h-[100px] bg-transparent" />
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3 bg-background rounded-md">
        <h2 className="text-3xl p-4">Form List</h2>
        <Table>
          <TableHeader className="bg-secondary">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="p-4 uppercase">
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
                    console.log(cell.id, cell);
                    return (
                      <TableCell key={cell.id} className="p-4">
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
    </>
  );
}
