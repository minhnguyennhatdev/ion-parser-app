import { formatMilliseconds } from "@/utils/timer";
import { CaretRightOutlined, PauseOutlined } from "@ant-design/icons";
import { Select, Slider } from "antd";
import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";

const STEP = 100; // 0.1 second
const SPEED = [0.25, 0.5, 1, 2, 4, 8]

export const ProgressBar = (
  {
    timer,
    setTimer,
    totalDuration,
  }: {
    timer: number;
    setTimer: Dispatch<SetStateAction<number>>;
    totalDuration: number;
  }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(SPEED[2]);
  const speedRef = useRef(speed); // Add this ref to track speed

  const interval = useRef<Nullable<NodeJS.Timeout>>(null);

  const stopInterval = useCallback(() => {
    if (interval.current) {
      clearInterval(interval.current);
      interval.current = null;
      setIsPlaying(false);
    }
  }, [])

  const startInterval = useCallback(() => {
    interval.current = setInterval(() => {
      setTimer((prev: number) => {
        if (prev >= totalDuration) {
          stopInterval()
          return prev;
        }
        return prev + speedRef.current * STEP;
      });
    }, STEP);

    return () => {
      stopInterval()
    };
  }, [setTimer, stopInterval, totalDuration])

  useEffect(() => {
    if (isPlaying) {
      startInterval();
    } else {
      stopInterval();
    }
    return () => {
      stopInterval();
    }
  }, [isPlaying, startInterval, stopInterval]);

  // Update the ref whenever speed changes
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  return (
    <div>
      <Slider
        tooltip={{
          formatter: formatMilliseconds
        }}
        min={0}
        max={totalDuration}
        step={speed}
        value={timer}
        onChange={(value) => {
          setTimer(value);
        }}
      />

      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div onClick={() => {
            setIsPlaying((prev) => !prev);
          }}
            className="cursor-pointer border rounded-full flex items-center justify-center p-1"
          >
            {isPlaying ? <PauseOutlined style={{ fontSize: '20px' }} /> : <CaretRightOutlined style={{ fontSize: '20px' }} />}
          </div>
          <Select
            className="w-20"
            options={SPEED.map((s) => ({ label: `x${s}`, value: s }))}
            value={speed}
            onChange={(value) => {
              setSpeed(value);
            }}
          />
        </div>
        <div>
          <span>{formatMilliseconds(timer)} / {formatMilliseconds(totalDuration)}</span>
        </div>
      </div>
    </div>)
}