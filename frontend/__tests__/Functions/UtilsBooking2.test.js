import { act } from 'react-dom/test-utils';
import { testHook } from '../../src/lib/testHookUtils';
import { useHandleTimeChange } from '../../src/lib/utilsBooking';

let handleTimeChange;
beforeEach(() => {
  testHook(() => {
    handleTimeChange = useHandleTimeChange('AM');
  });
});

describe('switchBookedTime function takes reserved time and results free time slot correctly', function () {
  it('useHandleTimeChange results with object containing a string and a function', function () {
    expect(typeof handleTimeChange).toBe('object');
    expect(typeof handleTimeChange.handleTimeChange).toBe('function');
    expect(handleTimeChange).toEqual(
      expect.objectContaining({
        time: expect.any(String),
        handleTimeChange: expect.any(Function),
      }),
    );
  });
  it('useHandleTimeChange results with PM when initial value is AM', function () {
    expect(handleTimeChange.time).toBe('PM');
  });
  it('useHandleTimeChange should update the value to DAY when called with: "Day Trip from 8.00 to 19.00"', function () {
    act(() => {
      handleTimeChange.handleTimeChange({
        target: { value: 'Day Trip from 8.00 to 19.00' },
      });
    });
    expect(handleTimeChange.time).toBe('DAY');
  });
  it('useHandleTimeChange should update the value to AM when called with: "Morning Trip from 8.00 to 12.00"', function () {
    act(() => {
      handleTimeChange.handleTimeChange({
        target: { value: 'Morning Trip from 8.00 to 12.00' },
      });
    });
    expect(handleTimeChange.time).toBe('AM');
  });
  it('useHandleTimeChange should update the value to AM when called with: "Afternoon Trip from 13.30 to 19.00"', function () {
    act(() => {
      handleTimeChange.handleTimeChange({
        target: { value: 'Afternoon Trip from 13.30 to 19.00' },
      });
    });
    expect(handleTimeChange.time).toBe('PM');
  });
});
