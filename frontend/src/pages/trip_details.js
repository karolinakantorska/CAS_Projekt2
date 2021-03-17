import OneTrip from '../components/trips/OneTrip';

const TripDetails = ({ query }) => {
  console.log(query);
  return <OneTrip id={query.tripId} />;
};

export default TripDetails;
