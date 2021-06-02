
import CalendarResQueryUser from '../../components/calendar/CalendarResQueryUser';
import RedirectNotLoggedin from '../../components/main/RedirectNotLoggedin';
import { useHydratationFix } from '../../lib/useHydratationFix';

export default function calendar_booking({query}) {
    const hasMounted = useHydratationFix();
    if (!hasMounted) {
      return null;
    }
  return (
    <RedirectNotLoggedin>
      <CalendarResQueryUser guideId={query.id} tripId={query.tripId} />
    </RedirectNotLoggedin>
  );
}

