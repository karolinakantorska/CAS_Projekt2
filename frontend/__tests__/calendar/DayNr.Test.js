import React from 'react';

import { render } from '@testing-library/react';

import StyledNrSpan from '../../src/components/calendar/DayNr';

/*
const dayOfMonth = '5';

test('confirm the number of the day renders', () => {
  const { getByText } = render(
    <StyledNrSpan>{dayOfMonth}</StyledNrSpan>,
  );
  expect(getByText(dayOfMonth)).toBeInTheDocument();
});
*/
describe('true is truthy and false is falsy', () => {
  test('true is truthy', () => {
    expect(true).toBe(true);
  });

  test('false is falsy', () => {
    expect(false).toBe(false);
  });
});
/*
describe('StyledNrSpan', () => {
  test('renders StyledNrSpan component', () => {
    render(<StyledNrSpan />);
    screen.debug();
  });
});
*/
