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
        (function (family_1) {
            /** 加入帮派界面 (还没有公会) */
            var FamilyJoinViewMediator = /** @class */ (function (_super) {
                __extends(FamilyJoinViewMediator, _super);
                function FamilyJoinViewMediator(app) {
                    var _this = _super.call(this) || this;
                    /**客户端信息提示表 */
                    _this.chatMessageTips = game.modules.chat.models.ChatModel._instance.chatMessageTips;
                    /**当前列表点击的按钮 */
                    _this.familyBtn = null;
                    /** 当前列表点击的按钮被点击前的皮肤路径 */
                    _this.oldSkin = "";
                    /**选择的取消申请公会id */
                    _this.selectClanid = -1;
                    /** 申请公会列表页数 */
                    _this.currPage = 1; //默认申请第一页
                    /** 上一次数据刷新时，公会信息列表长度 */
                    _this.clanListLength = 0;
                    /** 数字小键盘 */
                    _this._xiaoJianPanMediator = new game.modules.tips.XiaoJianPanMediator(_this._viewUI);
                    /** 搜索时的帮派编号 */
                    _this.bianHao = 0;
                    /** 是否更新了下一页的公会列表数据 */
                    _this.isUpdateClanListData = false;
                    /** 帮派列表当前被选中的帮派帮主id */
                    _this.currClanMasterId = -1;
                    _this.uiLayer = app.uiRoot.general;
                    _this._viewUI = new ui.common.FamilyJiaRuUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, _this, _this.clickCloseBtn);
                    _this._viewUI.chaZhao_btn.on(LEvent.MOUSE_DOWN, _this, _this.searchClan); //查找公会
                    _this._viewUI.lianXiBangZhu_btn.on(LEvent.MOUSE_DOWN, _this, _this.onlianXiBangZhu); //联系帮主
                    _this._viewUI.xiaoChu_lab.on(LEvent.MOUSE_DOWN, _this, _this.onXiaochu);
                    _this._viewUI.familyBuild_btn.on(LEvent.MOUSE_DOWN, _this, _this.familyBuild);
                    family_1.models.FamilyProxy._instance.on(family_1.models.SOpenClanList, _this, _this.showFamily);
                    family_1.models.FamilyProxy._instance.on(family_1.models.SApplyClanList, _this, _this.showFamily);
                    family_1.models.FamilyProxy._instance.on(family_1.models.SClanAim, _this, _this.showClanAim);
                    game.modules.tips.models.TipsProxy.getInstance().on(game.modules.tips.models.TIPS_ON_OK, _this, _this.onApplyClan); //取消申请
                    family_1.models.FamilyProxy._instance.on(family_1.models.SSearchClan, _this, _this.searchClanResult); //搜索公会结果
                    family_1.models.FamilyProxy._instance.on(family_1.models.CloseJoinView, _this, _this.hide);
                    _this._xiaoJianPanMediator = new game.modules.tips.XiaoJianPanMediator(_this._viewUI);
                    _this._viewUI.familyBianHao_lab.on(LEvent.CLICK, _this, function () {
                        _this.isfirstClick = true;
                        _this._xiaoJianPanMediator.show();
                        _this._xiaoJianPanMediator.getView().x = 48;
                        _this._xiaoJianPanMediator.getView().y = 446;
                        game.modules.tips.models.TipsProxy.getInstance().on(game.modules.tips.models.ON_KRYBOARD, _this, _this.getKeyboardBtns);
                    });
                    return _this;
                }
                /**
                 * 显示所有帮派详细信息
                 */
                FamilyJoinViewMediator.prototype.showFamily = function () {
                    var family = this._viewUI.family_list;
                    var clanlist = family_1.models.FamilyModel.getInstance().clanlist;
                    var clanlistKeys = clanlist.keys;
                    if (clanlist.get(clanlistKeys[clanlistKeys.length - 1]) != undefined && clanlist.get(clanlistKeys[clanlistKeys.length - 1]).length != 0) {
                        this.isUpdateClanListData = true;
                    }
                    if (clanlist.get(clanlistKeys[clanlistKeys.length - 1]) != undefined && clanlist.get(clanlistKeys[clanlistKeys.length - 1]).length == 0) { //如果最新一页的的帮派列表数据为空，则最新一页的页数的上一页，就代表是最后一页
                        this.currPage = clanlistKeys[clanlistKeys.length - 2];
                    }
                    /** 临时存放公会列表信息数据 */
                    var tempClanList = [];
                    for (var i = 0; i < clanlistKeys.length; i++) {
                        if (clanlist.get(clanlistKeys[i]) != undefined) {
                            tempClanList = this.combineData(tempClanList, clanlist.get(clanlistKeys[i]));
                        }
                    }
                    if (tempClanList.length != 0) { //如果存放帮派列表数据的数组长度不为零
                        family.visible = true;
                        this.showFamilyList(tempClanList); //就显示出列表
                    }
                    else {
                        family.visible = false;
                    }
                };
                /**
                 * 把最新一页的公会列表数据和上一页的公会列表数据结合
                 */
                FamilyJoinViewMediator.prototype.combineData = function (lastData, newData) {
                    for (var index = 0; index < newData.length; index++) {
                        lastData.push(newData[index]);
                    }
                    return lastData;
                };
                /**
                 * 锁定公会信息列表视角
                 * @describe 该函数方法体中的10是指帮派信息列表每一页10个数据
                 */
                FamilyJoinViewMediator.prototype.onScrollTo = function (index) {
                    if (this._viewUI.family_list.array.length < 10)
                        return;
                    if (index != this._viewUI.family_list.array.length - 1)
                        return;
                    if (this._viewUI.family_list.array.length == 10) {
                        this.clanListLength = 10;
                        return;
                    }
                    //判断列表长度是否改变
                    if (this._viewUI.family_list.array.length > this.clanListLength) {
                        this._viewUI.family_list.scrollTo(this.clanListLength - 1);
                    }
                    this.clanListLength = this._viewUI.family_list.array.length;
                };
                /**显示公会列表 */
                FamilyJoinViewMediator.prototype.showFamilyList = function (list) {
                    var applyClanList = family_1.models.FamilyModel.getInstance().applyClanList; //申请过的列表
                    var applyClanListKeys = applyClanList.keys;
                    var applyList = applyClanList.get(applyClanListKeys[0]); //申请过的列表
                    //SaleModel._instance.showList(this._viewUI.family_list, list);
                    this._viewUI.family_list.vScrollBarSkin = "";
                    this._viewUI.family_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.family_list.scrollBar.elasticDistance = 50;
                    this._viewUI.family_list.array = list;
                    if (this._viewUI.family_list.array.length <= 10) {
                        this._viewUI.family_list.repeatY = 10;
                    }
                    else {
                        this._viewUI.family_list.repeatY = this._viewUI.family_list.array.length;
                    }
                    this._viewUI.family_list.spaceY = 10;
                    this._viewUI.family_list.renderHandler = new Handler(this, this.FamilyRender, [list, applyList]);
                    this._viewUI.family_list.selectHandler = new Handler(this, this.FamilySelect, [list]);
                    this._viewUI.family_list.scrollBar.changeHandler = new Handler(this, this.onListScrollBarChange);
                };
                /**
                 * 判断滚动条位置是否到底部
                 */
                FamilyJoinViewMediator.prototype.onListScrollBarChange = function (value) {
                    if (value == this._viewUI.family_list.scrollBar.max) { //如果公会信息列表拉到底部
                        if (this.isUpdateClanListData) {
                            this.isUpdateClanListData = false;
                            this.COpenClanList(this.currPage++); //申请新的数据
                        }
                    }
                    if (value == this._viewUI.family_list.scrollBar.min) {
                        this._viewUI.family_list.scrollTo(0);
                    }
                };
                FamilyJoinViewMediator.prototype.FamilyRender = function (list, applyList, cell, index) {
                    var id = list[index].index; //序号
                    var clanname = list[index].clanname; //公会名称
                    var membernum = list[index].membernum; //公会人数
                    var clanlevel = list[index].clanlevel; //公会等级
                    var clanmastername = list[index].clanmastername; //会长名字
                    var oldclanname = list[index].oldclanname; //公会曾用名
                    var clanid = list[index].clanid; //公会key
                    var familyNolab = cell.getChildByName("familyNo_lab");
                    familyNolab.text = id;
                    var familyNamelab = cell.getChildByName("familyName_lab");
                    familyNamelab.text = clanname;
                    var familyLvlab = cell.getChildByName("familyLv_lab");
                    familyLvlab.text = clanlevel;
                    var familyNumberlab = cell.getChildByName("familyNumber_lab");
                    familyNumberlab.text = membernum + "/" + "100"; //公会的总的人数 需要获取
                    var familyBangZhulab = cell.getChildByName("familyBangZhu_lab");
                    familyBangZhulab.text = clanmastername;
                    var selectrolebtn = cell.getChildByName("selectrole_btn");
                    if (cell == this.familyBtn) {
                        selectrolebtn.skin = "common/ui/tongyong/common_list_3textbg_dwn.png";
                    }
                    else if (index % 2 == 0) {
                        selectrolebtn.skin = "common/ui/tongyong/common_list_3textbg2.png";
                    }
                    else {
                        selectrolebtn.skin = "common/ui/tongyong/common_xuanzhongkuang.png";
                    }
                    selectrolebtn.on(LEvent.MOUSE_UP, this, this.onSelectrolebtn, [cell, index]);
                    var isApplyClanbtn = cell.getChildByName("isApplyClan_btn");
                    isApplyClanbtn.visible = false;
                    if (applyList != undefined) { //是否有人申请
                        for (var i = 0; i < applyList.length; i++) {
                            var clankey = applyList[i].clankey; //公会key
                            var applystate = applyList[i].applystate; //申请状态 0取消  1申请中
                            if (clanid == clankey && applystate == 1) {
                                isApplyClanbtn.visible = true;
                            }
                        }
                    }
                    isApplyClanbtn.on(LEvent.MOUSE_DOWN, this, this.onisApplyClanbtn, [clanid, clanname]);
                    this.onScrollTo(index);
                };
                /**点击效果 */
                FamilyJoinViewMediator.prototype.onSelectrolebtn = function (cell, index) {
                    var selectrolebtn = cell.getChildByName("selectrole_btn");
                    this.oldSkin = selectrolebtn.skin;
                    selectrolebtn.selected = true;
                    if (this.familyBtn == null) {
                        this.familyBtn = cell;
                        return;
                    }
                    if (this.familyBtn != cell) {
                        var oldFamilyBtn = this.familyBtn.getChildByName("selectrole_btn");
                        oldFamilyBtn.selected = false;
                        oldFamilyBtn.skin = this.oldSkin;
                        this.familyBtn = cell;
                    }
                };
                /**公会列表选择 */
                FamilyJoinViewMediator.prototype.FamilySelect = function (list, index) {
                    if (this._viewUI.family_list.selectedIndex != -1) {
                        var clanid = list[index].clanid; //公会id
                        this.CRequestClanAim(clanid);
                        this._viewUI.familyApply_btn.disabled = false;
                        var clanmasterid = list[index].clanmasterid; //会长id
                        this.currClanMasterId = clanmasterid;
                        var roleid = game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid;
                        if (roleid != clanmasterid) {
                            this._viewUI.lianXiBangZhu_btn.disabled = false;
                        }
                        else {
                            this._viewUI.lianXiBangZhu_btn.disabled = true;
                        }
                        this._viewUI.familyApply_btn.on(LEvent.MOUSE_DOWN, this, this.applyClan, [clanid]);
                        this._viewUI.family_list.selectedIndex = -1;
                    }
                };
                /**
                 * 申请入会
                 */
                FamilyJoinViewMediator.prototype.applyClan = function (clanid) {
                    this.CApplyClan(clanid);
                };
                /**
                 * 取消申请入会提示
                 */
                FamilyJoinViewMediator.prototype.onisApplyClanbtn = function (clanid, clanname) {
                    this.selectClanid = clanid;
                    var parame = new Dictionary();
                    parame.set("contentId", 150138);
                    var _paramArray = [clanname];
                    parame.set("parame", _paramArray);
                    this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
                    this._TipsMessageMediator.show();
                    this._TipsMessageMediator.showContent(parame);
                };
                /**
                 * 确定取消申请入会
                 */
                FamilyJoinViewMediator.prototype.onApplyClan = function () {
                    this.CancelApplyClan(this.selectClanid);
                };
                /**
                 * 显示公会宗旨
                 */
                FamilyJoinViewMediator.prototype.showClanAim = function () {
                    this._viewUI.aim_box.visible = true;
                    var clanid = family_1.models.FamilyModel.getInstance().clanid;
                    var clanaim = family_1.models.FamilyModel.getInstance().clanaim;
                    var oldclanname = family_1.models.FamilyModel.getInstance().oldclanname;
                    this._viewUI.familyZongZhi_lab.text = clanaim;
                    this._viewUI.familyOldName_lab.text = oldclanname;
                };
                /** 小键盘按钮监听 */
                FamilyJoinViewMediator.prototype.getKeyboardBtns = function (index) {
                    if (index == 0) { //数字键0
                        if (this._viewUI.familyBianHao_lab.text == "0" || this._viewUI.familyBianHao_lab.text == "点击这里输入帮派编号" || this.isfirstClick) {
                            this.bianHao = 0;
                        }
                        else {
                            this.bianHao *= 10;
                        }
                    }
                    else if (index > 0) { //数字键1-9
                        if (this._viewUI.familyBianHao_lab.text == "0" || this._viewUI.familyBianHao_lab.text == "点击这里输入帮派编号" || this.isfirstClick) {
                            this.bianHao = index;
                        }
                        else {
                            this.bianHao += index;
                        }
                    }
                    else if (index == -1) { //回退键
                        if (this._viewUI.familyBianHao_lab.text == "0" || this._viewUI.familyBianHao_lab.text == "点击这里输入帮派编号" || this.isfirstClick) {
                            this.bianHao = 0;
                        }
                        else {
                            this.bianHao = Math.floor(this.bianHao / 10);
                        }
                    }
                    if (index == -2 && this.isfirstClick && this._viewUI.familyBianHao_lab.text == "点击这里输入帮派编号") {
                        return;
                    }
                    this.isfirstClick = false;
                    this._viewUI.familyBianHao_lab.text = this.bianHao + "";
                };
                /**
                 * 查找公会
                 */
                FamilyJoinViewMediator.prototype.searchClan = function () {
                    var familyBianHao_lab = this._viewUI.familyBianHao_lab.text;
                    if (familyBianHao_lab != "点击这里输入帮派编号") {
                        var clanid = parseInt(familyBianHao_lab);
                        this.CSearchClan(clanid);
                        this._viewUI.xiaoChu_lab.visible = true;
                    }
                    else {
                        this.DisappearMessageTipsMediator = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                        this.DisappearMessageTipsMediator.onShow(this.chatMessageTips[160312].msg);
                    }
                };
                /**
                 * 公会搜索结果显示
                 */
                FamilyJoinViewMediator.prototype.searchClanResult = function () {
                    var searchClanResult = family_1.models.FamilyModel.getInstance().searchClanlist;
                    if (searchClanResult.length > 0) {
                        this._viewUI.family_list.visible = true;
                        this._viewUI.nullFamily_box.visible = false;
                        this.showFamilyList(searchClanResult);
                    }
                    else {
                        this._viewUI.nullFamily_box.visible = true;
                        this._viewUI.family_list.visible = false;
                    }
                };
                /**
                 * 清除搜索文字
                 */
                FamilyJoinViewMediator.prototype.onXiaochu = function () {
                    this._viewUI.familyBianHao_lab.text = "点击这里输入帮派编号";
                    this._viewUI.xiaoChu_lab.visible = false;
                    this._viewUI.nullFamily_box.visible = false;
                    this.showFamily();
                };
                /******************************************************************************************** */
                /**
                 * 客户端请求公会列表：没有公会
                 * @param currpage 当前页
                 */
                FamilyJoinViewMediator.prototype.COpenClanList = function (currpage) {
                    RequesterProtocols._instance.c2s_COpenClanList(currpage);
                };
                /**创建公会 */
                FamilyJoinViewMediator.prototype.familyBuild = function () {
                    this._FamilyCreatViewMediator = new family_1.FamilyCreatViewMediator(this._app);
                    this.hide();
                    game.modules.createrole.models.LoginModel.getInstance().CommonPage = "family";
                    this._FamilyCreatViewMediator.show();
                };
                /**
                 * 客户端请求公会宗旨
                 * @param clanid 公会id
                 */
                FamilyJoinViewMediator.prototype.CRequestClanAim = function (clanid) {
                    RequesterProtocols._instance.c2s_CRequestClanAim(clanid);
                };
                /**
                 * 申请入会请求
                 * @param clanid 公会id
                 */
                FamilyJoinViewMediator.prototype.CApplyClan = function (clanid) {
                    family_1.models.FamilyProxy._instance.once(family_1.models.SOpenClan, this, this.showClanInfo);
                    RequesterProtocols._instance.c2s_CApplyClan(clanid);
                };
                /** 显示公会信息 */
                FamilyJoinViewMediator.prototype.showClanInfo = function () {
                    if (this._viewUI.visible) {
                        this.hide();
                        modules.ModuleManager.show(modules.ModuleNames.haveFamily, this._app);
                    }
                };
                /**
                 * 取消公会申请
                 * @param clanid
                 */
                FamilyJoinViewMediator.prototype.CancelApplyClan = function (clanid) {
                    RequesterProtocols._instance.c2s_CCancelApplyClan(clanid);
                };
                /**
                 * 搜索公会
                 * @param clanid
                 */
                FamilyJoinViewMediator.prototype.CSearchClan = function (clanid) {
                    RequesterProtocols._instance.c2s_CSearchClan(clanid);
                };
                /**联系帮主 */
                FamilyJoinViewMediator.prototype.onlianXiBangZhu = function () {
                    this.hide();
                    if (this.currClanMasterId != -1) {
                        RequesterProtocols._instance.c2s_CRequestUpdateRoleInfo(this.currClanMasterId);
                    }
                    modules.ModuleManager.show(modules.ModuleNames.FRIEND, this._app);
                };
                FamilyJoinViewMediator.prototype.show = function () {
                    this.COpenClanList(this.currPage);
                    this._viewUI.aim_box.visible = false;
                    this._viewUI.familyApply_btn.disabled = true;
                    this._viewUI.lianXiBangZhu_btn.disabled = true;
                    this._viewUI.nullFamily_box.visible = false;
                    this._viewUI.xiaoChu_lab.visible = false;
                    if (this.familyBtn != null) {
                        var oldFamilyBtn = this.familyBtn.getChildByName("selectrole_btn");
                        oldFamilyBtn.selected = false;
                        this.familyBtn = null;
                    }
                    var clankey = game.modules.mainhud.models.HudModel._instance.clankey;
                    if (clankey > 0) {
                        this.hideBtn();
                    }
                    else {
                        this.reShowBtn();
                    }
                    _super.prototype.show.call(this);
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.OPEN_EVENT);
                };
                /** 当没有帮派的情况下，重新显现部分按钮 */
                FamilyJoinViewMediator.prototype.reShowBtn = function () {
                    this._viewUI.familyApply_btn.visible = true;
                    this._viewUI.familyBuild_btn.visible = true;
                };
                /** 有帮派的情况下，隐藏部分按钮 */
                FamilyJoinViewMediator.prototype.hideBtn = function () {
                    this._viewUI.familyApply_btn.visible = false;
                    this._viewUI.familyBuild_btn.visible = false;
                };
                FamilyJoinViewMediator.prototype.clickCloseBtn = function () {
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.CLOSEVIEW_EVENT);
                    if (LoginModel.getInstance().CommonPage != "") {
                        family_1.models.FamilyModel.getInstance().clanCurrenTabNum = 1;
                        modules.ModuleManager.show(LoginModel.getInstance().CommonPage, this._app);
                        LoginModel.getInstance().CommonPage = "";
                    }
                    this.hide();
                };
                FamilyJoinViewMediator.prototype.hide = function () {
                    this.currPage = 1;
                    this.clanListLength = 0;
                    _super.prototype.hide.call(this);
                    if (this.familyBtn != null) {
                        var oldFamilyBtn = this.familyBtn.getChildByName("selectrole_btn");
                        oldFamilyBtn.selected = false;
                        oldFamilyBtn.skin = this.oldSkin;
                    }
                };
                FamilyJoinViewMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return FamilyJoinViewMediator;
            }(game.modules.ModuleMediator));
            family_1.FamilyJoinViewMediator = FamilyJoinViewMediator;
        })(family = modules.family || (modules.family = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=FamilyJoinViewMediator.js.map