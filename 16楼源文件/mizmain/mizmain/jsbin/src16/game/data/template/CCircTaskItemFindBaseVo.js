/**
* @Author: LinQiuWen
* @description:x循环任务/x循环任务-寻找物品类分表
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CCircTaskItemFindBaseVo = /** @class */ (function () {
                function CCircTaskItemFindBaseVo() {
                }
                CCircTaskItemFindBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.ctgroup = data.getUint32();
                    this.school = data.getUint32();
                    this.levelmin = data.getUint32();
                    this.levelmax = data.getUint32();
                    this.recycleitem = data.getUTFBytes(data.getUint32());
                    this.itemnum = data.getUint32();
                    this.islegend = data.getUint32();
                    this.legendtime = data.getUint32();
                    this.nneedquality = data.getUint32();
                    this.nqualitya = data.getUint32();
                    this.nqualityb = data.getUint32();
                };
                return CCircTaskItemFindBaseVo;
            }());
            template.CCircTaskItemFindBaseVo = CCircTaskItemFindBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CCircTaskItemFindBaseVo.js.map