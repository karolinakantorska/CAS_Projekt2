import BookingCard from '../components/booking/BookingCard';
const edit_entry = (props) => {
  const { id } = props.query;

  return <BookingCard id={id} />;
};

export default edit_entry;
