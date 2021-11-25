import { createDateInMiliseconds } from 'utils/functions';

const REFERENCE_DATE = new Date().getTime();
const DATE_IN_THE_PAST = new Date('2019-12-11 12:00:00');

test('should return current date if no argument passed', () => {
  const currentDate = createDateInMiliseconds();

  expect(currentDate).toBeGreaterThanOrEqual(REFERENCE_DATE);
});

test('should return date typed by user in miliseconds', () => {
  const dateTypedByUser = createDateInMiliseconds(DATE_IN_THE_PAST);

  expect(dateTypedByUser).toBeLessThan(REFERENCE_DATE);
});
