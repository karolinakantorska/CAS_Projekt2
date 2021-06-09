import { useCurrentUser } from '../../apollo/querries/useCurrentUser';
import ErrorGraphql from '../reusable/ErrorGraphql';
import Loading from '../reusable/LoadingBar';
import Signin from '../signin_signout/Signin';
import { StyledContainer } from '../../styles/StyledContainer';

export default function RedirectNotLoggedin({ children }) {
  const { loading, error, data } = useCurrentUser();
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorGraphql error={error} />;
  }
  if (data) {
    if (!data) {
      return (
      <StyledContainer>
        <Signin redirectInfo={`Please login with proper account:`} />
      </StyledContainer>)
      
    } else {
      return children;
    }
  }
}
