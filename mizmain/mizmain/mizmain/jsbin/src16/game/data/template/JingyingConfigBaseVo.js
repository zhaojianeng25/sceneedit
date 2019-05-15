/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var JingyingConfigBaseVo = /** @class */ (function () {
                function JingyingConfigBaseVo() {
                }
                JingyingConfigBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.taskid = data.getUint32();
                    this.tasktype = data.getUint32();
                    this.mapid = data.getUint32();
                    this.solonpcid = data.getUint32();
                    this.step = data.getUint32();
                    this.steprate = data.getUint32();
                    this.lefttopx = data.getUint32();
                    this.lefttopy = data.getUint32();
                    this.endtask = data.getUint32();
                    this.decoratenpc1 = data.getUint32();
                    this.x1 = data.getUint32();
                    this.y1 = data.getUint32();
                    this.decoratenpc2 = data.getUint32();
                    this.x2 = data.getUint32();
                    this.y2 = data.getUint32();
                    this.decoratenpc3 = data.getUint32();
                    this.x3 = data.getUint32();
                    this.y3 = data.getUint32();
                };
                return JingyingConfigBaseVo;
            }());
            template.JingyingConfigBaseVo = JingyingConfigBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=JingyingConfigBaseVo.js.map