import { MockedProvider } from '@apollo/client/testing';
import { mount } from 'enzyme';
import wait from 'waait';
import Signin from '../../src/components/signin_signout/Signin';
import CURRENT_USER_QUERY from '../../src/graphgl/queries/CURRENT_USER_QUERY';
import SIGNIN_MUTATION from '../../src/graphgl/mutations/SIGNIN_MUTATION';
import { fakeUser } from '../../src/lib/testsUtils';
import Router from 'next/router';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      prefetch: () => null,
      push() {},
    };
  },
}));

const notSignedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { currentUser: null } },
  },
];
const signedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { currentUser: fakeUser } },
  },
];

describe('<Signin />', () => {
  xit('renders proper while loading', async () => {
    const wrapper = mount(
      <MockedProvider mocks={notSignedInMocks} addTypename={false}>
        <Signin />
      </MockedProvider>,
    );
    expect(wrapper.text()).toContain('Loading...');
  });
  xit('renders the sign in form to loged out users', async () => {
    const wrapper = mount(
      <MockedProvider mocks={notSignedInMocks} addTypename={false}>
        <Signin />
      </MockedProvider>,
    );
    await wait();
    wrapper.update();
    //console.log(wrapper.debug());
    expect(wrapper.find('form').exists()).toBe(true);
    expect(wrapper.containsMatchingElement(<a>Create new Account</a>)).toBeTruthy();
    expect(wrapper.containsMatchingElement(<input placeholder="Email" />)).toBeTruthy();
    expect(
      wrapper.containsMatchingElement(<input placeholder="Password" />),
    ).toBeTruthy();
    expect(wrapper.containsMatchingElement(<a>Signin!</a>)).toBeTruthy();
  });
  xit('updates the input values', async () => {
    const wrapper = mount(
      <MockedProvider mocks={notSignedInMocks} addTypename={false}>
        <Signin></Signin>
      </MockedProvider>,
    );
    //await new Promise((resolve) => setTimeout(resolve, 0));
    await wait();
    wrapper.update();
    wrapper
      .find('input[data-test="input-email"]')
      .simulate('change', { target: { value: 'goofy@gmail.com' } });
    wrapper
      .find('input[data-test="input-pasword"]')
      .simulate('change', { target: { value: 'password' } });

    //console.log(wrapper.debug());
    expect(
      wrapper.containsMatchingElement(
        <input placeholder="Email" value="goofy@gmail.com" />,
      ),
    ).toBeTruthy();
    expect(
      wrapper.containsMatchingElement(<input placeholder="Password" value="password" />),
    ).toBeTruthy();
  });
});
