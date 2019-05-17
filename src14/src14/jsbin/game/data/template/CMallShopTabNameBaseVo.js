/**
* @Author: LinQiuWen
* @description:s商店商城商会表/bMT3商城分页名称表
*D点卡服表格/DMT3点卡服商城分页名称表
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CMallShopTabNameBaseVo = /** @class */ (function () {
                function CMallShopTabNameBaseVo() {
                }
                CMallShopTabNameBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.tabname = data.getUTFBytes(data.getUint32());
                };
                return CMallShopTabNameBaseVo;
            }());
            template.CMallShopTabNameBaseVo = CMallShopTabNameBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CMallShopTabNameBaseVo.js.map