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
/**
 * @describe  背包系统的中转服务
 * @author  LQW
 */
var game;
(function (game) {
    var modules;
    (function (modules) {
        var bag;
        (function (bag_1) {
            var models;
            (function (models) {
                /**修改仓库名称事件 */
                models.STOREHOUSE_RENAME_EVENT = "storeHouseRenameEvent";
                /**接受仓库数据事件 */
                models.ACCPET_STOREHOUSE_DATA_EVENT = "accpetStorehouseDataEvent";
                /**刷新仓库数個數 */
                models.ACCPET_STOREHOUSE_NUM_EVENT = "accpetStorehouseNumEvent";
                /**接受背包数据事件 */
                models.ACCPET_BAG_DATA_EVENT = "accpetBagDataEvent";
                /**背包整理事件 */
                models.ARRANGE_BAG = "arrangeBag";
                /**关闭seletedUI界面事件*/
                models.CLOSE_SELETED_STOREHOUSE_EVENT = "closeSeletedStoreHouseEvent";
                /**bagStoreHouse界面传递当前仓库编号给bagStoreHouseRename界面事件 */
                models.TRANSMIT_NOWPAGE_DATA_EVENT = "transmitNowPageDataEvent";
                /**解锁仓库事件 */
                models.DEBLOCKING_EVENT = "deblockingEvent";
                /**刷新元宝显示 */
                models.REFRESH_YUANBAO_EVENT = "refreshyuanbao_event";
                /**刷新按钮名称事件 */
                models.DEPOTNAME_EVENT = "depotNameEvent";
                /**刷新金币显示 */
                models.REFRESH_CURRENCY_EVENT = "refreshCurrencyEvent";
                /**刷新背包格子 */
                models.REFRESH_BAG_COUNT = "refreshBagEvent";
                /**刷新背包出售界面的item数据 */
                models.REFRESH_SALE_COUNT = "refreshSaleEvent";
                /**刷新背包和仓库的数据交互 */
                models.REFRESH_BAG_DEPOT_COUNT = "refreshBagAndDepotEvent";
                /** 刷新临时背包ui */
                models.REFRESH_TEMP_BAG = "refreshBagOfTempEvent";
                /** 角色穿脱装备刷新 */
                models.ROLE_PUT_OFF = "rolePutOffEvent";
                /** 物品使用指引 */
                models.ADDITEM_USE_GUIDE = "addItemUseGuideEvent";
                /** 删除使用指引 */
                models.DELET_USE_GUIDE = "deletItemUseGuideEvent";
                /** 新增物品过场滑动事件 */
                models.ITEM_SLIDE = "itemSlideEvent";
                /**任务评分 */
                // export const REFRESH_ROLESCORE_EVENT: string = "refreshRoleScoreEvent";
                /** 物品增加或者减少或者改变 */
                models.ITEMADD_OR_DEL = "itemAddOrDel";
                /**背包引导事件 */
                models.BAG_YINDAO = "bagyindao";
                /**装备某装备时检查当前装备数据 */
                models.INSPECT_EQUIP = "inspectEquipEvent";
                /**装备某装备镶嵌宝石信息 */
                models.INSPECT_EQUIP_GEM = "inspectEquipGemEvent";
                /**刷新仓库数個數 */
                models.ACCPET_CURRENT_EVENT = "accpetCurrentEvent";
                /**显示评级所点中的物品 */
                models.SHOW_PINGJIITEM_EVENT = "showPingJiItemEvent";
                /** 获得珍品找回列表数据 */
                models.GET_ITEMRECOVERDATA = "getItemRecoverData";
                /** 找回珍品操作成功 */
                models.RECOVER_ITEM_SUCCESS = "recoverItemSuccess";
                /** 获得查看所要找回道具的信息数据 */
                models.GET_RECOVERITEM_INFODATA = "getRecoverItemInfoData";
                /** 当前玩家角色名字更改了 */
                models.CURR_ROLENAME_CHANGE = "currRoleNameChange";
                /** 卸下装备设置模型武器检查 */
                models.UNLOADING_EQUIP_CHECK = "unloadingEquipCheckEvent";
                var BagProxy = /** @class */ (function (_super) {
                    __extends(BagProxy, _super);
                    function BagProxy() {
                        var _this = _super.call(this) || this;
                        BagProxy._instance = _this;
                        _this.init();
                        return _this;
                    }
                    /**
                     * @describe  获取BagProxy单例对象，如果不存在则生成
                     */
                    BagProxy.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new BagProxy();
                        }
                        return this._instance;
                    };
                    BagProxy.prototype.init = function () {
                        // 初始化Model
                        models.BagModel.getInstance();
                        // 注册网络协议
                        this.addNetworkListener();
                        // bin
                        this.onLoadBinFile();
                    };
                    /**
                     * @describe  加载配合表的bin文件
                     */
                    BagProxy.prototype.onLoadBinFile = function () {
                        Laya.loader.load("common/data/temp/item.citemattr.bin", Handler.create(this, this.onloadedItemAttrComplete), null, Loader.BUFFER);
                        Laya.loader.load("common/data/temp/item.cpetitemeffect.bin", Handler.create(this, this.onloadedPetItemEffectComplete), null, Loader.BUFFER);
                        Laya.loader.load("common/data/temp/item.cbagtable.bin", Handler.create(this, this.onloadedBagTableComplete), null, Loader.BUFFER);
                        Laya.loader.load("common/data/temp/item.cdepottable.bin", Handler.create(this, this.onloadedDepottableComplete), null, Loader.BUFFER);
                        Laya.loader.load("common/data/temp/item.ctaskrelative.bin", Handler.create(this, this.onloadedTaskRelativeComplete), null, Loader.BUFFER);
                        Laya.loader.load("common/data/temp/item.citemusetip.bin", Handler.create(this, this.onloadedCitemUseTipComplete), null, Loader.BUFFER); //d道具使用提示表
                        Laya.loader.load("common/data/temp/item.cfightdrugtype.bin", Handler.create(this, this.onloadedFightDrugTypeComplete), null, Loader.BUFFER);
                    };
                    BagProxy.prototype.onloadedCitemUseTipComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/item.citemusetip.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.BagModel.getInstance().ItemUseTip, ItemUseTipBaseVo, "id");
                    };
                    BagProxy.prototype.onloadedItemAttrComplete = function () {
                        //console.log("ItemAttr表格加载完毕 completed");
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/item.citemattr.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.BagModel.getInstance().itemAttrData, ItemAttrBaseVo, "id");
                        //console.log("ItemattrData:", this.itemAttrData);
                    };
                    /**
                     * @describe  读取c宠物物品表；common/data/temp/item.cpetitemeffect.bin
                     */
                    BagProxy.prototype.onloadedPetItemEffectComplete = function () {
                        //console.log("PetItemEffectData表格加载完毕 completed");
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cpetitemeffect.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.BagModel.getInstance().petItemEffectData, PetItemEffectBaseVo, "id");
                        //console.log("PetItemEffectData:", this.petItemEffectData);
                    };
                    /**
                     * @describe  读取b背包扩充价格表；common/data/temp/item.cbagtable.bin
                     */
                    BagProxy.prototype.onloadedBagTableComplete = function () {
                        //console.log("BagTableData表格加载完毕 completed");
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cbagtable.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.BagModel.getInstance().bagTableData, BagTableBaseVo, "id");
                        //console.log("BagTableData:", this.bagTableData);
                    };
                    /**
                     * @describe  读出c仓库扩充价格；common/data/temp/item.cdepottable.bin
                     */
                    BagProxy.prototype.onloadedDepottableComplete = function () {
                        //console.log("DepottableData表格加载完毕 completed");
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cdepottable.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.BagModel.getInstance().depottableData, DepottableBaseVo, "id");
                        //console.log("DepottableData:", this.depottableData);
                    };
                    /**
                     * @describe  r任务物品表；common/data/temp/item.ctaskrelative.bin
                     */
                    BagProxy.prototype.onloadedTaskRelativeComplete = function () {
                        //console.log("TaskRelativeData表格加载完毕 completed");
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/item.ctaskrelative.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.BagModel.getInstance().taskRelativeData, TaskRelativeBaseVo, "id");
                        //console.log("TaskRelativeData:", this.taskRelativeData);
                    };
                    BagProxy.prototype.onloadedFightDrugTypeComplete = function () {
                        console.log("cfightdrugtype 表格加载完毕 completed");
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/item.cfightdrugtype.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.BagModel.getInstance().FightDrugTypeData, FightDrugTypeBaseVo, "id");
                    };
                    /**
                     * @describe  添加监听
                     */
                    BagProxy.prototype.addNetworkListener = function () {
                        // 未测试
                        Network._instance.addHanlder(ProtocolsEnum.SRefreshRoleScore, this, this.onRefreshRoleScore);
                        Network._instance.addHanlder(ProtocolsEnum.SGetDepotInfo, this, this.onGetDepotInfo);
                        Network._instance.addHanlder(ProtocolsEnum.SModifyDepotName, this, this.onModifyDepotName);
                        Network._instance.addHanlder(ProtocolsEnum.SGetPackInfo, this, this.onGetPackInfo);
                        Network._instance.addHanlder(ProtocolsEnum.SRefreshCurrency, this, this.onRefreshCurrency);
                        Network._instance.addHanlder(ProtocolsEnum.SRefreshPackSize, this, this.onRefreshPackSize);
                        Network._instance.addHanlder(ProtocolsEnum.SAddItem, this, this.onAddItem);
                        Network._instance.addHanlder(ProtocolsEnum.SDelItem, this, this.onDelItem);
                        Network._instance.addHanlder(ProtocolsEnum.SItemAdded, this, this.onItemAdded);
                        Network._instance.addHanlder(ProtocolsEnum.SPetEquipAddItem, this, this.onSPetEquipAddItem);
                        Network._instance.addHanlder(ProtocolsEnum.SItemNumChange, this, this.onSItemNumChange);
                        Network._instance.addHanlder(ProtocolsEnum.SReqFushiNum, this, this.onRefreshFushi);
                        Network._instance.addHanlder(ProtocolsEnum.SRideUpdate, this, this.onSRideUpdate); //坐骑乘骑更新
                        Network._instance.addHanlder(ProtocolsEnum.SAddTitle, this, this.onSAddTitle); //人物称谓
                        Network._instance.addHanlder(ProtocolsEnum.SModifyRoleName, this, this.onSModifyRoleName); //人物改名
                        Network._instance.addHanlder(ProtocolsEnum.SGetPetEquipInfo, this, this.onAddPetEquip);
                        Network._instance.addHanlder(ProtocolsEnum.SPetEquipDelItem, this, this.onPetEquipDelItem);
                        Network._instance.addHanlder(ProtocolsEnum.SRoleComponentsChange, this, this.onRoleComponentsChange);
                        Network._instance.addHanlder(ProtocolsEnum.SRefreshItemFlag, this, this.onSRefreshItemFlag);
                        Network._instance.addHanlder(ProtocolsEnum.SItemRecoverList, this, this.onSItemRecoverList);
                        Network._instance.addHanlder(ProtocolsEnum.SItemRecover, this, this.onSItemRecover);
                        Network._instance.addHanlder(ProtocolsEnum.SRecoverItemInfo, this, this.onSRecoverItemInfo);
                    };
                    /** 查看所要找回赠品的信息数据下发 */
                    BagProxy.prototype.onSRecoverItemInfo = function (optcode, msg) {
                        bag.models.BagModel.getInstance().equipItemRecoverInfoTips = msg.tips;
                        this.event(models.GET_RECOVERITEM_INFODATA, [msg.uniqId, msg.tips]);
                    };
                    /** 进行珍品找回操作返回 */
                    BagProxy.prototype.onSItemRecover = function (optcode, msg) {
                        this.event(models.RECOVER_ITEM_SUCCESS, [msg.itemId, msg.uniqId]);
                    };
                    /** 请求珍品找回列表下发返回数据接收 */
                    BagProxy.prototype.onSItemRecoverList = function (optcode, msg) {
                        bag.models.BagModel.getInstance().itemRecoverInfoData = [];
                        bag.models.BagModel.getInstance().itemRecoverInfoData = msg.items;
                        this.event(models.GET_ITEMRECOVERDATA, [msg.items]);
                    };
                    /**
                     * @describe  移除所有的监听
                     */
                    BagProxy.prototype.removeNetworkListener = function () {
                        Network._instance.removeHanlder(ProtocolsEnum.SGetDepotInfo, this, this.onGetDepotInfo);
                        Network._instance.removeHanlder(ProtocolsEnum.SRefreshRoleScore, this, this.onRefreshRoleScore);
                        Network._instance.removeHanlder(ProtocolsEnum.SGetDepotInfo, this, this.onGetDepotInfo);
                        Network._instance.removeHanlder(ProtocolsEnum.SModifyDepotName, this, this.onModifyDepotName);
                        Network._instance.removeHanlder(ProtocolsEnum.SGetPackInfo, this, this.onGetPackInfo);
                        Network._instance.removeHanlder(ProtocolsEnum.SRefreshCurrency, this, this.onRefreshCurrency);
                        Network._instance.removeHanlder(ProtocolsEnum.SRefreshPackSize, this, this.onRefreshPackSize);
                        Network._instance.removeHanlder(ProtocolsEnum.SAddItem, this, this.onAddItem);
                        Network._instance.removeHanlder(ProtocolsEnum.SDelItem, this, this.onDelItem);
                        Network._instance.removeHanlder(ProtocolsEnum.SItemAdded, this, this.onItemAdded);
                        Network._instance.removeHanlder(ProtocolsEnum.SPetEquipAddItem, this, this.onSPetEquipAddItem);
                        Network._instance.removeHanlder(ProtocolsEnum.SItemNumChange, this, this.onSItemNumChange);
                        Network._instance.removeHanlder(ProtocolsEnum.SReqFushiNum, this, this.onRefreshFushi);
                        Network._instance.removeHanlder(ProtocolsEnum.SRideUpdate, this, this.onSRideUpdate); //坐骑乘骑更新
                        Network._instance.removeHanlder(ProtocolsEnum.SAddTitle, this, this.onSAddTitle); //人物称谓
                        Network._instance.removeHanlder(ProtocolsEnum.SModifyRoleName, this, this.onSModifyRoleName); //人物改名
                        Network._instance.removeHanlder(ProtocolsEnum.SGetPetEquipInfo, this, this.onAddPetEquip);
                        Network._instance.removeHanlder(ProtocolsEnum.SPetEquipDelItem, this, this.onPetEquipDelItem);
                        Network._instance.removeHanlder(ProtocolsEnum.SRoleComponentsChange, this, this.onRoleComponentsChange);
                        Network._instance.removeHanlder(ProtocolsEnum.SItemRecoverList, this, this.onSItemRecoverList);
                        Network._instance.removeHanlder(ProtocolsEnum.SItemRecover, this, this.onSItemRecover);
                        Network._instance.removeHanlder(ProtocolsEnum.SRecoverItemInfo, this, this.onSRecoverItemInfo);
                    };
                    /** 服务器通知客户端刷新道具的flag */
                    BagProxy.prototype.onSRefreshItemFlag = function (optcode, msg) {
                        var packid = msg.packid;
                        var flag = msg.flag;
                        var key = msg.itemkey;
                        var item = models.BagModel.getInstance().bagMap[packid].items;
                        for (var _index = 0; _index < item.length; _index++) {
                            if (item[_index].key == key) {
                                item[_index].flags = flag;
                                break;
                            }
                        }
                    };
                    /** 角色换装信息 */
                    BagProxy.prototype.onRoleComponentsChange = function (optcode, msg) {
                        var roleid = msg.roleid;
                        var spritetype = msg.spritetype;
                        bagModel.getInstance().roleComponentsChange.clear();
                        bagModel.getInstance().roleComponentsChange = msg.components;
                        if (msg.components.get(SpriteComponents.SPRITE_FASHION) != null) { /** 角色进行了脱穿 */
                            bagModel.getInstance().rolePutOn = msg.components.get(SpriteComponents.SPRITE_FASHION);
                            this.event(models.ROLE_PUT_OFF, bagModel.getInstance().rolePutOn);
                        }
                    };
                    /**
                     * 宠物背包
                     */
                    BagProxy.prototype.onAddPetEquip = function (optcode, msg) {
                        models.BagModel.getInstance().bagMap[9] = msg.mydata.petequipinfo;
                        console.log(models.BagModel.getInstance().bagMap[9]);
                        console.log(models.BagModel.getInstance().bagMap);
                        console.log("加载结束");
                    };
                    /**
                     * @describe  道具数量改变
                     */
                    BagProxy.prototype.onSItemNumChange = function (optcode, msg) {
                        var packid = msg.packid;
                        var keyinpack = msg.keyinpack;
                        var curnum = msg.curnum;
                        var item = models.BagModel.getInstance().bagMap[packid].items;
                        for (var keyindex = 0; keyindex < item.length; keyindex++) {
                            if (item[keyindex].key == keyinpack) { /** 找到当前物品 */
                                models.BagModel.getInstance().bagMap[packid].items[keyindex].number = curnum;
                                /** 存在指引字典里的物品 */
                                var itemKey = bagModel.getInstance().addItemUseGuide.keys;
                                for (var index = 0; index < itemKey.length; index++) {
                                    var itemId = itemKey[index];
                                    if (packid == BagTypes.BAG && models.BagModel.getInstance().bagMap[packid].items[keyindex].id == itemId) {
                                        models.BagModel.getInstance().addItemUseGuide.set(itemId, item[keyindex]);
                                        /** 如果容器中存在指定物品才并且是第一个刷新界面 */
                                        if (index == 0)
                                            this.event(models.ADDITEM_USE_GUIDE);
                                    }
                                }
                            }
                        }
                        models.BagProxy.getInstance().event(models.REFRESH_SALE_COUNT);
                        models.BagProxy.getInstance().event(models.REFRESH_BAG_COUNT);
                        BagProxy.getInstance().event(models.REFRESH_BAG_DEPOT_COUNT);
                        BagProxy.getInstance().event(models.ITEMADD_OR_DEL);
                    };
                    /**
                     * @describe  删除bag中的道具信息
                     */
                    BagProxy.prototype.onDelItem = function (optcode, msg) {
                        // // console.log("数据："+msg.itemKey+","+msg.packid);
                        // let bag:game.modules.bag.models.BagVo = BagModel.getInstance().bagMap[msg.packid];
                        // // bag.items.reduce(msg.itemKey);
                        var packid = msg.packid;
                        var itemKey = msg.itemKey;
                        var bag = models.BagModel.getInstance().bagMap[packid];
                        // let item = bag.items;
                        if (packid == BagTypes.BAG) {
                            //用来判断要被删除道具确实在背包存在
                            var bagIsHaveFlag = false;
                            for (var itemIndex = 0; itemIndex < bag.items.length; itemIndex++) {
                                if (bag.items[itemIndex].key == itemKey) {
                                    bagIsHaveFlag = true;
                                    var delitItemId = bag.items[itemIndex].id;
                                    /** 删除 */
                                    models.BagModel.getInstance().bagMap[packid].items.splice(itemIndex, 1);
                                    /** 判断是不是指引字典里的数据 */
                                    var itemKey_1 = bagModel.getInstance().addItemUseGuide.keys;
                                    for (var index = 0; index < itemKey_1.length; index++) {
                                        var itemId = itemKey_1[index];
                                        if (delitItemId == itemId) {
                                            models.BagModel.getInstance().addItemUseGuide.remove(itemId);
                                            /** 如果容器中存在指定物品才并且是第一个刷新界面 */
                                            if (index == 0)
                                                this.event(models.DELET_USE_GUIDE);
                                        }
                                    }
                                }
                            }
                            if (!bagIsHaveFlag) {
                                models.BagModel.getInstance().tempBankBag(itemKey, true);
                            }
                            models.BagProxy.getInstance().event(models.REFRESH_SALE_COUNT);
                        }
                        else if (packid == BagTypes.DEPOT) {
                            var currDepot = bagModel.getInstance().currDepotId;
                            for (var itemIndex = 0; itemIndex < bag[currDepot].items.length; itemIndex++) {
                                if (bag[currDepot].items[itemIndex].key == itemKey) {
                                    models.BagModel.getInstance().bagMap[packid][currDepot].items.splice(itemIndex, 1);
                                }
                            }
                        }
                        else if (packid == BagTypes.EQUIP) {
                            for (var itemIndex = 0; itemIndex < bag.items.length; itemIndex++) {
                                if (bag.items[itemIndex].key == itemKey) {
                                    //当前装备镶嵌的宝石
                                    var gemarr = StrengTheningModel.getInstance().equGem(packid, bag.items[itemIndex].key);
                                    var id = bag.items[itemIndex].id;
                                    if (gemarr.length != 0) {
                                        //专门为装备替换而存
                                        var equipType = StrengTheningModel.getInstance().equipEffectData[id].eequiptype;
                                        models.BagModel.getInstance().equipRelace.set(equipType, id);
                                    }
                                    models.BagModel.getInstance().bagMap[packid].items.splice(itemIndex, 1);
                                    //移除装备检查模型武器
                                    models.BagProxy.getInstance().event(models.UNLOADING_EQUIP_CHECK, id);
                                }
                            }
                        }
                        else if (packid == BagTypes.TEMP) {
                            //用来判断要被删除道具确实在临时背包存在
                            var tempbagIsHaveFlag = false;
                            for (var itemIndex = 0; itemIndex < bag.items.length; itemIndex++) {
                                if (bag.items[itemIndex].key == itemKey) {
                                    tempbagIsHaveFlag = true;
                                    models.BagModel.getInstance().bagMap[packid].items.splice(itemIndex, 1);
                                }
                            }
                            if (!tempbagIsHaveFlag) {
                                models.BagModel.getInstance().tempBankBag(itemKey, true);
                            }
                            if (models.BagModel.getInstance().bagMap[packid].items.length == 0)
                                this.event(models.REFRESH_TEMP_BAG);
                        }
                        else if (packid == BagTypes.QUEST) {
                            for (var itemIndex = 0; itemIndex < bag.items.length; itemIndex++) {
                                if (bag.items[itemIndex].key == itemKey) {
                                    models.BagModel.getInstance().bagMap[packid].items.splice(itemIndex, 1);
                                }
                            }
                        }
                        models.BagProxy.getInstance().event(models.REFRESH_BAG_COUNT);
                        models.BagProxy.getInstance().event(models.ITEMADD_OR_DEL);
                        // 重新赋值
                        // item.id = -1;
                        // // 重新赋值
                        // bag.items[itemKey] = item;
                        // BagModel.getInstance().bagMap[packid] = bag;
                    };
                    /**
                     * @describe  宠物装备增加
                     */
                    BagProxy.prototype.onSPetEquipAddItem = function (optcode, msg) {
                        console.log("装备增加");
                        console.log(game.modules.bag.models.BagModel.getInstance().bagMap);
                        var petequipinfo = game.modules.bag.models.BagModel.getInstance().bagMap[msg.packid];
                        var petbag = petequipinfo.get(msg.petkey);
                        var ishave = 0;
                        if (petbag != null) { //有该宠物装备信息
                            for (var index = 0; index < petbag.items.length; index++) {
                                var item = petbag.items[index];
                                var iteminfo = game.modules.bag.models.BagModel.getInstance().itemAttrData[item.id];
                                var newiteminfo = game.modules.bag.models.BagModel.getInstance().itemAttrData[msg.data[0].id];
                                if (iteminfo.itemtypeid == newiteminfo.itemtypeid) {
                                    petbag.items[index] = msg.data[0];
                                    ishave = 1;
                                    break;
                                }
                            }
                            if (ishave == 0) {
                                petbag.items.push(msg.data[0]);
                            }
                        }
                        else { // 无时则重新创建一个
                            var newpetbag = new models.BagVo();
                            newpetbag.items = [];
                            newpetbag.items.push(msg.data[0]);
                            petbag = newpetbag;
                        }
                        petequipinfo.set(msg.petkey, petbag);
                        console.log(game.modules.bag.models.BagModel.getInstance().bagMap[msg.packid]);
                    };
                    /**
                     * 宠物装备删除
                     */
                    BagProxy.prototype.onPetEquipDelItem = function (optcode, msg) {
                        var bag = game.modules.bag.models.BagModel.getInstance().bagMap[msg.packid];
                        var baginfo = bag.get(msg.petkey);
                        for (var index = 0; index < baginfo.items.length; index++) {
                            var item = baginfo.items[index];
                            if (item.key == msg.itemKey) {
                                baginfo.items.splice(index, 1);
                                break;
                            }
                        }
                        bag.set(msg.petkey, baginfo);
                    };
                    /**
                     * @describe  为了新增物品滑动效果而设 添加道具
                     */
                    BagProxy.prototype.onItemAdded = function (optcode, msg) {
                        if (modules.activity.models.ActivityModel._instance.isShowPingJi) {
                            this.event(models.SHOW_PINGJIITEM_EVENT, msg.items);
                        }
                        var len = msg.items.length;
                        bagModel.getInstance().SlideItem = [];
                        for (var addItemIndex = 0; addItemIndex < len; addItemIndex++) {
                            var itemid = msg.items[addItemIndex].itemid;
                            bagModel.getInstance().SlideItem.push(itemid);
                        }
                        if (bagModel.getInstance().SlideItem.length != 0)
                            this.event(models.ITEM_SLIDE);
                    };
                    /**
                     * @describe  刷新人物评分的消息
                     * @param optcode
                     * @param msg  读取数据的方法
                     */
                    // <enum name="TOTAL_SCORE" value="1" /> 综合评分
                    // <enum name="EQUIP_SCORE" value="2" /> 装备评分
                    // <enum name="MANY_PET_SCORE" value="3" /> 多宠物评分
                    // <enum name="PET_SCORE" value="4" /> 单宠物评分
                    // <enum name="LEVEL_SCORE" value="5" /> 等级评分
                    // <enum name="XIULIAN_SCORE" value="6" /> 修炼评分
                    // <enum name="ROLE_SCORE" value="7" /> 人物评分
                    // <enum name="SKILL_SCORE" value="8" /> 技能评分
                    BagProxy.prototype.onRefreshRoleScore = function (optcode, msg) {
                        // let roleScore: RoleScoreVo = new RoleScoreVo();
                        // // 获取全部的评分
                        // for(let key in msg.datas) {
                        // 	let vaule = msg.datas[key] as number;
                        // 	roleScore.score.set(key,vaule);
                        // }
                        var roleScore = msg.datas.get(7);
                        if (roleScore != null) {
                            models.BagModel.getInstance().roleScore = roleScore;
                        }
                        else if (roleScore == null) {
                            models.BagModel.getInstance().roleScore = 0;
                        }
                        // models.BagProxy.getInstance().event(models.REFRESH_ROLESCORE_EVENT);
                    };
                    /**
                     * @describe  获取背包数据
                     */
                    BagProxy.prototype.onGetDepotInfo = function (optcode, msg) {
                        // // console.log("***************************************获取背包数据",msg)
                        // let bag: BagVo = msg.baginfo as BagVo;
                        // let pageId: number = msg.pageid;
                        // bag.currency = bag.currency as Object;
                        // bag.capacity = bag.capacity as number;
                        // for(let index in bag.items) {
                        // 	bag.items[index] = bag.items[index] as ItemVo;
                        // }
                        // let tempBag:Object = BagModel.getInstance().bagMap[BagTypes.DEPOT];
                        // if (typeof(tempBag) == "undefined") tempBag = {};
                        // tempBag[pageId] = bag;
                        // BagModel.getInstance().bagMap[BagTypes.DEPOT] = tempBag;
                        // console.log("---------------------------------------------BagModel.getInstance().bagMap[BagTypes.DEPOT] = ",BagModel.getInstance().bagMap[BagTypes.DEPOT]);
                        var pageId = msg.pageid;
                        var tempBag = models.BagModel.getInstance().bagMap[BagTypes.DEPOT];
                        if (typeof (tempBag) == "undefined")
                            tempBag = {};
                        tempBag[pageId] = msg.baginfo;
                        var capacity = msg.baginfo.capacity;
                        if (capacity < models.BagModel.getInstance().minDeptNum)
                            return;
                        var depotKey = capacity / 25 - 2;
                        for (var keyNum = 0; keyNum < depotKey; keyNum++) {
                            models.BagModel.getInstance().depotnameinfo.set(keyNum, 25);
                        }
                        models.BagModel.getInstance().bagMap[BagTypes.DEPOT] = tempBag;
                        BagProxy.getInstance().event(models.ACCPET_STOREHOUSE_DATA_EVENT, pageId);
                    };
                    /**
                     * @describe  修改仓库名称
                     */
                    BagProxy.prototype.onModifyDepotName = function (optcode, msg) {
                        var depotId = msg.depotIndex;
                        var modifyName = msg.depotName;
                        var error = msg.errcode;
                        var isPanel = true;
                        models.BagModel.getInstance().depotName.set(depotId - 1, modifyName);
                        BagProxy.getInstance().event(models.DEPOTNAME_EVENT, modifyName);
                        BagProxy.getInstance().event(models.STOREHOUSE_RENAME_EVENT, isPanel);
                        BagProxy.getInstance().event(models.ACCPET_CURRENT_EVENT);
                    };
                    /**
                     * @describe  获取包裹信息（比如获取背包消息）
                     */
                    BagProxy.prototype.onGetPackInfo = function (optcode, msg) {
                        // let packid: number = msg.packid;
                        // let baginfo: BagVo = msg.baginfo as BagVo;
                        // //去读到达BagMap上
                        // baginfo.currency = baginfo.currency as Object;
                        // baginfo.capacity = baginfo.capacity as number;
                        // for(let index in baginfo.items) {
                        // 	baginfo.items[index] = baginfo.items[index] as ItemVo;
                        // }
                        // BagModel.getInstance().bagMap[packid] = baginfo;
                        // if (packid == BagTypes.BAG) {
                        // 	BagProxy.getInstance().event(ARRANGE_BAG);
                        // }
                        var packid = msg.packid;
                        models.BagModel.getInstance().bagMap[msg.packid] = msg.baginfo;
                        if (msg.packid == BagTypes.BAG) {
                            bagModel.getInstance().actBagNum = msg.baginfo.capacity;
                            BagProxy.getInstance().event(models.ARRANGE_BAG, BagTypes.BAG);
                        }
                        else if (msg.packid == BagTypes.QUEST) {
                            BagProxy.getInstance().event(models.ARRANGE_BAG, BagTypes.QUEST);
                        }
                    };
                    /** 添加物品 */
                    BagProxy.prototype.onAddItem = function (optcode, msg) {
                        var packid = msg.packid;
                        var item = msg.data;
                        var bagVo1 = models.BagModel.getInstance().bagMap[1];
                        var bagVo = models.BagModel.getInstance().bagMap[msg.packid];
                        if (packid == BagTypes.BAG) {
                            for (var index = 0; index < item.length; index++) {
                                //道具的key
                                var itemkey = item[index].key;
                                var _lendItemsDic = bagModel.getInstance().lendItemsDic;
                                if (_lendItemsDic.get(itemkey) != undefined) {
                                    bagModel.getInstance().tempBankBag(itemkey, false);
                                    return;
                                }
                                /** 判断当前物品在背包中的数量 */
                                var num = models.BagModel.getInstance().chargeItemNum(item[index].id);
                                /** 判断当前的物品是否能直接使用 */
                                var canDirUse = models.BagModel.getInstance().isCanDirectUse(item[index].id);
                                if (num == 0 && canDirUse) {
                                    models.BagModel.getInstance().addItemUseGuide.set(item[index].id, item[index]);
                                    /** 如果容器中存在指定物品才刷新界面 */
                                    this.event(models.ADDITEM_USE_GUIDE);
                                }
                                models.BagModel.getInstance().bagMap[msg.packid].items.push(item[index]);
                                //当得到这三个物品是开启背包引导且背包界面没有开启,并且传入下一个引导需要的物品id
                                if (item[index].id == 105002 && models.BagModel.getInstance().bagkey)
                                    models.BagProxy.getInstance().event(models.BAG_YINDAO, [126601]);
                                else if (item[index].id == 105003 && models.BagModel.getInstance().bagkey)
                                    models.BagProxy.getInstance().event(models.BAG_YINDAO, [126502]);
                                else if (item[index].id == 105004 && models.BagModel.getInstance().bagkey)
                                    models.BagProxy.getInstance().event(models.BAG_YINDAO, [126618]);
                            }
                            models.BagProxy.getInstance().event(models.REFRESH_BAG_COUNT);
                        }
                        else if (packid == BagTypes.DEPOT) {
                            var currDepot = bagModel.getInstance().currDepotId;
                            if (currDepot == -1)
                                return; //当前所在的仓库Id为-1时返回
                            for (var index = 0; index < item.length; index++) {
                                models.BagModel.getInstance().bagMap[msg.packid][currDepot].items.push(item[index]);
                            }
                        }
                        else if (packid == BagTypes.EQUIP) {
                            for (var index = 0; index < item.length; index++) {
                                models.BagModel.getInstance().bagMap[msg.packid].items.push(item[index]);
                                this.event(models.INSPECT_EQUIP_GEM, item[index]);
                            }
                            this.event(models.INSPECT_EQUIP);
                            models.BagProxy.getInstance().event(models.REFRESH_BAG_COUNT);
                        }
                        else if (packid == BagTypes.MARKET) {
                            for (var index = 0; index < item.length; index++) {
                                models.BagModel.getInstance().bagMap[msg.packid].items.push(item[index]);
                            }
                        }
                        else if (packid == BagTypes.QUEST) {
                            for (var index = 0; index < item.length; index++) {
                                models.BagModel.getInstance().bagMap[msg.packid].items.push(item[index]);
                            }
                        }
                        else if (packid == BagTypes.TEMP) {
                            for (var index = 0; index < item.length; index++) {
                                //道具的key
                                var itemkey = item[index].key;
                                var _lendItemsDic = bagModel.getInstance().lendItemsDic;
                                if (_lendItemsDic.get(itemkey) != undefined) {
                                    bagModel.getInstance().tempBankBag(itemkey, false);
                                    return;
                                }
                                models.BagModel.getInstance().bagMap[msg.packid].items.push(item[index]);
                            }
                            BagProxy.getInstance().event(models.REFRESH_TEMP_BAG, true);
                        }
                        BagProxy.getInstance().event(models.REFRESH_BAG_DEPOT_COUNT);
                        BagProxy.getInstance().event(models.ITEMADD_OR_DEL);
                        for (var i = 0; i < item.length; i++) {
                            var key = item[i].key;
                            console.log("-------请求属性key:", key);
                            RequesterProtocols._instance.c2s_CGetItem_Tips(packid, key);
                        }
                    };
                    /**
                     * @describe  刷新背包（10种，看BagTypes的信息）种的钱币数量
                     */
                    BagProxy.prototype.onRefreshCurrency = function (optcode, msg) {
                        if (msg.packid == BagTypes.BAG) {
                            var flag = false;
                            var gold = msg.currency.get(MoneyTypes.MoneyType_GoldCoin);
                            var silver = msg.currency.get(MoneyTypes.MoneyType_SilverCoin);
                            if (msg.currency.get(MoneyTypes.MoneyType_GoldCoin) != null) {
                                models.BagModel.getInstance().globalIcon = msg.currency.get(MoneyTypes.MoneyType_GoldCoin);
                                flag = true;
                            }
                            if (msg.currency.get(MoneyTypes.MoneyType_SilverCoin) != null) {
                                models.BagModel.getInstance().sliverIcon = msg.currency.get(MoneyTypes.MoneyType_SilverCoin);
                                flag = true;
                            }
                            if (msg.currency.get(MoneyTypes.MoneyType_RongYu) != null) {
                                models.BagModel.getInstance().honnorIcon = msg.currency.get(MoneyTypes.MoneyType_RongYu);
                                flag = true;
                            }
                            if (msg.currency.get(MoneyTypes.MoneyType_FactionContribute) != null) {
                                models.BagModel.getInstance().FactionContribute = msg.currency.get(MoneyTypes.MoneyType_FactionContribute);
                                flag = true;
                            }
                            if (flag) {
                                models.BagProxy.getInstance().event(models.REFRESH_CURRENCY_EVENT);
                            }
                        }
                    };
                    /**
                     * @describe  刷新仓库的大小
                     */
                    BagProxy.prototype.onRefreshPackSize = function (optcode, msg) {
                        var packid = msg.packid;
                        var cap = msg.cap;
                        var depotKey;
                        if (packid == BagTypes.BAG) {
                            if (cap <= models.BagModel.getInstance().minBagNum)
                                return;
                            bagModel.getInstance().actBagNum = cap;
                            models.BagProxy.getInstance().event(models.REFRESH_BAG_COUNT);
                        }
                        else if (packid == BagTypes.DEPOT) {
                            if (cap <= models.BagModel.getInstance().minDeptNum)
                                return;
                            depotKey = cap / 25 - 2;
                            for (var keyNum = 0; keyNum < depotKey; keyNum++) {
                                models.BagModel.getInstance().depotnameinfo.set(keyNum, 25);
                            }
                            /** 此处更改本来是刷新的是接受仓库事件，改为只刷新仓库大小 */
                            models.BagProxy.getInstance().event(models.ACCPET_STOREHOUSE_NUM_EVENT);
                        }
                    };
                    /**
                     *  刷新拥有的元宝数量
                     */
                    BagProxy.prototype.onRefreshFushi = function (optcode, msg) {
                        models.BagModel.getInstance().yuanbaoIcon = msg.bindNum + msg.num;
                        models.BagModel.getInstance().totalnum = msg.totalnum;
                        models.BagProxy.getInstance().event(models.REFRESH_YUANBAO_EVENT);
                    };
                    /**
                     * 坐骑乘骑数据更新
                     */
                    BagProxy.prototype.onSRideUpdate = function (optcode, msg) {
                        console.log("---------------onSRideUpdate- itemkey：", msg.itemkey);
                        console.log("---------------onSRideUpdate- itemid：", msg.itemid);
                        console.log("---------------onSRideUpdate- rideid：", msg.rideid);
                        /** 只取乘骑的id */
                        modules.ModuleManager.hide(modules.ModuleNames.BAG);
                        bagModel.getInstance().currentRideId = msg.itemid;
                        /** 这边应该还有骑乘模型 */
                    };
                    /**
                     * 坐骑乘骑数据更新
                     */
                    BagProxy.prototype.onSAddTitle = function (optcode, msg) {
                        var data = msg.Titleinfo;
                        LoginModel.getInstance().roleDetail.title = data.titleid;
                        LoginModel.getInstance().roleDetail.titles.set(data.titleid, data);
                        //客户端请求佩戴称谓
                        RequesterProtocols._instance.c2s_COnTitle(data.titleid);
                    };
                    /** 人物改名 */
                    BagProxy.prototype.onSModifyRoleName = function (optcode, msg) {
                        var roleId = msg.roleid;
                        var roleName = msg.newName;
                        LoginModel.getInstance().roleDetail.rolename = roleName;
                        this.event(models.CURR_ROLENAME_CHANGE, roleName);
                    };
                    return BagProxy;
                }(hanlder.ProxyBase));
                models.BagProxy = BagProxy;
            })(models = bag_1.models || (bag_1.models = {}));
        })(bag = modules.bag || (modules.bag = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=BagProxy.js.map