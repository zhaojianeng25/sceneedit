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
        var tips;
        (function (tips_1) {
            /** 装备重铸 */
            var EquipRecastMediator = /** @class */ (function (_super) {
                __extends(EquipRecastMediator, _super);
                function EquipRecastMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    /**重铸的装备id */
                    _this.chongzhuArr = [];
                    /**拥有的装备 */
                    _this.haveEquipArr = [];
                    /**复合表 */
                    _this.itemAttrData = BagModel.getInstance().itemAttrData;
                    /**装备洗练表 */
                    _this.equipRefineInfoData = game.modules.tips.models.TipsModel._instance.equipRefineInfoData;
                    /**属性效果id表 */
                    _this.attributeDesConfigData = StrengTheningModel.getInstance().attributeDesConfigData;
                    /**装备附加属性库 */
                    _this.equipAddattributelibData = StrengTheningModel.getInstance().equipAddattributelibData;
                    /**装备附加属性库by skill */
                    _this.equipAddattributelibDataBySkill = StrengTheningModel.getInstance().equipAddattributelibDataBySkill;
                    /**程序内字符串表 */
                    _this.cstringResConfigData = game.modules.tips.models.TipsModel._instance.cstringResConfigData;
                    /**显示装备的属性 */
                    _this.attrArr = [];
                    /** 洗练所需要的物品id */
                    _this.itemId = 0;
                    /** 钱币补足所需的数量 */
                    _this.needYinBi = 0;
                    _this.needJinBi = 0;
                    _this.needYuanBao = 0;
                    _this._viewUI = new ui.common.component.EquipWashPractiseUI();
                    _this.isCenter = true;
                    _this._app = app;
                    _this._yinBiTips = new modules.commonUI.JinBiBuZuViewMediator(_this._viewUI, _this._app);
                    _this._remindViewMediator = modules.commonUI.RemindViewMediator.getInstance(_this._viewUI, _this._app);
                    _this._yinBiTips.on(modules.commonUI.USE_GOLD_EXCHANGE_EVENT, _this, _this.jinbijiesuo);
                    _this._yinBiTips.on(modules.commonUI.USE_SILVER_EXCHANGE_EVENT, _this, _this.yuanbaojiesuo);
                    _this._yinBiTips.on(modules.commonUI.USE_YUANBAO_EXCHANGE_EVENT, _this, _this.jinbibuzu);
                    _this.init();
                    return _this;
                }
                /**初始化数据 */
                EquipRecastMediator.prototype.init = function () {
                    this.initChongzhu();
                    this.showSilverNumber();
                    this._viewUI.saveBox.visible = false;
                    this._viewUI.title_lab.text = this.cstringResConfigData[11778].msg;
                    this.initEvent();
                    this.initBtn();
                };
                /**按钮点击事件 */
                EquipRecastMediator.prototype.initBtn = function () {
                    this._viewUI.ok_btn.on(LEvent.MOUSE_DOWN, this, this.onOkBtn);
                    this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.onCloseBtn);
                };
                /**事件接收 */
                EquipRecastMediator.prototype.initEvent = function () {
                    game.modules.createrole.models.LoginProxy.getInstance().on(game.modules.createrole.models.GetItemTips_EVENT, this, this.flushAttr);
                    game.modules.bag.models.BagProxy.getInstance().on(game.modules.bag.models.REFRESH_CURRENCY_EVENT, this, this.flush);
                };
                /**数据刷新 */
                EquipRecastMediator.prototype.flush = function () {
                    this.showSilverNumber();
                    this.flushCailiao();
                };
                /**刷新材料 */
                EquipRecastMediator.prototype.flushCailiao = function () {
                    var index = this._viewUI.equip_list.selectedIndex;
                    if (index < 0) {
                        index = 0;
                    }
                    ;
                    this.equiplistSelect(index);
                };
                /**刷新属性 */
                EquipRecastMediator.prototype.flushAttr = function () {
                    var index = this._viewUI.equip_list.selectedIndex;
                    if (index < 0) {
                        index = 0;
                    }
                    this.showAttr(index);
                };
                /**初始化装备列表 */
                EquipRecastMediator.prototype.initEquipList = function () {
                    /**装备属性tips */
                    var equipTips = StrengTheningModel.getInstance().equipTips;
                    for (var i = 0; i < this.chongzhuArr.length; i++) {
                        var equipId = this.chongzhuArr[i].id;
                        var name = this.itemAttrData[equipId].name;
                        var nquality = this.itemAttrData[equipId].nquality;
                        var iconid = this.itemAttrData[equipId].icon;
                        var itemIcon = SaleModel.getInstance().getIcon(iconid); //icon
                        var itemnquality = StrengTheningModel._instance.frameSkinArr[nquality - 1];
                        var level = this.itemAttrData[equipId].level + this.cstringResConfigData[3].msg;
                        this.haveEquipArr.push({ name_lab: name, level_lab: level, frame_img: itemnquality, icon_img: itemIcon });
                    }
                    SaleModel.getInstance().showList(this._viewUI.equip_list, this.haveEquipArr);
                    this._viewUI.equip_list.renderHandler = new Handler(this, this.equiplistRender);
                    this._viewUI.equip_list.selectHandler = new Handler(this, this.equiplistSelect);
                };
                /** 装备列表的渲染 */
                EquipRecastMediator.prototype.equiplistRender = function (cell, index) {
                    var bgDiTu_img = cell.getChildByName("bgDiTu_img");
                    bgDiTu_img.skin = "common/ui/tongyong/common_list_3textbg.png";
                    if (this.selectedDiTu) {
                        this.selectedDiTu.skin = "common/ui/tongyong/common_list_3textbg2.png";
                    }
                };
                /**选择装备 */
                EquipRecastMediator.prototype.equiplistSelect = function (index) {
                    var _bgDiTu_img = this._viewUI.equip_list.getCell(index).getChildByName("bgDiTu_img");
                    _bgDiTu_img.skin = "common/ui/tongyong/common_list_3textbg2.png";
                    this.selectedDiTu = _bgDiTu_img;
                    if (this.chongzhuArr.length == 0)
                        return;
                    this.itemId = this.chongzhuArr[index].id;
                    var id = this.chongzhuArr[index].id;
                    var nquality = this.itemAttrData[id].nquality;
                    var iconid = this.itemAttrData[id].icon;
                    var itemIcon = SaleModel.getInstance().getIcon(iconid); //icon
                    var itemnquality = StrengTheningModel._instance.frameSkinArr[nquality - 1];
                    this._viewUI.equipFrame_img.skin = itemnquality;
                    this._viewUI.equipIcon_img.skin = itemIcon;
                    if (this.equipRefineInfoData[id] == null) {
                        this._viewUI.ok_btn.visible = false;
                        return;
                    }
                    else {
                        this._viewUI.ok_btn.visible = true;
                    }
                    var allcailiaoid = this.equipRefineInfoData[id].allcailiaoid; //洗练材料id
                    var allcailiaonum = this.equipRefineInfoData[id].allcailiaonum; //消耗材料数量
                    var allmoneytype = this.equipRefineInfoData[id].allmoneytype; //货币类型
                    var allmoneynum = this.equipRefineInfoData[id].allmoneynum; //消耗货币数量
                    var cailiaoIconid = this.itemAttrData[allcailiaoid].icon;
                    var cailiaoqualityid = this.itemAttrData[allcailiaoid].nquality;
                    var cailiaoIcon = SaleModel.getInstance().getIcon(cailiaoIconid); //icon
                    var cailiaoquality = StrengTheningModel._instance.frameSkinArr[cailiaoqualityid - 1];
                    this._viewUI.itemFrame_img.skin = cailiaoquality;
                    this._viewUI.itemIcon_img.skin = cailiaoIcon;
                    this._viewUI.itemIcon_img.on(LEvent.CLICK, this, this.showItemTips, [allcailiaoid]);
                    this._viewUI.needMoney_label.text = allmoneynum;
                    if (allmoneytype == 1) {
                        this._viewUI.needMeoneyIcon_img.skin = "common/ui/tongyong/common_yinb.png";
                        this._viewUI.haveMeoneyIcon_img.skin = "common/ui/tongyong/common_yinb.png";
                    }
                    else if (allmoneytype == 2) {
                        this._viewUI.needMeoneyIcon_img.skin = "common/ui/tongyong/common_jinb.png";
                        this._viewUI.haveMeoneyIcon_img.skin = "common/ui/tongyong/common_jinb.png";
                    }
                    this.showAttr(index);
                    this.showCailiaoNum(allcailiaonum, allcailiaoid);
                };
                /** 显示重铸所需消耗的材料信息tips */
                EquipRecastMediator.prototype.showItemTips = function (itemid) {
                    var parame = new Laya.Dictionary();
                    parame.set("itemId", itemid);
                    var _tipsModule = new tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.commonItem, parame);
                };
                /**
                 * 显示属性
                 */
                EquipRecastMediator.prototype.showAttr = function (index) {
                    var equipTips = StrengTheningModel.getInstance().equipTips;
                    var packid = this.chongzhuArr[index].packid;
                    var key = this.chongzhuArr[index].key;
                    this.attrArr = [];
                    for (var i = 0; i < equipTips.length; i++) {
                        var tipsKey = equipTips[i].keyinpack;
                        var tipsPackid = equipTips[i].packid;
                        if (tipsKey == key && tipsPackid == packid) { //获取装备属性
                            var tips = equipTips[i].tips;
                            var baseAttr = tips.baseAttr; //基础属性
                            var addAttr = tips.addAttr; //附加属性
                            var effect = tips.effect; //特效
                            var skill = tips.skill; //特技
                            if (baseAttr != null) {
                                var baseAttrKeys = baseAttr.keys;
                                for (var j = 0; j < baseAttrKeys.length; j++) {
                                    var baseAttrId = baseAttrKeys[j];
                                    var baseAttrValue = baseAttr.get(baseAttrId);
                                    var numpositivedes = this.attributeDesConfigData[baseAttrId].numpositivedes; //属性描述
                                    var attrDesc = numpositivedes.replace("$parameters$", baseAttrValue);
                                    this.attrArr.push({ attr_lab: attrDesc, color: "#391104" });
                                }
                            }
                            if (addAttr != null) {
                                var addAttrKeys = addAttr.keys;
                                for (var k = 0; k < addAttrKeys.length; k++) {
                                    var addAttrId = addAttrKeys[k];
                                    var addAttrValue = addAttr.get(addAttrId);
                                    var name = this.equipAddattributelibData[addAttrId].name;
                                    var addAttrDesc = name + addAttrValue;
                                    var color = this.equipAddattributelibData[addAttrId].namecolour;
                                    this.attrArr.push({ attr_lab: addAttrDesc, color: color });
                                }
                            }
                            if (skill != 0) {
                                var name = this.equipAddattributelibDataBySkill[skill].name;
                                var color = this.equipAddattributelibDataBySkill[skill].namecolour;
                                this.attrArr.push({ attr_lab: "" + this.cstringResConfigData[11002].msg + "  " + name, color: color });
                            }
                            if (effect != 0) {
                                var name = this.equipAddattributelibDataBySkill[effect].name;
                                var color = this.equipAddattributelibDataBySkill[skill].namecolour;
                                this.attrArr.push({ attr_lab: "" + this.cstringResConfigData[11003].msg + "  " + name, color: color });
                            }
                        }
                    }
                    SaleModel._instance.showList(this._viewUI.attr_list, this.attrArr);
                };
                /**属性列表渲染 */
                EquipRecastMediator.prototype.attrlistRender = function (cell, index) {
                    var label = cell.getChildByName("attr_lab");
                    if (this.attrArr[index].color != null) {
                        label.color = this.attrArr[index].color;
                    }
                };
                /**
                 * 使用按钮
                 */
                EquipRecastMediator.prototype.onOkBtn = function () {
                    var allcailiaoid = this.equipRefineInfoData[this.itemId].allcailiaoid; //洗练材料id
                    var allcailiaonum = this.equipRefineInfoData[this.itemId].allcailiaonum; //消耗材料数量
                    var allmoneynum = this.equipRefineInfoData[this.itemId].allmoneynum; //消耗货币数量
                    var bag = BagModel.getInstance().getBagGameItemData(BagTypes.BAG);
                    var isHave = false;
                    for (var i = 0; i < bag.items.length; i++) {
                        if (bag.items[i].id == allcailiaoid && bag.items[i].number >= allcailiaonum) {
                            isHave = true;
                            continue;
                        }
                    }
                    if (!isHave) {
                        var param = [this.itemAttrData[allcailiaoid].name];
                        var msg = game.modules.mainhud.models.HudModel.getInstance().promptAssembleBack(PromptExplain.LACK_OF_MATERIAL, param);
                        game.modules.chat.models.ChatProxy.getInstance().event(game.modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS, msg);
                        return;
                    }
                    var sliver = BagModel.getInstance().sliverIcon;
                    if (sliver < allmoneynum) {
                        this.needYinBi = allmoneynum - sliver;
                        this.needJinBi = Math.ceil(this.needYinBi / 100);
                        this.needYuanBao = Math.ceil(this.needYinBi / 10000);
                        this._yinBiTips.onShow(false, this.needYinBi + "", this.needYuanBao + "", this.needJinBi + "");
                        return;
                    }
                    this.refineEquip();
                };
                /** 重铸达成条件发送请求 */
                EquipRecastMediator.prototype.refineEquip = function () {
                    var index = this._viewUI.equip_list.selectedIndex;
                    if (index < 0) {
                        index = 0;
                    }
                    var packid = this.chongzhuArr[index].packid;
                    var key = this.chongzhuArr[index].key;
                    RequesterProtocols._instance.c2s_CRefineEquip_All(packid, key);
                };
                /** 金币兑换银币 */
                EquipRecastMediator.prototype.jinbijiesuo = function () {
                    this._yinBiTips.hide();
                    var hadJinBi = game.modules.mainhud.models.HudModel.getInstance().goldNum;
                    if (this.needJinBi < hadJinBi) {
                        RequesterProtocols._instance.c2s_exchange_currency(MoneyTypes.MoneyType_GoldCoin, MoneyTypes.MoneyType_SilverCoin, this.needJinBi);
                        this.refineEquip();
                    }
                    else {
                        this._yinBiTips.onShow(true, this.needJinBi - hadJinBi + "", Math.ceil((this.needJinBi - hadJinBi) / 100) + "");
                        this._yinBiTips.once(modules.commonUI.USE_YUANBAO_EXCHANGE_EVENT, this, this.jinbibuzu, [Math.ceil((this.needJinBi - hadJinBi) / 100)]);
                    }
                };
                /** 元宝兑换银币 */
                EquipRecastMediator.prototype.yuanbaojiesuo = function () {
                    this._yinBiTips.hide();
                    if (this.needYuanBao < game.modules.mainhud.models.HudModel.getInstance().fuShiNum) {
                        RequesterProtocols._instance.c2s_exchange_currency(MoneyTypes.MoneyType_HearthStone, MoneyTypes.MoneyType_SilverCoin, this.needYuanBao);
                        this.refineEquip();
                    }
                    else {
                        var prompto = HudModel.getInstance().promptAssembleBack(PromptExplain.CHARGE_TIPS);
                        this._remindViewMediator.onShow(prompto, "确定");
                        this._remindViewMediator.once(modules.commonUI.RIGHT_BUTTON_EVENT, this, this.jumpToCharge);
                        this._remindViewMediator.once(modules.commonUI.LEFT_BUTTON_EVENT, this, this.cancleToJump);
                    }
                };
                /** 元宝兑换金币 */
                EquipRecastMediator.prototype.jinbibuzu = function () {
                    this._yinBiTips.hide();
                    if (this.needYuanBao < game.modules.mainhud.models.HudModel.getInstance().fuShiNum) {
                        RequesterProtocols._instance.c2s_exchange_currency(MoneyTypes.MoneyType_HearthStone, MoneyTypes.MoneyType_GoldCoin, this.needYuanBao);
                        RequesterProtocols._instance.c2s_exchange_currency(MoneyTypes.MoneyType_GoldCoin, MoneyTypes.MoneyType_SilverCoin, this.needJinBi);
                        this.refineEquip();
                    }
                    else {
                        var prompto = HudModel.getInstance().promptAssembleBack(PromptExplain.CHARGE_TIPS);
                        this._remindViewMediator.onShow(prompto, "确定");
                        this._remindViewMediator.once(modules.commonUI.RIGHT_BUTTON_EVENT, this, this.jumpToCharge);
                        this._remindViewMediator.once(modules.commonUI.LEFT_BUTTON_EVENT, this, this.cancleToJump);
                    }
                };
                /** 元宝补足跳转至充值界面 */
                EquipRecastMediator.prototype.jumpToCharge = function () {
                    this._remindViewMediator.off(modules.commonUI.LEFT_BUTTON_EVENT, this, this.cancleToJump);
                    this.hide();
                    modules.ModuleManager.hide(modules.ModuleNames.BAG);
                    modules.ModuleManager.jumpPage(modules.ModuleNames.SHOP, shopMediatorType.CHONGZHI, this._app);
                };
                /** 元宝补足界面取消按钮监听 */
                EquipRecastMediator.prototype.cancleToJump = function () {
                    this._remindViewMediator.off(modules.commonUI.RIGHT_BUTTON_EVENT, this, this.jumpToCharge);
                    this._remindViewMediator.hide();
                };
                /**
                 * 重铸的装备
                 */
                EquipRecastMediator.prototype.initChongzhu = function () {
                    var bagTyps1 = BagTypes.BAG;
                    var bagTyps2 = BagTypes.EQUIP;
                    this.getxilianid(bagTyps1);
                    this.getxilianid(bagTyps2);
                };
                /**获取装备id */
                EquipRecastMediator.prototype.getxilianid = function (bagTyps) {
                    var bag = BagModel.getInstance().getBagGameItemData(bagTyps);
                    var items = bag.items;
                    for (var i = 0; i < items.length; i++) {
                        var id = items[i].id;
                        var key = items[i].key;
                        var nquality = this.itemAttrData[id].nquality;
                        if (120000 <= id && id <= 126675 || 140000 <= id && id <= 140005 || 10000 <= id && id <= 10009) { //获取背包中所有的装备
                            if (nquality >= 4) { //装备的品质大于4才能重铸
                                if (bagTyps == BagTypes.BAG) {
                                    this.chongzhuArr.push({ id: id, packid: BagTypes.BAG, key: key });
                                }
                                else if (bagTyps == BagTypes.EQUIP) {
                                    this.chongzhuArr.push({ id: id, packid: BagTypes.EQUIP, key: key });
                                }
                            }
                        }
                    }
                };
                /**
                 * 显示拥有的钱
                 */
                EquipRecastMediator.prototype.showSilverNumber = function () {
                    var str;
                    var score = BagModel.getInstance().sliverIcon;
                    if (!isNaN(score)) {
                        str = game.utils.MoneyU.number2Thousands(score);
                    }
                    else {
                        str = "0";
                    }
                    this._viewUI.havaMoney_lab.text = str;
                    this._viewUI.needMeoneyIcon_img.skin = "common/ui/tongyong/common_yinb.png";
                    this._viewUI.haveMeoneyIcon_img.skin = "common/ui/tongyong/common_yinb.png";
                };
                /**
                * 材料数量
                */
                EquipRecastMediator.prototype.getCailiaoNum = function (cailiaoId) {
                    var allNum = 0;
                    var bagitems = bagModel.getInstance().bagMap[BagTypes.BAG].items;
                    for (var i = 0; i < bagitems.length; i++) {
                        var id = bagitems[i].id;
                        if (id == cailiaoId) {
                            allNum += bagitems[i].number;
                        }
                    }
                    return allNum;
                };
                /**显示材料数量 */
                EquipRecastMediator.prototype.showCailiaoNum = function (needcailiaoNum, cailiaoid) {
                    var num = this.getCailiaoNum(cailiaoid);
                    tipsModel._instance.showNeedNum(needcailiaoNum, num, this._viewUI.num_label, false);
                };
                EquipRecastMediator.prototype.onCloseBtn = function () {
                    this.hide();
                };
                /** 供其它地方显示装备洗炼界面提供接口
                 * @param equipId 装备id
                 * @param equipKey 装备key
                 */
                EquipRecastMediator.prototype.onShow = function (equipId, equipKey) {
                    this.show();
                    var equipPos = 0;
                    for (var i = 0; i < this.chongzhuArr.length; i++) {
                        var _equipId = this.chongzhuArr[i]["id"];
                        var _equipKey = this.chongzhuArr[i]["key"];
                        if (_equipId == equipId && _equipKey == equipKey) {
                            equipPos = i;
                            break;
                        }
                    }
                    this.initEquipList();
                    this.equiplistSelect(equipPos);
                    this._viewUI.equip_list.scrollTo(equipPos);
                };
                EquipRecastMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                };
                EquipRecastMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    if (LoginModel.getInstance().CommonPage != "") {
                        modules.ModuleManager.show(LoginModel.getInstance().CommonPage, this._app);
                        LoginModel.getInstance().CommonPage = "";
                    }
                    if (this.selectedDiTu) {
                        this.selectedDiTu.skin = "common/ui/tongyong/common_list_3textbg.png";
                    }
                };
                EquipRecastMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return EquipRecastMediator;
            }(game.modules.UiMediator));
            tips_1.EquipRecastMediator = EquipRecastMediator;
        })(tips = modules.tips || (modules.tips = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=EquipRecastMediator.js.map