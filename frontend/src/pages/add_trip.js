import AddTrip from '../components/trips/AddTrip';
import RedirectWrongPermission from '../components/main/RedirectWrongPermission';
//Utils
import { permission } from '../lib/utils';

const add_trip = () => (
  <RedirectWrongPermission requiredRole={permission.guide}>
    <AddTrip />
  </RedirectWrongPermission>
);

export default add_trip;
