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
            /** 帮派信息界面 */
            var FamilyInfoViewMediator = /** @class */ (function (_super) {
                __extends(FamilyInfoViewMediator, _super);
                function FamilyInfoViewMediator(uiLayer, app) {
                    var _this = _super.call(this, uiLayer) || this;
                    /**职业配置表 */
                    _this.schoolInfo = LoginModel.getInstance().schoolInfo;
                    /**权限表 */
                    _this.clanCFactionPositionData = family.models.FamilyModel.getInstance().clanCFactionPositionData;
                    /**公会宗旨 */
                    _this.currentClanAim = "";
                    /** 本人角色id */
                    _this._selfRoleId = LoginModel.getInstance().roleDetail.roleid;
                    _this._app = app;
                    _this._viewUI = new ui.common.FamilyInfoUI();
                    _this.isCenter = false;
                    _this._viewUI.familyTiShi_box.visible = false;
                    _this._viewUI.familyInfoBtn_tab.selectHandler = new Handler(_this, _this.showClan);
                    /**修改宗旨 */
                    _this._viewUI.modifyZongZhi_btn.on(LEvent.MOUSE_DOWN, _this, _this.ChangeAim);
                    /**修改名称 */
                    _this._viewUI.familyTiShi_btn.on(LEvent.MOUSE_DOWN, _this, _this.ChangeClanName);
                    /**帮派升级 */
                    _this._viewUI.clanShengji_btn.on(LEvent.MOUSE_DOWN, _this, _this.clanLevelUp);
                    /**帮派领地 */
                    _this._viewUI.familylingdi_btn.on(LEvent.MOUSE_DOWN, _this, _this.goFamilyMap);
                    family.models.FamilyProxy._instance.on(family.models.SOpenClan, _this, _this.flushClanInfo);
                    family.models.FamilyProxy._instance.on(family.models.SChangeClanAim, _this, _this.flushClanAim);
                    /**修改名称返回  */
                    family.models.FamilyProxy._instance.on(family.models.SChangeClanName, _this, _this.flushClanName);
                    family.models.FamilyProxy._instance.on(family.models.SClanLevelup, _this, _this.flushData);
                    _this._viewUI.ziJinTips_btn.on(LEvent.MOUSE_DOWN, _this, _this.ziJinTips);
                    return _this;
                }
                /**刷新数据 */
                FamilyInfoViewMediator.prototype.flushData = function () {
                    this._viewUI.familyInfoBtn_tab.selectedIndex = 0;
                    this.showClan(0);
                };
                FamilyInfoViewMediator.prototype.showClan = function (index) {
                    this._viewUI.familyInfo_view.selectedIndex = index;
                    switch (index) {
                        case 0:
                            this.showClanInfo();
                            break;
                        case 1:
                            this.ClanManager();
                            break;
                    }
                };
                /**刷新公会信息 */
                FamilyInfoViewMediator.prototype.flushClanInfo = function () {
                    this.showClanInfo();
                    this.showClanMember();
                };
                /**
                 * 帮派信息
                 */
                FamilyInfoViewMediator.prototype.showClanInfo = function () {
                    var clanInfo = family.models.FamilyModel.getInstance().clanInfo;
                    var clanname = clanInfo[0].clanname; //名称
                    var clanid = clanInfo[0].clanid; //id
                    var clanlevel = clanInfo[0].clanlevel; //等级
                    var membersnum = clanInfo[0].membersnum; //成员数量
                    var clanmaster = clanInfo[0].clanmaster; //现任会长
                    var clanaim = clanInfo[0].clanaim; //宗旨
                    this.currentClanAim = clanaim;
                    this._viewUI.familyName_lab.text = clanname;
                    this._viewUI.familyId_lab.text = clanid;
                    this._viewUI.familyLv_lab.text = clanlevel;
                    this._viewUI.familyNumber_lab.text = membersnum + "/100";
                    this._viewUI.familyBangZhu_lab.text = clanmaster;
                    this._viewUI.familyZongZhi_lab.text = clanaim;
                };
                /**
                 * 帮派管理
                 */
                FamilyInfoViewMediator.prototype.ClanManager = function () {
                    var clanInfo = family.models.FamilyModel.getInstance().clanInfo;
                    var house = clanInfo[0].house; //公会的建筑
                    var houseKeys = house.keys;
                    var money = clanInfo[0].money; //公会的钱
                    var costeverymoney = clanInfo[0].costeverymoney; //公会每天花费的钱
                    var jinkuLevel = 0; //金库等级
                    var yaofangLevel = 0; //药房等级
                    var lvguanLevel = 0; //旅店等级
                    for (var i = 0; i < houseKeys.length; i++) {
                        var houseId = houseKeys[i];
                        var level = house.get(houseId);
                        if (houseId == 2) { //公会金库
                            jinkuLevel = level;
                        }
                        else if (houseId == 3) { //公会药房
                            yaofangLevel = level;
                        }
                        else if (houseId == 4) { //公会旅馆
                            lvguanLevel = level;
                        }
                    }
                    this._viewUI.lvJinKu_lab.text = jinkuLevel + "";
                    this._viewUI.lvYaoFang_lab.text = yaofangLevel + "";
                    this._viewUI.lvLvguan_lab.text = lvguanLevel + "";
                    this._viewUI.familyZiJin_lab.text = money.toLocaleString();
                    this._viewUI.costWeiHu_lab.text = costeverymoney.toLocaleString() + "/天";
                };
                FamilyInfoViewMediator.prototype.ziJinTips = function () {
                    var clanInfo = family.models.FamilyModel.getInstance().clanInfo;
                    //公会的建筑
                    var house = clanInfo[0].house;
                    var houseKeys = house.keys;
                    //金库等级
                    var jinkuLevel = 0;
                    for (var i = 0; i < houseKeys.length; i++) {
                        if (houseKeys[i] == 2) { //公会金库
                            jinkuLevel = house.get(houseKeys[i]);
                        }
                    }
                    var param = [];
                    param.push((10000000 + jinkuLevel * 15000000) / 10000);
                    var promoto = HudModel.getInstance().promptAssembleBack(PromptExplain.BANGPAI_ZIJIN_UP, param);
                    this.DisappearMessageTipsMediator = new modules.commonUI.DisappearMessageTipsMediator(this._app);
                    this.DisappearMessageTipsMediator.onShow(promoto);
                };
                /**
                 * 显示公会成员
                 */
                FamilyInfoViewMediator.prototype.showClanMember = function () {
                    var clanInfo = family.models.FamilyModel.getInstance().clanInfo;
                    var memberlist = clanInfo[0].memberlist;
                    var member = [];
                    this._onlineMemberInfoData = [];
                    var _tempDic = new Laya.Dictionary();
                    for (var i = 0; i < memberlist.length; i++) {
                        var memberinfo = memberlist[i];
                        if (memberinfo.roleid == this._selfRoleId) {
                            family.models.FamilyModel.getInstance()._selfInClanInfo = memberinfo;
                        }
                        if (memberinfo.lastonlinetime == 0) {
                            _tempDic.set(memberinfo.roleid, memberinfo);
                            this._onlineMemberInfoData.push(memberinfo);
                            var rolename = memberinfo.rolename; //名称
                            var rolelevel = memberinfo.rolelevel; //等级
                            var school = memberinfo.school; //职业
                            var m_school = this.schoolInfo[school].name;
                            var position = memberinfo.position; //职位
                            var m_position = this.clanCFactionPositionData[position].posname;
                            member.push({ lName_lab: rolename, lLv_lab: rolelevel, lZhiWu_lab: m_position, lZhiYe_lab: m_school });
                        }
                    }
                    family.models.FamilyModel.getInstance().menmbersInfoDic = _tempDic;
                    this.selectedMemberBtn = undefined;
                    SaleModel._instance.showList(this._viewUI.online_list, member);
                    this._viewUI.online_list.renderHandler = new Laya.Handler(this, this.onlineLstRender);
                    this._viewUI.online_list.selectHandler = new Laya.Handler(this, this.onlineLstSelect);
                    this._viewUI.numberZaiXian_lab.text = member.length.toString();
                };
                /** 在线成员列表的点击 */
                FamilyInfoViewMediator.prototype.onlineLstSelect = function (index) {
                    var remenber_btn = this._viewUI.online_list.getCell(index).getChildByName("remenber_btn");
                    remenber_btn.skin = "common/ui/tongyong/common_list_3textbg_dwn.png";
                    this.selectedMemberBtn = remenber_btn;
                };
                /** 在线成员列表的渲染 */
                FamilyInfoViewMediator.prototype.onlineLstRender = function (cell, index) {
                    var memberinfo = this._onlineMemberInfoData[index];
                    var lName_lab = cell.getChildByName("lName_lab");
                    var lLv_lab = cell.getChildByName("lLv_lab");
                    var lZhiWu_lab = cell.getChildByName("lZhiWu_lab");
                    var lZhiYe_lab = cell.getChildByName("lZhiYe_lab");
                    if (memberinfo.roleid == this._selfRoleId) {
                        lName_lab.color = "#13ff00";
                        lLv_lab.color = "#13ff00";
                        lZhiWu_lab.color = "#13ff00";
                        lZhiYe_lab.color = "#13ff00";
                    }
                    else {
                        lName_lab.color = "#50321A";
                        lLv_lab.color = "#50321A";
                        lZhiWu_lab.color = "#50321A";
                        lZhiYe_lab.color = "#50321A";
                    }
                    var remenber_btn = cell.getChildByName("remenber_btn");
                    if (index % 2 == 0) {
                        remenber_btn.skin = "common/ui/tongyong/common_list_3textbg2.png";
                    }
                    else {
                        remenber_btn.skin = "common/ui/tongyong/common_list_3textbg.png";
                    }
                    if (this.selectedMemberBtn && this.selectedMemberBtn == remenber_btn) {
                        remenber_btn.skin = "common/ui/tongyong/common_list_3textbg_dwn.png";
                    }
                    remenber_btn.on(Laya.Event.CLICK, this, this.getMousePos, [index]);
                };
                /** 获取当前鼠标点击位置 */
                FamilyInfoViewMediator.prototype.getMousePos = function (index, e) {
                    if (e) {
                        this._xPos = e.currentTarget.mouseX;
                        this._yPos = e.currentTarget.mouseY;
                    }
                    var memberinfo = this._onlineMemberInfoData[index];
                    if (memberinfo.roleid != this._selfRoleId) {
                        var _FamilyContactCharacterViewMediator = new family.FamilyContactCharacterViewMediator(this._viewUI, this._app, index, this._xPos, this._yPos);
                    }
                };
                /**
                 * 修改宗旨
                 */
                FamilyInfoViewMediator.prototype.ChangeAim = function () {
                    var clanInfo = family.models.FamilyModel.getInstance().clanInfo;
                    var roleId = LoginModel.getInstance().roleDetail.roleid;
                    var position = family.models.FamilyModel.getInstance().RefreshPosition.get(roleId);
                    var changeidea = this.clanCFactionPositionData[position].changeidea;
                    if (changeidea == ClanPermissions.OK) {
                        this._FamilyChangeAimViewMediator = new family.FamilyChangeAimViewMediator(this._viewUI, this._app);
                        this._FamilyChangeAimViewMediator.show();
                        this._FamilyChangeAimViewMediator.changeClanAim(this.currentClanAim);
                    }
                    else {
                        var _tipsMsg = ChatModel.getInstance().chatMessageTips[150127]["msg"];
                        this.showTipsMsg(_tipsMsg);
                    }
                };
                /**
                 * 新的宗旨
                 */
                FamilyInfoViewMediator.prototype.flushClanAim = function (newAim) {
                    this.currentClanAim = newAim;
                    this._viewUI.familyZongZhi_lab.text = newAim;
                };
                /**
                 * 修改名称
                 */
                FamilyInfoViewMediator.prototype.ChangeClanName = function () {
                    this._viewUI.familyTiShi_box.visible = true;
                    var clanInfo = family.models.FamilyModel.getInstance().clanInfo;
                    var clancreator = clanInfo[0].clancreator;
                    var clancreatorid = clanInfo[0].clancreatorid;
                    var oldclanname = clanInfo[0].oldclanname;
                    var clanname = clanInfo[0].clanname;
                    this._viewUI.createRole_lab.text = clancreator;
                    this._viewUI.createId_lab.text = clancreatorid;
                    this._viewUI.familyOldName_lab.text = oldclanname;
                    this._viewUI.bg_img.on(LEvent.MOUSE_DOWN, this, this.onBgImg);
                    this._viewUI.changeClanName_btn.on(LEvent.MOUSE_DOWN, this, this.onChangeName, [clanname]);
                };
                FamilyInfoViewMediator.prototype.onChangeName = function (clanname) {
                    this.onBgImg();
                    var clanInfo = family.models.FamilyModel.getInstance().clanInfo;
                    var roleId = LoginModel.getInstance().roleDetail.roleid;
                    var position = family.models.FamilyModel.getInstance().RefreshPosition.get(roleId);
                    var changefactionname = this.clanCFactionPositionData[position].changefactionname;
                    if (changefactionname == ClanPermissions.OK) {
                        this._FamilyChangeClanNameViewMediator = new family.FamilyChangeClanNameViewMediator(this._viewUI, this._app);
                        this._FamilyChangeClanNameViewMediator.show();
                        this._FamilyChangeClanNameViewMediator.showChangeNameCost(clanname);
                    }
                    else {
                        var _tipsMsg = ChatModel.getInstance().chatMessageTips[150127]["msg"];
                        this.showTipsMsg(_tipsMsg);
                    }
                };
                /** 显示飘窗提示信息消息 */
                FamilyInfoViewMediator.prototype.showTipsMsg = function (msg) {
                    var _disapperTipsMsg = new modules.commonUI.DisappearMessageTipsMediator(this._app);
                    _disapperTipsMsg.onShow(msg);
                };
                FamilyInfoViewMediator.prototype.flushClanName = function (newName) {
                    this._viewUI.familyName_lab.text = newName;
                };
                FamilyInfoViewMediator.prototype.onBgImg = function () {
                    this._viewUI.familyTiShi_box.visible = false;
                };
                /**
                 * 帮派升级
                 */
                FamilyInfoViewMediator.prototype.clanLevelUp = function () {
                    family.models.FamilyProxy._instance.event(family.models.CloseModule);
                    this._FamilyLevelUpViewMediator = new family.FamilyLevelUpViewMediator(this._app);
                    this._FamilyLevelUpViewMediator.show();
                };
                /**公会地图 */
                FamilyInfoViewMediator.prototype.goFamilyMap = function () {
                    // game.modules.mainhud.models.HudModel._instance.jumpmap(1711)
                    game.modules.mainhud.models.HudModel._instance.useapp = this._app;
                    game.modules.mainhud.models.HudModel._instance.getpost(1711);
                    var mainUnit = this._app.sceneObjectMgr.mainUnit;
                    RequesterProtocols._instance.c2s_CEnterClanMap();
                    // RequesterProtocols._instance.c2s_req_goto(1711, parseInt(mainUnit.pos.x.toFixed(0)), parseInt(mainUnit.pos.y.toFixed(0)));
                    modules.ModuleManager.hide(modules.ModuleNames.haveFamily);
                };
                /**显示红点 */
                FamilyInfoViewMediator.prototype.showRedDot = function () {
                    this.FamilyMemberViewMediator = new family.FamilyMemberViewMediator(this._viewUI, this._app);
                    this.FamilyMemberViewMediator.CRequestApplyList();
                };
                /*************************************************************************************** */
                /**
                 * 公会信息请求
                 */
                FamilyInfoViewMediator.prototype.COpenClan = function () {
                    RequesterProtocols._instance.c2s_COpenClan();
                };
                FamilyInfoViewMediator.prototype.show = function () {
                    this.COpenClan();
                    this.showRedDot();
                    _super.prototype.show.call(this);
                };
                FamilyInfoViewMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                FamilyInfoViewMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return FamilyInfoViewMediator;
            }(game.modules.UiMediator));
            family.FamilyInfoViewMediator = FamilyInfoViewMediator;
        })(family = modules.family || (modules.family = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=FamilyInfoViewMediator.js.map