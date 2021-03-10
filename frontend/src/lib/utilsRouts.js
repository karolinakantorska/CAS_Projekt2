import Router from 'next/router';
export function routeToGuidesList() {
  Router.push({
    pathname: '/guides',
  });
}
export function routeToEditGuide(id) {
  Router.push({
    pathname: '/edit_guide',
    query: { id },
  });
}
export function routeToSignin() {
  Router.push({
    pathname: '/signin_page',
  });
}
export function routeToSignup() {
  Router.push({
    pathname: '/signup_page',
  });
}
export function routeToCalendar(guideId) {
  Router.push({
    pathname: '/calendar_booking',
    query: {
      guideId,
    },
  });
}
// Not used jet
export function routeToCalendarIfSignedIn(currentUserPermission, id) {
  console.log(currentUserPermission);
  if (currentUserPermission !== '') {
    routeToCalendar(id);
  } else {
    routeToSignin();
  }
}
export function routeToBookingConfirmation(
  day,
  selectedMonth,
  selectedYear,
  guideId,
  bookedTime,
) {
  Router.push({
    pathname: '/confirm_booking',
    query: {
      day,
      selectedMonth,
      selectedYear,
      guideId,
      bookedTime,
    },
  });
}
export function routeToBookingThanks(time, dayId, guideId) {
  Router.push({
    pathname: '/thank_you',
    query: {
      time,
      dayId,
      guideId,
    },
  });
}
export function routeToEditEntry(id) {
  Router.push({
    pathname: '/edit_entry',
    query: {
      id,
    },
  });
}
