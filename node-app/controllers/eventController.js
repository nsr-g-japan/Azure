'use strict';

const evenData = require('../data/events');



const getEvents =async(req, res, next ) => {
    try {
        const Id=req.params.id;
        const events = await evenData.getEvents(Id);
        res.send(events);
    }
    catch(error){
        
        res.status(400).send(error,message);

    }

}

const getEvent =async(req, res, next ) => {
    try {
        const Id=req.params.id;
        console.log(Id);
        const oneEvent = await evenData.getById(Id);
        res.send(oneEvent);
    }
    catch(error){
        res.status(400).send(error,message);

    }

}

const newevent =async(req, res, next ) => {
    try {
        const Id=req.params.id;
        const oneEvent = await evenData.getByNewId(Id);
        res.send(oneEvent);
    }
    catch(error){
        res.status(400).send(error,message);

    }

}

const drillevent =async(req, res, next ) => {
    try {
        const Id=req.params.id;
        console.log(Id);
        const oneEvent = await evenData.drillEvent(Id);
        res.send(oneEvent);
    }
    catch(error){
        res.status(400).send(error,message);

    }

}

const updateevent =async(req, res, next ) => {
    try {
        
        const data=req.body;
        console.log(data);
        const updated = await evenData.updateEvent(data);
        res.send(updated);
    }
    catch(error){
        res.status(400).send(error,message);

    }

}



const dbconfigure =async(req, res, next ) => {
    try {
        const data=req.body;
        const updated = await evenData.sqldbconfigure(data);
        
    }
    catch(error){
        res.status(400).send(error,message);

    }

}

const getTable =async(req, res, next ) => {
    try {
        const events = await evenData.getTableName();
        res.send(events);
    }
    catch(error){
        console.log("errroro")
        res.status(400).send(error,message);

    }

}

const savedata =async(req, res, next ) => {
    try {
        const data=req.body;
        console.log(data);
        const updated = await evenData.saveEvent(data);
        res.send(updated);
    }
    catch(error){
        res.status(400).send(error,message);

    }

}

const createtable =async(req, res, next ) => {
    try {
        const data=req.body;
        const updated = await evenData.createsqltable(data);
        res.send(updated);
    }
    catch(error){
        res.status(400).send(error,message);

    }

}


module.exports ={

    getEvents,
    getEvent,
    dbconfigure,
    getTable,
    savedata,
    createtable,
    newevent,
    drillevent,
    updateevent,

}