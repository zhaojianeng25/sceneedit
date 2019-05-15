/**
* name  客户端提示信息表/程序内字符串
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CStringResBaseVo = /** @class */ (function () {
                function CStringResBaseVo() {
                }
                CStringResBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.msg = data.getUTFBytes(data.getUint32());
                };
                return CStringResBaseVo;
            }());
            template.CStringResBaseVo = CStringResBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CStringResBaseVo.js.map