/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var ShowAreainfoBaseVo = /** @class */ (function () {
                function ShowAreainfoBaseVo() {
                }
                ShowAreainfoBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.colour = data.getUTFBytes(data.getUint32());
                    this.discribe = data.getUTFBytes(data.getUint32());
                    this.lootid = data.getUint32();
                };
                return ShowAreainfoBaseVo;
            }());
            template.ShowAreainfoBaseVo = ShowAreainfoBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=ShowAreainfoBaseVo.js.map