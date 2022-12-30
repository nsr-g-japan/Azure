'use strict';

const express = require('express');
const eventController =require('../controllers/eventController');
const routes = express.Router();
const{getEvents, getEvent, dbconfigure, getTable, savedata, createtable, newevent, drillevent, updateevent}=  eventController;


routes.get('/events/:id', getEvents);
routes.get('/event/:id', getEvent);
routes.post('/dbconfig', dbconfigure);
routes.get('/tables', getTable);
routes.post('/save', savedata);
routes.post('/create', createtable);
routes.get('/newevent/:id', newevent);
routes.get('/drillevent/:id', drillevent);
routes.post('/update', updateevent);



module.exports ={
    routes : routes
}