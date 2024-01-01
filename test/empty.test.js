'use strinct';

const { verify } = require('../index');

describe('Testing assert : SHOULD NOT/BE EMPTY', () => {
  // ########## STRING ########## //
  it('verify be empty string', () => {
    const asv = verify('').is.empty.string;
    expect(asv).toBe(true);
  });
  it('verify NOT be empty string', () => {
    const asv1 = verify('fef').is.not.empty.string;
    /* Before checking if empty, we check if it a string
      We do that because without that first check the assert verify have been
      '.not.empty' instead of '.not.empty.string'
    */
    const asv2 = verify([2]).is.not.empty.string;
    expect(asv1).toBe(true);
    expect(asv2).toBe(false);
  });

  // ########## POJO ########## //
  it('verify be empty pojo', () => {
    const asv1 = verify({}).is.empty.pojo;
    const asv2 = verify({}).is.empty.pojo;
    expect(asv1).toBe(true);
    expect(asv2).toBe(true);
  });
  it('verify NOT be empty pojo', () => {
    const straight = 10;
    const asv1 = verify({ hi: 5 }).is.not.empty.pojo;
    const asv2 = verify({ straight }).is.not.empty.pojo;
    expect(asv1).toBe(true);
    expect(asv2).toBe(true);
  });

  // ########## ARRAY ########## //
  it('verify be empty array', () => {
    const asv1 = verify([]).is.empty.array;
    // eslint-disable-next-line array-bracket-spacing
    const asv2 = verify([]).is.empty.array;
    expect(asv1).toBe(true);
    expect(asv2).toBe(true);
  });
  it('verify NOT be empty array', () => {
    const asv = verify([5, 'a']).is.not.empty.array;
    expect(asv).toBe(true);
  });
});
