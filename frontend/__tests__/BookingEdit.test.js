import { MockedProvider } from '@apollo/client/testing';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import BookingEdit from '../src/components/booking/BookingEdit';
import RESERVATION_QUERY from '../src/graphgl/queries/RESERVATION_QUERY';

const fakeGuide = {};

describe('<BookingEdit />', () => {
  xit('renders with proper data while loading', async () => {
    const mocks = [
      {
        request: { query: RESERVATION_QUERY, variables: { id: '123' } },
        result: { data: {} },
      },
    ];
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <BookingEdit id={'123'} />
      </MockedProvider>,
    );
    console.log(wrapper.debug());
    expect(wrapper.text()).toContain('Loading...');
    //await wait();
    //wrapper.update();
    //console.log(wrapper.debug());
  });
  xit('renders with proper data', async () => {
    const mocks = [
      {
        request: { query: RESERVATION_QUERY, variables: { id: '123' } },
        result: { data: { reservation: fakeReservation } },
      },
    ];
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <BookingEdit id={'123'} />
      </MockedProvider>,
    );
    //console.log(wrapper.debug());

    //</MockedProvider>
    //await new Promise((resolve) => setTimeout(resolve, 0));
    //await wait();
    wrapper.update();
    console.log(wrapper.debug());
  });
});
