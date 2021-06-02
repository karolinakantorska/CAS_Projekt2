import OneTrip from '../components/trips/OneTrip';

const TripDetails = ({ query }) => {
  return <OneTrip tripId={query.tripId} />;
};

export default TripDetails;
