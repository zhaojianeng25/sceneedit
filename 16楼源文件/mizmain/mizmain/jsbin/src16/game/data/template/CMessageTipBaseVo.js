/**
* name  客户端提示信息表/客户端提示
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CMessageTipBaseVo = /** @class */ (function () {
                function CMessageTipBaseVo() {
                }
                CMessageTipBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.type = data.getUTFBytes(data.getUint32());
                    this.msg = data.getUTFBytes(data.getUint32());
                };
                return CMessageTipBaseVo;
            }());
            template.CMessageTipBaseVo = CMessageTipBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CMessageTipBaseVo.js.map