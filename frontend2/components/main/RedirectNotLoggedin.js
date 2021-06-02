import { useCurrentUser } from '../../apollo/querries/useCurrentUser';
import ErrorGraphql from '../reusable/ErrorGraphql';
import Loading from '../reusable/LoadingBar';
import Signin from '../signin_signout/Signin';

export default function RedirectNotLoggedin({ children }) {
  const { loading, error, data } = useCurrentUser();
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorGraphql error={error} />;
  }
  if (data) {
    if (!data.currentUser.permissions) {
      return <Signin redirectInfo={`Please login with proper account:`} />;
    } else {
      return children;
    }
  }
}
