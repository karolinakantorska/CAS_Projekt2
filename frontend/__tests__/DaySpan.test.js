import { MockedProvider } from '@apollo/client/testing';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import DaySpan from '../src/components/calendar/DayNr';
import fakeGuide from '../src/lib/utils';

const fakeReservation = {
  __typename: 'Reservation',
  id: 'cki61cvx81i560952hc0jcwfh',
  time: 'AM',
  userEmail: 'marian@gmail.com',
  userName: 'marian',
};
const fakeHandleBooking = jest.fn();

describe('DaySpan', () => {
  xit('renders and displays correctly', () => {
    const wrapper = mount(
      <DaySpan
        reservation={fakeReservation}
        dayOfMonth="17"
        highlight={false}
        handleBooking={fakeHandleBooking}
        currentUserPermission="USER"
        dayInThePast="dayInThePast"
      />,
    );
    //console.log(wrapper.debug());
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
