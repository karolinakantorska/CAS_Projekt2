import BookingThankYou from '../components/booking/BookingThankYou';

const thankYou = (props) => {
  console.log(props);
  return (
    <div>
      <BookingThankYou props={props.query} />;
    </div>
  );
};

export default thankYou;
///<BookingThankYou props={props.query} />;
