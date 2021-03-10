import CalendarResQueryUser from '../components/calendar/CalendarResQueryUser';

const calendar_booking = ({ query }) => {
  return <CalendarResQueryUser guideId={query.guideId} />;
};

export default calendar_booking;
