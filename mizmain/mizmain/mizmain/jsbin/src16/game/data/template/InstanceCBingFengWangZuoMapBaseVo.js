/**
* name b冰静态地图
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var InstanceCBingFengWangZuoMapBaseVo = /** @class */ (function () {
                function InstanceCBingFengWangZuoMapBaseVo() {
                }
                InstanceCBingFengWangZuoMapBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.level = data.getUint32();
                    this.enemyNum = data.getUint32();
                    this.mapName = data.getUTFBytes(data.getUint32());
                    this.image1 = data.getUTFBytes(data.getUint32());
                    this.image2 = data.getUTFBytes(data.getUint32());
                    this.image3 = data.getUTFBytes(data.getUint32());
                    this.image4 = data.getUTFBytes(data.getUint32());
                    this.image5 = data.getUTFBytes(data.getUint32());
                    this.image6 = data.getUTFBytes(data.getUint32());
                    this.image7 = data.getUTFBytes(data.getUint32());
                    this.image8 = data.getUTFBytes(data.getUint32());
                };
                return InstanceCBingFengWangZuoMapBaseVo;
            }());
            template.InstanceCBingFengWangZuoMapBaseVo = InstanceCBingFengWangZuoMapBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=InstanceCBingFengWangZuoMapBaseVo.js.map