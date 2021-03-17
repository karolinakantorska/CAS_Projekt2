import BookingConfirmation from '../components/booking/BookingConfirmation';
import RedirectNotLoggedin from '../components/main/RedirectNotLoggedin';

const confirm = (props) => {
  const { query } = props;
  return (
    <RedirectNotLoggedin>
      <BookingConfirmation props={query} />
    </RedirectNotLoggedin>
  );
};

export default confirm;
