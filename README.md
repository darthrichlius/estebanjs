

Esteban is all about elegance, simplicity and practicality.

Esteban helps to write elegant assertions and to enjoy an on-resolve-centered executing environment. This last aspect is interesting for instance for debugging, monitoring, parallelize your application, even in a production environment.

For instance, you could generate alert if a process took to long time, an error occurend, etc... 

Le's take a look!

# Table Of Content
* How to read
* Why Esteban?
* When use Esteban?
* Features
* Usage
    * Installation
    * Getting Started
    * How tos
        * Making assertions
        * On resolve/reject execution
        * Environment-related execution
        * Task parallelization
        * Silent log operation (make writeLog)
        * Debugging (debug, alert)
        * Synchronous tasks
* API
    * overview
    * asserting
        * composition (understanding Esteban's kangouroo flow)
            : namespace + subject + verb [ + precision ] + adjective [ + do ]
        * namespace
            * verify
            * on...do
                * async
                * sync
        * subject (primitive or collection)
        * verb
            * is: works only for a single subject, check is made on the single subject
            * are: works for a collection of subjects, check are made on every subjects
            * has: work for a collection of subjects, check are made on every subject child
            * resolve: work for a single value & collection
            * reject: work for a single value & collection
        * precision
            * empty
                * ...
            * not
                * ...
        * adjective (assert function) 
            used for assertions 
            * string 
                [ veritfy: yes, is: yes, not: yes, are: yes, has: yes ]
            * undefined 
                [ etc... ]
            * null
            * undefinedOrNull
            * string
            * number
            * boolean
            * true
            * false
            * pojo
            * array
            * date
            * promise
            * function
            * development (env)  
            * test (env)  
            * staging (env)  
            * preproduction (env)  
            * production (env)  
        * do (custom function(subject) or native $$.make functions )
    * making
        * make functions
* As regards similar solutions
* Contributing
* Licence
* See Also
    * A Deuslynn project
* Signature

# How to read

We designed Esteban to be very intuitive and easy to learn, thanks to our "kangouroo style" architecture. 
It will be even more easier, if you have already used tools like jQuery or Jest.

* If you want a very quick overview (**example**) of of Esteban is able, read the "example" section
* If you want to **how to use** Esteban, read the "Usage" section
* If you want to **go deep**, read the "Api documentation" section
* If you want to understand the **specific motivation** of the project, read "Why Esteban?" section
* If you want to understand the **global motivation** of the project (why Deuslynn ODB built Esteban), read the "A Desulynn project" section
* If you want to **contribute**, read the "contribution" section

This is quick presentation.<br/>

However, if you're a bit confuse, please read the rest.

# Why Esteban?

## Problem
As a developer, you don't want to waste too much time choring.
We consider as choring, any boring but necessary task and/or repetitive and low-yield code like like assertions, debugging variable, removing console.log in production, etc...

## Solution
Esteban helps you write elegant and easy to write assertions. Plus it makes you enjoy its on-resolve/reject, environment-related execution or task parallelization features, to write better code, with less headache, in a short time.

More over, as the architecture is scalable, you can personalize its usage to fit you very specific case.

# When not use Esteban

* When the code you want to write with is more than 2 times logner than not using it

# Features

* Elegant simplified assertions
* On resolve/reject execution
* Environment-related execution
* Task parallelization
* Silent log operation (interesting for monitoring)

As EstebanJs is highly scallable, only your imagination is the limit.

# Examples

``` javascript
if ($$.verify(foo).resolve(validator.isUrl)) {
    /// ...do something
}

// or

// or even more interesting
$$.on(foo).reject(validator.isUrl).do($$.make.exit);
// ...or
$$.on(userData).reject(validator.isUrl).do($$.make.debug);
// ...or
$$.on(userData).reject(validator.isUrl).do($$.make.writeLog);
// ... or
$$.on(userData).reject(validator.isUrl).do($$.make.apply(yourOwnMakeFunction);
```

# Usage

## Elegant & simplified assertions...

Esteban helps turn this... [emoji]

``` javascript
let areEqual = false;
const foo = [1, 2, 3];
if (Array.isArray(foo) && foo.length) {
    areEqual = foo.evey(item => {
        item === foo[0];
    });
}
if (areEqual) {
    console.log(`${...foo} are equivalent`)
}
```

into this [emoji]
``` javascript
const foo = [1, 2, 3];
$$.on(foo).are.equal.do(() => console.log(`${...foo} are equivalent`));
```

### ... Or more traditionally 

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

Esteban is far more powerful (while being simple and practical) than that.
Check out the "Usage" section to learn more.

# As regards similar solutions

There are very good assert js library out there like validator, check-type or lodash.
Esteban is different because it is not a dedicated assert library.
It is an hybrid to enjoy better of several worlds.

Our assertions is suffisent to perform most of your daily tasks. If you want more, you can extends them with your preffered assert library.

``` javascript
$$.verify(foo).resolve(validator.isUrl);
// or more interesting
$$.on(foo).reject(validator.isUrl).do($$.make.exit);
// ...or
$$.on(userData).reject(validator.isUrl).do($$.make.debug);
// ...or
$$.on(userData).reject(validator.isUrl).do($$.make.writeLog);
// ... or
$$.on(userData).reject(validator.isUrl).do($$.make.apply(yourOwnMakeFunction);
```

# See Also

**Tl;Tr**
* TicTacTao (Alias TAO): Practical framework for better automation and high-yield development 
* _More to come: If you appreciate Esteban and/or TicTacToc you will love what comming_

### Deuslynn OSB ###
EstebanJs is provided to you by Deuslynn OSB (OpenSource Bureau).

Our mission is to help developers and makers to build better solutions, faster.
We design and build practical tools, apps and solutions to help you spend more time on coding innovation than spending time on low-yields tasks or chores.<br/>
Visit deuslynn.com/osb for more information.

# Signature
A Deuslynn Open Source Bureau Product.
Designed with ❤️ for you, in Paris🗼