import React from 'react';
import { render } from '@testing-library/react';
import Nav from '../../src/components/main/Nav';

const currentUserPermission = 'USER';
const currentUserName = 'karola';

describe('Nav tests', () => {
  test('renders Nav component', () => {
    render(
      <Nav
        currentUserPermission={currentUserPermission}
        currentUserName={currentUserName}
      />,
    );
    screen.debug();
  });
});
