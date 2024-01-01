const React = require('react');
const ReactIs = require('react-is');

const {
    dynamicTypeCheck
} = require('../../index.js');



const FunctionComponent = () => "a string";

class ClassComponent extends React.Component {
  render() {
    return React.createElement("div");
  }
}

const JSX1 = React.createElement(ClassComponent);
const JSX2 = React.createElement("div");;


console.log('TESTING (UNDEFINED) ==> ', dynamicTypeCheck(undefined, 'undefined')); // Must be -- TRUE
console.log('TESTING (UNDEFINED) ==> ', dynamicTypeCheck(0, 'undefined')); // Must be -- FALSE

console.log('TESTING (BOOLEAN) ==> ', dynamicTypeCheck(false, 'boolean')); // Must be -- TRUE
console.log('TESTING (BOOLEAN) ==> ', dynamicTypeCheck('no', 'boolean')); // Must be -- FALSE

console.log('TESTING (NUMBER) ==> ', dynamicTypeCheck(5, 'number')); // Must be -- TRUE
console.log('TESTING (NUMBER) ==> ', dynamicTypeCheck('no', 'number')); // Must be -- FALSE

console.log('TESTING (STRING) ==> ', dynamicTypeCheck('string', 'string')); // Must be -- TRUE
console.log('TESTING (STRING) ==> ', dynamicTypeCheck(null, 'string')); // Must be -- FALSE

console.log('TESTING (BIGINT) ==> ', dynamicTypeCheck(BigInt(10000000000), 'bigint')); // Must be -- TRUE
console.log('TESTING (BIGINT) ==> ', dynamicTypeCheck('string', 'bigint')); // Must be -- FALSE

console.log('TESTING (SYMBOL) ==> ', dynamicTypeCheck(Symbol(), 'symbol')); // Must be -- TRUE
console.log('TESTING (SYMBOL) ==> ', dynamicTypeCheck('string', 'symbol')); // Must be -- FALSE

console.log('TESTING (FUNCTION) ==> ', dynamicTypeCheck(() => console.log('is a function'), 'function')); // Must be -- TRUE
console.log('TESTING (FUNCTION) ==> ', dynamicTypeCheck('string', 'function')); // Must be -- FALSE

console.log('TESTING (NULL) ==> ', dynamicTypeCheck(null, 'null')); // Must be -- TRUE
console.log('TESTING (NULL) ==> ', dynamicTypeCheck('string', 'function')); // Must be -- FALSE



console.log('TESTING (ARRAY) ==> ', dynamicTypeCheck([], 'Array')); // Must be -- TRUE
console.log('TESTING (ARRAY) ==> ', dynamicTypeCheck('string', 'Array')); // Must be -- FALSE

console.log('TESTING (COLLECTION) ==> ', dynamicTypeCheck({ 'a': 5, 'b': 'two', '3': () => "T.H.R.E.E" }, 'Collection')); // Must be -- TRUE
console.log('TESTING (COLLECTION) ==> ', dynamicTypeCheck({ distribution: 'hybrid-spa', template: 'single-theme' }, 'Collection')); // Must be -- TRUE
console.log('TESTING (COLLECTION) ==> ', dynamicTypeCheck('string', 'Array')); // Must be -- FALSE

console.log('TESTING (MAP) ==> ', dynamicTypeCheck(new Map(), 'Map')); // Must be -- TRUE
console.log('TESTING (MAP) ==> ', dynamicTypeCheck('string', 'Map')); // Must be -- FALSE

console.log('TESTING (SET) ==> ', dynamicTypeCheck(new Set(), 'Set')); // Must be -- TRUE
console.log('TESTING (SET) ==> ', dynamicTypeCheck('string', 'Set')); // Must be -- FALSE

console.log('TESTING (WEAKMAP) ==> ', dynamicTypeCheck(new WeakMap(), 'WeakMap')); // Must be -- TRUE
console.log('TESTING (WEAKMAP) ==> ', dynamicTypeCheck('string', 'WeakMap')); // Must be -- FALSE

console.log('TESTING (WEAKSET) ==> ', dynamicTypeCheck(new WeakSet(), 'WeakSet')); // Must be -- TRUE
console.log('TESTING (WEAKSET) ==> ', dynamicTypeCheck('string', 'WeakSet')); // Must be -- FALSE



console.log('TESTING (REACT_COMPONENT_CLASS) ==> ', dynamicTypeCheck(ClassComponent, 'ReactComponentClass')); // Must be -- TRUE
console.log('TESTING (REACT_COMPONENT_CLASS) ==> ', dynamicTypeCheck(6, 'ReactComponentClass')); // Must be -- FALSE

console.log('TESTING (REACT_ELEMENT) ==> ', dynamicTypeCheck(React.createElement('<h1>Bonjour, monde !</h1>'), 'ReactElement')); // Must be -- TRUE
console.log('TESTING (REACT_ELEMENT) ==> ', dynamicTypeCheck(5, 'ReactElement')); // Must be -- FALSE

console.log('TESTING (REACT_ELEMENT_TYPE_DOM) ==> ', dynamicTypeCheck(React.createElement('div'), 'ReactElementTypeDom')); // Must be -- TRUE
console.log('TESTING (REACT_ELEMENT_TYPE_DOM) ==> ', dynamicTypeCheck(10, 'ReactElementTypeDom')); // Must be -- FALSE

console.log('TESTING (REACT_ELEMENT_TYPE_JSX) ==> ', dynamicTypeCheck(JSX1, 'ReactElementTypeComposite')); // Must be -- TRUE
console.log('TESTING (REACT_ELEMENT_TYPE_JSX) ==> ', dynamicTypeCheck(10, 'ReactElementTypeComposite')); // Must be -- FALSE



console.log('TESTING (Array<string>) ==> ', dynamicTypeCheck(['a', 'b'], 'Array<string>')); // Must be -- TRUE
console.log('TESTING (Array<string>) ==> ', dynamicTypeCheck([FunctionComponent, FunctionComponent], 'Array<string>')); // Must be -- FALSE

console.log('TESTING (Array<ReactElement>) ==> ', dynamicTypeCheck([JSX1, JSX2], 'Array<ReactElement>')); // Must be -- TRUE
console.log('TESTING (Array<ReactElement>) ==> ', dynamicTypeCheck([5, 5], 'Array<ReactElement>')); // Must be -- FALSE

console.log('TESTING (Collection<string>) ==> ', dynamicTypeCheck({'a': 'app1', 'b': 'app2'}, 'Collection<string>')); // Must be -- TRUE
console.log('TESTING (Collection<string>) ==> ', dynamicTypeCheck([FunctionComponent, FunctionComponent], 'Collection<string>')); // Must be -- FALSE

console.log('TESTING (Collection<ReactElement>) ==> ', dynamicTypeCheck({'a': JSX1, 'b': JSX2}, 'Collection<ReactElement>')); // Must be -- TRUE
console.log('TESTING (Collection<ReactElement>) ==> ', dynamicTypeCheck([FunctionComponent, FunctionComponent], 'Collection<ReactElement>')); // Must be -- FALSE
