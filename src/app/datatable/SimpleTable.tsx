"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { dataRows, totalRow } from "./rowData";
import { useComputed } from "@preact/signals-react";
import { Input } from "@/components/ui/input";

const RowTotalCell = ({ row, index }) => {
  const rowTotal = useComputed(() => {
    const { age, visits, progress } = row;
    return age.value + visits.value + progress.value;
  });

  console.log("rowTotal rendered", index, "rowIndex");

  return <strong>{rowTotal}</strong>;
};

const EditableCell = ({ valSignal }) => {
  return (
    <Input
      type="number"
      value={valSignal}
      onChange={(e) => (valSignal.value = +e.target.value)}
    />
  );
};

export default function SimpleTable() {
  console.log("SimpleTable rendered!");

  return (
    <Table>
      <TableCaption>Runtime performance with integrated signals</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Age</TableHead>
          <TableHead>Visits</TableHead>
          <TableHead className="text-right">Status</TableHead>
          <TableHead>Progress</TableHead>
          <TableHead>Row Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dataRows.map((row, index) => (
          <TableRow key={row.firstName}>
            <TableCell className="font-medium">{row.firstName}</TableCell>
            <TableCell>
              <EditableCell valSignal={row.age} />
            </TableCell>
            <TableCell>
              <EditableCell valSignal={row.visits} />
            </TableCell>
            <TableCell className="text-right">{row.status}</TableCell>
            <TableCell>
              <EditableCell valSignal={row.progress} />
            </TableCell>
            <TableCell>
              <RowTotalCell row={row} index={index} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell className="font-medium">{totalRow.firstName}</TableCell>
          <TableCell>{totalRow.age}</TableCell>
          <TableCell>{totalRow.visits}</TableCell>
          <TableCell className="text-right">{totalRow.status}</TableCell>
          <TableCell>{totalRow.progress}</TableCell>
          <TableCell>
            <RowTotalCell row={totalRow} index={dataRows.length + 1} />
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
