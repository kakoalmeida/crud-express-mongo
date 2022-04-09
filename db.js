const mongoClient = require('mongodb').MongoClient;

// Make sure to pass the Docker ip address of the database to be able to connect to it
// Change this before running the app in your device
mongoClient.connect("mongodb://kako:1234@172.17.0.1:27017/admin").then(conn => global.conn = conn.db("app")).catch(err => console.log(err)); 

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