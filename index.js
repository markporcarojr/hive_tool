const express = require('express')
const app = express();
const path = require('path');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const moment = require('moment');
const { log } = require('console');
const Hive = require('./models/hive');


app.use(express.static(path.join(__dirname, '/public')));
// sets the ejs engine
app.set('view engine', 'ejs');

// Body parser middleware

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Database url
const url = 'mongodb+srv://markporcarojr:Hivetool19!@hivetooldb.9hg6xxt.mongodb.net/HiveTool?retryWrites=true&w=majority'

///connecting application with database
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Mongo DB Connected');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });

// Import Models


// ************* ROUTING ******************



// Route to Feeding Form
app.get('/feeding-form', (req, res) => {
    res.render('feeding-form', { title: 'New Feeding' })
})

// Route to Feeding
app.get('/feeding', (req, res) => {
    res.render('feeding', { title: 'Feeding' })
})

// Route to harvest-form
app.get('/harvest-form', (req, res) => {
    res.render('harvest-form', { title: 'New Harvest' })
})

// Route to harvest
app.get('/harvest', (req, res) => {
    res.render('harvest', { title: 'Harvest' })
})

// Route to hive-form
app.get('/hive-form', (req, res) => {
    res.render('hive-form', { title: 'New Hive' })
})

// Route to home
app.get('/', (req, res) => {
    Hive.find().then(data => {
        // console.log(data);
        res.render('home', { title: 'Apiary', data: data });
    }).catch(err => console.log(err));
})

// Route to inspection-form
app.get('/inspection-form', (req, res) => {
    res.render('inspection-form', { title: 'New Inspection' })
})

// Route to inspection
app.get('/inspection', (req, res) => {
    res.render('inspection', { title: 'Inspections' })
})

// Route to inventory-form
app.get('/inventory-form', (req, res) => {
    res.render('inventory-form', { title: 'New Equipment' })
})

// Route to inventory
app.get('/inventory', (req, res) => {
    res.render('inventory', { title: 'Inventory' })
})

// Route to login
app.get('/login', (req, res) => {
    res.render('login', { title: 'Login' })
})

// Route to swarmtrap-form
app.get('/swarmtrap-form', (req, res) => {
    res.render('swarmtrap-form', { title: 'New Swarm Trap' })
})

// Route to swarmtrap
app.get('/swarmtrap', (req, res) => {
    res.render('swarmtrap', { title: 'Swarm Traps' })
})

// Route to treatment-form
app.get('/treatment-form', (req, res) => {
    res.render('treatment-form', { title: 'New Treatment' })
})

// Route to treatment
app.get('/treatment', (req, res) => {
    res.render('treatment', { title: 'Treatments' })
})

// ************* ROUTING ******************


// Route for saving hive card
app.post('/add-to-hive-card', (req, res) => {
    // save data on the database
    const Data = new Hive({
        hiveNumber: req.body.hiveNumber,
        breed: req.body.breed,
        hiveStrength: req.body.hiveStrength,
        hiveDate: req.body.hiveDate
    })
    // this returns a promise
    Data.save().then(() => {
        res.redirect('/')
    }).catch(err => console.log(err));
})

TODO: // fix the route to the edit page

// route for editing records
app.get('/edit-hive/:id', (req, res) => {
    Hive.findOne({
        _id: req.params.id
    }).then(data => {

        res.render('edit-hive', { data: data, title: 'Edit Hive' })
    }).catch(err => console.log(err))

})



app.listen(3000, () => {
    console.log('Listening on port 3000')
})