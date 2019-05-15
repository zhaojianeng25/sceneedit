/**
* 伙伴详情
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var huoban;
        (function (huoban) {
            var models;
            (function (models) {
                var HuoBanDetailVo = /** @class */ (function () {
                    function HuoBanDetailVo() {
                        /** 变量值ID，变量值,气血,攻击,防御等等都在这里面*/
                        this.datas = [];
                    }
                    HuoBanDetailVo.prototype.fromByteArray = function (bytes) {
                        this.huobanID = bytes.readUint32();
                        this.infight = bytes.readUint32();
                        this.state = bytes.readLong();
                        this.weekfree = bytes.readUint32();
                        var size = bytes.readUint8();
                        for (var index = 0; index < size; index++) {
                            this.datas[index] = bytes.readUint32();
                        }
                    };
                    return HuoBanDetailVo;
                }());
                models.HuoBanDetailVo = HuoBanDetailVo;
            })(models = huoban.models || (huoban.models = {}));
        })(huoban = modules.huoban || (modules.huoban = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=HuoBanDetailVo.js.map