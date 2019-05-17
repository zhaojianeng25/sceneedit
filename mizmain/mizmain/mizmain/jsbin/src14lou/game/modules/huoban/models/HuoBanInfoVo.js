/**
* 伙伴信息
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var huoban;
        (function (huoban) {
            var models;
            (function (models) {
                var HuoBanInfoVo = /** @class */ (function () {
                    function HuoBanInfoVo() {
                    }
                    HuoBanInfoVo.prototype.fromByteArray = function (bytes) {
                        this.huobanID = bytes.readUint32();
                        this.infight = bytes.readUint32();
                        this.weekfree = bytes.readUint32();
                        this.state = bytes.readLong();
                    };
                    return HuoBanInfoVo;
                }());
                models.HuoBanInfoVo = HuoBanInfoVo;
            })(models = huoban.models || (huoban.models = {}));
        })(huoban = modules.huoban || (modules.huoban = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=HuoBanInfoVo.js.map