import ChangeInfo from '../components/Info/ChangeInfo';
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
      <ChangeInfo />
    </RedirectWrongPermission>
  );
};

export default change_info;
