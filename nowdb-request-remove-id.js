module.exports = function(RED) {
    var request = require("request");

    //Payload Read & Response
    function remove_id(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        node.on('input', function(msg) {
            var uri = 'https://io.nowdb.net/v2/remove_id/token/' +
                config.token + '/project/' +
                config.project + '/collection/' +
                config.collection + '/appid/' +
                config.appid + '/id/' +
                msg.payload.id;

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

    RED.nodes.registerType("remove_id", remove_id);
}