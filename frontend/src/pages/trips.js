import GuideTripsList from '../components/trips/GuideTripsList';

const Trips = ({ query }) => {
  return <GuideTripsList guideId={query.guideId} />;
};

export default Trips;
