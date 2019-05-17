/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var WorldMapConfigBaseVo = /** @class */ (function () {
                function WorldMapConfigBaseVo() {
                }
                WorldMapConfigBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.mapName = data.getUTFBytes(data.getUint32());
                    this.topx = data.getUint32();
                    this.topy = data.getUint32();
                    this.bottomx = data.getUint32();
                    this.bottomy = data.getUint32();
                    this.maptype = data.getUint32();
                    this.bShowInWorld = data.getByte();
                    this.LevelLimitMin = data.getInt32();
                    this.LevelLimitMax = data.getInt32();
                    this.sonmapid = data.getUTFBytes(data.getUint32());
                    this.sonmapname = data.getUTFBytes(data.getUint32());
                    this.sonmapnormal = data.getUTFBytes(data.getUint32());
                    this.sonmappushed = data.getUTFBytes(data.getUint32());
                    this.sonmapdisable = data.getUTFBytes(data.getUint32());
                    this.sculptid = data.getUint32();
                    this.sculptimgid = data.getUTFBytes(data.getUint32());
                    this.smallmapRes = data.getUTFBytes(data.getUint32());
                    this.smallmapSize = data.getUTFBytes(data.getUint32());
                    this.mapbg = data.getUTFBytes(data.getUint32());
                };
                return WorldMapConfigBaseVo;
            }());
            template.WorldMapConfigBaseVo = WorldMapConfigBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=WorldMapConfigBaseVo.js.map