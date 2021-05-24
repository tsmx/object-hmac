const crypto = require('crypto');
const jt = require('@tsmx/json-traverse');

function createOrderedObjectString(obj) {
    let attributes = [];
    const callbacks = {
        processValue: (key, value, _level, path, _isObjectRoot, _isArrayElement, _cbSetValue) => {
            attributes.push((path.length > 0 ? (path.join('.') + '.') : '') + key + '=' + value);
        }
    };
    jt.traverse(obj, callbacks);
    attributes.sort();
    return attributes.join('|');
}

function createHmac(obj, key, hmacAttribute = '__hmac') {
    const hmac = calculateHmac(obj, key);
    obj[hmacAttribute] = hmac;
}

function calculateHmac(obj, key) {
    let hmac = crypto.createHmac('sha256', key);
    hmac.update(createOrderedObjectString(obj));
    return hmac.digest('hex');
}

function verifyHmac(obj, key, hmacAttribute = '__hmac') {
    if (!obj) return false;
    const providedHmac = obj[hmacAttribute];
    let hmacObj = { ...obj };
    delete hmacObj[hmacAttribute];
    const calculatedHmac = calculateHmac(hmacObj, key);
    return calculatedHmac === providedHmac;
}

module.exports.createHmac = createHmac;
module.exports.calculateHmac = calculateHmac;
module.exports.verifyHmac = verifyHmac;