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
            var CshouchonglibaoBaseVo = /** @class */ (function () {
                function CshouchonglibaoBaseVo() {
                    this.itemid = []; //物品id1,物品id2,物品id3,物品id4,物品id5,物品id6
                    this.itemnum = []; //物品数量1,物品数量2,物品数量3,物品数量4,物品数量5,物品数量6
                    this.petid = []; //宠物id1,宠物id2,宠物id3,宠物id4,宠物id5,宠物id6
                    this.petnum = []; //宠物数量1,宠物数量2,宠物数量3,宠物数量4,宠物数量5,宠物数量6
                    this.borderpic = []; //标签1,标签2,标签3,标签4,标签5,标签6
                }
                CshouchonglibaoBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    var length = data.getUint32();
                    for (var index = 0; index < length; index++) {
                        this.itemid.push(data.getUint32());
                    }
                    length = data.getUint32();
                    for (var index = 0; index < length; index++) {
                        this.itemnum.push(data.getUint32());
                    }
                    length = data.getUint32();
                    for (var index = 0; index < length; index++) {
                        this.petid.push(data.getUint32());
                    }
                    length = data.getUint32();
                    for (var index = 0; index < length; index++) {
                        this.petnum.push(data.getUint32());
                    }
                    length = data.getUint32();
                    for (var index = 0; index < length; index++) {
                        this.borderpic.push(data.getUTFBytes(data.getUint32()));
                    }
                };
                return CshouchonglibaoBaseVo;
            }());
            template.CshouchonglibaoBaseVo = CshouchonglibaoBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=CshouchonglibaoBaseVo.js.map