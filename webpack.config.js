const path = require("path");

const themeEntries = require('./MapStore2/build/themes.js').themeEntries;
const extractThemesPlugin = require('./MapStore2/build/themes.js').extractThemesPlugin;

module.exports = require('./MapStore2/build/buildConfig')(
    {
        'mapstore-playground': path.join(__dirname, "js", "app"),
        'mapstore-playground-embedded': path.join(__dirname, "MapStore2", "web", "client", "product", "embedded"),
        'mapstore-playground-api': path.join(__dirname, "MapStore2", "web", "client", "product", "api")
    },
    themeEntries,
    {
        base: __dirname,
        dist: path.join(__dirname, "dist"),
        framework: path.join(__dirname, "MapStore2", "web", "client"),
        code: [path.join(__dirname, "js"), path.join(__dirname, "MapStore2", "web", "client")]
    },
    extractThemesPlugin,
    false,
    "dist/",
    '.mapstore-playground',
    [],
    {
        "@mapstore": path.resolve(__dirname, "MapStore2", "web", "client"),
        "@js": path.resolve(__dirname, "js")
    }
);
