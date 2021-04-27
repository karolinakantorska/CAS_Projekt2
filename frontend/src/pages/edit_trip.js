import EditTrip from '../components/trips/EditTrip';
import RedirectWrongId from '../components/main/RedirectWrongId';
//Utils
import { permission } from '../lib/utils';

const edit_trip = ({ query }) => (
  <RedirectWrongId requiredId={query.guideId}>
    <EditTrip tripId={query.id} />
  </RedirectWrongId>
);

export default edit_trip;
