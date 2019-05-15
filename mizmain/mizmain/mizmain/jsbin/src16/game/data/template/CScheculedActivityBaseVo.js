/**
* name d定时活动配置表
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CScheculedActivityBaseVo = /** @class */ (function () {
                function CScheculedActivityBaseVo() {
                }
                CScheculedActivityBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.strserverid = data.getUTFBytes(data.getUint32());
                    this.startTime = data.getUTFBytes(data.getUint32());
                    this.endTime = data.getUTFBytes(data.getUint32());
                    this.startTime2 = data.getUTFBytes(data.getUint32());
                    this.activityid = data.getUint32();
                    this.weekrepeat = data.getUint32();
                };
                return CScheculedActivityBaseVo;
            }());
            template.CScheculedActivityBaseVo = CScheculedActivityBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CScheculedActivityBaseVo.js.map