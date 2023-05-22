const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    title : {
        type : String,
        require : true
    },
    load : {
        type : Number,
        require : true
    },
    reps : {
        type : Number,
        require : true
    }
}, {timestamps : true, timeseries : true});

module.exports = mongoose.model('workoutCollection' , workoutSchema);