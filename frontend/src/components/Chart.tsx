import React, { useContext } from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  Legend,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DataContext } from "../App";
import {
  getDataForDay,
  getDataForMonth,
  getDataForYear,
} from "../util/historicDataTool";
import { TimeInterval } from "./ChooseDate";
import { format } from "date-fns";

const Chart = () => {
  const context = useContext(DataContext);

  const formatXAxisDay = (tick: string) => {
    return format(new Date(tick), "HH:mm");
  };

  return (
    <ResponsiveContainer width={"80%"} height={600}>
      <LineChart
        width={730}
        height={250}
        data={
          context.data.timeInterval === TimeInterval.DAILY
            ? getDataForDay(
                context.data.year,
                context.data.month,
                context.data.day
              )
            : context.data.timeInterval === TimeInterval.MONTHLY
            ? getDataForMonth(context.data.year, context.data.month)
            : getDataForYear(context.data.year)
        }
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickFormatter={
            context.data.timeInterval === TimeInterval.DAILY
              ? formatXAxisDay
              : undefined
          }
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="W" stroke="#8884d8" />
        <Line type="monotone" dataKey="mA" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
