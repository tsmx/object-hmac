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
    __hmac: 'd5d182ef5b153107defbe4f96583c03ec3bd154ba38ca7ac41d0975eb15215c7'
}

module.exports.testObjectWithHmacChangedOrder =
{
    title: 'Test-Object',
    subObject: {
        name: 'Max',
        age: 32,
        hobbies: ['sports', 'travelling']
    },
    numbers: [1, 12, 123],
    __hmac: 'd5d182ef5b153107defbe4f96583c03ec3bd154ba38ca7ac41d0975eb15215c7'
}

module.exports.testObjectWithHmacChangedArrayOrder =
{
    title: 'Test-Object',
    numbers: [123, 12, 1],
    subObject: {
        name: 'Max',
        age: 32,
        hobbies: ['sports', 'travelling']
    },
    __hmac: 'd5d182ef5b153107defbe4f96583c03ec3bd154ba38ca7ac41d0975eb15215c7'
}

module.exports.testObjectWithHmacChangedSubobjectOrder =
{
    title: 'Test-Object',
    numbers: [1, 12, 123],
    subObject: {
        name: 'Max',
        hobbies: ['sports', 'travelling'],
        age: 32
    },
    __hmac: 'd5d182ef5b153107defbe4f96583c03ec3bd154ba38ca7ac41d0975eb15215c7'
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
    _signature: 'd5d182ef5b153107defbe4f96583c03ec3bd154ba38ca7ac41d0975eb15215c7'
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
    __hmac: 'd5d182ef5b153107defbe4f96583c03ec3bd154ba38ca7ac41d0975eb15215c7'
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
    __hmac: 'd5d182ef5b153107defbe4f96583c03ec3bd154ba38ca7ac41d0975eb15215c7'
}

module.exports.testObjectDeletedAttribute =
{
    title: 'Test-ObjectX',
    subObject: {
        name: 'Max',
        age: 32,
        hobbies: ['sports', 'travelling']
    },
    __hmac: 'd5d182ef5b153107defbe4f96583c03ec3bd154ba38ca7ac41d0975eb15215c7'
}

module.exports.testObjectManipulatedHmac =
{
    title: 'Test-Object',
    numbers: [1, 12, 123],
    subObject: {
        name: 'Max',
        age: 32,
        hobbies: ['sports', 'travelling']
    },
    __hmac: 'd5d182ef5b153107defbe4f96583c03ec3bd154ba38ca7ac41d0975eb1521xxx'
}