export const availableYears = (historicData: Object) => {
  return Object.keys(historicData);
};

export const availableMonthsForYear = (year: string, historicData: Object) => {
  if (availableYears(historicData).includes(year)) {
    return Object.keys(historicData[year]);
  }
  console.error("This year does not exist :0");
};

export const availableDaysForMonth = (
  year: string,
  month: string,
  historicData: Object
) => {
  if (
    availableYears(historicData).includes(year) &&
    availableMonthsForYear(year, historicData)?.includes(month)
  ) {
    return Object.keys(historicData[year][month]["days"]);
  }
  console.error("This month does not exist for this year :0");
};

export const getDataForDay = (
  year: string,
  month: string,
  day: string,
  historicData: Object
) => {
  return historicData[year][month]["days"][day];
};

export const getDataForMonth = (
  year: string,
  month: string,
  historicData: Object
) => {
  return Object.keys(historicData[year][month]["days"]).map((el) => {
    const average = averageForDay(year, month, el, historicData);
    return {
      date: el,
      W: parseFloat(average.avgW),
      mA: parseFloat(average.avgmA),
    };
  });
};

export const getDataForYear = (year: string, historicData: Object) => {
  return Object.keys(historicData[year]).map((el) => {
    return {
      date: el,
      W: parseFloat(
        getDataForMonth(year, el, historicData)
          .reduce((tot: number, cur: Object) => tot + cur["W"], 0)
          .toFixed(2)
      ),
      mA: parseFloat(
        getDataForMonth(year, el, historicData)
          .reduce((tot: number, cur: Object) => tot + cur["mA"], 0)
          .toFixed(2)
      ),
    };
  });
};

export const averageForDay = (
  year: string,
  month: string,
  day: string,
  historicData: Object
) => {
  // Or D-Day for short :)
  const dataDay = getDataForDay(year, month, day, historicData);
  return {
    avgW: averageW(dataDay),
    avgmA: averageMA(dataDay),
  };
};

export const averageForMonth = (
  year: string,
  month: string,
  historicData: Object
) => {
  const dMonth = getDataForMonth(year, month, historicData);
  return {
    avgW: averageW(dMonth),
    avgmA: averageMA(dMonth),
  };
};

export const averageForYear = (year: string, historicData: Object) => {
  const dYear = getDataForYear(year, historicData);
  return {
    avgW: averageW(dYear),
    avgmA: averageMA(dYear),
  };
};

const averageW = (data: Array<Object>) => {
  return (
    data.reduce((tot: number, cur: Object) => tot + cur["W"], 0) /
    Object.keys(data).length
  ).toFixed(2);
};

const averageMA = (data: Array<Object>) => {
  return (
    data.reduce((tot: number, cur: Object) => tot + cur["mA"], 0) /
    Object.keys(data).length
  ).toFixed(2);
};
