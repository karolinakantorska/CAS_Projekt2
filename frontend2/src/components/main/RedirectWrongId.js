import { useCurrentUser } from '../../apollo/querries/useCurrentUser';
import ErrorGraphql from '../reusable/ErrorGraphql';
import Loading from '../reusable/LoadingBar';
import NotAllowedToEnter from '../main/NotAllowedToEnter';
import { StyledContainer } from '../../styles/StyledContainer';
import { noUser } from '../../lib/utils';

export default function RedirectWrongId({ requiredId, children }) {
  const { loading, error, data } = useCurrentUser();
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorGraphql error={error} />;
  }
  if (data) {
        const currentUser = data.currentUser ? data.currentUser : noUser;
    if (currentUser.id !== requiredId) {
      return (
        <StyledContainer>
          <NotAllowedToEnter
            redirectInfo={`You are not alowed to enter this site and edit this information!`}
          />
        </StyledContainer>
      );
    } else {
      return children;
    }
  }
}
