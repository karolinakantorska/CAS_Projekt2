import DayNr from '../../src/components/calendar/DayNr';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
// 6 minuta filmu
const dayOfMonth = '5';
const highlight = true;

describe('DayNr', () => {
  const wrapper = mount(<DayNr dayOfMonth={dayOfMonth} highlight={highlight} />);
  xit('matches the schnapshot', () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  xit('renders and displays correctly', () => {
    console.log(wrapper.debug());
    expect(wrapper.text()).toBe('5');
    expect(
      wrapper.containsMatchingElement(
        <span className="DayNr__StyledNrSpan-sc-183qoaa-0 hIIzUm highlight">5</span>,
      ),
    ).toBeTruthy();
  });
});
