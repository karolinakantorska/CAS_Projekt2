import Entry from '../src/components/calendar/Entry';
import { shallow, mount } from 'enzyme';
import toJSON from 'enzyme-to-json';

const id = '1';
const time = 'AM';
const userName = 'Michal';
const userEmail = 'michal@gmail.com';

describe('<Entry/>', () => {
  xit('renders', () => {
    shallow(<Entry />);
  });
  xit('matches the schnapshot Guide', () => {
    const wrapper = shallow(
      <Entry id={id} time={time} userName={userName} currentUserPermission={'USER'} />,
    );
    console.log(wrapper.debug());
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  xit('matches the schnapshot User', () => {
    const wrapper = shallow(
      <Entry id={id} time={time} userName={userName} currentUserPermission={'GUIDE'} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
