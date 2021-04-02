import CalendarBookedTrips from '../components/calendar/CalendarBookedTrips';

const my_trips = ({ query }) => {
  return <CalendarBookedTrips gastId={query.gastId} />;
};

export default my_trips;
