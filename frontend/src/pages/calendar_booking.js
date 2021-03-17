import CalendarResQueryUser from '../components/calendar/CalendarResQueryUser';
import RedirectNotLoggedin from '../components/main/RedirectNotLoggedin';

const calendar_booking = ({ query }) => {
  return (
    <RedirectNotLoggedin>
      <CalendarResQueryUser guideId={query.guideId} />
    </RedirectNotLoggedin>
  );
};

export default calendar_booking;
