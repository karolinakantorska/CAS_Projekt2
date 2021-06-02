import MyBookedTripsList from '../../components/booking/MyBookedTripsList';

export default function my_trips({ query }) {
  return <MyBookedTripsList gastId={query.id} />;
}
