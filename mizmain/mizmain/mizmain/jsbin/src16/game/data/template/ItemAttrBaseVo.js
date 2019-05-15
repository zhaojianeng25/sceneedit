/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var ItemAttrBaseVo = /** @class */ (function () {
                function ItemAttrBaseVo() {
                }
                ItemAttrBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    this.itemtypeid = data.getUint32();
                    this.name = data.getUTFBytes(data.getUint32());
                    this.level = data.getUint32();
                    this.icon = data.getUint32();
                    this.battleuse = data.getUint32();
                    this.battleuser = data.getUint32();
                    this.outbattleuse = data.getUint32();
                    this.destribe = data.getUTFBytes(data.getUint32());
                    this.usemethod = data.getUTFBytes(data.getUint32());
                    this.maxNum = data.getUint32();
                    this.bBind = data.getByte();
                    this.needLevel = data.getUint32();
                    this.bManuleDesrtrol = data.getByte();
                    this.units = data.getUTFBytes(data.getUint32());
                    this.bCanSale = data.getUint32();
                    this.dbCanSale = data.getUint32();
                    this.bCanSaleToNpc = data.getUint32();
                    this.npcid2 = data.getUint32();
                    this.colour = data.getUTFBytes(data.getUint32());
                    this.effectdes = data.getUTFBytes(data.getUint32());
                    var vcomefromLength = data.getInt32();
                    this.vcomefrom = [];
                    for (var index = 0; index < vcomefromLength; index++) {
                        this.vcomefrom.push(data.getUint32());
                    }
                    this.nusetype = data.getUint32();
                    var vuseparamLength = data.getInt32();
                    this.vuseparam = [];
                    for (var index = 0; index < vuseparamLength; index++) {
                        this.vuseparam.push(data.getUint32());
                    }
                    this.nshoptype = data.getUint32();
                    this.nquality = data.getUint32();
                    this.special = data.getUint32();
                };
                return ItemAttrBaseVo;
            }());
            template.ItemAttrBaseVo = ItemAttrBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=ItemAttrBaseVo.js.map