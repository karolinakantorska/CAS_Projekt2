import { MockedProvider } from '@apollo/client/testing';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import wait from 'waait';
import EditGuide from '../src/components/guide/EditGuide';
import ONE_USER_QUERY from '../src/graphgl/queries/ONE_USER_QUERY';

const fakeGuide = {
  __typename: 'User',
  description: '',
  email: '<fdgt',
  id: '123',
  name: 'Olaf',
  photo:
    'https://res.cloudinary.com/karolinauploads/image/upload/v1607349564/images/asxyln6ja3ahgfej1bci.jpg',
  surname: 'Olafski',
};

describe('<EditGuide />', () => {
  it('renders with proper while loading', async () => {
    const mocks = [
      {
        request: { query: ONE_USER_QUERY, variables: { id: '123' } },
        result: { data: { user: fakeGuide } },
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
  it('renders with proper data', async () => {
    const mocks = [
      {
        request: { query: ONE_USER_QUERY, variables: { id: '123' } },
        result: { data: { user: fakeGuide } },
      },
    ];
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <EditGuide id={'123'} />
      </MockedProvider>,
    );
    await wait();
    wrapper.update();
    //expect(toJson(wrapper)).toMatchSnapshot();
    //expect(toJson(wrapper.find('img'))).toMatchSnapschot();
    //expect(toJson(wrapper.find('[data-testid="ButtonEdit"]'))).toMatchSnapschot();

    //expect(toJson(wrapper.find('[data-testid="ButtonCancel"]'))).toMatchSnapschot();

    expect(wrapper.text().includes('Olaf')).toBe(true);
  });
});
