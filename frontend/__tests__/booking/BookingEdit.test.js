import { MockedProvider } from '@apollo/client/testing';
import { mount } from 'enzyme';
import wait from 'waait';
import BookingEdit from '../../src/components/booking/BookingEdit';
import RESERVATION_QUERY from '../../src/graphgl/queries/RESERVATION_QUERY';
import { fakeReservation2 } from '../../src/lib/testsUtils';

describe('<BookingEdit />', () => {
  xit('renders proper while loading', async () => {
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
    expect(wrapper.text()).toContain('Loading...');
    //console.log(wrapper.debug());
  });
  xit('renders with proper data', async () => {
    const mocks = [
      {
        request: { query: RESERVATION_QUERY, variables: { id: '123' } },
        result: {
          data: fakeReservation2,
        },
      },
    ];
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <BookingEdit id={'123'} />
      </MockedProvider>,
    );
    //await new Promise((resolve) => setTimeout(resolve, 0));
    await wait();
    wrapper.update();
    const buttonClose = wrapper.find('button[data-test="a-close"]');
    <a className="StyledText__StyledTextButtonColor-sc-1yfchkt-8 fNuRFF">X</a>;
    expect(buttonClose.containsMatchingElement(<a>X</a>)).toBeTruthy();
    //console.log(buttonClose.debug());
    expect(
      wrapper.containsMatchingElement(<h4>Reservation on 21 Januar 2021</h4>),
    ).toBeTruthy();
    //console.log(fakeReservation2.reservation.userName);
    expect(
      wrapper.containsMatchingElement(
        <strong>{fakeReservation2.reservation.userName}</strong>,
        <strong>{fakeReservation2.reservation.nrOfPeople}</strong>,
        <strong>{fakeReservation2.reservation.description}</strong>,
        <strong>{fakeReservation2.reservation.userEmail}</strong>,
        <strong>{fakeReservation2.reservation.time}</strong>,
      ),
    ).toBeTruthy();
    const buttonDelete = wrapper.find('button[data-test="a-close"]');
    <a>X</a>;
    expect(buttonDelete.containsMatchingElement(<a>X</a>)).toBeTruthy();
    //console.log(wrapper.debug());
  });
  xit('renders error state properly', async () => {
    const mocks = [
      {
        request: { query: RESERVATION_QUERY, variables: { id: '123' } },
        error: new Error('An error occurred'),
      },
    ];
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <BookingEdit id={'123'} />
      </MockedProvider>,
    );
    await wait();
    wrapper.update();
    expect(wrapper.containsMatchingElement(<p>An error occurred</p>)).toBeTruthy();
  });
});
