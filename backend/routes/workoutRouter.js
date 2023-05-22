const express = require('express')
const {
    getAllWorkouts,
    createWorkout,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controller/workoutController')

const router = express.Router();

//GET all the workouts
router.get('/', getAllWorkouts)

//POST, cretes new workouts
router.post('/', createWorkout)

//GET a single workout
router.get('/:id' , getSingleWorkout)

//DELETE a workout
router.delete('/:id' , deleteWorkout)

//PATCH, updates single workouts
router.patch('/:id' , updateWorkout)

module.exports = router