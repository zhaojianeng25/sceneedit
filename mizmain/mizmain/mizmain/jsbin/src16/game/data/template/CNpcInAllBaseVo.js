var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CNpcInAllBaseVo = /** @class */ (function () {
                function CNpcInAllBaseVo() {
                }
                CNpcInAllBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.name = data.getUTFBytes(data.getUint32());
                    this.area2colour = data.getUint32();
                    this.area2colour = data.getUint32();
                };
                return CNpcInAllBaseVo;
            }());
            template.CNpcInAllBaseVo = CNpcInAllBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CNpcInAllBaseVo.js.map