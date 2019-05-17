/**
* @Author: LinQiuWen
* @description:x循环任务/x循环任务-任性一下花费
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CRenXingCircTaskCostBaseVo = /** @class */ (function () {
                function CRenXingCircTaskCostBaseVo() {
                }
                CRenXingCircTaskCostBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.stonecost = data.getUint32();
                    this.xiayicost = data.getUint32();
                };
                return CRenXingCircTaskCostBaseVo;
            }());
            template.CRenXingCircTaskCostBaseVo = CRenXingCircTaskCostBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CRenXingCircTaskCostBaseVo.js.map