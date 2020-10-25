module.exports = function(RED) {
    var request = require("request");

    //Payload Read & Response
    function select(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        node.on('input', function(msg) {
            var uri = 'https://io.nowdb.net/v2/select_all/token/' +
                config.token + '/project/' +
                config.project + '/collection/' +
                config.collection + '/appid/' +
                config.appid;

            request.get(uri, function(error, response, body) {
                if (response.statusCode === 200) {
                    msg.payload = body;
                } else {
                    msg.payload = {
                        "statusCode": response.statusCode
                    };
                }
                node.send(msg);
            });
        });
    }

    RED.nodes.registerType("select", select);
}