// Image loading and unloading


async function loadImages(imageUrls, callback) {
    const promiseArray = []; // create an array for promises
    const imageDict = {}

    for (let [key, imageUrl] of Object.entries(imageUrls)) {
        promiseArray.push(new Promise(resolve => {
            const img = new Image();
            img.onload = function() {
                // resolve the promise, indicating that the image has been loaded
                resolve();
            };

            img.src = imageUrl;
            imageDict[key] = img
        }));
    }

    await Promise.all(promiseArray); // wait for all the images to be loaded
    callback(imageDict)
}

function loadZones(zoneUrls) {
    for (let [key, zoneUrl] of Object.entries(zoneUrls)) {
        zones[key] = new Zone()
    }

}