function removeFromArray(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
}

function removeFromArrayMultiple(arr, values) {
    values.forEach(value => {
        var index = arr.indexOf(value);
        if (index > -1) {
            arr.splice(index, 1);
        }
    });
}

function deleteObject(object) {
    Object.keys(object).forEach(key => {
        delete object[key];
    })
}
