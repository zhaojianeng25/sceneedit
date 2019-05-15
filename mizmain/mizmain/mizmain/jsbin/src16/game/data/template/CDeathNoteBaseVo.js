/**
* @Author: LinQiuWen
* @description:s死亡提醒表
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CDeathNoteBaseVo = /** @class */ (function () {
                function CDeathNoteBaseVo() {
                }
                CDeathNoteBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.level = data.getUint32();
                    this.icon = data.getUTFBytes(data.getUint32());
                    this.eventId = data.getUint32();
                    this.text = data.getUTFBytes(data.getUint32());
                    this.functionId = data.getUint32();
                };
                return CDeathNoteBaseVo;
            }());
            template.CDeathNoteBaseVo = CDeathNoteBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CDeathNoteBaseVo.js.map