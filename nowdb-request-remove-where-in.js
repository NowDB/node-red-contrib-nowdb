module.exports = function(RED) {
    var https = require("https");

    //Payload Read & Response
    function remove_where_in(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        node.on('input', function(msg) {
            const options = {
                hostname: 'io.nowdb.net',
                path: '/v2/remove_where_in/token/' +
                    config.token + '/project/' +
                    config.project + '/collection/' +
                    config.collection + '/appid/' +
                    config.appid + '/win_field/' +
                    msg.payload.win_field + '/win_value/' +
                    msg.payload.win_value,
                method: 'GET'
            };

            const req = https.request(options, res => {
                var data = '';

                res.on('data', chunk => {
                    data += chunk;
                });

                res.on('end', function() {
                    msg.payload = data;

                    node.send(msg);
                });
            });

            req.on('error', error => {
                console.error(error)
            });

            req.end();
        });
    }

    RED.nodes.registerType("remove_where_in", remove_where_in);
}