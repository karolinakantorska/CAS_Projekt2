import MyBookedTripsList from '../../components/booking/MyBookedTripsList';

export default function my_trips({ query }) {
  console.log('query.id', query.id);
  return <MyBookedTripsList gastId={query.id} />;
}
