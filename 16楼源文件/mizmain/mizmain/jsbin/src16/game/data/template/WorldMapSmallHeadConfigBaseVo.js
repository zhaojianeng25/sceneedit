/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var WorldMapSmallHeadConfigBaseVo = /** @class */ (function () {
                function WorldMapSmallHeadConfigBaseVo() {
                }
                WorldMapSmallHeadConfigBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.smallhead = data.getUint32();
                    this.wordmaphead = data.getUint32();
                };
                return WorldMapSmallHeadConfigBaseVo;
            }());
            template.WorldMapSmallHeadConfigBaseVo = WorldMapSmallHeadConfigBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=WorldMapSmallHeadConfigBaseVo.js.map