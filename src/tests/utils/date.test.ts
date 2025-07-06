import { formatJoinDate } from '../../utils/date';

describe('formatJoinDate', () => {
  beforeEach(() => {
    // Mock current date to have consistent tests
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2023-12-15'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('formats date from today', () => {
    expect(formatJoinDate('2023-12-15')).toBe('today');
  });

  it('formats date from yesterday', () => {
    expect(formatJoinDate('2023-12-14')).toBe('yesterday');
  });

  it('formats date from days ago', () => {
    expect(formatJoinDate('2023-12-10')).toBe('5 days ago');
  });

  it('formats date from weeks ago', () => {
    expect(formatJoinDate('2023-12-01')).toBe('2 weeks ago');
  });

  it('formats date from months ago', () => {
    expect(formatJoinDate('2023-06-15')).toBe('6 months ago');
  });

  it('formats date from years ago', () => {
    expect(formatJoinDate('2021-12-15')).toBe('2 years ago');
  });

  it('handles invalid date strings', () => {
    expect(formatJoinDate('invalid-date')).toBe('invalid-date');
  });
});