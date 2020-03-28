const connection = require('../database/connection');
const generateUniqueId = require('../utils/generateuniqueid');

module.exports = {

    async readOngList(request, response) {
        const data = await connection('ongs').select('*');
        return response.json(data);
    },

    async createOng(request, response) {
        const { name, email, zap, city, uf } = request.body;
        const id = generateUniqueId();

        await connection('ongs').insert( { id, name, email, zap, city, uf } );

        return response.json( { id } );
    }

};