import TripsList from '../components/trips/TripsList';

const Trips = ({ query }) => {
  return <TripsList guideId={query.guideId} />;
};

export default Trips;
