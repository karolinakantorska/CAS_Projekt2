import GuideTripsList from '../../components/trips/GuideTripsList';

export default function guide_trips({ query }) {
  return <GuideTripsList guideId={query.id}  />;
}
