import { Message } from "@/redux/slices/dataSlice";
import { formatMilliseconds } from "@/utils/timer";
import { useCallback, useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { debounce } from "lodash";
import dynamic from "next/dynamic";
import { Console } from "./Console";
import { ProgressBar } from "../ProgressBar";
import { Block } from "../Block";
const ReactJson = dynamic(() => import('react-json-view'), { ssr: false });

export const Playback = ({ messages, enableLogs }: { messages: Message[], enableLogs?: boolean }) => {
  const [timer, setTimer] = useState<number>(0);
  const [message, setMessage] = useState<Nullable<Message>>(null);
  const [messageList, setMessageList] = useState<Message[]>([]);

  useEffect(() => {
    setTimer(0);
  }, [messages])

  const firstTimestamp = useMemo(() => {
    return messages?.[0].timestamp;
  }, [messages]);
  const lastTimestamp = useMemo(() => {
    return messages?.[messages.length - 1].timestamp;
  }, [messages]);
  const totalDuration = useMemo(() => {
    if (firstTimestamp && lastTimestamp) {
      return lastTimestamp - firstTimestamp;
    }
    return 0;
  }, [firstTimestamp, lastTimestamp])


  const findMessage = useMemo(() => debounce((timer: number) => {
    const matchedMessage = messages.findLast((message) => {
      return (firstTimestamp + timer) >= message.timestamp
    });
    if (matchedMessage) {
      setMessage(matchedMessage);
    }
  }, 50), [firstTimestamp, messages]);

  const findMessages = useMemo(() => debounce((timer) => {
    const matchedMessages = messages.filter((message) => {
      const matched = (firstTimestamp + timer) >= message.timestamp
      return matched
    });
    if (matchedMessages) {
      setMessageList(matchedMessages);
    }
  }, 50), [firstTimestamp, messages]);

  const displayMessageData = useCallback((data: Message['data']) => {
    return <ReactJson src={data} collapsed name='data' enableClipboard={false} displayDataTypes={false} />
  }, [])

  const renderMessageList = useMemo(() => {
    if (!messageList?.length) {
      return null
    }

    if (enableLogs) {
      return <Console messages={messageList} />
    }

    return (
      <Block title="All messages (til current time)">
        <div className="max-h-[298px] overflow-y-auto">
          {messageList?.map((message, index) => (
            <div key={index} className="flex">
              {formatMilliseconds(message?.timestamp - firstTimestamp)} - ({format(message?.timestamp, 'hh:mm:ss')})
              {displayMessageData(message?.data)}
            </div>
          ))}
        </div>
      </Block>
    )
  }, [displayMessageData, enableLogs, firstTimestamp, messageList])

  useEffect(() => {
    findMessage(timer);
    findMessages(timer);
  }, [findMessage, findMessages, timer])

  return <div className="space-y-4">
    <ProgressBar
      timer={timer}
      setTimer={setTimer}
      totalDuration={totalDuration}
    />

    {enableLogs ? null : <Block title="Info">
      {message ? (
        <div className="space-y-2">
          <div className="flex flex-col">
            <span>playback at: {formatMilliseconds(message?.timestamp - firstTimestamp)}</span>
            <span>timestamp: {format(message?.timestamp, 'hh:mm:ss')}</span>
          </div>
          <div className="w-full">
            {displayMessageData(message?.data)}
          </div>
        </div>
      ) : null}
    </Block>}

    {renderMessageList}
  </div >
};
