import { Message } from "@/redux/slices/dataSlice"
import { Input } from "antd"
import { format } from "date-fns"
import { debounce } from "lodash"
import { useEffect, useRef, useState } from "react"
import { Block } from "../Block"

export const Console = ({ messages }: { messages: Message[] }) => {
  const [logs, setLogs] = useState<Message[]>(messages)
  const logRef = useRef<HTMLDivElement>(null)
  const [search, setSearch] = useState<string>("")

  useEffect(() => {
    setLogs(messages?.filter((log) => {
      const msg = log?.data?.msg?.toLowerCase()
      return msg?.includes(search)
    }))
    logRef.current?.scrollTo({
      top: logRef.current?.scrollHeight,
      behavior: "smooth",
    })
  }, [messages, search])

  const handleFilter = debounce((value: string) => {
    const search = value?.toLowerCase()
    setSearch(search)
  }, 200)

  return (
    <Block title="Console">
      <div className="mt-2 mb-4">
        <Input onChange={(e) => handleFilter(e?.target?.value)} placeholder="filter console" />
      </div>
      <div className="max-h-[288px] overflow-y-auto space-y-2 bg-gray-100 p-4 rounded" ref={logRef}>
        {logs?.map((log, index) => (
          <div key={index} className="flex">
            <span>{format(log?.timestamp, 'hh:mm:ss')} - {log?.data?.msg}</span>
          </div>
        ))}
      </div>
    </Block>
  )
}