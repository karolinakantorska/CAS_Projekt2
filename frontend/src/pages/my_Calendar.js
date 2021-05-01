import CalendarResQueryUser from '../components/calendar/CalendarResQueryUser';
import RedirectNotLoggedin from '../components/main/RedirectNotLoggedin';

const my_calendar = ({ query }) => {
  return (
    <RedirectNotLoggedin>
      <CalendarResQueryUser guideId={query.guideId} tripId="0" />
    </RedirectNotLoggedin>
  );
};

export default my_calendar;
