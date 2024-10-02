"use client";

import { Plus } from "lucide-react";
import LoaderCard from "./LoaderCard";
import { Button } from "@/components/ui/button";
import { useSignal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import { useLoading } from "./Loaders";
import { getSleep, WAIT_TIME } from "@/lib/utils";

function LoaderCards() {
  useSignals();
  const loaderIds = useSignal(["1", "2", "3", "4", "5", "6", "7", "8", "9"]);
  const loading = useLoading();

  return (
    <div className="container mx-auto">
      <header className="flex flex-col items-center gap-2 mb-8">
        <h1 className="text-3xl font-bold text-center">Loader ID Dashboard</h1>
        <div className="flex items-center flex-wrap gap-2">
          {loaderIds.value.map((id) => (
            <Button
              key={id}
              variant="outline"
              className={`px-4 py-2 rounded-full text-sm font-medium`}
              onClick={() => {
                loading(getSleep(WAIT_TIME), id);
              }}
            >
              {id}
            </Button>
          ))}
          <Button
            variant="default"
            className="p-2 rounded-full"
            onClick={() => {
              loaderIds.value = loaderIds.value.concat(
                `${loaderIds.value.length + 1}`
              );
            }}
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loaderIds.value.map((id) => (
          <LoaderCard key={id} id={id} loaderIds={loaderIds.value} />
        ))}
      </div>
    </div>
  );
}

export default LoaderCards;
