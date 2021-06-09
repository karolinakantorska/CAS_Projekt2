import { useCurrentUser } from '../../apollo/querries/useCurrentUser';
import ErrorGraphql from '../reusable/ErrorGraphql';
import Loading from '../reusable/LoadingBar';
import Signin from '../signin_signout/Signin';
import { StyledContainer } from '../../styles/StyledContainer';

export default function RedirectWrongPermission({ requiredRole, children }) {
  const { loading, error, data } = useCurrentUser();
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorGraphql error={error} />;
  }
  if (data) {
    if (data.currentUser.permissions !== requiredRole) {
      return (
        <StyledContainer>
          <Signin redirectInfo={`Please login with proper ${requiredRole} account:`} />
        </StyledContainer>
      );
    } else {
      return children;
    }
  }
}
