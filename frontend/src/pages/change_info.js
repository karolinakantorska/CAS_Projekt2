import ChangeInfo from '../components/guide/ChangeInfo';
import RedirectWrongPermission from '../components/main/RedirectWrongPermission';
//Utils
import { permission } from '../lib/utils';

const change_info = () => (
  <RedirectWrongPermission requiredRole={permission.admin}>
    <ChangeInfo />
  </RedirectWrongPermission>
);

export default change_info;
