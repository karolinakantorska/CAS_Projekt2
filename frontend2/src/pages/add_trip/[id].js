import AddTrip from '../../components/trips/AddTrip';
import RedirectWrongPermission from '../../components/main/RedirectWrongPermission';
//Utils
import { permission } from '../../lib/utils';
import { useHydratationFix } from '../../lib/useHydratationFix';

export default function add_trip({ query }) {
    const hasMounted = useHydratationFix();
    if (!hasMounted) {
      return null;
    }
  return (
    <RedirectWrongPermission requiredRole={permission.guide}>
      <AddTrip guideId={query.id} />
    </RedirectWrongPermission>
  ); 
}
