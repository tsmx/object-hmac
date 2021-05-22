module.exports.testObject =
{
    title: 'Test-Object',
    numbers: [1, 12, 123],
    subObject: {
        name: 'Max',
        age: 32,
        hobbies: ['sports', 'travelling']
    }
}

module.exports.testObjectWithHmac =
{
    title: 'Test-Object',
    numbers: [1, 12, 123],
    subObject: {
        name: 'Max',
        age: 32,
        hobbies: ['sports', 'travelling']
    },
    __hmac: 'bb83e36f2c030af71803fd6a82b49ea638944bb6638351754a967f4f5638ac3b'
}

module.exports.testObjectWithHmacDifferentAttribute =
{
    title: 'Test-Object',
    numbers: [1, 12, 123],
    subObject: {
        name: 'Max',
        age: 32,
        hobbies: ['sports', 'travelling']
    },
    _signature: 'bb83e36f2c030af71803fd6a82b49ea638944bb6638351754a967f4f5638ac3b'
}

module.exports.testObjectChangedAttribute =
{
    title: 'Test-ObjectX',
    numbers: [1, 12, 123],
    subObject: {
        name: 'Max',
        age: 32,
        hobbies: ['sports', 'travelling']
    },
    __hmac: 'bb83e36f2c030af71803fd6a82b49ea638944bb6638351754a967f4f5638ac3b'
}

module.exports.testObjectAddedAttribute =
{
    title: 'Test-ObjectX',
    numbers: [1, 12, 123],
    color: 'Blue',
    subObject: {
        name: 'Max',
        age: 32,
        hobbies: ['sports', 'travelling']
    },
    __hmac: 'bb83e36f2c030af71803fd6a82b49ea638944bb6638351754a967f4f5638ac3b'
}

module.exports.testObjectDeletedAttribute =
{
    title: 'Test-ObjectX',
    subObject: {
        name: 'Max',
        age: 32,
        hobbies: ['sports', 'travelling']
    },
    __hmac: 'bb83e36f2c030af71803fd6a82b49ea638944bb6638351754a967f4f5638ac3b'
}

module.exports.testObjectManipulatedHmac =
{
    title: 'Test-ObjectX',
    numbers: [1, 12, 123],
    subObject: {
        name: 'Max',
        age: 32,
        hobbies: ['sports', 'travelling']
    },
    __hmac: 'bb83e36f2c030af71803fd6a82b49ea638944bb6638351754a967f4f5638aczz'
}