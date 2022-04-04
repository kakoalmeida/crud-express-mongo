const mongoClient = require('mongodb').MongoClient;

mongoClient.connect("mongodb://kako:1234@localhost:27017/admin").then(conn => global.conn = conn.db("app")).catch(err => console.log(err));  // Connects to the database 

function getAllTasks(){
    return global.conn.collection("tasks").find({}).toArray();
}

function newTask(task){
    return global.conn.collection("tasks").insertOne(task);
}

const ObjectId = require('mongodb').ObjectId;

function getTask(id){
    return global.conn.collection("tasks").findOne(new ObjectId(id));
}

function updateTask(id, task){
    return global.conn.collection("tasks").updateOne( {_id: new ObjectId(id)}, {$set: task});
}

function deleteTask(id){
    return global.conn.collection("tasks").deleteOne({_id: new ObjectId(id)});
}

// function showTask(id, task, desc){
//     return global.conn.collection("tasks").findOne(new ObjectId(id));
// }

module.exports = { getAllTasks, newTask, getTask, updateTask, deleteTask };