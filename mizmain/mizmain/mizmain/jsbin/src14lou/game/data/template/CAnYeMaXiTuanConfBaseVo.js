/**
* @Author: LinQiuWen
* @description:x循环任务/x暗夜马戏团任务配置表
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CAnYeMaXiTuanConfBaseVo = /** @class */ (function () {
                function CAnYeMaXiTuanConfBaseVo() {
                    this.vrewardid = []; //展示道具1,展示道具2,展示道具3,展示道具4,展示道具5,展示道具6
                }
                CAnYeMaXiTuanConfBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.nactivetype = data.getUint32();
                    this.levelgroup = data.getUint32();
                    this.levelmin = data.getUint32();
                    this.levelmax = data.getUint32();
                    this.roundgroup = data.getUint32();
                    this.roundmin = data.getUint32();
                    this.roundmax = data.getUint32();
                    this.roundrate = data.getUint32();
                    this.period = data.getUint32();
                    this.tasktype = data.getUint32();
                    this.group = data.getUint32();
                    this.isrenxing = data.getUint32();
                    this.renxingcost = data.getUint32();
                    this.normalaward = data.getUint32();
                    this.extaward = data.getUint32();
                    this.specialaward = data.getUint32();
                    this.comtips = data.getUint32();
                    this.strtasknameui = data.getUTFBytes(data.getUint32());
                    this.ntaskicon = data.getUint32();
                    this.strtaskdescui = data.getUTFBytes(data.getUint32());
                    this.strtaskname = data.getUTFBytes(data.getUint32());
                    this.strtaskdesc = data.getUTFBytes(data.getUint32());
                    var length = data.getUint32();
                    for (var index = 0; index < length; index++) {
                        this.vrewardid.push(data.getUint32());
                    }
                    this.strtasktypeicon = data.getUTFBytes(data.getUint32());
                    this.titledes = data.getUTFBytes(data.getUint32());
                    this.followtitle = data.getUTFBytes(data.getUint32());
                    this.followtitledes = data.getUTFBytes(data.getUint32());
                    this.dialogdes = data.getUTFBytes(data.getUint32());
                    this.dialogdessuccess = data.getUTFBytes(data.getUint32());
                    this.dialogdesfail = data.getUTFBytes(data.getUint32());
                    this.followdes = data.getUTFBytes(data.getUint32());
                    this.followdessuccess = data.getUTFBytes(data.getUint32());
                    this.followdesfail = data.getUTFBytes(data.getUint32());
                };
                return CAnYeMaXiTuanConfBaseVo;
            }());
            template.CAnYeMaXiTuanConfBaseVo = CAnYeMaXiTuanConfBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CAnYeMaXiTuanConfBaseVo.js.map