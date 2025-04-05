import { RootState } from "@/redux/store";
import { Collapse } from "antd";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Playback } from "../../commons/Playback";

const LOG_TOPIC = '/rosout_agg';

export const LogConsole = () => {
  const topics = useSelector((state: RootState) => state.data.robot)?.topics;
  const logMessages = useMemo(() => {
    return topics?.find((topic) => topic.topicName === LOG_TOPIC)?.messages ?? [];
  }, [topics]);

  return (
    <Collapse key='LogConsole'>
      <Collapse.Panel header={'LogConsole'} key={'LogConsole'}>
        {logMessages?.length ? <Playback messages={logMessages ?? []} enableLogs /> : null}
      </Collapse.Panel>
    </Collapse>
  )
}