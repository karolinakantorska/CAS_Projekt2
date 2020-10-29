export const weekDaysEN = () => {
  const week = [];
  for (let i = 0; i < 7; i++) {
    week.push(
      new Date(2010, 0, 4 + i).toLocaleString("en-GB", { weekday: "short" })
    );
  }
  return week;
};

export const monthEN = () => {
  const month = [];
  for (let i = 0; i < 12; i++) {
    month.push(
      new Date(2010, 0 + i).toLocaleString("en-GB", { month: "long" })
    );
  }
  return month;
};
