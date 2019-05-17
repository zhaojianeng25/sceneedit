/**
* name l聊天配置/l聊天常用语
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CquickchatBaseVo = /** @class */ (function () {
                function CquickchatBaseVo() {
                }
                CquickchatBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.tips = data.getUTFBytes(data.getUint32());
                };
                return CquickchatBaseVo;
            }());
            template.CquickchatBaseVo = CquickchatBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CquickchatBaseVo.js.map