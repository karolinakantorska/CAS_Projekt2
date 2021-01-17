import Entry from '../../src/components/calendar/Entry';
import { shallow, mount } from 'enzyme';
import toJSON from 'enzyme-to-json';

// userName is the user who booked the appointment

describe('<Entry/>', () => {
  xit('renders proper for GUIDE', () => {
    const wrapper = mount(
      <Entry
        id="1"
        time="AM"
        userName="Michal"
        userEmail="michal@gmail.com"
        currentUserPermission="GUIDE"
        currentUserName="Kamil"
        guideName="Filip"
      />,
    );
    console.log(wrapper.debug());
    expect(toJSON(wrapper)).toMatchSnapshot();
    /*
    expect(
      wrapper.containsMatchingElement(
        <p>Gast: Michal</p>,
        <p>Email: michal@gmail.com</p>,
      ),
    ).toBeTruthy();
    */
  });
  xit('renders proper for USER', () => {
    const wrapper = mount(
      <Entry
        id="1"
        time="AM"
        userName="Michal"
        userEmail="michal@gmail.com"
        currentUserPermission="USER"
        currentUserName="Kamil"
        guideName="Filip"
      />,
    );
    console.log(wrapper.debug());
    expect(toJSON(wrapper)).toMatchSnapshot();
    expect(wrapper.containsMatchingElement(<span>Booked!</span>)).toBeTruthy();
  });
  xit('renders proper for USER own bookings', () => {
    const wrapper = mount(
      <Entry
        id="1"
        time="PM"
        userName="Kamil"
        userEmail="michal@gmail.com"
        currentUserPermission="USER"
        currentUserName="Kamil"
        guideName="Filip"
      />,
    );
    console.log(wrapper.debug());
    expect(toJSON(wrapper)).toMatchSnapshot();
    expect(wrapper.containsMatchingElement(<span>Your booking!</span>)).toBeTruthy();
  });
  xit('renders proper for GUIDE holiday', () => {
    const wrapper = mount(
      <Entry
        id="1"
        time="DAY"
        userName="Filip"
        userEmail="michal@gmail.com"
        currentUserPermission="GUIDE"
        currentUserName="Kamil"
        guideName="Filip"
      />,
    );
    console.log(wrapper.debug());
    expect(toJSON(wrapper)).toMatchSnapshot();
    expect(wrapper.containsMatchingElement(<p>Free!</p>)).toBeTruthy();
  });
});
