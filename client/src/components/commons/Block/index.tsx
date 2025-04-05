import { Divider } from "antd"

export const Block = ({ title, children }: { title: string, children: React.ReactNode }) => {
  return (
    <div className="border border-gray-200 p-4 rounded">
      <div className="font-bold">{title}</div>
      <Divider style={{
        marginBlock: '8px',
      }} />
      {children}
    </div>
  )
}