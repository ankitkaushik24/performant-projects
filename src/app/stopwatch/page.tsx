"use client";

import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Play, Pause, RotateCcw, Flag } from "lucide-react";
import {
  useSignal,
  useComputed,
  useSignalEffect,
  Signal,
} from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";

const formatTime = (t: number) => {
  const hours = Math.floor(t / 3600000);
  const minutes = Math.floor((t % 3600000) / 60000);
  const seconds = Math.floor((t % 60000) / 1000);
  const milliseconds = Math.floor((t % 1000) / 10);

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds
    .toString()
    .padStart(2, "0")}`;
};

const PlayPauseBtn: FC<{
  isRunning: Signal<boolean>;
  handleStartPause: () => void;
}> = ({ isRunning, handleStartPause }) => {
  useSignals();

  console.log("PlayPauseBtn rendered!");

  return (
    <Button
      onClick={handleStartPause}
      className={`w-24 ${
        isRunning.value
          ? "bg-yellow-500 hover:bg-yellow-600"
          : "bg-green-500 hover:bg-green-600"
      }`}
    >
      {isRunning.value ? <Pause className="mr-2" /> : <Play className="mr-2" />}
      {isRunning.value ? "Pause" : "Start"}
    </Button>
  );
};
const LapsArea = ({ laps }: { laps: Signal<number[]> }) => {
  useSignals();

  return (
    laps.value.length > 0 && (
      <ScrollArea className="w-full h-48 border rounded-md p-4">
        <h3 className="font-semibold mb-2">Lap Times:</h3>
        <ul>
          {laps.value.map((lapTime, index) => (
            <li key={lapTime} className="mb-2">
              Lap {index + 1}: {formatTime(lapTime)}
              {index > 0 &&
                ` (+${formatTime(lapTime - laps.value[index - 1])})`}
            </li>
          ))}
        </ul>
      </ScrollArea>
    )
  );
};
export default function DigitalStopwatchWithLaps() {
  const time = useSignal(0);
  const isRunning = useSignal(false);
  const laps = useSignal<number[]>([]);

  console.log("DigitalStopwatchWithLaps rendered!");

  useSignalEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isRunning.value) {
      intervalId = setInterval(() => {
        time.value += 10;
      }, 10);
    }
    return () => clearInterval(intervalId);
  });

  const handleStartPause = () => {
    isRunning.value = !isRunning.value;
  };

  const handleReset = () => {
    isRunning.value = false;
    time.value = 0;
    laps.value = [];
  };

  const handleLap = () => {
    if (isRunning.value) {
      laps.value = [...laps.value, time.value];
    }
  };

  const formattedTime = useComputed(() => formatTime(time.value));

  const lapBtn = useComputed(() => {
    return (
      <Button
        onClick={handleLap}
        disabled={!isRunning.value}
        className="w-24 bg-blue-500 hover:bg-blue-600"
      >
        <Flag className="mr-2" />
        Lap
      </Button>
    );
  });

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="flex flex-col items-center justify-center p-6">
        <div className="text-6xl font-bold mb-8 font-mono" aria-live="polite">
          {formattedTime}
        </div>
        <div className="flex space-x-4 mb-6">
          <PlayPauseBtn
            isRunning={isRunning}
            handleStartPause={handleStartPause}
          />
          {lapBtn}
          <Button
            onClick={handleReset}
            className="w-24 bg-red-500 hover:bg-red-600"
          >
            <RotateCcw className="mr-2" />
            Reset
          </Button>
        </div>
        <LapsArea laps={laps} />
      </CardContent>
    </Card>
  );
}
