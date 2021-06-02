import BookingEdit from '../components/booking/BookingEdit';
import RedirectNotLoggedin from '../components/main/RedirectNotLoggedin';
const edit_entry = ({ query }) => {
  return (
    <RedirectNotLoggedin>
      <BookingEdit id={query.id} />
    </RedirectNotLoggedin>
  );
};

export default edit_entry;
