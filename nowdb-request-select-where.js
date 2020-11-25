module.exports = function(RED) {
    var request = require("request");

    //Payload Read & Response
    function select_where(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        node.on('input', function(msg) {
            var uri = 'https://io.nowdb.net/v2/select_where/token/' +
                config.token + '/project/' +
                config.project + '/collection/' +
                config.collection + '/appid/' +
                config.appid + '/' +
                msg.payload.where_condition + '/' +
                msg.payload.where_value;

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

    RED.nodes.registerType("select_where", select_where);
}