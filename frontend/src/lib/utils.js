import { routeToSignin, routeToCalendar } from '../lib/utilsRouts';
// permissions
export const permission = { admin: 'ADMIN', guide: 'GUIDE', user: 'USER' };

export function goToBookingPage(currentUserPermission, id) {
  console.log(currentUserPermission);
  if (currentUserPermission !== '') {
    routeToCalendar(id);
  } else {
    routeToSignin();
  }
}

function callback() {
  console.log('it is me callback');
}
