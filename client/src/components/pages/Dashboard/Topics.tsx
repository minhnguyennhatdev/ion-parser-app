import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Collapse, Select } from "antd";
import { useState } from "react";
import { Topic } from "@/redux/slices/dataSlice";
import { Playback } from "@/components/commons/Playback";


export const Topics = () => {
  const [topic, setTopic] = useState<Nullable<Topic>>(null);
  const data = useSelector((state: RootState) => state.data.robot);

  return (
    <Collapse key='Topics'>
      <Collapse.Panel header={'Topics'} key={'Topics'}>
        <Select onChange={(value) => {
          const topic = data?.topics?.find((topic) => topic.topicName === value);
          if (!topic) return;
          setTopic(topic);
        }} className="w-full" placeholder="Select a topic">
          {data?.topics?.map((topic, index) => (
            <Select.Option key={index} value={topic.topicName} >
              {topic.topicName}
            </Select.Option>
          ))}
        </Select>
        {topic?.messages?.length ? <Playback messages={topic?.messages ?? []} /> : null}
      </Collapse.Panel>
    </Collapse>
  )
}