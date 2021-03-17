import CalendarResQuery from '../components/calendar/CalendarResQueryAdmin';
import RedirectWrongPermission from '../components/main/RedirectWrongPermission';
//Utils
import { permission } from '../lib/utils';

const booking_admin = ({ query }) => {
  return (
    <RedirectWrongPermission requiredRole={permission.admin}>
      <CalendarResQuery guideId={query.guideId} />
    </RedirectWrongPermission>
  );
};

export default booking_admin;
