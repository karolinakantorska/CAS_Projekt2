import AddGuide from '../components/guide/AddGuide';
import RedirectWrongPermission from '../components/main/RedirectWrongPermission';
//Utils
import { permission } from '../lib/utils';
import { useHydratationFix } from '../lib/useHydratationFix';

const add_guide = () => {
  const hasMounted = useHydratationFix();
  if (!hasMounted) {
    return null;
  }
  return (
    <RedirectWrongPermission requiredRole={permission.admin}>
   <AddGuide/>
    </RedirectWrongPermission>
  );
};

export default add_guide;
