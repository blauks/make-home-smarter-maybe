import React from "react";
import { TimeInterval } from "./ChooseDate";

type IntervalButtonType = {
  text: string;
  func: (data: TimeInterval) => void;
  value: TimeInterval;
  selected: boolean;
};

const IntervalButton = ({
  text,
  func,
  value,
  selected,
}: IntervalButtonType) => {
  return (
    <button
      onClick={() => func(value)}
      className={`text-xl ${selected ? "text-green-500" : "text-blue-600"}`}
    >
      {text}
    </button>
  );
};

export default IntervalButton;
