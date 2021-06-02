import BookingConfirmation from '../components/booking/BookingConfirmation';
import RedirectNotLoggedin from '../components/main/RedirectNotLoggedin';
import { useHydratationFix } from '../lib/useHydratationFix';
const confirm = (props) => {
  const { query } = props;
  const hasMounted = useHydratationFix();
  if (!hasMounted) {
    return null;
  }
  return (
    <RedirectNotLoggedin>
      <BookingConfirmation props={query} />
    </RedirectNotLoggedin>
  );
};

export default confirm;
