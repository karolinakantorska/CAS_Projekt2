import BookingThankYou from '../components/booking/BookingThankYou';
import RedirectNotLoggedin from '../components/main/RedirectNotLoggedin';
import { useHydratationFix } from '../lib/useHydratationFix';
const thankYou = ({ query }) => {
  //const { query } = props;
  const hasMounted = useHydratationFix();
  if (!hasMounted) {
    return null;
  }
  return (
    <RedirectNotLoggedin>
      <BookingThankYou props={query} />
    </RedirectNotLoggedin>
  );
};
export default thankYou;
