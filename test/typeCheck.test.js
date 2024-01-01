'use strinct';

const $$ = require('../index');

const {
    dynamicTypeCheck
} = require('../index.js');

const FunctionComponent1 = () => "element1";
const FunctionComponent2 = () => "element2";

describe('Type Check - Should be FALSE', () => {
    it('testing is not undefined',  () => {
      const resp = dynamicTypeCheck(0, 'undefined');
      expect(resp).toBe(false);
    });

    it('testing is not boolean',  () => {
      const resp = dynamicTypeCheck('no', 'boolean');
      expect(resp).toBe(false);
    });

    it('testing is not number',  () => {
      const resp = dynamicTypeCheck('no', 'number');
      expect(resp).toBe(false);
    });

    it('testing is not string',  () => {
      const resp = dynamicTypeCheck(null, 'string');
      expect(resp).toBe(false);
    });

    it('testing is not bigint',  () => {
      const resp = dynamicTypeCheck('string', 'bigint');
      expect(resp).toBe(false);
    });

    it('testing is not symbol',  () => {
      const resp = dynamicTypeCheck('string', 'symbol');
      expect(resp).toBe(false);
    });

    it('testing is not undefined',  () => {
      const resp = dynamicTypeCheck('string', 'function');
      expect(resp).toBe(false);
    });

    it('testing is not undefined',  () => {
      const resp = dynamicTypeCheck('string', 'null');
      expect(resp).toBe(false);
    });

    it('testing is not undefined',  () => {
      const resp = dynamicTypeCheck('string', 'Array');
      expect(resp).toBe(false);
    });

    it('testing is not undefined',  () => {
      const resp = dynamicTypeCheck('string', 'Map');
      expect(resp).toBe(false);
    });

    it('testing is not undefined',  () => {
      const resp = dynamicTypeCheck('string', 'Set');
      expect(resp).toBe(false);
    });

    it('testing is not undefined',  () => {
      const resp = dynamicTypeCheck('string', 'WeakMap');
      expect(resp).toBe(false);
    });

    it('testing is not undefined',  () => {
      const resp = dynamicTypeCheck('string', 'WeakSet');
      expect(resp).toBe(false);
    });

    it('testing is not undefined',  () => {
      const resp = dynamicTypeCheck(5, 'ReactElement');
      expect(resp).toBe(false);
    });

    it('testing is not undefined',  () => {
      const resp = dynamicTypeCheck([FunctionComponent1, FunctionComponent2], 'Array<string>');
      expect(resp).toBe(false);
    });

    it('testing is not undefined',  () => {
      const resp = dynamicTypeCheck([5, 5], 'Array<ReactElement>');
      expect(resp).toBe(false);
    });

    it('testing is not undefined',  () => {
      const resp = dynamicTypeCheck([FunctionComponent1, FunctionComponent2], 'Collection<string>');
      expect(resp).toBe(false);
    });

    it('testing is not undefined',  () => {
      const resp = dynamicTypeCheck([FunctionComponent1, FunctionComponent2], 'Collection<ReactElement>');
      expect(resp).toBe(false);
    });
});


describe('Type Check - Should be TRUE', () => {
  it('testing is undefined',  () => {
    const resp = dynamicTypeCheck(undefined, 'undefined');
    expect(resp).toBe(true);
  });

  it('testing is boolean',  () => {
    const resp = dynamicTypeCheck(false, 'boolean');
    expect(resp).toBe(true);
  });

  it('testing is number',  () => {
    const resp = dynamicTypeCheck(5, 'number');
    expect(resp).toBe(true);
  });

  it('testing is string',  () => {
    const resp = dynamicTypeCheck('null', 'string');
    expect(resp).toBe(true);
  });

  it('testing is bigint',  () => {
    const resp = dynamicTypeCheck(BigInt(10000000000), 'bigint');
    expect(resp).toBe(true);
  });

  it('testing is symbol',  () => {
    const resp = dynamicTypeCheck(Symbol(), 'symbol');
    expect(resp).toBe(true);
  });

  it('testing is function',  () => {
    const resp = dynamicTypeCheck(() => console.log('is a function'), 'function');
    expect(resp).toBe(true);
  });

  it('testing is null',  () => {
    const resp = dynamicTypeCheck(null, 'null');
    expect(resp).toBe(true);
  });

  it('testing is Array',  () => {
    const resp = dynamicTypeCheck([], 'Array');
    expect(resp).toBe(true);
  });

  it('testing is Map',  () => {
    const resp = dynamicTypeCheck(new Map(), 'Map');
    expect(resp).toBe(true);
  });

  it('testing is Set',  () => {
    const resp = dynamicTypeCheck(new Set(), 'Set');
    expect(resp).toBe(true);
  });

  it('testing is WeakMap',  () => {
    const resp = dynamicTypeCheck(new WeakMap(), 'WeakMap');
    expect(resp).toBe(true);
  });

  it('testing is WeakSet',  () => {
    const resp = dynamicTypeCheck(new WeakSet(), 'WeakSet');
    expect(resp).toBe(true);
  });

  it('testing is ReactElement',  () => {
    const resp = dynamicTypeCheck(FunctionComponent1, 'ReactElement');
    expect(resp).toBe(true);
  });

  it('testing is Array<string>',  () => {
    const resp = dynamicTypeCheck(['FunctionComponent1', 'FunctionComponent2'], 'Array<string>');
    expect(resp).toBe(true);
  });

  it('testing is Array<ReactElement>',  () => {
    const resp = dynamicTypeCheck([FunctionComponent1, FunctionComponent2], 'Array<ReactElement>');
    expect(resp).toBe(true);
  });

  it('testing is Collection<string>',  () => {
    const resp = dynamicTypeCheck({'a': 'FunctionComponent1', 'b': 'FunctionComponent2'}, 'Collection<string>');
    expect(resp).toBe(true);
  });

  it('testing is Collection<ReactElement>',  () => {
    const resp = dynamicTypeCheck({'a': FunctionComponent1, 'b': FunctionComponent2}, 'Collection<ReactElement>');
    expect(resp).toBe(true);
  });
});