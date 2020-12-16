import { MockedProvider } from '@apollo/client/testing';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import wait from 'waait';
import User from '../src/components/main/User';
import CURRENT_USER_QUERY from '../src/graphgl/queries/CURRENT_USER_QUERY';

const fakeUser = {
  __typename: 'User',
  email: 'karolina@gmail.com',
  id: 'ckh3n5iv4b8i40946t49ut2ig',
  name: 'karolina',
  permissions: 'ADMIN',
};

describe('<User />', () => {
  xit('renders with proper while loading', async () => {
    const mocks = [
      {
        request: { query: CURRENT_USER_QUERY },
        result: { data: { currentUser: fakeUser } },
      },
    ];
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <User />
      </MockedProvider>,
    );
    //console.log(wrapper.debug());
    expect(wrapper.text()).toContain('Loading...');
  });
  xit('renders with proper data', async () => {
    const mocks = [
      {
        request: { query: CURRENT_USER_QUERY },
        result: { data: { currentUser: fakeUser } },
      },
    ];
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <User />
      </MockedProvider>,
    );
    //console.log(wrapper.debug());
    //await wait();
    //wrapper.update();
    //console.log(wrapper.debug());
  });
});
