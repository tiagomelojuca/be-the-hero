const connection = require('../database/connection');

module.exports = {

    async readIncidentList(request, response) {
        const { page = 1 } = request.query;

        const [numberIncidents] = await connection('incidents').count();
        const data = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5).offset( (page - 1) *5 )
            .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.zap', 'ongs.city', 'ongs.uf']);

        response.header('X-Total-Count', numberIncidents['count(*)']);
        return response.json(data);
    },

    async readOngIncidents(request, response) {
        const ong_id = request.headers.authorization;
        const thisOngIncidents = await connection('incidents').where('ong_id', ong_id).select('*');
        
        return response.json(thisOngIncidents);
    },

    async createIncident(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert( { title, description, value, ong_id } );

        return response.json( { id } );
    },

    async deleteIncident(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const thisIncident = await connection('incidents').where('id', id).select('ong_id').first();

        if(thisIncident.ong_id != ong_id) {
            return response.status(401).json({
                error: 'Unauthorized access.'
            });
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }

}