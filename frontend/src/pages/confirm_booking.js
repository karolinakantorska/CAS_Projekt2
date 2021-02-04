import BookingConfirmation from '../components/booking/BookingConfirmation';

const confirm = (props) => {
  const { query } = props;
  return <BookingConfirmation props={query} />;
};

export default confirm;
