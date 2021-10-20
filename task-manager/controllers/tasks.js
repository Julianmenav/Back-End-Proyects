const Task = require('../models/Tasks')

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(201).json({success: true, data: tasks})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}
const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json({success: true, data: task})
    } catch (error) {
        res.status(500).json({msg: error})
    }
}
const getTask = async (req, res) => {
    try {
        const task = await Task.findOne({_id: req.params.id}) //.findById(req.params.id)
        if(!task) return res.status(404).json({ msg: `No task with id ${req.params.id}`})
        res.status(201).json({success: true, data: task})
    } catch (error) {
        res.status(500).json({msg: error})
    }
}
const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new:true, 
            runValidators: true
        })
        if(!task) return res.status(404).json({ msg: `No task with id ${req.params.id}`})
        res.status(200).json({success: true, data: task})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task) return res.status(404).json({ msg: `No task with id ${req.params.id}`})
        res.status(200).send()
    } catch (error) {
        res.status(500).json({msg: error})
    } 
}





module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}