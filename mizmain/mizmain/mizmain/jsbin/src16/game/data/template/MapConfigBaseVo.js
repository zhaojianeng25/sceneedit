/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var MapConfigBaseVo = /** @class */ (function () {
                function MapConfigBaseVo() {
                }
                MapConfigBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.mapName = data.getUTFBytes(data.getUint32());
                    this.mapIcon = data.getUTFBytes(data.getUint32());
                    this.desc = data.getUTFBytes(data.getUint32());
                    this.resdir = data.getUTFBytes(data.getUint32());
                    this.battleground = data.getUint32();
                    this.width = data.getUint32();
                    this.height = data.getUint32();
                    this.safemap = data.getUint32();
                    this.xjPos = data.getUint32();
                    this.yjPos = data.getUint32();
                    this.qinggong = data.getUint32();
                    this.bShowInWorld = data.getByte();
                    this.LevelLimitMin = data.getInt32();
                    this.LevelLimitMax = data.getInt32();
                    this.fightinfor = data.getUint32();
                    this.playerPosX = data.getUint32();
                    this.playerPosY = data.getUint32();
                    this.dynamic = data.getUint32();
                    this.fubenType = data.getUint32();
                    this.music = data.getUTFBytes(data.getUint32());
                    this.flyPosX = data.getUint32();
                    this.flyPosY = data.getUint32();
                    this.sceneColor = data.getUTFBytes(data.getUint32());
                    this.jumpmappoint = data.getUint32();
                    this.isMemVisible = data.getUint32();
                };
                return MapConfigBaseVo;
            }());
            template.MapConfigBaseVo = MapConfigBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=MapConfigBaseVo.js.map