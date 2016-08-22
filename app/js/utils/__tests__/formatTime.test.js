jest.unmock('@utils/formatTime');

import formatTime from '@utils/formatTime';


describe('`formatTime()` - A function that returns a formatted string based on a numerical value', () => {
  fit('should take a number of seconds and return a string in the format of `hh:mm:ss`', () => {
    expect(formatTime(0)).toBe('00:00:00');
    expect(formatTime(24)).toBe('00:00:24');
    expect(formatTime(60)).toBe('00:01:00');
    expect(formatTime(72)).toBe('00:01:12');
    expect(formatTime(120)).toBe('00:02:00');
    expect(formatTime(654)).toBe('00:10:54');
    expect(formatTime(3017)).toBe('00:50:17');
    expect(formatTime(3600)).toBe('01:00:00');
    expect(formatTime(36543)).toBe('10:09:03');
    expect(formatTime(10000000000)).toBe('99:59:59');
  });
});
