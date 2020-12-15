import DayNr from '../src/components/calendar/DayNr';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
// 6 minuta filmu
const dayOfMonth = '5';
const highlight = true;

describe('DayNr', () => {
  const wrapper = shallow(<DayNr dayOfMonth={dayOfMonth} highlight={highlight} />);
  it('matches the schnapshot', () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it('renders and displays correctly', () => {
    console.log(wrapper.debug());
    expect(wrapper.text()).toBe('5');
    console.log(wrapper.text());
    //expect(wrapper.exists('.highlight')).to.equal(true);
  });
});
