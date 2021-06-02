import EditGuide from '../../components/guide/EditGuide';
import RedirectWrongPermission from '../../components/main/RedirectWrongPermission';
//Utils
import { permission } from '../../lib/utils';
import { useHydratationFix } from '../../lib/useHydratationFix';

export default function edit_guide({ query }) {
  console.log('query.id', query.id);
    const hasMounted = useHydratationFix();
    if (!hasMounted) {
      return null;
    }
  return (
    <RedirectWrongPermission requiredRole={permission.admin}>
      <EditGuide guideId={query.id} />
    </RedirectWrongPermission>
  );
 
}
