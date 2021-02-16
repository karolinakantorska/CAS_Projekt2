// permissions
export const permission = { admin: 'ADMIN', guide: 'GUIDE', user: 'USER' };
//BookingConfirmation
export const chooseWholeDay = 'Day Trip from 8.00 to 19.00';
export const chooseMorning = 'Morning Trip from 8.00 to 12.00';
export const chooseAfternoon = 'Afternoon Trip from 13.30 to 19.00';
// calendar
export const weekDaysEN = () => {
  const week = [];
  for (let i = 0; i < 7; i++) {
    week.push(
      new Date(2010, 0, 4 + i).toLocaleString('en-GB', {
        weekday: 'short',
      }),
    );
  }
  return week;
};
