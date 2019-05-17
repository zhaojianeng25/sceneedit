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
var RoleInfoModel = game.modules.roleinfo.models.RoleInfoModel;
var game;
(function (game) {
    var modules;
    (function (modules) {
        var roleinfo;
        (function (roleinfo) {
            /**洗点道具商城id */
            var XIDIAN;
            (function (XIDIAN) {
                /**回天残卷体 */
                XIDIAN[XIDIAN["TI"] = 4013] = "TI";
                /**回天残卷智 */
                XIDIAN[XIDIAN["ZHI"] = 4014] = "ZHI";
                /**回天残卷力 */
                XIDIAN[XIDIAN["LI"] = 4015] = "LI";
                /**回天残卷耐 */
                XIDIAN[XIDIAN["NAI"] = 4016] = "NAI";
                /**回天残卷敏 */
                XIDIAN[XIDIAN["MIN"] = 4017] = "MIN";
                /**回天神书 */
                XIDIAN[XIDIAN["QUAN"] = 4046] = "QUAN";
            })(XIDIAN || (XIDIAN = {}));
            /** 人物洗点界面 */
            var RoleResetAttrMediator = /** @class */ (function (_super) {
                __extends(RoleResetAttrMediator, _super);
                function RoleResetAttrMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    /**当前选中列表项下标 */
                    _this.selectNum = 0;
                    _this._viewUI = new ui.common.RoleResetAttrUI();
                    _this._BuyKuaiJieMediator = new modules.commonUI.BuyKuaiJieMediator(app);
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this.isCenter = true;
                    _this._app = app;
                    _this.initialize();
                    _this.init();
                    _this.registerEvent();
                    _this.eventListener();
                    return _this;
                }
                /**注册事件监听 */
                RoleResetAttrMediator.prototype.eventListener = function () {
                    roleinfo.models.RoleInfoProxy.getInstance().on(roleinfo.models.SRefreshPointType_EVENT, this, this.onRefreshDian);
                    modules.mainhud.models.HudProxy.getInstance().on(modules.mainhud.models.SRefreshRoleData_EVENT, this, this.onRefreshRoleData);
                    modules.shop.models.ShopProxy.getInstance().on(modules.shop.models.BUYSUCCESS_EVENT, this, this.onNotifyBuySuccess);
                };
                /**注册点击监听 */
                RoleResetAttrMediator.prototype.registerEvent = function () {
                    this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
                    this._viewUI.use_btn.on(LEvent.MOUSE_DOWN, this, this.use);
                };
                /**初始化 */
                RoleResetAttrMediator.prototype.initialize = function () {
                    this.bagItemArr = new Array();
                    this.itemNumArr = new Array();
                    this.itemIdArr = new Array();
                    this.imageArr = new Array();
                    this.nameArr = new Array();
                    this.xidianArr = new Array();
                    var tip = modules.tips.models.TipsModel.getInstance().cstringResConfigData; //程序内字符串表
                    this.typeArr = [{ Label: tip[RoleEnum.TIZHI].msg }, { Label: tip[RoleEnum.ZHILI].msg }, { Label: tip[RoleEnum.LILIANG].msg }, { Label: tip[RoleEnum.NAILI].msg }, { Label: tip[RoleEnum.MINJIE].msg }, { Label: "" }];
                    this.specialArr = [{ Label: "" }, { Label: "" }, { Label: "" }, { Label: "" }, { Label: "" }, { Label: tip[RoleEnum.RESET_ALL].msg }];
                    this.addObj = RoleInfoModel.getInstance().addPointResetItemConfigBinDic;
                    this.goodsObj = ShopModel.getInstance().GoodsBinDic;
                    this.itemAttrObj = BagModel.getInstance().itemAttrData;
                    this.shopIdArr = [XIDIAN.TI, XIDIAN.ZHI, XIDIAN.LI, XIDIAN.NAI, XIDIAN.MIN, XIDIAN.QUAN];
                    for (var i = 0; i < this.shopIdArr.length; i++) {
                        this.itemIdArr.push(this.goodsObj[this.shopIdArr[i]]["itemId"]); //洗点道具id
                    }
                    for (var i = 0; i < this.itemIdArr.length; i++) {
                        this.nameArr.push({ Label: this.itemAttrObj[this.itemIdArr[i]]["name"] }); //洗点道具名
                        this.imageArr.push({ img: "common/icon/item/" + this.itemAttrObj[this.itemIdArr[i]]["icon"] + ".png" }); //洗点道具图片
                    }
                    this.xidianArr = [{ Label: this.addObj[this.itemIdArr[0]].tizhi }, { Label: this.addObj[this.itemIdArr[1]].moli }, { Label: this.addObj[this.itemIdArr[2]].liliang }, { Label: this.addObj[this.itemIdArr[3]].naili }, { Label: this.addObj[this.itemIdArr[4]].minjie }, { Label: "" }];
                };
                /**使用物品 */
                RoleResetAttrMediator.prototype.use = function () {
                    var currentNumLab = this._viewUI.juanzhou_list.getCell(this.selectNum).getChildByName("currentNum_lab");
                    //如果物品数量够
                    if (this.initNum(this.itemIdArr[this.selectNum]) > 0) {
                        if (currentNumLab.text != "") { //如果不是选中回天神书
                            //判断已分配属性点是否大于0
                            if (parseInt(currentNumLab.text) > 0)
                                RequesterProtocols._instance.c2s_CAppend_Item(this.initPosition(this.itemIdArr[this.selectNum]), 0, this.myData["roleid"]); //使用物品
                            else { //如果未分配任何属性点，弹窗飘窗提示
                                this.showDisTips();
                                return;
                            }
                        }
                        else { //如果是选回天神书
                            //先判断是否有属性点点上了
                            var totalNum = 0;
                            for (var i = 0; i < 5; i++) {
                                var currentNumLab_1 = this._viewUI.juanzhou_list.getCell(i).getChildByName("currentNum_lab");
                                totalNum += Number(currentNumLab_1.text);
                            }
                            if (totalNum != 0) {
                                RequesterProtocols._instance.c2s_CAppend_Item(this.initPosition(this.itemIdArr[this.selectNum]), 0, this.myData["roleid"]); //使用物品
                            }
                            else {
                                this.showDisTips();
                                return;
                            }
                        }
                    }
                    else if (this.initNum(this.itemIdArr[this.selectNum]) == 0)
                        this._BuyKuaiJieMediator.init(this.shopIdArr[this.selectNum]); //快捷购买
                };
                /** 显示飘窗提示 */
                RoleResetAttrMediator.prototype.showDisTips = function () {
                    var msg = ChatModel.getInstance().chatMessageTips[150109]["msg"];
                    var disMsgTips = new modules.commonUI.DisappearMessageTipsMediator(this._app);
                    disMsgTips.onShow(msg);
                };
                /**快捷购买成功 */
                RoleResetAttrMediator.prototype.onNotifyBuySuccess = function (e) {
                    this.itemNumArr.length = 0;
                    //物品数量
                    for (var i = 0; i < this.itemIdArr.length; i++) {
                        this.itemNumArr.push({ Label: this.initNum(this.itemIdArr[i]) });
                    }
                    this.getListData();
                };
                /**刷新人物加点后的加点面板数值 */
                RoleResetAttrMediator.prototype.onRefreshDian = function (e) {
                    var data = RoleInfoModel.getInstance().SRefreshPointTypeData.get("data");
                    // 已分配点数
                    this.shuxingNumArr = [{ Label: data.bfp["cons_save"].get(data.pointscheme) }, { Label: data.bfp["iq_save"].get(data.pointscheme) }, { Label: data.bfp["str_save"].get(data.pointscheme) }, { Label: data.bfp["endu_save"].get(data.pointscheme) }, { Label: data.bfp["agi_save"].get(data.pointscheme) }, { Label: "" }];
                    this.itemNumArr.length = 0;
                    //物品数量
                    for (var i = 0; i < this.itemIdArr.length; i++) {
                        this.itemNumArr.push({ Label: this.initNum(this.itemIdArr[i]) });
                    }
                    this._viewUI.qianLI_tet.text = data.point.get(data.pointscheme); //潜力点
                    this.getListData();
                };
                /**刷新人物属性 */
                RoleResetAttrMediator.prototype.onRefreshRoleData = function (e) {
                    if (HudModel.getInstance().maxHpNum != 0)
                        this._viewUI.hp_lab.text = HudModel.getInstance().maxHpNum.toString(); //生命值
                    if (HudModel.getInstance().attackNum != 0)
                        this._viewUI.damage_lab.text = HudModel.getInstance().attackNum.toString(); //物理攻击
                    if (HudModel.getInstance().magicDefNum != 0)
                        this._viewUI.magicDef_lab.text = HudModel.getInstance().magicDefNum.toString(); //法术防御
                    if (HudModel.getInstance().speedNum != 0)
                        this._viewUI.speed_lab.text = HudModel.getInstance().speedNum.toString(); //速度
                    if (HudModel.getInstance().maxMpNum != 0)
                        this._viewUI.mp_lab.text = HudModel.getInstance().maxMpNum.toString(); //魔法值
                    if (HudModel.getInstance().magicAttackNum != 0)
                        this._viewUI.magicAttack_lab.text = HudModel.getInstance().magicAttackNum.toString(); //法术攻击
                    if (HudModel.getInstance().defendNum != 0)
                        this._viewUI.defend_lab.text = HudModel.getInstance().defendNum.toString(); //物理防御
                };
                /**获取道具数量 */
                RoleResetAttrMediator.prototype.initNum = function (itemid) {
                    var bag = game.modules.bag.models.BagModel.getInstance().bagMap;
                    this.bagItemArr.length = 0;
                    for (var i = 0; i < bag[1]["items"].length; i++) {
                        this.bagItemArr.push(bag[1]["items"][i]);
                    }
                    for (var i = 0; i < this.bagItemArr.length; i++) {
                        if (itemid == this.bagItemArr[i]["id"]) {
                            return this.bagItemArr[i]["number"];
                        }
                    }
                    return 0;
                };
                /**获得道具在背包中的key */
                RoleResetAttrMediator.prototype.initPosition = function (itemid) {
                    for (var i = 0; i < this.bagItemArr.length; i++) {
                        if (itemid == this.bagItemArr[i]["id"]) {
                            return this.bagItemArr[i]["key"];
                        }
                    }
                    return 0;
                };
                /**初始化界面数据 */
                RoleResetAttrMediator.prototype.init = function () {
                    this.myData = modules.createrole.models.LoginModel.getInstance().roleDetail;
                    this._viewUI.hp_lab.text = this.myData.maxhp.toString(); //生命值
                    this._viewUI.mp_lab.text = this.myData.maxmp.toString(); //魔法值
                    this._viewUI.damage_lab.text = this.myData.damage.toString(); //物理攻击
                    this._viewUI.magicAttack_lab.text = this.myData.magicattack.toString(); //法术攻击
                    this._viewUI.speed_lab.text = this.myData.speed.toString(); //速度
                    this._viewUI.defend_lab.text = this.myData.defend.toString(); //物理防御
                    this._viewUI.magicDef_lab.text = this.myData.magicdef.toString(); //法术防御
                    this._viewUI.qianLI_tet.text = this.myData.point.get(this.myData.pointscheme); //潜力点
                    this.shuxingNumArr = [{ Label: this.myData.bfp["cons_save"].get(this.myData.pointscheme) }, { Label: this.myData.bfp["iq_save"].get(this.myData.pointscheme) }, { Label: this.myData.bfp["str_save"].get(this.myData.pointscheme) }, { Label: this.myData.bfp["endu_save"].get(this.myData.pointscheme) }, { Label: this.myData.bfp["agi_save"].get(this.myData.pointscheme) }, { Label: "" }]; //初始化已分配点数
                };
                /**如果这些属性在界面打开之前有变化，重新初始化这些属性 */
                RoleResetAttrMediator.prototype.initShuxing = function () {
                    if (HudModel.getInstance().maxHpNum != 0)
                        this._viewUI.hp_lab.text = HudModel.getInstance().maxHpNum.toString(); //生命值
                    if (HudModel.getInstance().attackNum != 0)
                        this._viewUI.damage_lab.text = HudModel.getInstance().attackNum.toString(); //物理攻击
                    if (HudModel.getInstance().magicDefNum != 0)
                        this._viewUI.magicDef_lab.text = HudModel.getInstance().magicDefNum.toString(); //法术防御
                    if (HudModel.getInstance().speedNum != 0)
                        this._viewUI.speed_lab.text = HudModel.getInstance().speedNum.toString(); //速度
                    if (HudModel.getInstance().maxMpNum != 0)
                        this._viewUI.mp_lab.text = HudModel.getInstance().maxMpNum.toString(); //魔法值
                    if (HudModel.getInstance().magicAttackNum != 0)
                        this._viewUI.magicAttack_lab.text = HudModel.getInstance().magicAttackNum.toString(); //法术攻击
                    if (HudModel.getInstance().defendNum != 0)
                        this._viewUI.defend_lab.text = HudModel.getInstance().defendNum.toString(); //物理防御
                    var data = roleinfo.models.RoleInfoModel.getInstance().SRefreshPointTypeData.get("data");
                    if (data != undefined) {
                        // 已分配点数
                        this.shuxingNumArr = [{ Label: data.bfp["cons_save"].get(data.pointscheme) }, { Label: data.bfp["iq_save"].get(data.pointscheme) }, { Label: data.bfp["str_save"].get(data.pointscheme) }, { Label: data.bfp["endu_save"].get(data.pointscheme) }, { Label: data.bfp["agi_save"].get(data.pointscheme) }, { Label: "" }];
                        this._viewUI.qianLI_tet.text = data.point.get(data.pointscheme); //潜力点
                    }
                    this.itemNumArr.length = 0;
                    //物品数量
                    for (var i = 0; i < this.itemIdArr.length; i++) {
                        this.itemNumArr.push({ Label: this.initNum(this.itemIdArr[i]) });
                    }
                };
                /**初始化回天卷轴列表 */
                RoleResetAttrMediator.prototype.getListData = function () {
                    this._viewUI.juanzhou_list.vScrollBarSkin = "";
                    this._viewUI.juanzhou_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.juanzhou_list.scrollBar.elasticDistance = 50;
                    this._viewUI.juanzhou_list.repeatY = this.nameArr.length;
                    this._viewUI.juanzhou_list.array = this.nameArr;
                    this._viewUI.juanzhou_list.renderHandler = new Handler(this, this.onRender);
                    this._viewUI.juanzhou_list.selectHandler = new Handler(this, this.onSelect);
                    this._viewUI.juanzhou_list.selectedIndex = -1;
                };
                /**处理回天卷轴列表点击 */
                RoleResetAttrMediator.prototype.onSelect = function (index) {
                    if (index != -1) {
                        this.selectNum = index;
                        var juanzhouBtn = this._viewUI.juanzhou_list.getCell(this.selectNum).getChildByName("juanzhou_btn");
                        juanzhouBtn.skin = "common/ui/tongyong/btn1.png";
                        this._viewUI.juanzhou_list.selectedIndex = -1;
                    }
                };
                /**渲染回天卷轴列表 */
                RoleResetAttrMediator.prototype.onRender = function (cell, index) {
                    if (index > this.nameArr.length)
                        return;
                    var nameLab = cell.getChildByName("juanzhouName_lab");
                    var typeLab = cell.getChildByName("typeName_lab");
                    var xidianLab = cell.getChildByName("xidianNum_lab");
                    var specialLab = cell.getChildByName("special_lab");
                    var currentNumLab = cell.getChildByName("currentNum_lab");
                    var itemImg = cell.getChildByName("item_img");
                    var itemNunLab = cell.getChildByName("itemNum_lab");
                    var juanzhouBtn = cell.getChildByName("juanzhou_btn");
                    //渲染除选中按钮外，列表其他按钮的颜色
                    if (index != this.selectNum) {
                        juanzhouBtn.skin = "common/ui/tongyong/btn2.png";
                    }
                    nameLab.changeText(this.nameArr[index].Label);
                    typeLab.changeText(this.typeArr[index].Label);
                    xidianLab.changeText(this.xidianArr[index].Label);
                    specialLab.changeText(this.specialArr[index].Label);
                    currentNumLab.changeText(this.shuxingNumArr[index].Label);
                    itemNunLab.changeText(this.itemNumArr[index].Label + "/1");
                    itemImg.skin = this.imageArr[index].img;
                };
                RoleResetAttrMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                    this.initShuxing();
                    this.getListData();
                    this.onSelect(0);
                };
                RoleResetAttrMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    roleinfo.models.RoleInfoModel.getInstance().currentKey = 3;
                    modules.ModuleManager.show(modules.ModuleNames.ROLE_Info, this._app);
                };
                RoleResetAttrMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return RoleResetAttrMediator;
            }(game.modules.UiMediator));
            roleinfo.RoleResetAttrMediator = RoleResetAttrMediator;
        })(roleinfo = modules.roleinfo || (modules.roleinfo = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=RoleResetAttrMediator.js.map