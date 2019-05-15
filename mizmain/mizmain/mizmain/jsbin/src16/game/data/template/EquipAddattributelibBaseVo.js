/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var EquipAddattributelibBaseVo = /** @class */ (function () {
                function EquipAddattributelibBaseVo() {
                }
                EquipAddattributelibBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.name = data.getUTFBytes(data.getUint32());
                    this.namecolour = data.getUTFBytes(data.getUint32());
                    this.attributeid = data.getUint32();
                    this.attributeidinterval = data.getUTFBytes(data.getUint32());
                    this.buffid = data.getUint32();
                    this.skillid = data.getUint32();
                    this.isshow = data.getUint32();
                };
                return EquipAddattributelibBaseVo;
            }());
            template.EquipAddattributelibBaseVo = EquipAddattributelibBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=EquipAddattributelibBaseVo.js.map