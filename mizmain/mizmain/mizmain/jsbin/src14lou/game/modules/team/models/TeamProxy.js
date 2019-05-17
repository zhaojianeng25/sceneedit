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
* ljm 导入对应的类
*/
var _LoginModel = game.modules.createrole.models.LoginModel;
var TeamModel = game.modules.team.models.TeamModel;
var HuoBanModule = game.modules.huoban.HuoBanModule;
var RemindViewMediator = game.modules.commonUI.RemindViewMediator;
var ZhenFaGuangHuanMediator = game.modules.huoban.ZhenFaGuangHuanMediator;
var InviteFriendsMediator = game.modules.commonUI.InviteFriendsMediator;
var TeamMateViewMediator = game.modules.commonUI.TeamMateViewMediators;
var DisappearMessageTipsMediator = game.modules.commonUI.DisappearMessageTipsMediator;
var EditWindowMediator = game.modules.commonUI.EditWindowMediator;
var BattleInstructionMediator = game.modules.commonUI.BattleInstructionMediator;
var game;
(function (game) {
    var modules;
    (function (modules) {
        var team;
        (function (team) {
            var models;
            (function (models) {
                /** 重返队伍回调事件 */
                models.OPEN_TEAM_EVENT = "OpenTeamEvent";
                /** 离开队伍确认事件 */
                models.IS_CONFIRM_EXIT_TEAM = "你确定要离开队伍吗";
                /** 创建队伍成功 */
                models.CREATE_TEAM_SUCC = "createTeamEvent";
                /** 匹配事件 */
                models.MATCH_EVENT = "matchEvent";
                /** 刷新Target数据 */
                models.REFRESH_TARGET = "refreshTarget";
                /** 弹窗提示是否接受邀请 */
                models.IS_ACCEPT_INVITE = "acceptInvite";
                /** 刷新队伍事件 */
                models.REFRESH_FRIEND_ACCEPT_TEAM = "acceptTeamEvent";
                /** 刷新查看装备 */
                models.REFRESH_VIEW_EQUIP = "viewEquipEvent";
                /** 响应队长的委托队长事件 */
                models.RESPONSE_TO_CAPTAIN = "responseToBeCaptain";
                /** 队伍错误事件 */
                models.RESPONSE_TEAM_ERROR = "responseToTeamError";
                /** 一键喊话成功 */
                models.ONE_KEY_YELL_SUCC = "oneKeySucc";
                /** 等待匹配事件 */
                models.WAIT_MATCH_EVENT = "waitmatchEvent";
                /** 刷新组队队伍信息的事件 */
                models.REFRESH_TEAMINFO_EVENT = "refreshTeamInfoEvent";
                /** 同意入队事件 */
                models.AGREE_JOIN_EVENT = "agreeJoinTeamEvent";
                /** 刷新主界面上的队伍系统 */
                models.REFRESH_MAININTERFACE_TEAM = "refreshMainTeamEvent";
                /** 队员响应队长的召唤 */
                models.RESPONSE_CALL_BACK = "responseCallBackEvent";
                /** 主界面响应组队匹配状态 */
                models.MAINHUD_UPDATE_TEAM_STATE = "updateMainhudTeamState";
                /** 一键喊话队伍信息 */
                models.ONE_KEY_TEAMINFO = "onekeyTeaminfoEvent";
                /** 刷新申请者数据 */
                models.REFRESH_APPLICATION = "refreshTeamApplicationEvent";
                /** 队伍相关红点设置 */
                models.TEAM_RED_DOT = "teamRedDotEvent";
                /** 队伍允许的最大长度 */
                models.TEAM_MAX = 5;
                /** 特殊副本队伍结算 */
                models.TEAM_ROLL_MELON = "teamRollMelon";
                /** 特殊副本结算（摇骰子）取消监听 */
                models.JS_CANCEL = "jsCancel";
                /** 特殊副本结算（摇骰子）确定监听 */
                models.JS_OK = "jsOK";
                /** 更新队员队长信息弹窗 */
                models.UPDATE_TEAMMATE_STATE_POPUP = "updateTeammateStatePopupEvent";
                /** 阵法等级提升了 */
                models.ZHENFA_LEVELUP = "zhenFaLevelUp";
                var TeamProxy = /** @class */ (function (_super) {
                    __extends(TeamProxy, _super);
                    function TeamProxy() {
                        var _this = _super.call(this) || this;
                        TeamProxy._instance = _this;
                        _this.init();
                        return _this;
                    }
                    TeamProxy.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new TeamProxy();
                        }
                        return this._instance;
                    };
                    TeamProxy.prototype.init = function () {
                        models.TeamModel.getInstance();
                        this.addNetworkListener();
                        /** 队伍列表信息 */
                        Laya.loader.load("common/data/temp/team.cteamlistinfo.bin", Handler.create(this, this.onloadedTeamListInfoComplete), null, Loader.BUFFER);
                    };
                    TeamProxy.prototype.onloadedTeamListInfoComplete = function () {
                        console.log("cteamlistinfo表格加载完毕------ completed");
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/team.cteamlistinfo.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.TeamModel.getInstance().teamListConfig, game.data.template.TeamListInfoBaseVo, "id");
                        console.log("onloadedCreateRoleConfigComplete:", models.TeamModel.getInstance().teamListConfig);
                    };
                    // 添加监听
                    TeamProxy.prototype.addNetworkListener = function () {
                        Network._instance.addHanlder(ProtocolsEnum.SCreateTeam, this, this.onSCreateTeam);
                        Network._instance.addHanlder(ProtocolsEnum.SRequestTeamMatch, this, this.onRequestTeamMatch);
                        Network._instance.addHanlder(ProtocolsEnum.SStopTeamMatch, this, this.onStopTeamMatch);
                        Network._instance.addHanlder(ProtocolsEnum.SInviteJoinSucc, this, this.onSinviteJoinSucc);
                        Network._instance.addHanlder(ProtocolsEnum.SInviteJoinTeam, this, this.onSInviteJoinTeam);
                        Network._instance.addHanlder(ProtocolsEnum.SAddTeamMember, this, this.onSAddTeamMember);
                        Network._instance.addHanlder(ProtocolsEnum.SSetTeamFormation, this, this.onSSetTeamFormation);
                        Network._instance.addHanlder(ProtocolsEnum.SDismissTeam, this, this.onSDismissTeam);
                        Network._instance.addHanlder(ProtocolsEnum.SGetRoleEquip, this, this.onSGetRoleEquip);
                        Network._instance.addHanlder(ProtocolsEnum.SSetCommander, this, this.onSSetCommander);
                        Network._instance.addHanlder(ProtocolsEnum.SAskforSetLeader, this, this.onSAskforSetLeader);
                        Network._instance.addHanlder(ProtocolsEnum.SRequestSetLeaderSucc, this, this.onSRequestSetLeaderSucc);
                        Network._instance.addHanlder(ProtocolsEnum.SAddTeamApply, this, this.onSAddTeamApply);
                        Network._instance.addHanlder(ProtocolsEnum.SMemberSequence, this, this.onSMemberSequence);
                        Network._instance.addHanlder(ProtocolsEnum.SSetTeamLeader, this, this.onSSetTeamLeader);
                        Network._instance.addHanlder(ProtocolsEnum.STeamError, this, this.onSTeamError);
                        Network._instance.addHanlder(ProtocolsEnum.SOneKeyTeamMatch, this, this.onSOneKeyTeamMatch);
                        Network._instance.addHanlder(ProtocolsEnum.SRequestTeamMatchList, this, this.onSRequestTeamMatchList);
                        Network._instance.addHanlder(ProtocolsEnum.SRequestMatchInfo, this, this.onSRequestMatchInfo);
                        Network._instance.addHanlder(ProtocolsEnum.SForceInviteJointTeam, this, this.onSForceInviteJointTeam);
                        Network._instance.addHanlder(ProtocolsEnum.SRemoveTeamMember, this, this.onSRemoveTeamMember);
                        Network._instance.addHanlder(ProtocolsEnum.SUpdateMemberState, this, this.onSUpdateMemberState);
                        Network._instance.addHanlder(ProtocolsEnum.SAskforCallBack, this, this.onSAskforCallBack);
                        Network._instance.addHanlder(ProtocolsEnum.SOneKeyApplyTeamInfo, this, this.onCOneKeyApplyTeamInfo);
                        Network._instance.addHanlder(ProtocolsEnum.SRequestJoinSucc, this, this.onSRequestJoinSucc);
                        Network._instance.addHanlder(ProtocolsEnum.SRemoveTeamApply, this, this.onSRemoveTeamApply);
                        Network._instance.addHanlder(ProtocolsEnum.SUpdateMemberHPMP, this, this.onSUpdateMemberHPMP);
                        Network._instance.addHanlder(ProtocolsEnum.SUpdateMemberMaxHPMP, this, this.onSUpdateMemberMaxHPMP);
                        Network._instance.addHanlder(ProtocolsEnum.SUpdateMemberLevel, this, this.onSUpdateMemberLevel);
                        Network._instance.addHanlder(ProtocolsEnum.STeamRollMelon, this, this.onSTeamRollMelon);
                        Network._instance.addHanlder(ProtocolsEnum.STeamRollMelonInfo, this, this.onSTeamRollMelonInfo);
                        Network._instance.addHanlder(ProtocolsEnum.SEnterFuBen, this, this.onEnterFuBen);
                    };
                    // 移除监听
                    TeamProxy.prototype.removeNetworkListener = function () {
                        //Network._instance.removeHanlder(ProtocolsEnum.SCreateRole, this, this.onCreateRole);
                        //Network._instance.removeHanlder(ProtocolsEnum.SEnterWorld, this, this.onEnterWorld);
                    };
                    TeamProxy.prototype.onEnterFuBen = function (optcode, msg) {
                        RequesterProtocols._instance.c2s_req_line_task(msg.taskid);
                    };
                    TeamProxy.prototype.onSTeamRollMelonInfo = function (optcode, msg) {
                        console.log("-----------战斗结束奖励信息Info----：", msg.melonid);
                        console.log("-----------战斗结束奖励信息Info----：", msg.rollinfolist);
                        console.log("-----------战斗结束奖励信息Info----：", msg.grabroleid);
                        console.log("-----------战斗结束奖励信息Info----：", msg.grabrolename);
                        console.log("-----------战斗结束奖励信息Info----：", msg.melonitemlist);
                    };
                    /** 特殊副本队伍战斗结算奖励信息 */
                    TeamProxy.prototype.onSTeamRollMelon = function (optcode, msg) {
                        models.TeamModel.getInstance().melonlist = msg.melonlist;
                        models.TeamModel.getInstance().watcher = msg.watcher;
                        this.event(models.TEAM_ROLL_MELON);
                    };
                    /** 删除队伍申请 */
                    TeamProxy.prototype.onSRemoveTeamApply = function (optcode, msg) {
                        var arr = msg.applyids;
                        for (var arrIndex = 0; arrIndex < arr.length; arrIndex++) {
                            models.TeamModel.getInstance().applyList.remove(arr[arrIndex]);
                        }
                        this.event(models.REFRESH_APPLICATION);
                        /** 刷新红点 */
                        this.event(models.TEAM_RED_DOT, TeamRedDot.HIDE_TEAM_REDDOT);
                    };
                    /** 服务器返回，申请入队成功 */
                    TeamProxy.prototype.onSRequestJoinSucc = function (optcode, msg) {
                        var leaderName = msg.rolename;
                    };
                    /** 一键召唤点击查看队伍信息 */
                    TeamProxy.prototype.onCOneKeyApplyTeamInfo = function (optcode, msg) {
                        var teamId = msg.teamid;
                        var memberlist = new Laya.Dictionary;
                        memberlist.set("memberlist", msg.memberlist);
                        this.event(models.ONE_KEY_TEAMINFO, memberlist);
                    };
                    /** 队长请求召唤队员 */
                    TeamProxy.prototype.onSAskforCallBack = function (optcode, msg) {
                        var leaderId = msg.leaderid;
                        this.event(models.RESPONSE_CALL_BACK);
                    };
                    /** 更新队员状态 */
                    TeamProxy.prototype.onSUpdateMemberState = function (optcode, msg) {
                        var roleid = msg.roleid;
                        var roleState = msg.state;
                        models.TeamModel.getInstance().updateMemberState.set(roleid, roleState);
                        models.TeamModel.getInstance().updateMemberState_Del.set(roleid, roleState);
                        this.event(models.REFRESH_FRIEND_ACCEPT_TEAM);
                        this.event(models.UPDATE_TEAMMATE_STATE_POPUP);
                    };
                    /** 删除玩家 更新数据 */
                    TeamProxy.prototype.onSRemoveTeamMember = function (optcode, msg) {
                        var keys = msg.memberids;
                        for (var roleIdKey = 0; roleIdKey < keys.length; roleIdKey++) {
                            /** 移除玩家 */
                            models.TeamModel.getInstance().teamMemberBasic.remove(keys[roleIdKey]);
                            for (var TeamRoleInfoStorageIndex = 0; TeamRoleInfoStorageIndex < models.TeamModel.getInstance().TeamRoleInfoStorage.length; TeamRoleInfoStorageIndex++) { /** 每移除一个玩家，就要进行判断 将主界面的缓存队伍数据清掉*/
                                if (models.TeamModel.getInstance().TeamRoleInfoStorage[TeamRoleInfoStorageIndex].roleid == keys[roleIdKey]) {
                                    models.TeamModel.getInstance().TeamRoleInfoStorage.splice(TeamRoleInfoStorageIndex, 1);
                                }
                            }
                        }
                        this.event(models.REFRESH_FRIEND_ACCEPT_TEAM);
                    };
                    /** 强制邀请某玩家入队 */
                    TeamProxy.prototype.onSForceInviteJointTeam = function (optcode, msg) {
                        var roleId = msg.roleid;
                        this.event(models.AGREE_JOIN_EVENT, roleId);
                    };
                    /** 请求队伍匹配和个人匹配数量 */
                    TeamProxy.prototype.onSRequestMatchInfo = function (optcode, msg) {
                        var teammatchnum = msg.teammatchnum;
                        var playermatchnum = msg.playermatchnum;
                        this.event(models.WAIT_MATCH_EVENT, [teammatchnum, playermatchnum]);
                        /** 这个又有啥用.. */
                    };
                    /** 返回队伍 */
                    TeamProxy.prototype.onSRequestTeamMatchList = function (optcode, msg) {
                        models.TeamModel.getInstance().SRequestTeamMatchList.set("TeamMatchList", msg);
                        //这里应该有事件，暂时天停住
                        this.event(models.REFRESH_TEAMINFO_EVENT);
                    };
                    /** 一键喊话返回 */
                    TeamProxy.prototype.onSOneKeyTeamMatch = function (optcode, msg) {
                        /** 一键喊话成功返回，有什么用？ */
                        var ret = msg.ret;
                        if (ret == 0) { /** 一键喊话成功 关闭界面 */
                            this.event(models.ONE_KEY_YELL_SUCC);
                        }
                    };
                    /** 服务器返回 重新设置队长 给所有队员 */
                    TeamProxy.prototype.onSSetTeamLeader = function (optcode, msg) {
                        models.TeamModel.getInstance().entrustCaptain = msg.leaderId;
                        this.event(models.REFRESH_FRIEND_ACCEPT_TEAM);
                    };
                    /** 队伍错误类型返回 */
                    TeamProxy.prototype.onSTeamError = function (optcode, msg) {
                        var eventType = msg.teamError;
                        this.event(models.RESPONSE_TEAM_ERROR, eventType);
                    };
                    /** 服务器返回 队伍成员当前顺序 */
                    TeamProxy.prototype.onSMemberSequence = function (optcode, msg) {
                        game.modules.team.models.TeamModel.getInstance().nowTeamMember = msg.teamMemeberIdList;
                        this.event(models.REFRESH_FRIEND_ACCEPT_TEAM);
                    };
                    /**队伍申请入队协议  */
                    TeamProxy.prototype.onSAddTeamApply = function (optcode, msg) {
                        var teamApplySize = msg.applySize;
                        for (var index = 0; index < teamApplySize; index++) {
                            models.TeamModel.getInstance().applyList.set(msg.applylist[index].roleid, msg.applylist[index]);
                            var arr = [msg.applylist[index].rolename];
                            var _flag = modules.friend.models.FriendModel.getInstance().isMyBlackList(msg.applylist[index].roleid); //判断申请入队的角色id是否是玩家自己黑名单存在
                            if (_flag)
                                return;
                            var promot = HudModel.getInstance().promptAssembleBack(PromptExplain.APPLICATION_FOR_ADMISSION, arr);
                            game.modules.chat.models.ChatProxy.getInstance().event(game.modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS, promot);
                        }
                        if (teamApplySize != 0)
                            /** 刷新红点 */
                            this.event(models.TEAM_RED_DOT, TeamRedDot.SHOW_TEAM_REDDOT);
                    };
                    /** 请求提升某个玩家为队长成功（只是请求成功，对方还未同意）给队长？？ */
                    TeamProxy.prototype.onSRequestSetLeaderSucc = function (optcode, msg) {
                        // models.TeamModel.getInstance().entrustCaptain = msg.inviteeId;
                    };
                    /** 服务端响应受委托为队长 这个是给受邀者显示的,id为队长 */
                    TeamProxy.prototype.onSAskforSetLeader = function (optcode, msg) {
                        /** 直接同意 */
                        this.event(models.RESPONSE_TO_CAPTAIN);
                    };
                    /** 委任指挥返回 */
                    TeamProxy.prototype.onSSetCommander = function (optcode, msg) {
                        models.TeamModel.getInstance().commanderRoleid = msg.roleId;
                        this.event(models.REFRESH_FRIEND_ACCEPT_TEAM);
                    };
                    /** 人物装备刷新显示 */
                    TeamProxy.prototype.onSGetRoleEquip = function (optcode, msg) {
                        models.TeamModel.getInstance().roleEquipData = msg.SGetRoleEquip;
                        this.event(models.REFRESH_VIEW_EQUIP);
                    };
                    /** 解散队伍 */
                    TeamProxy.prototype.onSDismissTeam = function (optcode, msg) {
                        /** 清除队伍信息 */
                        models.TeamModel.getInstance().teamMemberBasic.clear();
                        models.TeamModel.getInstance().entrustCaptain = -1;
                        models.TeamModel.getInstance().commanderRoleid = -1;
                        models.TeamModel.getInstance().swapPosIndex = -1;
                        models.TeamModel.getInstance().nowTeamMember = [];
                        models.TeamModel.getInstance().TeamRoleInfoStorage = [];
                        models.TeamModel.getInstance().friendsReceiveData = null;
                        models.TeamModel.getInstance().screateTeam = null;
                        this.event(models.REFRESH_FRIEND_ACCEPT_TEAM);
                        this.event(models.MATCH_EVENT, 1);
                    };
                    /** 设置队伍光环 */
                    TeamProxy.prototype.onSSetTeamFormation = function (optcode, msg) {
                        var _setTeamFormationVo = team.models.TeamModel.getInstance().setTeamFormationVo;
                        _setTeamFormationVo.formation = msg.SetTeamFormation.formation;
                        _setTeamFormationVo.formationLevel = msg.SetTeamFormation.formationLevel;
                        if (msg.SetTeamFormation.msg == 1) {
                            this.event(models.ZHENFA_LEVELUP);
                        }
                        _setTeamFormationVo.msg = msg.SetTeamFormation.msg;
                    };
                    /** 停止匹配 */
                    TeamProxy.prototype.onStopTeamMatch = function (optcode, msg) {
                        models.TeamModel.getInstance().matchFlag = false;
                        var teamdata = new Laya.Dictionary();
                        var teamdatas = [];
                        teamdatas.push(models.TeamModel.getInstance().matchFlag);
                        var key = models.TeamModel.getInstance().teamMemberBasic.keys;
                        /** 如果自身组队状况下不做主界面的刷新 */
                        var currTarget = models.TeamModel.getInstance().currMatchTarget;
                        if (key.length == 0)
                            teamdatas.push(currTarget);
                        teamdata.set("data", teamdatas);
                        team.models.TeamProxy.getInstance().event(team.models.MAINHUD_UPDATE_TEAM_STATE, teamdata);
                        team.models.TeamProxy.getInstance().event(models.MATCH_EVENT, 1);
                    };
                    /** 创建队伍好友加入队伍 */
                    TeamProxy.prototype.onSAddTeamMember = function (optcode, msg) {
                        // models.TeamModel.getInstance().teamMemberBasic.set("teamMate",msg.memberlist);
                        for (var index = 0; index < msg.teamSize; index++) {
                            /** 这个问题注意值全是在memberlist里面的，这里的key不需要在vo里纠结 */
                            models.TeamModel.getInstance().teamMemberBasic.set(msg.memberlist[index].roleid, msg.memberlist[index]);
                        }
                        this.event(models.OPEN_TEAM_EVENT);
                        this.event(models.REFRESH_FRIEND_ACCEPT_TEAM);
                    };
                    /** 邀请 某位好友接收数据 */
                    TeamProxy.prototype.onSInviteJoinTeam = function (optcode, msg) {
                        var inviteJoinTeamVo = new models.InviteJoinTeamVo();
                        inviteJoinTeamVo.leaderroleid = msg.inviteJoinTeamVo.leaderroleid;
                        inviteJoinTeamVo.invitername = msg.inviteJoinTeamVo.invitername;
                        var _flag = modules.friend.models.FriendModel.getInstance().isMyBlackList(0, msg.inviteJoinTeamVo.invitername); //判断申请入队的角色名字是否是玩家自己黑名单存在
                        if (_flag)
                            return;
                        inviteJoinTeamVo.inviterlevel = msg.inviteJoinTeamVo.inviterlevel;
                        inviteJoinTeamVo.op = msg.inviteJoinTeamVo.op;
                        models.TeamModel.getInstance().friendsReceiveData = inviteJoinTeamVo;
                        this.event(models.IS_ACCEPT_INVITE, [inviteJoinTeamVo.invitername, inviteJoinTeamVo.inviterlevel, inviteJoinTeamVo.op, inviteJoinTeamVo.leaderroleid]);
                    };
                    /** 创建队伍成功 */
                    TeamProxy.prototype.onSCreateTeam = function (optcode, msg) {
                        var sCreateTeamVo = new models.SCreateTeamVo();
                        sCreateTeamVo.teamid = msg.sCreateTeamVo.teamid;
                        sCreateTeamVo.formation = msg.sCreateTeamVo.formation;
                        sCreateTeamVo.teamstate = msg.sCreateTeamVo.teamstate;
                        sCreateTeamVo.smapId = msg.sCreateTeamVo.smapId;
                        models.TeamModel.getInstance().screateTeam = sCreateTeamVo;
                        this.event(models.CREATE_TEAM_SUCC);
                    };
                    /** 邀请成功 */
                    TeamProxy.prototype.onSinviteJoinSucc = function (optcode, msg) {
                        var S2C_invite_joinsucc = new hanlder.S2C_invite_joinsucc();
                        S2C_invite_joinsucc.roleId = msg.roleId;
                        /** 邀请成功但不知作用，用到再做处理 */
                    };
                    /** 开始匹配 */
                    TeamProxy.prototype.onRequestTeamMatch = function (optcode, msg) {
                        var requestTeamMatchVo = new models.RequestTeamMatchVo();
                        requestTeamMatchVo.typematch = msg.requestTeamMatchVo.typematch;
                        requestTeamMatchVo.targetid = msg.requestTeamMatchVo.targetid;
                        requestTeamMatchVo.levelmin = msg.requestTeamMatchVo.levelmin;
                        requestTeamMatchVo.levelmax = msg.requestTeamMatchVo.levelmax;
                        models.TeamModel.getInstance().matchTeam = requestTeamMatchVo;
                        /** 只有当前匹配类型不为只设置队伍目标时才改变flag */
                        if (requestTeamMatchVo.typematch != TypeMatch.SET_TARGET)
                            models.TeamModel.getInstance().matchFlag = true;
                        var key = models.TeamModel.getInstance().teamMemberBasic.keys;
                        //这里没做请求但是服务端下发了类型为组队匹配的数据
                        if (requestTeamMatchVo.typematch != TypeMatch.TEAM_MATCH) {
                            /** 未组队状态下才更新主界面 */
                            var teamdata = new Laya.Dictionary();
                            var teamdatas = [];
                            teamdatas.push(models.TeamModel.getInstance().matchFlag);
                            var currTarget = models.TeamModel.getInstance().currMatchTarget;
                            if (key.length == 0)
                                teamdatas.push(currTarget);
                            teamdata.set("data", teamdatas);
                            team.models.TeamProxy.getInstance().event(team.models.MAINHUD_UPDATE_TEAM_STATE, teamdata);
                        }
                        if (requestTeamMatchVo.typematch == TypeMatch.TEAM_MATCH) {
                            this.event(models.MATCH_EVENT, 2);
                        }
                    };
                    /** 刷新队员的hp mp */
                    TeamProxy.prototype.onSUpdateMemberHPMP = function (optcode, msg) {
                        var keyName = models.TeamModel.getInstance().teamMemberBasic.keys;
                        for (var teamIndex = 0; teamIndex < keyName.length; teamIndex++) {
                            if (keyName[teamIndex] == msg.roleid) {
                                var memberBasic = models.TeamModel.getInstance().teamMemberBasic.get(keyName[teamIndex]);
                                {
                                    memberBasic.hp = msg.hp;
                                    memberBasic.mp = msg.mp;
                                }
                            }
                        }
                        this.event(models.REFRESH_FRIEND_ACCEPT_TEAM);
                    };
                    /** 刷新队员的maxhp maxmp */
                    TeamProxy.prototype.onSUpdateMemberMaxHPMP = function (optcode, msg) {
                        var keyName = models.TeamModel.getInstance().teamMemberBasic.keys;
                        for (var teamIndex = 0; teamIndex < keyName.length; teamIndex++) {
                            if (keyName[teamIndex] == msg.roleid) {
                                var memberBasic = models.TeamModel.getInstance().teamMemberBasic.get(keyName[teamIndex]);
                                {
                                    memberBasic.maxhp = msg.maxhp;
                                    memberBasic.maxmp = msg.maxmp;
                                }
                            }
                        }
                        this.event(models.REFRESH_FRIEND_ACCEPT_TEAM);
                    };
                    /** 刷新队员的等级 */
                    TeamProxy.prototype.onSUpdateMemberLevel = function (optcode, msg) {
                        var keyName = models.TeamModel.getInstance().teamMemberBasic.keys;
                        for (var teamIndex = 0; teamIndex < keyName.length; teamIndex++) {
                            if (keyName[teamIndex] == msg.roleid) {
                                var memberBasic = models.TeamModel.getInstance().teamMemberBasic.get(keyName[teamIndex]);
                                memberBasic.level = msg.level;
                            }
                        }
                        this.event(models.REFRESH_FRIEND_ACCEPT_TEAM);
                    };
                    return TeamProxy;
                }(hanlder.ProxyBase));
                models.TeamProxy = TeamProxy;
            })(models = team.models || (team.models = {}));
        })(team = modules.team || (modules.team = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=TeamProxy.js.map