"use client";

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { numberTypes, rowData } from "./rowData";
import { useComputed } from "@preact/signals-react";
import { Input } from "@/components/ui/input";

import classes from "./datatable.module.css";

const RowTotalCell = ({ row: { original, index } }) => {
  const rowTotal = useComputed(() => {
    const { age, visits, progress } = original;
    return age.value + visits.value + progress.value;
  });

  console.log("rowTotal rendered", index, "rowIndex");

  return <strong>{rowTotal}</strong>;
};

const DefaultCell = ({
  getValue,
  row: { index, original },
  column: {
    id,
    columnDef: { accessorKey },
  },
}) => {
  const valSignal = getValue();

  console.log(id, "rendered", index, "rowIndex");

  const onUpdate = (val) => {
    valSignal.value = val;
  };

  if (!numberTypes.has(accessorKey)) {
    return <p>{valSignal}</p>;
  }
  // it is a number type
  if (original.type === "aggregate") {
    return <strong>{valSignal}</strong>;
  }

  return (
    <Input
      type="number"
      value={valSignal}
      onChange={(e) => onUpdate(+e.target.value)}
    />
  );
};

const defaultColumn = {
  cell: DefaultCell,
};

function TanstackTable() {
  console.log("Table rendered");

  const columns = [
    {
      header: "Name",
      accessorKey: "firstName",
    },
    {
      accessorKey: "age",
      header: () => "Age",
    },
    {
      accessorKey: "visits",
      header: () => <span>Visits</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "progress",
      header: "Profile Progress",
    },
    {
      header: "Row Total",
      cell: RowTotalCell,
    },
  ];

  const data = rowData;

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    meta: {},
  });

  return (
    <div className="p-2">
      <div className="h-2" />
      <table className={classes.paddedTable}>
        <thead>
          <tr>
            {table.getFlatHeaders().map((header) => {
              return (
                <th key={header.id} colSpan={header.colSpan}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TanstackTable;
