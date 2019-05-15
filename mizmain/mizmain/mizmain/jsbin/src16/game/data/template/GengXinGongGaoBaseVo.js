var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var GengXinGongGaoBaseVo = /** @class */ (function () {
                function GengXinGongGaoBaseVo() {
                }
                GengXinGongGaoBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.content = data.getUTFBytes(data.getUint32());
                    this.gengxinshijian = data.getUTFBytes(data.getUint32());
                    this.banbenhao = data.getUint32();
                };
                return GengXinGongGaoBaseVo;
            }());
            template.GengXinGongGaoBaseVo = GengXinGongGaoBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=GengXinGongGaoBaseVo.js.map