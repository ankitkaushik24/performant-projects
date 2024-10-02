import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader, Zap } from "lucide-react";
import { useIsLoading, useLoading } from "./Loaders";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";

const WAIT_TIME = 2000;

const getSleep = (ms: number) => () =>
  new Promise((resolve) => setTimeout(resolve, ms));

interface LoaderCardProps {
  id: string;
  loaderIds: string[];
}

const TriggerLoaderBtn = ({ selectedLoader }: { selectedLoader: string }) => {
  const loading = useLoading();
  const hasTriggeredLoading = useIsLoading(selectedLoader);

  return (
    <Button
      disabled={hasTriggeredLoading}
      className="w-full group"
      variant="default"
      onClick={() => loading(getSleep(WAIT_TIME), selectedLoader)}
    >
      <Zap className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
      Trigger Loader {selectedLoader}
    </Button>
  );
};

const LoaderSelector = ({
  id,
  loaderIds,
  selectedLoader,
  onSelect,
}: {
  id: string;
  loaderIds: string[];
  selectedLoader: string;
  onSelect: (val: string) => void;
}) => (
  <div className="flex gap-2 items-center">
    <Label htmlFor={`loader-select-${id}`}>Target:</Label>
    <Select
      onValueChange={(val) => onSelect(val)}
      defaultValue={selectedLoader}
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

const LoadingSkeleton = () => <Skeleton className="w-full h-10 rounded-md" />;

function LoaderCard({ id, loaderIds }: LoaderCardProps) {
  const [selectedLoader, setSelectedLoader] = useState(id);
  const isLoading = useIsLoading(id);

  return (
    <Card
      className={`${
        isLoading ? "animate-brightness" : ""
      } overflow-hidden transition-all duration-300 hover:shadow-lg`}
    >
      <CardHeader
        className={`bg-gradient-to-r from-primary to-secondary text-primary-foreground`}
      >
        <CardTitle className="flex items-center justify-between">
          <span>Loader {id}</span>
          {isLoading && <Loader className="animate-spin" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <LoaderSelector
            id={id}
            loaderIds={loaderIds}
            selectedLoader={selectedLoader}
            onSelect={setSelectedLoader}
          />
        )}
      </CardContent>
      <CardFooter>
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <TriggerLoaderBtn selectedLoader={selectedLoader} />
        )}
      </CardFooter>
    </Card>
  );
}

export default LoaderCard;
