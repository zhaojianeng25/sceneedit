/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var HuanhuaInfoBaseVo = /** @class */ (function () {
                function HuanhuaInfoBaseVo() {
                }
                HuanhuaInfoBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.name = data.getUTFBytes(data.getUint32());
                    this.type = data.getUint32();
                    this.shapeid = data.getUint32();
                    this.headid = data.getUint32();
                    this.scalefactor = data.getFloat64();
                    var skillidLength = data.getUint32();
                    this.skillid = [];
                    for (var index = 0; index < skillidLength; index++) {
                        this.skillid.push(data.getUint32());
                    }
                    this.desc = data.getUTFBytes(data.getUint32());
                    this.itemid = data.getUint32();
                };
                return HuanhuaInfoBaseVo;
            }());
            template.HuanhuaInfoBaseVo = HuanhuaInfoBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=HuanhuaInfoBaseVo.js.map