import historicData from "../data/historic.json";

export const availableYears = () => {
  return Object.keys(historicData);
};

export const availableMonthsForYear = (year: string) => {
  if (availableYears().includes(year)) {
    return Object.keys(historicData[year]);
  }
  console.error("This year does not exist :0");
};

export const availableDaysForMonth = (year: string, month: string) => {
  if (
    availableYears().includes(year) &&
    availableMonthsForYear(year)?.includes(month)
  ) {
    return Object.keys(historicData[year][month]["days"]);
  }
  console.error("This month does not exist for this year :0");
};

export const getDataForDay = (year: string, month: string, day: string) => {
  return historicData[year][month]["days"][day];
};

export const getDataForMonth = (year: string, month: string) => {
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

export const getDataForYear = (year: string) => {
  return Object.keys(historicData[year]).map((el) => {
    return {
      date: el,
      W: getDataForMonth(year, el).reduce(
        (tot: number, cur: Object) => tot + cur["W"],
        0
      ),
      mA: getDataForMonth(year, el).reduce(
        (tot: number, cur: Object) => tot + cur["mA"],
        0
      ),
    };
  });
};

export default historicData;
