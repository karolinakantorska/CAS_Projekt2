import OneTrip from '../components/trips/OneTrip';
import Home from '../components/main/Home';

const TripDetails = ({ query }) => {
  return <OneTrip tripId={query.tripId} />;
};

export default TripDetails;
