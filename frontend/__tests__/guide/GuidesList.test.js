import { MockedProvider } from '@apollo/client/testing';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import GuideList from '../../src/components/guide/GuidesList';
import ALL_GUIDES_QUERY from '../../src/graphgl/queries/ALL_GUIDES_QUERY';
import CURRENT_USER_QUERY from '../../src/graphgl/queries/CURRENT_USER_QUERY';
import { fakeUser, fakeGuides, fakeGuidesList } from '../../src/lib/testsUtils';
/*
async function updateWrapper(wrapper, amount = 0) {
  await act(async () => {
    await wait(amount);
    wrapper.update();
  });
}
*/

describe('<GuideList />', () => {
  it('renders with proper while loading ', async () => {
    const mocks = [
      {
        request: { query: ALL_GUIDES_QUERY, variables: { permissions: 'GUIDE' } },
        result: { data: fakeGuidesList },
      },
    ];
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <GuideList />
      </MockedProvider>,
    );
    expect(wrapper.text()).toContain('Loading...');
  });
  it('renders with proper data ', async () => {
    const mocks = [
      {
        request: { query: CURRENT_USER_QUERY },
        result: { data: { currentUser: fakeUser } },
      },
      {
        request: { query: ALL_GUIDES_QUERY, variables: { permissions: 'GUIDE' } },
        result: { data: fakeGuidesList },
      },
    ];
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <GuideList />
      </MockedProvider>,
    );
    await wait();
    wrapper.update();
    await wait();
    wrapper.update();
    //await updateWrapper(wrapper);
    expect(
      wrapper.containsMatchingElement(
        <p>Speedy Gonzales</p>,
        <p>speady@gmail.com</p>,
        <p>Hallo...</p>,
      ),
    ).toBeTruthy();
    expect(
      wrapper.containsMatchingElement(
        <p>Olaf Olaf</p>,
        <p>olaf@gmail.com</p>,
        <p>Hallo...</p>,
      ),
    ).toBeTruthy();
    //console.log(wrapper.debug());
  });
});
