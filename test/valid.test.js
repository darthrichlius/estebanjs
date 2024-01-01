'use strinct';

const { verify, assertFn } = require('../index');

describe('Testing assert : SHOULD VALID FN', () => {
  it('the value should pass the assert function', () => {
    const asv = verify('').resolve(assertFn.is.string);
    expect(asv).toBe(true);
  });

  it('the value should NOT pass the assert function', () => {
    const asv = verify(5).reject(assertFn.is.string);
    expect(asv).toBe(true);
  });
});
