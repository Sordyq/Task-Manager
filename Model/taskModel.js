const mongoose = require('mongoose');
const {Schema, model} = mongoose

const taskSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    discription:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        enum:['Urgent', 'Important'],
        required:true
    }
})

const taskModel = mongoose.model('task', taskSchema)
module.exports = taskModel