const express = require('express');
const ongController = require('./controllers/ongctrl');
const incidentController = require('./controllers/incidentctrl');
const sessionController = require('./controllers/session')

const routes = express.Router();

routes.post('/session', sessionController.initSession);

routes.get('/ongs', ongController.readOngList);
routes.post('/ongs', ongController.createOng);

routes.get('/incidents', incidentController.readIncidentList);
routes.get('/incidentsfong', incidentController.readOngIncidents);
routes.post('/incidents', incidentController.createIncident);
routes.delete('/incidents/:id', incidentController.deleteIncident);

module.exports = routes;