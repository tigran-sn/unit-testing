import { isNumber, toBooleanProperty, toNumberProperty } from './type-coercion';

describe('isNumber Function', () => {
  it('should return true for numbers', () => {
    expect(isNumber(100)).toBe(true);
  });

  it('should return true for string numbers', () => {
    expect(isNumber('100')).toBe(true);
  });

  it('should return false for empty strings', () => {
    expect(isNumber('')).toBe(false);
  });

  it('should return false for strings containing non-numeric characters', () => {
    expect(isNumber('100abc')).toBe(false);
  });

  it('should return false for objects', () => {
    expect(isNumber({})).toBe(false);
  });

  it('should return false for null', () => {
    expect(isNumber(null)).toBe(false);
  });

  it('should return false for undefined', () => {
    expect(isNumber(undefined)).toBe(false);
  });

  it('should return false for arrays', () => {
    expect(isNumber([])).toBe(false);
  });
});

describe('toBooleanProperty Functions', () => {
  it('should return false for false', () => {
    expect(toBooleanProperty(false)).toBe(false);
  });

  it('should return true for true', () => {
    expect(toBooleanProperty(true)).toBe(true);
  });

  it('should return false for empty strings', () => {
    expect(toBooleanProperty('')).toBe(true);
  });

  it('should return false for strings containing non-numeric characters', () => {
    expect(toBooleanProperty('100abc')).toBe(true);
  });

  it('should return false for objects', () => {
    expect(toBooleanProperty({})).toBe(true);
  });

  it('should return false for null', () => {
    expect(toBooleanProperty(null)).toBe(false);
  });

  it('should return false for undefined', () => {
    expect(toBooleanProperty(undefined)).toBe(false);
  });
});

describe('toNumberProperty Functions', () => {
  it('should return 100 for 100', () => {
    expect(toNumberProperty(100)).toBe(100);
  });

  it('should return 100 for "100"', () => {
    expect(toNumberProperty('100')).toBe(100);
  });

  it('should return 0 for empty strings', () => {
    expect(toNumberProperty('')).toBe(0);
  });

  it('should return 0 for NaN', () => {
    expect(toNumberProperty(NaN)).toBe(0);
  });
});
