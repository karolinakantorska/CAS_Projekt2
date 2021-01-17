import { MockedProvider } from '@apollo/client/testing';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import Home from '../../src/components/main/Home';
import CURRENT_USER_QUERY from '../../src/graphgl/queries/CURRENT_USER_QUERY';

const notSignedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { currentUser: null } },
  },
];

describe('<Home />', () => {
  const wrapper = mount(
    <MockedProvider mocks={notSignedInMocks}>
      <Home />
    </MockedProvider>,
  );
  xit('renders proper button', async () => {
    //console.log(wrapper.debug());
    await wait();
    wrapper.update();
    expect(
      wrapper.containsMatchingElement(<a>Find the coolest MTB Guide!</a>),
    ).toBeTruthy();
  });
});
