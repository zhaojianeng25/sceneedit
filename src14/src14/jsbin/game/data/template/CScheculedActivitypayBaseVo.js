/**
* name d定时活动配置表for点卡服
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CScheculedActivitypayBaseVo = /** @class */ (function () {
                function CScheculedActivitypayBaseVo() {
                }
                CScheculedActivitypayBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.startTime = data.getUTFBytes(data.getUint32());
                    this.endTime = data.getUTFBytes(data.getUint32());
                    this.startTime2 = data.getUTFBytes(data.getUint32());
                    this.activityid = data.getUint32();
                    this.weekrepeat = data.getUint32();
                };
                return CScheculedActivitypayBaseVo;
            }());
            template.CScheculedActivitypayBaseVo = CScheculedActivitypayBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CScheculedActivitypayBaseVo.js.map