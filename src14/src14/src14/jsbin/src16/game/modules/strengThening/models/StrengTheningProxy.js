var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var modules;
    (function (modules) {
        var strengThening;
        (function (strengThening) {
            var models;
            (function (models) {
                models.STRENG_EVENT = "strengTheningEvent";
                /**物品数量改变 */
                models.STRENG_EVENT_ITEM = "strengTheningItemEvent";
                /**打造 */
                models.onProductMadeUp = "onProductMadeUp";
                /**打造异常返回 */
                models.onErrorCode = "onErrorCode";
                /**宝石镶嵌红点 */
                models.insertRedDot = "insertRedDot";
                /**宝石合成返回i */
                models.SHeChengItem = "SHeChengItem";
                /**修理结果 */
                models.SRepairResult = "SRepairResult";
                /**修理失败次数 */
                models.SXiuLiFailTimes = "SXiuLiFailTimes";
                /**刷新耐久 */
                models.SRefreshMaxNaiJiu = "SRefreshMaxNaiJiu";
                /**合成宝石 */
                models.SRideUpdate = "SRideUpdate";
                /** 打开遮罩 */
                models.OPENZHEZHAO = "Open_ZheZhao";
                /** 打开遮罩 */
                models.CLOSEZHEZHAO = "Close_ZheZhao";
                /** 强化模块的中转服务Proxy */
                var StrengTheningProxy = /** @class */ (function (_super) {
                    __extends(StrengTheningProxy, _super);
                    function StrengTheningProxy() {
                        var _this = _super.call(this) || this;
                        StrengTheningProxy._instance = _this;
                        _this.init();
                        return _this;
                    }
                    StrengTheningProxy.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new StrengTheningProxy();
                        }
                        return this._instance;
                    };
                    StrengTheningProxy.prototype.init = function () {
                        models.StrengTheningModel.getInstance();
                        this.addNetworkListener();
                        /**装备打造列表 */
                        Laya.loader.load("common/data/temp/item.cequipmakeinfo.bin", Handler.create(this, this.onloadedEquipMakeInfoComplete), null, Loader.BUFFER);
                        /**z装备表 */
                        Laya.loader.load("common/data/temp/item.cequipeffect.bin", Handler.create(this, this.onloadedEquipEffectComplete), null, Loader.BUFFER);
                        /**z装备表2 */
                        Laya.loader.load("common/data/temp/item.cequipitemattr.bin", Handler.create(this, this.onloadedEquipItemAttrComplete), null, Loader.BUFFER);
                        /**宝石表 */
                        Laya.loader.load("common/data/temp/item.cgemeffect.bin", Handler.create(this, this.onloadedGemEffectComplete), null, Loader.BUFFER);
                        /**杂货表 */
                        Laya.loader.load("common/data/temp/item.cgroceryeffect.bin", Handler.create(this, this.onloadedGroceryEffectComplete), null, Loader.BUFFER);
                        /**道具类型表 */
                        Laya.loader.load("common/data/temp/item.citemtype.bin", Handler.create(this, this.onloadedItemTypeComplete), null, Loader.BUFFER);
                        /**宝石类型表 */
                        Laya.loader.load("common/data/temp/item.cgemtype.bin", Handler.create(this, this.onloadedGemTypeComplete), null, Loader.BUFFER);
                        /**装备部件对应表 */
                        Laya.loader.load("common/data/temp/item.cequipposname.bin", Handler.create(this, this.onloadedEquipPosNameComplete), null, Loader.BUFFER);
                        /**道具合成表 */
                        Laya.loader.load("common/data/temp/item.cequipcombin.bin", Handler.create(this, this.onloadedCequipCombinComplete), null, Loader.BUFFER);
                        /**装备附加属性库 */
                        Laya.loader.load("common/data/temp/item.cequipaddattributelib.bin", Handler.create(this, this.onloadedEquipAddattributelibComplete), null, Loader.BUFFER);
                        /**装备生成基础属性表 */
                        Laya.loader.load("common/data/temp/item.cequipiteminfo.bin", Handler.create(this, this.onloadedEquipIteminfoComplete), null, Loader.BUFFER);
                        /**属性效果id表 */
                        Laya.loader.load("common/data/temp/item.cattributedesconfig.bin", Handler.create(this, this.onloadedAttributeDesConfigComplete), null, Loader.BUFFER);
                        /**获取途径表 */
                        Laya.loader.load("common/data/temp/item.ccomefrom.bin", Handler.create(this, this.onloadedComeFromComplete), null, Loader.BUFFER);
                    };
                    StrengTheningProxy.prototype.onloadedEquipMakeInfoComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cequipmakeinfo.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.StrengTheningModel.getInstance().equipMakeInfoData, game.data.template.EquipMakeInfoBaseVo, "id");
                        models.StrengTheningModel.getInstance().id = 120017;
                    };
                    StrengTheningProxy.prototype.onloadedEquipEffectComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cequipeffect.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.StrengTheningModel.getInstance().equipEffectData, game.data.template.EquipEffectBaseVo, "id");
                    };
                    StrengTheningProxy.prototype.onloadedEquipItemAttrComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cequipitemattr.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.StrengTheningModel.getInstance().equipItemAttrData, game.data.template.EquipItemAttrBaseVo, "id");
                    };
                    StrengTheningProxy.prototype.onloadedGemEffectComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cgemeffect.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.StrengTheningModel.getInstance().gemEffectData, game.data.template.GemEffectBaseVo, "id");
                    };
                    StrengTheningProxy.prototype.onloadedGroceryEffectComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cgroceryeffect.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.StrengTheningModel.getInstance().groceryEffectData, game.data.template.GroceryEffectBaseVo, "id");
                    };
                    StrengTheningProxy.prototype.onloadedItemTypeComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/item.citemtype.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.StrengTheningModel.getInstance().itemTypeData, game.data.template.ItemTypeBaseVo, "id");
                    };
                    StrengTheningProxy.prototype.onloadedGemTypeComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cgemtype.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.StrengTheningModel.getInstance().gemTypeData, game.data.template.GemTypeBaseVo, "id");
                    };
                    StrengTheningProxy.prototype.onloadedEquipPosNameComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cequipposname.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.StrengTheningModel.getInstance().equipPosNameData, game.data.template.EquipPosNameBaseVo, "id");
                    };
                    StrengTheningProxy.prototype.onloadedCequipCombinComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cequipcombin.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.StrengTheningModel.getInstance().cequipCombinData, game.data.template.EquipCombinBaseVo, "id");
                    };
                    StrengTheningProxy.prototype.onloadedEquipAddattributelibComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cequipaddattributelib.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.StrengTheningModel._instance.equipAddattributelibData, game.data.template.EquipAddattributelibBaseVo, "id");
                        data.pos = 0;
                        size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.StrengTheningModel._instance.equipAddattributelibDataBySkill, game.data.template.EquipAddattributelibBaseVo, "skillid");
                    };
                    StrengTheningProxy.prototype.onloadedEquipIteminfoComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cequipiteminfo.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.StrengTheningModel._instance.equipIteminfoData, game.data.template.EquipIteminfoBaseVo, "id");
                    };
                    StrengTheningProxy.prototype.onloadedAttributeDesConfigComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cattributedesconfig.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.StrengTheningModel._instance.attributeDesConfigData, game.data.template.AttributeDesConfigBaseVo, "id");
                    };
                    StrengTheningProxy.prototype.onloadedComeFromComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/item.ccomefrom.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.StrengTheningModel._instance.comeFromData, game.data.template.ComeFromBaseVo, "id");
                    };
                    //  添加监听
                    StrengTheningProxy.prototype.addNetworkListener = function () {
                        /**打造 */
                        Network._instance.addHanlder(ProtocolsEnum.SProductMadeUp, this, this.onProductMadeUp);
                        /**打造失败监听 */
                        Network._instance.addHanlder(ProtocolsEnum.SErrorCode, this, this.onErrorCode);
                        /**合成宝石 */
                        Network._instance.addHanlder(ProtocolsEnum.SRideUpdate, this, this.onSRideUpdate);
                        /**刷新最大耐久 */
                        Network._instance.addHanlder(ProtocolsEnum.SRefreshMaxNaiJiu, this, this.onSRefreshMaxNaiJiu);
                        /**修理失败次数 */
                        Network._instance.addHanlder(ProtocolsEnum.SXiuLiFailTimes, this, this.onSXiuLiFailTimes);
                        /**修理结果 */
                        Network._instance.addHanlder(ProtocolsEnum.SRepairResult, this, this.onSRepairResult);
                        /**刷新耐久度 */
                        Network._instance.addHanlder(ProtocolsEnum.SRefreshNaiJiu, this, this.onSRefreshNaiJiu);
                        /**合成 */
                        Network._instance.addHanlder(ProtocolsEnum.SHeChengItem, this, this.onSHeChengItem);
                    };
                    StrengTheningProxy.prototype.onProductMadeUp = function (optcode, msg) {
                        models.StrengTheningProxy._instance.event(models.onProductMadeUp);
                    };
                    StrengTheningProxy.prototype.onErrorCode = function (optcode, msg) {
                        models.StrengTheningProxy._instance.event(models.onErrorCode, msg.errorCode);
                    };
                    StrengTheningProxy.prototype.onSRideUpdate = function (optcode, msg) {
                        models.StrengTheningProxy._instance.event(models.SRideUpdate);
                    };
                    StrengTheningProxy.prototype.onSRefreshMaxNaiJiu = function (optcode, msg) {
                        models.StrengTheningProxy._instance.event(models.SRefreshMaxNaiJiu);
                    };
                    StrengTheningProxy.prototype.onSXiuLiFailTimes = function (optcode, msg) {
                        models.StrengTheningProxy._instance.event(models.SXiuLiFailTimes, msg.failtimes);
                    };
                    StrengTheningProxy.prototype.onSRepairResult = function (optcode, msg) {
                        models.StrengTheningProxy._instance.event(models.SRepairResult, msg.ret);
                    };
                    StrengTheningProxy.prototype.onSItemNumChange = function (optcode, msg) {
                        var bag = bagModel.getInstance().bagMap[msg.packid];
                        var items = bag.items;
                        for (var i = 0; i < items.length; i++) {
                            var keyinpack = items[i].key;
                            if (keyinpack == msg.keyinpack) {
                                items[i].number = msg.curnum;
                            }
                        }
                        models.StrengTheningProxy.getInstance().event(models.STRENG_EVENT_ITEM);
                    };
                    StrengTheningProxy.prototype.onSRefreshNaiJiu = function (optcode, msg) {
                    };
                    StrengTheningProxy.prototype.onSDelItem = function (optcode, msg) {
                        var bag = bagModel.getInstance().bagMap[msg.packid];
                        var items = bag.items;
                        for (var i = 0; i < items.length; i++) {
                            var keyinpack = msg.itemKey;
                            if (keyinpack == items[i].key) {
                                items.splice(i, 1);
                            }
                        }
                        models.StrengTheningProxy.getInstance().event(models.STRENG_EVENT_ITEM);
                    };
                    StrengTheningProxy.prototype.onSHeChengItem = function (optcode, msg) {
                        models.StrengTheningProxy._instance.event(models.SHeChengItem);
                    };
                    return StrengTheningProxy;
                }(hanlder.ProxyBase));
                models.StrengTheningProxy = StrengTheningProxy;
            })(models = strengThening.models || (strengThening.models = {}));
        })(strengThening = modules.strengThening || (modules.strengThening = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=StrengTheningProxy.js.map