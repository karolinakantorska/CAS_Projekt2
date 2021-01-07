import { MockedProvider } from '@apollo/client/testing';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import GuideList from '../src/components/guide/GuidesList';
import ALL_GUIDES_QUERY from '../src/graphgl/queries/ALL_GUIDES_QUERY';
import CURRENT_USER_QUERY from '../src/graphgl/queries/CURRENT_USER_QUERY';
import { fakeUser, fakeGuides, fakeMonthReservations } from '../src/lib/testsUtils';

const signedInMocksUser = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { currentUser: fakeUser } },
  },
];

describe('<GuideList />', () => {
  xit('renders with proper while loading ', async () => {
    const mocks = [
      {
        request: { query: ALL_GUIDES_QUERY, variables: { permissions: 'GUIDE' } },
        result: { data: {} },
      },
    ];
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <GuideList />
      </MockedProvider>,
    );
    expect(wrapper.text()).toContain('Loading...');
  });
  xit('renders with proper data ', async () => {
    const mocks = [
      {
        request: { query: ALL_GUIDES_QUERY, variables: { permissions: 'GUIDE' } },
        result: { data: { users: fakeGuides } },
      },
    ];
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <GuideList />
      </MockedProvider>,
    );
    await wait();
    wrapper.update();
    console.log(wrapper.debug());
  });
});
