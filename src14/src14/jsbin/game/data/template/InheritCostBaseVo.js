/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var InheritCostBaseVo = /** @class */ (function () {
                function InheritCostBaseVo() {
                }
                InheritCostBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.skillid = data.getUint32();
                    this.level = data.getUint32();
                    this.costitem = data.getUint32();
                    this.costitemnum = data.getUint32();
                    var veccardLength = data.getUint32();
                    this.veccard = [];
                    for (var index = 0; index < veccardLength; index++) {
                        this.veccard.push(data.getUint32());
                    }
                    this.desc = data.getUTFBytes(data.getUint32());
                };
                return InheritCostBaseVo;
            }());
            template.InheritCostBaseVo = InheritCostBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=InheritCostBaseVo.js.map