import React from "react";
import LoaderCards from "./LoaderCards";
import { LoadersProvider } from "./Loaders";

const LoadersPage = () => {
  return (
    <LoadersProvider>
      <LoaderCards />
    </LoadersProvider>
  );
};

export default LoadersPage;
