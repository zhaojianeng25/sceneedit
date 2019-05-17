/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var EquipCombinBaseVo = /** @class */ (function () {
                function EquipCombinBaseVo() {
                }
                EquipCombinBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.itemname = data.getUTFBytes(data.getUint32());
                    this.bangyin = data.getUint32();
                    this.yinliang = data.getUint32();
                    this.equipnum = data.getUint32();
                    this.nextequipid = data.getUint32();
                    this.characterlevel = data.getUint32();
                    this.colorname = data.getUTFBytes(data.getUint32());
                    this.hechengrate = data.getUint32();
                    this.hechengfailreturn = data.getUint32();
                    this.failreturnnum = data.getUint32();
                    this.listid = data.getUint32();
                    this.hammerid = data.getUint32();
                    this.hammernum = data.getUint32();
                    this.hammerrate = data.getUint32();
                    this.colorafterqianghua = data.getUTFBytes(data.getUint32());
                    this.lastequipid = data.getUint32();
                };
                return EquipCombinBaseVo;
            }());
            template.EquipCombinBaseVo = EquipCombinBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=EquipCombinBaseVo.js.map