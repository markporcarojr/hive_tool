const moment = require('moment');


/// SAVE
function saveNewData(req, res, Model, redirectUrl, dateFieldName, userId) {
    // Create a new instance of the model
    const data = new Model({
        ...req.body,
        userId: userId,
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

// EDIT
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



// DELETE
function deleteItem(req, res, Model, redirectUrl) {
    Model.deleteOne({
        _id: req.params.id
    }).then(() => {
        res.redirect(redirectUrl);
    }).catch(err => console.log(err));
}





module.exports = { saveNewData, editData, deleteItem };