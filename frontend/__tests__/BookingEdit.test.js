import { MockedProvider } from '@apollo/client/testing';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import BookingEdit from '../src/components/booking/BookingEdit';
import RESERVATION_QUERY from '../src/graphgl/queries/RESERVATION_QUERY';
import { fakeReservation } from '../src/lib/testsUtils';

describe('<BookingEdit />', () => {
  const wrapper = mount(<BookingEdit id={'123'} />);
  it('renders with proper data', async () => {
    const mock = [
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
    console.log(wrapper.debug());
  });
});