import EmptyReservationsList from '../components/booking/EmptyReservationsList';
import RedirectWrongPermission from '../components/main/RedirectWrongPermission';
//Utils
import { permission } from '../lib/utils';
import { useHydratationFix } from '../lib/useHydratationFix';

const change_info = () => {
  const hasMounted = useHydratationFix();
  if (!hasMounted) {
    return null;
  }
  return (
    <RedirectWrongPermission requiredRole={permission.admin}>
      <EmptyReservationsList />
    </RedirectWrongPermission>
  );
};

export default change_info;
