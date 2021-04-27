import BookingThankYou from '../components/booking/BookingThankYou';
import RedirectNotLoggedin from '../components/main/RedirectNotLoggedin';

const thankYou = ({ query }) => {
  return (
    <RedirectNotLoggedin>
      <BookingThankYou props={query} />
    </RedirectNotLoggedin>
  );
};
export default thankYou;
