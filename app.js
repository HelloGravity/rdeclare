var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var rpc_methods = {};

function rdeclare(method_name, method) {
    rpc_methods[method_name] = method;
}

function register_api(app) {
    app.post('/rpc-api', jsonParser, function (req, res) {
        if (!req.body) {
            return res.status(400).send('Request is not JSON');
        }
        var method_name = req.body.method_name;
        var args = req.body.args;

        if ((!args) || (args.constructor !== Array)) {
            return res.status(400).send('The "args" json parameter is not an array');
        }

        if (!(method_name in rpc_methods)) {
            return res.status(400).send('Method does not exist');
        }

        /* append the callback function. 
           ensure it is only called once. */
        args.push((function() {
            var executed = false;
            return function () {
                if (!executed) {
                    executed = true;
                    res.json(Array.prototype.slice.call(arguments));
                }
            };
        })());
        if (args.length != rpc_methods[method_name].length) {
            return res.status(400).send('Arguments number mismatch');   
        }
        rpc_methods[method_name].apply(null, args);
    });

    return rdeclare;
};

module.exports = register_api;