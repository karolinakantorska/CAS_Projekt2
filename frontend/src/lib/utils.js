// permissions
export const permission = { admin: 'ADMIN', guide: 'GUIDE', user: 'USER' };
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
// form validation
export const regexCheckEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
export const regexCheckPassword = /^[^ ]{8,32}$/;
export const regexCheckName = /^.{2,12}$/;
export const messageWrongPassword = `The password should be longer than 8 signs. Space is not alowed.`;
export const messageWrongName = `The name must be longer than 2 and shorter than 12 signs.`;

export function validateForm(email, password, name = '12345678') {
  const errors = [];
  if (!regexCheckEmail.test(email) || email === '') {
    errors.push(`The: ${email} is not a valid email adresse.`);
  }
  if (!regexCheckPassword.test(password) || password === '') {
    errors.push(messageWrongPassword);
  }
  if (!regexCheckName.test(name) || name === '') {
    errors.push(messageWrongName);
  }
  return errors;
}
export function addErrorMessage(errors) {
  if (errors.length > 0) {
    const errorContainer = document.querySelector(`.error_div`);
    errors.map((error) =>
      errorContainer.insertAdjacentHTML('beforeend', `<p>${error}</p>`),
    );
  }
}
export function removeErrorMessage() {
  document.querySelector(`.error_div`).innerHTML = '';
}

export function validateFormBookingConfirmation(time) {
  if (!time || time === '') {
    return ['Please enter the time.'];
  }
  return [];
}
//BookingConfirmation
export const chooseWholeDay = 'Day Trip from 8.00 to 19.00';
export const chooseMorning = 'Morning Trip from 8.00 to 12.00';
export const chooseAfternoon = 'Afternoon Trip from 13.30 to 19.00';
