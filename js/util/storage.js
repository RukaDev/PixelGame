
function setArray(key, array) {
    sessionStorage.setItem(key, JSON.stringify(array))
}

function getArray(key) {
    return JSON.parse(sessionStorage.getItem(key))
}

function setArrayItem(key, item) {
    var arr = getArray(key)
    arr.push(item)
    setArray(key, arr)
}