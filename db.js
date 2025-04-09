const mongoose = require("mongoose");

var mongoURL = 'mongodb+srv://Yuno:Pie4ever@cluster0.h4wrhsg.mongodb.net/AVA-Rooms'

mongoose.connect(mongoURL , {useUnifiedTopology : true , useNewUrlParser:true})

var connection = mongoose.connection 

connection.on('error', ()=>{
    console.log('Mongo DB Connection failed')
})

connection.on('connected' , ()=>{
    console.log('Mongo DB Connection Successful')
})

module.exports = mongoose