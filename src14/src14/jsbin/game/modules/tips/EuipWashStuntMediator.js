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
* 洗特技
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var tips;
        (function (tips_1) {
            var EuipWashStuntMediator = /** @class */ (function (_super) {
                __extends(EuipWashStuntMediator, _super);
                function EuipWashStuntMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    /**特技装备id */
                    _this.tejiArr = [];
                    /**拥有装备 */
                    _this.haveEquipArr = [];
                    /**复合表 */
                    _this.itemAttrData = BagModel.getInstance().itemAttrData;
                    /**装备洗特技表 */
                    _this.equipRefineSkillInfoData = game.modules.tips.models.TipsModel._instance.equipRefineSkillInfoData;
                    /**属性效果id表 */
                    _this.attributeDesConfigData = StrengTheningModel.getInstance().attributeDesConfigData;
                    /**装备附加属性库 */
                    _this.equipAddattributelibData = StrengTheningModel.getInstance().equipAddattributelibData;
                    /**装备附加属性库by skill */
                    _this.equipAddattributelibDataBySkill = StrengTheningModel.getInstance().equipAddattributelibDataBySkill;
                    /**装备表 */
                    _this.equipEffectData = game.modules.strengThening.models.StrengTheningModel._instance.equipEffectData;
                    /**程序内字符串表 */
                    _this.cstringResConfigData = game.modules.tips.models.TipsModel._instance.cstringResConfigData;
                    /**洗特技使用的钱 */
                    _this.useMoneyNum = -1;
                    /**洗特技的物品id */
                    _this.specialitemid = null;
                    /**洗特技的物品数量 */
                    _this.specialitemNum = null;
                    /** 洗特技的物品名字*/
                    _this.specialitemName = [];
                    /**装备属性 */
                    _this.attrArr = [];
                    /**材料数量 */
                    _this.cailiaoNumArr = new Dictionary;
                    _this._viewUI = new ui.common.component.EquipWashPractiseUI();
                    _this.isCenter = true;
                    _this._app = app;
                    _this.init();
                    return _this;
                }
                /**初始化 */
                EuipWashStuntMediator.prototype.init = function () {
                    this.initTeJiEquip();
                    this.initEquipList();
                    this.equiplistSelect(0);
                    this.showSilverNumber();
                    this._viewUI.saveBox.visible = false;
                    this._viewUI.title_lab.text = tipsModel.stringType.xiteji;
                    this.initBtn();
                    this.initEvent();
                };
                /**按钮事件 */
                EuipWashStuntMediator.prototype.initBtn = function () {
                    this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.onCloseBtn);
                    this._viewUI.ok_btn.on(LEvent.MOUSE_DOWN, this, this.onOkBtn);
                };
                /**事件接收 */
                EuipWashStuntMediator.prototype.initEvent = function () {
                    game.modules.createrole.models.LoginProxy.getInstance().on(game.modules.createrole.models.GetItemTips_EVENT, this, this.flushAttr);
                    game.modules.bag.models.BagProxy.getInstance().on(game.modules.bag.models.REFRESH_CURRENCY_EVENT, this, this.flush);
                };
                /**刷新数据 */
                EuipWashStuntMediator.prototype.flush = function () {
                    this.flushCailiao();
                    this.showSilverNumber();
                };
                /**刷新材料 */
                EuipWashStuntMediator.prototype.flushCailiao = function () {
                    var index = this._viewUI.equip_list.selectedIndex;
                    if (index < 0) {
                        index = 0;
                    }
                    this.equiplistSelect(index);
                };
                /**刷新属性 */
                EuipWashStuntMediator.prototype.flushAttr = function () {
                    var index = this._viewUI.equip_list.selectedIndex;
                    if (index < 0) {
                        index = 0;
                    }
                    this.showAttr(index);
                };
                /**c初始化装备列表 */
                EuipWashStuntMediator.prototype.initEquipList = function () {
                    /**装备属性tips */
                    var equipTips = StrengTheningModel.getInstance().equipTips;
                    for (var i = 0; i < this.tejiArr.length; i++) {
                        var equipId = this.tejiArr[i].id;
                        var name = this.itemAttrData[equipId].name;
                        var nquality = this.itemAttrData[equipId].nquality;
                        var iconid = this.itemAttrData[equipId].icon;
                        var itemIcon = SaleModel.getInstance().getIcon(iconid); //icon
                        var itemnquality = StrengTheningModel._instance.frameSkinArr[nquality - 1];
                        var level = this.itemAttrData[equipId].level + "级";
                        this.haveEquipArr.push({ name_lab: name, level_lab: level, frame_img: itemnquality, icon_img: itemIcon });
                    }
                    SaleModel.getInstance().showList(this._viewUI.equip_list, this.haveEquipArr);
                    this._viewUI.equip_list.selectHandler = new Handler(this, this.equiplistSelect);
                };
                /**装备选择 */
                EuipWashStuntMediator.prototype.equiplistSelect = function (index) {
                    if (this.tejiArr.length == 0)
                        return;
                    var id = this.tejiArr[index].id;
                    var nquality = this.itemAttrData[id].nquality;
                    var iconid = this.itemAttrData[id].icon;
                    var itemIcon = SaleModel.getInstance().getIcon(iconid); //icon
                    var itemnquality = StrengTheningModel._instance.frameSkinArr[nquality - 1];
                    this._viewUI.equipFrame_img.skin = itemnquality;
                    this._viewUI.equipIcon_img.skin = itemIcon;
                    var eequiptype = this.equipEffectData[id].eequiptype; //选中装备的部件id
                    var xilianId = eequiptype + "_" + nquality;
                    var cailiaoid = this.equipRefineSkillInfoData[xilianId].cailiaoid; //洗练材料id            // 101453
                    var allcailiaonum = this.equipRefineSkillInfoData[xilianId].cailiaonum; //消耗材料数量
                    this.specialitemid = cailiaoid; //洗练材料id
                    this.specialitemNum = allcailiaonum; //洗练材料数量
                    var allmoneytype = this.equipRefineSkillInfoData[xilianId].moneytype; //货币类型
                    var allmoneynum = this.equipRefineSkillInfoData[xilianId].moneynum; //消耗货币数量
                    this.useMoneyNum = allmoneynum;
                    var cailiaoIconid = this.itemAttrData[cailiaoid].icon;
                    var cailiaoqualityid = this.itemAttrData[cailiaoid].nquality;
                    var specialitemName = this.itemAttrData[cailiaoid].name; //洗练的物品名字
                    this.specialitemName.push(specialitemName); //放到数组里面
                    var cailiaoIcon = SaleModel.getInstance().getIcon(cailiaoIconid); //icon
                    var cailiaoquality = StrengTheningModel._instance.frameSkinArr[cailiaoqualityid - 1];
                    this._viewUI.itemFrame_img.skin = cailiaoquality;
                    this._viewUI.itemIcon_img.skin = cailiaoIcon;
                    var str = game.utils.MoneyU.number2Thousands(allmoneynum);
                    this._viewUI.needMoney_label.text = str;
                    if (allmoneytype == 1) {
                        this._viewUI.needMeoneyIcon_img.skin = "common/ui/tongyong/common_yinb.png";
                        this._viewUI.haveMeoneyIcon_img.skin = "common/ui/tongyong/common_yinb.png";
                    }
                    else if (allmoneytype == 2) {
                        this._viewUI.needMeoneyIcon_img.skin = "common/ui/tongyong/common_jinb.png";
                        this._viewUI.haveMeoneyIcon_img.skin = "common/ui/tongyong/common_jinb.png";
                    }
                    this.showAttr(index);
                    this.showCailiaoNum(allcailiaonum, cailiaoid);
                };
                /**
                 * 显示属性
                 */
                EuipWashStuntMediator.prototype.showAttr = function (index) {
                    var equipTips = StrengTheningModel.getInstance().equipTips;
                    var packid = this.tejiArr[index].packid;
                    var key = this.tejiArr[index].key;
                    this.attrArr = [];
                    for (var i = 0; i < equipTips.length; i++) {
                        var tipsKey = equipTips[i].keyinpack;
                        var tipsPackid = equipTips[i].packid;
                        if (tipsKey == key && tipsPackid == packid) {
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
                /**列表渲染 */
                EuipWashStuntMediator.prototype.attrlistRender = function (cell, index) {
                    var label = cell.getChildByName("attr_lab");
                    if (this.attrArr[index].color != null) {
                        label.color = this.attrArr[index].color;
                    }
                };
                /**
                 * 使用按钮
                 */
                EuipWashStuntMediator.prototype.onOkBtn = function () {
                    var str;
                    var itemid = game.modules.bag.models.BagModel._instance.chargeItemNum(this.specialitemid);
                    if (itemid != 0) { //有洗练的装备
                        if (this.useMoneyNum != -1) {
                            var score = BagModel.getInstance().sliverIcon;
                            if (score < this.useMoneyNum) {
                                return;
                            }
                        }
                    }
                    else { //没有洗练的装备
                        var prompt_1 = HudModel.getInstance().promptAssembleBack(168004, this.specialitemName);
                        var disappearMsgTips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                        disappearMsgTips.onShow(prompt_1);
                    }
                    var index = this._viewUI.equip_list.selectedIndex;
                    if (index < 0) {
                        index = 0;
                    }
                    var packid = this.tejiArr[index].packid;
                    var key = this.tejiArr[index].key;
                    RequesterProtocols._instance.c2s_CRefineEquip_Skill(packid, key);
                };
                /**
                 * 特技的装备
                 */
                EuipWashStuntMediator.prototype.initTeJiEquip = function () {
                    var bagTyps1 = BagTypes.BAG;
                    var bagTyps2 = BagTypes.EQUIP;
                    this.gettejiId(bagTyps1);
                    this.gettejiId(bagTyps2);
                };
                /**获取特技 */
                EuipWashStuntMediator.prototype.gettejiId = function (bagTyps) {
                    var equipTips = StrengTheningModel.getInstance().equipTips;
                    var bag = BagModel.getInstance().getBagGameItemData(bagTyps);
                    var items = bag.items;
                    for (var i = 0; i < items.length; i++) {
                        var id = items[i].id;
                        var key = items[i].key;
                        // var skill = items[i].skill;
                        var nquality = this.itemAttrData[id].nquality;
                        var skill = -1;
                        var packid = -1;
                        if (120000 <= id && id <= 126675 || 140000 <= id && id <= 140005 || 10000 <= id && id <= 10009) { //获取背包中的所有装备装备
                            if (bagTyps == BagTypes.BAG) {
                                packid = 1;
                            }
                            else if (bagTyps == BagTypes.EQUIP) {
                                packid = 3;
                            }
                            for (var k = 0; k < equipTips.length; k++) {
                                var mPackid = equipTips[k].packid;
                                var keyinpack = equipTips[k].keyinpack;
                                if (mPackid == packid && keyinpack == key) {
                                    skill = equipTips[k].tips.skill;
                                }
                            }
                            if (skill > 0 && nquality >= 4) { //当前装备拥有特技并且品质大于等于4
                                if (bagTyps == BagTypes.BAG) {
                                    this.tejiArr.push({ id: id, packid: BagTypes.BAG, key: key });
                                }
                                else if (bagTyps == BagTypes.EQUIP) {
                                    this.tejiArr.push({ id: id, packid: BagTypes.EQUIP, key: key });
                                }
                            }
                        }
                    }
                };
                /**
                 * 显示拥有的钱
                 */
                EuipWashStuntMediator.prototype.showSilverNumber = function () {
                    var str;
                    var score = BagModel.getInstance().sliverIcon;
                    if (!isNaN(score)) {
                        str = game.utils.MoneyU.number2Thousands(score);
                    }
                    else {
                        str = "0";
                    }
                    this._viewUI.havaMoney_lab.text = str;
                };
                /**
                * 材料数量
                */
                EuipWashStuntMediator.prototype.getCailiaoNum = function (cailiaoId) {
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
                EuipWashStuntMediator.prototype.showCailiaoNum = function (needcailiaoNum, cailiaoid) {
                    var num = this.getCailiaoNum(cailiaoid);
                    tipsModel._instance.showNeedNum(needcailiaoNum, num, this._viewUI.num_label, false);
                };
                /**点击关闭按钮 */
                EuipWashStuntMediator.prototype.onCloseBtn = function () {
                    this.hide();
                };
                EuipWashStuntMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                    if (LoginModel.getInstance().CommonPage != "") {
                        modules.ModuleManager.show(LoginModel.getInstance().CommonPage, this._app);
                        LoginModel.getInstance().CommonPage = "";
                    }
                };
                EuipWashStuntMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    if (LoginModel.getInstance().CommonPage != "") {
                        modules.ModuleManager.show(LoginModel.getInstance().CommonPage, this._app);
                        LoginModel.getInstance().CommonPage = "";
                    }
                };
                EuipWashStuntMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return EuipWashStuntMediator;
            }(game.modules.UiMediator));
            tips_1.EuipWashStuntMediator = EuipWashStuntMediator;
        })(tips = modules.tips || (modules.tips = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=EuipWashStuntMediator.js.map