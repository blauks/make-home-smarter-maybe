import React from "react";

type SelectType<T> = {
  name: string;
  chosen: string;
  list: string[] | undefined;
  changeState: (data: string) => T;
};

const Select = <T,>(props: SelectType<T>) => {
  return (
    <select
      name={props.name}
      value={props.chosen}
      onChange={(e) => props.changeState(e.currentTarget.value)}
    >
      {props.list?.map((e, i) => {
        return (
          <option value={e} key={i}>
            {e}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
