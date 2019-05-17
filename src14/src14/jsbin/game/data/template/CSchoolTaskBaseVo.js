/**
* @Author: LinQiuWen
* @description:x循环任务/x循环任务总表
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CSchoolTaskBaseVo = /** @class */ (function () {
                function CSchoolTaskBaseVo() {
                }
                CSchoolTaskBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.type = data.getUint32();
                    this.levelgroup = data.getUint32();
                    this.levelmin = data.getUint32();
                    this.levelmax = data.getUint32();
                    this.maxnum = data.getUint32();
                    this.exp_round_level_coef = data.getFloat64();
                    this.exp_round_final = data.getFloat64();
                    this.exp_level_coef = data.getFloat64();
                    this.exp_final = data.getFloat64();
                    this.money_round_level_coef = data.getFloat64();
                    this.money_round_coef = data.getFloat64();
                    this.money_level_coef = data.getFloat64();
                    this.money_round_final = data.getFloat64();
                    this.s_round_level_coef = data.getFloat64();
                    this.s_round_coef = data.getFloat64();
                    this.s_level_coef = data.getFloat64();
                    this.s_round_final = data.getFloat64();
                    this.pet_exp_level_coef = data.getFloat64();
                    this.pet_exp_final = data.getFloat64();
                    this.nautodo = data.getUint32();
                    this.nautonextlun = data.getUint32();
                    this.nlunendmsgid = data.getUint32();
                    this.ngaojianground = data.getUint32();
                    this.ngaojiangmsgid = data.getUint32();
                    this.doublepoint = data.getUint32();
                };
                return CSchoolTaskBaseVo;
            }());
            template.CSchoolTaskBaseVo = CSchoolTaskBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CSchoolTaskBaseVo.js.map