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
        var family;
        (function (family) {
            /** 帮派药房 */
            var FanilyPharmacyViewMediator = /** @class */ (function (_super) {
                __extends(FanilyPharmacyViewMediator, _super);
                function FanilyPharmacyViewMediator(app) {
                    var _this = _super.call(this) || this;
                    /**药品购买配置表 */
                    _this.clanCFactionYaoFangData = family.models.FamilyModel.getInstance().clanCFactionYaoFangData;
                    /**g公会药房数据表 */
                    _this.clanCFactionDrugStoreData = family.models.FamilyModel.getInstance().clanCFactionDrugStoreData;
                    /**
                     * 杂货等表的复合表
                     */
                    _this.itemAttrData = BagModel.getInstance().itemAttrData;
                    /**客户端信息提示表 */
                    _this.chatMessageTips = game.modules.chat.models.ChatModel._instance.chatMessageTips;
                    /**程序内字符串表 */
                    _this.cstringResConfigData = game.modules.tips.models.TipsModel._instance.cstringResConfigData;
                    /**公会药房数据 */
                    _this.pharmacyInfoArr = [];
                    /** 上一次被选中的产药倍率索引 */
                    _this.lastRateSelectedIndex = 0;
                    /** 上次药品列表被选中的索引 */
                    _this.yaoPinLstSelectedIndex = -1;
                    _this.uiLayer = app.uiRoot.general;
                    _this._viewUI = new ui.common.FamilyYaoFangUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, _this, _this.closePharmacyView);
                    _this.COpenClanMedic();
                    _this.DisappearMessageTipsMediator = new game.modules.commonUI.DisappearMessageTipsMediator(_this._app);
                    family.models.FamilyProxy._instance.on(family.models.SOpenClanMedic, _this, _this.showPharmacyView);
                    game.modules.createrole.models.LoginProxy.getInstance().on(game.modules.createrole.models.SRefreshCurrency_EVENT, _this, _this.showHaveMoney);
                    _this._viewUI.reduce_btn.on(LEvent.MOUSE_DOWN, _this, _this.onReduceBtn);
                    _this._viewUI.add_btn.on(LEvent.MOUSE_DOWN, _this, _this.onAddBtn);
                    _this._viewUI.buy_btn.on(LEvent.MOUSE_DOWN, _this, _this.BuyMedic);
                    _this._viewUI.TipsYaoFang_btn.on(LEvent.MOUSE_DOWN, _this, _this.onTips);
                    _this._viewUI.banggong1_img.skin = "common/icon/item/20108.png";
                    _this._viewUI.banggong2_img.skin = "common/icon/item/20108.png";
                    return _this;
                }
                /**显示拥有的钱 */
                FanilyPharmacyViewMediator.prototype.showHaveMoney = function () {
                    var haveYinBiNum = HudModel.getInstance().sliverNum;
                    if (haveYinBiNum > 9999999) {
                        this._viewUI.haveyinbi1_lab.visible = true;
                        this._viewUI.haveyinbi1_lab.text = family.models.FamilyModel.getInstance().showMoney(haveYinBiNum);
                        this._viewUI.haveyinbi_lab.visible = false;
                    }
                    else {
                        this._viewUI.haveyinbi1_lab.visible = false;
                        this._viewUI.haveyinbi_lab.visible = true;
                        this._viewUI.haveyinbi_lab.text = family.models.FamilyModel.getInstance().showMoney(haveYinBiNum);
                    }
                };
                /**提示弹窗 */
                FanilyPharmacyViewMediator.prototype.onTips = function () {
                    var parameArr = new Dictionary();
                    parameArr.set("title", 11319);
                    parameArr.set("contentId", 11320);
                    var clanInfo = family.models.FamilyModel.getInstance().clanInfo;
                    var house = clanInfo[0].house;
                    var yaofangLevel = house.get(clanHouse.BuildYaoFang);
                    var medicNum = this.clanCFactionDrugStoreData[yaofangLevel].dragnummax;
                    var doublemoney = this.clanCFactionDrugStoreData[yaofangLevel].doublemoney / 10000;
                    var trimoney = this.clanCFactionDrugStoreData[yaofangLevel].trimoney / 10000;
                    var parame = [yaofangLevel, medicNum, doublemoney, trimoney];
                    parameArr.set("parame", parame);
                    this.tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENTMESSAGE, parameArr);
                };
                /** 权限不足，不能设置产药倍率 */
                FanilyPharmacyViewMediator.prototype.onlySelectType = function () {
                    this.setSelectType(this.lastRateSelectedIndex);
                    this.CRequestSelectType(this.lastRateSelectedIndex);
                };
                /**显示药房信息 */
                FanilyPharmacyViewMediator.prototype.showPharmacyView = function () {
                    var skinArr = ["common/ui/tongyong/baikuang.png", "common/ui/tongyong/lvkuang.png",
                        "common/ui/tongyong/lankuang.png", "common/ui/tongyong/zikuang.png",
                        "common/ui/tongyong/jinkuang.png"];
                    var pharmacyInfo = family.models.FamilyModel.getInstance().pharmacyInfo;
                    var medicitemlist = pharmacyInfo.get("medicitemlist");
                    var selecttype = pharmacyInfo.get("selecttype"); //选择类型
                    var buyitemnum = pharmacyInfo.get("buyitemnum"); //已经购买的数量
                    var clanInfo = family.models.FamilyModel.getInstance().clanInfo;
                    var house = clanInfo[0].house;
                    var yaofangLevel = house.get(clanHouse.BuildYaoFang);
                    this._viewUI.lvYaoFang_lab.text = yaofangLevel; //药房等级
                    this._viewUI.selecttype_radio.selectedIndex = selecttype; //类型
                    this.lastRateSelectedIndex = selecttype;
                    if (this.isCanSwitch()) {
                        this._viewUI.selecttype_radio.selectHandler = new Handler(this, this.selectType);
                    }
                    else {
                        for (var i_1 = 0; i_1 < 3; i_1++) {
                            var item = this._viewUI.selecttype_radio.getChildAt(i_1);
                            item.on(LEvent.CLICK, this, this.onlySelectType);
                        }
                    }
                    this.showHaveMoney();
                    var rolecontribution = HudModel.getInstance().gonghuiNum; //公会贡献度
                    if (rolecontribution > 99999) {
                        this._viewUI.havegongxian1_lab.visible = true;
                        this._viewUI.havegongxian1_lab.text = family.models.FamilyModel.getInstance().showMoney(rolecontribution);
                        this._viewUI.havegongxian_lab.visible = false;
                    }
                    else {
                        this._viewUI.havegongxian1_lab.visible = false;
                        this._viewUI.havegongxian_lab.visible = true;
                        this._viewUI.havegongxian_lab.text = family.models.FamilyModel.getInstance().showMoney(rolecontribution);
                    }
                    var pharmacyInfoArr = [];
                    for (var i in medicitemlist) {
                        var itemid = medicitemlist[i].itemid;
                        var itemnum = medicitemlist[i].itemnum;
                        var icon = this.itemAttrData[itemid].icon;
                        var m_icon = SaleModel._instance.getIcon(icon);
                        var name = this.clanCFactionYaoFangData[itemid].name;
                        var money = this.clanCFactionYaoFangData[itemid].money;
                        var banggong = this.clanCFactionYaoFangData[itemid].banggong;
                        var skin = skinArr[BagModel.getInstance().itemAttrData[itemid].nquality - 1];
                        pharmacyInfoArr.push({ itemid: itemid, yaoPinName_lab: name, kuang_img: skin, yaoPinIcon_img: m_icon, number_lab: itemnum, spendGongXian_lab: money, needGongXian_lab: banggong });
                    }
                    this.pharmacyInfoArr = pharmacyInfoArr;
                    SaleModel._instance.showList(this._viewUI.yaoPin_list, pharmacyInfoArr);
                    this._viewUI.yaoPin_list.selectHandler = new Handler(this, this.yaoPinListSelect, [pharmacyInfoArr]);
                    this._viewUI.yaoPin_list.renderHandler = new Handler(this, this.yaoPinListRender, [pharmacyInfoArr]);
                    //this.yaoPinListSelect(pharmacyInfoArr, 0);
                    if (this.yaoPinLstSelectedIndex == -1) {
                        this.noYaoPinSelect();
                    }
                    else {
                        this._viewUI.yaoPin_list.selectedIndex = this.yaoPinLstSelectedIndex;
                        this._viewUI.yaoPin_list.scrollTo(this.yaoPinLstSelectedIndex);
                    }
                };
                /** 没有选中药品，界面的初始化 */
                FanilyPharmacyViewMediator.prototype.noYaoPinSelect = function () {
                    this._viewUI.needyinbi_lab.text = family.models.FamilyModel.getInstance().showMoney(0);
                    this._viewUI.needgongxian_lab.text = family.models.FamilyModel.getInstance().showMoney(0);
                };
                /**选择药品 */
                FanilyPharmacyViewMediator.prototype.yaoPinListSelect = function (pharmacyInfoArr, index) {
                    var money = pharmacyInfoArr[index].spendGongXian_lab;
                    var banggong = pharmacyInfoArr[index].needGongXian_lab;
                    this._viewUI.needyinbi_lab.text = family.models.FamilyModel.getInstance().showMoney(money);
                    this._viewUI.needgongxian_lab.text = family.models.FamilyModel.getInstance().showMoney(banggong);
                    var selectYaoPin_btn = this._viewUI.yaoPin_list.getCell(index).getChildByName("selectYaoPin_btn");
                    selectYaoPin_btn.skin = "common/ui/tongyong/common_list_3textbg2.png";
                    this.yaoPinLstSelectedIndex = index;
                    this.roleOneIsEnough(money, banggong);
                };
                /** 判断人物角色身上的银币、帮贡是否足够
                 * @param yinbi 购买药品所需的银币
                 * @param banggong 购买药品所需的帮贡
                 */
                FanilyPharmacyViewMediator.prototype.roleOneIsEnough = function (yinbi, banggong) {
                    //判断银币是否足够
                    var _haveYinBiNum = BagModel.getInstance().sliverIcon;
                    var yinblab;
                    if (this._viewUI.haveyinbi1_lab.visible) {
                        yinblab = this._viewUI.haveyinbi1_lab;
                    }
                    else {
                        yinblab = this._viewUI.haveyinbi_lab;
                    }
                    if (yinbi > _haveYinBiNum) {
                        yinblab.stroke = 4;
                        yinblab.strokeColor = "#FF2800";
                    }
                    else {
                        yinblab.stroke = 0;
                        yinblab.strokeColor = "#FF2800";
                    }
                    //判断帮贡是否足够
                    var currHaveBanggong = HudModel.getInstance().gonghuiNum;
                    var banggonglab;
                    if (this._viewUI.havegongxian1_lab.visible) {
                        banggonglab = this._viewUI.havegongxian1_lab;
                    }
                    else {
                        banggonglab = this._viewUI.havegongxian_lab;
                    }
                    if (banggong > currHaveBanggong) {
                        banggonglab.stroke = 4;
                        banggonglab.strokeColor = "#FF2800";
                    }
                    else {
                        banggonglab.stroke = 0;
                        banggonglab.strokeColor = "#FFFFFF";
                    }
                };
                /**显示药品信息 */
                FanilyPharmacyViewMediator.prototype.yaoPinListRender = function (pharmacyInfoArr, cell, index) {
                    var spendGongXianlab = cell.getChildByName("spendGongXian_lab");
                    var needGongXianlab = cell.getChildByName("needGongXian_lab");
                    spendGongXianlab.text = family.models.FamilyModel.getInstance().showMoney(pharmacyInfoArr[index].spendGongXian_lab);
                    needGongXianlab.text = family.models.FamilyModel.getInstance().showMoney(pharmacyInfoArr[index].needGongXian_lab);
                    var selectYaoPin_btn = this._viewUI.yaoPin_list.getCell(index).getChildByName("selectYaoPin_btn");
                    if (this.yaoPinLstSelectedIndex != -1 && this.yaoPinLstSelectedIndex == index) {
                        selectYaoPin_btn.skin = "common/ui/tongyong/common_list_3textbg2.png";
                    }
                    else {
                        selectYaoPin_btn.skin = "common/ui/tongyong/huodongdi.png";
                    }
                    var banggong_img = cell.getChildByName("banggong_img");
                    banggong_img.skin = "common/icon/item/20108.png";
                };
                /**减少药品数量 */
                FanilyPharmacyViewMediator.prototype.onReduceBtn = function () {
                    this.DisappearMessageTipsMediator.onShow(this.chatMessageTips[160353].msg);
                };
                /**增加药品数量 */
                FanilyPharmacyViewMediator.prototype.onAddBtn = function () {
                    this.DisappearMessageTipsMediator.onShow(this.chatMessageTips[160353].msg);
                };
                /**购买药品 */
                FanilyPharmacyViewMediator.prototype.BuyMedic = function () {
                    var itemnum = parseInt(this._viewUI.neednumber_lab.text);
                    var index = this._viewUI.yaoPin_list.selectedIndex;
                    if (index >= 0) {
                        var itemid = this.pharmacyInfoArr[index].itemid;
                        this.CBuyMedic(itemid, itemnum);
                    }
                };
                /**选择产药类型 */
                FanilyPharmacyViewMediator.prototype.selectType = function (index) {
                    family.models.FamilyProxy._instance.once(family.models.SRequestSelectType, this, this.setSelectType);
                    var _tempType = 0;
                    switch (index) {
                        case 0:
                            _tempType = ProduceDrugRate.SELECT_BASE;
                            this.lastRateSelectedIndex = index;
                            this.CRequestSelectType(_tempType);
                            break;
                        case 1:
                            _tempType = ProduceDrugRate.SELECT_DOUBLE;
                            this.secondaryConfirm(_tempType);
                            break;
                        case 2:
                            _tempType = ProduceDrugRate.SELECT_THREE;
                            this.secondaryConfirm(_tempType);
                            break;
                    }
                };
                /** 是否有权限切换产药倍率
                 * @descibe 是帮主或者副帮主就返回true，其余一律返回false
                 */
                FanilyPharmacyViewMediator.prototype.isCanSwitch = function () {
                    var isCan = false;
                    var _selfInClanInfo = family.models.FamilyModel.getInstance()._selfInClanInfo;
                    if (_selfInClanInfo.position == ClanPositionType.ClanMaster || _selfInClanInfo.position == ClanPositionType.ClanViceMaster) {
                        isCan = true;
                    }
                    return isCan;
                };
                /** 显示二级确认界面 */
                FanilyPharmacyViewMediator.prototype.secondaryConfirm = function (type) {
                    var clanInfo = family.models.FamilyModel.getInstance().clanInfo;
                    var house = clanInfo[0].house; //公会的建筑
                    //当前药房等级
                    var yaofangLevel = house.get(3);
                    var parameter1 = type + 1; //产药的倍率
                    var parameter2 = 0; //所需花费的帮贡资金
                    if (type == ProduceDrugRate.SELECT_DOUBLE) {
                        parameter2 = this.clanCFactionDrugStoreData[yaofangLevel]["doublemoney"] / 10000;
                    }
                    else if (type == ProduceDrugRate.SELECT_THREE) {
                        parameter2 = this.clanCFactionDrugStoreData[yaofangLevel]["trimoney"] / 10000;
                    }
                    var _parame = new Laya.Dictionary();
                    _parame.set("contentId", 11334);
                    _parame.set("parame", [parameter1, parameter2]);
                    //game.modules.chat.models.ChatProxy.getInstance().once(game.modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS, this, this.isShowClanYaoFangDescription,[type]);
                    modules.tips.models.TipsProxy.getInstance().once(modules.tips.models.TIPS_ON_OK, this, this.isShowClanYaoFangDescription, [type]);
                    modules.tips.models.TipsProxy.getInstance().once(modules.tips.models.TIPS_ON_CANCEL, this, this.setSelectType, [this.lastRateSelectedIndex]);
                    var _tipsModule = new modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENT_TIPS_MESSAGE, _parame);
                };
                /** 是否显示帮派药房说明 */
                FanilyPharmacyViewMediator.prototype.isShowClanYaoFangDescription = function (type) {
                    var currClanMoney = family.models.FamilyModel.getInstance().clanInfo[0].money; //获得当前帮派资金
                    var _flag = false;
                    switch (type) {
                        case ProduceDrugRate.SELECT_DOUBLE:
                            if (currClanMoney < 8000000) {
                                _flag = true;
                            }
                            break;
                        case ProduceDrugRate.SELECT_THREE:
                            if (currClanMoney < 10000000) {
                                _flag = true;
                            }
                            break;
                    }
                    if (_flag) { //当前帮派资金不足以作为保底的帮派资金
                        var msg = ChatModel.getInstance().chatMessageTips[160244]["msg"];
                        var distips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                        distips.onShow(msg);
                        this.CRequestSelectType(ProduceDrugRate.SELECT_BASE); //全默认选中正常倍率
                    }
                    else {
                        this.CRequestSelectType(type);
                    }
                };
                /**设置产药类型 */
                FanilyPharmacyViewMediator.prototype.setSelectType = function (selecttype) {
                    this._viewUI.selecttype_radio.selectedIndex = selecttype;
                };
                /**关闭界面 */
                FanilyPharmacyViewMediator.prototype.closePharmacyView = function () {
                    this.hide();
                    modules.ModuleManager.show(modules.ModuleNames.haveFamily, this._app);
                };
                /**选择产药的倍数 */
                FanilyPharmacyViewMediator.prototype.CRequestSelectType = function (selecttype) {
                    RequesterProtocols._instance.c2s_CRequestSelectType(selecttype);
                };
                /**请求药房信息 */
                FanilyPharmacyViewMediator.prototype.COpenClanMedic = function () {
                    RequesterProtocols._instance.c2s_COpenClanMedic();
                };
                /**购买药房的药品 */
                FanilyPharmacyViewMediator.prototype.CBuyMedic = function (itemid, itemnum) {
                    RequesterProtocols._instance.c2s_CBuyMedic(itemid, itemnum);
                };
                FanilyPharmacyViewMediator.prototype.onShow = function (event) {
                    this.show();
                };
                FanilyPharmacyViewMediator.prototype.hide = function () {
                    if (this.yaoPinLstSelectedIndex != -1) {
                        var _selectYaoPin_btn = this._viewUI.yaoPin_list.getCell(this.yaoPinLstSelectedIndex).getChildByName("selectYaoPin_btn");
                        _selectYaoPin_btn.skin = "common/ui/tongyong/huodongdi.png";
                        this.yaoPinLstSelectedIndex = -1;
                    }
                    _super.prototype.hide.call(this);
                };
                FanilyPharmacyViewMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return FanilyPharmacyViewMediator;
            }(game.modules.ModuleMediator));
            family.FanilyPharmacyViewMediator = FanilyPharmacyViewMediator;
        })(family = modules.family || (modules.family = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=FanilyPharmacyViewMediator.js.map