/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var PointCardEquipGemBaseVo = /** @class */ (function () {
                function PointCardEquipGemBaseVo() {
                }
                PointCardEquipGemBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.gemsLevel = data.getUint32();
                    var vgemboxlevelLength = data.getUint32();
                    this.vgemboxlevel = [];
                    for (var index = 0; index < vgemboxlevelLength; index++) {
                        this.vgemboxlevel.push(data.getUint32());
                    }
                };
                return PointCardEquipGemBaseVo;
            }());
            template.PointCardEquipGemBaseVo = PointCardEquipGemBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=PointCardEquipGemBaseVo.js.map