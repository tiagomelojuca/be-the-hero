const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const ongController = require('./controllers/ongctrl');
const incidentController = require('./controllers/incidentctrl');
const sessionController = require('./controllers/session')

const routes = express.Router();

routes.post('/session', sessionController.initSession);

routes.get('/ongs', ongController.readOngList);

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        zap: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), ongController.createOng);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), incidentController.readIncidentList);

routes.get('/incidentsfong', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), incidentController.readOngIncidents);

routes.post('/incidents', incidentController.createIncident);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), incidentController.deleteIncident);

module.exports = routes;