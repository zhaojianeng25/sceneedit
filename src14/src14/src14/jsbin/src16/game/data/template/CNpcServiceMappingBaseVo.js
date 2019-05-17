//CNpcServiceMappingBaseVo
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CNpcServiceMappingBaseVo = /** @class */ (function () {
                function CNpcServiceMappingBaseVo() {
                }
                CNpcServiceMappingBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.type = data.getUint32();
                    this.param1 = data.getUint32();
                    this.param2 = data.getUint32();
                    this.param3 = data.getUint32();
                    this.param4 = data.getUint32();
                    this.param5 = data.getUint32();
                    this.param6 = data.getUint32();
                    this.param7 = data.getUint32();
                    this.param8 = data.getUint32();
                };
                return CNpcServiceMappingBaseVo;
            }());
            template.CNpcServiceMappingBaseVo = CNpcServiceMappingBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CNpcServiceMappingBaseVo.js.map