/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var DashiSpaceGiftBaseVo = /** @class */ (function () {
                function DashiSpaceGiftBaseVo() {
                }
                DashiSpaceGiftBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                };
                return DashiSpaceGiftBaseVo;
            }());
            template.DashiSpaceGiftBaseVo = DashiSpaceGiftBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=DashiSpaceGiftBaseVo.js.map