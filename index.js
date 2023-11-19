const express = require('express')
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('home')
});

const pages = ['inspection', 'inventory', 'treatment', 'treatment-form', 'harvest', 'harvest-form',
    'swarmtrap', 'swarmtrap-form', 'feeding', 'feeding-form', 'login', 'inspection-form', 'new-hive-form', 'inventory-form'];

pages.forEach(page => {
    app.get(`/${page}`, (req, res) => {
        res.render(page);
    });
});





app.listen(3000, () => {
    console.log('Listening on port 3000')
})