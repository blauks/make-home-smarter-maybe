import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../App";
import {
  averageForDay,
  averageForMonth,
  averageForYear,
} from "../util/historicDataTool";
import { TimeInterval } from "./ChooseDate";

const Statistics = () => {
  const context = useContext(DataContext);
  const [averages, setAverages] = useState({ avgW: "0", avgmA: "0" });

  useEffect(() => {
    switch (context.data.timeInterval) {
      case TimeInterval.YEARLY:
        setAverages(averageForYear(context.data.year, context.historicData));
        break;
      case TimeInterval.MONTHLY:
        setAverages(
          averageForMonth(
            context.data.year,
            context.data.month,
            context.historicData
          )
        );
        break;
      default:
        setAverages(
          averageForDay(
            context.data.year,
            context.data.month,
            context.data.day,
            context.historicData
          )
        );
    }
  }, [
    context.data.day,
    context.data.month,
    context.data.year,
    context.data.timeInterval,
    context.historicData,
  ]);

  return (
    <div>
      <h1 className="text-xl text-center">Statistics:</h1>
      <div className="flex justify-around text-center">
        <div>
          <h2>Avg. W:</h2>
          <p>{averages.avgW}</p>
        </div>
        <div>
          <h2>Avg. mA:</h2>
          <p>{averages.avgmA}</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
