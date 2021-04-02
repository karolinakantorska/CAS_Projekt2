import EmptyReservationsList from '../components/booking/EmptyReservationsList';
import RedirectWrongPermission from '../components/main/RedirectWrongPermission';
//Utils
import { permission } from '../lib/utils';

const change_info = () => (
  <RedirectWrongPermission requiredRole={permission.admin}>
    <EmptyReservationsList />
  </RedirectWrongPermission>
);

export default change_info;
