/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var ArrowEffectSimpBaseVo = /** @class */ (function () {
                function ArrowEffectSimpBaseVo() {
                }
                ArrowEffectSimpBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.step = data.getUint32();
                    this.task = data.getUint32();
                    this.startlevel = data.getUint32();
                    this.level = data.getUint32();
                    this.screen = data.getUint32();
                    this.button = data.getUTFBytes(data.getUint32());
                    this.usebutton = data.getUTFBytes(data.getUint32());
                    this.item = data.getUint32();
                    this.skill = data.getUint32();
                    this.text = data.getUTFBytes(data.getUint32());
                    this.uiposition = data.getUint32();
                    this.textposition = data.getUint32();
                    this.imagename = data.getUTFBytes(data.getUint32());
                    this.cleareffect = data.getUint32();
                    this.functionid = data.getUint32();
                    this.battleId = data.getUint32();
                    this.battleRoundId = data.getUint32();
                    this.battlePos = data.getUint32();
                    this.startAni = data.getUint32();
                    this.isAllwaysLock = data.getUint32();
                    this.conditionItemId = data.getUint32();
                    this.onTeam = data.getUint32();
                    this.guideType = data.getUint32();
                    this.guideEffectId = data.getUint32();
                    this.assistEffectId = data.getUint32();
                    this.effectScale = data.getUint32();
                    this.teamInfo = data.getUint32();
                    this.guideModel = data.getUint32();
                    this.isEquipGuide = data.getUint32();
                };
                return ArrowEffectSimpBaseVo;
            }());
            template.ArrowEffectSimpBaseVo = ArrowEffectSimpBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=ArrowEffectSimpBaseVo.js.map