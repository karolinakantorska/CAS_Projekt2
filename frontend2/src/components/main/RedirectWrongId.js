import { useCurrentUser } from '../../apollo/querries/useCurrentUser';
import ErrorGraphql from '../reusable/ErrorGraphql';
import Loading from '../reusable/LoadingBar';
import NotAllowedToEnter from '../main/NotAllowedToEnter';

export default function RedirectWrongId({ requiredId, children }) {
  console.log('requiredId', requiredId);
  const { loading, error, data } = useCurrentUser();
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorGraphql error={error} />;
  }
  if (data) {
    if (data.currentUser.id !== requiredId) {
      return (
        <NotAllowedToEnter
          redirectInfo={`You are not alowed to enter this site and edit this information!`}
        />
      );
    } else {
      return children;
    }
  }
}
