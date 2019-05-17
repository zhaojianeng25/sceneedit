/**
* @Author: LinQiuWen
* @description:j技能格系统/技能格信息表
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var AcupointInfoBaseVo = /** @class */ (function () {
                function AcupointInfoBaseVo() {
                    this.pointToSkillList = []; //影响技能ID1,影响技能ID2,影响技能ID3,影响技能ID4,影响技能ID5
                }
                AcupointInfoBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.isMain = data.getByte();
                    this.name = data.getUTFBytes(data.getUint32());
                    this.isJueJi = data.getByte();
                    this.maxlevel = data.getUint32();
                    this.details = data.getUTFBytes(data.getUint32());
                    this.describe = data.getUTFBytes(data.getUint32());
                    this.iconNormal = data.getUTFBytes(data.getUint32());
                    this.iconPushed = data.getUTFBytes(data.getUint32());
                    this.iconHover = data.getUTFBytes(data.getUint32());
                    this.iconDisable = data.getUTFBytes(data.getUint32());
                    this.locX = data.getUint32();
                    this.locY = data.getUint32();
                    this.femalelocX = data.getUint32();
                    this.femalelocY = data.getUint32();
                    this.lvlocX = data.getUint32();
                    this.lvlocY = data.getUint32();
                    this.femalelvlocX = data.getUint32();
                    this.femalelvlocY = data.getUint32();
                    this.attribute = data.getUint32();
                    this.paraA = data.getFloat64();
                    this.paraB = data.getFloat64();
                    this.paraC = data.getFloat64();
                    this.dependAcupoint = data.getUTFBytes(data.getUint32());
                    this.dependLevel = data.getUint32();
                    var pointToSkillListLenth = data.getUint32();
                    for (var index = 0; index < pointToSkillListLenth; index++) {
                        this.pointToSkillList.push(data.getUint32());
                    }
                    this.studyCostRule = data.getUint32();
                    this.juejiDependLevel = data.getUTFBytes(data.getUint32());
                };
                return AcupointInfoBaseVo;
            }());
            template.AcupointInfoBaseVo = AcupointInfoBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=AcupointInfoBaseVo.js.map