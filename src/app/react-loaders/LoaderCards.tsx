"use client";

import LoaderCard from "./LoaderCard";

function LoaderCards() {
  const loaderIds = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Loader ID Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loaderIds.map((id) => (
          <LoaderCard key={id} id={id} loaderIds={loaderIds} />
        ))}
      </div>
    </div>
  );
}

export default LoaderCards;
