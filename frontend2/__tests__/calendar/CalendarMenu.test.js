import { mount } from 'enzyme';
import CalendarMenu from '../../components/calendar/CalendarMenu';

const fakeMonthChange = jest.fn();
const fakeYearChange = jest.fn();
 

describe('CalendarMenu', () => {
  it('renders and displays correctly', () => {
    const wrapper = mount(
      <CalendarMenu
        currentYear="2020"
        currentMonth="December"
        selectedYear="2021"
        selectedMonth="Januar"
        handleMonthChange={fakeMonthChange}
        handleYearChange={fakeYearChange}
      />,
    );
    //console.log(wrapper.debug());
    expect(wrapper.containsMatchingElement(<div>Januar</div>)).toBeTruthy();
  });
  it('renders and displays correctly in current month', () => {
    const wrapper = mount(
      <CalendarMenu
        currentYear="2020"
        currentMonth="December"
        selectedYear="2020"
        selectedMonth="December"
        handleMonthChange={fakeMonthChange}
        handleYearChange={fakeYearChange}
      />,
    );
    //console.log(wrapper.debug());
    expect(wrapper.containsMatchingElement(<div>December</div>)).toBeTruthy();
    const button = wrapper.find('button');
    const buttonInactive = button.find({ disabled: true });
    expect(buttonInactive).toBeTruthy;
  });
});
