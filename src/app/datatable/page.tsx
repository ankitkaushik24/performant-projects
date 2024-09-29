"use client";

import React from "react";
import SimpleTable from "./SimpleTable";
import TanstackTable from "./TanstackTable";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const DatatablePage = () => {
  const [isSimple, setIsSimple] = React.useState(true);
  return (
    <>
      <Label className="flex items-center gap-2">
        <strong>Simple vs. Tanstack: </strong>
        <Switch onCheckedChange={() => setIsSimple(!isSimple)} />
      </Label>
      {isSimple ? <SimpleTable /> : <TanstackTable />}
    </>
  );
};

export default DatatablePage;
