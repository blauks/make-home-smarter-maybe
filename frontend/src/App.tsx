import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import ChooseDate, { TimeInterval } from "./components/ChooseDate";
import Chart from "./components/Chart";
import Statistics from "./components/Statistics";

type DataStateType = {
  timeInterval: TimeInterval;
  year: string;
  month: string;
  day: string;
};

type DataContextType = {
  data: DataStateType;
  updateData: (value: DataStateType) => void;
  historicData: Object;
};

const today = new Date();

const defaultDataState = {
  timeInterval: TimeInterval.DAILY,
  year: format(today, "yyyy"),
  month: format(today, "LLLL"),
  day: format(today, "d"),
};

export const DataContext = React.createContext<DataContextType>({
  data: defaultDataState,
  updateData: () => {},
  historicData: {},
});

const App = () => {
  const [data, setData] = useState(defaultDataState);
  const [historicData, setHistoricData] = useState({});

  const updateData = ({ timeInterval, year, month, day }: DataStateType) => {
    setData({ timeInterval, year, month, day });
  };

  const recieveHistoricData = async () => {
    // Raspberry pi IP
    let resp = await fetch("http://192.168.1.44:1337/historic.json");
    await resp.json().then((data) => setHistoricData(data));
  };

  useEffect(() => {
    recieveHistoricData();
  }, []);

  // :DDDD Dette er fin kode :DDDD
  return Object.keys(historicData).length >= 1 ? (
    <DataContext.Provider value={{ data, updateData, historicData }}>
      <div className="flex flex-col items-center justify-center h-full lg:flex-row">
        <div className="flex flex-col justify-around h-1/3">
          <ChooseDate />
          <Statistics />
        </div>
        <Chart />
      </div>
    </DataContext.Provider>
  ) : (
    <p>Data not found</p>
  );
};

export default App;
