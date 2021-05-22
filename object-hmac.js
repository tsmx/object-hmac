const crypto = require('crypto');

function createHmac(obj, key, hmacAttribute = '__hmac') {
    const hmac = calculateHmac(obj, key);
    obj[hmacAttribute] = hmac;
}

function calculateHmac(obj, key) {
    let hmac = crypto.createHmac('sha256', key);
    hmac.update(JSON.stringify(obj));
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