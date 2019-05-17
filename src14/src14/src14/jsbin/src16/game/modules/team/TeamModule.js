/**
* name
*/
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
var switchUI;
(function (switchUI) {
    switchUI[switchUI["CreateTeam"] = 1] = "CreateTeam";
    switchUI[switchUI["ExitTeam"] = 2] = "ExitTeam";
})(switchUI || (switchUI = {}));
// import TeamSetMediator = game.modules.team.TeamSetMediator;
var game;
(function (game) {
    var modules;
    (function (modules) {
        var team;
        (function (team) {
            var TeamModule = /** @class */ (function (_super) {
                __extends(TeamModule, _super);
                function TeamModule(app) {
                    var _this = _super.call(this) || this;
                    _this.schoolInfo = {};
                    /** 队伍信息 */
                    _this.roleInfo = [];
                    /** 申请者数据 */
                    _this.applicationInfo = [];
                    _this.isInit = false;
                    /** 伙伴之间交换位置的flag */
                    _this.shadowFlag = false;
                    /** 委任指挥的flag */
                    _this.AppointedConductoFlag = false;
                    /** 点击时伙伴的下标 */
                    _this.huoBanINdex = -1;
                    /** 队长和队友的长度数 */
                    _this.teamMember = 0;
                    /** 交换队员的位置 */
                    _this.swapPosIndex = -1;
                    /** 是否是队员 */
                    _this.isMmeber = false;
                    _this.uiLayer = app.uiRoot.general;
                    _this._viewUI = new ui.common.TeamUI();
                    //this._loginView = new ui.common.LoginUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this.model = new ModelsCreate();
                    // this._SystemMediator =  new SystemMediator(app);
                    // Network._instance.addHanlder(ProtocolsEnum.SEnterWorld, this, this.onEnterWorld);
                    _this._huoBanZhuZhan = new HuoBanModule(app);
                    _this._RemindViewMediator = new RemindViewMediator(app.uiRoot.general, app);
                    _this._ZhenFaGuangHuanMediator = new ZhenFaGuangHuanMediator(app);
                    _this._InviteFriendsMediator = new InviteFriendsMediator(app.uiRoot.general, app);
                    _this._TeamSetMediator = new team.TeamSetMediator(app);
                    _this._TeamMateViewMediator = new TeamMateViewMediator(app.uiRoot.general, app);
                    _this._BattleInstructionMediator = new BattleInstructionMediator(app.uiRoot.general, app);
                    _this._EditWindowMediator = new EditWindowMediator(app.uiRoot.general, app);
                    _this._TeamOrganizeMediator = new team.TeamOrganizeMediator(_this._app);
                    _this._RedPacketMediator = new modules.redPacket.RedPacketMediator(_this._app);
                    _this.initialize();
                    return _this;
                }
                /**初始化 */
                TeamModule.prototype.initialize = function () {
                    this.ani = new Laya.Animation();
                    this.dianImg = new Laya.Image();
                };
                TeamModule.prototype.onLoad = function () {
                    /** 这里加上界面初始化的所有点击事件和通信事件等 */
                    this.registerEvent();
                    this._initConfigurationTable();
                    this.refreshTeamData();
                    this.initIsMatch();
                    this.updZhenFa();
                };
                /** 刷新阵法数据 */
                TeamModule.prototype.updZhenFa = function () {
                    var chattext = game.modules.tips.models.TipsModel._instance.cstringResConfigData[3];
                    if (HuoBanModel.getInstance().zrhuobanlist.length != 0) { //是否有阵容
                        var aa = HuoBanModel.getInstance().zrhuobanlist;
                        var zr = HuoBanModel.getInstance().zrhuobanlist[HuoBanModel.getInstance().currentzrid];
                        if (typeof (zr) == "undefined") {
                            this._viewUI.zhenfa_btn.label = "无阵法";
                            return;
                        }
                        var zfinfo = LoginModel.getInstance().roleDetail.learnedFormsMap.get(zr.zhenfa);
                        if (zfinfo != null) {
                            var zhenfa = HuoBanModel.getInstance().FormationbaseConfigData[zr.zhenfa];
                            this._viewUI.zhenfa_btn.label = zfinfo.level + chattext.msg + zhenfa.name;
                        }
                        else
                            this._viewUI.zhenfa_btn.label = "无阵法";
                    }
                    else {
                        var zfinfo = LoginModel.getInstance().roleDetail.learnedFormsMap.get(HuoBanModel.getInstance().currentzf[HuoBanModel.getInstance().currentzr]);
                        var zhenfa = HuoBanModel.getInstance().FormationbaseConfigData[HuoBanModel.getInstance().currentzf[HuoBanModel.getInstance().currentzr]];
                        if (zfinfo != null)
                            this._viewUI.zhenfa_btn.label = zfinfo.level + chattext.msg + zhenfa.name;
                    }
                };
                /** 判断是否在匹配状态 */
                TeamModule.prototype.initIsMatch = function () {
                    var state = TeamModel.getInstance().matchFlag;
                    if (state == true) { /** 在线匹配状态 */
                        this._viewUI.tishi_label.text = "提示：正在自动匹配...";
                    }
                    else if (state == false) { /** 未在匹配中 */
                        this._viewUI.tishi_label.text = "提示：没有队友的时候伙伴将前来助阵";
                    }
                };
                /** 注册按钮事件 */
                TeamModule.prototype.registerEvent = function () {
                    this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.clickCloseBtn);
                    this._viewUI.creatTeam_btn.on(LEvent.MOUSE_DOWN, this, this.pleaseCreateTeam); //,this.switch_RealtiveUI,[switchUI.CreateTeam]
                    this._viewUI.hepPartner_btn.on(LEvent.MOUSE_DOWN, this, this._OpenHuoBan);
                    this._viewUI.commandBattle_btn.on(LEvent.MOUSE_DOWN, this, this._OPBattleMannage);
                    this._viewUI.partnerHelp_btn.on(LEvent.MOUSE_DOWN, this, this._OpenHuoBan);
                    this._viewUI.exitTeam_btn.on(LEvent.MOUSE_DOWN, this, this._ExitTeamConfirm);
                    this._viewUI.zhenfa_btn.on(LEvent.MOUSE_DOWN, this, this._OpenZhenFa);
                    this._viewUI.teamRedEnvelopes_btn.on(LEvent.MOUSE_DOWN, this, this._OpenTeamRedPacket);
                    this._viewUI.InvitingPlayers_btn.on(LEvent.MOUSE_DOWN, this, this._ShowInvite);
                    this._viewUI.team_tab.selectHandler = new Handler(this, this._ChooseTeamTab);
                    this._viewUI.applyExitTeam_btn.on(LEvent.MOUSE_DOWN, this, this._ExitTeamConfirm);
                    this._viewUI.inviteFriends_btn.on(LEvent.MOUSE_DOWN, this, this._InviteEvent, [InviteType.INVITE_FRIEND]);
                    this._viewUI.inviteSider_btn.on(LEvent.CLICK, this, this._InviteEvent, [InviteType.INVITE_FAMILY]);
                    this._viewUI.teamSet_btn.on(LEvent.MOUSE_DOWN, this, this._OpenTeamSet);
                    this._viewUI.Match_btn.on(LEvent.MOUSE_DOWN, this, this._MatchEvent);
                    this._viewUI.bianJieieTeam_btn.on(LEvent.MOUSE_DOWN, this, this._OpenBianJie);
                    this._viewUI.aKeyYell_btn.on(LEvent.MOUSE_DOWN, this, this._OpenYell);
                    this._viewUI.editCommand_btn.on(LEvent.MOUSE_DOWN, this, this._OpenBattleInstruction);
                    this._viewUI.applyPartnerHelp_btn.on(LEvent.MOUSE_DOWN, this, this._OpenHuoBan);
                    this._viewUI.teamTarget_btn.on(LEvent.MOUSE_DOWN, this, this._OpenTeamSet);
                    this._viewUI.mask_img.on(LEvent.MOUSE_DOWN, this, this.hideInviteEvent);
                    this._viewUI.clearApplyList_btn.on(LEvent.CLICK, this, this.clearApplyList);
                    this._viewUI.weirenzhihui_btn.on(LEvent.CLICK, this, this.setAppointedConductor);
                    team.models.TeamProxy.getInstance().on(team.models.CREATE_TEAM_SUCC, this, this.createTeam);
                    team.models.TeamProxy.getInstance().on(team.models.REFRESH_TARGET, this, this.refreshTarget);
                    team.models.TeamProxy.getInstance().on(team.models.MATCH_EVENT, this, this.MatchEvent);
                    team.models.TeamProxy.getInstance().on(team.models.REFRESH_FRIEND_ACCEPT_TEAM, this, this.refreshTeamData);
                    game.modules.huoban.models.HuoBanProxy.getInstance().on(game.modules.huoban.models.ZHENRONG_EVENT, this, this.refreshTeamData);
                    team.models.TeamProxy.getInstance().on(team.models.RESPONSE_TO_CAPTAIN, this, this.responseToCaptain);
                    team.models.TeamProxy.getInstance().on(team.models.RESPONSE_TEAM_ERROR, this, this.errorTips);
                    team.models.TeamProxy.getInstance().on(team.models.AGREE_JOIN_EVENT, this, this.onInvite);
                    team.models.TeamProxy.getInstance().on(team.models.REFRESH_APPLICATION, this, this.getapplication);
                    team.models.TeamProxy.getInstance().on(team.models.TEAM_RED_DOT, this, this.setTeamRedDot);
                };
                /** 设置委任指挥的flag */
                TeamModule.prototype.setAppointedConductor = function () {
                    this._viewUI.commandShow.visible = false;
                    if (this.AppointedConductoFlag)
                        return;
                    var keyName = team.models.TeamModel.getInstance().teamMemberBasic.keys;
                    var commander = team.models.TeamModel.getInstance().commanderRoleid;
                    //长度大于3 或者第一个队员不是委托者
                    if (keyName.length >= 3 || (keyName.length == 2 && keyName[1] != commander)) {
                        this.AppointedConductoFlag = true;
                        this.refreshTeamData();
                    }
                    else
                        this.AppointedConductoFlag = false;
                };
                /** 队伍红点刷新
                 * @param  type 显示或者隐藏红点类型
                 */
                TeamModule.prototype.setTeamRedDot = function (type) {
                    if (!this._viewUI.team_tab.visible) {
                        this._viewUI.application_reddot_img.visible = false;
                        return;
                    }
                    if (type == TeamRedDot.SHOW_TEAM_REDDOT && !this._viewUI.application_reddot_img.visible) {
                        this._viewUI.application_reddot_img.visible = true;
                    }
                    else if (type == TeamRedDot.HIDE_TEAM_REDDOT && this._viewUI.application_reddot_img.visible) {
                        this._viewUI.application_reddot_img.visible = false;
                    }
                };
                /** 创建模型 */
                TeamModule.prototype.modelcreate = function (cell, modelid, index) {
                    var xpos = -180;
                    var ypos = -330;
                    if (index == 2) {
                        xpos = 80;
                        ypos = -100;
                    }
                    else if (index == 3) {
                        xpos = 200;
                        ypos = -50;
                    }
                    this.model.modelcreate(modelid + "", xpos, ypos, -80, 105);
                    cell.addChild(this.model);
                };
                /** 清除申请者信息 */
                TeamModule.prototype.clearApplyList = function () {
                    if (this.applicationInfo.length != 0)
                        RequesterProtocols._instance.c2s_CAcceptToTeam(0, ResponseApplicationTeam.REJECT_TEAM);
                };
                /** 隐藏邀请队伍按钮组 */
                TeamModule.prototype.hideInviteEvent = function () {
                    if (this._viewUI.invite_img.visible)
                        this._viewUI.invite_img.visible = false;
                };
                /** 打开队伍红包界面 */
                TeamModule.prototype._OpenTeamRedPacket = function () {
                    this._RedPacketMediator.show(RedPackType.TYPE_TEAM);
                };
                /** 邀请好友点击事件 */
                TeamModule.prototype.onInvite = function (roleId) {
                    if (roleId != 0) {
                        RequesterProtocols._instance.c2s_CInviteJoinTeam(roleId, 1);
                    }
                };
                /**
                 * 响应成为队长
                 * @param 0 拒绝   @param 1 同意
                 */
                TeamModule.prototype.responseToCaptain = function () {
                    RequesterProtocols._instance.c2s_CAnswerforSetLeader(1);
                };
                /** 战斗指令编辑 */
                TeamModule.prototype._OpenBattleInstruction = function () {
                    this._BattleInstructionMediator.onShow();
                    LoginModel.getInstance().CommonPage = "team";
                    this.hide();
                };
                /** 错误提示事件 */
                TeamModule.prototype.errorTips = function (errType) {
                    var promoto = TeamModel.getInstance().getTipsPromoto(errType);
                    game.modules.chat.models.ChatProxy.getInstance().event(game.modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS, promoto);
                };
                /** 匹配按钮点击事件 */
                TeamModule.prototype._MatchEvent = function () {
                    var roleId = LoginModel.getInstance().roleDetail.roleid; //角色
                    var leaderId = this.roleInfo[0].roleid; //队长id
                    var flag = team.models.TeamModel.getInstance().matchFlag;
                    if (roleId != leaderId) {
                        var prompt_1 = HudModel.getInstance().promptAssembleBack(162138);
                        var disappearMsgTips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                        disappearMsgTips.onShow(prompt_1);
                    }
                    else {
                        if (flag == true) { /** 已经正在匹配点击取消 */
                            RequesterProtocols._instance.c2s_CRequestStopTeamMatch();
                        }
                        else if (flag == false) { /**点击请求匹配  */
                            RequesterProtocols._instance.c2s_CRequestTeamMatch(1, this.targetId, this.minLevel, this.maxLevel);
                        }
                    }
                };
                /** 创建成功 */
                TeamModule.prototype.createTeam = function () {
                    this.switch_RealtiveUI(switchUI.CreateTeam);
                };
                /** 设置界面 */
                TeamModule.prototype._OpenTeamSet = function () {
                    var isCaptain = this.isCaptain();
                    if (isCaptain) {
                        this._TeamSetMediator.show();
                    }
                    else {
                        var prompt_2 = HudModel.getInstance().promptAssembleBack(420040);
                        var disappearMsgTips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                        disappearMsgTips.onShow(prompt_2);
                    }
                };
                /** 判断是不是队长 */
                TeamModule.prototype.isCaptain = function () {
                    var roleId = LoginModel.getInstance().roleDetail.roleid;
                    var leaderId = this.roleInfo[0].roleid;
                    if (roleId == leaderId)
                        return true;
                    return false;
                };
                /** 便捷界面 */
                TeamModule.prototype._OpenBianJie = function (e) {
                    this._TeamOrganizeMediator.show();
                    /** 这里需要把主界面关闭，否则按钮点击会冲突 */
                    LoginModel.getInstance().CommonPage = "team";
                    this.hide();
                    if (this.yindaoId == YinDaoEnum.ZUIDUI_YINDAO)
                        this.closeAni();
                };
                /** 一键喊话 */
                TeamModule.prototype._OpenYell = function (e) {
                    if (this.targetName == "" || this.targetName == null) { /** 没有设置目标 */
                        var promoto = game.modules.mainhud.models.HudModel.getInstance().promptAssembleBack(PromptExplain.NO_TARGET);
                        game.modules.chat.models.ChatProxy.getInstance().event(game.modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS, promoto);
                    }
                    else {
                        this._EditWindowMediator.onShow(this.targetName, this.minLevel, this.maxLevel);
                        LoginModel.getInstance().CommonPage = "team";
                        this.hide();
                    }
                };
                /** 邀请好友 帮派成员
                 * @param _type 邀请类型
                 */
                TeamModule.prototype._InviteEvent = function (_type) {
                    if (InviteType.INVITE_FAMILY == _type) {
                        var clankey = HudModel.getInstance().clankey;
                        var memberlist = game.modules.family.models.FamilyModel.getInstance().memberlist;
                        if (clankey > 0 && memberlist.length <= 1)
                            //先请求数据
                            RequesterProtocols._instance.c2s_CRefreshMemberList();
                        else if (clankey <= 0) //无工会
                         {
                            var disappar = new DisappearMessageTipsMediator(this._app);
                            var prompt_3 = HudModel.getInstance().promptAssembleBack(PromptExplain.NO_FAMILY);
                            disappar.onShow(prompt_3);
                            return;
                        }
                    }
                    this.hide();
                    this._ShowInvite();
                    LoginModel.getInstance().CommonPage = modules.ModuleNames.Team;
                    Laya.timer.once(500, this, this.showInvite, [_type]);
                    // this._InviteFriendsMediator.once(commonUI.OPEN_TEAM, this, this.show);
                };
                TeamModule.prototype.showInvite = function (_type) {
                    this._InviteFriendsMediator.onShow(_type);
                };
                /** 匹配事件 */
                TeamModule.prototype.MatchEvent = function (type) {
                    if (type == 2) { /** 开始匹配 */
                        this._viewUI.Match_btn.label = "取消匹配";
                        this._viewUI.tishi_label.text = "提示：正在自动匹配...";
                    }
                    else if (type == 1) { /** 取消匹配 */
                        this._viewUI.Match_btn.label = "自动匹配";
                        this._viewUI.tishi_label.text = "提示：没有队友的时候伙伴将前来助阵";
                    }
                };
                /**
                 * 头顶tab显示切换
                 * @param index 下标
                 */
                TeamModule.prototype._ChooseTeamTab = function (index) {
                    if (index == 0) /** 我的队伍 */ {
                        this._viewUI.myTeamPanel.visible = true;
                        this._viewUI.applyListPanel.visible = false;
                    }
                    else if (index == 1) /** 申请列表 */ {
                        this._viewUI.myTeamPanel.visible = false;
                        this._viewUI.applyListPanel.visible = true;
                        this.getapplication();
                    }
                };
                /** 获取申请名单数据 */
                TeamModule.prototype.getapplication = function () {
                    /** 重新申请者的数据信息 */
                    this.getApplicationData();
                    if (this.applicationInfo.length == 0) { /** 如果没有数据则重置ui */
                        this._viewUI.no_applicant_img.visible = true;
                        this._viewUI.applicant_list.visible = false;
                        return;
                    }
                    else if (this.applicationInfo.length > 0) { /** 有数据 */
                        this._viewUI.no_applicant_img.visible = false;
                        this._viewUI.applicant_list.visible = true;
                    }
                    this._viewUI.applicant_list.vScrollBarSkin = "";
                    if (this.applicationInfo.length <= 3) {
                        this._viewUI.applicant_list.repeatX = this.applicationInfo.length;
                        this._viewUI.applicant_list.repeatY = 1;
                    }
                    else if (this.applicationInfo.length > 3) {
                        this._viewUI.applicant_list.repeatX = 3;
                        this._viewUI.applicant_list.repeatY = Math.ceil(this.applicationInfo.length / 3);
                    }
                    this._viewUI.applicant_list.array = this.applicationInfo;
                    this._viewUI.applicant_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.applicant_list.scrollBar.elasticDistance = 100;
                    this._viewUI.applicant_list.renderHandler = new Handler(this, this.onRenderTeamApply);
                };
                /** 申请者数据加载 */
                TeamModule.prototype.getApplicationData = function () {
                    var applicationKey = TeamModel.getInstance().applyList.keys;
                    this.applicationInfo = [];
                    if (applicationKey.length == 0)
                        return;
                    for (var appIndex = 0; appIndex < applicationKey.length; appIndex++) {
                        var applyIndexData = TeamModel.getInstance().applyList.get(applicationKey[appIndex]);
                        this.applicationInfo.push(applyIndexData);
                    }
                };
                /** 申请者数据渲染 */
                TeamModule.prototype.onRenderTeamApply = function (cell, index) {
                    if (index < 0 || index > (this.applicationInfo.length - 1))
                        return;
                    var name_label = cell.getChildByName("teamCard").getChildByName("name_label");
                    var schoolName = cell.getChildByName("teamCard").getChildByName("playerSchool_label");
                    var playerLevel_label = cell.getChildByName("teamCard").getChildByName("playerLevel_label");
                    var playerSchool_img = cell.getChildByName("teamCard").getChildByName("playerSchool_img");
                    var agree_apply_btn = cell.getChildByName("teamCard").getChildByName("agree_apply_btn");
                    name_label.text = this.applicationInfo[index].rolename;
                    var school = this.applicationInfo[index].school;
                    playerLevel_label.text = this.applicationInfo[index].level;
                    schoolName.text = this.schoolInfo[school].name;
                    var schoolImgUrl = this._teamModel.getSchoolImgBack(school);
                    playerSchool_img.visible = true;
                    playerSchool_img.skin = schoolImgUrl;
                    var roleid = this.applicationInfo[index].roleid;
                    agree_apply_btn.on(LEvent.CLICK, this, this.AgreeToJoinTheTeam, [roleid]);
                };
                /**
                 * 同意入队申请事件
                 * @param roleid 申请者Id
                 */
                TeamModule.prototype.AgreeToJoinTheTeam = function (roleid) {
                    RequesterProtocols._instance.c2s_CAcceptToTeam(roleid, ResponseApplicationTeam.AGREEE_TEAM);
                };
                /** 显示邀请 */
                TeamModule.prototype._ShowInvite = function () {
                    if (this._viewUI.invite_img.visible) {
                        this._viewUI.invite_img.visible = false;
                    }
                    else {
                        this._viewUI.invite_img.visible = true;
                    }
                };
                /** 打开阵法 */
                TeamModule.prototype._OpenZhenFa = function () {
                    LoginModel.getInstance().CommonPage = modules.ModuleNames.Team;
                    this._ZhenFaGuangHuanMediator.show(1);
                    this.hide();
                    /** 汝是真的马叉虫 */
                    // models.TeamProxy.getInstance().once(models.OPEN_TEAM_EVENT,this,this.show);
                };
                /** 确认是否退出队伍 */
                TeamModule.prototype._ExitTeamConfirm = function () {
                    var prompt = HudModel.getInstance().promptAssembleBack(PromptExplain.ENSURE);
                    this._RemindViewMediator.onShow(team.models.IS_CONFIRM_EXIT_TEAM, prompt);
                    this._RemindViewMediator.once(modules.commonUI.RIGHT_BUTTON_EVENT, this, this.exitTeam);
                };
                /** 退出队伍 */
                TeamModule.prototype.exitTeam = function () {
                    RequesterProtocols._instance.c2s_CQuitTeam();
                    this.switch_RealtiveUI(switchUI.ExitTeam);
                };
                /** 战斗指挥 */
                TeamModule.prototype._OPBattleMannage = function () {
                    if (this._viewUI.commandShow.visible) {
                        this._viewUI.commandShow.visible = false;
                    }
                    else {
                        this._viewUI.commandShow.visible = true;
                    }
                    var keyName = team.models.TeamModel.getInstance().teamMemberBasic.keys;
                    var roleid = LoginModel.getInstance().roleDetail.roleid;
                    if (keyName.length >= 1 && keyName[0] == roleid) //队长是自己
                     {
                        this._viewUI.weirenzhihui_btn.disabled = false;
                    }
                    else if (keyName.length >= 1 && keyName[0] != roleid) {
                        this._viewUI.weirenzhihui_btn.disabled = true;
                    }
                };
                /** 伙伴助战 */
                TeamModule.prototype._OpenHuoBan = function () {
                    modules.ModuleManager.show(modules.ModuleNames.HUOBAN, this._app);
                    this.hide();
                    LoginModel.getInstance().CommonPage = "team";
                };
                /** 初始化表格等数据 */
                TeamModule.prototype._initConfigurationTable = function () {
                    if (!this.isInit) { /** 界面初始化 */
                        /** 门派配资表 */
                        this.schoolInfo = _LoginModel.getInstance().schoolInfo;
                        this.isInit = true;
                        this.roleShapeData = LoginModel.getInstance().createRoleConfigBinDic;
                        this.huobanShapeData = game.modules.createrole.models.LoginModel.getInstance().cnpcShapeInfo;
                    }
                };
                /** 获取队伍数据 */
                TeamModule.prototype.getTeamData = function () {
                    /** 数据置空*/
                    this.roleInfo = [];
                    /** 个人角色信息 */
                    // this.roleInfo.push(_LoginModel.getInstance().roleDetail);
                    var keyName = team.models.TeamModel.getInstance().teamMemberBasic.keys;
                    var roleId = _LoginModel.getInstance().roleDetail.roleid;
                    if (keyName.length == 0) /** 未组队的情况下 */ {
                        this.roleInfo.push(_LoginModel.getInstance().roleDetail);
                        /** 根据队伍状态控制ui */
                        this.switch_RealtiveUI(switchUI.ExitTeam);
                    }
                    else {
                        /** 根据队伍状态控制ui */
                        this.switch_RealtiveUI(switchUI.CreateTeam);
                        var entrustCaptain = TeamModel.getInstance().entrustCaptain;
                        var entrusterId = -1;
                        /** 将所有数据放入 */
                        for (var teamIndex = 0; teamIndex < keyName.length; teamIndex++) {
                            /** 委托者的位置 */
                            if (keyName[teamIndex] == entrustCaptain)
                                entrusterId = teamIndex;
                            this.roleInfo.push(team.models.TeamModel.getInstance().teamMemberBasic.get(keyName[teamIndex]));
                        }
                        if (entrusterId != -1 && entrustCaptain != keyName[0]) /** 排除第一位已经是队长的情况下 */ { /**  重新排布顺序 */
                            var captainInfo = this.roleInfo[0];
                            this.roleInfo.splice(entrusterId, 1); //删除一个
                            var tempData = team.models.TeamModel.getInstance().teamMemberBasic.get(keyName[entrusterId]); //
                            this.roleInfo.splice(0, 0, tempData);
                            this.roleInfo.splice(1, 1);
                            this.roleInfo.splice(entrusterId, 0, captainInfo);
                        }
                        var nowTeamMember = game.modules.team.models.TeamModel.getInstance().nowTeamMember;
                        var tempPos1 = -1;
                        var tempPos2 = -1;
                        /** 队长调整队员位置 */
                        if (typeof (nowTeamMember) != "undefined" && nowTeamMember.length > 0) {
                            for (var roleIndex = 0; roleIndex < this.roleInfo.length; roleIndex++) {
                                var roleInfoId = this.roleInfo[roleIndex].roleid;
                                var rolePosId = nowTeamMember[roleIndex];
                                if (roleInfoId != rolePosId && tempPos1 == -1) {
                                    tempPos1 = roleIndex;
                                }
                                else if (roleInfoId != rolePosId) {
                                    tempPos2 = roleIndex;
                                }
                            }
                            if (tempPos1 != -1 && tempPos2 != -1) {
                                var tempData1 = this.roleInfo[tempPos1]; //
                                var tempData2 = this.roleInfo[tempPos2]; //4
                                this.roleInfo.splice(tempPos1, 1, tempData2);
                                this.roleInfo.splice(tempPos2, 1, tempData1);
                            }
                        }
                        /** 将当前的队伍信息存放在model中,主界面可以直接使用 */
                        TeamModel.getInstance().TeamRoleInfoStorage = [];
                        for (var roleInfoIndex = 0; roleInfoIndex < this.roleInfo.length; roleInfoIndex++) {
                            TeamModel.getInstance().TeamRoleInfoStorage.push(this.roleInfo[roleInfoIndex]);
                        }
                        if (TeamModel.getInstance().TeamRoleInfoStorage.length != 0) {
                            team.models.TeamProxy.getInstance().event(team.models.REFRESH_MAININTERFACE_TEAM);
                        }
                        this.teamMember = this.roleInfo.length;
                        this.swapPosIndex = TeamModel.getInstance().swapPosIndex;
                    }
                    /** 取伙伴信息界面的当前阵容放入数组中 */
                    this._huobanModel = HuoBanModel.getInstance();
                    this._teamModel = TeamModel.getInstance();
                    var huoBanGroupKey = this._huobanModel.zhenrongid;
                    /** */
                    if (typeof (huoBanGroupKey) != "undefined" && roleId == this.roleInfo[0].roleid) {
                        var cheroBaseInfoData = this._huobanModel.cheroBaseInfoData;
                        if (typeof (this._huobanModel.zrhuobanlist[huoBanGroupKey]) != "undefined") {
                            var huoBanInfo = this._huobanModel.zrhuobanlist[huoBanGroupKey];
                            for (var huoBanIndex = 0; huoBanIndex < huoBanInfo.huobanlist.length; huoBanIndex++) {
                                var huoBanId = huoBanInfo.huobanlist[huoBanIndex];
                                if (this.roleInfo.length < team.models.TEAM_MAX)
                                    this.roleInfo.push(cheroBaseInfoData[huoBanId]);
                            }
                        }
                    }
                };
                /** 刷新队伍的数据 */
                TeamModule.prototype.refreshTeamData = function () {
                    /** 重新获取队伍数据 */
                    this.getTeamData();
                    this._viewUI.teamCard_list.vScrollBarSkin = "";
                    if (this.roleInfo.length <= 3) {
                        this._viewUI.teamCard_list.repeatX = this.roleInfo.length;
                        this._viewUI.teamCard_list.repeatY = 1;
                    }
                    else if (this.roleInfo.length > 3) {
                        this._viewUI.teamCard_list.repeatX = 3;
                        this._viewUI.teamCard_list.repeatY = Math.ceil(this.roleInfo.length / 3);
                    }
                    this._viewUI.teamCard_list.array = this.roleInfo;
                    this._viewUI.teamCard_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.teamCard_list.scrollBar.elasticDistance = 100;
                    this._viewUI.teamCard_list.renderHandler = new Handler(this, this.onRenderTeam);
                };
                /** 队伍数据渲染 */
                TeamModule.prototype.onRenderTeam = function (cell, index) {
                    if (index > (this.roleInfo.length - 1))
                        return;
                    var name_label = cell.getChildByName("teamCard").getChildByName("name_label");
                    var mask_image = cell.getChildByName("teamCard").getChildByName("mask_image");
                    var schoolName = cell.getChildByName("teamCard").getChildByName("playerSchool_label");
                    var playerLevel_label = cell.getChildByName("teamCard").getChildByName("playerLevel_label");
                    var teamPosition_img = cell.getChildByName("teamCard").getChildByName("teamPosition_img");
                    var playerSchool_img = cell.getChildByName("teamCard").getChildByName("playerSchool_img");
                    var teamOrder_clip = cell.getChildByName("teamCard").getChildByName("teamOrder_clip");
                    mask_image.visible = false;
                    if (typeof (this.roleInfo[index].rolename) != "undefined") {
                        /** 是否是角色 */
                        name_label.text = this.roleInfo[index].rolename;
                        // let modelId = this.roleShapeData[this.roleInfo[index].shape].model;
                        // this.modelcreate(cell, modelId,(index+1));
                        var school = this.roleInfo[index].school;
                        playerLevel_label.text = this.roleInfo[index].level;
                        schoolName.text = this.schoolInfo[school].name;
                        var roleId = this.roleInfo[index].roleid;
                        var commander = team.models.TeamModel.getInstance().commanderRoleid;
                        var swapPosIndex = TeamModel.getInstance().swapPosIndex;
                        if (index == 0) { /** 首位队长为队长的皮肤 */
                            teamPosition_img.skin = "ui/team/team_duizhang.png";
                        }
                        else if (commander != 0 && commander == roleId) {
                            teamPosition_img.skin = "ui/team/zhihui.png";
                        }
                        else {
                            if (TeamModel.getInstance().updateMemberState.keys.length != 0) {
                                var keys = TeamModel.getInstance().updateMemberState.keys;
                                var keyLength = TeamModel.getInstance().updateMemberState.keys.length;
                                for (var updateMemberStateIndex = 0; updateMemberStateIndex < keyLength; updateMemberStateIndex++) {
                                    var teamMemberState = TeamModel.getInstance().updateMemberState.get(keys[updateMemberStateIndex]);
                                    if (roleId == keys[updateMemberStateIndex] && teamMemberState == TeamMemberState.eTeamAbsent) { /** 该角色处于暂离状态 */
                                        teamPosition_img.skin = "ui/team/team_zanli.png";
                                    }
                                    else if (roleId == keys[updateMemberStateIndex] && teamMemberState == TeamMemberState.eTeamFallline) { /** 离线状态 */
                                        teamPosition_img.skin = "ui/team/team_lixian.png";
                                    }
                                    else if (roleId == keys[updateMemberStateIndex])
                                        teamPosition_img.skin = "";
                                }
                            }
                            else {
                                if (this.roleInfo[index].state == TeamMemberState.eTeamAbsent) {
                                    teamPosition_img.skin = "ui/team/team_zanli.png";
                                    TeamModel.getInstance().updateMemberState.set(this.roleInfo[index].roleid, this.roleInfo[index].state);
                                }
                                else
                                    teamPosition_img.skin = "";
                            }
                        }
                        var schoolImgUrl = this._teamModel.getSchoolImgBack(school);
                        playerSchool_img.visible = true;
                        playerSchool_img.skin = schoolImgUrl;
                        teamOrder_clip.index = index;
                        if (swapPosIndex == -1 || swapPosIndex == index) {
                            mask_image.visible = false;
                        }
                        else if (index != 0) { /** 队长不会换位置 */
                            mask_image.visible = true;
                        }
                        cell.on(LEvent.CLICK, this, this.showTeamMateTips, [index]);
                        /** 处理委任指挥 队长不会被委任 当前的委托者也不会被委任*/
                        if (this.AppointedConductoFlag && index != 0 && commander != roleId) {
                            mask_image.visible = true;
                            var changePos_lab = cell.getChildByName("teamCard").getChildByName("mask_image").getChildByName("changePos_lab");
                            changePos_lab.text = "点击委任指挥";
                            mask_image.on(LEvent.CLICK, this, this.appointCondctor, [roleId]);
                        }
                    }
                    else {
                        /** 伙伴 */
                        var npcBaseVo = this.huobanShapeData[this.roleInfo[index].id];
                        this.modelcreate(cell, parseInt(npcBaseVo.shape), (index + 1));
                        name_label.text = this.roleInfo[index].name;
                        var _huoBanType = this.roleInfo[index].type;
                        switch (_huoBanType) {
                            case huoBanType.PHYSICAL_TYPE:
                                schoolName.text = "物理型";
                                break;
                            case huoBanType.SPELL_TYPE:
                                schoolName.text = "法术型";
                                break;
                            case huoBanType.THERAPEUTIC_TYPE:
                                schoolName.text = "治疗型";
                                break;
                            case huoBanType.AUXILIARY_TYPE:
                                schoolName.text = "辅助型";
                                break;
                            case huoBanType.CONTROL_TYPE:
                                schoolName.text = "控制型";
                                break;
                            default: break;
                        }
                        playerLevel_label.text = _LoginModel.getInstance().roleDetail.level.toString();
                        teamPosition_img.skin = "ui/team/team_zhuzhan.png";
                        teamOrder_clip.index = index;
                        playerSchool_img.visible = false;
                        if (this.shadowFlag) {
                            mask_image.visible = this.huoBanINdex == index ? false : true;
                        }
                        else {
                            mask_image.visible = false;
                        }
                        cell.on(LEvent.CLICK, this, this.changePos, [index]);
                    }
                };
                /** 请求委任指挥
                 * @param roleid 角色id
                */
                TeamModule.prototype.appointCondctor = function (roleid, e) {
                    e.stopPropagation();
                    RequesterProtocols._instance.c2s_CSetCommander(0, roleid);
                    this.AppointedConductoFlag = false;
                };
                /** 队长和队员的查看messagetips */
                TeamModule.prototype.showTeamMateTips = function (index, e) {
                    if (TeamModel.getInstance().swapPosIndex != -1 && index != TeamModel.getInstance().swapPosIndex) { /** 存在交换位置的index并且点击的位置不是选中的index ，直接发送交换位置的协议*/
                        RequesterProtocols._instance.c2s_CSwapMember(this.swapPosIndex, index);
                        TeamModel.getInstance().swapPosIndex = -1;
                    }
                    else if (TeamModel.getInstance().swapPosIndex != -1 && index == TeamModel.getInstance().swapPosIndex) { /** 在移动位置情况下点击的是自己 */
                        TeamModel.getInstance().swapPosIndex = -1;
                        this.refreshTeamData();
                        this.swapPosIndex = TeamModel.getInstance().swapPosIndex;
                    }
                    else {
                        var selectRoleId = this.roleInfo[index].roleid;
                        var roleId = LoginModel.getInstance().roleDetail.roleid;
                        if (index <= this.teamMember - 1 && selectRoleId != roleId) {
                            var xPos = e.currentTarget.mouseX; //e.currentTarget.mouseX; //e.target.mouseX;  	e.stageX
                            var yPos = e.currentTarget.mouseY; //e.currentTarget.mouseY;//e.target.mouseY; 		e.stageY
                            this._TeamMateViewMediator.onShow(xPos, yPos, index, this.roleInfo);
                        }
                    }
                };
                /** 伙伴位置请求交换
                 * @param index 伙伴下标
                 */
                TeamModule.prototype.changePos = function (index, e) {
                    this.showTeamMateTips(index, e);
                    var huoBanGroupKey = this._huobanModel.currentzrid;
                    var huoBanInfo = this._huobanModel.zrhuobanlist[huoBanGroupKey];
                    huoBanInfo.huobanlist;
                    if (this.shadowFlag == true && index != this.huoBanINdex) { /** 已经有阴影的情况下 发送交换位置的请求 */
                        var huoBanGroupKey_1 = this._huobanModel.currentzrid;
                        var huoBanInfo_1 = this._huobanModel.zrhuobanlist[huoBanGroupKey_1];
                        var huoBanList = [];
                        var first_huoBanId = this.roleInfo[this.huoBanINdex].id;
                        var second_huoBanId = this.roleInfo[index].id;
                        var firstIndex = huoBanInfo_1.huobanlist.indexOf(first_huoBanId);
                        var secondIndex = huoBanInfo_1.huobanlist.indexOf(second_huoBanId);
                        var temp = huoBanInfo_1.huobanlist[firstIndex];
                        huoBanInfo_1.huobanlist[firstIndex] = huoBanInfo_1.huobanlist[secondIndex];
                        huoBanInfo_1.huobanlist[secondIndex] = temp;
                        RequesterProtocols._instance.c2s_CZhenrong_Member(huoBanGroupKey_1, huoBanInfo_1.huobanlist);
                        this.shadowFlag = false;
                        this.huoBanINdex = -1;
                    }
                    else if (this.teamMember - 1 < index) { /** 没有阴影的情况下 不发送交换位置的请求，但是刷新list */
                        this.huoBanINdex = index;
                        this.shadowFlag = true;
                    }
                    this.refreshTeamData();
                };
                /** 请求创建队伍 */
                TeamModule.prototype.pleaseCreateTeam = function () {
                    RequesterProtocols._instance.c2s_CCreateTeam();
                };
                /** 控制ui
                 * @param type 创建队伍类型
                 */
                TeamModule.prototype.switch_RealtiveUI = function (type) {
                    if (type == switchUI.ExitTeam) { /** 未创建队伍的情况 */
                        this._viewUI.exitTeam_img.visible = false;
                        this._viewUI.group_btn.visible = false;
                        this._viewUI.battle_img.visible = false;
                        this._viewUI.commandShow.visible = false;
                        this._viewUI.team_tab.visible = false;
                        this._viewUI.creatTeam_img.visible = true;
                        this._viewUI.bianJieieTeam_btn.visible = true;
                        this._viewUI.myTeamPanel.visible = true;
                        this._viewUI.applyListPanel.visible = false;
                    }
                    else if (type = switchUI.CreateTeam) { /** 创建完队伍的情况 */
                        this._viewUI.exitTeam_img.visible = true;
                        this._viewUI.group_btn.visible = true;
                        this._viewUI.battle_img.visible = true;
                        this._viewUI.commandShow.visible = false;
                        this._viewUI.team_tab.visible = true;
                        this._viewUI.creatTeam_img.visible = false;
                        this._viewUI.bianJieieTeam_btn.visible = false;
                    }
                    /** JUMPPAGE */
                    // ModuleManager.jumpPage("Bag",0,this._app);
                };
                /** 刷新目标副本
                 * @param minlevel 最低等级
                 * @param maxlevel 最高等级
                 * @param targetName 目标名称
                 * @param targetId 目标Id
                 */
                TeamModule.prototype.refreshTarget = function (minlevel, maxlevel, targetName, targetId) {
                    if (minlevel > maxlevel) {
                        var temp = minlevel;
                        minlevel = maxlevel;
                        maxlevel = temp;
                    }
                    this.minLevel = minlevel;
                    this.maxLevel = maxlevel;
                    if (typeof (targetName) != "undefined")
                        this.targetName = targetName;
                    else
                        this.targetName = "无";
                    this._viewUI.teamTarget_label.text = this.targetName;
                    this.targetId = targetId;
                    this._viewUI.ttargetLevel_label.text = minlevel + "-" + maxlevel;
                };
                TeamModule.prototype.show = function () {
                    this.onLoad();
                    _super.prototype.show.call(this);
                };
                TeamModule.prototype.onShow = function (event) {
                    this.show();
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.OPEN_EVENT);
                    if (HudModel.getInstance().yindaoId == YinDaoEnum.RICHANG_YINDAO)
                        this.richangYindao();
                };
                /**日常副本引导 */
                TeamModule.prototype.richangYindao = function () {
                    var x1 = this._viewUI.bianJieieTeam_btn.x + this._viewUI.bianJieieTeam_btn.width;
                    var y1 = this._viewUI.myTeamPanel.y + this._viewUI.bianJieieTeam_btn.y - 60;
                    var x2 = x1 - 50;
                    var y2 = y1 + 120;
                    this.setTipPos(x1, y1);
                    this.setAniPos(x2, y2);
                    this.startYindao(YinDaoEnum.ZUIDUI_YINDAO_TIP);
                    HudModel.getInstance().yindaoId = YinDaoEnum.ZUIDUI_YINDAO;
                    this.yindaoId = YinDaoEnum.ZUIDUI_YINDAO;
                };
                /**引导开始 */
                TeamModule.prototype.startYindao = function (tipid) {
                    var tip = HudModel._instance.carroweffectData;
                    this.onload();
                    Laya.timer.loop(1000, this, this.moveImg);
                    Laya.timer.loop(5000, this, this.closeAni);
                    this._viewUI.yindaoTip_htm.text = tip[tipid].text;
                    this._viewUI.addChild(this.ani);
                    this._viewUI.addChild(this.dianImg);
                    this._viewUI.yindaoTip_img.visible = true;
                    this.dianImg.visible = true;
                };
                /**设置引导提示位置 */
                TeamModule.prototype.setTipPos = function (x, y) {
                    this._viewUI.yindaoTip_img.x = x;
                    this._viewUI.yindaoTip_img.y = y;
                };
                /**设置动画位置*/
                TeamModule.prototype.setAniPos = function (x, y) {
                    this.ani.x = x;
                    this.ani.y = y;
                    this.dianImg.x = x;
                    this.dianImg.y = y;
                };
                /**关闭动画 */
                TeamModule.prototype.closeAni = function () {
                    this.ani.clear();
                    Laya.timer.clear(this, this.closeAni);
                    Laya.timer.clear(this, this.moveImg);
                    this._viewUI.yindaoTip_img.visible = false;
                    this.dianImg.visible = false;
                };
                /**播放动画 */
                TeamModule.prototype.onload = function () {
                    Laya.Animation.createFrames(this.anUrls("", 9), "yindao");
                    this.ani.play(0, true, "yindao");
                    this.ani.interval = 112;
                    this.dianImg.skin = "common/ui/mainhud/dian.png";
                    this.dianImg.mouseThrough = true;
                };
                /**移动手指图标 */
                TeamModule.prototype.moveImg = function () {
                    if (this.dianImg.y <= this.ani.y)
                        Laya.Tween.to(this.dianImg, { x: this.ani.x + 25, y: this.ani.y + 25 }, 1000, null, Laya.Handler.create(this, function () { }), null, false);
                    else
                        Laya.Tween.to(this.dianImg, { x: this.ani.x - 5, y: this.ani.y - 5 }, 1000, null, Laya.Handler.create(this, function () { }), null, false);
                };
                TeamModule.prototype.anUrls = function (aniName, length) {
                    var urls = [];
                    for (var index = 1; index <= length; index++) {
                        urls.push("common/ui/yindao/" + aniName + index + ".png");
                    }
                    return urls;
                };
                TeamModule.prototype.clickCloseBtn = function () {
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.CLOSEVIEW_EVENT);
                    this.hide();
                };
                TeamModule.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    this.model.modeldelt();
                    team.models.TeamProxy.getInstance().event(team.models.REFRESH_MAININTERFACE_TEAM);
                    ;
                };
                TeamModule.prototype.getView = function () {
                    return this._viewUI;
                };
                return TeamModule;
            }(game.modules.ModuleMediator));
            team.TeamModule = TeamModule;
        })(team = modules.team || (modules.team = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=TeamModule.js.map