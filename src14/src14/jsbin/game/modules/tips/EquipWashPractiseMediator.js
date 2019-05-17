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
            /** 装备洗练 */
            var EquipWashPractiseMediator = /** @class */ (function (_super) {
                __extends(EquipWashPractiseMediator, _super);
                function EquipWashPractiseMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    /**洗炼的装备id */
                    _this.xilianArr = [];
                    /**拥有的装备 */
                    _this.haveEquipArr = [];
                    /**复合表 */
                    _this.itemAttrData = BagModel.getInstance().itemAttrData;
                    /**装备洗练表 */
                    _this.equipRefineInfoData = game.modules.tips.models.TipsModel._instance.equipRefineInfoData;
                    /**装备的属性和附加属性 */
                    _this.equipTips = StrengTheningModel.getInstance().equipTips;
                    /**装备生成基本属性表 */
                    _this.equipIteminfoData = StrengTheningModel.getInstance().equipIteminfoData;
                    /**属性效果id表 */
                    _this.attributeDesConfigData = StrengTheningModel.getInstance().attributeDesConfigData;
                    /**程序内字符串表 */
                    _this.cstringResConfigData = game.modules.tips.models.TipsModel._instance.cstringResConfigData;
                    // /**洗练后的属性预览 */
                    // equipWashAttr = tipsModel._instance.equipWashAttr;
                    /**储存装备之前的属性 */
                    _this.oldAttr = new Dictionary();
                    /** 洗练所需要的物品id */
                    _this.itemId = 0;
                    /** 元宝兑换金币 */
                    _this.needJinBi = 0;
                    _this._viewUI = new ui.common.component.EquipWashPractiseUI();
                    _this.isCenter = true;
                    _this._app = app;
                    _this._jinBiTips = new modules.commonUI.JinBiBuZuViewMediator(_this._viewUI, _this._app);
                    _this._remindViewMediator = modules.commonUI.RemindViewMediator.getInstance(_this._viewUI, _this._app);
                    _this._jinBiTips.on(modules.commonUI.USE_YUANBAO_EXCHANGE_EVENT, _this, _this.jinbibuzu);
                    _this.init();
                    return _this;
                }
                /**初始化 */
                EquipWashPractiseMediator.prototype.init = function () {
                    this._viewUI.saveBox.visible = false;
                    this._viewUI.attrBox.visible = false;
                    this.initXilianArr();
                    this.showSilverNumber();
                    this.initEvent();
                    this.initBtn();
                };
                /**事件接收 */
                EquipWashPractiseMediator.prototype.initEvent = function () {
                    game.modules.createrole.models.LoginProxy.getInstance().on(game.modules.createrole.models.GetItemTips_EVENT, this, this.flushAttr);
                    game.modules.bag.models.BagProxy.getInstance().on(game.modules.bag.models.REFRESH_CURRENCY_EVENT, this, this.flush);
                    tips_1.models.TipsProxy.getInstance().on(tips_1.models.WASHATTR, this, this.showWashAttr);
                };
                /**按钮事件 */
                EquipWashPractiseMediator.prototype.initBtn = function () {
                    this._viewUI.ok_btn.on(LEvent.MOUSE_DOWN, this, this.onOkBtn);
                    this._viewUI.save_btn.on(LEvent.MOUSE_DOWN, this, this.onSaveBtn);
                    this._viewUI.notSave_btn.on(LEvent.MOUSE_DOWN, this, this.showNoWashAttr);
                    this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.onCloseBtn);
                };
                /**刷新 */
                EquipWashPractiseMediator.prototype.flush = function () {
                    this.showSilverNumber();
                    this.flushCailiao();
                };
                /**刷新材料 */
                EquipWashPractiseMediator.prototype.flushCailiao = function () {
                    var index = this._viewUI.equip_list.selectedIndex;
                    if (index < 0) {
                        index = 0;
                    }
                    ;
                    this.equiplistSelect(index);
                };
                /**点击关闭按钮 */
                EquipWashPractiseMediator.prototype.onCloseBtn = function () {
                    // models.TipsProxy.getInstance().event(models.CLOSE_TIPS);
                    this.hide();
                };
                /**刷新属性 */
                EquipWashPractiseMediator.prototype.flushAttr = function () {
                    var index = this._viewUI.equip_list.selectedIndex;
                    if (index < 0) {
                        index = 0;
                    }
                    this.showEquipAttr(index);
                };
                /**初始化装备列表 */
                EquipWashPractiseMediator.prototype.initEquipList = function () {
                    var equiplist = this._viewUI.equip_list;
                    for (var i = 0; i < this.xilianArr.length; i++) {
                        var id = this.xilianArr[i].id;
                        var name = this.itemAttrData[id].name;
                        var nquality = this.itemAttrData[id].nquality;
                        var iconid = this.itemAttrData[id].icon;
                        var itemIcon = SaleModel.getInstance().getIcon(iconid); //icon
                        var itemnquality = StrengTheningModel._instance.frameSkinArr[nquality - 1];
                        var level = this.itemAttrData[id].level + "级";
                        this.haveEquipArr.push({ name_lab: name, level_lab: level, frame_img: itemnquality, icon_img: itemIcon });
                    }
                    SaleModel.getInstance().showList(equiplist, this.haveEquipArr);
                    this._viewUI.equip_list.renderHandler = new Handler(this, this.equiplistRender);
                    equiplist.selectHandler = new Handler(this, this.equiplistSelect);
                };
                /** 装备列表的渲染 */
                EquipWashPractiseMediator.prototype.equiplistRender = function (cell, index) {
                    var bgDiTu_img = cell.getChildByName("bgDiTu_img");
                    bgDiTu_img.skin = "common/ui/tongyong/common_list_3textbg.png";
                    if (this.selectedDiTu) {
                        this.selectedDiTu.skin = "common/ui/tongyong/common_list_3textbg2.png";
                    }
                };
                /**装备选择 */
                EquipWashPractiseMediator.prototype.equiplistSelect = function (index) {
                    var _bgDiTu_img = this._viewUI.equip_list.getCell(index).getChildByName("bgDiTu_img");
                    _bgDiTu_img.skin = "common/ui/tongyong/common_list_3textbg2.png";
                    this.selectedDiTu = _bgDiTu_img;
                    if (this.xilianArr.length == 0)
                        return;
                    this.itemId = this.xilianArr[index].id;
                    var id = this.xilianArr[index].id;
                    if (id == "null")
                        return;
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
                    var cailiaoid = this.equipRefineInfoData[id].cailiaoid; //洗练材料id
                    var cailiaonum = this.equipRefineInfoData[id].cailiaonum; //消耗材料数量
                    var moneytype = this.equipRefineInfoData[id].moneytype; //货币类型
                    var moneynum = this.equipRefineInfoData[id].moneynum; //消耗货币数量
                    var cailiaoIconid = this.itemAttrData[cailiaoid].icon;
                    var cailiaoqualityid = this.itemAttrData[cailiaoid].nquality;
                    var cailiaoIcon = SaleModel.getInstance().getIcon(cailiaoIconid); //icon
                    var cailiaoquality = StrengTheningModel._instance.frameSkinArr[cailiaoqualityid - 1];
                    this._viewUI.itemFrame_img.skin = cailiaoquality;
                    this._viewUI.itemIcon_img.skin = cailiaoIcon;
                    this._viewUI.itemIcon_img.on(LEvent.CLICK, this, this.showItemTips, [cailiaoid]);
                    var str = game.utils.MoneyU.number2Thousands(moneynum);
                    this._viewUI.needMoney_label.text = str;
                    this.showEquipAttr(index);
                    this.showCailiaoNum(cailiaonum, cailiaoid);
                };
                /** 显示洗炼所需消耗的材料信息tips */
                EquipWashPractiseMediator.prototype.showItemTips = function (itemid) {
                    var parame = new Laya.Dictionary();
                    parame.set("itemId", itemid);
                    var _tipsModule = new tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.commonItem, parame);
                };
                /**
                 * @param index 当前点击的装备列表的index
                 */
                EquipWashPractiseMediator.prototype.showEquipAttr = function (index) {
                    var equipTips = StrengTheningModel.getInstance().equipTips;
                    var packid = this.xilianArr[index].packid;
                    var key = this.xilianArr[index].key;
                    var html = "";
                    var baseNum = 0;
                    var baseAttrKsys = [];
                    var greenArrowImgSkin = [];
                    for (var i = 0; i < equipTips.length; i++) {
                        var keyinpack = equipTips[i].keyinpack; //装备的key
                        var tipsPackid = equipTips[i].packid; //背包id
                        if (packid == tipsPackid && key == keyinpack) {
                            var tips = equipTips[i].tips;
                            var baseAttr = tips.baseAttr;
                            baseAttrKsys = baseAttr.keys;
                            this.oldAttr.clear();
                            baseNum = baseAttrKsys.length; //基础属性个数                    
                            for (var k = 0; k < baseAttrKsys.length; k++) {
                                greenArrowImgSkin.push({
                                    greenArrow_img: { skin: "common/ui/tongyong/rightline.png" }
                                });
                                var baseid = baseAttrKsys[k]; //属性id
                                var attrValue = baseAttr.get(baseid); //值
                                this.oldAttr.set(baseid + k, attrValue);
                                var numpositivedes = this.attributeDesConfigData[baseid].numpositivedes; //属性描述
                                var attrDesc = numpositivedes.replace("$parameters$", attrValue);
                                html += "<span style='fontSize:24;color:#361A0F'>" + attrDesc + "</span><br>";
                                html += "<span style='fontSize:20'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><br>";
                            }
                        }
                    }
                    this._viewUI.greenArrow_lst.array = greenArrowImgSkin;
                    this._viewUI.greenArrow_lst.repeatY = baseNum;
                    this._viewUI.equipAttr_html.innerHTML = html;
                    this.showNoWashAttr(index);
                };
                EquipWashPractiseMediator.prototype.showNoWashAttr = function (index) {
                    this._viewUI.saveBox.visible = false;
                    var html = "";
                    var _equipTips = StrengTheningModel.getInstance().equipTips;
                    var _equipId = this.xilianArr[index]["id"]; //装备id
                    var _packId = this.xilianArr[index]["packid"]; //所在背包id
                    var _keyInPack = this.xilianArr[index]["key"]; //所在背包中key
                    var baseAttr = new Laya.Dictionary();
                    for (var i = 0; i < _equipTips.length; i++) {
                        var _equipTip = _equipTips[i];
                        var packid = _equipTip.packid;
                        var keyinpack = _equipTip.keyinpack;
                        if (packid == _packId && keyinpack == _keyInPack) {
                            var tips_2 = _equipTip.tips;
                            baseAttr = tips_2.baseAttr; //获取到该装备的基础属性数据
                            break;
                        }
                    }
                    for (var i = 0; i < baseAttr.keys.length; i++) {
                        var _baseId = baseAttr.keys[i]; //获取基础属性的id
                        var _numpositivedes = this.attributeDesConfigData[_baseId].numpositivedes; //属性中文描述
                        _numpositivedes = _numpositivedes.replace("+$parameters$", "");
                        html += "<span style='fontSize:24;color:#361A0F'>" + _numpositivedes + "&nbsp;&nbsp;0</span><span style='color:#13FF00;fontSize:24'>&nbsp;&nbsp;+0</span><br>";
                        html += "<span style='fontSize:20'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><br>";
                    }
                    this._viewUI.equipWashAttr_html.innerHTML = html;
                };
                /**
                 * 显示洗练之后的属性预览
                 */
                EquipWashPractiseMediator.prototype.showWashAttr = function () {
                    /**洗练预览属性 */
                    var equipWashAttr = tipsModel._instance.equipWashAttr;
                    var equipTips = StrengTheningModel.getInstance().equipTips;
                    var attr = equipWashAttr[equipWashAttr.length - 1].attr;
                    var washpackid = equipWashAttr[equipWashAttr.length - 1].packid; //背包id
                    var washkeyinpack = equipWashAttr[equipWashAttr.length - 1].keyinpack; // key
                    var html = "";
                    for (var i = 0; i < equipTips.length; i++) {
                        var keyinpack = equipTips[i].keyinpack; //装备的key
                        var tipsPackid = equipTips[i].packid; //背包id
                        if (washpackid == tipsPackid && washkeyinpack == keyinpack) {
                            var washAttrKeys = attr.keys;
                            for (var k = 0; k < washAttrKeys.length; k++) {
                                var washId = washAttrKeys[k];
                                var washValue = attr.get(washId); //刷新的属性值
                                var oldAttr = this.oldAttr.get(washId + k); //原属性值
                                var diff = washValue - oldAttr;
                                var showdiff = "";
                                if (diff >= 0) {
                                    showdiff = "+" + diff;
                                }
                                else {
                                    showdiff = diff + "";
                                }
                                var numpositivedes = this.attributeDesConfigData[washId].numpositivedes; //属性描述
                                var attrDesc = numpositivedes.replace("$parameters$", washValue);
                                html += "<span style='fontSize:24;color:#361A0F'>" + attrDesc + "</span><span style='color:#13FF00;fontSize:24'>&nbsp;&nbsp;" + showdiff + "</span><br>";
                                html += "<span style='fontSize:20'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><br>";
                            }
                        }
                    }
                    this._viewUI.equipWashAttr_html.innerHTML = html;
                    this._viewUI.saveBox.visible = true;
                };
                /**
                 * 洗练的装备
                 */
                EquipWashPractiseMediator.prototype.initXilianArr = function () {
                    var bagTyps1 = BagTypes.BAG;
                    var bagTyps2 = BagTypes.EQUIP;
                    this.getxilianid(bagTyps1);
                    this.getxilianid(bagTyps2);
                };
                /**获取装备 */
                EquipWashPractiseMediator.prototype.getxilianid = function (bagTyps) {
                    var bag = BagModel.getInstance().getBagGameItemData(bagTyps);
                    var items = bag.items;
                    var _equipRefineInfoData = tips.models.TipsModel._instance.equipRefineInfoData; //装备洗炼表
                    for (var i = 0; i < items.length; i++) {
                        var id = items[i].id;
                        var key = items[i].key;
                        var nquality = this.itemAttrData[id].nquality;
                        if (nquality >= 4) { //装备的品质大于等于4才能洗练
                            if (!_equipRefineInfoData[id])
                                continue;
                            if (bagTyps == BagTypes.BAG) {
                                this.xilianArr.push({ id: id, packid: BagTypes.BAG, key: key });
                            }
                            else if (bagTyps == BagTypes.EQUIP) {
                                this.xilianArr.push({ id: id, packid: BagTypes.EQUIP, key: key });
                            }
                        }
                    }
                };
                /**
                 * 点击洗练按钮
                 */
                EquipWashPractiseMediator.prototype.onOkBtn = function () {
                    if (this._viewUI.saveBox.visible) {
                        return;
                    }
                    var cailiaoid = this.equipRefineInfoData[this.itemId].cailiaoid; //洗练材料id
                    var cailiaonum = this.equipRefineInfoData[this.itemId].cailiaonum; //消耗材料数量
                    var moneynum = this.equipRefineInfoData[this.itemId].moneynum; //消耗货币数量
                    var bag = BagModel.getInstance().getBagGameItemData(BagTypes.BAG);
                    var isHave = false;
                    for (var i = 0; i < bag.items.length; i++) {
                        if (bag.items[i].id == cailiaoid && bag.items[i].number >= cailiaonum) {
                            isHave = true;
                            continue;
                        }
                    }
                    if (!isHave) {
                        var param = [this.itemAttrData[cailiaoid].name];
                        var msg = game.modules.mainhud.models.HudModel.getInstance().promptAssembleBack(PromptExplain.LACK_OF_MATERIAL, param);
                        game.modules.chat.models.ChatProxy.getInstance().event(game.modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS, msg);
                        return;
                    }
                    var global = BagModel.getInstance().globalIcon;
                    if (global < moneynum) {
                        this.needJinBi = moneynum - global;
                        this._jinBiTips.onShow(true, this.needJinBi + "", Math.ceil(this.needJinBi / 100) + "");
                        return;
                    }
                    this.refineEquip();
                };
                /** 洗练达成条件发送请求 */
                EquipWashPractiseMediator.prototype.refineEquip = function () {
                    var index = this._viewUI.equip_list.selectedIndex;
                    if (index < 0) {
                        index = 0;
                    }
                    var packid = this.xilianArr[index].packid;
                    var key = this.xilianArr[index].key;
                    RequesterProtocols._instance.c2s_CRefineEquip_Base(packid, key);
                };
                EquipWashPractiseMediator.prototype.jinbibuzu = function () {
                    this._jinBiTips.hide();
                    if (Math.ceil(this.needJinBi / 100) < game.modules.mainhud.models.HudModel.getInstance().fuShiNum) {
                        RequesterProtocols._instance.c2s_exchange_currency(MoneyTypes.MoneyType_HearthStone, MoneyTypes.MoneyType_GoldCoin, Math.ceil(this.needJinBi / 100));
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
                EquipWashPractiseMediator.prototype.jumpToCharge = function () {
                    this._remindViewMediator.off(modules.commonUI.LEFT_BUTTON_EVENT, this, this.cancleToJump);
                    this.hide();
                    modules.ModuleManager.hide(modules.ModuleNames.BAG);
                    modules.ModuleManager.jumpPage(modules.ModuleNames.SHOP, shopMediatorType.CHONGZHI, this._app);
                };
                /** 元宝补足界面取消按钮监听 */
                EquipWashPractiseMediator.prototype.cancleToJump = function () {
                    this._remindViewMediator.off(modules.commonUI.RIGHT_BUTTON_EVENT, this, this.jumpToCharge);
                    this._remindViewMediator.hide();
                };
                /**
                 * 保存
                 */
                EquipWashPractiseMediator.prototype.onSaveBtn = function () {
                    var index = this._viewUI.equip_list.selectedIndex;
                    if (index < 0) {
                        index = 0;
                    }
                    var packid = this.xilianArr[index].packid;
                    var key = this.xilianArr[index].key;
                    RequesterProtocols._instance.c2s_CSaveRefine_Data(packid, key);
                    this._viewUI.saveBox.visible = false;
                    this.showNoWashAttr(index);
                };
                /**
                 * 材料数量
                 */
                EquipWashPractiseMediator.prototype.getCailiaoNum = function (cailiaoId) {
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
                EquipWashPractiseMediator.prototype.showCailiaoNum = function (needcailiaoNum, cailiaoid) {
                    var num = this.getCailiaoNum(cailiaoid);
                    tipsModel._instance.showNeedNum(needcailiaoNum, num, this._viewUI.num_label, false);
                };
                /**
                 * 显示拥有的钱
                 */
                EquipWashPractiseMediator.prototype.showSilverNumber = function () {
                    var str;
                    var score = BagModel.getInstance().globalIcon;
                    if (!isNaN(score)) {
                        str = game.utils.MoneyU.number2Thousands(score);
                    }
                    else {
                        str = "0";
                    }
                    this._viewUI.havaMoney_lab.text = str;
                };
                /** 供其它地方显示装备洗炼界面提供接口
                 * @param equipId 装备id
                 * @param equipKey 装备key
                 */
                EquipWashPractiseMediator.prototype.onShow = function (equipId, equipKey) {
                    this.show();
                    for (var i = 0; i < this.xilianArr.length; i++) {
                        var _equipId = this.xilianArr[i]["id"];
                        var _equipKey = this.xilianArr[i]["key"];
                        if (_equipId == equipId && _equipKey == equipKey) {
                            this.equipPos = i;
                            break;
                        }
                    }
                    this.initEquipList();
                    this.equiplistSelect(this.equipPos);
                    this._viewUI.equip_list.scrollTo(this.equipPos);
                };
                EquipWashPractiseMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                };
                EquipWashPractiseMediator.prototype.hide = function () {
                    if (LoginModel.getInstance().CommonPage != "") {
                        modules.ModuleManager.show(LoginModel.getInstance().CommonPage, this._app);
                        LoginModel.getInstance().CommonPage = "";
                    }
                    _super.prototype.hide.call(this);
                    if (this.selectedDiTu) {
                        this.selectedDiTu.skin = "common/ui/tongyong/common_list_3textbg.png";
                    }
                };
                EquipWashPractiseMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return EquipWashPractiseMediator;
            }(game.modules.UiMediator));
            tips_1.EquipWashPractiseMediator = EquipWashPractiseMediator;
        })(tips = modules.tips || (modules.tips = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=EquipWashPractiseMediator.js.map