import { act } from 'react-dom/test-utils';
import { testHook } from '../../lib/testHookUtils';
import { useHandleTimeChange } from '../../lib/utilsBooking';
import {chooseWholeDay,chooseMorning,chooseAfternoon} from '../../lib/utilsBooking';

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
        target: { value: chooseWholeDay },
      });
    });
    expect(handleTimeChange.time).toBe('DAY');
  });
  it('useHandleTimeChange should update the value to AM when called with: "Morning Trip from 8.00 to 12.00"', function () {
    act(() => {
      handleTimeChange.handleTimeChange({
        target: { value: chooseMorning },
      });
    });
    expect(handleTimeChange.time).toBe('AM');
  });
  xit('useHandleTimeChange should update the value to PM when called with: "Afternoon Trip from 13.30 to 19.00"', function () {
    act(() => {
      handleTimeChange.handleTimeChange({
        target: { value: chooseAfternoon },
      });
    });
    expect(handleTimeChange.time).toBe('PM');
  });
});
