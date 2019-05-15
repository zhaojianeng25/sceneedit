/**
* name l聊天配置/l聊天屏蔽字
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CBanWordsBaseVo = /** @class */ (function () {
                function CBanWordsBaseVo() {
                }
                CBanWordsBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.tips = data.getUTFBytes(data.getUint32());
                };
                return CBanWordsBaseVo;
            }());
            template.CBanWordsBaseVo = CBanWordsBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CBanWordsBaseVo.js.map