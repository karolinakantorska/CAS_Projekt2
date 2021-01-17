import { MockedProvider } from '@apollo/client/testing';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import Nav from '../../src/components/main/Nav';
import CURRENT_USER_QUERY from '../../src/graphgl/queries/CURRENT_USER_QUERY';
import SIGNIN_MUTATION from '../../src/graphgl/mutations/SIGNIN_MUTATION';
import { fakeUser, fakeAdmin } from '../../src/lib/testsUtils';

const notSignedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { currentUser: null } },
  },
];
const signedInMocksUser = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { currentUser: fakeUser } },
  },
];
const signedInMocksAdmin = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { currentUser: fakeAdmin } },
  },
];

describe('<Nav />', () => {
  xit('renders proper <Nav /> when signed out', async () => {
    const wrapper = mount(
      <MockedProvider mocks={notSignedInMocks}>
        <Nav />
      </MockedProvider>,
    );
    await wait();
    wrapper.update();
    //console.log(wrapper.debug());
    const nav = wrapper.find('[data-testid="nav"]');
    //console.log(nav.debug());
    const navChildren = nav.find('a');
    expect(navChildren.children().length).toBe(4);
    expect(wrapper.containsMatchingElement(<a>User:</a>)).toBeTruthy();
    expect(wrapper.containsMatchingElement(<a>Home</a>)).toBeTruthy();
    expect(wrapper.containsMatchingElement(<a>MTB Guides</a>)).toBeTruthy();
  });
  xit('renders proper <Nav /> with user name when signed in as User', async () => {
    const wrapper = mount(
      <MockedProvider mocks={signedInMocksUser}>
        <Nav />
      </MockedProvider>,
    );
    await wait();
    wrapper.update();
    //console.log(wrapper.debug());
    const nav = wrapper.find('[data-test="nav"]');
    //console.log(nav.debug());
    const navChildren = nav.find('a');
    expect(navChildren.children().length).toBe(6);
    const navUserName = wrapper.find('a[data-test="a-userName"]');
    console.log(navUserName);
    expect(toJSON(navUserName)).toMatchSnapshot();
    //expect(wrapper.containsMatchingElement(<a>User: {fakeUser.name}</a>)).toBeTruthy();
    expect(wrapper.containsMatchingElement(<a>Home</a>)).toBeTruthy();
    expect(wrapper.containsMatchingElement(<a>MTB Guides</a>)).toBeTruthy();
  });

  xit('renders proper <Nav /> when signed in as Admin', async () => {
    const wrapper = mount(
      <MockedProvider mocks={signedInMocksAdmin}>
        <Nav />
      </MockedProvider>,
    );
    await wait();
    wrapper.update();
    console.log(wrapper.debug());
    const nav = wrapper.find('[data-test="nav"]');
    const navUserName = wrapper.find('a[data-test="a-userName"]');

    expect(toJSON(navUserName)).toMatchSnapshot();
    const navChildren = nav.find('a');
    expect(navChildren.children().length).toBe(7);
    //expect(wrapper.containsMatchingElement(<a>User: {fakeAdmin.name}</a>)).toBeTruthy();
    expect(wrapper.containsMatchingElement(<a>Add Guide</a>)).toBeTruthy();
    expect(wrapper.containsMatchingElement(<a>Home</a>)).toBeTruthy();
    expect(wrapper.containsMatchingElement(<a>MTB Guides</a>)).toBeTruthy();
  });
});
