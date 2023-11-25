const express = require('express')
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const moment = require('moment');
const Hive = require('./models/hive');
const Inventory = require('./models/inventory');
const Inspection = require('./models/inspections');
const Feed = require('./models/feed');
const Swarm = require('./models/swarm');
const Harvest = require('./models/harvest');
const Treatment = require('./models/treatment');
const methodOverride = require('method-override');
const url = 'mongodb+srv://markporcarojr:Hivetool19!@hivetooldb.9hg6xxt.mongodb.net/HiveTool?retryWrites=true&w=majority'

// MIDDLEWARE

app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())





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




// ********************************* PAGE ROUTING *******************************************



// Route to Feeding Form
app.get('/feeding-form', (req, res) => {
    res.render('feeding-form', { title: 'New Feeding' })
})

// Route to Feeding
app.get('/feeding', (req, res) => {
    Feed.find().then(data => {
        res.render('feeding', { title: 'Feeding', data: data });
    }).catch(err => console.log(err));
})

// Route to harvest-form
app.get('/harvest-form', (req, res) => {
    res.render('harvest-form', { title: 'New Harvest' })
})

// Route to harvest
app.get('/harvest', (req, res) => {
    Harvest.find().then(data => {
        res.render('harvest', { title: 'Harvest', data: data });
    }).catch(err => console.log(err));
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
    Inspection.find().then(data => {
        res.render('inspection', { title: 'Inspection', data: data });
    }).catch(err => console.log(err));
})

// Route to inventory-form
app.get('/inventory-form', (req, res) => {
    res.render('inventory-form', { title: 'New Equipment' })
})

// Route to inventory
app.get('/inventory', (req, res) => {
    Inventory.find().then(data => {
        res.render('inventory', { title: 'Inventory', data: data });
    }).catch(err => console.log(err));
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
    Swarm.find().then(data => {
        res.render('swarmtrap', { title: 'Swarm Traps', data: data });
    }).catch(err => console.log(err));
})

// Route to treatment-form
app.get('/treatment-form', (req, res) => {
    res.render('treatment-form', { title: 'New Treatment' })
})

// Route to treatment
app.get('/treatment', (req, res) => {
    Treatment.find().then(data => {
        res.render('treatment', { title: 'Treatment', data: data });
    }).catch(err => console.log(err));
})

// ************************************ PAGE ROUTING END ************************************

// ===============================  EDIT PAGE ROUTING   (get)  ========================================
NOTE: // fixed the route to the edit page

// route for edit-feed page
app.get('/feed/edit/:id', (req, res) => {
    Feed.findOne({
        _id: req.params.id
    }).then(data => {
        res.render('edit-feed', { data: data, title: "Edit Feeding" })
    }).catch(err => console.log(err))
})

// route for edit-harvest page
app.get('/harvest/edit/:id', (req, res) => {
    Harvest.findOne({
        _id: req.params.id
    }).then(data => {
        res.render('edit-harvest', { data: data, title: "Edit Harvest" })
    }).catch(err => console.log(err))
})

// route for edit-hive page
app.get('/hive/edit/:id', (req, res) => {
    Hive.findOne({
        _id: req.params.id
    }).then(data => {
        res.render('edit-hive', { data: data, title: "Edit Hive" })
    }).catch(err => console.log(err))
})

// route for edit-inventory page
app.get('/inventory/edit/:id', (req, res) => {
    Inventory.findOne({
        _id: req.params.id
    }).then(data => {
        res.render('edit-inventory', { data: data, title: "Edit Inventory" })
    }).catch(err => console.log(err))
})

// route for edit-inspection page
app.get('/inspection/edit/:id', (req, res) => {
    Inspection.findOne({
        _id: req.params.id
    }).then(data => {
        res.render('edit-inspection', { data: data, title: "Edit Inspections" })
    }).catch(err => console.log(err))
})

// route for edit-swarm page
app.get('/swarm/edit/:id', (req, res) => {
    Swarm.findOne({
        _id: req.params.id
    }).then(data => {
        res.render('edit-swarm', { data: data, title: "Edit Swarm Trap" })
    }).catch(err => console.log(err))
})

// route for edit-treatment page
app.get('/treatment/edit/:id', (req, res) => {
    Treatment.findOne({
        _id: req.params.id
    }).then(data => {
        res.render('edit-treatment', { data: data, title: "Edit Treatment" })
    }).catch(err => console.log(err))
})

// ===============================   EDIT ROUTING END    ===================================

// ************************************ ADDING NEW DATA (post)  ************************************

// 2 - New Models

function saveNewData(req, res, Model, redirectUrl, dateFieldName) {
    // Create a new instance of the model
    const data = new Model({
        ...req.body
    });

    // Convert all string fields to uppercase
    for (const key in data._doc) {
        if (typeof data[key] === 'string') {
            data[key] = data[key].toUpperCase();
        }
    }

    // Format the date field
    const formattedDate = moment(req.body[dateFieldName]).format('L');
    data[dateFieldName] = formattedDate;

    // Save data to the database
    data.save()
        .then(() => {
            res.redirect(redirectUrl);
        })
        .catch(err => console.log(err));
}

// Route for Saving New Feeding
app.post('/new-feed', (req, res) => {
    const dateFieldName = 'feedDate';
    saveNewData(req, res, Feed, '/feeding', dateFieldName);
});

// Route for saving hive 
app.post('/new-hive', (req, res) => {
    const dateFieldName = 'hiveDate';
    saveNewData(req, res, Hive, '/', dateFieldName);
});

// Route for saving harvest 
app.post('/new-harvest', (req, res) => {
    const dateFieldName = 'harvestDate';
    saveNewData(req, res, Harvest, '/harvest', dateFieldName);
});

// Route for saving inventory 
app.post('/new-inventory', (req, res) => {
    const dateFieldName = 'inventoryDate';
    saveNewData(req, res, Inventory, '/inventory', dateFieldName);
});

// Route for saving inspection 
app.post('/new-inspection', (req, res) => {
    const dateFieldName = 'inspectionDate';
    saveNewData(req, res, Inspection, '/inspection', dateFieldName);
});

// Route for Saving New Swarm
app.post('/new-swarm', (req, res) => {
    const dateFieldName = 'swarmDate';
    saveNewData(req, res, Swarm, '/swarmtrap', dateFieldName);
});

// Route for Saving New Treatment
app.post('/new-treatment', (req, res) => {
    const dateFieldName = 'treatmentDate';
    saveNewData(req, res, Treatment, '/treatment', dateFieldName);
});

// ************************************  END ADDING NEW DATA *******************************

// ===============================  EDIT DATA  (put)   ==========================================

function editData(model, id, body, res, redirectPath, fields, dateFieldName) {
    const formattedDate = moment(body[dateFieldName]).format('L');
    model.findOne({
        _id: id
    }).then(data => {
        fields.forEach(field => {
            if (body[field]) {
                data[field] = body[field].toUpperCase();
            }
        });
        data[dateFieldName] = formattedDate;

        data.save().then(() => {
            res.redirect(redirectPath);
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
}

// Edit Feeds
app.put('/feed/update/:id', (req, res) => {
    const fields = ['feeding'];
    const dateFieldName = 'feedDate';
    editData(Feed, req.params.id, req.body, res, '/feeding', fields, dateFieldName);
});

// Edit Hives
app.put('/hive/update/:id', (req, res) => {
    const fields = ['hiveNumber', 'breed', 'hiveStrength'];
    const dateFieldName = 'hiveDate';
    editData(Hive, req.params.id, req.body, res, '/', fields, dateFieldName);
});

// Edit Harvest
app.put('/harvest/update/:id', (req, res) => {
    const fields = ['harvestType', 'harvestAmount'];
    const dateFieldName = 'harvestDate';
    editData(Harvest, req.params.id, req.body, res, '/harvest', fields, dateFieldName);
});

// Edit Inventory
app.put('/inventory/update/:id', (req, res) => {
    const fields = ['inventoryType', 'inventoryAmount'];
    const dateFieldName = 'inventoryDate';
    editData(Inventory, req.params.id, req.body, res, '/inventory', fields, dateFieldName);
});

// Edit Inspection
app.put('/inspection/update/:id', (req, res) => {
    const fields = ['hiveNumber', 'temperament', 'strength', 'queen', 'queenCell', 'brood', 'disease', 'pests', 'eggs'];
    const dateFieldName = 'inspectionDate';
    editData(Inspection, req.params.id, req.body, res, '/inspection', fields, dateFieldName);
});

// Edit Swarm Traps
app.put('/swarm/update/:id', (req, res) => {
    const fields = ['swarmNumber', 'location'];
    const dateFieldName = 'swarmDate';
    editData(Swarm, req.params.id, req.body, res, '/swarmtrap', fields, dateFieldName);
});

// Edit Treatment
app.put('/treatment/update/:id', (req, res) => {
    const fields = ['treatment'];
    const dateFieldName = 'treatmentDate';
    editData(Treatment, req.params.id, req.body, res, '/treatment', fields, dateFieldName);
});

// ===============================  EDIT DATA END   ========================================


// ************************************  DELETE DATA ***************************************

// Delete Function
function deleteItem(req, res, Model, redirectUrl) {
    Model.deleteOne({
        _id: req.params.id
    }).then(() => {
        res.redirect(redirectUrl);
    }).catch(err => console.log(err));
}

// Delete Feeding
app.delete('/feed/delete/:id', (req, res) => {
    deleteItem(req, res, Feed, '/feeding');
});

// Delete Hive
app.delete('/hive/delete/:id', (req, res) => {
    deleteItem(req, res, Hive, '/');
});

// Delete Harvest 
app.delete('/harvest/delete/:id', (req, res) => {
    deleteItem(req, res, Harvest, '/harvest');
});

// Delete Inventory 
app.delete('/inventory/delete/:id', (req, res) => {
    deleteItem(req, res, Inventory, '/inventory');
});

// Delete Inspection 
app.delete('/inspection/delete/:id', (req, res) => {
    deleteItem(req, res, Inspection, '/inspection');
});

// Delete Swarm trap
app.delete('/swarm/delete/:id', (req, res) => {
    deleteItem(req, res, Swarm, '/swarmtrap');
});

// Delete Treatment
app.delete('/treatment/delete/:id', (req, res) => {
    deleteItem(req, res, Treatment, '/treatment');
});

// ************************************  DELETE DATA END ***********************************

// =================== Shut Down Database Connection =======================

// Handle graceful shutdown
process.on('SIGINT', () => {
    mongoose.connection.close()
        .then(() => {
            console.log('Mongo DB connection closed due to application termination');
            process.exit(0);
        })
        .catch(err => {
            console.error('Error closing MongoDB connection:', err);
            process.exit(1);
        });
});


app.listen(3000, () => {
    console.log('Listening on port 3000')
})