// NEW DATA
function saveNewData(req, res, Model, redirectUrl, dateFieldName, userId) {
    // Create a new instance of the model
    const data = new Model({
        ...req.body,
        userId: userId,
    });

    // Format the date field
    const formattedDate = formatDate(new Date());
    data[dateFieldName] = formattedDate;

    // Save data to the database
    data.save()
        .then(() => {
            res.redirect(redirectUrl);
        })
        .catch(err => console.log(err));
}

// EDIT DATA
function editData(model, id, body, res, redirectPath, dateFieldName) {
    model.findOne({
        _id: id
    }).then(data => {
        // Directly assign values from body to data
        Object.assign(data, body);

        // If the date is present in the request body, use it; otherwise, keep the existing date
        if (body[dateFieldName]) {
            data[dateFieldName] = formatDate(new Date(body[dateFieldName]));
        }

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

///   Date Format
function formatDate(date) {
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // Months are zero-based
    const year = date.getUTCFullYear();

    return `${month}/${day}/${year}`;
}

module.exports = { saveNewData, editData, deleteItem, formatDate };