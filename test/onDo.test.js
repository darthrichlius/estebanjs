'use strinct';

const $$ = require('../index');

describe('Testing ASSERT ON...DO CALLBACK', () => {
  it('callback should work ', () => {
    let changed = false;
    $$.on('string_test').is.string.do((v) => {
      changed = true;
    });

    expect(changed).toBe(true);
  });

  it('is assertion (resolved) should work', () => {
    let changed = false;
    $$.on([12]).is.array.do((v) => {
      changed = true;
    });

    expect(changed).toBe(true);
  });

  it('is not assertion (resolved) should work', () => {
    let changed = false;
    $$.on([12]).is.not.empty.array.do((v) => {
      changed = true;
    });

    expect(changed).toBe(true);
  });

  it('is not assertion  (rejected)should work', () => {
    let changed = false;
    $$.on([]).is.not.empty.array.do((v) => {
      changed = true;
    });

    expect(changed).toBe(false);
  });

  it('resolve assertion should work', () => {
    let changed = false;
    $$.on([12]).resolve($$.assertFn.is.array).do((v) => {
      changed = true;
    });

    expect(changed).toBe(true);
  });

  it('is not assertion  (rejected)should work', () => {
    let changed = false;
    $$.on([12]).resolve($$.assertFn.is.empty.array).do((v) => {
      changed = true;
    });

    expect(changed).toBe(false);
  });
});
