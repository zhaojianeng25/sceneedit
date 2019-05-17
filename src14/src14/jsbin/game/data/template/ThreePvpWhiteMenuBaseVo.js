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
            var ThreePvpWhiteMenuBaseVo = /** @class */ (function () {
                function ThreePvpWhiteMenuBaseVo() {
                }
                ThreePvpWhiteMenuBaseVo.prototype.parse = function (data) {
                    this.id = data.getUTFBytes(data.getUint32());
                    this.sid = data.getUTFBytes(data.getUint32());
                    this.username = data.getUTFBytes(data.getUint32());
                    this.roleid = data.getUTFBytes(data.getUint32());
                };
                return ThreePvpWhiteMenuBaseVo;
            }());
            template.ThreePvpWhiteMenuBaseVo = ThreePvpWhiteMenuBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=ThreePvpWhiteMenuBaseVo.js.map