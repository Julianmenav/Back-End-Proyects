const Task = require('../models/Tasks')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')

const getAllTasks = asyncWrapper( async (req, res) => {
    const tasks = await Task.find({})
    res.status(201).json({tasks})
})
const createTask = asyncWrapper( async (req, res) => {
    const task = await Task.create(req.body)
    res.status(200).send()
})
const getTask = asyncWrapper( async (req, res, next) => {
    const task = await Task.findOne({_id: req.params.id}) //.findById(req.params.id)
    if(!task) {
        return next(createCustomError(`No task with id ${req.params.id}`, 404))
    }
    res.status(201).json({task})
})
const updateTask = asyncWrapper( async (req, res, next) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new:true, 
        runValidators: true
    })
    if(!task) {
        return next(createCustomError(`No task with id ${req.params.id}`, 404))
    }
    res.status(200).json({task})
})
const deleteTask = asyncWrapper( async (req, res, next) => {
    const task = await Task.findByIdAndDelete(req.params.id)
    if(!task) {
        return next(createCustomError(`No task with id ${req.params.id}`, 404))
    }
    res.status(200).send()
})





module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}