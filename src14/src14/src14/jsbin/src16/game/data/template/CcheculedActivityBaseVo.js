/**
* name d定时活动配置表
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CcheculedActivityBaseVo = /** @class */ (function () {
                function CcheculedActivityBaseVo() {
                }
                CcheculedActivityBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.startTime = data.getUTFBytes(data.getUint32());
                };
                return CcheculedActivityBaseVo;
            }());
            template.CcheculedActivityBaseVo = CcheculedActivityBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CcheculedActivityBaseVo.js.map