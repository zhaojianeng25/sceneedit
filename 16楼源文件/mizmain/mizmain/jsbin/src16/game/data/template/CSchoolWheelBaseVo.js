/**
* @Author: LinQiuWen
* @description:z职业转盘表
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var CSchoolWheelBaseVo = /** @class */ (function () {
                function CSchoolWheelBaseVo() {
                    this.items = []; //物品1,物品2,物品3,物品4,物品5,物品6,物品7,物品8,物品9,物品10,物品11,物品12,物品13,物品14
                }
                CSchoolWheelBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    var length = data.getUint32();
                    for (var index = 0; index < length; index++) {
                        this.items.push(data.getUTFBytes(data.getUint32()));
                    }
                };
                return CSchoolWheelBaseVo;
            }());
            template.CSchoolWheelBaseVo = CSchoolWheelBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CSchoolWheelBaseVo.js.map