import CalendarResQueryUser from '../../components/calendar/CalendarResQueryUser';
import RedirectNotLoggedin from '../../components/main/RedirectNotLoggedin';
import { useHydratationFix } from '../../lib/useHydratationFix';

export default function my_calendar({ query }) {
    const hasMounted = useHydratationFix();
    if (!hasMounted) {
      return null;
    }
  return (
    <RedirectNotLoggedin>
      <CalendarResQueryUser guideId={query.id} tripId="0" />
    </RedirectNotLoggedin>
  );
}
