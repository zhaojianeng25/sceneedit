/**
* 阵容信息
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var huoban;
        (function (huoban) {
            var models;
            (function (models) {
                var ZhenrongInfoVo = /** @class */ (function () {
                    function ZhenrongInfoVo() {
                        /**伙伴阵容id*/
                        this.huobanlist = [];
                        this.huobanlist = new Array();
                    }
                    ZhenrongInfoVo.prototype.fromByteArray = function (bytes) {
                        this.zhenfa = bytes.readUint32();
                        this.huobanlist = [];
                        var huobanlistSize = bytes.readUint8();
                        for (var index = 0; index < huobanlistSize; index++) {
                            this.huobanlist.push(bytes.readUint32());
                        }
                    };
                    return ZhenrongInfoVo;
                }());
                models.ZhenrongInfoVo = ZhenrongInfoVo;
            })(models = huoban.models || (huoban.models = {}));
        })(huoban = modules.huoban || (modules.huoban = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ZhenrongInfoVo.js.map