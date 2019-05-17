/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var HuanhuaUseBaseVo = /** @class */ (function () {
                function HuanhuaUseBaseVo() {
                }
                HuanhuaUseBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.skillid = data.getUint32();
                    this.level = data.getUint32();
                    this.cardid1 = data.getUint32();
                    this.cardid2 = data.getUint32();
                    this.cardid3 = data.getUint32();
                };
                return HuanhuaUseBaseVo;
            }());
            template.HuanhuaUseBaseVo = HuanhuaUseBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=HuanhuaUseBaseVo.js.map