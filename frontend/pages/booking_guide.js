import BookingGuide from "../components/BookingGuide";

const booking_guide = (props) => (
  <div>
    <p>Add new MTB Guide</p>
    <BookingGuide id= {props.query.id}/>
  </div>
);

export default booking_guide;
