import { filterReservationsData } from '../../lib/utilsCalendar';
import {
  fakeMonthReservations,
  fakeMonthReservationsFilterResult,
} from '../../lib/testsUtils';

const guideId = 'ckmgerj54vizz0913pfe6uvu7';

describe('filterReservationsData function, filters out the reservations from other guides and leaves reservation from chosen guide', function () {
  let filtered = filterReservationsData(fakeMonthReservations, guideId);
  it('function result matches the fakeMonthReservationsFilterResult object', function () {
    expect(filtered).toMatchObject(fakeMonthReservationsFilterResult);
  });
  it('function result is an object', function () {
    expect(typeof filtered).toBe('object');
  });
  it('function result is an object containing number as an key, and array as an value', function () {
    expect(filtered).toEqual(
      expect.objectContaining({
        1: expect.any(Array),
      }),
    );
  });
  it('function result is an object not containing other guides Ids', function () {
    expect(filtered).toEqual(
      expect.not.objectContaining({
        1: expect.arrayContaining([
          {
            guide: {
              id: 'ckmggry7i1mrm0a32w5e2wqld',
            },
          },
        ]),
      }),
    );
  });
});
