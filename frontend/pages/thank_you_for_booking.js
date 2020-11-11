import BookingThankYou from '../components/booking/BookingThankYou';

const thankYou = (props) => {
  return (
    <div>
      <BookingThankYou props={props.query} />
    </div>
  );
};

export default thankYou;
