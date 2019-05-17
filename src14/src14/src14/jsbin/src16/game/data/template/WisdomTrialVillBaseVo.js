/**
* @Author: LinQiuWen
* @description:
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var WisdomTrialVillBaseVo = /** @class */ (function () {
                function WisdomTrialVillBaseVo() {
                    this.optioins = []; //选项1,选项2,选项3,选项4
                }
                WisdomTrialVillBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.name = data.getUTFBytes(data.getUint32());
                    var length = data.getUint32();
                    for (var index = 0; index < length; index++) {
                        this.optioins.push(data.getUTFBytes(data.getUint32()));
                    }
                    this.jinglingid = data.getUint32();
                };
                return WisdomTrialVillBaseVo;
            }());
            template.WisdomTrialVillBaseVo = WisdomTrialVillBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=WisdomTrialVillBaseVo.js.map