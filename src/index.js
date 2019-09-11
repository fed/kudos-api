const app = require('./app');
const models = require('./models');

models.sequelize.sync().then(() => {
    const port = app.get('port');

    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
});
