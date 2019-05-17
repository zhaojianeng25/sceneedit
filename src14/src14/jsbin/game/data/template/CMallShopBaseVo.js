/**
* @Author: LinQiuWen
* @description:
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CMallShopBaseVo = /** @class */ (function () {
                function CMallShopBaseVo() {
                }
                CMallShopBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.order = data.getUint32();
                    this.type = data.getUint32();
                    this.viplevel = data.getUint32();
                    this.des = data.getUTFBytes(data.getUint32());
                    this.cuxiaotype = data.getUint32();
                };
                return CMallShopBaseVo;
            }());
            template.CMallShopBaseVo = CMallShopBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CMallShopBaseVo.js.map