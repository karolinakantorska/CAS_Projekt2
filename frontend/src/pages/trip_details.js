import OneTrip from '../components/trips/OneTrip';

const TripDetails = ({ query }) => {
  return <OneTrip id={query.tripId} />;
};

export default TripDetails;
