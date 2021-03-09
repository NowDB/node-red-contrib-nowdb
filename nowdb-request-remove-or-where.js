module.exports = function(RED) {
    var https = require("https");

    //Payload Read & Response
    function remove_or_where(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        node.on('input', function(msg) {
            const options = {
                hostname: 'io.nowdb.net',
                path: '/v2/remove_or_where/token/' +
                    config.token + '/project/' +
                    config.project + '/collection/' +
                    config.collection + '/appid/' +
                    config.appid + '/orwhere_field/' +
                    msg.payload.orwhere_field + '/orwhere_value/' +
                    msg.payload.orwhere_value,
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

    RED.nodes.registerType("remove_or_where", remove_or_where);
}