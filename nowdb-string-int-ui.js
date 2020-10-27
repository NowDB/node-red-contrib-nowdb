module.exports = function(RED) {
    //Payload Read & Response
    function string_int_ui(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        node.on('input', function(msg) {
            var data_array = JSON.parse(msg.payload);

            data_array.forEach(function(value) {
                value[config.attribute] = parseInt(value[config.attribute]);
            });

            msg.payload = JSON.stringify(data_array);
            node.send(msg);
        });
    }

    RED.nodes.registerType("string_int_ui", string_int_ui);
}