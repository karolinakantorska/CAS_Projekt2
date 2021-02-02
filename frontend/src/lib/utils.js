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
export const regexCheckEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
export const regexCheckPassword = /^[^ ]{8,32}$/;
export const messageWrongEmail = `The password should be longer than 8 signs. Space is not alowed.`;
export const regexCheckName = /^.{2,12}$/;
export const messageWrongName = `The name must be longer than 2 and shorter than 12 signs.`;
export function addErrorMessage(textMessage) {
  const errorContainer = document.querySelector(`.error_div`);
  errorContainer.insertAdjacentHTML('beforeend', `<p>${textMessage}</p>`);
}
export function removeErrorMessage() {
  document.querySelector(`.error_div`).innerHTML = '';
}
//
//BookingConfirmation

export const chooseWholeDay = 'Day Trip from 8.00 to 19.00';
export const chooseMorning = 'Morning Trip from 8.00 to 12.00';
export const chooseAfternoon = 'Afternoon Trip from 13.30 to 19.00';
