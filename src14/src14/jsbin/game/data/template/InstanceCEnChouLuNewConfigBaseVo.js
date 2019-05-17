/**
* name b冰封王座配置表新
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var InstanceCEnChouLuNewConfigBaseVo = /** @class */ (function () {
                function InstanceCEnChouLuNewConfigBaseVo() {
                }
                InstanceCEnChouLuNewConfigBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.minlevel = data.getUint32();
                    this.maxlevel = data.getUint32();
                    this.instzoneid = data.getUint32();
                    this.levelall = data.getUint32();
                    this.state = data.getUint32();
                    this.Map = data.getUint32();
                    this.ZuoBiao = data.getUTFBytes(data.getUint32());
                    this.FocusNpc = data.getUint32();
                    this.Fightid = data.getUint32();
                    this.JiangyouNpc = data.getUTFBytes(data.getUint32());
                    this.title = data.getUTFBytes(data.getUint32());
                    this.describe = data.getUTFBytes(data.getUint32());
                    this.boss = data.getUint32();
                    this.level = data.getUTFBytes(data.getUint32());
                    this.introduce = data.getUTFBytes(data.getUint32());
                    this.name = data.getUTFBytes(data.getUint32());
                    this.posX = data.getUint32();
                    this.posY = data.getUint32();
                };
                return InstanceCEnChouLuNewConfigBaseVo;
            }());
            template.InstanceCEnChouLuNewConfigBaseVo = InstanceCEnChouLuNewConfigBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=InstanceCEnChouLuNewConfigBaseVo.js.map