import AddTrip from '../components/trips/AddTrip';
import RedirectWrongPermission from '../components/main/RedirectWrongPermission';
//Utils
import { permission } from '../lib/utils';

const add_trip = ({ query }) => (
  <RedirectWrongPermission requiredRole={permission.guide}>
    <AddTrip guideId={query.guideId} />
  </RedirectWrongPermission>
);

export default add_trip;
