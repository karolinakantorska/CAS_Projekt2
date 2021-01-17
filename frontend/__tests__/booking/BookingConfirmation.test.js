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
  fakeUser,
  fakeEmptyMonthReservations,
  fakeMonthReservations,
  fakeMonthReservations2,
} from '../../src/lib/utils';

describe('<BookingConfirmation />', () => {
  xit('renders proper <BookingConfirmation /> ', async () => {
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
        result: {
          data: {
            days: [],
          },
        },
        // return fake data
        /*
        result: {
          data: fakeMonthReservations2,
        },
        */
      },
    ];
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BookingConfirmation
          props={{
            query: {
              day: '5',
              selectedMonth: 'Januar',
              selectedYear: '2021',
              guideId: '123',
              guideName: 'Filip',
              guideSurname: 'Konopny',
            },
          }}
        />
      </MockedProvider>,
    );
    //expect(wrapper.text()).toContain('Loading...');
    //console.log(wrapper.debug());
    await wait();
    wrapper.update();
    console.log(wrapper.debug());
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
            query: {
              day: '5',
              selectedMonth: 'Januar',
              selectedYear: '2021',
              guideId: '123',
              guideName: 'Filip',
              guideSurname: 'Konopny',
            },
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
