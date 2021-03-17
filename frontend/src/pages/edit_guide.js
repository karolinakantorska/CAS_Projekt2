import EditGuide from '../components/guide/EditGuide';
import RedirectWrongPermission from '../components/main/RedirectWrongPermission';
//Utils
import { permission } from '../lib/utils';

const edit_guide = ({ query }) => (
  <RedirectWrongPermission requiredRole={permission.admin}>
    <EditGuide guideId={query.id} />
  </RedirectWrongPermission>
);

export default edit_guide;
