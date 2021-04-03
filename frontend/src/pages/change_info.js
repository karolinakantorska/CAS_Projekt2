import ChangeInfo from '../components/Info/ChangeInfo';
import RedirectWrongPermission from '../components/main/RedirectWrongPermission';
//Utils
import { permission } from '../lib/utils';

const change_info = () => (
  <RedirectWrongPermission requiredRole={permission.admin}>
    <ChangeInfo />
  </RedirectWrongPermission>
);

export default change_info;
