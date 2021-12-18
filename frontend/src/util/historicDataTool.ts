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
    return {
      date: el,
      W: historicData[year][month]["days"][el].reduce(
        (tot: number, cur: number) => tot + cur["W"],
        0
      ),
      mA: historicData[year][month]["days"][el].reduce(
        (tot: number, cur: number) => tot + cur["mA"],
        0
      ),
    };
  });
};

export const getDataForYear = (year: string, historicData: Object) => {
  return Object.keys(historicData[year]).map((el) => {
    return {
      date: el,
      W: getDataForMonth(year, el, historicData).reduce(
        (tot: number, cur: Object) => tot + cur["W"],
        0
      ),
      mA: getDataForMonth(year, el, historicData).reduce(
        (tot: number, cur: Object) => tot + cur["mA"],
        0
      ),
    };
  });
};
