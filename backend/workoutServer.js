require('dotenv').config()

const express = require ('express');
const mongoose = require ('mongoose');
const workoutRoutes = require('./routes/workoutRouter')


//express app
const app = express();

//middleware
app.use(express.json())//
app.use((req, res, next) => {
    console.log(req.path, req.method)//logging req
    console.log(res)
    next()
})

//port
const port = process.env.PORT;

//dbURI
const dbURI = process.env.MONGO_URI;

//routes
app.use('/api/workouts' , workoutRoutes);

//connect to DB
mongoose.set('strictQuery' , false);
mongoose.connect(dbURI)
    .then(() => {
        // connect to port
        app.listen(port, () => {
            console.log(`conected DB & to listenin on port : ${port}?`)
        });
    })
    
    .catch((err) => {
        console.log(err);
    })

