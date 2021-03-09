module.exports = function(RED) {
    var https = require("https");

    //Payload Read & Response
    function select_id(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        node.on('input', function(msg) {
            const options = {
                hostname: 'io.nowdb.net',
                path: '/v2/select_id/token/' +
                    config.token + '/project/' +
                    config.project + '/collection/' +
                    config.collection + '/appid/' +
                    config.appid + '/id/' +
                    msg.payload.id,
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

    RED.nodes.registerType("select_id", select_id);
}