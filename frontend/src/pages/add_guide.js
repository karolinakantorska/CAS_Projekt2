import AddGuide from '../components/guide/AddGuide';
import RedirectWrongPermission from '../components/main/RedirectWrongPermission';
//Utils
import { permission } from '../lib/utils';

const add_guide = () => (
  <RedirectWrongPermission requiredRole={permission.admin}>
    <AddGuide />
  </RedirectWrongPermission>
);

export default add_guide;
