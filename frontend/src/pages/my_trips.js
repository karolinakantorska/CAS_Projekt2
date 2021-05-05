import CalendarBookedTrips from '../components/calendar/CalendarBookedTrips';

const my_trips = ({ query }) => {
  console.log('query', query);
  console.log('query.gastId', query.gastId);
  return <CalendarBookedTrips gastId={query.gastId} />;
};

export default my_trips;
