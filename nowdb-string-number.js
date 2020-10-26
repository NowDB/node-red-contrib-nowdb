module.exports = function(RED) {
    //Payload Read & Response
    function string_number(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        node.on('input', function(msg) {
            var data_array = JSON.parse(msg.payload.data);

            data_array.forEach(function(value) {
                value[msg.payload.attribute] = Number(value[msg.payload.attribute]);
            });

            msg.payload = JSON.stringify(data_array);
            node.send(msg);
        });
    }

    RED.nodes.registerType("string_number", string_number);
}