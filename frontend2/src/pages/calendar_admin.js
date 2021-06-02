import CalendarResQueryAdmin from '../components/calendar/CalendarResQueryAdmin';
import RedirectWrongPermission from '../components/main/RedirectWrongPermission';
//Utils
import { permission } from '../lib/utils';
import { useHydratationFix } from '../lib/useHydratationFix';

const booking_admin = ({ query }) => {
  const hasMounted = useHydratationFix();
  if (!hasMounted) {
    return null;
  }
  return (
    <RedirectWrongPermission requiredRole={permission.admin}>
      <CalendarResQueryAdmin guideId={query.guideId} tripId={query.tripId} />
    </RedirectWrongPermission>
  );
};

export default booking_admin;
