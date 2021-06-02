import OneTrip from '../../components/trips/OneTrip';

export default function trip({ query }) {
  return <OneTrip tripId={query.id} />;
}
