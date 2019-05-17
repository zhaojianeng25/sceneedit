/**
* @Author: LinQiuWen
* @description:
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CpaihangbangBaseVo = /** @class */ (function () {
                function CpaihangbangBaseVo() {
                }
                CpaihangbangBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.name1 = data.getUTFBytes(data.getUint32());
                    this.kuandu1 = data.getFloat64();
                    this.name2 = data.getUTFBytes(data.getUint32());
                    this.kuandu2 = data.getFloat64();
                    this.name3 = data.getUTFBytes(data.getUint32());
                    this.kuandu3 = data.getFloat64();
                    this.name4 = data.getUTFBytes(data.getUint32());
                    this.kuandu4 = data.getFloat64();
                    this.name5 = data.getUTFBytes(data.getUint32());
                    this.kuandu5 = data.getFloat64();
                    this.name6 = data.getUTFBytes(data.getUint32());
                    this.kuandu6 = data.getFloat64();
                    this.lingjiang = data.getUint32();
                    this.leixing = data.getUTFBytes(data.getUint32());
                };
                return CpaihangbangBaseVo;
            }());
            template.CpaihangbangBaseVo = CpaihangbangBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CpaihangbangBaseVo.js.map