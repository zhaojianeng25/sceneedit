/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var ItemAttr_PointCardBaseVo = /** @class */ (function () {
                function ItemAttr_PointCardBaseVo() {
                }
                ItemAttr_PointCardBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32(); //编号  id
                    this.itemtypeid = data.getUint32(); //类型  
                    this.name = data.getUTFBytes(data.getUint32()); //显示名  
                    this.level = data.getUint32(); //等级
                    this.icon = data.getUint32(); //造型编号  客户端包裹栏小图标的数字id
                    this.battleuse = data.getUint32(); //战斗内使用对象 
                    this.battleuser = data.getUint32(); //战斗内使用者对象 
                    this.outbattleuse = data.getUint32(); //战斗外使用对象
                    this.destribe = data.getUTFBytes(data.getUint32()); //描述 
                    this.usemethod = data.getUTFBytes(data.getUint32()); //道具使用方法  			
                    this.maxNum = data.getUint32(); //最大堆叠数量  
                    this.bBind = data.getByte(); //是否绑定  bool
                    this.needLevel = data.getUint32(); //需求等级
                    this.bManuleDesrtrol = data.getByte(); //可否摧毁  bool
                    this.units = data.getUTFBytes(data.getUint32()); //单位  
                    this.bCanSale = data.getUint32(); //可否摆摊上架 
                    this.dbCanSale = data.getUint32(); //点卡服可否摆摊上架 
                    this.bCanSaleToNpc = data.getUint32(); //可否卖店 
                    this.npcid2 = data.getUint32(); //售卖NPCID 
                    this.colour = data.getUTFBytes(data.getUint32()); //道具名颜色 
                    this.effectdes = data.getUTFBytes(data.getUint32()); //功能说明 
                    var vcomefromLength = data.getUint32();
                    this.vcomefrom = [];
                    for (var index = 0; index < vcomefromLength; index++) {
                        this.vcomefrom.push(data.getUint32());
                    }
                    this.nusetype = data.getUint32(); //使用按钮功能类型 
                    var vuseparamLength = data.getUint32();
                    this.vuseparam = [];
                    for (var index = 0; index < vuseparamLength; index++) {
                        this.vuseparam.push(data.getUint32());
                    }
                    this.nshoptype = data.getUint32(); //售卖商店类型 
                    this.nquality = data.getUint32(); //颜色品质 
                    this.special = data.getUint32(); //寻路特殊处理 
                };
                return ItemAttr_PointCardBaseVo;
            }());
            template.ItemAttr_PointCardBaseVo = ItemAttr_PointCardBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=ItemAttr_PointCardBaseVo.js.map