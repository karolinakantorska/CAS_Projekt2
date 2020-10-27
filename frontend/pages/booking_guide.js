import Booking from '../components/Booking';

const booking_guide = (props) => (
  <div>
    <Booking id={props.query.id} />
  </div>
);

export default booking_guide;
