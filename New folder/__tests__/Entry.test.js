import React from 'react';
import { render, screen } from '@testing-library/react';
import Entry from '../components/Entry';

const props = {
  time: 'AM',
  userName: 'Julian',
  userEmail: 'julian@carlos.com',
  id: '00',
  currentUserPermission: 'USER',
};

describe('<Entry /> currentUserPermission: USER', () => {
  render(
    <Entry
      time="AM"
      userName="Julian"
      userEmail="julian@carlos.com"
      id="00"
      currentUserPermission="USER"
    />,
  );
  xit('renders Entry component', () => {
    screen.debug();
  });
  it('renders booked!', () => {
    expect(
      screen.getByText('booked!', { exact: false }),
    ).toBeInTheDocument();
  });
});

describe('<Entry /> currentUserPermission: GUIDE', () => {
  render(
    <Entry
      time="AM"
      userName="Julian"
      userEmail="julian@carlos.com"
      id="00"
      currentUserPermission="GUIDE"
    />,
  );
  it('renders users email: julian@carlos.com', () => {
    expect(
      screen.getByText('julian@carlos.com', { exact: false }),
    ).toBeInTheDocument();
  });
});