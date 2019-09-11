const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../utils/config');
const { getCurrentEnvironment } = require('../utils/helpers');

// Get database access credentials for the current environment.
const environment = getCurrentEnvironment();
const { database, username, password, dialect, host } = config.database[environment];

// Connection settings.
const options = {
    dialect,
    host,
    operatorsAliases: Sequelize.Op
};

// Connect to the database.
const sequelize = new Sequelize(database, username, password, options);
const db = {};

fs.readdirSync(__dirname)
    .filter(file => {
        return file.indexOf('.') !== 0 && file !== 'index.js';
    })
    .forEach(file => {
        const model = sequelize.import(path.join(__dirname, file));

        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
