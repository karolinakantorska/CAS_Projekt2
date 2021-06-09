import EditTrip from '../../components/trips/EditTrip';
import RedirectWrongId from '../../components/main/RedirectWrongId';
//Utils
import { useHydratationFix } from '../../lib/useHydratationFix';
export default function edit_trip({ query }) {
      const hasMounted = useHydratationFix();
      if (!hasMounted) {
        return null;
      }
  return (
    <RedirectWrongId requiredId={query.guideId}>
      <EditTrip tripId={query.id} />
    </RedirectWrongId>
  );
}
