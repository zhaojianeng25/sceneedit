/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var BagTableBaseVo = /** @class */ (function () {
                function BagTableBaseVo() {
                }
                BagTableBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.haveCount = data.getUint32();
                    this.needyinbi = data.getUint32();
                };
                return BagTableBaseVo;
            }());
            template.BagTableBaseVo = BagTableBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=BagTableBaseVo.js.map