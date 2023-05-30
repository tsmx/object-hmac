describe('object-hmac test suite', () => {

    const objectHmac = require('../object-hmac');
    const testKey = 'HmacSecret-0815';
    const testKeyBroken = 'HmacSecret-4711';
    const testHmac = 'd5d182ef5b153107defbe4f96583c03ec3bd154ba38ca7ac41d0975eb15215c7';
    const testHmacAttribute = '__hmac';
    const testHmacAttributeDifferent = '_signature';
    var testObjects = null;

    beforeEach(() => {
        jest.resetModules();
        testObjects = require('./testobjects');
    });

    it('tests a successful HMAC creation and verification - end-to-end', async () => {
        let person = {
            name: 'Max',
            age: 32
        };
        objectHmac.createHmac(person, testKey);
        expect(person[testHmacAttribute]).toBeDefined();
        expect(objectHmac.verifyHmac(person, testKey)).toBeTruthy();
    });

    it('tests a successful HMAC calculation', async () => {
        const hmac = objectHmac.calculateHmac(testObjects.testObject, testKey);
        expect(hmac).toStrictEqual(testHmac);
    });

    it('tests a successful HMAC creation for an object', async () => {
        let obj = testObjects.testObject;
        expect(obj[testHmacAttribute]).toBeUndefined();
        objectHmac.createHmac(obj, testKey);
        expect(obj[testHmacAttribute]).toStrictEqual(testHmac);
    });

    it('tests a successful HMAC creation for an object with a different attribute name', async () => {
        let obj = testObjects.testObject;
        expect(obj[testHmacAttributeDifferent]).toBeUndefined();
        objectHmac.createHmac(obj, testKey, testHmacAttributeDifferent);
        expect(obj[testHmacAttributeDifferent]).toStrictEqual(testHmac);
    });

    it('test a successful HMAC verification', async () => {
        expect(objectHmac.verifyHmac(testObjects.testObjectWithHmac, testKey)).toBeTruthy();
    });

    it('test a successful HMAC verification - JSON with changed attribute order', async () => {
        expect(objectHmac.verifyHmac(testObjects.testObjectWithHmacChangedOrder, testKey)).toBeTruthy();
    });

    it('test a successful HMAC verification - JSON with changed attribute order in a subobject', async () => {
        expect(objectHmac.verifyHmac(testObjects.testObjectWithHmacChangedSubobjectOrder, testKey)).toBeTruthy();
    });

    it('test a successful HMAC verification - JSON loaded from a file via require', async () => {
        let testObj = require('./testobject');
        expect(objectHmac.verifyHmac(testObj, testKey)).toBeTruthy();
    });

    it('test a successful HMAC verification - JSON loaded from a file via fs', async () => {
        let fs = require('fs');
        let path = require('path');
        let testObj = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'testobject.json'), 'utf8'));
        expect(objectHmac.verifyHmac(testObj, testKey)).toBeTruthy();
    });

    it('test a successful HMAC verification with a different attribute name', async () => {
        expect(objectHmac.verifyHmac(testObjects.testObjectWithHmacDifferentAttribute, testKey, testHmacAttributeDifferent)).toBeTruthy();
    });

    it('test a failed HMAC verification - different attribute name', async () => {
        expect(objectHmac.verifyHmac(testObjects.testObjectWithHmac, testKey, testHmacAttributeDifferent)).toBeFalsy();
    });

    it('test a failed HMAC verification - no HMAC provided for object', async () => {
        expect(objectHmac.verifyHmac(testObjects.testObject, testKey)).toBeFalsy();
    });

    it('test a failed HMAC verification - changed object attribute', async () => {
        expect(objectHmac.verifyHmac(testObjects.testObjectChangedAttribute, testKey)).toBeFalsy();
    });

    it('test a failed HMAC verification - changed array order', async () => {
        expect(objectHmac.verifyHmac(testObjects.testObjectWithHmacChangedArrayOrder, testKey)).toBeFalsy();
    });

    it('test a failed HMAC verification - added object attribute', async () => {
        expect(objectHmac.verifyHmac(testObjects.testObjectAddedAttribute, testKey)).toBeFalsy();
    });

    it('test a failed HMAC verification - deleted object attribute', async () => {
        expect(objectHmac.verifyHmac(testObjects.testObjectDeletedAttribute, testKey)).toBeFalsy();
    });

    it('test a failed HMAC verification - manipulated HMAC', async () => {
        expect(objectHmac.verifyHmac(testObjects.testObjectManipulatedHmac, testKey)).toBeFalsy();
    });

    it('test a failed HMAC verification - wrong key', async () => {
        expect(objectHmac.verifyHmac(testObjects.testObjectWithHmac, testKeyBroken)).toBeFalsy();
    });

    it('test a failed HMAC verification - obj is null', async () => {
        expect(objectHmac.verifyHmac(null, testKey)).toBeFalsy();
    });

});