import { MockedProvider } from '@apollo/client/testing';
import { mount } from 'enzyme';
import Signin from '../../components/signin_signout/Signin';

describe('<Signin />', () => {
  it('renders correctly ', async () => {
    const wrapper = mount(
      <MockedProvider addTypename={false}>
        <Signin />
      </MockedProvider>,
    );
    //console.log(wrapper.debug());
    expect(
      wrapper.containsMatchingElement(<span>Signin into account:</span>),
    ).toBeTruthy();
    expect(
      wrapper.containsMatchingElement(<span>Signin into account:</span>),
    ).toBeTruthy();
    expect(wrapper.text()).toContain('Signin into account:');
    expect(
      wrapper.containsMatchingElement(
        <input data-test="input-email" placeholder="Email" name="email" />,
      ),
    ).toBeTruthy();

    expect(
      wrapper.containsMatchingElement(
        <input placeholder="Password" type="password" name="password" />,
      ),
    ).toBeTruthy();

    expect(wrapper.containsMatchingElement(<span>Signin!</span>)).toBeTruthy();
    expect(wrapper.containsMatchingElement(<span>Create new Account</span>)).toBeTruthy();
  });
});
