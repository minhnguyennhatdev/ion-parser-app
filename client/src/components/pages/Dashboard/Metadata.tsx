/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState } from "@/redux/store";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { Collapse } from "antd";
import omit from "lodash/omit";

export const Metadata = () => {
  const data = useSelector((state: RootState) => state.data.robot);

  useEffect(() => {
  }, [data])

  const renderMetadata = useMemo(() => {
    const metadata = omit(data?.metadata, ['mapData', 'botModel']);
    const transform = (metadata: any) => {
      return Object.entries(metadata).map(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          return (
            <Collapse key={key} ghost >
              <Collapse.Panel header={<span className="font-bold">{key}</span>} key={key} style={{
                padding: '0px',
              }}
              >
                {transform(value)}
              </Collapse.Panel>
            </Collapse>
          )
        } else {
          return (
            <div key={key} className="pl-4 flex justify-between">
              <span>{key}</span>
              <span>{value as string}</span>
            </div>
          )
        }
      })
    }
    if (!metadata) {
      return
    }
    return transform(metadata)

  }, [data?.metadata])


  return <div className="w-full">
    <Collapse
      key='Metadata'
    >
      <Collapse.Panel header={'Metadata'} key={'Metadata'}>
        {renderMetadata}
      </Collapse.Panel>
    </Collapse>
  </div>
}