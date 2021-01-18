import { MockedProvider } from '@apollo/client/testing';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import { useRouter } from 'next/router';
import BookingConfirmation from '../../src/components/booking/BookingConfirmation';
import CURRENT_USER_QUERY from '../../src/graphgl/queries/CURRENT_USER_QUERY';
import DAY_QUERY from '../../src/graphgl/queries/DAY_QUERY';
import CREATE_DAY from '../../src/graphgl/mutations/CREATE_DAY';
import CREATE_RESERVATION from '../../src/graphgl/mutations/CREATE_RESERVATION';
import {
  //fakeUser,
  fakeEmptyMonthReservations,
  fakeMonthReservations,
  //fakeMonthReservations2,
} from '../../src/lib/utils';
import { act } from 'react-dom/test-utils';

const fakeUser = {
  email: 'magic@gmail.com',
  id: '123',
  name: 'Magic',
  surname: 'Michael',
  permissions: 'USER',
};
const variablesQuerry = {
  year: '2021',
  month: 'Januar',
  day: '5',
  id: '123',
};
describe('<BookingConfirmation />', () => {
  xit("renders proper when the day doesn't exist in db ", async () => {
    const mocks = [
      {
        request: { query: CURRENT_USER_QUERY },
        result: { data: { currentUser: fakeUser } },
      },
      {
        request: {
          query: DAY_QUERY,
          variables: variablesQuerry,
        },
        result: {
          data: {
            days: [],
          },
        },
      },
    ];
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BookingConfirmation
          props={{
            day: '5',
            selectedMonth: 'Januar',
            selectedYear: '2021',
            guideId: '123',
            guideName: 'Filip',
            guideSurname: 'Konopny',
          }}
        />
      </MockedProvider>,
    );
    //expect(wrapper.text()).toContain('Loading...');
    //console.log(wrapper.debug());
    await wait();
    wrapper.update();
    await wait();
    wrapper.update();
    //await updateWrapper(wrapper);
    //console.log(wrapper.debug());
    expect(
      wrapper.containsMatchingElement(
        <p className="StyledText__StyledTextBody1-sc-1yfchkt-4 grvBvH">
          Your MTB Guide will be:
          <strong>Filip Konopny</strong>
        </p>,
        <p className="StyledText__StyledTextBody1-sc-1yfchkt-4 grvBvH">
          Booked Date:
          <strong>2021 / Januar / 5</strong>
        </p>,
      ),
    ).toBeTruthy();
    expect(
      wrapper.containsMatchingElement(
        <option value="Day Trip from 8.00 to 19.00">Day Trip from 8.00 to 19.00</option>,
        <option value="Morning Trip from 8.00 to 12.00">
          Morning Trip from 8.00 to 12.00
        </option>,
        <option value="Afternoon Trip from 13.30 to 19.00">
          Afternoon Trip from 13.30 to 19.00
        </option>,
      ),
    ).toBeTruthy();
  });
  xit('renders error state properly', async () => {
    const mocks = [
      {
        request: { query: CURRENT_USER_QUERY },
        result: { data: { currentUser: fakeUser } },
      },

      {
        request: {
          query: DAY_QUERY,
          variables: {
            year: '2021',
            month: 'Januar',
            day: '5',
            id: '123',
          },
        },
        error: new Error('An error occurred'),
      },
    ];
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BookingConfirmation
          props={{
            day: '5',
            selectedMonth: 'Januar',
            selectedYear: '2021',
            guideId: '123',
            guideName: 'Filip',
            guideSurname: 'Konopny',
          }}
        />
      </MockedProvider>,
    );
    await wait();
    wrapper.update();
    await wait();
    wrapper.update();
    //console.log(wrapper.debug());
    expect(
      wrapper.containsMatchingElement(
        <p>There was en error while booking, please try again later.</p>,
      ),
    ).toBeTruthy();
  });
});
