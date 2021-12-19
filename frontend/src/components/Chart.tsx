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
import { format, parseISO } from "date-fns";

const Chart = () => {
  const context = useContext(DataContext);

  const formatXAxisDay = (tick: string) => {
    return format(new Date(parseISO(tick)), "HH:mm");
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
                context.data.day,
                context.historicData
              )
            : context.data.timeInterval === TimeInterval.MONTHLY
            ? getDataForMonth(
                context.data.year,
                context.data.month,
                context.historicData
              )
            : getDataForYear(context.data.year, context.historicData)
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
        <Line
          type="monotone"
          dataKey="W"
          name={
            context.data.timeInterval === TimeInterval.DAILY ? "W" : "Average W"
          }
          stroke="#8884d8"
        />
        <Line
          type="monotone"
          dataKey="mA"
          name={
            context.data.timeInterval === TimeInterval.DAILY
              ? "mA"
              : "Average mA"
          }
          stroke="#82ca9d"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
