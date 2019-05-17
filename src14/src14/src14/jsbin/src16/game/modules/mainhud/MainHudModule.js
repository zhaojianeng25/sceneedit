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
* name
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var mainhud;
        (function (mainhud) {
            /** 最高等级 99*/
            mainhud.LEVEL_MAX = 99;
            var MainHudModule = /** @class */ (function (_super) {
                __extends(MainHudModule, _super);
                function MainHudModule(app) {
                    var _this = _super.call(this) || this;
                    _this.chatData = [];
                    _this.chatContentHeight = 10;
                    /** 初始化主界面flag */
                    _this.initFlag = false;
                    /** 造型配置信息 */
                    _this.shapeInfo = [];
                    /**所有任务的索引对应的任务ID */
                    _this.alltasklist = [];
                    _this.tjxlpos = -1;
                    _this.htmltest = [];
                    _this.tasklistkey = [];
                    /**第一任务ID*/
                    _this.firsttaskid = 0;
                    /** 推送循环检测 */
                    _this.seconds = 0;
                    _this.uiLayer = app.uiRoot.HUD;
                    _this._viewUI = new ui.common.MainHudUI();
                    _this._viewUI.mouseThrough = true;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    mainhud.models.HudModel.getInstance().useUI = _this._viewUI;
                    _this.c2sGetItemTips();
                    /** 初始化配置表 */
                    _this.initConfig();
                    /**  打开宠物信息界面监听*/
                    // this.openPetInfoListener();
                    //显示主界面
                    //Laya.stage.on(LEvent.RESIZE, this, this.onResize);
                    _this._ContactCharacterMediator = new game.modules.friend.ContactCharacterMediator(_this._viewUI, app);
                    var _loginModel = game.modules.createrole.models.LoginModel.getInstance(); //人物信息
                    _this._remindViewMediator = new game.modules.commonUI.RemindViewMediator(app.uiRoot.general, app);
                    _this.dialog = new game.modules.commonUI.JuQingMediator(_this._app);
                    _this.changjingchange = new game.modules.commonUI.ChangJingChangeMediator(_this._app);
                    _this.UseItem = new game.modules.commonUI.UseToRemindCardMediator(_this._app);
                    _this.makepro = new game.modules.commonUI.MakeProgressMediator(_this._app);
                    _this.tips = new game.modules.commonUI.DisappearMessageTipsMediator(_this._app);
                    _this.disappearMessageTipsMediator = new game.modules.commonUI.DisappearMessageTipsMediator(_this._app);
                    _this.ChatViewMediator = new game.modules.chat.ChatViewMediator(_this._app);
                    HudModel.getInstance().autobatt = new game.modules.autohangup.AutoHangUpModuls(_this._app);
                    _this._StrengTheningInsertViewMediator = new game.modules.strengThening.StrengTheningInsertViewMediator(_this._viewUI, _this._app);
                    RequesterProtocols._instance.c2s_CGetPetEquipInfo();
                    //var _roleLevel:string = _roleinfo.roleDetail.level.toString;
                    //顶部区域
                    //网络监听
                    // Network._instance.addHanlder(ProtocolsEnum.STransChatMessage2Client, this, this.onRefreshChatData);
                    Network._instance.addHanlder(ProtocolsEnum.STransChatMessageNotify2Client, _this, _this.onRefreshSystemData);
                    _this.expObj = game.modules.roleinfo.models.RoleInfoModel.getInstance().CResMoneyConfigBinDic;
                    _this.initialize();
                    //服务器等级
                    _this.initServerLevel();
                    //人物信息
                    _this.initRoleData();
                    //宠物信息
                    _this.initPetData();
                    //按钮初始化
                    _this.initBtn();
                    //按钮监听
                    _this.registerEvent();
                    //任务列表
                    _this._viewUI.middleBox.mouseThrough = true;
                    //刷新当前时间
                    _this.getNowTime();
                    Laya.timer.loop(20000, _this, _this.getNowTime);
                    //任务列表
                    _this.onRefreshTaskList();
                    /** 商品限购加载 */
                    _this.getShopArr();
                    /** 活动推送状态初始化 */
                    game.modules.activity.models.ActivityModel.getInstance().setTuiSongState();
                    Laya.timer.loop(1000, _this, _this.actLoop);
                    //** 活动推送监听 */
                    // game.modules.createrole.models.LoginProxy.getInstance().on(game.modules.createrole.models.SHOW_MAIN, this, this.tuiSongOn);
                    game.modules.activity.models.ActivityProxy._instance.on(game.modules.activity.models.TUISONG_EVENT, _this, _this.tuiSongOn);
                    _this.tuiSongOn();
                    //** 飘窗监听 */
                    _this.timeNum = 0;
                    Laya.timer.loop(10000, _this, _this.clearTimeNum);
                    game.modules.chat.models.ChatProxy.getInstance().on(game.modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS, _this, _this.regestEvent);
                    /** 特殊副本结算奖励监听 */
                    game.modules.team.models.TeamProxy.getInstance().on(game.modules.team.models.TEAM_ROLL_MELON, _this, _this.teamRollMelon);
                    /** npc对话Tips弹窗提示监听 */
                    game.modules.chat.models.ChatProxy.getInstance().on(game.modules.chat.models.SHOW_TIPS_MESSAGE, _this, _this.showNpcTips);
                    /** 本地系统消息加载 */
                    game.modules.friend.models.FriendModel.getInstance().setSystemMessageRecord();
                    //队伍列表
                    _this._viewUI.mainTeamList.vScrollBarSkin = "";
                    _this._viewUI.mainTeamList.scrollBar.elasticDistance = 10;
                    _this._viewUI.mainTeamList.scrollBar.elasticBackTime = 200;
                    _this._viewUI.mainTeamList.selectEnable = true;
                    var teamArr = [];
                    for (var i = 0; i < 3; i++) {
                        teamArr.push({ roleLevel: "9" + i, roleName: "万金贵" });
                    }
                    _this._viewUI.mainTeamList.array = teamArr;
                    _this._viewUI.mainTeamList.selectHandler = new Laya.Handler(_this, _this.onTeamSelect);
                    /** 停止移动取消特效 */
                    game.scene.models.SceneProxy.getInstance().on(game.scene.models.MOVE_STOP, _this, _this.movestop);
                    //队伍列表
                    //聊天数据
                    // this.onGetChatData();
                    if (_this.chatData == null) {
                        _this._viewUI.chatList_panel.visible = false;
                    }
                    //console.log("this.chatData...........", this.chatData);
                    _this.initQianghuaData();
                    _this.initFamilyData();
                    _this._viewUI.xianhui_btn.visible = false;
                    _this._viewUI.xianhui_lab.visible = false;
                    if (1784 <= HudModel.getInstance().sceneid && HudModel.getInstance().sceneid <= 1786) {
                        var _teaminfo = modules.team.models.TeamModel.getInstance().teamMemberBasic.values;
                        var roleDetail = game.modules.createrole.models.LoginModel.getInstance().roleDetail;
                        if (_teaminfo.length > 0 && _teaminfo[0].roleid != roleDetail.roleid)
                            return _this;
                        _this._viewUI.xianhui_btn.visible = true;
                        _this._viewUI.xianhui_lab.visible = true;
                        _this._viewUI.xianhui_lab.text = "叁对叁证道战";
                    }
                    else if (1787 <= HudModel.getInstance().sceneid && HudModel.getInstance().sceneid <= 1798) {
                        var _teaminfo = modules.team.models.TeamModel.getInstance().teamMemberBasic.values;
                        var roleDetail = game.modules.createrole.models.LoginModel.getInstance().roleDetail;
                        if (_teaminfo.length > 0 && _teaminfo[0].roleid != roleDetail.roleid)
                            return _this;
                        _this._viewUI.xianhui_btn.visible = true;
                        _this._viewUI.xianhui_lab.visible = true;
                        _this._viewUI.xianhui_lab.text = "伍对伍证道战";
                    }
                    return _this;
                }
                MainHudModule.getInstance = function (app) {
                    if (!this._instance) {
                        this._instance = new MainHudModule(app);
                    }
                    return this._instance;
                };
                Object.defineProperty(MainHudModule.prototype, "view", {
                    get: function () {
                        return this._viewUI;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**停止移动 */
                MainHudModule.prototype.movestop = function () {
                    // if (AutoHangUpModels.getInstance().isstar != 1 && (this._app.sceneObjectMgr.mainUnit.xunluo != 3 || this._app.sceneObjectMgr.mainUnit.autowalk == 3)) 
                    if ((AutoHangUpModels.getInstance().isstar != 1 && this._app.sceneObjectMgr.mainUnit.xunluo != 3) || this._app.sceneObjectMgr.mainUnit.autowalk == 3) {
                        this._app.sceneObjectMgr.mainUnit.stopwalk = 1;
                    }
                    this._app.sceneObjectMgr.mainUnit.autowalk = 0;
                };
                /**初始化 */
                MainHudModule.prototype.initialize = function () {
                    this.ani = new Laya.Animation();
                    this.dianImg = new Laya.Image();
                    this.maintaskArr = [180101, 180201, 180301, 180401, 180501, 180601, 180701, 180801, 180901];
                };
                /** 显示属性变化的提示飘窗
                 * @param diff 差值
                 * @param flag true:增加，false:减少
                 * @param shuxingType 属性类型
                 */
                MainHudModule.prototype.onShowChangeDifferenceTips = function (diff, flag, shuxingType) {
                    var time = this.timeNum * 500;
                    this.timeNum += 1;
                    var disTips = new modules.commonUI.DisappearMessageTipsMediator(this._app);
                    Laya.timer.once(time, this, function () {
                        disTips.onLoadRolePropertyChangeEffect(diff, flag, shuxingType);
                    });
                };
                /** 监听各类窗口 */
                MainHudModule.prototype.initListenerEvent = function () {
                    game.modules.team.models.TeamProxy.getInstance().on(modules.team.models.IS_ACCEPT_INVITE, this, this._ShowConfirmWindow);
                    //刷新经验
                    mainhud.models.HudProxy.getInstance().on(mainhud.models.SRefreshUserExp_EVENT, this, this.onRefreshUserExp);
                    //经验提示
                    mainhud.models.HudProxy.getInstance().on(mainhud.models.SExpMessageTips_EVENT, this, this.onExpMessageTips);
                    //显示属性变化的提示飘窗
                    mainhud.models.HudProxy.getInstance().on(mainhud.models.SHOW_CHANGE_DIFFERENCE, this, this.onShowChangeDifferenceTips);
                    //刷新属性
                    mainhud.models.HudProxy.getInstance().on(mainhud.models.SRefreshRoleData_EVENT, this, this.onRefreshRoleData);
                    //收到消息
                    game.modules.friend.models.FriendProxy.getInstance().on(game.modules.friend.models.receiveMessage_EVENT, this, this.onMessageReceive);
                    //消息已被阅读
                    game.modules.friend.models.FriendProxy.getInstance().on(game.modules.friend.models.readMessage_EVENT, this, this.onMessageRead);
                    //有未读邮件
                    game.modules.friend.models.FriendProxy.getInstance().on(game.modules.friend.models.receiveMail_EVENT, this, this.onReceiveMail);
                    //邮件已被阅读
                    game.modules.friend.models.FriendProxy.getInstance().on(game.modules.friend.models.readMail_EVENT, this, this.onReadMail);
                    //显示奖励系统红点（每日登陆）
                    modules.reward.models.RewardProxy.getInstance().on(modules.reward.models.REGDATA_EVENT, this, this.onRewardPoint);
                    //显示奖励系统红点（新手礼包）
                    modules.reward.models.RewardProxy.getInstance().on(modules.reward.models.NEWPLAYERPOINT_EVENT, this, this.onRewardPoint);
                    //隐藏奖励系统红点
                    modules.reward.models.RewardProxy.getInstance().on(modules.reward.models.REWARDPOINT_EVENT, this, this.onHideRewardPoint);
                    //显示成就系统红点
                    modules.achievent.models.AchieventProxy.getInstance().on(modules.achievent.models.ACHIEVEPOINT_EVENT, this, this.onAchievePoint);
                    //隐藏成就系统红点
                    modules.achievent.models.AchieventProxy.getInstance().on(modules.achievent.models.HIDEACHIEVEPOINT_EVENT, this, this.onHideAchievePoint);
                    game.modules.pet.models.PetProxy.getInstance().on(game.modules.pet.models.REFRESHSTATE_EVENT, this, this.onRefreshshstate);
                    game.modules.pet.models.PetProxy.getInstance().on(game.modules.pet.models.ADD_EVENT, this, this.onAddpet);
                    game.modules.pet.models.PetProxy.getInstance().on(game.modules.pet.models.REFRESHSHOUMING_EVENT, this, this.onRefreshshouming);
                    mainhud.models.HudProxy.getInstance().on(mainhud.models.SETPOST_EVENT, this, this.changemap);
                    game.modules.mainhud.models.HudProxy.getInstance().on(game.modules.mainhud.models.GETPOST_EVENT, this, this.changepost);
                    game.scene.models.SceneProxy.getInstance().on(game.scene.models.ROLE_MOVE, this, this.rolemove);
                    game.modules.team.models.TeamProxy.getInstance().on(modules.team.models.IS_ACCEPT_INVITE, this, this._ShowConfirmWindow);
                    game.modules.team.models.TeamProxy.getInstance().on(modules.team.models.RESPONSE_CALL_BACK, this, this._ShowConfirmWindow);
                    game.modules.team.models.TeamProxy.getInstance().on(game.modules.team.models.REFRESH_MAININTERFACE_TEAM, this, this.getTeamData);
                    game.modules.team.models.TeamProxy.getInstance().on(game.modules.team.models.REFRESH_FRIEND_ACCEPT_TEAM, this, this.getTeamData);
                    game.modules.task.models.TaskProxy.getInstance().on(game.modules.task.models.TAKSREFRESH, this, this.onRefreshTaskList);
                    game.modules.task.models.TaskProxy.getInstance().on(game.modules.task.models.NEWTASK, this, this.onRefreshTaskList);
                    modules.chat.models.ChatProxy.getInstance().on(modules.chat.models.VIWE_OTHER_ITEM, this, this._ViewOtherItem);
                    modules.chat.models.ChatProxy.getInstance().on(modules.chat.models.OPEN_MAINHUD_PET_LISTEN, this, this.removePetInfoListener);
                    modules.chat.models.ChatProxy.getInstance().on(modules.chat.models.CLOSE_MAINHUD_PET_LISTEN, this, this.openPetInfoListener);
                    modules.chat.models.ChatProxy.getInstance().on(modules.chat.models.SYS_MSG_IN_CHANNEL, this, this.onGetChatData);
                    modules.team.models.TeamProxy.getInstance().on(modules.team.models.MAINHUD_UPDATE_TEAM_STATE, this, this.updataTeamState);
                    modules.team.models.TeamProxy.getInstance().on(modules.team.models.UPDATE_TEAMMATE_STATE_POPUP, this, this.updataTeamMatePopup);
                    // team.models.TeamProxy.getInstance().on(team.models.MATCH_EVENT, this, this.cancleMatch);
                    modules.bag.models.BagProxy.getInstance().on(modules.bag.models.ADDITEM_USE_GUIDE, this, this.showItemGuide);
                    modules.bag.models.BagProxy.getInstance().on(modules.bag.models.DELET_USE_GUIDE, this, this.deletItemGuide);
                    modules.bag.models.BagProxy.getInstance().on(modules.bag.models.ITEM_SLIDE, this, this.ItemSlide);
                    game.modules.mainhud.models.HudProxy._instance.on(game.modules.mainhud.models.changeMoneyReturn, this, this.fushibuzu);
                    /**是否有公会 */
                    // models.HudProxy._instance.on(models.SRefreshRoleClan, this, this.openClan);
                    /**公会被邀请加入 */
                    game.modules.family.models.FamilyProxy._instance.on(game.modules.family.models.SClanInvitation, this, this.showClanInvitation);
                    game.modules.tips.models.TipsProxy.getInstance().on(game.modules.tips.models.TIPS_ON_CANCEL, this, this.cancelTips);
                    game.modules.family.models.FamilyProxy.getInstance().on(game.modules.family.models.removeMainTips, this, this.removeClantips);
                    /** 判断背包是否已满 */
                    modules.bag.models.BagProxy.getInstance().on(modules.bag.models.REFRESH_TEMP_BAG, this, this.judgeBagIsFull);
                    //关闭界面
                    mainhud.models.HudProxy.getInstance().on(mainhud.models.CLOSEVIEW_EVENT, this, this.closeMengban);
                    //打开界面
                    mainhud.models.HudProxy.getInstance().on(mainhud.models.OPEN_EVENT, this, this.openMengban);
                    /**人物小窗口监听*/
                    mainhud.models.HudProxy.getInstance().on(mainhud.models.ROLE, this, this.showrole);
                    /**帮派红点关闭 */
                    game.modules.family.models.FamilyProxy._instance.on(game.modules.family.models.isShowFamilyRedDot, this, this.closeFamilyRedDot);
                    /**帮派红点 */
                    game.modules.family.models.FamilyProxy._instance.on(game.modules.family.models.SClanRedTip, this, this.showRedDot);
                    /**强化红点 */
                    game.modules.bag.models.BagProxy.getInstance().on(game.modules.bag.models.REFRESH_BAG_DEPOT_COUNT, this, this.initQianghuaData);
                    game.modules.strengThening.models.StrengTheningProxy.getInstance().on(game.modules.strengThening.models.insertRedDot, this, this.showQianghuaRedDot);
                    modules.bag.models.BagProxy.getInstance().on(modules.bag.models.BAG_YINDAO, this, this.bagYindao);
                    /** 队伍红点 */
                    modules.team.models.TeamProxy.getInstance().on(modules.team.models.TEAM_RED_DOT, this, this.setTeamRedDot);
                    /**人物升级 */
                    mainhud.models.HudProxy.getInstance().on(mainhud.models.LevelUp_EVENT, this, this.onLevelUp);
                    /** 断线监听 */
                    Network._instance.on(game.modules.setBasics.models.TYPE_LINK_BROKEN_EVENT, this, this.lingBroken);
                    //监听是否要领取多倍点数
                    game.modules.task.models.TaskProxy.getInstance().once(game.modules.task.models.GETDPOINT, this, this.isGetDPoint);
                    //是否接受下一轮日常副本任务
                    game.modules.task.models.TaskProxy.getInstance().once(game.modules.task.models.ACCEPTNEXTROUNDTASK, this, this.isAcceptNextRoundTask);
                    //是否接受下一轮门派任务
                    game.modules.task.models.TaskProxy.getInstance().on(modules.task.models.ACCEPTNEXTROUND_SCHOOLTASK, this, this.isAcceptNextRoundTask);
                    //主线剧情隐藏主界面后重新显示监听
                    mainhud.models.HudProxy.getInstance().on(mainhud.models.SHOW_MAINHUD_AGAIN, this, this.showAgain);
                    //评级显示监听
                    game.modules.activity.models.ActivityProxy.getInstance().on(game.modules.activity.models.PINGJI_EVENT, this, this.pingJi);
                    //是否同步队长进度弹窗
                    game.modules.activity.models.ActivityProxy.getInstance().on(game.modules.activity.models.DEFINETEAM, this, this.defineTeam);
                    game.modules.sale.models.SaleProxy.getInstance().on(game.modules.sale.models.SaleIsInit, this, function () {
                        game.modules.sale.models.SaleProxy.getInstance().event(game.modules.sale.models.SearchItemResult);
                    });
                    modules.tianjixianling.models.TianJiXianLingProxy.getInstance().on(modules.tianjixianling.models.SHOW_ITEM_SUBMIT_JIEMIAN, this, this.cSubmitItem);
                    modules.tianjixianling.models.TianJiXianLingProxy.getInstance().on(modules.tianjixianling.models.SUBMIT_PET, this, this.cSubmitPet);
                    //阵法等级提升
                    modules.team.models.TeamProxy.getInstance().on(modules.team.models.ZHENFA_LEVELUP, this, this.showZhenFaLevelUpTips);
                    //切磋界面弹窗
                    modules.friend.models.FriendProxy.getInstance().on(modules.friend.models.PK_EVENT, this, this.PK);
                    //5v5证道战匹配状态监听
                    modules.xianhui.models.XianHuiProxy.getInstance().on(modules.xianhui.models.REFRESH_MATCHSTATE2_EVENT, this, this.showpipei);
                    modules.aliveordead.models.AliveOrDeadProxy.getInstance().on(modules.aliveordead.models.InvitationLiveDieOK, this, this.showIsAcceptInvitationLiveDieBattle);
                    //求助倒计时
                    mainhud.models.HudProxy._instance.on(mainhud.models.REFRESH_TIME, this, this.refreshTime);
                };
                /** 求助倒计时 */
                MainHudModule.prototype.refreshTime = function (str) {
                    switch (str) {
                        case "bangpai":
                            Laya.timer.clear(this, this.qiuzhuBP);
                            Laya.timer.loop(1000, this, this.qiuzhuBP);
                            break;
                        case "quanfu":
                            Laya.timer.clear(this, this.qiuzhuQF);
                            Laya.timer.loop(1000, this, this.qiuzhuQF);
                            break;
                    }
                };
                MainHudModule.prototype.qiuzhuBP = function () {
                    mainhud.models.HudModel._instance.qiuzhuBP -= 1;
                    if (mainhud.models.HudModel._instance.qiuzhuBP == 0)
                        Laya.timer.clear(this, this.qiuzhuBP);
                };
                MainHudModule.prototype.qiuzhuQF = function () {
                    mainhud.models.HudModel._instance.qiuzhuQF -= 1;
                    if (mainhud.models.HudModel._instance.qiuzhuQF == 0)
                        Laya.timer.clear(this, this.qiuzhuQF);
                };
                /** 显示是否接受生死战的确认框 */
                MainHudModule.prototype.showIsAcceptInvitationLiveDieBattle = function (vo) {
                    var parame = new Laya.Dictionary();
                    var msgId;
                    if (vo.selecttype == LiveDeadSelectType.OnePerson) {
                        msgId = 162071;
                    }
                    else {
                        msgId = 162082;
                    }
                    parame.set("contentId", msgId);
                    parame.set("parame", [vo.sourcename]);
                    modules.tips.models.TipsProxy.getInstance().once(modules.tips.models.TIPS_ON_CANCEL, this, this.refuseAcceptInvitationLiveDieBattle, [vo.sourceid]);
                    modules.tips.models.TipsProxy.getInstance().once(modules.tips.models.TIPS_ON_OK, this, this.confirmAcceptInvitationLiveDieBattle, [vo.sourceid]);
                    var _tipsModule = new modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENT_TIPS_MESSAGE, parame);
                };
                /** 拒绝接受生死战
                 * @param sourceid 所下战书的角色id
                 */
                MainHudModule.prototype.refuseAcceptInvitationLiveDieBattle = function (sourceid) {
                    RequesterProtocols._instance.c2s_CAcceptInvitationLiveDieBattle(sourceid, isAccept.refuse);
                };
                /** 确认接受生死战
                 * @param sourceid 所下战书的角色id
                 */
                MainHudModule.prototype.confirmAcceptInvitationLiveDieBattle = function (sourceid) {
                    RequesterProtocols._instance.c2s_CAcceptInvitationLiveDieBattle(sourceid, isAccept.confirm);
                };
                /** 显示5V5匹配窗口 */
                MainHudModule.prototype.showpipei = function () {
                    var XianHuiPipeiMediator = new modules.xianhui.XianHuiPipeiMediator(this._app);
                    XianHuiPipeiMediator.init(1);
                };
                /** 切磋弹窗 */
                MainHudModule.prototype.PK = function (roleId, roleName, roleLevel) {
                    this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
                    this._TipsMessageMediator.show();
                    var param = new Dictionary();
                    var parameArr = [];
                    parameArr.push(roleName);
                    parameArr.push(roleLevel);
                    param.set("contentId", PromptExplain.PK_INVITATION);
                    param.set("parame", parameArr);
                    this._TipsMessageMediator.showContent(param);
                    this._TipsMessageMediator.counTime(19);
                    game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_CANCEL, this, this.isAcceptPK, [roleId, 0]);
                    game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.isAcceptPK, [roleId, 1]);
                };
                /** 是否接受PK */
                MainHudModule.prototype.isAcceptPK = function (roleId, num) {
                    RequesterProtocols._instance.c2s_CInvitationPlayPKResult(roleId, num);
                };
                /** 显示阵法等级提升的飘窗 */
                MainHudModule.prototype.showZhenFaLevelUpTips = function () {
                    var _tips = ChatModel.getInstance().chatMessageTips[420046]["msg"];
                    var _setTeamFormationVo = modules.team.models.TeamModel.getInstance().setTeamFormationVo;
                    var zhenfaId = _setTeamFormationVo.formation; //阵法id
                    var zhenfaName = HuoBanModel.getInstance().FormationbaseConfigData[zhenfaId]["name"];
                    var zhenfaLevel = _setTeamFormationVo.formationLevel; //阵法等级
                    _tips = _tips.replace("$parameter1$", zhenfaName);
                    _tips = _tips.replace("$parameter2$", (zhenfaLevel).toString());
                    this.showTips(_tips);
                };
                /**
                 * 因天机仙令任务请求上交目标宠物对象
                 */
                MainHudModule.prototype.cSubmitPet = function (things) {
                    var _tjxlData = mainhud.models.HudModel.getInstance().tjxlData;
                    /** 任务栏位 */
                    var _taskpos = modules.tianjixianling.models.TianJiXianLingModel.getInstance().taskPos;
                    /** 任务id */
                    var _taskid = _tjxlData[0]["id"];
                    /** 完成任务的角色id */
                    var _taskrole = modules.tianjixianling.models.TianJiXianLingModel.getInstance().completedTaskRoleId;
                    if (!_taskrole) {
                        _taskrole = LoginModel.getInstance().roleDetail.roleid;
                    }
                    RequesterProtocols._instance.c2s_CSubmitThings(_taskpos, _taskid, _taskrole, SubmitType.PET, things);
                };
                /**
                 * 因天机仙令任务请求上交目标道具对象
                 */
                MainHudModule.prototype.cSubmitItem = function (itemkey) {
                    var _tjxlData = mainhud.models.HudModel.getInstance().tjxlData;
                    /** 任务栏位 */
                    var _taskpos = modules.tianjixianling.models.TianJiXianLingModel.getInstance().taskPos;
                    /** 任务id */
                    var _taskid = _tjxlData[0]["id"]; //
                    /** 完成任务的角色id */
                    var _taskrole = modules.tianjixianling.models.TianJiXianLingModel.getInstance().completedTaskRoleId;
                    if (!_taskrole) {
                        _taskrole = LoginModel.getInstance().roleDetail.roleid;
                    }
                    /** 存放目标对象 */
                    var _things = [];
                    /** 上交对象 */
                    var _submit = new game.modules.task.models.SubmitUnitVo();
                    _submit.key = itemkey;
                    _submit.num = _tjxlData[0]["dstitemnum"]; //
                    _things.push(_submit);
                    RequesterProtocols._instance.c2s_CSubmitThings(_taskpos, _taskid, _taskrole, SubmitType.ITEM, _things);
                };
                /** 是否同步队长进度弹窗 */
                MainHudModule.prototype.defineTeam = function (instid, mystep, tlstep) {
                    this.openMengban();
                    this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
                    this._TipsMessageMediator.show();
                    var param = new Dictionary();
                    var parameArr = [];
                    parameArr.push(ActivityModel._instance.ShiGuangZhiXueByFuBenId.get(instid)[0].name);
                    parameArr.push(tlstep + "/5");
                    parameArr.push(mystep + "/5");
                    param.set("contentId", 166059);
                    param.set("parame", parameArr);
                    this._TipsMessageMediator.showContent(param);
                    this._TipsMessageMediator.counTime(10);
                    game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_CANCEL, this, this.defineTeamCancel);
                    game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.defineTeamOk);
                };
                MainHudModule.prototype.defineTeamCancel = function () {
                    this.closeMengban();
                    RequesterProtocols._instance.c2s_CAbsentReturnTeam(TeamMemberApply.LEAVE_SOON);
                    RequesterProtocols._instance.c2s_CDefineTeam(0);
                };
                MainHudModule.prototype.defineTeamOk = function () {
                    this.closeMengban();
                    RequesterProtocols._instance.c2s_CDefineTeam(1);
                };
                /** 显示评级界面 */
                MainHudModule.prototype.pingJi = function () {
                    var data = game.modules.friend.models.FriendModel.getInstance().SReqFortuneWheelData.get("data");
                    var grate = game.modules.activity.models.ActivityModel.getInstance().grade;
                    if (!grate || !data)
                        return;
                    var items = [];
                    for (var i = 0; i < data.itemids.length; i++) {
                        if (data.itemids[i].itemtype == 1) { //1为物品
                            items.push(data.itemids[i].id);
                        }
                    }
                    var fuBenPingJiMediator = new game.modules.commonUI.FuBenPingJiMediator(this._app, grate, items, 5);
                    fuBenPingJiMediator.show();
                };
                /**
                 * 是否接受下一轮任务
                 */
                MainHudModule.prototype.isAcceptNextRoundTask = function (taskid) {
                    var parame = new Laya.Dictionary();
                    switch (taskid) {
                        case 1030000: //日常副本任务
                            parame.set("contentId", 150535);
                            break;
                        case 1010000: //门派任务
                            parame.set("contentId", 420038);
                            break;
                    }
                    //预先监听点击确定接受下一轮日常副本任务的事件消息
                    modules.tips.models.TipsProxy.getInstance().once(modules.tips.models.TIPS_ON_OK, this, this.acceptNextRoundTask, [taskid]);
                    var _tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENT_TIPS_MESSAGE, parame);
                };
                /**
                 * 确定接受下一轮任务
                 */
                MainHudModule.prototype.acceptNextRoundTask = function (taskid) {
                    /** 临时存放日常活动数据 */
                    var tempArray = [];
                    for (var i = 0; i < ActivityModel.getInstance().ActivityNewBinDicAtType.get(viewType.VIEW1).length; i++) {
                        tempArray.push(ActivityModel.getInstance().ActivityNewBinDicAtType.get(viewType.VIEW1)[i]);
                    }
                    var _activityModule = new modules.activity.ActivityModule(this._app);
                    switch (taskid) {
                        case 1030000: //日常副本任务
                            _activityModule.onBtn(1, tempArray); //这里写死的数字1，是代表日常副本在活动主界面日常活动中活动配置表的位置
                            break;
                        case 1010000: //门派任务
                            _activityModule.onBtn(0, tempArray); //这里写死的数字0，是代表门派任务在活动主界面日常活动中活动配置表的位置
                            break;
                    }
                };
                /**
                 * 是否领取多倍点数
                 */
                MainHudModule.prototype.isGetDPoint = function () {
                    var parame = new Laya.Dictionary();
                    parame.set("contentId", 160059);
                    //预先监听点击确定接取多倍点数的事件消息
                    modules.tips.models.TipsProxy.getInstance().once(modules.tips.models.TIPS_ON_OK, this, this.getDPointOK);
                    var _tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENT_TIPS_MESSAGE, parame);
                };
                /**
                 * 确定领取多倍点数
                 */
                MainHudModule.prototype.getDPointOK = function () {
                    RequesterProtocols._instance.c2s_CGetDPoint();
                };
                /**按钮监听 */
                MainHudModule.prototype.registerEvent = function () {
                    this._viewUI.mainSkill_btn.on(LEvent.MOUSE_DOWN, this, this.showSkill); //技能系统
                    this._viewUI.mainRoleAvatar.on(LEvent.MOUSE_DOWN, this, this.showRoleinfo); //角色系统
                    this._viewUI.mainTask_btn.on(LEvent.MOUSE_DOWN, this, this.mainTaskHandler);
                    this._viewUI.mainTeam_btn.on(LEvent.MOUSE_DOWN, this, this.mainTeamHandler);
                    this._viewUI.leaveCopy_btn.on(LEvent.MOUSE_DOWN, this, this.leaveCopy);
                    this._viewUI.hideTask_btn.on(LEvent.MOUSE_DOWN, this, this.hideMiddleBox);
                    this._viewUI.showTask_btn.on(LEvent.MOUSE_DOWN, this, this.showMiddleBox);
                    this._viewUI.mainShowBot_btn.on(LEvent.MOUSE_DOWN, this, this.showBottomBox);
                    this._viewUI.mainQianghua_btn.on(LEvent.MOUSE_DOWN, this, this.qianghua);
                    this._viewUI.mainFriend_btn.on(LEvent.MOUSE_DOWN, this, this.onClickFriendBtnEvent);
                    this._viewUI.mainBag_btn.on(LEvent.MOUSE_DOWN, this, this.showBagSystem);
                    this._viewUI.smallmap_img.on(LEvent.MOUSE_DOWN, this, this.showSmallMap);
                    this._viewUI.mainGuaji_btn.on(LEvent.MOUSE_DOWN, this, this.showGuaJi); //挂机系统
                    this._viewUI.mainChat_btn.on(LEvent.CLICK, this, this.chatHandler);
                    this._viewUI.mainBigMap_btn.on(LEvent.MOUSE_DOWN, this, this.bigMap);
                    this._viewUI.mainAchievent_btn.on(LEvent.MOUSE_DOWN, this, this.AchieventHandler); //成就系統
                    this._viewUI.mainZhuzhan_btn.on(LEvent.CLICK, this, this.huoban); //伙伴系统
                    this._viewUI.mainPetAvatar.on(LEvent.CLICK, this, this.pet); //宠物系统
                    this._viewUI.mainJiangli_btn.on(LEvent.MOUSE_DOWN, this, this.rewardShow);
                    this._viewUI.mainActivity_btn.on(LEvent.MOUSE_DOWN, this, this.activity);
                    this._viewUI.mainShop_btn.on(LEvent.MOUSE_DOWN, this, this.shop);
                    this._viewUI.mainPaimai_btn.on(LEvent.MOUSE_DOWN, this, this.paimai); //拍卖
                    this._viewUI.serverExpUp_img.on(LEvent.MOUSE_DOWN, this, this.expTip);
                    this._viewUI.mainBanpai_btn.on(LEvent.MOUSE_DOWN, this, this.Bangpai); //帮派
                    this._viewUI.mainPaihang_btn.on(LEvent.CLICK, this, this.paihangbang); //排行榜系统
                    this._viewUI.mainRedPacket_btn.on(LEvent.CLICK, this, this.hongbao); //红包系统
                    this._viewUI.mainSystem_btn.on(LEvent.CLICK, this, this.setBasics); //系统设置
                    this._viewUI.tempBag_btn.on(LEvent.CLICK, this, this.opTempBag); //打开临时背包
                    this._viewUI.mainChatset_btn.on(LEvent.CLICK, this, this.opChatSet); //聊天频道设置
                    this._viewUI.yingcang_box.on(LEvent.MOUSE_DOWN, this, this.hideExpTip);
                    this._viewUI.chat_shadow_img.on(LEvent.MOUSE_DOWN, this, this.showChatSelectRender);
                    this._viewUI.xianhui_btn.on(LEvent.CLICK, this, this.xianhuiShow);
                };
                /** 主线剧情隐藏主界面后重新显示 */
                MainHudModule.prototype.showAgain = function () {
                    if (mainhud.models.HudModel.getInstance().hideMain) {
                        this.closeMengban();
                        this.show();
                    }
                };
                /** 断线弹窗提示 */
                MainHudModule.prototype.lingBroken = function () {
                    var _this = this;
                    this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
                    this._TipsMessageMediator.show();
                    var param = new Dictionary();
                    param.set("contentId", 11264);
                    param.set("btnName", "重试");
                    this._TipsMessageMediator.showContent(param);
                    game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_CANCEL, this, function () {
                        Network._instance.off(game.modules.setBasics.models.TYPE_LINK_BROKEN_EVENT, _this, _this.lingBroken);
                        _this._TipsMessageMediator.hide();
                        mainhud.models.HudProxy.getInstance().event(mainhud.models.MAINHUD_UI_HIDE);
                        game.modules.setBasics.models.SetBasicsProxy.getInstance().event(game.modules.setBasics.models.TYPE_LINK_BROKEN_BACK_EVENT);
                    });
                    game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, function () {
                        game.modules.createrole.models.LoginModel.getInstance().isBreakLink = true;
                        Network._instance.connectByUrl(Browser.window.server);
                        Laya.timer.loop(1000, _this, _this.link);
                    });
                };
                /** 检测是否已经连接成功，成功后进行登陆操作 */
                MainHudModule.prototype.link = function () {
                    if (Network._instance.connected) {
                        Laya.timer.clear(this, this.link);
                        // game.modules.createrole.models.LoginProxy.getInstance().event(game.modules.createrole.models.LOGIN_EVENT2);
                        RequesterProtocols._instance.c2s_login(LoginModel.getInstance().userLoginAccount, LoginModel.getInstance().userLoginPassword);
                    }
                };
                /** 符石不足 充值确认
                 * @param moduleName 跳转之前的模块
                 */
                MainHudModule.prototype.fushibuzu = function (moduleName) {
                    this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
                    this._TipsMessageMediator.show();
                    var param = new Dictionary();
                    param.set("contentId", 150506);
                    if (moduleName)
                        this._TipsMessageMediator.showContent(param, moduleName);
                    else
                        this._TipsMessageMediator.showContent(param);
                    game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.goRecharge);
                };
                /** 跳转充值界面
                 * @param moduleName 模块名称
                 */
                MainHudModule.prototype.goRecharge = function (moduleName) {
                    if (moduleName) {
                        modules.ModuleManager.hide(moduleName);
                        if (LoginModel.getInstance().CommonPage == "") {
                            LoginModel.getInstance().CommonPage = moduleName;
                        }
                    }
                    modules.ModuleManager.jumpPage(modules.ModuleNames.SHOP, shopMediatorType.CHONGZHI, this._app);
                };
                MainHudModule.prototype.initQianghuaData = function () {
                    this._StrengTheningInsertViewMediator.initLists();
                };
                MainHudModule.prototype.showQianghuaRedDot = function (state) {
                    if (state == 0) {
                        this._viewUI.qiangHuaRedDot_img.visible = false;
                        this._viewUI.mainShowPoint_img.visible = false;
                    }
                    else {
                        this._viewUI.qiangHuaRedDot_img.visible = true;
                        this._viewUI.mainShowPoint_img.visible = true;
                    }
                };
                MainHudModule.prototype.initFamilyData = function () {
                    this.FamilyMemberViewMediator = new game.modules.family.FamilyMemberViewMediator(this._viewUI, this._app);
                    this.FamilyMemberViewMediator.CRequestApplyList();
                };
                MainHudModule.prototype.closeFamilyRedDot = function (state) {
                    if (state == 0) {
                        this._viewUI.familyRedDot_img.visible = false;
                        this._viewUI.mainShowPoint_img.visible = false;
                    }
                    else {
                        this._viewUI.familyRedDot_img.visible = true;
                        this._viewUI.mainShowPoint_img.visible = true;
                    }
                };
                MainHudModule.prototype.showRedDot = function (redtips) {
                    var keys = redtips.keys;
                    if (redtips.get(keys[0]) == 1) {
                        this._viewUI.familyRedDot_img.visible = true;
                        this._viewUI.mainShowPoint_img.visible = true;
                    }
                    else {
                        this._viewUI.familyRedDot_img.visible = false;
                        this._viewUI.mainShowPoint_img.visible = false;
                    }
                };
                /**一级引导 */
                MainHudModule.prototype.renwuYindao = function () {
                    var x1 = this._viewUI.mainTask_panel.x + this._viewUI.mainTask_panel.width;
                    var y1 = this._viewUI.middleBox.y + this._viewUI.mainTask_panel.y;
                    var x2 = this._viewUI.mainTask_panel.x;
                    var y2 = y1 - 50;
                    this.setTipPos(x1, y1);
                    this.setAniPos(x2, y2);
                    this.startYindao(YinDaoEnum.RENWU_YINDAO_TIP);
                    this.yindaoId = YinDaoEnum.RENWU_YINDAO;
                };
                /**日常副本引导 */
                MainHudModule.prototype.richangYindao = function () {
                    var x1 = this._viewUI.mainTeam_btn.x + this._viewUI.mainTeam_btn.width + 20;
                    var y1 = this._viewUI.middleBox.y + this._viewUI.mainTeam_btn.y;
                    var x2 = x1 - 200;
                    var y2 = y1 - 100;
                    this.setTipPos(x1, y1);
                    this.setAniPos(x2, y2);
                    this.startYindao(YinDaoEnum.RICHANG_YINDAO_TIP);
                    this.yindaoId = YinDaoEnum.RICHANG_YINDAO;
                    HudModel.getInstance().yindaoId = YinDaoEnum.RICHANG_YINDAO;
                };
                /**技能引导 */
                MainHudModule.prototype.skillYindao = function (key) {
                    var x1 = this._viewUI.mainSkill_btn.x + this._viewUI.mainSkill_btn.width;
                    var y1 = this._viewUI.bottom_box.y + this._viewUI.mainSkill_btn.y - 20;
                    var x2 = x1 - 180;
                    var y2 = y1 - 60;
                    this.setTipPos(x1, y1);
                    this.setAniPos(x2, y2);
                    this.startYindao(YinDaoEnum.SKILL_YINDAO_TIP);
                    this.yindaoId = YinDaoEnum.SKILL_YINDAO;
                    if (key == SkillEnum.LIFE_KEY) //生活技能引导
                        HudModel.getInstance().yindaoId = YinDaoEnum.LIFESKILL_YINDAO;
                    else if (key == SkillEnum.ZHUANGJING_KEY) //专精技能引导
                        HudModel.getInstance().yindaoId = YinDaoEnum.ZHUANJING_CLICK_YINDAO;
                };
                /**背包引导 */
                MainHudModule.prototype.bagYindao = function (e) {
                    var x1 = this._viewUI.rightBtn_box.x - 400;
                    var y1 = this._viewUI.rightBtn_box.y + this._viewUI.mainBag_btn.y;
                    var x2 = x1 + 300;
                    var y2 = y1 - 60;
                    this.setTipPos(x1, y1);
                    this.setAniPos(x2, y2);
                    this.startYindao(YinDaoEnum.BAG_YINDAO_TIP);
                    this.yindaoId = YinDaoEnum.BAG_YINDAO;
                    HudModel.getInstance().yindaoId = e;
                };
                /**宠物加点引导 */
                MainHudModule.prototype.petPointYindao = function () {
                    var x1 = this._viewUI.pet_img.x + this._viewUI.pet_img.width;
                    var y1 = this._viewUI.top_box.y + this._viewUI.pet_img.y;
                    var x2 = x1 - 230;
                    var y2 = y1 - 80;
                    this.setTipPos(x1, y1);
                    this.setAniPos(x2, y2);
                    this.startYindao(YinDaoEnum.PET_YINDAO_TIP);
                    this.yindaoId = YinDaoEnum.CLICK_PET_YINDAO;
                    HudModel.getInstance().yindaoId = YinDaoEnum.CLICK_PET_YINDAO;
                };
                /**引导开始 */
                MainHudModule.prototype.startYindao = function (tipid) {
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
                MainHudModule.prototype.setTipPos = function (x, y) {
                    this._viewUI.yindaoTip_img.x = x;
                    this._viewUI.yindaoTip_img.y = y;
                };
                /**设置动画位置*/
                MainHudModule.prototype.setAniPos = function (x, y) {
                    this.ani.x = x;
                    this.ani.y = y;
                    this.dianImg.x = x;
                    this.dianImg.y = y;
                };
                /**关闭动画 */
                MainHudModule.prototype.closeAni = function () {
                    this.ani.clear();
                    Laya.timer.clear(this, this.closeAni);
                    Laya.timer.clear(this, this.moveImg);
                    this._viewUI.yindaoTip_img.visible = false;
                    this.dianImg.visible = false;
                };
                /**播放动画 */
                MainHudModule.prototype.onload = function () {
                    Laya.Animation.createFrames(this.anUrls("", 9), "yindao");
                    this.ani.play(0, true, "yindao");
                    this.ani.interval = 112;
                    this.dianImg.skin = "common/ui/mainhud/dian.png";
                    this.dianImg.mouseThrough = true;
                    this.ani.mouseThrough = true;
                };
                /**移动手指图标 */
                MainHudModule.prototype.moveImg = function () {
                    if (this.dianImg.y <= this.ani.y)
                        Laya.Tween.to(this.dianImg, { x: this.ani.x + 25, y: this.ani.y + 25 }, 1000, null, Laya.Handler.create(this, function () { }), null, false);
                    else
                        Laya.Tween.to(this.dianImg, { x: this.ani.x - 5, y: this.ani.y - 5 }, 1000, null, Laya.Handler.create(this, function () { }), null, false);
                };
                MainHudModule.prototype.anUrls = function (aniName, length) {
                    var urls = [];
                    for (var index = 1; index <= length; index++) {
                        urls.push("common/ui/yindao/" + aniName + index + ".png");
                    }
                    return urls;
                };
                /**获取时间戳 */
                MainHudModule.prototype.getNowTime = function () {
                    var date = new Date();
                    var str2 = ":";
                    var strHour = (date.getHours()).toString();
                    var strMinute = (date.getMinutes()).toString();
                    if (parseInt(strHour) >= 1 && parseInt(strHour) <= 9) {
                        strHour = "0" + strHour;
                    }
                    if (parseInt(strMinute) >= 1 && parseInt(strMinute) <= 9) {
                        strMinute = "0" + strMinute;
                    }
                    var currentdate = strHour + str2 + strMinute;
                    this._viewUI.mainTime.text = currentdate;
                };
                /**打开蒙版 */
                MainHudModule.prototype.openMengban = function () {
                    this._viewUI.mengban_img.visible = true;
                };
                /**关闭蒙版 */
                MainHudModule.prototype.closeMengban = function () {
                    this._viewUI.mengban_img.visible = false;
                };
                /** 聊天频道设置点击 */
                MainHudModule.prototype.opChatSet = function () {
                    this._selectChannelMediator = game.modules.chat.SelectChannelMediator.getInstance(this._app);
                    this._selectChannelMediator.onShow();
                };
                /**隐藏服务器经验提示 */
                MainHudModule.prototype.hideExpTip = function () {
                    this._viewUI.yingcang_box.visible = false;
                    this._viewUI.tip_box.visible = false;
                };
                /**服务器经验提示 */
                MainHudModule.prototype.expTip = function () {
                    this._viewUI.yingcang_box.visible = true;
                    this._viewUI.tip_box.visible = true;
                };
                /** 打开临时背包 */
                MainHudModule.prototype.opTempBag = function () {
                    this._TempBagMediator = new game.modules.bag.TempBagMediator(this._viewUI, this._app);
                    this._TempBagMediator.show();
                };
                /**帮派 */
                MainHudModule.prototype.Bangpai = function () {
                    // RequesterProtocols._instance.c2s_CRefreshRoleClan();
                    this.openClan();
                };
                MainHudModule.prototype.openClan = function () {
                    var clankey = mainhud.models.HudModel.getInstance().clankey;
                    if (clankey > 0) {
                        modules.ModuleManager.show(modules.ModuleNames.haveFamily, this._app); //有帮派界面
                    }
                    else {
                        modules.ModuleManager.show(modules.ModuleNames.Family, this._app); //没有帮派界面
                    }
                };
                /**移除主界面tips的监听 */
                MainHudModule.prototype.removeClantips = function () {
                    game.modules.tips.models.TipsProxy.getInstance().off(game.modules.tips.models.TIPS_ON_CANCEL, this, this.cancelTips);
                    game.modules.tips.models.TipsProxy.getInstance().off(game.modules.tips.models.TIPS_ON_OK, this, this.okTips);
                };
                /** 排行榜系统 */
                MainHudModule.prototype.paihangbang = function () {
                    game.modules.ranKingList.models.RanKingListProxy.getInstance().init();
                    modules.ModuleManager.show(modules.ModuleNames.RANKING_LIST, this._app);
                };
                /** 红包系统 */
                MainHudModule.prototype.hongbao = function () {
                    game.modules.redPacket.models.RedPacketProxy.getInstance().init();
                    modules.ModuleManager.show(modules.ModuleNames.RED_PACKET, this._app);
                };
                /** 系统设置  */
                MainHudModule.prototype.setBasics = function () {
                    RequesterProtocols._instance.c2s_CGetGoodLocksInfo();
                    game.modules.setBasics.models.SetBasicsProxy.getInstance().init();
                    modules.ModuleManager.show(modules.ModuleNames.SET_BASICS, this._app);
                };
                /**初始化按钮 */
                MainHudModule.prototype.initBtn = function () {
                    this._viewUI.mainSkill_btn.visible = false; //技能
                    this._viewUI.mainBanpai_btn.visible = false; //帮会
                    this._viewUI.mainZhuzhan_btn.visible = false; //助战
                    this._viewUI.mainPaihang_btn.visible = false; //排行
                    this._viewUI.mainQianghua_btn.visible = false; //强化
                    this._viewUI.mainActivity_btn.visible = false; //活动
                    this._viewUI.mainGuaji_btn.visible = false; //挂机
                    var _loginModel = game.modules.createrole.models.LoginModel.getInstance();
                    //技能按钮,等级触发14，任务完成 180106,180206,180306,180406,180506,180606,180706,180806,180906
                    if (_loginModel.roleDetail.level >= unlock.SKILL_LEVEL) {
                        this._viewUI.mainSkill_btn.visible = true;
                    }
                    //帮派按钮,等级触发16，任务完成 180163
                    if (_loginModel.roleDetail.level >= unlock.BANGPAI_LEVEL) {
                        this._viewUI.mainBanpai_btn.visible = true;
                    }
                    //助战按钮,等级触发17，任务完成 180176
                    if (_loginModel.roleDetail.level >= unlock.ZHUZHAN_LEVEL) {
                        this._viewUI.mainZhuzhan_btn.visible = true;
                    }
                    //活动按钮,等级触发19
                    if (_loginModel.roleDetail.level >= unlock.ACTIVITY_LEVEL) {
                        this._viewUI.mainActivity_btn.visible = true;
                    }
                    //挂机按钮,等级触发25，任务完成 180176
                    if (_loginModel.roleDetail.level >= unlock.GUAJI_LEVEL) {
                        this._viewUI.mainGuaji_btn.visible = true;
                    }
                    //排行按钮,等级触发31，任务完成 180176
                    if (_loginModel.roleDetail.level >= unlock.PAIHANG_LEVEL) {
                        this._viewUI.mainPaihang_btn.visible = true;
                    }
                    //强化按钮,等级触发32，任务完成 180176
                    if (_loginModel.roleDetail.level >= unlock.QIANGHUA_LEVEL) {
                        this._viewUI.mainQianghua_btn.visible = true;
                    }
                    //经验加成,等级触发35，任务完成 180176
                    if (_loginModel.roleDetail.level >= unlock.EXPUP_LEVEL) {
                        this._viewUI.serverExpUp_img.visible = true;
                    }
                    this.sortBtn(_loginModel.roleDetail.level);
                    RequesterProtocols._instance.c2s_queryregdata(); //请求每日签到状态
                    RequesterProtocols._instance.c2s_get_archive_info(); //请求成就信息
                    RequesterProtocols._instance.c2s_CRefreshRoleClan(); //请求是否有公会
                    //console.log("this.chatData...........", this.chatData)
                };
                /**初始化经验加成提示 */
                MainHudModule.prototype.initServerLevel = function () {
                    var data = HudModel._instance.cserviceexpconfigData;
                    var cstringResConfigData = game.modules.tips.models.TipsModel._instance.cstringResConfigData;
                    var roleDetail = game.modules.createrole.models.LoginModel.getInstance().roleDetail; //人物信息
                    var level = roleDetail.level - HudModel.getInstance().serverLevel; //当前等级和服务器等级的差值
                    //确定最小值
                    if (level < data[21]["midlevel"]) {
                        level = data[21]["midlevel"];
                    }
                    //确定最大值
                    if (level > data[1]["midlevel"]) {
                        level = data[1]["midlevel"];
                    }
                    var jiacheng;
                    var tip;
                    //确定经验加成数值
                    for (var i = 1; i < 22; i++) {
                        if (data[i]["midlevel"] == level) {
                            if (level == -1 || level == 0) {
                                this._viewUI.serverExpUp_img.skin = "common/ui/tongyong/deng.png";
                                jiacheng = data[i]["bili"] * 100 + "%";
                                tip = cstringResConfigData[11505].msg;
                            }
                            else if (level < -1) {
                                this._viewUI.serverExpUp_img.skin = "common/ui/pet/chongwu_jingyanup.png";
                                jiacheng = (data[i]["bili"] - 1) * 100 + "%";
                                tip = cstringResConfigData[11432].msg;
                            }
                            else if (level > 0) {
                                this._viewUI.serverExpUp_img.skin = "common/ui/pet/chongwu_jingyandown.png";
                                jiacheng = (1 - data[i]["bili"]) * 100 + "%";
                                tip = cstringResConfigData[11433].msg;
                            }
                        }
                    }
                    tip = tip.replace("$parameter1$", jiacheng);
                    this._viewUI.jiacheng_htm.innerHTML = tip;
                    var parame = [HudModel.getInstance().serverLevel, HudModel.getInstance().newleveldays];
                    var msg = cstringResConfigData[11506].msg;
                    for (var i = 0; i < parame.length; i++) {
                        msg = msg.replace("$parameter" + (i + 1) + "$", parame[i]);
                    }
                    this._viewUI.serverLevel_htm.innerHTML = msg;
                    this._viewUI.tip_htm.innerHTML = cstringResConfigData[11434].msg;
                };
                /**初始化人物信息 */
                MainHudModule.prototype.initRoleData = function () {
                    var roleDetail = game.modules.createrole.models.LoginModel.getInstance().roleDetail; //人物信息
                    this._viewUI.mainRoleRed.value = HudModel.getInstance().hpNum / HudModel.getInstance().maxHpNum; //血条
                    this._viewUI.mainRoleBule.value = HudModel.getInstance().mpNum / HudModel.getInstance().maxMpNum; //蓝条
                    //怒气条
                    if (HudModel.getInstance().maxSpNum == 0) {
                        this._viewUI.mainRoleYellow.value = 0;
                    }
                    else {
                        this._viewUI.mainRoleYellow.value = HudModel.getInstance().spNum / HudModel.getInstance().maxSpNum;
                    }
                    this._viewUI.mainRoleLevel.text = roleDetail.level; //等级
                    this._viewUI.exp_pro.value = roleDetail.exp / roleDetail.nexp; //经验条
                    this._viewUI.mainRoleAvatar.skin = "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + roleDetail.shape) + ".png"; //头像
                    //第一条任务引导（暂时不要了）
                    // if (roleDetail.level == 1) {
                    // 	for (let key in Taskmodels.getInstance().maintask.keys) {
                    // 		for (let id in this.maintaskArr) {
                    // 			if (Taskmodels.getInstance().maintask.keys[key] == this.maintaskArr[id]) {
                    // 				this.renwuYindao();
                    // 			}
                    // 		}
                    // 	}
                    // }
                };
                /**初始化宠物信息 */
                MainHudModule.prototype.initPetData = function () {
                    var _loginModel = game.modules.createrole.models.LoginModel.getInstance();
                    if (_loginModel.roleDetail.pets.length == 0) {
                        //没有宠物时，不显示
                        this._viewUI.pet_img.visible = false;
                        this._viewUI.mainPetAvatar.visible = false;
                        this._viewUI.mainPetRed.visible = false;
                        this._viewUI.mainPetBlue.visible = false;
                        this._viewUI.mainPetLevel.visible = false;
                    }
                    else if (_loginModel.roleDetail.petIndex == -1 && _loginModel.roleDetail.pets.length != 0) {
                        //有宠物但是不参战时，不显示具体蓝条和血条
                        this._viewUI.pet_img.visible = true;
                        this._viewUI.mainPetAvatar.visible = true;
                        this._viewUI.mainPetRed.visible = true;
                        this._viewUI.mainPetBlue.visible = true;
                        this._viewUI.mainPetLevel.visible = true;
                        this._viewUI.mainPetRed.value = 0; //宠物血条
                        this._viewUI.mainPetBlue.value = 0; //宠物蓝条
                        this._viewUI.mainPetLevel.text = ""; //宠物等级
                        this._viewUI.mainPetAvatar.skin = "common/ui/tongyong/chongwudiwen.png"; //宠物头像
                    }
                    else {
                        var petinfo = PetModel._instance.pets.get(_LoginModel.getInstance().roleDetail.petIndex);
                        var allpetbase = PetModel.getInstance().petCPetAttrData[petinfo.id];
                        var icondata = LoginModel.getInstance().cnpcShapeInfo[allpetbase.modelid];
                        this._viewUI.pet_img.visible = true;
                        this._viewUI.mainPetAvatar.visible = true;
                        this._viewUI.mainPetRed.visible = true;
                        this._viewUI.mainPetBlue.visible = true;
                        this._viewUI.mainPetLevel.visible = true;
                        this._viewUI.mainPetRed.value = petinfo.hp / petinfo.maxhp; //宠物血条
                        this._viewUI.mainPetBlue.value = petinfo.mp / petinfo.maxmp; //宠物蓝条
                        this._viewUI.mainPetLevel.text = petinfo.level.toString(); //宠物等级
                        this._viewUI.mainPetAvatar.skin = "common/icon/avatarpet/" + icondata.littleheadID + ".png"; //宠物头像
                    }
                };
                /**成就系统红点显示 */
                MainHudModule.prototype.onAchievePoint = function (e) {
                    this._viewUI.chengjiuPoint_img.visible = true;
                };
                /**成就系统红点隐藏 */
                MainHudModule.prototype.onHideAchievePoint = function (e) {
                    this._viewUI.chengjiuPoint_img.visible = false;
                };
                /**奖励系统红点显示 */
                MainHudModule.prototype.onRewardPoint = function (e) {
                    for (var i = 0; i < 6; i++) {
                        if (RewardModel.getInstance().pointDic.get(i) != 0) {
                            this._viewUI.jiangliPoint.visible = true;
                        }
                    }
                };
                /**奖励系统红点隐藏 */
                MainHudModule.prototype.onHideRewardPoint = function (e) {
                    this._viewUI.jiangliPoint.visible = false;
                };
                /**消息已被阅读 */
                MainHudModule.prototype.onMessageRead = function (e) {
                    this._viewUI.friendPoint_img.visible = false;
                };
                /**收到消息 */
                MainHudModule.prototype.onMessageReceive = function (e) {
                    this._viewUI.friendPoint_img.visible = true;
                };
                /** 有未读邮件*/
                MainHudModule.prototype.onReceiveMail = function (e) {
                    this._viewUI.mailPoint_img.visible = true;
                };
                /** 邮件已被阅读*/
                MainHudModule.prototype.onReadMail = function (e) {
                    this._viewUI.mailPoint_img.visible = false;
                };
                /**添加宠物 */
                MainHudModule.prototype.onAddpet = function (e) {
                    var state = LoginModel.getInstance().roleDetail.petIndex;
                    //有参战宠物
                    if (state != -1) {
                        return;
                    }
                    else {
                        this._viewUI.pet_img.visible = true;
                        this._viewUI.mainPetAvatar.visible = true;
                        this._viewUI.mainPetRed.visible = true;
                        this._viewUI.mainPetBlue.visible = true;
                        this._viewUI.mainPetLevel.visible = true;
                        this._viewUI.mainPetRed.value = 0; //宠物血条
                        this._viewUI.mainPetBlue.value = 0; //宠物蓝条
                        this._viewUI.mainPetLevel.text = ""; //宠物等级
                        this._viewUI.mainPetAvatar.skin = "common/ui/tongyong/chongwudiwen.png"; //宠物头像
                    }
                };
                /**宠物出战状态改变 */
                MainHudModule.prototype.onRefreshshstate = function (e) {
                    this._viewUI.pet_img.visible = true;
                    this._viewUI.mainPetAvatar.visible = true;
                    this._viewUI.mainPetRed.visible = true;
                    this._viewUI.mainPetBlue.visible = true;
                    this._viewUI.mainPetLevel.visible = true;
                    var state = LoginModel.getInstance().roleDetail.petIndex;
                    //有参战宠物
                    if (state != -1) {
                        var petData = PetModel.getInstance().pets.get(state);
                        var allpetbase = PetModel.getInstance().petCPetAttrData[petData.id];
                        var icondata = LoginModel.getInstance().cnpcShapeInfo[allpetbase.modelid];
                        this._viewUI.mainPetRed.value = petData.hp / petData.maxhp; //宠物血条
                        this._viewUI.mainPetBlue.value = petData.mp / petData.maxmp; //宠物蓝条
                        this._viewUI.mainPetLevel.text = petData.level.toString(); //宠物等级
                        this._viewUI.mainPetAvatar.skin = "common/icon/avatarpet/" + icondata.littleheadID + ".png"; //宠物头像
                    }
                    else {
                        this._viewUI.mainPetRed.value = 0; //宠物血条
                        this._viewUI.mainPetBlue.value = 0; //宠物蓝条
                        this._viewUI.mainPetLevel.text = ""; //宠物等级
                        this._viewUI.mainPetAvatar.skin = "common/ui/tongyong/chongwudiwen.png"; //宠物头像
                    }
                };
                /**刷新宠物信息 */
                MainHudModule.prototype.onRefreshshouming = function (e) {
                    var data = game.modules.pet.models.PetModel.getInstance().petbasedata;
                    this._viewUI.mainPetRed.value = data.hp / data.maxhp; //宠物血条
                    this._viewUI.mainPetBlue.value = data.mp / data.maxmp; //宠物蓝条
                    this._viewUI.mainPetLevel.text = data.level.toString(); //宠物等级
                };
                /**人物升级 */
                MainHudModule.prototype.onLevelUp = function (e) {
                    var promoto = HudModel.getInstance().promptAssembleBack(140406);
                    this.disappearMessageTipsMediator.xuanzhuan();
                    this.disappearMessageTipsMediator.onShow(promoto, 1);
                    this.unlockFunction(HudModel.getInstance().levelNum);
                    this._app.sceneObjectMgr.mainUnit.levelup = 1;
                    Laya.timer.clear(this, this.closetx);
                    Laya.timer.loop(2000, this, this.closetx);
                    //宠物加点引导
                    if (HudModel.getInstance().levelNum == 56 && this._viewUI.mainPetAvatar.visible == true)
                        this.petPointYindao();
                };
                /**刷新人物属性 */
                MainHudModule.prototype.onRefreshRoleData = function (e) {
                    var roleDetail = game.modules.createrole.models.LoginModel.getInstance().roleDetail;
                    var oldlevel = parseInt(this._viewUI.mainRoleLevel.text);
                    //判断是否升级
                    if (oldlevel != HudModel.getInstance().levelNum) {
                        /** 判断等级礼包是否达到领取要求 */
                        this.JudgeLevelPacks(oldlevel, HudModel.getInstance().levelNum);
                    }
                    this._viewUI.mainRoleLevel.text = HudModel.getInstance().levelNum.toString(); //等级
                    //刷新服务器经验加成数值
                    var data = HudModel._instance.cserviceexpconfigData;
                    var cstringResConfigData = game.modules.tips.models.TipsModel._instance.cstringResConfigData;
                    var level = HudModel.getInstance().levelNum - HudModel.getInstance().serverLevel; //当前等级和服务器等级的差值
                    //确定最小值
                    if (level < data[21]["midlevel"]) {
                        level = data[21]["midlevel"];
                    }
                    //确定最大值
                    if (level > data[1]["midlevel"]) {
                        level = data[1]["midlevel"];
                    }
                    var jiacheng;
                    var tip;
                    //确定经验加成数值
                    for (var i = 1; i < 22; i++) {
                        if (data[i]["midlevel"] == level) {
                            if (level == -1 || level == 0) {
                                this._viewUI.serverExpUp_img.skin = "common/ui/tongyong/deng.png";
                                jiacheng = data[i]["bili"] * 100 + "%";
                                tip = cstringResConfigData[11505].msg;
                            }
                            else if (level < -1) {
                                this._viewUI.serverExpUp_img.skin = "common/ui/pet/chongwu_jingyanup.png";
                                jiacheng = (data[i]["bili"] - 1) * 100 + "%";
                                tip = cstringResConfigData[11432].msg;
                            }
                            else if (level > 0) {
                                this._viewUI.serverExpUp_img.skin = "common/ui/pet/chongwu_jingyandown.png";
                                jiacheng = (1 - data[i]["bili"]) * 100 + "%";
                                tip = cstringResConfigData[11433].msg;
                            }
                        }
                    }
                    tip = tip.replace("$parameter1$", jiacheng);
                    this._viewUI.jiacheng_htm.innerHTML = tip;
                    this._viewUI.mainRoleRed.value = HudModel.getInstance().hpNum / HudModel.getInstance().maxHpNum; //生命值
                    this._viewUI.mainRoleBule.value = HudModel.getInstance().mpNum / HudModel.getInstance().maxMpNum; //魔法值
                    this._viewUI.mainRoleYellow.value = HudModel.getInstance().spNum / HudModel.getInstance().maxSpNum; //愤怒值
                };
                /**解锁新功能 */
                MainHudModule.prototype.unlockFunction = function (level) {
                    switch (level) {
                        case unlock.SKILL_LEVEL:
                            //技能
                            modules.ModuleManager.hide(modules.ModuleNames.Chat);
                            this.disappearMessageTipsMediator.xingongneng();
                            this._viewUI.mengban_img.visible = true;
                            this._viewUI.unlockSkill_btn.visible = true;
                            Laya.Tween.to(this._viewUI.unlockSkill_btn, { x: 549, y: 19 }, 1500, null, Laya.Handler.create(this, function () {
                                this._viewUI.unlockSkill_btn.visible = false;
                                this._viewUI.mengban_img.visible = false;
                                this._viewUI.mainSkill_btn.visible = true;
                                // ModuleManager.show(ModuleNames.Chat, this._app);
                            }), null, false);
                            this.sortBtn(level);
                            break;
                        case unlock.BANGPAI_LEVEL:
                            //帮会
                            modules.ModuleManager.hide(modules.ModuleNames.Chat);
                            this.disappearMessageTipsMediator.xingongneng();
                            this._viewUI.mengban_img.visible = true;
                            this._viewUI.unlockBangpai_btn.visible = true;
                            Laya.Tween.to(this._viewUI.unlockBangpai_btn, { x: 449, y: 19 }, 1500, null, Laya.Handler.create(this, function () {
                                this._viewUI.unlockBangpai_btn.visible = false;
                                this._viewUI.mengban_img.visible = false;
                                this._viewUI.mainBanpai_btn.visible = true;
                                // ModuleManager.show(ModuleNames.Chat, this._app);
                            }), null, false);
                            this.sortBtn(level);
                            break;
                        case unlock.ZHUZHAN_LEVEL:
                            //助战
                            modules.ModuleManager.hide(modules.ModuleNames.Chat);
                            this.disappearMessageTipsMediator.xingongneng();
                            this._viewUI.mengban_img.visible = true;
                            this._viewUI.unlockZhuzhan_btn.visible = true;
                            Laya.Tween.to(this._viewUI.unlockZhuzhan_btn, { x: 549, y: 19 }, 1500, null, Laya.Handler.create(this, function () {
                                this._viewUI.unlockZhuzhan_btn.visible = false;
                                this._viewUI.mengban_img.visible = false;
                                this._viewUI.mainZhuzhan_btn.visible = true;
                                // ModuleManager.show(ModuleNames.Chat, this._app);
                            }), null, false);
                            this.sortBtn(level);
                            break;
                        case unlock.ACTIVITY_LEVEL:
                            //活动
                            modules.ModuleManager.hide(modules.ModuleNames.Chat);
                            this.disappearMessageTipsMediator.xingongneng();
                            this._viewUI.unlockHuodong_btn.visible = true;
                            this._viewUI.mengban_img.visible = true;
                            Laya.Tween.to(this._viewUI.unlockHuodong_btn, { x: 1, y: -11 }, 1500, null, Laya.Handler.create(this, function () {
                                this._viewUI.unlockHuodong_btn.visible = false;
                                this._viewUI.mengban_img.visible = false;
                                this._viewUI.mainActivity_btn.visible = true;
                                // ModuleManager.show(ModuleNames.Chat, this._app);
                            }), null, false);
                            this.sortBtn(level);
                            break;
                        case unlock.GUAJI_LEVEL:
                            //挂机
                            modules.ModuleManager.hide(modules.ModuleNames.Chat);
                            this.disappearMessageTipsMediator.xingongneng();
                            this._viewUI.mengban_img.visible = true;
                            this._viewUI.unlockGuaji_btn.visible = true;
                            Laya.Tween.to(this._viewUI.unlockGuaji_btn, { x: 2, y: 291 }, 1500, null, Laya.Handler.create(this, function () {
                                this._viewUI.unlockGuaji_btn.visible = false;
                                this._viewUI.mengban_img.visible = false;
                                this._viewUI.mainGuaji_btn.visible = true;
                                // ModuleManager.show(ModuleNames.Chat, this._app);
                            }), null, false);
                            this.sortBtn(level);
                            break;
                        case unlock.PAIHANG_LEVEL:
                            //排行榜
                            modules.ModuleManager.hide(modules.ModuleNames.Chat);
                            this.disappearMessageTipsMediator.xingongneng();
                            this._viewUI.mengban_img.visible = true;
                            this._viewUI.unlockPaihang_btn.visible = true;
                            Laya.Tween.to(this._viewUI.unlockPaihang_btn, { x: 240, y: 19 }, 1500, null, Laya.Handler.create(this, function () {
                                this._viewUI.unlockPaihang_btn.visible = false;
                                this._viewUI.mengban_img.visible = false;
                                this._viewUI.mainPaihang_btn.visible = true;
                                // ModuleManager.show(ModuleNames.Chat, this._app);
                            }), null, false);
                            this.sortBtn(level);
                            break;
                        case unlock.QIANGHUA_LEVEL:
                            //强化
                            modules.ModuleManager.hide(modules.ModuleNames.Chat);
                            this.disappearMessageTipsMediator.xingongneng();
                            this._viewUI.mengban_img.visible = true;
                            this._viewUI.unlockQianghua_btn.visible = true;
                            Laya.Tween.to(this._viewUI.unlockQianghua_btn, { x: 136, y: 19 }, 1500, null, Laya.Handler.create(this, function () {
                                this._viewUI.unlockQianghua_btn.visible = false;
                                this._viewUI.mengban_img.visible = false;
                                this._viewUI.mainQianghua_btn.visible = true;
                                // ModuleManager.show(ModuleNames.Chat, this._app);
                            }), null, false);
                            this.sortBtn(level);
                            break;
                        case unlock.EXPUP_LEVEL:
                            this._viewUI.serverExpUp_img.visible = true; //经验加成
                            this.sortBtn(level);
                            break;
                    }
                };
                /**按钮排序 */
                MainHudModule.prototype.sortBtn = function (level) {
                    if (level >= unlock.START_LEVEL && level < unlock.SKILL_LEVEL) {
                        this._viewUI.mainJiangli_btn.y = pos.YPOS_1;
                        this._viewUI.mainAchievent_btn.y = pos.YPOS_2;
                    }
                    else if (level >= unlock.SKILL_LEVEL && level < unlock.BANGPAI_LEVEL) {
                        this._viewUI.mainSkill_btn.x = pos.XPOS_1;
                        this._viewUI.mainJiangli_btn.y = pos.YPOS_1;
                        this._viewUI.mainAchievent_btn.y = pos.YPOS_2;
                    }
                    else if (level >= unlock.BANGPAI_LEVEL && level < unlock.ZHUZHAN_LEVEL) {
                        this._viewUI.mainSkill_btn.x = pos.XPOS_1;
                        this._viewUI.mainBanpai_btn.x = pos.XPOS_2;
                        this._viewUI.mainJiangli_btn.y = pos.YPOS_1;
                        this._viewUI.mainAchievent_btn.y = pos.YPOS_2;
                    }
                    else if (level >= unlock.ZHUZHAN_LEVEL && level < unlock.ACTIVITY_LEVEL) {
                        this._viewUI.mainZhuzhan_btn.x = pos.XPOS_1;
                        this._viewUI.mainSkill_btn.x = pos.XPOS_2;
                        this._viewUI.mainBanpai_btn.x = pos.XPOS_3;
                        this._viewUI.mainJiangli_btn.y = pos.YPOS_1;
                        this._viewUI.mainAchievent_btn.y = pos.YPOS_2;
                    }
                    else if (level >= unlock.ACTIVITY_LEVEL && level < unlock.GUAJI_LEVEL) {
                        this._viewUI.mainZhuzhan_btn.x = pos.XPOS_1;
                        this._viewUI.mainSkill_btn.x = pos.XPOS_2;
                        this._viewUI.mainBanpai_btn.x = pos.XPOS_3;
                        this._viewUI.mainActivity_btn.y = pos.YPOS_1;
                        this._viewUI.mainJiangli_btn.y = pos.YPOS_2;
                        this._viewUI.mainAchievent_btn.y = pos.YPOS_3;
                    }
                    else if (level >= unlock.GUAJI_LEVEL && level < unlock.PAIHANG_LEVEL) {
                        this._viewUI.mainZhuzhan_btn.x = pos.XPOS_1;
                        this._viewUI.mainSkill_btn.x = pos.XPOS_2;
                        this._viewUI.mainBanpai_btn.x = pos.XPOS_3;
                        this._viewUI.mainActivity_btn.y = pos.YPOS_1;
                        this._viewUI.mainJiangli_btn.y = pos.YPOS_2;
                        this._viewUI.mainAchievent_btn.y = pos.YPOS_3;
                        this._viewUI.mainGuaji_btn.y = pos.YPOS_4;
                    }
                    else if (level >= unlock.PAIHANG_LEVEL && level < unlock.QIANGHUA_LEVEL) {
                        this._viewUI.mainZhuzhan_btn.x = pos.XPOS_1;
                        this._viewUI.mainSkill_btn.x = pos.XPOS_2;
                        this._viewUI.mainBanpai_btn.x = pos.XPOS_3;
                        this._viewUI.mainPaihang_btn.x = pos.XPOS_4;
                        this._viewUI.mainActivity_btn.y = pos.YPOS_1;
                        this._viewUI.mainJiangli_btn.y = pos.YPOS_2;
                        this._viewUI.mainAchievent_btn.y = pos.YPOS_3;
                        this._viewUI.mainGuaji_btn.y = pos.YPOS_4;
                    }
                    else if (level >= unlock.QIANGHUA_LEVEL) {
                        this._viewUI.mainZhuzhan_btn.x = pos.XPOS_1;
                        this._viewUI.mainSkill_btn.x = pos.XPOS_2;
                        this._viewUI.mainBanpai_btn.x = pos.XPOS_3;
                        this._viewUI.mainPaihang_btn.x = pos.XPOS_4;
                        this._viewUI.mainQianghua_btn.x = pos.XPOS_5;
                        this._viewUI.mainActivity_btn.y = pos.YPOS_1;
                        this._viewUI.mainJiangli_btn.y = pos.YPOS_2;
                        this._viewUI.mainAchievent_btn.y = pos.YPOS_3;
                        this._viewUI.mainGuaji_btn.y = pos.YPOS_4;
                    }
                };
                /**任务初始化 参数1为是否为天机仙令倒计时刷新的 , 参数2为精英副本是否通关*/
                MainHudModule.prototype.onRefreshTaskList = function (istianji, isLeaveCopy) {
                    if (game.modules.task.models.TaskModel.getInstance().isRefreshSpecialQuest) {
                        game.modules.task.models.TaskModel.getInstance().isRefreshSpecialQuest = false;
                    }
                    this._viewUI.leaveCopy_btn.visible = false;
                    var arr = [];
                    this.alltasklist = [];
                    this.htmltest = [];
                    var num = 0;
                    if (HudModel.getInstance().taskxl == 1 && !HudModel.InHandUpMap) { //是否是巡逻状态
                        this._app.sceneRoot.hangup = 0;
                        if (istianji)
                            this._app.sceneObjectMgr.mainUnit.xunluo = 3;
                        else
                            this._app.sceneObjectMgr.mainUnit.xunluo = 2;
                        HudModel.getInstance().taskxl = 0;
                    }
                    this.removetaskbtn();
                    this.removeFuBenBtn();
                    //判断是否在精英副本地图中
                    if (ActivityModel._instance.JingYingNpc.get(mainhud.models.HudModel.getInstance().sceneid) || isLeaveCopy) {
                        this._viewUI.leaveCopy_btn.visible = true;
                        this.createFuBenBtn(isLeaveCopy);
                    }
                    else {
                        /**日常副本引导 */
                        if (Taskmodels.getInstance().taskStateDic.get(500602) != undefined) {
                            //如果任务栏是收缩的，弹出
                            if (this._viewUI.showTask_btn.visible)
                                this.showMiddleBox();
                            this.richangYindao();
                            Taskmodels.getInstance().taskStateDic.remove(500602);
                        }
                        else if (Taskmodels.getInstance().taskStateDic.get(501301) != undefined || Taskmodels.getInstance().taskStateDic.get(501401) != undefined) {
                            //如果开始引导时，底部是收缩状态，展开
                            if (this._viewUI.mainSystem_btn.visible == true)
                                this.showBottomBox();
                            this.skillYindao(3); //专精技能引导(包括宠物和人物专精)
                            Taskmodels.getInstance().taskStateDic.remove(501301);
                        }
                        else if (Taskmodels.getInstance().taskStateDic.get(500104) != undefined) {
                            //如果开始引导时，底部是收缩状态，展开
                            if (this._viewUI.mainSystem_btn.visible == true)
                                this.showBottomBox();
                            this.skillYindao(2); //生活技能引导
                            Taskmodels.getInstance().taskStateDic.remove(500104);
                        }
                        if (this.firsttaskid != 0) { //未执行一系列任务
                            if (Taskmodels.getInstance().maintask.get(this.firsttaskid)) { //是否是主线
                                var maininfo = Taskmodels.getInstance().missionCMainMissionInfoData[this.firsttaskid];
                                var taskstate = Taskmodels.getInstance().maintask.get(this.firsttaskid);
                                if (taskstate.missionstatus == 4) { //是否完成
                                    this.htmltest.push(game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(maininfo.TaskInfoTraceListA, taskstate.missionvalue, 2));
                                    this.createbtn(num, maininfo.MissionName, game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(maininfo.TaskInfoTraceListA, taskstate.missionvalue, 2), this.firsttaskid);
                                    num++;
                                }
                                else {
                                    this.htmltest.push(maininfo.TaskInfoTraceListA);
                                    this.createbtn(num, maininfo.MissionName, maininfo.TaskInfoTraceListA, this.firsttaskid);
                                    num++;
                                }
                                this.alltasklist.push(this.firsttaskid);
                            }
                            else if (Taskmodels.getInstance().schooltask.get(this.firsttaskid)) { //是否是循环任务
                                var task_1 = Taskmodels.getInstance().schooltask.get(this.firsttaskid);
                                var schoolinfo = Taskmodels.getInstance().cRepeatTaskData[task_1.questtype];
                                this.htmltest.push(schoolinfo.strtaskdestrack);
                                this.createbtn(num, schoolinfo.strtaskname, schoolinfo.strtaskdestrack, this.firsttaskid);
                                num++;
                                this.alltasklist.push(this.firsttaskid);
                            }
                            else if (Taskmodels.getInstance().accepttask.get(this.firsttaskid)) { //是否是支线任务
                                var accepttasks = Taskmodels.getInstance().missionCMainMissionInfoData[this.firsttaskid];
                                var taskstate = Taskmodels.getInstance().accepttask.get(this.firsttaskid);
                                this.htmltest.push(game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(accepttasks.TaskInfoTraceListA, taskstate.missionvalue, 2));
                                this.createbtn(num, accepttasks.MissionName, game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(accepttasks.TaskInfoTraceListA, taskstate.missionvalue, 2), this.firsttaskid);
                                num++;
                                this.alltasklist.push(this.firsttaskid);
                            }
                        }
                        if (Taskmodels.getInstance().maintask.keys.length) { //主线
                            for (var key in Taskmodels.getInstance().maintask.keys) {
                                var maininfo = Taskmodels.getInstance().missionCMainMissionInfoData[Taskmodels.getInstance().maintask.keys[key]];
                                var taskstate = Taskmodels.getInstance().maintask.get(Taskmodels.getInstance().maintask.keys[key]);
                                if (this.firsttaskid == Taskmodels.getInstance().maintask.keys[key]) //是否为执行一系列任务的
                                    continue;
                                if (taskstate.missionstatus == 4) { //是否完成
                                    this.htmltest.push(game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(maininfo.TaskInfoTraceListA, taskstate.missionvalue, 2));
                                    this.createbtn(num, maininfo.MissionName, game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(maininfo.TaskInfoTraceListA, taskstate.missionvalue, 2), Taskmodels.getInstance().maintask.keys[key]);
                                    num++;
                                }
                                else {
                                    this.htmltest.push(maininfo.TaskInfoTraceListA);
                                    this.createbtn(num, maininfo.MissionName, maininfo.TaskInfoTraceListA, Taskmodels.getInstance().maintask.keys[key]);
                                    num++;
                                }
                                this.alltasklist.push(Taskmodels.getInstance().maintask.keys[key]);
                            }
                        }
                        if (Taskmodels.getInstance().schooltask.keys.length) { //推荐任务
                            for (var key in Taskmodels.getInstance().schooltask.keys) {
                                var task_2 = Taskmodels.getInstance().schooltask.get(Taskmodels.getInstance().schooltask.keys[key]);
                                var schoolinfo = Taskmodels.getInstance().cRepeatTaskData[task_2.questtype];
                                if (this.firsttaskid == Taskmodels.getInstance().schooltask.keys[key]) //是否为执行一系列任务的
                                    continue;
                                this.htmltest.push(schoolinfo.strtaskdestrack);
                                this.createbtn(num, schoolinfo.strtaskname, schoolinfo.strtaskdestrack, Taskmodels.getInstance().schooltask.keys[key]);
                                num++;
                                this.alltasklist.push(Taskmodels.getInstance().schooltask.keys[key]);
                            }
                        }
                        if (game.modules.tianjixianling.models.TianJiXianLingModel.getInstance().tjxlInfoData.jointime != 0 && mainhud.models.HudModel.getInstance().levelNum >= 50) { //天机仙令
                            var allcount = void 0;
                            var ishave = 0; //0为无
                            var strinfo1 = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11500];
                            var strinfo2 = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11592];
                            var _taskCount = game.modules.tianjixianling.models.TianJiXianLingModel._instance.tjxlInfoData.times; //获取天机仙令累积完成次数
                            var _round = Math.ceil(_taskCount / 8); //获得天机仙令任务当前处于的轮数值
                            if (_taskCount % 8 == 0 && _taskCount < 160) {
                                _round += 1;
                            }
                            else if (_taskCount == 160) {
                                _round = 20;
                            }
                            var str1 = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(strinfo1.msg, _round, 11);
                            var str2 = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(strinfo2.msg, _taskCount, 11);
                            for (var index = 20; index <= 27; index++) {
                                allcount = game.modules.task.models.TaskModel.getInstance().cSchoolTaskData[index];
                                //是否满足等级
                                if (allcount.levelmin <= mainhud.models.HudModel.getInstance().levelNum && allcount.levelmax >= mainhud.models.HudModel.getInstance().levelNum) {
                                    ishave = 1;
                                    break;
                                }
                            }
                            if (ishave == 1) { //是否满足等级									
                                str1 = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(str1, 20, 13);
                                str2 = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(str2, allcount.maxnum, 13);
                            }
                            this.createbtn(num, str1, str2, 1080000);
                            num++;
                            this.alltasklist.push(1080000);
                            //天机仙令某轮小任务数据
                            var _someRoundTasks = game.modules.tianjixianling.models.TianJiXianLingModel.getInstance().someRoundTasks;
                            for (var index = 0; index < _someRoundTasks.length; index++) {
                                ishave = 0;
                                var anye = _someRoundTasks[index];
                                if (anye.legend == 2 || anye.pos == Taskmodels.getInstance().tjxltansuo) { //处于探索状态	
                                    var anyetask = game.modules.tianjixianling.models.TianJiXianLingModel._instance.tjxlConfig[anye.id];
                                    var title = anyetask.followtitle;
                                    var content = void 0;
                                    if (anye.legend == 3) //是否完成
                                        content = anyetask.dialogdessuccess;
                                    else if (anye.legend == 4) //是否失败
                                        content = anyetask.dialogdesfail;
                                    else
                                        content = anyetask.dialogdes;
                                    var _mapId = game.modules.task.models.TaskModel.getInstance().tjxlExploreMapId;
                                    var mapinfo = game.modules.mapworld.models.MapModel.getInstance().WorldMapConfigData[_mapId];
                                    var iteminfo = game.modules.bag.models.BagModel.getInstance().itemAttrData[anye.dstitemid];
                                    if (iteminfo) { //是否需要道具信息					
                                        content = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(content, iteminfo.name, 6);
                                        content = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(content, anye.dstitemnum, 9);
                                        var ishave_1 = 0;
                                        if (iteminfo.itemtypeid == 25) { //道具类型 5为任务道具 1为普通背包道具
                                            var bag = game.modules.bag.models.BagModel.getInstance().bagMap[5];
                                            for (var index = 0; index < bag.items.length; index++) {
                                                var item = bag.items[index];
                                                if (item.id == anye.dstitemid) {
                                                    content = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(content, item.number, 8);
                                                    ishave_1 = 1;
                                                    break;
                                                }
                                            }
                                        }
                                        else {
                                            var bag = game.modules.bag.models.BagModel.getInstance().bagMap[1];
                                            for (var index = 0; index < bag.items.length; index++) {
                                                var item = bag.items[index];
                                                if (item.id == anye.dstitemid) {
                                                    content = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(content, item.number, 8);
                                                    ishave_1 = 1;
                                                    break;
                                                }
                                            }
                                        }
                                        if (ishave_1 == 0) { //是否拥有
                                            content = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(content, 0, 8);
                                        }
                                    }
                                    if (mapinfo) { //地图
                                        content = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(content, mapinfo.mapName, 15);
                                    }
                                    var _date = new Date();
                                    var nums = _date.getTime();
                                    var date = new Date(anye.legendend - nums);
                                    var str = date.getMinutes() + ":" + date.getSeconds();
                                    Laya.timer.loop(1000, this, this.reducetimer, [content, anye.legendend, anye.id]);
                                    this.lastimer = str;
                                    content = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(content, str, 16);
                                    this.createbtn(num, title, content, anye.id);
                                    num++;
                                    this.alltasklist.push(anye.id);
                                    this.tjxlpos = anye.pos;
                                    break;
                                }
                            }
                        }
                        if (Taskmodels.getInstance().accepttask.keys.length) { //支线任务
                            for (var key in Taskmodels.getInstance().accepttask.keys) {
                                var accepttasks = Taskmodels.getInstance().missionCMainMissionInfoData[Taskmodels.getInstance().accepttask.keys[key]];
                                var taskstate = Taskmodels.getInstance().accepttask.get(Taskmodels.getInstance().accepttask.keys[key]);
                                if (this.firsttaskid == Taskmodels.getInstance().accepttask.keys[key]) //是否执行一系列任务
                                    continue;
                                this.htmltest.push(game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(accepttasks.TaskInfoTraceListA, taskstate.missionvalue, 2));
                                this.createbtn(num, accepttasks.MissionName, game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(accepttasks.TaskInfoTraceListA, taskstate.missionvalue, 2), Taskmodels.getInstance().accepttask.keys[key]);
                                num++;
                                this.alltasklist.push(Taskmodels.getInstance().accepttask.keys[key]);
                            }
                        }
                    }
                    this._viewUI.mainTask_panel.vScrollBarSkin = "";
                    this._viewUI.mainTask_panel.vScrollBar.elasticDistance = 50;
                    this._viewUI.mainTask_panel.vScrollBar.elasticBackTime = 200;
                    HudModel.getInstance().autobatt.init();
                    if (HudModel.getInstance().joingame == 1) { //是否界面加载完毕
                        game.scene.models.SceneProxy.getInstance().event(game.scene.models.TASK_TIPS);
                    }
                    HudModel.getInstance().isrefreshall++;
                };
                //**定时器减少时间 天机仙令限时*/
                MainHudModule.prototype.reducetimer = function (content, timer, taskid) {
                    var _date = new Date();
                    var nums = _date.getTime();
                    if (timer - nums <= 0) { //时间是否超过
                        Laya.timer.clear(this, this.reducetimer);
                        return;
                    }
                    this.onRefreshTaskList(1);
                };
                /** 商城数据加载 */
                MainHudModule.prototype.getShopArr = function () {
                    RequesterProtocols._instance.c2s_query_limit(1, game.modules.shop.models.ShopModel.getInstance().shangHuiArr);
                    RequesterProtocols._instance.c2s_query_limit(1, game.modules.shop.models.ShopModel.getInstance().shangChengArr);
                };
                /** 推送数据加载 */
                MainHudModule.prototype.tuiSongOn = function () {
                    game.modules.createrole.models.LoginModel.getInstance().isMainInit = true;
                    var _tuiSongSettingBinDic = game.modules.activity.models.ActivityModel.getInstance().TuiSongSettingBinDic;
                    var _activityNewBinDic = game.modules.activity.models.ActivityModel.getInstance().ActivityNewBinDic;
                    var date = new Date();
                    var time = date.toLocaleDateString();
                    var day = date.getDay();
                    //date中的周日为0，表中的周日为7
                    if (day == 0) {
                        day = 7;
                    }
                    for (var num in _tuiSongSettingBinDic) {
                        var account = LocalStorage.getItem("daowang_userLoginAccount");
                        if (LocalStorage.getItem(account + num) != null) {
                            //arr内容信息---0为是否开启推送，1为是否已经推送完毕，2为活动ID
                            var arr = LocalStorage.getItem(account + num).split("_");
                            if (arr[TuiSongMessage.ISOPEN] != "1")
                                continue;
                            if (arr[TuiSongMessage.ISTUISONG] == "1")
                                continue;
                            if (_activityNewBinDic[parseInt(arr[TuiSongMessage.ACTID])] != undefined && HudModel.getInstance().levelNum < _activityNewBinDic[parseInt(arr[TuiSongMessage.ACTID])].level)
                                continue;
                            var actId = game.modules.activity.models.ActivityModel.getInstance().CheculedActivityBinDicAtActId.get(arr[TuiSongMessage.ACTID]);
                            for (var i = 0; i < actId.length; i++) {
                                //weekrepeat-----0表示节日，1-7为普通周循环周1-周日
                                if (actId[i].weekrepeat == day) {
                                    var actMessage = new game.modules.activity.models.ActMessageVo();
                                    actMessage.startTime = time + " " + actId[i].startTime;
                                    actMessage.startTime2 = time + " " + actId[i].startTime2;
                                    actMessage.endTime = time + " " + actId[i].endTime;
                                    actMessage.num = num;
                                    game.modules.activity.models.ActivityModel.getInstance().actTuiSongInfos.set(parseInt(arr[TuiSongMessage.ACTID]), actMessage);
                                }
                            }
                        }
                    }
                    this.actDetection();
                };
                MainHudModule.prototype.actLoop = function () {
                    if (this.seconds == 30) {
                        this.actDetection();
                    }
                    this.seconds++;
                };
                /** 判断时间并按要求弹出活动推送窗口 */
                MainHudModule.prototype.actDetection = function () {
                    var _this = this;
                    this.seconds = 0;
                    // var time = new Date().getTime();
                    var _actTuiSongInfos = game.modules.activity.models.ActivityModel.getInstance().actTuiSongInfos;
                    RequesterProtocols._instance.c2s_CGameTime();
                    mainhud.models.HudProxy.getInstance().once(mainhud.models.SERVER_TIME, this, function (time) {
                        for (var i = 0; i < _actTuiSongInfos.keys.length; i++) {
                            var id = _actTuiSongInfos.keys[i];
                            var num = _actTuiSongInfos.values[i].num;
                            var account = LocalStorage.getItem("daowang_userLoginAccount");
                            //正式开启时间
                            var startTime2 = new Date(_actTuiSongInfos.values[i].startTime2).getTime();
                            //活动结束时间
                            var endTime = new Date(_actTuiSongInfos.values[i].endTime).getTime();
                            if (LocalStorage.getItem(account + num) != null &&
                                LocalStorage.getItem(account + num).split("_")[TuiSongMessage.ISTUISONG] != "1") {
                                //console.log("------服务器时间：", time);
                                //console.log("------活动" + id + "开启时间：", startTime2);
                                //console.log("------活动" + id + "结束时间：", endTime);
                                //科举乡试-需要另外服务器下发的协议判断
                                if (id == ImpExamType.IMPEXAM_VILL_INSERVER && game.modules.keju.models.KejuModel.getInstance().impexamtype != ImpExamType.IMPEXAM_VILL) {
                                    continue;
                                }
                                //科举会试-需要另外服务器下发的协议判断
                                else if (id == ImpExamType.IMPEXAM_PROV_INSERVER && game.modules.keju.models.KejuModel.getInstance().impexamtype != ImpExamType.IMPEXAM_PROV) {
                                    continue;
                                }
                                else if (startTime2 > time || time > endTime) {
                                    continue;
                                }
                                //设置本地数据表示该活动已推送完毕
                                var str = LocalStorage.getItem(account + num).split("_")[TuiSongMessage.ISOPEN] + "_1_" + id;
                                LocalStorage.setItem(account + num, str);
                                //打开蒙版
                                _this.openMengban();
                                //活动参加弹窗
                                _this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(_this._viewUI, _this._app);
                                _this._TipsMessageMediator.show();
                                var param = new Dictionary();
                                var parameArr = [];
                                parameArr.push(game.modules.activity.models.ActivityModel.getInstance().ActivityNewBinDic[id].name);
                                param.set("contentId", Intra_ProgramString.ACT_START);
                                param.set("parame", parameArr);
                                _this._TipsMessageMediator.showContent(param);
                                _this._TipsMessageMediator.counTime(29);
                                game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_CANCEL, _this, _this.onCancle);
                                game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, _this, _this.onSure, [id]);
                                return;
                            }
                        }
                    });
                };
                MainHudModule.prototype.onSure = function (id) {
                    // game.modules.tips.models.TipsProxy.getInstance().off(game.modules.tips.models.TIPS_ON_CANCEL, this, this.onCancle);
                    this.closeMengban();
                    this.seconds = 0;
                    game.modules.activity.models.ActivityProxy.getInstance().event(game.modules.activity.models.TUISONG_TIAOZHUAN_EVENT, id);
                    this.actDetection();
                };
                MainHudModule.prototype.onCancle = function () {
                    // game.modules.tips.models.TipsProxy.getInstance().off(game.modules.tips.models.TIPS_ON_OK, this, this.onSure);
                    this.closeMengban();
                    this.seconds = 0;
                    this.actDetection();
                };
                /** 清除飘窗时间间隔 */
                MainHudModule.prototype.clearTimeNum = function () {
                    this.timeNum = 0;
                };
                /** 飘窗事件监听 */
                MainHudModule.prototype.regestEvent = function (promoto, id) {
                    var time = this.timeNum * 500;
                    this.timeNum += 1;
                    if (!id) {
                        Laya.timer.once(time, this, this.showTips, [promoto], false);
                    }
                    else {
                        Laya.timer.once(time, this, this.showTips, [promoto, id], false);
                    }
                };
                /** 飘窗显示 */
                MainHudModule.prototype.showTips = function (promoto, id) {
                    var disappearMessageTipsMediator = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                    if (!id) {
                        disappearMessageTipsMediator.onShow(promoto);
                    }
                    else {
                        disappearMessageTipsMediator.onShow(promoto, id);
                    }
                };
                /** 特殊副本结算骰子窗口 */
                MainHudModule.prototype.teamRollMelon = function () {
                    if (modules.team.models.TeamModel.getInstance().melonlist.length > 0) {
                        for (var i = 0; i < modules.team.models.TeamModel.getInstance().melonlist.length; i++) {
                            var rollMelon = modules.team.models.TeamModel.getInstance().melonlist[i];
                            RequesterProtocols._instance.c2s_CTeamRollMelon(rollMelon.melonid, 1);
                        }
                    }
                    // if (modules.team.models.TeamModel.getInstance().melonlist.length > 0 && this.dataNum < modules.team.models.TeamModel.getInstance().melonlist.length) {
                    // 	var rollMelon = modules.team.models.TeamModel.getInstance().melonlist[this.dataNum];
                    // 	this.jieSuanMediator = new game.modules.commonUI.ZhanDouJieSuanMediator(this._app, rollMelon);
                    // 	this.jieSuanMediator.jieSuanView();
                    // 	this.dataNum++;
                    // 	game.modules.team.models.TeamProxy.getInstance().once(game.modules.team.models.JS_CANCEL, this, this.jsCancel, [rollMelon.melonid, modules.team.models.TeamModel.getInstance().melonlist.length]);
                    // 	game.modules.team.models.TeamProxy.getInstance().once(game.modules.team.models.JS_OK, this, this.jsOk, [rollMelon.melonid, modules.team.models.TeamModel.getInstance().melonlist.length]);
                    // } else if (modules.team.models.TeamModel.getInstance().melonlist.length <= this.dataNum) {
                    // 	this.dataNum = 0;
                    // }
                };
                /** 结算取消按钮 */
                MainHudModule.prototype.jsCancel = function (melonid, arrLength) {
                    game.modules.team.models.TeamProxy.getInstance().off(game.modules.team.models.JS_OK, this, this.jsOk);
                    RequesterProtocols._instance.c2s_CTeamRollMelon(melonid, 0);
                    this.teamRollMelon();
                };
                /** 结算确定摇骰按钮 */
                MainHudModule.prototype.jsOk = function (melonid, arrLength) {
                    game.modules.team.models.TeamProxy.getInstance().off(game.modules.team.models.JS_CANCEL, this, this.jsCancel);
                    RequesterProtocols._instance.c2s_CTeamRollMelon(melonid, 1);
                    this.teamRollMelon();
                };
                /** npc对话弹窗 */
                MainHudModule.prototype.showNpcTips = function (messageId, landname) {
                    //打开蒙版
                    this.openMengban();
                    this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
                    this._TipsMessageMediator.show();
                    var param = new Dictionary();
                    param.set("contentId", messageId);
                    if (landname) {
                        var parameArr = [];
                        parameArr.push(landname);
                        param.set("parame", parameArr);
                        game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_CANCEL, this, this.onTipsCancel);
                        game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.onTipsSure, [true]);
                    }
                    else {
                        this._TipsMessageMediator.setBtnVisi();
                        game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.onTipsSure);
                    }
                    this._TipsMessageMediator.showContent(param);
                };
                /** npc对话弹窗-取消按钮 */
                MainHudModule.prototype.onTipsCancel = function () {
                    this.closeMengban();
                    game.modules.tips.models.TipsProxy.getInstance().off(game.modules.tips.models.TIPS_ON_OK, this, this.onTipsSure);
                };
                /** npc对话弹窗-确定按钮 */
                MainHudModule.prototype.onTipsSure = function (isSend) {
                    this.closeMengban();
                    game.modules.tips.models.TipsProxy.getInstance().off(game.modules.tips.models.TIPS_ON_CANCEL, this, this.onTipsCancel);
                    if (isSend)
                        RequesterProtocols._instance.c2s_drop_instance();
                };
                MainHudModule.prototype.removetaskbtn = function () {
                    for (var index = 0; index < this.tasklistkey.length; index++) {
                        this._viewUI.mainTask_panel.removeChildByName("btn" + this.tasklistkey[index]);
                        this._viewUI.mainTask_panel.removeChildByName("label" + this.tasklistkey[index]);
                        this._viewUI.mainTask_panel.removeChildByName("html" + this.tasklistkey[index]);
                    }
                    this.tasklistkey = [];
                    this.lastbtn = null;
                };
                /** 删除精英副本任务栏进度 */
                MainHudModule.prototype.removeFuBenBtn = function () {
                    if (this._viewUI.mainTask_panel.getChildByName("FBbtn")) {
                        this._viewUI.mainTask_panel.removeChildByName("FBbtn");
                        this._viewUI.mainTask_panel.removeChildByName("FBlabel");
                        this._viewUI.mainTask_panel.removeChildByName("FBhtml");
                    }
                };
                /** 进入精英副本任务栏添加进度 */
                MainHudModule.prototype.createFuBenBtn = function (isOver) {
                    var sceneid = mainhud.models.HudModel.getInstance().sceneid;
                    // var questdata: game.modules.task.models.ActiveQuestDataVo = ActivityModel.getInstance().questdata;
                    var newnpclist = game.scene.models.SceneModel.getInstance().newnpclist;
                    // let npcinfo: CNPCConfigBaseVo = game.modules.mainhud.models.HudModel.getInstance().cNPCConfigData[questdata.dstnpcid] as CNPCConfigBaseVo;
                    var npcinfo = game.modules.mainhud.models.HudModel.getInstance().cNPCConfigData[newnpclist.values[0].id];
                    var npcArr = ActivityModel._instance.JingYingNpc.get(mainhud.models.HudModel.getInstance().sceneid);
                    var index;
                    for (var i = 0; i < npcArr.length; i++) {
                        var jingYingConfigBaseVo = npcArr[i];
                        // if (jingYingConfigBaseVo.solonpcid == questdata.dstnpcid) index = i + 1;
                        if (jingYingConfigBaseVo.solonpcid == newnpclist.values[0].id)
                            index = i + 1;
                    }
                    var btn = new Button();
                    btn.skin = "common/ui/mainhud/renwuxuanzhong2.png";
                    btn.stateNum = 2;
                    btn.name = "FBbtn";
                    btn.sizeGrid = "20,20,20,20";
                    btn.width = 248;
                    btn.y = 7;
                    // if (!modules.activity.models.ActivityModel.getInstance().isOver) {
                    if (!isOver) {
                        var label = new Label();
                        label.text = "精英副本-进度(" + index + "/5)";
                        label.x = 10;
                        label.name = "FBlabel";
                        label.y = 9;
                        label.font = "SimHei";
                        label.color = "#ffeb10";
                        label.fontSize = 23;
                        btn.addChild(label);
                    }
                    else {
                        btn.removeChild(label);
                    }
                    var html = new Laya.HTMLDivElement();
                    // if (!modules.activity.models.ActivityModel.getInstance().isOver) {
                    if (!isOver) {
                        // btn.on(LEvent.CLICK, this, this.searchNpc, [sceneid, questdata.dstnpcid]);
                        btn.on(LEvent.CLICK, this, this.searchNpc, [sceneid, newnpclist.values[0].id]);
                        html.innerHTML = "<span style='color:#fff2df;fontSize:23'>请前往击败</span><span style='color:#00ff00;fontSize:23'>" + npcinfo.name + "</span>";
                    }
                    else {
                        btn.on(LEvent.CLICK, this, this.leaveCopy);
                        html.innerHTML = "<span style='color:#ffeb10;fontSize:23'>副本已完成</span>";
                    }
                    html.width = 221;
                    html.y = 35;
                    html.x = 11;
                    html.name = "FBhtml";
                    btn.height = html.contextHeight + 51;
                    html.mouseEnabled = false;
                    html.mouseThrough = true;
                    btn.addChild(html);
                    this._viewUI.mainTask_panel.addChild(btn);
                };
                /** 副本寻路 */
                MainHudModule.prototype.searchNpc = function (sceneid, npcid) {
                    var inTeamGroup = HudModel.getInstance().chargeInGroup();
                    if (inTeamGroup) {
                        var chattext = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[PromptExplain.IN_TEAM_GROUP];
                        game.modules.chat.models.ChatProxy.getInstance().event(game.modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS, [chattext.msg]);
                        return;
                    }
                    this._app.sceneRoot.istask = 2;
                    mainhud.models.HudModel._instance.useapp = this._app;
                    game.modules.mainhud.models.HudModel.getInstance().jumpmap(sceneid, npcid);
                };
                /** 离开精英副本 */
                MainHudModule.prototype.leaveCopy = function () {
                    var inTeamGroup = HudModel.getInstance().chargeInGroup();
                    if (inTeamGroup) {
                        var chattext = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[PromptExplain.IN_TEAM_GROUP];
                        game.modules.chat.models.ChatProxy.getInstance().event(game.modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS, [chattext.msg]);
                        return;
                    }
                    RequesterProtocols._instance.c2s_req_goto(1651, 149, 24);
                };
                /** 创建副本按钮 */
                MainHudModule.prototype.createbtn = function (index, tasktitle, tasktext, taskkey) {
                    var btn = new Button();
                    btn.skin = "common/ui/mainhud/renwuxuanzhong2.png";
                    btn.stateNum = 2;
                    btn.name = "btn" + taskkey;
                    btn.sizeGrid = "20,20,20,20";
                    btn.width = 248;
                    btn.on(LEvent.CLICK, this, this.onTaskSelect, [index]);
                    if (this.lastbtn == null) {
                        btn.y = 115 * index;
                        this.lastbtn = btn;
                    }
                    else {
                        btn.y = this.lastbtn.y + this.lastbtn.height;
                        this.lastbtn = btn;
                    }
                    var label = new Label();
                    label.text = tasktitle;
                    label.x = 10;
                    label.name = "label" + taskkey;
                    label.y = 9;
                    label.font = "SimHei";
                    if (taskkey >= 180101 && taskkey < 190000) {
                        label.color = "#FF00FF";
                    }
                    else {
                        label.color = "#ffeb10";
                    }
                    label.fontSize = 23;
                    btn.addChild(label);
                    var html = new Laya.HTMLDivElement();
                    html.width = 221;
                    var str = tasktext;
                    if (taskkey >= 1010000 && taskkey <= 1070000) { //循环任务
                        var info = Taskmodels.getInstance().schooltask.get(taskkey);
                        var schoolinfo = Taskmodels.getInstance().cRepeatTaskData[info.questtype];
                        var titleinfo = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(schoolinfo.strtasktitletrack, info.round, 2);
                        var allcount = game.modules.task.models.TaskModel.getInstance().cSchoolTaskData[schoolinfo.nacceptchatid];
                        var mapinfo = game.modules.mapworld.models.MapModel.getInstance().WorldMapConfigData[info.dstmapid];
                        var npcinfo = game.modules.mainhud.models.HudModel.getInstance().cNPCConfigData[info.dstnpcid];
                        var petinfo = game.modules.pet.models.PetModel.getInstance().petCPetAttrData[info.dstitemid];
                        var iteminfo = game.modules.bag.models.BagModel.getInstance().itemAttrData[info.dstitemid];
                        if (mapinfo) { //地图
                            str = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(str, mapinfo.mapName, 3);
                        }
                        if (npcinfo) { //npc
                            str = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(str, npcinfo.name, 4);
                        }
                        if (petinfo) { //宠物
                            var petnum = 0;
                            str = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(str, petinfo.name, 5);
                            for (var key in PetModel.getInstance().pets.keys) {
                                var pet_1 = PetModel.getInstance().pets.get(PetModel.getInstance().pets.keys[key]);
                                if (pet_1.key == game.modules.createrole.models.LoginModel.getInstance().roleDetail.petIndex) {
                                    continue;
                                }
                                if (pet_1.id == petinfo.id) {
                                    petnum++;
                                }
                            }
                            str = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(str, petnum, 8);
                            str = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(str, 1, 9);
                        }
                        if (iteminfo) { //道具
                            str = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(str, iteminfo.name, 6);
                            if (info.dstitemid != 0 || info.dstitemidnum2 != 0) {
                                if (info.dstitemidnum2 != 0)
                                    str = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(str, info.dstitemidnum2, 9);
                                else if (info.dstitemnum != 0)
                                    str = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(str, info.dstitemnum, 9);
                                else
                                    str = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(str, info.dstitemid2, 9);
                                var _dataKeys = Object.keys(game.modules.tianjixianling.models.TianJiXianLingModel._instance.findItemConfig);
                                for (var i = 0; i < _dataKeys.length; i++) {
                                    var cirinfo = game.modules.tianjixianling.models.TianJiXianLingModel._instance.findItemConfig[_dataKeys[i]];
                                    if (cirinfo.ctgroup == schoolinfo.ngroupid && cirinfo.levelmin <= mainhud.models.HudModel.getInstance().levelNum && cirinfo.levelmax >= mainhud.models.HudModel.getInstance().levelNum) {
                                        str = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(str, mainhud.models.HudModel.getInstance().levelNum * cirinfo.nqualitya / 1000 - cirinfo.nqualityb, 14);
                                        break;
                                    }
                                }
                                //去背包查看是否有该道具					
                                var ishave = 0;
                                var bags = void 0;
                                if (iteminfo.itemtypeid == 25) {
                                    bags = game.modules.bag.models.BagModel.getInstance().bagMap[5];
                                    for (var index = 0; index < bags.items.length; index++) {
                                        var item = bags.items[index];
                                        if (item.id == info.dstitemid) {
                                            str = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(str, item.number, 8);
                                            ishave = 1;
                                            break;
                                        }
                                    }
                                }
                                else {
                                    bags = game.modules.bag.models.BagModel.getInstance().bagMap[1];
                                    for (var index = 0; index < bags.items.length; index++) {
                                        var item = bags.items[index];
                                        if (item.id == info.dstitemid) {
                                            str = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(str, item.number, 8);
                                            ishave = 1;
                                            break;
                                        }
                                    }
                                }
                                if (ishave == 0) {
                                    str = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(str, 0, 8);
                                }
                            }
                        }
                        if (allcount) { //任务的总数
                            titleinfo = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(titleinfo, allcount.maxnum, 7);
                            label.text = titleinfo;
                        }
                    }
                    else if (taskkey >= 180101 && taskkey < 190000) { //主任务，判断是否是收集道具的
                        var maininfo = Taskmodels.getInstance().missionCMainMissionInfoData[taskkey];
                        if (maininfo.MissionType == 40) { //40为与npc战斗
                            var img = new Laya.Image();
                            img.skin = "common/ui/mainhud/mainui_zhan.png";
                            img.x = 210;
                            img.y = -2;
                            img.width = 40;
                            img.height = 40;
                            btn.addChild(img);
                        }
                        var taskstate = Taskmodels.getInstance().maintask.get(taskkey);
                        if (taskstate.missionstatus == 3) {
                            str = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(str, taskstate.missionvalue, 2);
                        }
                    }
                    html.innerHTML = str;
                    html.y = 35;
                    html.x = 11;
                    html.name = "html" + taskkey;
                    btn.height = html.contextHeight + 51;
                    html.mouseEnabled = false;
                    html.mouseThrough = true;
                    this.tasklistkey.push(taskkey);
                    btn.addChild(html);
                    this._viewUI.mainTask_panel.addChild(btn);
                };
                /**这个是用来提示有多种加经验的情况 */
                MainHudModule.prototype.onExpMessageTips = function (e) {
                    var data = HudModel.getInstance().SExpMessageTipsData.get("data");
                    var exp = data.expvalue;
                    var promoto = HudModel.getInstance().promptAssembleBack(data.messageid, [exp]);
                    var chatmessageNotify = new game.modules.chat.models.ChatMessageNotifyVo;
                    chatmessageNotify.messageid = data.messageid;
                    chatmessageNotify.parameters = [exp];
                    ChatModel._instance.systemMsgList.push(chatmessageNotify);
                    var isBattle = battle.BattleProxy.inBattle; //是否处于战斗中
                    if (!isBattle)
                        this.disappearMessageTipsMediator.onShow(promoto, 2);
                    else {
                        ChatModel.getInstance().battleEndTips.set(data.messageid, promoto);
                    }
                };
                /** 通知客户端刷新人物经验*/
                MainHudModule.prototype.onRefreshUserExp = function (e) {
                    this._viewUI.exp_pro.value = HudModel.getInstance().expNum / this.expObj[parseInt(this._viewUI.mainRoleLevel.text)].nextexp; //经验条
                };
                MainHudModule.prototype.shop = function () {
                    modules.ModuleManager.show(modules.ModuleNames.SHOP, this._app);
                };
                MainHudModule.prototype.activity = function () {
                    modules.ModuleManager.show(modules.ModuleNames.ACTIVITY, this._app);
                };
                MainHudModule.prototype.rewardShow = function () {
                    modules.ModuleManager.show(modules.ModuleNames.REWARD, this._app);
                };
                /** 组队邀请弹窗确认
                 * @param roleName 受邀人
                 * @param roleLevel 受邀者等级
                 * @param op 邀请类型
                 */
                MainHudModule.prototype._ShowConfirmWindow = function (roleName, roleLevel, op, leaderid) {
                    if (leaderid === void 0) { leaderid = 0; }
                    if (typeof (roleName) != "undefined") {
                        if (op == InviteType.NORMAL_INVITE) { /** 普通弹窗邀请 */
                            // let array: Array<any> = [];
                            // array.push(roleName); array.push(roleLevel);
                            // let prompt = mainhud.models.HudModel.getInstance().promptAssembleBack(PromptExplain.INVITE_JOIN_TEAM, array);
                            // // let prompt = "玩家"+ roleName+"( " + roleLevel+"级 ) 邀请你加入他的队伍,是否接受？";
                            // let rightBtnName = mainhud.models.HudModel.getInstance().promptAssembleBack(PromptExplain.AGREE);
                            // let leftBtnName = mainhud.models.HudModel.getInstance().promptAssembleBack(PromptExplain.REJECT);
                            // this._remindViewMediator.onShow(prompt, rightBtnName, leftBtnName);
                            // this._remindViewMediator.addSecond(20);
                            this._showConfirmTeamApply(roleName, roleLevel);
                            this._remindViewMediator.on(game.modules.commonUI.LEFT_BUTTON_EVENT, this, this.rejectRespond, [ConfirmWindowType.CONFIRM_INVITE]);
                            this._remindViewMediator.on(game.modules.commonUI.RIGHT_BUTTON_EVENT, this, this.agreeRespond, [ConfirmWindowType.CONFIRM_INVITE]);
                        }
                        else if (op == InviteType.FORCE_INVITE) { /** 强制邀请 */
                            this.agreeRespond();
                        }
                        else if (op == InviteType.INVITE_FRIEND && leaderid != 0) {
                            this._showConfirmTeamApply(roleName, roleLevel);
                            this._remindViewMediator.on(game.modules.commonUI.LEFT_BUTTON_EVENT, this, this.rejectRespond, [ConfirmWindowType.CONFIRM_INVITE]);
                            this._remindViewMediator.on(game.modules.commonUI.RIGHT_BUTTON_EVENT, this, this.agreeRespond, [ConfirmWindowType.AGREE_RESPONSE, leaderid]);
                        }
                    }
                    else { /** 召唤队员回归  */
                        var prompt_1 = this.teamInfo[0].rolename + "要召唤你归队，是否同意？";
                        var rightBtnName = "接受";
                        var leftBtnName = "拒绝";
                        this._remindViewMediator.onShow(prompt_1, rightBtnName, leftBtnName);
                        this._remindViewMediator.addSecond(30);
                        this._remindViewMediator.on(game.modules.commonUI.LEFT_BUTTON_EVENT, this, this.rejectRespond, [ConfirmWindowType.CONFIRM_INVITE]);
                        this._remindViewMediator.on(game.modules.commonUI.RIGHT_BUTTON_EVENT, this, this.agreeRespond, [ConfirmWindowType.AGREE_RESPONSE]);
                    }
                };
                /** 响应邀请弹窗确认
                 * @param roleName 申请人
                 * @param roleLevel 申请者等级
                 */
                MainHudModule.prototype._showConfirmTeamApply = function (roleName, roleLevel) {
                    var array = [];
                    array.push(roleName);
                    array.push(roleLevel);
                    var prompt = mainhud.models.HudModel.getInstance().promptAssembleBack(PromptExplain.INVITE_JOIN_TEAM, array);
                    // let prompt = "玩家"+ roleName+"( " + roleLevel+"级 ) 邀请你加入他的队伍,是否接受？";
                    var rightBtnName = mainhud.models.HudModel.getInstance().promptAssembleBack(PromptExplain.AGREE);
                    var leftBtnName = mainhud.models.HudModel.getInstance().promptAssembleBack(PromptExplain.REJECT);
                    this._remindViewMediator.onShow(prompt, rightBtnName, leftBtnName);
                    this._remindViewMediator.addSecond(20);
                };
                MainHudModule.prototype.rolemove = function (e) {
                    var mainUnit = this._app.sceneObjectMgr.mainUnit;
                    mainUnit.SetPosX(e.x);
                    mainUnit.SetPosY(e.y);
                    mainUnit.SetPos(e.x, e.y);
                    this._app.sceneObjectMgr.joinFakeMap(game.modules.mainhud.models.HudModel.getInstance().movesceneid, mainUnit.pos.x, mainUnit.pos.y);
                };
                /**
                 * 拒绝组队邀请
                 * @param type 拒绝类型
                 */
                MainHudModule.prototype.rejectRespond = function (type) {
                    if (typeof (type) != "undefined") {
                        switch (type) {
                            case ConfirmWindowType.CONFIRM_INVITE: /** 拒绝邀请入队 */
                                RequesterProtocols._instance.c2s_CRespondInvite(0);
                                break;
                            case ConfirmWindowType.CONFIRM_BACKTEAM: /** 拒绝归队 */
                                RequesterProtocols._instance.c2s_CAnswerforCallBack(0);
                                break;
                            default:
                                break;
                        }
                    }
                    this._remindViewMediator.off(game.modules.commonUI.LEFT_BUTTON_EVENT, this, this.rejectRespond);
                };
                /** 同意邀请 */
                MainHudModule.prototype.agreeRespond = function (type, leaderid) {
                    if (leaderid === void 0) { leaderid = 0; }
                    if (typeof (type) != "undefined") {
                        switch (type) {
                            case ConfirmWindowType.CONFIRM_INVITE: /** 同意邀请入队 */
                                RequesterProtocols._instance.c2s_CRespondInvite(1);
                                break;
                            case ConfirmWindowType.CONFIRM_BACKTEAM: /**同意归队 */
                                RequesterProtocols._instance.c2s_CAbsentReturnTeam(2);
                                break;
                            case ConfirmWindowType.AGREE_RESPONSE: /** 同意邀请并进行申请 */
                                if (leaderid != 0)
                                    RequesterProtocols._instance.c2s_CRequestJoinTeam(leaderid); //申请入队
                                break;
                            default:
                                break;
                        }
                    }
                    else { /** 类型未定义 */
                        RequesterProtocols._instance.c2s_CRespondInvite(1);
                    }
                    this._remindViewMediator.off(game.modules.commonUI.LEFT_BUTTON_EVENT, this, this.agreeRespond);
                };
                MainHudModule.prototype.paimai = function () {
                    modules.ModuleManager.show(modules.ModuleNames.SALE, this._app);
                };
                MainHudModule.prototype.qianghua = function () {
                    modules.ModuleManager.show(modules.ModuleNames.STRENG_THENING, this._app);
                };
                MainHudModule.prototype.bigMap = function () {
                    //世界地图
                    //game.modules.mainhud.models.HudProxy.getInstance();	
                    modules.ModuleManager.show(modules.ModuleNames.MAP_WORLD, this._app);
                };
                MainHudModule.prototype.showSmallMap = function () {
                    this._smallmapUI = new game.modules.mapworld.SmallMapMediator(this._app);
                    this._smallmapUI.show();
                };
                MainHudModule.prototype.changemap = function () {
                    // let mainUnit: Unit = this._app.sceneObjectMgr.mainUnit;		
                    if (mainhud.models.HudModel.getInstance().pos) {
                        this._viewUI.mainMapPos.text = mainhud.models.HudModel.getInstance().pos.x.toFixed(0) + "," + mainhud.models.HudModel.getInstance().pos.y.toFixed(0);
                        this._viewUI.mainMapName.text = mainhud.models.HudModel.getInstance().mapname;
                    }
                };
                /**
                 * 显示挂机系统界面
                 */
                MainHudModule.prototype.showGuaJi = function () {
                    modules.ModuleManager.show(modules.ModuleNames.GUA_JI, this._app);
                    //RequesterProtocols._instance.c2s_CReqNewHandBattle();
                };
                // private hookHandler(e: any): void {
                // 	//console.log("MainHudModule hookHandler", e);
                // 	//this._app.battleMgr.start();			
                //     /*var curPos:any = {};
                //     curPos.x = 100;
                //     curPos.y = 100;
                // 	RequesterProtocols._instance.c2s_check_move(curPos,[curPos,curPos],101);*/
                // 	RequesterProtocols._instance.c2s_CReqNewHandBattle();
                // }
                MainHudModule.prototype.chatHandler = function () {
                    //  game.modules.chat.models.ChatProxy.getInstance();
                    modules.ModuleManager.show(modules.ModuleNames.Chat, this._app);
                };
                MainHudModule.prototype.AchieventHandler = function () {
                    game.modules.achievent.models.AchieventProxy.getInstance();
                    modules.ModuleManager.show(modules.ModuleNames.ACHIEVENT, this._app);
                    RequesterProtocols._instance.c2s_get_archive_info();
                };
                //主界面任务按钮
                MainHudModule.prototype.mainTaskHandler = function (e) {
                    //console.log("mainTaskHandler", e);
                    if (this._viewUI.mainTask_panel.visible) {
                        modules.ModuleManager.show(modules.ModuleNames.TASK, this._app);
                    }
                    var _isMatch = mainhud.models.HudModel.getInstance().isMatch;
                    if (this._viewUI.teamMtch_img.visible && _isMatch) {
                        this._viewUI.teamMtch_img.visible = false;
                    }
                    this._viewUI.mainTeam_btn.selected = false;
                    this._viewUI.mainTask_btn.selected = true;
                    this._viewUI.mainTask_panel.visible = true;
                    this._viewUI.mainTeamList.visible = false;
                };
                /** 主界面队伍按钮 */
                MainHudModule.prototype.mainTeamHandler = function (e) {
                    //console.log("mainTeamHandler", e);
                    this.teamInfo = TeamModel.getInstance().TeamRoleInfoStorage;
                    if (this.yindaoId == YinDaoEnum.RICHANG_YINDAO) {
                        this.closeAni();
                    }
                    if (this.teamInfo.length == 0) {
                        modules.ModuleManager.show(modules.ModuleNames.Team, this._app);
                        /** 如果匹配状态下不更新数据 */
                        if (!this._viewUI.teamMtch_img.visible && !mainhud.models.HudModel.getInstance().isMatch)
                            this.getTeamData();
                    }
                    else if (this._viewUI.mainTeamList.visible) {
                        modules.ModuleManager.show(modules.ModuleNames.Team, this._app);
                    }
                    else {
                        this.getTeamData();
                    }
                    this._viewUI.mainTask_btn.selected = false;
                    this._viewUI.mainTeam_btn.selected = true;
                    this._viewUI.mainTask_panel.visible = false;
                    /** 不共存 */
                    if (!this._viewUI.teamMtch_img.visible && !mainhud.models.HudModel.getInstance().isMatch) {
                        this._viewUI.mainTeamList.visible = true;
                    }
                    else {
                        this._viewUI.mainTeamList.visible = false;
                    }
                    var _isMatch = mainhud.models.HudModel.getInstance().isMatch;
                    if (_isMatch) {
                        this._viewUI.teamMtch_img.visible = true;
                    }
                };
                MainHudModule.prototype.onTaskSelect = function (index) {
                    if (this.yindaoId == YinDaoEnum.RENWU_YINDAO)
                        this.closeAni();
                    mainhud.models.HudModel.getInstance().autobatt.stop();
                    this._app.sceneRoot.isnpc = 1;
                    if (AutoHangUpModels.getInstance().autotask == 0) {
                        AutoHangUpModels.getInstance().notaketimer = 0;
                    }
                    var role = game.scene.models.SceneModel.getInstance().rolelist.get(game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid);
                    var team = role.rolebasicOctets.datas.get(2);
                    if (team) {
                        if (team.teamindexstate > 0) { //在队伍中 暂离的话值为负数
                            if ((team.teamindexstate >> 4) != 1) { //141216
                                var chattext = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[141216];
                                this.tips.onShow(chattext.msg);
                                return;
                            }
                        }
                    }
                    mainhud.models.HudModel._instance.taskid = this.alltasklist[index];
                    this._app.sceneRoot.istask = 2;
                    mainhud.models.HudModel._instance.useapp = this._app;
                    if (this.alltasklist[index] >= 180000 && this.alltasklist[index] <= 190000) { //主线
                        AutoHangUpModels.getInstance().istaskwalk = 0; //主线任务
                        this._app.sceneRoot.isnpc = 1;
                        var info = game.modules.task.models.TaskModel.getInstance().missionCMainMissionInfoData[this.alltasklist[index]];
                        this.firsttaskid = info.PostMissionList[0];
                        mainhud.models.HudModel._instance.eventid = info.id;
                        mainhud.models.HudModel._instance.tasktype = info.MissionType;
                        mainhud.models.HudModel._instance.desnpc.x = info.ActiveInfoLeftPos;
                        mainhud.models.HudModel._instance.desnpc.y = info.ActiveInfoTopPos;
                        mainhud.models.HudModel._instance.npcid = info.ActiveInfoNpcID;
                        mainhud.models.HudModel._instance.jumpmapid = info.ActiveInfoMapID;
                        mainhud.models.HudModel._instance.taskstart();
                    }
                    else if (this.alltasklist[index] == 1080000) { //跳转天机仙令接取窗口
                        AutoHangUpModels.getInstance().istaskwalk = 0;
                        mainhud.models.HudModel._instance.jumpmapid = 0;
                        mainhud.models.HudModel._instance.npcid = 0;
                        mainhud.models.HudModel._instance.eventid = 1080000;
                        mainhud.models.HudModel._instance.tasktype = -1;
                        mainhud.models.HudModel._instance.taskstart();
                    }
                    else if (this.alltasklist[index] >= 1010000 && this.alltasklist[index] <= 1160000) { //推荐任务
                        AutoHangUpModels.getInstance().istaskwalk = 2; //循环任务
                        this._app.sceneRoot.isnpc = 1;
                        AutoHangUpModels.getInstance().tasktype = this.alltasklist[index]; //循环任务类型
                        var schooltaskinfo = game.modules.task.models.TaskModel.getInstance().schooltask.get(this.alltasklist[index]);
                        var info = game.modules.task.models.TaskModel.getInstance().cRepeatTaskData[schooltaskinfo.questtype];
                        this.firsttaskid = schooltaskinfo.questid;
                        mainhud.models.HudModel._instance.eventid = schooltaskinfo.questtype;
                        mainhud.models.HudModel._instance.tasktype = info.etasktype;
                        mainhud.models.HudModel._instance.desnpc.x = schooltaskinfo.dstx;
                        mainhud.models.HudModel._instance.desnpc.y = schooltaskinfo.dsty;
                        mainhud.models.HudModel._instance.npcid = schooltaskinfo.dstnpcid;
                        mainhud.models.HudModel._instance.jumpmapid = schooltaskinfo.dstmapid;
                        mainhud.models.HudModel._instance.taskstart();
                    }
                    else if (this.alltasklist[index] >= 2100202 && this.alltasklist[index] <= 2511202) { //天机仙令任务判断
                        var anyetask = game.modules.tianjixianling.models.TianJiXianLingModel._instance.tjxlConfig[this.alltasklist[index]];
                        var anye = game.modules.tianjixianling.models.TianJiXianLingModel.getInstance().someRoundTasks[this.tjxlpos];
                        var cirinfo = game.modules.tianjixianling.models.TianJiXianLingModel._instance.collectItemConfig[anyetask.group];
                        var _mapId = game.modules.task.models.TaskModel.getInstance().tjxlExploreMapId;
                        if (anye.legend == 2) {
                            mainhud.models.HudModel._instance.jumpmapid = _mapId;
                        }
                        else
                            mainhud.models.HudModel._instance.jumpmapid = 0;
                        mainhud.models.HudModel._instance.npcid = 0;
                        mainhud.models.HudModel._instance.eventid = this.alltasklist[index];
                        mainhud.models.HudModel._instance.tasktype = -1;
                        mainhud.models.HudModel._instance.taskstart();
                    }
                    else { //支线
                        var feederinfo = game.modules.task.models.TaskModel.getInstance().accepttask.get(this.alltasklist[index]);
                        var info = game.modules.task.models.TaskModel.getInstance().missionCMainMissionInfoData[this.alltasklist[index]];
                        this.firsttaskid = info.PostMissionList[0];
                        mainhud.models.HudModel._instance.eventid = info.id;
                        mainhud.models.HudModel._instance.tasktype = info.MissionType;
                        mainhud.models.HudModel._instance.desnpc.x = info.ActiveInfoLeftPos;
                        mainhud.models.HudModel._instance.desnpc.y = info.ActiveInfoTopPos;
                        mainhud.models.HudModel._instance.npcid = info.ActiveInfoNpcID;
                        mainhud.models.HudModel._instance.jumpmapid = info.ActiveInfoMapID;
                        mainhud.models.HudModel._instance.taskstart();
                    }
                };
                MainHudModule.prototype.onTeamSelect = function (index) {
                    //console.log("队伍当前索引:" + index);
                    // //console.log("选中的box:" + selBox);			
                };
                //隐藏中间板块
                MainHudModule.prototype.hideMiddleBox = function () {
                    //console.log("隐藏中间板块");
                    var _showMiddleBox = this._viewUI.showTask_btn;
                    Laya.Tween.to(this._viewUI.middleBox, { x: -400 }, 100);
                    setTimeout(function () {
                        _showMiddleBox.visible = true;
                    }, 101);
                };
                //显示底部板块
                MainHudModule.prototype.showMiddleBox = function () {
                    //console.log("隐藏中间板块");
                    Laya.Tween.to(this._viewUI.middleBox, { x: 0 }, 230);
                    this._viewUI.showTask_btn.visible = false;
                };
                //显示底部板块
                MainHudModule.prototype.showBottomBox = function () {
                    var _mainShowicon = this._viewUI.mainShowicon;
                    Laya.Tween.clearAll(_mainShowicon);
                    if (_mainShowicon.tag == null) {
                        Laya.Tween.to(_mainShowicon, { rotation: 360 }, 200);
                        Laya.Tween.to(_mainShowicon, { scaleX: 0.5, scaleY: 0.5 }, 50, null, Laya.Handler.create(this, function () {
                            Laya.Tween.to(_mainShowicon, { scaleX: 1, scaleY: 1 }, 50);
                        }));
                        var _mainSystem_btn = this._viewUI.mainSystem_btn;
                        var _mainBottomBox = this._viewUI.mainBottomBox;
                        Laya.Tween.to(_mainBottomBox, { x: 568 }, 300, Laya.Ease.bounceIn, Laya.Handler.create(this, function () {
                            _mainBottomBox.visible = false;
                            _mainSystem_btn.visible = true;
                        }));
                        _mainShowicon.tag = 1;
                    }
                    else {
                        Laya.Tween.to(_mainShowicon, { rotation: 225 }, 200);
                        Laya.Tween.to(_mainShowicon, { scaleX: 0.5, scaleY: 0.5 }, 50, null, Laya.Handler.create(this, function () {
                            Laya.Tween.to(_mainShowicon, { scaleX: 1, scaleY: 1 }, 50);
                        }));
                        var _mainSystem_btn = this._viewUI.mainSystem_btn;
                        var _mainBottomBox = this._viewUI.mainBottomBox;
                        Laya.Tween.to(_mainBottomBox, { x: 0 }, 300);
                        _mainBottomBox.visible = true;
                        _mainSystem_btn.visible = false;
                        _mainShowicon.tag = null;
                    }
                };
                /** 主界面聊天信息
                 * @param type 频道类型
                 */
                MainHudModule.prototype.onGetChatData = function (type) {
                    //console.log("主界面聊天数据下发类型...." + type);
                    // this.msgType = type;
                    if (type != ChannelType.CHANNEL_SYSTEM) { /** 这里需要做类型判断(接收频道的开关是否关闭) */
                        var _whetherShow = HudModel.getInstance().whertherShow(type);
                        if (!_whetherShow)
                            return;
                    }
                    this._viewUI.chatList_panel.vScrollBarSkin = "";
                    // if(this.chatData.length > 5) this.chatData.shift();
                    if (type == ChannelType.CHANNEL_SYSTEM) {
                        // this.sysData = modules.chat.models.ChatModel.getInstance().systemMsgList;
                        var sysdata = modules.chat.models.ChatModel.getInstance().systemMsgList;
                        try {
                            sysdata[sysdata.length - 1].messigeid;
                            if (sysdata == null)
                                return;
                            this.chatData.push(sysdata[sysdata.length - 1]);
                        }
                        catch (error) {
                            //console.log('捕获类型异常处理，执行系统聊天的类型...');
                            var Sysdata = modules.chat.models.ChatModel.getInstance().SystemMsgList;
                            if (Sysdata == null)
                                return;
                            this.chatData.push(Sysdata[Sysdata.length - 1]);
                        }
                    }
                    else {
                        var data = modules.chat.models.ChatModel.getInstance().chatList.get(type);
                        if (data == null)
                            return;
                        this.chatData.push(data[data.length - 1]);
                    }
                    if (this.chatData.length == 0)
                        return;
                    if (this._viewUI.chat_shadow_img.hasListener(LEvent.MOUSE_DOWN)) { /** 判断当前ui是否存在监听，有则移除 */
                        this._viewUI.chat_shadow_img.off(LEvent.MOUSE_DOWN, this, this.showChatSelectRender);
                    }
                    this._viewUI.chatList_panel.visible = true;
                    this._viewUI.chatList_panel.vScrollBar.elasticDistance = 100;
                    this._viewUI.chatList_panel.vScrollBar.elasticBackTime = 200;
                    this.showChatRender(this.chatData.length - 1);
                };
                /** 选中数据显示聊天界面 */
                MainHudModule.prototype.showChatSelectRender = function () {
                    modules.ModuleManager.show(modules.ModuleNames.Chat, this._app);
                };
                /**
                 * 系统消息下发
                 */
                MainHudModule.prototype.onRefreshSystemData = function (optcode, msg) {
                    // this._chatViewMediator.getSystemData();
                    var data = ChatModel._instance.chatMessageTips[msg.chatmessagenotify2client.messageid];
                    if (data == null)
                        return;
                    var dataType = data.type;
                    //console.log("主界面的提示消息下发dataType--------", dataType)
                    //接收跑马灯信息
                    if (data.type == 18) {
                        var msgId = msg.chatmessagenotify2client.messageid;
                        var parame = msg.chatmessagenotify2client.parameters;
                        var promt = HudModel.getInstance().promptAssembleBack(msgId, parame);
                        var terminalX = 0;
                        var visbleX = 530;
                        this._viewUI.gonggao_htm.innerHTML = promt;
                        Laya.Tween.to(this._viewUI.gonggao_htm, { x: visbleX }, 100, null, Laya.Handler.create(this, function () {
                            this._viewUI.gonggao_img.visible = true;
                            this._viewUI.gonggao_htm.visible = true;
                        }), null, false);
                        Laya.Tween.to(this._viewUI.gonggao_htm, { x: terminalX }, 5000, null, Laya.Handler.create(this, function () {
                            this._viewUI.gonggao_img.visible = false;
                            this._viewUI.gonggao_htm.visible = false;
                            this._viewUI.gonggao_htm.x = this.px;
                            this._viewUI.gonggao_htm.y = this.py;
                        }), null, false);
                    }
                    var arr = dataType.split(",");
                    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                        var key = arr_1[_i];
                        // if (Number(key) == 15) {
                        if (Number(key) == TipsMsgType.TIPS_SYS_CHANNEL || Number(key) == TipsMsgType.TIPS_SYSBOARD) {
                            //console.log("主界面来了======类型=15");
                            this.onGetChatData(ChannelType.CHANNEL_SYSTEM);
                        }
                    }
                };
                /**
                 * 主界面聊天渲染
                 * @param index 当前渲染下标
                 */
                MainHudModule.prototype.showChatRender = function (index) {
                    if (index != this.chatData.length - 1)
                        return;
                    var mainChatImg = new Laya.Image;
                    mainChatImg.x = 90;
                    mainChatImg.y = 5;
                    mainChatImg.height = 29;
                    mainChatImg.width = 615;
                    var logo = new Laya.Image;
                    logo.x = 2;
                    logo.y = 1;
                    var content = new Laya.HTMLDivElement;
                    content.x = 3;
                    content.y = -1;
                    content.width = 615;
                    /** 频道资源加载 */
                    HudModel.getInstance().getChannelImg(logo, this.chatData[index].messagetype);
                    if (this.chatData[index].messagetype && this.chatData[index].messagetype != ChannelType.CHANNEL_SYSTEM && typeof (this.chatData[index].roleid) == "number") { /** 判断是否是系统消息 */
                        var arr = this.chatData[index].message.split("*split");
                        /** 切割主线求助信息 */
                        var qiuZhu = this.chatData[index].message.split("*qz");
                        /** 队伍一键喊话切割 */
                        var teamyell = this.chatData[index].message.split("#,");
                        /** 智慧试炼求助切割->帮派频道 */
                        var kejuHelp = this.chatData[index].message.split(",fq,");
                        /** 天机仙令求助信息 */
                        var tianji = this.chatData[index].message.split("^");
                        var isTeamYell = false;
                        var apply_btn = new Laya.Button;
                        var apply_btn2 = new Laya.Button;
                        mainChatImg.addChild(content);
                        if (teamyell && teamyell.length == 7) { /** 是队伍的一键喊话信息 添加申请按钮 */
                            isTeamYell = true;
                            apply_btn.label = "[申请加入]";
                            ChatModel.getInstance().SetBtnAtribute(apply_btn, "#7bcf2d");
                            var html = "<img src ='' style = 'width:48px;height:1px'></img>" + "<span style='font:24px ;color:#87CEFA;SimHei'>【" + this.chatData[index].rolename + "】</span>";
                            html += "<span style='font:24px ;color:#ffffff'>[ " + teamyell[0] + "</span>";
                            html += "<span style='color:#ffffff;fontSize:24'>(" + teamyell[1] + "/5),</span>";
                            html += "<span style='color:#ffffff;fontSize:24'>等级" + teamyell[2] + "-" + teamyell[3] + "开组了! </span>";
                            html += "<span style='color:#ffffff;fontSize:24'>" + teamyell[4] + " ]</span>";
                            content.style.leading = 3;
                            content.innerHTML = html;
                            var lastwordXpos = content._childs[5]._text.words[content._childs[5]._text.words.length - 1]._x + content._childs[5]._text.words[content._childs[5]._text.words.length - 1]._w;
                            HudModel.getInstance().setApplyBtnPos(5, apply_btn, content);
                            // apply_btn.x = lastwordXpos + content.x + 2;
                            // // apply_btn.scaleX = 1.17;
                            // // apply_btn.y = content.y + content._childs[5]._text.words[content._childs[5]._text.words.length - 1]._y;
                            // let contentwidth = lastwordXpos + apply_btn.width; //加入按钮后的实际宽度
                            // /** 判断按钮显示位置，是否需要换行 */
                            // if(contentwidth > content.contextWidth )
                            // {
                            // 	let hang = content.contextHeight / 27; //行数行高27 = 字体大小24+行间距3
                            // 	{/** 换行处理 */
                            // 		content.contextHeight = content.contextHeight + apply_btn.height +content.style.leading;
                            // 		apply_btn.x = content.x ;
                            // 	    apply_btn.y = content.y + (content.style.leading +24)* hang +3;
                            // 	}
                            // }else
                            // {/** 不需要特殊处理 */
                            // 	   apply_btn.y = content.y + content._childs[5]._text.words[content._childs[5]._text.words.length - 1]._y + 3;
                            // }
                            mainChatImg.addChild(apply_btn);
                            apply_btn.on(LEvent.CLICK, this, HudModel.getInstance().onApplyJoinTeam, [teamyell[5]]);
                            content.on(LEvent.CLICK, this, this.onRequestTeamInfo, [teamyell[6]]);
                        }
                        else if (kejuHelp && kejuHelp.length == 4) {
                            // apply_btn.scaleX = 1.17;
                            apply_btn.label = "[回答问题]";
                            ChatModel.getInstance().SetBtnAtribute(apply_btn, "#ff6600");
                            var questionId = Number(kejuHelp[0]); //题目Id
                            var examtype = kejuHelp[3];
                            var data_1 = KejuModel.getInstance().getExamConfigData(examtype);
                            var html = "<img src ='' style = 'width:48px;height:1px'></img>";
                            html += "<span style='font:24px ;color:#87CEFA;SimHei'>【" + kejuHelp[1] + "】</span>";
                            html += "<span style='font:24px ;color:#ff6600'>" + data_1[questionId].name + "</span>";
                            content.style.leading = 3;
                            content.innerHTML = html;
                            mainChatImg.addChild(apply_btn);
                            var lastwordXpos = content._childs[2]._text.words[content._childs[2]._text.words.length - 1]._x + content._childs[2]._text.words[content._childs[2]._text.words.length - 1]._w;
                            HudModel.getInstance().setApplyBtnPos(2, apply_btn, content);
                            // apply_btn.x = lastwordXpos + content.x  + 30;
                            // // apply_btn.y = content.y + content._childs[2]._text.words[content._childs[2]._text.words.length - 1]._y;
                            // let contentwidth = lastwordXpos + apply_btn.width; //加入按钮后的实际宽度
                            // /** 判断按钮显示位置，是否需要换行 */
                            // if(contentwidth > content.contextWidth )
                            // {
                            // 	let hang = content.contextHeight / 27; //行数行高27 = 字体大小24+行间距3
                            // 	{/** 换行处理 */
                            // 		content.contextHeight = content.contextHeight + apply_btn.height +content.style.leading;
                            // 		apply_btn.x = content.x ;
                            // 	    apply_btn.y = content.y + (content.style.leading +24)* hang +3;
                            // 	}
                            // }else
                            // {/** 不需要特殊处理 */
                            // 	    apply_btn.y = content.y + content._childs[2]._text.words[content._childs[2]._text.words.length-1]._y +3;
                            // }
                            apply_btn.on(LEvent.CLICK, this, ChatModel.getInstance().onShowKejuTitle, [kejuHelp[0], kejuHelp[3], kejuHelp[1], kejuHelp[2], this._app]);
                            content.on(LEvent.CLICK, this, this.showChatSelectRender);
                        }
                        else if (tianji && (tianji.length == 8 || tianji.length == 2)) { /** 天机仙令 */
                            var rolename = this.chatData[index].rolename;
                            var html = "<img src ='' style = 'width:48px;height:1px'></img>";
                            html += "<span style='font:24px ;color:#87CEFA;SimHei'>【" + this.chatData[index].rolename + "】</span>";
                            html += "<span style='font:24px ;color:#87CEFA'>" + rolename + "</span>";
                            html += "<span style='font:24px ;color:#ffff00'>发布了任务求助信息</span>";
                            var taskId = tianji[0];
                            var tasktype = game.modules.tianjixianling.models.TianJiXianLingModel.getInstance().tjxlConfig[taskId].tasktype;
                            var taskname = game.modules.tianjixianling.models.TianJiXianLingModel.getInstance().tjxlConfig[taskId].strtasknameui;
                            html += "<span style='font:24px ;color:#33cc00'>" + taskname + "</span>";
                            if (tasktype != -1 && tasktype == TaskType.Pet) //需求
                             {
                                html += "<span style='font:24px ;color:#000000'>需求</span>";
                                var targetId = tianji[6];
                                var targetNum = tianji[7];
                                var petName = game.modules.pet.models.PetModel.getInstance().petCPetAttrData[targetId].name;
                                html += "<span style='font:24px ;color:#33cc00'>" + petName + "x" + targetNum + "</span>";
                                content.innerHTML = html;
                                HudModel.getInstance().setApplyBtnPos(6, apply_btn, content);
                                apply_btn.on(LEvent.CLICK, this, ChatModel.getInstance().responseTJXLHelp, [tasktype, tianji[6], tianji[0], this._app, this._viewUI, this.chatData[index].roleid]);
                            }
                            else if (tasktype != -1 && tasktype == TaskType.Item) {
                                html += "<span style='font:24px ;color:#000000'>需求</span>";
                                var targetId = tianji[6];
                                var targetNum = tianji[7];
                                var itemName = game.modules.bag.models.BagModel.getInstance().itemAttrData[targetId].name;
                                html += "<span style='font:24px ;color:#33cc00'>" + itemName + "x" + targetNum + "</span>";
                                content.innerHTML = html;
                                HudModel.getInstance().setApplyBtnPos(6, apply_btn, content);
                                apply_btn.on(LEvent.CLICK, this, ChatModel.getInstance().responseTJXLHelp, [tasktype, tianji[6], tianji[0], this._app, this._viewUI, this.chatData[index].roleid]);
                            }
                            else if (tasktype != -1 && tasktype == TaskType.NPC) {
                                content.innerHTML = html;
                                HudModel.getInstance().setApplyBtnPos(4, apply_btn, content);
                                apply_btn.on(LEvent.CLICK, this, ChatModel.getInstance().responseTJXLHelp, [tasktype, 0, 0, this._app, this._viewUI, this.chatData[index].roleid]);
                            }
                            if (tasktype == TaskType.Item || tasktype == TaskType.Pet)
                                apply_btn.label = "[帮助完成]";
                            else if (tasktype == TaskType.NPC)
                                apply_btn.label = "[申请加入]";
                            ChatModel.getInstance().SetBtnAtribute(apply_btn, "#ffff00");
                            content.style.leading = 3;
                            mainChatImg.addChild(apply_btn);
                        }
                        else if (arr.length == 2 && this.chatData[index].displayinfos.length != 0) { /** 分享之有点击事件*/
                            var share_btn = new Laya.Button;
                            var facehtml = arr[1];
                            if ((arr[1].indexOf("@") != -1)) {
                                facehtml = ChatModel.getInstance().getFaceHtmlText(arr[1]);
                            }
                            /** 主界面聊天颜色默认为白色 */
                            arr[0] = arr[0].replace("#000000", "#f6f6f4");
                            /** 根据长度计算按钮长度 */
                            var len = facehtml.length;
                            share_btn.width = 18.5 * len;
                            share_btn.height = 24;
                            share_btn.skin = "";
                            // share_btn.scaleX = 1.17;
                            share_btn.labelSize = 24;
                            share_btn.labelAlign = "left";
                            share_btn.labelColors = arr[0];
                            share_btn.label = facehtml;
                            share_btn.mouseEnabled = true;
                            share_btn.mouseThrough = false;
                            mainChatImg.addChild(share_btn);
                            content.innerHTML = "<img src ='' style = 'width:48px;height:1px'></img>" + "<span style='font:22px ;color:#87CEFA;SimHei'>【" + this.chatData[index].rolename + "】</span>";
                            var x = content._childs[1]._text.words[content._childs[1]._text.words.length - 1]._x + content._childs[1]._text.words[content._childs[1]._text.words.length - 1]._w;
                            share_btn.x = x + content.x + 20;
                            share_btn.y = content.y + content._childs[1]._text.words[content._childs[1]._text.words.length - 1]._y;
                            share_btn.on(LEvent.CLICK, this, this.onMainProp, [this.chatData[index].displayinfos[0], this.chatData[index].message, this.chatData[index].roleid]);
                        }
                        else if (arr.length == 2) { /** 正常输入切割 */
                            var facehtml = arr[1];
                            if ((arr[1].indexOf("@") != -1)) {
                                facehtml = ChatModel.getInstance().getFaceHtmlText(arr[1]);
                            }
                            /** 主界面聊天颜色默认为白色 */
                            arr[0] = arr[0].replace("#000000", "#f6f6f4");
                            content.innerHTML = "<img src ='' style = 'width:48px;height:1px'></img>" + "<span style='font:22px ;color:#87CEFA;SimHei'>【" + this.chatData[index].rolename + "】</span>" + "<span style='font:22px;color:" + arr[0] + "; SimHei'>" + facehtml + " </span> ";
                        }
                        else if (qiuZhu && qiuZhu.length > 1) {
                            ChatModel.getInstance().SetBtnAtribute(apply_btn, "#888817");
                            ChatModel.getInstance().SetBtnAtribute(apply_btn2, "#ff6600");
                            apply_btn.label = qiuZhu[1];
                            apply_btn2.label = "[申请加入]";
                            mainChatImg.addChild(apply_btn);
                            mainChatImg.addChild(apply_btn2);
                            apply_btn.labelAlign = "center";
                            apply_btn2.labelAlign = "center";
                            var width = apply_btn.label.length - apply_btn2.label.length <= 0 ? 0 : (apply_btn.label.length - apply_btn2.label.length) * 20;
                            apply_btn.width += width;
                            apply_btn.x = 50;
                            apply_btn2.x = apply_btn.x + apply_btn.width;
                            apply_btn.on(LEvent.CLICK, this, this.ChatViewMediator.otherOnItem, [this.chatData[index].displayinfos[0]]);
                            apply_btn2.on(LEvent.CLICK, this, HudModel.getInstance().onApplyJoinTeam, [this.chatData[index].roleid]);
                        }
                        else { /** 任务时直接请求 */
                            content.innerHTML = "<img src ='' style = 'width:48px;height:1px'></img>" + "<span style='font:24px ;color:#87CEFA; SimHei'>【" + this.chatData[index].rolename + "】</span>" + "<span style='font:24px;color:#ffffff; SimHei'>" + this.chatData[index].message + " </span> ";
                        }
                        /** 点击事件 */
                        if (teamyell && teamyell.length == 7) { /** 组队 */
                            // content.on(LEvent.MOUSE_DOWN,this,this.showTeamMember);
                        } //else if (this.chatData[index].displayinfos.length != 0) {/** 指定点击事件 */
                        //content.on(LEvent.CLICK, this, this.onMainProp, [this.chatData[index].displayinfos[0], this.chatData[index].message, this.chatData[index].roleid]);
                        //} 
                        else { /** 正常点击事件--》跳转至聊天界面 */
                            content.on(LEvent.CLICK, this, this.showChatSelectRender);
                        }
                        // generalInfo_lab.text = "";
                    }
                    else if (this.chatData[index].roleid && typeof (this.chatData[index].roleid) == "string") { /** 红包处理 */
                        var clickbtn = new Laya.Button;
                        // clickbtn.scaleX = 1.17;
                        var param = ChatModel.getInstance().specialChannelData.get(this.chatData[index].roleid);
                        clickbtn.label = "[抢红包]";
                        clickbtn.skin = "";
                        content.style.leading = 2;
                        var ss = "csfsf";
                        var x = void 0;
                        /** 是否是未定义的空字符串 */
                        var isundefined = this.chatData[index].message.search("undefined");
                        if (isundefined != -1) {
                            var message = this.chatData[index].message.replace("undefined", " ");
                            content.innerHTML = "<img src ='' style = 'width:48px;height:1px'></img>" + message;
                            x = content._childs[2]._text.words[content._childs[2]._text.words.length - 1]._x + content._childs[2]._text.words[content._childs[2]._text.words.length - 1]._w;
                        }
                        else {
                            content.innerHTML = "<img src ='' style = 'width:48px;height:1px'></img>" + this.chatData[index].message;
                            x = content._childs[3]._text.words[content._childs[3]._text.words.length - 1]._x + content._childs[3]._text.words[content._childs[3]._text.words.length - 1]._w;
                        }
                        if (content.contextHeight == 26) { /** 一行数据 */
                            clickbtn.x = content.x + x;
                            clickbtn.y = content.y - 2;
                        }
                        else {
                            /** 换行后的实际宽度 */
                            clickbtn.x = content.x + x;
                            clickbtn.y = content.y + (content.contextHeight / 2);
                        }
                        clickbtn.mouseEnabled = true;
                        clickbtn.labelSize = 24;
                        clickbtn.labelColors = "#008000";
                        clickbtn.width = 90;
                        clickbtn.height = 26;
                        clickbtn.on(LEvent.CLICK, this, HudModel.getInstance().onRedPacketEvent, [param]);
                        mainChatImg.addChild(content);
                        mainChatImg.addChild(clickbtn);
                        content.on(LEvent.CLICK, this, this.showChatSelectRender);
                    }
                    else { /** 系统频道消息 */
                        if (typeof (this.chatData[index].messageid) != "undefined") {
                            var msgId = this.chatData[index].messageid;
                            var data = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[msgId];
                            var param = this.chatData[index].parameters;
                            content.style.leading = 2;
                            var tempdata = HudModel.getInstance().promptAssembleBack(msgId, param);
                            content.innerHTML = "<img src ='' style = 'width:48px;height:1px'> </img>" + tempdata; //"<span style='font:24px ;color:#FFFFFF; SimHei'> " + tempdata + " </span>";//data.msg
                            mainChatImg.on(LEvent.CLICK, this, this.showChatSelectRender);
                            // generalInfo_lab.text = "";
                            mainChatImg.addChild(content);
                        }
                        else if (typeof (this.chatData[index].message) != "undefined") {
                            var generalInfo_lab = new Laya.Label;
                            generalInfo_lab.x = 52;
                            generalInfo_lab.y = 0;
                            generalInfo_lab.width = 582;
                            generalInfo_lab.height = 27;
                            generalInfo_lab.fontSize = 25;
                            generalInfo_lab.color = "#ffffff";
                            generalInfo_lab.align = "left";
                            generalInfo_lab.overflow = "visible";
                            generalInfo_lab.wordWrap = true;
                            // generalInfo_lab.scaleX = 1.17;
                            var tempData = this.chatData[index].message;
                            generalInfo_lab.text = tempData;
                            mainChatImg.on(LEvent.CLICK, this, this.showChatSelectRender);
                            // content.innerHTML = "";
                            mainChatImg.addChild(generalInfo_lab);
                        }
                    }
                    if (this.lastImg == null) {
                        mainChatImg.y = 1;
                    }
                    else { /**第二个以上 */
                        mainChatImg.y = this.lastImg.y + this.lastImg.height + 2;
                    }
                    if (content.contextHeight > mainChatImg.height) { /** 位置重新处理 */
                        mainChatImg.height = content.contextHeight;
                        if (content.contextHeight == 80) { /** 表情位置处理 */
                            content.y = -30;
                            mainChatImg.height -= 30;
                            mainChatImg.y += 30;
                        }
                    }
                    else if (generalInfo_lab && generalInfo_lab.text != "") {
                        mainChatImg.height = 2 * generalInfo_lab.height;
                    }
                    /** 滚动条信息 */
                    var scrollY = mainChatImg.y;
                    // mainChatImg.skin = "common/ui/liaotian/liaotian_tiaose_hong.png";
                    mainChatImg.addChild(logo);
                    this.lastImg = mainChatImg; //JSON.stringify(logo); //Object.assign({},logo)  //$.extend(true,{},logo);
                    this._viewUI.chatList_panel.addChild(mainChatImg);
                    if (scrollY >= 150) { /** 大于 容器节点的高度时才滚动*/
                        this._viewUI.chatList_panel.vScrollBar.setScroll(0, scrollY, scrollY);
                        this._viewUI.chatList_panel.scrollTo(null, scrollY);
                    }
                };
                /** 点击富文本显示该角色队伍信息 */
                MainHudModule.prototype.onRequestTeamInfo = function (teamid) {
                    RequesterProtocols._instance.c2s_COneKeyApplyTeamInfo(teamid);
                    modules.team.models.TeamProxy.getInstance().once(modules.team.models.ONE_KEY_TEAMINFO, this, this.onShowTeamInfo);
                };
                /** 队伍情况界面 */
                MainHudModule.prototype.onShowTeamInfo = function (teaminfo) {
                    var _memberlist = teaminfo.get("memberlist");
                    var TeamInfoMediator = new modules.team.TeamInfoMediator(this._app);
                    TeamInfoMediator.onshow(_memberlist);
                };
                /** 主界面点击聊天记录弹出tips */
                MainHudModule.prototype.onMainProp = function (displayinfos, itemName, roleId, e) {
                    e.stopPropagation();
                    var roleid = LoginModel.getInstance().roleDetail.roleid;
                    if (roleId == roleid && displayinfos.displaytype == DisplayType.DISPLAY_ITEM) { /** 自己点击并且是道具物品时 */
                        var fromBag = true;
                        this.ChatViewMediator.showItemTips(displayinfos, fromBag, this._app, this._viewUI);
                    }
                    else {
                        var arr = itemName.split("*split");
                        if (arr.length == 2)
                            itemName = arr[1];
                        this.ChatViewMediator.otherOnItem(displayinfos, itemName);
                    }
                };
                /** 查看其它玩家tips */
                MainHudModule.prototype._ViewOtherItem = function () {
                    this.ChatViewMediator._ViewOtherItem(this._viewUI, this._app);
                };
                /** 打开宠物详情界面 */
                MainHudModule.prototype.OpPetInfoInMain = function (petinfo) {
                    var isShowInStage = _super.prototype.isShow.call(this);
                    this.PetXiangQingMediator = new game.modules.pet.PetXiangQingMediator(this._app);
                    this.PetXiangQingMediator.init(petinfo);
                };
                /** 移除打开宠物详情的监听 */
                MainHudModule.prototype.removePetInfoListener = function () {
                    var flag = HudModel.getInstance().isListenerPetInfo;
                    if (!HudModel.getInstance().isListenerPetInfo)
                        return;
                    modules.pet.models.PetProxy.getInstance().off(modules.pet.models.GETPETINFO, this, this.OpPetInfoInMain);
                    HudModel.getInstance().isListenerPetInfo = false;
                };
                /** 打开主界面宠物详情的监听 */
                MainHudModule.prototype.openPetInfoListener = function () {
                    var flag = HudModel.getInstance().isListenerPetInfo;
                    if (HudModel.getInstance().isListenerPetInfo)
                        return;
                    modules.pet.models.PetProxy.getInstance().on(modules.pet.models.GETPETINFO, this, this.OpPetInfoInMain);
                    HudModel.getInstance().isListenerPetInfo = true;
                };
                /**进入角色系统 */
                MainHudModule.prototype.showRoleinfo = function () {
                    modules.ModuleManager.show(modules.ModuleNames.ROLE_Info, this._app);
                };
                /**进入技能系统 */
                MainHudModule.prototype.showSkill = function () {
                    modules.ModuleManager.show(modules.ModuleNames.SKILL, this._app);
                    if (this.yindaoId == YinDaoEnum.SKILL_YINDAO)
                        this.closeAni();
                };
                /**
                 * @describe  显示背包系统
                 */
                MainHudModule.prototype.showBagSystem = function () {
                    modules.ModuleManager.show(modules.ModuleNames.BAG, this._app);
                    if (this.yindaoId == YinDaoEnum.BAG_YINDAO)
                        this.closeAni();
                };
                /**
                 * @describe  点击好友按钮的事件
                 */
                MainHudModule.prototype.onClickFriendBtnEvent = function () {
                    var _isShowSystemFriendMsg = modules.friend.models.FriendModel.getInstance().isShowSystemFriendMsg;
                    if (_isShowSystemFriendMsg) {
                        modules.ModuleManager.show(modules.ModuleNames.FRIEND, this._app);
                        return;
                    }
                    var _duringOfflineFriendGiveItem = modules.friend.models.FriendModel.getInstance().duringOfflineFriendGiveItem;
                    if (_duringOfflineFriendGiveItem.length != 0) {
                        bagModel.getInstance().SlideItem = [];
                        for (var i = 0; i < _duringOfflineFriendGiveItem.length; i++) {
                            bagModel.getInstance().SlideItem.unshift(_duringOfflineFriendGiveItem[i].itemid); //头插入所赠送道具的id
                            if (bagModel.getInstance().SlideItem.length != 0) {
                                Laya.timer.once(1000, this, this.sendBagEvent); //延迟一秒播放道具滑动到背包的效果
                            }
                        }
                        modules.friend.models.FriendModel.getInstance().isShowSystemFriendMsg = true;
                    }
                    modules.ModuleManager.show(modules.ModuleNames.FRIEND, this._app);
                };
                /** 派发道具滑动到背包事件 */
                MainHudModule.prototype.sendBagEvent = function () {
                    modules.bag.models.BagProxy.getInstance().event(modules.bag.models.ITEM_SLIDE);
                };
                MainHudModule.prototype.huoban = function () {
                    game.modules.huoban.models.HuoBanProxy.getInstance().init();
                    HuoBanModel.getInstance().is_frome_ZFGH_to_SH = true;
                    modules.ModuleManager.show(modules.ModuleNames.HUOBAN, this._app);
                };
                MainHudModule.prototype.pet = function () {
                    if (this.yindaoId = YinDaoEnum.CLICK_PET_YINDAO)
                        this.closeAni();
                    game.modules.pet.models.PetProxy.getInstance().init();
                    modules.ModuleManager.show(modules.ModuleNames.PET, this._app);
                };
                MainHudModule.prototype.show = function () {
                    _super.prototype.show.call(this);
                    this._app.uiRoot.closeLoadProgress();
                    var data = game.modules.friend.models.FriendModel.getInstance().SOffLineMsgMessageToRoleData.get("data");
                    var sysdata = game.modules.friend.models.FriendModel.getInstance().SSendSystemMessageToRoleData.get("data");
                    //如果有离线消息或系统消息，好友显示红点
                    if (data != null || sysdata != null) {
                        this._viewUI.friendPoint_img.visible = true;
                    }
                    this.px = this._viewUI.gonggao_htm.x;
                    this.py = this._viewUI.gonggao_htm.y;
                    mainhud.models.HudProxy.getInstance().on(mainhud.models.MAINHUD_UI_HIDE, this, this.hide);
                };
                MainHudModule.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                MainHudModule.prototype.getView = function () {
                    return this._viewUI;
                };
                MainHudModule.prototype.c2sGetItemTips = function () {
                    this.cgetitemTips(BagTypes.BAG);
                    this.cgetitemTips(BagTypes.EQUIP);
                };
                MainHudModule.prototype.cgetitemTips = function (bagType) {
                    var bag = BagModel.getInstance().getBagGameItemData(bagType);
                    var items = bag.items;
                    for (var i = 0; i < items.length; i++) {
                        var id = items[i].id;
                        var key = items[i].key;
                        if (120000 <= id && id <= 126675 || 140000 <= id && id <= 140005 || 10000 <= id && id <= 10009) {
                            RequesterProtocols._instance.c2s_CGetItem_Tips(bagType, key);
                        }
                        else if (111000 <= id && id <= 111053) {
                            RequesterProtocols._instance.c2s_CGetItem_Tips(bagType, key);
                        }
                        else if (100000 <= id && id <= 107044 || 330100 <= id && id <= 340074) {
                            RequesterProtocols._instance.c2s_CGetItem_Tips(bagType, key);
                        }
                    }
                };
                MainHudModule.prototype.changepost = function (e) {
                    if (1784 <= HudModel.getInstance().sceneid && HudModel.getInstance().sceneid <= 1786) {
                        this._viewUI.xianhui_btn.visible = true;
                        this._viewUI.xianhui_lab.visible = true;
                        this._viewUI.xianhui_lab.text = "叁对叁证道战";
                    }
                    else if (1787 <= HudModel.getInstance().sceneid && HudModel.getInstance().sceneid <= 1798) {
                        this._viewUI.xianhui_btn.visible = true;
                        this._viewUI.xianhui_lab.visible = true;
                        this._viewUI.xianhui_lab.text = "伍对伍证道战";
                    }
                    var mainUnit = this._app.sceneObjectMgr.mainUnit;
                    mainUnit.SetPosX(e.x);
                    mainUnit.SetPosY(e.y);
                    mainUnit.SetPos(e.x, e.y);
                    game.scene.models.SceneModel.getInstance().smallallnpc.clear();
                    this._app.sceneObjectMgr.joinFakeMap(game.modules.mainhud.models.HudModel.getInstance().movesceneid, mainUnit.pos.x, mainUnit.pos.y);
                    this.changjingchange.show();
                };
                /** 显示战仙会 */
                MainHudModule.prototype.xianhuiShow = function () {
                    if (1784 <= HudModel.getInstance().sceneid && HudModel.getInstance().sceneid <= 1786) {
                        modules.ModuleManager.show(modules.ModuleNames.XIANHUI, this._app);
                    }
                    else if (1787 <= HudModel.getInstance().sceneid && HudModel.getInstance().sceneid <= 1798) {
                        this.XianHui5V5Mediator = new game.modules.xianhui.XianHui5V5Mediator(this._app);
                        this.XianHui5V5Mediator.show();
                    }
                };
                /** 初始化配置表 */
                MainHudModule.prototype.initConfig = function () {
                    if (!this.initFlag) {
                        var shapeInfo = LoginModel.getInstance().cnpcShapeInfo;
                        for (var index in shapeInfo) { /** 造型表数据放入 */
                            this.shapeInfo.push(shapeInfo[index].littleheadID);
                        }
                        /** 监听事件 */
                        this.initListenerEvent();
                        this.judgeBagIsFull();
                    }
                    this.initFlag = true;
                };
                /**
                 * 判断背包是否已满并隐显临时背包
                 * @param isElasticFrame 是否弹窗
                 */
                MainHudModule.prototype.judgeBagIsFull = function (isElasticFrame) {
                    var bag = LoginModel.getInstance().roleDetail.bagInfo[BagTypes.TEMP];
                    if (typeof (bag) == "undefined") {
                        this._viewUI.tempBag_btn.visible = false;
                        return;
                    }
                    var capacity = bag.capacity;
                    var item = bag.items;
                    this._viewUI.tempBag_btn.visible = true;
                    if (item.length != 0) { /** 临时背包存在数据 */
                        this._viewUI.tempBag_btn.visible = true;
                        if (isElasticFrame) { /** 增加临时背包的物品才刷新 */
                            var promoto = HudModel.getInstance().promptAssembleBack(PromptExplain.FULL_OF_BAG);
                            this.disappearMessageTipsMediator = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                            this.disappearMessageTipsMediator.onShow(promoto);
                        }
                    }
                    else { /**  */
                        this._viewUI.tempBag_btn.visible = false;
                    }
                };
                /** 获取队伍数据信息 */
                MainHudModule.prototype.getTeamData = function () {
                    this.teamInfo = TeamModel.getInstance().TeamRoleInfoStorage;
                    this._viewUI.mainTeamList.vScrollBarSkin = "";
                    if (this.teamInfo.length == 0) { /** 未组队状态 */
                        var promoto = ["请创建队伍或者申请加入"];
                        this._viewUI.mainTeamList.repeatY = 1;
                        this._viewUI.mainTeamList.array = promoto;
                    }
                    else {
                        this._viewUI.mainTeamList.repeatY = this.teamInfo.length;
                        this._viewUI.mainTeamList.array = this.teamInfo;
                    }
                    this._viewUI.mainTeamList.scrollBar.elasticDistance = 200;
                    this._viewUI.mainTeamList.scrollBar.elasticBackTime = 100;
                    this._viewUI.mainTeamList.renderHandler = new Handler(this, this.onRenderTeamList);
                };
                /**
                 * 渲染队伍数据
                 * @param cell Box
                 * @param index 渲染下标
                 */
                MainHudModule.prototype.onRenderTeamList = function (cell, index) {
                    if (this.teamInfo.length == 0) {
                        if (index > 0)
                            return;
                    }
                    else if (index < 0 || index > this.teamInfo.length - 1)
                        return;
                    var teamBtn_btn = cell.getChildByName("teamBtn_btn");
                    var roleIconBg_img = cell.getChildByName("roleinfo").getChildByName("roleIconBg_img");
                    var roleLogo_img = cell.getChildByName("roleinfo").getChildByName("roleLogo_img");
                    var roleSchool_img = cell.getChildByName("roleinfo").getChildByName("roleSchool_img");
                    var leaderLogo_img = cell.getChildByName("roleinfo").getChildByName("leaderLogo_img");
                    var roleLevel_lab = cell.getChildByName("roleinfo").getChildByName("roleLevel_lab");
                    var roleName_lab = cell.getChildByName("roleinfo").getChildByName("roleName_lab");
                    var HPProgress_bar = cell.getChildByName("roleinfo").getChildByName("HPProgress_bar");
                    var HPProgress_bg_img = cell.getChildByName("roleinfo").getChildByName("hp_bg_img");
                    var MPProgres_bar = cell.getChildByName("roleinfo").getChildByName("MPProgres_bar");
                    var MPProgress_bg_img = cell.getChildByName("roleinfo").getChildByName("mp_bg_img");
                    if (this.teamInfo.length == 0) {
                        var prompt_2 = HudModel.getInstance().promptAssembleBack(PromptExplain.CREATE_TEAM_REPLY);
                        teamBtn_btn.label = prompt_2;
                        teamBtn_btn.on(LEvent.MOUSE_DOWN, this, this.openTeamMatch);
                        HPProgress_bg_img.visible = false;
                        MPProgress_bg_img.visible = false;
                        roleLogo_img.visible = false;
                        roleSchool_img.visible = false;
                        leaderLogo_img.visible = false;
                        HPProgress_bar.visible = false;
                        MPProgres_bar.visible = false;
                        roleIconBg_img.visible = false;
                        roleLevel_lab.text = "";
                        roleName_lab.text = "";
                    }
                    else {
                        HPProgress_bg_img.visible = true;
                        MPProgress_bg_img.visible = true;
                        roleLogo_img.visible = true;
                        roleSchool_img.visible = true;
                        leaderLogo_img.visible = true;
                        HPProgress_bar.visible = true;
                        MPProgres_bar.visible = true;
                        roleIconBg_img.visible = true;
                        ;
                        teamBtn_btn.label = "";
                        var shape = this.teamInfo[index].shape;
                        var shapeId = this.shapeInfo[shape];
                        roleLogo_img.skin = "icon/avatarrole/" + (30000 + shape) + ".png";
                        var school = this.teamInfo[index].school;
                        var schoolImgUrl = TeamModel.getInstance().getSchoolImgBack(school);
                        roleSchool_img.skin = schoolImgUrl;
                        roleLevel_lab.text = this.teamInfo[index].level;
                        roleName_lab.text = this.teamInfo[index].rolename;
                        teamBtn_btn.on(LEvent.CLICK, this, this.openTeamTip, [index]);
                        var memberbasic = TeamModel.getInstance().teamMemberBasic.get(this.teamInfo[index].roleid);
                        if (memberbasic) {
                            HPProgress_bar.value = memberbasic.hp / memberbasic.maxhp;
                            MPProgres_bar.value = memberbasic.mp / memberbasic.maxmp;
                        }
                        if (index == 0) { /** 队长位置 */
                            leaderLogo_img.visible = true;
                            leaderLogo_img.skin = "ui/team/team_dui.png";
                        }
                        else {
                            if (TeamModel.getInstance().updateMemberState.keys.length != 0) { /** 玩家状态需要更新 */
                                var keys = TeamModel.getInstance().updateMemberState.keys;
                                var isInZanLI = false;
                                for (var updateMemberStateIndex = 0; updateMemberStateIndex < keys.length; updateMemberStateIndex++) {
                                    var teamMemberState = TeamModel.getInstance().updateMemberState.get(keys[updateMemberStateIndex]);
                                    if (keys[updateMemberStateIndex] == this.teamInfo[index].roleid && teamMemberState == TeamMemberState.eTeamAbsent) /** 玩家状态需要更新 */
                                        leaderLogo_img.skin = "ui/team/team_zan.png";
                                    else if (keys[updateMemberStateIndex] == this.teamInfo[index].roleid && teamMemberState == TeamMemberState.eTeamFallline)
                                        leaderLogo_img.skin = "ui/team/team_zan.png";
                                    else if (keys[updateMemberStateIndex] == this.teamInfo[index].roleid)
                                        leaderLogo_img.skin = "";
                                }
                            }
                            else {
                                if (this.teamInfo[index].state == TeamMemberState.eTeamAbsent) {
                                    leaderLogo_img.skin = "ui/team/team_zan.png";
                                    TeamModel.getInstance().updateMemberState.set(this.teamInfo[index].roleid, this.teamInfo[index].state);
                                }
                                else
                                    leaderLogo_img.skin = "";
                            }
                        }
                    }
                };
                /** 打开队伍速配界面 */
                MainHudModule.prototype.openTeamMatch = function () {
                    if (this.teamInfo.length != 0)
                        return;
                    this._TeamOrganizeMediator = new game.modules.team.TeamOrganizeMediator(this._app);
                    this._TeamOrganizeMediator.show();
                };
                /** 刷新组队是否匹配在主界面表现 */
                MainHudModule.prototype.updataTeamState = function (data) {
                    var teamData = data.get("data");
                    //console.log('teamData刷新组队是否匹配在主界面表现teamData.length == ', teamData.length);
                    /** 是否在匹配 */
                    var isMatch = teamData[0];
                    mainhud.models.HudModel.getInstance().isMatch = isMatch;
                    if (isMatch) { /** 在线匹配中 */
                        /** 目标名称 */
                        var targetName = teamData[1];
                        this._viewUI.mainTeamList.visible = false;
                        this._viewUI.teamMtch_img.visible = true;
                        this._viewUI.target_lab.text = targetName;
                        this._viewUI.match_btn.on(LEvent.CLICK, this, this.cancleMatch);
                    }
                    else if (!isMatch) { /** 未在匹配 */
                        //console.log('teamData刷新组队是否匹配在主界面表现isMatch == ', isMatch);
                        this._viewUI.mainTeamList.visible = true;
                        this._viewUI.teamMtch_img.visible = false;
                    }
                };
                /** 更新队员状态弹窗 */
                MainHudModule.prototype.updataTeamMatePopup = function () {
                    var teamMemberBasic = TeamModel.getInstance().teamMemberBasic;
                    if (TeamModel.getInstance().updateMemberState_Del.keys.length != 0) { /** 玩家状态需要更新 */
                        var keys = TeamModel.getInstance().updateMemberState_Del.keys;
                        var roleid = keys[0];
                        var roleinfo_1 = teamMemberBasic.get(roleid);
                        var state = TeamModel.getInstance().updateMemberState_Del.get(roleid);
                        var rolrname = roleinfo_1.rolename;
                        var prompt_3;
                        var arr = [];
                        arr.push(rolrname);
                        var disappearMessageTipsMediator = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                        if (state == TeamMemberState.eTeamAbsent) {
                            prompt_3 = HudModel.getInstance().promptAssembleBack(PromptExplain.TEAMMEMBER_TEMPROARILY_PART, arr);
                            disappearMessageTipsMediator.onShow(prompt_3);
                        }
                        else if (state == TeamMemberState.eTeamNormal) {
                            prompt_3 = HudModel.getInstance().promptAssembleBack(PromptExplain.TEAMMEMBER_REGRESSION, arr);
                            disappearMessageTipsMediator.onShow(prompt_3);
                        }
                        TeamModel.getInstance().updateMemberState_Del.remove(roleid);
                    }
                };
                /** 取消匹配 */
                MainHudModule.prototype.cancleMatch = function (tyep) {
                    HudModel.getInstance().isMatch = false;
                    mainhud.models.HudProxy.getInstance().event(mainhud.models.UPDATA_TEAM_UI, 0);
                    // if(typeof(tyep) != "number") RequesterProtocols._instance.c2s_CRequestStopTeamMatch();
                };
                /** 打开组队玩家对应的tips */
                MainHudModule.prototype.openTeamTip = function (index, e) {
                    if (this.teamInfo.length == 0)
                        return;
                    var roleid = LoginModel.getInstance().roleDetail.roleid;
                    var xPos = e.currentTarget.mouseX;
                    var yPos = e.currentTarget.mouseY;
                    if (roleid == this.teamInfo[0].roleid) { /** 队长视角 */
                        if (index == 0) { /** 点击的是自己的信息 */
                            this._TeamViewMyselfMediators = new game.modules.commonUI.TeamViewMyselfMediators(this._app);
                            this._TeamViewMyselfMediators.onShow(xPos, yPos, index, this.teamInfo);
                        }
                        else { /** 其他队员的信息 */
                            this._TeamViewLeaderMediators = new game.modules.commonUI.TeamViewLeaderMediators(this._app);
                            this._TeamViewLeaderMediators.onShow(xPos, yPos, index, this.teamInfo);
                        }
                    }
                    else if (this.teamInfo[index].roleid == roleid) { /** 队员视角 点击的是自己的信息 */
                        this._TeamViewMyselfMediators = new game.modules.commonUI.TeamViewMyselfMediators(this._app);
                        this._TeamViewMyselfMediators.onShow(xPos, yPos, index, this.teamInfo);
                    }
                    else { /** 点击的是其他玩家，包括队长和队员 */
                        this._TeamViewMainMediators = new game.modules.commonUI.TeamViewMainMediators(this._app);
                        this._TeamViewMainMediators.onShow(xPos, yPos, index, this.teamInfo);
                    }
                };
                /**公会被邀请加入 */
                MainHudModule.prototype.showClanInvitation = function () {
                    var ClanInvitation = game.modules.family.models.FamilyModel.getInstance().ClanInvitation;
                    var param = new Dictionary();
                    param.set("contentId", 145034);
                    var hostrolename = ClanInvitation.get("hostrolename");
                    var clannname = ClanInvitation.get("clannname");
                    var pa = [hostrolename, clannname];
                    param.set("parame", pa);
                    this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENT_TIPS_MESSAGE, param);
                    game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.okTips);
                };
                /**拒绝加入公会 */
                MainHudModule.prototype.cancelTips = function () {
                    //console.log("-----------拒绝加入：---------")
                    var ClanInvitation = game.modules.family.models.FamilyModel.getInstance().ClanInvitation;
                    var roleid = ClanInvitation.get("hostroleid");
                    //console.log("-------------hostroleid:", roleid)
                    RequesterProtocols._instance.c2s_CAcceptOrRefuseInvitation(roleid, AcceptOrRefuseApply.refuse);
                };
                /**同意加入公会 */
                MainHudModule.prototype.okTips = function () {
                    //console.log("-----------同意加入---------")
                    var ClanInvitation = game.modules.family.models.FamilyModel.getInstance().ClanInvitation;
                    var roleid = ClanInvitation.get("hostroleid");
                    //console.log("-------------hostroleid:", roleid)
                    RequesterProtocols._instance.c2s_CAcceptOrRefuseInvitation(roleid, AcceptOrRefuseApply.accept);
                };
                /**显示人物小窗口 */
                MainHudModule.prototype.showrole = function (rolemodelid, roleid) {
                    if (rolemodelid != -1) {
                        this._viewUI.role_box.visible = true;
                        var shape = LoginModel.getInstance().cnpcShapeInfo[rolemodelid];
                        this._viewUI.roleicon_img.skin = "common/icon/avatarrole/" + shape.littleheadID + ".png";
                        this._viewUI.roleicon_img.on(LEvent.MOUSE_DOWN, this, this.showrolemenu, [roleid]);
                    }
                    else {
                        this._viewUI.role_box.visible = false;
                        this._viewUI.roleicon_img.off(LEvent.MOUSE_DOWN, this, this.showrolemenu);
                    }
                };
                /**人物菜单 */
                MainHudModule.prototype.showrolemenu = function (roleid) {
                    var xPos = -20;
                    var yPos = 80;
                    RequesterProtocols._instance.c2s_CRequestUpdateRoleInfo(roleid); //请求玩家信息
                    RequesterProtocols._instance.c2s_CReqRoleTeamState(roleid); //客户端请求其他玩家的组队情况
                    var isFriendFlag = FriendModel.getInstance().isMyFriend(roleid);
                    this._ContactCharacterMediator.onShow(xPos, yPos, isFriendFlag);
                };
                /** 响应物品使用指引 */
                MainHudModule.prototype.showItemGuide = function (strs) {
                    if (strs === void 0) { strs = ""; }
                    var itemKey = BagModel.getInstance().addItemUseGuide.keys;
                    if (itemKey.length == 0)
                        return;
                    var itemId = itemKey[0];
                    var item = BagModel.getInstance().addItemUseGuide.get(itemId);
                    var num = item.number;
                    var instance = game.modules.commonUI.UseToRemindCardMediator._instance;
                    this.UseItem = game.modules.commonUI.UseToRemindCardMediator.getInstance(this._app);
                    var str;
                    if (strs != "")
                        str = strs;
                    else
                        str = "使用";
                    this.UseItem.init(itemId, str, num);
                };
                /**
                 * 升级判断达成等级礼包使用
                 * @param oldlevel 未升级前等级
                 * @param newlevel 升级之后的等级
                 */
                MainHudModule.prototype.JudgeLevelPacks = function (oldlevel, newlevel) {
                    if (newlevel <= mainhud.LEVEL_MAX) {
                        var oldtendigitNum = Math.floor(oldlevel % 100 / 10); //十位数;
                        var tendigitNum = Math.floor(newlevel % 100 / 10); //十位数;
                        /** 逢10进 */
                        if (oldtendigitNum == tendigitNum)
                            return;
                        var _giftPackageId = void 0;
                        for (var index = 0; index < tendigitNum; index++) {
                            _giftPackageId = 105000 + index;
                            /** 判断背包是否有该物品 */
                            var item = BagModel.getInstance().chargeItem(_giftPackageId);
                            if (item && item != 0) {
                                BagModel.getInstance().addItemUseGuide.set(item.id, item);
                                this.showItemGuide();
                            }
                        }
                    }
                };
                /** 删除物品使用指引 */
                MainHudModule.prototype.deletItemGuide = function () {
                    this.UseItem = game.modules.commonUI.UseToRemindCardMediator.getInstance(this._app);
                    this.UseItem.close();
                };
                /** 新增物品滑动特效 */
                MainHudModule.prototype.ItemSlide = function () {
                    if (BagModel.getInstance().SlideItem.length == 0)
                        return;
                    var bagItemFlyToBag = modules.bag.BagItemFlyToBagMediator.getInstance(this._app);
                    bagItemFlyToBag.show();
                };
                /**
                 * 队伍红点设置
                 * @param type 设置类型
                 */
                MainHudModule.prototype.setTeamRedDot = function (type) {
                    if (type == TeamRedDot.SHOW_TEAM_REDDOT && !this._viewUI.team_reddot_img.visible) {
                        this._viewUI.team_reddot_img.visible = true;
                    }
                    else if (type == TeamRedDot.HIDE_TEAM_REDDOT && this._viewUI.team_reddot_img.visible) {
                        this._viewUI.team_reddot_img.visible = false;
                    }
                };
                /**关闭升级特效 */
                MainHudModule.prototype.closetx = function () {
                    Laya.timer.clear(this, this.closetx);
                    this._app.sceneObjectMgr.mainUnit.levelup = 2;
                };
                return MainHudModule;
            }(game.modules.ModuleMediator));
            mainhud.MainHudModule = MainHudModule;
        })(mainhud = modules.mainhud || (modules.mainhud = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=MainHudModule.js.map