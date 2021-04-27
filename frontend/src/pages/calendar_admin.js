import CalendarResQueryAdmin from '../components/calendar/CalendarResQueryAdmin';
import RedirectWrongPermission from '../components/main/RedirectWrongPermission';
//Utils
import { permission } from '../lib/utils';

const booking_admin = ({ query }) => {
  return (
    <RedirectWrongPermission requiredRole={permission.admin}>
      <CalendarResQueryAdmin guideId={query.guideId} tripId={query.tripId} />
    </RedirectWrongPermission>
  );
};

export default booking_admin;
