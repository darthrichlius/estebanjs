const expectedTypes = Object.freeze({
  _TYPE_OF_PRIMITIVE_UNDEFINED: 'undefined',
  _TYPE_OF_PRIMITIVE_BOOLEAN: 'boolean',
  _TYPE_OF_PRIMITIVE_NUMBER: 'number',
  _TYPE_OF_PRIMITIVE_STRING: 'string',
  _TYPE_OF_PRIMITIVE_BIGINT: 'bigint',
  _TYPE_OF_PRIMITIVE_SYMBOL: 'symbol',
  
  
  _TYPE_SPECIAL_NULL: 'null',
  _TYPE_SPECIAL_FUNCTION: 'function',
  _TYPE_SPECIAL_ARRAY: 'Array',
  _TYPE_SPECIAL_COLLECTION: 'Collection',
  
  // Or anything made with new keyword
  _TYPE_INSTANCE_OF_OBJECT_MAP: 'Map',
  _TYPE_INSTANCE_OF_OBJECT_SET: 'Set',
  _TYPE_INSTANCE_OF_OBJECT_WEAKMAP: 'WeakMap',
  _TYPE_INSTANCE_OF_OBJECT_WEAKSET: 'WeakSet',
  _TYPE_INSTANCE_OF_OBJECT_DATE: 'Date',

  _TYPE_GENERIC_ARRAY_OF: '(Array)\<(.+)\>',
  _TYPE_GENERIC_COLLECTION_OF: '(Collection)\<(.+)\>',

  
  _TYPE_REACT_COMPONENT_CLASS: 'ReactComponentClass',
  _TYPE_REACT_ELEMENT: 'ReactElement',
  _TYPE_REACT_ELEMENT_TYPE_DOM: 'ReactElementTypeDom',
  _TYPE_REACT_ELEMENT_TYPE_COMPOSITE: 'ReactElementTypeComposite',


  _TYPE_HTML_DOM_ELEMENT: 'HTMLElement',
  _TYPE_HTML_DOM_NODE: 'HTMLNode',
});
exports.expectedTypes = expectedTypes;


const typeGroups = Object.freeze({
  _DATA_TYPE_PRIMITIVE: 'primitive',
  _DATA_TYPE_NULL: 'special_null',
  _DATA_TYPE_FUNCTION: 'special_function',
  _DATA_TYPE_INSTANCE_OF_OBJECT: 'instance_of_object',
  _DATA_TYPE_GENERIC: 'generic',
  _DATA_TYPE_REACT_SOMETHING: 'react_something',
  _DATA_TYPE_HTML_ELEMENT: 'html_element',
});
exports.typeGroups = typeGroups;


const typeGroupMap = Object.freeze({
  [typeGroups._DATA_TYPE_PRIMITIVE]: [
    expectedTypes._TYPE_OF_PRIMITIVE_UNDEFINED,
    expectedTypes._TYPE_OF_PRIMITIVE_BOOLEAN,
    expectedTypes._TYPE_OF_PRIMITIVE_NUMBER,
    expectedTypes._TYPE_OF_PRIMITIVE_STRING,
    expectedTypes._TYPE_OF_PRIMITIVE_BIGINT,
    expectedTypes._TYPE_OF_PRIMITIVE_SYMBOL,
    expectedTypes._TYPE_OF_PRIMITIVE_POJO,
  ],
  [typeGroups._DATA_TYPE_INSTANCE_OF_OBJECT]: [
    expectedTypes._TYPE_INSTANCE_OF_OBJECT_MAP,
    expectedTypes._TYPE_INSTANCE_OF_OBJECT_SET,
    expectedTypes._TYPE_INSTANCE_OF_OBJECT_WEAKMAP,
    expectedTypes._TYPE_INSTANCE_OF_OBJECT_WEAKSET,
    expectedTypes._TYPE_INSTANCE_OF_OBJECT_DATE,
  ],
  [typeGroups._DATA_TYPE_GENERIC]: [
    expectedTypes._TYPE_GENERIC_ARRAY_OF,
    expectedTypes._TYPE_GENERIC_COLLECTION_OF,
  ],
  [typeGroups._DATA_TYPE_REACT_SOMETHING]: [
    expectedTypes._TYPE_REACT_COMPONENT,
    expectedTypes._TYPE_REACT_COMPONENT_FUNCTION,
    expectedTypes._TYPE_REACT_COMPONENT_CLASS,
    expectedTypes._TYPE_REACT_ELEMENT,
    expectedTypes._TYPE_REACT_ELEMENT_TYPE_DOM,
    expectedTypes._TYPE_REACT_ELEMENT_TYPE_COMPOSITE,
  ],
});
exports.typeGroupMap = typeGroupMap;
