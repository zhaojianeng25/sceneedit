/**
* @Author: LinQiuWen
* @description:j技能格系统/技能熟练配置表
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var SkillAcupointConfigBaseVo = /** @class */ (function () {
                function SkillAcupointConfigBaseVo() {
                    this.acupointIDList = []; //"影响技能格1ID,影响技能格2ID,影响技能格3ID,影响技能格4ID,影响技能格5ID,影响技能格6ID,影响技能格7ID,影响技能格8ID,影响技能格9ID,影响技能格10ID,影响技能格11ID,影响技能格12ID,影响技能格13ID,影响技能格14ID,影响技能格15ID,影响技能格16ID,影响技能格17ID,影响技能格18ID,影响技能格19ID,影响技能格20ID,影响技能格21ID"
                    // double类型数组
                    this.acupointParaList = []; //影响技能格1权值,影响技能格2权值,影响技能格3权值,影响技能格4权值,影响技能格5权值,影响技能格6权值,影响技能格7权值,影响技能格8权值,影响技能格9权值,影响技能格10权值,影响技能格11权值,影响技能格12权值,影响技能格13权值,影响技能格14权值,影响技能格15权值,影响技能格16权值,影响技能格17权值,影响技能格18权值,影响技能格19权值,影响技能格20权值,影响技能格21权值
                }
                SkillAcupointConfigBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.initValue = data.getUint32();
                    var acupointIDListLength = data.getUint32();
                    for (var index = 0; index < acupointIDListLength; index++) {
                        this.acupointIDList.push(data.getUint32());
                    }
                    var acupointParaListLength1 = data.getUint32();
                    for (var index = 0; index < acupointParaListLength1; index++) {
                        this.acupointParaList.push(data.getFloat64());
                    }
                };
                return SkillAcupointConfigBaseVo;
            }());
            template.SkillAcupointConfigBaseVo = SkillAcupointConfigBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=SkillAcupointConfigBaseVo.js.map