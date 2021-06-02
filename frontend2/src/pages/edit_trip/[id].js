import EditTrip from '../../components/trips/EditTrip';
import RedirectWrongId from '../../components/main/RedirectWrongId';
//Utils
import { permission } from '../../lib/utils';

export default function edit_trip({ query }) {
  return (
    <RedirectWrongId requiredId={query.guideId}>
      <EditTrip tripId={query.id} />
    </RedirectWrongId>
  );
}
