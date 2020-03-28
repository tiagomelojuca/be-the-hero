const generateUniqueId = require('../../src/utils/generateuniqueid')

describe('', () => {
    it('should generate an unique ID', () => {
        expect(generateUniqueId()).toHaveLength(8);
    });
});