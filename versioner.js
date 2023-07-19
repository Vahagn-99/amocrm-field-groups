const fs = require('fs');
const path = require('path');

// Define the path to your JSON file
const filePath = path.join(__dirname, './Widget/manifest.json');

// Read the current version
fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) throw err;

    let manifestData = JSON.parse(data);

    // Split the version into major, minor, patch
    let [major, minor, patch] = manifestData.widget.version.split('.').map(Number);

    // Increment the patch version
    patch++;

    // If patch version is 10, increment minor version and reset patch to 0
    if (patch === 10) {
        minor++;
        patch = 0;

        // If minor version is 10, increment major version and reset minor to 0
        if (minor === 10) {
            major++;
            minor = 0;
        }
    }

    // Update the version in the data
    manifestData.widget.version = `${major}.${minor}.${patch}`;

    // Write the updated version back to the file
    fs.writeFile(filePath, JSON.stringify(manifestData, null, 2), (err) => {
        if (err) throw err;
        console.log('Version updated to: ' + manifestData.widget.version);
    });
});
