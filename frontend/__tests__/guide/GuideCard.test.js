import { MockedProvider } from '@apollo/client/testing';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import GuideCard from '../../src/components/guide/GuideCard';
import { fakeGuide, fakeAdmin } from '../../src/lib/testsUtils';

const fakePermissionUser = 'USER';
const fakePermissionGuide = 'GUIDE';
const fakePermissionAdmin = 'ADMIN';

describe('<GuideCard />', () => {
  xit('renders with proper for User', async () => {
    const wrapper = mount(
      <GuideCard currentUserPermission={fakePermissionUser} user={fakeGuide} />,
    );
    //console.log(wrapper.debug());
    expect(toJSON(wrapper.find('img'))).toMatchSnapshot();
    expect(wrapper.containsMatchingElement(<p>Olaf Olafski</p>)).toBeTruthy();
    expect(wrapper.containsMatchingElement(<p>olaf@gmail.com</p>)).toBeTruthy();
    expect(wrapper.containsMatchingElement(<p>Hallo</p>)).toBeTruthy();
    expect(wrapper.containsMatchingElement(<a>Book Me!</a>)).toBeTruthy();
  });
  xit('renders with proper for Guide', async () => {
    const wrapper = mount(
      <GuideCard currentUserPermission={fakePermissionGuide} user={fakeGuide} />,
    );
    console.log(wrapper.debug());
    expect(wrapper.containsMatchingElement(<p>Olaf Olafski</p>)).toBeTruthy();
    expect(wrapper.containsMatchingElement(<p>olaf@gmail.com</p>)).toBeTruthy();
    expect(wrapper.containsMatchingElement(<p>Hallo</p>)).toBeTruthy();
    expect(wrapper.containsMatchingElement(<a>Book Me!</a>)).toBeTruthy();
  });
  xit('renders with proper for Admin', async () => {
    const wrapper = mount(
      <GuideCard currentUserPermission={fakePermissionAdmin} user={fakeGuide} />,
    );
    console.log(wrapper.debug());
    expect(wrapper.containsMatchingElement(<p>Olaf Olafski</p>)).toBeTruthy();
    expect(wrapper.containsMatchingElement(<p>olaf@gmail.com</p>)).toBeTruthy();
    expect(wrapper.containsMatchingElement(<p>Hallo</p>)).toBeTruthy();
    expect(wrapper.containsMatchingElement(<a>Book Me!</a>)).toBeTruthy();
    expect(wrapper.containsMatchingElement(<a>Edit</a>)).toBeTruthy();
    expect(wrapper.containsMatchingElement(<a>Delete</a>)).toBeTruthy();
  });
});
