module.exports = function(RED) {
    var https = require("https");
    var querystring = require('querystring');

    //Payload Read & Response
    function update_where_not_in(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        function jsonConcat(o1, o2) {
            for (var key in o2) {
                o1[key] = o2[key];
            }
            return o1;
        }

        node.on('input', function(msg) {
            const data = msg.payload;
            var credential = {
                "token": config.token,
                "project": config.project,
                "collection": config.collection,
                "appid": config.appid
            };

            var form_data = {};
            form_data = jsonConcat(form_data, credential);
            form_data = jsonConcat(form_data, data);
            form_data = querystring.stringify(form_data);

            const options = {
                hostname: 'io.nowdb.net',
                path: '/v2/update_where_not_in/',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': form_data.length
                }
            };

            const req = https.request(options, res => {
                res.setEncoding('utf8');

                var data_return = '';

                res.on('data', chunk => {
                    data_return += chunk;
                });

                res.on('end', function() {
                    msg.payload = data_return;

                    node.send(msg);
                });
            });

            req.on('error', error => {
                console.error(error)
            })

            req.write(form_data);
            req.end();
        });
    }

    RED.nodes.registerType("update_where_not_in", update_where_not_in);
}