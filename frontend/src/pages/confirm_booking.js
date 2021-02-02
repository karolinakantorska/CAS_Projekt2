import BookingConfirmation from '../components/booking/BookingConfirmation';

const confirm = (props) => {
  const { query } = props;

  return (
    <div>
      <BookingConfirmation props={query} />
    </div>
  );
};

export default confirm;
