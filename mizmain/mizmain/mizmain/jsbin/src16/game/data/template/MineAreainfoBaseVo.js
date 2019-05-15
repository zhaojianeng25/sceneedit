/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var MineAreainfoBaseVo = /** @class */ (function () {
                function MineAreainfoBaseVo() {
                }
                MineAreainfoBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.colour = data.getUTFBytes(data.getUint32());
                    this.discribe = data.getUTFBytes(data.getUint32());
                };
                return MineAreainfoBaseVo;
            }());
            template.MineAreainfoBaseVo = MineAreainfoBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=MineAreainfoBaseVo.js.map