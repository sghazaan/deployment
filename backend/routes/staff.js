//record.js
//const { response } = require('express');
const express = require('express');

const staffRoutes = express.Router(); //recordRoutes

const dbo = require('../db/conn');

const ObjectId = require('mongodb').ObjectId;

//getting list of all records
staffRoutes.route('/staff').get(function(req,res){
    let db_connect = dbo.getDb("CafeAppDB");
    db_connect
    .collection("waiters")  //records
    .find({})
    .toArray(function(err, result){
        if(err) throw err;
        res.json(result);
    });
});

//getting single record by id
staffRoutes.route('/staff/:id').get(function(req,res) {
    let db_connect = dbo.getDb();
    let myquery = {_id: ObjectId(req.params.id)};
    db_connect
        .collection('waiters')
        .findOne(myquery, function(err, result) {
            if(err) throw err;
            res.json(result);
        });
});

//creating a new record
staffRoutes.route('/staff/add').post(function(req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
        name: req.body.name,
        number: req.body.number,
        level: req.body.level,
    };
    db_connect.collection("waiters").insertOne(myobj, function(err, res) {
        if (err) throw err;
        response.json(res);
    });
});

//updating a rec by id
staffRoutes.route('/update/:id').post(function(req,response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id)};
    let newValues = {
        $set: {
            name: req.body.name,
            number: req.body.number,
            level: req.body.level,
        },
    };
    db_connect
        .collection("waiters")
        .updateOne(myquery, newValues, function(err,res) {
            if(err) throw err;
            console.log("1 document updated");
            response.json(res);
        });
});

//deleting a record

staffRoutes.route('/:id').delete((req,response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id)};
    db_connect.collection("waiters").deleteOne(myquery, function(err,obj) {
        if (err) throw err;
        console.log("1 document deleted");
        response.json(obj);
    });
});

    module.exports = staffRoutes;