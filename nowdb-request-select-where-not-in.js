module.exports = function(RED) {
    var https = require("https");

    //Payload Read & Response
    function select_where_not_in(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        node.on('input', function(msg) {
            const options = {
                hostname: 'io.nowdb.net',
                path: '/v2/select_where_not_in/token/' +
                    config.token + '/project/' +
                    config.project + '/collection/' +
                    config.collection + '/appid/' +
                    config.appid + '/wnotin_field/' +
                    msg.payload.wnotin_field + '/wnotin_value/' +
                    msg.payload.wnotin_value,
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

    RED.nodes.registerType("select_where_not_in", select_where_not_in);
}