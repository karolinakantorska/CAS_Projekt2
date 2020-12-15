import { MockedProvider } from '@apollo/client/testing';
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
  it.skip('renders with proper data', async () => {
    const wrapper = mount(<User />);
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
    console.log(wrapper.debug());
  });
});

describe('sample test', () => {
  it('works as expected', () => {
    expect(1).toEqual(1);
  });
});
