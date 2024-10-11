const app = require('./index');

module.exports = (req, res) => {
    // Forward requests to your Express app
    app(req, res);
};