import { ProgressBar } from "@/components/commons/ProgressBar";
import { RootState } from "@/redux/store";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { BinaryImageDisplay } from "./BinaryImageDisplay";
import { Collapse } from "antd";

const CAMERA_TOPIC = '/usb_cam/image_raw/compressed_throttle'

export const CameraView = () => {

  const [timer, setTimer] = useState<number>(0);

  const topics = useSelector((state: RootState) => state.data.robot?.topics);
  const cameraMessages = useMemo(() => {
    return topics?.find((topic) => topic.topicName === CAMERA_TOPIC)?.messages ?? [];
  }, [topics]);

  useEffect(() => {
    setTimer(0);
  }, [cameraMessages])

  const firstTimestamp = useMemo(() => {
    return cameraMessages?.[0].timestamp;
  }, [cameraMessages]);
  const lastTimestamp = useMemo(() => {
    return cameraMessages?.[cameraMessages.length - 1].timestamp;
  }, [cameraMessages]);
  const totalDuration = useMemo(() => {
    if (firstTimestamp && lastTimestamp) {
      return lastTimestamp - firstTimestamp;
    }
    return 0;
  }, [firstTimestamp, lastTimestamp])

  const currentFrame = useMemo(() => {
    return cameraMessages?.findLast((message) => {
      return (firstTimestamp + timer) >= message.timestamp
    })?.data?.data;
  }, [cameraMessages, firstTimestamp, timer]);

  return (
    <Collapse key='CameraView'>
      <Collapse.Panel header={'CameraView'} key={'CameraView'}>
        <div className="flex flex-col gap-4">
          <ProgressBar
            timer={timer}
            setTimer={setTimer}
            totalDuration={totalDuration}
          />
          {currentFrame ? <BinaryImageDisplay binaryString={currentFrame} /> : null}
        </div>
      </Collapse.Panel>
    </Collapse>
  )
}