import EditTrip from '../components/trips/EditTrip';
import RedirectWrongPermission from '../components/main/RedirectWrongPermission';
//Utils
import { permission } from '../lib/utils';

const edit_trip = ({ query }) => (
  <RedirectWrongPermission requiredRole={permission.guide}>
    <EditTrip tripId={query.id} />
  </RedirectWrongPermission>
);

export default edit_trip;
