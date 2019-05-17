/**
* by ljm
*/
var TeamError;
(function (TeamError) {
    /** 未知错误 */
    TeamError[TeamError["UnkownError"] = 0] = "UnkownError";
    /** 自己已经在队伍中 */
    TeamError[TeamError["SelfInTeam"] = 1] = "SelfInTeam";
    /** 自己不在队伍中 */
    TeamError[TeamError["SelfNotInTeam"] = 2] = "SelfNotInTeam";
    /** 对方已经在队伍中 */
    TeamError[TeamError["ObjectInTeam"] = 3] = "ObjectInTeam";
    /** 自己不是队长 */
    TeamError[TeamError["SelfNOtLeader"] = 4] = "SelfNOtLeader";
    /** 对方不是队长 */
    TeamError[TeamError["ObjectNotLeader"] = 5] = "ObjectNotLeader";
    /** 对方不在线（有统一的Error吗） */
    TeamError[TeamError["ObjectOffline"] = 6] = "ObjectOffline";
    /** 自己组队开关关闭 */
    TeamError[TeamError["SelfTeamFunctionClose"] = 7] = "SelfTeamFunctionClose";
    /** 对方组队开关关闭 */
    TeamError[TeamError["ObjectTeamFunctionClose"] = 8] = "ObjectTeamFunctionClose";
    /** 自己在不可组队状态 */
    TeamError[TeamError["SelfInUnteamState"] = 9] = "SelfInUnteamState";
    /** 对方在不可组队状态 */
    TeamError[TeamError["ObjectInUnteamState"] = 10] = "ObjectInUnteamState";
    /** 队伍人数已满 */
    TeamError[TeamError["TeamFull"] = 11] = "TeamFull";
    /** 邀请 */
    TeamError[TeamError["InvitedInTeam"] = 12] = "InvitedInTeam";
    /** 对方正在被其他人邀请中 */
    TeamError[TeamError["BeingInvited"] = 13] = "BeingInvited";
    /** 30秒内只能邀请一次同一玩家 */
    TeamError[TeamError["InvitedIn30s"] = 14] = "InvitedIn30s";
    /** 正在邀请人数达到4个，不能再邀请更多 */
    TeamError[TeamError["InviteingsFull"] = 15] = "InviteingsFull";
    /** 邀请您的队伍已经解散 */
    TeamError[TeamError["InviterTeamNotExist"] = 16] = "InviterTeamNotExist";
    /** 邀请者不是队长 */
    TeamError[TeamError["InviterNotLeader"] = 17] = "InviterNotLeader";
    /** 申请者已经在队伍中 */
    TeamError[TeamError["ApplierInTeam"] = 18] = "ApplierInTeam";
    /** 该申请已经超时 */
    TeamError[TeamError["ApplyTimeout"] = 19] = "ApplyTimeout";
    /** 队伍申请列表已满 */
    TeamError[TeamError["ApplyListFull"] = 20] = "ApplyListFull";
    /** 申请者级别不符合队伍要求 */
    TeamError[TeamError["ApplierLevelValid"] = 21] = "ApplierLevelValid";
    /** 队伍处在不可以换队长的状态 */
    TeamError[TeamError["ChangeLeaderUnable"] = 22] = "ChangeLeaderUnable";
    /** 已经提出更换队长，等待回应中 */
    TeamError[TeamError["InChangeLeaderStatus"] = 23] = "InChangeLeaderStatus";
    /** 队伍2分钟只能更换队长一次 */
    TeamError[TeamError["ChangeLeaderInCD"] = 24] = "ChangeLeaderInCD";
    /** 队员不处于正常状态 */
    TeamError[TeamError["MembersNotNormal"] = 25] = "MembersNotNormal";
    /** 距离过远，不能归队 */
    TeamError[TeamError["TooFar"] = 26] = "TooFar";
    /** 队伍没有暂离的队员 */
    TeamError[TeamError["NoAbsentMember"] = 27] = "NoAbsentMember";
    /** 拒绝成为队长 */
    TeamError[TeamError["RefuseChangeLeader"] = 28] = "RefuseChangeLeader";
    /** 对方不在队伍中 */
    TeamError[TeamError["ObjectNotInTeam"] = 29] = "ObjectNotInTeam";
    /** 对方已经在此队伍的申请列表中 */
    TeamError[TeamError["AlreadyApply"] = 30] = "AlreadyApply";
    /** 暂离队员不能成为队长 */
    TeamError[TeamError["AbsentCantBeLeader"] = 31] = "AbsentCantBeLeader";
    /** 等级设置错误 */
    TeamError[TeamError["LevelSetError"] = 32] = "LevelSetError";
    /** 等级不符合 */
    TeamError[TeamError["LevelError"] = 33] = "LevelError";
    /** 没有设置目标 */
    TeamError[TeamError["NoTarget"] = 34] = "NoTarget";
    /** 队伍已经组满 */
    TeamError[TeamError["TeamEnoughFull"] = 35] = "TeamEnoughFull";
    /** 已经在匹配中 */
    TeamError[TeamError["InMatching"] = 36] = "InMatching";
    /** 活动未开放 */
    TeamError[TeamError["ActiveNotOpen"] = 37] = "ActiveNotOpen";
    /** 没有工会 */
    TeamError[TeamError["NoFaction"] = 38] = "NoFaction";
    /** 组队状态客户端服务器不同步 */
    TeamError[TeamError["TeamStateError"] = 39] = "TeamStateError";
    /** 一键喊话不到时间 */
    TeamError[TeamError["OneKeyApplyTeamNoTime"] = 40] = "OneKeyApplyTeamNoTime";
    /** 不在队伍中不能ROLL点 */
    TeamError[TeamError["NoRollNotInTeam"] = 50] = "NoRollNotInTeam";
    /** 没有奖励可分配 */
    TeamError[TeamError["NoReward"] = 51] = "NoReward";
    /** 光环残卷不足 */
    TeamError[TeamError["FormBookHalfNotEnough"] = 55] = "FormBookHalfNotEnough";
    /** 无效的光环书 */
    TeamError[TeamError["UnKnuownFormBook"] = 56] = "UnKnuownFormBook";
    /** 光环等级已经最高了 */
    TeamError[TeamError["FromLevelMax"] = 57] = "FromLevelMax";
    /** 光环ID */
    TeamError[TeamError["FormIdError"] = 58] = "FormIdError";
    /** 光环书不足 */
    TeamError[TeamError["FormBookNotEnough"] = 59] = "FormBookNotEnough";
})(TeamError || (TeamError = {}));
/** 队伍状态 */
var TeamState;
(function (TeamState) {
    /** 正常状态 */
    TeamState[TeamState["eNormalTeam"] = 1] = "eNormalTeam";
    /** 等待中的队伍状态 */
    TeamState[TeamState["eWaitingSummonTeam"] = 2] = "eWaitingSummonTeam";
    /** 等待中的队伍状态 */
    TeamState[TeamState["eSummonTeam"] = 3] = "eSummonTeam";
})(TeamState || (TeamState = {}));
/** 队员状态 */
var TeamMemberState;
(function (TeamMemberState) {
    /** 正常状态 */
    TeamMemberState[TeamMemberState["eTeamNormal"] = 1] = "eTeamNormal";
    /** 暂离状态 */
    TeamMemberState[TeamMemberState["eTeamAbsent"] = 2] = "eTeamAbsent";
    /** 回归队伍状态 */
    TeamMemberState[TeamMemberState["eTeamReturn"] = 3] = "eTeamReturn";
    /** 离线状态 */
    TeamMemberState[TeamMemberState["eTeamFallline"] = 4] = "eTeamFallline";
})(TeamMemberState || (TeamMemberState = {}));
/** 队员申请 */
var TeamMemberApply;
(function (TeamMemberApply) {
    /** 回归 */
    TeamMemberApply[TeamMemberApply["CAME_BACK"] = 0] = "CAME_BACK";
    /** 暂离队伍 */
    TeamMemberApply[TeamMemberApply["LEAVE_SOON"] = 1] = "LEAVE_SOON";
})(TeamMemberApply || (TeamMemberApply = {}));
/** 伙伴类型 */
var huoBanType;
(function (huoBanType) {
    /** 物理型 */
    huoBanType[huoBanType["PHYSICAL_TYPE"] = 1] = "PHYSICAL_TYPE";
    /** 法术型 */
    huoBanType[huoBanType["SPELL_TYPE"] = 2] = "SPELL_TYPE";
    /** 治疗型 */
    huoBanType[huoBanType["THERAPEUTIC_TYPE"] = 3] = "THERAPEUTIC_TYPE";
    /** 辅助型 */
    huoBanType[huoBanType["AUXILIARY_TYPE"] = 4] = "AUXILIARY_TYPE";
    /** 控制型 */
    huoBanType[huoBanType["CONTROL_TYPE"] = 5] = "CONTROL_TYPE";
})(huoBanType || (huoBanType = {}));
/** 门派类型 */
(function (huoBanType) {
    /** 云霄殿 */
    huoBanType[huoBanType["YUN_XIAO"] = 11] = "YUN_XIAO";
    /** 火云岭 */
    huoBanType[huoBanType["HUO_YUN"] = 12] = "HUO_YUN";
    /** 苍羽宫 */
    huoBanType[huoBanType["CANG_YU"] = 13] = "CANG_YU";
    /** 飞雪崖 */
    huoBanType[huoBanType["FEI_XUE"] = 14] = "FEI_XUE";
    /** 天雷狱 */
    huoBanType[huoBanType["TIAN_LEI"] = 15] = "TIAN_LEI";
    /** 无量宫 */
    huoBanType[huoBanType["WU_LIANG"] = 16] = "WU_LIANG";
    /** 幽冥池 */
    huoBanType[huoBanType["YOU_MIN"] = 17] = "YOU_MIN";
    /** 七星观 */
    huoBanType[huoBanType["QI_XING"] = 18] = "QI_XING";
    /** 丹阳官 */
    huoBanType[huoBanType["DAN_YANG"] = 19] = "DAN_YANG";
})(huoBanType || (huoBanType = {}));
/** 类型匹配 */
var TypeMatch;
(function (TypeMatch) {
    /** 个人组队匹配 */
    TypeMatch[TypeMatch["PERSONEL_MATCH"] = 0] = "PERSONEL_MATCH";
    /** 队伍匹配 */
    TypeMatch[TypeMatch["TEAM_MATCH"] = 1] = "TEAM_MATCH";
    /** 只设置队伍目标 */
    TypeMatch[TypeMatch["SET_TARGET"] = 3] = "SET_TARGET";
})(TypeMatch || (TypeMatch = {}));
/** 频道类型 */
var ChannelType;
(function (ChannelType) {
    /** 当前频道 */
    ChannelType[ChannelType["CURRENR_CHANNEL"] = 1] = "CURRENR_CHANNEL";
    /** 帮派频道 */
    ChannelType[ChannelType["FAMILY_CHANNEL"] = 4] = "FAMILY_CHANNEL";
    /** 世界频道 */
    ChannelType[ChannelType["WORLD_CHANNEL"] = 5] = "WORLD_CHANNEL";
    /** 组队申请 */
    ChannelType[ChannelType["TEAM_APPLY"] = 14] = "TEAM_APPLY";
})(ChannelType || (ChannelType = {}));
/** 邀请类型 */
var InviteType;
(function (InviteType) {
    /** 正常邀请 */
    InviteType[InviteType["NORMAL_INVITE"] = 0] = "NORMAL_INVITE";
    /** 强制邀请 */
    InviteType[InviteType["FORCE_INVITE"] = 1] = "FORCE_INVITE";
    /** 邀请好友 */
    InviteType[InviteType["INVITE_FRIEND"] = 2] = "INVITE_FRIEND";
    /** 邀请帮派成员 */
    InviteType[InviteType["INVITE_FAMILY"] = 3] = "INVITE_FAMILY";
})(InviteType || (InviteType = {}));
/** 响应申请入队 */
var ResponseApplicationTeam;
(function (ResponseApplicationTeam) {
    /** 拒绝响应 */
    ResponseApplicationTeam[ResponseApplicationTeam["REJECT_TEAM"] = 0] = "REJECT_TEAM";
    /**同意响应 */
    ResponseApplicationTeam[ResponseApplicationTeam["AGREEE_TEAM"] = 1] = "AGREEE_TEAM";
})(ResponseApplicationTeam || (ResponseApplicationTeam = {}));
/** 红点显示或隐藏 */
var TeamRedDot;
(function (TeamRedDot) {
    /** 显示红点 */
    TeamRedDot[TeamRedDot["SHOW_TEAM_REDDOT"] = 1] = "SHOW_TEAM_REDDOT";
    /** 隐藏红点 */
    TeamRedDot[TeamRedDot["HIDE_TEAM_REDDOT"] = 2] = "HIDE_TEAM_REDDOT";
})(TeamRedDot || (TeamRedDot = {}));
var game;
(function (game) {
    var modules;
    (function (modules) {
        var team;
        (function (team) {
            var models;
            (function (models) {
                var TeamModel = /** @class */ (function () {
                    function TeamModel() {
                        /** 简单的队伍队员数据结构 */
                        this.TeamMemberSimple = [];
                        /** 门派图标 */
                        this.school = ["zs.png", "qs.png", "lr.png", "dly.png", "fs.png", "ms.png", "sm.png", "dz.png", "ss.png"];
                        /** 最小的门派编号 */
                        this.schoolNumberLimitMin = 11;
                        /** 最大的门派编号 */
                        this.schoolNumberLimitMax = 19;
                        /** 取消或者匹配的Flag */
                        this.matchFlag = false;
                        /** 点击交换位置的 */
                        this.swapPosIndex = -1;
                        /** 队伍副本配置表 */
                        this.teamListConfig = {};
                        /** 创建队伍返回数据 */
                        this.screateTeam = {};
                        /** 邀请 其他好友接收的数据 */
                        this.friendsReceiveData = {};
                        /** 现有队伍的角色 */
                        this.nowTeamMember = [];
                        /** 队伍角色信息存储 */
                        this.TeamRoleInfoStorage = [];
                        // /** 存储组队喊话之后点击的队伍信息 */
                        // public oneKeyTeamnfo:
                        /** 特殊副本结算奖励信息 */
                        this.melonlist = [];
                        /** 阵法数据 */
                        this.setTeamFormationVo = new models.SetTeamFormationVo();
                        TeamModel._instance = this;
                        this.matchTeam = new models.RequestTeamMatchVo();
                        this.teamMemberBasic = new Laya.Dictionary();
                        this.applyList = new Laya.Dictionary();
                        this.roleEquipData = new models.SGetRoleEquipVo();
                        this.SRequestTeamMatchList = new Laya.Dictionary();
                        this.updateMemberState = new Laya.Dictionary();
                        this.updateMemberState_Del = new Laya.Dictionary();
                    }
                    TeamModel.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new TeamModel();
                        }
                        return this._instance;
                    };
                    TeamModel.clearModelData = function () {
                        team.models.TeamModel._instance.matchTeam = new models.RequestTeamMatchVo();
                        team.models.TeamModel._instance.teamMemberBasic = new Laya.Dictionary();
                        team.models.TeamModel._instance.applyList = new Laya.Dictionary();
                        team.models.TeamModel._instance.roleEquipData = new models.SGetRoleEquipVo();
                        team.models.TeamModel._instance.SRequestTeamMatchList = new Laya.Dictionary();
                        team.models.TeamModel._instance.updateMemberState = new Laya.Dictionary();
                        team.models.TeamModel._instance.updateMemberState_Del = new Laya.Dictionary();
                        team.models.TeamModel._instance.matchFlag = false;
                        team.models.TeamModel._instance.swapPosIndex = -1;
                        team.models.TeamModel._instance.currMatchTarget = "";
                        team.models.TeamModel._instance.nowTeamMember = [];
                        team.models.TeamModel._instance.TeamRoleInfoStorage = [];
                        team.models.TeamModel._instance.melonlist = [];
                        team.models.TeamModel._instance.watcher = 0;
                        team.models.TeamModel._instance.setTeamFormationVo = new models.SetTeamFormationVo();
                    };
                    /** 获取职业图标
                     * @param school 职业
                     */
                    TeamModel.prototype.getSchoolImgBack = function (school) {
                        if (school < this.schoolNumberLimitMin || school > this.schoolNumberLimitMax)
                            return null;
                        var url = "";
                        url = "ui/huoban/" + this.school[school - this.schoolNumberLimitMin];
                        return url;
                    };
                    /** 组队提示语句
                     * @param type 提示Id
                    */
                    TeamModel.prototype.getTipsPromoto = function (type) {
                        var promoto = "";
                        switch (type) {
                            case TeamError.UnkownError:
                                promoto = "<span style='color:#f6f6f4;fontSize:24'>未知错误</span>";
                                break;
                            case TeamError.SelfInTeam:
                                promoto = "<span style='color:#f6f6f4;fontSize:24'>自己已经在队伍中</span>";
                                break;
                            case TeamError.SelfNotInTeam:
                                promoto = "<span style='color:#f6f6f4;fontSize:24'>自己不在队伍中</span>";
                                break;
                            case TeamError.ObjectInTeam:
                                promoto = "<span style='color:#f6f6f4;fontSize:24'>对方已经在队伍中</span>";
                                break;
                            case TeamError.SelfNOtLeader:
                                promoto = "<span style='color:#f6f6f4;fontSize:24'>自己不是队长</span>";
                                break;
                            case TeamError.ObjectNotLeader:
                                promoto = "<span style='color:#f6f6f4;fontSize:24'>对方不是队长</span>";
                                break;
                            case TeamError.ObjectOffline:
                                promoto = "<span style='color:#f6f6f4;fontSize:24'>对方不在线（有统一的Error吗）</span>";
                                break;
                            case TeamError.SelfTeamFunctionClose:
                                promoto = "<span style='color:#f6f6f4;fontSize:24'>自己组队开关关闭</span>";
                                break;
                            case TeamError.ObjectTeamFunctionClose:
                                promoto = "<span style='color:#f6f6f4;fontSize:24'>对方组队开关关闭</span>";
                                break;
                            case TeamError.SelfInUnteamState:
                                promoto = "<span style='color:#f6f6f4;fontSize:24'>自己在不可组队状态</span>";
                                break;
                            case TeamError.ObjectInUnteamState:
                                promoto = "<span style='color:#f6f6f4;fontSize:24'>对方在不可组队状态</span>";
                                break;
                            case TeamError.TeamFull:
                                promoto = "<span style='color:#f6f6f4;fontSize:24'>队伍人数已满</span>";
                                break;
                            case TeamError.InvitedInTeam:
                                promoto = "<span style='color:#f6f6f4;fontSize:24'>对方已经在队伍中</span>";
                                break;
                            case TeamError.BeingInvited:
                                promoto = "<span style='color:#f6f6f4;fontSize:24'>对方正在被其他人邀请中</span>";
                                break;
                            case TeamError.InvitedIn30s:
                                promoto = "<span style='color:#f6f6f4;fontSize:24'>30秒内只能邀请一次同一玩家</span>";
                                break;
                            case TeamError.InviteingsFull:
                                promoto = "<span style='color:#f6f6f4;fontSize:24'>正在邀请人数达到4个，不能再邀请更多</span>";
                                break;
                            case TeamError.InviterTeamNotExist:
                                promoto = "<span style='color:#f6f6f4;fontSize:24'>邀请您的队伍已经解散</span>";
                                break;
                            case TeamError.InviterNotLeader:
                                promoto = "<span style='color:#f6f6f4;fontSize:24'>邀请者不是队长</span>";
                                break;
                            case TeamError.ApplierInTeam:
                                promoto = "<span style='color:#f6f6f4;fontSize:24'>申请者已经在队伍中</span>";
                                break;
                            case TeamError.ApplyTimeout:
                                promoto = "<span style='color:#f6f6f4;fontSize:24'>该申请已经超时</span>";
                                break;
                            case TeamError.ApplyListFull:
                                promoto = "<span style='color:#f6f6f4;fontSize:24'>队伍申请列表已满</span>";
                                break;
                            case TeamError.ApplierLevelValid:
                                promoto = "<span style='color:#f6f6f4;fontSize:24'>申请者级别不符合队伍要求</span>";
                                break;
                            case TeamError.ChangeLeaderUnable:
                                promoto = "<span style='color:#f6f6f4;fontSize:24'>队伍处在不可以换队长的状态</span>";
                                break;
                            case TeamError.InChangeLeaderStatus:
                                promoto = "<span style='color:#f6f6f4;fontSize:24'>已经提出更换队长，等待回应中</span>";
                                break;
                            case TeamError.ChangeLeaderInCD:
                                promoto = "<span style='color:#f6f6f4;fontSize:24'>队伍2分钟只能更换队长一次</span>";
                                break;
                            case TeamError.MembersNotNormal:
                                promoto = "<span style='color:#f6f6f4;fontSize:24'>队员不处于正常状态</span>";
                                break;
                            case TeamError.TooFar:
                                promoto = "<span style='color:#f6f6f4;fontSize:24'>距离过远，不能归队</span>";
                                break;
                            case TeamError.NoAbsentMember:
                                promoto = "<span style='color:#f6f6f4;fontSize:24'>队伍没有暂离的队员</span>";
                                break;
                            case TeamError.RefuseChangeLeader:
                                promoto = "<span style='color:#f6f6f4;fontSize:24'>拒绝成为队长</span>";
                                break;
                            case TeamError.ObjectNotInTeam:
                                promoto = "<span style='color:#f6f6f4;fontSize:24'>对方不在队伍中</span>";
                                break;
                            case TeamError.AlreadyApply:
                                promoto = "<span style='color:#f6f6f4;fontSize:24'>对方已经在此队伍的申请列表中</span>";
                                break;
                            case TeamError.AbsentCantBeLeader:
                                promoto = "<span style='color:#f6f6f4;fontSize:24'>暂离队员不能成为队长</span>";
                                break;
                            case TeamError.LevelSetError:
                                promoto = "<span style='color:#f6f6f4;fontSize:24'>等级设置错误</span>";
                                break;
                            case TeamError.LevelError:
                                promoto = "<span style='color:#f6f6f4;fontSize:24'>等级不符合</span>";
                                break;
                            case TeamError.NoTarget:
                                promoto = "<span style='color:#f6f6f4;fontSize:24'>没有设置目标</span>";
                                break;
                            case TeamError.TeamEnoughFull:
                                promoto = "<span style='color:#f6f6f4;fontSize:24'>队伍已经组满</span>";
                                break;
                            case TeamError.InMatching:
                                promoto = "<span style='color:#f6f6f4;fontSize:24'>已经在匹配中</span>";
                                break;
                            case TeamError.ActiveNotOpen:
                                promoto = "<span style='color:#f6f6f4;fontSize:24'>活动未开放</span>";
                                break;
                            case TeamError.NoFaction:
                                promoto = "<span style='color:#f6f6f4;fontSize:24'>没有工会</span>";
                                break;
                            case TeamError.TeamStateError:
                                promoto = "<span style='color:#f6f6f4;fontSize:24'>组队状态客户端服务器不同步</span>";
                                break;
                            case TeamError.OneKeyApplyTeamNoTime:
                                promoto = "<span style='color:#f6f6f4;fontSize:24'>一键喊话不到时间</span>";
                                break;
                            case TeamError.NoRollNotInTeam:
                                promoto = "<span style='color:#f6f6f4;fontSize:24'>不在队伍中不能ROLL点</span>";
                                break;
                            case TeamError.NoReward:
                                promoto = "<span style='color:#f6f6f4;fontSize:24'>没有奖励可分配</span>";
                                break;
                            case TeamError.FormBookHalfNotEnough:
                                promoto = "<span style='color:#f6f6f4;fontSize:24'>光环残卷不足</span>";
                                break;
                            case TeamError.UnKnuownFormBook:
                                promoto = "<span style='color:#f6f6f4;fontSize:24'>无效的光环书</span>";
                                break;
                            case TeamError.FromLevelMax:
                                promoto = "<span style='color:#f6f6f4;fontSize:24'>光环等级已经最高了</span>";
                                break;
                            case TeamError.FormIdError:
                                promoto = "<span style='color:#f6f6f4;fontSize:24'>光环ID</span>";
                                break;
                            case TeamError.FormBookNotEnough:
                                promoto = "<span style='color:#f6f6f4;fontSize:24'>光环书不足</span>";
                                break;
                            default:
                                break;
                        }
                        return promoto;
                    };
                    return TeamModel;
                }());
                models.TeamModel = TeamModel;
            })(models = team.models || (team.models = {}));
        })(team = modules.team || (modules.team = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=TeamModel.js.map