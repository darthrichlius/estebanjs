
# Usage

## Installation

``` bash
yarn add @deuslynn/esteban
# or npm
npm install @deuslynn/esteban
# or newer version
npx @deuslynn/esteban
```
## Getting Started

For your more common usage, you will use Esteban to perform assertions.
Let's take a look.

### Symbollism/Importing

``` javascript
const $$ = require('@deuslynn/esteban');
// ...or with destructuring
const { verify, on } = require('@deuslynn/esteban');
```

### Elegant & simplified assertions...

Esteban helps turn this... [emoji]

``` javascript
const foo = [1, 2, 3];
if (Array.isArray(foo) && foo.length) {
    let areEqual = foo.evey(item => {
        item === foo[0];
    });
    if (areEqual) {
        console.log(`${...foo} are equivalent`)
    }
}

```

into this [emoji]
``` javascript
const foo = [1, 2, 3];
$$.on(foo).are.equal.do(() => console.log(`${...foo} are equivalent`));
```

#### ... Or more traditionally 

Transform this boring 
``` javascript
const foo = 'hollo world';
if (type foo === 'string' && foo.length) {
    // ... Do something
}
```
into kangouroo style looking assertion
``` javascript
const foo = 'hollo world';
if ($$.verify(foo).is.not.empty.string) {
    // ... Do something
}
```
### Want something more powerfull?
Let's create a code that will do this:
* take an array and make sure it has children
* print (console.log) children if they are strings
* invoke them if they are functions

**All in 2 lines! Ready? Let's go!!**

``` javascript
const arr = ['I', 'am', 'your', 'father'];
$$.verify(arr).are.string.do($$.make.debug);
$$.verify(arr).are.function.do($$.make.invoke); // Will not be executed as it doesn't resolve "are function"
```
Would you like to invoke with a specific argument or other operations?

``` javascript
const arr = [aFunc1, aFunc2, aFunc3, aFunc4];
$$.verify(arr).are.string.do($$.make.debug); // Will not be executed as it doesn't resolve "are string"
$$.verify(arr).are.function.do((fn) => doSomethingBefore(); fn(yourArgument(); doSomethingElse(););
```


## How Tos
### Making assertions
### On resolve/reject execution
### Environment-related execution
### Task parallelization
### Silent log operation (make writeLog)
### Debugging (debug, alert)
### Synchronous tasks

