import { Layout } from "@/components/commons/Layout";
import { setRobotData } from "@/redux/slices/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { Metadata } from "./Metadata";
import { Spin } from "antd";
import { useMemo, useState } from "react";
import { RootState } from "@/redux/store";
import { Topics } from "./Topics";
import { CameraView } from "./CameraView";
import { LogConsole } from "./LogConsole";
import { parseIonFile } from "@/services/ion-parser";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.data.robot);

  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    try {
      const file = e.target.files?.[0];
      if (!file) {
        return;
      }
      const { data } = await parseIonFile(file);
      console.log(data)
      dispatch(setRobotData(data));
    } catch (error) {
      console.error("Error parsing file:", error);
      alert("Error parsing file");
    } finally {
      setLoading(false);
    }
  }

  const renderButton = useMemo(() => {
    return loading ?
      <Spin />
      :
      <label htmlFor="ion-file" className="text-2xl font-bold border border-black px-4 py-2 cursor-pointer">Upload Ion File</label>
  }, [loading]);

  return (
    <Layout>
      {renderButton}
      <input type="file" onChange={handleFileChange} id="ion-file" name="ion-file" accept=".ion" className="hidden" />
      {data ?
        <div className="w-full mt-8 flex flex-col gap-4">
          <Metadata />
          <Topics />
        </div>
        :
        null
      }

    </Layout>
  )
}
