import BookingConfirmation from '../components/booking/BookingConfirmation';

const confirm = (props) => {
  const { query } = props;
  console.log(query);
  return (
    <div>
      <BookingConfirmation props={query} />
    </div>
  );
};

export default confirm;
