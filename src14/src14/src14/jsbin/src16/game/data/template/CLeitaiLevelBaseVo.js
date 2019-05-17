//CLeitaiLevelBaseVo
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CLeitaiLevelBaseVo = /** @class */ (function () {
                function CLeitaiLevelBaseVo() {
                }
                CLeitaiLevelBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.levelmin = data.getUint32();
                    this.levelmax = data.getUint32();
                };
                return CLeitaiLevelBaseVo;
            }());
            template.CLeitaiLevelBaseVo = CLeitaiLevelBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CLeitaiLevelBaseVo.js.map