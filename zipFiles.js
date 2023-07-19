const fs = require('fs-extra');
const path = require('path');
const archiver = require('archiver');

const distFolder = path.join(__dirname, 'dist');
const widgetFolder = path.join(__dirname, 'Widget');
const templateFolder = path.join(__dirname, 'src', 'templates');  // Path to 'templates' folder in 'src' directory
const widgetTemplateFolder = path.join(widgetFolder, 'templates'); // Path to 'templates' folder in 'Widget' directory

// Create 'Widget' and 'Widget/templates' directories if they don't exist
if (!fs.existsSync(widgetFolder)) {
    fs.mkdirSync(widgetFolder);
}

if (!fs.existsSync(widgetTemplateFolder)) {
    fs.mkdirSync(widgetTemplateFolder);
}

// Copy app.js and app.js.map to 'Widget' directory
['app.js', 'app.js.map'].forEach((file) => {
    const srcPath = path.join(distFolder, file);
    const destPath = path.join(widgetFolder, file);
    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
    }
});

// Copy template directory to 'Widget/templates' directory
fs.copySync(templateFolder, widgetTemplateFolder);

const output = fs.createWriteStream(path.join(__dirname, 'widget.zip'));
const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
});

output.on('close', function () {
    // Handle close event
});

archive.on('warning', function (err) {
    if (err.code === 'ENOENT') {
        // Handle warning
    } else {
        throw err;
    }
});

archive.on('error', function (err) {
    throw err;
});

archive.pipe(output);

archive.directory(widgetFolder, false);

archive.finalize();
