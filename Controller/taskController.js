const taskModel = require('../Model/taskModel');
const passport = require('passport');
const mongoose = require('mongoose')

const createTask = async (req,res) =>{
    const {title, discription, tag } = req.body;
    try{
        const task = new taskModel({ title, discription, tag});
        const savedTask = task.save();
        return res.status(201).json({msg: 'new task created', task});
    } catch(error){
        console.error(error)
        return res.status(500).json({error: 'Server error'});
    }
}

const updateTask = async (req,res)=>{
    try{
        const taskId = req.params.id
        const {title, discription, tag} = req.body;

        const updatedtask = await taskModel.findByIdAndUpdate(taskId, req.body,
            {new:true, runValidators:true});
        if(!updatedtask){
            return res.status(404).json({error: 'Task not found'});
        }res.json(updatedtask);
    } catch (error){
        console.error(error)
        return res.status(500).json({error: 'Server error'});
    }
}

const getTask = async(req,res)=>{
    try{
        const task = await taskModel.findById(req.params.id);

        if(!task){
            return res.status(404).json({error: 'Task not found'})
        }
        res.json(task);
    } catch (error){
        console.error(error);
        res.status(500).json({error: 'Server error'})
    }
}

const getAllTask = async (req,res)=>{
    try{
        const task = await taskModel.find();
        res.json(task); 
    } catch(error){
        console.error(error)
        return res.status(500).json({error: 'Server error'})
    }
}

const deleteTask = async (req,res)=>{
    try{
        const _id = req.params.id
        const deletedTask = await taskModel.findByIdAndDelete({_id});
        if(!deletedTask){
            return res.status(404).json({error: 'Task not found, or has been deleted!'})
        }
        res.json({msg: 'Task deleted successfully!'})
    } catch (error){
        console.error(error);
        res.status(500).json({error: 'Server error'})
    }
}

module.exports ={
    createTask, 
    updateTask, 
    getTask, 
    getAllTask,
    deleteTask
}