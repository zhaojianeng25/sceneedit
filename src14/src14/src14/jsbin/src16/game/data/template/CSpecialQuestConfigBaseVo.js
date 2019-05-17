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
            var CSpecialQuestConfigBaseVo = /** @class */ (function () {
                function CSpecialQuestConfigBaseVo() {
                }
                CSpecialQuestConfigBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.questname = data.getUTFBytes(data.getUint32());
                    this.name = data.getUTFBytes(data.getUint32());
                    this.aim = data.getUTFBytes(data.getUint32());
                    this.discribe = data.getUTFBytes(data.getUint32());
                    this.tracname = data.getUTFBytes(data.getUint32());
                    this.tracdiscribe = data.getUTFBytes(data.getUint32());
                    this.tasknumber = data.getUint32();
                };
                return CSpecialQuestConfigBaseVo;
            }());
            template.CSpecialQuestConfigBaseVo = CSpecialQuestConfigBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CSpecialQuestConfigBaseVo.js.map