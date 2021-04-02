import Router from 'next/router';
export function routeBack() {
  Router.back();
}
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

export function routeToGuideDetailsIfSignedIn(currentUserPermission, id) {
  if (currentUserPermission !== '') {
    routeToGuideDetails(id);
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
export function routeToTripDetails(tripId) {
  Router.push({
    pathname: `/trip_details`,
    query: {
      tripId,
    },
  });
}
export function routeToTripList(guideId) {
  Router.push({
    pathname: '/trips',
    query: {
      guideId,
    },
  });
}

export function routeToGuideDetails(guideId) {
  Router.push({
    pathname: `/guide_details`,
    query: {
      guideId,
    },
  });
}
export function routeToEditTrip(id) {
  Router.push({
    pathname: '/edit_trip',
    query: { id },
  });
}
