describe('object-hmac test suite', () => {

    const objectHmac = require('../object-hmac');
    const testKey = 'HmacSecret-0815';
    const testHmac = 'bb83e36f2c030af71803fd6a82b49ea638944bb6638351754a967f4f5638ac3b';
    var testObjects = null;

    beforeEach(() => {
        jest.resetModules();
        testObjects = require('./testobjects');
    });

    it('tests a successful HMAC calculation', async (done) => {
        const hmac = objectHmac.calculateHmac(testObjects.testObject, testKey);
        expect(hmac).toStrictEqual(testHmac);
        done();
    });

    it('tests a successful HMAC creation for an object', async (done) => {
        let obj = testObjects.testObject;
        expect(obj['__hmac']).toBeUndefined();
        objectHmac.createHmac(obj, testKey);
        expect(obj['__hmac']).toStrictEqual(testHmac);
        done();
    });

    it('test a successful HMAC verification', async (done) => {
        expect(objectHmac.verifyHmac(testObjects.testObjectWithHmac, testKey)).toBeTruthy();
        done();
    });

    it('test a failed HMAC verification - no HMAC provided for object', async (done) => {
        expect(objectHmac.verifyHmac(testObjects.testObject, testKey)).toBeFalsy();
        done();
    });

    it('test a failed HMAC verification - changed object attribute', async (done) => {
        expect(objectHmac.verifyHmac(testObjects.testObjectChangedAttribute, testKey)).toBeFalsy();
        done();
    });

    it('test a failed HMAC verification - added object attribute', async (done) => {
        expect(objectHmac.verifyHmac(testObjects.testObjectAddedAttribute, testKey)).toBeFalsy();
        done();
    });

    it('test a failed HMAC verification - deleted object attribute', async (done) => {
        expect(objectHmac.verifyHmac(testObjects.testObjectDeletedAttribute, testKey)).toBeFalsy();
        done();
    });

    it('test a failed HMAC verification - manipulated HMAC', async (done) => {
        expect(objectHmac.verifyHmac(testObjects.testObjectManipulatedHmac, testKey)).toBeFalsy();
        done();
    });

});