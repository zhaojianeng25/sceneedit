/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var SBLevelLimitBaseVo = /** @class */ (function () {
                function SBLevelLimitBaseVo() {
                }
                SBLevelLimitBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.levelLimit = data.getUint32();
                };
                return SBLevelLimitBaseVo;
            }());
            template.SBLevelLimitBaseVo = SBLevelLimitBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=SBLevelLimitBaseVo.js.map