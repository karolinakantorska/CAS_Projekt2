import BookingGuide from "../components/BookingGuide";

const booking_guide = (props) => (
  <div>
    <BookingGuide id= {props.query.id}/>
  </div>
);

export default booking_guide;
