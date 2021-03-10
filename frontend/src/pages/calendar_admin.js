import CalendarResQuery from '../components/calendar/CalendarResQueryAdmin';

const booking_admin = ({ query }) => {
  return <CalendarResQuery guideId={query.guideId} />;
};

export default booking_admin;
