"use client";

import { useParkingReport } from "@/hooks/admin/useGetReports";
import { ParkingReport } from "@/types/AdminReports";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { LoadingWrapper } from "@/components/loading/LoadingWrapper";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const columns: ColumnDef<ParkingReport>[] = [
  { accessorKey: "name", header: "Zone" },
  { accessorKey: "totalSlots", header: "Total Slots" },
  { accessorKey: "occupied", header: "Occupied" },
  { accessorKey: "free", header: "Free" },
  { accessorKey: "reserved", header: "Reserved" },
  { accessorKey: "availableForVisitors", header: "Available for Visitors" },
  {
    accessorKey: "availableForSubscribers",
    header: "Available for Subscribers",
  },
  { accessorKey: "subscriberCount", header: "Subscriber Count" },
  {
    accessorKey: "open",
    header: "Status",
    cell: (info) =>
      info.getValue() ? (
        <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-800 font-medium text-xs tracking-wide">
          Open
        </span>
      ) : (
        <span className="inline-block px-3 py-1 rounded-full bg-red-100 text-red-800 font-medium text-xs tracking-wide">
          Closed
        </span>
      ),
  },
];

export default function ParkingReportPage() {
  const { data, isLoading, isError } = useParkingReport();
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { pagination: { pageIndex, pageSize } },
    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater;
      setPageIndex(next.pageIndex);
      setPageSize(next.pageSize);
    },
  });

  if (isLoading) return <LoadingWrapper />;
  if (isError)
    return (
      <div className="text-center text-red-600 font-semibold mt-10">
        Error loading report
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900">
        Parking State Report
      </h1>

      <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider select-none"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-3 text-sm text-gray-800 whitespace-nowrap"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-4 gap-2">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>

        <span className="text-sm text-gray-700">
          Page <strong>{table.getState().pagination.pageIndex + 1}</strong> of{" "}
          <strong>{table.getPageCount()}</strong>
        </span>

        <Select
          value={table.getState().pagination.pageSize.toString()}
          onValueChange={(value) => table.setPageSize(Number(value))}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Rows per page" />
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 20, 50].map((size) => (
              <SelectItem key={size} value={size.toString()}>
                Show {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
