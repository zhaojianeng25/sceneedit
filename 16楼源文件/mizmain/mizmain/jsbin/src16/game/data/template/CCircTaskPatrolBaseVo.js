/**
* @Author: LinQiuWen
* @description:x循环任务/x循环任务-巡逻类分表
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CCircTaskPatrolBaseVo = /** @class */ (function () {
                function CCircTaskPatrolBaseVo() {
                }
                CCircTaskPatrolBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.ctgroup = data.getUint32();
                    this.schoolid = data.getUint32();
                    this.levelmin = data.getUint32();
                    this.levelmax = data.getUint32();
                    this.mapid = data.getUTFBytes(data.getUint32());
                };
                return CCircTaskPatrolBaseVo;
            }());
            template.CCircTaskPatrolBaseVo = CCircTaskPatrolBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CCircTaskPatrolBaseVo.js.map