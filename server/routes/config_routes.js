const sitesR = require('./sites');

exports.routesInit = (app) => {
    app.use('/sites', sitesR);
}
