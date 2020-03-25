const connection = require('../database/connection');

module.exports = {
    async initSession(request, response) {
        const { id } = request.body;

        const thisOng = await connection('ongs').where('id', id).select('name').first();

        if(!thisOng) {
            return response.status(400).json( { error: 'No ONG found with this ID.' } );
        }

        return response.json(thisOng);
    }
}