import { MockedProvider } from '@apollo/client/testing';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import { useRouter } from 'next/router';
import BookingConfirmation from '../src/components/booking/BookingConfirmation';
import CURRENT_USER_QUERY from '../src/graphgl/queries/CURRENT_USER_QUERY';
import DAY_QUERY from '../src/graphgl/queries/DAY_QUERY';
import CREATE_DAY from '../src/graphgl/mutations/CREATE_DAY';
import CREATE_RESERVATION from '../src/graphgl/mutations/CREATE_RESERVATION';
import fakeUser from '../src/lib/utils';

const signedInMocksUser = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { currentUser: fakeUser } },
  },
];

const fakeReservation = {
  day: '12',
  month: 'September',
  year: '2020',
  guideId: '123',
  guideName: 'Oscar',
  guideSurname: 'Kowalski',
};

describe('<BookingConfirmation />', () => {
  xit('renders proper <BookingConfirmation /> when signed out', async () => {
    const wrapper = mount(
      <MockedProvider mocks={signedInMocksUser}>
        <BookingConfirmation />
      </MockedProvider>,
    );
    await wait();
    wrapper.update();
    console.log(wrapper.debug());
  });
});
