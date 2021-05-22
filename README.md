# [**@tsmx/object-hmac**](https://github.com/tsmx/object-hmac)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
![npm (scoped)](https://img.shields.io/npm/v/@tsmx/object-hmac)
![node-current (scoped)](https://img.shields.io/node/v/@tsmx/object-hmac)
[![Build Status](https://img.shields.io/github/workflow/status/tsmx/object-hmac/git-ci-build)](https://img.shields.io/github/workflow/status/tsmx/object-hmac/git-ci-build)
[![Coverage Status](https://coveralls.io/repos/github/tsmx/object-hmac/badge.svg?branch=master)](https://coveralls.io/github/tsmx/object-hmac?branch=master)

> Create and verify HMAC for a JSON object.

Easily create and verify [HMAC's](https://en.wikipedia.org/wiki/HMAC) for your JSON objects to ensure data integrity and authenticity. 

## Usage

### Create and add HMAC to a JSON object

```js
const objectHmac = require('@tsmx/object-hmac');
const key = 'HmacSecret-0815';

let person = {
    name: 'Max',
    age: 32,
    hobbies: ['sports', 'travelling']
};

objectHmac.createHmac(person, key);

// person = {"name":"Max","age":32,"hobbies":["sports","travelling"],"__hmac":"37c2e448b6f4a72c9d8abc9a1ab6cada602c3785148caeeed5498ed065ddc69f"}
```

### Verify HMAC for a JSON object

```js
// person = {"name":"Max","age":32,"hobbies":["sports","travelling"],"__hmac":"37c2e448b6f4a72c9d8abc9a1ab6cada602c3785148caeeed5498ed065ddc69f"}

const objectHmac = require('@tsmx/object-hmac');
const key = 'HmacSecret-0815';

let verification = objectHmac.verifyHmac(person, key);
// true

person.age = 33;

let verificationAfterChange = objectHmac.verifyHmac(person, key);
// false
```

### Only calculate HMAC for a JSON object

```js
const objectHmac = require('@tsmx/object-hmac');
const key = 'HmacSecret-0815';


let person = {
    name: 'Max',
    age: 32,
    hobbies: ['sports', 'travelling']
};

let hmac = objectHmac.calculateHmac(person, key);
// 37c2e448b6f4a72c9d8abc9a1ab6cada602c3785148caeeed5498ed065ddc69f
```

## API

### createHmac(obj, key, hmacAttribute = '__hmac')

Calculates the HMAC of `obj` and attaches it as value of attribute `obj[hmacAttribute]`.

#### obj

Type: `Object`

The object to calculate and store the HMAC for.

#### key

Type: `String`

The key to calculate the objects HMAC.

#### hmacAttribute

Type: `String`
Default: `__hmac`

The name of the attribute to store the HMAC value in `obj`. Make sure that the name of the attribute is not overkapping with other attributes already in use.

### verifyHmac(obj, key, hmacAttribute = '__hmac')

Verifies the HMAC attached to `obj`. Returns `true` if the validation was successful, otherwise false `false`.

The verification would fail and return `false`, if...
- `obj` is null
- `obj` doesn't provide a HMAC to check against
- `obj` was manipulated: at least one attribute was changed, added or deleted (deep-inspection including all nested objects/arrays)
- the HMAC of `obj` was manipulated
- `key` is deviating from the one the HMAC was created with

#### obj

Type: `Object`

The object of which the HMAC should be verified. The given HMAC to be verified is assumed to exist as an attribute in the object itself: `obj[hmacAttribute]`.

#### key

Type: `String`

The key to calculate the objects HMAC and validate against the given one. Must be identical to the `key` that was used to create the original HMAC for the object for a successful verification.

#### hmacAttribute

Type: `String`
Default: `__hmac`

The name of the attribute for the HMAC value in `obj` to be verified against.

### calculateHmac(obj, key)

Calculates and returns the HMAC of `obj`.

Takes **all** of `obj` attributes into account for calculating the HMAC. So make sure that there isn't already a HMAC attribute created in the object. Otherwise this would also being used as an input for the calculation.

#### obj

Type: `Object`

The object to calculate the HMAC for.

#### key

Type: `String`

The key to calculate the objects HMAC.

## Under the hood

To create and verify the HMAC, standard [NodeJS crypto functions](https://nodejs.org/docs/latest-v12.x/api/crypto.html#crypto_class_hmac) are used.

The HMAC is generated by using the following parameters:
- Hash function: SHA-256
- Digest output encoding: Hexadecimal String


## Test

```
npm install
npm test
```