import BookingEdit from '../components/booking/BookingEdit';
const edit_entry = (props) => {
  const { id } = props.query;

  return <BookingEdit id={id} />;
};

export default edit_entry;
