"use client";

import React from "react";
import { Switch } from "./ui/switch";

const ToggleThemSwitch = (props) => {
  return (
    <Switch
      {...props}
      onCheckedChange={() => {
        document.body.classList.toggle("dark");
      }}
    />
  );
};

export default ToggleThemSwitch;
