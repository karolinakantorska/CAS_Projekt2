import { checkGuideAvability } from '../../src/lib/utilsBooking';

const noReservationsMock = { reservations: [] };
const dayReservationMock = { reservations: [{ time: 'DAY' }] };
const pmAndAmReservationMock = { reservations: [{ time: 'AM' }, { time: 'PM' }] };
const amReservationMock = { reservations: [{ time: 'AM' }] };
const pmReservationMock = { reservations: [{ time: 'PM' }] };
const chosenPMMock = 'PM';
const chosenAMMock = 'AM';

describe('checkGuideAvability function shows true and false correctly', function () {
  it('should be true if there is no reservations at this day', function () {
    let isAvaiable = checkGuideAvability(noReservationsMock, chosenPMMock);
    expect(isAvaiable).toBe(true);
  });
  it('should be true if there is AM reservation, and chossen time is PM', function () {
    let isAvaiable = checkGuideAvability(amReservationMock, chosenPMMock);
    expect(isAvaiable).toBe(true);
  });
  it('should be true if there is PM reservation, and chossen time is AM', function () {
    let isAvaiable = checkGuideAvability(pmReservationMock, chosenAMMock);
    expect(isAvaiable).toBe(true);
  });
  it('should be false if there is Day reservation', function () {
    let isAvaiable = checkGuideAvability(dayReservationMock, chosenAMMock);
    expect(isAvaiable).toBe(false);
  });
  it('should be false if there is Am and PM reservation', function () {
    let isAvaiable = checkGuideAvability(pmAndAmReservationMock, chosenAMMock);
    expect(isAvaiable).toBe(false);
  });
  it('should be false if there is PM reservation, and chossen time is PM', function () {
    let isAvaiable = checkGuideAvability(pmReservationMock, chosenPMMock);
    expect(isAvaiable).toBe(false);
  });
  it('should be false if there is AM reservation, and chossen time is AM', function () {
    let isAvaiable = checkGuideAvability(amReservationMock, chosenAMMock);
    expect(isAvaiable).toBe(false);
  });
});
