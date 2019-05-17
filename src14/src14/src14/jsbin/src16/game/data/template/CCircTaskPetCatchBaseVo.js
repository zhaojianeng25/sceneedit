/**
* @Author: LinQiuWen
* @description:x循环任务/x循环任务-寻找宠物类分表
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CCircTaskPetCatchBaseVo = /** @class */ (function () {
                function CCircTaskPetCatchBaseVo() {
                }
                CCircTaskPetCatchBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.ctgroup = data.getUint32();
                    this.school = data.getUint32();
                    this.levelmin = data.getUint32();
                    this.levelmax = data.getUint32();
                    this.recycleitem = data.getUTFBytes(data.getUint32());
                    this.itemnum = data.getUint32();
                    this.shopnpc = data.getUint32();
                };
                return CCircTaskPetCatchBaseVo;
            }());
            template.CCircTaskPetCatchBaseVo = CCircTaskPetCatchBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CCircTaskPetCatchBaseVo.js.map