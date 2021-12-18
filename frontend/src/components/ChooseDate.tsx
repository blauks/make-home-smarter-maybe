import React, { useContext } from "react";
import {
  availableYears,
  availableMonthsForYear,
  availableDaysForMonth,
} from "../util/historicDataTool";
import Select from "./Select";
import IntervalButton from "./IntervalButton";
import { DataContext } from "../App";

export enum TimeInterval {
  DAILY,
  MONTHLY,
  YEARLY,
}

const Chart = () => {
  // This works aslong as the script is running :))
  const context = useContext(DataContext);

  const updateTimeInterval = (interval: TimeInterval) => {
    context.updateData({ ...context.data, timeInterval: interval });
  };

  const updateYear = (year: string) => {
    context.updateData({ ...context.data, year });
  };

  const updateMonth = (month: string) => {
    context.updateData({ ...context.data, month });
  };

  const updateDay = (day: string) => {
    context.updateData({ ...context.data, day });
  };

  return (
    <div className="flex flex-col items-center w-64 text-center">
      <div className="w-full">
        <h1>Choose time interval:</h1>
        <div className="flex justify-around">
          <IntervalButton
            text="Yearly"
            func={updateTimeInterval}
            value={TimeInterval.YEARLY}
            selected={context.data.timeInterval === TimeInterval.YEARLY}
          />
          <IntervalButton
            text="Monthly"
            func={updateTimeInterval}
            value={TimeInterval.MONTHLY}
            selected={context.data.timeInterval === TimeInterval.MONTHLY}
          />
          <IntervalButton
            text="Daily"
            func={updateTimeInterval}
            value={TimeInterval.DAILY}
            selected={context.data.timeInterval === TimeInterval.DAILY}
          />
        </div>
      </div>
      <div className="flex mt-2">
        <Select
          name="year"
          chosen={context.data.year}
          list={availableYears()}
          changeState={updateYear}
        />

        {context.data.timeInterval <= TimeInterval.MONTHLY && (
          <Select
            name="month"
            chosen={context.data.month}
            list={availableMonthsForYear(context.data.year)}
            changeState={updateMonth}
          />
        )}

        {context.data.timeInterval === TimeInterval.DAILY && (
          <Select
            name="day"
            chosen={context.data.day}
            list={availableDaysForMonth(context.data.year, context.data.month)}
            changeState={updateDay}
          />
        )}
      </div>
    </div>
  );
};

export default Chart;
