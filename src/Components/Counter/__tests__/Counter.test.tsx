import { render, screen } from '@testing-library/react';

import { Counter } from 'Components/Counter';
import { enums, constants } from 'constants/index';

const TEST_DIFFERENCE_FOR_SECONDS = 15;
const TEST_DATE_FOR_SECONDS =
  new Date().getTime() -
  TEST_DIFFERENCE_FOR_SECONDS * constants.ONE_SECOND_IN_MS;

const TEST_DIFFERENCE_FOR_MINUTES = 2;
const TEST_DATE_FOR_MINUTES =
  new Date().getTime() -
  TEST_DIFFERENCE_FOR_MINUTES * constants.ONE_MINUTE_IN_MS;

test('renders counter properly for seconds difference', async () => {
  render(<Counter lastSeen={TEST_DATE_FOR_SECONDS} />);
  const counterMessage = screen.getByText(
    `${TEST_DIFFERENCE_FOR_SECONDS} ${enums.CounterMessages.SECONDS_MESSAGE}`
  );
  expect(counterMessage).toBeInTheDocument();
});

test('renders counter properly for minutes difference', () => {
  render(<Counter lastSeen={TEST_DATE_FOR_MINUTES} />);
  const counterMessage = screen.getByText(
    `${TEST_DIFFERENCE_FOR_MINUTES} ${enums.CounterMessages.MINUTES_MESSAGE}`
  );
  expect(counterMessage).toBeInTheDocument();
});
