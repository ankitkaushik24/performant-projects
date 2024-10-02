import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Signal, useSignal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import { Loader, Zap } from "lucide-react";
import { useIsLoading, useIsLoadingSignal, useLoading } from "./Loaders";
import { getSleep, WAIT_TIME } from "@/lib/utils";

interface LoaderCardProps {
  id: string;
  loaderIds: string[];
}

const TriggerLoaderBtn = ({
  selectedLoader,
}: {
  selectedLoader: Signal<string>;
}) => {
  useSignals();
  const loading = useLoading();
  const hasTriggeredLoading = useIsLoadingSignal(selectedLoader);

  return (
    <Button
      disabled={hasTriggeredLoading.value}
      className="w-full group"
      variant="default"
      onClick={() => loading(getSleep(WAIT_TIME), selectedLoader.value)}
    >
      <Zap className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
      Trigger Loader {selectedLoader.value}
    </Button>
  );
};

const LoaderSelector = ({
  id,
  loaderIds,
  selectedLoader,
}: {
  id: string;
  loaderIds: string[];
  selectedLoader: Signal<string>;
}) => {
  useSignals();
  return (
    <div className="flex gap-2 items-center">
      <Label htmlFor={`loader-select-${id}`}>Target:</Label>
      <Select
        onValueChange={(val) => (selectedLoader.value = val)}
        defaultValue={selectedLoader.value}
      >
        <SelectTrigger id={`loader-select-${id}`} className="w-full">
          <SelectValue placeholder="Select Loader ID" />
        </SelectTrigger>
        <SelectContent>
          {loaderIds.map((loaderId) => (
            <SelectItem key={loaderId} value={loaderId}>
              Loader {loaderId}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

const LoadingSkeleton = () => <Skeleton className="w-full h-10 rounded-md" />;

function LoaderCard({ id, loaderIds }: LoaderCardProps) {
  useSignals();
  const selectedLoader = useSignal(id);
  const isLoading = useIsLoading(id);

  return (
    <Card
      className={`${
        isLoading.value ? "animate-brightness" : ""
      } overflow-hidden transition-all duration-300 hover:shadow-lg`}
    >
      <CardHeader
        className={`bg-gradient-to-r from-primary to-secondary text-primary-foreground`}
      >
        <CardTitle className="flex items-center justify-between">
          <span>Loader {id}</span>
          {isLoading.value && (
            <Loader
              color="hsl(var(--accent-foreground))"
              className="animate-spin"
            />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {isLoading.value ? (
          <LoadingSkeleton />
        ) : (
          <LoaderSelector
            id={id}
            loaderIds={loaderIds}
            selectedLoader={selectedLoader}
          />
        )}
      </CardContent>
      <CardFooter>
        {isLoading.value ? (
          <LoadingSkeleton />
        ) : (
          <TriggerLoaderBtn selectedLoader={selectedLoader} />
        )}
      </CardFooter>
    </Card>
  );
}

export default LoaderCard;
