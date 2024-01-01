
const ReactIs = require('react-is');


function isUndefined(a) { return typeof a === 'undefined'; }
function isNulll(a) { return a === null; }
function isUndefinedOrNull(a) { return isUndefined(a) || isNulll(a); }
function isString(a) { return typeof a === 'string'; }
function isNumber(a) { return typeof a === 'number'; }
function isBoolean(a) { return typeof a === 'boolean'; }
function isTrue(a) { return a === true; }
function isFalse(a) { return a === false; }
function isPojo(a) {
  return !isUndefinedOrNull(a)
  && Object.getPrototypeOf(a).constructor.name === 'Object';
}
function isArray(a) { return Array.isArray(a); }
function isDate(a) { return Object.prototype.toString.call(a) === '[object Date]' && !isNaN(a.getTime()); }
function isPromise(a) { return a instanceof Promise; }
function isFunction(a) { return typeof a === 'function'; }

// EMPTY
function isEmptyString(a) { return isString(a) && (a === '' || /^[\s]*$/.test(a)); }
function isEmptyArray(a) { return isArray(a) && a.length === 0; }
function isEmptyProjo(a) { return isPojo(a) && !Object.values(a).length; }

// NOT EMPTY
function isNotEmptyString(a) { return isString(a) && /[^\s]+/g.test(a); }
function isNotEmptyArray(a) { return isArray(a) && !!a.length; }
function isNotEmptyProjo(a) { return isPojo(a) && !!Object.values(a).length; }

function isEnvDev(a) { return isNotEmptyString(a) && a === 'development'; }
function isEnvTest(a) { return isNotEmptyString(a) && a === 'test'; }
function isEnvSta(a) { return isNotEmptyString(a) && a === 'staging'; }
function isEnvPreProd(a) { return isNotEmptyString(a) && a === 'preproduction'; }
function isEnvProd(a) { return isNotEmptyString(a) && a === 'production'; }

// Returns true if it is a DOM node
// https://stackoverflow.com/questions/384286/how-do-you-check-if-a-javascript-object-is-a-dom-object
function isNode(o){
  return (
    typeof Node === "object" ? o instanceof Node : 
    o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string"
  );
}

// Returns true if it is a DOM element   
// https://stackoverflow.com/questions/384286/how-do-you-check-if-a-javascript-object-is-a-dom-object 
function isElement(o){
  return (
    typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
    o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string"
  );
}


// ************************************* REACT (START) ************************************* //

/**
 * Example
 * class Page extends React.Component { render() { return <div/>} }
 */
function isReactComponentClass (a) {
  return typeof a === 'function' && !!a.prototype && !!a.prototype.isReactComponent;
}

/**
 * Example
 * function Page() { return <div/>} }
 */
function isReactComponentFunction (a) {
  return typeof a === 'function' && String(a).includes('return React.createElement')
}

function isReactComponent (a) {
  return (
    isReactComponentClass(a) || 
    isReactComponentFunction(a)
  )
}

/**
 * Suitable for JSX format
 * Example: <Element /> <a />
 */
function isReactElement (a) { 
  // return ReactIs.isElement(a);
  return ReactIs.isElement(a);
}

/**
 * JSS
 * Example: <ul />
 */
function isReactElementTypeDom (a) {
  return isReactElement(a) && typeof a.type === 'string';
}

/**
 * JSS
 * Example: <Element />
 */
function isReactElementTypeComposite (a) {
  return isReactElement(a) && typeof a.type === 'function';
}

// ************************************* REACT (END) ************************************* //

const assertFn = {
  is: {
    undefined: (a) => isUndefined(a),
    null: (a) => isNulll(a),
    undefinedOrNull: (a) => isUndefinedOrNull(a),
    string: (a) => isString(a),
    number: (a) => isNumber(a),
    boolean: (a) => isBoolean(a),
    true: (a) => isTrue(a),
    false: (a) => isFalse(a),
    pojo: (a) => isPojo(a),
    array: (a) => isArray(a),
    date: (a) => isDate(a),
    promise: (a) => isPromise(a),
    function: (a) => isFunction(a),

    HTMLNode: (a) => isNode(a),
    HTMLElement: (a) => isElement(a),

    ReactComponentClass: (a) => isReactComponentClass(a),
    ReactElementTypeDom: (a) => isReactElementTypeDom(a),
    ReactElementTypeComposite: (a) => isReactElementTypeComposite(a),
    ReactElement: (a) => isReactElement(a),
    
    // ####################################################################### //

    empty: {
      string: (a) => isEmptyString(a),
      array: (a) => isEmptyArray(a),
      pojo: (a) => isEmptyProjo(a),
    },
    notEmpty: {
      string: (a) => isNotEmptyString(a),
      array: (a) => isNotEmptyArray(a),
      pojo: (a) => isNotEmptyProjo(a),
    },

    // ENVIRONMENT
    development: (a) => isEnvDev(a),
    test: (a) => isEnvTest(a),
    staging: (a) => isEnvSta(a),
    preproduction: (a) => isEnvPreProd(a),
    production: (a) => isEnvProd(a),
  },
  are: {
    equal: (a) => a.every((item) => item === a[0]),
    even: (a) => a.every((item) => !(item % 2)),
    odd: (a) => a.every((item) => (item % 2)),
  },
  has: {
    key: () => console.log('$$.assertFn.has.key()'),
    value: () => console.log('$$.assertFn.has.key()'),
  },
};

module.exports = assertFn;
