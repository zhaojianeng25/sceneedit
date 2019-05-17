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
* tipsSystem
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var tips;
        (function (tips) {
            var tipsModule = /** @class */ (function (_super) {
                __extends(tipsModule, _super);
                /**
                 * @describe tips界面调取
                 * @param tipsType 类型
                 * @param parame 调用参数
                 * @param inshow 显示或者隐藏使用功能 true：隐藏 false：不隐藏
                 * @param isAccess true 存入 false 取出 背包和仓库存储功能
                 */
                function tipsModule(uiLayer, app, tipsType, parame, inshow, isAccess) {
                    var _this = _super.call(this, uiLayer) || this;
                    /**装备表 */
                    _this.equipEffectData = game.modules.strengThening.models.StrengTheningModel._instance.equipEffectData;
                    /** 是否使用按钮 */
                    _this.inshow = false;
                    /** 1 存入 2取出 */
                    _this.Access = 0;
                    _this._viewUI = new ui.common.component.ItemTipsSystemUI();
                    _this.isCenter = false;
                    _this._app = app;
                    _this.show();
                    if (inshow)
                        _this.inshow = true;
                    if (typeof (isAccess) != "undefined" && isAccess)
                        _this.Access = 1;
                    else if (typeof (isAccess) != "undefined" && !isAccess)
                        _this.Access = 2;
                    _this.tipsType(tipsType, parame);
                    tips.models.TipsProxy.getInstance().on(tips.models.CLOSE_TIPS, _this, _this.hide);
                    tips.models.TipsProxy.getInstance().on(tips.models.TIPS_ON_CANCEL, _this, _this.hide);
                    tips.models.TipsProxy.getInstance().on(tips.models.TIPS_ON_OK, _this, _this.hide);
                    return _this;
                }
                /**
                 *
                 * @param tipsType 类型
                 * @param parame 参数：title:tips标题  parame:参数   itemId: 物品id   key：装备在背包中的key
                 */
                tipsModule.prototype.tipsType = function (tipsType, parame) {
                    if (tipsType == TIPS_TYPE.BAG) { //背包
                        this.showBagTips(parame);
                    }
                    else if (tipsType == TIPS_TYPE.QIANGHUA) { //强化
                        this.showItemTips(ITEM_TYPE.QIANGHUA_ITEM, parame);
                    }
                    else if (tipsType == TIPS_TYPE.SKILL) { //技能
                        this.showItemTips(ITEM_TYPE.SKILL_ITEM, parame);
                    }
                    else if (tipsType == TIPS_TYPE.commonItem) { //通用的物品tips
                        this.showItemTips(ITEM_TYPE.REWARD_ITEM, parame);
                    }
                    else if (tipsType == TIPS_TYPE.ACTIVITY) { //活动
                        this.showActivity(parame);
                    }
                    else if (tipsType == TIPS_TYPE.CLIENTMESSAGE) {
                        this.showClientMessage(parame);
                    }
                    else if (tipsType == TIPS_TYPE.HUOBANSKILL) { //伙伴技能
                        this.showHuobanSkill(parame);
                    }
                    else if (tipsType == TIPS_TYPE.CLIENT_TIPS_MESSAGE) { //提示
                        this.showTipsMessage(parame);
                    }
                    else if (tipsType == TIPS_TYPE.PETEQUIP) { //宠物装备
                        this.showpetequipstips(parame);
                    }
                    else if (tipsType == TIPS_TYPE.AUCTION) { //拍卖行tips
                        this.showAuctionTips(parame);
                    }
                };
                /**宠物装备 */
                tipsModule.prototype.showpetequipstips = function (parame) {
                    var itemId = parame.get("itemId");
                    var key = parame.get("key");
                    var packid = parame.get("packid");
                    var equipdType = parame.get("equiptype");
                    var petbag = game.modules.bag.models.BagModel.getInstance().bagMap[9];
                    var _EquipTipsMediator = new game.modules.tips.EquipTipsMediator(this._viewUI, this._app);
                    _EquipTipsMediator.show();
                    _EquipTipsMediator.showpetequip(itemId, key, packid, equipdType, parame);
                };
                /** 显示装备相关的tips */
                tipsModule.prototype.showBagTips = function (parame) {
                    var itemId = parame.get("itemId");
                    var equipdType = parame.get("equiptype");
                    var isWearEqu = parame.get("isWearEqu");
                    if (120000 <= itemId && itemId <= 130099) { /** 物品为装备 */
                        var WearId = this.isWearCurrentEqu(itemId);
                        if (isWearEqu != undefined) {
                            if (isWearEqu == 1) { // 显示身上装备的装备tips 1:人物
                                this.showEquipTips(parame, WearId);
                            }
                        }
                        else {
                            if (WearId > 0) {
                                var whichView = tips.models.TipsModel.getInstance().whichView;
                                var itemType = BagModel.getInstance().getItemTotalType(itemId); //道具的大类型
                                if ((whichView == modules.ModuleNames.PET && itemType == ItemTotalType.PetEquipItem) || (whichView == modules.ModuleNames.BAG && itemType == ItemTotalType.EquipItem)) {
                                    this.showEquipCompareTips(WearId, parame);
                                }
                                else
                                    this.showEquipTips(parame, -1);
                            }
                            else {
                                this.showEquipTips(parame, -1);
                            }
                        }
                    }
                    else { /** 普通物品 */
                        this.showItemTips(ITEM_TYPE.BAG_ITEM, parame);
                    }
                };
                /**拍卖行tips方法 */
                tipsModule.prototype.showAuctionTips = function (parame) {
                    var itemId = parame.get("itemId");
                    var equipdType = parame.get("equiptype");
                    if (120000 <= itemId && itemId <= 130099) { /** 物品为装备 */
                        var _EquipTipsMediator = new game.modules.tips.EquipTipsMediator(this._viewUI, this._app);
                        if (this.inshow)
                            _EquipTipsMediator.show(parame, this.inshow);
                        _EquipTipsMediator.showAuctionItemTips(parame);
                    }
                    else {
                        this.showItemTips(ITEM_TYPE.BAG_ITEM, parame);
                    }
                };
                /**
                 * 客户端提示信息
                 * @param contentId
                 */
                tipsModule.prototype.showClientMessage = function (parame) {
                    this._ClientMessageMediator = new game.modules.tips.ClientMessageMediator(this._viewUI);
                    this._ClientMessageMediator.showContent(parame);
                };
                /**
                 * 是否装备了当前类型的装备(部件id)
                 * @param itemId  当前点击的装备id
                 */
                tipsModule.prototype.isWearCurrentEqu = function (itemId) {
                    var eequiptype = this.equipEffectData[itemId].eequiptype; //选中装备的部件id
                    var bagType;
                    var _itemType = BagModel.getInstance().getItemTotalType(itemId);
                    if (_itemType == ItemTotalType.PetEquipItem && tips.models.TipsModel.getInstance().whichView != modules.ModuleNames.PET) {
                        return -1;
                    }
                    if (_itemType == ItemTotalType.PetEquipItem) { //是宠物装备
                        bagType = BagTypes.PETEQUIP;
                    }
                    else { //是人物角色身上的装备
                        bagType = BagTypes.EQUIP;
                    }
                    var bag3 = bagModel.getInstance().bagMap[bagType]; //获取背包3
                    var items;
                    if (bagType == BagTypes.PETEQUIP) {
                        if (bag3.keys.length != 0) { //若有宠物装备背包的数据
                            var petKey = PetModel.getInstance().petbasedata.key;
                            items = bag3.get(petKey).items;
                        }
                    }
                    else {
                        items = bag3.items;
                    }
                    for (var i = 0; i < items.length; i++) {
                        var id = items[i].id;
                        if (eequiptype == this.equipEffectData[id].eequiptype) {
                            return id;
                        }
                    }
                    return -1;
                };
                /**
                 * 显示物品详情tips界面
                 * @param itemId 物品id
                 */
                tipsModule.prototype.showItemTips = function (itemType, parame) {
                    var itemId = parame.get("itemId");
                    /** 类型用途 */
                    var purposetype = parame.get("purposetype");
                    this._ItemDetailsTipsMediator = new game.modules.tips.ItemDetailsTipsMediator(this._viewUI, this._app);
                    if (this.inshow && this.Access != 0)
                        this._ItemDetailsTipsMediator.show(parame, this.inshow, this.Access);
                    else if (this.inshow)
                        this._ItemDetailsTipsMediator.show(parame, this.inshow);
                    /** 临时背包转移 */
                    else if (purposetype != null && purposetype == ItemPurpose.ITEM_TRANSFER)
                        this._ItemDetailsTipsMediator.show(parame);
                    else
                        this._ItemDetailsTipsMediator.show();
                    if (itemType == ITEM_TYPE.BAG_ITEM) { //背包
                        this._ItemDetailsTipsMediator.showItemTips(parame);
                    }
                    else if (itemType == ITEM_TYPE.QIANGHUA_ITEM) { //强化
                        this._ItemDetailsTipsMediator.showQianghuaTips(itemId);
                    }
                    else if (itemType == ITEM_TYPE.SKILL_ITEM) { //技能
                        this._ItemDetailsTipsMediator.showSkillTips(itemId);
                    }
                    else if (itemType == ITEM_TYPE.REWARD_ITEM) { //奖励
                        this._ItemDetailsTipsMediator.showCommonItemTips(itemId, parame);
                    }
                };
                /**
                 * 显示装备比较界面
                 * @param equipId 背包中装备id
                 * @param WearId  装备在身上的装备id
                 */
                tipsModule.prototype.showEquipCompareTips = function (WearId, parame) {
                    /** 类型用途 */
                    var purposetype = parame.get("purposetype");
                    var _EquipCompareTipsMediator = new game.modules.tips.EquipCompareTipsMediator(this._viewUI, this._app);
                    if (this.inshow && this.Access != 0)
                        _EquipCompareTipsMediator.show(parame, this.inshow, this.Access);
                    else if (this.inshow)
                        _EquipCompareTipsMediator.show(parame, this.inshow);
                    /** 临时背包转移 */
                    else if (purposetype != null && purposetype == ItemPurpose.ITEM_TRANSFER)
                        _EquipCompareTipsMediator.show(parame);
                    else
                        _EquipCompareTipsMediator.show();
                    _EquipCompareTipsMediator.showBagEquipTips(WearId, this._app, parame);
                };
                /**活动 */
                tipsModule.prototype.showActivity = function (param) {
                    var activityId = param.get("itemId");
                    this._ActivityTipsMediator = new game.modules.tips.ActivityTipsMediator(this._viewUI);
                    this._ActivityTipsMediator.show();
                    this._ActivityTipsMediator.showActivity(activityId);
                };
                tipsModule.prototype.showEquipTips = function (parame, WearId) {
                    /** 类型用途 */
                    var purposetype = parame.get("purposetype");
                    var _EquipTipsMediator = new game.modules.tips.EquipTipsMediator(this._viewUI, this._app);
                    if (this.inshow && this.Access != 0)
                        _EquipTipsMediator.show(parame, this.inshow, this.Access);
                    else if (this.inshow)
                        _EquipTipsMediator.show(parame, this.inshow);
                    /** 临时背包转移 */
                    else if (purposetype != null && purposetype == ItemPurpose.ITEM_TRANSFER)
                        _EquipTipsMediator.show(parame);
                    else
                        _EquipTipsMediator.show();
                    _EquipTipsMediator.showItemTips(parame, WearId);
                };
                /**
                 * 伙伴技能
                 * @param skillId
                 */
                tipsModule.prototype.showHuobanSkill = function (param) {
                    var skillId = param.get("itemId");
                    this._SkillDescribeMediator = new game.modules.tips.SkillDescribeMediator(this._viewUI);
                    this._SkillDescribeMediator.show();
                    this._SkillDescribeMediator.showSkillDescribe(skillId);
                };
                /**
                 * 弹出窗类型的tips
                 * @param param
                 */
                tipsModule.prototype.showTipsMessage = function (param) {
                    this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
                    this._TipsMessageMediator.show();
                    this._TipsMessageMediator.showContent(param);
                    /** 倒计时 */
                    this._TipsMessageMediator.counTime(30);
                };
                tipsModule.prototype.onThisView = function () {
                    if (this._viewUI.visible) {
                        this.hide();
                    }
                };
                tipsModule.prototype.onShow = function (event) {
                    this.show();
                    this._app.uiRoot.closeLoadProgress();
                };
                tipsModule.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                tipsModule.prototype.getView = function () {
                    return this._viewUI;
                };
                return tipsModule;
            }(game.modules.UiMediator));
            tips.tipsModule = tipsModule;
        })(tips = modules.tips || (modules.tips = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=tipsModule.js.map