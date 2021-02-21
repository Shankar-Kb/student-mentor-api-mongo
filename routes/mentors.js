var express = require('express');
var router = express.Router();
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const dbUrl = "mongodb+srv://ShankarKb:mongodb@cluster0.w8xxl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const dbName = "studentmentorDatabase";

router.get("/mentors", async(req,res)=>{

    try {
        let client = await mongoClient.connect(dbUrl);
        let db = client.db(dbName);
        let mentors = await db.collection("mentors").find().toArray();
        client.close();
        res.json(mentors);
       
    } catch (error) {
        console.log(error);
        res.json({
            message:"Something went wrong"
        })
    }
 })

 router.put("/mentor/:id/add-students", async(req,res)=>{

    try {
        let client = await mongoClient.connect(dbUrl);
        let db = client.db(dbName);
        let id = mongodb.ObjectID(req.params.id);
        if(Array.isArray(req.body.names)) let mentor = await db.collection("mentors").updateOne({_id:id},{$set:{students:req.body.names}});
        client.close();
        res.json(mentor);
    } catch (error) {
        console.log(error)
        res.json({
            message:"Something went wrong"
        })
    }
 })

 router.put("/mentor/:id", async(req,res)=>{

    try {
        let client = await mongoClient.connect(dbUrl);
        let db = client.db(dbName);
        let id = mongodb.ObjectID(req.params.id);
        let mentor = await db.collection("mentors").updateOne({_id:id},{$set:{name:req.body.name}});
        client.close();
        res.json(mentor);
    } catch (error) {
        console.log(error);
        res.json({
            message:"Something went wrong"
        })
    }
    })
  
 router.post("/mentor", async(req,res)=>{

    try {
        let client = await mongoClient.connect(dbUrl);
        let db = client.db(dbName);
        let count = await db.collection("mentors").find().toArray();
        let mentor = await db.collection("mentors").insertOne({name:req.body.name, id: count.length + 1, students: []});
        client.close();
        res.json({
                id: mentor.insertedId,
                message: `Entry has been added.`
            })
    } catch (error) {
        console.log(error)
        res.json({
            message:"Something went wrong"
        })
       
    }
})
  
 router.get("/mentor/:id", async(req,res)=>{

    try {
        let client = await mongoClient.connect(dbUrl);
        let db = client.db(dbName);
        let id = mongodb.ObjectID(req.params.id);
        let mentor = await db.collection("mentors").findOne({_id:id});
        client.close();
        res.json(mentor)
    } catch (error) {
        console.log(error)
        res.json({
            message:"Something went wrong"
        })
    }
 })

 router.get("/mentor/:id/students", async(req,res)=>{

    try {
        let client = await mongoClient.connect(dbUrl);
        let db = client.db(dbName);
        let id = mongodb.ObjectID(req.params.id);
        let mentor = await db.collection("mentors").findOne({_id:id});
        client.close();
        res.json(mentor.students);
    } catch (error) {
        console.log(error)
        res.json({
            message:"Something went wrong"
        })
    }
 })
  
 router.put("/mentor/:id", async(req,res)=>{

    try {
        let client = await mongoClient.connect(dbUrl);
        let db = client.db(dbName);
        let id = mongodb.ObjectID(req.params.id);
        let mentor = await db.collection("mentors").updateOne( {_id:id},{$set:{name:req.body.name}} );
        client.close();
        res.json(mentor);
    } catch (error) {
        console.log(error);
        res.json({
            message:"Something went wrong"
        })
    }
    })
  
 router.delete("/mentor/:id", async(req,res)=>{

    try {
        let client = await mongoClient.connect(dbUrl);
        let db = client.db(dbName);
        let id = mongodb.ObjectID(req.params.id);
        let mentor = await db.collection("mentors").findOneAndDelete({_id:id});
        client.close();
        res.json(mentor);
    } catch (error) {
        console.log(error);
        res.json({
            message:"Something went wrong"
        })
    }
 })
 
 module.exports = router;