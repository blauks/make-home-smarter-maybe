import React, { useState } from "react";
import { format } from "date-fns";
import ChooseDate, { TimeInterval } from "./components/ChooseDate";
import Chart from "./components/Chart";

type DataStateType = {
  timeInterval: TimeInterval;
  year: string;
  month: string;
  day: string;
};

type DataContextType = {
  data: DataStateType;
  updateData: (value: DataStateType) => void;
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
});

const App = () => {
  const [data, setData] = useState(defaultDataState);

  const updateData = ({ timeInterval, year, month, day }: DataStateType) => {
    setData({ timeInterval, year, month, day });
  };

  return (
    <DataContext.Provider value={{ data, updateData }}>
      <div className="flex flex-col items-center justify-center h-full lg:flex-row">
        <ChooseDate />
        <Chart />
      </div>
    </DataContext.Provider>
  );
};

export default App;
