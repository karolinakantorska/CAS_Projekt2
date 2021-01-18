import { MockedProvider } from '@apollo/client/testing';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import EditGuide from '../../src/components/guide/EditGuide';
import ONE_USER_QUERY from '../../src/graphgl/queries/ONE_USER_QUERY';
import UPDATE_GUIDE from '../../src/graphgl/mutations/UPDATE_GUIDE';
import { fakeOneUser } from '../../src/lib/utils';

describe('<EditGuide />', () => {
  xit('renders with proper while loading', async () => {
    const mocks = [
      {
        request: { query: ONE_USER_QUERY, variables: { id: '123' } },
        result: { data: fakeOneUser },
      },
    ];
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <EditGuide id={'123'} />
      </MockedProvider>,
    );
    console.log(wrapper.debug());
    expect(wrapper.text()).toContain('Loading...');
  });
  xit('updates proper data after loading proper data', async () => {
    const mocks = [
      {
        request: { query: ONE_USER_QUERY, variables: { id: '123' } },
        result: { data: fakeOneUser },
      },
    ];
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <EditGuide id={'123'} />
      </MockedProvider>,
    );
    await wait();
    wrapper.update();
    expect(toJSON(wrapper.find('img'))).toMatchSnapshot();
    expect(toJSON(wrapper.find('[data-testid="ButtonEdit"]'))).toMatchSnapshot();
    expect(toJSON(wrapper.find('[data-testid="ButtonCancel"]'))).toMatchSnapshot();
    expect(wrapper.containsMatchingElement(<span>Olaf</span>)).toBeTruthy();
    expect(wrapper.containsMatchingElement(<span>Olafski</span>)).toBeTruthy();
    expect(wrapper.containsMatchingElement(<span>olaf@gmail.com</span>)).toBeTruthy();
    expect(wrapper.containsMatchingElement(<span>Hallo</span>)).toBeTruthy();
  });
  // works only when tested separately
  xit('Errors while not geting data', async () => {
    const mocks = [
      {
        request: { query: ONE_USER_QUERY, variables: { id: '123' } },
        error: new Error('User not found'),
      },
    ];
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <EditGuide id={'123'} />
      </MockedProvider>,
    );
    await wait();
    wrapper.update();
    console.log(wrapper.debug());
    expect(wrapper.text()).toContain('No Guide Found.');
    const errorMessage = wrapper.find('[data-test="graphql-error"]');
  });
});
