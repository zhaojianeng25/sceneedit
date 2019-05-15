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
            var CWinFrameSizeBaseVo = /** @class */ (function () {
                function CWinFrameSizeBaseVo() {
                }
                CWinFrameSizeBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.frameHeight = data.getUint32();
                    this.frameWidth = data.getUint32();
                };
                return CWinFrameSizeBaseVo;
            }());
            template.CWinFrameSizeBaseVo = CWinFrameSizeBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CWinFrameSizeBaseVo.js.map