'use strinct';

const { verify } = require('../index');

describe('Testing assert : SHOULD NOT/BE [TYPE]', () => {
  it('verify is undefined', () => {
    const asv = verify().is.undefined;
    expect(asv).toBe(true);
  });
  it('verify IS NOT undefined', () => {
    const asv = verify(null).is.not.undefined;
    expect(asv).toBe(true);
  });

  // ########## STRING ########## //
  it('verify is string', () => {
    const asv = verify('aaa').is.string;
    expect(asv).toBe(true);
  });
  it('verify IS NOT string', () => {
    const asv = verify(56.6).is.not.string;
    expect(asv).toBe(true);
  });

  // ########## NUMBER ########## //
  it('verify is number', () => {
    const asv = verify(56.6).is.number;
    expect(asv).toBe(true);
  });
  it('verify IS NOT number', () => {
    const asv = verify('56.6').is.not.number;
    expect(asv).toBe(true);
  });

  // ########## BOOLEAN ########## //
  it('verify is boolean', () => {
    const asv = verify(Number.isFinite(10 / 1)).is.boolean;
    expect(asv).toBe(true);
  });
  it('verify IS NOT boolean', () => {
    const asv = verify().is.not.boolean;
    expect(asv).toBe(true);
  });
  it('verify is true', () => {
    const asv = verify(Number.isFinite(10 / 1)).is.true;
    expect(asv).toBe(true);
  });
  it('verify IS NOT true', () => {
    const asv = verify(Number.isFinite(10 / 0)).is.not.true;
    expect(asv).toBe(true);
  });
  it('verify is false', () => {
    const asv = verify(Number.isFinite(10 / 0)).is.false;
    expect(asv).toBe(true);
  });
  it('verify IS NOT false', () => {
    const asv = verify(Number.isFinite(10 / 1)).is.not.false;
    expect(asv).toBe(true);
  });

  // ########## POJO ########## //
  it('verify is pojo', () => {
    const asv1 = verify({}).is.pojo;
    const asv2 = verify({ hi: 5 }).is.pojo;
    expect(asv1).toBe(true);
    expect(asv2).toBe(true);
  });
  it('verify IS NOT pojo', () => {
    const asv = verify('56.6').is.not.pojo;
    expect(asv).toBe(true);
  });

  // ########## ARRAY ########## //
  it('verify is array', () => {
    const asv1 = verify([]).is.array;
    const asv2 = verify([5, 'a']).is.array;
    expect(asv1).toBe(true);
    expect(asv2).toBe(true);
  });
  it('verify IS NOT array', () => {
    const asv = verify({}).is.not.array;
    expect(asv).toBe(true);
  });

  // ########## DATE ########## //
  it('verify is a valid date', () => {
    const asv = verify(new Date()).is.date;
    expect(asv).toBe(true);
  });
  it('verify IS NOT a valid date', () => {
    const asv = verify(new Date('something')).is.not.date;
    expect(asv).toBe(true);
  });

  function hello() {
    return new Promise((resolve) => {
      resolve('How are you?');
    });
  }

  // ########## PROMISE ########## //
  it('verify is a Promise', () => {
    const asv = verify(hello()).is.promise;
    expect(asv).toBe(true);
  });
  it('verify IS NOT a Promise', () => {
    const asv = verify(/[\s]/g).is.not.promise;
    expect(asv).toBe(true);
  });

  // ########## FUNCTION ########## //
  it('verify is a function', () => {
    const asv = verify(verify).is.function;
    expect(asv).toBe(true);
  });
  it('verify IS NOT a function', () => {
    const asv = verify(new Date('something')).is.not.function;
    expect(asv).toBe(true);
  });

  // ########## ENVIRONMENT ########## //
  it('verify is the proper environment', () => {
    expect(verify('development').is.devolpment).toBe(true);
    expect(verify(process.env.NODE_ENV).is.test).toBe(true);
    expect(verify('staging').is.staging).toBe(true);
    expect(verify('preproduction').is.preproduction).toBe(true);
    expect(verify('production').is.production).toBe(true);
  });
  it('verify IS NOT the proper environment', () => {
    expect(verify(process.env.NODE_ENV).is.not.devolpment).toBe(true);
    expect(verify('development').is.not.test).toBe(true);
    expect(verify('production').is.not.staging).toBe(true);
    expect(verify('staging').is.not.preproduction).toBe(true);
    expect(verify('preproduction').is.not.production).toBe(true);
  });
});
