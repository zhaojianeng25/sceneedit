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
/** 一级副本菜单 */
var TeamSetType;
(function (TeamSetType) {
    TeamSetType[TeamSetType["STORY_TASK"] = 1] = "STORY_TASK";
    TeamSetType[TeamSetType["DAILY_FUBEN"] = 3] = "DAILY_FUBEN";
    TeamSetType[TeamSetType["SUPERIOR_FUBEN"] = 4] = "SUPERIOR_FUBEN";
    TeamSetType[TeamSetType["TIME_ACTIVITY"] = 5] = "TIME_ACTIVITY";
    TeamSetType[TeamSetType["FAMILY_ACTIVITY"] = 6] = "FAMILY_ACTIVITY";
    TeamSetType[TeamSetType["YUANGU_MOXIANG"] = 7] = "YUANGU_MOXIANG";
    TeamSetType[TeamSetType["LEVEL_TASK"] = 8] = "LEVEL_TASK";
    TeamSetType[TeamSetType["SHANGGU_SHEN"] = 9] = "SHANGGU_SHEN";
    TeamSetType[TeamSetType["DiroBS"] = 10] = "DiroBS";
    TeamSetType[TeamSetType["ZHANGJIE_TASK"] = 11] = "ZHANGJIE_TASK";
})(TeamSetType || (TeamSetType = {}));
var game;
(function (game) {
    var modules;
    (function (modules) {
        var team;
        (function (team) {
            var TeamOrganizeMediator = /** @class */ (function (_super) {
                __extends(TeamOrganizeMediator, _super);
                function TeamOrganizeMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    /** 一级菜单数据 */
                    _this.firstMenu = [];
                    /** 二级菜单数据 */
                    _this.secondMenu = [];
                    /** 是否初始化界面 */
                    _this.initFlag = false;
                    /** 最低等级 */
                    _this.minLvel = -1;
                    /** 最高等级 */
                    _this.maxLevel = -1;
                    /** 目标Id */
                    _this.targetId = -1;
                    /** 显示等待的目标Id */
                    _this.waittargetId = -1;
                    /** 目标名称 */
                    _this.target = "";
                    /** 当前 二级类型 */
                    _this.currentSecondType = 1;
                    /** 当前二级菜单选中的下标 */
                    _this.currentSecondSelectIndex = -1;
                    /** 当前一级菜单选中的下标 */
                    _this.currentFirstSelectIndex = -1;
                    /** 造型数据 */
                    _this.shapeInfo = [];
                    _this._viewUI = new ui.common.TeamOrganizeUI();
                    _this._viewUI.mouseThrough = true;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this.isCenter = true;
                    _this.MenuData = new Laya.Dictionary();
                    _this._initShape();
                    _this.init();
                    _this.initialize();
                    _this.registerEvent();
                    return _this;
                }
                /**初始化 */
                TeamOrganizeMediator.prototype.initialize = function () {
                    this.ani = new Laya.Animation();
                    this.dianImg = new Laya.Image();
                };
                /**
                 * 注册事件
                 */
                TeamOrganizeMediator.prototype.registerEvent = function () {
                    this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.closeTeamOrgangize);
                    this._viewUI.flash_btn.on(LEvent.MOUSE_DOWN, this, this.CRequestTeamMatchList);
                    this._viewUI.creatTeam_btn.on(LEvent.MOUSE_DOWN, this, this.createTeam);
                    this._viewUI.zidongpipei_btn.on(LEvent.CLICK, this, this.autoMatch, [0]);
                    team.models.TeamProxy.getInstance().on(team.models.WAIT_MATCH_EVENT, this, this.refreshWaitMatch);
                    team.models.TeamProxy.getInstance().on(team.models.REFRESH_TEAMINFO_EVENT, this, this.refresTeamInfo);
                    team.models.TeamProxy.getInstance().on(team.models.OPEN_TEAM_EVENT, this, this.openTeam);
                    team.models.TeamProxy.getInstance().on(team.models.MAINHUD_UPDATE_TEAM_STATE, this, this.showWait);
                };
                /** 初始化不需要更改的东西 */
                TeamOrganizeMediator.prototype._initShape = function () {
                    this.teamListConfig = TeamModel.getInstance().teamListConfig;
                    var shapeInfo = LoginModel.getInstance().cnpcShapeInfo;
                    for (var index in shapeInfo) { /** 造型表数据放入 */
                        this.shapeInfo.push(shapeInfo[index].littleheadID);
                    }
                };
                /** 显示组队状态提示 */
                TeamOrganizeMediator.prototype.showWait = function (data) {
                    var match_data = data.get("data");
                    if (match_data[0] == true) {
                        this.waittargetId = this.targetId;
                    }
                    else if (match_data[0] == false) {
                        this.waittargetId = -1;
                    }
                    this.refreshSecondMenuData(this.currentSecondType);
                };
                /** 打开队伍界面 */
                TeamOrganizeMediator.prototype.openTeam = function () {
                    modules.ModuleManager.show(modules.ModuleNames.Team, this._app);
                    this.hide();
                };
                /** 刷新   队伍  数据信息 */
                TeamOrganizeMediator.prototype.refresTeamInfo = function () {
                    this.teamInfoList = TeamModel.getInstance().SRequestTeamMatchList.get("TeamMatchList");
                    if (this.teamInfoList.tteamlist.length == 0) {
                        this._viewUI.applyList_list.visible = false;
                        return;
                    }
                    else {
                        this._viewUI.applyList_list.visible = true;
                    }
                    this._viewUI.applyList_list.vScrollBarSkin = "";
                    /** this.teamInfoList.tteamlist.length  和 this.teamInfoList.tteamlist  长度和数据源要同步*/
                    this._viewUI.applyList_list.repeatY = this.teamInfoList.tteamlist.length; //实际队伍的长度
                    this._viewUI.applyList_list.array = this.teamInfoList.tteamlist; // 如果用this.teamInfoList将进不去渲染
                    this._viewUI.applyList_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.applyList_list.scrollBar.elasticDistance = 100;
                    this._viewUI.applyList_list.renderHandler = new Handler(this, this.onRenderTeamList);
                };
                /** 增加或去掉点击事件监听 */
                TeamOrganizeMediator.prototype.onOrOffEvent = function (teamMemberId, teamMemberImg) {
                    if (teamMemberImg.visible && teamMemberId != 0) {
                        teamMemberImg.on(LEvent.CLICK, this, this.showContactCharacterMediator, [teamMemberId]);
                    }
                    else {
                        teamMemberImg.off(LEvent.CLICK, this, this.showContactCharacterMediator);
                    }
                };
                /** 显示人物功能弹窗 */
                TeamOrganizeMediator.prototype.showContactCharacterMediator = function (teamMemberId, e) {
                    RequesterProtocols._instance.c2s_CRequestUpdateRoleInfo(teamMemberId);
                    RequesterProtocols._instance.c2s_CReqRoleTeamState(teamMemberId);
                    var isFriendFlag = FriendModel.getInstance().isMyFriend(teamMemberId);
                    var _ContactCharacterMediator = new modules.friend.ContactCharacterMediator(this._viewUI, this._app);
                    _ContactCharacterMediator.onShow(e.target.mouseX, e.target.mouseY, isFriendFlag);
                };
                /** 渲染队伍list */
                TeamOrganizeMediator.prototype.onRenderTeamList = function (cell, index) {
                    if (index < 0 || index > this.teamInfoList.tteamlist.length - 1)
                        return;
                    var teamLeaderName_lab = cell.getChildByName("teamCard").getChildByName("teamLeaderName_lab");
                    var leaderLevel_lab = cell.getChildByName("teamCard").getChildByName("leaderLevel_lab");
                    var storyName_lab = cell.getChildByName("teamCard").getChildByName("storyName_lab");
                    var subTaskName_lab = cell.getChildByName("teamCard").getChildByName("subTaskName_lab");
                    var apply_btn = cell.getChildByName("teamCard").getChildByName("apply_btn");
                    var applyOver_btn = cell.getChildByName("teamCard").getChildByName("applyOver_btn");
                    var LeaderId = this.teamInfoList.tteamlist[index].TeamInfoBasicVo.leaderid;
                    apply_btn.on(LEvent.CLICK, this, this.applyForTeam, [LeaderId, apply_btn, applyOver_btn]);
                    /** 队长 */
                    var icon1_img = cell.getChildByName("teamCard").getChildByName("teamOne_img").getChildByName("icon1_img");
                    var positionIcon1_img = cell.getChildByName("teamCard").getChildByName("teamOne_img").getChildByName("positionIcon1_img");
                    var school1_img = cell.getChildByName("teamCard").getChildByName("teamOne_img").getChildByName("school1_img");
                    /** 第二个队员 */
                    var icon2_img = cell.getChildByName("teamCard").getChildByName("teamTwo_img").getChildByName("icon2_img");
                    var positionIcon2_img = cell.getChildByName("teamCard").getChildByName("teamTwo_img").getChildByName("positionIcon2_img");
                    var school2_img = cell.getChildByName("teamCard").getChildByName("teamTwo_img").getChildByName("school2_img");
                    icon2_img.visible = false;
                    positionIcon2_img.visible = false;
                    school2_img.visible = false;
                    /** 第三个队员 */
                    var icon3_img = cell.getChildByName("teamCard").getChildByName("teamThree_img").getChildByName("icon3_img");
                    var positionIcon3_img = cell.getChildByName("teamCard").getChildByName("teamThree_img").getChildByName("positionIcon3_img");
                    var school3_img = cell.getChildByName("teamCard").getChildByName("teamThree_img").getChildByName("school3_img");
                    icon3_img.visible = false;
                    positionIcon3_img.visible = false;
                    school3_img.visible = false;
                    /** 第四个队员 */
                    var icon4_img = cell.getChildByName("teamCard").getChildByName("teamFour_img").getChildByName("icon4_img");
                    var positionIcon4_img = cell.getChildByName("teamCard").getChildByName("teamFour_img").getChildByName("positionIcon4_img");
                    var school4_img = cell.getChildByName("teamCard").getChildByName("teamFour_img").getChildByName("school4_img");
                    icon4_img.visible = false;
                    positionIcon4_img.visible = false;
                    school4_img.visible = false;
                    /** 第五个队员 */
                    var icon5_img = cell.getChildByName("teamCard").getChildByName("teamFive_img").getChildByName("icon5_img");
                    var positionIcon5_img = cell.getChildByName("teamCard").getChildByName("teamFive_img").getChildByName("positionIcon5_img");
                    var school5_img = cell.getChildByName("teamCard").getChildByName("teamFive_img").getChildByName("school5_img");
                    icon5_img.visible = false;
                    positionIcon5_img.visible = false;
                    school5_img.visible = false;
                    leaderLevel_lab.text = this.teamInfoList.tteamlist[index].TeamInfoBasicVo.leaderlevel;
                    teamLeaderName_lab.text = this.teamInfoList.tteamlist[index].TeamInfoBasicVo.leadername;
                    var targetId = this.teamInfoList.tteamlist[index].TeamInfoBasicVo.targetid;
                    storyName_lab.text = this.teamListConfig[targetId].content;
                    subTaskName_lab.text = this.teamListConfig[targetId].target;
                    var teamLength = this.teamInfoList.tteamlist[index].TeamMemberSimpleVo.length;
                    if (teamLength > 0) { /** 队伍只有一人 队长 */
                        var school = this.teamInfoList.tteamlist[index].TeamMemberSimpleVo[index].school;
                        var shape = this.teamInfoList.tteamlist[index].TeamMemberSimpleVo[index].shape;
                        var shapeId = this.shapeInfo[shape];
                        icon1_img.skin = "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + shape) + ".png";
                        var schoolImgUrl = TeamModel.getInstance().getSchoolImgBack(school);
                        school1_img.skin = schoolImgUrl;
                        positionIcon1_img.visible = true;
                        var roleId = this.teamInfoList.tteamlist[index].TeamMemberSimpleVo[index].roleid;
                        this.onOrOffEvent(roleId, icon1_img);
                    }
                    this.onOrOffEvent(0, icon2_img);
                    this.onOrOffEvent(0, icon3_img);
                    this.onOrOffEvent(0, icon4_img);
                    this.onOrOffEvent(0, icon5_img);
                    if (teamLength > 1) { /** 两个人 */
                        var shape = this.teamInfoList.tteamlist[index].TeamMemberSimpleVo[index + 1].shape;
                        var school = this.teamInfoList.tteamlist[index].TeamMemberSimpleVo[index + 1].school;
                        var shapeId = this.shapeInfo[shape];
                        icon2_img.visible = true;
                        icon2_img.skin = "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + shape) + ".png";
                        var schoolImgUrl = TeamModel.getInstance().getSchoolImgBack(school);
                        school2_img.visible = true;
                        school2_img.skin = schoolImgUrl;
                        positionIcon2_img.visible = false;
                        var roleId = this.teamInfoList.tteamlist[index].TeamMemberSimpleVo[index + 1].roleid;
                        this.onOrOffEvent(roleId, icon2_img);
                    }
                    if (teamLength > 2) { /** 三个人 */
                        icon3_img.visible = true;
                        school3_img.visible = true;
                        var shape = this.teamInfoList.tteamlist[index].TeamMemberSimpleVo[index + 2].shape;
                        var school = this.teamInfoList.tteamlist[index].TeamMemberSimpleVo[index + 2].school;
                        var shapeId = this.shapeInfo[shape];
                        icon3_img.skin = "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + shape) + ".png";
                        var schoolImgUrl = TeamModel.getInstance().getSchoolImgBack(school);
                        school3_img.skin = schoolImgUrl;
                        positionIcon3_img.visible = false;
                        var roleId = this.teamInfoList.tteamlist[index].TeamMemberSimpleVo[index + 2].roleid;
                        this.onOrOffEvent(roleId, icon3_img);
                    }
                    if (teamLength > 3) { /** 四个人 */
                        icon4_img.visible = true;
                        school4_img.visible = true;
                        var shape = this.teamInfoList.tteamlist[index].TeamMemberSimpleVo[index + 3].shape;
                        var school = this.teamInfoList.tteamlist[index].TeamMemberSimpleVo[index + 3].school;
                        var shapeId = this.shapeInfo[shape];
                        icon4_img.skin = "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + shape) + ".png";
                        var schoolImgUrl = TeamModel.getInstance().getSchoolImgBack(school);
                        school4_img.skin = schoolImgUrl;
                        positionIcon4_img.visible = false;
                        var roleId = this.teamInfoList.tteamlist[index].TeamMemberSimpleVo[index + 3].roleid;
                        this.onOrOffEvent(roleId, icon4_img);
                    }
                    if (teamLength > 4) { /** 五个人 */
                        icon5_img.visible = true;
                        school5_img.visible = true;
                        var shape = this.teamInfoList.tteamlist[index].TeamMemberSimpleVo[index + 4].shape;
                        var school = this.teamInfoList.tteamlist[index].TeamMemberSimpleVo[index + 4].school;
                        var shapeId = this.shapeInfo[shape];
                        icon5_img.skin = "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + shape) + ".png";
                        var schoolImgUrl = TeamModel.getInstance().getSchoolImgBack(school);
                        school5_img.skin = schoolImgUrl;
                        positionIcon5_img.visible = false;
                        var roleId = this.teamInfoList.tteamlist[index].TeamMemberSimpleVo[index + 4].roleid;
                        this.onOrOffEvent(roleId, icon5_img);
                    }
                };
                /** 队伍申请
                 * @param roleId 角色Id
                 * @param applyBtn 申请按钮
                 * @param applyOverBtn 已申请按钮
                */
                TeamOrganizeMediator.prototype.applyForTeam = function (roleId, applyBtn, applyOverBtn) {
                    RequesterProtocols._instance.c2s_CRequestJoinTeam(roleId);
                    this.hide();
                    // applyBtn.visible = false;
                    // applyOverBtn.visible = true;
                };
                /** 刷新一级菜单数据源 */
                TeamOrganizeMediator.prototype.refreshFirstMenuData = function () {
                    this._viewUI.firstMenu2_list.vScrollBarSkin = "";
                    this._viewUI.firstMenu2_list.repeatY = this.firstMenu.length;
                    this._viewUI.firstMenu2_list.array = this.firstMenu;
                    if (this.firstMenu.length > 0 && this.currentFirstSelectIndex == -1)
                        this.currentFirstSelectIndex = 0;
                    this._viewUI.firstMenu2_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.firstMenu2_list.scrollBar.elasticDistance = 100;
                    this._viewUI.firstMenu2_list.renderHandler = new Handler(this, this.onRendeFirstMenu);
                    this._viewUI.firstMenu2_list.scrollTo(this.currentFirstSelectIndex);
                };
                /** 刷新二级菜单数据源
                 * @param type 类型
                 * @param requirement  需求条件
                 * @param opentime 开启时间
                 * @param selectBtn 选中按钮
                 * @param selectIndex 选中下标
                */
                TeamOrganizeMediator.prototype.refreshSecondMenuData = function (type, requirement, opentime, selectBtn, selectIndex) {
                    this.currentSecondType = type;
                    //   this._viewUI.match_image.visible = true;
                    if (typeof (selectBtn) != "undefined") {
                        this.currentFirstSelectIndex = selectIndex;
                        if (this.currentSelectFirstButton && this.currentSelectFirstButton.selected)
                            this.currentSelectFirstButton.selected = false;
                        this.currentSelectFirstButton = selectBtn;
                        this.currentSelectFirstButton.selected = true;
                        if (this.currentSecondSelectIndex == -1) {
                            this.currentSecondSelectIndex = 0;
                        }
                        this._viewUI.zidongpipei_btn.visible = true;
                    }
                    this.secondMenu = this.MenuData.get(type);
                    if (this.secondMenu == null)
                        this.secondMenu = [];
                    this._viewUI.secondMenu2_list.vScrollBarSkin = "";
                    this._viewUI.secondMenu2_list.repeatY = this.secondMenu.length;
                    this._viewUI.secondMenu2_list.array = this.secondMenu;
                    this._viewUI.secondMenu2_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.secondMenu2_list.scrollBar.elasticDistance = 100;
                    this._viewUI.secondMenu2_list.renderHandler = new Handler(this, this.onRendeSecondMenu);
                    this._viewUI.secondMenu2_list.scrollTo(this.currentSecondSelectIndex);
                    if (this.currentFirstSelectIndex == 1 && this.yindaoId == YinDaoEnum.CHOOSE_RICHANG_YINDAO) {
                        this.closeAni();
                        this.pipeiYindao();
                    }
                };
                /** 二级菜单渲染 */
                TeamOrganizeMediator.prototype.onRendeSecondMenu = function (cell, index) {
                    if (index > (this.secondMenu.length - 1) || index < 0)
                        return;
                    var secondMenu_btn = cell.getChildByName("secondMenu_btn");
                    var tar_wait_img = cell.getChildByName("tar_wait_img");
                    secondMenu_btn.label = this.secondMenu[index].target;
                    var minLevel = this.secondMenu[index].minlevel;
                    var maxLevel = this.secondMenu[index].maxlevel;
                    var target = this.secondMenu[index].target;
                    var targetId = this.secondMenu[index].id;
                    if (targetId == this.waittargetId) {
                        tar_wait_img.skin = "common/ui/team/team_deng.png";
                    }
                    else {
                        tar_wait_img.skin = "";
                    }
                    if (this.currentSecondSelectIndex != index) {
                        secondMenu_btn.selected = false;
                    }
                    else {
                        this.currentSelectSecondButton = secondMenu_btn;
                        this.currentSelectSecondButton.selected = true;
                        this.targetId = targetId;
                        this.target = target;
                        this.minLvel = minLevel;
                        this.maxLevel = maxLevel;
                    }
                    secondMenu_btn.on(LEvent.CLICK, this, this.getTargetMenu, [minLevel, maxLevel, targetId, secondMenu_btn, index, target]);
                };
                /** 一级菜单渲染 */
                TeamOrganizeMediator.prototype.onRendeFirstMenu = function (cell, index) {
                    if (index > (this.firstMenu.length - 1) || index < 0)
                        return;
                    var firstMenu_btn = cell.getChildByName("firstMenu_btn");
                    firstMenu_btn.label = this.firstMenu[index].content;
                    var type = this.firstMenu[index].type;
                    var requirement = this.firstMenu[index].requirement;
                    var opTime = this.firstMenu[index].opentime;
                    //当前渲染下标不是选中的一级菜单
                    if (this.currentFirstSelectIndex != index) {
                        firstMenu_btn.selected = false;
                    }
                    else {
                        this.currentSelectFirstButton = firstMenu_btn;
                        this.currentSelectFirstButton.selected = true;
                    }
                    firstMenu_btn.on(LEvent.MOUSE_DOWN, this, this.refreshSecondMenuData, [type, requirement, opTime, firstMenu_btn, index]);
                };
                /**
                 * 点击二级菜单
                 *  @param targetId  目标Id
                 *  @param secondMenu_btn    二级菜单按钮
                 *  @param index       选中下标
                 */
                TeamOrganizeMediator.prototype.getTargetMenu = function (minLevel, maxLevel, targetId, secondMenu_btn, index, target) {
                    this.targetId = targetId;
                    this.target = target;
                    if (this.currentSelectSecondButton && this.currentSelectSecondButton.selected)
                        this.currentSelectSecondButton.selected = false;
                    this.currentSelectSecondButton = secondMenu_btn;
                    this.currentSelectSecondButton.selected = true;
                    this.currentSecondSelectIndex = index;
                    this.minLvel = minLevel;
                    this.maxLevel = maxLevel;
                    // this.refreshSecondMenuData(this.currentSecondType);
                    if (!this._viewUI.zidongpipei_btn.visible) {
                        this._viewUI.zidongpipei_btn.visible = true;
                    }
                };
                /** 刷新匹配的数据
                 * @param teammatchnum 匹配的队伍数
                 * @param playermatchnum 匹配的人数
                 */
                TeamOrganizeMediator.prototype.refreshWaitMatch = function (teammatchnum, playermatchnum) {
                    var prompt = HudModel.getInstance().promptAssembleBack(PromptExplain.LEADER_MEMBER_NUM, [teammatchnum, playermatchnum]);
                    this._viewUI.waitMatch_lab.text = prompt;
                };
                TeamOrganizeMediator.prototype.createTeam = function () {
                    this.hide();
                    RequesterProtocols._instance.c2s_CCreateTeam();
                    var minlevel = this.minLvel;
                    var maxlevel = this.maxLevel;
                    if (minlevel != -1 && this.targetId != -1)
                        team.models.TeamProxy.getInstance().event(team.models.REFRESH_TARGET, [minlevel, maxlevel, this.target, this.targetId]);
                };
                TeamOrganizeMediator.prototype.closeTeamOrgangize = function () {
                    // this.event(SHOW_TEAM);
                    this.hide();
                };
                /** 自动匹配
                 * @param  type 匹配类型
                */
                TeamOrganizeMediator.prototype.autoMatch = function (type) {
                    var flag = team.models.TeamModel.getInstance().matchFlag;
                    if (flag == false) { /** 未匹配 */
                        RequesterProtocols._instance.c2s_CRequestMatchInfo();
                        var isCreateTeam = team.models.TeamModel.getInstance().screateTeam;
                        if (type == 1) { /**
                        * @param 0 个人组队匹配 @param 1 组队匹配
                        */
                            this._viewUI.zidongpipei_btn.label = "取消匹配";
                            RequesterProtocols._instance.c2s_CRequestTeamMatch(1, this.targetId, this.minLvel, this.maxLevel);
                        }
                        else {
                            this._viewUI.zidongpipei_btn.label = "取消匹配";
                            RequesterProtocols._instance.c2s_CRequestTeamMatch(0, this.targetId, this.minLvel, this.maxLevel);
                        }
                        TeamModel.getInstance().currMatchTarget = this.target;
                    }
                    else if (flag) { /** 已经在匹配 点击取消匹配 */
                        RequesterProtocols._instance.c2s_CRequestStopTeamMatch();
                        this._viewUI.zidongpipei_btn.label = "自动匹配";
                    }
                    if (this.yindaoId == YinDaoEnum.PIPEI_YINDAO)
                        this.closeAni();
                };
                TeamOrganizeMediator.prototype.init = function () {
                    var tempData1 = [];
                    var tempData2 = [];
                    var tempData3 = [];
                    var tempData4 = [];
                    var tempData5 = [];
                    var tempData6 = [];
                    var tempData7 = [];
                    var tempData8 = [];
                    var tempData9 = [];
                    var tempData10 = [];
                    var _rolelevel = HudModel.getInstance().levelNum;
                    for (var index in this.teamListConfig) {
                        if (_rolelevel < this.teamListConfig[index].minlevel)
                            continue;
                        if (this.teamListConfig[index].type == TeamSetType.STORY_TASK) {
                            tempData1.push(this.teamListConfig[index]);
                        }
                        else if (this.teamListConfig[index].type == TeamSetType.DAILY_FUBEN) {
                            tempData2.push(this.teamListConfig[index]);
                        }
                        else if (this.teamListConfig[index].type == TeamSetType.SUPERIOR_FUBEN) {
                            tempData3.push(this.teamListConfig[index]);
                        }
                        else if (this.teamListConfig[index].type == TeamSetType.TIME_ACTIVITY) {
                            tempData4.push(this.teamListConfig[index]);
                        }
                        else if (this.teamListConfig[index].type == TeamSetType.FAMILY_ACTIVITY) {
                            tempData5.push(this.teamListConfig[index]);
                        }
                        else if (this.teamListConfig[index].type == TeamSetType.YUANGU_MOXIANG) {
                            tempData6.push(this.teamListConfig[index]);
                        }
                        else if (this.teamListConfig[index].type == TeamSetType.LEVEL_TASK) {
                            tempData7.push(this.teamListConfig[index]);
                        }
                        else if (this.teamListConfig[index].type == TeamSetType.SHANGGU_SHEN) {
                            tempData8.push(this.teamListConfig[index]);
                        }
                        else if (this.teamListConfig[index].type == TeamSetType.DiroBS) {
                            tempData9.push(this.teamListConfig[index]);
                        }
                        else if (this.teamListConfig[index].type == TeamSetType.ZHANGJIE_TASK) {
                            tempData10.push(this.teamListConfig[index]);
                        }
                    }
                    this.MenuData.clear();
                    if (tempData10.length != 0)
                        this.MenuData.set(TeamSetType.ZHANGJIE_TASK, tempData10);
                    if (tempData9.length != 0)
                        this.MenuData.set(TeamSetType.DiroBS, tempData9);
                    if (tempData8.length != 0)
                        this.MenuData.set(TeamSetType.SHANGGU_SHEN, tempData8);
                    if (tempData7.length != 0)
                        this.MenuData.set(TeamSetType.LEVEL_TASK, tempData7);
                    if (tempData6.length != 0)
                        this.MenuData.set(TeamSetType.YUANGU_MOXIANG, tempData6);
                    if (tempData5.length != 0)
                        this.MenuData.set(TeamSetType.FAMILY_ACTIVITY, tempData5);
                    if (tempData4.length != 0)
                        this.MenuData.set(TeamSetType.TIME_ACTIVITY, tempData4);
                    if (tempData3.length != 0)
                        this.MenuData.set(TeamSetType.SUPERIOR_FUBEN, tempData3);
                    if (tempData2.length != 0)
                        this.MenuData.set(TeamSetType.DAILY_FUBEN, tempData2);
                    if (tempData1.length != 0)
                        this.MenuData.set(TeamSetType.STORY_TASK, tempData1);
                    this.firstMenu = [];
                    for (var temp = 1; temp <= 11; temp++) {
                        var typeData = this.MenuData.get(temp);
                        if (typeData == null)
                            continue;
                        this.firstMenu.push(typeData[0]);
                    }
                    if (this.firstMenu.length == 0)
                        this._viewUI.notarget_btn.visible = true;
                    else
                        this._viewUI.notarget_btn.visible = false;
                };
                /** 请求某个目标的数量和并且刷新队长和队员的数量请求 */
                TeamOrganizeMediator.prototype.CRequestTeamMatchList = function (type) {
                    var num = 5; //取起始队伍id后面的num个数据
                    // if(typeof(this.targetId) != "undefined")
                    // {
                    // 	RequesterProtocols._instance.c2s_CRequestTeamMatchList(this.targetId,0,num);
                    // }else
                    // {
                    // 	RequesterProtocols._instance.c2s_CRequestTeamMatchList(0,0,num);
                    // }
                    if (type == 1) { /** 定时请求数据 */
                        Laya.timer.loop(5000, this, this.CRequestMatchInfo, null, true);
                        RequesterProtocols._instance.c2s_CRequestTeamMatchList(0, 0, num);
                    }
                    else {
                        this.CRequestMatchInfo();
                        RequesterProtocols._instance.c2s_CRequestTeamMatchList(this.targetId, 0, num);
                    }
                };
                /** 请求队伍匹配和个人匹配数量 */
                TeamOrganizeMediator.prototype.CRequestMatchInfo = function () {
                    RequesterProtocols._instance.c2s_CRequestMatchInfo();
                };
                //发送协议
                TeamOrganizeMediator.prototype.sendProto = function () {
                    // RequesterProtocols._instance.c2s_CReqRoleInfo(1);//请求人物信息界面（主要是 几个积分以及大红大蓝的剩余量）1表示请求人物信息界面，2表示战斗结束
                };
                TeamOrganizeMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                    this.init();
                    this.refreshFirstMenuData();
                    this.CRequestTeamMatchList(1);
                    this.CRequestMatchInfo();
                    this.controUI();
                    if (HudModel.getInstance().yindaoId == YinDaoEnum.ZUIDUI_YINDAO)
                        this.richangYindao();
                };
                /**自动匹配引导 */
                TeamOrganizeMediator.prototype.pipeiYindao = function () {
                    var x1 = this._viewUI.zidongpipei_btn.x + this._viewUI.zidongpipei_btn.width;
                    var y1 = this._viewUI.zidongpipei_btn.y;
                    var x2 = x1 - 180;
                    var y2 = y1 + 80;
                    this.setAniPos(x2, y2);
                    this.setTipPos(x1, y1);
                    this.startYindao(YinDaoEnum.PIPEI_YINDAO_TIP);
                    this.yindaoId = YinDaoEnum.PIPEI_YINDAO;
                    HudModel.getInstance().yindaoId = YinDaoEnum.RESET_YINDAO;
                };
                /**点击日常副本引导 */
                TeamOrganizeMediator.prototype.richangYindao = function () {
                    var x1 = this._viewUI.firstMenu2_list.x + this._viewUI.firstMenu2_list.width;
                    var y1 = this._viewUI.selectPanel.y + this._viewUI.firstMenu2_list.y;
                    var x2 = x1 - 80;
                    var y2 = y1 + 30;
                    this.setAniPos(x2, y2);
                    this.setTipPos(x1, y1);
                    this.startYindao(0);
                    this.yindaoId = YinDaoEnum.CHOOSE_RICHANG_YINDAO;
                };
                /**引导开始 */
                TeamOrganizeMediator.prototype.startYindao = function (tipid) {
                    var tip = HudModel._instance.carroweffectData;
                    this.onload();
                    Laya.timer.loop(1000, this, this.moveImg);
                    Laya.timer.loop(5000, this, this.closeAni);
                    if (tipid != 0) {
                        this._viewUI.yindaoTip_htm.text = tip[tipid].text;
                        this._viewUI.yindaoTip_img.visible = true;
                    }
                    this._viewUI.addChild(this.ani);
                    this._viewUI.addChild(this.dianImg);
                };
                /**设置引导提示位置 */
                TeamOrganizeMediator.prototype.setTipPos = function (x, y) {
                    this._viewUI.yindaoTip_img.x = x;
                    this._viewUI.yindaoTip_img.y = y;
                };
                /**设置动画位置*/
                TeamOrganizeMediator.prototype.setAniPos = function (x, y) {
                    this.ani.x = x;
                    this.ani.y = y;
                    this.dianImg.x = x;
                    this.dianImg.y = y;
                };
                /**关闭动画 */
                TeamOrganizeMediator.prototype.closeAni = function () {
                    this.ani.clear();
                    Laya.timer.clear(this, this.closeAni);
                    Laya.timer.clear(this, this.moveImg);
                    this._viewUI.yindaoTip_img.visible = false;
                    this.dianImg.visible = false;
                    this.dianImg.mouseThrough = false;
                };
                /**播放动画 */
                TeamOrganizeMediator.prototype.onload = function () {
                    Laya.Animation.createFrames(this.anUrls("", 9), "yindao");
                    this.ani.play(0, true, "yindao");
                    this.ani.interval = 112;
                    this.dianImg.skin = "common/ui/mainhud/dian.png";
                    this.ani.mouseThrough = true;
                    this.dianImg.mouseThrough = true;
                };
                /**移动手指图标 */
                TeamOrganizeMediator.prototype.moveImg = function () {
                    this.dianImg.visible = true;
                    if (this.dianImg.y <= this.ani.y)
                        Laya.Tween.to(this.dianImg, { x: this.ani.x + 25, y: this.ani.y + 25 }, 1000, null, Laya.Handler.create(this, function () { }), null, false);
                    else
                        Laya.Tween.to(this.dianImg, { x: this.ani.x - 5, y: this.ani.y - 5 }, 1000, null, Laya.Handler.create(this, function () { }), null, false);
                };
                TeamOrganizeMediator.prototype.anUrls = function (aniName, length) {
                    var urls = [];
                    for (var index = 1; index <= length; index++) {
                        urls.push("common/ui/yindao/" + aniName + index + ".png");
                    }
                    return urls;
                };
                /** 初始化UI */
                TeamOrganizeMediator.prototype.controUI = function () {
                    // this._viewUI.match_image.visible = false;
                    this.refreshSecondMenuData(this.currentSecondType);
                    if (typeof (this.currentSecondSelectIndex) == "undefined" || this.currentSecondSelectIndex == -1) { /** 当前二级菜单未选中的情况下 */
                        this._viewUI.zidongpipei_btn.visible = false;
                    }
                    else {
                        this._viewUI.zidongpipei_btn.visible = true;
                    }
                    modules.mainhud.models.HudProxy.getInstance().once(modules.mainhud.models.UPDATA_TEAM_UI, this, this.autoMatch);
                    // mainhud.models.HudProxy.getInstance().on(models.MATCH_EVENT,this,this.autoMatch);
                };
                /** 跳转目标副本
                 * @param type1 一级按钮类型
                 * @param type2 二级按钮类型
                 */
                TeamOrganizeMediator.prototype.onshow = function (type1, type2) {
                    switch (type1) {
                        case TeamSetType.STORY_TASK:
                            this.currentFirstSelectIndex = 0;
                            break;
                        case TeamSetType.DAILY_FUBEN:
                            this.currentFirstSelectIndex = 1;
                            break;
                        case TeamSetType.SUPERIOR_FUBEN:
                            this.currentFirstSelectIndex = 2;
                            break;
                        case TeamSetType.TIME_ACTIVITY:
                            this.currentFirstSelectIndex = 3;
                            break;
                        case TeamSetType.FAMILY_ACTIVITY:
                            this.currentFirstSelectIndex = 4;
                            break;
                        case TeamSetType.YUANGU_MOXIANG:
                            this.currentFirstSelectIndex = 5;
                            break;
                        case TeamSetType.LEVEL_TASK:
                            this.currentFirstSelectIndex = 6;
                            break;
                        case TeamSetType.SHANGGU_SHEN:
                            this.currentFirstSelectIndex = 7;
                            break;
                        case TeamSetType.DiroBS:
                            this.currentFirstSelectIndex = 8;
                            break;
                        case TeamSetType.ZHANGJIE_TASK:
                            this.currentFirstSelectIndex = 9;
                            break;
                        default:
                            break;
                    }
                    if (type2) {
                        this.currentSecondSelectIndex = type2;
                    }
                    var _firstMenu_btn = this._viewUI.firstMenu2_list.getCell(this.currentFirstSelectIndex).getChildByName("firstMenu_btn");
                    var _type = this.firstMenu[this.currentFirstSelectIndex].type;
                    var _requirement = this.firstMenu[this.currentFirstSelectIndex].requirement;
                    var _opTime = this.firstMenu[this.currentFirstSelectIndex].opentime;
                    this.refreshSecondMenuData(_type, _requirement, _opTime, _firstMenu_btn, this.currentFirstSelectIndex);
                    this.show();
                };
                TeamOrganizeMediator.prototype.hide = function () {
                    if (LoginModel.getInstance().CommonPage != "") {
                        modules.ModuleManager.show(LoginModel.getInstance().CommonPage, this._app);
                        LoginModel.getInstance().CommonPage = "";
                    }
                    team.models.TeamProxy.getInstance().off(team.models.OPEN_TEAM_EVENT, this, this.openTeam);
                    // mainhud.models.HudProxy.getInstance().off(mainhud.models.UPDATA_TEAM_UI,this,this.autoMatch);
                    // mainhud.models.HudProxy.getInstance().off(models.MATCH_EVENT,this,this.autoMatch);			
                    Laya.timer.clear(this, this.CRequestMatchInfo);
                    _super.prototype.hide.call(this);
                };
                TeamOrganizeMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                TeamOrganizeMediator.prototype.onShow = function (event) {
                    this.show();
                };
                TeamOrganizeMediator.prototype.showChenwei = function () {
                    // this._RoleChenweiMediator.show();
                };
                TeamOrganizeMediator.prototype.showTip = function () {
                    // this._RoleTipMediator.show();
                };
                TeamOrganizeMediator.prototype.showJiuguan = function () {
                    // this._RoleShopMediator.show();
                };
                TeamOrganizeMediator.prototype.showJifen = function () {
                    // this._RoleJiFenDuiHuanMediator.show();
                };
                return TeamOrganizeMediator;
            }(game.modules.UiMediator));
            team.TeamOrganizeMediator = TeamOrganizeMediator;
        })(team = modules.team || (modules.team = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=TeamOrganizeMediator.js.map