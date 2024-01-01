/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */

const assertFn = require('./lib/assertFn.lib');
const resolveLib = require('./lib/resolve.lib');

const {
  expectedTypes,
  typeGroups,
  typeGroupMap
} = require('./conf/const');

const ES_MAKE_EXIT = 'ES_MAKE_EXIT';
const ES_MAKE_DEBUG = 'ES_MAKE_DEBUG';
const ES_MAKE_WRITE_LOG = 'ES_MAKE_WRITE_LOG';
const ES_MAKE_THROW = 'ES_MAKE_THROW';
const ES_MAKE_APPLY = 'ES_MAKE_APPLY';
const ES_MAKE_ALERT = 'ES_MAKE_ALERT';
const ES_MAKE_LOVE = 'ES_MAKE_LOVE';

/*
  Light thenable assert js library.

  Esteban is all about ellegance, simplicity and practicaliyy

  We provide limited matchers and sanitazor because
    * don't want it to be too heavy
    * what we provide covers most part of what you use daily
    * if you want more, use should.valid(fn) using you preffered solution
    * asserting covers 60% of the code, there are tons assert on the web
    * 40% of the our goal is to use thenable features

  // CHECK BE TYPE
  verify(foo).is['matcher']
  verify(foo).is.not['matcher']

  // CHECK BE EMPTY
  verify(foo).is.empty.string
  verify(foo).is.empty.array
  verify(foo).is.empty.pojo
  verify(foo).is.not.empty.string
  verify(foo).is.not.empty.array
  verify(foo).is.not.empty.pojo

  // VALID
  verify(foo).valid(fn) // Use your own validator, there are tons: check-types, validator, ...

  on(foo).is.true.do((v) => console.log('good'))
  on(foo).is.not.string.do((v) => console.log('should be string'));
  on(foo).is.empty.string.do(() => $$.throw('Error message'))
  on(foo).is.false.do(() => $$.apply(fn))
*/

/*
const resolve = {
  log: resolveLog,
  throw: resolveThrow,
  apply: resolveApply,
}

const reject = {
  log: rejectLog,
  throw: rejectThrow,
  apply: rejectApply,
}

const always = {
  log: finallyLog,
  throw: finallyThrow,
  apply: finallyApply,
}
// */

/**
 * Help valid element with unpredictable type
 */
function dynamicTypeCheck(element, expectedType) {
  
  if (!assertFn.is.undefinedOrNull(expectedType)) {
    // Check expected is expected
    if(!Object.values(expectedTypes).includes(expectedType) 
      && !(new RegExp(expectedTypes._TYPE_GENERIC_ARRAY_OF)).test(expectedType)
      && !(new RegExp(expectedTypes._TYPE_GENERIC_COLLECTION_OF)).test(expectedType)
    ) {
      return Error('The expected type is unexpected')
    }

    
    // Start with the most simple
    const primitives = typeGroupMap[typeGroups._DATA_TYPE_PRIMITIVE];
    if(primitives.includes(expectedType) 
      || expectedType === expectedTypes._TYPE_SPECIAL_FUNCTION
    ) {
      return typeof element == expectedType.toLowerCase()
    }


    // Null case
    if (expectedType === expectedTypes._TYPE_SPECIAL_NULL) {
      return element === null;
    }


    // Array case
    if(expectedType === expectedTypes._TYPE_SPECIAL_ARRAY) {
      return Array.isArray(element);
    }


    // Collection case
    if(expectedType === expectedTypes._TYPE_SPECIAL_COLLECTION) {
      return assertFn.is.notEmpty.pojo(element)
        && Object.values(element).length > 0
      ;
    }


    if (typeGroupMap[typeGroups._DATA_TYPE_INSTANCE_OF_OBJECT].includes(expectedType)) {
      return element instanceof eval(`${expectedType}`);
    }
    

    // REACT_ELEMENT
    if (typeGroupMap[typeGroups._DATA_TYPE_REACT_SOMETHING].includes(expectedType)) {
      switch(expectedType) {
        case expectedTypes._TYPE_REACT_COMPONENT_CLASS:
          return assertFn.is.ReactComponentClass(element);

        case expectedTypes._TYPE_REACT_ELEMENT:
          return assertFn.is.ReactElement(element);

        case expectedTypes._TYPE_REACT_ELEMENT_TYPE_DOM:
          return assertFn.is.ReactElementTypeDom(element);

        case expectedTypes._TYPE_REACT_ELEMENT_TYPE_COMPOSITE:
          return assertFn.is.ReactElementTypeComposite(element);
      }
    }

    
    // HTML_ELEMENT (Not Tested)
    if (expectedType === expectedTypes._TYPE_HTML_DOM_NODE) {
      return assertFn.is.HTMLNode(element);
    }
    if (expectedType === expectedTypes._TYPE_HTML_DOM_ELEMENT) {
      return assertFn.is.HTMLElement(element);
    }
    
    // GENERIC
    const _all_generic_rgx = typeGroupMap[typeGroups._DATA_TYPE_GENERIC];
    for(let _generic_rgx of _all_generic_rgx) {
      _generic_rgx = new RegExp(_generic_rgx);
      if (_generic_rgx.test(expectedType)) {
        const matches = _generic_rgx.exec(expectedType);
        let [str, collectionType, collectionElement] = matches;

        if (collectionType === 'Array') {
          return Array.isArray(element) 
            && element.every(e => {
              return dynamicTypeCheck(e, collectionElement)
            });
        }

        if (collectionType === 'Collection') {
          return assertFn.is.notEmpty.pojo(element)
            && Object.values(element).every(e => dynamicTypeCheck(e, collectionElement));
        }
      }
    }

  } 

  return Error('Type expected')
}


function callbackExec(fn, v, isSync = false) {
  return new Promise((resolve) => {
    if (isSync) {
      setTimeout(() => {
        fn(v);
        resolve(true);
      }, 2000);
    } else {
      fn(v);
      resolve(true);
    }
  });
}


// ################ EXIT ################ //

const resolveMap = {
  console: {
    log: 'resolveConsoleLog',
    trace: 'resolveConsoleTrace',
  },
  exit: 'resolveExit',
  throw: 'resolveThrow',
  logFile: 'resolveLogFile',
  applyFn: 'resolveApplyFn',

  // ########  ######## //
  sync: {
    console: {
      log: 'resolveSyncConsoleLog',
      trace: 'resolveSyncConsoleTrace',
    },
    exit: 'resolveSyncExit',
    throw: 'resolveSyncThrow',
    logFile: 'resolveSyncLogFile',
    applyFn: 'resolveSyncApplyFn',
  },
};
const rejectMap = {
  console: {
    log: 'rejectConsoleLog',
    trace: 'rejectConsoleTrace',
  },
  exit: 'rejectExit',
  throw: 'rejectThrow',
  logFile: 'rejectLogFile',
  applyFn: 'rejectApplyFn',

  // ########  ######## //
  sync: {
    console: {
      log: 'rejectSyncConsoleLog',
      trace: 'rejectSyncConsoleTrace',
    },
    exit: 'rejectSyncExit',
    throw: 'rejectSyncThrow',
    logFile: 'rejectSyncLogFile',
    applyFn: 'rejectSyncApplyFn',
  },
};



class Esteban {
  constructor(esteVal) {
    this._esteVal = esteVal;
  }

  async handleCallback(fn, hasResolved, isIs) {
    try {
      console.log(fn, ' isIs => ', isIs, ' hasResolved => ', hasResolved);

      if (assertFn.is.function(fn)
        && ((isIs && hasResolved) || (!isIs && hasResolved))
      ) {
        // "5y7nc" helps for security over injection. It should ne changed for each version build
        if (fn.name.indexOf('esteban$$5y7nc') === 0) {
          if (fn.name.indexOf('Sync') === -1) {
            callbackExec(fn, this._esteVal);
          } else {
            await callbackExec(fn, this._esteVal, true);
          }
        } else {
          fn(this._esteVal);
        }
      }
      // @Todo Accepts array of functions
    } catch (e) {
      // We just want to catch
    }
  }

  handleOnDo(hasResolved, isIs) {
    if (assertFn.is.boolean(hasResolved)) {
      return {
        do: (fn) => this.handleCallback(fn, hasResolved, isIs),
      };
    }
    return hasResolved;
  }

  something(isVerify) {
    const isIs = true;
    return isVerify
      ? {
        undefined: (() => assertFn.is.undefined(this._esteVal))(),
        undefinedOrNull: (() => assertFn.is.undefinedOrNull(this._esteVal))(),
        string: (() => assertFn.is.string(this._esteVal))(),
        number: (() => assertFn.is.number(this._esteVal))(),
        boolean: (() => assertFn.is.boolean(this._esteVal))(),
        true: (() => assertFn.is.true(this._esteVal))(),
        false: (() => assertFn.is.false(this._esteVal))(),
        pojo: (() => assertFn.is.pojo(this._esteVal))(),
        array: (() => assertFn.is.array(this._esteVal))(),
        date: (() => assertFn.is.date(this._esteVal))(),
        promise: (() => assertFn.is.promise(this._esteVal))(),
        function: (() => assertFn.is.function(this._esteVal))(),
        development: (() => assertFn.is.development(this._esteVal))(),
        test: (() => assertFn.is.test(this._esteVal))(),
        staging: (() => assertFn.is.staging(this._esteVal))(),
        preproduction: (() => assertFn.is.preproduction(this._esteVal))(),
        production: (() => assertFn.is.production(this._esteVal))(),
      }
      : {
        undefined: (() => this.handleOnDo(assertFn.is.undefined(this._esteVal), isIs))(),
        undefinedOrNull: (() => this.handleOnDo(assertFn.is.undefinedOrNull(this._esteVal), isIs))(),
        string: (() => this.handleOnDo(assertFn.is.string(this._esteVal), isIs))(),
        number: (() => this.handleOnDo(assertFn.is.number(this._esteVal), isIs))(),
        boolean: (() => this.handleOnDo(assertFn.is.boolean(this._esteVal), isIs))(),
        true: (() => this.handleOnDo(assertFn.is.true(this._esteVal), isIs))(),
        false: (() => this.handleOnDo(assertFn.is.false(this._esteVal), isIs))(),
        pojo: (() => this.handleOnDo(assertFn.is.pojo(this._esteVal), isIs))(),
        array: (() => this.handleOnDo(assertFn.is.array(this._esteVal), isIs))(),
        date: (() => this.handleOnDo(assertFn.is.date(this._esteVal), isIs))(),
        promise: (() => this.handleOnDo(assertFn.is.promise(this._esteVal), isIs))(),
        function: (() => this.handleOnDo(assertFn.is.function(this._esteVal), isIs))(),
        development: (() => this.handleOnDo(assertFn.is.development(this._esteVal), isIs))(),
        test: (() => this.handleOnDo(assertFn.is.test(this._esteVal), isIs))(),
        staging: (() => this.handleOnDo(assertFn.is.staging(this._esteVal), isIs))(),
        preproduction: (() => this.handleOnDo(assertFn.is.preproduction(this._esteVal), isIs))(),
        production: (() => this.handleOnDo(assertFn.is.production(this._esteVal), isIs))(),
      };
  }

  notSomething(isVerify) {
    const isIs = false;
    return isVerify
      ? {
        undefined: (() => !this.something(isVerify).undefined)(),
        undefinedOrNull: (() => !this.something(isVerify).undefinedOrNull)(),
        string: (() => !this.something(isVerify).string)(),
        number: (() => !this.something(isVerify).number)(),
        boolean: (() => !this.something(isVerify).boolean)(),
        true: (() => !this.something(isVerify).true)(),
        false: (() => !this.something(isVerify).false)(),
        pojo: (() => !this.something(isVerify).pojo)(),
        array: (() => !this.something(isVerify).array)(),
        date: (() => !this.something(isVerify).date)(),
        promise: (() => !this.something(isVerify).promise)(),
        function: (() => !this.something(isVerify).function)(),
        development: (() => !this.something(isVerify).development)(),
        test: (() => !this.something(isVerify).test)(),
        staging: (() => !this.something(isVerify).staging)(),
        preproduction: (() => !this.something(isVerify).preproduction)(),
        production: (() => !this.something(isVerify).production)(),
      }
      : {
        undefined: (() => this.handleOnDo(!this.something().undefined, isIs))(),
        undefinedOrNull: (() => this.handleOnDo(!this.something().undefinedOrNull, isIs))(),
        string: (() => this.handleOnDo(!this.something().string, isIs))(),
        number: (() => this.handleOnDo(!this.something().number, isIs))(),
        boolean: (() => this.handleOnDo(!this.something().boolean, isIs))(),
        true: (() => this.handleOnDo(!this.something().true, isIs))(),
        false: (() => this.handleOnDo(!this.something().false, isIs))(),
        pojo: (() => this.handleOnDo(!this.something().pojo, isIs))(),
        array: (() => this.handleOnDo(!this.something().array, isIs))(),
        date: (() => this.handleOnDo(!this.something().date, isIs))(),
        promise: (() => this.handleOnDo(!this.something().promise, isIs))(),
        function: (() => this.handleOnDo(!this.something().function, isIs))(),
        development: (() => this.handleOnDo(!this.something(isVerify).development, isIs))(),
        test: (() => this.handleOnDo(!this.something(isVerify).test, isIs))(),
        staging: (() => this.handleOnDo(!this.something(isVerify).staging, isIs))(),
        preproduction: (() => this.handleOnDo(!this.something(isVerify).preproduction, isIs))(),
        production: (() => this.handleOnDo(!this.something(isVerify).production, isIs))(),
      };
  }

  checkEmpty(isVerify) {
    const isIs = true;
    return isVerify
      ? {
        string: (() => assertFn.is.empty.string(this._esteVal))(),
        array: (() => assertFn.is.empty.array(this._esteVal))(),
        pojo: (() => assertFn.is.empty.pojo(this._esteVal))(),
      }
      : {
        string: (() => this.handleOnDo(assertFn.is.empty.string(this._esteVal), isIs))(),
        array: (() => this.handleOnDo(assertFn.is.empty.array(this._esteVal), isIs))(),
        pojo: (() => this.handleOnDo(assertFn.is.empty.pojo(this._esteVal), isIs))(),
      };
  }

  checkNotEmpty(isVerify) {
    const isIs = false;
    // Notice: For better understanding, should be understood a is.notempty.string()
    return isVerify
      ? {
        string: (() => assertFn.is.notEmpty.string(this._esteVal))(),
        array: (() => assertFn.is.notEmpty.array(this._esteVal))(),
        pojo: (() => assertFn.is.notEmpty.pojo(this._esteVal))(),
      }
      : {
        string: (() => this.handleOnDo(assertFn.is.notEmpty.string(this._esteVal), isIs))(),
        array: (() => this.handleOnDo(assertFn.is.notEmpty.array(this._esteVal), isIs))(),
        pojo: (() => this.handleOnDo(assertFn.is.notEmpty.pojo(this._esteVal), isIs))(),
      };
  }

  // ########################## PUBLIC MATHERS ####################### //

  /**
   * Check if the esteVal match the validator.
   * The result is a boolean.
   * return boolean
   */
  valid(fn, isVerify) {
    // We use both "valid" & "notValid" because of kangaroo self-invok constraint
    const isIs = true;
    // eslint-disable-next-line no-nested-ternary
    return isVerify
      ? assertFn.is.function(fn) ? !!fn(this._esteVal) : undefined
      : assertFn.is.function(fn) ? this.handleOnDo(!!fn(this._esteVal), isIs) : undefined;
  }

  notValid(fn, isVerify) {
    // We use both "valid" & "notValid" because of kangaroo self-invok constraint
    const isIs = false;
    // eslint-disable-next-line no-nested-ternary
    return isVerify
      ? assertFn.is.function(fn) ? !fn(this._esteVal) : undefined
      : assertFn.is.function(fn) ? this.handleOnDo(!fn(this._esteVal), isIs) : undefined;
  }


  assertIs(isVerify = false) {
    return {
      ...this.something(isVerify),
      empty: {
        ...this.checkEmpty(isVerify),
      },
      not: {
        ...this.notSomething(isVerify),
        empty: {
          ...this.checkNotEmpty(isVerify),
        },
      },
    };
  }
}


function matcher(a, { matcherType }) {
  const Es = new Esteban(a);
  const isVerify = matcherType === 'verify';

  return {
    is: Es.assertIs(isVerify),
    resolve: (fn) => Es.valid(fn, isVerify),
    reject: (fn) => Es.notValid(fn, isVerify),
  };
}

function make(a) {
  const Es = new Esteban(a);

  return {
    exit: Es.make(ES_MAKE_EXIT),
    debug: Es.make(ES_MAKE_DEBUG),
    writeLog: Es.make(ES_MAKE_WRITE_LOG),
    apply: Es.make(ES_MAKE_APPLY),
    throw: Es.make(ES_MAKE_THROW),
    alert: Es.make(ES_MAKE_ALERT),
    love: Es.make(ES_MAKE_LOVE),
    sync: {
      exit: Es.make(ES_MAKE_EXIT, true),
      debug: Es.make(ES_MAKE_DEBUG, true),
      writeLog: Es.make(ES_MAKE_WRITE_LOG, true),
      apply: Es.make(ES_MAKE_APPLY, true),
      throw: Es.make(ES_MAKE_THROW, true),
      alert: Es.make(ES_MAKE_ALERT, true),
      love: Es.make(ES_MAKE_LOVE, true),
    },
  };
}


module.exports = {
  // Asserts
  assertFn,
  make,
  // Matchers
  on: (a) => matcher(a, { matcherType: 'on' }),
  verify: (a) => matcher(a, { matcherType: 'verify' }),
  // verify alias
  $$v: (a) => matcher(a, { matcherType: 'verify' }),
  dynamicTypeCheck
};
