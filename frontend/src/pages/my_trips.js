import BookedTrips from '../components/booking/BookedTrips';

const my_trips = ({ query }) => {
  return <BookedTrips userId={query.userId} />;
};

export default my_trips;
