const mongoose = require ('mongoose')
const WorkoutData = require ('../models/workoutModel')

//get all workouts
const getAllWorkouts = async(req, res) => {
    const allWorkouts = await WorkoutData.find({}).sort({createdAt : -1})
    
    res.status(200).json(allWorkouts)
}

//post a new workouts
const createWorkout = async(req, res) => {
    const {title, load, reps} = req.body
    
    try {
        const workoutDoc = await WorkoutData.create({
            title,
            load,
            reps
        })
        res.status(200).json(workoutDoc)
    } catch (error) {
        res.status(400).json({error : error.message})
    }
}

//get a single workouts /:id
const getSingleWorkout = async (req, res) => {
    const {id} = req.params
    
    //to validate an objectid is valid.
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            error : "there is no such workout!"
        })
    }
    
    const singleWorkout = await WorkoutData.findById(id)
    
    //await for the promise to resolve with specific id
    if (!singleWorkout) {
        return res.status(404).json({
            error : "there is no such workout!"
        })
    }
    
    res.status(200).json(singleWorkout)
}

//delete a workout /:id
const deleteWorkout = async (req, res) => {
    const {id} = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            error : "there is no such workout!"
        })
    }
    
    const targetWorkout = await WorkoutData.findOneAndDelete({_id : id})
    
    if(!targetWorkout) {
        return res.status(404).json({
            error : "there is no such workout!"
        })
    }
    
    res.status(200).json(targetWorkout)
}

//patch a workout /:id
const updateWorkout = async (req, res) => {
    const {id} = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            error : "there is no such workout!"
        })
    }
    
    const workoutToUpdate = await WorkoutData.findOneAndUpdate({_id : id}, {
        ...req.body
    })
    
    if (!workoutToUpdate) {
        return res.status(404).json({
            error : "There is no such Workout to update!"
        })
    }
    
    res.status(200).json(workoutToUpdate);
}

module.exports = {
    getAllWorkouts,
    createWorkout,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout
}