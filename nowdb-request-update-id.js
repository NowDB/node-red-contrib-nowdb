module.exports = function(RED) {
    var request = require("request");

    //Payload Read & Response
    function update_id(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        function jsonConcat(o1, o2) {
            for (var key in o2) {
                o1[key] = o2[key];
            }
            return o1;
        }

        node.on('input', function(msg) {
            var uri = 'https://io.nowdb.net/v2/update_id';

            var data = msg.payload;
            var credential = {
                "token": config.token,
                "project": config.project,
                "collection": config.collection,
                "appid": config.appid
            };

            var form_data = {};
            form_data = jsonConcat(form_data, credential);
            form_data = jsonConcat(form_data, data);

            request.post({ url: uri, form: form_data }, function(error, response, body) {
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

    RED.nodes.registerType("update_id", update_id);
}