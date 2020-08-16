// DEPENDENCIES
// const cors = require('cors');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3003;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/' + 'hoochnet';
const CabinetItem = require('./models/cabinet.js')
const router = express.Router()

// MIDDLEWARE
// const whitelist = ["http://localhost:3003/", "http://localhost:3000"]
// const corsOptions = {
//     origin: function (origin, callback) {
//         if (whitelist.indexOf(origin) >= 0) {
//             callback(null, true);
//         } else {
//             console.log(origin);
//             callback(new Error('Not Allowed by CORS >:('))
//         }
//     },
// };

// CORS SETUP
// app.use(cors(corsOptions));
// app.use(function(req, res, next) { 
//     res.header("Access-Control-Allow-Origin", '*');    
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
//     next();});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// MONGO CONNECTION

mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
});
mongoose.connection.on("error", (err) =>
    console.log(err.message + " is Mongod not running?")
);
mongoose.connection.on("disconnected", () => console.log("disconnected"));
mongoose.connection.once("open", () => {
    console.log("connected to mongoose...");
});

// CONTROLLERS and ROUTES
    // Plain Route
    app.get("/", (req, res) => {
        res.send("Hello")
    })
    // Index Route
    app.get("/cabinet/:userID", (req, res) => {
        CabinetItem.find({userId: req.params.userID}, (error, userCabinet) => {
            res.send(userCabinet)
        })
    })
    // New Cabinet Item Route
    app.post('/cabinet/new', (req, res) => {
        CabinetItem.create(req.body, (error, createdCabinetItem)=> {
            if(error) {
                return res.status(400).json({error: error.message})
            }
            res.status(200).send(createdCabinetItem)
        })
    })


// LISTENER
app.listen(PORT, () => {
    console.log('Listening on Port ' + PORT);
})