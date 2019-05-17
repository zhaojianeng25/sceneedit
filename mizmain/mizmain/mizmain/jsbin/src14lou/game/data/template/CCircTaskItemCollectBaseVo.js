/**
* @Author: LinQiuWen
* @description:x循环任务/x循环任务-收集物品类分表
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CCircTaskItemCollectBaseVo = /** @class */ (function () {
                function CCircTaskItemCollectBaseVo() {
                }
                CCircTaskItemCollectBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.ctgroup = data.getUint32();
                    this.school = data.getUint32();
                    this.levelmin = data.getUint32();
                    this.levelmax = data.getUint32();
                    this.mapid = data.getUTFBytes(data.getUint32());
                    this.monsterid = data.getUTFBytes(data.getUint32());
                    this.itemid = data.getUint32();
                    this.itemnum = data.getUint32();
                };
                return CCircTaskItemCollectBaseVo;
            }());
            template.CCircTaskItemCollectBaseVo = CCircTaskItemCollectBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CCircTaskItemCollectBaseVo.js.map