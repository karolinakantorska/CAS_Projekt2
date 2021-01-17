import { MockedProvider } from '@apollo/client/testing';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import Calendar from '../../src/components/calendar/Calendar';
import CURRENT_USER_QUERY from '../../src/graphgl/queries/CURRENT_USER_QUERY';
import MONTH_RESERVATIONS_QUERY from '../../src/graphgl/queries/MONTH_RESERVATIONS_QUERY';
import { fakeUser, fakeMonthReservations3 } from '../../src/lib/testsUtils';

const signedInMocksUser = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { currentUser: fakeUser } },
  },
];
const fakeProps = {
  guideId: '123',
  guideName: 'name',
  guideSurname: 'surname',
  guidePhoto: 'photo.jpg',
};

describe('<Calendar />', () => {
  xit('renders with proper data', async () => {
    const mocks = [
      {
        request: {
          query: MONTH_RESERVATIONS_QUERY,
          variables: {
            year: '2020',
            month: 'December',
            guideID: 'ckh3n7algb8r50946cpug61su',
          },
        },
        result: { data: fakeMonthReservations3 },
      },
    ];
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <Calendar props={fakeProps} />
      </MockedProvider>,
    );
    await wait();
    wrapper.update();
    await wait();
    wrapper.update();
    console.log(wrapper.debug());
  });
});
