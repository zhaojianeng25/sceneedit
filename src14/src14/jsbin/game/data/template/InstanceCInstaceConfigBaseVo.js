/**
* name 公会副本参数
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var InstanceCInstaceConfigBaseVo = /** @class */ (function () {
                function InstanceCInstaceConfigBaseVo() {
                }
                InstanceCInstaceConfigBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.name = data.getUTFBytes(data.getUint32());
                    this.serversid = data.getUint32();
                };
                return InstanceCInstaceConfigBaseVo;
            }());
            template.InstanceCInstaceConfigBaseVo = InstanceCInstaceConfigBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=InstanceCInstaceConfigBaseVo.js.map