import { MockedProvider } from '@apollo/client/testing';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import Signin from '../src/components/signin_signout/Signin';
import CURRENT_USER_QUERY from '../src/graphgl/queries/CURRENT_USER_QUERY';
import SIGNIN_MUTATION from '../src/graphgl/mutations/SIGNIN_MUTATION';
import { fakeUser } from '../src/lib/testsUtils';

const notSignedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { currentUser: null } },
  },
];
describe('<Signin />', () => {
  xit('renders the sign in form to loged out users', async () => {
    const wrapper = mount(
      <MockedProvider mocks={notSignedInMocks}>
        <Signin />
      </MockedProvider>,
    );
    await wait();
    wrapper.update();
    expect(wrapper.containsMatchingElement(<a>Create new Account</a>)).toBeTruthy();
    expect(wrapper.containsMatchingElement(<a>Signin!</a>)).toBeTruthy();
  });
});
