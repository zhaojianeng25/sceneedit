/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var ShiGuangZhiXueConfigBaseVo = /** @class */ (function () {
                function ShiGuangZhiXueConfigBaseVo() {
                }
                ShiGuangZhiXueConfigBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.fubenId = data.getUint32();
                    this.name = data.getUTFBytes(data.getUint32());
                    this.explain = data.getUTFBytes(data.getUint32());
                    this.playerNum = data.getUint32();
                    this.enterLevel = data.getUint32();
                    this.image = data.getUTFBytes(data.getUint32());
                    this.icon = data.getUint32();
                    this.award1 = data.getUint32();
                    this.award2 = data.getUint32();
                    this.award3 = data.getUint32();
                    this.award4 = data.getUint32();
                    this.award5 = data.getUint32();
                };
                return ShiGuangZhiXueConfigBaseVo;
            }());
            template.ShiGuangZhiXueConfigBaseVo = ShiGuangZhiXueConfigBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=ShiGuangZhiXueConfigBaseVo.js.map