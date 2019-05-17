/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var StageInfoBaseVo = /** @class */ (function () {
                function StageInfoBaseVo() {
                }
                StageInfoBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    if (this.id == 11000104) {
                        console.log();
                    }
                    this.stagenum = data.getUint32();
                    this.stagetype = data.getUint32();
                    this.executetype = data.getUint32();
                    this.delay = data.getUint32();
                    this.actiontype = data.getUint32();
                    this.actionlimittime = data.getUint32();
                    this.movetype = data.getUint32();
                    this.syncprotect = data.getUint32();
                    this.targetx = data.getUint32();
                    this.targety = data.getUint32();
                    this.phantomid = data.getUint32();
                    this.phantomalpha = data.getUint32();
                    this.movetime = data.getUint32();
                    this.effecttype = data.getUint32();
                    this.postype = data.getUint32();
                    this.hastrail = data.getUint32();
                    this.youfangxiang = data.getUint32();
                    this.effectname = data.getUTFBytes(data.getUint32());
                    this.effectlayer = data.getUint32();
                    this.effectsound = data.getUTFBytes(data.getUint32());
                    this.resulttype = data.getUint32();
                    this.resultlimittime = data.getUint32();
                    this.resultonhittime = data.getUint32();
                    this.teleporttype = data.getUint32();
                    this.teletime = data.getUint32();
                    this.blurtime = data.getUint32();
                    this.teleportlimittime = data.getUint32();
                    this.x = data.getInt32();
                    this.y = data.getInt32();
                    this.scale = data.getFloat64();
                    this.x0 = data.getInt32();
                    this.y0 = data.getInt32();
                    this.scale0 = data.getFloat64();
                };
                return StageInfoBaseVo;
            }());
            template.StageInfoBaseVo = StageInfoBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=StageInfoBaseVo.js.map