var express = require('express');
var router = express.Router();
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const dbUrl = "mongodb+srv://ShankarKb:mongodb@cluster0.w8xxl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const dbName = "studentmentorDatabase";
 
router.get("/students", async(req,res)=>{

    try {
        let client = await mongoClient.connect(dbUrl);
        let db = client.db(dbName);
        let students = await db.collection("students").find().toArray();
        client.close();
        res.json(students);
       
    } catch (error) {
        console.log(error);
        res.json({
            message:"Something went wrong"
        })
    }
 })

router.put("/student/:id/add-mentor", async(req,res)=>{

 try {
    let client = await mongoClient.connect(dbUrl);
    let db = client.db(dbName);
    let id = mongodb.ObjectID(req.params.id);
    await db.collection("students").updateOne({_id:id},{$set:{mentorName:req.body.name}});
    client.close();
    res.json({ message:"Mentor has been added" });
} catch (error) {
    console.log(error)
    res.json({
        message:"Record does not exist"
    })
}
})
 
router.post("/student", async(req,res)=>{

try {
    let client = await mongoClient.connect(dbUrl);
    let db = client.db(dbName);
    let count = await db.collection("students").find().toArray();
    let student = await db.collection("students").insertOne({name:req.body.name, id: count.length + 1});
    client.close();
    res.json({
            id: student.insertedId,
            message: `Entry has been added.`
        })
} catch (error) {
    console.log(error)
    res.json({
        message:"Something went wrong"
    })
   
}
})
 
router.get("/student/:id", async(req,res)=>{

    try {
        let client = await mongoClient.connect(dbUrl);
        let db = client.db(dbName);
        let id = mongodb.ObjectID(req.params.id);
        let student = await db.collection("students").findOne({_id:id});
        client.close();
        res.json(student)
    } catch (error) {
        console.log(error)
        res.json({
            message:"Something went wrong"
        })
    }
 })
 
router.put("/student/:id", async(req,res)=>{

try {
    let client = await mongoClient.connect(dbUrl);
    let db = client.db(dbName);
    let id = mongodb.ObjectID(req.params.id);
    let student = await db.collection("students").updateOne({_id:id},{$set:{name:req.body.name}});
    client.close();
    res.json(student);
} catch (error) {
    console.log(error);
    res.json({
        message:"Something went wrong"
    })
}
})
 
router.delete("/student/:id", async(req,res)=>{

   try {
       let client = await mongoClient.connect(dbUrl);
       let db = client.db(dbName);
       let id = mongodb.ObjectID(req.params.id);
       let student = await db.collection("students").findOneAndDelete({_id:id});
       client.close();
       res.json(student);
   } catch (error) {
       console.log(error);
       res.json({
           message:"Something went wrong"
       })
   }
})

module.exports = router;
