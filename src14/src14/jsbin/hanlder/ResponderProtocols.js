/**
* name
*/
var hanlder;
(function (hanlder) {
    var ResponderProtocols = /** @class */ (function () {
        function ResponderProtocols() {
            ResponderProtocols._instance = this;
        }
        ResponderProtocols.getInstance = function () {
            if (!this._instance) {
                this._instance = new ResponderProtocols();
            }
            return this._instance;
        };
        ResponderProtocols.prototype.readPacket = function (optcode, bs) {
            console.log("readPacket:", optcode, bs);
            //console.log("readPacket:", optcode);
            switch (optcode) {
                case hanlder.ProtocolsEnum.SCreateRole: //创建角色返回
                    var obj_create_role_action = new S2C_create_role();
                    S2C_create_role.read(obj_create_role_action, bs);
                    return obj_create_role_action;
                case hanlder.ProtocolsEnum.ErrorInfo: //登录错误信息返回
                    var obj_error_info_action = new S2C_error_info();
                    S2C_error_info.read(obj_error_info_action, bs);
                    return obj_error_info_action;
                case hanlder.ProtocolsEnum.SOnlineAnnounce: //登录返回
                    var obj_online_announce_action = new S2C_Online_Announce();
                    S2C_Online_Announce.read(obj_online_announce_action, bs);
                    return obj_create_role_action;
                case hanlder.ProtocolsEnum.SRoleList: // 返回角色列表
                    var obj_SRoleList = new S2C_SRoleList();
                    S2C_SRoleList.read(obj_SRoleList, bs);
                    return obj_SRoleList;
                case hanlder.ProtocolsEnum.SEnterWorld: // 进入游戏返回
                    var obj_SEnterWorld = new S2C_SEnterWorld();
                    S2C_SEnterWorld.read(obj_SEnterWorld, bs);
                    return obj_SEnterWorld;
                case hanlder.ProtocolsEnum.SSendRoundScript: //服务器向客户端发送剧本
                    var obj_SSendRoundScript = new S2C_SSendRoundScript();
                    S2C_SSendRoundScript.read(obj_SSendRoundScript, bs);
                    return obj_SSendRoundScript;
                case hanlder.ProtocolsEnum.SRefreshRoleScore: //刷新人物评分的消息
                    var obj_SRefreshRoleScore = new s2c_SRefreshRoleScore();
                    s2c_SRefreshRoleScore.read(obj_SRefreshRoleScore, bs);
                    return obj_SRefreshRoleScore;
                //txx
                case hanlder.ProtocolsEnum.SRefreshRoleData: //刷新人物属性的消息
                    var obj_SRefreshRoleData = new s2c_SRefreshRoleData();
                    s2c_SRefreshRoleData.read(obj_SRefreshRoleData, bs);
                    return obj_SRefreshRoleData;
                case hanlder.ProtocolsEnum.SRefreshRoleCurrency: //刷新人物通货的消息
                    var obj_SRefreshRoleCurrency = new s2c_SRefreshRoleCurrency();
                    s2c_SRefreshRoleCurrency.read(obj_SRefreshRoleCurrency, bs);
                    return obj_SRefreshRoleCurrency;
                case hanlder.ProtocolsEnum.SRefreshPointType: //刷新人物加点后的加点面板数值
                    var obj_SRefreshPointType = new s2c_SRefreshPointType();
                    s2c_SRefreshPointType.read(obj_SRefreshPointType, bs);
                    return obj_SRefreshPointType;
                case hanlder.ProtocolsEnum.SRefreshCurrency: //S2C_SRefresh_Currency
                    var obj_SRefresh_Currency_action = new S2C_SRefresh_Currency();
                    S2C_SRefresh_Currency.read(obj_SRefresh_Currency_action, bs);
                    return obj_SRefresh_Currency_action;
                case hanlder.ProtocolsEnum.SSendInborns:
                    var obj_send_inborns_action = new S2C_send_inborns();
                    S2C_send_inborns.read(obj_send_inborns_action, bs);
                    return obj_send_inborns_action;
                case hanlder.ProtocolsEnum.SRspRoleInfo: //人物信息界面回复
                    var obj_SRspRoleInfo = new S2C_SRspRoleInfo();
                    S2C_SRspRoleInfo.read(obj_SRspRoleInfo, bs);
                    return obj_SRspRoleInfo;
                case hanlder.ProtocolsEnum.SBeginSchoolWheel: //<!-- -->
                    var obj_SBeginSchoolWheel_action = new S2C_SBeginSchoolWheel();
                    S2C_SBeginSchoolWheel.read(obj_SBeginSchoolWheel_action, bs);
                    return obj_SBeginSchoolWheel_action;
                case hanlder.ProtocolsEnum.SUpdateInborn:
                    var obj_update_inborn_action = new S2C_update_inborn();
                    S2C_update_inborn.read(obj_update_inborn_action, bs);
                    return obj_update_inborn_action;
                case hanlder.ProtocolsEnum.SUpdateLearnLiveSkill:
                    var obj_update_learnliveskill_action = new S2C_update_learnliveskill();
                    S2C_update_learnliveskill.read(obj_update_learnliveskill_action, bs);
                    return obj_update_learnliveskill_action;
                case hanlder.ProtocolsEnum.SRequestParticleSkillList:
                    var obj_request_particleskilllist_action = new S2C_request_particleskilllist();
                    S2C_request_particleskilllist.read(obj_request_particleskilllist_action, bs);
                    return obj_request_particleskilllist_action;
                case hanlder.ProtocolsEnum.SUpdateLearnParticleSkill:
                    var obj_update_learnparticleskill_action = new S2C_update_learnparticleskill();
                    S2C_update_learnparticleskill.read(obj_update_learnparticleskill_action, bs);
                    return obj_update_learnparticleskill_action;
                case hanlder.ProtocolsEnum.SLiveSkillMakeFood:
                    var obj_live_skillsakefood_action = new S2C_live_skillsakefood();
                    S2C_live_skillsakefood.read(obj_live_skillsakefood_action, bs);
                    return obj_live_skillsakefood_action;
                case hanlder.ProtocolsEnum.SLiveSkillMakeStuff:
                    var obj_live_skillmakestuff_action = new S2C_live_skillmakestuff();
                    S2C_live_skillmakestuff.read(obj_live_skillmakestuff_action, bs);
                    return obj_live_skillmakestuff_action;
                case hanlder.ProtocolsEnum.SLiveSkillMakeCard:
                    var obj_live_skillmakecard_action = new S2C_live_skillmakecard();
                    S2C_live_skillmakecard.read(obj_live_skillmakecard_action, bs);
                    return obj_live_skillmakecard_action;
                case hanlder.ProtocolsEnum.SLiveSkillMakeDrug:
                    var obj_live_skillmakedrug_action = new S2C_live_skillmakedrug();
                    S2C_live_skillmakedrug.read(obj_live_skillmakedrug_action, bs);
                    return obj_live_skillmakedrug_action;
                case hanlder.ProtocolsEnum.SSendSystemMessageToRole: // 聊天S-->C
                    var obj_SSendSystemMessageToRole_action = new S2C_SSendSystemMessageToRole();
                    S2C_SSendSystemMessageToRole.read(obj_SSendSystemMessageToRole_action, bs);
                    return obj_SSendSystemMessageToRole_action;
                case hanlder.ProtocolsEnum.SRecommendFriend: //服务器返回推荐好友
                    var obj_SRecommendFriend_action = new S2C_SRecommendFriend();
                    S2C_SRecommendFriend.read(obj_SRecommendFriend_action, bs);
                    return obj_SRecommendFriend_action;
                case hanlder.ProtocolsEnum.SSearchFriend: //搜索好友成功S->C
                    var obj_SSearchFriend_action = new S2C_SSearchFriend();
                    S2C_SSearchFriend.read(obj_SSearchFriend_action, bs);
                    return obj_SSearchFriend_action;
                case hanlder.ProtocolsEnum.SAddFriend:
                    var obj_SAddFriend_action = new S2C_SAddFriend();
                    S2C_SAddFriend.read(obj_SAddFriend_action, bs);
                    return obj_SAddFriend_action;
                case hanlder.ProtocolsEnum.SStrangerMessageToRole:
                    var obj_SStrangerMessageToRole_action = new S2C_SStrangerMessageToRole();
                    S2C_SStrangerMessageToRole.read(obj_SStrangerMessageToRole_action, bs);
                    return obj_SStrangerMessageToRole_action;
                case hanlder.ProtocolsEnum.SFriendsInfoInit:
                    var obj_SFriendsInfoInit_action = new S2C_SFriendsInfoInit();
                    S2C_SFriendsInfoInit.read(obj_SFriendsInfoInit_action, bs);
                    return obj_SFriendsInfoInit_action;
                case hanlder.ProtocolsEnum.SSearchBlackRoleInfo:
                    var obj_search_blackroleinfo_action = new S2C_search_blackroleinfo();
                    S2C_search_blackroleinfo.read(obj_search_blackroleinfo_action, bs);
                    return obj_search_blackroleinfo_action;
                case hanlder.ProtocolsEnum.SBlackRoles:
                    var obj_black_roles_action = new S2C_black_roles();
                    S2C_black_roles.read(obj_black_roles_action, bs);
                    return obj_black_roles_action;
                case hanlder.ProtocolsEnum.SFriendMessageToRole:
                    var obj_SFriendMessageToRole_action = new S2C_SFriendMessageToRole();
                    S2C_SFriendMessageToRole.read(obj_SFriendMessageToRole_action, bs);
                    return obj_SFriendMessageToRole_action;
                case hanlder.ProtocolsEnum.SOffLineMsgMessageToRole:
                    var obj_SOffLineMsgMessageToRole_action = new S2C_SOffLineMsgMessageToRole();
                    S2C_SOffLineMsgMessageToRole.read(obj_SOffLineMsgMessageToRole_action, bs);
                    return obj_SOffLineMsgMessageToRole_action;
                case hanlder.ProtocolsEnum.SRspServerId: //<!-- -->
                    var obj_SRspServerId_action = new S2C_SRspServerId();
                    S2C_SRspServerId.read(obj_SRspServerId_action, bs);
                    return obj_SRspServerId_action;
                case hanlder.ProtocolsEnum.SReqRecruitWheel: //<!-- 请求招募大转盘信息结果 -->
                    var obj_req_recruitwheel_action = new S2C_req_recruitwheel();
                    S2C_req_recruitwheel.read(obj_req_recruitwheel_action, bs);
                    return obj_req_recruitwheel_action;
                case hanlder.ProtocolsEnum.SReqFortuneWheel:
                    var obj_req_fortune_wheel_action = new s2c_req_fortune_wheel();
                    s2c_req_fortune_wheel.read(obj_req_fortune_wheel_action, bs);
                    return obj_req_fortune_wheel_action;
                case hanlder.ProtocolsEnum.SMailInfo: //S2C_SMail_Info
                    var obj_SMail_Info_action = new S2C_SMail_Info();
                    S2C_SMail_Info.read(obj_SMail_Info_action, bs);
                    return obj_SMail_Info_action;
                case hanlder.ProtocolsEnum.SMailState: //S2C_SMail_State
                    var obj_SMail_State_action = new S2C_SMail_State();
                    S2C_SMail_State.read(obj_SMail_State_action, bs);
                    return obj_SMail_State_action;
                case hanlder.ProtocolsEnum.SMailList: //S2C_SMail_List
                    var obj_SMail_List_action = new S2C_SMail_List();
                    S2C_SMail_List.read(obj_SMail_List_action, bs);
                    return obj_SMail_List_action;
                case hanlder.ProtocolsEnum.SGiveGift: //<!-- 赠送礼物结果 -->
                    var obj_givegift_action = new S2C_give_gift();
                    S2C_give_gift.read(obj_givegift_action, bs);
                    return obj_givegift_action;
                case hanlder.ProtocolsEnum.SUpdateFriendLevel:
                    var obj_SUpdateFriendLevel_action = new S2C_SUpdateFriendLevel();
                    S2C_SUpdateFriendLevel.read(obj_SUpdateFriendLevel_action, bs);
                    return obj_SUpdateFriendLevel_action;
                case hanlder.ProtocolsEnum.SGiveItem: //<!-- 赠送道具结果 -->
                    var obj_giveitem_action = new S2C_give_item();
                    S2C_give_item.read(obj_giveitem_action, bs);
                    return obj_giveitem_action;
                case hanlder.ProtocolsEnum.SBreakOffRelation:
                    var obj_SBreakOffRelation_action = new S2C_SBreakOffRelation();
                    S2C_SBreakOffRelation.read(obj_SBreakOffRelation_action, bs);
                    return obj_SBreakOffRelation_action;
                case hanlder.ProtocolsEnum.SAnswerRoleTeamState: //返回玩家请求的其他玩家的组队情况
                    var obj_SAnswerRoleTeamState = new S2C_SAnswerRoleTeamState();
                    S2C_SAnswerRoleTeamState.read(obj_SAnswerRoleTeamState, bs);
                    return obj_SAnswerRoleTeamState;
                case hanlder.ProtocolsEnum.SRoleAccusationCheck: //<!-- -->
                    var obj_SRoleAccusationCheck_action = new S2C_SRoleAccusationCheck();
                    S2C_SRoleAccusationCheck.read(obj_SRoleAccusationCheck_action, bs);
                    return obj_SRoleAccusationCheck_action;
                case hanlder.ProtocolsEnum.SRequestUpdateRoleInfo:
                    var obj_SRequestUpdateRoleInfo_action = new S2C_SRequestUpdateRoleInfo();
                    S2C_SRequestUpdateRoleInfo.read(obj_SRequestUpdateRoleInfo_action, bs);
                    return obj_SRequestUpdateRoleInfo_action;
                case hanlder.ProtocolsEnum.SRefreshUserExp: // 通知客户端刷新人物经验
                    var obj_SRefreshUserExp = new S2C_SRefreshUserExp();
                    S2C_SRefreshUserExp.read(obj_SRefreshUserExp, bs);
                    return obj_SRefreshUserExp;
                case hanlder.ProtocolsEnum.SRequestLiveSkillList:
                    var obj_request_liveskilllist_action = new S2C_request_liveskilllist();
                    S2C_request_liveskilllist.read(obj_request_liveskilllist_action, bs);
                    return obj_request_liveskilllist_action;
                case hanlder.ProtocolsEnum.SLiveSkillMakeFarm:
                    var obj_live_skillmakefarm_action = new S2C_live_skillmakefarm();
                    S2C_live_skillmakefarm.read(obj_live_skillmakefarm_action, bs);
                    return obj_live_skillmakefarm_action;
                case hanlder.ProtocolsEnum.SLiveSkillMakeEnhancement:
                    var obj_live_skillmakeenhancement_action = new S2C_live_skillmakeenhancement();
                    S2C_live_skillmakeenhancement.read(obj_live_skillmakeenhancement_action, bs);
                    return obj_live_skillmakeenhancement_action;
                case hanlder.ProtocolsEnum.SReqHelpCountView: //
                    var obj_SReqHelpCountView = new S2C_SReqHelpCountView();
                    S2C_SReqHelpCountView.read(obj_SReqHelpCountView, bs);
                    return obj_SReqHelpCountView;
                case hanlder.ProtocolsEnum.SSendHelpSW: //援助声望当前值
                    var obj_SSendHelpSW = new S2C_SSendHelpSW();
                    S2C_SSendHelpSW.read(obj_SSendHelpSW, bs);
                    return obj_SSendHelpSW;
                case hanlder.ProtocolsEnum.SServerLevel: //
                    var obj_SServerLevel = new S2C_SServerLevel();
                    S2C_SServerLevel.read(obj_SServerLevel, bs);
                    return obj_SServerLevel;
                case hanlder.ProtocolsEnum.SReqPointSchemeTime: //返回人物切换加点方案次数
                    var obj_SReqPointSchemeTime = new S2C_SReqPointSchemeTime();
                    S2C_SReqPointSchemeTime.read(obj_SReqPointSchemeTime, bs);
                    return obj_SReqPointSchemeTime;
                case hanlder.ProtocolsEnum.SExpMessageTips:
                    var obj_exp_messagetips_action = new S2C_exp_messagetips();
                    S2C_exp_messagetips.read(obj_exp_messagetips_action, bs);
                    return obj_exp_messagetips_action;
                case hanlder.ProtocolsEnum.SQueryRegData: //每日签到奖励
                    var obj_queryregdata = new s2c_SQueryRegData();
                    s2c_SQueryRegData.read(obj_queryregdata, bs);
                    return obj_queryregdata;
                /*case ProtocolsEnum.SQueryFestivalData://节日签到数据
                    var obj_queryfestivaldata: s2c_QueryFestivalData = new s2c_QueryFestivalData();
                    s2c_QueryFestivalData.read(obj_queryfestivaldata, bs);
                    return obj_queryfestivaldata;
                case ProtocolsEnum.SQueryJRAwardData://请求节日活跃度奖励表数据
                    var obj_QueryJRAwardData: s2c_QueryJRAwardData = new s2c_QueryJRAwardData();
                    s2c_QueryJRAwardData.read(obj_QueryJRAwardData, bs);
                    return obj_QueryJRAwardData;
                case ProtocolsEnum.SQueryChargeAwardCountData://请求累计充值奖励表数据
                    var obj_QueryChargeAwardCountData: s2c_QueryChargeAwardCountData = new s2c_QueryChargeAwardCountData();
                    s2c_QueryChargeAwardCountData.read(obj_QueryChargeAwardCountData, bs);
                    return obj_QueryChargeAwardCountData;
                case ProtocolsEnum.SQueryHydScoreData://请求节日积分奖励表数据
                    var obj_QueryHydScoreData: s2c_QueryHydScoreData = new s2c_QueryHydScoreData();
                    s2c_QueryHydScoreData.read(obj_QueryHydScoreData, bs);
                    return obj_QueryHydScoreData;
                case ProtocolsEnum.SQQExchangeCodeStatus://服务端发送QQ会员兑换码状态
                    var obj_QQExchangeCodeStatus: s2c_QQExchangeCodeStatus = new s2c_QQExchangeCodeStatus();
                    s2c_QQExchangeCodeStatus.read(obj_QQExchangeCodeStatus, bs);
                    return obj_QQExchangeCodeStatus;
                case ProtocolsEnum.SExchangeCode://服务端返回兑换成功标志
                    var obj_SExchangeCode: s2c_SExchangeCode = new s2c_SExchangeCode();
                    s2c_SExchangeCode.read(obj_SExchangeCode, bs);
                    return obj_SExchangeCode;
                case ProtocolsEnum.SXMRNPCView://请求熊猫人界面
                    var obj_SXMRNPCView: s2c_SXMRNPCView = new s2c_SXMRNPCView();
                    s2c_SXMRNPCView.read(obj_SXMRNPCView, bs);
                    return obj_SXMRNPCView;
                case ProtocolsEnum.SXMRBossNPCView://请求熊猫人boss界面
                    var obj_SXMRBossNPCView: s2c_SXMRBossNPCView = new s2c_SXMRBossNPCView();
                    s2c_SXMRBossNPCView.read(obj_SXMRBossNPCView, bs);
                    return obj_SXMRBossNPCView;
                case ProtocolsEnum.SXMRGiveRose://点赞
                    var obj_SXMRGiveRose: s2c_SXMRGiveRose = new s2c_SXMRGiveRose();
                    s2c_SXMRGiveRose.read(obj_SXMRGiveRose, bs);
                    return obj_SXMRGiveRose;*/
                // case ProtocolsEnum.SRefreshRoleData://刷新人物属性的消息
                // 	var obj_SRefreshRoleData: s2c_SRefreshRoleData = new s2c_SRefreshRoleData();
                // 	s2c_SRefreshRoleData.read(obj_SRefreshRoleData, bs);
                // 	return obj_SRefreshRoleData;
                case hanlder.ProtocolsEnum.SRefreshPetData: //刷新宠物属性的消息
                    var obj_SRefreshPetData = new s2c_SRefreshPetData();
                    s2c_SRefreshPetData.read(obj_SRefreshPetData, bs);
                    return obj_SRefreshPetData;
                case hanlder.ProtocolsEnum.SRefreshPointType: //刷新人物加点后的加点面板数值
                    var obj_SRefreshPointType = new s2c_SRefreshPointType();
                    s2c_SRefreshPointType.read(obj_SRefreshPointType, bs);
                    return obj_SRefreshPointType;
                case hanlder.ProtocolsEnum.SRefreshRoleCurrency: //刷新人物通货的消息
                    var obj_SRefreshRoleCurrency = new s2c_SRefreshRoleCurrency();
                    s2c_SRefreshRoleCurrency.read(obj_SRefreshRoleCurrency, bs);
                    return obj_SRefreshRoleCurrency;
                case hanlder.ProtocolsEnum.SApplyYingFuExprience: //服务器回复角色盈福经验
                    var obj_SApplyYingFuExprience = new s2c_SApplyYingFuExprience();
                    s2c_SApplyYingFuExprience.read(obj_SApplyYingFuExprience, bs);
                    return obj_SApplyYingFuExprience;
                case hanlder.ProtocolsEnum.SSendBattleStart: //服务器向客户端发送战斗信息
                    var obj_SSendBattleStart = new s2c_SSendBattleStart();
                    s2c_SSendBattleStart.read(obj_SSendBattleStart, bs);
                    return obj_SSendBattleStart;
                case hanlder.ProtocolsEnum.SSendAddFighters: //服务器向客户端发送战斗信息
                    var obj_SSendAddFighters = new s2c_SSendAddFighters();
                    s2c_SSendAddFighters.read(obj_SSendAddFighters, bs);
                    return obj_SSendAddFighters;
                case hanlder.ProtocolsEnum.SSendRoundStart: //服务器向客户端发送 开始回合操作选择
                    var obj_SSendRoundStart = new s2c_SSendRoundStart();
                    s2c_SSendRoundStart.read(obj_SSendRoundStart, bs);
                    return obj_SSendRoundStart;
                case hanlder.ProtocolsEnum.SSendBattleEnd: //服务器向客户端发送结束战斗消息
                    var obj_SSendBattleEnd = new s2c_SSendBattleEnd();
                    s2c_SSendBattleEnd.read(obj_SSendBattleEnd, bs);
                    return obj_SSendBattleEnd;
                case hanlder.ProtocolsEnum.SRemoveWatcher: //退出观战的fighter
                    var obj_SRemoveWatcher = new s2c_SRemoveWatcher();
                    s2c_SRemoveWatcher.read(obj_SRemoveWatcher, bs);
                    return obj_SRemoveWatcher;
                case hanlder.ProtocolsEnum.SSendWatchBattleStart: //服务器向客户端发送观战开始信息
                    var obj_SSendWatchBattleStart = new s2c_SSendWatchBattleStart();
                    s2c_SSendWatchBattleStart.read(obj_SSendWatchBattleStart, bs);
                    return obj_SSendWatchBattleStart;
                case hanlder.ProtocolsEnum.SSendBattlerOperateState: //发送人物操作状态（准备中，请等待，掉线）
                    var obj_SSendBattlerOperateState = new s2c_SSendBattlerOperateState();
                    s2c_SSendBattlerOperateState.read(obj_SSendBattlerOperateState, bs);
                    return obj_SSendBattlerOperateState;
                case hanlder.ProtocolsEnum.SSendRoleInitAttrs: //服务器发给客户端，进战斗时主角的二级属性
                    var obj_SSendRoleInitAttrs = new s2c_SSendRoleInitAttrs();
                    s2c_SSendRoleInitAttrs.read(obj_SSendRoleInitAttrs, bs);
                    return obj_SSendRoleInitAttrs;
                case hanlder.ProtocolsEnum.SSendPetInitAttrs: //服务器发给客户端，进战斗时主角宠物的二级属性
                    var obj_SSendPetInitAttrs = new s2c_SSendPetInitAttrs();
                    s2c_SSendPetInitAttrs.read(obj_SSendPetInitAttrs, bs);
                    return obj_SSendPetInitAttrs;
                case hanlder.ProtocolsEnum.SSendAlreadyUseItem: //服务器向客户端发送已经使用过的道具列表，baseid
                    var obj_SSendAlreadyUseItem = new s2c_SSendAlreadyUseItem();
                    s2c_SSendAlreadyUseItem.read(obj_SSendAlreadyUseItem, bs);
                    return obj_SSendAlreadyUseItem;
                case hanlder.ProtocolsEnum.SSynchroBossHp: //服务器向客户端发送公会boss血量
                    var obj_SSynchroBossHp = new s2c_SSynchroBossHp();
                    s2c_SSynchroBossHp.read(obj_SSynchroBossHp, bs);
                    return obj_SSynchroBossHp;
                case hanlder.ProtocolsEnum.SSendRoundPlayEnd: //服务器广播给战斗内所有人，某个角色已经播放动画完毕了
                    var obj_SSendRoundPlayEnd = new s2c_SSendRoundPlayEnd();
                    s2c_SSendRoundPlayEnd.read(obj_SSendRoundPlayEnd, bs);
                    return obj_SSendRoundPlayEnd;
                /*case ProtocolsEnum.SDeadLess20://20级之前死了发送这个消息
                    var obj_SDeadLess20: s2c_SDeadLess20 = new s2c_SDeadLess20();
                    s2c_SDeadLess20.read(obj_SDeadLess20, bs);
                    return obj_SDeadLess20;
                case ProtocolsEnum.SPvP1MyInfo://服务器发送自己的信息
                    var obj_SPvP1MyInfo: s2c_SPvP1MyInfo = new s2c_SPvP1MyInfo();
                    s2c_SPvP1MyInfo.read(obj_SPvP1MyInfo, bs);
                    return obj_SPvP1MyInfo;
                case ProtocolsEnum.SPvP1RankingList://服务器发送排行榜
                    var obj_SPvP1RankingList: s2c_SPvP1RankingList = new s2c_SPvP1RankingList();
                    s2c_SPvP1RankingList.read(obj_SPvP1RankingList, bs);
                    return obj_SPvP1RankingList;
                case ProtocolsEnum.SPvP1ReadyFight://服务器发送准备状态
                    var obj_SPvP1ReadyFight: s2c_SPvP1ReadyFight = new s2c_SPvP1ReadyFight();
                    s2c_SPvP1ReadyFight.read(obj_SPvP1ReadyFight, bs);
                    return obj_SPvP1ReadyFight;
                case ProtocolsEnum.SPvP1BattleInfo://服务器发送场内战斗信息
                    var obj_SPvP1BattleInfo: s2c_SPvP1BattleInfo = new s2c_SPvP1BattleInfo();
                    s2c_SPvP1BattleInfo.read(obj_SPvP1BattleInfo, bs);
                    return obj_SPvP1BattleInfo;
                case ProtocolsEnum.SPvP1MatchResult://通知客户端匹配结果
                    var obj_SPvP1MatchResult: s2c_SPvP1MatchResult = new s2c_SPvP1MatchResult();
                    s2c_SPvP1MatchResult.read(obj_SPvP1MatchResult, bs);
                    return obj_SPvP1MatchResult;
                case ProtocolsEnum.SPvP1OpenBoxState://服务器发送箱子状态
                    var obj_SPvP1OpenBoxState: s2c_SPvP1OpenBoxState = new s2c_SPvP1OpenBoxState();
                    s2c_SPvP1OpenBoxState.read(obj_SPvP1OpenBoxState, bs);
                    return obj_SPvP1OpenBoxState;*/
                case hanlder.ProtocolsEnum.SPvP3MyInfo: //服务器发送自己的信息
                    var obj_SPvP3MyInfo = new s2c_SPvP3MyInfo();
                    s2c_SPvP3MyInfo.read(obj_SPvP3MyInfo, bs);
                    return obj_SPvP3MyInfo;
                case hanlder.ProtocolsEnum.SPvP3RankingList: //服务器发送排行榜
                    var obj_SPvP3RankingList = new s2c_SPvP3RankingList();
                    s2c_SPvP3RankingList.read(obj_SPvP3RankingList, bs);
                    return obj_SPvP3RankingList;
                case hanlder.ProtocolsEnum.SPvP3ReadyFight: //服务器发送准备状态
                    var obj_SPvP3ReadyFight = new s2c_SPvP3ReadyFight();
                    s2c_SPvP3ReadyFight.read(obj_SPvP3ReadyFight, bs);
                    return obj_SPvP3ReadyFight;
                case hanlder.ProtocolsEnum.SPvP3MatchResult: //通知客户端匹配结果
                    var obj_SPvP3MatchResult = new s2c_SPvP3MatchResult();
                    s2c_SPvP3MatchResult.read(obj_SPvP3MatchResult, bs);
                    return obj_SPvP3MatchResult;
                case hanlder.ProtocolsEnum.SPvP3BattleInfo: //服务器发送场内战斗信息
                    var obj_SPvP3BattleInfo = new s2c_SPvP3BattleInfo();
                    s2c_SPvP3BattleInfo.read(obj_SPvP3BattleInfo, bs);
                    return obj_SPvP3BattleInfo;
                case hanlder.ProtocolsEnum.SPvP3OpenBoxState: //服务器发送箱子状态
                    var obj_SPvP3OpenBoxState = new s2c_SPvP3OpenBoxState();
                    s2c_SPvP3OpenBoxState.read(obj_SPvP3OpenBoxState, bs);
                    return obj_SPvP3OpenBoxState;
                case hanlder.ProtocolsEnum.SPvP5MyInfo: //服务器发送自己的信息
                    var obj_SPvP5MyInfo = new s2c_SPvP5MyInfo();
                    s2c_SPvP5MyInfo.read(obj_SPvP5MyInfo, bs);
                    return obj_SPvP5MyInfo;
                case hanlder.ProtocolsEnum.SPvP5RankingList: //服务器发送排行榜
                    var obj_SPvP5RankingList = new s2c_SPvP5RankingList();
                    s2c_SPvP5RankingList.read(obj_SPvP5RankingList, bs);
                    return obj_SPvP5RankingList;
                case hanlder.ProtocolsEnum.SPvP5ReadyFight: //服务器发送准备状态
                    var obj_SPvP5ReadyFight = new s2c_SPvP5ReadyFight();
                    s2c_SPvP5ReadyFight.read(obj_SPvP5ReadyFight, bs);
                    return obj_SPvP5ReadyFight;
                case hanlder.ProtocolsEnum.SPvP5MatchResult: //通知客户端匹配结果
                    var obj_SPvP5MatchResult = new s2c_SPvP5MatchResult();
                    s2c_SPvP5MatchResult.read(obj_SPvP5MatchResult, bs);
                    return obj_SPvP5MatchResult;
                case hanlder.ProtocolsEnum.SPvP5BattleInfo: //服务器发送场内战斗信息
                    var obj_SPvP5BattleInfo = new s2c_SPvP5BattleInfo();
                    s2c_SPvP5BattleInfo.read(obj_SPvP5BattleInfo, bs);
                    return obj_SPvP5BattleInfo;
                case hanlder.ProtocolsEnum.SPvP5OpenBoxState: //服务器发送箱子状态
                    var obj_SPvP5OpenBoxState = new s2c_SPvP5OpenBoxState();
                    s2c_SPvP5OpenBoxState.read(obj_SPvP5OpenBoxState, bs);
                    return obj_SPvP5OpenBoxState;
                case hanlder.ProtocolsEnum.SPlayPKFightView: //返回对手界面
                    var obj_SPlayPKFightView = new s2c_SPlayPKFightView();
                    s2c_SPlayPKFightView.read(obj_SPlayPKFightView, bs);
                    return obj_SPlayPKFightView;
                case hanlder.ProtocolsEnum.SInvitationPlayPK:
                    var obj_SInvitationPlayPK = new s2c_SInvitationPlayPK();
                    s2c_SInvitationPlayPK.read(obj_SInvitationPlayPK, bs);
                    return obj_SInvitationPlayPK;
                case hanlder.ProtocolsEnum.SInvitationPlayPKResult: //是拒绝还是接受切磋
                    var obj_SInvitationPlayPKResult = new s2c_SInvitationPlayPKResult();
                    s2c_SInvitationPlayPKResult.read(obj_SInvitationPlayPKResult, bs);
                    return obj_SInvitationPlayPKResult;
                /*case ProtocolsEnum.SSendCameraUrl://返回录像url
                    var obj_SSendCameraUrl: s2c_SSendCameraUrl = new s2c_SSendCameraUrl();
                    s2c_SSendCameraUrl.read(obj_SSendCameraUrl, bs);
                    return obj_SSendCameraUrl;
                case ProtocolsEnum.SReqRePlay://请求播放录像返回
                    var obj_SReqRePlay: s2c_SReqRePlay = new s2c_SReqRePlay();
                    s2c_SReqRePlay.read(obj_SReqRePlay, bs);
                    return obj_SReqRePlay;*/
                case hanlder.ProtocolsEnum.SInvitationLiveDieBattle: //返回下战书
                    var obj_SInvitationLiveDieBattle = new s2c_SInvitationLiveDieBattle();
                    s2c_SInvitationLiveDieBattle.read(obj_SInvitationLiveDieBattle, bs);
                    return obj_SInvitationLiveDieBattle;
                case hanlder.ProtocolsEnum.SInvitationLiveDieBattleOK: //返回是否接受下战书结果
                    var obj_SInvitationLiveDieBattleOK = new s2c_SInvitationLiveDieBattleOK();
                    s2c_SInvitationLiveDieBattleOK.read(obj_SInvitationLiveDieBattleOK, bs);
                    return obj_SInvitationLiveDieBattleOK;
                case hanlder.ProtocolsEnum.SAcceptInvitationLiveDieBattle: //确定是否接受战书
                    var obj_SAcceptInvitationLiveDieBattle = new s2c_SAcceptInvitationLiveDieBattle();
                    s2c_SAcceptInvitationLiveDieBattle.read(obj_SAcceptInvitationLiveDieBattle, bs);
                    return obj_SAcceptInvitationLiveDieBattle;
                case hanlder.ProtocolsEnum.SLiveDieBattleWatchView: //返回请求生死战观战界面
                    var obj_SLiveDieBattleWatchView = new s2c_SLiveDieBattleWatchView();
                    s2c_SLiveDieBattleWatchView.read(obj_SLiveDieBattleWatchView, bs);
                    return obj_SLiveDieBattleWatchView;
                case hanlder.ProtocolsEnum.SLiveDieBattleRankView: //返回请求生死战排行界面
                    var obj_SLiveDieBattleRankView = new s2c_SLiveDieBattleRankView();
                    s2c_SLiveDieBattleRankView.read(obj_SLiveDieBattleRankView, bs);
                    return obj_SLiveDieBattleRankView;
                case hanlder.ProtocolsEnum.SLiveDieBattleGiveRose: //点赞
                    var obj_SLiveDieBattleGiveRose = new s2c_SLiveDieBattleGiveRose();
                    s2c_SLiveDieBattleGiveRose.read(obj_SLiveDieBattleGiveRose, bs);
                    return obj_SLiveDieBattleGiveRose;
                case hanlder.ProtocolsEnum.SAcceptLiveDieBattleFirst: //返回玩家来应战(第一个确认按钮)
                    var obj_SAcceptLiveDieBattleFirst = new s2c_SAcceptLiveDieBattleFirst();
                    s2c_SAcceptLiveDieBattleFirst.read(obj_SAcceptLiveDieBattleFirst, bs);
                    return obj_SAcceptLiveDieBattleFirst;
                case hanlder.ProtocolsEnum.SSendBattleFlag: //
                    var obj_SSendBattleFlag = new s2c_SSendBattleFlag();
                    s2c_SSendBattleFlag.read(obj_SSendBattleFlag, bs);
                    return obj_SSendBattleFlag;
                /*case ProtocolsEnum.SModifyBattleFlag://
                    var obj_SModifyBattleFlag: s2c_SModifyBattleFlag = new s2c_SModifyBattleFlag();
                    s2c_SModifyBattleFlag.read(obj_SModifyBattleFlag, bs);
                    return obj_SModifyBattleFlag;*/
                case hanlder.ProtocolsEnum.SSetCommander: //
                    var obj_SSetCommander = new s2c_SSetCommander();
                    s2c_SSetCommander.read(obj_SSetCommander, bs);
                    return obj_SSetCommander;
                /*case ProtocolsEnum.SSetBattleFlag://
                    var obj_SSetBattleFlag: s2c_SSetBattleFlag = new s2c_SSetBattleFlag();
                    s2c_SSetBattleFlag.read(obj_SSetBattleFlag, bs);
                    return obj_SSetBattleFlag;*/
                case hanlder.ProtocolsEnum.SBuffChangeResult: //buff改变结果更新协议
                    var obj_SBuffChangeResult = new s2c_SBuffChangeResult();
                    s2c_SBuffChangeResult.read(obj_SBuffChangeResult, bs);
                    return obj_SBuffChangeResult;
                case hanlder.ProtocolsEnum.SRefreshSpecialQuest: //
                    var obj_SRefreshSpecialQuest = new s2c_SRefreshSpecialQuest();
                    s2c_SRefreshSpecialQuest.read(obj_SRefreshSpecialQuest, bs);
                    return obj_SRefreshSpecialQuest;
                case hanlder.ProtocolsEnum.SRefreshSpecialQuestState: //
                    var obj_SRefreshSpecialQuestState = new s2c_SRefreshSpecialQuestState();
                    s2c_SRefreshSpecialQuestState.read(obj_SRefreshSpecialQuestState, bs);
                    return obj_SRefreshSpecialQuestState;
                case hanlder.ProtocolsEnum.SRefreshActiveQuest:
                    var obj_SRefreshActiveQuest = new s2c_SRefreshActiveQuest();
                    s2c_SRefreshActiveQuest.read(obj_SRefreshActiveQuest, bs);
                    return obj_SRefreshActiveQuest;
                case hanlder.ProtocolsEnum.SSendActiveQuestList: //角色上线的时候服务器发给客户端所有当前未完成的任务列表
                    var obj_SSendActiveQuestList = new s2c_SSendActiveQuestList();
                    s2c_SSendActiveQuestList.read(obj_SSendActiveQuestList, bs);
                    return obj_SSendActiveQuestList;
                case hanlder.ProtocolsEnum.SRefreshQuestData: //任务数据发生变化时，服务器向客户端发送的刷新消息
                    var obj_SRefreshQuestData = new s2c_SRefreshQuestData();
                    s2c_SRefreshQuestData.read(obj_SRefreshQuestData, bs);
                    return obj_SRefreshQuestData;
                /*case ProtocolsEnum.SQuestionnaireTitleAndExp://问卷调查获得称号和经验
                    var obj_SQuestionnaireTitleAndExp: s2c_SQuestionnaireTitleAndExp = new s2c_SQuestionnaireTitleAndExp();
                    s2c_SQuestionnaireTitleAndExp.read(obj_SQuestionnaireTitleAndExp, bs);
                    return obj_SQuestionnaireTitleAndExp;
                case ProtocolsEnum.SRenXingCircleTask://服务通知客户端任性
                    var obj_SRenXingCircleTask: s2c_SRenXingCircleTask = new s2c_SRenXingCircleTask();
                    s2c_SRenXingCircleTask.read(obj_SRenXingCircleTask, bs);
                    return obj_SRenXingCircleTask;*/
                case hanlder.ProtocolsEnum.SQueryCircleTaskState: //回复任务状态
                    var obj_SQueryCircleTaskState = new s2c_SQueryCircleTaskState();
                    s2c_SQueryCircleTaskState.read(obj_SQueryCircleTaskState, bs);
                    return obj_SQueryCircleTaskState;
                case hanlder.ProtocolsEnum.SRefreshAnYeData: // 暗夜马戏团任务相关
                    var obj_SRefreshAnYeData = new s2c_SRefreshAnYeData();
                    s2c_SRefreshAnYeData.read(obj_SRefreshAnYeData, bs);
                    return obj_SRefreshAnYeData;
                case hanlder.ProtocolsEnum.SLengendAnYetask: // 返回寻宝结果
                    var obj_SLengendAnYetask = new s2c_SLengendAnYetask();
                    s2c_SLengendAnYetask.read(obj_SLengendAnYetask, bs);
                    return obj_SLengendAnYetask;
                case hanlder.ProtocolsEnum.SOpenClanMedic: // 返回请求药房信息
                    var obj_SOpenClanMedic = new s2c_SOpenClanMedic();
                    s2c_SOpenClanMedic.read(obj_SOpenClanMedic, bs);
                    return obj_SOpenClanMedic;
                case hanlder.ProtocolsEnum.SOpenClanList: // 服务端响应客户端请求公会列表协议：没有公会
                    var obj_SOpenClanList = new s2c_SOpenClanList();
                    s2c_SOpenClanList.read(obj_SOpenClanList, bs);
                    return obj_SOpenClanList;
                case hanlder.ProtocolsEnum.SOpenClan: // 服务端响应客户端请求公会界面协议：有公会
                    var obj_SOpenClan = new s2c_SOpenClan();
                    s2c_SOpenClan.read(obj_SOpenClan, bs);
                    return obj_SOpenClan;
                case hanlder.ProtocolsEnum.SLeaveClan: // 脱离公会成功,客户端将公会界面关闭
                    var obj_SLeaveClan = new s2c_SLeaveClan();
                    s2c_SLeaveClan.read(obj_SLeaveClan, bs);
                    return obj_SLeaveClan;
                case hanlder.ProtocolsEnum.SRequestApply: // 服务端返回申请加入公会的人员列表
                    var obj_SRequestApply = new s2c_SRequestApply();
                    s2c_SRequestApply.read(obj_SRequestApply, bs);
                    return obj_SRequestApply;
                case hanlder.ProtocolsEnum.SRefuseApply: // 服务器返回拒绝申请人员
                    var obj_SRefuseApply = new s2c_SRefuseApply();
                    s2c_SRefuseApply.read(obj_SRefuseApply, bs);
                    return obj_SRefuseApply;
                case hanlder.ProtocolsEnum.SChangeClanAim: // 服务器返回新宗旨
                    var obj_SChangeClanAim = new s2c_SChangeClanAim();
                    s2c_SChangeClanAim.read(obj_SChangeClanAim, bs);
                    return obj_SChangeClanAim;
                case hanlder.ProtocolsEnum.SClanInvitation: // 公会邀请
                    var obj_SClanInvitation = new s2c_SClanInvitation();
                    s2c_SClanInvitation.read(obj_SClanInvitation, bs);
                    return obj_SClanInvitation;
                case hanlder.ProtocolsEnum.SRefreshPosition: // 返回职务
                    var obj_SRefreshPosition = new s2c_SRefreshPosition();
                    s2c_SRefreshPosition.read(obj_SRefreshPosition, bs);
                    return obj_SRefreshPosition;
                case hanlder.ProtocolsEnum.SFireMember: // 驱逐成员返回
                    var obj_SFireMember = new s2c_SFireMember();
                    s2c_SFireMember.read(obj_SFireMember, bs);
                    return obj_SFireMember;
                //lqw
                // SDissolveRelation
                /*case ProtocolsEnum.SDissolveRelation:
                    var obj_dissolve_relation_action: s2c_dissolve_relation = new s2c_dissolve_relation();
                    s2c_dissolve_relation.read(obj_dissolve_relation_action, bs)
                    return obj_dissolve_relation_action;
                // SPreviousMasters
                case ProtocolsEnum.SPreviousMasters:
                    var obj_previous_masters_action: s2c_previous_masters = new s2c_previous_masters();
                    s2c_previous_masters.read(obj_previous_masters_action, bs)
                    return obj_previous_masters_action;
                // SPrenticeList
                case ProtocolsEnum.SPrenticeList:
                    var obj_prentice_list_action: s2c_prentice_list = new s2c_prentice_list();
                    s2c_prentice_list.read(obj_prentice_list_action, bs)
                    return obj_prentice_list_action;
                case ProtocolsEnum.SRequestAsMaster:
                    var obj_request_as_master_action: s2c_request_as_master = new s2c_request_as_master();
                    s2c_request_as_master.read(obj_request_as_master_action, bs)
                    return obj_request_as_master_action;
                // SInitPrenticeList
                case ProtocolsEnum.SInitPrenticeList:
                    var obj_init_prentice_list_action: s2c_init_prentice_list = new s2c_init_prentice_list();
                    s2c_init_prentice_list.read(obj_init_prentice_list_action, bs)
                    return obj_init_prentice_list_action;
                // SCanRequestAsPrentice
                case ProtocolsEnum.SCanRequestAsPrentice:
                    var obj_can_request_as_prentice_action: s2c_can_request_as_prentice = new s2c_can_request_as_prentice();
                    s2c_can_request_as_prentice.read(obj_can_request_as_prentice_action, bs)
                    return obj_can_request_as_prentice_action;
                // SCanRequestAsMaster
                case ProtocolsEnum.SCanRequestAsMaster:
                    var obj_can_request_as_master_action: s2c_can_request_as_master = new s2c_can_request_as_master();
                    s2c_can_request_as_master.read(obj_can_request_as_master_action, bs)
                    return obj_can_request_as_master_action;
                // SCantRequestAsPrentice
                case ProtocolsEnum.SCantRequestAsPrentice:
                    var obj_cat_request_as_prentice_action: s2c_cat_request_as_prentice = new s2c_cat_request_as_prentice();
                    s2c_cat_request_as_prentice.read(obj_cat_request_as_prentice_action, bs)
                    return obj_cat_request_as_prentice_action;
                // sCantRequestAsMaster
                case ProtocolsEnum.SCantRequestAsMaster:
                    var obj_cant_request_as_master_action: s2c_cant_request_as_master = new s2c_cant_request_as_master();
                    s2c_cant_request_as_master.read(obj_cant_request_as_master_action, bs)
                    return obj_cant_request_as_master_action;
                // SSendMasterPrenticeList
                case ProtocolsEnum.SSendMasterPrenticeList:
                    var obj_send_master_prentice_list_action: s2c_send_master_prentice_list = new s2c_send_master_prentice_list();
                    s2c_send_master_prentice_list.read(obj_send_master_prentice_list_action, bs)
                    return obj_send_master_prentice_list_action;
                // sAddPrePrentice
                case ProtocolsEnum.SAddPrePrentice:
                    var obj_add_pre_prentice_action: s2c_add_pre_prentice = new s2c_add_pre_prentice();
                    s2c_add_pre_prentice.read(obj_add_pre_prentice_action, bs)
                    return obj_add_pre_prentice_action;
                // SSendPrenticeOnLineState
                case ProtocolsEnum.SSendPrenticeOnLineState:
                    var obj_send_prentice_on_line_state_action: s2c_send_prentice_on_line_state = new s2c_send_prentice_on_line_state();
                    s2c_send_prentice_on_line_state.read(obj_send_prentice_on_line_state_action, bs)
                    return obj_send_prentice_on_line_state_action;
                // SNotifyMaster
                case ProtocolsEnum.SNotifyMaster:
                    var obj_notify_master_action: s2c_notify_master = new s2c_notify_master();
                    s2c_notify_master.read(obj_notify_master_action, bs)
                    return obj_notify_master_action;
                // SEvaluate
                case ProtocolsEnum.SEvaluate:
                    var obj_evaluate_action: s2c_evaluate = new s2c_evaluate();
                    s2c_evaluate.read(obj_evaluate_action, bs)
                    return obj_evaluate_action;
                // SDismissApprentces
                case ProtocolsEnum.SDismissApprentces:
                    var obj_dismiss_apprentces_action: s2c_dismiss_apprentces = new s2c_dismiss_apprentces();
                    s2c_dismiss_apprentces.read(obj_dismiss_apprentces_action, bs)
                    return obj_dismiss_apprentces_action;
                // sNotifyDismissMaster
                case ProtocolsEnum.SNotifyDismissMaster:
                    var obj_notify_dismiss_master_action: s2c_notify_dismiss_master = new s2c_notify_dismiss_master();
                    s2c_notify_dismiss_master.read(obj_notify_dismiss_master_action, bs)
                    return obj_notify_dismiss_master_action;
                // SPrenticesList
                case ProtocolsEnum.SPrenticesList:
                    var obj_prentices_list_action: s2c_prentices_list = new s2c_prentices_list();
                    s2c_prentices_list.read(obj_prentices_list_action, bs)
                    return obj_prentices_list_action;
                // STakeAchiveFresh
                case ProtocolsEnum.STakeAchiveFresh:
                    var obj_take_achive_fresh_action: s2c_take_achive_fresh = new s2c_take_achive_fresh();
                    s2c_take_achive_fresh.read(obj_take_achive_fresh_action, bs)
                    return obj_take_achive_fresh_action;
                case ProtocolsEnum.SNotifyAppMaster:
                    var obj_notify_app_master_action: s2c_notify_app_master = new s2c_notify_app_master();
                    s2c_notify_app_master.read(obj_notify_app_master_action, bs)
                    return obj_notify_app_master_action;*/
                case hanlder.ProtocolsEnum.SAcceptMission:
                    var obj_accept_mission_action = new s2c_accept_mission();
                    s2c_accept_mission.read(obj_accept_mission_action, bs);
                    return obj_accept_mission_action;
                case hanlder.ProtocolsEnum.SRefreshMissionState:
                    var obj_refresh_mission_state_action = new s2c_refresh_mission_state();
                    s2c_refresh_mission_state.read(obj_refresh_mission_state_action, bs);
                    return obj_refresh_mission_state_action;
                case hanlder.ProtocolsEnum.SRefreshMissionValue:
                    var obj_refresh_mission_value_action = new s2c_refresh_mission_value();
                    s2c_refresh_mission_value.read(obj_refresh_mission_value_action, bs);
                    return obj_refresh_mission_value_action;
                case hanlder.ProtocolsEnum.STrackMission:
                    var obj_track_mission_action = new s2c_track_mission();
                    s2c_track_mission.read(obj_track_mission_action, bs);
                    return obj_track_mission_action;
                /*case ProtocolsEnum.SFairylandStatus:
                    var obj_fairyland_status_action: s2c_fairyland_status = new s2c_fairyland_status();
                    s2c_fairyland_status.read(obj_fairyland_status_action, bs)
                    return obj_fairyland_status_action;*/
                case hanlder.ProtocolsEnum.SReqMissionCanAccept:
                    var obj_req_mission_can_accept_action = new s2c_req_mission_can_accept();
                    s2c_req_mission_can_accept.read(obj_req_mission_can_accept_action, bs);
                    return obj_req_mission_can_accept_action;
                /*// SUseMissionItemFail
                case ProtocolsEnum.SUseMissionItemFail:
                    var obj_use_mission_item_fail_action: s2c_use_mission_item_fail = new s2c_use_mission_item_fail();
                    s2c_use_mission_item_fail.read(obj_use_mission_item_fail_action, bs)
                    return obj_use_mission_item_fail_action;
                // sNpcFollowStart
                case ProtocolsEnum.SNpcFollowStart:
                    var obj_npc_follow_start_action: s2c_npc_follow_start = new s2c_npc_follow_start();
                    s2c_npc_follow_start.read(obj_npc_follow_start_action, bs)
                    return obj_npc_follow_start_action;
                // sNpcFollowEnd
                case ProtocolsEnum.SNpcFollowEnd:
                    var obj_npc_follow_end_action: s2c_npc_follow_end = new s2c_npc_follow_end();
                    s2c_npc_follow_end.read(obj_npc_follow_end_action, bs)
                    return obj_npc_follow_end_action;
                // sLandTimes
                case ProtocolsEnum.SLandTimes:
                    var obj_land_times_action: s2c_land_times = new s2c_land_times();
                    s2c_land_times.read(obj_land_times_action, bs)
                    return obj_land_times_action;
                // sCopyDestroyTime
                case ProtocolsEnum.SCopyDestroyTime:
                    var obj_copy_destroy_time_action: s2c_copy_destroy_time = new s2c_copy_destroy_time();
                    s2c_copy_destroy_time.read(obj_copy_destroy_time_action, bs)
                    return obj_copy_destroy_time_action;
                case ProtocolsEnum.SGetInstanceState:
                    var obj_get_instance_state_action: s2c_get_instance_state = new s2c_get_instance_state();
                    s2c_get_instance_state.read(obj_get_instance_state_action, bs)
                    return obj_get_instance_state_action;*/
                // sGetLineState
                case hanlder.ProtocolsEnum.SGetLineState:
                    var obj_get_line_state_action = new s2c_get_line_state();
                    s2c_get_line_state.read(obj_get_line_state_action, bs);
                    return obj_get_line_state_action;
                // sRefreshActivityListFinishTimes
                case hanlder.ProtocolsEnum.SRefreshActivityListFinishTimes:
                    var obj_refresh_activity_listfinish_times_action = new s2c_refresh_activity_listfinish_times();
                    s2c_refresh_activity_listfinish_times.read(obj_refresh_activity_listfinish_times_action, bs);
                    return obj_refresh_activity_listfinish_times_action;
                // SDrawGiftBox
                case hanlder.ProtocolsEnum.SDrawGiftBox:
                    var obj_draw_gift_box_action = new s2c_draw_gift_box();
                    s2c_draw_gift_box.read(obj_draw_gift_box_action, bs);
                    return obj_draw_gift_box_action;
                // sActivityOpen
                /*case ProtocolsEnum.SActivityOpen:
                    var obj_activity_open_action: s2c_activity_open = new s2c_activity_open();
                    s2c_activity_open.read(obj_activity_open_action, bs)
                    return obj_activity_open_action;
                // sNotifyTuiSongList
                case ProtocolsEnum.SNotifyTuiSongList:
                    var obj_notify_tuisong_list_action: s2c_notify_tuisong_list = new s2c_notify_tuisong_list();
                    s2c_notify_tuisong_list.read(obj_notify_tuisong_list_action, bs)
                    return obj_notify_tuisong_list_action;
                // sDailyTaskStateList
                case ProtocolsEnum.SDailyTaskStateList:
                    var obj_daily_task_state_list_action: s2c_daily_task_state_list = new s2c_daily_task_state_list();
                    s2c_daily_task_state_list.read(obj_daily_task_state_list_action, bs)
                    return obj_daily_task_state_list_action;
                // sRemoveTuiSong
                case ProtocolsEnum.SRemoveTuiSong:
                    var obj_remove_tui_song_action: s2c_remove_tui_song = new s2c_remove_tui_song();
                    s2c_remove_tui_song.read(obj_remove_tui_song_action, bs)
                    return obj_remove_tui_song_action;
                // SQuestion
                case ProtocolsEnum.SQuestion:
                    var obj_question_action: s2c_question = new s2c_question();
                    s2c_question.read(obj_question_action, bs)
                    return obj_question_action;
                // sUseTreasureMap
                case ProtocolsEnum.SUseTreasureMap:
                    var obj_use_treasure_map_action: s2c_use_treasure_map = new s2c_use_treasure_map();
                    s2c_use_treasure_map.read(obj_use_treasure_map_action, bs)
                    return obj_use_treasure_map_action;*/
                // sGetActivityInfo
                case hanlder.ProtocolsEnum.SGetActivityInfo:
                    var obj_get_activity_info_action = new s2c_get_activity_info();
                    s2c_get_activity_info.read(obj_get_activity_info_action, bs);
                    return obj_get_activity_info_action;
                // sAskIntoInstance
                /*case ProtocolsEnum.SAskIntoInstance:
                    var obj_ask_into_instance_action: s2c_ask_into_instance = new s2c_ask_into_instance();
                    s2c_ask_into_instance.read(obj_ask_into_instance_action, bs)
                    return obj_ask_into_instance_action;*/
                // sGetArchiveInfo
                case hanlder.ProtocolsEnum.SGetArchiveInfo:
                    var obj_get_archive_info_action = new s2c_get_archive_info();
                    s2c_get_archive_info.read(obj_get_archive_info_action, bs);
                    return obj_get_archive_info_action;
                // sWaitRollTime
                /*case ProtocolsEnum.SWaitRollTime:
                    var obj_wait_roll_time_action: s2c_wait_roll_time = new s2c_wait_roll_time();
                    s2c_wait_roll_time.read(obj_wait_roll_time_action, bs)
                    return obj_wait_roll_time_action;
                // SPlayXianJingCG
                case ProtocolsEnum.SPlayXianJingCG:
                    var obj_play_xianjing_cg_action: s2c_play_xianjing_cg = new s2c_play_xianjing_cg();
                    s2c_play_xianjing_cg.read(obj_play_xianjing_cg_action, bs)
                    return obj_play_xianjing_cg_action;
                // SAddTreasureMap
                case ProtocolsEnum.SAddTreasureMap:
                    var obj_add_treasure_map_action: s2c_add_treasure_map = new s2c_add_treasure_map();
                    s2c_add_treasure_map.read(obj_add_treasure_map_action, bs)
                    return obj_add_treasure_map_action;
                // sAnswerInstance
                case ProtocolsEnum.SAnswerInstance:
                    var obj_answer_instance_action: s2c_answer_instance = new s2c_answer_instance();
                    s2c_answer_instance.read(obj_answer_instance_action, bs)
                    return obj_answer_instance_action;
                // sRequestChapterInfo
                case ProtocolsEnum.SRequestChapterInfo:
                    var obj_request_chapter_info_action: s2c_request_chapter_info = new s2c_request_chapter_info();
                    s2c_request_chapter_info.read(obj_request_chapter_info_action, bs)
                    return obj_request_chapter_info_action;
                // sRequestChapterChallenge
                case ProtocolsEnum.SRequestChapterChallenge:
                    var obj_request_chapter_challenge_action: s2c_request_chapter_challenge = new s2c_request_chapter_challenge();
                    s2c_request_chapter_challenge.read(obj_request_chapter_challenge_action, bs)
                    return obj_request_chapter_challenge_action;
                //move.xml*/
                case hanlder.ProtocolsEnum.SRoleMove:
                    var obj_role_move_action = new s2c_role_move();
                    s2c_role_move.read(obj_role_move_action, bs);
                    return obj_role_move_action;
                // sSetRoleLocation
                case hanlder.ProtocolsEnum.SSetRoleLocation:
                    var obj_set_role_location_action = new s2c_set_role_location();
                    s2c_set_role_location.read(obj_set_role_location_action, bs);
                    return obj_set_role_location_action;
                // sAddUserScreen*/
                case hanlder.ProtocolsEnum.SAddUserScreen:
                    var obj_add_user_screen_action = new s2c_add_user_screen();
                    s2c_add_user_screen.read(obj_add_user_screen_action, bs);
                    return obj_add_user_screen_action;
                // sRemoveUserScreen
                case hanlder.ProtocolsEnum.SRemoveUserScreen:
                    var obj_remove_user_screen_action = new s2c_remove_user_screen();
                    s2c_remove_user_screen.read(obj_remove_user_screen_action, bs);
                    return obj_remove_user_screen_action;
                /*	// SRoleTurn
                    case ProtocolsEnum.SRoleTurn:
                        var obj_role_turn_action: s2c_role_turn = new s2c_role_turn();
                        s2c_role_turn.read(obj_role_turn_action, bs)
                        return obj_role_turn_action;
                    // sRoleEnterScene*/
                case hanlder.ProtocolsEnum.SRoleEnterScene:
                    var obj_role_enter_scene_action = new s2c_role_enter_scene();
                    s2c_role_enter_scene.read(obj_role_enter_scene_action, bs);
                    return obj_role_enter_scene_action;
                // sRoleStop
                case hanlder.ProtocolsEnum.SRoleStop:
                    var obj_role_stop_action = new s2c_role_stop();
                    s2c_role_stop.read(obj_role_stop_action, bs);
                    return obj_role_stop_action;
                // SSetRoleTeamInfo
                case hanlder.ProtocolsEnum.SSetRoleTeamInfo:
                    var obj_set_role_team_info_action = new s2c_set_role_team_info();
                    s2c_set_role_team_info.read(obj_set_role_team_info_action, bs);
                    return obj_set_role_team_info_action;
                // // sAddPickupScreen
                /*case ProtocolsEnum.SAddPickupScreen:
                    var obj_add_pickup_screen_action: s2c_add_pickup_screen = new s2c_add_pickup_screen();
                    s2c_add_pickup_screen.read(obj_add_pickup_screen_action, bs)
                    return obj_add_pickup_screen_action;
                // sRemovePickupScreen
                case ProtocolsEnum.SRemovePickupScreen:
                    var obj_remove_pickup_screen_action: s2c_remove_pickup_screen = new s2c_remove_pickup_screen();
                    s2c_remove_pickup_screen.read(obj_remove_pickup_screen_action, bs)
                    return obj_remove_pickup_screen_action;
                // SHideRole
                case ProtocolsEnum.SHideRole:
                    var obj_hide_role_action: s2c_hide_role = new s2c_hide_role();
                    s2c_hide_role.read(obj_hide_role_action, bs)
                    return obj_hide_role_action;
                // SRelocateRolePos
                case ProtocolsEnum.SRelocateRolePos:
                    var obj_relocate_rolepos_action: s2c_relocate_rolepos = new s2c_relocate_rolepos();
                    s2c_relocate_rolepos.read(obj_relocate_rolepos_action, bs)
                    return obj_relocate_rolepos_action;
                // sAddActivityNpc
                case ProtocolsEnum.SAddActivityNpc:
                    var obj_add_activity_npc_action: s2c_add_activity_npc = new s2c_add_activity_npc();
                    s2c_add_activity_npc.read(obj_add_activity_npc_action, bs)
                    return obj_add_activity_npc_action;
                // sRemoveActivityNpc
                case ProtocolsEnum.SRemoveActivityNpc:
                    var obj_remove_activity_npc_action: s2c_remove_activity_npc = new s2c_remove_activity_npc();
                    s2c_remove_activity_npc.read(obj_remove_activity_npc_action, bs)
                    return obj_remove_activity_npc_action;
                // sTransfromShape
                case ProtocolsEnum.STransfromShape:
                    var obj_transfrom_shape_action: s2c_transfrom_shape = new s2c_transfrom_shape();
                    s2c_transfrom_shape.read(obj_transfrom_shape_action, bs)
                    return obj_transfrom_shape_action;
                // sGMGetAroundRoles
                case ProtocolsEnum.SGMGetAroundRoles:
                    var obj_gm_get_around_roles_action: s2c_gm_get_around_roles = new s2c_gm_get_around_roles();
                    s2c_gm_get_around_roles.read(obj_gm_get_around_roles_action, bs)
                    return obj_gm_get_around_roles_action;
                // sUpdateRoleSceneState*/
                case hanlder.ProtocolsEnum.SUpdateRoleSceneState:
                    var obj_update_role_scene_state_action = new s2c_update_role_scene_state();
                    s2c_update_role_scene_state.read(obj_update_role_scene_state_action, bs);
                    return obj_update_role_scene_state_action;
                // sUpdateNpcSceneState
                /*case ProtocolsEnum.SUpdateNpcSceneState:
                    var obj_update_npc_scene_state_action: s2c_update_npc_scene_state = new s2c_update_npc_scene_state();
                    s2c_update_npc_scene_state.read(obj_update_npc_scene_state_action, bs)
                    return obj_update_npc_scene_state_action;
                // sUpdateNpcSceneState
                case ProtocolsEnum.SUpdateNpcSceneState:
                    var obj_update_npc_scene_state_action: s2c_update_npc_scene_state = new s2c_update_npc_scene_state();
                    s2c_update_npc_scene_state.read(obj_update_npc_scene_state_action, bs)
                    return obj_update_npc_scene_state_action;
                // sRoleModelChange
                case ProtocolsEnum.SRoleModelChange:
                    var obj_role_model_change_action: s2c_role_model_change = new s2c_role_model_change();
                    s2c_role_model_change.read(obj_role_model_change_action, bs)
                    return obj_role_model_change_action;
                // sRoleComponentsChange */
                case hanlder.ProtocolsEnum.SRoleComponentsChange:
                    var obj_role_components_change_action = new s2c_role_components_change();
                    s2c_role_components_change.read(obj_role_components_change_action, bs);
                    return obj_role_components_change_action;
                // SRoleJump
                /*case ProtocolsEnum.SRoleJump:
                    var obj_role_jump_action: s2c_role_jump = new s2c_role_jump();
                    s2c_role_jump.read(obj_role_jump_action, bs)
                    return obj_role_jump_action;
                // sRoleJumpDrawback
                case ProtocolsEnum.SRoleJumpDrawback:
                    var obj_role_jump_drawback_action: s2c_role_jump_drawback = new s2c_role_jump_drawback();
                    s2c_role_jump_drawback.read(obj_role_jump_drawback_action, bs)
                    return obj_role_jump_drawback_action;
                // sNPCMoveTo
                case ProtocolsEnum.SNPCMoveTo:
                    var obj_npc_moveto_action: s2c_npc_moveto = new s2c_npc_moveto();
                    s2c_npc_moveto.read(obj_npc_moveto_action, bs)
                    return obj_npc_moveto_action;
                // sBeginBaitang
                case ProtocolsEnum.SBeginBaitang:
                    var obj_begin_baitang_action: s2c_begin_baitang = new s2c_begin_baitang();
                    s2c_begin_baitang.read(obj_begin_baitang_action, bs)
                    return obj_begin_baitang_action;
                // sRoleChangeShape
                case ProtocolsEnum.SRoleChangeShape:
                    var obj_role_change_shape_action: s2c_role_change_shape = new s2c_role_change_shape();
                    s2c_role_change_shape.read(obj_role_change_shape_action, bs)
                    return obj_role_change_shape_action;
                // sRolePlayAction
                case ProtocolsEnum.SRolePlayAction:
                    var obj_role_play_action_action: s2c_role_play_action = new s2c_role_play_action();
                    s2c_role_play_action.read(obj_role_play_action_action, bs)
                    return obj_role_play_action_action;
                // sChangeEquipEffect
                case ProtocolsEnum.SChangeEquipEffect:
                    var obj_change_equip_effect_action: s2c_change_equip_effect = new s2c_change_equip_effect();
                    s2c_change_equip_effect.read(obj_change_equip_effect_action, bs)
                    return obj_change_equip_effect_action;
                // sVisitNpc*/
                case hanlder.ProtocolsEnum.SVisitNpc:
                    var obj_visit_npc_action = new s2c_visit_npc();
                    s2c_visit_npc.read(obj_visit_npc_action, bs);
                    return obj_visit_npc_action;
                /*	// sReqFortuneWheel
                    case ProtocolsEnum.SReqFortuneWheel:
                        var obj_req_fortune_wheel_action: s2c_req_fortune_wheel = new s2c_req_fortune_wheel();
                        s2c_req_fortune_wheel.read(obj_req_fortune_wheel_action, bs)
                        return obj_req_fortune_wheel_action;
                    // sBattleToNpcError
                    case ProtocolsEnum.SBattleToNpcError:
                        var obj_battle_to_npc_error_action: s2c_battle_to_npc_error = new s2c_battle_to_npc_error();
                        s2c_battle_to_npc_error.read(obj_battle_to_npc_error_action, bs)
                        return obj_battle_to_npc_error_action;
                    // SSendNpcMsg
                    case ProtocolsEnum.SSendNpcMsg:
                        var obj_send_npc_msg_action: s2c_send_npc_msg = new s2c_send_npc_msg();
                        s2c_send_npc_msg.read(obj_send_npc_msg_action, bs)
                        return obj_send_npc_msg_action;
                    // SSubmit2Npc*/
                case hanlder.ProtocolsEnum.SSubmit2Npc:
                    var obj_submit_2npc_action = new s2c_submit_2npc();
                    s2c_submit_2npc.read(obj_submit_2npc_action, bs);
                    return obj_submit_2npc_action;
                //19029
                //STrackedMissions
                case hanlder.ProtocolsEnum.STrackedMissions:
                    var obj_tracked_missions_action = new s2c_tracked_missions();
                    s2c_tracked_missions.read(obj_tracked_missions_action, bs);
                    return obj_tracked_missions_action;
                /*	case ProtocolsEnum.SGameTime:// 广播服务器时间
                        var obj_SGameTime: S2C_SGameTime = new S2C_SGameTime();
                        S2C_SGameTime.read(obj_SGameTime, bs);
                        return obj_SGameTime;
                    case ProtocolsEnum.SCreateRoleError://
                        var obj_SCreateRoleError: S2C_SCreateRoleError = new S2C_SCreateRoleError();
                        S2C_SCreateRoleError.read(obj_SCreateRoleError, bs);
                        return obj_SCreateRoleError;
                    case ProtocolsEnum.SRefreshUserExp:// 通知客户端刷新人物经验
                        var obj_SRefreshUserExp: S2C_SRefreshUserExp = new S2C_SRefreshUserExp();
                        S2C_SRefreshUserExp.read(obj_SRefreshUserExp, bs);
                        return obj_SRefreshUserExp;
                    case ProtocolsEnum.SRefreshHp:// 通知客户端刷新血量
                        var obj_SRefreshHp: S2C_SRefreshHp = new S2C_SRefreshHp();
                        S2C_SRefreshHp.read(obj_SRefreshHp, bs);
                        return obj_SRefreshHp;
                    case ProtocolsEnum.SResetSysConfig:// 服务器发送客户端最新的系统设置
                        var obj_SResetSysConfig: S2C_SResetSysConfig = new S2C_SResetSysConfig();
                        S2C_SResetSysConfig.read(obj_SResetSysConfig, bs);
                        return obj_SResetSysConfig;
                    case ProtocolsEnum.SRefSmoney:// 通知客户端刷新储备金
                        var obj_SRefSmoney: S2C_SRefSmoney = new S2C_SRefSmoney();
                        S2C_SRefSmoney.read(obj_SRefSmoney, bs);
                        return obj_SRefSmoney;
                    case ProtocolsEnum.SError://
                        var obj_SError: S2C_SError = new S2C_SError();
                        S2C_SError.read(obj_SError, bs);
                        return obj_SError;
                    case ProtocolsEnum.SRetRoleProp://返回玩家请求的属性对应的属性值
                        var obj_SRetRoleProp: S2C_SRetRoleProp = new S2C_SRetRoleProp();
                        S2C_SRetRoleProp.read(obj_SRetRoleProp, bs);
                        return obj_SRetRoleProp;
                    case ProtocolsEnum.SStartPlayCG://返回玩家请求的属性对应的属性值
                        var obj_SStartPlayCG: S2C_SStartPlayCG = new S2C_SStartPlayCG();
                        S2C_SStartPlayCG.read(obj_SStartPlayCG, bs);
                        return obj_SStartPlayCG;
                    case ProtocolsEnum.SBeginnerTip://
                        var obj_SBeginnerTip: S2C_SBeginnerTip = new S2C_SBeginnerTip();
                        S2C_SBeginnerTip.read(obj_SBeginnerTip, bs);
                        return obj_SBeginnerTip;
                    case ProtocolsEnum.SShowedBeginnerTips://
                        var obj_SShowedBeginnerTips: S2C_SShowedBeginnerTips = new S2C_SShowedBeginnerTips();
                        S2C_SShowedBeginnerTips.read(obj_SShowedBeginnerTips, bs);
                        return obj_SShowedBeginnerTips;
                    case ProtocolsEnum.SAnswerRoleTeamState://返回玩家请求的其他玩家的组队情况
                        var obj_SAnswerRoleTeamState: S2C_SAnswerRoleTeamState = new S2C_SAnswerRoleTeamState();
                        S2C_SAnswerRoleTeamState.read(obj_SAnswerRoleTeamState, bs);
                        return obj_SAnswerRoleTeamState;*/
                case hanlder.ProtocolsEnum.SGiveName: //返回请求生成随机角色名字
                    var obj_SGiveName = new S2C_SGiveName();
                    S2C_SGiveName.read(obj_SGiveName, bs);
                    return obj_SGiveName;
                case hanlder.ProtocolsEnum.SRecommendsNames: //创建角色重名时，服务器回给客户端推荐名字
                    var obj_SRecommendsNames = new S2C_SRecommendsNames();
                    S2C_SRecommendsNames.read(obj_SRecommendsNames, bs);
                    return obj_SRecommendsNames;
                /*case ProtocolsEnum.SReturnRoleList://服务器发给客户端，允许返回角色选择界面，并发送已有角色信息列表，同SRoleList
                    var obj_SReturnRoleList: S2C_SReturnRoleList = new S2C_SReturnRoleList();
                    S2C_SReturnRoleList.read(obj_SReturnRoleList, bs);
                    return obj_SReturnRoleList;
                case ProtocolsEnum.SSendQueueInfo://服务器：发送排队信息
                    var obj_SSendQueueInfo: S2C_SSendQueueInfo = new S2C_SSendQueueInfo();
                    S2C_SSendQueueInfo.read(obj_SSendQueueInfo, bs);
                    return obj_SSendQueueInfo;*/
                case hanlder.ProtocolsEnum.SRoleOffline: //服务器：通知客户端下线
                    var obj_SRoleOffline = new S2C_SRoleOffline();
                    S2C_SRoleOffline.read(obj_SRoleOffline, bs);
                    return obj_SRoleOffline;
                case hanlder.ProtocolsEnum.SReturnLogin: //服务器：通知客户端返回登录界面
                    var obj_SReturnLogin = new S2C_SReturnLogin();
                    S2C_SReturnLogin.read(obj_SReturnLogin, bs);
                    return obj_SReturnLogin;
                /*case ProtocolsEnum.SSendSlowQueueInfo://服务器：发送缓慢进入排队信息
                    var obj_SSendSlowQueueInfo: S2C_SSendSlowQueueInfo = new S2C_SSendSlowQueueInfo();
                    S2C_SSendSlowQueueInfo.read(obj_SSendSlowQueueInfo, bs);
                    return obj_SSendSlowQueueInfo;
                case ProtocolsEnum.SFirstDayExitGame://客户端使用千里寻踪蝶请求玩家坐标
                    var obj_SFirstDayExitGame: S2C_SFirstDayExitGame = new S2C_SFirstDayExitGame();
                    S2C_SFirstDayExitGame.read(obj_SFirstDayExitGame, bs);
                    return obj_SFirstDayExitGame;
                case ProtocolsEnum.SGACDKickoutMsg://客户端进入场景完毕
                    var obj_SGACDKickoutMsg: S2C_SGACDKickoutMsg = new S2C_SGACDKickoutMsg();
                    S2C_SGACDKickoutMsg.read(obj_SGACDKickoutMsg, bs);
                    return obj_SGACDKickoutMsg;
                case ProtocolsEnum.SSendServerMultiExp://发送服务器多倍信息
                    var obj_SSendServerMultiExp: S2C_SSendServerMultiExp = new S2C_SSendServerMultiExp();
                    S2C_SSendServerMultiExp.read(obj_SSendServerMultiExp, bs);
                    return obj_SSendServerMultiExp;
                case ProtocolsEnum.SSendLoginIp://发送登录IP信息
                    var obj_SSendLoginIp: S2C_SSendLoginIp = new S2C_SSendLoginIp();
                    S2C_SSendLoginIp.read(obj_SSendLoginIp, bs);
                    return obj_SSendLoginIp;
                case ProtocolsEnum.SRequestUsedNameData://使用改名道具的时候发送这个协议获取曾用名
                    var obj_SRequestUsedNameData: S2C_SRequestUsedNameData = new S2C_SRequestUsedNameData();
                    S2C_SRequestUsedNameData.read(obj_SRequestUsedNameData, bs);
                    return obj_SRequestUsedNameData;*/
                case hanlder.ProtocolsEnum.SModifyRoleName: //客户端请求更改名字
                    var obj_SModifyRoleName = new S2C_SModifyRoleName();
                    S2C_SModifyRoleName.read(obj_SModifyRoleName, bs);
                    return obj_SModifyRoleName;
                /*	// sReqFortuneWheel
                    case ProtocolsEnum.SReqFortuneWheel:
                        var obj_req_fortune_wheel_action: s2c_req_fortune_wheel = new s2c_req_fortune_wheel();
                        s2c_req_fortune_wheel.read(obj_req_fortune_wheel_action, bs)
                        return obj_req_fortune_wheel_action;
                    // sBattleToNpcError
                    case ProtocolsEnum.SBattleToNpcError:
                        var obj_battle_to_npc_error_action: s2c_battle_to_npc_error = new s2c_battle_to_npc_error();
                        s2c_battle_to_npc_error.read(obj_battle_to_npc_error_action, bs)
                        return obj_battle_to_npc_error_action;
                    // SSendNpcMsg
                    case ProtocolsEnum.SSendNpcMsg:
                        var obj_send_npc_msg_action: s2c_send_npc_msg = new s2c_send_npc_msg();
                        s2c_send_npc_msg.read(obj_send_npc_msg_action, bs)
                        return obj_send_npc_msg_action;
                    // SSubmit2Npc
                    case ProtocolsEnum.SSubmit2Npc:
                        var obj_submit_2npc_action: s2c_submit_2npc = new s2c_submit_2npc();
                        s2c_submit_2npc.read(obj_submit_2npc_action, bs)
                        return obj_submit_2npc_action;
                    //19029
                    //STrackedMissions
                    case ProtocolsEnum.STrackedMissions:
                        var obj_tracked_missions_action: s2c_tracked_missions = new s2c_tracked_missions();
                        s2c_tracked_missions.read(obj_tracked_missions_action, bs)
                        return obj_tracked_missions_action;*/
                case hanlder.ProtocolsEnum.SGameTime: // 广播服务器时间
                    var obj_SGameTime = new S2C_SGameTime();
                    S2C_SGameTime.read(obj_SGameTime, bs);
                    return obj_SGameTime;
                case hanlder.ProtocolsEnum.SCreateRoleError: // 
                    var obj_SCreateRoleError = new S2C_SCreateRoleError();
                    S2C_SCreateRoleError.read(obj_SCreateRoleError, bs);
                    return obj_SCreateRoleError;
                /*case ProtocolsEnum.SRefreshUserExp:// 通知客户端刷新人物经验
                    var obj_SRefreshUserExp: S2C_SRefreshUserExp = new S2C_SRefreshUserExp();
                    S2C_SRefreshUserExp.read(obj_SRefreshUserExp, bs);
                    return obj_SRefreshUserExp;
                case ProtocolsEnum.SRefreshHp:// 通知客户端刷新血量
                    var obj_SRefreshHp: S2C_SRefreshHp = new S2C_SRefreshHp();
                    S2C_SRefreshHp.read(obj_SRefreshHp, bs);
                    return obj_SRefreshHp;*/
                case hanlder.ProtocolsEnum.SResetSysConfig: // 服务器发送客户端最新的系统设置
                    var obj_SResetSysConfig = new S2C_SResetSysConfig();
                    S2C_SResetSysConfig.read(obj_SResetSysConfig, bs);
                    return obj_SResetSysConfig;
                /*case ProtocolsEnum.SRefSmoney:// 通知客户端刷新储备金
                    var obj_SRefSmoney: S2C_SRefSmoney = new S2C_SRefSmoney();
                    S2C_SRefSmoney.read(obj_SRefSmoney, bs);
                    return obj_SRefSmoney;
                case ProtocolsEnum.SError://
                    var obj_SError: S2C_SError = new S2C_SError();
                    S2C_SError.read(obj_SError, bs);
                    return obj_SError;
                case ProtocolsEnum.SRetRoleProp://返回玩家请求的属性对应的属性值
                    var obj_SRetRoleProp: S2C_SRetRoleProp = new S2C_SRetRoleProp();
                    S2C_SRetRoleProp.read(obj_SRetRoleProp, bs);
                    return obj_SRetRoleProp;
                case ProtocolsEnum.SStartPlayCG://返回玩家请求的属性对应的属性值
                    var obj_SStartPlayCG: S2C_SStartPlayCG = new S2C_SStartPlayCG();
                    S2C_SStartPlayCG.read(obj_SStartPlayCG, bs);
                    return obj_SStartPlayCG;
                case ProtocolsEnum.SBeginnerTip://
                    var obj_SBeginnerTip: S2C_SBeginnerTip = new S2C_SBeginnerTip();
                    S2C_SBeginnerTip.read(obj_SBeginnerTip, bs);
                    return obj_SBeginnerTip;
                case ProtocolsEnum.SShowedBeginnerTips://
                    var obj_SShowedBeginnerTips: S2C_SShowedBeginnerTips = new S2C_SShowedBeginnerTips();
                    S2C_SShowedBeginnerTips.read(obj_SShowedBeginnerTips, bs);
                    return obj_SShowedBeginnerTips;
                case ProtocolsEnum.SAnswerRoleTeamState://返回玩家请求的其他玩家的组队情况
                    var obj_SAnswerRoleTeamState: S2C_SAnswerRoleTeamState = new S2C_SAnswerRoleTeamState();
                    S2C_SAnswerRoleTeamState.read(obj_SAnswerRoleTeamState, bs);
                    return obj_SAnswerRoleTeamState;
                case ProtocolsEnum.SGiveName://返回玩家请求的其他玩家的组队情况
                    var obj_SGiveName: S2C_SGiveName = new S2C_SGiveName();
                    S2C_SGiveName.read(obj_SGiveName, bs);
                    return obj_SGiveName;
                case ProtocolsEnum.SRecommendsNames://创建角色重名时，服务器回给客户端推荐名字
                    var obj_SRecommendsNames: S2C_SRecommendsNames = new S2C_SRecommendsNames();
                    S2C_SRecommendsNames.read(obj_SRecommendsNames, bs);
                    return obj_SRecommendsNames;
                case ProtocolsEnum.SReturnRoleList://服务器发给客户端，允许返回角色选择界面，并发送已有角色信息列表，同SRoleList
                    var obj_SReturnRoleList: S2C_SReturnRoleList = new S2C_SReturnRoleList();
                    S2C_SReturnRoleList.read(obj_SReturnRoleList, bs);
                    return obj_SReturnRoleList;
                case ProtocolsEnum.SSendQueueInfo://服务器：发送排队信息
                    var obj_SSendQueueInfo: S2C_SSendQueueInfo = new S2C_SSendQueueInfo();
                    S2C_SSendQueueInfo.read(obj_SSendQueueInfo, bs);
                    return obj_SSendQueueInfo;
                case ProtocolsEnum.SRoleOffline://服务器：通知客户端下线
                    var obj_SRoleOffline: S2C_SRoleOffline = new S2C_SRoleOffline();
                    S2C_SRoleOffline.read(obj_SRoleOffline, bs);
                    return obj_SRoleOffline;
                case ProtocolsEnum.SReturnLogin://服务器：通知客户端返回登录界面
                    var obj_SReturnLogin: S2C_SReturnLogin = new S2C_SReturnLogin();
                    S2C_SReturnLogin.read(obj_SReturnLogin, bs);
                    return obj_SReturnLogin;
                case ProtocolsEnum.SSendSlowQueueInfo://服务器：发送缓慢进入排队信息
                    var obj_SSendSlowQueueInfo: S2C_SSendSlowQueueInfo = new S2C_SSendSlowQueueInfo();
                    S2C_SSendSlowQueueInfo.read(obj_SSendSlowQueueInfo, bs);
                    return obj_SSendSlowQueueInfo;
                case ProtocolsEnum.SFirstDayExitGame://客户端使用千里寻踪蝶请求玩家坐标
                    var obj_SFirstDayExitGame: S2C_SFirstDayExitGame = new S2C_SFirstDayExitGame();
                    S2C_SFirstDayExitGame.read(obj_SFirstDayExitGame, bs);
                    return obj_SFirstDayExitGame;
                case ProtocolsEnum.SGACDKickoutMsg://客户端进入场景完毕
                    var obj_SGACDKickoutMsg: S2C_SGACDKickoutMsg = new S2C_SGACDKickoutMsg();
                    S2C_SGACDKickoutMsg.read(obj_SGACDKickoutMsg, bs);
                    return obj_SGACDKickoutMsg;
                case ProtocolsEnum.SSendServerMultiExp://发送服务器多倍信息
                    var obj_SSendServerMultiExp: S2C_SSendServerMultiExp = new S2C_SSendServerMultiExp();
                    S2C_SSendServerMultiExp.read(obj_SSendServerMultiExp, bs);
                    return obj_SSendServerMultiExp;
                case ProtocolsEnum.SSendLoginIp://发送登录IP信息
                    var obj_SSendLoginIp: S2C_SSendLoginIp = new S2C_SSendLoginIp();
                    S2C_SSendLoginIp.read(obj_SSendLoginIp, bs);
                    return obj_SSendLoginIp;
                case ProtocolsEnum.SRequestUsedNameData://使用改名道具的时候发送这个协议获取曾用名
                    var obj_SRequestUsedNameData: S2C_SRequestUsedNameData = new S2C_SRequestUsedNameData();
                    S2C_SRequestUsedNameData.read(obj_SRequestUsedNameData, bs);
                    return obj_SRequestUsedNameData;
                case ProtocolsEnum.SModifyRoleName://客户端请求更改名字
                    var obj_SModifyRoleName: S2C_SModifyRoleName = new S2C_SModifyRoleName();
                    S2C_SModifyRoleName.read(obj_SModifyRoleName, bs);
                    return obj_SModifyRoleName;*/
                /*	// sReqFortuneWheel
                    case ProtocolsEnum.SReqFortuneWheel:
                        var obj_req_fortune_wheel_action: s2c_req_fortune_wheel = new s2c_req_fortune_wheel();
                        s2c_req_fortune_wheel.read(obj_req_fortune_wheel_action, bs)
                        return obj_req_fortune_wheel_action;
                    // sBattleToNpcError
                    case ProtocolsEnum.SBattleToNpcError:
                        var obj_battle_to_npc_error_action: s2c_battle_to_npc_error = new s2c_battle_to_npc_error();
                        s2c_battle_to_npc_error.read(obj_battle_to_npc_error_action, bs)
                        return obj_battle_to_npc_error_action;
                    // SSendNpcMsg
                    case ProtocolsEnum.SSendNpcMsg:
                        var obj_send_npc_msg_action: s2c_send_npc_msg = new s2c_send_npc_msg();
                        s2c_send_npc_msg.read(obj_send_npc_msg_action, bs)
                        return obj_send_npc_msg_action;
                    // SSubmit2Npc
                    case ProtocolsEnum.SSubmit2Npc:
                        var obj_submit_2npc_action: s2c_submit_2npc = new s2c_submit_2npc();
                        s2c_submit_2npc.read(obj_submit_2npc_action, bs)
                        return obj_submit_2npc_action;
                    //19029*/
                //STrackedMissions
                case hanlder.ProtocolsEnum.STrackedMissions:
                    var obj_tracked_missions_action = new s2c_tracked_missions();
                    s2c_tracked_missions.read(obj_tracked_missions_action, bs);
                    return obj_tracked_missions_action;
                /*	case ProtocolsEnum.SGameTime:// 广播服务器时间
                        var obj_SGameTime: S2C_SGameTime = new S2C_SGameTime();
                        S2C_SGameTime.read(obj_SGameTime, bs);
                        return obj_SGameTime;
                    case ProtocolsEnum.SCreateRoleError://
                        var obj_SCreateRoleError: S2C_SCreateRoleError = new S2C_SCreateRoleError();
                        S2C_SCreateRoleError.read(obj_SCreateRoleError, bs);
                        return obj_SCreateRoleError;
                    case ProtocolsEnum.SRefreshUserExp:// 通知客户端刷新人物经验
                        var obj_SRefreshUserExp: S2C_SRefreshUserExp = new S2C_SRefreshUserExp();
                        S2C_SRefreshUserExp.read(obj_SRefreshUserExp, bs);
                        return obj_SRefreshUserExp;
                    case ProtocolsEnum.SRefreshHp:// 通知客户端刷新血量
                        var obj_SRefreshHp: S2C_SRefreshHp = new S2C_SRefreshHp();
                        S2C_SRefreshHp.read(obj_SRefreshHp, bs);
                        return obj_SRefreshHp;
                    case ProtocolsEnum.SResetSysConfig:// 服务器发送客户端最新的系统设置
                        var obj_SResetSysConfig: S2C_SResetSysConfig = new S2C_SResetSysConfig();
                        S2C_SResetSysConfig.read(obj_SResetSysConfig, bs);
                        return obj_SResetSysConfig;
                    case ProtocolsEnum.SRefSmoney:// 通知客户端刷新储备金
                        var obj_SRefSmoney: S2C_SRefSmoney = new S2C_SRefSmoney();
                        S2C_SRefSmoney.read(obj_SRefSmoney, bs);
                        return obj_SRefSmoney;
                    case ProtocolsEnum.SError://
                        var obj_SError: S2C_SError = new S2C_SError();
                        S2C_SError.read(obj_SError, bs);
                        return obj_SError;
                    case ProtocolsEnum.SRetRoleProp://返回玩家请求的属性对应的属性值
                        var obj_SRetRoleProp: S2C_SRetRoleProp = new S2C_SRetRoleProp();
                        S2C_SRetRoleProp.read(obj_SRetRoleProp, bs);
                        return obj_SRetRoleProp;
                    case ProtocolsEnum.SStartPlayCG://返回玩家请求的属性对应的属性值
                        var obj_SStartPlayCG: S2C_SStartPlayCG = new S2C_SStartPlayCG();
                        S2C_SStartPlayCG.read(obj_SStartPlayCG, bs);
                        return obj_SStartPlayCG;
                    case ProtocolsEnum.SBeginnerTip://
                        var obj_SBeginnerTip: S2C_SBeginnerTip = new S2C_SBeginnerTip();
                        S2C_SBeginnerTip.read(obj_SBeginnerTip, bs);
                        return obj_SBeginnerTip;
                    case ProtocolsEnum.SShowedBeginnerTips://
                        var obj_SShowedBeginnerTips: S2C_SShowedBeginnerTips = new S2C_SShowedBeginnerTips();
                        S2C_SShowedBeginnerTips.read(obj_SShowedBeginnerTips, bs);
                        return obj_SShowedBeginnerTips;
                    case ProtocolsEnum.SAnswerRoleTeamState://返回玩家请求的其他玩家的组队情况
                        var obj_SAnswerRoleTeamState: S2C_SAnswerRoleTeamState = new S2C_SAnswerRoleTeamState();
                        S2C_SAnswerRoleTeamState.read(obj_SAnswerRoleTeamState, bs);
                        return obj_SAnswerRoleTeamState;
                    case ProtocolsEnum.SGiveName://返回玩家请求的其他玩家的组队情况
                        var obj_SGiveName: S2C_SGiveName = new S2C_SGiveName();
                        S2C_SGiveName.read(obj_SGiveName, bs);
                        return obj_SGiveName;
                    case ProtocolsEnum.SRecommendsNames://创建角色重名时，服务器回给客户端推荐名字
                        var obj_SRecommendsNames: S2C_SRecommendsNames = new S2C_SRecommendsNames();
                        S2C_SRecommendsNames.read(obj_SRecommendsNames, bs);
                        return obj_SRecommendsNames;
                    case ProtocolsEnum.SReturnRoleList://服务器发给客户端，允许返回角色选择界面，并发送已有角色信息列表，同SRoleList
                        var obj_SReturnRoleList: S2C_SReturnRoleList = new S2C_SReturnRoleList();
                        S2C_SReturnRoleList.read(obj_SReturnRoleList, bs);
                        return obj_SReturnRoleList;
                    case ProtocolsEnum.SSendQueueInfo://服务器：发送排队信息
                        var obj_SSendQueueInfo: S2C_SSendQueueInfo = new S2C_SSendQueueInfo();
                        S2C_SSendQueueInfo.read(obj_SSendQueueInfo, bs);
                        return obj_SSendQueueInfo;
                    case ProtocolsEnum.SRoleOffline://服务器：通知客户端下线
                        var obj_SRoleOffline: S2C_SRoleOffline = new S2C_SRoleOffline();
                        S2C_SRoleOffline.read(obj_SRoleOffline, bs);
                        return obj_SRoleOffline;
                    case ProtocolsEnum.SReturnLogin://服务器：通知客户端返回登录界面
                        var obj_SReturnLogin: S2C_SReturnLogin = new S2C_SReturnLogin();
                        S2C_SReturnLogin.read(obj_SReturnLogin, bs);
                        return obj_SReturnLogin;
                    case ProtocolsEnum.SSendSlowQueueInfo://服务器：发送缓慢进入排队信息
                        var obj_SSendSlowQueueInfo: S2C_SSendSlowQueueInfo = new S2C_SSendSlowQueueInfo();
                        S2C_SSendSlowQueueInfo.read(obj_SSendSlowQueueInfo, bs);
                        return obj_SSendSlowQueueInfo;
                    case ProtocolsEnum.SFirstDayExitGame://客户端使用千里寻踪蝶请求玩家坐标
                        var obj_SFirstDayExitGame: S2C_SFirstDayExitGame = new S2C_SFirstDayExitGame();
                        S2C_SFirstDayExitGame.read(obj_SFirstDayExitGame, bs);
                        return obj_SFirstDayExitGame;
                    case ProtocolsEnum.SGACDKickoutMsg://客户端进入场景完毕
                        var obj_SGACDKickoutMsg: S2C_SGACDKickoutMsg = new S2C_SGACDKickoutMsg();
                        S2C_SGACDKickoutMsg.read(obj_SGACDKickoutMsg, bs);
                        return obj_SGACDKickoutMsg;
                    case ProtocolsEnum.SSendServerMultiExp://发送服务器多倍信息
                        var obj_SSendServerMultiExp: S2C_SSendServerMultiExp = new S2C_SSendServerMultiExp();
                        S2C_SSendServerMultiExp.read(obj_SSendServerMultiExp, bs);
                        return obj_SSendServerMultiExp;
                    case ProtocolsEnum.SSendLoginIp://发送登录IP信息
                        var obj_SSendLoginIp: S2C_SSendLoginIp = new S2C_SSendLoginIp();
                        S2C_SSendLoginIp.read(obj_SSendLoginIp, bs);
                        return obj_SSendLoginIp;
                    case ProtocolsEnum.SRequestUsedNameData://使用改名道具的时候发送这个协议获取曾用名
                        var obj_SRequestUsedNameData: S2C_SRequestUsedNameData = new S2C_SRequestUsedNameData();
                        S2C_SRequestUsedNameData.read(obj_SRequestUsedNameData, bs);
                        return obj_SRequestUsedNameData;
                    case ProtocolsEnum.SModifyRoleName://客户端请求更改名字
                        var obj_SModifyRoleName: S2C_SModifyRoleName = new S2C_SModifyRoleName();
                        S2C_SModifyRoleName.read(obj_SModifyRoleName, bs);
                        return obj_SModifyRoleName;*/
                case hanlder.ProtocolsEnum.SRspRoleInfo: //人物信息界面回复
                    var obj_SRspRoleInfo = new S2C_SRspRoleInfo();
                    S2C_SRspRoleInfo.read(obj_SRspRoleInfo, bs);
                    return obj_SRspRoleInfo;
                /*case ProtocolsEnum.SUserNeedActive://如果玩家需要激活,服务器发这个
                    var obj_SUserNeedActive: S2C_SUserNeedActive = new S2C_SUserNeedActive();
                    S2C_SUserNeedActive.read(obj_SUserNeedActive, bs);
                    return obj_SUserNeedActive;
                case ProtocolsEnum.SNotifyDeviceInfo://
                    var obj_SNotifyDeviceInfo: S2C_SNotifyDeviceInfo = new S2C_SNotifyDeviceInfo();
                    S2C_SNotifyDeviceInfo.read(obj_SNotifyDeviceInfo, bs);
                    return obj_SNotifyDeviceInfo;
                case ProtocolsEnum.SNotifyShieldState://
                    var obj_SNotifyShieldState: S2C_SNotifyShieldState = new S2C_SNotifyShieldState();
                    S2C_SNotifyShieldState.read(obj_SNotifyShieldState, bs);
                    return obj_SNotifyShieldState;
                case ProtocolsEnum.SGACDKickoutMsg1://
                    var obj_SGACDKickoutMsg1: S2C_SGACDKickoutMsg1 = new S2C_SGACDKickoutMsg1();
                    S2C_SGACDKickoutMsg1.read(obj_SGACDKickoutMsg1, bs);
                    return obj_SGACDKickoutMsg1;
                case ProtocolsEnum.SServerLevel://
                    var obj_SServerLevel: S2C_SServerLevel = new S2C_SServerLevel();
                    S2C_SServerLevel.read(obj_SServerLevel, bs);
                    return obj_SServerLevel;
                case ProtocolsEnum.STeamVote://客户端进入场景完毕
                    var obj_STeamVote: S2C_STeamVote = new S2C_STeamVote();
                    S2C_STeamVote.read(obj_STeamVote, bs);
                    return obj_STeamVote;*/
                case hanlder.ProtocolsEnum.SGetSysConfig: //服务器发送客户端最新的系统设置
                    var obj_SGetSysConfig = new S2C_SGetSysConfig();
                    S2C_SGetSysConfig.read(obj_SGetSysConfig, bs);
                    return obj_SGetSysConfig;
                /*case ProtocolsEnum.SServerIDResponse://跨服相关的协议
                    var obj_SServerIDResponse: S2C_SServerIDResponse = new S2C_SServerIDResponse();
                    S2C_SServerIDResponse.read(obj_SServerIDResponse, bs);
                    return obj_SServerIDResponse;
                case ProtocolsEnum.SAddPointAttrData://
                    var obj_SAddPointAttrData: S2C_SAddPointAttrData = new S2C_SAddPointAttrData();
                    S2C_SAddPointAttrData.read(obj_SAddPointAttrData, bs);
                    return obj_SAddPointAttrData;
                case ProtocolsEnum.SReqHelpCountView://
                    var obj_SReqHelpCountView: S2C_SReqHelpCountView = new S2C_SReqHelpCountView();
                    S2C_SReqHelpCountView.read(obj_SReqHelpCountView, bs);
                    return obj_SReqHelpCountView;
                case ProtocolsEnum.SReqColorRoomView://返回人物染色衣橱信息
                    var obj_SReqColorRoomView: S2C_SReqColorRoomView = new S2C_SReqColorRoomView();
                    S2C_SReqColorRoomView.read(obj_SReqColorRoomView, bs);
                    return obj_SReqColorRoomView;
                case ProtocolsEnum.SReqUseColor://返回使用染色成功
                    var obj_SReqUseColor: S2C_SReqUseColor = new S2C_SReqUseColor();
                    S2C_SReqUseColor.read(obj_SReqUseColor, bs);
                    return obj_SReqUseColor;
                case ProtocolsEnum.SReqUsePetColor://返回宠物染色
                    var obj_SReqUsePetColor: S2C_SReqUsePetColor = new S2C_SReqUsePetColor();
                    S2C_SReqUsePetColor.read(obj_SReqUsePetColor, bs);
                    return obj_SReqUsePetColor;
                case ProtocolsEnum.SReqPointSchemeTime://返回人物切换加点方案次数
                    var obj_SReqPointSchemeTime: S2C_SReqPointSchemeTime = new S2C_SReqPointSchemeTime();
                    S2C_SReqPointSchemeTime.read(obj_SReqPointSchemeTime, bs);
                    return obj_SReqPointSchemeTime;
                case ProtocolsEnum.SSetFunOpenClose://设置功能开关
                    var obj_SSetFunOpenClose: S2C_SSetFunOpenClose = new S2C_SSetFunOpenClose();
                    S2C_SSetFunOpenClose.read(obj_SSetFunOpenClose, bs);
                    return obj_SSetFunOpenClose;
                case ProtocolsEnum.SSendHelpSW://援助声望当前值
                    var obj_SSendHelpSW: S2C_SSendHelpSW = new S2C_SSendHelpSW();
                    S2C_SSendHelpSW.read(obj_SSendHelpSW, bs);
                    return obj_SSendHelpSW;*/
                case hanlder.ProtocolsEnum.SSetLineConfig: //
                    var obj_SSetLineConfig = new S2C_SSetLineConfig();
                    S2C_SSetLineConfig.read(obj_SSetLineConfig, bs);
                    return obj_SSetLineConfig;
                case hanlder.ProtocolsEnum.SDefineTeam:
                    var obj_SDefineTeam = new S2C_SDefineTeam();
                    S2C_SDefineTeam.read(obj_SDefineTeam, bs);
                    return obj_SDefineTeam;
                case hanlder.ProtocolsEnum.SCheckCodeFinishTime: //验证码倒计时完成时间点
                    var obj_SCheckCodeFinishTime = new S2C_SCheckCodeFinishTime();
                    S2C_SCheckCodeFinishTime.read(obj_SCheckCodeFinishTime, bs);
                    return obj_SCheckCodeFinishTime;
                case hanlder.ProtocolsEnum.SBindTel: //确认关联手机返回状态1成功0失败
                    var obj_SBindTel = new S2C_SBindTel();
                    S2C_SBindTel.read(obj_SBindTel, bs);
                    return obj_SBindTel;
                /*case ProtocolsEnum.SUnBindTel://解除关联手机返回状态1成功0失败
                    var obj_SUnBindTel: S2C_SUnBindTel = new S2C_SUnBindTel();
                    S2C_SUnBindTel.read(obj_SUnBindTel, bs);
                    return obj_SUnBindTel;*/
                case hanlder.ProtocolsEnum.SGetBindTel: //返回关联手机信息
                    var obj_SGetBindTel = new S2C_SGetBindTel();
                    S2C_SGetBindTel.read(obj_SGetBindTel, bs);
                    return obj_SGetBindTel;
                case hanlder.ProtocolsEnum.SGetBindTelAward: //返回绑定手机奖励状态
                    var obj_SGetBindTelAward = new S2C_SGetBindTelAward();
                    S2C_SGetBindTelAward.read(obj_SGetBindTelAward, bs);
                    return obj_SGetBindTelAward;
                /*case ProtocolsEnum.SBindTelAgain://重新绑定手机
                    var obj_SBindTelAgain: S2C_SBindTelAgain = new S2C_SBindTelAgain();
                    S2C_SBindTelAgain.read(obj_SBindTelAgain, bs);
                    return obj_SBindTelAgain;*/
                case hanlder.ProtocolsEnum.SSetPassword: //返回成功与否
                    var obj_SSetPassword = new S2C_SSetPassword();
                    S2C_SSetPassword.read(obj_SSetPassword, bs);
                    return obj_SSetPassword;
                case hanlder.ProtocolsEnum.SResetPassword: //返回成功与否
                    var obj_SResetPassword = new S2C_SResetPassword();
                    S2C_SResetPassword.read(obj_SResetPassword, bs);
                    return obj_SResetPassword;
                case hanlder.ProtocolsEnum.SDelPassword: //返回成功与否
                    var obj_SDelPassword = new S2C_SDelPassword();
                    S2C_SDelPassword.read(obj_SDelPassword, bs);
                    return obj_SDelPassword;
                case hanlder.ProtocolsEnum.SForceDelPassword: //解除时间点
                    var obj_SForceDelPassword = new S2C_SForceDelPassword();
                    S2C_SForceDelPassword.read(obj_SForceDelPassword, bs);
                    return obj_SForceDelPassword;
                case hanlder.ProtocolsEnum.SCancelForceDelPassword: //返回成功与否
                    var obj_SCancelForceDelPassword = new S2C_SCancelForceDelPassword();
                    S2C_SCancelForceDelPassword.read(obj_SCancelForceDelPassword, bs);
                    return obj_SCancelForceDelPassword;
                case hanlder.ProtocolsEnum.SOpenGoodLocks: //返回成功与否
                    var obj_SOpenGoodLocks = new S2C_SOpenGoodLocks();
                    S2C_SOpenGoodLocks.read(obj_SOpenGoodLocks, bs);
                    return obj_SOpenGoodLocks;
                case hanlder.ProtocolsEnum.SCloseGoodLocks: //返回成功与否
                    var obj_SCloseGoodLocks = new S2C_SCloseGoodLocks();
                    S2C_SCloseGoodLocks.read(obj_SCloseGoodLocks, bs);
                    return obj_SCloseGoodLocks;
                case hanlder.ProtocolsEnum.SGetGoodLocksInfo: //道具安全锁信息
                    var obj_SGetGoodLocksInfo = new S2C_SGetGoodLocksInfo();
                    S2C_SGetGoodLocksInfo.read(obj_SGetGoodLocksInfo, bs);
                    return obj_SGetGoodLocksInfo;
                /*case ProtocolsEnum.SGoodUnLock://道具输入密码解锁状态
                    var obj_SGoodUnLock: S2C_SGoodUnLock = new S2C_SGoodUnLock();
                    S2C_SGoodUnLock.read(obj_SGoodUnLock, bs);
                    return obj_SGoodUnLock;
                case ProtocolsEnum.SForceUnlockTimeExpire://强制解锁到期状态
                    var obj_SForceUnlockTimeExpire: S2C_SForceUnlockTimeExpire = new S2C_SForceUnlockTimeExpire();
                    S2C_SForceUnlockTimeExpire.read(obj_SForceUnlockTimeExpire, bs);
                    return obj_SForceUnlockTimeExpire;
                case ProtocolsEnum.SChangeGoodLockState://改变道具锁的状态
                    var obj_SChangeGoodLockState: S2C_SChangeGoodLockState = new S2C_SChangeGoodLockState();
                    S2C_SChangeGoodLockState.read(obj_SChangeGoodLockState, bs);
                    return obj_SChangeGoodLockState;
                case ProtocolsEnum.SCheckCodeFinishTimePoint://验证码倒计时完成时间点
                    var obj_SCheckCodeFinishTimePoint: S2C_SCheckCodeFinishTimePoint = new S2C_SCheckCodeFinishTimePoint();
                    S2C_SCheckCodeFinishTimePoint.read(obj_SCheckCodeFinishTimePoint, bs);
                    return obj_SCheckCodeFinishTimePoint;
                case ProtocolsEnum.SCBGUpCheckCode://藏宝阁上架验证
                    var obj_SCBGUpCheckCode: S2C_SCBGUpCheckCode = new S2C_SCBGUpCheckCode();
                    S2C_SCBGUpCheckCode.read(obj_SCBGUpCheckCode, bs);
                    return obj_SCBGUpCheckCode;*/
                case hanlder.ProtocolsEnum.SGetPetEquipInfo: //
                    var obj_SGetPetEquipInfo = new S2C_SGetPetEquipInfo();
                    S2C_SGetPetEquipInfo.read(obj_SGetPetEquipInfo, bs);
                    return obj_SGetPetEquipInfo;
                /** 智慧试炼开始 */
                case hanlder.ProtocolsEnum.SAttendImpExam:
                    var obj_attend_impexam_action = new S2C_attend_impexam();
                    S2C_attend_impexam.read(obj_attend_impexam_action, bs);
                    return obj_attend_impexam_action;
                case hanlder.ProtocolsEnum.SSendImpExamVill:
                    var obj_send_impexamvill_action = new S2C_send_impexamvill();
                    S2C_send_impexamvill.read(obj_send_impexamvill_action, bs);
                    return obj_send_impexamvill_action;
                case hanlder.ProtocolsEnum.SSendImpExamProv:
                    var obj_send_impexamprov_action = new S2C_send_impexamprov();
                    S2C_send_impexamprov.read(obj_send_impexamprov_action, bs);
                    return obj_send_impexamprov_action;
                case hanlder.ProtocolsEnum.SSendImpExamState:
                    var obj_send_impexamstate_action = new S2C_send_impexamstate();
                    S2C_send_impexamstate.read(obj_send_impexamstate_action, bs);
                    return obj_send_impexamstate_action;
                case hanlder.ProtocolsEnum.SSendImpExamStart:
                    var obj_send_impexamstart_action = new S2C_send_impexamstart();
                    S2C_send_impexamstart.read(obj_send_impexamstart_action, bs);
                    return obj_send_impexamstart_action;
                case hanlder.ProtocolsEnum.SSendImpExamAssist:
                    var obj_send_impexamassist_action = new S2C_send_impexamassist();
                    S2C_send_impexamassist.read(obj_send_impexamassist_action, bs);
                    return obj_send_impexamassist_action;
                case hanlder.ProtocolsEnum.SImpExamHelp:
                    var obj_imp_examhelp_action = new S2C_imp_examhelp();
                    S2C_imp_examhelp.read(obj_imp_examhelp_action, bs);
                    return obj_imp_examhelp_action;
                case hanlder.ProtocolsEnum.SQueryImpExamState:
                    var obj_query_impexamstate_action = new S2C_query_impexamstate();
                    S2C_query_impexamstate.read(obj_query_impexamstate_action, bs);
                    return obj_query_impexamstate_action;
                /** 智慧试炼结束 */
                /*			case ProtocolsEnum.SWinnerChangeTask:
                                var obj_winner_changetask_action: S2C_winner_changetask = new S2C_winner_changetask();
                                S2C_winner_changetask.read(obj_winner_changetask_action, bs);
                                return obj_winner_changetask_action;
                            case ProtocolsEnum.SGeneralSummonCommand:
                                var obj_general_summoncommand_action: S2C_general_summoncommand = new S2C_general_summoncommand();
                                S2C_general_summoncommand.read(obj_general_summoncommand_action, bs);
                                return obj_general_summoncommand_action;
                            case ProtocolsEnum.SAskQuestion:
                                var obj_ask_question_action: S2C_ask_question = new S2C_ask_question();
                                S2C_ask_question.read(obj_ask_question_action, bs);
                                return obj_ask_question_action;
                            case ProtocolsEnum.SGrabActivityReward:
                                var obj_grab_activityreward_action: S2C_grab_activityreward = new S2C_grab_activityreward();
                                S2C_grab_activityreward.read(obj_grab_activityreward_action, bs);
                                return obj_grab_activityreward_action;
                            case ProtocolsEnum.SActivityAnswerQuestionHelp:
                                var obj_activity_answerquestionhelp_action: S2C_activity_answerquestionhelp = new S2C_activity_answerquestionhelp();
                                S2C_activity_answerquestionhelp.read(obj_activity_answerquestionhelp_action, bs);
                                return obj_activity_answerquestionhelp_action;
                            case ProtocolsEnum.SVisitNpcContainChatMsg:
                                var obj_visit_npccontainchatmsg_action: S2C_visit_npccontainchatmsg = new S2C_visit_npccontainchatmsg();
                                S2C_visit_npccontainchatmsg.read(obj_visit_npccontainchatmsg_action, bs);
                                return obj_visit_npccontainchatmsg_action;*/
                case hanlder.ProtocolsEnum.SPingJi:
                    var obj_ping_ji_action = new S2C_ping_ji();
                    S2C_ping_ji.read(obj_ping_ji_action, bs);
                    return obj_ping_ji_action;
                case hanlder.ProtocolsEnum.SNpcBattleTime:
                    var obj_npc_battletime_action = new S2C_npc_battletime();
                    S2C_npc_battletime.read(obj_npc_battletime_action, bs);
                    return obj_npc_battletime_action;
                case hanlder.ProtocolsEnum.SMacthResult:
                    var obj_macth_result_action = new S2C_macth_result();
                    S2C_macth_result.read(obj_macth_result_action, bs);
                    return obj_macth_result_action;
                case hanlder.ProtocolsEnum.SSendNpcService:
                    var obj_send_npcservice_action = new S2C_send_npcservice();
                    S2C_send_npcservice.read(obj_send_npcservice_action, bs);
                    return obj_send_npcservice_action;
                case hanlder.ProtocolsEnum.SShowPetAround:
                    var obj_show_petaround_action = new S2C_show_petaround();
                    S2C_show_petaround.read(obj_show_petaround_action, bs);
                    return obj_show_petaround_action;
                case hanlder.ProtocolsEnum.SRefreshPetInfo:
                    var obj_refresh_petinfo_action = new S2C_refresh_petinfo();
                    S2C_refresh_petinfo.read(obj_refresh_petinfo_action, bs);
                    return obj_refresh_petinfo_action;
                case hanlder.ProtocolsEnum.SRefreshPetExp:
                    var obj_refresh_petexp_action = new S2C_refresh_petexp();
                    S2C_refresh_petexp.read(obj_refresh_petexp_action, bs);
                    return obj_refresh_petexp_action;
                case hanlder.ProtocolsEnum.SSetFightPet:
                    var obj_set_fightpet_action = new S2C_set_fightpet();
                    S2C_set_fightpet.read(obj_set_fightpet_action, bs);
                    return obj_set_fightpet_action;
                case hanlder.ProtocolsEnum.SSetFightPetRest:
                    var obj_set_fightpetrest_action = new S2C_set_fightpetrest();
                    S2C_set_fightpetrest.read(obj_set_fightpetrest_action, bs);
                    return obj_set_fightpetrest_action;
                case hanlder.ProtocolsEnum.SAddPetToColumn:
                    var obj_add_pettocolumn_action = new S2C_add_pettocolumn();
                    S2C_add_pettocolumn.read(obj_add_pettocolumn_action, bs);
                    return obj_add_pettocolumn_action;
                case hanlder.ProtocolsEnum.SRemovePetFromCol:
                    var obj_remove_petfromcol_action = new S2C_remove_petfromcol();
                    S2C_remove_petfromcol.read(obj_remove_petfromcol_action, bs);
                    return obj_remove_petfromcol_action;
                case hanlder.ProtocolsEnum.SGetPetcolumnInfo:
                    var obj_get_petcolumninfo_action = new S2C_get_petcolumninfo();
                    S2C_get_petcolumninfo.read(obj_get_petcolumninfo_action, bs);
                    return obj_get_petcolumninfo_action;
                case hanlder.ProtocolsEnum.SPetError:
                    var obj_pet_error_action = new S2C_pet_error();
                    S2C_pet_error.read(obj_pet_error_action, bs);
                    return obj_pet_error_action;
                case hanlder.ProtocolsEnum.SModPetName:
                    var obj_mod_petname_action = new S2C_mod_petname();
                    S2C_mod_petname.read(obj_mod_petname_action, bs);
                    return obj_mod_petname_action;
                case hanlder.ProtocolsEnum.SPetGossip:
                    var obj_pet_gossip_action = new S2C_pet_gossip();
                    S2C_pet_gossip.read(obj_pet_gossip_action, bs);
                    return obj_pet_gossip_action;
                case hanlder.ProtocolsEnum.SRefreshPetSkill:
                    var obj_refresh_petskill_action = new S2C_refresh_petskill();
                    S2C_refresh_petskill.read(obj_refresh_petskill_action, bs);
                    return obj_refresh_petskill_action;
                case hanlder.ProtocolsEnum.SShowPetInfo:
                    var obj_show_petinfo_action = new S2C_show_petinfo();
                    S2C_show_petinfo.read(obj_show_petinfo_action, bs);
                    return obj_show_petinfo_action;
                case hanlder.ProtocolsEnum.SRefreshPetColumnCapacity:
                    var obj_refresh_petcolumncapacity_action = new S2C_refresh_petcolumncapacity();
                    S2C_refresh_petcolumncapacity.read(obj_refresh_petcolumncapacity_action, bs);
                    return obj_refresh_petcolumncapacity_action;
                case hanlder.ProtocolsEnum.SRefreshPetScore:
                    var obj_refresh_petscore_action = new S2C_refresh_petscore();
                    S2C_refresh_petscore.read(obj_refresh_petscore_action, bs);
                    return obj_refresh_petscore_action;
                case hanlder.ProtocolsEnum.SPetSetAutoAddPoint:
                    var obj_pet_setautoaddpoint_action = new S2C_pet_setautoaddpoint();
                    S2C_pet_setautoaddpoint.read(obj_pet_setautoaddpoint_action, bs);
                    return obj_pet_setautoaddpoint_action;
                case hanlder.ProtocolsEnum.SPetWash:
                    var obj_pet_wash_action = new S2C_pet_wash();
                    S2C_pet_wash.read(obj_pet_wash_action, bs);
                    return obj_pet_wash_action;
                case hanlder.ProtocolsEnum.SPetSynthesize:
                    var obj_pet_synthesize_action = new S2C_pet_synthesize();
                    S2C_pet_synthesize.read(obj_pet_synthesize_action, bs);
                    return obj_pet_synthesize_action;
                case hanlder.ProtocolsEnum.SPetSkillCertification:
                    var obj_pet_skillcertification_action = new S2C_pet_skillcertification();
                    S2C_pet_skillcertification.read(obj_pet_skillcertification_action, bs);
                    return obj_pet_skillcertification_action;
                case hanlder.ProtocolsEnum.SPetAptitudeCultivate:
                    var obj_pet_aptitudecultivate_action = new S2C_pet_aptitudecultivate();
                    S2C_pet_aptitudecultivate.read(obj_pet_aptitudecultivate_action, bs);
                    return obj_pet_aptitudecultivate_action;
                case hanlder.ProtocolsEnum.SGetPetInfo:
                    var obj_get_petinfo_action = new S2C_get_petinfo();
                    S2C_get_petinfo.read(obj_get_petinfo_action, bs);
                    return obj_get_petinfo_action;
                case hanlder.ProtocolsEnum.SPetRecoverList:
                    var obj_pet_recoverlist_action = new S2C_pet_recoverlist();
                    S2C_pet_recoverlist.read(obj_pet_recoverlist_action, bs);
                    return obj_pet_recoverlist_action;
                case hanlder.ProtocolsEnum.SPetRecover:
                    var obj_pet_recover_action = new S2C_pet_recover();
                    S2C_pet_recover.read(obj_pet_recover_action, bs);
                    return obj_pet_recover_action;
                case hanlder.ProtocolsEnum.SRecoverPetInfo:
                    var obj_recover_petinfo_action = new S2C_recover_petinfo();
                    S2C_recover_petinfo.read(obj_recover_petinfo_action, bs);
                    return obj_recover_petinfo_action; /*
            case ProtocolsEnum.SBlackRoles:
                var obj_black_roles_action: S2C_black_roles = new S2C_black_roles();
                S2C_black_roles.read(obj_black_roles_action, bs);
                return obj_black_roles_action;
            case ProtocolsEnum.SSearchBlackRoleInfo:
                var obj_search_blackroleinfo_action: S2C_search_blackroleinfo = new S2C_search_blackroleinfo();
                S2C_search_blackroleinfo.read(obj_search_blackroleinfo_action, bs);
                return obj_search_blackroleinfo_action; */
                case hanlder.ProtocolsEnum.SErrorCode:
                    var obj_error_code_action = new S2C_error_code();
                    S2C_error_code.read(obj_error_code_action, bs);
                    return obj_error_code_action;
                case hanlder.ProtocolsEnum.SProductMadeUp:
                    var obj_product_madeup_action = new S2C_product_madeup();
                    S2C_product_madeup.read(obj_product_madeup_action, bs);
                    return obj_product_madeup_action;
                case hanlder.ProtocolsEnum.SRequestRankList:
                    var obj_request_ranklist_action = new S2C_request_ranklist();
                    S2C_request_ranklist.read(obj_request_ranklist_action, bs);
                    return obj_request_ranklist_action;
                case hanlder.ProtocolsEnum.SSendRankPetData:
                    var obj_send_rankpetdata_action = new S2C_send_rankpetdata();
                    S2C_send_rankpetdata.read(obj_send_rankpetdata_action, bs);
                    return obj_send_rankpetdata_action;
                case hanlder.ProtocolsEnum.SRankRoleInfo:
                    var obj_rank_roleinfo_action = new S2C_rank_roleinfo();
                    S2C_rank_roleinfo.read(obj_rank_roleinfo_action, bs);
                    return obj_rank_roleinfo_action;
                case hanlder.ProtocolsEnum.SRankRoleInfo2:
                    var obj_rank_roleinfo2_action = new S2C_rank_roleinfo2();
                    S2C_rank_roleinfo2.read(obj_rank_roleinfo2_action, bs);
                    return obj_rank_roleinfo2_action;
                case hanlder.ProtocolsEnum.SFactionRankInfo:
                    var obj_faction_rankinfo_action = new S2C_faction_rankinfo();
                    S2C_faction_rankinfo.read(obj_faction_rankinfo_action, bs);
                    return obj_faction_rankinfo_action;
                /*case ProtocolsEnum.SSendShouxiInfo:
                    var obj_send_shouxiinfo_action: S2C_send_shouxiinfo = new S2C_send_shouxiinfo();
                    S2C_send_shouxiinfo.read(obj_send_shouxiinfo_action, bs);
                    return obj_send_shouxiinfo_action;
                case ProtocolsEnum.SSendCandidates:
                    var obj_send_candidates_action: S2C_send_candidates = new S2C_send_candidates();
                    S2C_send_candidates.read(obj_send_candidates_action, bs);
                    return obj_send_candidates_action;
                case ProtocolsEnum.SVoteCandidate:
                    var obj_vote_candidate_action: S2C_vote_candidate = new S2C_vote_candidate();
                    S2C_vote_candidate.read(obj_vote_candidate_action, bs);
                    return obj_vote_candidate_action;
                case ProtocolsEnum.SMyElector:
                    var obj_my_elector_action: S2C_my_elector = new S2C_my_elector();
                    S2C_my_elector.read(obj_my_elector_action, bs);
                    return obj_my_elector_action;
                case ProtocolsEnum.SCanElect:
                    var obj_can_elect_action: S2C_can_elect = new S2C_can_elect();
                    S2C_can_elect.read(obj_can_elect_action, bs);
                    return obj_can_elect_action;
                case ProtocolsEnum.SShouxiShape:
                    var obj_shouxi_shape_action: S2C_shouxi_shape = new S2C_shouxi_shape();
                    S2C_shouxi_shape.read(obj_shouxi_shape_action, bs);
                    return obj_shouxi_shape_action;
                case ProtocolsEnum.SOldSchoolList:
                    var obj_old_schoollist_action: S2C_old_schoollist = new S2C_old_schoollist();
                    S2C_old_schoollist.read(obj_old_schoollist_action, bs);
                    return obj_old_schoollist_action;
                case ProtocolsEnum.SChangeSchoolExtInfo:
                    var obj_change_schoolextinfo_action: S2C_change_schoolextinfo = new S2C_change_schoolextinfo();
                    S2C_change_schoolextinfo.read(obj_change_schoolextinfo_action, bs);
                    return obj_change_schoolextinfo_action;
                case ProtocolsEnum.SChangeWeapon:
                    var obj_change_weapon_action: S2C_change_weapon = new S2C_change_weapon();
                    S2C_change_weapon.read(obj_change_weapon_action, bs);
                    return obj_change_weapon_action;
                case ProtocolsEnum.SChangeGem:
                    var obj_change_gem_action: S2C_change_gem = new S2C_change_gem();
                    S2C_change_gem.read(obj_change_gem_action, bs);
                    return obj_change_gem_action;*/
                case hanlder.ProtocolsEnum.SResponseShopPrice:
                    var obj_response_shopprice_action = new S2C_response_shopprice();
                    S2C_response_shopprice.read(obj_response_shopprice_action, bs);
                    return obj_response_shopprice_action;
                case hanlder.ProtocolsEnum.SQueryLimit:
                    var obj_query_limit_action = new S2C_query_limit();
                    S2C_query_limit.read(obj_query_limit_action, bs);
                    return obj_query_limit_action;
                case hanlder.ProtocolsEnum.SMarketBrowse:
                    var obj_market_browse_action = new S2C_market_browse();
                    S2C_market_browse.read(obj_market_browse_action, bs);
                    return obj_market_browse_action;
                case hanlder.ProtocolsEnum.SMarketBuy:
                    var obj_market_buy_action = new S2C_market_buy();
                    S2C_market_buy.read(obj_market_buy_action, bs);
                    return obj_market_buy_action;
                case hanlder.ProtocolsEnum.SMarketTradeLog:
                    var obj_market_tradelog_action = new S2C_market_tradelog();
                    S2C_market_tradelog.read(obj_market_tradelog_action, bs);
                    return obj_market_tradelog_action;
                case hanlder.ProtocolsEnum.SMarketContainerBrowse:
                    var obj_market_containerbrowse_action = new S2C_market_containerbrowse();
                    S2C_market_containerbrowse.read(obj_market_containerbrowse_action, bs);
                    return obj_market_containerbrowse_action;
                case hanlder.ProtocolsEnum.SMarketPetTips:
                    var obj_market_pettips_action = new S2C_market_pettips();
                    S2C_market_pettips.read(obj_market_pettips_action, bs);
                    return obj_market_pettips_action;
                case hanlder.ProtocolsEnum.SGetMarketUpPrice:
                    var obj_get_marketupprice_action = new S2C_get_marketupprice();
                    S2C_get_marketupprice.read(obj_get_marketupprice_action, bs);
                    return obj_get_marketupprice_action;
                case hanlder.ProtocolsEnum.SMarketUpSucc:
                    var obj_market_upsucc_action = new S2C_market_upsucc();
                    S2C_market_upsucc.read(obj_market_upsucc_action, bs);
                    return obj_market_upsucc_action;
                case hanlder.ProtocolsEnum.SNotifyBuySuccess:
                    var obj_notify_buysuccess_action = new S2C_notify_buysuccess();
                    S2C_notify_buysuccess.read(obj_notify_buysuccess_action, bs);
                    return obj_notify_buysuccess_action;
                //ljm
                /*case ProtocolsEnum.SGMCheckRoleID :	//GM 检测的角色ID正确时，服务器回复 GM 角色ID检测的请求， 角色ID不正确，服务器只发送提示消息
                    var obj_sgmcheck_roleid_action:S2C_sgmcheck_roleid = new S2C_sgmcheck_roleid();
                    S2C_sgmcheck_roleid.read(obj_sgmcheck_roleid_action,bs);
                    return obj_sgmcheck_roleid_action;
                case ProtocolsEnum.SCheckGM :	//GM帐号才回消息
                    var obj_SCheck_GM_action:S2C_SCheck_GM = new S2C_SCheck_GM();
                    S2C_SCheck_GM.read(obj_SCheck_GM_action,bs);
                    return obj_SCheck_GM_action;*/
                case hanlder.ProtocolsEnum.SHuobanList: //<!-- huoban协议号从 32400 到32500 结束 -->
                    var obj_SHuoban_List_action = new S2C_SHuoban_List();
                    S2C_SHuoban_List.read(obj_SHuoban_List_action, bs);
                    return obj_SHuoban_List_action;
                case hanlder.ProtocolsEnum.SHuobanDetail: //我的一个伙伴信息
                    var obj_SHuoban_Detail_action = new S2C_SHuoban_Detail();
                    S2C_SHuoban_Detail.read(obj_SHuoban_Detail_action, bs);
                    return obj_SHuoban_Detail_action;
                case hanlder.ProtocolsEnum.SZhenrongInfo: //S2C_SZhenrong_Info
                    var obj_SZhenrong_Info_action = new S2C_SZhenrong_Info();
                    S2C_SZhenrong_Info.read(obj_SZhenrong_Info_action, bs);
                    return obj_SZhenrong_Info_action;
                case hanlder.ProtocolsEnum.SChangeZhenrong: //伙伴解锁请求
                    var obj_SChange_Zhenrong_action = new S2C_SChange_Zhenrong();
                    S2C_SChange_Zhenrong.read(obj_SChange_Zhenrong_action, bs);
                    return obj_SChange_Zhenrong_action;
                case hanlder.ProtocolsEnum.SActiveHuoBan: //伙伴解锁返回
                    var obj_SActive_HuoBan_action = new S2C_SActive_HuoBan();
                    S2C_SActive_HuoBan.read(obj_SActive_HuoBan_action, bs);
                    return obj_SActive_HuoBan_action;
                case hanlder.ProtocolsEnum.SSwitchZhenfa: //改变阵容的光环返回
                    var obj_SSwitch_Zhenfa_action = new S2C_SSwitch_Zhenfa();
                    S2C_SSwitch_Zhenfa.read(obj_SSwitch_Zhenfa_action, bs);
                    return obj_SSwitch_Zhenfa_action; /*
            case ProtocolsEnum.SGongHuiFuBenLastTime :  //S2C_SGongHuiFuBen_LastTime
                var obj_SGongHuiFuBen_LastTime_action:S2C_SGongHuiFuBen_LastTime = new S2C_SGongHuiFuBen_LastTime();
                S2C_SGongHuiFuBen_LastTime.read(obj_SGongHuiFuBen_LastTime_action,bs);
                return obj_SGongHuiFuBen_LastTime_action;
            case ProtocolsEnum.SBingFengLandInfo :  //S2C_SBingFeng_LandInfo
                var obj_SBingFeng_LandInfo_action:S2C_SBingFeng_LandInfo = new S2C_SBingFeng_LandInfo();
                S2C_SBingFeng_LandInfo.read(obj_SBingFeng_LandInfo_action,bs);
                return obj_SBingFeng_LandInfo_action;
            case ProtocolsEnum.SEnterBingFengLand :  //S2C_SEnter_BingFengLand
                var obj_SEnter_BingFengLand_action:S2C_SEnter_BingFengLand = new S2C_SEnter_BingFengLand();
                S2C_SEnter_BingFengLand.read(obj_SEnter_BingFengLand_action,bs);
                return obj_SEnter_BingFengLand_action;*/
                case hanlder.ProtocolsEnum.SCanEnterBingFeng: //S2C_SCanEnter_BingFeng
                    var obj_SCanEnter_BingFeng_action = new S2C_SCanEnter_BingFeng();
                    S2C_SCanEnter_BingFeng.read(obj_SCanEnter_BingFeng_action, bs);
                    return obj_SCanEnter_BingFeng_action;
                case hanlder.ProtocolsEnum.SGetBingFengDetail: //S2C_SGetBingFeng_Detail
                    var obj_SGetBingFeng_Detail_action = new S2C_SGetBingFeng_Detail();
                    S2C_SGetBingFeng_Detail.read(obj_SGetBingFeng_Detail_action, bs);
                    return obj_SGetBingFeng_Detail_action;
                case hanlder.ProtocolsEnum.SItemNumChange: //S2C_SItemNum_Change
                    var obj_SItemNum_Change_action = new S2C_SItemNum_Change();
                    S2C_SItemNum_Change.read(obj_SItemNum_Change_action, bs);
                    return obj_SItemNum_Change_action;
                case hanlder.ProtocolsEnum.SDelItem: //S2C_SDel_Item
                    var obj_SDel_Item_action = new S2C_SDel_Item();
                    S2C_SDel_Item.read(obj_SDel_Item_action, bs);
                    return obj_SDel_Item_action;
                case hanlder.ProtocolsEnum.SGetPackInfo: //S2C_SGetPack_Info
                    var obj_SGetPack_Info_action = new S2C_SGetPack_Info();
                    S2C_SGetPack_Info.read(obj_SGetPack_Info_action, bs);
                    return obj_SGetPack_Info_action;
                case hanlder.ProtocolsEnum.SRefreshCurrency: //S2C_SRefresh_Currency
                    var obj_SRefresh_Currency_action = new S2C_SRefresh_Currency();
                    S2C_SRefresh_Currency.read(obj_SRefresh_Currency_action, bs);
                    return obj_SRefresh_Currency_action;
                case hanlder.ProtocolsEnum.SRefreshPackSize: //S2C_SRefreshPack_Size
                    var obj_SRefreshPack_Size_action = new S2C_SRefreshPack_Size();
                    S2C_SRefreshPack_Size.read(obj_SRefreshPack_Size_action, bs);
                    return obj_SRefreshPack_Size_action;
                case hanlder.ProtocolsEnum.SPetEquipAddItem: //S2C_SPetEquip_AddItem
                    var obj_SPetEquip_AddItem_action = new S2C_SPetEquip_AddItem();
                    S2C_SPetEquip_AddItem.read(obj_SPetEquip_AddItem_action, bs);
                    return obj_SPetEquip_AddItem_action;
                case hanlder.ProtocolsEnum.SGetDepotInfo: //S2C_SGetDepot_Info
                    var obj_SGetDepot_Info_action = new S2C_SGetDepot_Info();
                    S2C_SGetDepot_Info.read(obj_SGetDepot_Info_action, bs);
                    return obj_SGetDepot_Info_action;
                case hanlder.ProtocolsEnum.SModifyDepotName: //S2C_SModify_DepotName
                    var obj_SModify_DepotName_action = new S2C_SModify_DepotName();
                    S2C_SModify_DepotName.read(obj_SModify_DepotName_action, bs);
                    return obj_SModify_DepotName_action;
                case hanlder.ProtocolsEnum.SAddItem: //S2C_SAdd_Item
                    var obj_SAdd_Item_action = new S2C_SAdd_Item();
                    S2C_SAdd_Item.read(obj_SAdd_Item_action, bs);
                    return obj_SAdd_Item_action;
                case hanlder.ProtocolsEnum.SRefreshItemFlag: //S2C_SRefresh_ItemFlag
                    var obj_SRefresh_ItemFlag_action = new S2C_SRefresh_ItemFlag();
                    S2C_SRefresh_ItemFlag.read(obj_SRefresh_ItemFlag_action, bs);
                    return obj_SRefresh_ItemFlag_action;
                /*case ProtocolsEnum.SRefreshItemTimeout :  //S2C_SRefreshItem_Timeout
                    var obj_SRefreshItem_Timeout_action:S2C_SRefreshItem_Timeout = new S2C_SRefreshItem_Timeout();
                    S2C_SRefreshItem_Timeout.read(obj_SRefreshItem_Timeout_action,bs);
                    return obj_SRefreshItem_Timeout_action;
                case ProtocolsEnum.SItemPosChange :  //S2C_SItemPos_Change
                    var obj_SItemPos_Change_action:S2C_SItemPos_Change = new S2C_SItemPos_Change();
                    S2C_SItemPos_Change.read(obj_SItemPos_Change_action,bs);
                    return obj_SItemPos_Change_action;*/
                /*case ProtocolsEnum.SGetItemTips :  //S2C_SGetItem_Tips
                    S2C_SGetPack_Info.read(obj_SGetPack_Info_action,bs);
                    return obj_SGetPack_Info_action;*/
                case hanlder.ProtocolsEnum.SRefreshCurrency: //S2C_SRefresh_Currency
                    var obj_SRefresh_Currency_action = new S2C_SRefresh_Currency();
                    S2C_SRefresh_Currency.read(obj_SRefresh_Currency_action, bs);
                    return obj_SRefresh_Currency_action;
                case hanlder.ProtocolsEnum.SGetItemTips: //S2C_SGetItem_Tips
                    var obj_SGetItem_Tips_action = new S2C_SGetItem_Tips();
                    S2C_SGetItem_Tips.read(obj_SGetItem_Tips_action, bs);
                    return obj_SGetItem_Tips_action;
                case hanlder.ProtocolsEnum.SGetPetEquipTips: //S2C_SGetPetEquip_Tips
                    var obj_SGetPetEquip_Tips_action = new S2C_SGetPetEquip_Tips();
                    S2C_SGetPetEquip_Tips.read(obj_SGetPetEquip_Tips_action, bs);
                    return obj_SGetPetEquip_Tips_action;
                /*
                                case ProtocolsEnum.SCleanTempPack :  //S2C_SCleanTemp_Pack
                                    var obj_SCleanTemp_Pack_action:S2C_SCleanTemp_Pack = new S2C_SCleanTemp_Pack();
                                    S2C_SCleanTemp_Pack.read(obj_SCleanTemp_Pack_action,bs);
                                    return obj_SCleanTemp_Pack_action;*/
                case hanlder.ProtocolsEnum.SRefreshNaiJiu: //S2C_SRefresh_NaiJiu
                    var obj_SRefresh_NaiJiu_action = new S2C_SRefresh_NaiJiu();
                    S2C_SRefresh_NaiJiu.read(obj_SRefresh_NaiJiu_action, bs);
                    return obj_SRefresh_NaiJiu_action;
                case hanlder.ProtocolsEnum.SRefreshMaxNaiJiu: //S2C_SRefresh_MaxNaiJiu
                    var obj_SRefresh_MaxNaiJiu_action = new S2C_SRefresh_MaxNaiJiu();
                    S2C_SRefresh_MaxNaiJiu.read(obj_SRefresh_MaxNaiJiu_action, bs);
                    return obj_SRefresh_MaxNaiJiu_action;
                case hanlder.ProtocolsEnum.SXiuLiFailTimes: //S2C_SXiuLiFail_Times
                    var obj_SXiuLiFail_Times_action = new S2C_SXiuLiFail_Times();
                    S2C_SXiuLiFail_Times.read(obj_SXiuLiFail_Times_action, bs);
                    return obj_SXiuLiFail_Times_action;
                case hanlder.ProtocolsEnum.SGetRoleEquip: //S2C_SGetRole_Equip
                    var obj_SGetRole_Equip_action = new S2C_SGetRole_Equip();
                    S2C_SGetRole_Equip.read(obj_SGetRole_Equip_action, bs);
                    return obj_SGetRole_Equip_action;
                case hanlder.ProtocolsEnum.SPetEquipDelItem: //S2C_SPetEquip_DelItem
                    var obj_SPetEquip_DelItem_action = new S2C_SPetEquip_DelItem();
                    S2C_SPetEquip_DelItem.read(obj_SPetEquip_DelItem_action, bs);
                    return obj_SPetEquip_DelItem_action;
                /*case ProtocolsEnum.SItemSign :  //S2C_SItem_Sign
                    var obj_SItem_Sign_action:S2C_SItem_Sign = new S2C_SItem_Sign();
                    S2C_SItem_Sign.read(obj_SItem_Sign_action,bs);
                    return obj_SItem_Sign_action;
                case ProtocolsEnum.SHeChengRet :  //S2C_SHeCheng_Ret
                    var obj_SHeCheng_Ret_action:S2C_SHeCheng_Ret = new S2C_SHeCheng_Ret();
                    S2C_SHeCheng_Ret.read(obj_SHeCheng_Ret_action,bs);
                    return obj_SHeCheng_Ret_action;
                case ProtocolsEnum.SAllEquipScore :  //S2C_SAllEquip_Score
                    var obj_SAllEquip_Score_action:S2C_SAllEquip_Score = new S2C_SAllEquip_Score();
                    S2C_SAllEquip_Score.read(obj_SAllEquip_Score_action,bs);
                    return obj_SAllEquip_Score_action;*/
                case hanlder.ProtocolsEnum.SGetTimeAward: //S2C_SGetTime_Award
                    var obj_SGetTime_Award_action = new S2C_SGetTime_Award();
                    S2C_SGetTime_Award.read(obj_SGetTime_Award_action, bs);
                    return obj_SGetTime_Award_action;
                /*case ProtocolsEnum.SGetEquipTips :  //S2C_SGetEquip_Tips
                    var obj_SGetEquip_Tips_action:S2C_SGetEquip_Tips = new S2C_SGetEquip_Tips();
                    S2C_SGetEquip_Tips.read(obj_SGetEquip_Tips_action,bs);
                    return obj_SGetEquip_Tips_action;*/
                case hanlder.ProtocolsEnum.SItemAdded: //S2C_SItem_Added
                    var obj_SItem_Added_action = new S2C_SItem_Added();
                    S2C_SItem_Added.read(obj_SItem_Added_action, bs);
                    return obj_SItem_Added_action;
                case hanlder.ProtocolsEnum.SHeChengItem: //S2C_SHeCheng_Item
                    var obj_SHeCheng_Item_action = new S2C_SHeCheng_Item();
                    S2C_SHeCheng_Item.read(obj_SHeCheng_Item_action, bs);
                    return obj_SHeCheng_Item_action;
                /*case ProtocolsEnum.SHeChengPetEquip:  //S2C_SHeChengPet_Equip
                    var obj_SHeChengPet_Equip_action: S2C_SHeChengPet_Equip = new S2C_SHeChengPet_Equip();
                    S2C_SHeChengPet_Equip.read(obj_SHeChengPet_Equip_action, bs);
                    return obj_SHeChengPet_Equip_action;
                /*case ProtocolsEnum.SMailList :  //S2C_SMail_List
                    var obj_SMail_List_action:S2C_SMail_List = new S2C_SMail_List();
                    S2C_SMail_List.read(obj_SMail_List_action,bs);
                    return obj_SMail_List_action;
                case ProtocolsEnum.SMailInfo :  //S2C_SMail_Info
                    var obj_SMail_Info_action:S2C_SMail_Info = new S2C_SMail_Info();
                    S2C_SMail_Info.read(obj_SMail_Info_action,bs);
                    return obj_SMail_Info_action;
                case ProtocolsEnum.SMailState :  //S2C_SMail_State
                    var obj_SMail_State_action:S2C_SMail_State = new S2C_SMail_State();
                    S2C_SMail_State.read(obj_SMail_State_action,bs);
                    return obj_SMail_State_action;
                case ProtocolsEnum.SGetRoleInfo :  //S2C_SGetRole_Info
                    var obj_SGetRole_Info_action:S2C_SGetRole_Info = new S2C_SGetRole_Info();
                    S2C_SGetRole_Info.read(obj_SGetRole_Info_action,bs);
                    return obj_SGetRole_Info_action;
                case ProtocolsEnum.SNoticeRoleGetInfo :  //S2C_SNoticeRole_GetInfo
                    var obj_SNoticeRole_GetInfo_action:S2C_SNoticeRole_GetInfo = new S2C_SNoticeRole_GetInfo();
                    S2C_SNoticeRole_GetInfo.read(obj_SNoticeRole_GetInfo_action,bs);
                    return obj_SNoticeRole_GetInfo_action;*/
                case hanlder.ProtocolsEnum.SMulDayLogin: //S2C_SMulDayLogin
                    var obj_SMulDay_Login_action = new S2C_SMulDayLogin();
                    S2C_SMulDayLogin.read(obj_SMulDay_Login_action, bs);
                    return obj_SMulDay_Login_action;
                /*case ProtocolsEnum.SOpenPack :  //S2C_SOpen_Pack
                    var obj_SOpen_Pack_action:S2C_SOpen_Pack = new S2C_SOpen_Pack();
                    S2C_SOpen_Pack.read(obj_SOpen_Pack_action,bs);
                    return obj_SOpen_Pack_action;
                case ProtocolsEnum.SBuyPackMoney :  //S2C_SBuyPack_Money
                    var obj_SBuyPack_Money_action:S2C_SBuyPack_Money = new S2C_SBuyPack_Money();
                    S2C_SBuyPack_Money.read(obj_SBuyPack_Money_action,bs);
                    return obj_SBuyPack_Money_action;
                case ProtocolsEnum.SFreshRepairData :  //S2C_SFreshRepair_Data
                    var obj_SFreshRepair_Data_action:S2C_SFreshRepair_Data = new S2C_SFreshRepair_Data();
                    S2C_SFreshRepair_Data.read(obj_SFreshRepair_Data_action,bs);
                    return obj_SFreshRepair_Data_action;*/
                case hanlder.ProtocolsEnum.SUseEnhancementItem: //S2C_SUseEnhancement_Item
                    var obj_SUseEnhancement_Item_action = new S2C_SUseEnhancement_Item();
                    S2C_SUseEnhancement_Item.read(obj_SUseEnhancement_Item_action, bs);
                    return obj_SUseEnhancement_Item_action;
                /*case ProtocolsEnum.SReplaceGem :  //S2C_SReplace_Gem
                    var obj_SReplace_Gem_action:S2C_SReplace_Gem = new S2C_SReplace_Gem();
                    S2C_SReplace_Gem.read(obj_SReplace_Gem_action,bs);
                    return obj_SReplace_Gem_action;*/
                case hanlder.ProtocolsEnum.SOtherItemTips: //S2C_SOther_ItemTips
                    var obj_SOther_ItemTips_action = new S2C_SOther_ItemTips();
                    S2C_SOther_ItemTips.read(obj_SOther_ItemTips_action, bs);
                    return obj_SOther_ItemTips_action;
                case hanlder.ProtocolsEnum.SRepairResult: //S2C_SRepair_Result
                    var obj_SRepair_Result_action = new S2C_SRepair_Result();
                    S2C_SRepair_Result.read(obj_SRepair_Result_action, bs);
                    return obj_SRepair_Result_action;
                case hanlder.ProtocolsEnum.SRideUpdate: //S2C_SRide_Update
                    var obj_SRide_Update_action = new S2C_SRide_Update();
                    S2C_SRide_Update.read(obj_SRide_Update_action, bs);
                    return obj_SRide_Update_action;
                case hanlder.ProtocolsEnum.SItemRecoverList: //S2C_SItemRecover_List
                    var obj_SItemRecover_List_action = new S2C_SItemRecover_List();
                    S2C_SItemRecover_List.read(obj_SItemRecover_List_action, bs);
                    return obj_SItemRecover_List_action;
                case hanlder.ProtocolsEnum.SItemRecover: //S2C_SItem_Recover
                    var obj_SItem_Recover_action = new S2C_SItem_Recover();
                    S2C_SItem_Recover.read(obj_SItem_Recover_action, bs);
                    return obj_SItem_Recover_action;
                case hanlder.ProtocolsEnum.SRecoverItemInfo: //S2C_SRecoverItem_Info
                    var obj_SRecoverItem_Info_action = new S2C_SRecoverItem_Info();
                    S2C_SRecoverItem_Info.read(obj_SRecoverItem_Info_action, bs);
                    return obj_SRecoverItem_Info_action;
                case hanlder.ProtocolsEnum.SRefineEquipBase: //S2C_SRefineEquip_Base
                    var obj_SRefineEquip_Base_action = new S2C_SRefineEquip_Base();
                    S2C_SRefineEquip_Base.read(obj_SRefineEquip_Base_action, bs);
                    return obj_SRefineEquip_Base_action;
                case hanlder.ProtocolsEnum.SRefineEquipResult: //S2C_SRefineEquip_Result
                    var obj_SRefineEquip_Result_action = new S2C_SRefineEquip_Result();
                    S2C_SRefineEquip_Result.read(obj_SRefineEquip_Result_action, bs);
                    return obj_SRefineEquip_Result_action; /*
            case ProtocolsEnum.SExpFactorEffect :  //S2C_SExpFactor_Effect
                var obj_SExpFactor_Effect_action:S2C_SExpFactor_Effect = new S2C_SExpFactor_Effect();
                S2C_SExpFactor_Effect.read(obj_SExpFactor_Effect_action,bs);
                return obj_SExpFactor_Effect_action;
            case ProtocolsEnum.SLockInfo :  //S2C_SLock_Info
                var obj_SLock_Info_action:S2C_SLock_Info = new S2C_SLock_Info();
                S2C_SLock_Info.read(obj_SLock_Info_action,bs);
                return obj_SLock_Info_action;
            case ProtocolsEnum.SNeedUnlock :  //S2C_SNeedUn_lock
                var obj_SNeedUn_lock_action:S2C_SNeedUn_lock = new S2C_SNeedUn_lock();
                S2C_SNeedUn_lock.read(obj_SNeedUn_lock_action,bs);
                return obj_SNeedUn_lock_action;
            case ProtocolsEnum.SAddLockSuc :  //S2C_SAddLock_Suc
                var obj_SAddLock_Suc_action:S2C_SAddLock_Suc = new S2C_SAddLock_Suc();
                S2C_SAddLock_Suc.read(obj_SAddLock_Suc_action,bs);
                return obj_SAddLock_Suc_action;
            case ProtocolsEnum.SUnlockSuc :  //S2C_SUnlock_Suc
                var obj_SUnlock_Suc_action:S2C_SUnlock_Suc = new S2C_SUnlock_Suc();
                S2C_SUnlock_Suc.read(obj_SUnlock_Suc_action,bs);
                return obj_SUnlock_Suc_action;
            case ProtocolsEnum.SCancelLockSuc :  //S2C_SCancelLock_Suc
                var obj_SCancelLock_Suc_action:S2C_SCancelLock_Suc = new S2C_SCancelLock_Suc();
                S2C_SCancelLock_Suc.read(obj_SCancelLock_Suc_action,bs);
                return obj_SCancelLock_Suc_action;
            case ProtocolsEnum.SForceUnlockSuc :  //S2C_SForceUnlock_Suc
                var obj_SForceUnlock_Suc_action:S2C_SForceUnlock_Suc = new S2C_SForceUnlock_Suc();
                S2C_SForceUnlock_Suc.read(obj_SForceUnlock_Suc_action,bs);
                return obj_SForceUnlock_Suc_action;
            case ProtocolsEnum.SChangePasswordSuc :  //S2C_SChangePassword_Suc
                var obj_SChangePassword_Suc_action:S2C_SChangePassword_Suc = new S2C_SChangePassword_Suc();
                S2C_SChangePassword_Suc.read(obj_SChangePassword_Suc_action,bs);
                return obj_SChangePassword_Suc_action;
            case ProtocolsEnum.SUpdateLockInfo :  //S2C_SUpdateLock_Info
                var obj_SUpdateLock_Info_action:S2C_SUpdateLock_Info = new S2C_SUpdateLock_Info();
                S2C_SUpdateLock_Info.read(obj_SUpdateLock_Info_action,bs);
                return obj_SUpdateLock_Info_action;
            case ProtocolsEnum.SRegMaster :  //S2C_SReg_Master
                var obj_SReg_Master_action:S2C_SReg_Master = new S2C_SReg_Master();
                S2C_SReg_Master.read(obj_SReg_Master_action,bs);
                return obj_SReg_Master_action;
            case ProtocolsEnum.SReadyRegMaster :  //S2C_SReadyReg_Master
                var obj_SReadyReg_Master_action:S2C_SReadyReg_Master = new S2C_SReadyReg_Master();
                S2C_SReadyReg_Master.read(obj_SReadyReg_Master_action,bs);
                return obj_SReadyReg_Master_action;
            case ProtocolsEnum.SSearchMaster :  //S2C_SSearch_Master
                var obj_SSearch_Master_action:S2C_SSearch_Master = new S2C_SSearch_Master();
                S2C_SSearch_Master.read(obj_SSearch_Master_action,bs);
                return obj_SSearch_Master_action;
            case ProtocolsEnum.SRequestAsApprentice :  //S2C_SRequestAs_Apprentice
                var obj_SRequestAs_Apprentice_action:S2C_SRequestAs_Apprentice = new S2C_SRequestAs_Apprentice();
                S2C_SRequestAs_Apprentice.read(obj_SRequestAs_Apprentice_action,bs);
                return obj_SRequestAs_Apprentice_action;
            case ProtocolsEnum.SRequestPrenticeSuccess :  //S2C_SRequestPrentice_Success
                var obj_SRequestPrentice_Success_action:S2C_SRequestPrentice_Success = new S2C_SRequestPrentice_Success();
                S2C_SRequestPrentice_Success.read(obj_SRequestPrentice_Success_action,bs);
                return obj_SRequestPrentice_Success_action;
            case ProtocolsEnum.SCanAcceptPrentice :  //S2C_SCanAccept_Prentice
                var obj_SCanAccept_Prentice_action:S2C_SCanAccept_Prentice = new S2C_SCanAccept_Prentice();
                S2C_SCanAccept_Prentice.read(obj_SCanAccept_Prentice_action,bs);
                return obj_SCanAccept_Prentice_action;
            case ProtocolsEnum.SSearchPrentice :  //S2C_SSearch_Prentice
                var obj_SSearch_Prentice_action:S2C_SSearch_Prentice = new S2C_SSearch_Prentice();
                S2C_SSearch_Prentice.read(obj_SSearch_Prentice_action,bs);
                return obj_SSearch_Prentice_action;
            case ProtocolsEnum.SMasterPrenticeData :  //S2C_SMasterPrentice_Data
                var obj_SMasterPrentice_Data_action:S2C_SMasterPrentice_Data = new S2C_SMasterPrentice_Data();
                S2C_SMasterPrentice_Data.read(obj_SMasterPrentice_Data_action,bs);
                return obj_SMasterPrentice_Data_action;*/
                //wangf
                case hanlder.ProtocolsEnum.SClanLevelup: //返回公会级别信息变化
                    var obj_SClanLevelup_action = new S2C_SClanLevelup();
                    S2C_SClanLevelup.read(obj_SClanLevelup_action, bs);
                    return obj_SClanLevelup_action;
                case hanlder.ProtocolsEnum.SGrabBonus: //领取分红
                    var obj_SGrabBonus_action = new S2C_SGrabBonus();
                    S2C_SGrabBonus.read(obj_SGrabBonus_action, bs);
                    return obj_SGrabBonus_action;
                case hanlder.ProtocolsEnum.SBonusQuery: //查询分红结果
                    var obj_SBonusQuery_action = new S2C_SBonusQuery();
                    S2C_SBonusQuery.read(obj_SBonusQuery_action, bs);
                    return obj_SBonusQuery_action;
                case hanlder.ProtocolsEnum.SAcceptApply: //服务器返回接受申请人员
                    var obj_SAcceptApply_action = new S2C_SAcceptApply();
                    S2C_SAcceptApply.read(obj_SAcceptApply_action, bs);
                    return obj_SAcceptApply_action;
                case hanlder.ProtocolsEnum.SClanAim: //服务端返回公会宗旨
                    var obj_SClanAim_action = new S2C_SClanAim();
                    S2C_SClanAim.read(obj_SClanAim_action, bs);
                    return obj_SClanAim_action;
                case hanlder.ProtocolsEnum.SChangeClanName: //服务端返回公会名字
                    var obj_SChangeClanName_action = new S2C_SChangeClanName();
                    S2C_SChangeClanName.read(obj_SChangeClanName_action, bs);
                    return obj_SChangeClanName_action;
                case hanlder.ProtocolsEnum.SSearchClan: //返回搜索公会
                    var obj_SSearchClan_action = new S2C_SSearchClan();
                    S2C_SSearchClan.read(obj_SSearchClan_action, bs);
                    return obj_SSearchClan_action;
                case hanlder.ProtocolsEnum.SBannedtalk: //禁言
                    var obj_SBannedtalk_action = new S2C_SBannedtalk();
                    S2C_SBannedtalk.read(obj_SBannedtalk_action, bs);
                    return obj_SBannedtalk_action;
                case hanlder.ProtocolsEnum.SRefreshMemberList: //返回成员列表
                    var obj_SRefreshMemberList_action = new S2C_SRefreshMemberList();
                    S2C_SRefreshMemberList.read(obj_SRefreshMemberList_action, bs);
                    return obj_SRefreshMemberList_action;
                case hanlder.ProtocolsEnum.SApplyClanList: //返回申请过的公会列表
                    var obj_SApplyClanList_action = new S2C_SApplyClanList();
                    S2C_SApplyClanList.read(obj_SApplyClanList_action, bs);
                    return obj_SApplyClanList_action;
                case hanlder.ProtocolsEnum.SCancelApplyClan: //取消申请公会
                    var obj_SCancelApplyClan_action = new S2C_SCancelApplyClan();
                    S2C_SCancelApplyClan.read(obj_SCancelApplyClan_action, bs);
                    return obj_SCancelApplyClan_action;
                /*case ProtocolsEnum.SRefreshContribution :	//更新个人帮贡信息
                    var obj_SRefreshContribution_action:S2C_SRefreshContribution = new S2C_SRefreshContribution();
                    S2C_SRefreshContribution.read(obj_SRefreshContribution_action,bs);
                    return obj_SRefreshContribution_action;*/
                case hanlder.ProtocolsEnum.SOpenAutoJoinClan: //是否开启自动接收入会
                    var obj_SOpenAutoJoinClan_action = new S2C_SOpenAutoJoinClan();
                    S2C_SOpenAutoJoinClan.read(obj_SOpenAutoJoinClan_action, bs);
                    return obj_SOpenAutoJoinClan_action;
                case hanlder.ProtocolsEnum.SRequestEventInfo: //返回公会事件信息
                    var obj_SRequestEventInfo_action = new S2C_SRequestEventInfo();
                    S2C_SRequestEventInfo.read(obj_SRequestEventInfo_action, bs);
                    return obj_SRequestEventInfo_action;
                /*case ProtocolsEnum.SRequestRoleInfo :	//返回公会事件详情信息
                    var obj_SRequestRoleInfo_action:S2C_SRequestRoleInfo = new S2C_SRequestRoleInfo();
                    S2C_SRequestRoleInfo.read(obj_SRequestRoleInfo_action,bs);
                    return obj_SRequestRoleInfo_action;*/
                case hanlder.ProtocolsEnum.SBuyMedic: //返回购买药房的药品
                    var obj_SBuyMedic_action = new S2C_SBuyMedic();
                    S2C_SBuyMedic.read(obj_SBuyMedic_action, bs);
                    return obj_SBuyMedic_action;
                case hanlder.ProtocolsEnum.SRequestSelectType: //返回修改产药倍数
                    var obj_SRequestSelectType_action = new S2C_SRequestSelectType();
                    S2C_SRequestSelectType.read(obj_SRequestSelectType_action, bs);
                    return obj_SRequestSelectType_action;
                case hanlder.ProtocolsEnum.SRequestRuneInfo: //返回请求符文请求信息
                    var obj_SRequestRuneInfo_action = new S2C_SRequestRuneInfo();
                    S2C_SRequestRuneInfo.read(obj_SRequestRuneInfo_action, bs);
                    return obj_SRequestRuneInfo_action;
                /*case ProtocolsEnum.SRuneGive :	//返回捐献符文
                    var obj_SRuneGive_action:S2C_SRuneGive = new S2C_SRuneGive();
                    S2C_SRuneGive.read(obj_SRuneGive_action,bs);
                    return obj_SRuneGive_action;*/
                case hanlder.ProtocolsEnum.SRuneRequest: //请求符文
                    var obj_SRuneRequest_action = new S2C_SRuneRequest();
                    S2C_SRuneRequest.read(obj_SRuneRequest_action, bs);
                    return obj_SRuneRequest_action;
                case hanlder.ProtocolsEnum.SRequestRuneCount: //返回请求符文统计
                    var obj_SRequestRuneCount_action = new S2C_SRequestRuneCount();
                    S2C_SRequestRuneCount.read(obj_SRequestRuneCount_action, bs);
                    return obj_SRequestRuneCount_action;
                case hanlder.ProtocolsEnum.SRuneRequestView: //返回请求符文界面
                    var obj_SRuneRequestView_action = new S2C_SRuneRequestView();
                    S2C_SRuneRequestView.read(obj_SRuneRequestView_action, bs);
                    return obj_SRuneRequestView_action;
                case hanlder.ProtocolsEnum.SClanRedTip: //通知客户端红点信息  value=0 没有红点  value=1有红点
                    var obj_SClanRedTip_action = new S2C_SClanRedTip();
                    S2C_SClanRedTip.read(obj_SClanRedTip_action, bs);
                    return obj_SClanRedTip_action;
                case hanlder.ProtocolsEnum.SRefreshRoleClan: //服务器返回该玩家是否有公会
                    var obj_SRefreshRoleClan_action = new S2C_SRefreshRoleClan();
                    S2C_SRefreshRoleClan.read(obj_SRefreshRoleClan_action, bs);
                    return obj_SRefreshRoleClan_action;
                case hanlder.ProtocolsEnum.SClanInvitationView: //客户端请求邀请界面
                    var obj_SClanInvitationView_action = new S2C_SClanInvitationView();
                    S2C_SClanInvitationView.read(obj_SClanInvitationView_action, bs);
                    return obj_SClanInvitationView_action;
                case hanlder.ProtocolsEnum.SRequestSearchRole: //搜索好成功
                    var obj_SRequestSearchRole_action = new S2C_SRequestSearchRole();
                    S2C_SRequestSearchRole.read(obj_SRequestSearchRole_action, bs);
                    return obj_SRequestSearchRole_action;
                case hanlder.ProtocolsEnum.SChangeClanInst: //改变公会副本成功
                    var obj_SChangeClanInst_action = new S2C_SChangeClanInst();
                    S2C_SChangeClanInst.read(obj_SChangeClanInst_action, bs);
                    return obj_SChangeClanInst_action;
                case hanlder.ProtocolsEnum.SRequestImpeachMentView: //返回发起界面
                    var obj_SRequestImpeachMentView_action = new S2C_SRequestImpeachMentView();
                    S2C_SRequestImpeachMentView.read(obj_SRequestImpeachMentView_action, bs);
                    return obj_SRequestImpeachMentView_action;
                case hanlder.ProtocolsEnum.SGetClanFightList: //返回对战列表
                    var obj_SGetClanFightList_action = new S2C_SGetClanFightList();
                    S2C_SGetClanFightList.read(obj_SGetClanFightList_action, bs);
                    return obj_SGetClanFightList_action;
                /*case ProtocolsEnum.SBattleFieldScore :	//公会战时统计
                    var obj_SBattleFieldScore_action:S2C_SBattleFieldScore = new S2C_SBattleFieldScore();
                    S2C_SBattleFieldScore.read(obj_SBattleFieldScore_action,bs);
                    return obj_SBattleFieldScore_action;

                case ProtocolsEnum.SBattleFieldAct :	//公会战时统计
                    var obj_SBattleFieldAct_action:S2C_SBattleFieldAct = new S2C_SBattleFieldAct();
                    S2C_SBattleFieldAct.read(obj_SBattleFieldAct_action,bs);
                    return obj_SBattleFieldAct_action;

                case ProtocolsEnum.SBattleFieldRankList :	//公会战时统计
                    var obj_SBattleFieldRankList_action:S2C_SBattleFieldRankList = new S2C_SBattleFieldRankList();
                    S2C_SBattleFieldRankList.read(obj_SBattleFieldRankList_action,bs);
                    return obj_SBattleFieldRankList_action;

                case ProtocolsEnum.SBattleFieldInfo :	//公会战时信息
                    var obj_SBattleFieldInfo_action:S2C_SBattleFieldInfo = new S2C_SBattleFieldInfo();
                    S2C_SBattleFieldInfo.read(obj_SBattleFieldInfo_action,bs);
                    return obj_SBattleFieldInfo_action;

                case ProtocolsEnum.SRequestRoleIsEnemy :	//请求是否是敌对
                    var obj_SRequestRoleIsEnemy_action:S2C_SRequestRoleIsEnemy = new S2C_SRequestRoleIsEnemy();
                    S2C_SRequestRoleIsEnemy.read(obj_SRequestRoleIsEnemy_action,bs);
                    return obj_SRequestRoleIsEnemy_action;

                case ProtocolsEnum.SClanFightOver :	//战场结束
                    var obj_SClanFightOver_action:S2C_SClanFightOver = new S2C_SClanFightOver();
                    S2C_SClanFightOver.read(obj_SClanFightOver_action,bs);
                    return obj_SClanFightOver_action;

                case ProtocolsEnum.SLeaveBattleField :	//离开战场
                    var obj_SLeaveBattleField_action:S2C_SLeaveBattleField = new S2C_SLeaveBattleField();
                    S2C_SLeaveBattleField.read(obj_SLeaveBattleField_action,bs);
                    return obj_SLeaveBattleField_action;*/
                case hanlder.ProtocolsEnum.SGetClearTime: //得到下次清零时间
                    var obj_SGetClearTime_action = new S2C_SGetClearTime();
                    S2C_SGetClearTime.read(obj_SGetClearTime_action, bs);
                    return obj_SGetClearTime_action;
                /*case ProtocolsEnum.SendRoleInfo :	//<!--  跨服和原服之间的协议  start  协议号从25000 协议号从25499 -->
                    var obj_SendRoleInfo_action:S2C_SendRoleInfo = new S2C_SendRoleInfo();
                    S2C_SendRoleInfo.read(obj_SendRoleInfo_action,bs);
                    return obj_SendRoleInfo_action;

                case ProtocolsEnum.SendRoleInfo_Rep :
                    var obj_SendRoleInfo_Rep_action:S2C_SendRoleInfo_Rep = new S2C_SendRoleInfo_Rep();
                    S2C_SendRoleInfo_Rep.read(obj_SendRoleInfo_Rep_action,bs);
                    return obj_SendRoleInfo_Rep_action;

                case ProtocolsEnum.SendRoleData :
                    var obj_SendRoleData_action:S2C_SendRoleData = new S2C_SendRoleData();
                    S2C_SendRoleData.read(obj_SendRoleData_action,bs);
                    return obj_SendRoleData_action;

                case ProtocolsEnum.SendWordMsg :
                    var obj_SendWordMsg_action:S2C_SendWordMsg = new S2C_SendWordMsg();
                    S2C_SendWordMsg.read(obj_SendWordMsg_action,bs);
                    return obj_SendWordMsg_action;

                case ProtocolsEnum.SCReqCrosserInfo :
                    var obj_SCReqCrosserInfo_action:S2C_SCReqCrosserInfo = new S2C_SCReqCrosserInfo();
                    S2C_SCReqCrosserInfo.read(obj_SCReqCrosserInfo_action,bs);
                    return obj_SCReqCrosserInfo_action;

                case ProtocolsEnum.SCCreateRoom :
                    var obj_SCCreateRoom_action:S2C_SCCreateRoom = new S2C_SCCreateRoom();
                    S2C_SCCreateRoom.read(obj_SCCreateRoom_action,bs);
                    return obj_SCCreateRoom_action;

                case ProtocolsEnum.SCReqRoomInfos :
                    var obj_SCReqRoomInfos_action:S2C_SCReqRoomInfos = new S2C_SCReqRoomInfos();
                    S2C_SCReqRoomInfos.read(obj_SCReqRoomInfos_action,bs);
                    return obj_SCReqRoomInfos_action;

                case ProtocolsEnum.SCLeaveRoom :
                    var obj_SCLeaveRoom_action:S2C_SCLeaveRoom = new S2C_SCLeaveRoom();
                    S2C_SCLeaveRoom.read(obj_SCLeaveRoom_action,bs);
                    return obj_SCLeaveRoom_action;

                case ProtocolsEnum.SCStandCross :
                    var obj_SCStandCross_action:S2C_SCStandCross = new S2C_SCStandCross();
                    S2C_SCStandCross.read(obj_SCStandCross_action,bs);
                    return obj_SCStandCross_action;

                case ProtocolsEnum.SCEnterRoom :
                    var obj_SCEnterRoom_action:S2C_SCEnterRoom = new S2C_SCEnterRoom();
                    S2C_SCEnterRoom.read(obj_SCEnterRoom_action,bs);
                    return obj_SCEnterRoom_action;

                case ProtocolsEnum.SCRoomStand :
                    var obj_SCRoomStand_action:S2C_SCRoomStand = new S2C_SCRoomStand();
                    S2C_SCRoomStand.read(obj_SCRoomStand_action,bs);
                    return obj_SCRoomStand_action;

                case ProtocolsEnum.SCReqRoomInfo :
                    var obj_SCReqRoomInfo_action:S2C_SCReqRoomInfo = new S2C_SCReqRoomInfo();
                    S2C_SCReqRoomInfo.read(obj_SCReqRoomInfo_action,bs);
                    return obj_SCReqRoomInfo_action;

                case ProtocolsEnum.SCChangeCrosserForm :
                    var obj_SCChangeCrosserForm_action:S2C_SCChangeCrosserForm = new S2C_SCChangeCrosserForm();
                    S2C_SCChangeCrosserForm.read(obj_SCChangeCrosserForm_action,bs);
                    return obj_SCChangeCrosserForm_action;

                case ProtocolsEnum.SCChangeRoomPwd :
                    var obj_SCChangeRoomPwd_action:S2C_SCChangeRoomPwd = new S2C_SCChangeRoomPwd();
                    S2C_SCChangeRoomPwd.read(obj_SCChangeRoomPwd_action,bs);
                    return obj_SCChangeRoomPwd_action;

                case ProtocolsEnum.SCModifyCrossMoney :
                    var obj_SCModifyCrossMoney_action:S2C_SCModifyCrossMoney = new S2C_SCModifyCrossMoney();
                    S2C_SCModifyCrossMoney.read(obj_SCModifyCrossMoney_action,bs);
                    return obj_SCModifyCrossMoney_action;

                case ProtocolsEnum.SCEndCross :
                    var obj_SCEndCross_action:S2C_SCEndCross = new S2C_SCEndCross();
                    S2C_SCEndCross.read(obj_SCEndCross_action,bs);
                    return obj_SCEndCross_action;

                case ProtocolsEnum.SCReqTTBonus :
                    var obj_SCReqTTBonus_action:S2C_SCReqTTBonus = new S2C_SCReqTTBonus();
                    S2C_SCReqTTBonus.read(obj_SCReqTTBonus_action,bs);
                    return obj_SCReqTTBonus_action;

                case ProtocolsEnum.SCResultTTBonus :
                    var obj_SCResultTTBonus_action:S2C_SCResultTTBonus = new S2C_SCResultTTBonus();
                    S2C_SCResultTTBonus.read(obj_SCResultTTBonus_action,bs);
                    return obj_SCResultTTBonus_action;

                case ProtocolsEnum.SCInvitJoinRoom :
                    var obj_SCInvitJoinRoom_action:S2C_SCInvitJoinRoom = new S2C_SCInvitJoinRoom();
                    S2C_SCInvitJoinRoom.read(obj_SCInvitJoinRoom_action,bs);
                    return obj_SCInvitJoinRoom_action;

                case ProtocolsEnum.SCReqCrossRankList :
                    var obj_SCReqCrossRankList_action:S2C_SCReqCrossRankList = new S2C_SCReqCrossRankList();
                    S2C_SCReqCrossRankList.read(obj_SCReqCrossRankList_action,bs);
                    return obj_SCReqCrossRankList_action;

                case ProtocolsEnum.SCKickoffRoom :
                    var obj_SCKickoffRoom_action:S2C_SCKickoffRoom = new S2C_SCKickoffRoom();
                    S2C_SCKickoffRoom.read(obj_SCKickoffRoom_action,bs);
                    return obj_SCKickoffRoom_action;

                case ProtocolsEnum.SCAddCrossIntegral :
                    var obj_SCAddCrossIntegral_action:S2C_SCAddCrossIntegral = new S2C_SCAddCrossIntegral();
                    S2C_SCAddCrossIntegral.read(obj_SCAddCrossIntegral_action,bs);
                    return obj_SCAddCrossIntegral_action;

                case ProtocolsEnum.SCCrossLvUp :
                    var obj_SCCrossLvUp_action:S2C_SCCrossLvUp = new S2C_SCCrossLvUp();
                    S2C_SCCrossLvUp.read(obj_SCCrossLvUp_action,bs);
                    return obj_SCCrossLvUp_action;

                case ProtocolsEnum.SCSetRoomOwner :
                    var obj_SCSetRoomOwner_action:S2C_SCSetRoomOwner = new S2C_SCSetRoomOwner();
                    S2C_SCSetRoomOwner.read(obj_SCSetRoomOwner_action,bs);
                    return obj_SCSetRoomOwner_action;

                case ProtocolsEnum.SCSwapRoomMember :
                    var obj_SCSwapRoomMember_action:S2C_SCSwapRoomMember = new S2C_SCSwapRoomMember();
                    S2C_SCSwapRoomMember.read(obj_SCSwapRoomMember_action,bs);
                    return obj_SCSwapRoomMember_action;

                case ProtocolsEnum.SBeginCorssServer :
                    var obj_SBeginCorssServer_action:S2C_SBeginCorssServer = new S2C_SBeginCorssServer();
                    S2C_SBeginCorssServer.read(obj_SBeginCorssServer_action,bs);
                    return obj_SBeginCorssServer_action;

                case ProtocolsEnum.SSendCrosserInfo :
                    var obj_SSendCrosserInfo_action:S2C_SSendCrosserInfo = new S2C_SSendCrosserInfo();
                    S2C_SSendCrosserInfo.read(obj_SSendCrosserInfo_action,bs);
                    return obj_SSendCrosserInfo_action;

                case ProtocolsEnum.SSendRoomInfos :
                    var obj_SSendRoomInfos_action:S2C_SSendRoomInfos = new S2C_SSendRoomInfos();
                    S2C_SSendRoomInfos.read(obj_SSendRoomInfos_action,bs);
                    return obj_SSendRoomInfos_action;

                case ProtocolsEnum.SUpdataRoomInfo :
                    var obj_SUpdataRoomInfo_action:S2C_SUpdataRoomInfo = new S2C_SUpdataRoomInfo();
                    S2C_SUpdataRoomInfo.read(obj_SUpdataRoomInfo_action,bs);
                    return obj_SUpdataRoomInfo_action;

                case ProtocolsEnum.SLeaveRoom :
                    var obj_SLeaveRoom_action:S2C_SLeaveRoom = new S2C_SLeaveRoom();
                    S2C_SLeaveRoom.read(obj_SLeaveRoom_action,bs);
                    return obj_SLeaveRoom_action;

                case ProtocolsEnum.SStandCross :
                    var obj_SStandCross_action:S2C_SStandCross = new S2C_SStandCross();
                    S2C_SStandCross.read(obj_SStandCross_action,bs);
                    return obj_SStandCross_action;

                case ProtocolsEnum.SNotifyMsg :
                    var obj_SNotifyMsg_action:S2C_SNotifyMsg = new S2C_SNotifyMsg();
                    S2C_SNotifyMsg.read(obj_SNotifyMsg_action,bs);
                    return obj_SNotifyMsg_action;

                case ProtocolsEnum.SRoomStand :
                    var obj_SRoomStand_action:S2C_SRoomStand = new S2C_SRoomStand();
                    S2C_SRoomStand.read(obj_SRoomStand_action,bs);
                    return obj_SRoomStand_action;

                case ProtocolsEnum.SCrossBattleInfo :
                    var obj_SCrossBattleInfo_action:S2C_SCrossBattleInfo = new S2C_SCrossBattleInfo();
                    S2C_SCrossBattleInfo.read(obj_SCrossBattleInfo_action,bs);
                    return obj_SCrossBattleInfo_action;

                case ProtocolsEnum.SCrossBattleMemberState :
                    var obj_SCrossBattleMemberState_action:S2C_SCrossBattleMemberState = new S2C_SCrossBattleMemberState();
                    S2C_SCrossBattleMemberState.read(obj_SCrossBattleMemberState_action,bs);
                    return obj_SCrossBattleMemberState_action;

                case ProtocolsEnum.SCrossBattleResult :
                    var obj_SCrossBattleResult_action:S2C_SCrossBattleResult = new S2C_SCrossBattleResult();
                    S2C_SCrossBattleResult.read(obj_SCrossBattleResult_action,bs);
                    return obj_SCrossBattleResult_action;

                case ProtocolsEnum.SChangeCrosserForm :
                    var obj_SChangeCrosserForm_action:S2C_SChangeCrosserForm = new S2C_SChangeCrosserForm();
                    S2C_SChangeCrosserForm.read(obj_SChangeCrosserForm_action,bs);
                    return obj_SChangeCrosserForm_action;

                case ProtocolsEnum.SResultTTBonus :
                    var obj_SResultTTBonus_action:S2C_SResultTTBonus = new S2C_SResultTTBonus();
                    S2C_SResultTTBonus.read(obj_SResultTTBonus_action,bs);
                    return obj_SResultTTBonus_action;

                case ProtocolsEnum.SInvitJoinRoom :
                    var obj_SInvitJoinRoom_action:S2C_SInvitJoinRoom = new S2C_SInvitJoinRoom();
                    S2C_SInvitJoinRoom.read(obj_SInvitJoinRoom_action,bs);
                    return obj_SInvitJoinRoom_action;

                case ProtocolsEnum.SReqCrossRankList :
                    var obj_SReqCrossRankList_action:S2C_SReqCrossRankList = new S2C_SReqCrossRankList();
                    S2C_SReqCrossRankList.read(obj_SReqCrossRankList_action,bs);
                    return obj_SReqCrossRankList_action;

                case ProtocolsEnum.SKickoffRoom :
                    var obj_SKickoffRoom_action:S2C_SKickoffRoom = new S2C_SKickoffRoom();
                    S2C_SKickoffRoom.read(obj_SKickoffRoom_action,bs);
                    return obj_SKickoffRoom_action;

                case ProtocolsEnum.SEnterLeaveHell :
                    var obj_SEnterLeaveHell_action:S2C_SEnterLeaveHell = new S2C_SEnterLeaveHell();
                    S2C_SEnterLeaveHell.read(obj_SEnterLeaveHell_action,bs);
                    return obj_SEnterLeaveHell_action;

                case ProtocolsEnum.SSwapRoomMember :
                    var obj_SSwapRoomMember_action:S2C_SSwapRoomMember = new S2C_SSwapRoomMember();
                    S2C_SSwapRoomMember.read(obj_SSwapRoomMember_action,bs);
                    return obj_SSwapRoomMember_action;

                case ProtocolsEnum.SEndCross :
                    var obj_SEndCross_action:S2C_SEndCross = new S2C_SEndCross();
                    S2C_SEndCross.read(obj_SEndCross_action,bs);
                    return obj_SEndCross_action;

                case ProtocolsEnum.SFriendsInfoInit :
                    var obj_SFriendsInfoInit_action:S2C_SFriendsInfoInit = new S2C_SFriendsInfoInit();
                    S2C_SFriendsInfoInit.read(obj_SFriendsInfoInit_action,bs);
                    return obj_SFriendsInfoInit_action;*/
                case hanlder.ProtocolsEnum.SFriendsOnline:
                    var obj_SFriendsOnline_action = new S2C_SFriendsOnline();
                    S2C_SFriendsOnline.read(obj_SFriendsOnline_action, bs);
                    return obj_SFriendsOnline_action;
                /*case ProtocolsEnum.SFriendMessageToRole :
                    var obj_SFriendMessageToRole_action:S2C_SFriendMessageToRole = new S2C_SFriendMessageToRole();
                    S2C_SFriendMessageToRole.read(obj_SFriendMessageToRole_action,bs);
                    return obj_SFriendMessageToRole_action;

                case ProtocolsEnum.SStrangerMessageToRole :
                    var obj_SStrangerMessageToRole_action:S2C_SStrangerMessageToRole = new S2C_SStrangerMessageToRole();
                    S2C_SStrangerMessageToRole.read(obj_SStrangerMessageToRole_action,bs);
                    return obj_SStrangerMessageToRole_action;

                case ProtocolsEnum.SOffLineMsgMessageToRole :
                    var obj_SOffLineMsgMessageToRole_action:S2C_SOffLineMsgMessageToRole = new S2C_SOffLineMsgMessageToRole();
                    S2C_SOffLineMsgMessageToRole.read(obj_SOffLineMsgMessageToRole_action,bs);
                    return obj_SOffLineMsgMessageToRole_action;

                case ProtocolsEnum.SBreakOffRelation :
                    var obj_SBreakOffRelation_action:S2C_SBreakOffRelation = new S2C_SBreakOffRelation();
                    S2C_SBreakOffRelation.read(obj_SBreakOffRelation_action,bs);
                    return obj_SBreakOffRelation_action;

                case ProtocolsEnum.SAddFriend :
                    var obj_SAddFriend_action:S2C_SAddFriend = new S2C_SAddFriend();
                    S2C_SAddFriend.read(obj_SAddFriend_action,bs);
                    return obj_SAddFriend_action;

                case ProtocolsEnum.SChangeBaseConfig :
                    var obj_SChangeBaseConfig_action:S2C_SChangeBaseConfig = new S2C_SChangeBaseConfig();
                    S2C_SChangeBaseConfig.read(obj_SChangeBaseConfig_action,bs);
                    return obj_SChangeBaseConfig_action;

                case ProtocolsEnum.SRequestUpdateRoleInfo:
                    var obj_SRequestUpdateRoleInfo_action: S2C_SRequestUpdateRoleInfo = new S2C_SRequestUpdateRoleInfo();
                    S2C_SRequestUpdateRoleInfo.read(obj_SRequestUpdateRoleInfo_action, bs);
                    return obj_SRequestUpdateRoleInfo_action;

                case ProtocolsEnum.SRequestSpaceRoleInfo :
                    var obj_SRequestSpaceRoleInfo_action:S2C_SRequestSpaceRoleInfo = new S2C_SRequestSpaceRoleInfo();
                    S2C_SRequestSpaceRoleInfo.read(obj_SRequestSpaceRoleInfo_action,bs);
                    return obj_SRequestSpaceRoleInfo_action;

                case ProtocolsEnum.SUpdateFriendLevel :
                    var obj_SUpdateFriendLevel_action:S2C_SUpdateFriendLevel = new S2C_SUpdateFriendLevel();
                    S2C_SUpdateFriendLevel.read(obj_SUpdateFriendLevel_action,bs);
                    return obj_SUpdateFriendLevel_action;

                case ProtocolsEnum.SSendSystemMessageToRole :	// 聊天S-->C
                    var obj_SSendSystemMessageToRole_action:S2C_SSendSystemMessageToRole = new S2C_SSendSystemMessageToRole();
                    S2C_SSendSystemMessageToRole.read(obj_SSendSystemMessageToRole_action,bs);
                    return obj_SSendSystemMessageToRole_action;

                case ProtocolsEnum.SJionCamp :	//加入阵营
                    var obj_SJionCamp_action:S2C_SJionCamp = new S2C_SJionCamp();
                    S2C_SJionCamp.read(obj_SJionCamp_action,bs);
                    return obj_SJionCamp_action;

                case ProtocolsEnum.SSearchFriend :	//搜索好友成功S->C
                    var obj_SSearchFriend_action:S2C_SSearchFriend = new S2C_SSearchFriend();
                    S2C_SSearchFriend.read(obj_SSearchFriend_action,bs);
                    return obj_SSearchFriend_action;

                case ProtocolsEnum.SUpdateFriendState :
                    var obj_SUpdateFriendState_action:S2C_SUpdateFriendState = new S2C_SUpdateFriendState();
                    S2C_SUpdateFriendState.read(obj_SUpdateFriendState_action,bs);
                    return obj_SUpdateFriendState_action;

                case ProtocolsEnum.SRecommendFriend :	//服务器返回推荐好友
                    var obj_SRecommendFriend_action:S2C_SRecommendFriend = new S2C_SRecommendFriend();
                    S2C_SRecommendFriend.read(obj_SRecommendFriend_action,bs);
                    return obj_SRecommendFriend_action;

                case ProtocolsEnum.FinishCopyRole :
                    var obj_FinishCopyRole_action:S2C_FinishCopyRole = new S2C_FinishCopyRole();
                    S2C_FinishCopyRole.read(obj_FinishCopyRole_action,bs);
                    return obj_FinishCopyRole_action;
                    
                //sugq
                case ProtocolsEnum.SGiveInfoList :	//<!-- 服务器返回好友赠送信息列表 -->
                    var obj_give_infolist_action:S2C_give_infolist = new S2C_give_infolist();
                    S2C_give_infolist.read(obj_give_infolist_action,bs);
                    return obj_give_infolist_action;

                case ProtocolsEnum.SGiveItem :	//<!-- 赠送道具结果 -->
                    var obj_giveitem_action:S2C_give_item = new S2C_give_item();
                    S2C_give_item.read(obj_giveitem_action,bs);
                    return obj_giveitem_action;

                case ProtocolsEnum.SGiveGift :	//<!-- 赠送礼物结果 -->
                    var obj_givegift_action:S2C_give_gift = new S2C_give_gift();
                    S2C_give_gift.read(obj_givegift_action,bs);
                    return obj_givegift_action;

                case ProtocolsEnum.SGetSpaceInfo :	//<!-- 获取某角色空间数据结果 -->
                    var obj_get_spaceinfo_action:S2C_get_sapceinfo = new S2C_get_sapceinfo();
                    S2C_get_sapceinfo.read(obj_get_spaceinfo_action,bs);
                    return obj_get_spaceinfo_action;

                case ProtocolsEnum.SSetSpaceGift :	//<!-- 放置角色空间礼物结果 -->
                    var obj_set_spacegift_action:S2C_set_spacegift = new S2C_set_spacegift();
                    S2C_set_spacegift.read(obj_set_spacegift_action,bs);
                    return obj_set_spacegift_action;

                case ProtocolsEnum.SStepSpace :	//<!-- 踩某个角色空间结果 -->
                    var obj_step_space_action:S2C_step_space = new S2C_step_space();
                    S2C_step_space.read(obj_step_space_action,bs);
                    return obj_step_space_action;

                case ProtocolsEnum.SGetRolesLevel :	//<!-- 返回一批角色等级 -->
                    var obj_get_roleslevel_action:S2C_get_roleslevel = new S2C_get_roleslevel();
                    S2C_get_roleslevel.read(obj_get_roleslevel_action,bs);
                    return obj_get_roleslevel_action;

                case ProtocolsEnum.SXshSpace :	//<!-- 踩说不得大师空间结果 -->
                    var obj_xsh_space_action:S2C_xshSpace = new S2C_xshSpace();
                    S2C_xshSpace.read(obj_xsh_space_action,bs);
                    return obj_xsh_space_action;

                case ProtocolsEnum.SXshGiveGift :	//<!-- 赠送说不得大师礼物结果 -->
                    var obj_xsh_givegift_action:S2C_xshgivegift = new S2C_xshgivegift();
                    S2C_xshgivegift.read(obj_xsh_givegift_action,bs);
                    return obj_xsh_givegift_action;

                case ProtocolsEnum.SGetXshSpaceInfo :	//<!-- 获取说不得大师空间数据结果 -->
                    var obj_get_xshspaceinfo_action:S2C_get_xshspaceinfo = new S2C_get_xshspaceinfo();
                    S2C_get_xshspaceinfo.read(obj_get_xshspaceinfo_action,bs);
                    return obj_get_xshspaceinfo_action;

                case ProtocolsEnum.SGetRecruitAward :	//<!-- 招募结果 -->
                    var obj_get_recruitAward_action:S2C_get_recruitAward = new S2C_get_recruitAward();
                    S2C_get_recruitAward.read(obj_get_recruitAward_action,bs);
                    return obj_get_recruitAward_action;

                case ProtocolsEnum.SReqRecruitWheel :	//<!-- 请求招募大转盘信息结果 -->
                    var obj_req_recruitwheel_action:S2C_req_recruitwheel = new S2C_req_recruitwheel();
                    S2C_req_recruitwheel.read(obj_req_recruitwheel_action,bs);
                    return obj_req_recruitwheel_action;

                case ProtocolsEnum.SBeginRecruitWheel :	//<!-- 开始转招募大转盘结果 -->
                    var obj_begin_recruitwheel_action:S2C_begin_recruitwheel = new S2C_begin_recruitwheel();
                    S2C_begin_recruitwheel.read(obj_begin_recruitwheel_action,bs);
                    return obj_begin_recruitwheel_action;

                case ProtocolsEnum.SSignList :	//<!-- 签名列表 key=角色id value=签名内容 -->
                    var obj_signlist_action:S2C_signlist = new S2C_signlist();
                    S2C_signlist.read(obj_signlist_action,bs);
                    return obj_signlist_action;

                case ProtocolsEnum.SRequestMarry :	//<!-- 申请结婚结果(广播给队员) -->
                    var obj_request_marry_action:S2C_request_marry = new S2C_request_marry();
                    S2C_request_marry.read(obj_request_marry_action,bs);
                    return obj_request_marry_action;

                case ProtocolsEnum.SRespondMarry :	//<!-- 响应结婚申请结果(广播给队员) -->
                    var obj_respond_marry_action:S2C_respond_marry = new S2C_respond_marry();
                    S2C_respond_marry.read(obj_respond_marry_action,bs);
                    return obj_respond_marry_action;

                case ProtocolsEnum.SGetMarriageInfo :	//<!-- 返还玩家婚姻信息 -->
                    var obj_get_marriageinfo_action:S2C_get_marriageinfo = new S2C_get_marriageinfo();
                    S2C_get_marriageinfo.read(obj_get_marriageinfo_action,bs);
                    return obj_get_marriageinfo_action;

                case ProtocolsEnum.SRequestWedding :	//<!-- 申请举办婚宴结果 -->
                    var obj_request_wedding_action:S2C_request_wedding = new S2C_request_wedding();
                    S2C_request_wedding.read(obj_request_wedding_action,bs);
                    return obj_request_wedding_action;

                case ProtocolsEnum.SInviteFriend :	//<!-- 通知被邀请的好友 -->
                    var obj_SInviteFriend_action:S2C_SInviteFriend = new S2C_SInviteFriend();
                    S2C_SInviteFriend.read(obj_SInviteFriend_action,bs);
                    return obj_SInviteFriend_action;

                case ProtocolsEnum.SWeddingBegin :	//<!-- 婚宴开始(广播婚宴地图所有玩家) -->
                    var obj_SWeddingBegin_action:S2C_SWeddingBegin = new S2C_SWeddingBegin();
                    S2C_SWeddingBegin.read(obj_SWeddingBegin_action,bs);
                    return obj_SWeddingBegin_action;

                case ProtocolsEnum.SRespondWeddingInvite :	//<!-- 好友响应邀请结果 -->
                    var obj_SRespondWeddingInvite_action:S2C_SRespondWeddingInvite = new S2C_SRespondWeddingInvite();
                    S2C_SRespondWeddingInvite.read(obj_SRespondWeddingInvite_action,bs);
                    return obj_SRespondWeddingInvite_action;

                case ProtocolsEnum.SGiveAsPresent :	//<!-- 赠送新人礼物结果 -->
                    var obj_SGiveAsPresent_action:S2C_SGiveAsPresent = new S2C_SGiveAsPresent();
                    S2C_SGiveAsPresent.read(obj_SGiveAsPresent_action,bs);
                    return obj_SGiveAsPresent_action;

                case ProtocolsEnum.SBeginWeddingRoll :	//<!-- 婚礼roll点开始(广播所有参加婚礼的玩家) -->
                    var obj_SBeginWeddingRoll_action:S2C_SBeginWeddingRoll = new S2C_SBeginWeddingRoll();
                    S2C_SBeginWeddingRoll.read(obj_SBeginWeddingRoll_action,bs);
                    return obj_SBeginWeddingRoll_action;

                case ProtocolsEnum.SWeddingEnd :	//<!-- 婚宴结束(广播所有参加婚礼的玩家) -->
                    var obj_SWeddingEnd_action:S2C_SWeddingEnd = new S2C_SWeddingEnd();
                    S2C_SWeddingEnd.read(obj_SWeddingEnd_action,bs);
                    return obj_SWeddingEnd_action;

                case ProtocolsEnum.SRequestForcibleDivorce :	//<!-- 申请强制离婚结果 -->
                    var obj_SRequestForcibleDivorce_action:S2C_SRequestForcibleDivorce = new S2C_SRequestForcibleDivorce();
                    S2C_SRequestForcibleDivorce.read(obj_SRequestForcibleDivorce_action,bs);
                    return obj_SRequestForcibleDivorce_action;

                case ProtocolsEnum.SRefuseForcibleDivorce :	//<!-- 拒绝强制离婚结果 -->
                    var obj_SRefuseForcibleDivorce_action:S2C_SRefuseForcibleDivorce = new S2C_SRefuseForcibleDivorce();
                    S2C_SRefuseForcibleDivorce.read(obj_SRefuseForcibleDivorce_action,bs);
                    return obj_SRefuseForcibleDivorce_action;

                case ProtocolsEnum.SCancelForcibleDivorce :	//<!-- 确取消强制离婚结果 -->
                    var obj_SCancelForcibleDivorce_action:S2C_SCancelForcibleDivorce = new S2C_SCancelForcibleDivorce();
                    S2C_SCancelForcibleDivorce.read(obj_SCancelForcibleDivorce_action,bs);
                    return obj_SCancelForcibleDivorce_action;

                case ProtocolsEnum.SConfirmForcibleDivorce :	//<!-- 确认强制离婚结果 -->
                    var obj_SConfirmForcibleDivorce_action:S2C_SConfirmForcibleDivorce = new S2C_SConfirmForcibleDivorce();
                    S2C_SConfirmForcibleDivorce.read(obj_SConfirmForcibleDivorce_action,bs);
                    return obj_SConfirmForcibleDivorce_action;

                case ProtocolsEnum.SRequestPeacefulDivorce :	//<!-- 申请协议离婚结果 -->
                    var obj_SRequestPeacefulDivorce_action:S2C_SRequestPeacefulDivorce = new S2C_SRequestPeacefulDivorce();
                    S2C_SRequestPeacefulDivorce.read(obj_SRequestPeacefulDivorce_action,bs);
                    return obj_SRequestPeacefulDivorce_action;

                case ProtocolsEnum.SRespondPeacefulDivorce :	//<!-- 响应协议离婚申请结果 -->
                    var obj_SRespondPeacefulDivorce_action:S2C_SRespondPeacefulDivorce = new S2C_SRespondPeacefulDivorce();
                    S2C_SRespondPeacefulDivorce.read(obj_SRespondPeacefulDivorce_action,bs);
                    return obj_SRespondPeacefulDivorce_action;

                case ProtocolsEnum.SGetMarriageSkillInfo :	//<!-- 响应请求婚姻技能信息 -->
                    var obj_SGetMarriageSkillInfo_action:S2C_SGetMarriageSkillInfo = new S2C_SGetMarriageSkillInfo();
                    S2C_SGetMarriageSkillInfo.read(obj_SGetMarriageSkillInfo_action,bs);
                    return obj_SGetMarriageSkillInfo_action;

                case ProtocolsEnum.SStudyMarriageSkill :	//<!-- 请求学习婚姻技能结果 -->
                    var obj_SStudyMarriageSkill_action:S2C_SStudyMarriageSkill = new S2C_SStudyMarriageSkill();
                    S2C_SStudyMarriageSkill.read(obj_SStudyMarriageSkill_action,bs);
                    return obj_SStudyMarriageSkill_action;

                case ProtocolsEnum.SRefreshMarriageMission :	//<!-- 结婚任务协议 20331-20350 -->
                    var obj_SRefreshMarriageMission_action:S2C_SRefreshMarriageMission = new S2C_SRefreshMarriageMission();
                    S2C_SRefreshMarriageMission.read(obj_SRefreshMarriageMission_action,bs);
                    return obj_SRefreshMarriageMission_action;*/
                case hanlder.ProtocolsEnum.SReqFushiNum: //<!-- 通知客户端刷新符石的数量 -->
                    var obj_SReqFushiNum_action = new S2C_SReqFushiNum();
                    S2C_SReqFushiNum.read(obj_SReqFushiNum_action, bs);
                    return obj_SReqFushiNum_action;
                case hanlder.ProtocolsEnum.SReqCharge: //<!-- 符石商品的列表 -->
                    var obj_SReqCharge_action = new S2C_SReqCharge();
                    S2C_SReqCharge.read(obj_SReqCharge_action, bs);
                    return obj_SReqCharge_action;
                case hanlder.ProtocolsEnum.SConfirmCharge: //<!--  -->
                    var obj_SConfirmCharge_action = new S2C_SConfirmCharge();
                    S2C_SConfirmCharge.read(obj_SConfirmCharge_action, bs);
                    return obj_SConfirmCharge_action;
                case hanlder.ProtocolsEnum.SRefreshChargeState: //<!-- 服务器同步充值状态-->
                    var obj_SRefreshChargeState_action = new S2C_SRefreshChargeState();
                    S2C_SRefreshChargeState.read(obj_SRefreshChargeState_action, bs);
                    return obj_SRefreshChargeState_action;
                case hanlder.ProtocolsEnum.SRspServerId: //<!-- -->
                    var obj_SRspServerId_action = new S2C_SRspServerId();
                    S2C_SRspServerId.read(obj_SRspServerId_action, bs);
                    return obj_SRspServerId_action;
                case hanlder.ProtocolsEnum.SRequestChargeReturnProfit: //<!-- 返回充值返利数据-->
                    var obj_SRequestChargeReturnProfit_action = new S2C_SRequestChargeReturnProfit();
                    S2C_SRequestChargeReturnProfit.read(obj_SRequestChargeReturnProfit_action, bs);
                    return obj_SRequestChargeReturnProfit_action;
                /*case ProtocolsEnum.SGrabChargeReturnProfitReward :	//<!-- 领取结果 by changhao-->
                    var obj_SGrabChargeReturnProfitReward_action:S2C_SGrabChargeReturnProfitReward = new S2C_SGrabChargeReturnProfitReward();
                    S2C_SGrabChargeReturnProfitReward.read(obj_SGrabChargeReturnProfitReward_action,bs);
                    return obj_SGrabChargeReturnProfitReward_action;

                case ProtocolsEnum.SReqChargeRefundsInfo :	//<!-- 返回封测充值返还数据-->
                    var obj_SReqChargeRefundsInfo_action:S2C_SReqChargeRefundsInfo = new S2C_SReqChargeRefundsInfo();
                    S2C_SReqChargeRefundsInfo.read(obj_SReqChargeRefundsInfo_action,bs);
                    return obj_SReqChargeRefundsInfo_action;

                case ProtocolsEnum.SGetChargeRefunds :	//<!-- 领取封测充值返还数据结果-->
                    var obj_SGetChargeRefunds_action:S2C_SGetChargeRefunds = new S2C_SGetChargeRefunds();
                    S2C_SGetChargeRefunds.read(obj_SGetChargeRefunds_action,bs);
                    return obj_SGetChargeRefunds_action;*/
                case hanlder.ProtocolsEnum.SSendVipInfo: //<!-- -->
                    var obj_SSendVipInfo_action = new S2C_SSendVipInfo();
                    S2C_SSendVipInfo.read(obj_SSendVipInfo_action, bs);
                    return obj_SSendVipInfo_action;
                /*case ProtocolsEnum.SReqFushiInfo :	//<!-- -->
                    var obj_SReqFushiInfo_action:S2C_SReqFushiInfo = new S2C_SReqFushiInfo();
                    S2C_SReqFushiInfo.read(obj_SReqFushiInfo_action,bs);
                    return obj_SReqFushiInfo_action;*/
                case hanlder.ProtocolsEnum.SSendRedPackView: //<!--返回红包界面 -->
                    var obj_SSendRedPackView_action = new S2C_SSendRedPackView();
                    S2C_SSendRedPackView.read(obj_SSendRedPackView_action, bs);
                    return obj_SSendRedPackView_action;
                case hanlder.ProtocolsEnum.SSendRedPack: //<!--发送红包成功返回 -->
                    var obj_SSendRedPack_action = new S2C_SSendRedPack();
                    S2C_SSendRedPack.read(obj_SSendRedPack_action, bs);
                    return obj_SSendRedPack_action;
                case hanlder.ProtocolsEnum.SGetRedPack: //<!--返回领取红包 -->
                    var obj_SGetRedPack_action = new S2C_SGetRedPack();
                    S2C_SGetRedPack.read(obj_SGetRedPack_action, bs);
                    return obj_SGetRedPack_action;
                case hanlder.ProtocolsEnum.SSendRedPackHisView: //<!--返回红包历史 -->
                    var obj_SSendRedPackHisView_action = new S2C_SSendRedPackHisView();
                    S2C_SSendRedPackHisView.read(obj_SSendRedPackHisView_action, bs);
                    return obj_SSendRedPackHisView_action;
                case hanlder.ProtocolsEnum.SSendRedPackRoleRecordView: //<!--查看玩家红包记录 -->
                    var obj_SSendRedPackRoleRecordView_action = new S2C_SSendRedPackRoleRecordView();
                    S2C_SSendRedPackRoleRecordView.read(obj_SSendRedPackRoleRecordView_action, bs);
                    return obj_SSendRedPackRoleRecordView_action;
                case hanlder.ProtocolsEnum.SNoticeRedPack: //<!--推送红包信息 -->
                    var obj_SNoticeRedPack_action = new S2C_SNoticeRedPack();
                    S2C_SNoticeRedPack.read(obj_SNoticeRedPack_action, bs);
                    return obj_SNoticeRedPack_action;
                case hanlder.ProtocolsEnum.SNoticeRedPackList: //<!--上线推送红包信息 -->
                    var obj_SNoticeRedPackList_action = new S2C_SNoticeRedPackList();
                    S2C_SNoticeRedPackList.read(obj_SNoticeRedPackList_action, bs);
                    return obj_SNoticeRedPackList_action;
                /*case ProtocolsEnum.SPayServerType :	//<!-- -->
                    var obj_SPayServerType_action:S2C_SPayServerType = new S2C_SPayServerType();
                    S2C_SPayServerType.read(obj_SPayServerType_action,bs);
                    return obj_SPayServerType_action;

                case ProtocolsEnum.SHaveDayPay :	//<!-- 是否已经消耗日卡-->
                    var obj_SHaveDayPay_action:S2C_SHaveDayPay = new S2C_SHaveDayPay();
                    S2C_SHaveDayPay.read(obj_SHaveDayPay_action,bs);
                    return obj_SHaveDayPay_action;

                case ProtocolsEnum.SQueryConsumeDayPay :	//<!-- 询问是否发送消耗点卡-->
                    var obj_SQueryConsumeDayPay_action:S2C_SQueryConsumeDayPay = new S2C_SQueryConsumeDayPay();
                    S2C_SQueryConsumeDayPay.read(obj_SQueryConsumeDayPay_action,bs);
                    return obj_SQueryConsumeDayPay_action;

                case ProtocolsEnum.SConsumeDayPay :	//<!-- 消耗点卡-->
                    var obj_SConsumeDayPay_action:S2C_SConsumeDayPay = new S2C_SConsumeDayPay();
                    S2C_SConsumeDayPay.read(obj_SConsumeDayPay_action,bs);
                    return obj_SConsumeDayPay_action;

                case ProtocolsEnum.SQuerySubscribeInfo :	//<!-- 返回订阅信息-->
                    var obj_SQuerySubscribeInfo_action:S2C_SQuerySubscribeInfo = new S2C_SQuerySubscribeInfo();
                    S2C_SQuerySubscribeInfo.read(obj_SQuerySubscribeInfo_action,bs);
                    return obj_SQuerySubscribeInfo_action;

                case ProtocolsEnum.SBuySpotCard :	//<!-- -->
                    var obj_SBuySpotCard_action:S2C_SBuySpotCard = new S2C_SBuySpotCard();
                    S2C_SBuySpotCard.read(obj_SBuySpotCard_action,bs);
                    return obj_SBuySpotCard_action;

                case ProtocolsEnum.SSellSpotCard :	//<!-- -->
                    var obj_SSellSpotCard_action:S2C_SSellSpotCard = new S2C_SSellSpotCard();
                    S2C_SSellSpotCard.read(obj_SSellSpotCard_action,bs);
                    return obj_SSellSpotCard_action;

                case ProtocolsEnum.STradingSpotCardView :	//<!-- 交易区界面-->
                    var obj_STradingSpotCardView_action:S2C_STradingSpotCardView = new S2C_STradingSpotCardView();
                    S2C_STradingSpotCardView.read(obj_STradingSpotCardView_action,bs);
                    return obj_STradingSpotCardView_action;

                case ProtocolsEnum.SRoleTradingView :	//<!-- 个人买卖界面-->
                    var obj_SRoleTradingView_action:S2C_SRoleTradingView = new S2C_SRoleTradingView();
                    S2C_SRoleTradingView.read(obj_SRoleTradingView_action,bs);
                    return obj_SRoleTradingView_action;

                case ProtocolsEnum.SRoleTradingRecordView :	//<!-- 个人买卖记录界面-->
                    var obj_SRoleTradingRecordView_action:S2C_SRoleTradingRecordView = new S2C_SRoleTradingRecordView();
                    S2C_SRoleTradingRecordView.read(obj_SRoleTradingRecordView_action,bs);
                    return obj_SRoleTradingRecordView_action;

                case ProtocolsEnum.SCancelTrading :	//<!-- 撤销订单-->
                    var obj_SCancelTrading_action:S2C_SCancelTrading = new S2C_SCancelTrading();
                    S2C_SCancelTrading.read(obj_SCancelTrading_action,bs);
                    return obj_SCancelTrading_action;

                case ProtocolsEnum.STradingOpenState :	//<!-- 交易所功能是否开启-->
                    var obj_STradingOpenState_action:S2C_STradingOpenState = new S2C_STradingOpenState();
                    S2C_STradingOpenState.read(obj_STradingOpenState_action,bs);
                    return obj_STradingOpenState_action;*/
                case hanlder.ProtocolsEnum.SMonthCard: //<!-- 返回月卡结束时间戳-->
                    var obj_SMonthCard_action = new S2C_SMonthCard();
                    S2C_SMonthCard.read(obj_SMonthCard_action, bs);
                    return obj_SMonthCard_action;
                /*case ProtocolsEnum.SBeginSchoolWheel :	//<!-- -->
                    var obj_SBeginSchoolWheel_action:S2C_SBeginSchoolWheel = new S2C_SBeginSchoolWheel();
                    S2C_SBeginSchoolWheel.read(obj_SBeginSchoolWheel_action,bs);
                    return obj_SBeginSchoolWheel_action;

                case ProtocolsEnum.SBeginXueYueWheel :	//<!-- -->
                    var obj_SBeginXueYueWheel_action:S2C_SBeginXueYueWheel = new S2C_SBeginXueYueWheel();
                    S2C_SBeginXueYueWheel.read(obj_SBeginXueYueWheel_action,bs);
                    return obj_SBeginXueYueWheel_action;

                case ProtocolsEnum.SUseXueYueKey :	//<!-- -->
                    var obj_SUseXueYueKey_action:S2C_SUseXueYueKey = new S2C_SUseXueYueKey();
                    S2C_SUseXueYueKey.read(obj_SUseXueYueKey_action,bs);
                    return obj_SUseXueYueKey_action;

                case ProtocolsEnum.SRoleAccusation :	//<!-- -->
                    var obj_SRoleAccusation_action:S2C_SRoleAccusation = new S2C_SRoleAccusation();
                    S2C_SRoleAccusation.read(obj_SRoleAccusation_action,bs);
                    return obj_SRoleAccusation_action;

                case ProtocolsEnum.SRoleAccusationCheck :	//<!-- -->
                    var obj_SRoleAccusationCheck_action:S2C_SRoleAccusationCheck = new S2C_SRoleAccusationCheck();
                    S2C_SRoleAccusationCheck.read(obj_SRoleAccusationCheck_action,bs);
                    return obj_SRoleAccusationCheck_action;

                case ProtocolsEnum.SRefreshRoleHookData :	//<!-- 服务器刷新挂机数据-->
                    var obj_SRefreshRoleHookData_action:S2C_SRefreshRoleHookData = new S2C_SRefreshRoleHookData();
                    S2C_SRefreshRoleHookData.read(obj_SRefreshRoleHookData_action,bs);
                    return obj_SRefreshRoleHookData_action;*/
                case hanlder.ProtocolsEnum.SRefreshRoleHookBattleData: //<!-- 服务器刷新挂机战斗相关数据-->
                    var obj_SRefreshRoleHookBattleData_action = new S2C_SRefreshRoleHookBattleData();
                    S2C_SRefreshRoleHookBattleData.read(obj_SRefreshRoleHookBattleData_action, bs);
                    return obj_SRefreshRoleHookBattleData_action;
                case hanlder.ProtocolsEnum.SRefreshRoleHookExpData: //<!-- 服务器刷新挂机经验相关数据-->
                    var obj_SRefreshRoleHookExpData_action = new S2C_SRefreshRoleHookExpData();
                    S2C_SRefreshRoleHookExpData.read(obj_SRefreshRoleHookExpData_action, bs);
                    return obj_SRefreshRoleHookExpData_action;
                case hanlder.ProtocolsEnum.SFlushRoleFightAI: //<!-- 刷新人物战斗ai-->
                    var obj_SFlushRoleFightAI_action = new S2C_SFlushRoleFightAI();
                    S2C_SFlushRoleFightAI.read(obj_SFlushRoleFightAI_action, bs);
                    return obj_SFlushRoleFightAI_action;
                case hanlder.ProtocolsEnum.SAttentionGoods: //<!--物品关注成功-->
                    var obj_attention_goods_action = new S2C_attention_goods();
                    S2C_attention_goods.read(obj_attention_goods_action, bs);
                    return obj_attention_goods_action;
                case hanlder.ProtocolsEnum.SEnterFuBen: //队员同意进入精英副本
                    var obj_enter_fuben = new S2C_EnterFuBen();
                    S2C_EnterFuBen.read(obj_enter_fuben, bs);
                    return obj_enter_fuben;
                case hanlder.ProtocolsEnum.SMarketSearchResult: //<!--珍品装备和珍品宠物搜索-->
                    var obj_market_searchresult_action = new S2C_market_searchresult();
                    S2C_market_searchresult.read(obj_market_searchresult_action, bs);
                    return obj_market_searchresult_action;
                /*
                case ProtocolsEnum.SMarketItemChatShow:
                    var obj_marketItem_chatshow_action: S2C_marketItem_chatshow = new S2C_marketItem_chatshow();
                    S2C_marketItem_chatshow.read(obj_marketItem_chatshow_action, bs)
                    return obj_marketItem_chatshow_action;
                case ProtocolsEnum.STempMarketContainer:
                    var obj_temp_marketcontainer_action: S2C_temp_marketcontainer = new S2C_temp_marketcontainer();
                    S2C_temp_marketcontainer.read(obj_temp_marketcontainer_action, bs)
                    return obj_temp_marketcontainer_action;
                case ProtocolsEnum.STakeBackTempMarketContainerItem:
                    var obj_take_backtempmarketcontainerItem_action: S2C_take_backtempmarketcontainerItem = new S2C_take_backtempmarketcontainerItem();
                    S2C_take_backtempmarketcontainerItem.read(obj_take_backtempmarketcontainerItem_action, bs)
                    return obj_take_backtempmarketcontainerItem_action;
                case ProtocolsEnum.SGoldOrderBrowseBlackMarket:
                    var obj_gold_orderbrowseblackmarket_action: S2C_gold_orderbrowseblackmarket = new S2C_gold_orderbrowseblackmarket();
                    S2C_gold_orderbrowseblackmarket.read(obj_gold_orderbrowseblackmarket_action, bs)
                    return obj_gold_orderbrowseblackmarket_action;

                case ProtocolsEnum.SGoldOrderUpBlackMarket:
                    var obj_gold_orderupblackmarket_action: S2C_gold_orderupblackmarket = new S2C_gold_orderupblackmarket();
                    S2C_gold_orderupblackmarket.read(obj_gold_orderupblackmarket_action, bs)
                    return obj_gold_orderupblackmarket_action;
                case ProtocolsEnum.SRefreshGoldOrderState:
                    var obj_refresh_goldorderstate_action: S2C_refresh_goldorderstate = new S2C_refresh_goldorderstate();
                    S2C_refresh_goldorderstate.read(obj_refresh_goldorderstate_action, bs)
                    return obj_refresh_goldorderstate_action;
                case ProtocolsEnum.SGoldOrderDownBlackMarket:
                    var obj_gold_orderdownblackmarket_action: S2C_gold_orderdownblackmarket = new S2C_gold_orderdownblackmarket();
                    S2C_gold_orderdownblackmarket.read(obj_gold_orderdownblackmarket_action, bs)
                    return obj_gold_orderdownblackmarket_action;
                case ProtocolsEnum.SItemOrderUpBlackMarket:
                    var obj_item_orderupblackmarket_action: S2C_item_orderupblackmarket = new S2C_item_orderupblackmarket();
                    S2C_item_orderupblackmarket.read(obj_item_orderupblackmarket_action, bs)
                    return obj_item_orderupblackmarket_action;
                case ProtocolsEnum.SRefreshItemOrderState:
                    var obj_refresh_itemorderstate_action: S2C_refresh_itemorderstate = new S2C_refresh_itemorderstate();
                    S2C_refresh_itemorderstate.read(obj_refresh_itemorderstate_action, bs)
                    return obj_refresh_itemorderstate_action;
                case ProtocolsEnum.SItemOrderDownBlackMarket:
                    var obj_item_orderdownblackmarket_action: S2C_item_orderdownblackmarket = new S2C_item_orderdownblackmarket();
                    S2C_item_orderdownblackmarket.read(obj_item_orderdownblackmarket_action, bs)
                    return obj_item_orderdownblackmarket_action;
                case ProtocolsEnum.SItemOrderBrowseBlackMarket:
                    var obj_item_orderbrowseblackmarket_action: S2C_item_orderbrowseblackmarket = new S2C_item_orderbrowseblackmarket();
                    S2C_item_orderbrowseblackmarket.read(obj_item_orderbrowseblackmarket_action, bs)
                    return obj_item_orderbrowseblackmarket_action;*/
                case hanlder.ProtocolsEnum.SSkillError:
                    var obj_skill_error_action = new S2C_skill_error();
                    S2C_skill_error.read(obj_skill_error_action, bs);
                    return obj_skill_error_action;
                /*case ProtocolsEnum.SUpdateAssistSkill:
                    var obj_update_assistskill_action: S2C_update_assistskill = new S2C_update_assistskill();
                    S2C_update_assistskill.read(obj_update_assistskill_action, bs)
                    return obj_update_assistskill_action;
                case ProtocolsEnum.SSendAssistSkillMaxLevels:
                    var obj_send_assistskillmaxlevels_action: S2C_send_assistskillmaxlevels = new S2C_send_assistskillmaxlevels();
                    S2C_send_assistskillmaxlevels.read(obj_send_assistskillmaxlevels_action, bs)
                    return obj_send_assistskillmaxlevels_action;
                case ProtocolsEnum.SSendSpecialSkills:
                    var obj_send_specialskills_action: S2C_send_specialskills = new S2C_send_specialskills();
                    S2C_send_specialskills.read(obj_send_specialskills_action, bs)
                    return obj_send_specialskills_action;
                case ProtocolsEnum.SUpdateInborn:
                    var obj_update_inborn_action: S2C_update_inborn = new S2C_update_inborn();
                    S2C_update_inborn.read(obj_update_inborn_action, bs)
                    return obj_update_inborn_action;

                case ProtocolsEnum.SSendInborns:
                    var obj_send_inborns_action: S2C_send_inborns = new S2C_send_inborns();
                    S2C_send_inborns.read(obj_send_inborns_action, bs)
                    return obj_send_inborns_action;
                case ProtocolsEnum.SUpdateExtSkill:
                    var obj_update_extskill_action: S2C_update_extskill = new S2C_update_extskill();
                    S2C_update_extskill.read(obj_update_extskill_action, bs)
                    return obj_update_extskill_action;
                case ProtocolsEnum.SRequestParticleSkillList:
                    var obj_request_particleskilllist_action: S2C_request_particleskilllist = new S2C_request_particleskilllist();
                    S2C_request_particleskilllist.read(obj_request_particleskilllist_action, bs)
                    return obj_request_particleskilllist_action;
                case ProtocolsEnum.SUpdateLearnParticleSkill:
                    var obj_update_learnparticleskill_action: S2C_update_learnparticleskill = new S2C_update_learnparticleskill();
                    S2C_update_learnparticleskill.read(obj_update_learnparticleskill_action, bs)
                    return obj_update_learnparticleskill_action;
                case ProtocolsEnum.SRequestLiveSkillList:
                    var obj_request_liveskilllist_action: S2C_request_liveskilllist = new S2C_request_liveskilllist();
                    S2C_request_liveskilllist.read(obj_request_liveskilllist_action, bs)
                    return obj_request_liveskilllist_action;
                case ProtocolsEnum.SUpdateLearnLiveSkill:
                    var obj_update_learnliveskill_action: S2C_update_learnliveskill = new S2C_update_learnliveskill();
                    S2C_update_learnliveskill.read(obj_update_learnliveskill_action, bs)
                    return obj_update_learnliveskill_action;
                case ProtocolsEnum.SLiveSkillMakeStuff:
                    var obj_live_skillmakestuff_action: S2C_live_skillmakestuff = new S2C_live_skillmakestuff();
                    S2C_live_skillmakestuff.read(obj_live_skillmakestuff_action, bs)
                    return obj_live_skillmakestuff_action;
                case ProtocolsEnum.SLiveSkillMakeDrug:
                    var obj_live_skillmakedrug_action: S2C_live_skillmakedrug = new S2C_live_skillmakedrug();
                    S2C_live_skillmakedrug.read(obj_live_skillmakedrug_action, bs)
                    return obj_live_skillmakedrug_action;
                case ProtocolsEnum.SLiveSkillMakeFood:
                    var obj_live_skillsakefood_action: S2C_live_skillsakefood = new S2C_live_skillsakefood();
                    S2C_live_skillsakefood.read(obj_live_skillsakefood_action, bs)
                    return obj_live_skillsakefood_action;
                case ProtocolsEnum.SLiveSkillMakeFriendGift:
                    var obj_live_skillmakefriendgift_action: S2C_live_skillmakefriendgift = new S2C_live_skillmakefriendgift();
                    S2C_live_skillmakefriendgift.read(obj_live_skillmakefriendgift_action, bs)
                    return obj_live_skillmakefriendgift_action;
                case ProtocolsEnum.SLiveSkillMakeEnhancement:
                    var obj_live_skillmakeenhancement_action: S2C_live_skillmakeenhancement = new S2C_live_skillmakeenhancement();
                    S2C_live_skillmakeenhancement.read(obj_live_skillmakeenhancement_action, bs)
                    return obj_live_skillmakeenhancement_action;

                case ProtocolsEnum.SLiveSkillMakeFarm:
                    var obj_live_skillmakefarm_action: S2C_live_skillmakefarm = new S2C_live_skillmakefarm();
                    S2C_live_skillmakefarm.read(obj_live_skillmakefarm_action, bs)
                    return obj_live_skillmakefarm_action;
                case ProtocolsEnum.SLiveSkillMakeCard:
                    var obj_live_skillmakecard_action: S2C_live_skillmakecard = new S2C_live_skillmakecard();
                    S2C_live_skillmakecard.read(obj_live_skillmakecard_action, bs)
                    return obj_live_skillmakecard_action;
                case ProtocolsEnum.SShapeCardInfoList:
                    var obj_shape_cardInfolist_action: S2C_shape_cardInfolist = new S2C_shape_cardInfolist();
                    S2C_shape_cardInfolist.read(obj_shape_cardInfolist_action, bs)
                    return obj_shape_cardInfolist_action;
                case ProtocolsEnum.SAddShapeCardPoint:
                    var obj_add_shapecardpoint_action: S2C_add_shapecardpoint = new S2C_add_shapecardpoint();
                    S2C_add_shapecardpoint.read(obj_add_shapecardpoint_action, bs)
                    return obj_add_shapecardpoint_action;
                case ProtocolsEnum.SUseShapeCard:
                    var obj_use_shapecard_action: S2C_use_shapecard = new S2C_use_shapecard();
                    S2C_use_shapecard.read(obj_use_shapecard_action, bs)
                    return obj_use_shapecard_action;
                case ProtocolsEnum.SUseRoleShape:
                    var obj_use_roleshape_action: S2C_use_roleshape = new S2C_use_roleshape();
                    S2C_use_roleshape.read(obj_use_roleshape_action, bs)
                    return obj_use_roleshape_action;*/
                case hanlder.ProtocolsEnum.STransChatMessage2Client:
                    var obj_trans_chatmessage2client_action = new S2C_trans_chatmessage2client();
                    S2C_trans_chatmessage2client.read(obj_trans_chatmessage2client_action, bs);
                    return obj_trans_chatmessage2client_action;
                case hanlder.ProtocolsEnum.STransChatMessageNotify2Client:
                    var obj_trans_chatmessagenotify2client_action = new S2C_trans_chatmessagenotify2client();
                    S2C_trans_chatmessagenotify2client.read(obj_trans_chatmessagenotify2client_action, bs);
                    return obj_trans_chatmessagenotify2client_action;
                case hanlder.ProtocolsEnum.SDropInstance:
                    var obj_dropInstance = new S2C_dropInstance();
                    S2C_dropInstance.read(obj_dropInstance, bs);
                    return obj_dropInstance;
                case hanlder.ProtocolsEnum.SChatItemTips:
                    var obj_chatItem_tips_action = new S2C_chatItem_tips();
                    S2C_chatItem_tips.read(obj_chatItem_tips_action, bs);
                    return obj_chatItem_tips_action;
                /*case ProtocolsEnum.SExpMessageTips:
                    var obj_exp_messagetips_action: S2C_exp_messagetips = new S2C_exp_messagetips();
                    S2C_exp_messagetips.read(obj_exp_messagetips_action, bs)
                    return obj_exp_messagetips_action;
                case ProtocolsEnum.SChatHelpResult:
                    var obj_chat_helpresult_action: S2C_chat_helpresult = new S2C_chat_helpresult();
                    S2C_chat_helpresult.read(obj_chat_helpresult_action, bs)
                    return obj_chat_helpresult_action;*/
                case hanlder.ProtocolsEnum.SCreateTeam:
                    var obj_create_team_action = new S2C_create_team();
                    S2C_create_team.read(obj_create_team_action, bs);
                    return obj_create_team_action;
                case hanlder.ProtocolsEnum.SAddTeamMember:
                    var obj_add_teammember_action = new S2C_add_teammember();
                    S2C_add_teammember.read(obj_add_teammember_action, bs);
                    return obj_add_teammember_action;
                case hanlder.ProtocolsEnum.SAddTeamApply:
                    var obj_add_teamapply_action = new S2C_add_teamapply();
                    S2C_add_teamapply.read(obj_add_teamapply_action, bs);
                    return obj_add_teamapply_action;
                case hanlder.ProtocolsEnum.SRemoveTeamMember:
                    var obj_remove_teamMember_action = new S2C_remove_teamMember();
                    S2C_remove_teamMember.read(obj_remove_teamMember_action, bs);
                    return obj_remove_teamMember_action;
                case hanlder.ProtocolsEnum.SRemoveTeamApply:
                    var obj_remove_teamapply_action = new S2C_remove_teamapply();
                    S2C_remove_teamapply.read(obj_remove_teamapply_action, bs);
                    return obj_remove_teamapply_action;
                case hanlder.ProtocolsEnum.SAbsentReturnTeam:
                    var obj_absent_returnteam_action = new S2C_absent_returnteam();
                    S2C_absent_returnteam.read(obj_absent_returnteam_action, bs);
                    return obj_absent_returnteam_action;
                case hanlder.ProtocolsEnum.SSetTeamLeader:
                    var obj_set_teamleader_action = new S2C_set_teamleader();
                    S2C_set_teamleader.read(obj_set_teamleader_action, bs);
                    return obj_set_teamleader_action;
                case hanlder.ProtocolsEnum.SInviteJoinTeam:
                    var obj_invite_jointeam_action = new S2C_invite_jointeam();
                    S2C_invite_jointeam.read(obj_invite_jointeam_action, bs);
                    return obj_invite_jointeam_action;
                case hanlder.ProtocolsEnum.SSwapMember:
                    var obj_swap_member_action = new S2C_swap_member();
                    S2C_swap_member.read(obj_swap_member_action, bs);
                    return obj_swap_member_action;
                case hanlder.ProtocolsEnum.SAskforSetLeader:
                    var obj_askfor_setleader_action = new S2C_askfor_setleader();
                    S2C_askfor_setleader.read(obj_askfor_setleader_action, bs);
                    return obj_askfor_setleader_action;
                case hanlder.ProtocolsEnum.SAskforCallBack:
                    var obj_askfor_callback_action = new S2C_askfor_callback();
                    S2C_askfor_callback.read(obj_askfor_callback_action, bs);
                    return obj_askfor_callback_action;
                case hanlder.ProtocolsEnum.SUpdateMemberState:
                    var obj_update_memberstate_action = new S2C_update_memberstate();
                    S2C_update_memberstate.read(obj_update_memberstate_action, bs);
                    return obj_update_memberstate_action;
                case hanlder.ProtocolsEnum.SUpdateMemberLevel:
                    var obj_update_memberlevel_action = new S2C_update_memberlevel();
                    S2C_update_memberlevel.read(obj_update_memberlevel_action, bs);
                    return obj_update_memberlevel_action;
                case hanlder.ProtocolsEnum.SUpdateMemberHPMP:
                    var obj_update_memberhpmp_action = new S2C_update_memberhpmp();
                    S2C_update_memberhpmp.read(obj_update_memberhpmp_action, bs);
                    return obj_update_memberhpmp_action;
                case hanlder.ProtocolsEnum.SUpdateMemberMaxHPMP:
                    var obj_update_membermaxhpmp_action = new S2C_update_membermaxhpmp();
                    S2C_update_membermaxhpmp.read(obj_update_membermaxhpmp_action, bs);
                    return obj_update_membermaxhpmp_action;
                case hanlder.ProtocolsEnum.SSetTeamLevel:
                    var obj_set_teamlevel_action = new S2C_set_teamlevel();
                    S2C_set_teamlevel.read(obj_set_teamlevel_action, bs);
                    return obj_set_teamlevel_action;
                case hanlder.ProtocolsEnum.SDismissTeam:
                    var obj_dismiss_team_action = new S2C_dismiss_team();
                    S2C_dismiss_team.read(obj_dismiss_team_action, bs);
                    return obj_dismiss_team_action;
                case hanlder.ProtocolsEnum.SMemberSequence:
                    var obj_member_sequence_action = new S2C_member_sequence();
                    S2C_member_sequence.read(obj_member_sequence_action, bs);
                    return obj_member_sequence_action;
                case hanlder.ProtocolsEnum.STeamError:
                    var obj_team_error_action = new S2C_team_error();
                    S2C_team_error.read(obj_team_error_action, bs);
                    return obj_team_error_action;
                case hanlder.ProtocolsEnum.SRequestJoinSucc:
                    var obj_reques_tjoinsucc_action = new S2C_reques_tjoinsucc();
                    S2C_reques_tjoinsucc.read(obj_reques_tjoinsucc_action, bs);
                    return obj_reques_tjoinsucc_action;
                case hanlder.ProtocolsEnum.SUpdateMemberPosition:
                    var obj_update_memberposition_action = new S2C_update_memberposition();
                    S2C_update_memberposition.read(obj_update_memberposition_action, bs);
                    return obj_update_memberposition_action;
                case hanlder.ProtocolsEnum.SSendSingleCharacterList:
                    var obj_send_singlecharacterlist_action = new S2C_send_singlecharacterlist();
                    S2C_send_singlecharacterlist.read(obj_send_singlecharacterlist_action, bs);
                    return obj_send_singlecharacterlist_action;
                case hanlder.ProtocolsEnum.SInviteJoinSucc:
                    var obj_invite_joinsucc_action = new S2C_invite_joinsucc();
                    S2C_invite_joinsucc.read(obj_invite_joinsucc_action, bs);
                    return obj_invite_joinsucc_action;
                case hanlder.ProtocolsEnum.SRequestSetLeaderSucc:
                    var obj_request_setleadersucc_action = new S2C_request_setleadersucc();
                    S2C_request_setleadersucc.read(obj_request_setleadersucc_action, bs);
                    return obj_request_setleadersucc_action;
                case hanlder.ProtocolsEnum.SSetTeamState:
                    var obj_set_teamstate_action = new S2C_set_teamstate();
                    S2C_set_teamstate.read(obj_set_teamstate_action, bs);
                    return obj_set_teamstate_action;
                case hanlder.ProtocolsEnum.SUpdateTeamMemberBasic:
                    var obj_update_teammemberbasic_action = new S2C_update_teammemberbasic();
                    S2C_update_teammemberbasic.read(obj_update_teammemberbasic_action, bs);
                    return obj_update_teammemberbasic_action;
                case hanlder.ProtocolsEnum.SRespondInvite:
                    var obj_respond_invite_action = new S2C_respond_invite();
                    S2C_respond_invite.read(obj_respond_invite_action, bs);
                    return obj_respond_invite_action;
                case hanlder.ProtocolsEnum.SUpdateTeamMemberComponent:
                    var obj_update_teammembercomponent_action = new S2C_update_teammembercomponent();
                    S2C_update_teammembercomponent.read(obj_update_teammembercomponent_action, bs);
                    return obj_update_teammembercomponent_action;
                case hanlder.ProtocolsEnum.SRequestTeamMatch:
                    var obj_request_teammatch_action = new S2C_request_teammatch();
                    S2C_request_teammatch.read(obj_request_teammatch_action, bs);
                    return obj_request_teammatch_action;
                case hanlder.ProtocolsEnum.SStopTeamMatch:
                    var obj_stop_teammatch_action = new S2C_stop_teammatch();
                    S2C_stop_teammatch.read(obj_stop_teammatch_action, bs);
                    return obj_stop_teammatch_action;
                case hanlder.ProtocolsEnum.SOneKeyTeamMatch:
                    var obj_one_keyteammatch_action = new S2C_one_keyteammatch();
                    S2C_one_keyteammatch.read(obj_one_keyteammatch_action, bs);
                    return obj_one_keyteammatch_action;
                case hanlder.ProtocolsEnum.SRequestTeamMatchList:
                    var obj_request_teammatchlist_action = new S2C_request_teammatchlist();
                    S2C_request_teammatchlist.read(obj_request_teammatchlist_action, bs);
                    return obj_request_teammatchlist_action;
                case hanlder.ProtocolsEnum.SForceInviteJointTeam:
                    var obj_force_invitejointteam_action = new S2C_force_invitejointteam();
                    S2C_force_invitejointteam.read(obj_force_invitejointteam_action, bs);
                    return obj_force_invitejointteam_action;
                case hanlder.ProtocolsEnum.SRequestMatchInfo:
                    var obj_request_matchinfo_action = new S2C_request_matchinfo();
                    S2C_request_matchinfo.read(obj_request_matchinfo_action, bs);
                    return obj_request_matchinfo_action;
                case hanlder.ProtocolsEnum.SRequestHaveTeam:
                    var obj_request_haveteam_action = new S2C_request_haveteam();
                    S2C_request_haveteam.read(obj_request_haveteam_action, bs);
                    return obj_request_haveteam_action;
                case hanlder.ProtocolsEnum.SOneKeyApplyTeamInfo:
                    var obj_one_keyapplyteaminfo_action = new S2C_one_keyapplyteaminfo();
                    S2C_one_keyapplyteaminfo.read(obj_one_keyapplyteaminfo_action, bs);
                    return obj_one_keyapplyteaminfo_action;
                case hanlder.ProtocolsEnum.STeamRollMelon:
                    var obj_team_rollmelon_action = new S2C_team_rollmelon();
                    S2C_team_rollmelon.read(obj_team_rollmelon_action, bs);
                    return obj_team_rollmelon_action;
                case hanlder.ProtocolsEnum.STeamRollMelonInfo:
                    var obj_team_rollmeloninfo_action = new S2C_team_rollmeloninfo();
                    S2C_team_rollmeloninfo.read(obj_team_rollmeloninfo_action, bs);
                    return obj_team_rollmeloninfo_action;
                case hanlder.ProtocolsEnum.SOneTeamRollMelonInfo:
                    var obj_one_teamrollmelonunfo_action = new S2C_one_teamrollmelonunfo();
                    S2C_one_teamrollmelonunfo.read(obj_one_teamrollmelonunfo_action, bs);
                    return obj_one_teamrollmelonunfo_action;
                case hanlder.ProtocolsEnum.SSetTeamFormation:
                    var obj_set_teamformation_action = new S2C_set_teamformation();
                    S2C_set_teamformation.read(obj_set_teamformation_action, bs);
                    return obj_set_teamformation_action;
                case hanlder.ProtocolsEnum.SSetMyFormation:
                    var obj_set_myformation_action = new S2C_set_myformation();
                    S2C_set_myformation.read(obj_set_myformation_action, bs);
                    return obj_set_myformation_action;
                case hanlder.ProtocolsEnum.SFormationsMap:
                    var obj_formations_map_action = new S2C_formations_map();
                    S2C_formations_map.read(obj_formations_map_action, bs);
                    return obj_formations_map_action;
                /*case ProtocolsEnum.SRequestClanFightTeamList:
                    var obj_request_clanfightteamlist_action: S2C_request_clanfightteamlist = new S2C_request_clanfightteamlist();
                    S2C_request_clanfightteamlist.read(obj_request_clanfightteamlist_action, bs)
                    return obj_request_clanfightteamlist_action;
                case ProtocolsEnum.SRequestClanFightRoleList:
                    var obj_request_clanfightrolelist_action: S2C_request_clanfightrolelist = new S2C_request_clanfightrolelist();
                    S2C_request_clanfightrolelist.read(obj_request_clanfightrolelist_action, bs)
                    return obj_request_clanfightrolelist_action;
                case ProtocolsEnum.SRequestClanFightTeamRoleNum:
                    var obj_request_clanfightteamrolenum_action: S2C_request_clanfightteamrolenum = new S2C_request_clanfightteamrolenum();
                    S2C_request_clanfightteamrolenum.read(obj_request_clanfightteamrolenum_action, bs)
                    return obj_request_clanfightteamrolenum_action;*/
                case hanlder.ProtocolsEnum.SAddTitle:
                    var obj_add_title_action = new S2C_add_title();
                    S2C_add_title.read(obj_add_title_action, bs);
                    return obj_add_title_action;
                /*case ProtocolsEnum.SRemoveTitle:
                    var obj_remove_title_action: S2C_remove_title = new S2C_remove_title();
                    S2C_remove_title.read(obj_remove_title_action, bs)
                    return obj_remove_title_action;*/
                case hanlder.ProtocolsEnum.SOnTitle:
                    var obj_on_title_action = new S2C_on_title();
                    S2C_on_title.read(obj_on_title_action, bs);
                    return obj_on_title_action;
                case hanlder.ProtocolsEnum.SOffTitle:
                    var obj_off_title_action = new S2C_off_title();
                    S2C_off_title.read(obj_off_title_action, bs);
                    return obj_off_title_action;
                /*case ProtocolsEnum.STitleErr:
                    var obj_title_err_action: S2C_title_err = new S2C_title_err();
                    S2C_title_err.read(obj_title_err_action, bs)
                    return obj_title_err_action;*/
                default:
                    break;
            }
            return null;
        };
        return ResponderProtocols;
    }());
    hanlder.ResponderProtocols = ResponderProtocols;
    /** 登录错误信息返回 */
    var S2C_error_info = /** @class */ (function () {
        function S2C_error_info() {
        }
        S2C_error_info.read = function (self, data) {
            self.errorCode = data.readInt32();
            self.info = ByteArrayUtils.readUtf16String(data);
        };
        return S2C_error_info;
    }());
    hanlder.S2C_error_info = S2C_error_info;
    var S2C_Online_Announce = /** @class */ (function () {
        function S2C_Online_Announce() {
        }
        S2C_Online_Announce.read = function (self, data) {
            self.userid = data.readInt32();
            self.localsid = data.readInt32();
            self.remain_time = data.readInt32();
            self.zoneid = data.readInt32();
            self.aid = data.readInt32();
            self.algorithm = data.readInt32();
            console.log("S2C_Online_Announce self", self);
        };
        return S2C_Online_Announce;
    }());
    hanlder.S2C_Online_Announce = S2C_Online_Announce;
    //txx
    //返回角色列表
    var S2C_SRoleList = /** @class */ (function () {
        function S2C_SRoleList() {
        }
        S2C_SRoleList.read = function (self, data) {
            /*var sRoleList = Network._instance.protoTypePool.SRoleList.decode(data);
            self.prevLoginRoleid = sRoleList.prevLoginRoleid;
            self.prevRoleInBattle = sRoleList.prevRoleInBattle;
            self.roles = sRoleList.roles;
            self.gacdon = sRoleList.gacdon;
            console.log("S2C_SRoleList sRoleList:", sRoleList);*/
            self.prevLoginRoleid = data.readLong();
            self.prevRoleInBattle = data.readInt8();
            self.roles = [];
            var roleInfoVo;
            var arraySize = data.readByte();
            for (var index = 0; index < arraySize; index++) {
                roleInfoVo = new game.modules.createrole.models.RoleInfoVo();
                roleInfoVo.fromByteArray(data);
                self.roles.push(roleInfoVo);
            }
            self.gacdon = data.readInt32();
        };
        return S2C_SRoleList;
    }());
    hanlder.S2C_SRoleList = S2C_SRoleList;
    var S2C_create_role = /** @class */ (function () {
        function S2C_create_role() {
        }
        S2C_create_role.read = function (self, data) {
            //let byteArray:ByteArray = new ByteArray();
            //byteArray._writeUint8Array(data);
            //byteArray.position = 0;                
            //byteArray.endian = Byte.BIG_ENDIAN;
            self.newRoleInfo = new game.modules.createrole.models.RoleInfoVo();
            self.newRoleInfo.fromByteArray(data);
            console.log("S2C_create_role self.newRoleInfo", self.newRoleInfo);
        };
        return S2C_create_role;
    }());
    hanlder.S2C_create_role = S2C_create_role;
    //进入游戏返回
    var S2C_SEnterWorld = /** @class */ (function () {
        function S2C_SEnterWorld() {
        }
        S2C_SEnterWorld.read = function (self, data) {
            /*var sEnterWorld = Network._instance.protoTypePool.SEnterWorld.decode(data);
            //self.mydata = sEnterWorld.mydata;
            var roleDetail = sEnterWorld.mydata;
            self.mydata = roleDetail;*/
            //let byteArray:ByteArray = new ByteArray();
            //byteArray._writeUint8Array(data);
            //byteArray.position = 0;                
            //byteArray.endian = Byte.BIG_ENDIAN;
            self.roleDetail = new game.modules.createrole.models.RoleDetailVo();
            self.roleDetail.fromByteArray(data);
            console.log("S2C_SEnterWorld self.roleDetail:", self.roleDetail);
        };
        return S2C_SEnterWorld;
    }());
    hanlder.S2C_SEnterWorld = S2C_SEnterWorld;
    //服务器向客户端发送剧本
    var S2C_SSendRoundScript = /** @class */ (function () {
        function S2C_SSendRoundScript() {
        }
        S2C_SSendRoundScript.read = function (self, data) {
            /*var sSendRoundScript = Network._instance.protoTypePool.SSendRoundScript.decode(data);
            self.playItem = sSendRoundScript.playItem;
            self.aiactions = sSendRoundScript.aiactions;
            self.roleChangedAttrs = sSendRoundScript.roleChangedAttrs;
            self.petChangedAttrs = sSendRoundScript.petChangedAttrs;
            self.fighterfinallyhps = sSendRoundScript.fighterfinallyhps;
            self.fighterfinallymps = sSendRoundScript.fighterfinallymps;
            console.log("S2C_SSendRoundScript playItem:", sSendRoundScript.playItem);*/
            self.playItem = [];
            var playItemSize = data.readUint8();
            var newResultItem;
            for (var index = 0; index < playItemSize; index++) {
                newResultItem = new game.scene.models.NewResultItemVo();
                newResultItem.fromByteArray(data);
                self.playItem.push(newResultItem);
            } //NewResultItem
            self.aiactions = [];
            var aiactionsSize = data.readUint8();
            var aIOperation;
            for (var index = 0; index < aiactionsSize; index++) {
                aIOperation = new game.scene.models.AIOperationVo();
                aIOperation.fromByteArray(data);
                self.aiactions.push(aIOperation);
            } //AIOperation
            var mapSize = data.readUint8();
            self.roleChangedAttrs = new Laya.Dictionary();
            for (var index = 0; index < mapSize; index++) {
                self.roleChangedAttrs.set(data.readUint32(), data.readFloat());
            }
            mapSize = data.readUint8();
            self.petChangedAttrs = new Laya.Dictionary();
            for (var index = 0; index < mapSize; index++) {
                self.petChangedAttrs.set(data.readUint32(), data.readFloat());
            }
            mapSize = data.readUint8();
            self.fighterfinallyhps = new Laya.Dictionary();
            for (var index = 0; index < mapSize; index++) {
                self.fighterfinallyhps.set(data.readUint32(), data.readUint32());
            }
            mapSize = data.readUint8();
            self.fighterfinallymps = new Laya.Dictionary();
            for (var index = 0; index < mapSize; index++) {
                self.fighterfinallymps.set(data.readUint32(), data.readUint32());
            }
            console.log("S2C_SSendRoundScript self:", self);
        };
        return S2C_SSendRoundScript;
    }());
    hanlder.S2C_SSendRoundScript = S2C_SSendRoundScript;
    var S2C_notify_buysuccess = /** @class */ (function () {
        function S2C_notify_buysuccess() {
        }
        S2C_notify_buysuccess.read = function (self, data) {
            self.notifytype = data.readInt32();
            self.name = ByteArrayUtils.readUtf16String(data);
            self.number = data.readInt32();
            self.money = data.readInt32();
            self.currency = data.readInt32();
            self.itemorpet = data.readInt32();
            self.units = ByteArrayUtils.readUtf16String(data);
        };
        return S2C_notify_buysuccess;
    }());
    hanlder.S2C_notify_buysuccess = S2C_notify_buysuccess;
    var S2C_market_upsucc = /** @class */ (function () {
        function S2C_market_upsucc() {
        }
        S2C_market_upsucc.read = function (self, data) {
            self.israrity = data.readInt32();
        };
        return S2C_market_upsucc;
    }());
    hanlder.S2C_market_upsucc = S2C_market_upsucc;
    var S2C_get_marketupprice = /** @class */ (function () {
        function S2C_get_marketupprice() {
            this.recommendations = [];
        }
        S2C_get_marketupprice.read = function (self, data) {
            self.containertype = data.readInt32();
            self.price = data.readInt32();
            self.stallprice = data.readInt32();
            var size = data.readInt8();
            if (size > 0) {
                for (var index = 0; index < size; index++) {
                    self.recommendations.push(data.readInt32());
                }
            }
        };
        return S2C_get_marketupprice;
    }());
    hanlder.S2C_get_marketupprice = S2C_get_marketupprice;
    var S2C_market_pettips = /** @class */ (function () {
        function S2C_market_pettips() {
        }
        S2C_market_pettips.read = function (self, data) {
            self.PetInfoVo = new game.modules.pet.models.PetInfoVo();
            self.PetInfoVo.fromByteArray(data);
            self.pettips = self.PetInfoVo;
            self.tipstype = data.readInt32();
        };
        return S2C_market_pettips;
    }());
    hanlder.S2C_market_pettips = S2C_market_pettips;
    var S2C_market_containerbrowse = /** @class */ (function () {
        function S2C_market_containerbrowse() {
            this.goodslist = [];
        }
        S2C_market_containerbrowse.read = function (self, data) {
            self.actiontype = data.readInt32();
            var MarketGoodsVo;
            var listSize = data.readInt8();
            for (var index = 0; index < listSize; index++) {
                MarketGoodsVo = new game.modules.sale.models.MarketGoodsVo();
                MarketGoodsVo.fromByteArray(data);
                self.goodslist.push(MarketGoodsVo);
            }
        };
        return S2C_market_containerbrowse;
    }());
    hanlder.S2C_market_containerbrowse = S2C_market_containerbrowse;
    var S2C_market_tradelog = /** @class */ (function () {
        function S2C_market_tradelog() {
            this.buylog = [];
            this.salelog = [];
        }
        S2C_market_tradelog.read = function (self, data) {
            // var sMarketTradeLog = Network._instance.protoTypePool.SMarketTradeLog.decode(data);
            // self.buylog = sMarketTradeLog.buylog;
            // self.salelog = sMarketTradeLog.salelog;
            // console.log("S2C_market_tradelog sMarketTradeLog:", sMarketTradeLog);
            // console.log("S2C_market_tradelog sMarketTradeLog.buylog", sMarketTradeLog.buylog);
            // console.log("S2C_market_tradelog sMarketTradeLog.salelog", sMarketTradeLog.salelog);
            var buySize = data.readInt8();
            var LogVo1;
            var LogVo2;
            for (var index = 0; index < buySize; index++) {
                LogVo1 = new game.modules.sale.models.LogVo();
                LogVo1.fromByteArray(data);
            }
            self.buylog.push(LogVo1);
            var saleSize = data.readInt8();
            for (var index = 0; index < saleSize; index++) {
                LogVo2 = new game.modules.sale.models.LogVo();
                LogVo2.fromByteArray(data);
            }
            self.salelog.push(LogVo2);
        };
        return S2C_market_tradelog;
    }());
    hanlder.S2C_market_tradelog = S2C_market_tradelog;
    var S2C_market_buy = /** @class */ (function () {
        function S2C_market_buy() {
        }
        S2C_market_buy.read = function (self, data) {
            // var sMarketBuy = Network._instance.protoTypePool.SMarketBuy.decode(data);
            // self.id = sMarketBuy.id;
            // self.surplusnum = sMarketBuy.surplusnum;
            // console.log("S2C_market_buy sMarketBuy:", sMarketBuy);
            // console.log("S2C_market_buy sMarketBuy.id", sMarketBuy.id);
            // console.log("S2C_market_buy sMarketBuy.surplusnum", sMarketBuy.surplusnum);
            self.id = data.readLong();
            self.surplusnum = data.readInt32();
        };
        return S2C_market_buy;
    }());
    hanlder.S2C_market_buy = S2C_market_buy;
    var S2C_market_browse = /** @class */ (function () {
        function S2C_market_browse() {
            this.goodslist = [];
        }
        S2C_market_browse.read = function (self, data) {
            self.browsetype = data.readInt32();
            self.firstno = data.readInt32();
            self.twono = data.readInt32();
            var size = data.readByte();
            self.threeno = [];
            for (var i = 0; i < size; i++) {
                var th = data.readInt32();
                self.threeno.push(th);
            }
            self.itemtype = data.readInt32();
            self.limitmin = data.readInt32();
            self.limitmax = data.readInt32();
            self.currpage = data.readInt32();
            self.totalpage = data.readInt32();
            var listSize = data.readByte();
            for (var i = 0; i < listSize; i++) {
                self.MarketGoodsVo = new game.modules.sale.models.MarketGoodsVo();
                self.MarketGoodsVo.fromByteArray(data);
                self.goodslist.push(self.MarketGoodsVo);
            }
            self.priceSort = data.readInt32();
        };
        return S2C_market_browse;
    }());
    hanlder.S2C_market_browse = S2C_market_browse;
    var S2C_query_limit = /** @class */ (function () {
        function S2C_query_limit() {
        }
        S2C_query_limit.read = function (self, data) {
            self.querytype = data.readUint32();
            self.goodslimits = [];
            var goodsLimitVo;
            var arraySize = ByteArrayUtils.uncompact_uint32(data);
            for (var index = 0; index < arraySize; index++) {
                goodsLimitVo = new game.modules.shop.models.GoodsLimitVo();
                goodsLimitVo.fromByteArray(data);
                self.goodslimits.push(goodsLimitVo);
            }
        };
        return S2C_query_limit;
    }());
    hanlder.S2C_query_limit = S2C_query_limit;
    var S2C_response_shopprice = /** @class */ (function () {
        function S2C_response_shopprice() {
        }
        S2C_response_shopprice.read = function (self, data) {
            self.shopid = data.readLong();
            var size = ByteArrayUtils.uncompact_uint32(data);
            self.goodsList = [];
            for (var index = 0; index < size; index++) {
                var goods = new game.modules.pet.models.GoodsVo();
                goods.fromByteArray(data);
                self.goodsList.push(goods);
            }
        };
        return S2C_response_shopprice;
    }());
    hanlder.S2C_response_shopprice = S2C_response_shopprice;
    var S2C_change_gem = /** @class */ (function () {
        function S2C_change_gem() {
        }
        S2C_change_gem.read = function (self, data) {
            var sChangeGem = Network._instance.protoTypePool.SChangeGem.decode(data);
            console.log("S2C_change_gem sChangeGem:", sChangeGem);
        };
        return S2C_change_gem;
    }());
    hanlder.S2C_change_gem = S2C_change_gem;
    var S2C_change_weapon = /** @class */ (function () {
        function S2C_change_weapon() {
        }
        S2C_change_weapon.read = function (self, data) {
            var sChangeWeapon = Network._instance.protoTypePool.SChangeWeapon.decode(data);
            self.remainChangeWeaponCount = sChangeWeapon.remainChangeWeaponCount;
            self.remainchangeClothescount = sChangeWeapon.remainchangeClothescount;
            self.remainchangeHelmcount = sChangeWeapon.remainchangeHelmcount;
            console.log("S2C_change_weapon sChangeWeapon:", sChangeWeapon);
            console.log("S2C_change_weapon sChangeWeapon.remainChangeWeaponCount", sChangeWeapon.remainChangeWeaponCount);
            console.log("S2C_change_weapon sChangeWeapon.remainchangeClothescount", sChangeWeapon.remainchangeClothescount);
            console.log("S2C_change_weapon sChangeWeapon.remainchangeHelmcount", sChangeWeapon.remainchangeHelmcount);
        };
        return S2C_change_weapon;
    }());
    hanlder.S2C_change_weapon = S2C_change_weapon;
    var S2C_change_schoolextinfo = /** @class */ (function () {
        function S2C_change_schoolextinfo() {
        }
        S2C_change_schoolextinfo.read = function (self, data) {
            var sChangeSchoolExtInfo = Network._instance.protoTypePool.SChangeSchoolExtInfo.decode(data);
            self.remainChangeWeaponCount = sChangeSchoolExtInfo.remainChangeWeaponCount;
            self.remainchangeClothescount = sChangeSchoolExtInfo.remainchangeClothescount;
            self.remainchangeHelmcount = sChangeSchoolExtInfo.remainchangeHelmcount;
            self.remainChangeGemCount = sChangeSchoolExtInfo.remainChangeGemCount;
            console.log("S2C_change_schoolextinfo sChangeSchoolExtInfo:", sChangeSchoolExtInfo);
            console.log("S2C_change_schoolextinfo sChangeSchoolExtInfo.remainChangeWeaponCount", sChangeSchoolExtInfo.remainChangeWeaponCount);
            console.log("S2C_change_schoolextinfo sChangeSchoolExtInfo.remainchangeClothescount", sChangeSchoolExtInfo.remainchangeClothescount);
            console.log("S2C_change_schoolextinfo sChangeSchoolExtInfo.remainchangeHelmcount", sChangeSchoolExtInfo.remainchangeHelmcount);
            console.log("S2C_change_schoolextinfo sChangeSchoolExtInfo.remainChangeGemCount", sChangeSchoolExtInfo.remainChangeGemCount);
        };
        return S2C_change_schoolextinfo;
    }());
    hanlder.S2C_change_schoolextinfo = S2C_change_schoolextinfo;
    var S2C_old_schoollist = /** @class */ (function () {
        function S2C_old_schoollist() {
        }
        S2C_old_schoollist.read = function (self, data) {
            var sOldSchoolList = Network._instance.protoTypePool.SOldSchoolList.decode(data);
            self.oldShapeList = sOldSchoolList.oldShapeList;
            self.oldSchoolList = sOldSchoolList.oldSchoolList;
            console.log("S2C_old_schoollist sOldSchoolList:", sOldSchoolList);
            console.log("S2C_old_schoollist sOldSchoolList.oldShapeList", sOldSchoolList.oldShapeList);
            console.log("S2C_old_schoollist sOldSchoolList.oldSchoolList", sOldSchoolList.oldSchoolList);
        };
        return S2C_old_schoollist;
    }());
    hanlder.S2C_old_schoollist = S2C_old_schoollist;
    var S2C_shouxi_shape = /** @class */ (function () {
        function S2C_shouxi_shape() {
        }
        S2C_shouxi_shape.read = function (self, data) {
            var sShouxiShape = Network._instance.protoTypePool.SShouxiShape.decode(data);
            self.shouxikey = sShouxiShape.shouxikey;
            self.name = sShouxiShape.name;
            self.shape = sShouxiShape.shape;
            self.components = sShouxiShape.components;
            self.titleId = sShouxiShape.titleId;
            console.log("S2C_shouxi_shape sShouxiShape:", sShouxiShape);
            console.log("S2C_shouxi_shape sShouxiShape.shouxikey", sShouxiShape.shouxikey);
            console.log("S2C_shouxi_shape sShouxiShape.name", sShouxiShape.name);
            console.log("S2C_shouxi_shape sShouxiShape.shape", sShouxiShape.shape);
            console.log("S2C_shouxi_shape sShouxiShape.components", sShouxiShape.components);
            console.log("S2C_shouxi_shape sShouxiShape.titleId", sShouxiShape.titleId);
        };
        return S2C_shouxi_shape;
    }());
    hanlder.S2C_shouxi_shape = S2C_shouxi_shape;
    var S2C_can_elect = /** @class */ (function () {
        function S2C_can_elect() {
        }
        S2C_can_elect.read = function (self, data) {
            var sCanElect = Network._instance.protoTypePool.SCanElect.decode(data);
            self.shouxikey = sCanElect.shouxikey;
            console.log("S2C_can_elect sCanElect:", sCanElect);
            console.log("S2C_can_elect sCanElect.shouxikey", sCanElect.shouxikey);
        };
        return S2C_can_elect;
    }());
    hanlder.S2C_can_elect = S2C_can_elect;
    var S2C_my_elector = /** @class */ (function () {
        function S2C_my_elector() {
        }
        S2C_my_elector.read = function (self, data) {
            var sMyElector = Network._instance.protoTypePool.SMyElector.decode(data);
            self.electorwords = sMyElector.electorwords;
            console.log("S2C_my_elector sMyElector:", sMyElector);
            console.log("S2C_my_elector sMyElector.electorwords", sMyElector.electorwords);
        };
        return S2C_my_elector;
    }());
    hanlder.S2C_my_elector = S2C_my_elector;
    var S2C_vote_candidate = /** @class */ (function () {
        function S2C_vote_candidate() {
        }
        S2C_vote_candidate.read = function (self, data) {
            var sVoteCandidate = Network._instance.protoTypePool.SVoteCandidate.decode(data);
            self.alreadyVote = sVoteCandidate.alreadyVote;
            self.candidateList = sVoteCandidate.candidateList;
            self.shouxikey = sVoteCandidate.shouxikey;
            console.log("S2C_vote_candidate sVoteCandidate:", sVoteCandidate);
            console.log("S2C_vote_candidate sVoteCandidate.alreadyVote", sVoteCandidate.alreadyVote);
            console.log("S2C_vote_candidate sVoteCandidate.candidateList", sVoteCandidate.candidateList);
            console.log("S2C_vote_candidate sVoteCandidate.shouxikey", sVoteCandidate.shouxikey);
        };
        return S2C_vote_candidate;
    }());
    hanlder.S2C_vote_candidate = S2C_vote_candidate;
    var S2C_send_candidates = /** @class */ (function () {
        function S2C_send_candidates() {
        }
        S2C_send_candidates.read = function (self, data) {
            var sSendCandidates = Network._instance.protoTypePool.SSendCandidates.decode(data);
            self.alreadyVote = sSendCandidates.alreadyVote;
            self.candidateList = sSendCandidates.candidateList;
            self.shouxikey = sSendCandidates.shouxikey;
            console.log("S2C_send_candidates sSendCandidates:", sSendCandidates);
            console.log("S2C_send_candidates sSendCandidates.alreadyVote", sSendCandidates.alreadyVote);
            console.log("S2C_send_candidates sSendCandidates.candidateList", sSendCandidates.candidateList);
            console.log("S2C_send_candidates sSendCandidates.shouxikey", sSendCandidates.shouxikey);
        };
        return S2C_send_candidates;
    }());
    hanlder.S2C_send_candidates = S2C_send_candidates;
    var S2C_send_shouxiinfo = /** @class */ (function () {
        function S2C_send_shouxiinfo() {
        }
        S2C_send_shouxiinfo.read = function (self, data) {
            var sSendShouxiInfo = Network._instance.protoTypePool.SSendShouxiInfo.decode(data);
            self.shouxi = sSendShouxiInfo.shouxi;
            self.shouxikey = sSendShouxiInfo.shouxikey;
            console.log("S2C_send_shouxiinfo sSendShouxiInfo:", sSendShouxiInfo);
            console.log("S2C_send_shouxiinfo sSendShouxiInfo.shouxi", sSendShouxiInfo.shouxi);
            console.log("S2C_send_shouxiinfo sSendShouxiInfo.shouxikey", sSendShouxiInfo.shouxikey);
        };
        return S2C_send_shouxiinfo;
    }());
    hanlder.S2C_send_shouxiinfo = S2C_send_shouxiinfo;
    //帮派排名
    var S2C_faction_rankinfo = /** @class */ (function () {
        function S2C_faction_rankinfo() {
        }
        S2C_faction_rankinfo.read = function (self, data) {
            self.factionkey = data.readLong();
            self.lastname = ByteArrayUtils.readUtf16String(data);
            self.title = ByteArrayUtils.readUtf16String(data);
            self.factionmasterid = data.readLong();
        };
        return S2C_faction_rankinfo;
    }());
    hanlder.S2C_faction_rankinfo = S2C_faction_rankinfo;
    //查看排行榜上某排名的信息
    var S2C_rank_roleinfo2 = /** @class */ (function () {
        function S2C_rank_roleinfo2() {
        }
        S2C_rank_roleinfo2.read = function (self, data) {
            console.log("--------------------开始读取数据！-------------------------------");
            self.roleid = data.readLong(); //validator="value=[1,)"
            self.ranktype = data.readInt32();
            self.rolename = ByteArrayUtils.readUtf16String(data);
            self.shape = data.readInt32();
            self.school = data.readInt32();
            self.level = data.readInt32();
            //self.baginfo type="fire.pb.Bag"
            //var packid:number = data.readInt32();
            self.baginfo = new BagVo();
            self.baginfo.fromByteArray(data);
            //self.tips type="map" key="int" value="octets"
            self.tips = new Laya.Dictionary();
            var map_size = ByteArrayUtils.uncompact_uint32(data);
            for (var index = 0; index < map_size; index++) {
                var key = void 0;
                key = data.readInt32();
                var value = new game.modules.strengThening.models.TipsVo();
                value.fromByteArray(data);
                self.tips.set(key, value);
            }
            self.footlogoid = data.readInt32();
            self.rank = data.readInt32();
            self.totalscore = data.readInt32();
            self.rolescore = data.readInt32();
            self.petscore = data.readInt32();
            self.manypetscore = data.readInt32();
            self.skillscore = data.readInt32();
            self.levelscore = data.readInt32();
            self.xiulianscore = data.readInt32();
            self.equipscore = data.readInt32();
            //self.components type="map" key="byte" value="int"
            self.components = new Laya.Dictionary();
            var _map_size = ByteArrayUtils.uncompact_uint32(data);
            for (var index = 0; index < _map_size; index++) {
                self.components.set(data.readUint8(), data.readInt32());
            }
            self.factionname = ByteArrayUtils.readUtf16String(data);
        };
        return S2C_rank_roleinfo2;
    }());
    hanlder.S2C_rank_roleinfo2 = S2C_rank_roleinfo2;
    var S2C_rank_roleinfo = /** @class */ (function () {
        function S2C_rank_roleinfo() {
        }
        S2C_rank_roleinfo.read = function (self, data) {
            self.roleid = data.readLong();
            self.rolename = ByteArrayUtils.readUtf16String(data);
            self.shape = data.readInt32();
            self.level = data.readInt32();
            self.zonghescore = data.readInt32();
            self.petscore = data.readInt32();
            self.camp = data.readInt32();
            self.school = data.readInt32();
            self.factionname = ByteArrayUtils.readUtf16String(data);
            self.rank = data.readInt32();
        };
        return S2C_rank_roleinfo;
    }());
    hanlder.S2C_rank_roleinfo = S2C_rank_roleinfo;
    //查看排行榜上宠物信息
    var S2C_send_rankpetdata = /** @class */ (function () {
        function S2C_send_rankpetdata() {
        }
        S2C_send_rankpetdata.read = function (self, data) {
            self.uniquePetId = data.readLong();
            self.petinfo = new Array();
            var _pet_info;
            _pet_info = new PetInfoVo();
            _pet_info.fromByteArray(data);
            self.petinfo(_pet_info);
        };
        return S2C_send_rankpetdata;
    }());
    hanlder.S2C_send_rankpetdata = S2C_send_rankpetdata;
    //排行榜系统各种排行榜的信息
    var S2C_request_ranklist = /** @class */ (function () {
        function S2C_request_ranklist() {
        }
        S2C_request_ranklist.read = function (self, data) {
            self.ranktype = data.readInt32();
            self.myrank = data.readInt32();
            self.list = new Array();
            switch (self.ranktype) { //判断读取是什么类型的排行榜，然后对与之对应类型的数组填充数据，先拿人综榜测试
                case RankType.ROLE_ZONGHE_RANK: //人综榜
                case RankType.ROLE_RANK: //人物榜
                    var _rank_renzong_info = void 0;
                    var _list_size = ByteArrayUtils.uncompact_uint32(data);
                    for (var _index = 0; _index < _list_size; _index++) {
                        ByteArrayUtils.uncompact_uint32(data);
                        _rank_renzong_info = new RanKingList_renzong_InfoVo();
                        _rank_renzong_info.fromByteArray(data);
                        self.list.push(_rank_renzong_info);
                    }
                    break;
                case RankType.LEVEL_RANK: //等级榜
                    var _rank_level_info = void 0;
                    var _list_size = ByteArrayUtils.uncompact_uint32(data);
                    for (var _index = 0; _index < _list_size; _index++) {
                        ByteArrayUtils.uncompact_uint32(data);
                        _rank_level_info = new LevelRank_infoVo();
                        _rank_level_info.fromByteArray(data);
                        self.list.push(_rank_level_info);
                    }
                    break;
                case RankType.PET_GRADE_RANK: //宠物榜
                    var _rank_pet_info = void 0;
                    var _list_size = ByteArrayUtils.uncompact_uint32(data);
                    for (var _index = 0; _index < _list_size; _index++) {
                        ByteArrayUtils.uncompact_uint32(data);
                        _rank_pet_info = new PetGradeRank_infoVo();
                        _rank_pet_info.fromByteArray(data);
                        self.list.push(_rank_pet_info);
                    }
                    break;
                case RankType.PROFESSION_WARRIOR_RANK: //战士榜
                case RankType.PROFESSION_MAGIC_RANK: //法师榜
                case RankType.PROFESSION_PRIEST_RANK: //牧师榜
                case RankType.PROFESSION_PALADIN_RANK: //圣骑榜
                case RankType.PROFESSION_HUNTER_RANK: //猎人榜
                case RankType.PROFESSION_DRUID_RANK: //德鲁伊榜
                case RankType.PROFESSION_ROGUE_RANK: //盗贼榜
                case RankType.PROFESSION_SAMAN_RANK: //萨满榜
                case RankType.PROFESSION_WARLOCK_RANK: //术士榜
                    var _rank_profession_info = void 0;
                    var _list_size = ByteArrayUtils.uncompact_uint32(data);
                    for (var _index = 0; _index < _list_size; _index++) {
                        ByteArrayUtils.uncompact_uint32(data);
                        _rank_profession_info = new RoleProfessionRankRecord_infoVo();
                        _rank_profession_info.fromByteArray(data);
                        self.list.push(_rank_profession_info);
                    }
                    break;
                case RankType.FACTION_RANK_LEVEL: //帮派等级榜 
                case RankType.FACTION_ZONGHE: //帮派综合实力榜
                    var _rank_factionzonghe_info = void 0;
                    var _list_size = ByteArrayUtils.uncompact_uint32(data);
                    for (var _index = 0; _index < _list_size; _index++) {
                        ByteArrayUtils.uncompact_uint32(data);
                        _rank_factionzonghe_info = new FactionRankRecordEx_infoVo();
                        _rank_factionzonghe_info.fromByteArray(data);
                        self.list.push(_rank_factionzonghe_info);
                    }
                    break;
                case RankType.FACTION_MC: //熔火之心榜，帮派副本之一
                case RankType.FACTION_NAXX: //纳克萨玛斯榜，帮派副本之一
                case RankType.FACTION_COPY: //公会副本竞速，即帮派副本竞速榜
                    var _rank_factionraid_info = void 0;
                    var _list_size = ByteArrayUtils.uncompact_uint32(data);
                    for (var _index = 0; _index < _list_size; _index++) {
                        ByteArrayUtils.uncompact_uint32(data);
                        _rank_factionraid_info = new FactionRaidRank_infoVo();
                        _rank_factionraid_info.fromByteArray(data);
                        self.list.push(_rank_factionraid_info);
                    }
                    break;
                case RankType.PVP5_LAST_GRADE1: //5v5竞技场上届初级组，上届精英组
                case RankType.PVP5_LAST_GRADE2: //5v5竞技场上届中级组，上届神威组
                case RankType.PVP5_LAST_GRADE3: //5v5竞技场上届高级组，上届王者组
                case RankType.PVP5_HISTORY_GRADE1: //5v5竞技场历史初级组，历史精英组
                case RankType.PVP5_HISTORY_GRADE2: //5v5竞技场历史中级组，历史神威组
                case RankType.PVP5_HISTORY_GRADE3: //5v5竞技场历史高级组，历史王者组
                    var _rank_PVP5_info = void 0;
                    var _list_size = ByteArrayUtils.uncompact_uint32(data);
                    for (var _index = 0; _index < _list_size; _index++) {
                        ByteArrayUtils.uncompact_uint32(data);
                        _rank_PVP5_info = new PvP5RankData_infoVo();
                        _rank_PVP5_info.fromByteArray(data);
                        self.list.push(_rank_PVP5_info);
                    }
                    break;
                case RankType.RED_PACK_1: //红包榜 普通服
                case RankType.RED_PACK_2: //红包榜 点卡服
                    var _rank_redpack_info = void 0;
                    var _list_size = ByteArrayUtils.uncompact_uint32(data);
                    for (var _index = 0; _index < _list_size; _index++) {
                        ByteArrayUtils.uncompact_uint32(data);
                        _rank_redpack_info = new RedPackRankRecord_infoVo();
                        _rank_redpack_info.fromByteArray(data);
                        self.list.push(_rank_redpack_info);
                    }
                    break;
                case RankType.FLOWER_RECEIVE: //收花榜
                case RankType.FLOWER_GIVE: //送花榜
                    var _rank_flower_info = void 0;
                    var _list_size = ByteArrayUtils.uncompact_uint32(data);
                    for (var _index = 0; _index < _list_size; _index++) {
                        ByteArrayUtils.uncompact_uint32(data);
                        _rank_flower_info = new FlowerRankRecord_infoVo();
                        _rank_flower_info.fromByteArray(data);
                        self.list.push(_rank_flower_info);
                    }
                    break;
                case RankType.CLAN_FIGHT_HISTROY: //公会战历史排名
                    var _rank_clanFight_info = void 0;
                    var _list_size = ByteArrayUtils.uncompact_uint32(data);
                    for (var _index = 0; _index < _list_size; _index++) {
                        ByteArrayUtils.uncompact_uint32(data);
                        _rank_clanFight_info = new ClanFightHistroyRank_infoVo();
                        _rank_clanFight_info.fromByteArray(data);
                        self.list.push(_rank_clanFight_info);
                    }
                    break;
                case RankType.CLAN_FIGHT_2: //公会战竞赛排名周二那场
                case RankType.CLAN_FIGHT_4: //公会战竞赛排名周四那场
                case RankType.CLAN_FIGHT_WEEK: //公会战竞赛排名本轮
                    var rank_clanFight_info = void 0;
                    var _list_size = ByteArrayUtils.uncompact_uint32(data);
                    for (var _index = 0; _index < _list_size; _index++) {
                        ByteArrayUtils.uncompact_uint32(data);
                        rank_clanFight_info = new ClanFightRaceRank_infoVo();
                        rank_clanFight_info.fromByteArray(data);
                        self.list.push(rank_clanFight_info);
                    }
                    break;
                default:
                    console.log("服务器端读取排行榜数据失败！");
                    break;
            }
            self.page = data.readInt32();
            self.hasMore = data.readInt32();
            self.myTitle = ByteArrayUtils.readUtf16String(data);
            self.takeAwardFlag = data.readByte();
            self.extdata = data.readInt32();
            self.extdata1 = data.readLong();
            self.extdata2 = data.readFloat();
            self.extdata3 = !ByteArrayUtils.readUtf16String(data) ? "" : ByteArrayUtils.readUtf16String(data);
        };
        return S2C_request_ranklist;
    }());
    hanlder.S2C_request_ranklist = S2C_request_ranklist;
    var S2C_product_madeup = /** @class */ (function () {
        function S2C_product_madeup() {
        }
        S2C_product_madeup.read = function (self, data) {
            // var sProductMadeUp = Network._instance.protoTypePool.SProductMadeUp.decode(data);
            // self.maketype = sProductMadeUp.maketype;
            // self.itemkey = sProductMadeUp.itemkey;
            self.maketype = data.readUint32();
            self.itemkey = data.readUint32();
            // console.log("S2C_product_madeup sProductMadeUp:", self.sProductMadeUp);
            console.log("S2C_product_madeup sProductMadeUp.maketype", self.maketype);
            console.log("S2C_product_madeup sProductMadeUp.itemkey", self.itemkey);
        };
        return S2C_product_madeup;
    }());
    hanlder.S2C_product_madeup = S2C_product_madeup;
    var S2C_error_code = /** @class */ (function () {
        function S2C_error_code() {
        }
        S2C_error_code.read = function (self, data) {
            // var sErrorCode = Network._instance.protoTypePool.SErrorCode.decode(data);
            // self.errorCode = sErrorCode.errorCode;
            self.errorCode = data.readInt32();
            console.log("S2C_error_code self.errorCode", self.errorCode);
        };
        return S2C_error_code;
    }());
    hanlder.S2C_error_code = S2C_error_code;
    var S2C_search_blackroleinfo = /** @class */ (function () {
        function S2C_search_blackroleinfo() {
        }
        S2C_search_blackroleinfo.read = function (self, data) {
            // var sSearchBlackRoleInfo = Network._instance.protoTypePool.SSearchBlackRoleInfo.decode(data);
            // self.searchBlackRole = sSearchBlackRoleInfo.searchBlackRole;
            // console.log("S2C_search_blackroleinfo sSearchBlackRoleInfo:", sSearchBlackRoleInfo);
            // console.log("S2C_search_blackroleinfo sSearchBlackRoleInfo.searchBlackRole", sSearchBlackRoleInfo.searchBlackRole);
            self.searchBlackRole = new game.modules.friend.models.SearchBlackRoleInfoVo();
            self.searchBlackRole.fromByteArray(data);
            console.log("S2C_search_blackroleinfo++++++++++++++++", self.searchBlackRole);
        };
        return S2C_search_blackroleinfo;
    }());
    hanlder.S2C_search_blackroleinfo = S2C_search_blackroleinfo;
    var S2C_black_roles = /** @class */ (function () {
        function S2C_black_roles() {
        }
        S2C_black_roles.read = function (self, data) {
            // var sBlackRoles = Network._instance.protoTypePool.SBlackRoles.decode(data);
            // self.blackRoles = sBlackRoles.blackRoles;
            // console.log("S2C_black_roles sBlackRoles:", sBlackRoles);
            // console.log("S2C_black_roles sBlackRoles.blackRoles", sBlackRoles.blackRoles);
            self.blackRoles = new Array();
            var blackRolesSize = data.readUint8();
            var blackRoleInfo;
            for (var index = 0; index < blackRolesSize; index++) {
                blackRoleInfo = new game.modules.friend.models.BlackRoleInfoVo();
                blackRoleInfo.fromByteArray(data);
                self.blackRoles.push(blackRoleInfo);
            }
            console.log("S2C_black_roles+++++++++++++++++++++", self.blackRoles);
        };
        return S2C_black_roles;
    }());
    hanlder.S2C_black_roles = S2C_black_roles;
    var S2C_recover_petinfo = /** @class */ (function () {
        function S2C_recover_petinfo() {
        }
        S2C_recover_petinfo.read = function (self, data) {
            self.petInfo = new game.modules.pet.models.PetInfoVo();
            self.petInfo.fromByteArray(data);
        };
        return S2C_recover_petinfo;
    }());
    hanlder.S2C_recover_petinfo = S2C_recover_petinfo;
    var S2C_pet_recover = /** @class */ (function () {
        function S2C_pet_recover() {
        }
        S2C_pet_recover.read = function (self, data) {
            self.petId = data.readInt32();
            self.uniqId = data.readLong();
        };
        return S2C_pet_recover;
    }());
    hanlder.S2C_pet_recover = S2C_pet_recover;
    var S2C_pet_recoverlist = /** @class */ (function () {
        function S2C_pet_recoverlist() {
        }
        S2C_pet_recoverlist.read = function (self, data) {
            self.pets = [];
            var petsSize = data.readUint8();
            if (petsSize != 0) {
                var petRecoverInfoBean = void 0;
                for (var index = 0; index < petsSize; index++) {
                    petRecoverInfoBean = new game.modules.pet.models.PetRecoverInfoBeanVo();
                    petRecoverInfoBean.fromByteArray(data);
                    self.pets.push(petRecoverInfoBean);
                }
            }
        };
        return S2C_pet_recoverlist;
    }());
    hanlder.S2C_pet_recoverlist = S2C_pet_recoverlist;
    var S2C_get_petinfo = /** @class */ (function () {
        function S2C_get_petinfo() {
        }
        S2C_get_petinfo.read = function (self, data) {
            self.petinfo = new game.modules.pet.models.PetInfoVo();
            self.petinfo.fromByteArray(data);
        };
        return S2C_get_petinfo;
    }());
    hanlder.S2C_get_petinfo = S2C_get_petinfo;
    var S2C_pet_aptitudecultivate = /** @class */ (function () {
        function S2C_pet_aptitudecultivate() {
        }
        S2C_pet_aptitudecultivate.read = function (self, bytes) {
            self.petkey = bytes.readInt32();
            self.aptid = bytes.readInt32();
            self.aptvalue = bytes.readInt32();
        };
        return S2C_pet_aptitudecultivate;
    }());
    hanlder.S2C_pet_aptitudecultivate = S2C_pet_aptitudecultivate;
    var S2C_pet_skillcertification = /** @class */ (function () {
        function S2C_pet_skillcertification() {
        }
        S2C_pet_skillcertification.read = function (self, bytes) {
            self.petkey = bytes.readInt32();
            self.skillId = bytes.readInt32();
            self.isconfirm = bytes.readInt32();
        };
        return S2C_pet_skillcertification;
    }());
    hanlder.S2C_pet_skillcertification = S2C_pet_skillcertification;
    var S2C_pet_synthesize = /** @class */ (function () {
        function S2C_pet_synthesize() {
        }
        S2C_pet_synthesize.read = function (self, bytes) {
            self.petkey = bytes.readInt32();
        };
        return S2C_pet_synthesize;
    }());
    hanlder.S2C_pet_synthesize = S2C_pet_synthesize;
    var S2C_pet_wash = /** @class */ (function () {
        function S2C_pet_wash() {
        }
        S2C_pet_wash.read = function (self, bytes) {
            self.petkey = bytes.readInt32();
        };
        return S2C_pet_wash;
    }());
    hanlder.S2C_pet_wash = S2C_pet_wash;
    var S2C_pet_setautoaddpoint = /** @class */ (function () {
        function S2C_pet_setautoaddpoint() {
        }
        S2C_pet_setautoaddpoint.read = function (self, bytes) {
            self.petkey = bytes.readInt32();
            self.str = bytes.readInt32();
            self.iq = bytes.readInt32();
            self.cons = bytes.readInt32();
            self.endu = bytes.readInt32();
            self.agi = bytes.readInt32();
        };
        return S2C_pet_setautoaddpoint;
    }());
    hanlder.S2C_pet_setautoaddpoint = S2C_pet_setautoaddpoint;
    var S2C_refresh_petscore = /** @class */ (function () {
        function S2C_refresh_petscore() {
        }
        S2C_refresh_petscore.read = function (self, bytes) {
            self.petkey = bytes.readInt32();
            self.petscore = bytes.readInt32();
            self.petbasescore = bytes.readInt32();
        };
        return S2C_refresh_petscore;
    }());
    hanlder.S2C_refresh_petscore = S2C_refresh_petscore;
    var S2C_refresh_petcolumncapacity = /** @class */ (function () {
        function S2C_refresh_petcolumncapacity() {
        }
        S2C_refresh_petcolumncapacity.read = function (self, bytes) {
            self.columnid = bytes.readInt32();
            self.capacity = bytes.readInt32();
        };
        return S2C_refresh_petcolumncapacity;
    }());
    hanlder.S2C_refresh_petcolumncapacity = S2C_refresh_petcolumncapacity;
    var S2C_show_petinfo = /** @class */ (function () {
        function S2C_show_petinfo() {
        }
        S2C_show_petinfo.read = function (self, bytes) {
            self.isXunBaoPet = bytes.readInt32();
            self.petdata = new game.modules.pet.models.PetInfoVo();
            self.petdata.fromByteArray(bytes);
        };
        return S2C_show_petinfo;
    }());
    hanlder.S2C_show_petinfo = S2C_show_petinfo;
    var S2C_refresh_petskill = /** @class */ (function () {
        function S2C_refresh_petskill() {
        }
        S2C_refresh_petskill.read = function (self, bytes) {
            self.petkey = bytes.readInt32();
            self.skills = [];
            var skillsSize = bytes.readUint8();
            var petskill;
            for (var index = 0; index < skillsSize; index++) {
                petskill = new game.modules.pet.models.PetSkillVo();
                petskill.fromByteArray(bytes);
                self.skills.push(petskill);
            }
            var mapSize = bytes.readUint8();
            self.expiredtimes = new Laya.Dictionary();
            for (var index = 0; index < mapSize; index++) {
                self.expiredtimes.set(bytes.readInt32(), bytes.readLong());
            }
        };
        return S2C_refresh_petskill;
    }());
    hanlder.S2C_refresh_petskill = S2C_refresh_petskill;
    var S2C_pet_gossip = /** @class */ (function () {
        function S2C_pet_gossip() {
        }
        S2C_pet_gossip.read = function (self, bytes) {
            self.battleid = bytes.readInt32();
            self.chatindex = bytes.readInt32();
        };
        return S2C_pet_gossip;
    }());
    hanlder.S2C_pet_gossip = S2C_pet_gossip;
    var S2C_mod_petname = /** @class */ (function () {
        function S2C_mod_petname() {
        }
        S2C_mod_petname.read = function (self, bytes) {
            self.roleid = bytes.readLong();
            self.petkey = bytes.readInt32();
            self.petname = ByteArrayUtils.readUtf16String(bytes);
        };
        return S2C_mod_petname;
    }());
    hanlder.S2C_mod_petname = S2C_mod_petname;
    var S2C_pet_error = /** @class */ (function () {
        function S2C_pet_error() {
        }
        S2C_pet_error.read = function (self, bytes) {
            self.peterror = bytes.readInt32();
        };
        return S2C_pet_error;
    }());
    hanlder.S2C_pet_error = S2C_pet_error;
    var S2C_get_petcolumninfo = /** @class */ (function () {
        function S2C_get_petcolumninfo() {
        }
        S2C_get_petcolumninfo.read = function (self, bytes) {
            self.columnid = bytes.readInt32();
            self.pets = [];
            var petsSize = bytes.readUint8();
            var pet;
            for (var index = 0; index < petsSize; index++) {
                pet = new game.modules.pet.models.PetInfoVo();
                pet.fromByteArray(bytes);
                self.pets.push(pet);
            }
            self.colunmSize = bytes.readInt32();
        };
        return S2C_get_petcolumninfo;
    }());
    hanlder.S2C_get_petcolumninfo = S2C_get_petcolumninfo;
    var S2C_remove_petfromcol = /** @class */ (function () {
        function S2C_remove_petfromcol() {
        }
        S2C_remove_petfromcol.read = function (self, bytes) {
            self.columnid = bytes.readInt32();
            self.petkey = bytes.readInt32();
        };
        return S2C_remove_petfromcol;
    }());
    hanlder.S2C_remove_petfromcol = S2C_remove_petfromcol;
    var S2C_add_pettocolumn = /** @class */ (function () {
        function S2C_add_pettocolumn() {
        }
        S2C_add_pettocolumn.read = function (self, data) {
            self.columnid = data.readInt32();
            self.petdata = new game.modules.pet.models.PetInfoVo();
            self.petdata.fromByteArray(data);
        };
        return S2C_add_pettocolumn;
    }());
    hanlder.S2C_add_pettocolumn = S2C_add_pettocolumn;
    var S2C_set_fightpetrest = /** @class */ (function () {
        function S2C_set_fightpetrest() {
        }
        S2C_set_fightpetrest.read = function (self, bytes) {
            self.isinbattle = bytes.readByte();
        };
        return S2C_set_fightpetrest;
    }());
    hanlder.S2C_set_fightpetrest = S2C_set_fightpetrest;
    var S2C_set_fightpet = /** @class */ (function () {
        function S2C_set_fightpet() {
        }
        S2C_set_fightpet.read = function (self, bytes) {
            self.petkey = bytes.readInt32();
            self.isinbattle = bytes.readByte();
        };
        return S2C_set_fightpet;
    }());
    hanlder.S2C_set_fightpet = S2C_set_fightpet;
    var S2C_refresh_petexp = /** @class */ (function () {
        function S2C_refresh_petexp() {
        }
        S2C_refresh_petexp.read = function (self, bytes) {
            self.petkey = bytes.readInt32();
            self.curexp = bytes.readLong();
        };
        return S2C_refresh_petexp;
    }());
    hanlder.S2C_refresh_petexp = S2C_refresh_petexp;
    var S2C_refresh_petinfo = /** @class */ (function () {
        function S2C_refresh_petinfo() {
        }
        S2C_refresh_petinfo.read = function (self, bytes) {
            self.petinfo = new game.modules.pet.models.PetInfoVo();
            self.petinfo.fromByteArray(bytes);
        };
        return S2C_refresh_petinfo;
    }());
    hanlder.S2C_refresh_petinfo = S2C_refresh_petinfo;
    var S2C_show_petaround = /** @class */ (function () {
        function S2C_show_petaround() {
        }
        S2C_show_petaround.read = function (self, data) {
            self.roleid = data.readLong();
            self.showpetkey = data.readInt32();
            self.showpetid = data.readInt32();
            self.showpetname = ByteArrayUtils.readUtf16String(data);
            self.colour = data.readByte();
            self.size = data.readByte();
            self.showeffect = data.readByte();
        };
        return S2C_show_petaround;
    }());
    hanlder.S2C_show_petaround = S2C_show_petaround;
    var S2C_send_npcservice = /** @class */ (function () {
        function S2C_send_npcservice() {
        }
        S2C_send_npcservice.read = function (self, data) {
            self.npckey = data.readLong();
            self.service = data.readInt32();
            self.title = ByteArrayUtils.readUtf16String(data);
        };
        return S2C_send_npcservice;
    }());
    hanlder.S2C_send_npcservice = S2C_send_npcservice;
    var S2C_macth_result = /** @class */ (function () {
        function S2C_macth_result() {
        }
        S2C_macth_result.read = function (self, data) {
            var sMacthResult = Network._instance.protoTypePool.SMacthResult.decode(data);
            self.npckey = sMacthResult.npckey;
            self.result = sMacthResult.result;
            console.log("S2C_macth_result sMacthResult:", sMacthResult);
            console.log("S2C_macth_result sMacthResult.npckey", sMacthResult.npckey);
            console.log("S2C_macth_result sMacthResult.result", sMacthResult.result);
        };
        return S2C_macth_result;
    }());
    hanlder.S2C_macth_result = S2C_macth_result;
    var S2C_npc_battletime = /** @class */ (function () {
        function S2C_npc_battletime() {
        }
        S2C_npc_battletime.read = function (self, data) {
            var sNpcBattleTime = Network._instance.protoTypePool.SNpcBattleTime.decode(data);
            self.npcid = sNpcBattleTime.npcid;
            self.npckey = sNpcBattleTime.npckey;
            self.usetime = sNpcBattleTime.usetime;
            self.lasttime = sNpcBattleTime.lasttime;
            console.log("S2C_npc_battletime sNpcBattleTime:", sNpcBattleTime);
            console.log("S2C_npc_battletime sNpcBattleTime.npcid", sNpcBattleTime.npcid);
            console.log("S2C_npc_battletime sNpcBattleTime.npckey", sNpcBattleTime.npckey);
            console.log("S2C_npc_battletime sNpcBattleTime.usetime", sNpcBattleTime.usetime);
            console.log("S2C_npc_battletime sNpcBattleTime.lasttime", sNpcBattleTime.lasttime);
        };
        return S2C_npc_battletime;
    }());
    hanlder.S2C_npc_battletime = S2C_npc_battletime;
    var S2C_ping_ji = /** @class */ (function () {
        function S2C_ping_ji() {
        }
        S2C_ping_ji.read = function (self, data) {
            self.grade = data.readByte();
            self.exp = data.readInt32();
        };
        return S2C_ping_ji;
    }());
    hanlder.S2C_ping_ji = S2C_ping_ji;
    var S2C_visit_npccontainchatmsg = /** @class */ (function () {
        function S2C_visit_npccontainchatmsg() {
        }
        S2C_visit_npccontainchatmsg.read = function (self, data) {
            var sVisitNpcContainChatMsg = Network._instance.protoTypePool.SVisitNpcContainChatMsg.decode(data);
            self.npckey = sVisitNpcContainChatMsg.npckey;
            self.services = sVisitNpcContainChatMsg.services;
            self.scenarioquests = sVisitNpcContainChatMsg.scenarioquests;
            self.msgId = sVisitNpcContainChatMsg.msgId;
            self.parameters = sVisitNpcContainChatMsg.parameters;
            console.log("S2C_visit_npccontainchatmsg sVisitNpcContainChatMsg:", sVisitNpcContainChatMsg);
            console.log("S2C_visit_npccontainchatmsg sVisitNpcContainChatMsg.npckey", sVisitNpcContainChatMsg.npckey);
            console.log("S2C_visit_npccontainchatmsg sVisitNpcContainChatMsg.services", sVisitNpcContainChatMsg.services);
            console.log("S2C_visit_npccontainchatmsg sVisitNpcContainChatMsg.scenarioquests", sVisitNpcContainChatMsg.scenarioquests);
            console.log("S2C_visit_npccontainchatmsg sVisitNpcContainChatMsg.msgId", sVisitNpcContainChatMsg.msgId);
            console.log("S2C_visit_npccontainchatmsg sVisitNpcContainChatMsg.parameters", sVisitNpcContainChatMsg.parameters);
        };
        return S2C_visit_npccontainchatmsg;
    }());
    hanlder.S2C_visit_npccontainchatmsg = S2C_visit_npccontainchatmsg;
    var S2C_activity_answerquestionhelp = /** @class */ (function () {
        function S2C_activity_answerquestionhelp() {
        }
        S2C_activity_answerquestionhelp.read = function (self, data) {
            var sActivityAnswerQuestionHelp = Network._instance.protoTypePool.SActivityAnswerQuestionHelp.decode(data);
            self.helpnum = sActivityAnswerQuestionHelp.helpnum;
            console.log("S2C_activity_answerquestionhelp sActivityAnswerQuestionHelp:", sActivityAnswerQuestionHelp);
            console.log("S2C_activity_answerquestionhelp sActivityAnswerQuestionHelp.helpnum", sActivityAnswerQuestionHelp.helpnum);
        };
        return S2C_activity_answerquestionhelp;
    }());
    hanlder.S2C_activity_answerquestionhelp = S2C_activity_answerquestionhelp;
    var S2C_grab_activityreward = /** @class */ (function () {
        function S2C_grab_activityreward() {
        }
        S2C_grab_activityreward.read = function (self, data) {
            var sGrabActivityReward = Network._instance.protoTypePool.SGrabActivityReward.decode(data);
            console.log("S2C_grab_activityreward sGrabActivityReward:", sGrabActivityReward);
        };
        return S2C_grab_activityreward;
    }());
    hanlder.S2C_grab_activityreward = S2C_grab_activityreward;
    var S2C_ask_question = /** @class */ (function () {
        function S2C_ask_question() {
        }
        S2C_ask_question.read = function (self, data) {
            var sAskQuestion = Network._instance.protoTypePool.SAskQuestion.decode(data);
            self.lastresult = sAskQuestion.lastresult;
            self.questionid = sAskQuestion.questionid;
            self.questiontype = sAskQuestion.questiontype;
            self.npckey = sAskQuestion.npckey;
            self.xiangguanid = sAskQuestion.xiangguanid;
            self.lasttime = sAskQuestion.lasttime;
            self.cur = sAskQuestion.cur;
            self.num = sAskQuestion.num;
            self.totalexp = sAskQuestion.totalexp;
            self.totalmoney = sAskQuestion.totalmoney;
            self.helptimes = sAskQuestion.helptimes;
            self.grab = sAskQuestion.grab;
            self.rightanswer = sAskQuestion.rightanswer;
            console.log("S2C_ask_question sAskQuestion:", sAskQuestion);
            console.log("S2C_ask_question sAskQuestion.lastresult", sAskQuestion.lastresult);
            console.log("S2C_ask_question sAskQuestion.questionid", sAskQuestion.questionid);
            console.log("S2C_ask_question sAskQuestion.questiontype", sAskQuestion.questiontype);
            console.log("S2C_ask_question sAskQuestion.npckey", sAskQuestion.npckey);
            console.log("S2C_ask_question sAskQuestion.xiangguanid", sAskQuestion.xiangguanid);
            console.log("S2C_ask_question sAskQuestion.lasttime", sAskQuestion.lasttime);
            console.log("S2C_ask_question sAskQuestion.cur", sAskQuestion.cur);
            console.log("S2C_ask_question sAskQuestion.num", sAskQuestion.num);
            console.log("S2C_ask_question sAskQuestion.totalexp", sAskQuestion.totalexp);
            console.log("S2C_ask_question sAskQuestion.totalmoney", sAskQuestion.totalmoney);
            console.log("S2C_ask_question sAskQuestion.helptimes", sAskQuestion.helptimes);
            console.log("S2C_ask_question sAskQuestion.grab", sAskQuestion.grab);
            console.log("S2C_ask_question sAskQuestion.rightanswer", sAskQuestion.rightanswer);
        };
        return S2C_ask_question;
    }());
    hanlder.S2C_ask_question = S2C_ask_question;
    var S2C_general_summoncommand = /** @class */ (function () {
        function S2C_general_summoncommand() {
        }
        S2C_general_summoncommand.read = function (self, data) {
            var sGeneralSummonCommand = Network._instance.protoTypePool.SGeneralSummonCommand.decode(data);
            self.summontype = sGeneralSummonCommand.summontype;
            self.roleid = sGeneralSummonCommand.roleid;
            self.npckey = sGeneralSummonCommand.npckey;
            self.mapid = sGeneralSummonCommand.mapid;
            self.minimal = sGeneralSummonCommand.minimal;
            console.log("S2C_general_summoncommand sGeneralSummonCommand:", sGeneralSummonCommand);
            console.log("S2C_general_summoncommand sGeneralSummonCommand.summontype", sGeneralSummonCommand.summontype);
            console.log("S2C_general_summoncommand sGeneralSummonCommand.roleid", sGeneralSummonCommand.roleid);
            console.log("S2C_general_summoncommand sGeneralSummonCommand.npckey", sGeneralSummonCommand.npckey);
            console.log("S2C_general_summoncommand sGeneralSummonCommand.mapid", sGeneralSummonCommand.mapid);
            console.log("S2C_general_summoncommand sGeneralSummonCommand.minimal", sGeneralSummonCommand.minimal);
        };
        return S2C_general_summoncommand;
    }());
    hanlder.S2C_general_summoncommand = S2C_general_summoncommand;
    var S2C_winner_changetask = /** @class */ (function () {
        function S2C_winner_changetask() {
        }
        S2C_winner_changetask.read = function (self, data) {
            var sWinnerChangeTask = Network._instance.protoTypePool.SWinnerChangeTask.decode(data);
            console.log("S2C_winner_changetask sWinnerChangeTask:", sWinnerChangeTask);
        };
        return S2C_winner_changetask;
    }());
    hanlder.S2C_winner_changetask = S2C_winner_changetask;
    var S2C_query_impexamstate = /** @class */ (function () {
        function S2C_query_impexamstate() {
        }
        S2C_query_impexamstate.read = function (self, data) {
            var sQueryImpExamState = Network._instance.protoTypePool.SQueryImpExamState.decode(data);
            self.isattend = sQueryImpExamState.isattend;
            console.log("S2C_query_impexamstate sQueryImpExamState:", sQueryImpExamState);
            console.log("S2C_query_impexamstate sQueryImpExamState.isattend", sQueryImpExamState.isattend);
        };
        return S2C_query_impexamstate;
    }());
    hanlder.S2C_query_impexamstate = S2C_query_impexamstate;
    var S2C_imp_examhelp = /** @class */ (function () {
        function S2C_imp_examhelp() {
        }
        S2C_imp_examhelp.read = function (self, data) {
            self.helpcnt = data.readByte();
        };
        return S2C_imp_examhelp;
    }());
    hanlder.S2C_imp_examhelp = S2C_imp_examhelp;
    var S2C_send_impexamassist = /** @class */ (function () {
        function S2C_send_impexamassist() {
        }
        S2C_send_impexamassist.read = function (self, data) {
            self.impexamtype = data.readByte();
            self.assisttype = data.readByte();
            self.answerid = data.readInt32();
        };
        return S2C_send_impexamassist;
    }());
    hanlder.S2C_send_impexamassist = S2C_send_impexamassist;
    var S2C_send_impexamstart = /** @class */ (function () {
        function S2C_send_impexamstart() {
        }
        S2C_send_impexamstart.read = function (self, data) {
            self.remaintime = ByteArrayUtils.readLong(data);
            self.impexamtype = data.readByte();
            self.historymaxright = data.readInt32();
            self.historymintime = ByteArrayUtils.readLong(data);
        };
        return S2C_send_impexamstart;
    }());
    hanlder.S2C_send_impexamstart = S2C_send_impexamstart;
    var S2C_send_impexamstate = /** @class */ (function () {
        function S2C_send_impexamstate() {
        }
        S2C_send_impexamstate.read = function (self, data) {
            self.impexamdata = new game.modules.keju.models.ImpExamBeanVo();
            self.impexamdata.fromByteArray(data);
            self.historymintime = ByteArrayUtils.readLong(data);
            self.historymaxright = data.readInt32();
            self.titlename = ByteArrayUtils.readUtf16String(data);
            self.lost = data.readByte();
            self.impexamusetime = ByteArrayUtils.readLong(data);
        };
        return S2C_send_impexamstate;
    }());
    hanlder.S2C_send_impexamstate = S2C_send_impexamstate;
    var S2C_send_impexamprov = /** @class */ (function () {
        function S2C_send_impexamprov() {
        }
        S2C_send_impexamprov.read = function (self, data) {
            self.impexamdata = new game.modules.keju.models.ImpExamBeanVo();
            self.impexamdata.fromByteArray(data);
            self.lost = data.readByte();
            self.titlename = ByteArrayUtils.readUtf16String(data);
            var mapSize = data.readUint8();
            self.rightmap = new Laya.Dictionary();
            for (var index = 0; index < mapSize; index++) {
                self.rightmap.set(data.readInt32(), data.readInt32());
            }
        };
        return S2C_send_impexamprov;
    }());
    hanlder.S2C_send_impexamprov = S2C_send_impexamprov;
    var S2C_send_impexamvill = /** @class */ (function () {
        function S2C_send_impexamvill() {
        }
        S2C_send_impexamvill.read = function (self, data) {
            self.impexamdata = new game.modules.keju.models.ImpExamBeanVo();
            self.impexamdata.fromByteArray(data);
            self.historyright = data.readInt32();
            self.isover = data.readByte();
        };
        return S2C_send_impexamvill;
    }());
    hanlder.S2C_send_impexamvill = S2C_send_impexamvill;
    /** 进入游戏的时候发起的确认框 */
    var S2C_attend_impexam = /** @class */ (function () {
        function S2C_attend_impexam() {
        }
        S2C_attend_impexam.read = function (self, data) {
            self.impexamtype = data.readInt32();
        };
        return S2C_attend_impexam;
    }());
    hanlder.S2C_attend_impexam = S2C_attend_impexam;
    //驱逐成员返回
    var s2c_SFireMember = /** @class */ (function () {
        function s2c_SFireMember() {
        }
        s2c_SFireMember.read = function (self, data) {
            self.memberroleid = data.readLong();
        };
        return s2c_SFireMember;
    }());
    hanlder.s2c_SFireMember = s2c_SFireMember;
    //返回职务
    var s2c_SRefreshPosition = /** @class */ (function () {
        function s2c_SRefreshPosition() {
        }
        s2c_SRefreshPosition.read = function (self, data) {
            self.roleid = data.readLong();
            self.position = data.readInt32();
        };
        return s2c_SRefreshPosition;
    }());
    hanlder.s2c_SRefreshPosition = s2c_SRefreshPosition;
    //公会邀请
    var s2c_SClanInvitation = /** @class */ (function () {
        function s2c_SClanInvitation() {
        }
        s2c_SClanInvitation.read = function (self, data) {
            self.hostroleid = data.readLong();
            self.hostrolename = ByteArrayUtils.readUtf16String(data);
            self.clanlevel = data.readInt32();
            self.clannname = ByteArrayUtils.readUtf16String(data);
            self.invitetype = data.readByte();
        };
        return s2c_SClanInvitation;
    }());
    hanlder.s2c_SClanInvitation = s2c_SClanInvitation;
    //服务器返回新宗旨
    var s2c_SChangeClanAim = /** @class */ (function () {
        function s2c_SChangeClanAim() {
        }
        s2c_SChangeClanAim.read = function (self, data) {
            self.newaim = ByteArrayUtils.readUtf16String(data);
        };
        return s2c_SChangeClanAim;
    }());
    hanlder.s2c_SChangeClanAim = s2c_SChangeClanAim;
    //服务器返回拒绝申请人员
    var s2c_SRefuseApply = /** @class */ (function () {
        function s2c_SRefuseApply() {
        }
        s2c_SRefuseApply.read = function (self, data) {
            self.applyroleid = ByteArrayUtils.readLong(data);
        };
        return s2c_SRefuseApply;
    }());
    hanlder.s2c_SRefuseApply = s2c_SRefuseApply;
    //服务端返回申请加入公会的人员列表
    var s2c_SRequestApply = /** @class */ (function () {
        function s2c_SRequestApply() {
            this.applylist = [];
        }
        s2c_SRequestApply.read = function (self, data) {
            var RoleBaseInfoVo;
            var size = data.readInt8();
            for (var i = 0; i < size; i++) {
                RoleBaseInfoVo = new game.modules.family.models.RoleBaseInfoVo();
                RoleBaseInfoVo.fromByteArray(data);
                self.applylist.push(RoleBaseInfoVo);
            }
        };
        return s2c_SRequestApply;
    }());
    hanlder.s2c_SRequestApply = s2c_SRequestApply;
    //服务端响应客户端请求公会列表协议：没有公会
    var s2c_SLeaveClan = /** @class */ (function () {
        function s2c_SLeaveClan() {
        }
        s2c_SLeaveClan.read = function (self, data) {
            // var SLeaveClan = Network._instance.protoTypePool.SLeaveClan.decode(data);
            // console.log("SLeaveClan memberid:", SLeaveClan.memberid);
            self.memberid = data.readLong();
        };
        return s2c_SLeaveClan;
    }());
    hanlder.s2c_SLeaveClan = s2c_SLeaveClan;
    //服务端响应客户端请求公会界面协议：有公会
    var s2c_SOpenClan = /** @class */ (function () {
        function s2c_SOpenClan() {
        }
        s2c_SOpenClan.read = function (self, data) {
            self.index = data.readInt32();
            self.clanname = ByteArrayUtils.readUtf16String(data);
            self.clanid = data.readLong();
            self.clanlevel = data.readInt32();
            self.membersnum = data.readInt32();
            self.clanmaster = ByteArrayUtils.readUtf16String(data);
            self.masterid = data.readLong();
            self.vicemasterid = data.readLong();
            self.clancreator = ByteArrayUtils.readUtf16String(data);
            self.clanaim = ByteArrayUtils.readUtf16String(data);
            self.memberlist = [];
            var memberlistSize = data.readUint8();
            var clanMember;
            for (var index = 0; index < memberlistSize; index++) {
                clanMember = new game.modules.family.models.ClanMemberVo();
                clanMember.fromByteArray(data);
                self.memberlist.push(clanMember);
            } //ClanMember
            self.money = data.readInt32();
            var mapSize = data.readUint8();
            self.house = new Laya.Dictionary();
            for (var index = 0; index < mapSize; index++) {
                self.house.set(data.readUint32(), data.readUint32());
            }
            self.oldclanname = ByteArrayUtils.readUtf16String(data);
            self.clancreatorid = data.readLong();
            self.autostate = data.readInt32();
            self.requestlevel = data.readInt16();
            self.applylevel = data.readInt16();
            self.costeverymoney = data.readInt32();
            mapSize = data.readUint8();
            self.costmax = new Laya.Dictionary();
            for (var index = 0; index < mapSize; index++) {
                self.costmax.set(data.readUint32(), data.readUint32());
            }
            mapSize = data.readUint8();
            self.claninstservice = new Laya.Dictionary();
            for (var index = 0; index < mapSize; index++) {
                self.claninstservice.set(data.readUint32(), data.readUint32());
            }
        };
        return s2c_SOpenClan;
    }());
    hanlder.s2c_SOpenClan = s2c_SOpenClan;
    //服务端响应客户端请求公会列表协议：没有公会
    var s2c_SOpenClanList = /** @class */ (function () {
        function s2c_SOpenClanList() {
            this.clanlist = [];
        }
        s2c_SOpenClanList.read = function (self, data) {
            self.currpage = data.readInt32();
            var ClanSummaryInfoVo;
            var size = data.readInt8();
            for (var i = 0; i < size; i++) {
                ClanSummaryInfoVo = new game.modules.family.models.ClanSummaryInfoVo();
                ClanSummaryInfoVo.fromByteArray(data);
                self.clanlist.push(ClanSummaryInfoVo);
            }
        };
        return s2c_SOpenClanList;
    }());
    hanlder.s2c_SOpenClanList = s2c_SOpenClanList;
    //返回请求药房信息
    var s2c_SOpenClanMedic = /** @class */ (function () {
        function s2c_SOpenClanMedic() {
            this.medicitemlist = [];
        }
        s2c_SOpenClanMedic.read = function (self, data) {
            self.selecttype = data.readInt32();
            self.buyitemnum = data.readInt32();
            var MedicItemVo;
            var size = data.readInt8();
            for (var i = 0; i < size; i++) {
                MedicItemVo = new game.modules.family.models.MedicItemVo();
                MedicItemVo.fromByteArray(data);
                self.medicitemlist.push(MedicItemVo);
            }
        };
        return s2c_SOpenClanMedic;
    }());
    hanlder.s2c_SOpenClanMedic = s2c_SOpenClanMedic;
    //返回寻宝结果
    var s2c_SLengendAnYetask = /** @class */ (function () {
        function s2c_SLengendAnYetask() {
        }
        s2c_SLengendAnYetask.read = function (self, data) {
            self.result = data.readInt32();
        };
        return s2c_SLengendAnYetask;
    }());
    hanlder.s2c_SLengendAnYetask = s2c_SLengendAnYetask;
    /** 暗夜马戏团任务相关 */
    var s2c_SRefreshAnYeData = /** @class */ (function () {
        function s2c_SRefreshAnYeData() {
        }
        s2c_SRefreshAnYeData.read = function (self, data) {
            self.times = data.readInt32();
            self.renxins = data.readInt32();
            self.anyetasks = [];
            var _dataSize = ByteArrayUtils.uncompact_uint32(data);
            for (var i = 0; i < _dataSize; i++) {
                var _anyetasks = new AnYeTaskVo();
                _anyetasks.fromByteArray(data);
                self.anyetasks.push(_anyetasks);
            }
            self.awardexp = data.readLong();
            self.awardsilver = data.readLong();
            self.swardgold = data.readLong();
            self.jointime = data.readLong();
            self.legendpos = data.readInt32();
        };
        return s2c_SRefreshAnYeData;
    }());
    hanlder.s2c_SRefreshAnYeData = s2c_SRefreshAnYeData;
    //回复任务状态
    var s2c_SQueryCircleTaskState = /** @class */ (function () {
        function s2c_SQueryCircleTaskState() {
        }
        s2c_SQueryCircleTaskState.read = function (self, data) {
            self.questid = data.readUint32();
            self.state = data.readUint32();
        };
        return s2c_SQueryCircleTaskState;
    }());
    hanlder.s2c_SQueryCircleTaskState = s2c_SQueryCircleTaskState;
    //服务通知客户端任性
    var s2c_SRenXingCircleTask = /** @class */ (function () {
        function s2c_SRenXingCircleTask() {
        }
        s2c_SRenXingCircleTask.read = function (self, data) {
            var SRenXingCircleTask = Network._instance.protoTypePool.SRenXingCircleTask.decode(data);
            console.log("SRenXingCircleTask serviceid:", SRenXingCircleTask.serviceid);
            console.log("SRenXingCircleTask questid:", SRenXingCircleTask.questid);
            console.log("SRenXingCircleTask renxingtimes:", SRenXingCircleTask.renxingtimes);
            console.log("SRenXingCircleTask npckey:", SRenXingCircleTask.npckey);
        };
        return s2c_SRenXingCircleTask;
    }());
    hanlder.s2c_SRenXingCircleTask = s2c_SRenXingCircleTask;
    //问卷调查获得称号和经验
    var s2c_SQuestionnaireTitleAndExp = /** @class */ (function () {
        function s2c_SQuestionnaireTitleAndExp() {
        }
        s2c_SQuestionnaireTitleAndExp.read = function (self, data) {
            var SQuestionnaireTitleAndExp = Network._instance.protoTypePool.SQuestionnaireTitleAndExp.decode(data);
            console.log("SQuestionnaireTitleAndExp title:", SQuestionnaireTitleAndExp.title);
            console.log("SQuestionnaireTitleAndExp exp:", SQuestionnaireTitleAndExp.exp);
        };
        return s2c_SQuestionnaireTitleAndExp;
    }());
    hanlder.s2c_SQuestionnaireTitleAndExp = s2c_SQuestionnaireTitleAndExp;
    /** 任务数据发生变化时，服务器向客户端发送的刷新消息 */
    var s2c_SRefreshQuestData = /** @class */ (function () {
        function s2c_SRefreshQuestData() {
        }
        s2c_SRefreshQuestData.read = function (self, data) {
            self.questid = data.readInt32();
            self.datas = new Laya.Dictionary();
            var size = data.readUint8();
            for (var index = 0; index < size; index++) {
                self.datas.set(data.readInt32(), data.readLong());
            }
        };
        return s2c_SRefreshQuestData;
    }());
    hanlder.s2c_SRefreshQuestData = s2c_SRefreshQuestData;
    //角色上线的时候服务器发给客户端所有当前未完成的任务列表
    var s2c_SSendActiveQuestList = /** @class */ (function () {
        function s2c_SSendActiveQuestList() {
        }
        s2c_SSendActiveQuestList.read = function (self, data) {
            self.memberlist = [];
            var memberlistSize = data.readUint8();
            var activeQuestData;
            for (var index = 0; index < memberlistSize; index++) {
                activeQuestData = new game.modules.task.models.ActiveQuestDataVo();
                activeQuestData.fromByteArray(data);
                self.memberlist.push(activeQuestData);
            }
        };
        return s2c_SSendActiveQuestList;
    }());
    hanlder.s2c_SSendActiveQuestList = s2c_SSendActiveQuestList;
    var s2c_SRefreshActiveQuest = /** @class */ (function () {
        function s2c_SRefreshActiveQuest() {
        }
        s2c_SRefreshActiveQuest.read = function (self, data) {
            self.questdata = new game.modules.task.models.ActiveQuestDataVo();
            self.questdata.fromByteArray(data);
        };
        return s2c_SRefreshActiveQuest;
    }());
    hanlder.s2c_SRefreshActiveQuest = s2c_SRefreshActiveQuest;
    var s2c_SRefreshSpecialQuestState = /** @class */ (function () {
        function s2c_SRefreshSpecialQuestState() {
        }
        s2c_SRefreshSpecialQuestState.read = function (self, data) {
            self.questid = data.readUint32();
            self.state = data.readUint32();
        };
        return s2c_SRefreshSpecialQuestState;
    }());
    hanlder.s2c_SRefreshSpecialQuestState = s2c_SRefreshSpecialQuestState;
    var s2c_SRefreshSpecialQuest = /** @class */ (function () {
        function s2c_SRefreshSpecialQuest() {
        }
        s2c_SRefreshSpecialQuest.read = function (self, data) {
            self.menpaitaks = new game.modules.task.models.SRefreshSpecialQuestVo();
            self.menpaitaks.fromByteArray(data);
        };
        return s2c_SRefreshSpecialQuest;
    }());
    hanlder.s2c_SRefreshSpecialQuest = s2c_SRefreshSpecialQuest;
    //buff改变结果更新协议
    var s2c_SBuffChangeResult = /** @class */ (function () {
        function s2c_SBuffChangeResult() {
        }
        s2c_SBuffChangeResult.read = function (self, data) {
            /*var SBuffChangeResult = Network._instance.protoTypePool.SBuffChangeResult.decode(data);
            self.addedbuffs = SBuffChangeResult.addedbuffs;
            console.log("SBuffChangeResult agentType:", SBuffChangeResult.agentType);*/
            self.agentType = data.readUint32();
            self.id = data.readLong();
            self.petid = data.readUint32();
            self.addedbuffs = new Laya.Dictionary();
            var addedbuffsSize = data.readUint8();
            /*let sBuffChangeResult:SBuffChangeResultVo;
            for (var index = 0; index < addedbuffsSize; index++) {
                sBuffChangeResult = new SBuffChangeResultVo();
                self.addedbuffs.set(data.readUint32(),sBuffChangeResult);
                sBuffChangeResult.fromByteArray(data);
            }
            self.deletedBuffs = [];
            let deletedBuffsSize:number = data.readUint8();
            for (var index = 0; index < deletedBuffsSize; index++) {
                self.deletedBuffs.push(data.readLong());
            }*/
            console.log("s2c_SBuffChangeResult self:", self);
        };
        return s2c_SBuffChangeResult;
    }());
    hanlder.s2c_SBuffChangeResult = s2c_SBuffChangeResult;
    //
    var s2c_SSetBattleFlag = /** @class */ (function () {
        function s2c_SSetBattleFlag() {
        }
        s2c_SSetBattleFlag.read = function (self, data) {
            var SSetBattleFlag = Network._instance.protoTypePool.SSetBattleFlag.decode(data);
            console.log("SSetBattleFlag opttype:", SSetBattleFlag.opttype);
            console.log("SSetBattleFlag index:", SSetBattleFlag.index);
            console.log("SSetBattleFlag flag:", SSetBattleFlag.flag);
        };
        return s2c_SSetBattleFlag;
    }());
    hanlder.s2c_SSetBattleFlag = s2c_SSetBattleFlag;
    // 
    var s2c_SSetCommander = /** @class */ (function () {
        function s2c_SSetCommander() {
        }
        s2c_SSetCommander.read = function (self, data) {
            self.roleId = ByteArrayUtils.readLong(data);
        };
        return s2c_SSetCommander;
    }());
    hanlder.s2c_SSetCommander = s2c_SSetCommander;
    // 
    var s2c_SModifyBattleFlag = /** @class */ (function () {
        function s2c_SModifyBattleFlag() {
        }
        s2c_SModifyBattleFlag.read = function (self, data) {
            var SModifyBattleFlag = Network._instance.protoTypePool.SModifyBattleFlag.decode(data);
            console.log("SModifyBattleFlag opttype:", SModifyBattleFlag.opttype);
            console.log("SModifyBattleFlag index:", SModifyBattleFlag.index);
            console.log("SModifyBattleFlag flag:", SModifyBattleFlag.flag);
        };
        return s2c_SModifyBattleFlag;
    }());
    hanlder.s2c_SModifyBattleFlag = s2c_SModifyBattleFlag;
    // 
    var s2c_SSendBattleFlag = /** @class */ (function () {
        function s2c_SSendBattleFlag() {
            this.friendflags = [];
            this.enemyflags = [];
        }
        s2c_SSendBattleFlag.read = function (self, data) {
            var friendflagsSize = ByteArrayUtils.uncompact_uint32(data);
            for (var index = 0; index < friendflagsSize; index++) {
                self.friendflags.push(ByteArrayUtils.readUtf16String(data));
            }
            var enemyflagsSize = ByteArrayUtils.uncompact_uint32(data);
            for (var index = 0; index < enemyflagsSize; index++) {
                self.enemyflags.push(ByteArrayUtils.readUtf16String(data));
            }
        };
        return s2c_SSendBattleFlag;
    }());
    hanlder.s2c_SSendBattleFlag = s2c_SSendBattleFlag;
    // 返回玩家来应战(第一个确认按钮)
    var s2c_SAcceptLiveDieBattleFirst = /** @class */ (function () {
        function s2c_SAcceptLiveDieBattleFirst() {
        }
        s2c_SAcceptLiveDieBattleFirst.read = function (self, data) {
            self.hostroleid = data.readLong();
            self.hostrolename = ByteArrayUtils.readUtf16String(data);
        };
        return s2c_SAcceptLiveDieBattleFirst;
    }());
    hanlder.s2c_SAcceptLiveDieBattleFirst = s2c_SAcceptLiveDieBattleFirst;
    // 点赞
    var s2c_SLiveDieBattleGiveRose = /** @class */ (function () {
        function s2c_SLiveDieBattleGiveRose() {
        }
        s2c_SLiveDieBattleGiveRose.read = function (self, data) {
            self.vedioid = ByteArrayUtils.readUtf16String(data);
            self.rosenum = data.readInt32();
            self.roseflag = data.readInt32();
        };
        return s2c_SLiveDieBattleGiveRose;
    }());
    hanlder.s2c_SLiveDieBattleGiveRose = s2c_SLiveDieBattleGiveRose;
    // 返回请求生死战排行界面
    var s2c_SLiveDieBattleRankView = /** @class */ (function () {
        function s2c_SLiveDieBattleRankView() {
        }
        s2c_SLiveDieBattleRankView.read = function (self, data) {
            self.modeltype = data.readInt32();
            self.rolefightlist = [];
            var _listSize = ByteArrayUtils.uncompact_uint32(data);
            for (var i = 0; i < _listSize; i++) {
                var _rolewatch = new game.modules.aliveordead.models.LDVideoRoleInfoDesVo();
                _rolewatch.fromByteArray(data);
                self.rolefightlist.push(_rolewatch);
            }
        };
        return s2c_SLiveDieBattleRankView;
    }());
    hanlder.s2c_SLiveDieBattleRankView = s2c_SLiveDieBattleRankView;
    // 返回请求生死战观战界面
    var s2c_SLiveDieBattleWatchView = /** @class */ (function () {
        function s2c_SLiveDieBattleWatchView() {
        }
        s2c_SLiveDieBattleWatchView.read = function (self, data) {
            self.rolewatchlist = [];
            var _listSize = ByteArrayUtils.uncompact_uint32(data);
            for (var i = 0; i < _listSize; i++) {
                var _rolewatch = new game.modules.aliveordead.models.LDRoleInfoWatchDesVo();
                _rolewatch.fromByteArray(data);
                self.rolewatchlist.push(_rolewatch);
            }
        };
        return s2c_SLiveDieBattleWatchView;
    }());
    hanlder.s2c_SLiveDieBattleWatchView = s2c_SLiveDieBattleWatchView;
    // 确定是否接受战书
    var s2c_SAcceptInvitationLiveDieBattle = /** @class */ (function () {
        function s2c_SAcceptInvitationLiveDieBattle() {
        }
        s2c_SAcceptInvitationLiveDieBattle.read = function (self, data) {
        };
        return s2c_SAcceptInvitationLiveDieBattle;
    }());
    hanlder.s2c_SAcceptInvitationLiveDieBattle = s2c_SAcceptInvitationLiveDieBattle;
    /** 返回是否接受下战书结果 */
    var s2c_SInvitationLiveDieBattleOK = /** @class */ (function () {
        function s2c_SInvitationLiveDieBattleOK() {
        }
        s2c_SInvitationLiveDieBattleOK.read = function (self, data) {
            self.sourceid = data.readLong();
            self.sourcename = ByteArrayUtils.readUtf16String(data);
            self.selecttype = data.readInt32();
        };
        return s2c_SInvitationLiveDieBattleOK;
    }());
    hanlder.s2c_SInvitationLiveDieBattleOK = s2c_SInvitationLiveDieBattleOK;
    /** 返回下战书 */
    var s2c_SInvitationLiveDieBattle = /** @class */ (function () {
        function s2c_SInvitationLiveDieBattle() {
        }
        s2c_SInvitationLiveDieBattle.read = function (self, data) {
            self.objectid = data.readLong();
            self.objectname = ByteArrayUtils.readUtf16String(data);
            self.selecttype = data.readInt32();
            self.costmoney = data.readInt32();
        };
        return s2c_SInvitationLiveDieBattle;
    }());
    hanlder.s2c_SInvitationLiveDieBattle = s2c_SInvitationLiveDieBattle;
    // 请求播放录像返回
    var s2c_SReqRePlay = /** @class */ (function () {
        function s2c_SReqRePlay() {
        }
        s2c_SReqRePlay.read = function (self, data) {
            var SReqRePlay = Network._instance.protoTypePool.SReqRePlay.decode(data);
            console.log("SReqRePlay candoit:", SReqRePlay.candoit);
            console.log("SReqRePlay battleCameraUrl:", SReqRePlay.battleCameraUrl);
        };
        return s2c_SReqRePlay;
    }());
    hanlder.s2c_SReqRePlay = s2c_SReqRePlay;
    // 返回录像url
    var s2c_SSendCameraUrl = /** @class */ (function () {
        function s2c_SSendCameraUrl() {
        }
        s2c_SSendCameraUrl.read = function (self, data) {
            var SSendCameraUrl = Network._instance.protoTypePool.SSendCameraUrl.decode(data);
            console.log("SSendCameraUrl battleid:", SSendCameraUrl.battleid);
            console.log("SSendCameraUrl isHave:", SSendCameraUrl.isHave);
            console.log("SSendCameraUrl sizebeforezip:", SSendCameraUrl.sizebeforezip);
            console.log("SSendCameraUrl sizeafterzip:", SSendCameraUrl.sizeafterzip);
            console.log("SSendCameraUrl battleCameraUrl:", SSendCameraUrl.battleCameraUrl);
        };
        return s2c_SSendCameraUrl;
    }());
    hanlder.s2c_SSendCameraUrl = s2c_SSendCameraUrl;
    // 是拒绝还是接受切磋
    var s2c_SInvitationPlayPKResult = /** @class */ (function () {
        function s2c_SInvitationPlayPKResult() {
        }
        s2c_SInvitationPlayPKResult.read = function (self, data) {
            var SInvitationPlayPKResult = Network._instance.protoTypePool.SInvitationPlayPKResult.decode(data);
        };
        return s2c_SInvitationPlayPKResult;
    }());
    hanlder.s2c_SInvitationPlayPKResult = s2c_SInvitationPlayPKResult;
    var s2c_SInvitationPlayPK = /** @class */ (function () {
        function s2c_SInvitationPlayPK() {
        }
        s2c_SInvitationPlayPK.read = function (self, data) {
            self.sourceid = data.readLong();
            // self.rolename = data.readUTFBytes(data.readUint8());
            self.rolename = ByteArrayUtils.readUtf16String(data);
            self.rolelevel = data.readInt32();
            self.teamnum = data.readInt32();
        };
        return s2c_SInvitationPlayPK;
    }());
    hanlder.s2c_SInvitationPlayPK = s2c_SInvitationPlayPK;
    // 返回对手界面
    var s2c_SPlayPKFightView = /** @class */ (function () {
        function s2c_SPlayPKFightView() {
        }
        s2c_SPlayPKFightView.read = function (self, data) {
            var SPlayPKFightView = Network._instance.protoTypePool.SPlayPKFightView.decode(data);
            self.rolelist = SPlayPKFightView.rolelist;
            self.rolewatchlist = SPlayPKFightView.rolewatchlist;
            console.log("SPlayPKFightView modeltype:", SPlayPKFightView.modeltype);
            console.log("SPlayPKFightView school:", SPlayPKFightView.school);
            console.log("SPlayPKFightView levelindex:", SPlayPKFightView.levelindex);
            console.log("SPlayPKFightView rolelist:", SPlayPKFightView.rolelist);
            console.log("SPlayPKFightView rolewatchlist:", SPlayPKFightView.rolewatchlist);
        };
        return s2c_SPlayPKFightView;
    }());
    hanlder.s2c_SPlayPKFightView = s2c_SPlayPKFightView;
    // 服务器发送箱子状态
    var s2c_SPvP5OpenBoxState = /** @class */ (function () {
        function s2c_SPvP5OpenBoxState() {
        }
        s2c_SPvP5OpenBoxState.read = function (self, data) {
            self.boxtype = data.readByte();
            self.state = data.readByte();
        };
        return s2c_SPvP5OpenBoxState;
    }());
    hanlder.s2c_SPvP5OpenBoxState = s2c_SPvP5OpenBoxState;
    // 服务器发送场内战斗信息
    var s2c_SPvP5BattleInfo = /** @class */ (function () {
        function s2c_SPvP5BattleInfo() {
            this.parameters = [];
        }
        s2c_SPvP5BattleInfo.read = function (self, data) {
            self.ismine = data.readByte();
            self.msgId = data.readInt32();
            var parametersSize = ByteArrayUtils.uncompact_uint32(data);
            for (var index = 0; index < parametersSize; index++) {
                self.parameters.push(ByteArrayUtils.readUtf16String(data));
            }
        };
        return s2c_SPvP5BattleInfo;
    }());
    hanlder.s2c_SPvP5BattleInfo = s2c_SPvP5BattleInfo;
    // 通知客户端匹配结果
    var s2c_SPvP5MatchResult = /** @class */ (function () {
        function s2c_SPvP5MatchResult() {
        }
        s2c_SPvP5MatchResult.read = function (self, data) {
            self.targets = [];
            var targetsSize = data.readUint8();
            var PvP3RoleSingleMatch;
            for (var index = 0; index < targetsSize; index++) {
                PvP3RoleSingleMatch = new game.modules.xianhui.models.PvP3RoleSingleMatchVo();
                PvP3RoleSingleMatch.fromByteArray(data);
                self.targets.push(PvP3RoleSingleMatch);
            }
        };
        return s2c_SPvP5MatchResult;
    }());
    hanlder.s2c_SPvP5MatchResult = s2c_SPvP5MatchResult;
    // 服务器发送准备状态
    var s2c_SPvP5ReadyFight = /** @class */ (function () {
        function s2c_SPvP5ReadyFight() {
        }
        s2c_SPvP5ReadyFight.read = function (self, data) {
        };
        return s2c_SPvP5ReadyFight;
    }());
    hanlder.s2c_SPvP5ReadyFight = s2c_SPvP5ReadyFight;
    // 服务器发送排行榜
    var s2c_SPvP5RankingList = /** @class */ (function () {
        function s2c_SPvP5RankingList() {
            this.roleScores1 = [];
            this.roleScores2 = [];
        }
        s2c_SPvP5RankingList.read = function (self, data) {
            self.roleScores1 = [];
            var roleScores1Size = data.readUint8();
            var pvP5RoleSingleScore1;
            for (var index = 0; index < roleScores1Size; index++) {
                pvP5RoleSingleScore1 = new game.modules.xianhui.models.PvP5RoleSingleScoreVo();
                pvP5RoleSingleScore1.fromByteArray(data);
                self.roleScores1.push(pvP5RoleSingleScore1);
            }
            self.roleScores2 = [];
            var roleScores2Size = data.readUint8();
            var pvP5RoleSingleScore2;
            for (var index = 0; index < roleScores2Size; index++) {
                pvP5RoleSingleScore2 = new game.modules.xianhui.models.PvP5RoleSingleScoreVo();
                pvP5RoleSingleScore2.fromByteArray(data);
                self.roleScores2.push(pvP5RoleSingleScore2);
            }
            self.myScore = new game.modules.xianhui.models.PvP5RoleSingleScoreMidVo();
            self.myScore.fromByteArray(data);
        };
        return s2c_SPvP5RankingList;
    }());
    hanlder.s2c_SPvP5RankingList = s2c_SPvP5RankingList;
    // 服务器发送自己的信息
    var s2c_SPvP5MyInfo = /** @class */ (function () {
        function s2c_SPvP5MyInfo() {
        }
        s2c_SPvP5MyInfo.read = function (self, data) {
            self.firstwin = data.readByte();
            self.fivefight = data.readByte();
            self.battlenum = data.readByte();
            self.winnum = data.readByte();
            self.combowinnum = data.readByte();
            self.score = data.readInt32();
            self.camp = data.readByte();
            self.waitstarttime = data.readLong();
        };
        return s2c_SPvP5MyInfo;
    }());
    hanlder.s2c_SPvP5MyInfo = s2c_SPvP5MyInfo;
    // 服务器发送箱子状态
    var s2c_SPvP3OpenBoxState = /** @class */ (function () {
        function s2c_SPvP3OpenBoxState() {
        }
        s2c_SPvP3OpenBoxState.read = function (self, data) {
            self.boxtype = data.readByte();
            self.state = data.readByte();
        };
        return s2c_SPvP3OpenBoxState;
    }());
    hanlder.s2c_SPvP3OpenBoxState = s2c_SPvP3OpenBoxState;
    // 服务器发送场内战斗信息
    var s2c_SPvP3BattleInfo = /** @class */ (function () {
        function s2c_SPvP3BattleInfo() {
            this.parameters = [];
        }
        s2c_SPvP3BattleInfo.read = function (self, data) {
            self.ismine = data.readByte();
            self.msgId = data.readInt32();
            var parametersSize = ByteArrayUtils.uncompact_uint32(data);
            for (var index = 0; index < parametersSize; index++) {
                self.parameters.push(ByteArrayUtils.readUtf16String(data));
            }
        };
        return s2c_SPvP3BattleInfo;
    }());
    hanlder.s2c_SPvP3BattleInfo = s2c_SPvP3BattleInfo;
    // 通知客户端匹配结果
    var s2c_SPvP3MatchResult = /** @class */ (function () {
        function s2c_SPvP3MatchResult() {
        }
        s2c_SPvP3MatchResult.read = function (self, data) {
            self.targets = [];
            var targetsSize = data.readUint8();
            var PvP3RoleSingleMatch;
            for (var index = 0; index < targetsSize; index++) {
                PvP3RoleSingleMatch = new game.modules.xianhui.models.PvP3RoleSingleMatchVo();
                PvP3RoleSingleMatch.fromByteArray(data);
                self.targets.push(PvP3RoleSingleMatch);
            }
        };
        return s2c_SPvP3MatchResult;
    }());
    hanlder.s2c_SPvP3MatchResult = s2c_SPvP3MatchResult;
    // 服务器发送准备状态
    var s2c_SPvP3ReadyFight = /** @class */ (function () {
        function s2c_SPvP3ReadyFight() {
        }
        s2c_SPvP3ReadyFight.read = function (self, data) {
            self.ready = data.readByte();
        };
        return s2c_SPvP3ReadyFight;
    }());
    hanlder.s2c_SPvP3ReadyFight = s2c_SPvP3ReadyFight;
    // 服务器发送排行榜
    var s2c_SPvP3RankingList = /** @class */ (function () {
        function s2c_SPvP3RankingList() {
        }
        s2c_SPvP3RankingList.read = function (self, data) {
            self.history = data.readByte();
            self.roleScores = [];
            var roleScoresSize = data.readUint8();
            var pvP3RoleSingleScore;
            for (var index = 0; index < roleScoresSize; index++) {
                pvP3RoleSingleScore = new game.modules.xianhui.models.PvP3RoleSingleScoreVo();
                pvP3RoleSingleScore.fromByteArray(data);
                self.roleScores.push(pvP3RoleSingleScore);
            }
            self.myScore = [];
            var myScoreSize = data.readUint8();
            var pvP3RoleSingleScoreMid;
            for (var index = 0; index < myScoreSize; index++) {
                pvP3RoleSingleScoreMid = new game.modules.xianhui.models.PvP3RoleSingleScoreMidVo();
                pvP3RoleSingleScoreMid.fromByteArray(data);
                self.myScore.push(pvP3RoleSingleScoreMid);
            }
        };
        return s2c_SPvP3RankingList;
    }());
    hanlder.s2c_SPvP3RankingList = s2c_SPvP3RankingList;
    // 服务器发送自己的信息
    var s2c_SPvP3MyInfo = /** @class */ (function () {
        function s2c_SPvP3MyInfo() {
        }
        s2c_SPvP3MyInfo.read = function (self, data) {
            self.firstwin = data.readByte();
            self.tenfight = data.readByte();
            self.eightwin = data.readByte();
            self.battlenum = data.readByte();
            self.winnum = data.readByte();
            self.combowinnum = data.readInt16();
            self.score = data.readInt32();
            self.ready = data.readByte();
        };
        return s2c_SPvP3MyInfo;
    }());
    hanlder.s2c_SPvP3MyInfo = s2c_SPvP3MyInfo;
    // 服务器发送箱子状态
    var s2c_SPvP1OpenBoxState = /** @class */ (function () {
        function s2c_SPvP1OpenBoxState() {
        }
        s2c_SPvP1OpenBoxState.read = function (self, data) {
            var SPvP1OpenBoxState = Network._instance.protoTypePool.SPvP1OpenBoxState.decode(data);
            console.log("SPvP1OpenBoxState boxtype:", SPvP1OpenBoxState.boxtype);
            console.log("SPvP1OpenBoxState state:", SPvP1OpenBoxState.state);
        };
        return s2c_SPvP1OpenBoxState;
    }());
    hanlder.s2c_SPvP1OpenBoxState = s2c_SPvP1OpenBoxState;
    // 通知客户端匹配结果
    var s2c_SPvP1MatchResult = /** @class */ (function () {
        function s2c_SPvP1MatchResult() {
        }
        s2c_SPvP1MatchResult.read = function (self, data) {
            var SPvP1MatchResult = Network._instance.protoTypePool.SPvP1MatchResult.decode(data);
            self.target = SPvP1MatchResult.target;
            console.log("SPvP1MatchResult target:", SPvP1MatchResult.target);
        };
        return s2c_SPvP1MatchResult;
    }());
    hanlder.s2c_SPvP1MatchResult = s2c_SPvP1MatchResult;
    // 服务器发送场内战斗信息
    var s2c_SPvP1BattleInfo = /** @class */ (function () {
        function s2c_SPvP1BattleInfo() {
        }
        s2c_SPvP1BattleInfo.read = function (self, data) {
            var SPvP1BattleInfo = Network._instance.protoTypePool.SPvP1BattleInfo.decode(data);
            self.parameters = SPvP1BattleInfo.parameters;
            console.log("SPvP1BattleInfo ismine:", SPvP1BattleInfo.ismine);
            console.log("SPvP1BattleInfo msgId:", SPvP1BattleInfo.msgId);
            console.log("SPvP1BattleInfo parameters:", SPvP1BattleInfo.parameters);
        };
        return s2c_SPvP1BattleInfo;
    }());
    hanlder.s2c_SPvP1BattleInfo = s2c_SPvP1BattleInfo;
    // 服务器发送准备状态
    var s2c_SPvP1ReadyFight = /** @class */ (function () {
        function s2c_SPvP1ReadyFight() {
        }
        s2c_SPvP1ReadyFight.read = function (self, data) {
            var SPvP1ReadyFight = Network._instance.protoTypePool.SPvP1ReadyFight.decode(data);
            console.log("SPvP1ReadyFight ready:", SPvP1ReadyFight.ready);
        };
        return s2c_SPvP1ReadyFight;
    }());
    hanlder.s2c_SPvP1ReadyFight = s2c_SPvP1ReadyFight;
    // 服务器发送排行榜
    var s2c_SPvP1RankingList = /** @class */ (function () {
        function s2c_SPvP1RankingList() {
        }
        s2c_SPvP1RankingList.read = function (self, data) {
            var SPvP1RankingList = Network._instance.protoTypePool.SPvP1RankingList.decode(data);
            self.roleScores = SPvP1RankingList.roleScores;
            self.roleScores3 = SPvP1RankingList.roleScores3;
            self.roleWins = SPvP1RankingList.roleWins;
            console.log("SPvP1RankingList roleScores:", SPvP1RankingList.roleScores);
            console.log("SPvP1RankingList roleScores3:", SPvP1RankingList.roleScores3);
            console.log("SPvP1RankingList roleWins:", SPvP1RankingList.roleWins);
        };
        return s2c_SPvP1RankingList;
    }());
    hanlder.s2c_SPvP1RankingList = s2c_SPvP1RankingList;
    // 服务器发送自己的信息
    var s2c_SPvP1MyInfo = /** @class */ (function () {
        function s2c_SPvP1MyInfo() {
        }
        s2c_SPvP1MyInfo.read = function (self, data) {
            var SPvP1MyInfo = Network._instance.protoTypePool.SPvP1MyInfo.decode(data);
            console.log("s2c_SPvP1MyInfo firstwin:", SPvP1MyInfo.firstwin);
            console.log("s2c_SPvP1MyInfo tenfight:", SPvP1MyInfo.tenfight);
            console.log("s2c_SPvP1MyInfo tencombowin:", SPvP1MyInfo.tencombowin);
            console.log("s2c_SPvP1MyInfo battlenum:", SPvP1MyInfo.battlenum);
            console.log("s2c_SPvP1MyInfo score:", SPvP1MyInfo.score);
            console.log("s2c_SPvP1MyInfo winnum:", SPvP1MyInfo.winnum);
            console.log("s2c_SPvP1MyInfo combowinnum:", SPvP1MyInfo.combowinnum);
            console.log("s2c_SPvP1MyInfo formation:", SPvP1MyInfo.formation);
            console.log("s2c_SPvP1MyInfo ready:", SPvP1MyInfo.ready);
            console.log("s2c_SPvP1MyInfo jieci:", SPvP1MyInfo.jieci);
            console.log("s2c_SPvP1MyInfo changci:", SPvP1MyInfo.changci);
        };
        return s2c_SPvP1MyInfo;
    }());
    hanlder.s2c_SPvP1MyInfo = s2c_SPvP1MyInfo;
    // 20级之前死了发送这个消息
    var s2c_SDeadLess20 = /** @class */ (function () {
        function s2c_SDeadLess20() {
        }
        s2c_SDeadLess20.read = function (self, data) {
            var SDeadLess20 = Network._instance.protoTypePool.SDeadLess20.decode(data);
            console.log("s2c_SDeadLess20 eventtype:", SDeadLess20.eventtype);
        };
        return s2c_SDeadLess20;
    }());
    hanlder.s2c_SDeadLess20 = s2c_SDeadLess20;
    // 服务器广播给战斗内所有人，某个角色已经播放动画完毕了
    var s2c_SSendRoundPlayEnd = /** @class */ (function () {
        function s2c_SSendRoundPlayEnd() {
        }
        s2c_SSendRoundPlayEnd.read = function (self, data) {
            /*var SSendRoundPlayEnd = Network._instance.protoTypePool.SSendRoundPlayEnd.decode(data);
            console.log("s2c_SSendRoundPlayEnd fighterId:", SSendRoundPlayEnd.fighterId);*/
            self.fighterId = data.readInt32();
            console.log("s2c_SSendRoundPlayEnd fighterId:", self.fighterId);
        };
        return s2c_SSendRoundPlayEnd;
    }());
    hanlder.s2c_SSendRoundPlayEnd = s2c_SSendRoundPlayEnd;
    //服务器向客户端发送公会boss血量
    var s2c_SSynchroBossHp = /** @class */ (function () {
        function s2c_SSynchroBossHp() {
        }
        s2c_SSynchroBossHp.read = function (self, data) {
            var SSynchroBossHp = Network._instance.protoTypePool.SSynchroBossHp.decode(data);
            console.log("s2c_SSynchroBossHp bossMonsterID:", SSynchroBossHp.bossMonsterID);
            console.log("s2c_SSynchroBossHp flag:", SSynchroBossHp.flag);
            console.log("s2c_SSynchroBossHp maxhp:", SSynchroBossHp.maxhp);
            console.log("s2c_SSynchroBossHp hp:", SSynchroBossHp.hp);
            console.log("s2c_SSynchroBossHp rolename:", SSynchroBossHp.rolename);
            console.log("s2c_SSynchroBossHp changehp:", SSynchroBossHp.changehp);
        };
        return s2c_SSynchroBossHp;
    }());
    hanlder.s2c_SSynchroBossHp = s2c_SSynchroBossHp;
    //服务器发给客户端，进战斗时主角宠物的二级属性
    var s2c_SSendPetInitAttrs = /** @class */ (function () {
        function s2c_SSendPetInitAttrs() {
        }
        s2c_SSendPetInitAttrs.read = function (self, data) {
            // var SSendPetInitAttrs = Network._instance.protoTypePool.SSendPetInitAttrs.decode(data);
            // self.petInitAttrs = SSendPetInitAttrs.petInitAttrs;
            // console.log("s2c_SSendPetInitAttrs petInitAttrs:", SSendPetInitAttrs.petInitAttrs);
        };
        return s2c_SSendPetInitAttrs;
    }());
    hanlder.s2c_SSendPetInitAttrs = s2c_SSendPetInitAttrs;
    //服务器发给客户端，进战斗时主角的二级属性
    var s2c_SSendRoleInitAttrs = /** @class */ (function () {
        function s2c_SSendRoleInitAttrs() {
        }
        s2c_SSendRoleInitAttrs.read = function (self, data) {
            /*var SSendRoleInitAttrs = Network._instance.protoTypePool.SSendRoleInitAttrs.decode(data);
            self.roleInitAttrs = SSendRoleInitAttrs.roleInitAttrs;
            console.log("s2c_SSendRoleInitAttrs roleInitAttrs:", SSendRoleInitAttrs.roleInitAttrs);*/
            var mapSize = data.readUint8();
            self.roleInitAttrs = new Laya.Dictionary();
            for (var index = 0; index < mapSize; index++) {
                self.roleInitAttrs.set(data.readUint32(), data.readFloat());
            }
            console.log("s2c_SSendRoleInitAttrs self:", self);
        };
        return s2c_SSendRoleInitAttrs;
    }());
    hanlder.s2c_SSendRoleInitAttrs = s2c_SSendRoleInitAttrs;
    //刷新人物属性的消息
    // export class s2c_SRefreshRoleData {
    // 	public datas: any;
    // 	public static read(self: s2c_SRefreshRoleData, data: ByteArray): void {
    // 		/*var SRefreshRoleData = Network._instance.protoTypePool.SRefreshRoleData.decode(data);
    // 		self.datas = SRefreshRoleData.datas;
    // 		console.log("s2c_SRefreshRoleData datas.maps:", SRefreshRoleData.datas);*/
    // 		let mapSize:number = data.readUint8();
    // 		self.datas = new Laya.Dictionary(); 		
    // 		for (var index = 0; index < mapSize; index++) {
    // 			self.datas.set(data.readInt32(),data.readFloat());
    // 		}
    // 		console.log("s2c_SRefreshRoleData self:", self);
    // 	}
    // }	
    //服务器向客户端发送已经使用过的道具列表，baseid
    var s2c_SSendAlreadyUseItem = /** @class */ (function () {
        function s2c_SSendAlreadyUseItem() {
        }
        s2c_SSendAlreadyUseItem.read = function (self, data) {
            /*var SSendAlreadyUseItem = Network._instance.protoTypePool.SSendAlreadyUseItem.decode(data);
            self.itemlist = SSendAlreadyUseItem.itemlist;
            console.log("s2c_SSendAlreadyUseItem itemlist:", SSendAlreadyUseItem.itemlist);*/
            var mapSize = data.readUint8();
            self.itemlist = new Laya.Dictionary();
            for (var index = 0; index < mapSize; index++) {
                self.itemlist.set(data.readUint32(), data.readUint32());
            }
            console.log("s2c_SSendAlreadyUseItem self:", self);
        };
        return s2c_SSendAlreadyUseItem;
    }());
    hanlder.s2c_SSendAlreadyUseItem = s2c_SSendAlreadyUseItem;
    //发送人物操作状态（准备中，请等待，掉线）
    var s2c_SSendBattlerOperateState = /** @class */ (function () {
        function s2c_SSendBattlerOperateState() {
        }
        s2c_SSendBattlerOperateState.read = function (self, data) {
            self.battleid = data.readInt32();
            self.state = data.readInt32();
        };
        return s2c_SSendBattlerOperateState;
    }());
    hanlder.s2c_SSendBattlerOperateState = s2c_SSendBattlerOperateState;
    //退出观战的fighter
    var s2c_SRemoveWatcher = /** @class */ (function () {
        function s2c_SRemoveWatcher() {
        }
        s2c_SRemoveWatcher.read = function (self, data) {
            self.roleindex = data.readInt32();
        };
        return s2c_SRemoveWatcher;
    }());
    hanlder.s2c_SRemoveWatcher = s2c_SRemoveWatcher;
    //服务器向客户端发送观战开始信息
    var s2c_SSendWatchBattleStart = /** @class */ (function () {
        function s2c_SSendWatchBattleStart() {
        }
        s2c_SSendWatchBattleStart.read = function (self, data) {
            self.enemyside = data.readInt32();
            self.leftcount = data.readInt32();
            self.battletype = data.readInt32();
            self.roundnum = data.readInt32();
            self.friendsformation = data.readInt32();
            self.enemyformation = data.readInt32();
            self.friendsformationLevel = data.readInt32();
            self.enemyformationLevel = data.readInt32();
            self.background = data.readByte();
            self.backmusic = data.readByte();
            self.battlekey = ByteArrayUtils.readLong(data);
        };
        return s2c_SSendWatchBattleStart;
    }());
    hanlder.s2c_SSendWatchBattleStart = s2c_SSendWatchBattleStart;
    //服务器向客户端发送结束战斗消息
    var s2c_SSendBattleEnd = /** @class */ (function () {
        function s2c_SSendBattleEnd() {
        }
        s2c_SSendBattleEnd.read = function (self, data) {
            /*var SSendBattleEnd = Network._instance.protoTypePool.SSendBattleEnd.decode(data);
            self.aiactions = SSendBattleEnd.aiactions;
            console.log("s2c_SSendBattleEnd aiactions:", SSendBattleEnd.aiactions);*/
            var mapSize = data.readUint8();
            self.aiactions = new Laya.Dictionary();
            for (var index = 0; index < mapSize; index++) {
                self.aiactions.set(data.readUint32(), data.readUint32());
            }
            console.log("s2c_SSendBattleEnd self:", self);
        };
        return s2c_SSendBattleEnd;
    }());
    hanlder.s2c_SSendBattleEnd = s2c_SSendBattleEnd;
    //服务器向客户端发送 开始回合操作选择
    var s2c_SSendRoundStart = /** @class */ (function () {
        function s2c_SSendRoundStart() {
        }
        s2c_SSendRoundStart.read = function (self, data) {
            /*var SSendRoundStart = Network._instance.protoTypePool.SSendRoundStart.decode(data);
            self.aiactions = SSendRoundStart.aiactions;
            console.log("s2c_SSendRoundStart time:", SSendRoundStart.time);
            console.log("s2c_SSendRoundStart environment:", SSendRoundStart.environment);
            console.log("s2c_SSendRoundStart aiactions:", SSendRoundStart.aiactions);*/
            self.time = data.readInt32();
            self.environment = data.readInt32();
            var mapSize = data.readUint8();
            self.aiactions = new Laya.Dictionary();
            for (var index = 0; index < mapSize; index++) {
                self.aiactions.set(data.readUint32(), data.readUint32());
            }
            console.log("s2c_SSendRoundStart self:", self);
        };
        return s2c_SSendRoundStart;
    }());
    hanlder.s2c_SSendRoundStart = s2c_SSendRoundStart;
    //服务器向客户端发送战斗信息
    var s2c_SSendAddFighters = /** @class */ (function () {
        function s2c_SSendAddFighters() {
        }
        s2c_SSendAddFighters.read = function (self, data) {
            /*var SSendAddFighters = Network._instance.protoTypePool.SSendAddFighters.decode(data);
            self.fighterList = SSendAddFighters.fighterList;
            console.log("s2c_SSendAddFighters fighterList:", SSendAddFighters.fighterList);*/
            self.fighterList = [];
            self.fighterList0 = [];
            self.fighterList1 = [];
            var fighterListSize = data.readUint8();
            var fighterInfo;
            for (var index = 0; index < fighterListSize; index++) {
                fighterInfo = new game.scene.models.FighterInfoVo();
                fighterInfo.fromByteArray(data);
                self.fighterList.push(fighterInfo); //FighterInfo
                if (fighterInfo.index <= 14) {
                    self.fighterList0.push(fighterInfo);
                }
                else {
                    self.fighterList1.push(fighterInfo);
                }
                console.log("s2c_SSendAddFighters fighterInfo.shape:", fighterInfo.shape);
            }
            console.log("s2c_SSendAddFighters self:", self);
        };
        return s2c_SSendAddFighters;
    }());
    hanlder.s2c_SSendAddFighters = s2c_SSendAddFighters;
    //服务器向客户端发送战斗信息
    var s2c_SSendBattleStart = /** @class */ (function () {
        function s2c_SSendBattleStart() {
        }
        s2c_SSendBattleStart.read = function (self, data) {
            // var SSendBattleStart = Network._instance.protoTypePool.SSendBattleStart.decode(data);
            self.enemyside = data.readInt32();
            self.friendsformation = data.readInt32();
            self.enemyformation = data.readInt32();
            self.friendsformationLevel = data.readInt32();
            self.enemyformationLevel = data.readInt32();
            self.battleConfigId = data.readInt32();
            self.battletype = data.readInt32();
            self.roundnum = data.readInt32();
            self.background = data.readByte();
            self.backmusic = data.readByte();
            console.log("s2c_SSendBattleStart self:", self);
        };
        return s2c_SSendBattleStart;
    }());
    hanlder.s2c_SSendBattleStart = s2c_SSendBattleStart;
    //服务器回复角色盈福经验
    var s2c_SApplyYingFuExprience = /** @class */ (function () {
        function s2c_SApplyYingFuExprience() {
        }
        s2c_SApplyYingFuExprience.read = function (self, data) {
            self.exprience = data.readLong();
            console.log("s2c_SApplyYingFuExprience+++++++++++++++++++++:", self.exprience);
        };
        return s2c_SApplyYingFuExprience;
    }());
    hanlder.s2c_SApplyYingFuExprience = s2c_SApplyYingFuExprience;
    //刷新人物通货的消息
    var s2c_SRefreshRoleCurrency = /** @class */ (function () {
        function s2c_SRefreshRoleCurrency() {
        }
        s2c_SRefreshRoleCurrency.read = function (self, data) {
            // var SRefreshRoleCurrency = Network._instance.protoTypePool.SRefreshRoleCurrency.decode(data);
            // self.datas = SRefreshRoleCurrency.datas;
            // console.log("s2c_SRefreshRoleCurrency datas:", SRefreshRoleCurrency.datas);
            var mapSize = data.readUint8();
            self.datas = new Laya.Dictionary();
            for (var index = 0; index < mapSize; index++) {
                self.datas.set(data.readInt32(), data.readLong());
            }
            console.log("s2c_SRefreshRoleCurrency+++++++++++++++", self.datas);
        };
        return s2c_SRefreshRoleCurrency;
    }());
    hanlder.s2c_SRefreshRoleCurrency = s2c_SRefreshRoleCurrency;
    //刷新人物评分的消息
    var s2c_SRefreshRoleScore = /** @class */ (function () {
        function s2c_SRefreshRoleScore() {
        }
        s2c_SRefreshRoleScore.read = function (self, data) {
            // var SRefreshRoleScore = Network._instance.protoTypePool.SRefreshRoleScore.decode(data);
            // self.datas = SRefreshRoleScore.datas;
            // console.log("s2c_SRefreshRoleScore datas:", SRefreshRoleScore.datas);
            var mapSize = data.readUint8();
            self.datas = new Laya.Dictionary();
            for (var index = 0; index < mapSize; index++) {
                self.datas.set(data.readInt32(), data.readInt32());
            }
        };
        return s2c_SRefreshRoleScore;
    }());
    hanlder.s2c_SRefreshRoleScore = s2c_SRefreshRoleScore;
    //刷新人物加点后的加点面板数值
    var s2c_SRefreshPointType = /** @class */ (function () {
        function s2c_SRefreshPointType() {
        }
        s2c_SRefreshPointType.read = function (self, data) {
            // var SRefreshPointType = Network._instance.protoTypePool.SRefreshPointType.decode(data);
            // self.point = SRefreshPointType.point;
            // self.bfp = SRefreshPointType.bfp;
            // console.log("s2c_SRefreshPointType bfp:", SRefreshPointType.bfp);
            // console.log("s2c_SRefreshPointType point:", SRefreshPointType.point);
            // console.log("s2c_SRefreshPointType pointscheme:", SRefreshPointType.pointscheme);
            // console.log("s2c_SRefreshPointType schemechanges:", SRefreshPointType.schemechanges);
            self.bfp = new game.modules.roleinfo.models.RoleBasicFightPropertiesVo();
            self.bfp.fromByteArray(data);
            var mapSize = data.readUint8();
            self.point = new Laya.Dictionary();
            for (var index = 0; index < mapSize; index++) {
                self.point.set(data.readInt32(), data.readInt32());
            }
            self.pointscheme = data.readInt32();
            self.schemechanges = data.readInt32();
            console.log("s2c_SRefreshPointType+++++++++++++", self.bfp);
        };
        return s2c_SRefreshPointType;
    }());
    hanlder.s2c_SRefreshPointType = s2c_SRefreshPointType;
    //刷新宠物属性的消息
    var s2c_SRefreshPetData = /** @class */ (function () {
        function s2c_SRefreshPetData() {
        }
        s2c_SRefreshPetData.read = function (self, data) {
            self.columnid = data.readInt32();
            self.petkey = data.readInt32();
            var mapSize = data.readUint8();
            self.datas = new Laya.Dictionary();
            for (var index = 0; index < mapSize; index++) {
                self.datas.set(data.readInt32(), data.readFloat());
            }
        };
        return s2c_SRefreshPetData;
    }());
    hanlder.s2c_SRefreshPetData = s2c_SRefreshPetData;
    //刷新人物属性的消息
    var s2c_SRefreshRoleData = /** @class */ (function () {
        function s2c_SRefreshRoleData() {
        }
        s2c_SRefreshRoleData.read = function (self, data) {
            // var SRefreshRoleData = Network._instance.protoTypePool.SRefreshRoleData.decode(data);
            // self.datas = SRefreshRoleData.datas;
            // console.log("s2c_SRefreshRoleData datas.maps:", SRefreshRoleData.datas);
            var mapSize = data.readUint8();
            self.datas = new Laya.Dictionary();
            for (var index = 0; index < mapSize; index++) {
                self.datas.set(data.readInt32(), data.readFloat());
            }
            console.log("s2c_SRefreshRoleData+++++++++", self.datas);
        };
        return s2c_SRefreshRoleData;
    }());
    hanlder.s2c_SRefreshRoleData = s2c_SRefreshRoleData;
    //点赞
    var s2c_SXMRGiveRose = /** @class */ (function () {
        function s2c_SXMRGiveRose() {
        }
        s2c_SXMRGiveRose.read = function (self, data) {
            var SXMRGiveRose = Network._instance.protoTypePool.SXMRGiveRose.decode(data);
            console.log("s2c_ExchangeCode videoid:", SXMRGiveRose.videoid);
            console.log("s2c_ExchangeCode rosenum:", SXMRGiveRose.rosenum);
            console.log("s2c_ExchangeCode roseflag:", SXMRGiveRose.roseflag);
        };
        return s2c_SXMRGiveRose;
    }());
    hanlder.s2c_SXMRGiveRose = s2c_SXMRGiveRose;
    //请求熊猫人boss界面
    var s2c_SXMRBossNPCView = /** @class */ (function () {
        function s2c_SXMRBossNPCView() {
        }
        s2c_SXMRBossNPCView.read = function (self, data) {
            var SXMRBossNPCView = Network._instance.protoTypePool.SXMRBossNPCView.decode(data);
            self.xmrteaminfos = SXMRBossNPCView.xmrteaminfos;
            console.log("s2c_ExchangeCode viewtype:", SXMRBossNPCView.viewtype);
            console.log("s2c_ExchangeCode xmrteaminfos:", SXMRBossNPCView.xmrteaminfos);
        };
        return s2c_SXMRBossNPCView;
    }());
    hanlder.s2c_SXMRBossNPCView = s2c_SXMRBossNPCView;
    //请求熊猫人界面
    var s2c_SXMRNPCView = /** @class */ (function () {
        function s2c_SXMRNPCView() {
        }
        s2c_SXMRNPCView.read = function (self, data) {
            var sXMRNPCView = Network._instance.protoTypePool.SXMRNPCView.decode(data);
            self.xmrteaminfos = sXMRNPCView.xmrteaminfos;
            console.log("s2c_ExchangeCode xmrteaminfos:", sXMRNPCView.xmrteaminfos);
            console.log("s2c_ExchangeCode curstar:", sXMRNPCView.curstar);
        };
        return s2c_SXMRNPCView;
    }());
    hanlder.s2c_SXMRNPCView = s2c_SXMRNPCView;
    //服务端返回兑换成功标志
    var s2c_SExchangeCode = /** @class */ (function () {
        function s2c_SExchangeCode() {
        }
        s2c_SExchangeCode.read = function (self, data) {
            var sExchangeCode = Network._instance.protoTypePool.SExchangeCode.decode(data);
            self.ExchangeCodeRetInfo = sExchangeCode.ExchangeCodeRetInfo;
            console.log("s2c_ExchangeCode flag:", sExchangeCode.flag);
            console.log("s2c_ExchangeCode ExchangeCodeRetInfo:", sExchangeCode.ExchangeCodeRetInfo);
        };
        return s2c_SExchangeCode;
    }());
    hanlder.s2c_SExchangeCode = s2c_SExchangeCode;
    //服务端发送QQ会员兑换码状态
    var s2c_QQExchangeCodeStatus = /** @class */ (function () {
        function s2c_QQExchangeCodeStatus() {
        }
        s2c_QQExchangeCodeStatus.read = function (self, data) {
            var sQQExchangeCodeStatus = Network._instance.protoTypePool.SQQExchangeCodeStatus.decode(data);
            console.log("s2c_QQExchangeCodeStatus status:", sQQExchangeCodeStatus.status);
        };
        return s2c_QQExchangeCodeStatus;
    }());
    hanlder.s2c_QQExchangeCodeStatus = s2c_QQExchangeCodeStatus;
    //请求节日积分奖励表数据
    var s2c_QueryHydScoreData = /** @class */ (function () {
        function s2c_QueryHydScoreData() {
        }
        s2c_QueryHydScoreData.read = function (self, data) {
            var sQueryHydScoreData = Network._instance.protoTypePool.SQueryHydScoreData.decode(data);
            console.log("s2c_QueryHydScoreData hydvalue:", sQueryHydScoreData.hydvalue);
            console.log("s2c_QueryHydScoreData chargevalue:", sQueryHydScoreData.chargevalue);
        };
        return s2c_QueryHydScoreData;
    }());
    hanlder.s2c_QueryHydScoreData = s2c_QueryHydScoreData;
    //请求累计充值奖励表数据
    var s2c_QueryChargeAwardCountData = /** @class */ (function () {
        function s2c_QueryChargeAwardCountData() {
        }
        s2c_QueryChargeAwardCountData.read = function (self, data) {
            var sQueryChargeAwardCountData = Network._instance.protoTypePool.SQueryChargeAwardCountData.decode(data);
            console.log("s2c_QueryChargeAwardCountData hydvalue:", sQueryChargeAwardCountData.hydvalue);
            console.log("s2c_QueryChargeAwardCountData chargevalue:", sQueryChargeAwardCountData.chargevalue);
        };
        return s2c_QueryChargeAwardCountData;
    }());
    hanlder.s2c_QueryChargeAwardCountData = s2c_QueryChargeAwardCountData;
    //请求节日活跃度奖励表数据
    var s2c_QueryJRAwardData = /** @class */ (function () {
        function s2c_QueryJRAwardData() {
        }
        s2c_QueryJRAwardData.read = function (self, data) {
            var sQueryJRAwardData = Network._instance.protoTypePool.SQueryJRAwardData.decode(data);
            console.log("s2c_QueryJRAwardData hydvalue:", sQueryJRAwardData.hydvalue);
            console.log("s2c_QueryJRAwardData chargevalue:", sQueryJRAwardData.chargevalue);
            console.log("s2c_QueryJRAwardData hydrewards:", sQueryJRAwardData.hydrewards);
            console.log("s2c_QueryJRAwardData chargerewards:", sQueryJRAwardData.chargerewards);
        };
        return s2c_QueryJRAwardData;
    }());
    hanlder.s2c_QueryJRAwardData = s2c_QueryJRAwardData;
    //返回节日签到数据
    var s2c_QueryFestivalData = /** @class */ (function () {
        function s2c_QueryFestivalData() {
        }
        s2c_QueryFestivalData.read = function (self, data) {
            var sQueryFestivalData = Network._instance.protoTypePool.SQueryFestivalData.decode(data);
            console.log("s2c_QueryFestivalData rewards:", sQueryFestivalData.rewards);
        };
        return s2c_QueryFestivalData;
    }());
    hanlder.s2c_QueryFestivalData = s2c_QueryFestivalData;
    var s2c_SQueryRegData = /** @class */ (function () {
        function s2c_SQueryRegData() {
        }
        s2c_SQueryRegData.read = function (self, data) {
            self.month = data.readUint32();
            self.times = data.readUint32();
            self.suppregtimes = data.readUint32();
            self.cansuppregtimes = data.readUint32();
            self.suppregdays = [];
            var suppregdaysSize = data.readUint8();
            for (var index = 0; index < suppregdaysSize; index++) {
                self.suppregdays.push(data.readInt32());
            }
            self.rewardflag = data.readUint32();
        };
        return s2c_SQueryRegData;
    }());
    hanlder.s2c_SQueryRegData = s2c_SQueryRegData;
    var s2c_join_map_result = /** @class */ (function () {
        function s2c_join_map_result() {
            this.optcode = 0;
            this.optname = "onJoin_map_result";
        }
        /**
        从输入二进制流中读取结构体
        */
        s2c_join_map_result.read = function (self, bytes) {
            var parmLen;
            var i;
            //主玩家unit
            self.guid = bytes.readString();
            //地图id
            self.mapid = bytes.readUint32();
        };
        return s2c_join_map_result;
    }());
    hanlder.s2c_join_map_result = s2c_join_map_result;
    var both_move_stop = /** @class */ (function () {
        function both_move_stop() {
            this.optcode = 0;
            this.optname = "onMove_stop";
        }
        /**
        从输入二进制流中读取结构体
        */
        both_move_stop.read = function (self, bytes) {
            var parmLen;
            var i;
            //谁啊
            self.oid = bytes.readUint16();
            //目标点x轴
            self.target_x = bytes.readFloat();
            //目标点y轴
            self.target_y = bytes.readFloat();
        };
        return both_move_stop;
    }());
    hanlder.both_move_stop = both_move_stop;
    var c2s_wujiang_peiyang_apply = /** @class */ (function () {
        function c2s_wujiang_peiyang_apply() {
            this.optcode = 0;
            this.optname = "onWujiang_peiyang_apply";
        }
        /**
        从输入二进制流中读取结构体
        */
        c2s_wujiang_peiyang_apply.read = function (self, bytes) {
            var parmLen;
            var i;
            //武将位置
            self.index = bytes.readUint16();
            //0放弃1应用
            self.is_apply = bytes.readUint8();
        };
        return c2s_wujiang_peiyang_apply;
    }());
    hanlder.c2s_wujiang_peiyang_apply = c2s_wujiang_peiyang_apply;
    // /*斗仙台信息*/
    var dtx_info_t = /** @class */ (function () {
        function dtx_info_t() {
        }
        // 从输入二进制流中读取结构体
        dtx_info_t.prototype.read = function (input) {
            this.name = input.readString();
            this.rank = input.readUint16();
            this.guid = input.readString();
            this.head_id = input.readUint8();
            this.force = input.readUint32();
            this.sex = input.readUint32();
            this.wings = input.readUint32();
            this.coat = input.readUint32();
            this.weapon = input.readUint32();
        };
        // 将结构体写入到输出二进制流中
        dtx_info_t.prototype.write = function (output) {
            output.writeString(this.name);
            output.writeUint16(this.rank);
            output.writeString(this.guid);
            output.writeUint8(this.head_id);
            output.writeUint32(this.force);
            output.writeUint32(this.sex);
            output.writeUint32(this.wings);
            output.writeUint32(this.coat);
            output.writeUint32(this.weapon);
        };
        return dtx_info_t;
    }());
    hanlder.dtx_info_t = dtx_info_t;
    // /*竞技场对手简要*/
    var jjc_info_t = /** @class */ (function () {
        function jjc_info_t() {
        }
        // 从输入二进制流中读取结构体
        jjc_info_t.prototype.read = function (input) {
            this.guid = input.readString();
            this.rank = input.readUint32();
            this.force = input.readUint32();
            this.name = input.readString();
            this.lv = input.readUint32();
            this.head = input.readInt32();
        };
        // 将结构体写入到输出二进制流中
        jjc_info_t.prototype.write = function (output) {
            output.writeString(this.guid);
            output.writeUint32(this.rank);
            output.writeUint32(this.force);
            output.writeString(this.name);
            output.writeUint32(this.lv);
            output.writeInt32(this.head);
        };
        return jjc_info_t;
    }());
    hanlder.jjc_info_t = jjc_info_t;
    /**
     * by lqw
     * s2c
     */
    var s2c_dissolve_relation = /** @class */ (function () {
        function s2c_dissolve_relation() {
        }
        s2c_dissolve_relation.read = function (self, data) {
            var sDissolveRelation = Network._instance.protoTypePool.SDissolveRelation.decode(data);
            self.relation = sDissolveRelation.relation;
            self.initiative = sDissolveRelation.initiative;
            self.playerid = sDissolveRelation.playerid;
            console.log("s2c_dissolve_relation sDissolveRelation:", sDissolveRelation);
            console.log("s2c_dissolve_relation sDissolveRelation.relation", sDissolveRelation.relation);
            console.log("s2c_dissolve_relation sDissolveRelation.initiative", sDissolveRelation.initiative);
            console.log("s2c_dissolve_relation sDissolveRelation.playerid", sDissolveRelation.playerid);
        };
        return s2c_dissolve_relation;
    }());
    hanlder.s2c_dissolve_relation = s2c_dissolve_relation;
    // SPreviousMasters
    var s2c_previous_masters = /** @class */ (function () {
        function s2c_previous_masters() {
        }
        s2c_previous_masters.read = function (self, data) {
            var sPreviousMasters = Network._instance.protoTypePool.SPreviousMasters.decode(data);
            self.masters = sPreviousMasters.masters;
            console.log("s2c_previous_masters sPreviousMasters:", sPreviousMasters);
            console.log("s2c_previous_masters sPreviousMasters.masters:", sPreviousMasters.masters);
        };
        return s2c_previous_masters;
    }());
    hanlder.s2c_previous_masters = s2c_previous_masters;
    // SPrenticeList
    var s2c_prentice_list = /** @class */ (function () {
        function s2c_prentice_list() {
        }
        s2c_prentice_list.read = function (self, data) {
            var sPrenticeList = Network._instance.protoTypePool.SPrenticeList.decode(data);
            self.prentice = sPrenticeList.prentice;
            self.itemkey = sPrenticeList.itemkey;
            console.log("s2c_prentice_list sPrenticeList:", sPrenticeList);
            console.log("s2c_prentice_list sPrenticeList.prentice:", sPrenticeList.prentice);
            console.log("s2c_prentice_list sPrenticeList.itemkey:", sPrenticeList.itemkey);
        };
        return s2c_prentice_list;
    }());
    hanlder.s2c_prentice_list = s2c_prentice_list;
    var s2c_request_as_master = /** @class */ (function () {
        function s2c_request_as_master() {
        }
        s2c_request_as_master.read = function (self, data) {
            var sReceiveAsMaster = Network._instance.protoTypePool.SReceiveAsMaster.decode(data);
            self.masterid = sReceiveAsMaster.masterid;
            self.prenticename = sReceiveAsMaster.prenticeid;
            self.school = sReceiveAsMaster.school;
            self.level = sReceiveAsMaster.level;
            self.requestword = sReceiveAsMaster.requestword;
            console.log("s2c_request_as_master sReceiveAsMaster:", sReceiveAsMaster);
            console.log("s2c_request_as_master sReceiveAsMaster.masterid:", sReceiveAsMaster.masterid);
            console.log("s2c_request_as_master sReceiveAsMaster.prenticename:", sReceiveAsMaster.prenticename);
            console.log("s2c_request_as_master sReceiveAsMaster.school:", sReceiveAsMaster.school);
            console.log("s2c_request_as_master sReceiveAsMaster.level:", sReceiveAsMaster.level);
            console.log("s2c_request_as_master sReceiveAsMaster.requestword:", sReceiveAsMaster.requestword);
        };
        return s2c_request_as_master;
    }());
    hanlder.s2c_request_as_master = s2c_request_as_master;
    // SInitPrenticeList
    var s2c_init_prentice_list = /** @class */ (function () {
        function s2c_init_prentice_list() {
        }
        s2c_init_prentice_list.read = function (self, data) {
            var sInitPrenticeList = Network._instance.protoTypePool.SInitPrenticeList.decode(data);
            self.prenticelist = sInitPrenticeList.prenticelist;
            console.log("s2c_init_prentice_list sInitPrenticeList:", sInitPrenticeList);
            console.log("s2c_init_prentice_list sInitPrenticeList.prenticelist:", sInitPrenticeList.prenticelist);
        };
        return s2c_init_prentice_list;
    }());
    hanlder.s2c_init_prentice_list = s2c_init_prentice_list;
    // SCanRequestAsPrentice
    var s2c_can_request_as_prentice = /** @class */ (function () {
        function s2c_can_request_as_prentice() {
        }
        s2c_can_request_as_prentice.read = function (self, data) {
            var sCanRequestAsPrentice = Network._instance.protoTypePool.SCanRequestAsPrentice.decode(data);
            self.roleid = sCanRequestAsPrentice.roleid; //请求徒弟的id
            self.rolename = sCanRequestAsPrentice.rolename; //请求徒弟的名字
            console.log("s2c_can_request_as_prentice sCanRequestAsPrentice:", sCanRequestAsPrentice);
            console.log("s2c_can_request_as_prentice sCanRequestAsPrentice.roleid:", sCanRequestAsPrentice.roleid);
            console.log("s2c_can_request_as_prentice sCanRequestAsPrentice.rolename:", sCanRequestAsPrentice.rolename);
        };
        return s2c_can_request_as_prentice;
    }());
    hanlder.s2c_can_request_as_prentice = s2c_can_request_as_prentice;
    // SCanRequestAsMaster
    var s2c_can_request_as_master = /** @class */ (function () {
        function s2c_can_request_as_master() {
        }
        s2c_can_request_as_master.read = function (self, data) {
            var sCanrequestAsMaster = Network._instance.protoTypePool.SCanrequestAsMaster.decode(data);
            self.roleid = sCanrequestAsMaster.roleid; //请求徒弟的id
            self.rolename = sCanrequestAsMaster.rolename; //请求徒弟的名字
            console.log("s2c_can_request_as_master sCanrequestAsMaster:", sCanrequestAsMaster);
            console.log("s2c_can_request_as_master sCanrequestAsMaster.roleid:", sCanrequestAsMaster.roleid);
            console.log("s2c_can_request_as_master sCanrequestAsMaster.rolename:", sCanrequestAsMaster.rolename);
        };
        return s2c_can_request_as_master;
    }());
    hanlder.s2c_can_request_as_master = s2c_can_request_as_master;
    // sCantRequestAsPrentice
    var s2c_cat_request_as_prentice = /** @class */ (function () {
        function s2c_cat_request_as_prentice() {
        }
        s2c_cat_request_as_prentice.read = function (self, data) {
            var sCantRequestAsPrentice = Network._instance.protoTypePool.SCantRequestAsPrentice.decode(data);
            self.roleid = sCantRequestAsPrentice.roleid; //请求徒弟的id
            self.reason = sCantRequestAsPrentice.reason; //请求徒弟的名字
            console.log("s2c_cat_request_as_prentice sCantRequestAsPrentice:", sCantRequestAsPrentice);
            console.log("s2c_cat_request_as_prentice sCantRequestAsPrentice.roleid:", sCantRequestAsPrentice.roleid);
            console.log("s2c_cat_request_as_prentice sCantRequestAsPrentice.reason:", sCantRequestAsPrentice.reason);
        };
        return s2c_cat_request_as_prentice;
    }());
    hanlder.s2c_cat_request_as_prentice = s2c_cat_request_as_prentice;
    // sCantRequestAsMaster
    var s2c_cant_request_as_master = /** @class */ (function () {
        function s2c_cant_request_as_master() {
        }
        s2c_cant_request_as_master.read = function (self, data) {
            var sCantRequestAsMaster = Network._instance.protoTypePool.SCantRequestAsMaster.decode(data);
            self.roleid = sCantRequestAsMaster.roleid; //请求徒弟的id
            self.reason = sCantRequestAsMaster.reason; //请求徒弟的名字
            console.log("s2c_cant_request_as_master sCantRequestAsMaster:", sCantRequestAsMaster);
            console.log("s2c_cant_request_as_master sCantRequestAsMaster.roleid:", sCantRequestAsMaster.roleid);
            console.log("s2c_cant_request_as_master sCantRequestAsMaster.reason:", sCantRequestAsMaster.reason);
        };
        return s2c_cant_request_as_master;
    }());
    hanlder.s2c_cant_request_as_master = s2c_cant_request_as_master;
    // SSendMasterPrenticeList
    var s2c_send_master_prentice_list = /** @class */ (function () {
        function s2c_send_master_prentice_list() {
        }
        s2c_send_master_prentice_list.read = function (self, data) {
            var sSendMasterPrenticeList = Network._instance.protoTypePool.SSendMasterPrenticeList.decode(data);
            self.masterlist = sSendMasterPrenticeList.masterlist;
            self.prenticelist = sSendMasterPrenticeList.prenticelist;
            console.log("s2c_send_master_prentice_list sSendMasterPrenticeList:", sSendMasterPrenticeList);
            console.log("s2c_send_master_prentice_list sSendMasterPrenticeList.masterlist:", sSendMasterPrenticeList.masterlist);
            console.log("s2c_send_master_prentice_list sSendMasterPrenticeList.prenticelist:", sSendMasterPrenticeList.prenticelist);
        };
        return s2c_send_master_prentice_list;
    }());
    hanlder.s2c_send_master_prentice_list = s2c_send_master_prentice_list;
    // sAddPrePrentice
    var s2c_add_pre_prentice = /** @class */ (function () {
        function s2c_add_pre_prentice() {
        }
        s2c_add_pre_prentice.read = function (self, data) {
            var sAddPrePrentice = Network._instance.protoTypePool.SAddPrePrentice.decode(data);
            self.roleid = sAddPrePrentice.roleid; //请求徒弟的id
            console.log("s2c_add_pre_prentice sAddPrePrentice:", sAddPrePrentice);
            console.log("s2c_add_pre_prentice sAddPrePrentice.roleid:", sAddPrePrentice.roleid);
        };
        return s2c_add_pre_prentice;
    }());
    hanlder.s2c_add_pre_prentice = s2c_add_pre_prentice;
    // SSendPrenticeOnLineState
    var s2c_send_prentice_on_line_state = /** @class */ (function () {
        function s2c_send_prentice_on_line_state() {
        }
        s2c_send_prentice_on_line_state.read = function (self, data) {
            var sSendPrenticeOnLineState = Network._instance.protoTypePool.SSendPrenticeOnLineState.decode(data);
            self.roleid = sSendPrenticeOnLineState.roleid;
            self.rolename = sSendPrenticeOnLineState.rolename;
            self.lastOfflineTime = sSendPrenticeOnLineState.lastOfflineTime;
            self.onlinestate = sSendPrenticeOnLineState.onlinestate;
            console.log("s2c_send_prentice_on_line_state sSendPrenticeOnLineState:", sSendPrenticeOnLineState);
            console.log("s2c_send_prentice_on_line_state sSendPrenticeOnLineState.roleid:", sSendPrenticeOnLineState.roleid);
            console.log("s2c_send_prentice_on_line_state sSendPrenticeOnLineState.rolename:", sSendPrenticeOnLineState.rolename);
            console.log("s2c_send_prentice_on_line_state sSendPrenticeOnLineState.lastOfflineTime:", sSendPrenticeOnLineState.lastOfflineTime);
            console.log("s2c_send_prentice_on_line_state sSendPrenticeOnLineState.onlinestate:", sSendPrenticeOnLineState.onlinestate);
        };
        return s2c_send_prentice_on_line_state;
    }());
    hanlder.s2c_send_prentice_on_line_state = s2c_send_prentice_on_line_state;
    // <!-- 师徒系统 定义协议  -->
    // SNotifyMaster
    var s2c_notify_master = /** @class */ (function () {
        function s2c_notify_master() {
        }
        s2c_notify_master.read = function (self, data) {
            var sNotifyMaster = Network._instance.protoTypePool.SNotifyMaster.decode(data);
            self.flag = sNotifyMaster.flag;
            console.log("s2c_notify_master sNotifyMaster:", sNotifyMaster);
            console.log("s2c_notify_master sNotifyMaster.flag:", sNotifyMaster.flag);
        };
        return s2c_notify_master;
    }());
    hanlder.s2c_notify_master = s2c_notify_master;
    // SEvaluate
    var s2c_evaluate = /** @class */ (function () {
        function s2c_evaluate() {
        }
        s2c_evaluate.read = function (self, data) {
            var sEvaluate = Network._instance.protoTypePool.SEvaluate.decode(data);
            self.flag = sEvaluate.flag;
            self.roleId = sEvaluate.roleId;
            console.log("s2c_evaluate sEvaluate:", sEvaluate);
            console.log("s2c_evaluate sEvaluate.flag:", sEvaluate.flag);
            console.log("s2c_evaluate sEvaluate.roleId:", sEvaluate.roleId);
        };
        return s2c_evaluate;
    }());
    hanlder.s2c_evaluate = s2c_evaluate;
    // SDismissApprentces
    var s2c_dismiss_apprentces = /** @class */ (function () {
        function s2c_dismiss_apprentces() {
        }
        s2c_dismiss_apprentces.read = function (self, data) {
            var sDismissApprentces = Network._instance.protoTypePool.SDismissApprentces.decode(data);
            self.prenticelist = sDismissApprentces.prenticelist;
            console.log("s2c_dismiss_apprentces sDismissApprentces:", sDismissApprentces);
            console.log("s2c_dismiss_apprentces sDismissApprentces.prenticelist:", sDismissApprentces.prenticelist);
        };
        return s2c_dismiss_apprentces;
    }());
    hanlder.s2c_dismiss_apprentces = s2c_dismiss_apprentces;
    // sNotifyDismissMaster
    var s2c_notify_dismiss_master = /** @class */ (function () {
        function s2c_notify_dismiss_master() {
        }
        s2c_notify_dismiss_master.read = function (self, data) {
            var sNotifyDismissMaster = Network._instance.protoTypePool.SNotifyDismissMaster.decode(data);
            self.masterName = sNotifyDismissMaster.masterName;
            console.log("s2c_notify_dismiss_master sNotifyDismissMaster:", sNotifyDismissMaster);
            console.log("s2c_notify_dismiss_master sNotifyDismissMaster.masterName:", sNotifyDismissMaster.masterName);
        };
        return s2c_notify_dismiss_master;
    }());
    hanlder.s2c_notify_dismiss_master = s2c_notify_dismiss_master;
    // SPrenticesList
    var s2c_prentices_list = /** @class */ (function () {
        function s2c_prentices_list() {
        }
        s2c_prentices_list.read = function (self, data) {
            var sPrenticeList = Network._instance.protoTypePool.SPrenticeListsPrenticeList.decode(data);
            self.prenticelist = sPrenticeList.prenticelist;
            self.chushiList = sPrenticeList.chushiList;
            self.shide = sPrenticeList.shide;
            console.log("s2c_prentices_list sPrenticeList:", sPrenticeList);
            console.log("s2c_prentices_list sPrenticeList.chushiList:", sPrenticeList.chushiList);
            console.log("s2c_prentices_list sPrenticeList.shide:", sPrenticeList.shide);
        };
        return s2c_prentices_list;
    }());
    hanlder.s2c_prentices_list = s2c_prentices_list;
    // STakeAchiveFresh
    var s2c_take_achive_fresh = /** @class */ (function () {
        function s2c_take_achive_fresh() {
        }
        s2c_take_achive_fresh.read = function (self, data) {
            var sTakeAchiveFresh = Network._instance.protoTypePool.STakeAchiveFresh.decode(data);
            self.roleid = sTakeAchiveFresh.roleid;
            self.key = sTakeAchiveFresh.key;
            self.flag = sTakeAchiveFresh.flag;
            console.log("s2c_take_achive_fresh sTakeAchiveFresh:", sTakeAchiveFresh);
            console.log("s2c_take_achive_fresh sTakeAchiveFresh.roleid:", sTakeAchiveFresh.roleid);
            console.log("s2c_take_achive_fresh sTakeAchiveFresh.key:", sTakeAchiveFresh.key);
            console.log("s2c_take_achive_fresh sTakeAchiveFresh.flag:", sTakeAchiveFresh.flag);
        };
        return s2c_take_achive_fresh;
    }());
    hanlder.s2c_take_achive_fresh = s2c_take_achive_fresh;
    // SNotifyAppMaster
    var s2c_notify_app_master = /** @class */ (function () {
        function s2c_notify_app_master() {
        }
        s2c_notify_app_master.read = function (self, data) {
            var sNotifyAppMaster = Network._instance.protoTypePool.SNotifyAppMaster.decode(data);
            self.masterName = sNotifyAppMaster.masterName;
            console.log("s2c_notify_app_master sNotifyAppMaster:", sNotifyAppMaster);
            console.log("s2c_notify_app_master sNotifyAppMaster.masterName:", sNotifyAppMaster.masterName);
        };
        return s2c_notify_app_master;
    }());
    hanlder.s2c_notify_app_master = s2c_notify_app_master;
    var s2c_accept_mission = /** @class */ (function () {
        function s2c_accept_mission() {
        }
        s2c_accept_mission.read = function (self, data) {
            self.missioninfo = new game.modules.task.models.MissionInfoVo();
            self.missioninfo.fromByteArray(data);
        };
        return s2c_accept_mission;
    }());
    hanlder.s2c_accept_mission = s2c_accept_mission;
    // sRefreshMissionState
    var s2c_refresh_mission_state = /** @class */ (function () {
        function s2c_refresh_mission_state() {
        }
        s2c_refresh_mission_state.read = function (self, data) {
            self.missionid = data.readInt32();
            self.missionstatus = data.readInt32();
        };
        return s2c_refresh_mission_state;
    }());
    hanlder.s2c_refresh_mission_state = s2c_refresh_mission_state;
    // sRefreshMissionValue
    var s2c_refresh_mission_value = /** @class */ (function () {
        function s2c_refresh_mission_value() {
        }
        s2c_refresh_mission_value.read = function (self, data) {
            self.missionid = data.readInt32();
            self.missionidvalue = data.readInt32();
            self.missionidround = data.readInt32();
        };
        return s2c_refresh_mission_value;
    }());
    hanlder.s2c_refresh_mission_value = s2c_refresh_mission_value;
    // sTrackMission
    var s2c_track_mission = /** @class */ (function () {
        function s2c_track_mission() {
        }
        s2c_track_mission.read = function (self, data) {
            self.missionid = data.readInt32();
            self.track = data.readInt32();
        };
        return s2c_track_mission;
    }());
    hanlder.s2c_track_mission = s2c_track_mission;
    // sFairylandStatus
    var s2c_fairyland_status = /** @class */ (function () {
        function s2c_fairyland_status() {
        }
        s2c_fairyland_status.read = function (self, data) {
            var sFairylandStatus = Network._instance.protoTypePool.SFairylandStatus.decode(data);
            self.status = sFairylandStatus.status;
            console.log("s2c_fairyland_status sFairylandStatus:", sFairylandStatus);
            console.log("s2c_fairyland_status sFairylandStatus.status:", sFairylandStatus.status);
        };
        return s2c_fairyland_status;
    }());
    hanlder.s2c_fairyland_status = s2c_fairyland_status;
    // sReqMissionCanAccept
    var s2c_req_mission_can_accept = /** @class */ (function () {
        function s2c_req_mission_can_accept() {
        }
        s2c_req_mission_can_accept.read = function (self, data) {
            self.missions = [];
            var missionsSize = ByteArrayUtils.uncompact_uint32(data);
            for (var index = 0; index < missionsSize; index++) {
                self.missions.push(data.readInt32());
            }
        };
        return s2c_req_mission_can_accept;
    }());
    hanlder.s2c_req_mission_can_accept = s2c_req_mission_can_accept;
    // SUseMissionItemFail
    var s2c_use_mission_item_fail = /** @class */ (function () {
        function s2c_use_mission_item_fail() {
        }
        //定义类型
        s2c_use_mission_item_fail.read = function (self, data) {
            var sUseMissionItemFail = Network._instance.protoTypePool.SUseMissionItemFail.decode(data);
            console.log("s2c_use_mission_item_fail sUseMissionItemFail:", sUseMissionItemFail);
        };
        return s2c_use_mission_item_fail;
    }());
    hanlder.s2c_use_mission_item_fail = s2c_use_mission_item_fail;
    // sNpcFollowStart
    var s2c_npc_follow_start = /** @class */ (function () {
        function s2c_npc_follow_start() {
        }
        s2c_npc_follow_start.read = function (self, data) {
            var sNpcFollowStart = Network._instance.protoTypePool.SNpcFollowStart.decode(data);
            self.npcid = sNpcFollowStart.npcid;
            console.log("s2c_npc_follow_start sNpcFollowStart:", sNpcFollowStart);
            console.log("s2c_npc_follow_start sNpcFollowStart.npcid:", sNpcFollowStart.npcid);
        };
        return s2c_npc_follow_start;
    }());
    hanlder.s2c_npc_follow_start = s2c_npc_follow_start;
    // sNpcFollowEnd
    var s2c_npc_follow_end = /** @class */ (function () {
        function s2c_npc_follow_end() {
        }
        s2c_npc_follow_end.read = function (self, data) {
            var sNpcFollowEnd = Network._instance.protoTypePool.SNpcFollowEnd.decode(data);
            self.npcid = sNpcFollowEnd.npcid;
            console.log("s2c_npc_follow_end sNpcFollowEnd:", sNpcFollowEnd);
            console.log("s2c_npc_follow_end sNpcFollowEnd.npcid:", sNpcFollowEnd.npcid);
        };
        return s2c_npc_follow_end;
    }());
    hanlder.s2c_npc_follow_end = s2c_npc_follow_end;
    // sLandTimes
    var s2c_land_times = /** @class */ (function () {
        function s2c_land_times() {
        }
        s2c_land_times.read = function (self, data) {
            var sLandTimes = Network._instance.protoTypePool.SLandTimes.decode(data);
            self.instances = sLandTimes.instances;
            console.log("s2c_land_times sLandTimes:", sLandTimes);
            console.log("s2c_land_times sLandTimes.instances:", sLandTimes.instances);
        };
        return s2c_land_times;
    }());
    hanlder.s2c_land_times = s2c_land_times;
    // sCopyDestroyTime
    var s2c_copy_destroy_time = /** @class */ (function () {
        function s2c_copy_destroy_time() {
        }
        s2c_copy_destroy_time.read = function (self, data) {
            var sCopyDestroyTime = Network._instance.protoTypePool.SCopyDestroyTime.decode(data);
            self.destroyTime = sCopyDestroyTime.destroyTime;
            console.log("s2c_copy_destroy_time sCopyDestroyTime:", sCopyDestroyTime);
            console.log("s2c_copy_destroy_time sCopyDestroyTime.destroyTime:", sCopyDestroyTime.destroyTime);
        };
        return s2c_copy_destroy_time;
    }());
    hanlder.s2c_copy_destroy_time = s2c_copy_destroy_time;
    // sGetInstanceState
    var s2c_get_instance_state = /** @class */ (function () {
        function s2c_get_instance_state() {
        }
        s2c_get_instance_state.read = function (self, data) {
            var sGetInstanceState = Network._instance.protoTypePool.SGetInstanceState.decode(data);
            self.instances = sGetInstanceState.instances;
            console.log("s2c_get_instance_state sGetInstanceState:", sGetInstanceState);
            console.log("s2c_get_instance_state sGetInstanceState.instances:", sGetInstanceState.instances);
        };
        return s2c_get_instance_state;
    }());
    hanlder.s2c_get_instance_state = s2c_get_instance_state;
    // sGetLineState
    var s2c_get_line_state = /** @class */ (function () {
        function s2c_get_line_state() {
        }
        s2c_get_line_state.read = function (self, data) {
            self.instances = new Laya.Dictionary();
            var instancesSize = data.readUint8();
            var lineInfo;
            for (var index = 0; index < instancesSize; index++) {
                lineInfo = new game.modules.activity.models.LineInfoVo();
                self.instances.set(data.readInt32(), lineInfo);
                lineInfo.fromByteArray(data);
            }
        };
        return s2c_get_line_state;
    }());
    hanlder.s2c_get_line_state = s2c_get_line_state;
    // sRefreshActivityListFinishTimes
    var s2c_refresh_activity_listfinish_times = /** @class */ (function () {
        function s2c_refresh_activity_listfinish_times() {
        }
        s2c_refresh_activity_listfinish_times.read = function (self, data) {
            self.activities = new Laya.Dictionary();
            var activitiesSize = data.readUint8();
            var simpleActivityInfo;
            for (var index = 0; index < activitiesSize; index++) {
                simpleActivityInfo = new game.modules.activity.models.SimpleActivityInfoVo();
                simpleActivityInfo.fromByteArray(data);
                self.activities.set(data.readInt32(), simpleActivityInfo);
            }
            self.activevalue = data.readInt32();
            var mapSize = data.readUint8();
            self.chests = new Laya.Dictionary();
            for (var index = 0; index < mapSize; index++) {
                self.chests.set(data.readUint32(), data.readUint32());
            }
            self.recommend = data.readInt32();
            self.closeids = [];
            var closeidsSize = data.readUint8();
            for (var index = 0; index < closeidsSize; index++) {
                self.closeids.push(data.readInt32());
            }
        };
        return s2c_refresh_activity_listfinish_times;
    }());
    hanlder.s2c_refresh_activity_listfinish_times = s2c_refresh_activity_listfinish_times;
    // SDrawGiftBox
    var s2c_draw_gift_box = /** @class */ (function () {
        function s2c_draw_gift_box() {
        }
        s2c_draw_gift_box.read = function (self, data) {
            // var SDrawGiftBox = Network._instance.protoTypePool.SDrawGiftBox.decode(data);
            console.log("---------已经取过宝箱---------");
        };
        return s2c_draw_gift_box;
    }());
    hanlder.s2c_draw_gift_box = s2c_draw_gift_box;
    // sActivityOpen
    var s2c_activity_open = /** @class */ (function () {
        function s2c_activity_open() {
        }
        s2c_activity_open.read = function (self, data) {
            var sActivityOpen = Network._instance.protoTypePool.SActivityOpen.decode(data);
            self.activityId = sActivityOpen.activityId;
            console.log("s2c_activity_open sActivityOpen:", sActivityOpen);
            console.log("s2c_activity_open sActivityOpen.activityId:", sActivityOpen.activityId);
        };
        return s2c_activity_open;
    }());
    hanlder.s2c_activity_open = s2c_activity_open;
    // sNotifyTuiSongList
    var s2c_notify_tuisong_list = /** @class */ (function () {
        function s2c_notify_tuisong_list() {
        }
        s2c_notify_tuisong_list.read = function (self, data) {
            var sNotifyTuiSongList = Network._instance.protoTypePool.SNotifyTuiSongList.decode(data);
            self.notifyList = sNotifyTuiSongList.notifyList;
            console.log("s2c_notify_tuisong_list sNotifyTuiSongList:", sNotifyTuiSongList);
            console.log("s2c_notify_tuisong_list sNotifyTuiSongList.notifyList:", sNotifyTuiSongList.notifyList);
        };
        return s2c_notify_tuisong_list;
    }());
    hanlder.s2c_notify_tuisong_list = s2c_notify_tuisong_list;
    // sDailyTaskStateList
    var s2c_daily_task_state_list = /** @class */ (function () {
        function s2c_daily_task_state_list() {
        }
        s2c_daily_task_state_list.read = function (self, data) {
            var sDailyTaskStateList = Network._instance.protoTypePool.SDailyTaskStateList.decode(data);
            self.notifyList = sDailyTaskStateList.notifyList;
            console.log("s2c_daily_task_state_list sDailyTaskStateList:", sDailyTaskStateList);
            console.log("s2c_daily_task_state_list sDailyTaskStateList.notifyList:", sDailyTaskStateList.notifyList);
        };
        return s2c_daily_task_state_list;
    }());
    hanlder.s2c_daily_task_state_list = s2c_daily_task_state_list;
    // sRemoveTuiSong
    var s2c_remove_tui_song = /** @class */ (function () {
        function s2c_remove_tui_song() {
        }
        s2c_remove_tui_song.read = function (self, data) {
            var sRemoveTuiSong = Network._instance.protoTypePool.SRemoveTuiSong.decode(data);
            self.removeId = sRemoveTuiSong.removeId;
            console.log("s2c_remove_tui_song sRemoveTuiSong:", sRemoveTuiSong);
            console.log("s2c_remove_tui_song sRemoveTuiSong.removeId:", sRemoveTuiSong.removeId);
        };
        return s2c_remove_tui_song;
    }());
    hanlder.s2c_remove_tui_song = s2c_remove_tui_song;
    // SQuestion
    var s2c_question = /** @class */ (function () {
        function s2c_question() {
        }
        s2c_question.read = function (self, data) {
            var SQuestion = Network._instance.protoTypePool.SQuestion.decode(data);
            self.lastresult = SQuestion.lastresult;
            self.npckey = SQuestion.npckey;
            self.questionid = SQuestion.questionid;
            self.flag = SQuestion.flag;
            console.log("s2c_question SQuestion:", SQuestion);
            console.log("s2c_question SQuestion.lastresult:", SQuestion.lastresult);
            console.log("s2c_question SQuestion.npckey:", SQuestion.npckey);
            console.log("s2c_question SQuestion.questionid:", SQuestion.questionid);
            console.log("s2c_question SQuestion.flag:", SQuestion.flag);
        };
        return s2c_question;
    }());
    hanlder.s2c_question = s2c_question;
    // sUseTreasureMap
    var s2c_use_treasure_map = /** @class */ (function () {
        function s2c_use_treasure_map() {
        }
        s2c_use_treasure_map.read = function (self, data) {
            var sUseTreasureMap = Network._instance.protoTypePool.SUseTreasureMap.decode(data);
            self.awardId = sUseTreasureMap.awardId;
            self.maptype = sUseTreasureMap.maptype;
            console.log("s2c_use_treasure_map sUseTreasureMap:", sUseTreasureMap);
            console.log("s2c_use_treasure_map sUseTreasureMap.awardId:", sUseTreasureMap.awardId);
            console.log("s2c_use_treasure_map sUseTreasureMap.maptype:", sUseTreasureMap.maptype);
        };
        return s2c_use_treasure_map;
    }());
    hanlder.s2c_use_treasure_map = s2c_use_treasure_map;
    // sGetActivityInfo
    var s2c_get_activity_info = /** @class */ (function () {
        function s2c_get_activity_info() {
        }
        s2c_get_activity_info.read = function (self, data) {
            self.activityinfos = [];
            var activityInfo;
            var arraySize = data.readByte();
            for (var index = 0; index < arraySize; index++) {
                activityInfo = new game.modules.activity.models.ActivityInfoVo();
                activityInfo.fromByteArray(data);
                self.activityinfos.push(activityInfo);
            }
        };
        return s2c_get_activity_info;
    }());
    hanlder.s2c_get_activity_info = s2c_get_activity_info;
    // sAskIntoInstance
    var s2c_ask_into_instance = /** @class */ (function () {
        function s2c_ask_into_instance() {
        }
        s2c_ask_into_instance.read = function (self, data) {
            var sAskIntoInstance = Network._instance.protoTypePool.SAskIntoInstance.decode(data);
            self.msgid = sAskIntoInstance.msgid;
            self.teamleadername = sAskIntoInstance.teamleadername;
            self.awardtimes = sAskIntoInstance.awardtimes;
            self.step = sAskIntoInstance.step;
            self.tlstep = sAskIntoInstance.tlstep;
            self.mystep = sAskIntoInstance.mystep;
            self.allstep = sAskIntoInstance.allstep;
            self.steplist = sAskIntoInstance.steplist;
            self.insttype = sAskIntoInstance.insttype;
            self.autoenter = sAskIntoInstance.autoenter;
            console.log("s2c_ask_into_instance sAskIntoInstance:", sAskIntoInstance);
            console.log("s2c_ask_into_instance sAskIntoInstance.msgid:", sAskIntoInstance.msgid);
            console.log("s2c_ask_into_instance sAskIntoInstance.teamleadername:", sAskIntoInstance.teamleadername);
            console.log("s2c_ask_into_instance sAskIntoInstance.awardtimes:", sAskIntoInstance.awardtimes);
            console.log("s2c_ask_into_instance sAskIntoInstance.step:", sAskIntoInstance.step);
            console.log("s2c_ask_into_instance sAskIntoInstance.tlstep:", sAskIntoInstance.tlstep);
            console.log("s2c_ask_into_instance sAskIntoInstance.mystep:", sAskIntoInstance.mystep);
            console.log("s2c_ask_into_instance sAskIntoInstance.allstep:", sAskIntoInstance.allstep);
            console.log("s2c_ask_into_instance sAskIntoInstance.steplist:", sAskIntoInstance.steplist);
            console.log("s2c_ask_into_instance sAskIntoInstance.insttype:", sAskIntoInstance.insttype);
            console.log("s2c_ask_into_instance sAskIntoInstance.autoenter:", sAskIntoInstance.autoenter);
        };
        return s2c_ask_into_instance;
    }());
    hanlder.s2c_ask_into_instance = s2c_ask_into_instance;
    // sGetArchiveInfo
    var s2c_get_archive_info = /** @class */ (function () {
        function s2c_get_archive_info() {
        }
        s2c_get_archive_info.read = function (self, data) {
            // var sGetArchiveInfo = Network._instance.protoTypePool.SGetArchiveInfo.decode(data);
            // self.archiveinfos = sGetArchiveInfo.archiveinfos;
            // console.log("s2c_get_archive_info sGetArchiveInfo:", sGetArchiveInfo);
            // console.log("s2c_get_archive_info sGetArchiveInfo.archiveinfos:", sGetArchiveInfo.archiveinfos);
            // self.archiveinfos = new AchieventInfoVo();
            //self.archiveinfos.fromByteArray(data);
            self.archiveinfos = [];
            //let archiveinfosSize1:number = data.readUint8();
            //let archiveinfosSize: number = data.readUint8();//ByteArrayUtils.uncompact_uint32(data);
            //  let archiveinfosSize1:number = data.readUint8();//128
            /** 此处数据流存在问题,没有找到解法，暂时如此处理 */
            var archiveinfosSize = data.readUint8(); //68
            if (archiveinfosSize == 128) {
                archiveinfosSize = data.readUint8();
            }
            var archiveInfo;
            for (var index = 0; index < archiveinfosSize; index++) {
                archiveInfo = new AchieventInfoVo();
                archiveInfo.fromByteArray(data);
                self.archiveinfos.push(archiveInfo);
            }
        };
        return s2c_get_archive_info;
    }());
    hanlder.s2c_get_archive_info = s2c_get_archive_info;
    // sWaitRollTime
    var s2c_wait_roll_time = /** @class */ (function () {
        function s2c_wait_roll_time() {
        }
        s2c_wait_roll_time.read = function (self, data) {
            var sWaitRollTime = Network._instance.protoTypePool.SWaitRollTime.decode(data);
            self.messageid = sWaitRollTime.messageid;
            console.log("s2c_wait_roll_time sWaitRollTime:", sWaitRollTime);
            console.log("s2c_wait_roll_time sWaitRollTime.messageid:", sWaitRollTime.messageid);
        };
        return s2c_wait_roll_time;
    }());
    hanlder.s2c_wait_roll_time = s2c_wait_roll_time;
    // SPlayXianJingCG
    var s2c_play_xianjing_cg = /** @class */ (function () {
        function s2c_play_xianjing_cg() {
        }
        s2c_play_xianjing_cg.read = function (self, data) {
            var sPlayXianJingCG = Network._instance.protoTypePool.SPlayXianJingCG.decode(data);
            console.log("s2c_play_xianjing_cg SPlayXianJingCG:", sPlayXianJingCG);
        };
        return s2c_play_xianjing_cg;
    }());
    hanlder.s2c_play_xianjing_cg = s2c_play_xianjing_cg;
    // SAddTreasureMap
    var s2c_add_treasure_map = /** @class */ (function () {
        function s2c_add_treasure_map() {
        }
        s2c_add_treasure_map.read = function (self, data) {
            var sAddTreasureMap = Network._instance.protoTypePool.SAddTreasureMap.decode(data);
            console.log("s2c_add_treasure_map SAddTreasureMap:", sAddTreasureMap);
        };
        return s2c_add_treasure_map;
    }());
    hanlder.s2c_add_treasure_map = s2c_add_treasure_map;
    // sAnswerInstance
    var s2c_answer_instance = /** @class */ (function () {
        function s2c_answer_instance() {
        }
        s2c_answer_instance.read = function (self, data) {
            var sAnswerInstance = Network._instance.protoTypePool.SAnswerInstance.decode(data);
            self.messageid = sAnswerInstance.messageid;
            self.landname = sAnswerInstance.landname;
            console.log("s2c_answer_instance sAnswerInstance:", sAnswerInstance);
            console.log("s2c_answer_instance sAnswerInstance.messageid:", sAnswerInstance.messageid);
            console.log("s2c_answer_instance sAnswerInstance.landname:", sAnswerInstance.landname);
        };
        return s2c_answer_instance;
    }());
    hanlder.s2c_answer_instance = s2c_answer_instance;
    // sRequestChapterInfo
    var s2c_request_chapter_info = /** @class */ (function () {
        function s2c_request_chapter_info() {
        }
        s2c_request_chapter_info.read = function (self, data) {
            var sRequestChapterInfo = Network._instance.protoTypePool.SRequestChapterInfo.decode(data);
            self.chapters = sRequestChapterInfo.chapters;
            console.log("s2c_request_chapter_info sRequestChapterInfo:", sRequestChapterInfo);
            console.log("s2c_request_chapter_info sRequestChapterInfo.chapters:", sRequestChapterInfo.chapters);
        };
        return s2c_request_chapter_info;
    }());
    hanlder.s2c_request_chapter_info = s2c_request_chapter_info;
    // sRequestChapterChallenge
    var s2c_request_chapter_challenge = /** @class */ (function () {
        function s2c_request_chapter_challenge() {
        }
        s2c_request_chapter_challenge.read = function (self, data) {
            var sRequestChapterChallenge = Network._instance.protoTypePool.SRequestChapterChallenge.decode(data);
            self.result = sRequestChapterChallenge.result;
            console.log("s2c_request_chapter_challenge sRequestChapterChallenge:", sRequestChapterChallenge);
            console.log("s2c_request_chapter_challenge sRequestChapterChallenge.result:", sRequestChapterChallenge.result);
        };
        return s2c_request_chapter_challenge;
    }());
    hanlder.s2c_request_chapter_challenge = s2c_request_chapter_challenge;
    //move.xml
    // sRoleMove
    var s2c_role_move = /** @class */ (function () {
        function s2c_role_move() {
        }
        s2c_role_move.read = function (self, data) {
            self.roleid = data.readLong();
            self.destPos = new Vector2();
            self.destPos.x = data.readShort() / 16;
            self.destPos.y = data.readShort() / 16;
        };
        return s2c_role_move;
    }());
    hanlder.s2c_role_move = s2c_role_move;
    // sSetRoleLocation
    var s2c_set_role_location = /** @class */ (function () {
        function s2c_set_role_location() {
        }
        s2c_set_role_location.read = function (self, data) {
            self.roleid = data.readLong();
            self.position = new Vector2();
            self.position.x = data.readInt16();
            self.position.y = data.readInt16();
            self.locz = data.readByte();
        };
        return s2c_set_role_location;
    }());
    hanlder.s2c_set_role_location = s2c_set_role_location;
    // sAddUserScreen
    var s2c_add_user_screen = /** @class */ (function () {
        function s2c_add_user_screen() {
        }
        s2c_add_user_screen.read = function (self, data) {
            var rolelistSize = ByteArrayUtils.uncompact_uint32(data);
            self.rolelist = [];
            var roleBasic;
            for (var index = 0; index < rolelistSize; index++) {
                roleBasic = new game.scene.models.RoleBasicVo();
                roleBasic.fromByteArray(data);
                self.rolelist.push(roleBasic);
            }
            self.npclist = [];
            var npclistSize = ByteArrayUtils.uncompact_uint32(data);
            var npcBasic;
            for (var index = 0; index < npclistSize; index++) {
                npcBasic = new game.scene.models.NpcBasicVo();
                npcBasic.fromByteArray(data);
                self.npclist.push(npcBasic);
            }
        };
        return s2c_add_user_screen;
    }());
    hanlder.s2c_add_user_screen = s2c_add_user_screen;
    // sRemoveUserScreen
    var s2c_remove_user_screen = /** @class */ (function () {
        function s2c_remove_user_screen() {
        }
        s2c_remove_user_screen.read = function (self, data) {
            self.roleids = [];
            var roleidsSize = data.readUint8();
            for (var index = 0; index < roleidsSize; index++) {
                var long = data.readLong();
                self.roleids.push(long);
            }
            self.npcids = [];
            var npcidsSize = data.readUint8();
            for (var index = 0; index < npcidsSize; index++) {
                var long = data.readLong();
                self.npcids.push(long);
            }
        };
        return s2c_remove_user_screen;
    }());
    hanlder.s2c_remove_user_screen = s2c_remove_user_screen;
    // SRoleTurn
    var s2c_role_turn = /** @class */ (function () {
        function s2c_role_turn() {
        }
        s2c_role_turn.read = function (self, data) {
            var SRoleTurn = Network._instance.protoTypePool.SRoleTurn.decode(data);
            self.roleid = SRoleTurn.roleid;
            self.direction = SRoleTurn.direction;
            console.log("s2c_role_turn SRoleTurn:", SRoleTurn);
            console.log("s2c_role_turn SRoleTurn.roleid:", SRoleTurn.roleid);
            console.log("s2c_role_turn SRoleTurn.direction:", SRoleTurn.direction);
        };
        return s2c_role_turn;
    }());
    hanlder.s2c_role_turn = s2c_role_turn;
    // sRoleEnterScene
    var s2c_role_enter_scene = /** @class */ (function () {
        function s2c_role_enter_scene() {
        }
        s2c_role_enter_scene.read = function (self, data) {
            self.ownerName = ByteArrayUtils.readUtf16String(data);
            self.destPos = new Vector2();
            self.destPos.x = data.readInt16() / 16;
            self.destPos.y = data.readInt16() / 16;
            self.destz = data.readByte();
            self.changetype = data.readInt32();
            self.sceneID = ByteArrayUtils.readLong(data);
            self.weatherId = data.readByte();
            self.tipsParm = ByteArrayUtils.readUtf16String(data);
        };
        return s2c_role_enter_scene;
    }());
    hanlder.s2c_role_enter_scene = s2c_role_enter_scene;
    // sRoleStop
    var s2c_role_stop = /** @class */ (function () {
        function s2c_role_stop() {
        }
        s2c_role_stop.read = function (self, data) {
            self.roleid = data.readLong();
            self.pos = new Vector2();
            self.pos.x = data.readInt16() / 16;
            self.pos.y = data.readInt16() / 16;
        };
        return s2c_role_stop;
    }());
    hanlder.s2c_role_stop = s2c_role_stop;
    // SSetRoleTeamInfo
    var s2c_set_role_team_info = /** @class */ (function () {
        function s2c_set_role_team_info() {
        }
        s2c_set_role_team_info.read = function (self, data) {
            self.roleid = data.readLong();
            self.teamid = data.readLong();
            self.teamindex = data.readInt32();
            self.teamstate = data.readInt32();
            self.teamnormalnum = data.readInt32();
        };
        return s2c_set_role_team_info;
    }());
    hanlder.s2c_set_role_team_info = s2c_set_role_team_info;
    // sAddPickupScreen
    var s2c_add_pickup_screen = /** @class */ (function () {
        function s2c_add_pickup_screen() {
        }
        s2c_add_pickup_screen.read = function (self, data) {
            var sAddPickupScreen = Network._instance.protoTypePool.SAddPickupScreen.decode(data);
            self.pickuplist = sAddPickupScreen.pickuplist;
            console.log("s2c_add_pickup_screen sAddPickupScreen:", sAddPickupScreen);
            console.log("s2c_add_pickup_screen sAddPickupScreen.pickuplist:", sAddPickupScreen.pickuplist);
        };
        return s2c_add_pickup_screen;
    }());
    hanlder.s2c_add_pickup_screen = s2c_add_pickup_screen;
    // sRemovePickupScreen
    var s2c_remove_pickup_screen = /** @class */ (function () {
        function s2c_remove_pickup_screen() {
        }
        s2c_remove_pickup_screen.read = function (self, data) {
            var sRemovePickupScreen = Network._instance.protoTypePool.SRemovePickupScreen.decode(data);
            self.pickupids = sRemovePickupScreen.pickupids;
            console.log("s2c_remove_pickup_screen sRemovePickupScreen:", sRemovePickupScreen);
            console.log("s2c_remove_pickup_screen sRemovePickupScreen.pickupids:", sRemovePickupScreen.pickupids);
        };
        return s2c_remove_pickup_screen;
    }());
    hanlder.s2c_remove_pickup_screen = s2c_remove_pickup_screen;
    // SHideRole
    var s2c_hide_role = /** @class */ (function () {
        function s2c_hide_role() {
        }
        s2c_hide_role.read = function (self, data) {
            var sHideRole = Network._instance.protoTypePool.SHideRole.decode(data);
            self.hide = sHideRole.hide;
            console.log("s2c_hide_role sHideRole:", sHideRole);
            console.log("s2c_hide_role sHideRole.hide:", sHideRole.hide);
        };
        return s2c_hide_role;
    }());
    hanlder.s2c_hide_role = s2c_hide_role;
    // SRelocateRolePos
    var s2c_relocate_rolepos = /** @class */ (function () {
        function s2c_relocate_rolepos() {
        }
        s2c_relocate_rolepos.read = function (self, data) {
            var sRelocateRolePos = Network._instance.protoTypePool.SRelocateRolePos.decode(data);
            console.log("s2c_relocate_rolepos SRelocateRolePos:", sRelocateRolePos);
        };
        return s2c_relocate_rolepos;
    }());
    hanlder.s2c_relocate_rolepos = s2c_relocate_rolepos;
    // sAddActivityNpc
    var s2c_add_activity_npc = /** @class */ (function () {
        function s2c_add_activity_npc() {
        }
        s2c_add_activity_npc.read = function (self, data) {
            var sAddActivityNpc = Network._instance.protoTypePool.SAddActivityNpc.decode(data);
            self.npcids = sAddActivityNpc.npcids;
            self.poslist = sAddActivityNpc.poslist;
            console.log("s2c_add_activity_npc sAddActivityNpc:", sAddActivityNpc);
            console.log("s2c_add_activity_npc sAddActivityNpc.npcids:", sAddActivityNpc.npcids);
            console.log("s2c_add_activity_npc sAddActivityNpc.poslist:", sAddActivityNpc.poslist);
        };
        return s2c_add_activity_npc;
    }());
    hanlder.s2c_add_activity_npc = s2c_add_activity_npc;
    // sRemoveActivityNpc
    var s2c_remove_activity_npc = /** @class */ (function () {
        function s2c_remove_activity_npc() {
        }
        s2c_remove_activity_npc.read = function (self, data) {
            var sRemoveActivityNpc = Network._instance.protoTypePool.SRemoveActivityNpc.decode(data);
            self.npcids = sRemoveActivityNpc.npcids;
            console.log("s2c_remove_activity_npc sRemoveActivityNpc:", sRemoveActivityNpc);
            console.log("s2c_remove_activity_npc sRemoveActivityNpc.npcids:", sRemoveActivityNpc.npcids);
        };
        return s2c_remove_activity_npc;
    }());
    hanlder.s2c_remove_activity_npc = s2c_remove_activity_npc;
    // sTransfromShape
    var s2c_transfrom_shape = /** @class */ (function () {
        function s2c_transfrom_shape() {
        }
        s2c_transfrom_shape.read = function (self, data) {
            var sTransfromShape = Network._instance.protoTypePool.STransfromShape.decode(data);
            self.playerid = sTransfromShape.playerid;
            self.shape = sTransfromShape.shape;
            console.log("s2c_transfrom_shape sTransfromShape:", sTransfromShape);
            console.log("s2c_transfrom_shape sTransfromShape.playerid:", sTransfromShape.playerid);
            console.log("s2c_transfrom_shape sTransfromShape.shape:", sTransfromShape.shape);
        };
        return s2c_transfrom_shape;
    }());
    hanlder.s2c_transfrom_shape = s2c_transfrom_shape;
    // sGMGetAroundRoles
    var s2c_gm_get_around_roles = /** @class */ (function () {
        function s2c_gm_get_around_roles() {
        }
        s2c_gm_get_around_roles.read = function (self, data) {
            var sGMGetAroundRoles = Network._instance.protoTypePool.SGMGetAroundRoles.decode(data);
            self.roles = sGMGetAroundRoles.roles;
            console.log("s2c_gm_get_around_roles sGMGetAroundRoles:", sGMGetAroundRoles);
            console.log("s2c_gm_get_around_roles sGMGetAroundRoles.roles:", sGMGetAroundRoles.roles);
        };
        return s2c_gm_get_around_roles;
    }());
    hanlder.s2c_gm_get_around_roles = s2c_gm_get_around_roles;
    // sUpdateRoleSceneState
    var s2c_update_role_scene_state = /** @class */ (function () {
        function s2c_update_role_scene_state() {
        }
        s2c_update_role_scene_state.read = function (self, data) {
            /*var sUpdateRoleSceneState = Network._instance.protoTypePool.SUpdateRoleSceneState.decode(data);
            self.roleId = sUpdateRoleSceneState.roleId;
            self.scenestate = sUpdateRoleSceneState.scenestate;*/
            self.roleId = data.readLong();
            self.scenestate = data.readInt32();
            console.log("s2c_update_role_scene_state self:", self);
        };
        return s2c_update_role_scene_state;
    }());
    hanlder.s2c_update_role_scene_state = s2c_update_role_scene_state;
    // sUpdateNpcSceneState
    var s2c_update_npc_scene_state = /** @class */ (function () {
        function s2c_update_npc_scene_state() {
        }
        s2c_update_npc_scene_state.read = function (self, data) {
            var sUpdateNpcSceneState = Network._instance.protoTypePool.SUpdateNpcSceneState.decode(data);
            self.npckey = sUpdateNpcSceneState.npckey;
            self.scenestate = sUpdateNpcSceneState.scenestate;
            console.log("s2c_update_npc_scene_state sUpdateNpcSceneState:", sUpdateNpcSceneState);
            console.log("s2c_update_npc_scene_state sUpdateNpcSceneState.npckey:", sUpdateNpcSceneState.npckey);
            console.log("s2c_update_npc_scene_state sUpdateNpcSceneState.scenestate:", sUpdateNpcSceneState.scenestate);
        };
        return s2c_update_npc_scene_state;
    }());
    hanlder.s2c_update_npc_scene_state = s2c_update_npc_scene_state;
    // sRoleModelChange
    var s2c_role_model_change = /** @class */ (function () {
        function s2c_role_model_change() {
        }
        s2c_role_model_change.read = function (self, data) {
            var sRoleModelChange = Network._instance.protoTypePool.SRoleModelChange.decode(data);
            self.roleid = sRoleModelChange.roleid;
            self.shape = sRoleModelChange.shape;
            console.log("s2c_role_model_change sRoleModelChange:", sRoleModelChange);
            console.log("s2c_role_model_change sRoleModelChange.roleid:", sRoleModelChange.roleid);
            console.log("s2c_role_model_change sRoleModelChange.shape:", sRoleModelChange.shape);
        };
        return s2c_role_model_change;
    }());
    hanlder.s2c_role_model_change = s2c_role_model_change;
    // sRoleComponentsChange
    var s2c_role_components_change = /** @class */ (function () {
        function s2c_role_components_change() {
        }
        s2c_role_components_change.read = function (self, data) {
            self.roleid = ByteArrayUtils.readLong(data);
            self.spritetype = data.readByte();
            var length = data.readInt8();
            self.components = new Laya.Dictionary();
            for (var componentsIndex = 0; componentsIndex < length; componentsIndex++) {
                self.components.set(data.readByte(), data.readInt32());
            }
        };
        return s2c_role_components_change;
    }());
    hanlder.s2c_role_components_change = s2c_role_components_change;
    // SRoleJump
    var s2c_role_jump = /** @class */ (function () {
        function s2c_role_jump() {
        }
        s2c_role_jump.read = function (self, data) {
            var sRoleJump = Network._instance.protoTypePool.SRoleJump.decode(data);
            self.roleid = sRoleJump.roleid;
            self.srcpos = sRoleJump.srcpos;
            self.destPos = sRoleJump.destPos;
            self.jumptype = sRoleJump.jumptype;
            console.log("s2c_role_jump sRoleJump:", sRoleJump);
            console.log("s2c_role_jump sRoleJump.roleid:", sRoleJump.roleid);
            console.log("s2c_role_jump sRoleJump.srcpos:", sRoleJump.srcpos);
            console.log("s2c_role_jump sRoleJump.destPos:", sRoleJump.destPos);
            console.log("s2c_role_jump sRoleJump.jumptype:", sRoleJump.jumptype);
        };
        return s2c_role_jump;
    }());
    hanlder.s2c_role_jump = s2c_role_jump;
    // sRoleJumpDrawback
    var s2c_role_jump_drawback = /** @class */ (function () {
        function s2c_role_jump_drawback() {
        }
        s2c_role_jump_drawback.read = function (self, data) {
            var sRoleJumpDrawback = Network._instance.protoTypePool.SRoleJumpDrawback.decode(data);
            self.roleid = sRoleJumpDrawback.roleid;
            self.srcpos = sRoleJumpDrawback.srcpos;
            self.srcz = sRoleJumpDrawback.srcz;
            console.log("s2c_role_jump_drawback sRoleJumpDrawback:", sRoleJumpDrawback);
            console.log("s2c_role_jump_drawback sRoleJumpDrawback.roleid:", sRoleJumpDrawback.roleid);
            console.log("s2c_role_jump_drawback sRoleJumpDrawback.srcpos:", sRoleJumpDrawback.srcpos);
            console.log("s2c_role_jump_drawback sRoleJumpDrawback.srcz:", sRoleJumpDrawback.srcz);
        };
        return s2c_role_jump_drawback;
    }());
    hanlder.s2c_role_jump_drawback = s2c_role_jump_drawback;
    // sNPCMoveTo
    var s2c_npc_moveto = /** @class */ (function () {
        function s2c_npc_moveto() {
        }
        s2c_npc_moveto.read = function (self, data) {
            var sNPCMoveTo = Network._instance.protoTypePool.SNPCMoveTo.decode(data);
            self.npckey = sNPCMoveTo.npckey;
            self.speed = sNPCMoveTo.speed;
            self.destpos = sNPCMoveTo.destpos;
            console.log("s2c_npc_moveto sNPCMoveTo:", sNPCMoveTo);
            console.log("s2c_npc_moveto sNPCMoveTo.npckey:", sNPCMoveTo.npckey);
            console.log("s2c_npc_moveto sNPCMoveTo.speed:", sNPCMoveTo.speed);
            console.log("s2c_npc_moveto sNPCMoveTo.destpos:", sNPCMoveTo.destpos);
        };
        return s2c_npc_moveto;
    }());
    hanlder.s2c_npc_moveto = s2c_npc_moveto;
    // sBeginBaitang
    var s2c_begin_baitang = /** @class */ (function () {
        function s2c_begin_baitang() {
        }
        s2c_begin_baitang.read = function (self, data) {
            var sBeginBaitang = Network._instance.protoTypePool.SBeginBaitang.decode(data);
            self.roleid1 = sBeginBaitang.roleid1;
            self.roleid2 = sBeginBaitang.roleid2;
            console.log("s2c_begin_baitang sBeginBaitang:", sBeginBaitang);
            console.log("s2c_begin_baitang sBeginBaitang.roleid1:", sBeginBaitang.roleid1);
            console.log("s2c_begin_baitang sBeginBaitang.roleid2:", sBeginBaitang.roleid2);
        };
        return s2c_begin_baitang;
    }());
    hanlder.s2c_begin_baitang = s2c_begin_baitang;
    // sRoleChangeShape
    var s2c_role_change_shape = /** @class */ (function () {
        function s2c_role_change_shape() {
        }
        s2c_role_change_shape.read = function (self, data) {
            var sRoleChangeShape = Network._instance.protoTypePool.SRoleChangeShape.decode(data);
            self.roleid = sRoleChangeShape.roleid;
            self.shape = sRoleChangeShape.shape;
            console.log("s2c_role_change_shape sRoleChangeShape:", sRoleChangeShape);
            console.log("s2c_role_change_shape sRoleChangeShape.roleid:", sRoleChangeShape.roleid);
            console.log("s2c_role_change_shape sRoleChangeShape.shape:", sRoleChangeShape.shape);
        };
        return s2c_role_change_shape;
    }());
    hanlder.s2c_role_change_shape = s2c_role_change_shape;
    // sRolePlayAction
    var s2c_role_play_action = /** @class */ (function () {
        function s2c_role_play_action() {
        }
        s2c_role_play_action.read = function (self, data) {
            var sRolePlayAction = Network._instance.protoTypePool.SRolePlayAction.decode(data);
            self.roleid = sRolePlayAction.roleid;
            self.actionid = sRolePlayAction.actionid;
            console.log("s2c_role_play_action sRolePlayAction:", sRolePlayAction);
            console.log("s2c_role_play_action sRolePlayAction.roleid:", sRolePlayAction.roleid);
            console.log("s2c_role_play_action sRolePlayAction.actionid:", sRolePlayAction.actionid);
        };
        return s2c_role_play_action;
    }());
    hanlder.s2c_role_play_action = s2c_role_play_action;
    // sChangeEquipEffect
    var s2c_change_equip_effect = /** @class */ (function () {
        function s2c_change_equip_effect() {
        }
        s2c_change_equip_effect.read = function (self, data) {
            var sChangeEquipEffect = Network._instance.protoTypePool.SChangeEquipEffect.decode(data);
            self.playerid = sChangeEquipEffect.playerid;
            self.effect = sChangeEquipEffect.effect;
            console.log("s2c_change_equip_effect sChangeEquipEffect:", sChangeEquipEffect);
            console.log("s2c_change_equip_effect sChangeEquipEffect.playerid:", sChangeEquipEffect.playerid);
            console.log("s2c_change_equip_effect sChangeEquipEffect.effect:", sChangeEquipEffect.effect);
        };
        return s2c_change_equip_effect;
    }());
    hanlder.s2c_change_equip_effect = s2c_change_equip_effect;
    // sVisitNpc
    var s2c_visit_npc = /** @class */ (function () {
        function s2c_visit_npc() {
        }
        s2c_visit_npc.read = function (self, data) {
            self.npckey = data.readLong();
            self.services = [];
            var servicesSize = data.readUint8();
            for (var index = 0; index < servicesSize; index++) {
                self.services[index] = data.readInt32();
            }
            self.scenarioquests = [];
            var scenarioquestsSize = data.readUint8();
            for (var index = 0; index < scenarioquestsSize; index++) {
                self.scenarioquests[index] = data.readInt32();
            }
        };
        return s2c_visit_npc;
    }());
    hanlder.s2c_visit_npc = s2c_visit_npc;
    // sReqFortuneWheel
    var s2c_req_fortune_wheel = /** @class */ (function () {
        function s2c_req_fortune_wheel() {
        }
        s2c_req_fortune_wheel.read = function (self, data) {
            self.npckey = data.readLong();
            self.serviceid = data.readInt32();
            self.itemids = [];
            var itemidsSize = data.readUint8();
            var forturneWheelType;
            for (var index = 0; index < itemidsSize; index++) {
                forturneWheelType = new game.modules.friend.models.ForturneWheelTypeVo();
                forturneWheelType.fromByteArray(data);
                self.itemids.push(forturneWheelType);
            }
            self.index = data.readInt32();
            self.flag = data.readByte();
        };
        return s2c_req_fortune_wheel;
    }());
    hanlder.s2c_req_fortune_wheel = s2c_req_fortune_wheel;
    // sBattleToNpcError
    var s2c_battle_to_npc_error = /** @class */ (function () {
        function s2c_battle_to_npc_error() {
        }
        s2c_battle_to_npc_error.read = function (self, data) {
            var sBattleToNpcError = Network._instance.protoTypePool.SBattleToNpcError.decode(data);
            self.battleerror = sBattleToNpcError.battleerror;
            console.log("s2c_battle_to_npc_error sBattleToNpcError:", sBattleToNpcError);
            console.log("s2c_battle_to_npc_error sBattleToNpcError.battleerror:", sBattleToNpcError.battleerror);
        };
        return s2c_battle_to_npc_error;
    }());
    hanlder.s2c_battle_to_npc_error = s2c_battle_to_npc_error;
    // SSendNpcMsg
    var s2c_send_npc_msg = /** @class */ (function () {
        function s2c_send_npc_msg() {
        }
        s2c_send_npc_msg.read = function (self, data) {
            var SSendNpcMsg = Network._instance.protoTypePool.SSendNpcMsg.decode(data);
            self.npckey = SSendNpcMsg.npckey;
            self.npcid = SSendNpcMsg.npcid;
            self.msgid = SSendNpcMsg.msgid;
            self.args = SSendNpcMsg.args;
            console.log("s2c_send_npc_msg SSendNpcMsg:", SSendNpcMsg);
            console.log("s2c_send_npc_msg SSendNpcMsg.npckey:", SSendNpcMsg.npckey);
            console.log("s2c_send_npc_msg SSendNpcMsg.npcid:", SSendNpcMsg.serviceid);
            console.log("s2c_send_npc_msg SSendNpcMsg.msgid:", SSendNpcMsg.msgid);
            console.log("s2c_send_npc_msg SSendNpcMsg.args:", SSendNpcMsg.args);
        };
        return s2c_send_npc_msg;
    }());
    hanlder.s2c_send_npc_msg = s2c_send_npc_msg;
    // SSubmit2Npc
    var s2c_submit_2npc = /** @class */ (function () {
        function s2c_submit_2npc() {
        }
        s2c_submit_2npc.read = function (self, data) {
            self.questid = data.readInt32();
            self.npckey = data.readLong();
            self.submittype = data.readInt32();
            self.availableIds = [];
            var availableIdsSize = data.readUint8();
            for (var index = 0; index < availableIdsSize; index++) {
                self.availableIds.push(data.readInt32);
            }
            self.availablePos = data.readInt32();
        };
        return s2c_submit_2npc;
    }());
    hanlder.s2c_submit_2npc = s2c_submit_2npc;
    // sTrackedMissions
    var s2c_tracked_missions = /** @class */ (function () {
        function s2c_tracked_missions() {
        }
        s2c_tracked_missions.read = function (self, data) {
            self.trackedmissions = new Laya.Dictionary();
            var trackedmissionsSize = data.readUint8();
            var trackedMission;
            for (var index = 0; index < trackedmissionsSize; index++) {
                trackedMission = new game.modules.task.models.TrackedMissionVo();
                var key = data.readInt32();
                self.trackedmissions.set(key, trackedMission);
                trackedMission.fromByteArray(data);
            }
        };
        return s2c_tracked_missions;
    }());
    hanlder.s2c_tracked_missions = s2c_tracked_missions;
    //广播服务器时间
    var S2C_SGameTime = /** @class */ (function () {
        function S2C_SGameTime() {
        }
        S2C_SGameTime.read = function (self, data) {
            // var sGameTime = Network._instance.protoTypePool.SGameTime.decode(data);
            // self.servertime = sGameTime.servertime;
            // console.log("S2C_SGameTime sGameTime:", sGameTime);
            // console.log("S2C_SGameTime sGameTime.servertime", sGameTime.servertime);
            self.servertime = data.readLong();
        };
        return S2C_SGameTime;
    }());
    hanlder.S2C_SGameTime = S2C_SGameTime;
    //
    var S2C_SCreateRoleError = /** @class */ (function () {
        function S2C_SCreateRoleError() {
        }
        S2C_SCreateRoleError.read = function (self, data) {
            self.errCode = data.readInt32();
        };
        return S2C_SCreateRoleError;
    }());
    hanlder.S2C_SCreateRoleError = S2C_SCreateRoleError;
    //通知客户端刷新人物经验
    var S2C_SRefreshUserExp = /** @class */ (function () {
        function S2C_SRefreshUserExp() {
        }
        S2C_SRefreshUserExp.read = function (self, data) {
            self.curexp = data.readLong();
            console.log("S2C_SRefreshUserExp++++++++++++++++++++++++", self.curexp);
        };
        return S2C_SRefreshUserExp;
    }());
    hanlder.S2C_SRefreshUserExp = S2C_SRefreshUserExp;
    //通知客户端刷新血量
    var S2C_SRefreshHp = /** @class */ (function () {
        function S2C_SRefreshHp() {
        }
        S2C_SRefreshHp.read = function (self, data) {
            var sRefreshHp = Network._instance.protoTypePool.SRefreshHp.decode(data);
            self.hp = sRefreshHp.hp;
            console.log("S2C_SRefreshHp sRefreshHp:", sRefreshHp);
            console.log("S2C_SRefreshHp sRefreshHp.hp", sRefreshHp.hp);
        };
        return S2C_SRefreshHp;
    }());
    hanlder.S2C_SRefreshHp = S2C_SRefreshHp;
    //服务器发送客户端最新的系统设置
    var S2C_SResetSysConfig = /** @class */ (function () {
        function S2C_SResetSysConfig() {
        }
        S2C_SResetSysConfig.read = function (self, data) {
            self.sysconfigmap = new Laya.Dictionary();
            var mapSize = data.readUint8();
            for (var index = 0; index < mapSize; index++) {
                self.sysconfigmap.set(data.readInt32(), data.readInt32());
            }
        };
        return S2C_SResetSysConfig;
    }());
    hanlder.S2C_SResetSysConfig = S2C_SResetSysConfig;
    //通知客户端刷新储备金
    var S2C_SRefSmoney = /** @class */ (function () {
        function S2C_SRefSmoney() {
        }
        S2C_SRefSmoney.read = function (self, data) {
            var sRefSmoney = Network._instance.protoTypePool.SRefSmoney.decode(data);
            self.smoney = sRefSmoney.smoney;
            console.log("S2C_SRefSmoney sRefSmoney:", sRefSmoney);
            console.log("S2C_SRefSmoney sRefSmoney.smoney", sRefSmoney.smoney);
        };
        return S2C_SRefSmoney;
    }());
    hanlder.S2C_SRefSmoney = S2C_SRefSmoney;
    //
    var S2C_SError = /** @class */ (function () {
        function S2C_SError() {
        }
        S2C_SError.read = function (self, data) {
            var sError = Network._instance.protoTypePool.SError.decode(data);
            self.error = sError.error;
            console.log("S2C_SError sError:", sError);
            console.log("S2C_SError sError.error", sError.error);
        };
        return S2C_SError;
    }());
    hanlder.S2C_SError = S2C_SError;
    //返回玩家请求的属性对应的属性值
    var S2C_SRetRoleProp = /** @class */ (function () {
        function S2C_SRetRoleProp() {
        }
        S2C_SRetRoleProp.read = function (self, data) {
            var sRetRoleProp = Network._instance.protoTypePool.SRetRoleProp.decode(data);
            self.roleid = sRetRoleProp.roleid;
            self.datas = sRetRoleProp.datas;
            console.log("S2C_SRetRoleProp sRetRoleProp:", sRetRoleProp);
            console.log("S2C_SRetRoleProp sRetRoleProp.roleid", sRetRoleProp.roleid);
            console.log("S2C_SRetRoleProp sRetRoleProp.datas", sRetRoleProp.datas);
        };
        return S2C_SRetRoleProp;
    }());
    hanlder.S2C_SRetRoleProp = S2C_SRetRoleProp;
    //返回玩家请求的属性对应的属性值
    var S2C_SStartPlayCG = /** @class */ (function () {
        function S2C_SStartPlayCG() {
        }
        S2C_SStartPlayCG.read = function (self, data) {
            var sStartPlayCG = Network._instance.protoTypePool.SStartPlayCG.decode(data);
            self.id = sStartPlayCG.id;
            console.log("S2C_SStartPlayCG sStartPlayCG:", sStartPlayCG);
            console.log("S2C_SStartPlayCG sStartPlayCG.id", sStartPlayCG.id);
        };
        return S2C_SStartPlayCG;
    }());
    hanlder.S2C_SStartPlayCG = S2C_SStartPlayCG;
    //
    var S2C_SBeginnerTip = /** @class */ (function () {
        function S2C_SBeginnerTip() {
        }
        S2C_SBeginnerTip.read = function (self, data) {
            var sBeginnerTip = Network._instance.protoTypePool.SBeginnerTip.decode(data);
            self.tipid = sBeginnerTip.tipid;
            self.tipvalue = sBeginnerTip.tipvalue;
            console.log("S2C_SBeginnerTip sBeginnerTip:", sBeginnerTip);
            console.log("S2C_SBeginnerTip sBeginnerTip.tipid", sBeginnerTip.tipid);
            console.log("S2C_SBeginnerTip sBeginnerTip.tipvalue", sBeginnerTip.tipvalue);
        };
        return S2C_SBeginnerTip;
    }());
    hanlder.S2C_SBeginnerTip = S2C_SBeginnerTip;
    //
    var S2C_SShowedBeginnerTips = /** @class */ (function () {
        function S2C_SShowedBeginnerTips() {
        }
        S2C_SShowedBeginnerTips.read = function (self, data) {
            var sShowedBeginnerTips = Network._instance.protoTypePool.SShowedBeginnerTips.decode(data);
            self.tipid = sShowedBeginnerTips.tipid;
            self.pilotType = sShowedBeginnerTips.pilotType;
            console.log("S2C_SShowedBeginnerTips sBeginnerTip:", sShowedBeginnerTips);
            console.log("S2C_SShowedBeginnerTips sBeginnerTip.tipid", sShowedBeginnerTips.tipid);
            console.log("S2C_SShowedBeginnerTips sBeginnerTip.pilotType", sShowedBeginnerTips.pilotType);
        };
        return S2C_SShowedBeginnerTips;
    }());
    hanlder.S2C_SShowedBeginnerTips = S2C_SShowedBeginnerTips;
    //返回玩家请求的其他玩家的组队情况
    var S2C_SAnswerRoleTeamState = /** @class */ (function () {
        function S2C_SAnswerRoleTeamState() {
        }
        S2C_SAnswerRoleTeamState.read = function (self, data) {
            self.roleid = data.readLong();
            self.level = data.readInt32();
            self.teamstate = data.readInt32();
            console.log("S2C_SAnswerRoleTeamState++++++++++++++++++++++", self.teamstate);
        };
        return S2C_SAnswerRoleTeamState;
    }());
    hanlder.S2C_SAnswerRoleTeamState = S2C_SAnswerRoleTeamState;
    //返回请求生成随机名字
    var S2C_SGiveName = /** @class */ (function () {
        function S2C_SGiveName() {
        }
        S2C_SGiveName.read = function (self, data) {
            self.rolename = ByteArrayUtils.readUtf16String(data);
        };
        return S2C_SGiveName;
    }());
    hanlder.S2C_SGiveName = S2C_SGiveName;
    //创建角色重名时，服务器回给客户端推荐名字
    var S2C_SRecommendsNames = /** @class */ (function () {
        function S2C_SRecommendsNames() {
        }
        S2C_SRecommendsNames.read = function (self, data) {
            self.recommendNames = [];
            var mapSize = ByteArrayUtils.uncompact_uint32(data);
            for (var index = mapSize; index > -1; index--) {
                ByteArrayUtils.uncompact_uint32(data);
                self.recommendNames.push(ByteArrayUtils.readUtf16String(data));
            }
        };
        return S2C_SRecommendsNames;
    }());
    hanlder.S2C_SRecommendsNames = S2C_SRecommendsNames;
    //服务器发给客户端，允许返回角色选择界面，并发送已有角色信息列表，同SRoleList
    var S2C_SReturnRoleList = /** @class */ (function () {
        function S2C_SReturnRoleList() {
        }
        S2C_SReturnRoleList.read = function (self, data) {
            var sReturnRoleList = Network._instance.protoTypePool.SReturnRoleList.decode(data);
            self.prevLoginRoleid = sReturnRoleList.prevLoginRoleid;
            self.prevRoleInBattle = sReturnRoleList.prevRoleInBattle;
            self.roles = sReturnRoleList.roles;
            self.gacdon = sReturnRoleList.gacdon;
            console.log("S2C_SReturnRoleList sReturnRoleList:", sReturnRoleList);
            console.log("S2C_SReturnRoleList sReturnRoleList.prevLoginRoleid", sReturnRoleList.prevLoginRoleid);
            console.log("S2C_SReturnRoleList sReturnRoleList.prevRoleInBattle", sReturnRoleList.prevRoleInBattle);
            console.log("S2C_SReturnRoleList sReturnRoleList.roles", sReturnRoleList.roles);
            console.log("S2C_SReturnRoleList sReturnRoleList.gacdon", sReturnRoleList.gacdon);
        };
        return S2C_SReturnRoleList;
    }());
    hanlder.S2C_SReturnRoleList = S2C_SReturnRoleList;
    //服务器：发送排队信息
    var S2C_SSendQueueInfo = /** @class */ (function () {
        function S2C_SSendQueueInfo() {
        }
        S2C_SSendQueueInfo.read = function (self, data) {
            var sSendQueueInfo = Network._instance.protoTypePool.SSendQueueInfo.decode(data);
            self.order = sSendQueueInfo.order;
            self.queuelength = sSendQueueInfo.queuelength;
            self.minutes = sSendQueueInfo.minutes;
            console.log("S2C_SSendQueueInfo sSendQueueInfo:", sSendQueueInfo);
            console.log("S2C_SSendQueueInfo sSendQueueInfo.order", sSendQueueInfo.order);
            console.log("S2C_SSendQueueInfo sSendQueueInfo.queuelength", sSendQueueInfo.queuelength);
            console.log("S2C_SSendQueueInfo sSendQueueInfo.minutes", sSendQueueInfo.minutes);
        };
        return S2C_SSendQueueInfo;
    }());
    hanlder.S2C_SSendQueueInfo = S2C_SSendQueueInfo;
    //服务器：通知客户端下线
    var S2C_SRoleOffline = /** @class */ (function () {
        function S2C_SRoleOffline() {
        }
        S2C_SRoleOffline.read = function (self, data) {
        };
        return S2C_SRoleOffline;
    }());
    hanlder.S2C_SRoleOffline = S2C_SRoleOffline;
    //服务器：通知客户端返回登录界面
    var S2C_SReturnLogin = /** @class */ (function () {
        function S2C_SReturnLogin() {
        }
        S2C_SReturnLogin.read = function (self, data) {
            self.reason = data.readInt32();
            ;
            self.ext = data.readInt32();
        };
        return S2C_SReturnLogin;
    }());
    hanlder.S2C_SReturnLogin = S2C_SReturnLogin;
    //服务器：发送缓慢进入排队信息
    var S2C_SSendSlowQueueInfo = /** @class */ (function () {
        function S2C_SSendSlowQueueInfo() {
        }
        S2C_SSendSlowQueueInfo.read = function (self, data) {
            var sSendSlowQueueInfo = Network._instance.protoTypePool.SSendSlowQueueInfo.decode(data);
            self.order = sSendSlowQueueInfo.order;
            self.queuelength = sSendSlowQueueInfo.queuelength;
            self.second = sSendSlowQueueInfo.second;
            console.log("S2C_SSendSlowQueueInfo sSendSlowQueueInfo:", sSendSlowQueueInfo);
            console.log("S2C_SSendSlowQueueInfo sSendSlowQueueInfo.order", sSendSlowQueueInfo.order);
            console.log("S2C_SSendSlowQueueInfo sSendSlowQueueInfo.queuelength", sSendSlowQueueInfo.queuelength);
            console.log("S2C_SSendSlowQueueInfo sSendSlowQueueInfo.second", sSendSlowQueueInfo.second);
        };
        return S2C_SSendSlowQueueInfo;
    }());
    hanlder.S2C_SSendSlowQueueInfo = S2C_SSendSlowQueueInfo;
    //客户端使用千里寻踪蝶请求玩家坐标
    var S2C_SFirstDayExitGame = /** @class */ (function () {
        function S2C_SFirstDayExitGame() {
        }
        S2C_SFirstDayExitGame.read = function (self, data) {
            var sFirstDayExitGame = Network._instance.protoTypePool.SFirstDayExitGame.decode(data);
            self.firstdayleftsecond = sFirstDayExitGame.firstdayleftsecond;
            console.log("S2C_SFirstDayExitGame sFirstDayExitGame:", sFirstDayExitGame);
            console.log("S2C_SFirstDayExitGame sFirstDayExitGame.firstdayleftsecond", sFirstDayExitGame.firstdayleftsecond);
        };
        return S2C_SFirstDayExitGame;
    }());
    hanlder.S2C_SFirstDayExitGame = S2C_SFirstDayExitGame;
    //客户端进入场景完毕
    var S2C_SGACDKickoutMsg = /** @class */ (function () {
        function S2C_SGACDKickoutMsg() {
        }
        S2C_SGACDKickoutMsg.read = function (self, data) {
            var sGACDKickoutMsg = Network._instance.protoTypePool.SGACDKickoutMsg.decode(data);
            self.reason = sGACDKickoutMsg.reason;
            self.endtime = sGACDKickoutMsg.endtime;
            console.log("S2C_SGACDKickoutMsg sGACDKickoutMsg:", sGACDKickoutMsg);
            console.log("S2C_SGACDKickoutMsg sGACDKickoutMsg.reason", sGACDKickoutMsg.reason);
            console.log("S2C_SGACDKickoutMsg sGACDKickoutMsg.endtime", sGACDKickoutMsg.endtime);
        };
        return S2C_SGACDKickoutMsg;
    }());
    hanlder.S2C_SGACDKickoutMsg = S2C_SGACDKickoutMsg;
    //发送服务器多倍信息
    var S2C_SSendServerMultiExp = /** @class */ (function () {
        function S2C_SSendServerMultiExp() {
        }
        S2C_SSendServerMultiExp.read = function (self, data) {
            var sSendServerMultiExp = Network._instance.protoTypePool.SSendServerMultiExp.decode(data);
            self.addValue = sSendServerMultiExp.addValue;
            console.log("S2C_SSendServerMultiExp sSendServerMultiExp:", sSendServerMultiExp);
            console.log("S2C_SSendServerMultiExp sSendServerMultiExp.addValue", sSendServerMultiExp.addValue);
        };
        return S2C_SSendServerMultiExp;
    }());
    hanlder.S2C_SSendServerMultiExp = S2C_SSendServerMultiExp;
    //发送登录IP信息
    var S2C_SSendLoginIp = /** @class */ (function () {
        function S2C_SSendLoginIp() {
        }
        S2C_SSendLoginIp.read = function (self, data) {
            var sSendLoginIp = Network._instance.protoTypePool.SSendLoginIp.decode(data);
            self.loginip = sSendLoginIp.loginip;
            self.lastip = sSendLoginIp.lastip;
            self.lasttime = sSendLoginIp.lasttime;
            console.log("S2C_SSendLoginIp sSendLoginIp:", sSendLoginIp);
            console.log("S2C_SSendLoginIp sSendLoginIp.loginip", sSendLoginIp.loginip);
            console.log("S2C_SSendLoginIp sSendLoginIp.lastip", sSendLoginIp.lastip);
            console.log("S2C_SSendLoginIp sSendLoginIp.lasttime", sSendLoginIp.lasttime);
        };
        return S2C_SSendLoginIp;
    }());
    hanlder.S2C_SSendLoginIp = S2C_SSendLoginIp;
    //使用改名道具的时候发送这个协议获取曾用名
    var S2C_SRequestUsedNameData = /** @class */ (function () {
        function S2C_SRequestUsedNameData() {
        }
        S2C_SRequestUsedNameData.read = function (self, data) {
            var sRequestUsedNameData = Network._instance.protoTypePool.SRequestUsedNameData.decode(data);
            self.usedNames = sRequestUsedNameData.usedNames;
            self.itemkey = sRequestUsedNameData.itemkey;
            console.log("S2C_SRequestUsedNameData sRequestUsedNameData:", sRequestUsedNameData);
            console.log("S2C_SRequestUsedNameData sRequestUsedNameData.usedNames", sRequestUsedNameData.usedNames);
            console.log("S2C_SRequestUsedNameData sRequestUsedNameData.itemkey", sRequestUsedNameData.itemkey);
        };
        return S2C_SRequestUsedNameData;
    }());
    hanlder.S2C_SRequestUsedNameData = S2C_SRequestUsedNameData;
    //客户端请求更改名字
    var S2C_SModifyRoleName = /** @class */ (function () {
        function S2C_SModifyRoleName() {
        }
        S2C_SModifyRoleName.read = function (self, data) {
            self.roleid = ByteArrayUtils.readLong(data);
            self.newName = ByteArrayUtils.readUtf16String(data);
        };
        return S2C_SModifyRoleName;
    }());
    hanlder.S2C_SModifyRoleName = S2C_SModifyRoleName;
    //人物信息界面回复
    var S2C_SRspRoleInfo = /** @class */ (function () {
        function S2C_SRspRoleInfo() {
        }
        S2C_SRspRoleInfo.read = function (self, data) {
            // var sRspRoleInfo = Network._instance.protoTypePool.SRspRoleInfo.decode(data);
            // self.hpMpStore = sRspRoleInfo.hpMpStore;
            // self.wenCaiValue = sRspRoleInfo.wenCaiValue;
            // self.wuxun = sRspRoleInfo.wuxun;
            // self.gongde = sRspRoleInfo.gongde;
            // self.honour = sRspRoleInfo.honour;
            // self.reqkey = sRspRoleInfo.reqkey;
            // console.log("S2C_SRspRoleInfo sRspRoleInfo:", sRspRoleInfo);
            // console.log("S2C_SRspRoleInfo sRspRoleInfo.hpMpStore", sRspRoleInfo.hpMpStore);
            // console.log("S2C_SRspRoleInfo sRspRoleInfo.wenCaiValue", sRspRoleInfo.wenCaiValue);
            // console.log("S2C_SRspRoleInfo sRspRoleInfo.wuxun", sRspRoleInfo.wuxun);
            // console.log("S2C_SRspRoleInfo sRspRoleInfo.gongde", sRspRoleInfo.gongde);
            // console.log("S2C_SRspRoleInfo sRspRoleInfo.honour", sRspRoleInfo.honour);
            // console.log("S2C_SRspRoleInfo sRspRoleInfo.reqkey", sRspRoleInfo.reqkey);
            var mapSize = data.readUint8();
            self.hpMpStore = new Laya.Dictionary();
            for (var index = 0; index < mapSize; index++) {
                self.hpMpStore.set(data.readUint32(), data.readLong());
            }
            self.wenCaiValue = data.readInt32();
            self.wuxun = data.readInt32();
            self.gongde = data.readInt32();
            self.honour = data.readLong();
            self.reqkey = data.readInt32();
            console.log("S2C_SRspRoleInfo++++++++++++++", self.honour);
        };
        return S2C_SRspRoleInfo;
    }());
    hanlder.S2C_SRspRoleInfo = S2C_SRspRoleInfo;
    //如果玩家需要激活,服务器发这个
    var S2C_SUserNeedActive = /** @class */ (function () {
        function S2C_SUserNeedActive() {
        }
        S2C_SUserNeedActive.read = function (self, data) {
            var sUserNeedActive = Network._instance.protoTypePool.SUserNeedActive.decode(data);
            self.retCode = sUserNeedActive.retCode;
            console.log("S2C_SUserNeedActive sUserNeedActive:", sUserNeedActive);
            console.log("S2C_SUserNeedActive sUserNeedActive.retCode", sUserNeedActive.retCode);
        };
        return S2C_SUserNeedActive;
    }());
    hanlder.S2C_SUserNeedActive = S2C_SUserNeedActive;
    //
    var S2C_SNotifyDeviceInfo = /** @class */ (function () {
        function S2C_SNotifyDeviceInfo() {
        }
        S2C_SNotifyDeviceInfo.read = function (self, data) {
            var sNotifyDeviceInfo = Network._instance.protoTypePool.SNotifyDeviceInfo.decode(data);
            self.ip = sNotifyDeviceInfo.ip;
            console.log("S2C_SNotifyDeviceInfo sNotifyDeviceInfo:", sNotifyDeviceInfo);
            console.log("S2C_SNotifyDeviceInfo sNotifyDeviceInfo.ip", sNotifyDeviceInfo.ip);
        };
        return S2C_SNotifyDeviceInfo;
    }());
    hanlder.S2C_SNotifyDeviceInfo = S2C_SNotifyDeviceInfo;
    //
    var S2C_SNotifyShieldState = /** @class */ (function () {
        function S2C_SNotifyShieldState() {
        }
        S2C_SNotifyShieldState.read = function (self, data) {
            var sNotifyShieldState = Network._instance.protoTypePool.SNotifyShieldState.decode(data);
            self.state = sNotifyShieldState.state;
            console.log("S2C_SNotifyShieldState sNotifyShieldState:", sNotifyShieldState);
            console.log("S2C_SNotifyShieldState sNotifyShieldState.state", sNotifyShieldState.state);
        };
        return S2C_SNotifyShieldState;
    }());
    hanlder.S2C_SNotifyShieldState = S2C_SNotifyShieldState;
    //
    var S2C_SGACDKickoutMsg1 = /** @class */ (function () {
        function S2C_SGACDKickoutMsg1() {
        }
        S2C_SGACDKickoutMsg1.read = function (self, data) {
            var sGACDKickoutMsg1 = Network._instance.protoTypePool.SGACDKickoutMsg1.decode(data);
            self.msg = sGACDKickoutMsg1.msg;
            console.log("S2C_SGACDKickoutMsg1 sGACDKickoutMsg1:", sGACDKickoutMsg1);
            console.log("S2C_SGACDKickoutMsg1 sGACDKickoutMsg1.msg", sGACDKickoutMsg1.msg);
        };
        return S2C_SGACDKickoutMsg1;
    }());
    hanlder.S2C_SGACDKickoutMsg1 = S2C_SGACDKickoutMsg1;
    //
    var S2C_SServerLevel = /** @class */ (function () {
        function S2C_SServerLevel() {
        }
        S2C_SServerLevel.read = function (self, data) {
            self.slevel = data.readInt32();
            self.newleveldays = data.readInt32();
            console.log("S2C_SServerLevel+++++++++++++++++++", self.slevel);
        };
        return S2C_SServerLevel;
    }());
    hanlder.S2C_SServerLevel = S2C_SServerLevel;
    //客户端进入场景完毕
    var S2C_STeamVote = /** @class */ (function () {
        function S2C_STeamVote() {
        }
        S2C_STeamVote.read = function (self, data) {
            var sTeamVote = Network._instance.protoTypePool.STeamVote.decode(data);
            self.flag = sTeamVote.flag;
            self.parms = sTeamVote.parms;
            console.log("S2C_STeamVote sTeamVote:", sTeamVote);
            console.log("S2C_STeamVote sTeamVote.flag", sTeamVote.flag);
            console.log("S2C_STeamVote sTeamVote.parms", sTeamVote.parms);
        };
        return S2C_STeamVote;
    }());
    hanlder.S2C_STeamVote = S2C_STeamVote;
    //服务器发送客户端最新的系统设置
    var S2C_SGetSysConfig = /** @class */ (function () {
        function S2C_SGetSysConfig() {
        }
        S2C_SGetSysConfig.read = function (self, data) {
            self.sysconfigmap = new Laya.Dictionary();
            var mapSize = data.readUint8();
            for (var index = 0; index < mapSize; index++) {
                self.sysconfigmap.set(data.readInt32(), data.readInt32());
            }
        };
        return S2C_SGetSysConfig;
    }());
    hanlder.S2C_SGetSysConfig = S2C_SGetSysConfig;
    //跨服相关的协议
    var S2C_SServerIDResponse = /** @class */ (function () {
        function S2C_SServerIDResponse() {
        }
        S2C_SServerIDResponse.read = function (self, data) {
            var sServerIDResponse = Network._instance.protoTypePool.SServerIDResponse.decode(data);
            self.serverid = sServerIDResponse.serverid;
            console.log("S2C_SServerIDResponse sServerIDResponse:", sServerIDResponse);
            console.log("S2C_SServerIDResponse sServerIDResponse.serverid", sServerIDResponse.serverid);
        };
        return S2C_SServerIDResponse;
    }());
    hanlder.S2C_SServerIDResponse = S2C_SServerIDResponse;
    //
    var S2C_SAddPointAttrData = /** @class */ (function () {
        function S2C_SAddPointAttrData() {
        }
        S2C_SAddPointAttrData.read = function (self, data) {
            var sAddPointAttrData = Network._instance.protoTypePool.SAddPointAttrData.decode(data);
            self.max_hp = sAddPointAttrData.max_hp;
            self.max_mp = sAddPointAttrData.max_mp;
            self.attack = sAddPointAttrData.attack;
            self.defend = sAddPointAttrData.defend;
            self.magic_attack = sAddPointAttrData.magic_attack;
            self.magic_def = sAddPointAttrData.magic_def;
            self.speed = sAddPointAttrData.speed;
            console.log("S2C_SAddPointAttrData sAddPointAttrData:", sAddPointAttrData);
            console.log("S2C_SAddPointAttrData sAddPointAttrData.max_hp", sAddPointAttrData.max_hp);
            console.log("S2C_SAddPointAttrData sAddPointAttrData.max_mp", sAddPointAttrData.max_mp);
            console.log("S2C_SAddPointAttrData sAddPointAttrData.attack", sAddPointAttrData.attack);
            console.log("S2C_SAddPointAttrData sAddPointAttrData.defend", sAddPointAttrData.defend);
            console.log("S2C_SAddPointAttrData sAddPointAttrData.magic_attack", sAddPointAttrData.magic_attack);
            console.log("S2C_SAddPointAttrData sAddPointAttrData.magic_def", sAddPointAttrData.magic_def);
            console.log("S2C_SAddPointAttrData sAddPointAttrData.speed", sAddPointAttrData.speed);
        };
        return S2C_SAddPointAttrData;
    }());
    hanlder.S2C_SAddPointAttrData = S2C_SAddPointAttrData;
    //
    var S2C_SReqHelpCountView = /** @class */ (function () {
        function S2C_SReqHelpCountView() {
        }
        S2C_SReqHelpCountView.read = function (self, data) {
            self.expvalue = data.readLong();
            self.expvaluemax = data.readLong();
            self.shengwangvalue = data.readInt32();
            self.shengwangvaluemax = data.readInt32();
            self.factionvalue = data.readInt32();
            self.factionvaluemax = data.readInt32();
            self.helpgiveitemnum = data.readInt32();
            self.helpgiveitemnummax = data.readInt32();
            self.helpitemnum = data.readInt32();
            self.helpitemnummax = data.readInt32();
            console.log("S2C_SReqHelpCountView+++++++++++++++++++++");
        };
        return S2C_SReqHelpCountView;
    }());
    hanlder.S2C_SReqHelpCountView = S2C_SReqHelpCountView;
    //返回人物染色衣橱信息
    var S2C_SReqColorRoomView = /** @class */ (function () {
        function S2C_SReqColorRoomView() {
        }
        S2C_SReqColorRoomView.read = function (self, data) {
            var sReqColorRoomView = Network._instance.protoTypePool.SReqColorRoomView.decode(data);
            self.nummax = sReqColorRoomView.nummax;
            self.rolecolortypelist = sReqColorRoomView.rolecolortypelist;
            console.log("S2C_SReqColorRoomView sReqColorRoomView:", sReqColorRoomView);
            console.log("S2C_SReqColorRoomView sReqColorRoomView.nummax", sReqColorRoomView.nummax);
            console.log("S2C_SReqColorRoomView sReqColorRoomView.rolecolortypelist", sReqColorRoomView.rolecolortypelist);
        };
        return S2C_SReqColorRoomView;
    }());
    hanlder.S2C_SReqColorRoomView = S2C_SReqColorRoomView;
    //返回使用染色成功
    var S2C_SReqUseColor = /** @class */ (function () {
        function S2C_SReqUseColor() {
        }
        S2C_SReqUseColor.read = function (self, data) {
            var sReqUseColor = Network._instance.protoTypePool.SReqUseColor.decode(data);
            self.rolecolorinfoo = sReqUseColor.rolecolorinfoo;
            console.log("S2C_SReqUseColor sReqUseColor:", sReqUseColor);
            console.log("S2C_SReqUseColor sReqUseColor.rolecolorinfoo", sReqUseColor.rolecolorinfoo);
        };
        return S2C_SReqUseColor;
    }());
    hanlder.S2C_SReqUseColor = S2C_SReqUseColor;
    //返回宠物染色
    var S2C_SReqUsePetColor = /** @class */ (function () {
        function S2C_SReqUsePetColor() {
        }
        S2C_SReqUsePetColor.read = function (self, data) {
            var sReqUsePetColor = Network._instance.protoTypePool.SReqUsePetColor.decode(data);
            self.petkey = sReqUsePetColor.petkey;
            self.colorpos1 = sReqUsePetColor.colorpos1;
            self.colorpos2 = sReqUsePetColor.colorpos2;
            console.log("S2C_SReqUsePetColor sReqUsePetColor:", sReqUsePetColor);
            console.log("S2C_SReqUsePetColor sReqUsePetColor.petkey", sReqUsePetColor.petkey);
            console.log("S2C_SReqUsePetColor sReqUsePetColor.colorpos1", sReqUsePetColor.colorpos1);
            console.log("S2C_SReqUsePetColor sReqUsePetColor.colorpos2", sReqUsePetColor.colorpos2);
        };
        return S2C_SReqUsePetColor;
    }());
    hanlder.S2C_SReqUsePetColor = S2C_SReqUsePetColor;
    //返回人物切换加点方案次数
    var S2C_SReqPointSchemeTime = /** @class */ (function () {
        function S2C_SReqPointSchemeTime() {
        }
        S2C_SReqPointSchemeTime.read = function (self, data) {
            self.schemetimes = data.readInt32();
            console.log("S2C_SReqPointSchemeTime+++++++++++++++++", self.schemetimes);
        };
        return S2C_SReqPointSchemeTime;
    }());
    hanlder.S2C_SReqPointSchemeTime = S2C_SReqPointSchemeTime;
    //设置功能开关
    var S2C_SSetFunOpenClose = /** @class */ (function () {
        function S2C_SSetFunOpenClose() {
        }
        S2C_SSetFunOpenClose.read = function (self, data) {
            var sSetFunOpenClose = Network._instance.protoTypePool.SSetFunOpenClose.decode(data);
            self.info = sSetFunOpenClose.info;
            console.log("S2C_SSetFunOpenClose sSetFunOpenClose:", sSetFunOpenClose);
            console.log("S2C_SSetFunOpenClose sSetFunOpenClose.info", sSetFunOpenClose.info);
        };
        return S2C_SSetFunOpenClose;
    }());
    hanlder.S2C_SSetFunOpenClose = S2C_SSetFunOpenClose;
    //援助声望当前值
    var S2C_SSendHelpSW = /** @class */ (function () {
        function S2C_SSendHelpSW() {
        }
        S2C_SSendHelpSW.read = function (self, data) {
            self.helpsw = data.readInt32();
            console.log("S2C_SSendHelpSW+++++++++++++++++++", self.helpsw);
        };
        return S2C_SSendHelpSW;
    }());
    hanlder.S2C_SSendHelpSW = S2C_SSendHelpSW;
    //
    var S2C_SSetLineConfig = /** @class */ (function () {
        function S2C_SSetLineConfig() {
        }
        S2C_SSetLineConfig.read = function (self, data) {
            var _tempDic = new Laya.Dictionary();
            var mapSize = data.readUint8();
            for (var index = 0; index < mapSize; index++) {
                _tempDic.set(data.readInt32(), data.readInt32());
            }
            self.configmap = _tempDic;
        };
        return S2C_SSetLineConfig;
    }());
    hanlder.S2C_SSetLineConfig = S2C_SSetLineConfig;
    var S2C_SDefineTeam = /** @class */ (function () {
        function S2C_SDefineTeam() {
        }
        S2C_SDefineTeam.read = function (self, data) {
            self.instid = data.readInt32();
            self.tlstep = data.readInt32();
            self.mystep = data.readInt32();
        };
        return S2C_SDefineTeam;
    }());
    hanlder.S2C_SDefineTeam = S2C_SDefineTeam;
    //验证码倒计时完成时间点
    var S2C_SCheckCodeFinishTime = /** @class */ (function () {
        function S2C_SCheckCodeFinishTime() {
        }
        S2C_SCheckCodeFinishTime.read = function (self, data) {
            self.finishTimePoint = data.readLong();
        };
        return S2C_SCheckCodeFinishTime;
    }());
    hanlder.S2C_SCheckCodeFinishTime = S2C_SCheckCodeFinishTime;
    //确认关联手机返回状态1成功0失败
    var S2C_SBindTel = /** @class */ (function () {
        function S2C_SBindTel() {
        }
        S2C_SBindTel.read = function (self, data) {
            self.status = data.readByte();
            self.bindTelTime = data.readLong();
        };
        return S2C_SBindTel;
    }());
    hanlder.S2C_SBindTel = S2C_SBindTel;
    //解除关联手机返回状态1成功0失败
    var S2C_SUnBindTel = /** @class */ (function () {
        function S2C_SUnBindTel() {
        }
        S2C_SUnBindTel.read = function (self, data) {
            var sUnBindTel = Network._instance.protoTypePool.SUnBindTel.decode(data);
            self.status = sUnBindTel.status;
            console.log("S2C_SUnBindTel sUnBindTel:", sUnBindTel);
            console.log("S2C_SUnBindTel sUnBindTel.status", sUnBindTel.status);
        };
        return S2C_SUnBindTel;
    }());
    hanlder.S2C_SUnBindTel = S2C_SUnBindTel;
    //返回关联手机信息
    var S2C_SGetBindTel = /** @class */ (function () {
        function S2C_SGetBindTel() {
        }
        S2C_SGetBindTel.read = function (self, data) {
            self.tel = data.readLong();
            self.createDate = data.readLong();
            self.isFistLoginOfDay = data.readByte();
            self.isGetBindTelAward = data.readByte();
            self.isBindTelAgain = data.readByte();
            self.bindTelTime = data.readLong();
        };
        return S2C_SGetBindTel;
    }());
    hanlder.S2C_SGetBindTel = S2C_SGetBindTel;
    //返回绑定手机奖励状态
    var S2C_SGetBindTelAward = /** @class */ (function () {
        function S2C_SGetBindTelAward() {
        }
        S2C_SGetBindTelAward.read = function (self, data) {
            self.status = data.readByte();
        };
        return S2C_SGetBindTelAward;
    }());
    hanlder.S2C_SGetBindTelAward = S2C_SGetBindTelAward;
    //重新绑定手机
    var S2C_SBindTelAgain = /** @class */ (function () {
        function S2C_SBindTelAgain() {
        }
        S2C_SBindTelAgain.read = function (self, data) {
            var sBindTelAgain = Network._instance.protoTypePool.SBindTelAgain.decode(data);
            console.log("S2C_SBindTelAgain sBindTelAgain:", sBindTelAgain);
        };
        return S2C_SBindTelAgain;
    }());
    hanlder.S2C_SBindTelAgain = S2C_SBindTelAgain;
    //返回成功与否
    var S2C_SSetPassword = /** @class */ (function () {
        function S2C_SSetPassword() {
        }
        S2C_SSetPassword.read = function (self, data) {
            self.status = data.readByte();
        };
        return S2C_SSetPassword;
    }());
    hanlder.S2C_SSetPassword = S2C_SSetPassword;
    //返回成功与否
    var S2C_SResetPassword = /** @class */ (function () {
        function S2C_SResetPassword() {
        }
        S2C_SResetPassword.read = function (self, data) {
            self.status = data.readByte();
        };
        return S2C_SResetPassword;
    }());
    hanlder.S2C_SResetPassword = S2C_SResetPassword;
    //返回成功与否
    var S2C_SDelPassword = /** @class */ (function () {
        function S2C_SDelPassword() {
        }
        S2C_SDelPassword.read = function (self, data) {
            self.status = data.readByte();
        };
        return S2C_SDelPassword;
    }());
    hanlder.S2C_SDelPassword = S2C_SDelPassword;
    //解除时间点
    var S2C_SForceDelPassword = /** @class */ (function () {
        function S2C_SForceDelPassword() {
        }
        S2C_SForceDelPassword.read = function (self, data) {
            self.startTimePoint = data.readInt32();
            self.finishTimePoint = data.readInt32();
        };
        return S2C_SForceDelPassword;
    }());
    hanlder.S2C_SForceDelPassword = S2C_SForceDelPassword;
    //返回成功与否
    var S2C_SCancelForceDelPassword = /** @class */ (function () {
        function S2C_SCancelForceDelPassword() {
        }
        S2C_SCancelForceDelPassword.read = function (self, data) {
            self.status = data.readInt32();
        };
        return S2C_SCancelForceDelPassword;
    }());
    hanlder.S2C_SCancelForceDelPassword = S2C_SCancelForceDelPassword;
    //返回成功与否
    var S2C_SOpenGoodLocks = /** @class */ (function () {
        function S2C_SOpenGoodLocks() {
        }
        S2C_SOpenGoodLocks.read = function (self, data) {
            self.status = data.readInt32();
        };
        return S2C_SOpenGoodLocks;
    }());
    hanlder.S2C_SOpenGoodLocks = S2C_SOpenGoodLocks;
    //返回成功与否
    var S2C_SCloseGoodLocks = /** @class */ (function () {
        function S2C_SCloseGoodLocks() {
        }
        S2C_SCloseGoodLocks.read = function (self, data) {
            self.status = data.readInt32();
            self.closeType = data.readInt32();
        };
        return S2C_SCloseGoodLocks;
    }());
    hanlder.S2C_SCloseGoodLocks = S2C_SCloseGoodLocks;
    //道具安全锁信息
    var S2C_SGetGoodLocksInfo = /** @class */ (function () {
        function S2C_SGetGoodLocksInfo() {
        }
        S2C_SGetGoodLocksInfo.read = function (self, data) {
            self.password = ByteArrayUtils.readUtf16String(data);
            self.forceDelPdTime = data.readInt32();
            self.forceDelEndTime = data.readInt32();
            self.isFistLoginOfDay = data.readInt32();
            self.errorTimes = data.readInt32();
            self.lockEndTime = data.readInt32();
            self.isOpenSafeLock = data.readInt32();
        };
        return S2C_SGetGoodLocksInfo;
    }());
    hanlder.S2C_SGetGoodLocksInfo = S2C_SGetGoodLocksInfo;
    //道具输入密码解锁状态
    var S2C_SGoodUnLock = /** @class */ (function () {
        function S2C_SGoodUnLock() {
        }
        S2C_SGoodUnLock.read = function (self, data) {
            var sGoodUnLock = Network._instance.protoTypePool.SGoodUnLock.decode(data);
            self.status = sGoodUnLock.status;
            console.log("S2C_SGoodUnLock sGoodUnLock:", sGoodUnLock);
            console.log("S2C_SGoodUnLock sGoodUnLock.status", sGoodUnLock.status);
        };
        return S2C_SGoodUnLock;
    }());
    hanlder.S2C_SGoodUnLock = S2C_SGoodUnLock;
    //强制解锁到期状态
    var S2C_SForceUnlockTimeExpire = /** @class */ (function () {
        function S2C_SForceUnlockTimeExpire() {
        }
        S2C_SForceUnlockTimeExpire.read = function (self, data) {
            var sForceUnlockTimeExpire = Network._instance.protoTypePool.SForceUnlockTimeExpire.decode(data);
            self.status = sForceUnlockTimeExpire.status;
            console.log("S2C_SForceUnlockTimeExpire sForceUnlockTimeExpire:", sForceUnlockTimeExpire);
            console.log("S2C_SForceUnlockTimeExpire sForceUnlockTimeExpire.status", sForceUnlockTimeExpire.status);
        };
        return S2C_SForceUnlockTimeExpire;
    }());
    hanlder.S2C_SForceUnlockTimeExpire = S2C_SForceUnlockTimeExpire;
    //改变道具锁的状态
    var S2C_SChangeGoodLockState = /** @class */ (function () {
        function S2C_SChangeGoodLockState() {
        }
        S2C_SChangeGoodLockState.read = function (self, data) {
            var sChangeGoodLockState = Network._instance.protoTypePool.SChangeGoodLockState.decode(data);
            console.log("S2C_SChangeGoodLockState sChangeGoodLockState:", sChangeGoodLockState);
        };
        return S2C_SChangeGoodLockState;
    }());
    hanlder.S2C_SChangeGoodLockState = S2C_SChangeGoodLockState;
    //验证码倒计时完成时间点
    var S2C_SCheckCodeFinishTimePoint = /** @class */ (function () {
        function S2C_SCheckCodeFinishTimePoint() {
        }
        S2C_SCheckCodeFinishTimePoint.read = function (self, data) {
            var sCheckCodeFinishTimePoint = Network._instance.protoTypePool.SCheckCodeFinishTimePoint.decode(data);
            self.checkCodeType = sCheckCodeFinishTimePoint.checkCodeType;
            self.finishTimePoint = sCheckCodeFinishTimePoint.finishTimePoint;
            console.log("S2C_SCheckCodeFinishTimePoint sCheckCodeFinishTimePoint:", sCheckCodeFinishTimePoint);
            console.log("S2C_SCheckCodeFinishTimePoint sCheckCodeFinishTimePoint.checkCodeType", sCheckCodeFinishTimePoint.checkCodeType);
            console.log("S2C_SCheckCodeFinishTimePoint sCheckCodeFinishTimePoint.finishTimePoint", sCheckCodeFinishTimePoint.finishTimePoint);
        };
        return S2C_SCheckCodeFinishTimePoint;
    }());
    hanlder.S2C_SCheckCodeFinishTimePoint = S2C_SCheckCodeFinishTimePoint;
    //藏宝阁上架验证
    var S2C_SCBGUpCheckCode = /** @class */ (function () {
        function S2C_SCBGUpCheckCode() {
        }
        S2C_SCBGUpCheckCode.read = function (self, data) {
            var sCBGUpCheckCode = Network._instance.protoTypePool.SCBGUpCheckCode.decode(data);
            self.status = sCBGUpCheckCode.status;
            console.log("S2C_SCBGUpCheckCode sCBGUpCheckCode:", sCBGUpCheckCode);
            console.log("S2C_SCBGUpCheckCode sCBGUpCheckCode.status", sCBGUpCheckCode.status);
        };
        return S2C_SCBGUpCheckCode;
    }());
    hanlder.S2C_SCBGUpCheckCode = S2C_SCBGUpCheckCode;
    //
    var S2C_SGetPetEquipInfo = /** @class */ (function () {
        function S2C_SGetPetEquipInfo() {
        }
        S2C_SGetPetEquipInfo.read = function (self, data) {
            console.log("下发宠物装备信息");
            self.mydata = new game.modules.pet.models.PetEquipInfoVo();
            var size = data.readUint8();
            var bag;
            for (var num = 0; num < size; num++) {
                var petkey = data.readInt32();
                bag = new game.modules.bag.models.BagVo();
                bag.fromByteArray(data);
                self.mydata.petequipinfo.set(petkey, bag);
            }
        };
        return S2C_SGetPetEquipInfo;
    }());
    hanlder.S2C_SGetPetEquipInfo = S2C_SGetPetEquipInfo;
    //9002 ljm
    //GM 检测的角色ID正确时，服务器回复 GM 角色ID检测的请求， 角色ID不正确，服务器只发送提示消息
    var S2C_sgmcheck_roleid = /** @class */ (function () {
        function S2C_sgmcheck_roleid() {
        }
        S2C_sgmcheck_roleid.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            var sCreatRole = Browser.window.SGMCheckRoleID.decode(data);
            self.checkRoleId = sCreatRole.checkRoleId;
            console.log("S2C_sgmcheck_roleid sCreatRole:", sCreatRole);
            console.log("S2C_sgmcheck_roleid sCreatRole.newRoleInfo", sCreatRole.checkRoleId);
        };
        return S2C_sgmcheck_roleid;
    }());
    hanlder.S2C_sgmcheck_roleid = S2C_sgmcheck_roleid;
    //GM帐号才回消息
    var S2C_SCheck_GM = /** @class */ (function () {
        function S2C_SCheck_GM() {
        }
        //public checkRoleId: any ;	//String
        S2C_SCheck_GM.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            // var sCreatRole = Browser.window.SGMCheckRoleID.decode(data);
            // self.checkRoleId = sCreatRole.newRoleInfo;
            // console.log("S2C_sgmcheck_roleid sCreatRole:",sCreatRole);
            // console.log("S2C_sgmcheck_roleid sCreatRole.newRoleInfo",sCreatRole.checkRoleId);
        };
        return S2C_SCheck_GM;
    }());
    hanlder.S2C_SCheck_GM = S2C_SCheck_GM;
    //我的伙伴列表
    var S2C_SHuoban_List = /** @class */ (function () {
        function S2C_SHuoban_List() {
            this.huobans = []; //String
        }
        S2C_SHuoban_List.read = function (self, bytes) {
            self.huobans = [];
            var huobansSize = bytes.readUint8();
            var huoBanInfo;
            for (var index = 0; index < huobansSize; index++) {
                huoBanInfo = new game.modules.huoban.models.HuoBanInfoVo();
                huoBanInfo.fromByteArray(bytes);
                self.huobans.push(huoBanInfo);
            }
        };
        return S2C_SHuoban_List;
    }());
    hanlder.S2C_SHuoban_List = S2C_SHuoban_List;
    //我的一个伙伴信息
    var S2C_SHuoban_Detail = /** @class */ (function () {
        function S2C_SHuoban_Detail() {
        }
        S2C_SHuoban_Detail.read = function (self, bytes) {
            var huoBandetail;
            huoBandetail = new game.modules.huoban.models.HuoBanDetailVo();
            huoBandetail.fromByteArray(bytes);
            self.huoban = huoBandetail;
        };
        return S2C_SHuoban_Detail;
    }());
    hanlder.S2C_SHuoban_Detail = S2C_SHuoban_Detail;
    //
    var S2C_SZhenrong_Info = /** @class */ (function () {
        function S2C_SZhenrong_Info() {
        }
        S2C_SZhenrong_Info.read = function (self, bytes) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            self.dangqianzhenrong = bytes.readUint32();
            self.zhenrongxinxi = new Array();
            var zhenrongxinxiSize = bytes.readUint8();
            var zhenrongInfo;
            for (var index = 0; index < zhenrongxinxiSize; index++) {
                zhenrongInfo = new game.modules.huoban.models.ZhenrongInfoVo();
                self.zhenrongxinxi[bytes.readUint32()] = zhenrongInfo;
                zhenrongInfo.fromByteArray(bytes);
            }
        };
        return S2C_SZhenrong_Info;
    }());
    hanlder.S2C_SZhenrong_Info = S2C_SZhenrong_Info;
    //SChange_Zhenrong
    var S2C_SChange_Zhenrong = /** @class */ (function () {
        function S2C_SChange_Zhenrong() {
        }
        S2C_SChange_Zhenrong.read = function (self, bytes) {
            self.zhenrong = bytes.readUint32();
            self.zhenfa = bytes.readUint32();
            self.huobanlist = [];
            var huobanlistSize = bytes.readUint8();
            for (var index = 0; index < huobanlistSize; index++) {
                self.huobanlist.push(bytes.readUint32());
            }
            self.reason = bytes.readUint32();
        };
        return S2C_SChange_Zhenrong;
    }());
    hanlder.S2C_SChange_Zhenrong = S2C_SChange_Zhenrong;
    //解锁伙伴返回
    var S2C_SActive_HuoBan = /** @class */ (function () {
        function S2C_SActive_HuoBan() {
        }
        S2C_SActive_HuoBan.read = function (self, bytes) {
            self.huobanId = bytes.readUint32();
            self.state = bytes.readUint32();
        };
        return S2C_SActive_HuoBan;
    }());
    hanlder.S2C_SActive_HuoBan = S2C_SActive_HuoBan;
    //<!-- 改变阵容的光环返回-->
    var S2C_SSwitch_Zhenfa = /** @class */ (function () {
        function S2C_SSwitch_Zhenfa() {
        }
        S2C_SSwitch_Zhenfa.read = function (self, data) {
            self.zhenrongid = data.readUint32();
            self.zhenfaid = data.readUint32();
        };
        return S2C_SSwitch_Zhenfa;
    }());
    hanlder.S2C_SSwitch_Zhenfa = S2C_SSwitch_Zhenfa;
    //SGongHuiFuBenLastTime
    var S2C_SGongHuiFuBen_LastTime = /** @class */ (function () {
        function S2C_SGongHuiFuBen_LastTime() {
        }
        S2C_SGongHuiFuBen_LastTime.read = function (self, data) {
            var lasttimes = Network._instance.protoTypePool.SGongHuiFuBenLastTime.decode(data);
            self.lasttime = lasttimes.lasttime;
            console.log("S2C_SChange_Zhenrong sCreatRole:", lasttimes);
            console.log("S2C_SChange_Zhenrong sCreatRole.newRoleInfo", lasttimes.lasttime);
        };
        return S2C_SGongHuiFuBen_LastTime;
    }());
    hanlder.S2C_SGongHuiFuBen_LastTime = S2C_SGongHuiFuBen_LastTime;
    //每个冰封王座副本的信息,冰封王座的排行榜通过SRequestRankList发送给客户端,本人的排名也在SRequestRankList中
    var S2C_SBingFeng_LandInfo = /** @class */ (function () {
        function S2C_SBingFeng_LandInfo() {
        }
        S2C_SBingFeng_LandInfo.read = function (self, data) {
            var bingfenginfo = Network._instance.protoTypePool.SBingFengLandInfo.decode(data);
            self.ranktype = bingfenginfo.ranktype; //参加RankType
            self.landId = bingfenginfo.landId; //
            self.lastrank = bingfenginfo.lastrank; //上次的排名
            self.receiveaward = bingfenginfo.receiveaward; //如果已经领过奖励,为1，客户端应该把领取奖励灰掉
            self.stage = bingfenginfo.stage; //我的进度,根据landId和stage可以确定已经挑战过的npc
            self.yesterdaystage = bingfenginfo.yesterdaystage; //昨日进度
            self.entertimes = bingfenginfo.entertimes; //还能进入的次数
            self.vip = bingfenginfo.vip; //vip等级
            console.log("SBingFengLandInfo sCreatRole:", bingfenginfo);
            console.log("SBingFengLandInfo sCreatRole.newRoleInfo", bingfenginfo.ranktype);
        };
        return S2C_SBingFeng_LandInfo;
    }());
    hanlder.S2C_SBingFeng_LandInfo = S2C_SBingFeng_LandInfo;
    //玩家进入冰封王座地图的时候,会发这条消息,客户端根据这条协议可以决定显示哪些npc和挑战的关数
    var S2C_SEnter_BingFengLand = /** @class */ (function () {
        function S2C_SEnter_BingFengLand() {
        }
        S2C_SEnter_BingFengLand.read = function (self, data) {
            var bingfenginfo = Network._instance.protoTypePool.SEnterBingFengLand.decode(data);
            self.landId = bingfenginfo.landId; //
            self.stage = bingfenginfo.stage; //
            self.autogo = bingfenginfo.autogo; //
            self.finishstage = bingfenginfo.finishstage; //
            console.log("SEnterBingFengLand sCreatRole:", bingfenginfo);
            console.log("SEnterBingFengLand sCreatRole.newRoleInfo", bingfenginfo.landId);
        };
        return S2C_SEnter_BingFengLand;
    }());
    hanlder.S2C_SEnter_BingFengLand = S2C_SEnter_BingFengLand;
    //玩家能够进入冰封王座
    var S2C_SCanEnter_BingFeng = /** @class */ (function () {
        function S2C_SCanEnter_BingFeng() {
        }
        S2C_SCanEnter_BingFeng.read = function (self, data) {
            self.finish = data.readUint32();
        };
        return S2C_SCanEnter_BingFeng;
    }());
    hanlder.S2C_SCanEnter_BingFeng = S2C_SCanEnter_BingFeng;
    //关卡最快通关信息
    var S2C_SGetBingFeng_Detail = /** @class */ (function () {
        function S2C_SGetBingFeng_Detail() {
        }
        S2C_SGetBingFeng_Detail.read = function (self, data) {
            var bingfenginfo = Network._instance.protoTypePool.SGetBingFengDetail.decode(data);
            self.rolename = bingfenginfo.rolename; //
            self.usetime = bingfenginfo.usetime; //
            self.stagestate = bingfenginfo.stagestate; //
            self.myusetime = bingfenginfo.myusetime; //
            console.log("SGetBingFengDetail sCreatRole:", bingfenginfo);
            console.log("SGetBingFengDetail sCreatRole.newRoleInfo", bingfenginfo.rolename);
        };
        return S2C_SGetBingFeng_Detail;
    }());
    hanlder.S2C_SGetBingFeng_Detail = S2C_SGetBingFeng_Detail;
    var S2C_SItemNum_Change = /** @class */ (function () {
        function S2C_SItemNum_Change() {
        }
        S2C_SItemNum_Change.read = function (self, data) {
            self.packid = data.readInt32();
            self.keyinpack = data.readInt32();
            self.curnum = data.readInt32();
        };
        return S2C_SItemNum_Change;
    }());
    hanlder.S2C_SItemNum_Change = S2C_SItemNum_Change;
    //
    var S2C_SDel_Item = /** @class */ (function () {
        function S2C_SDel_Item() {
        }
        S2C_SDel_Item.read = function (self, data) {
            // var delitem = Network._instance.protoTypePool.SDelItem.decode(data);
            // self.packid = delitem.packid;//
            // self.itemKey = delitem.itemKey;//
            self.packid = data.readInt32();
            self.itemKey = data.readInt32();
            // console.log("SDelItem sCreatRole:",delitem);
            console.log("SDelItem packid", self.packid);
            console.log("SDelItem itemkey", self.itemKey);
        };
        return S2C_SDel_Item;
    }());
    hanlder.S2C_SDel_Item = S2C_SDel_Item;
    //S2C_SAdd_Item
    var S2C_SAdd_Item = /** @class */ (function () {
        function S2C_SAdd_Item() {
        }
        S2C_SAdd_Item.read = function (self, data) {
            // var additem = Network._instance.protoTypePool.SAddItem.decode(data);
            // self.packid = additem.packid;//
            // self.data = additem.data;//
            self.packid = data.readInt32();
            self.data = [];
            var dataSize = data.readUint8();
            var item;
            for (var index = 0; index < dataSize; index++) {
                item = new game.modules.bag.models.ItemVo();
                item.fromByteArray(data);
                self.data.push(item);
            } //Item
            // console.log("SAddItem sCreatRole:",additem);
            console.log("SAddItem sCreatRole.newRoleInfo", self.packid);
            console.log("SAddItem sCreatRole.newRoleInfo", self.data);
        };
        return S2C_SAdd_Item;
    }());
    hanlder.S2C_SAdd_Item = S2C_SAdd_Item;
    //服务器通知客户端刷新道具的flag
    var S2C_SRefresh_ItemFlag = /** @class */ (function () {
        function S2C_SRefresh_ItemFlag() {
        }
        S2C_SRefresh_ItemFlag.read = function (self, data) {
            self.itemkey = data.readInt32();
            self.flag = data.readInt32();
            self.packid = data.readInt32();
        };
        return S2C_SRefresh_ItemFlag;
    }());
    hanlder.S2C_SRefresh_ItemFlag = S2C_SRefresh_ItemFlag;
    //SRefreshItemTimeout
    var S2C_SRefreshItem_Timeout = /** @class */ (function () {
        function S2C_SRefreshItem_Timeout() {
        }
        S2C_SRefreshItem_Timeout.read = function (self, data) {
            var refreshitem = Network._instance.protoTypePool.SRefreshItemTimeout.decode(data);
            self.packid = refreshitem.packid; //
            self.itemkey = refreshitem.itemkey; //
            self.timeout = refreshitem.timeout; //
            console.log("SRefreshItemTimeout sCreatRole:", refreshitem);
            console.log("SRefreshItemTimeout sCreatRole.newRoleInfo", refreshitem.itemkey);
        };
        return S2C_SRefreshItem_Timeout;
    }());
    hanlder.S2C_SRefreshItem_Timeout = S2C_SRefreshItem_Timeout;
    //SRefreshItemTimeout
    var S2C_SItemPos_Change = /** @class */ (function () {
        function S2C_SItemPos_Change() {
        }
        S2C_SItemPos_Change.read = function (self, data) {
            var itempos = Network._instance.protoTypePool.SItemPosChange.decode(data);
            self.packid = itempos.packid; //
            self.keyinpack = itempos.keyinpack; //
            self.pos = itempos.pos; //
            console.log("SItemPosChange sCreatRole:", itempos);
            console.log("SItemPosChange sCreatRole.newRoleInfo", itempos.packid);
        };
        return S2C_SItemPos_Change;
    }());
    hanlder.S2C_SItemPos_Change = S2C_SItemPos_Change;
    //背包信息下发
    var S2C_SGetPack_Info = /** @class */ (function () {
        function S2C_SGetPack_Info() {
        }
        S2C_SGetPack_Info.read = function (self, data) {
            // var packinfo = Network._instance.protoTypePool.SGetPackInfo.decode(data);
            // self.packid = packinfo.packid;//
            // self.baginfo = packinfo.baginfo;//
            // console.log("SGetPackInfo sCreatRole:",packinfo);
            // console.log("SGetPackInfo sCreatRole.newRoleInfo",packinfo.packid);
            self.packid = data.readInt32();
            self.baginfo = new game.modules.bag.models.BagVo();
            self.baginfo.fromByteArray(data);
        };
        return S2C_SGetPack_Info;
    }());
    hanlder.S2C_SGetPack_Info = S2C_SGetPack_Info;
    //SRefreshCurrency
    var S2C_SRefresh_Currency = /** @class */ (function () {
        function S2C_SRefresh_Currency() {
        }
        S2C_SRefresh_Currency.read = function (self, data) {
            // var refreshcurr = Network._instance.protoTypePool.SRefreshCurrency.decode(data);
            // self.packid = refreshcurr.packid;//
            // self.currency = refreshcurr.currency;//
            // console.log("SRefreshCurrency sCreatRole:",refreshcurr);
            // console.log("SRefreshCurrency sCreatRole.newRoleInfo",refreshcurr.packid);
            self.packid = data.readInt32();
            var mapSize = data.readUint8();
            self.currency = new Laya.Dictionary();
            for (var index = 0; index < mapSize; index++) {
                self.currency.set(data.readByte(), data.readLong());
                console.log("S2C_SRefresh_Currency self:", self);
            }
            console.log("S2C_SRefresh_Currency+++++++++++", self.currency);
        };
        return S2C_SRefresh_Currency;
    }());
    hanlder.S2C_SRefresh_Currency = S2C_SRefresh_Currency;
    //SGetItemTips
    var S2C_SGetItem_Tips = /** @class */ (function () {
        function S2C_SGetItem_Tips() {
            this.tips = {}; //
        }
        S2C_SGetItem_Tips.read = function (self, data) {
            self.packid = data.readInt32();
            self.keyinpack = data.readInt32();
            self.tipsVo = new game.modules.strengThening.models.TipsVo();
            self.foodVo = new game.modules.strengThening.models.FoodVo();
            self.mapVo = new game.modules.strengThening.models.ArchMapVo();
            self.EnhancementVo = new game.modules.strengThening.models.EnhancementVo();
            var bag = BagModel.getInstance().getBagGameItemData(self.packid);
            if (!bag)
                return;
            var _items = bag.items;
            if (!_items) {
                if (self.packid == BagTypes.DEPOT) {
                    var objkeys = Object.keys(bag);
                    var tempitems = [];
                    for (var depotid = 1; depotid < objkeys.length + 1; depotid++) {
                        tempitems = tempitems.concat(bag[depotid].items);
                    }
                    _items = tempitems;
                }
                else {
                    return;
                }
            }
            for (var i = 0; i < _items.length; i++) {
                var key = _items[i].key;
                if (key == self.keyinpack) {
                    var id = _items[i].id;
                    if (120000 <= id && id <= 126675 || 140000 <= id && id <= 140005 || 10000 <= id && id <= 10009 || id >= 130000 && id <= 130099) { //装备
                        self.tipsVo.fromByteArray(data);
                        self.tips = self.tipsVo;
                    }
                    else if (111000 <= id && id <= 111053) {
                        self.foodVo.fromByteArray(data);
                        self.tips = self.foodVo;
                    }
                    else if (100000 <= id && id <= 107044 || 330100 <= id && id <= 340074) {
                        if (101100 <= id && id <= 101108) {
                            self.EnhancementVo.fromByteArray(data);
                            self.tips = self.EnhancementVo;
                        }
                        else {
                            self.mapVo.fromByteArray(data);
                            self.tips = self.mapVo;
                        }
                    }
                }
            }
        };
        return S2C_SGetItem_Tips;
    }());
    hanlder.S2C_SGetItem_Tips = S2C_SGetItem_Tips;
    //SGetPetEquipTips
    var S2C_SGetPetEquip_Tips = /** @class */ (function () {
        function S2C_SGetPetEquip_Tips() {
        }
        S2C_SGetPetEquip_Tips.read = function (self, data) {
            self.petkey = data.readInt32();
            self.keyinpack = data.readInt32();
            self.tipsVo = new game.modules.strengThening.models.TipsVo();
            self.tipsVo.fromByteArray(data);
            self.tips = self.tipsVo;
        };
        return S2C_SGetPetEquip_Tips;
    }());
    hanlder.S2C_SGetPetEquip_Tips = S2C_SGetPetEquip_Tips;
    //SRefreshPackSize
    var S2C_SRefreshPack_Size = /** @class */ (function () {
        function S2C_SRefreshPack_Size() {
        }
        S2C_SRefreshPack_Size.read = function (self, data) {
            // var refreshpacksize = Network._instance.protoTypePool.SRefreshPackSize.decode(data);
            // self.packid = refreshpacksize.packid;//
            // self.cap = refreshpacksize.cap;//
            // console.log("SRefreshPackSize sCreatRole:",refreshpacksize);
            // console.log("SRefreshPackSize sCreatRole.newRoleInfo",refreshpacksize.packid);
            console.log('刷新背包格子..........');
            self.packid = data.readInt32();
            self.cap = data.readInt32();
        };
        return S2C_SRefreshPack_Size;
    }());
    hanlder.S2C_SRefreshPack_Size = S2C_SRefreshPack_Size;
    //SCleanTempPack
    var S2C_SCleanTemp_Pack = /** @class */ (function () {
        function S2C_SCleanTemp_Pack() {
        }
        S2C_SCleanTemp_Pack.read = function (self, data) {
            var refreshpacksize = Network._instance.protoTypePool.SCleanTempPack.decode(data);
            console.log("SCleanTempPack sCreatRole:", refreshpacksize);
        };
        return S2C_SCleanTemp_Pack;
    }());
    hanlder.S2C_SCleanTemp_Pack = S2C_SCleanTemp_Pack;
    //SRefreshNaiJiu
    var S2C_SRefresh_NaiJiu = /** @class */ (function () {
        function S2C_SRefresh_NaiJiu() {
        }
        S2C_SRefresh_NaiJiu.read = function (self, data) {
            // var refreshpacksize = Network._instance.protoTypePool.SRefreshNaiJiu.decode(data);
            // self.packid = refreshpacksize.packid;//
            // self.data = refreshpacksize.data;//
            self.packid = data.readInt32();
            self.data = [];
            var dataSize = data.readUint8();
            var equipNaiJiu;
            for (var index = 0; index < dataSize; index++) {
                equipNaiJiu = new game.modules.strengThening.models.EquipNaiJiuVo();
                equipNaiJiu.fromByteArray(data);
                self.data.push(equipNaiJiu);
            }
            console.log("SRefreshNaiJiu self", self);
        };
        return S2C_SRefresh_NaiJiu;
    }());
    hanlder.S2C_SRefresh_NaiJiu = S2C_SRefresh_NaiJiu;
    //SRefreshMaxNaiJiu
    var S2C_SRefresh_MaxNaiJiu = /** @class */ (function () {
        function S2C_SRefresh_MaxNaiJiu() {
        }
        S2C_SRefresh_MaxNaiJiu.read = function (self, data) {
            // var refreshpacksize = Network._instance.protoTypePool.SRefreshMaxNaiJiu.decode(data);
            // self.packid = refreshpacksize.packid;//
            // self.keyinpack = refreshpacksize.keyinpack;//
            // self.maxendure = refreshpacksize.maxendure;//
            self.packid = data.readInt32();
            self.keyinpack = data.readInt32();
            self.maxendure = data.readInt32();
            // console.log("SRefreshMaxNaiJiu sCreatRole:",refreshpacksize);
            console.log("SRefreshMaxNaiJiu sCreatRole.newRoleInfo", self.packid);
        };
        return S2C_SRefresh_MaxNaiJiu;
    }());
    hanlder.S2C_SRefresh_MaxNaiJiu = S2C_SRefresh_MaxNaiJiu;
    //SXiuLiFailTimes
    var S2C_SXiuLiFail_Times = /** @class */ (function () {
        function S2C_SXiuLiFail_Times() {
        }
        S2C_SXiuLiFail_Times.read = function (self, data) {
            // var xiulifailtimes = Network._instance.protoTypePool.SXiuLiFailTimes.decode(data);
            // self.packid = xiulifailtimes.packid;//
            // self.keyinpack = xiulifailtimes.keyinpack;//
            // self.failtimes = xiulifailtimes.failtimes;//
            self.packid = data.readInt32();
            self.keyinpack = data.readInt32();
            self.failtimes = data.readInt32();
            // console.log("SXiuLiFailTimes sCreatRole:",xiulifailtimes);
            console.log("SXiuLiFailTimes sCreatRole.newRoleInfo", self.packid);
        };
        return S2C_SXiuLiFail_Times;
    }());
    hanlder.S2C_SXiuLiFail_Times = S2C_SXiuLiFail_Times;
    //SGetRoleEquip
    var S2C_SGetRole_Equip = /** @class */ (function () {
        function S2C_SGetRole_Equip() {
        }
        S2C_SGetRole_Equip.read = function (self, data) {
            console.log('来过............................................................');
            self.SGetRoleEquip = new game.modules.team.models.SGetRoleEquipVo();
            self.SGetRoleEquip.fromByteArray(data);
        };
        return S2C_SGetRole_Equip;
    }());
    hanlder.S2C_SGetRole_Equip = S2C_SGetRole_Equip;
    //SPetEquipAddItem
    var S2C_SPetEquip_AddItem = /** @class */ (function () {
        function S2C_SPetEquip_AddItem() {
        }
        S2C_SPetEquip_AddItem.read = function (self, data) {
            self.packid = data.readInt32();
            self.petkey = data.readInt32();
            self.data = [];
            var dataSize = data.readUint8();
            var item;
            for (var index = 0; index < dataSize; index++) {
                item = new game.modules.bag.models.ItemVo();
                item.fromByteArray(data);
                self.data.push(item);
            }
        };
        return S2C_SPetEquip_AddItem;
    }());
    hanlder.S2C_SPetEquip_AddItem = S2C_SPetEquip_AddItem;
    //SPetEquipDelItem
    var S2C_SPetEquip_DelItem = /** @class */ (function () {
        function S2C_SPetEquip_DelItem() {
        }
        S2C_SPetEquip_DelItem.read = function (self, data) {
            self.packid = data.readInt32();
            self.petkey = data.readInt32();
            self.itemKey = data.readInt32();
        };
        return S2C_SPetEquip_DelItem;
    }());
    hanlder.S2C_SPetEquip_DelItem = S2C_SPetEquip_DelItem;
    //SItemSign
    var S2C_SItem_Sign = /** @class */ (function () {
        function S2C_SItem_Sign() {
        }
        S2C_SItem_Sign.read = function (self, data) {
            var itemsign = Network._instance.protoTypePool.SItemSign.decode(data);
            self.keyinpack = itemsign.keyinpack; //
            self.sign = itemsign.sign; //
            self.packid = itemsign.packid; //
            console.log("SItemSign sCreatRole:", itemsign);
            console.log("SItemSign sCreatRole.newRoleInfo", itemsign.keyinpack);
        };
        return S2C_SItem_Sign;
    }());
    hanlder.S2C_SItem_Sign = S2C_SItem_Sign;
    //SHeChengRet
    var S2C_SHeCheng_Ret = /** @class */ (function () {
        function S2C_SHeCheng_Ret() {
        }
        S2C_SHeCheng_Ret.read = function (self, data) {
            var hechengret = Network._instance.protoTypePool.SHeChengRet.decode(data);
            self.ret = hechengret.ret; //
            console.log("SHeChengRet sCreatRole:", hechengret);
            console.log("SHeChengRet sCreatRole.newRoleInfo", hechengret.ret);
        };
        return S2C_SHeCheng_Ret;
    }());
    hanlder.S2C_SHeCheng_Ret = S2C_SHeCheng_Ret;
    //SAllEquipScore
    var S2C_SAllEquip_Score = /** @class */ (function () {
        function S2C_SAllEquip_Score() {
        }
        S2C_SAllEquip_Score.read = function (self, data) {
            var equpscore = Network._instance.protoTypePool.SAllEquipScore.decode(data);
            self.score = equpscore.score; //
            console.log("SAllEquipScore sCreatRole:", equpscore);
            console.log("SAllEquipScore sCreatRole.newRoleInfo", equpscore.score);
        };
        return S2C_SAllEquip_Score;
    }());
    hanlder.S2C_SAllEquip_Score = S2C_SAllEquip_Score;
    //SGetTimeAward
    var S2C_SGetTime_Award = /** @class */ (function () {
        function S2C_SGetTime_Award() {
        }
        S2C_SGetTime_Award.read = function (self, data) {
            self.awardid = data.readInt32();
            self.waittime = data.readLong();
        };
        return S2C_SGetTime_Award;
    }());
    hanlder.S2C_SGetTime_Award = S2C_SGetTime_Award;
    //SGetEquipTips
    var S2C_SGetEquip_Tips = /** @class */ (function () {
        function S2C_SGetEquip_Tips() {
        }
        S2C_SGetEquip_Tips.read = function (self, data) {
            var equtips = Network._instance.protoTypePool.SGetEquipTips.decode(data);
            self.packid = equtips.packid; //
            self.keyinpack = equtips.keyinpack; //
            self.key2inpack = equtips.key2inpack; //
            self.tips = equtips.tips; //
            console.log("SGetEquipTips sCreatRole:", equtips);
            console.log("SGetEquipTips sCreatRole.newRoleInfo", equtips.packid);
        };
        return S2C_SGetEquip_Tips;
    }());
    hanlder.S2C_SGetEquip_Tips = S2C_SGetEquip_Tips;
    //SItemAdded
    var S2C_SItem_Added = /** @class */ (function () {
        function S2C_SItem_Added() {
            this.items = []; //
        }
        S2C_SItem_Added.read = function (self, data) {
            var itemaddVo;
            var dataSize = data.readUint8();
            for (var itemIndex = 0; itemIndex < dataSize; itemIndex++) {
                itemaddVo = new game.modules.bag.models.ItemAddVo();
                itemaddVo.fromByteArray(data);
                self.items.push(itemaddVo);
            }
        };
        return S2C_SItem_Added;
    }());
    hanlder.S2C_SItem_Added = S2C_SItem_Added;
    //SHeChengItem
    var S2C_SHeCheng_Item = /** @class */ (function () {
        function S2C_SHeCheng_Item() {
        }
        S2C_SHeCheng_Item.read = function (self, data) {
            self.itemnum = data.readInt32();
            self.getitemid = data.readInt32();
        };
        return S2C_SHeCheng_Item;
    }());
    hanlder.S2C_SHeCheng_Item = S2C_SHeCheng_Item;
    //SHeChengPetEquip
    var S2C_SHeChengPet_Equip = /** @class */ (function () {
        function S2C_SHeChengPet_Equip() {
        }
        S2C_SHeChengPet_Equip.read = function (self, data) {
            self.itemnum = data.readInt32();
            self.getitemid = data.readInt32();
        };
        return S2C_SHeChengPet_Equip;
    }());
    hanlder.S2C_SHeChengPet_Equip = S2C_SHeChengPet_Equip;
    //通知客户端邮件列表
    var S2C_SMail_List = /** @class */ (function () {
        function S2C_SMail_List() {
        }
        S2C_SMail_List.read = function (self, data) {
            self.mailList = new Array();
            var mailListSize = data.readUint8();
            var mailInfo;
            for (var index = 0; index < mailListSize; index++) {
                mailInfo = new game.modules.friend.models.MailInfoVo();
                mailInfo.fromByteArray(data);
                self.mailList.push(mailInfo);
            } //MailInfo
            console.log("S2C_SMail_List++++++++++++++++++++++", self.mailList);
        };
        return S2C_SMail_List;
    }());
    hanlder.S2C_SMail_List = S2C_SMail_List;
    //通知客户端刷新邮件
    var S2C_SMail_Info = /** @class */ (function () {
        function S2C_SMail_Info() {
        }
        S2C_SMail_Info.read = function (self, data) {
            self.mail = new game.modules.friend.models.MailInfoVo();
            self.mail.fromByteArray(data);
            console.log("S2C_SMail_Info++++++++++++++++++", self.mail);
        };
        return S2C_SMail_Info;
    }());
    hanlder.S2C_SMail_Info = S2C_SMail_Info;
    //通知客户端刷新邮件状态
    var S2C_SMail_State = /** @class */ (function () {
        function S2C_SMail_State() {
        }
        S2C_SMail_State.read = function (self, data) {
            self.kind = data.readByte();
            self.id = data.readLong();
            self.statetype = data.readByte();
            self.statevalue = data.readByte();
            console.log("S2C_SMail_State++++++++++++++++++++", self.statetype);
        };
        return S2C_SMail_State;
    }());
    hanlder.S2C_SMail_State = S2C_SMail_State;
    //SGetRoleInfo
    var S2C_SGetRole_Info = /** @class */ (function () {
        function S2C_SGetRole_Info() {
        }
        S2C_SGetRole_Info.read = function (self, data) {
            var roleinfo = Network._instance.protoTypePool.SGetRoleInfo.decode(data);
            self.roleid = roleinfo.roleid; //
            self.rolename = roleinfo.rolename; //
            self.shape = roleinfo.shape; //
            self.school = roleinfo.school; //
            self.level = roleinfo.level; //
            self.equipscore = roleinfo.equipscore; //
            self.packinfo = roleinfo.packinfo; //
            self.tips = roleinfo.tips; //
            console.log("SGetRoleInfo sCreatRole:", roleinfo);
            console.log("SGetRoleInfo sCreatRole.newRoleInfo", roleinfo.roleid);
        };
        return S2C_SGetRole_Info;
    }());
    hanlder.S2C_SGetRole_Info = S2C_SGetRole_Info;
    //SNoticeRoleGetInfo
    var S2C_SNoticeRole_GetInfo = /** @class */ (function () {
        function S2C_SNoticeRole_GetInfo() {
        }
        S2C_SNoticeRole_GetInfo.read = function (self, data) {
            var roleinfo = Network._instance.protoTypePool.SNoticeRoleGetInfo.decode(data);
            self.roleid = roleinfo.roleid; //
            self.rolename = roleinfo.rolename; //
            console.log("SNoticeRoleGetInfo sCreatRole:", roleinfo);
            console.log("SNoticeRoleGetInfo sCreatRole.newRoleInfo", roleinfo.roleid);
        };
        return S2C_SNoticeRole_GetInfo;
    }());
    hanlder.S2C_SNoticeRole_GetInfo = S2C_SNoticeRole_GetInfo;
    //SMulDayLogin
    var S2C_SMulDayLogin = /** @class */ (function () {
        function S2C_SMulDayLogin() {
        }
        S2C_SMulDayLogin.read = function (self, data) {
            self.logindays = data.readInt32();
            var mapSize = data.readUint8();
            self.rewardmap = new Laya.Dictionary();
            for (var index = 0; index < mapSize; index++) {
                self.rewardmap.set(data.readUint32(), data.readLong());
            }
        };
        return S2C_SMulDayLogin;
    }());
    hanlder.S2C_SMulDayLogin = S2C_SMulDayLogin;
    //SOpenPack
    var S2C_SOpen_Pack = /** @class */ (function () {
        function S2C_SOpen_Pack() {
        }
        S2C_SOpen_Pack.read = function (self, data) {
            var daylogin = Network._instance.protoTypePool.SOpenPack.decode(data);
            console.log("SOpenPack sCreatRole:", daylogin);
            console.log("SOpenPack sCreatRole.newRoleInfo", daylogin);
        };
        return S2C_SOpen_Pack;
    }());
    hanlder.S2C_SOpen_Pack = S2C_SOpen_Pack;
    //SBuyPackMoney
    var S2C_SBuyPack_Money = /** @class */ (function () {
        function S2C_SBuyPack_Money() {
        }
        S2C_SBuyPack_Money.read = function (self, data) {
            var packmoney = Network._instance.protoTypePool.SBuyPackMoney.decode(data);
            self.money = packmoney.money; //
            console.log("SBuyPackMoney sCreatRole:", packmoney);
            console.log("SBuyPackMoney sCreatRole.newRoleInfo", packmoney.money);
        };
        return S2C_SBuyPack_Money;
    }());
    hanlder.S2C_SBuyPack_Money = S2C_SBuyPack_Money;
    //刷新修理物品界面数据
    var S2C_SFreshRepair_Data = /** @class */ (function () {
        function S2C_SFreshRepair_Data() {
        }
        S2C_SFreshRepair_Data.read = function (self, data) {
            var packmoney = Network._instance.protoTypePool.SFreshRepairData.decode(data);
            console.log("SFreshRepairData sCreatRole:", packmoney);
            console.log("SFreshRepairData sCreatRole.newRoleInfo", packmoney);
        };
        return S2C_SFreshRepair_Data;
    }());
    hanlder.S2C_SFreshRepair_Data = S2C_SFreshRepair_Data;
    //SRepairResult
    var S2C_SRepair_Result = /** @class */ (function () {
        function S2C_SRepair_Result() {
        }
        S2C_SRepair_Result.read = function (self, data) {
            // var repairresult = Network._instance.protoTypePool.SRepairResult.decode(data);
            // self.ret = repairresult.ret;//
            self.ret = data.readInt32();
            // console.log("SRepairResult sCreatRole:",repairresult);
            console.log("SRepairResult sCreatRole.newRoleInfo", self.ret);
        };
        return S2C_SRepair_Result;
    }());
    hanlder.S2C_SRepair_Result = S2C_SRepair_Result;
    //SUseEnhancementItem
    var S2C_SUseEnhancement_Item = /** @class */ (function () {
        function S2C_SUseEnhancement_Item() {
        }
        S2C_SUseEnhancement_Item.read = function (self, data) {
            self.equippos = data.readInt32();
        };
        return S2C_SUseEnhancement_Item;
    }());
    hanlder.S2C_SUseEnhancement_Item = S2C_SUseEnhancement_Item;
    //宝石替换
    var S2C_SReplace_Gem = /** @class */ (function () {
        function S2C_SReplace_Gem() {
        }
        S2C_SReplace_Gem.read = function (self, data) {
            var repgem = Network._instance.protoTypePool.SReplaceGem.decode(data);
            self.srckey = repgem.srckey; //
            self.deskey = repgem.deskey; //
            console.log("SReplaceGem sCreatRole:", repgem);
            console.log("SReplaceGem sCreatRole.newRoleInfo", repgem.srckey);
        };
        return S2C_SReplace_Gem;
    }());
    hanlder.S2C_SReplace_Gem = S2C_SReplace_Gem;
    //摆摊物品Tip返回SOtherItemTips
    var S2C_SOther_ItemTips = /** @class */ (function () {
        function S2C_SOther_ItemTips() {
            this.tips = {}; //
        }
        S2C_SOther_ItemTips.read = function (self, data) {
            self.roleid = data.readLong();
            self.packid = data.readInt32();
            self.keyinpack = data.readInt32();
            self.tipsVo = new game.modules.strengThening.models.TipsVo();
            self.foodVo = new game.modules.strengThening.models.FoodVo();
            self.mapVo = new game.modules.strengThening.models.ArchMapVo();
            self.EnhancementVo = new game.modules.strengThening.models.EnhancementVo();
            if (self.packid == BagTypes.MARKET) {
                var id = SaleModel._instance.itemId;
                if (120000 <= id && id <= 126675 || 140000 <= id && id <= 140005 || 10000 <= id && id <= 10009) { //装备
                    self.tipsVo.fromByteArray(data);
                    self.tips = self.tipsVo;
                }
                else if (111000 <= id && id <= 111053) {
                    self.foodVo.fromByteArray(data);
                    self.tips = self.foodVo;
                }
                else if (100000 <= id && id <= 107044 || 330100 <= id && id <= 340074) {
                    if (101100 <= id && id <= 101108) {
                        self.EnhancementVo.fromByteArray(data);
                        self.tips = self.EnhancementVo;
                    }
                    else {
                        self.mapVo.fromByteArray(data);
                        self.tips = self.mapVo;
                    }
                }
            }
        };
        return S2C_SOther_ItemTips;
    }());
    hanlder.S2C_SOther_ItemTips = S2C_SOther_ItemTips;
    //SGetDepotInfo
    var S2C_SGetDepot_Info = /** @class */ (function () {
        function S2C_SGetDepot_Info() {
        }
        S2C_SGetDepot_Info.read = function (self, data) {
            // var depotinfo = Network._instance.protoTypePool.SGetDepotInfo.decode(data);
            // self.pageid = depotinfo.pageid;//
            // self.baginfo = depotinfo.baginfo;//
            // console.log("SGetDepotInfo sCreatRole:",depotinfo);
            // console.log("SGetDepotInfo sCreatRole.newRoleInfo",depotinfo.pageid);
            self.pageid = data.readInt32();
            self.baginfo = new game.modules.bag.models.BagVo();
            self.baginfo.fromByteArray(data);
        };
        return S2C_SGetDepot_Info;
    }());
    hanlder.S2C_SGetDepot_Info = S2C_SGetDepot_Info;
    // 修改仓库名称返回 SModifyDepotName
    var S2C_SModify_DepotName = /** @class */ (function () {
        function S2C_SModify_DepotName() {
        }
        S2C_SModify_DepotName.read = function (self, data) {
            // var moddepotname = Network._instance.protoTypePool.SModifyDepotName.decode(data);
            // self.errcode = moddepotname.errcode;//
            // self.depotIndex = moddepotname.depotIndex;//
            // self.depotName = moddepotname.depotName;//
            // console.log("SModifyDepotName sCreatRole:",moddepotname);
            // console.log("SModifyDepotName sCreatRole.newRoleInfo",moddepotname.depotName);
            self.errcode = data.readInt32();
            self.depotIndex = data.readInt32();
            self.depotName = ByteArrayUtils.readUtf16String(data);
        };
        return S2C_SModify_DepotName;
    }());
    hanlder.S2C_SModify_DepotName = S2C_SModify_DepotName;
    //  SRideUpdate
    var S2C_SRide_Update = /** @class */ (function () {
        function S2C_SRide_Update() {
        }
        S2C_SRide_Update.read = function (self, data) {
            // var ride = Network._instance.protoTypePool.SRideUpdate.decode(data);
            // self.itemkey = ride.itemkey;//
            // self.itemid = ride.itemid;//
            // self.rideid = ride.rideid;//
            self.itemkey = data.readInt32();
            self.itemid = data.readInt32();
            self.rideid = data.readInt32();
            console.log("SRideUpdate sCreatRole.newRoleInfo", self.itemkey);
        };
        return S2C_SRide_Update;
    }());
    hanlder.S2C_SRide_Update = S2C_SRide_Update;
    //  服务器返回道具找回列表
    var S2C_SItemRecover_List = /** @class */ (function () {
        function S2C_SItemRecover_List() {
        }
        S2C_SItemRecover_List.read = function (self, data) {
            self.items = [];
            var listSize = ByteArrayUtils.uncompact_uint32(data);
            if (listSize == 0) {
                self.items = [];
            }
            else {
                for (var i = 0; i < listSize; i++) {
                    var _ItemRecoverInfoVo = new game.modules.bag.models.ItemRecoverInfoVo();
                    _ItemRecoverInfoVo.fromByteArray(data);
                    self.items.push(_ItemRecoverInfoVo);
                }
            }
        };
        return S2C_SItemRecover_List;
    }());
    hanlder.S2C_SItemRecover_List = S2C_SItemRecover_List;
    //  服务器返回道具找回结果
    var S2C_SItem_Recover = /** @class */ (function () {
        function S2C_SItem_Recover() {
        }
        S2C_SItem_Recover.read = function (self, data) {
            self.itemId = data.readInt32();
            self.uniqId = data.readLong();
        };
        return S2C_SItem_Recover;
    }());
    hanlder.S2C_SItem_Recover = S2C_SItem_Recover;
    //  服务器返回一个找回道具的信息
    var S2C_SRecoverItem_Info = /** @class */ (function () {
        function S2C_SRecoverItem_Info() {
        }
        S2C_SRecoverItem_Info.read = function (self, data) {
            self.uniqId = data.readLong();
            var recoverItems = game.modules.bag.models.BagModel.getInstance().itemRecoverInfoData;
            for (var i = 0; i < recoverItems.length; i++) {
                var _uniqId = recoverItems[i].uniqId;
                if (_uniqId == self.uniqId) {
                    var itemtotaltype = game.modules.bag.models.BagModel.getInstance().getItemTotalType(recoverItems[i].itemId);
                    switch (itemtotaltype) {
                        case ItemTotalType.PetItem:
                            break;
                        case ItemTotalType.GroceriesItem:
                            break;
                        case ItemTotalType.EquipItem:
                            var equipItem_tips = new game.modules.strengThening.models.TipsVo();
                            equipItem_tips.fromByteArray(data);
                            self.tips = equipItem_tips;
                            break;
                    }
                    break;
                }
            }
            if (!self.tips) {
                self.tips = null;
            }
        };
        return S2C_SRecoverItem_Info;
    }());
    hanlder.S2C_SRecoverItem_Info = S2C_SRecoverItem_Info;
    //  SRefineEquipBase
    var S2C_SRefineEquip_Base = /** @class */ (function () {
        function S2C_SRefineEquip_Base() {
        }
        S2C_SRefineEquip_Base.read = function (self, data) {
            var bytes = data;
            self.freshtype = bytes.readInt32();
            self.packid = bytes.readInt32();
            self.keyinpack = bytes.readInt32();
            var mapSize = bytes.readUint8();
            self.attr = new Laya.Dictionary();
            for (var index = 0; index < mapSize; index++) {
                self.attr.set(bytes.readUint32(), bytes.readUint32());
            }
        };
        return S2C_SRefineEquip_Base;
    }());
    hanlder.S2C_SRefineEquip_Base = S2C_SRefineEquip_Base;
    //  SRefineEquipResult
    var S2C_SRefineEquip_Result = /** @class */ (function () {
        function S2C_SRefineEquip_Result() {
        }
        S2C_SRefineEquip_Result.read = function (self, data) {
            self.packid = data.readInt32();
            self.keyinpack = data.readInt32();
            self.result = data.readInt32();
            self.refinetype = data.readInt32();
        };
        return S2C_SRefineEquip_Result;
    }());
    hanlder.S2C_SRefineEquip_Result = S2C_SRefineEquip_Result;
    // 洗所有属性 SExpFactorEffect
    var S2C_SExpFactor_Effect = /** @class */ (function () {
        function S2C_SExpFactor_Effect() {
        }
        S2C_SExpFactor_Effect.read = function (self, data) {
            var equipeff = Network._instance.protoTypePool.SExpFactorEffect.decode(data);
            self.itemId = equipeff.itemId; //
            self.factor = equipeff.factor; //
            self.endTime = equipeff.endTime; //
            console.log("SExpFactorEffect sCreatRole:", equipeff);
            console.log("SExpFactorEffect sCreatRole.newRoleInfo", equipeff.itemId);
        };
        return S2C_SExpFactor_Effect;
    }());
    hanlder.S2C_SExpFactor_Effect = S2C_SExpFactor_Effect;
    // 服务器返回角色安全锁信息 SLockInfo
    var S2C_SLock_Info = /** @class */ (function () {
        function S2C_SLock_Info() {
        }
        S2C_SLock_Info.read = function (self, data) {
            var lockino = Network._instance.protoTypePool.SLockInfo.decode(data);
            self.status = lockino.status; //
            console.log("SLockInfo sCreatRole:", lockino);
            console.log("SLockInfo sCreatRole.newRoleInfo", lockino.status);
        };
        return S2C_SLock_Info;
    }());
    hanlder.S2C_SLock_Info = S2C_SLock_Info;
    // 服务器通知客户端需要解锁 SNeedUnlock
    var S2C_SNeedUn_lock = /** @class */ (function () {
        function S2C_SNeedUn_lock() {
        }
        S2C_SNeedUn_lock.read = function (self, data) {
            var lockino = Network._instance.protoTypePool.SNeedUnlock.decode(data);
            console.log("SNeedUnlock sCreatRole:", lockino);
            console.log("SNeedUnlock sCreatRole.newRoleInfo", lockino);
        };
        return S2C_SNeedUn_lock;
    }());
    hanlder.S2C_SNeedUn_lock = S2C_SNeedUn_lock;
    // 服务器通知客户端设置安全锁成功 SAddLockSuc
    var S2C_SAddLock_Suc = /** @class */ (function () {
        function S2C_SAddLock_Suc() {
        }
        S2C_SAddLock_Suc.read = function (self, data) {
            var lockino = Network._instance.protoTypePool.SAddLockSuc.decode(data);
            console.log("SAddLockSuc sCreatRole:", lockino);
            console.log("SAddLockSuc sCreatRole.newRoleInfo", lockino);
        };
        return S2C_SAddLock_Suc;
    }());
    hanlder.S2C_SAddLock_Suc = S2C_SAddLock_Suc;
    // 服务器通知客户端解锁成功 SUnlockSuc
    var S2C_SUnlock_Suc = /** @class */ (function () {
        function S2C_SUnlock_Suc() {
        }
        S2C_SUnlock_Suc.read = function (self, data) {
            var lockino = Network._instance.protoTypePool.SUnlockSuc.decode(data);
            console.log("SUnlockSuc sCreatRole:", lockino);
            console.log("SUnlockSuc sCreatRole.newRoleInfo", lockino);
        };
        return S2C_SUnlock_Suc;
    }());
    hanlder.S2C_SUnlock_Suc = S2C_SUnlock_Suc;
    // 服务器通知客户端取消安全锁成功 SCancelLockSuc
    var S2C_SCancelLock_Suc = /** @class */ (function () {
        function S2C_SCancelLock_Suc() {
        }
        S2C_SCancelLock_Suc.read = function (self, data) {
            var lockino = Network._instance.protoTypePool.SCancelLockSuc.decode(data);
            console.log("SCancelLockSuc sCreatRole:", lockino);
            console.log("SCancelLockSuc sCreatRole.newRoleInfo", lockino);
        };
        return S2C_SCancelLock_Suc;
    }());
    hanlder.S2C_SCancelLock_Suc = S2C_SCancelLock_Suc;
    // 服务器通知客户端申请强行解锁成功 SForceUnlockSuc
    var S2C_SForceUnlock_Suc = /** @class */ (function () {
        function S2C_SForceUnlock_Suc() {
        }
        S2C_SForceUnlock_Suc.read = function (self, data) {
            var lockino = Network._instance.protoTypePool.SForceUnlockSuc.decode(data);
            console.log("SForceUnlockSuc sCreatRole:", lockino);
            console.log("SForceUnlockSuc sCreatRole.newRoleInfo", lockino);
        };
        return S2C_SForceUnlock_Suc;
    }());
    hanlder.S2C_SForceUnlock_Suc = S2C_SForceUnlock_Suc;
    // 服务器通知客户端修改密码成功 SChangePasswordSuc
    var S2C_SChangePassword_Suc = /** @class */ (function () {
        function S2C_SChangePassword_Suc() {
        }
        S2C_SChangePassword_Suc.read = function (self, data) {
            var lockino = Network._instance.protoTypePool.SChangePasswordSuc.decode(data);
            console.log("SChangePasswordSuc sCreatRole:", lockino);
            console.log("SChangePasswordSuc sCreatRole.newRoleInfo", lockino);
        };
        return S2C_SChangePassword_Suc;
    }());
    hanlder.S2C_SChangePassword_Suc = S2C_SChangePassword_Suc;
    // 服务器返回更新的角色安全锁信息 SUpdateLockInfo
    var S2C_SUpdateLock_Info = /** @class */ (function () {
        function S2C_SUpdateLock_Info() {
        }
        S2C_SUpdateLock_Info.read = function (self, data) {
            var lockino = Network._instance.protoTypePool.SUpdateLockInfo.decode(data);
            self.status = lockino.status;
            console.log("SUpdateLockInfo sCreatRole:", lockino);
            console.log("SUpdateLockInfo sCreatRole.newRoleInfo", lockino.status);
        };
        return S2C_SUpdateLock_Info;
    }());
    hanlder.S2C_SUpdateLock_Info = S2C_SUpdateLock_Info;
    //  SRegMaster
    var S2C_SReg_Master = /** @class */ (function () {
        function S2C_SReg_Master() {
        }
        S2C_SReg_Master.read = function (self, data) {
            var regmaster = Network._instance.protoTypePool.SRegMaster.decode(data);
            self.result = regmaster.result;
            console.log("SRegMaster sCreatRole:", regmaster);
            console.log("SRegMaster sCreatRole.newRoleInfo", regmaster.result);
        };
        return S2C_SReg_Master;
    }());
    hanlder.S2C_SReg_Master = S2C_SReg_Master;
    //  SReadyRegMaster
    var S2C_SReadyReg_Master = /** @class */ (function () {
        function S2C_SReadyReg_Master() {
        }
        S2C_SReadyReg_Master.read = function (self, data) {
            var regmaster = Network._instance.protoTypePool.SReadyRegMaster.decode(data);
            self.masters = regmaster.masters;
            console.log("SReadyRegMaster sCreatRole:", regmaster);
            console.log("SReadyRegMaster sCreatRole.newRoleInfo", regmaster.masters);
        };
        return S2C_SReadyReg_Master;
    }());
    hanlder.S2C_SReadyReg_Master = S2C_SReadyReg_Master;
    //  SSearchMaster
    var S2C_SSearch_Master = /** @class */ (function () {
        function S2C_SSearch_Master() {
        }
        S2C_SSearch_Master.read = function (self, data) {
            var searchmaster = Network._instance.protoTypePool.SSearchMaster.decode(data);
            self.pageid = searchmaster.pageid;
            self.totalpage = searchmaster.totalpage;
            self.masters = searchmaster.masters;
            console.log("SSearchMaster sCreatRole:", searchmaster);
            console.log("SSearchMaster sCreatRole.newRoleInfo", searchmaster.pageid);
        };
        return S2C_SSearch_Master;
    }());
    hanlder.S2C_SSearch_Master = S2C_SSearch_Master;
    // 是否接受徒弟的确认框 SRequestAsApprentice
    var S2C_SRequestAs_Apprentice = /** @class */ (function () {
        function S2C_SRequestAs_Apprentice() {
        }
        S2C_SRequestAs_Apprentice.read = function (self, data) {
            var searchmaster = Network._instance.protoTypePool.SRequestAsApprentice.decode(data);
            self.prenticeid = searchmaster.prenticeid;
            self.prenticename = searchmaster.prenticename;
            self.school = searchmaster.school;
            self.level = searchmaster.level;
            self.requestword = searchmaster.requestword;
            console.log("SRequestAsApprentice sCreatRole:", searchmaster);
            console.log("SRequestAsApprentice sCreatRole.newRoleInfo", searchmaster.prenticeid);
        };
        return S2C_SRequestAs_Apprentice;
    }());
    hanlder.S2C_SRequestAs_Apprentice = S2C_SRequestAs_Apprentice;
    //  SRequestPrenticeSuccess
    var S2C_SRequestPrentice_Success = /** @class */ (function () {
        function S2C_SRequestPrentice_Success() {
        }
        S2C_SRequestPrentice_Success.read = function (self, data) {
            var searchmaster = Network._instance.protoTypePool.SRequestPrenticeSuccess.decode(data);
            self.masterid = searchmaster.masterid;
            self.mastername = searchmaster.mastername;
            self.bInitiative = searchmaster.bInitiative;
            console.log("SRequestPrenticeSuccess sCreatRole:", searchmaster);
            console.log("SRequestPrenticeSuccess sCreatRole.newRoleInfo", searchmaster.masterid);
        };
        return S2C_SRequestPrentice_Success;
    }());
    hanlder.S2C_SRequestPrentice_Success = S2C_SRequestPrentice_Success;
    //  SCanAcceptPrentice
    var S2C_SCanAccept_Prentice = /** @class */ (function () {
        function S2C_SCanAccept_Prentice() {
        }
        S2C_SCanAccept_Prentice.read = function (self, data) {
            var searchmaster = Network._instance.protoTypePool.SCanAcceptPrentice.decode(data);
            console.log("SCanAcceptPrentice sCreatRole:", searchmaster);
            console.log("SCanAcceptPrentice sCreatRole.newRoleInfo", searchmaster);
        };
        return S2C_SCanAccept_Prentice;
    }());
    hanlder.S2C_SCanAccept_Prentice = S2C_SCanAccept_Prentice;
    //  寻找徒弟  SSearchPrentice
    var S2C_SSearch_Prentice = /** @class */ (function () {
        function S2C_SSearch_Prentice() {
        }
        S2C_SSearch_Prentice.read = function (self, data) {
            var searchmaster = Network._instance.protoTypePool.SSearchPrentice.decode(data);
            self.pageid = searchmaster.pageid;
            self.totalpage = searchmaster.totalpage;
            self.prentice = searchmaster.prentice;
            console.log("SSearchPrentice sCreatRole:", searchmaster);
            console.log("SSearchPrentice sCreatRole.newRoleInfo", searchmaster.pageid);
        };
        return S2C_SSearch_Prentice;
    }());
    hanlder.S2C_SSearch_Prentice = S2C_SSearch_Prentice;
    //  寻找徒弟  SMasterPrenticeData
    var S2C_SMasterPrentice_Data = /** @class */ (function () {
        function S2C_SMasterPrentice_Data() {
        }
        S2C_SMasterPrentice_Data.read = function (self, data) {
            var searchmaster = Network._instance.protoTypePool.SMasterPrenticeData.decode(data);
            self.members = searchmaster.members;
            console.log("SMasterPrenticeData sCreatRole:", searchmaster);
            console.log("SMasterPrenticeData sCreatRole.newRoleInfo", searchmaster.members);
        };
        return S2C_SMasterPrentice_Data;
    }());
    hanlder.S2C_SMasterPrentice_Data = S2C_SMasterPrentice_Data;
    /**
        * 返回公会级别信息变化
        */
    var S2C_SClanLevelup = /** @class */ (function () {
        function S2C_SClanLevelup() {
            //public optcode:number = 0;
            //public optname:string = "onCreateRole";
            this.change = new Dictionary(); //String
            this.costmax = new Dictionary(); //String
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SClanLevelup.read = function (self, data) {
            var Size = data.readInt8();
            for (var i = 0; i < Size; i++) {
                self.change.set(data.readInt32(), data.readInt32());
            }
            var costmaxSize = data.readInt8();
            for (var i = 0; i < costmaxSize; i++) {
                self.costmax.set(data.readInt32(), data.readInt32());
            }
            self.money = data.readInt32();
        };
        return S2C_SClanLevelup;
    }());
    hanlder.S2C_SClanLevelup = S2C_SClanLevelup;
    /**
     * 领取分红
     */
    var S2C_SGrabBonus = /** @class */ (function () {
        function S2C_SGrabBonus() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SGrabBonus.read = function (self, data) {
        };
        return S2C_SGrabBonus;
    }());
    hanlder.S2C_SGrabBonus = S2C_SGrabBonus;
    /**
     * 查询分红结果
     */
    var S2C_SBonusQuery = /** @class */ (function () {
        function S2C_SBonusQuery() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SBonusQuery.read = function (self, data) {
            self.bonus = data.readInt32();
        };
        return S2C_SBonusQuery;
    }());
    hanlder.S2C_SBonusQuery = S2C_SBonusQuery;
    /**
     * 服务器返回接受申请人员
     */
    var S2C_SAcceptApply = /** @class */ (function () {
        function S2C_SAcceptApply() {
            this.memberinfo = []; //
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SAcceptApply.read = function (self, data) {
            var ClanMemberVo;
            ClanMemberVo = new game.modules.family.models.ClanMemberVo();
            ClanMemberVo.fromByteArray(data);
            self.memberinfo.push(ClanMemberVo);
        };
        return S2C_SAcceptApply;
    }());
    hanlder.S2C_SAcceptApply = S2C_SAcceptApply;
    /**
     * 服务端返回公会宗旨
     */
    var S2C_SClanAim = /** @class */ (function () {
        function S2C_SClanAim() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SClanAim.read = function (self, data) {
            self.clanid = data.readLong();
            self.clanaim = ByteArrayUtils.readUtf16String(data);
            self.oldclanname = ByteArrayUtils.readUtf16String(data);
        };
        return S2C_SClanAim;
    }());
    hanlder.S2C_SClanAim = S2C_SClanAim;
    /**
     * 服务端返回公会名字
     */
    var S2C_SChangeClanName = /** @class */ (function () {
        function S2C_SChangeClanName() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SChangeClanName.read = function (self, data) {
            self.newname = ByteArrayUtils.readUtf16String(data);
        };
        return S2C_SChangeClanName;
    }());
    hanlder.S2C_SChangeClanName = S2C_SChangeClanName;
    /**
     * 服务端返回公会名字
     */
    var S2C_SSearchClan = /** @class */ (function () {
        function S2C_SSearchClan() {
            this.clanSummaryInfo = []; //返回搜索公会
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SSearchClan.read = function (self, data) {
            // var SSearchClan = Browser.window.SSearchClan.decode(data);
            // self.clanSummaryInfo = SSearchClan.clanSummaryInfo;
            // console.log("S2C_SSearchClan SSearchClan:", SSearchClan);
            var ClanSummaryInfoVo;
            ClanSummaryInfoVo = new game.modules.family.models.ClanSummaryInfoVo();
            ClanSummaryInfoVo.fromByteArray(data);
            self.clanSummaryInfo.push(ClanSummaryInfoVo);
        };
        return S2C_SSearchClan;
    }());
    hanlder.S2C_SSearchClan = S2C_SSearchClan;
    /**
     * 禁言
     */
    var S2C_SBannedtalk = /** @class */ (function () {
        function S2C_SBannedtalk() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SBannedtalk.read = function (self, data) {
            self.memberid = data.readLong();
            self.flag = data.readInt32();
        };
        return S2C_SBannedtalk;
    }());
    hanlder.S2C_SBannedtalk = S2C_SBannedtalk;
    /**
     * 返回成员列表
     */
    var S2C_SRefreshMemberList = /** @class */ (function () {
        function S2C_SRefreshMemberList() {
            this.memberlist = []; //公会成员列表
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SRefreshMemberList.read = function (self, data) {
            var ClanMemberVo;
            var size = data.readInt8();
            for (var i = 0; i < size; i++) {
                ClanMemberVo = new game.modules.family.models.ClanMemberVo();
                ClanMemberVo.fromByteArray(data);
                self.memberlist.push(ClanMemberVo);
            }
        };
        return S2C_SRefreshMemberList;
    }());
    hanlder.S2C_SRefreshMemberList = S2C_SRefreshMemberList;
    /**
     * 返回申请过的公会列表
     */
    var S2C_SApplyClanList = /** @class */ (function () {
        function S2C_SApplyClanList() {
            this.applyClanList = []; //申请过的公会列表		
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SApplyClanList.read = function (self, data) {
            self.roleid = data.readLong();
            var ApplyClanVo;
            var size = data.readInt8();
            for (var i = 0; i < size; i++) {
                ApplyClanVo = new game.modules.family.models.ApplyClanVo();
                ApplyClanVo.fromByteArray(data);
                self.applyClanList.push(ApplyClanVo);
            }
        };
        return S2C_SApplyClanList;
    }());
    hanlder.S2C_SApplyClanList = S2C_SApplyClanList;
    /**
     * 取消申请公会
     */
    var S2C_SCancelApplyClan = /** @class */ (function () {
        function S2C_SCancelApplyClan() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SCancelApplyClan.read = function (self, data) {
            self.clanid = data.readLong();
        };
        return S2C_SCancelApplyClan;
    }());
    hanlder.S2C_SCancelApplyClan = S2C_SCancelApplyClan;
    /**
     * 更新个人帮贡信息
     */
    var S2C_SRefreshContribution = /** @class */ (function () {
        function S2C_SRefreshContribution() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SRefreshContribution.read = function (self, data) {
            var SRefreshContribution = Browser.window.SRefreshContribution.decode(data);
            self.currentcontribution = SRefreshContribution.currentcontribution;
            console.log("S2C_SRefreshContribution SRefreshContribution:", SRefreshContribution);
        };
        return S2C_SRefreshContribution;
    }());
    hanlder.S2C_SRefreshContribution = S2C_SRefreshContribution;
    /**
     * 是否开启自动接收入会
     */
    var S2C_SOpenAutoJoinClan = /** @class */ (function () {
        function S2C_SOpenAutoJoinClan() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SOpenAutoJoinClan.read = function (self, data) {
            self.autostate = data.readInt32();
            self.requestlevel = data.readInt16();
            self.applylevel = data.readInt16();
        };
        return S2C_SOpenAutoJoinClan;
    }());
    hanlder.S2C_SOpenAutoJoinClan = S2C_SOpenAutoJoinClan;
    /**
     * 返回公会事件信息
     */
    var S2C_SRequestEventInfo = /** @class */ (function () {
        function S2C_SRequestEventInfo() {
            this.eventlist = []; //
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SRequestEventInfo.read = function (self, data) {
            var ClanEventInfoVo;
            var size = ByteArrayUtils.uncompact_uint32(data);
            for (var i = 0; i < size; i++) {
                ClanEventInfoVo = new game.modules.family.models.ClanEventInfoVo();
                ClanEventInfoVo.fromByteArray(data);
                self.eventlist.push(ClanEventInfoVo);
            }
        };
        return S2C_SRequestEventInfo;
    }());
    hanlder.S2C_SRequestEventInfo = S2C_SRequestEventInfo;
    /**
     * 返回公会事件详情信息
     */
    var S2C_SRequestRoleInfo = /** @class */ (function () {
        function S2C_SRequestRoleInfo() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SRequestRoleInfo.read = function (self, data) {
            var SRequestRoleInfo = Browser.window.SRequestRoleInfo.decode(data);
            self.roleinfo = SRequestRoleInfo.roleinfo;
            console.log("S2C_SRequestRoleInfo SRequestRoleInfo:", SRequestRoleInfo);
        };
        return S2C_SRequestRoleInfo;
    }());
    hanlder.S2C_SRequestRoleInfo = S2C_SRequestRoleInfo;
    /**
     * 返回购买药房的药品
     */
    var S2C_SBuyMedic = /** @class */ (function () {
        function S2C_SBuyMedic() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SBuyMedic.read = function (self, data) {
            self.itemid = data.readInt32();
            self.itemnum = data.readInt32();
            self.buyitemnum = data.readInt32();
        };
        return S2C_SBuyMedic;
    }());
    hanlder.S2C_SBuyMedic = S2C_SBuyMedic;
    /**
     * 返回修改产药倍数
     */
    var S2C_SRequestSelectType = /** @class */ (function () {
        function S2C_SRequestSelectType() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SRequestSelectType.read = function (self, data) {
            self.selecttype = data.readInt32();
        };
        return S2C_SRequestSelectType;
    }());
    hanlder.S2C_SRequestSelectType = S2C_SRequestSelectType;
    /**
     * 返回请求符文请求信息
     */
    var S2C_SRequestRuneInfo = /** @class */ (function () {
        function S2C_SRequestRuneInfo() {
            this.runeinfolist = []; //	
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SRequestRuneInfo.read = function (self, data) {
            self.requestnum = data.readInt32();
            self.useenergy = data.readInt32();
            var RuneInfoVo;
            var size = data.readInt8();
            for (var i = 0; i < size; i++) {
                RuneInfoVo = new game.modules.family.models.RuneInfoVo();
                RuneInfoVo.fromByteArray(data);
                self.runeinfolist.push(RuneInfoVo);
            }
        };
        return S2C_SRequestRuneInfo;
    }());
    hanlder.S2C_SRequestRuneInfo = S2C_SRequestRuneInfo;
    /**
     * 返回捐献符文
     */
    var S2C_SRuneGive = /** @class */ (function () {
        function S2C_SRuneGive() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SRuneGive.read = function (self, data) {
            var SRuneGive = Browser.window.SRuneGive.decode(data);
            self.givevalue = SRuneGive.givevalue;
            console.log("S2C_SRuneGive SRuneGive:", SRuneGive);
        };
        return S2C_SRuneGive;
    }());
    hanlder.S2C_SRuneGive = S2C_SRuneGive;
    /**
     * 请求符文
     */
    var S2C_SRuneRequest = /** @class */ (function () {
        function S2C_SRuneRequest() {
            this.runerequestinfolist = []; //选择的信息	
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SRuneRequest.read = function (self, data) {
            self.requestnum = data.readInt32();
            var size = data.readInt8();
            var RuneRequestInfoVo;
            for (var i = 0; i < size; i++) {
                RuneRequestInfoVo = new game.modules.family.models.RuneRequestInfoVo();
                RuneRequestInfoVo.fromByteArray(data);
                self.runerequestinfolist.push(RuneRequestInfoVo);
            }
        };
        return S2C_SRuneRequest;
    }());
    hanlder.S2C_SRuneRequest = S2C_SRuneRequest;
    /**
     * 返回请求符文统计
     */
    var S2C_SRequestRuneCount = /** @class */ (function () {
        function S2C_SRequestRuneCount() {
            this.runecountinfolist = []; //	
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SRequestRuneCount.read = function (self, data) {
            var size = data.readInt8();
            var RuneCountInfoVo;
            for (var i = 0; i < size; i++) {
                RuneCountInfoVo = new game.modules.family.models.RuneCountInfoVo;
                RuneCountInfoVo.fromByteArray(data);
                self.runecountinfolist.push(RuneCountInfoVo);
            }
        };
        return S2C_SRequestRuneCount;
    }());
    hanlder.S2C_SRequestRuneCount = S2C_SRequestRuneCount;
    /**
     * 返回请求符文界面
     */
    var S2C_SRuneRequestView = /** @class */ (function () {
        function S2C_SRuneRequestView() {
            this.runerequestinfolist = []; //	选择的信息
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SRuneRequestView.read = function (self, data) {
            self.requestnum = data.readInt32();
            var RuneRequestInfoVo;
            var size = data.readInt8();
            for (var i = 0; i < size; i++) {
                RuneRequestInfoVo = new game.modules.family.models.RuneRequestInfoVo();
                RuneRequestInfoVo.fromByteArray(data);
                self.runerequestinfolist.push(RuneRequestInfoVo);
            }
        };
        return S2C_SRuneRequestView;
    }());
    hanlder.S2C_SRuneRequestView = S2C_SRuneRequestView;
    /**
     * 通知客户端红点信息  value=0 没有红点  value=1有红点
     */
    var S2C_SClanRedTip = /** @class */ (function () {
        function S2C_SClanRedTip() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SClanRedTip.read = function (self, data) {
            // var SClanRedTip = Browser.window.SClanRedTip.decode(data);
            // self.redtips = SClanRedTip.redtips;
            // console.log("S2C_SClanRedTip SClanRedTip:", SClanRedTip);
            self.redtips = new Dictionary();
            var size = data.readUint8();
            for (var i = 0; i < size; i++) {
                self.redtips.set(data.readInt32(), data.readInt32());
            }
        };
        return S2C_SClanRedTip;
    }());
    hanlder.S2C_SClanRedTip = S2C_SClanRedTip;
    /**
     * 服务器返回该玩家是否有公会
     */
    var S2C_SRefreshRoleClan = /** @class */ (function () {
        function S2C_SRefreshRoleClan() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SRefreshRoleClan.read = function (self, data) {
            // 
            self.clankey = data.readLong();
            self.clanname = ByteArrayUtils.readUtf16String(data);
        };
        return S2C_SRefreshRoleClan;
    }());
    hanlder.S2C_SRefreshRoleClan = S2C_SRefreshRoleClan;
    /**
     * 客户端请求邀请界面
     */
    var S2C_SClanInvitationView = /** @class */ (function () {
        function S2C_SClanInvitationView() {
            this.invitationroleinfolist = []; //
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SClanInvitationView.read = function (self, data) {
            // var SClanInvitationView = Browser.window.SClanInvitationView.decode(data);
            // self.invitationroleinfolist = SClanInvitationView.invitationroleinfolist;
            // console.log("S2C_SClanInvitationView SClanInvitationView:", SClanInvitationView);
            var InvitationRoleInfoVo;
            var size = data.readInt8();
            for (var i = 0; i < size; i++) {
                InvitationRoleInfoVo = new game.modules.family.models.InvitationRoleInfoVo();
                InvitationRoleInfoVo.fromByteArray(data);
                self.invitationroleinfolist.push(InvitationRoleInfoVo);
            }
        };
        return S2C_SClanInvitationView;
    }());
    hanlder.S2C_SClanInvitationView = S2C_SClanInvitationView;
    /**
     * 搜索好成功
     */
    var S2C_SRequestSearchRole = /** @class */ (function () {
        function S2C_SRequestSearchRole() {
            this.invitationroleinfolist = []; //
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SRequestSearchRole.read = function (self, data) {
            var InvitationRoleInfoVo;
            // let size = data.readInt8();
            // for(var i=0; i < size; i++){
            InvitationRoleInfoVo = new game.modules.family.models.InvitationRoleInfoVo();
            InvitationRoleInfoVo.fromByteArray(data);
            self.invitationroleinfolist.push(InvitationRoleInfoVo);
            // }
        };
        return S2C_SRequestSearchRole;
    }());
    hanlder.S2C_SRequestSearchRole = S2C_SRequestSearchRole;
    /**
     * 改变公会副本成功
     */
    var S2C_SChangeClanInst = /** @class */ (function () {
        function S2C_SChangeClanInst() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SChangeClanInst.read = function (self, data) {
            self.claninstservice = data.readInt32();
        };
        return S2C_SChangeClanInst;
    }());
    hanlder.S2C_SChangeClanInst = S2C_SChangeClanInst;
    /**
     * 返回发起界面
     */
    var S2C_SRequestImpeachMentView = /** @class */ (function () {
        function S2C_SRequestImpeachMentView() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SRequestImpeachMentView.read = function (self, data) {
            self.impeachstate = data.readByte();
            self.maxnum = data.readInt16();
            self.impeachname = ByteArrayUtils.readUtf16String(data);
            self.impeachtime = data.readLong();
            self.curnum = data.readInt16();
        };
        return S2C_SRequestImpeachMentView;
    }());
    hanlder.S2C_SRequestImpeachMentView = S2C_SRequestImpeachMentView;
    /**
     * 返回对战列表
     */
    var S2C_SGetClanFightList = /** @class */ (function () {
        function S2C_SGetClanFightList() {
            this.clanfightlist = []; //当前这轮的对阵信息链表
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SGetClanFightList.read = function (self, data) {
            var ClanFightVo;
            var size = data.readInt8();
            for (var i = 0; i < size; i++) {
                ClanFightVo = new game.modules.family.models.ClanFightVo();
                ClanFightVo.fromByteArray(data);
                self.clanfightlist.push(ClanFightVo);
            }
            self.curweek = data.readInt32();
            self.over = data.readInt32();
        };
        return S2C_SGetClanFightList;
    }());
    hanlder.S2C_SGetClanFightList = S2C_SGetClanFightList;
    /**
     * 公会战时统计
     */
    var S2C_SBattleFieldScore = /** @class */ (function () {
        function S2C_SBattleFieldScore() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SBattleFieldScore.read = function (self, data) {
            var SBattleFieldScore = Browser.window.SBattleFieldScore.decode(data);
            self.clanscore1 = SBattleFieldScore.clanscore1;
            self.clanscroe2 = SBattleFieldScore.clanscroe2;
            self.myscore = SBattleFieldScore.myscore;
            self.myrank = SBattleFieldScore.myrank;
            console.log("S2C_SBattleFieldScore SBattleFieldScore:", SBattleFieldScore);
        };
        return S2C_SBattleFieldScore;
    }());
    hanlder.S2C_SBattleFieldScore = S2C_SBattleFieldScore;
    /**
     * 公会战时统计
     */
    var S2C_SBattleFieldAct = /** @class */ (function () {
        function S2C_SBattleFieldAct() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SBattleFieldAct.read = function (self, data) {
            var SBattleFieldAct = Browser.window.SBattleFieldAct.decode(data);
            self.roleact = SBattleFieldAct.roleact;
            console.log("S2C_SBattleFieldScore SBattleFieldAct:", SBattleFieldAct);
        };
        return S2C_SBattleFieldAct;
    }());
    hanlder.S2C_SBattleFieldAct = S2C_SBattleFieldAct;
    /**
     * 公会战时统计
     */
    var S2C_SBattleFieldRankList = /** @class */ (function () {
        function S2C_SBattleFieldRankList() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SBattleFieldRankList.read = function (self, data) {
            var SBattleFieldRankList = Browser.window.SBattleFieldRankList.decode(data);
            self.clanscore1 = SBattleFieldRankList.clanscore1;
            self.clanscroe2 = SBattleFieldRankList.clanscroe2;
            self.ranklist1 = SBattleFieldRankList.ranklist1;
            self.ranklist2 = SBattleFieldRankList.ranklist2;
            self.myscore = SBattleFieldRankList.myscore;
            self.myrank = SBattleFieldRankList.myrank;
            console.log("S2C_SBattleFieldRankList SBattleFieldRankList:", SBattleFieldRankList);
        };
        return S2C_SBattleFieldRankList;
    }());
    hanlder.S2C_SBattleFieldRankList = S2C_SBattleFieldRankList;
    /**
     * 公会战时信息
     */
    var S2C_SBattleFieldInfo = /** @class */ (function () {
        function S2C_SBattleFieldInfo() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SBattleFieldInfo.read = function (self, data) {
            var SBattleFieldInfo = Browser.window.SBattleFieldInfo.decode(data);
            self.clanname1 = SBattleFieldInfo.clanname1;
            self.clanname2 = SBattleFieldInfo.clanname2;
            self.clanid1 = SBattleFieldInfo.clanid1;
            self.clanid2 = SBattleFieldInfo.clanid2;
            console.log("S2C_SBattleFieldInfo SBattleFieldInfo:", SBattleFieldInfo);
        };
        return S2C_SBattleFieldInfo;
    }());
    hanlder.S2C_SBattleFieldInfo = S2C_SBattleFieldInfo;
    /**
     * 请求是否是敌对
     */
    var S2C_SRequestRoleIsEnemy = /** @class */ (function () {
        function S2C_SRequestRoleIsEnemy() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SRequestRoleIsEnemy.read = function (self, data) {
            var SRequestRoleIsEnemy = Browser.window.SRequestRoleIsEnemy.decode(data);
            self.rolelist = SRequestRoleIsEnemy.rolelist;
            console.log("S2C_SRequestRoleIsEnemy SRequestRoleIsEnemy:", SRequestRoleIsEnemy);
        };
        return S2C_SRequestRoleIsEnemy;
    }());
    hanlder.S2C_SRequestRoleIsEnemy = S2C_SRequestRoleIsEnemy;
    /**
     * 战场结束
     */
    var S2C_SClanFightOver = /** @class */ (function () {
        function S2C_SClanFightOver() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SClanFightOver.read = function (self, data) {
            var SClanFightOver = Browser.window.SClanFightOver.decode(data);
            self.status = SClanFightOver.status;
            self.overtimestamp = SClanFightOver.overtimestamp;
            console.log("S2C_SClanFightOver SClanFightOver:", SClanFightOver);
        };
        return S2C_SClanFightOver;
    }());
    hanlder.S2C_SClanFightOver = S2C_SClanFightOver;
    /**
     * 离开战场
     */
    var S2C_SLeaveBattleField = /** @class */ (function () {
        function S2C_SLeaveBattleField() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SLeaveBattleField.read = function (self, data) {
            var SLeaveBattleField = Browser.window.SLeaveBattleField.decode(data);
            console.log("S2C_SLeaveBattleField SLeaveBattleField:", SLeaveBattleField);
        };
        return S2C_SLeaveBattleField;
    }());
    hanlder.S2C_SLeaveBattleField = S2C_SLeaveBattleField;
    /**
     * 得到下次清零时间
     */
    var S2C_SGetClearTime = /** @class */ (function () {
        function S2C_SGetClearTime() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SGetClearTime.read = function (self, data) {
            self.cleartime = data.readLong();
        };
        return S2C_SGetClearTime;
    }());
    hanlder.S2C_SGetClearTime = S2C_SGetClearTime;
    /**
     * <!--  跨服和原服之间的协议  start  协议号从25000 协议号从25499 -->
     */
    var S2C_SendRoleInfo = /** @class */ (function () {
        function S2C_SendRoleInfo() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SendRoleInfo.read = function (self, data) {
            var SendRoleInfo = Browser.window.SendRoleInfo.decode(data);
            self.myZoneId = SendRoleInfo.myZoneId;
            self.userId = SendRoleInfo.userId;
            self.roleId = SendRoleInfo.roleId;
            self.flag = SendRoleInfo.flag;
            self.needClearData = SendRoleInfo.needClearData;
            console.log("S2C_SendRoleInfo SendRoleInfo:", SendRoleInfo);
        };
        return S2C_SendRoleInfo;
    }());
    hanlder.S2C_SendRoleInfo = S2C_SendRoleInfo;
    /**
     *
     */
    var S2C_SendRoleInfo_Rep = /** @class */ (function () {
        function S2C_SendRoleInfo_Rep() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SendRoleInfo_Rep.read = function (self, data) {
            var SendRoleInfo_Rep = Browser.window.SendRoleInfo_Rep.decode(data);
            self.roleId = SendRoleInfo_Rep.roleId;
            self.myZoneId = SendRoleInfo_Rep.myZoneId;
            self.flag = SendRoleInfo_Rep.flag;
            self.copydata = SendRoleInfo_Rep.copydata;
            console.log("S2C_SendRoleInfo_Rep SendRoleInfo_Rep:", SendRoleInfo_Rep);
        };
        return S2C_SendRoleInfo_Rep;
    }());
    hanlder.S2C_SendRoleInfo_Rep = S2C_SendRoleInfo_Rep;
    /**
     *
     */
    var S2C_SendRoleData = /** @class */ (function () {
        function S2C_SendRoleData() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SendRoleData.read = function (self, data) {
            var SendRoleData = Browser.window.SendRoleData.decode(data);
            self.roleId = SendRoleData.roleId;
            self.tableName = SendRoleData.tableName;
            self.valueData = SendRoleData.valueData;
            self.keyData = SendRoleData.keyData;
            self.isEmptyTable = SendRoleData.isEmptyTable;
            self.relationData = SendRoleData.relationData;
            console.log("S2C_SendRoleData SendRoleData:", SendRoleData);
        };
        return S2C_SendRoleData;
    }());
    hanlder.S2C_SendRoleData = S2C_SendRoleData;
    /**
     *
     */
    var S2C_SendWordMsg = /** @class */ (function () {
        function S2C_SendWordMsg() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SendWordMsg.read = function (self, data) {
            var SendWordMsg = Browser.window.SendWordMsg.decode(data);
            self.messagetype = SendWordMsg.messagetype;
            self.roleId = SendWordMsg.roleId;
            self.roleName = SendWordMsg.roleName;
            self.shapeId = SendWordMsg.shapeId;
            self.serverName = SendWordMsg.serverName;
            self.serverId = SendWordMsg.serverId;
            self.worldMsg = SendWordMsg.worldMsg;
            self.recRoleId = SendWordMsg.recRoleId;
            self.isRoom = SendWordMsg.isRoom;
            console.log("S2C_SendRoleData SendWordMsg:", SendWordMsg);
        };
        return S2C_SendWordMsg;
    }());
    hanlder.S2C_SendWordMsg = S2C_SendWordMsg;
    /**
     *
     */
    var S2C_SCReqCrosserInfo = /** @class */ (function () {
        function S2C_SCReqCrosserInfo() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SCReqCrosserInfo.read = function (self, data) {
            var SCReqCrosserInfo = Browser.window.SCReqCrosserInfo.decode(data);
            self.zoneId = SCReqCrosserInfo.zoneId;
            self.roleId = SCReqCrosserInfo.roleId;
            self.roleName = SCReqCrosserInfo.roleName;
            self.rolelv = SCReqCrosserInfo.rolelv;
            self.roleschool = SCReqCrosserInfo.roleschool;
            self.roleShapeid = SCReqCrosserInfo.roleShapeid;
            console.log("S2C_SCReqCrosserInfo SCReqCrosserInfo:", SCReqCrosserInfo);
        };
        return S2C_SCReqCrosserInfo;
    }());
    hanlder.S2C_SCReqCrosserInfo = S2C_SCReqCrosserInfo;
    /**
     *
     */
    var S2C_SCCreateRoom = /** @class */ (function () {
        function S2C_SCCreateRoom() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SCCreateRoom.read = function (self, data) {
            var SCCreateRoom = Browser.window.SCCreateRoom.decode(data);
            self.zoneId = SCCreateRoom.zoneId;
            self.roomName = SCCreateRoom.roomName;
            self.pwd = SCCreateRoom.pwd;
            self.members = SCCreateRoom.members;
            console.log("S2C_SCCreateRoom SCCreateRoom:", SCCreateRoom);
        };
        return S2C_SCCreateRoom;
    }());
    hanlder.S2C_SCCreateRoom = S2C_SCCreateRoom;
    /**
     *
     */
    var S2C_SCReqRoomInfos = /** @class */ (function () {
        function S2C_SCReqRoomInfos() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SCReqRoomInfos.read = function (self, data) {
            var SCReqRoomInfos = Browser.window.SCReqRoomInfos.decode(data);
            self.roleId = SCReqRoomInfos.roleId;
            console.log("S2C_SCReqRoomInfos SCReqRoomInfos:", SCReqRoomInfos);
        };
        return S2C_SCReqRoomInfos;
    }());
    hanlder.S2C_SCReqRoomInfos = S2C_SCReqRoomInfos;
    /**
     *
     */
    var S2C_SCLeaveRoom = /** @class */ (function () {
        function S2C_SCLeaveRoom() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SCLeaveRoom.read = function (self, data) {
            var SCLeaveRoom = Browser.window.SCLeaveRoom.decode(data);
            self.roleId = SCLeaveRoom.roleId;
            self.roomid = SCLeaveRoom.roomid;
            console.log("S2C_SCLeaveRoom SCLeaveRoom:", SCLeaveRoom);
        };
        return S2C_SCLeaveRoom;
    }());
    hanlder.S2C_SCLeaveRoom = S2C_SCLeaveRoom;
    /**
     *
     */
    var S2C_SCStandCross = /** @class */ (function () {
        function S2C_SCStandCross() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SCStandCross.read = function (self, data) {
            var SCStandCross = Browser.window.SCStandCross.decode(data);
            self.roleId = SCStandCross.roleId;
            self.flag = SCStandCross.flag;
            self.roomid = SCStandCross.roomid;
            console.log("S2C_SCStandCross SCStandCross:", SCStandCross);
        };
        return S2C_SCStandCross;
    }());
    hanlder.S2C_SCStandCross = S2C_SCStandCross;
    /**
     *
     */
    var S2C_SCEnterRoom = /** @class */ (function () {
        function S2C_SCEnterRoom() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SCEnterRoom.read = function (self, data) {
            var SCEnterRoom = Browser.window.SCEnterRoom.decode(data);
            self.zoneId = SCEnterRoom.zoneId;
            self.roomid = SCEnterRoom.roomid;
            self.pwd = SCEnterRoom.pwd;
            self.members = SCEnterRoom.members;
            console.log("S2C_SCEnterRoom SCEnterRoom:", SCEnterRoom);
        };
        return S2C_SCEnterRoom;
    }());
    hanlder.S2C_SCEnterRoom = S2C_SCEnterRoom;
    /**
     *
     */
    var S2C_SCRoomStand = /** @class */ (function () {
        function S2C_SCRoomStand() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SCRoomStand.read = function (self, data) {
            var SCRoomStand = Browser.window.SCRoomStand.decode(data);
            self.roleId = SCRoomStand.roleId;
            self.flag = SCRoomStand.flag;
            self.roomid = SCRoomStand.roomid;
            console.log("S2C_SCRoomStand SCRoomStand:", SCRoomStand);
        };
        return S2C_SCRoomStand;
    }());
    hanlder.S2C_SCRoomStand = S2C_SCRoomStand;
    /**
     *
     */
    var S2C_SCReqRoomInfo = /** @class */ (function () {
        function S2C_SCReqRoomInfo() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SCReqRoomInfo.read = function (self, data) {
            var SCReqRoomInfo = Browser.window.SCReqRoomInfo.decode(data);
            self.zoneId = SCReqRoomInfo.zoneId;
            self.roleId = SCReqRoomInfo.roleId;
            console.log("S2C_SCReqRoomInfo SCReqRoomInfo:", SCReqRoomInfo);
        };
        return S2C_SCReqRoomInfo;
    }());
    hanlder.S2C_SCReqRoomInfo = S2C_SCReqRoomInfo;
    /**
     *
     */
    var S2C_SCChangeCrosserForm = /** @class */ (function () {
        function S2C_SCChangeCrosserForm() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SCChangeCrosserForm.read = function (self, data) {
            var SCChangeCrosserForm = Browser.window.SCChangeCrosserForm.decode(data);
            self.zoneId = SCChangeCrosserForm.zoneId;
            self.roleId = SCChangeCrosserForm.roleId;
            self.formId = SCChangeCrosserForm.formId;
            self.formlv = SCChangeCrosserForm.formlv;
            console.log("S2C_SCChangeCrosserForm SCChangeCrosserForm:", SCChangeCrosserForm);
        };
        return S2C_SCChangeCrosserForm;
    }());
    hanlder.S2C_SCChangeCrosserForm = S2C_SCChangeCrosserForm;
    /**
     *
     */
    var S2C_SCChangeRoomPwd = /** @class */ (function () {
        function S2C_SCChangeRoomPwd() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SCChangeRoomPwd.read = function (self, data) {
            var SCChangeRoomPwd = Browser.window.SCChangeRoomPwd.decode(data);
            self.zoneId = SCChangeRoomPwd.zoneId;
            self.roleId = SCChangeRoomPwd.roleId;
            self.roompwd = SCChangeRoomPwd.roompwd;
            console.log("S2C_SCChangeRoomPwd SCChangeRoomPwd:", SCChangeRoomPwd);
        };
        return S2C_SCChangeRoomPwd;
    }());
    hanlder.S2C_SCChangeRoomPwd = S2C_SCChangeRoomPwd;
    /**
     *
     */
    var S2C_SCModifyCrossMoney = /** @class */ (function () {
        function S2C_SCModifyCrossMoney() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SCModifyCrossMoney.read = function (self, data) {
            var SCModifyCrossMoney = Browser.window.SCModifyCrossMoney.decode(data);
            self.zoneId = SCModifyCrossMoney.zoneId;
            self.crossMoney = SCModifyCrossMoney.crossMoney;
            console.log("S2C_SCModifyCrossMoney SCModifyCrossMoney:", SCModifyCrossMoney);
        };
        return S2C_SCModifyCrossMoney;
    }());
    hanlder.S2C_SCModifyCrossMoney = S2C_SCModifyCrossMoney;
    /**
     *
     */
    var S2C_SCEndCross = /** @class */ (function () {
        function S2C_SCEndCross() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SCEndCross.read = function (self, data) {
            var SCEndCross = Browser.window.SCEndCross.decode(data);
            self.roleId = SCEndCross.roleId;
            console.log("S2C_SCEndCross SCEndCross:", SCEndCross);
        };
        return S2C_SCEndCross;
    }());
    hanlder.S2C_SCEndCross = S2C_SCEndCross;
    /**
     *
     */
    var S2C_SCReqTTBonus = /** @class */ (function () {
        function S2C_SCReqTTBonus() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SCReqTTBonus.read = function (self, data) {
            var SCReqTTBonus = Browser.window.SCReqTTBonus.decode(data);
            self.roleId = SCReqTTBonus.roleId;
            self.ttBonusid = SCReqTTBonus.ttBonusid;
            console.log("S2C_SCReqTTBonus SCReqTTBonus:", SCReqTTBonus);
        };
        return S2C_SCReqTTBonus;
    }());
    hanlder.S2C_SCReqTTBonus = S2C_SCReqTTBonus;
    /**
     *
     */
    var S2C_SCResultTTBonus = /** @class */ (function () {
        function S2C_SCResultTTBonus() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SCResultTTBonus.read = function (self, data) {
            var SCResultTTBonus = Browser.window.SCResultTTBonus.decode(data);
            self.roleId = SCResultTTBonus.roleId;
            self.ttBonusid = SCResultTTBonus.ttBonusid;
            console.log("S2C_SCResultTTBonus SCResultTTBonus:", SCResultTTBonus);
        };
        return S2C_SCResultTTBonus;
    }());
    hanlder.S2C_SCResultTTBonus = S2C_SCResultTTBonus;
    /**
     *
     */
    var S2C_SCInvitJoinRoom = /** @class */ (function () {
        function S2C_SCInvitJoinRoom() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SCInvitJoinRoom.read = function (self, data) {
            var SCInvitJoinRoom = Browser.window.SCInvitJoinRoom.decode(data);
            self.roleId = SCInvitJoinRoom.roleId;
            self.beInvitroleId = SCInvitJoinRoom.beInvitroleId;
            console.log("S2C_SCInvitJoinRoom SCInvitJoinRoom:", SCInvitJoinRoom);
        };
        return S2C_SCInvitJoinRoom;
    }());
    hanlder.S2C_SCInvitJoinRoom = S2C_SCInvitJoinRoom;
    /**
     *
     */
    var S2C_SCReqCrossRankList = /** @class */ (function () {
        function S2C_SCReqCrossRankList() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SCReqCrossRankList.read = function (self, data) {
            var SCReqCrossRankList = Browser.window.SCReqCrossRankList.decode(data);
            self.zoneId = SCReqCrossRankList.zoneId;
            self.roleId = SCReqCrossRankList.roleId;
            self.ranklevel = SCReqCrossRankList.ranklevel;
            self.ranktype = SCReqCrossRankList.ranktype;
            console.log("S2C_SCReqCrossRankList SCReqCrossRankList:", SCReqCrossRankList);
        };
        return S2C_SCReqCrossRankList;
    }());
    hanlder.S2C_SCReqCrossRankList = S2C_SCReqCrossRankList;
    /**
     *
     */
    var S2C_SCKickoffRoom = /** @class */ (function () {
        function S2C_SCKickoffRoom() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SCKickoffRoom.read = function (self, data) {
            var SCKickoffRoom = Browser.window.SCKickoffRoom.decode(data);
            self.roleId = SCKickoffRoom.roleId;
            self.bekickoffroleId = SCKickoffRoom.bekickoffroleId;
            console.log("S2C_SCKickoffRoom SCKickoffRoom:", SCKickoffRoom);
        };
        return S2C_SCKickoffRoom;
    }());
    hanlder.S2C_SCKickoffRoom = S2C_SCKickoffRoom;
    /**
     *
     */
    var S2C_SCAddCrossIntegral = /** @class */ (function () {
        function S2C_SCAddCrossIntegral() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SCAddCrossIntegral.read = function (self, data) {
            var SCAddCrossIntegral = Browser.window.SCAddCrossIntegral.decode(data);
            self.roleId = SCAddCrossIntegral.roleId;
            self.IntegralCount = SCAddCrossIntegral.IntegralCount;
            console.log("S2C_SCAddCrossIntegral SCAddCrossIntegral:", SCAddCrossIntegral);
        };
        return S2C_SCAddCrossIntegral;
    }());
    hanlder.S2C_SCAddCrossIntegral = S2C_SCAddCrossIntegral;
    /**
     *
     */
    var S2C_SCCrossLvUp = /** @class */ (function () {
        function S2C_SCCrossLvUp() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SCCrossLvUp.read = function (self, data) {
            var SCCrossLvUp = Browser.window.SCCrossLvUp.decode(data);
            self.roleId = SCCrossLvUp.roleId;
            self.rolelv = SCCrossLvUp.rolelv;
            console.log("S2C_SCCrossLvUp SCCrossLvUp:", SCCrossLvUp);
        };
        return S2C_SCCrossLvUp;
    }());
    hanlder.S2C_SCCrossLvUp = S2C_SCCrossLvUp;
    /**
     *
     */
    var S2C_SCSetRoomOwner = /** @class */ (function () {
        function S2C_SCSetRoomOwner() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SCSetRoomOwner.read = function (self, data) {
            var SCSetRoomOwner = Browser.window.SCSetRoomOwner.decode(data);
            self.roleId = SCSetRoomOwner.roleId;
            self.newownerroleId = SCSetRoomOwner.newownerroleId;
            console.log("S2C_SCSetRoomOwner SCSetRoomOwner:", SCSetRoomOwner);
        };
        return S2C_SCSetRoomOwner;
    }());
    hanlder.S2C_SCSetRoomOwner = S2C_SCSetRoomOwner;
    /**
     *
     */
    var S2C_SCSwapRoomMember = /** @class */ (function () {
        function S2C_SCSwapRoomMember() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SCSwapRoomMember.read = function (self, data) {
            var SCSwapRoomMember = Browser.window.SCSwapRoomMember.decode(data);
            self.roleId = SCSwapRoomMember.roleId;
            self.index1 = SCSwapRoomMember.index1;
            self.index2 = SCSwapRoomMember.index2;
            console.log("S2C_SCSwapRoomMember SCSwapRoomMember:", SCSwapRoomMember);
        };
        return S2C_SCSwapRoomMember;
    }());
    hanlder.S2C_SCSwapRoomMember = S2C_SCSwapRoomMember;
    /**
     *
     */
    var S2C_SBeginCorssServer = /** @class */ (function () {
        function S2C_SBeginCorssServer() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SBeginCorssServer.read = function (self, data) {
            var SBeginCorssServer = Browser.window.SBeginCorssServer.decode(data);
            self.account = SBeginCorssServer.account;
            self.ticket = SBeginCorssServer.ticket;
            self.crossIp = SBeginCorssServer.crossIp;
            self.crossPort = SBeginCorssServer.crossPort;
            self.crossNum = SBeginCorssServer.crossNum;
            console.log("S2C_SBeginCorssServer SBeginCorssServer:", SBeginCorssServer);
        };
        return S2C_SBeginCorssServer;
    }());
    hanlder.S2C_SBeginCorssServer = S2C_SBeginCorssServer;
    /**
     *
     */
    var S2C_SSendCrosserInfo = /** @class */ (function () {
        function S2C_SSendCrosserInfo() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SSendCrosserInfo.read = function (self, data) {
            var SSendCrosserInfo = Browser.window.SSendCrosserInfo.decode(data);
            self.season = SSendCrosserInfo.season;
            self.week = SSendCrosserInfo.week;
            self.seasonendtime = SSendCrosserInfo.seasonendtime;
            self.crosserinfo = SSendCrosserInfo.crosserinfo;
            console.log("S2C_SSendCrosserInfo SSendCrosserInfo:", SSendCrosserInfo);
        };
        return S2C_SSendCrosserInfo;
    }());
    hanlder.S2C_SSendCrosserInfo = S2C_SSendCrosserInfo;
    /**
     *
     */
    var S2C_SSendRoomInfos = /** @class */ (function () {
        function S2C_SSendRoomInfos() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SSendRoomInfos.read = function (self, data) {
            var SSendRoomInfos = Browser.window.SSendRoomInfos.decode(data);
            self.roomInfos = SSendRoomInfos.roomInfos;
            console.log("S2C_SSendRoomInfos SSendRoomInfos:", SSendRoomInfos);
        };
        return S2C_SSendRoomInfos;
    }());
    hanlder.S2C_SSendRoomInfos = S2C_SSendRoomInfos;
    /**
     *
     */
    var S2C_SUpdataRoomInfo = /** @class */ (function () {
        function S2C_SUpdataRoomInfo() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SUpdataRoomInfo.read = function (self, data) {
            var SUpdataRoomInfo = Browser.window.SUpdataRoomInfo.decode(data);
            self.roomInfo = SUpdataRoomInfo.roomInfo;
            console.log("S2C_SUpdataRoomInfo SUpdataRoomInfo:", SUpdataRoomInfo);
        };
        return S2C_SUpdataRoomInfo;
    }());
    hanlder.S2C_SUpdataRoomInfo = S2C_SUpdataRoomInfo;
    /**
     *
     */
    var S2C_SLeaveRoom = /** @class */ (function () {
        function S2C_SLeaveRoom() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SLeaveRoom.read = function (self, data) {
            var SLeaveRoom = Browser.window.SLeaveRoom.decode(data);
            self.roleId = SLeaveRoom.roleId;
            console.log("S2C_SLeaveRoom SLeaveRoom:", SLeaveRoom);
        };
        return S2C_SLeaveRoom;
    }());
    hanlder.S2C_SLeaveRoom = S2C_SLeaveRoom;
    /**
     *
     */
    var S2C_SStandCross = /** @class */ (function () {
        function S2C_SStandCross() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SStandCross.read = function (self, data) {
            var SStandCross = Browser.window.SStandCross.decode(data);
            self.roleId = SStandCross.roleId;
            self.flag = SStandCross.flag;
            self.roomid = SStandCross.roomid;
            console.log("S2C_SStandCross SStandCross:", SStandCross);
        };
        return S2C_SStandCross;
    }());
    hanlder.S2C_SStandCross = S2C_SStandCross;
    /**
     *
     */
    var S2C_SNotifyMsg = /** @class */ (function () {
        function S2C_SNotifyMsg() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SNotifyMsg.read = function (self, data) {
            var SNotifyMsg = Browser.window.SNotifyMsg.decode(data);
            self.errorType = SNotifyMsg.errorType;
            self.msgID = SNotifyMsg.msgID;
            console.log("S2C_SNotifyMsg SNotifyMsg:", SNotifyMsg);
        };
        return S2C_SNotifyMsg;
    }());
    hanlder.S2C_SNotifyMsg = S2C_SNotifyMsg;
    /**
     *
     */
    var S2C_SRoomStand = /** @class */ (function () {
        function S2C_SRoomStand() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SRoomStand.read = function (self, data) {
            var SRoomStand = Browser.window.SRoomStand.decode(data);
            self.flag = SRoomStand.flag;
            self.roomid = SRoomStand.roomid;
            console.log("S2C_SRoomStand SRoomStand:", SRoomStand);
        };
        return S2C_SRoomStand;
    }());
    hanlder.S2C_SRoomStand = S2C_SRoomStand;
    /**
     *
     */
    var S2C_SCrossBattleInfo = /** @class */ (function () {
        function S2C_SCrossBattleInfo() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SCrossBattleInfo.read = function (self, data) {
            var SCrossBattleInfo = Browser.window.SCrossBattleInfo.decode(data);
            self.Room1members = SCrossBattleInfo.Room1members;
            self.Room2members = SCrossBattleInfo.Room2members;
            console.log("S2C_SCrossBattleInfo SCrossBattleInfo:", SCrossBattleInfo);
        };
        return S2C_SCrossBattleInfo;
    }());
    hanlder.S2C_SCrossBattleInfo = S2C_SCrossBattleInfo;
    var S2C_SCrossBattleMemberState = /** @class */ (function () {
        function S2C_SCrossBattleMemberState() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SCrossBattleMemberState.read = function (self, data) {
            var SCrossBattleMemberState = Browser.window.SCrossBattleMemberState.decode(data);
            self.stateChangeroleId = SCrossBattleMemberState.stateChangeroleId;
            self.state = SCrossBattleMemberState.state;
            console.log("S2C_SCrossBattleMemberState SCrossBattleMemberState:", SCrossBattleMemberState);
        };
        return S2C_SCrossBattleMemberState;
    }());
    hanlder.S2C_SCrossBattleMemberState = S2C_SCrossBattleMemberState;
    var S2C_SCrossBattleResult = /** @class */ (function () {
        function S2C_SCrossBattleResult() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SCrossBattleResult.read = function (self, data) {
            var SCrossBattleResult = Browser.window.SCrossBattleResult.decode(data);
            self.resultType = SCrossBattleResult.resultType;
            self.heroIntegral = SCrossBattleResult.heroIntegral;
            self.heroMaxIntegral = SCrossBattleResult.herheroMaxIntegraloIntegral;
            self.herolistFightTime = SCrossBattleResult.herolistFightTime;
            self.herolistWinTime = SCrossBattleResult.herolistWinTime;
            self.herolistRunawayTime = SCrossBattleResult.herolistRunawayTime;
            console.log("S2C_SCrossBattleResult SCrossBattleResult:", SCrossBattleResult);
        };
        return S2C_SCrossBattleResult;
    }());
    hanlder.S2C_SCrossBattleResult = S2C_SCrossBattleResult;
    var S2C_SChangeCrosserForm = /** @class */ (function () {
        function S2C_SChangeCrosserForm() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SChangeCrosserForm.read = function (self, data) {
            var SChangeCrosserForm = Browser.window.SChangeCrosserForm.decode(data);
            self.roleId = SChangeCrosserForm.roleId;
            self.formId = SChangeCrosserForm.formId;
            self.formlv = SChangeCrosserForm.formlv;
            console.log("S2C_SChangeCrosserForm SChangeCrosserForm:", SChangeCrosserForm);
        };
        return S2C_SChangeCrosserForm;
    }());
    hanlder.S2C_SChangeCrosserForm = S2C_SChangeCrosserForm;
    var S2C_SResultTTBonus = /** @class */ (function () {
        function S2C_SResultTTBonus() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SResultTTBonus.read = function (self, data) {
            var SResultTTBonus = Browser.window.SResultTTBonus.decode(data);
            self.ttBonusid = SResultTTBonus.ttBonusid;
            console.log("S2C_SResultTTBonus SResultTTBonus:", SResultTTBonus);
        };
        return S2C_SResultTTBonus;
    }());
    hanlder.S2C_SResultTTBonus = S2C_SResultTTBonus;
    var S2C_SInvitJoinRoom = /** @class */ (function () {
        function S2C_SInvitJoinRoom() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SInvitJoinRoom.read = function (self, data) {
            var SInvitJoinRoom = Browser.window.SInvitJoinRoom.decode(data);
            self.Invitername = SInvitJoinRoom.Invitername;
            self.Invitroomid = SInvitJoinRoom.Invitroomid;
            self.Invitroomname = SInvitJoinRoom.Invitroomname;
            self.pwd = SInvitJoinRoom.pwd;
            console.log("S2C_SResultTTBonus SInvitJoinRoom:", SInvitJoinRoom);
        };
        return S2C_SInvitJoinRoom;
    }());
    hanlder.S2C_SInvitJoinRoom = S2C_SInvitJoinRoom;
    var S2C_SReqCrossRankList = /** @class */ (function () {
        function S2C_SReqCrossRankList() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SReqCrossRankList.read = function (self, data) {
            var SReqCrossRankList = Browser.window.SReqCrossRankList.decode(data);
            self.ranklevel = SReqCrossRankList.ranklevel;
            self.ranktype = SReqCrossRankList.ranktype;
            self.rankindex = SReqCrossRankList.rankindex;
            self.RankLists = SReqCrossRankList.RankListspwd;
            console.log("S2C_SReqCrossRankList SReqCrossRankList:", SReqCrossRankList);
        };
        return S2C_SReqCrossRankList;
    }());
    hanlder.S2C_SReqCrossRankList = S2C_SReqCrossRankList;
    var S2C_SKickoffRoom = /** @class */ (function () {
        function S2C_SKickoffRoom() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SKickoffRoom.read = function (self, data) {
            var SKickoffRoom = Browser.window.SKickoffRoom.decode(data);
            self.bekickoffroleId = SKickoffRoom.bekickoffroleId;
            console.log("S2C_SKickoffRoom SKickoffRoom:", SKickoffRoom);
        };
        return S2C_SKickoffRoom;
    }());
    hanlder.S2C_SKickoffRoom = S2C_SKickoffRoom;
    var S2C_SEnterLeaveHell = /** @class */ (function () {
        function S2C_SEnterLeaveHell() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SEnterLeaveHell.read = function (self, data) {
            var SEnterLeaveHell = Browser.window.SEnterLeaveHell.decode(data);
            self.enterleave = SEnterLeaveHell.enterleave;
            console.log("S2C_SEnterLeaveHell SEnterLeaveHell:", SEnterLeaveHell);
        };
        return S2C_SEnterLeaveHell;
    }());
    hanlder.S2C_SEnterLeaveHell = S2C_SEnterLeaveHell;
    var S2C_SSwapRoomMember = /** @class */ (function () {
        function S2C_SSwapRoomMember() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SSwapRoomMember.read = function (self, data) {
            var SSwapRoomMember = Browser.window.SSwapRoomMember.decode(data);
            self.index1 = SSwapRoomMember.index1;
            self.index2 = SSwapRoomMember.index2;
            console.log("S2C_SSwapRoomMember SSwapRoomMember:", SSwapRoomMember);
        };
        return S2C_SSwapRoomMember;
    }());
    hanlder.S2C_SSwapRoomMember = S2C_SSwapRoomMember;
    var S2C_SEndCross = /** @class */ (function () {
        function S2C_SEndCross() {
        }
        //  public index1:number;  //	
        //  public index2:number;  //	
        /**
        从输入二进制流中读取结构体
        */
        S2C_SEndCross.read = function (self, data) {
            var SEndCross = Browser.window.SEndCross.decode(data);
            // self.index1 = SEndCross.index1;
            // self.index2 = SEndCross.index2;
            console.log("S2C_SEndCross SEndCross:", SEndCross);
        };
        return S2C_SEndCross;
    }());
    hanlder.S2C_SEndCross = S2C_SEndCross;
    var S2C_SFriendsInfoInit = /** @class */ (function () {
        function S2C_SFriendsInfoInit() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SFriendsInfoInit.read = function (self, data) {
            // var SFriendsInfoInit = Browser.window.SFriendsInfoInit.decode(data);
            // self.friends = SFriendsInfoInit.friends;
            // self.refuseStrangerMsg = SFriendsInfoInit.refuseStrangerMsg;
            // console.log("S2C_SFriendsInfoInit SFriendsInfoInit:", SFriendsInfoInit);
            self.friends = new Array();
            var friendsSize = data.readUint8();
            var friendInfo;
            for (var index = 0; index < friendsSize; index++) {
                friendInfo = new game.modules.friend.models.FriendInfoVo();
                friendInfo.fromByteArray(data);
                self.friends.push(friendInfo);
            } //FriendInfo
            self.friendNumLimit = data.readInt16();
            self.refuseStrangerMsg = data.readByte();
            console.log("S2C_SFriendsInfoInit++++++++++++++++++++", self.friends);
        };
        return S2C_SFriendsInfoInit;
    }());
    hanlder.S2C_SFriendsInfoInit = S2C_SFriendsInfoInit;
    /**
     * 好友上下线
     */
    var S2C_SFriendsOnline = /** @class */ (function () {
        function S2C_SFriendsOnline() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SFriendsOnline.read = function (self, data) {
            self.roleid = data.readLong();
            self.online = data.readByte();
        };
        return S2C_SFriendsOnline;
    }());
    hanlder.S2C_SFriendsOnline = S2C_SFriendsOnline;
    /**
     * 好友聊天聊天S-->C
     */
    var S2C_SFriendMessageToRole = /** @class */ (function () {
        function S2C_SFriendMessageToRole() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SFriendMessageToRole.read = function (self, data) {
            // var SFriendMessageToRole = Browser.window.SFriendMessageToRole.decode(data);
            // self.roleid = SFriendMessageToRole.roleid;
            // self.content = SFriendMessageToRole.content;
            // self.roleLevel = SFriendMessageToRole.roleLevel;
            // self.details = SFriendMessageToRole.details;
            // self.displayinfo = SFriendMessageToRole.displayinfo;
            // console.log("S2C_SFriendMessageToRole SFriendMessageToRole:", SFriendMessageToRole);
            self.roleid = data.readLong();
            self.content = ByteArrayUtils.readUtf16String(data);
            self.roleLevel = data.readShort();
            self.details = new Array();
            var detailsInfo;
            var detailsSize = data.readUint8();
            for (var index = 0; index < detailsSize; index++) {
                detailsInfo = data.readUint8();
                self.details.push(detailsInfo);
            }
            self.displayinfo = new Array();
            var displayInfoVo;
            var displayinfosSize = data.readUint8();
            displayInfoVo = new game.modules.chat.models.DisplayInfoVo();
            for (var index = 0; index < displayinfosSize; index++) {
                displayInfoVo.fromByteArray(data);
                self.displayinfo.push(displayInfoVo);
            }
            console.log("S2C_SFriendMessageToRole++++++++++++++++++++++++", self.content);
        };
        return S2C_SFriendMessageToRole;
    }());
    hanlder.S2C_SFriendMessageToRole = S2C_SFriendMessageToRole;
    /**
     *
     */
    var S2C_SStrangerMessageToRole = /** @class */ (function () {
        function S2C_SStrangerMessageToRole() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SStrangerMessageToRole.read = function (self, data) {
            // var SStrangerMessageToRole = Browser.window.SStrangerMessageToRole.decode(data);
            // self.strangerMessage = SStrangerMessageToRole.strangerMessage;
            // console.log("S2C_SStrangerMessageToRole SStrangerMessageToRole:", SStrangerMessageToRole);
            self.strangerMessage = new game.modules.friend.models.StrangerMessageBeanVo();
            self.strangerMessage.fromByteArray(data);
            console.log("S2C_SStrangerMessageToRole++++++++++++++++++", self.strangerMessage);
        };
        return S2C_SStrangerMessageToRole;
    }());
    hanlder.S2C_SStrangerMessageToRole = S2C_SStrangerMessageToRole;
    /**
     *
     */
    var S2C_SOffLineMsgMessageToRole = /** @class */ (function () {
        function S2C_SOffLineMsgMessageToRole() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SOffLineMsgMessageToRole.read = function (self, data) {
            // var SOffLineMsgMessageToRole = Browser.window.SOffLineMsgMessageToRole.decode(data);
            // self.offLineMsgList = SOffLineMsgMessageToRole.offLineMsgList;
            // console.log("S2C_SOffLineMsgMessageToRole SOffLineMsgMessageToRole:", SOffLineMsgMessageToRole);
            self.offLineMsgList = new Array();
            var offLineMsgListSize = data.readUint8();
            var offLinemsgBean;
            for (var index = 0; index < offLineMsgListSize; index++) {
                offLinemsgBean = new game.modules.friend.models.offLineMsgBeanVo();
                offLinemsgBean.fromByteArray(data);
                self.offLineMsgList.push(offLinemsgBean);
            } //offLineMsgBean
            console.log("S2C_SOffLineMsgMessageToRole+++++++++++++++++++++++++++++", self.offLineMsgList);
        };
        return S2C_SOffLineMsgMessageToRole;
    }());
    hanlder.S2C_SOffLineMsgMessageToRole = S2C_SOffLineMsgMessageToRole;
    /**
     *
     */
    var S2C_SBreakOffRelation = /** @class */ (function () {
        function S2C_SBreakOffRelation() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SBreakOffRelation.read = function (self, data) {
            self.roleid = data.readLong();
            console.log("S2C_SBreakOffRelation++++++++++++++", self.roleid);
        };
        return S2C_SBreakOffRelation;
    }());
    hanlder.S2C_SBreakOffRelation = S2C_SBreakOffRelation;
    /**
     *
     */
    var S2C_SAddFriend = /** @class */ (function () {
        function S2C_SAddFriend() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SAddFriend.read = function (self, data) {
            // var SAddFriend = Browser.window.SAddFriend.decode(data);
            // self.FriendInfoBean = SAddFriend.FriendInfoBean;
            // console.log("S2C_SAddFriend SAddFriend:", SAddFriend);
            self.FriendInfoBean = new game.modules.friend.models.InfoBeanVo();
            self.FriendInfoBean.fromByteArray(data);
            console.log("S2C_SAddFriend++++++++++++++++++++", self.FriendInfoBean);
        };
        return S2C_SAddFriend;
    }());
    hanlder.S2C_SAddFriend = S2C_SAddFriend;
    /**
     *
     */
    var S2C_SChangeBaseConfig = /** @class */ (function () {
        function S2C_SChangeBaseConfig() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SChangeBaseConfig.read = function (self, data) {
            var SChangeBaseConfig = Browser.window.SChangeBaseConfig.decode(data);
            self.refuseStrangerMsg = SChangeBaseConfig.refuseStrangerMsg;
            console.log("S2C_SChangeBaseConfig SChangeBaseConfig:", SChangeBaseConfig);
        };
        return S2C_SChangeBaseConfig;
    }());
    hanlder.S2C_SChangeBaseConfig = S2C_SChangeBaseConfig;
    /**
     *
     */
    var S2C_SRequestUpdateRoleInfo = /** @class */ (function () {
        function S2C_SRequestUpdateRoleInfo() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SRequestUpdateRoleInfo.read = function (self, data) {
            self.FriendInfoBean = new game.modules.friend.models.InfoBeanVo();
            self.FriendInfoBean.fromByteArray(data);
            console.log("S2C_SRequestUpdateRoleInfo++++++++++++++++++++", self.FriendInfoBean);
        };
        return S2C_SRequestUpdateRoleInfo;
    }());
    hanlder.S2C_SRequestUpdateRoleInfo = S2C_SRequestUpdateRoleInfo;
    /**
     *
     */
    var S2C_SRequestSpaceRoleInfo = /** @class */ (function () {
        function S2C_SRequestSpaceRoleInfo() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SRequestSpaceRoleInfo.read = function (self, data) {
            var SRequestSpaceRoleInfo = Browser.window.SRequestSpaceRoleInfo.decode(data);
            self.FriendInfoBean = SRequestSpaceRoleInfo.FriendInfoBean;
            self.Title = SRequestSpaceRoleInfo.Title;
            self.reqtype = SRequestSpaceRoleInfo.reqtype;
            self.components = SRequestSpaceRoleInfo.components;
            console.log("S2C_SRequestSpaceRoleInfo SRequestSpaceRoleInfo:", SRequestSpaceRoleInfo);
        };
        return S2C_SRequestSpaceRoleInfo;
    }());
    hanlder.S2C_SRequestSpaceRoleInfo = S2C_SRequestSpaceRoleInfo;
    /**
     *
     */
    var S2C_SUpdateFriendLevel = /** @class */ (function () {
        function S2C_SUpdateFriendLevel() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SUpdateFriendLevel.read = function (self, data) {
            self.currentFriendLevel = data.readInt32();
            self.friendid = data.readLong();
            console.log("S2C_SUpdateFriendLevel++++++++++++++++++++", self.currentFriendLevel);
        };
        return S2C_SUpdateFriendLevel;
    }());
    hanlder.S2C_SUpdateFriendLevel = S2C_SUpdateFriendLevel;
    /**
     *
     */
    var S2C_SSendSystemMessageToRole = /** @class */ (function () {
        function S2C_SSendSystemMessageToRole() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SSendSystemMessageToRole.read = function (self, data) {
            // var SSendSystemMessageToRole = Browser.window.SSendSystemMessageToRole.decode(data);
            // self.systemRoleId = SSendSystemMessageToRole.systemRoleId;
            // self.contentId = SSendSystemMessageToRole.contentId;
            // self.contentParam = SSendSystemMessageToRole.contentParam;
            // self.time = SSendSystemMessageToRole.time;
            // console.log("S2C_SSendSystemMessageToRole SSendSystemMessageToRole:", SSendSystemMessageToRole);
            self.systemRoleId = data.readLong();
            self.contentId = data.readInt32();
            self.contentParam = new Array();
            var contentParamSize = data.readUint8();
            var contentParamInfo;
            for (var index = 0; index < contentParamSize; index++) {
                contentParamInfo = ByteArrayUtils.readUtf16String(data);
                self.contentParam.push(contentParamInfo);
            }
            // self.time = data.readUTFBytes(data.readUint8());
            self.time = ByteArrayUtils.readUtf16String(data);
            console.log("S2C_SSendSystemMessageToRole++++++++++++++++++++++++++++++++", self.contentParam);
        };
        return S2C_SSendSystemMessageToRole;
    }());
    hanlder.S2C_SSendSystemMessageToRole = S2C_SSendSystemMessageToRole;
    /**
     *
     */
    var S2C_SJionCamp = /** @class */ (function () {
        function S2C_SJionCamp() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SJionCamp.read = function (self, data) {
            var SJionCamp = Browser.window.SJionCamp.decode(data);
            self.roleId = SJionCamp.roleId;
            self.campType = SJionCamp.campType;
            self.selectType = SJionCamp.selectType;
            console.log("S2C_SJionCamp SJionCamp:", SJionCamp);
        };
        return S2C_SJionCamp;
    }());
    hanlder.S2C_SJionCamp = S2C_SJionCamp;
    /**
     * 搜索好友C-->S
     */
    var S2C_SSearchFriend = /** @class */ (function () {
        function S2C_SSearchFriend() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SSearchFriend.read = function (self, data) {
            self.FriendInfoBean = new game.modules.friend.models.InfoBeanVo();
            self.FriendInfoBean.fromByteArray(data);
            console.log("S2C_SSearchFriend++++++++++++++++++++", self.FriendInfoBean);
        };
        return S2C_SSearchFriend;
    }());
    hanlder.S2C_SSearchFriend = S2C_SSearchFriend;
    /**
     *
     */
    var S2C_SUpdateFriendState = /** @class */ (function () {
        function S2C_SUpdateFriendState() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SUpdateFriendState.read = function (self, data) {
            var SUpdateFriendState = Browser.window.SUpdateFriendState.decode(data);
            self.roleid = SUpdateFriendState.roleid;
            self.relation = SUpdateFriendState.relation;
            console.log("S2C_SUpdateFriendState SUpdateFriendState:", SUpdateFriendState);
        };
        return S2C_SUpdateFriendState;
    }());
    hanlder.S2C_SUpdateFriendState = S2C_SUpdateFriendState;
    /**
     *
     */
    var S2C_SRecommendFriend = /** @class */ (function () {
        function S2C_SRecommendFriend() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SRecommendFriend.read = function (self, data) {
            // var SRecommendFriend = Browser.window.SRecommendFriend.decode(data);
            // self.friendInfoBeanList = SRecommendFriend.friendInfoBeanList;
            // console.log("S2C_SRecommendFriend SRecommendFriend:", SRecommendFriend);
            var infoBean;
            self.friendInfoBeanList = new Array();
            var friendInfoBeanListSize = data.readUint8();
            for (var index = 0; index < friendInfoBeanListSize; index++) {
                infoBean = new game.modules.friend.models.InfoBeanVo();
                infoBean.fromByteArray(data);
                self.friendInfoBeanList.push(infoBean);
            } //InfoBean
            console.log("S2C_SRecommendFriend++++++++++++++++++++", self.friendInfoBeanList);
        };
        return S2C_SRecommendFriend;
    }());
    hanlder.S2C_SRecommendFriend = S2C_SRecommendFriend;
    /**
     *
     */
    var S2C_FinishCopyRole = /** @class */ (function () {
        function S2C_FinishCopyRole() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_FinishCopyRole.read = function (self, data) {
            var FinishCopyRole = Browser.window.FinishCopyRole.decode(data);
            self.roleId = FinishCopyRole.roleId;
            console.log("S2C_FinishCopyRole FinishCopyRole:", FinishCopyRole);
        };
        return S2C_FinishCopyRole;
    }());
    hanlder.S2C_FinishCopyRole = S2C_FinishCopyRole;
    //sugq 服务端3
    //SGiveInfoList
    var S2C_give_infolist = /** @class */ (function () {
        function S2C_give_infolist() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_give_infolist.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            var sGiveInfoList = Network._instance.protoTypePool.SGiveInfoList.decode(data);
            self.newGiveNumMap = sGiveInfoList.newGiveNumMap;
            console.log("S2C_give_infolist sGiveInfoList:", sGiveInfoList);
            console.log("S2C_give_infolist sGiveInfoList.newGiveNumMap", sGiveInfoList.newGiveNumMap);
        };
        return S2C_give_infolist;
    }());
    hanlder.S2C_give_infolist = S2C_give_infolist;
    //SGiveItem
    var S2C_give_item = /** @class */ (function () {
        function S2C_give_item() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_give_item.read = function (self, data) {
            self.roleId = data.readLong();
            self.itemNum = data.readByte();
            console.log("S2C_give_item++++++++++++++++++++++++", self.itemNum);
        };
        return S2C_give_item;
    }());
    hanlder.S2C_give_item = S2C_give_item;
    //SGiveGift
    var S2C_give_gift = /** @class */ (function () {
        function S2C_give_gift() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_give_gift.read = function (self, data) {
            self.result = data.readByte();
            console.log("S2C_give_gift+++++++++++++++++++++", self.result);
        };
        return S2C_give_gift;
    }());
    hanlder.S2C_give_gift = S2C_give_gift;
    //SGetSpaceInfo
    var S2C_get_sapceinfo = /** @class */ (function () {
        function S2C_get_sapceinfo() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_get_sapceinfo.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            var sGetSpaceInfo = Network._instance.protoTypePool.SGetSpaceInfo.decode(data);
            self.giftnum = sGetSpaceInfo.giftnum;
            self.popularity = sGetSpaceInfo.popularity;
            self.revnum = sGetSpaceInfo.revnum;
            console.log("S2C_get_sapceinfo SGiveGift:", sGetSpaceInfo);
            console.log("S2C_get_sapceinfo SGiveGift.giftnum", sGetSpaceInfo.giftnum);
            console.log("S2C_get_sapceinfo SGiveGift.popularity", sGetSpaceInfo.popularity);
            console.log("S2C_get_sapceinfo SGiveGift.revnum", sGetSpaceInfo.revnum);
        };
        return S2C_get_sapceinfo;
    }());
    hanlder.S2C_get_sapceinfo = S2C_get_sapceinfo;
    //SSetSpaceGift
    var S2C_set_spacegift = /** @class */ (function () {
        function S2C_set_spacegift() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_set_spacegift.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            var sSetSpaceGift = Network._instance.protoTypePool.SSetSpaceGift.decode(data);
            self.result = sSetSpaceGift.result;
            console.log("S2C_set_spacegift SGiveGift:", sSetSpaceGift);
            console.log("S2C_set_spacegift SGiveGift.result", sSetSpaceGift.result);
        };
        return S2C_set_spacegift;
    }());
    hanlder.S2C_set_spacegift = S2C_set_spacegift;
    //SStepSpace
    var S2C_step_space = /** @class */ (function () {
        function S2C_step_space() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_step_space.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            var sStepSpace = Network._instance.protoTypePool.SStepSpace.decode(data);
            self.result = sStepSpace.result;
            console.log("S2C_step_space sStepSpace:", sStepSpace);
            console.log("S2C_step_space sStepSpace.result", sStepSpace.result);
        };
        return S2C_step_space;
    }());
    hanlder.S2C_step_space = S2C_step_space;
    //SGetRolesLevel
    var S2C_get_roleslevel = /** @class */ (function () {
        function S2C_get_roleslevel() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_get_roleslevel.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            var sGetRolesLevel = Network._instance.protoTypePool.SGetRolesLevel.decode(data);
            self.roleslevel = sGetRolesLevel.roleslevel;
            self.gettype = sGetRolesLevel.gettype;
            console.log("S2C_get_roleslevel sGetRolesLevel:", sGetRolesLevel);
            console.log("S2C_get_roleslevel sGetRolesLevel.roleslevel", sGetRolesLevel.roleslevel);
            console.log("S2C_get_roleslevel sGetRolesLevel.gettype", sGetRolesLevel.gettype);
        };
        return S2C_get_roleslevel;
    }());
    hanlder.S2C_get_roleslevel = S2C_get_roleslevel;
    //SXshSpace
    var S2C_xshSpace = /** @class */ (function () {
        function S2C_xshSpace() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_xshSpace.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            var sXshSpace = Network._instance.protoTypePool.SXshSpace.decode(data);
            self.result = sXshSpace.result;
            console.log("S2C_xshSpace sXshSpace:", sXshSpace);
            console.log("S2C_xshSpace sXshSpace.result", sXshSpace.result);
        };
        return S2C_xshSpace;
    }());
    hanlder.S2C_xshSpace = S2C_xshSpace;
    //SXshGiveGift
    var S2C_xshgivegift = /** @class */ (function () {
        function S2C_xshgivegift() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_xshgivegift.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            var sXshGiveGift = Network._instance.protoTypePool.SXshGiveGift.decode(data);
            self.result = sXshGiveGift.result;
            console.log("S2C_xshgivegift sXshGiveGift:", sXshGiveGift);
            console.log("S2C_xshgivegift sXshGiveGift.result", sXshGiveGift.result);
        };
        return S2C_xshgivegift;
    }());
    hanlder.S2C_xshgivegift = S2C_xshgivegift;
    //SGetXshSpaceInfo
    var S2C_get_xshspaceinfo = /** @class */ (function () {
        function S2C_get_xshspaceinfo() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_get_xshspaceinfo.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            var sGetXshSpaceInfo = Network._instance.protoTypePool.SGetXshSpaceInfo.decode(data);
            self.giftnum = sGetXshSpaceInfo.giftnum;
            self.popularity = sGetXshSpaceInfo.popularity;
            self.revnum = sGetXshSpaceInfo.revnum;
            console.log("S2C_get_xshspaceinfo sGetXshSpaceInfo:", sGetXshSpaceInfo);
            console.log("S2C_get_xshspaceinfo sGetXshSpaceInfo.giftnum", sGetXshSpaceInfo.giftnum);
            console.log("S2C_get_xshspaceinfo sGetXshSpaceInfo.popularity", sGetXshSpaceInfo.popularity);
            console.log("S2C_get_xshspaceinfo sGetXshSpaceInfo.revnum", sGetXshSpaceInfo.revnum);
        };
        return S2C_get_xshspaceinfo;
    }());
    hanlder.S2C_get_xshspaceinfo = S2C_get_xshspaceinfo;
    //SGetRecruitAward
    var S2C_get_recruitAward = /** @class */ (function () {
        function S2C_get_recruitAward() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_get_recruitAward.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            var sGetXshSpaceInfo = Network._instance.protoTypePool.SGetRecruitAward.decode(data);
            self.result = sGetXshSpaceInfo.result;
            self.awardtype = sGetXshSpaceInfo.awardtype;
            self.recruitrole = sGetXshSpaceInfo.recruitrole;
            self.recruitserver = sGetXshSpaceInfo.recruitserver;
            console.log("S2C_get_recruitAward sGetXshSpaceInfo:", sGetXshSpaceInfo);
            console.log("S2C_get_recruitAward sGetXshSpaceInfo.result", sGetXshSpaceInfo.result);
            console.log("S2C_get_recruitAward sGetXshSpaceInfo.awardtype", sGetXshSpaceInfo.awardtype);
            console.log("S2C_get_recruitAward sGetXshSpaceInfo.recruitrole", sGetXshSpaceInfo.recruitrole);
            console.log("S2C_get_recruitAward sGetXshSpaceInfo.recruitserver", sGetXshSpaceInfo.recruitserver);
        };
        return S2C_get_recruitAward;
    }());
    hanlder.S2C_get_recruitAward = S2C_get_recruitAward;
    //SReqRecruitWheel
    var S2C_req_recruitwheel = /** @class */ (function () {
        function S2C_req_recruitwheel() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_req_recruitwheel.read = function (self, data) {
            self.result = data.readInt32();
            console.log("S2C_req_recruitwheel+++++++++++++++++++++++", self.result);
        };
        return S2C_req_recruitwheel;
    }());
    hanlder.S2C_req_recruitwheel = S2C_req_recruitwheel;
    //SBeginRecruitWheel
    var S2C_begin_recruitwheel = /** @class */ (function () {
        function S2C_begin_recruitwheel() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_begin_recruitwheel.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            var sBeginRecruitWheel = Network._instance.protoTypePool.SBeginRecruitWheel.decode(data);
            self.result = sBeginRecruitWheel.result;
            console.log("S2C_begin_recruitwheel sBeginRecruitWheel:", sBeginRecruitWheel);
            console.log("S2C_begin_recruitwheel sBeginRecruitWheel.result", sBeginRecruitWheel.result);
        };
        return S2C_begin_recruitwheel;
    }());
    hanlder.S2C_begin_recruitwheel = S2C_begin_recruitwheel;
    //SSignList
    var S2C_signlist = /** @class */ (function () {
        function S2C_signlist() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_signlist.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            var sSignList = Network._instance.protoTypePool.SSignList.decode(data);
            self.signContentMap = sSignList.signContentMap;
            console.log("S2C_signlist sSignList:", sSignList);
            console.log("S2C_signlist sSignList.signContentMap", sSignList.signContentMap);
        };
        return S2C_signlist;
    }());
    hanlder.S2C_signlist = S2C_signlist;
    //SRequestMarry
    var S2C_request_marry = /** @class */ (function () {
        function S2C_request_marry() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_request_marry.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            var sRequestMarry = Network._instance.protoTypePool.SRequestMarry.decode(data);
            self.result = sRequestMarry.result;
            self.torolename = sRequestMarry.torolename;
            console.log("S2C_request_marry sRequestMarry:", sRequestMarry);
            console.log("S2C_request_marry sRequestMarry.result", sRequestMarry.result);
            console.log("S2C_request_marry sRequestMarry.torolename", sRequestMarry.torolename);
        };
        return S2C_request_marry;
    }());
    hanlder.S2C_request_marry = S2C_request_marry;
    //SRespondMarry
    var S2C_respond_marry = /** @class */ (function () {
        function S2C_respond_marry() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_respond_marry.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            var sRespondMarry = Network._instance.protoTypePool.SRespondMarry.decode(data);
            self.result = sRespondMarry.result;
            console.log("S2C_respond_marry sRespondMarry:", sRespondMarry);
            console.log("S2C_respond_marry sRespondMarry.result", sRespondMarry.result);
        };
        return S2C_respond_marry;
    }());
    hanlder.S2C_respond_marry = S2C_respond_marry;
    //SGetMarriageInfo
    var S2C_get_marriageinfo = /** @class */ (function () {
        function S2C_get_marriageinfo() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_get_marriageinfo.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            var sGetMarriageInfo = Network._instance.protoTypePool.SGetMarriageInfo.decode(data);
            self.toroleid = sGetMarriageInfo.toroleid;
            self.torolename = sGetMarriageInfo.torolename;
            self.marrytime = sGetMarriageInfo.marrytime;
            self.iswedding = sGetMarriageInfo.iswedding;
            self.forcibledivorcerole = sGetMarriageInfo.forcibledivorcerole;
            self.forcibledivorcetime = sGetMarriageInfo.forcibledivorcetime;
            console.log("S2C_get_marriageinfo sGetMarriageInfo:", sGetMarriageInfo);
            console.log("S2C_get_marriageinfo sGetMarriageInfo.toroleid", sGetMarriageInfo.toroleid);
            console.log("S2C_get_marriageinfo sGetMarriageInfo.torolename", sGetMarriageInfo.torolename);
            console.log("S2C_get_marriageinfo sGetMarriageInfo.marrytime", sGetMarriageInfo.marrytime);
            console.log("S2C_get_marriageinfo sGetMarriageInfo.iswedding", sGetMarriageInfo.iswedding);
            console.log("S2C_get_marriageinfo sGetMarriageInfo.forcibledivorcerole", sGetMarriageInfo.forcibledivorcerole);
            console.log("S2C_get_marriageinfo sGetMarriageInfo.forcibledivorcetime", sGetMarriageInfo.forcibledivorcetime);
        };
        return S2C_get_marriageinfo;
    }());
    hanlder.S2C_get_marriageinfo = S2C_get_marriageinfo;
    //SRequestWedding
    var S2C_request_wedding = /** @class */ (function () {
        function S2C_request_wedding() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_request_wedding.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            var sRequestWedding = Network._instance.protoTypePool.SRequestWedding.decode(data);
            self.result = sRequestWedding.result;
            self.weddingtype = sRequestWedding.weddingtype;
            self.weddingtime = sRequestWedding.weddingtime;
            self.roleshape = sRequestWedding.roleshape;
            self.rolecolor1 = sRequestWedding.rolecolor1;
            self.rolecolor2 = sRequestWedding.rolecolor2;
            self.toroleshape = sRequestWedding.toroleshape;
            self.torolecolor1 = sRequestWedding.torolecolor1;
            self.torolecolor2 = sRequestWedding.torolecolor2;
            console.log("S2C_request_wedding sRequestWedding:", sRequestWedding);
            console.log("S2C_request_wedding sRequestWedding.result", sRequestWedding.result);
            console.log("S2C_request_wedding sRequestWedding.weddingtype", sRequestWedding.weddingtype);
            console.log("S2C_request_wedding sRequestWedding.weddingtime", sRequestWedding.weddingtime);
            console.log("S2C_request_wedding sRequestWedding.roleshape", sRequestWedding.roleshape);
            console.log("S2C_request_wedding sRequestWedding.rolecolor1", sRequestWedding.rolecolor1);
            console.log("S2C_request_wedding sRequestWedding.rolecolor2", sRequestWedding.rolecolor2);
            console.log("S2C_request_wedding sRequestWedding.toroleshape", sRequestWedding.toroleshape);
            console.log("S2C_request_wedding sRequestWedding.torolecolor1", sRequestWedding.torolecolor1);
            console.log("S2C_request_wedding sRequestWedding.torolecolor2", sRequestWedding.torolecolor2);
        };
        return S2C_request_wedding;
    }());
    hanlder.S2C_request_wedding = S2C_request_wedding;
    //SInviteFriend
    var S2C_SInviteFriend = /** @class */ (function () {
        function S2C_SInviteFriend() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SInviteFriend.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            var sInviteFriend = Network._instance.protoTypePool.SInviteFriend.decode(data);
            self.weddingid = sInviteFriend.weddingid;
            self.roleid = sInviteFriend.roleid;
            self.rolename = sInviteFriend.rolename;
            self.toroleid = sInviteFriend.toroleid;
            self.torolename = sInviteFriend.torolename;
            self.marrytime = sInviteFriend.marrytime;
            self.weddingtype = sInviteFriend.result;
            self.weddingtime = sInviteFriend.weddingtime;
            self.roleshape = sInviteFriend.roleshape;
            self.rolecolor1 = sInviteFriend.rolecolor1;
            self.rolecolor2 = sInviteFriend.rolecolor2;
            self.toroleshape = sInviteFriend.toroleshape;
            self.torolecolor1 = sInviteFriend.torolecolor1;
            self.torolecolor2 = sInviteFriend.torolecolor2;
            console.log("S2C_SInviteFriend sInviteFriend:", sInviteFriend);
            console.log("S2C_SInviteFriend sInviteFriend.weddingid", sInviteFriend.weddingid);
            console.log("S2C_SInviteFriend sInviteFriend.roleid", sInviteFriend.roleid);
            console.log("S2C_SInviteFriend sInviteFriend.rolename", sInviteFriend.rolename);
            console.log("S2C_SInviteFriend sInviteFriend.toroleid", sInviteFriend.toroleid);
            console.log("S2C_SInviteFriend sInviteFriend.torolename", sInviteFriend.torolename);
            console.log("S2C_SInviteFriend sInviteFriend.marrytime", sInviteFriend.marrytime);
            console.log("S2C_SInviteFriend sInviteFriend.weddingtype", sInviteFriend.weddingtype);
            console.log("S2C_SInviteFriend sInviteFriend.weddingtime", sInviteFriend.weddingtime);
            console.log("S2C_SInviteFriend sInviteFriend.roleshape", sInviteFriend.roleshape);
            console.log("S2C_SInviteFriend sInviteFriend.rolecolor1", sInviteFriend.rolecolor1);
            console.log("S2C_SInviteFriend sInviteFriend.rolecolor2", sInviteFriend.rolecolor2);
            console.log("S2C_SInviteFriend sInviteFriend.toroleshape", sInviteFriend.toroleshape);
            console.log("S2C_SInviteFriend sInviteFriend.torolecolor1", sInviteFriend.torolecolor1);
            console.log("S2C_SInviteFriend sInviteFriend.torolecolor2", sInviteFriend.torolecolor2);
        };
        return S2C_SInviteFriend;
    }());
    hanlder.S2C_SInviteFriend = S2C_SInviteFriend;
    //SWeddingBegin
    var S2C_SWeddingBegin = /** @class */ (function () {
        function S2C_SWeddingBegin() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SWeddingBegin.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            var sWeddingBegin = Network._instance.protoTypePool.SWeddingBegin.decode(data);
            self.realweddingtime = sWeddingBegin.realweddingtime;
            console.log("S2C_SWeddingBegin sWeddingBegin:", sWeddingBegin);
            console.log("S2C_SWeddingBegin sWeddingBegin.realweddingtime", sWeddingBegin.realweddingtime);
        };
        return S2C_SWeddingBegin;
    }());
    hanlder.S2C_SWeddingBegin = S2C_SWeddingBegin;
    //SRespondWeddingInvite
    var S2C_SRespondWeddingInvite = /** @class */ (function () {
        function S2C_SRespondWeddingInvite() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SRespondWeddingInvite.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            var sRespondWeddingInvite = Network._instance.protoTypePool.SRespondWeddingInvite.decode(data);
            self.result = sRespondWeddingInvite.result;
            self.weddingid = sRespondWeddingInvite.weddingid;
            console.log("S2C_SRespondWeddingInvite sRespondWeddingInvite:", sRespondWeddingInvite);
            console.log("S2C_SRespondWeddingInvite sRespondWeddingInvite.result", sRespondWeddingInvite.result);
            console.log("S2C_SRespondWeddingInvite sRespondWeddingInvite.weddingid", sRespondWeddingInvite.weddingid);
        };
        return S2C_SRespondWeddingInvite;
    }());
    hanlder.S2C_SRespondWeddingInvite = S2C_SRespondWeddingInvite;
    //SGiveAsPresent
    var S2C_SGiveAsPresent = /** @class */ (function () {
        function S2C_SGiveAsPresent() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SGiveAsPresent.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            var sGiveAsPresent = Network._instance.protoTypePool.SGiveAsPresent.decode(data);
            self.target = sGiveAsPresent.target;
            self.result = sGiveAsPresent.result;
            console.log("S2C_SGiveAsPresent sGiveAsPresent:", sGiveAsPresent);
            console.log("S2C_SGiveAsPresent sGiveAsPresent.target", sGiveAsPresent.target);
            console.log("S2C_SGiveAsPresent sGiveAsPresent.result", sGiveAsPresent.result);
        };
        return S2C_SGiveAsPresent;
    }());
    hanlder.S2C_SGiveAsPresent = S2C_SGiveAsPresent;
    //SBeginWeddingRoll
    var S2C_SBeginWeddingRoll = /** @class */ (function () {
        function S2C_SBeginWeddingRoll() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SBeginWeddingRoll.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            var sBeginWeddingRoll = Network._instance.protoTypePool.SBeginWeddingRoll.decode(data);
            self.rolltype = sBeginWeddingRoll.rolltype;
            self.roleid = sBeginWeddingRoll.roleid;
            self.rolename = sBeginWeddingRoll.rolename;
            self.rollid = sBeginWeddingRoll.rollid;
            console.log("SBeginWeddingRoll sBeginWeddingRoll:", sBeginWeddingRoll);
            console.log("SBeginWeddingRoll sBeginWeddingRoll.rolltype", sBeginWeddingRoll.rolltype);
            console.log("SBeginWeddingRoll sBeginWeddingRoll.roleid", sBeginWeddingRoll.roleid);
            console.log("SBeginWeddingRoll sBeginWeddingRoll.rolename", sBeginWeddingRoll.rolename);
            console.log("SBeginWeddingRoll sBeginWeddingRoll.rollid", sBeginWeddingRoll.rollid);
        };
        return S2C_SBeginWeddingRoll;
    }());
    hanlder.S2C_SBeginWeddingRoll = S2C_SBeginWeddingRoll;
    //SWeddingEnd
    var S2C_SWeddingEnd = /** @class */ (function () {
        function S2C_SWeddingEnd() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SWeddingEnd.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            var sWeddingEnd = Network._instance.protoTypePool.SWeddingEnd.decode(data);
            self.weddingid = sWeddingEnd.weddingid;
            console.log("SBeginWeddingRoll sBeginWeddingRoll:", sWeddingEnd);
            console.log("SBeginWeddingRoll sBeginWeddingRoll.weddingid", sWeddingEnd.weddingid);
        };
        return S2C_SWeddingEnd;
    }());
    hanlder.S2C_SWeddingEnd = S2C_SWeddingEnd;
    //SRequestForcibleDivorce
    var S2C_SRequestForcibleDivorce = /** @class */ (function () {
        function S2C_SRequestForcibleDivorce() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SRequestForcibleDivorce.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            var sRequestForcibleDivorce = Network._instance.protoTypePool.SRequestForcibleDivorce.decode(data);
            self.result = sRequestForcibleDivorce.result;
            console.log("SRequestForcibleDivorce sBeginWeddingRoll:", sRequestForcibleDivorce);
            console.log("SRequestForcibleDivorce sBeginWeddingRoll.result", sRequestForcibleDivorce.result);
        };
        return S2C_SRequestForcibleDivorce;
    }());
    hanlder.S2C_SRequestForcibleDivorce = S2C_SRequestForcibleDivorce;
    //SRefuseForcibleDivorce
    var S2C_SRefuseForcibleDivorce = /** @class */ (function () {
        function S2C_SRefuseForcibleDivorce() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SRefuseForcibleDivorce.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            var sRequestForcibleDivorce = Network._instance.protoTypePool.SRefuseForcibleDivorce.decode(data);
            self.result = sRequestForcibleDivorce.result;
            console.log("SRefuseForcibleDivorce sBeginWeddingRoll:", sRequestForcibleDivorce);
            console.log("SRefuseForcibleDivorce sBeginWeddingRoll.result", sRequestForcibleDivorce.result);
        };
        return S2C_SRefuseForcibleDivorce;
    }());
    hanlder.S2C_SRefuseForcibleDivorce = S2C_SRefuseForcibleDivorce;
    //SCancelForcibleDivorce
    var S2C_SCancelForcibleDivorce = /** @class */ (function () {
        function S2C_SCancelForcibleDivorce() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SCancelForcibleDivorce.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            var sCancelForcibleDivorce = Network._instance.protoTypePool.SCancelForcibleDivorce.decode(data);
            self.result = sCancelForcibleDivorce.result;
            console.log("SCancelForcibleDivorce sBeginWeddingRoll:", sCancelForcibleDivorce);
            console.log("SCancelForcibleDivorce sBeginWeddingRoll.result", sCancelForcibleDivorce.result);
        };
        return S2C_SCancelForcibleDivorce;
    }());
    hanlder.S2C_SCancelForcibleDivorce = S2C_SCancelForcibleDivorce;
    //SConfirmForcibleDivorce
    var S2C_SConfirmForcibleDivorce = /** @class */ (function () {
        function S2C_SConfirmForcibleDivorce() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SConfirmForcibleDivorce.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            var sConfirmForcibleDivorce = Network._instance.protoTypePool.SConfirmForcibleDivorce.decode(data);
            self.result = sConfirmForcibleDivorce.result;
            self.torolename = sConfirmForcibleDivorce.torolename;
            console.log("SConfirmForcibleDivorce sBeginWeddingRoll:", sConfirmForcibleDivorce);
            console.log("SConfirmForcibleDivorce sBeginWeddingRoll.result", sConfirmForcibleDivorce.result);
            console.log("SConfirmForcibleDivorce sBeginWeddingRoll.torolename", sConfirmForcibleDivorce.torolename);
        };
        return S2C_SConfirmForcibleDivorce;
    }());
    hanlder.S2C_SConfirmForcibleDivorce = S2C_SConfirmForcibleDivorce;
    //SRequestPeacefulDivorce
    var S2C_SRequestPeacefulDivorce = /** @class */ (function () {
        function S2C_SRequestPeacefulDivorce() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SRequestPeacefulDivorce.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            var sRequestPeacefulDivorce = Network._instance.protoTypePool.SRequestPeacefulDivorce.decode(data);
            self.result = sRequestPeacefulDivorce.result;
            self.torolename = sRequestPeacefulDivorce.torolename;
            console.log("SRequestPeacefulDivorce sBeginWeddingRoll:", sRequestPeacefulDivorce);
            console.log("SRequestPeacefulDivorce sBeginWeddingRoll.result", sRequestPeacefulDivorce.result);
            console.log("SRequestPeacefulDivorce sBeginWeddingRoll.torolename", sRequestPeacefulDivorce.torolename);
        };
        return S2C_SRequestPeacefulDivorce;
    }());
    hanlder.S2C_SRequestPeacefulDivorce = S2C_SRequestPeacefulDivorce;
    //SRespondPeacefulDivorce
    var S2C_SRespondPeacefulDivorce = /** @class */ (function () {
        function S2C_SRespondPeacefulDivorce() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SRespondPeacefulDivorce.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            var sRespondPeacefulDivorce = Network._instance.protoTypePool.SRespondPeacefulDivorce.decode(data);
            self.result = sRespondPeacefulDivorce.result;
            console.log("SRespondPeacefulDivorce sBeginWeddingRoll:", sRespondPeacefulDivorce);
            console.log("SRespondPeacefulDivorce sBeginWeddingRoll.result", sRespondPeacefulDivorce.result);
        };
        return S2C_SRespondPeacefulDivorce;
    }());
    hanlder.S2C_SRespondPeacefulDivorce = S2C_SRespondPeacefulDivorce;
    //SGetMarriageSkillInfo
    var S2C_SGetMarriageSkillInfo = /** @class */ (function () {
        function S2C_SGetMarriageSkillInfo() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SGetMarriageSkillInfo.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            var sGetMarriageSkillInfo = Network._instance.protoTypePool.SGetMarriageSkillInfo.decode(data);
            self.marriageskills = sGetMarriageSkillInfo.marriageskills;
            console.log("SGetMarriageSkillInfo sGetMarriageSkillInfo:", sGetMarriageSkillInfo);
            console.log("SGetMarriageSkillInfo sGetMarriageSkillInfo.marriageskills", sGetMarriageSkillInfo.marriageskills);
        };
        return S2C_SGetMarriageSkillInfo;
    }());
    hanlder.S2C_SGetMarriageSkillInfo = S2C_SGetMarriageSkillInfo;
    //SStudyMarriageSkill
    var S2C_SStudyMarriageSkill = /** @class */ (function () {
        function S2C_SStudyMarriageSkill() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SStudyMarriageSkill.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            var sStudyMarriageSkill = Network._instance.protoTypePool.SStudyMarriageSkill.decode(data);
            self.result = sStudyMarriageSkill.result;
            console.log("SStudyMarriageSkill sStudyMarriageSkill:", sStudyMarriageSkill);
            console.log("SStudyMarriageSkill sStudyMarriageSkill.result", sStudyMarriageSkill.result);
        };
        return S2C_SStudyMarriageSkill;
    }());
    hanlder.S2C_SStudyMarriageSkill = S2C_SStudyMarriageSkill;
    //SRefreshMarriageMission
    var S2C_SRefreshMarriageMission = /** @class */ (function () {
        function S2C_SRefreshMarriageMission() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SRefreshMarriageMission.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            var sRefreshMarriageMission = Network._instance.protoTypePool.SRefreshMarriageMission.decode(data);
            self.id = sRefreshMarriageMission.id;
            self.kind = sRefreshMarriageMission.kind;
            self.isdual = sRefreshMarriageMission.isdual;
            self.state = sRefreshMarriageMission.state;
            self.dstitemid = sRefreshMarriageMission.dstitemid;
            self.dstitemnum = sRefreshMarriageMission.dstitemnum;
            self.dstnpckey = sRefreshMarriageMission.dstnpckey;
            self.dstnpcid = sRefreshMarriageMission.dstnpcid;
            self.dstmapid = sRefreshMarriageMission.dstmapid;
            self.dstx = sRefreshMarriageMission.dstx;
            self.dsty = sRefreshMarriageMission.dsty;
            self.extparam = sRefreshMarriageMission.extparam;
            self.accepttime = sRefreshMarriageMission.accepttime;
            self.count = sRefreshMarriageMission.count;
            console.log("SRefreshMarriageMission sRefreshMarriageMission:", sRefreshMarriageMission);
            console.log("SRefreshMarriageMission sRefreshMarriageMission.id", sRefreshMarriageMission.id);
            console.log("SRefreshMarriageMission sRefreshMarriageMission.kind", sRefreshMarriageMission.kind);
            console.log("SRefreshMarriageMission sRefreshMarriageMission.isdual", sRefreshMarriageMission.isdual);
            console.log("SRefreshMarriageMission sRefreshMarriageMission.state", sRefreshMarriageMission.state);
            console.log("SRefreshMarriageMission sRefreshMarriageMission.dstitemid", sRefreshMarriageMission.dstitemid);
            console.log("SRefreshMarriageMission sRefreshMarriageMission.dstitemnum", sRefreshMarriageMission.dstitemnum);
            console.log("SRefreshMarriageMission sRefreshMarriageMission.dstnpckey", sRefreshMarriageMission.dstnpckey);
            console.log("SRefreshMarriageMission sRefreshMarriageMission.dstnpcid", sRefreshMarriageMission.dstnpcid);
            console.log("SRefreshMarriageMission sRefreshMarriageMission.dstmapid", sRefreshMarriageMission.dstmapid);
            console.log("SRefreshMarriageMission sRefreshMarriageMission.dstx", sRefreshMarriageMission.dstx);
            console.log("SRefreshMarriageMission sRefreshMarriageMission.dsty", sRefreshMarriageMission.dsty);
            console.log("SRefreshMarriageMission sRefreshMarriageMission.extparam", sRefreshMarriageMission.extparam);
            console.log("SRefreshMarriageMission sRefreshMarriageMission.accepttime", sRefreshMarriageMission.accepttime);
            console.log("SRefreshMarriageMission sRefreshMarriageMission.count", sRefreshMarriageMission.count);
        };
        return S2C_SRefreshMarriageMission;
    }());
    hanlder.S2C_SRefreshMarriageMission = S2C_SRefreshMarriageMission;
    var S2C_SReqFushiNum = /** @class */ (function () {
        function S2C_SReqFushiNum() {
        }
        S2C_SReqFushiNum.read = function (self, data) {
            self.num = data.readInt32();
            self.bindNum = data.readInt32();
            self.totalnum = data.readInt32();
        };
        return S2C_SReqFushiNum;
    }());
    hanlder.S2C_SReqFushiNum = S2C_SReqFushiNum;
    var S2C_SReqCharge = /** @class */ (function () {
        function S2C_SReqCharge() {
        }
        S2C_SReqCharge.read = function (self, data) {
            self.goods = [];
            var goodsSize = data.readUint8();
            var goodInfo;
            for (var index = 0; index < goodsSize; index++) {
                goodInfo = new game.modules.shop.models.GoodInfoVo();
                goodInfo.fromByteArray(data);
                self.goods.push(goodInfo);
            }
            self.opendy = data.readInt32();
        };
        return S2C_SReqCharge;
    }());
    hanlder.S2C_SReqCharge = S2C_SReqCharge;
    //SConfirmCharge
    var S2C_SConfirmCharge = /** @class */ (function () {
        function S2C_SConfirmCharge() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SConfirmCharge.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            var sConfirmCharge = Network._instance.protoTypePool.SConfirmCharge.decode(data);
            self.billid = sConfirmCharge.billid;
            self.goodid = sConfirmCharge.goodid;
            self.goodnum = sConfirmCharge.goodnum;
            self.goodname = sConfirmCharge.goodname;
            self.price = sConfirmCharge.price;
            self.serverid = sConfirmCharge.serverid;
            self.extra = sConfirmCharge.extra;
            console.log("SConfirmCharge sConfirmCharge:", sConfirmCharge);
            console.log("SConfirmCharge sConfirmCharge.billid", sConfirmCharge.billid);
            console.log("SConfirmCharge sConfirmCharge.goodid", sConfirmCharge.goodid);
            console.log("SConfirmCharge sConfirmCharge.goodnum", sConfirmCharge.goodnum);
            console.log("SConfirmCharge sConfirmCharge.goodname", sConfirmCharge.goodname);
            console.log("SConfirmCharge sConfirmCharge.price", sConfirmCharge.price);
            console.log("SConfirmCharge sConfirmCharge.serverid", sConfirmCharge.serverid);
            console.log("SConfirmCharge sConfirmCharge.extra", sConfirmCharge.extra);
        };
        return S2C_SConfirmCharge;
    }());
    hanlder.S2C_SConfirmCharge = S2C_SConfirmCharge;
    //SRefreshChargeState
    var S2C_SRefreshChargeState = /** @class */ (function () {
        function S2C_SRefreshChargeState() {
        }
        S2C_SRefreshChargeState.read = function (self, data) {
            self.state = data.readInt32();
            self.flag = data.readInt32();
        };
        return S2C_SRefreshChargeState;
    }());
    hanlder.S2C_SRefreshChargeState = S2C_SRefreshChargeState;
    //SRspServerId
    var S2C_SRspServerId = /** @class */ (function () {
        function S2C_SRspServerId() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SRspServerId.read = function (self, data) {
            self.serverid = data.readInt32();
            self.flag = data.readInt32();
            console.log("S2C_SRspServerId++++++++++++++++++++++++++++++", self.serverid);
        };
        return S2C_SRspServerId;
    }());
    hanlder.S2C_SRspServerId = S2C_SRspServerId;
    //SRequestChargeReturnProfit
    var S2C_SRequestChargeReturnProfit = /** @class */ (function () {
        function S2C_SRequestChargeReturnProfit() {
        }
        S2C_SRequestChargeReturnProfit.read = function (self, data) {
            self.listchargereturnprofit = [];
            var listchargereturnprofitSize = data.readUint8();
            var chargeReturnProfit;
            for (var index = 0; index < listchargereturnprofitSize; index++) {
                chargeReturnProfit = new game.modules.shop.models.ChargeReturnProfitVo();
                chargeReturnProfit.fromByteArray(data);
                self.listchargereturnprofit.push(chargeReturnProfit);
            }
        };
        return S2C_SRequestChargeReturnProfit;
    }());
    hanlder.S2C_SRequestChargeReturnProfit = S2C_SRequestChargeReturnProfit;
    //SGrabChargeReturnProfitReward
    var S2C_SGrabChargeReturnProfitReward = /** @class */ (function () {
        function S2C_SGrabChargeReturnProfitReward() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SGrabChargeReturnProfitReward.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            var sGrabChargeReturnProfitReward = Network._instance.protoTypePool.SGrabChargeReturnProfitReward.decode(data);
            self.id = sGrabChargeReturnProfitReward.id;
            self.state = sGrabChargeReturnProfitReward.state;
            console.log("SGrabChargeReturnProfitReward sGrabChargeReturnProfitReward:", sGrabChargeReturnProfitReward);
            console.log("SGrabChargeReturnProfitReward sGrabChargeReturnProfitReward.id", sGrabChargeReturnProfitReward.id);
            console.log("SGrabChargeReturnProfitReward sGrabChargeReturnProfitReward.state", sGrabChargeReturnProfitReward.state);
        };
        return S2C_SGrabChargeReturnProfitReward;
    }());
    hanlder.S2C_SGrabChargeReturnProfitReward = S2C_SGrabChargeReturnProfitReward;
    //SReqChargeRefundsInfo
    var S2C_SReqChargeRefundsInfo = /** @class */ (function () {
        function S2C_SReqChargeRefundsInfo() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SReqChargeRefundsInfo.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            var sReqChargeRefundsInfo = Network._instance.protoTypePool.SReqChargeRefundsInfo.decode(data);
            self.result = sReqChargeRefundsInfo.result;
            self.chargevalue = sReqChargeRefundsInfo.chargevalue;
            self.charge = sReqChargeRefundsInfo.charge;
            console.log("SReqChargeRefundsInfo sReqChargeRefundsInfo:", sReqChargeRefundsInfo);
            console.log("SReqChargeRefundsInfo sReqChargeRefundsInfo.result", sReqChargeRefundsInfo.result);
            console.log("SReqChargeRefundsInfo sReqChargeRefundsInfo.chargevalue", sReqChargeRefundsInfo.chargevalue);
            console.log("SReqChargeRefundsInfo sReqChargeRefundsInfo.charge", sReqChargeRefundsInfo.charge);
        };
        return S2C_SReqChargeRefundsInfo;
    }());
    hanlder.S2C_SReqChargeRefundsInfo = S2C_SReqChargeRefundsInfo;
    //SGetChargeRefunds
    var S2C_SGetChargeRefunds = /** @class */ (function () {
        function S2C_SGetChargeRefunds() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SGetChargeRefunds.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            var sGetChargeRefunds = Network._instance.protoTypePool.SGetChargeRefunds.decode(data);
            self.result = sGetChargeRefunds.result;
            console.log("SGetChargeRefunds sGetChargeRefunds:", sGetChargeRefunds);
            console.log("SGetChargeRefunds sGetChargeRefunds.result", sGetChargeRefunds.result);
        };
        return S2C_SGetChargeRefunds;
    }());
    hanlder.S2C_SGetChargeRefunds = S2C_SGetChargeRefunds;
    //SSendVipInfo   
    var S2C_SSendVipInfo = /** @class */ (function () {
        function S2C_SSendVipInfo() {
        }
        S2C_SSendVipInfo.read = function (self, data) {
            self.vipexp = data.readInt32();
            self.viplevel = data.readInt32();
            self.bounus = data.readInt32();
            self.gotbounus = data.readInt32();
            self.viprights = [];
            var viprightsSize = data.readUint8();
            for (var index = 0; index < viprightsSize; index++) {
                self.viprights.push(data.readInt32());
            }
        };
        return S2C_SSendVipInfo;
    }());
    hanlder.S2C_SSendVipInfo = S2C_SSendVipInfo;
    //SReqFushiInfo
    var S2C_SReqFushiInfo = /** @class */ (function () {
        function S2C_SReqFushiInfo() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SReqFushiInfo.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            var sReqFushiInfo = Network._instance.protoTypePool.SReqFushiInfo.decode(data);
            self.balance = sReqFushiInfo.balance;
            self.genbalance = sReqFushiInfo.genbalance;
            self.firstsave = sReqFushiInfo.firstsave;
            self.saveamt = sReqFushiInfo.saveamt;
            console.log("SReqFushiInfo sReqFushiInfo:", sReqFushiInfo);
            console.log("SReqFushiInfo sReqFushiInfo.balance", sReqFushiInfo.balance);
            console.log("SReqFushiInfo sReqFushiInfo.genbalance", sReqFushiInfo.genbalance);
            console.log("SReqFushiInfo sReqFushiInfo.firstsave", sReqFushiInfo.firstsave);
            console.log("SReqFushiInfo sReqFushiInfo.saveamt", sReqFushiInfo.saveamt);
        };
        return S2C_SReqFushiInfo;
    }());
    hanlder.S2C_SReqFushiInfo = S2C_SReqFushiInfo;
    //SSendRedPackView   查看玩家红包记录
    var S2C_SSendRedPackView = /** @class */ (function () {
        function S2C_SSendRedPackView() {
        }
        S2C_SSendRedPackView.read = function (self, data) {
            self.modeltype = data.readInt32();
            self.firstpageflag = data.readInt32();
            self.redpackinfolist = new Array();
            var mapSize = ByteArrayUtils.uncompact_uint32(data);
            var info_list;
            console.log("--------------------开始读红包列表数据！----------------------------------------");
            for (var index = 0; index < mapSize; index++) {
                info_list = new RedPackInfoVo();
                info_list.fromByteArray(data);
                self.redpackinfolist.push(info_list);
            }
            self.daysrnum = new SRRedPackNumVo();
            self.daysrnum.fromByteArray(data);
        };
        return S2C_SSendRedPackView;
    }());
    hanlder.S2C_SSendRedPackView = S2C_SSendRedPackView;
    //SSendRedPack  发送红包成功返回
    var S2C_SSendRedPack = /** @class */ (function () {
        function S2C_SSendRedPack() {
        }
        S2C_SSendRedPack.read = function (self, data) {
            console.log("--------------------发送红包成功！-------------------------");
        };
        return S2C_SSendRedPack;
    }());
    hanlder.S2C_SSendRedPack = S2C_SSendRedPack;
    //SGetRedPack 领取红包
    var S2C_SGetRedPack = /** @class */ (function () {
        function S2C_SGetRedPack() {
        }
        S2C_SGetRedPack.read = function (self, data) {
            self.modeltype = data.readInt32();
            data.readInt8();
            self.redpackid = ByteArrayUtils.readUtf16String(data);
            self.state = data.readInt();
            self.successflag = data.readInt();
            self.fushinum = data.readInt();
        };
        return S2C_SGetRedPack;
    }());
    hanlder.S2C_SGetRedPack = S2C_SGetRedPack;
    //SSendRedPackHisView  查看红包被领取的情况
    var S2C_SSendRedPackHisView = /** @class */ (function () {
        function S2C_SSendRedPackHisView() {
        }
        S2C_SSendRedPackHisView.read = function (self, data) {
            self.modeltype = data.readInt32();
            data.readUint8();
            self.redpackid = ByteArrayUtils.readUtf16String(data);
            self.redpackdes = ByteArrayUtils.readUtf16String(data);
            self.redpackallnum = data.readInt32();
            self.redpackallmoney = data.readInt32();
            self.time = data.readLong();
            self.redpackrolehisinfolist = new Array();
            var mapSize = ByteArrayUtils.uncompact_uint32(data);
            var info_list;
            console.log("--------------------开始读红包被领取情况的数据！----------------------------------------");
            for (var index = 0; index < mapSize; index++) {
                info_list = new RedPackRoleHisInfoVo();
                info_list.fromByteArray(data);
                self.redpackrolehisinfolist.push(info_list);
            }
        };
        return S2C_SSendRedPackHisView;
    }());
    hanlder.S2C_SSendRedPackHisView = S2C_SSendRedPackHisView;
    //SSendRedPackRoleRecordView  查看个人红包记录
    var S2C_SSendRedPackRoleRecordView = /** @class */ (function () {
        function S2C_SSendRedPackRoleRecordView() {
        }
        S2C_SSendRedPackRoleRecordView.read = function (self, data) {
            self.modeltype = data.readInt32();
            self.firstpageflag = data.readInt32();
            self.redpackallnum = data.readInt32();
            self.redpackallmoney = data.readLong();
            self.redpackallfushi = data.readLong();
            self.redpackrolerecord = new Array();
            var mapSize = ByteArrayUtils.uncompact_uint32(data);
            var record;
            for (var index = 0; index < mapSize; index++) {
                record = new RedPackRoleRecordVo();
                record.fromByteArray(data);
                self.redpackrolerecord.push(record);
            }
        };
        return S2C_SSendRedPackRoleRecordView;
    }());
    hanlder.S2C_SSendRedPackRoleRecordView = S2C_SSendRedPackRoleRecordView;
    //SNoticeRedPack  系统推送红包信息
    var S2C_SNoticeRedPack = /** @class */ (function () {
        function S2C_SNoticeRedPack() {
        }
        S2C_SNoticeRedPack.read = function (self, data) {
            var tipVo;
            tipVo = new RedPackRoleTipVo();
            tipVo.fromByteArray(data);
            self.redpackroletip = tipVo;
        };
        return S2C_SNoticeRedPack;
    }());
    hanlder.S2C_SNoticeRedPack = S2C_SNoticeRedPack;
    //SNoticeRedPackList  玩家上线，系统推送红包信息
    var S2C_SNoticeRedPackList = /** @class */ (function () {
        function S2C_SNoticeRedPackList() {
        }
        S2C_SNoticeRedPackList.read = function (self, data) {
            self.redpackroletiplist = [];
            var mapSize = ByteArrayUtils.uncompact_uint32(data);
            var tipVo;
            for (var index = 0; index < mapSize; index++) {
                tipVo = new RedPackRoleTipVo();
                tipVo.fromByteArray(data);
                self.redpackroletiplist.push(tipVo);
            }
        };
        return S2C_SNoticeRedPackList;
    }());
    hanlder.S2C_SNoticeRedPackList = S2C_SNoticeRedPackList;
    //SPayServerType
    var S2C_SPayServerType = /** @class */ (function () {
        function S2C_SPayServerType() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SPayServerType.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            var sPayServerType = Network._instance.protoTypePool.SPayServerType.decode(data);
            self.paytype = sPayServerType.paytype;
            self.opendy = sPayServerType.opendy;
            console.log("SPayServerType sPayServerType:", sPayServerType);
            console.log("SPayServerType sPayServerType.paytype", sPayServerType.paytype);
            console.log("SPayServerType sPayServerType.opendy", sPayServerType.opendy);
        };
        return S2C_SPayServerType;
    }());
    hanlder.S2C_SPayServerType = S2C_SPayServerType;
    //SHaveDayPay
    var S2C_SHaveDayPay = /** @class */ (function () {
        function S2C_SHaveDayPay() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SHaveDayPay.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            var sHaveDayPay = Network._instance.protoTypePool.SHaveDayPay.decode(data);
            self.daypay = sHaveDayPay.daypay;
            console.log("SHaveDayPay sHaveDayPay:", sHaveDayPay);
            console.log("SHaveDayPay sHaveDayPay.daypay", sHaveDayPay.daypay);
        };
        return S2C_SHaveDayPay;
    }());
    hanlder.S2C_SHaveDayPay = S2C_SHaveDayPay;
    //SQueryConsumeDayPay
    var S2C_SQueryConsumeDayPay = /** @class */ (function () {
        function S2C_SQueryConsumeDayPay() {
        }
        //public optcode:number = 0;
        //public optname:string = "onCreateRole";
        //public daypay: number;//
        /**
        从输入二进制流中读取结构体
        */
        S2C_SQueryConsumeDayPay.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            var sQueryConsumeDayPay = Network._instance.protoTypePool.SQueryConsumeDayPay.decode(data);
            //self.daypay = sQueryConsumeDayPay.daypay;
            console.log("SQueryConsumeDayPay sHaveDayPay:", sQueryConsumeDayPay);
            //console.log("SQueryConsumeDayPay sHaveDayPay.daypay",sQueryConsumeDayPay.daypay);
        };
        return S2C_SQueryConsumeDayPay;
    }());
    hanlder.S2C_SQueryConsumeDayPay = S2C_SQueryConsumeDayPay;
    //SConsumeDayPay
    var S2C_SConsumeDayPay = /** @class */ (function () {
        function S2C_SConsumeDayPay() {
        }
        //public optcode:number = 0;
        //public optname:string = "onCreateRole";
        //public daypay: number;//
        /**
        从输入二进制流中读取结构体
        */
        S2C_SConsumeDayPay.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            var sConsumeDayPay = Network._instance.protoTypePool.SConsumeDayPay.decode(data);
            //self.daypay = sConsumeDayPay.daypay;
            console.log("SConsumeDayPay sHaveDayPay:", sConsumeDayPay);
            //console.log("SQueryConsumeDayPay sHaveDayPay.daypay",sConsumeDayPay.daypay);
        };
        return S2C_SConsumeDayPay;
    }());
    hanlder.S2C_SConsumeDayPay = S2C_SConsumeDayPay;
    //SQuerySubscribeInfo
    var S2C_SQuerySubscribeInfo = /** @class */ (function () {
        function S2C_SQuerySubscribeInfo() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SQuerySubscribeInfo.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            var sQuerySubscribeInfo = Network._instance.protoTypePool.SQuerySubscribeInfo.decode(data);
            self.subscribetime = sQuerySubscribeInfo.subscribetime;
            self.expiretime = sQuerySubscribeInfo.expiretime;
            console.log("SQuerySubscribeInfo sQuerySubscribeInfo:", sQuerySubscribeInfo);
            console.log("SQuerySubscribeInfo sQuerySubscribeInfo.subscribetime", sQuerySubscribeInfo.subscribetime);
            console.log("SQuerySubscribeInfo sQuerySubscribeInfo.expiretime", sQuerySubscribeInfo.expiretime);
        };
        return S2C_SQuerySubscribeInfo;
    }());
    hanlder.S2C_SQuerySubscribeInfo = S2C_SQuerySubscribeInfo;
    //SBuySpotCard
    var S2C_SBuySpotCard = /** @class */ (function () {
        function S2C_SBuySpotCard() {
        }
        //public optcode:number = 0;
        //public optname:string = "onCreateRole";
        //public subscribetime: number;//
        /**
        从输入二进制流中读取结构体
        */
        S2C_SBuySpotCard.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            var sBuySpotCard = Network._instance.protoTypePool.SBuySpotCard.decode(data);
            // self.subscribetime = sBuySpotCard.subscribetime;
            // self.expiretime = sBuySpotCard.expiretime;
            console.log("SBuySpotCard sBuySpotCard:", sBuySpotCard);
            // console.log("SBuySpotCard sBuySpotCard.subscribetime",sBuySpotCard.subscribetime);
            // console.log("SBuySpotCard sBuySpotCard.expiretime",sBuySpotCard.expiretime);
        };
        return S2C_SBuySpotCard;
    }());
    hanlder.S2C_SBuySpotCard = S2C_SBuySpotCard;
    //SSellSpotCard
    var S2C_SSellSpotCard = /** @class */ (function () {
        function S2C_SSellSpotCard() {
        }
        //public optcode:number = 0;
        //public optname:string = "onCreateRole";
        //public subscribetime: number;//
        /**
        从输入二进制流中读取结构体
        */
        S2C_SSellSpotCard.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            var sSellSpotCard = Network._instance.protoTypePool.SSellSpotCard.decode(data);
            // self.subscribetime = sBuySpotCard.subscribetime;
            // self.expiretime = sBuySpotCard.expiretime;
            console.log("SSellSpotCard sBuySpotCard:", sSellSpotCard);
            // console.log("SSellSpotCard sBuySpotCard.subscribetime",sBuySpotCard.subscribetime);
            // console.log("SSellSpotCard sBuySpotCard.expiretime",sBuySpotCard.expiretime);
        };
        return S2C_SSellSpotCard;
    }());
    hanlder.S2C_SSellSpotCard = S2C_SSellSpotCard;
    //STradingSpotCardView
    var S2C_STradingSpotCardView = /** @class */ (function () {
        function S2C_STradingSpotCardView() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_STradingSpotCardView.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            var sTradingSpotCardView = Network._instance.protoTypePool.STradingSpotCardView.decode(data);
            self.sellspotcardinfolist = sTradingSpotCardView.sellspotcardinfolist;
            self.buyspotcardinfolist = sTradingSpotCardView.buyspotcardinfolist;
            console.log("STradingSpotCardView sTradingSpotCardView:", sTradingSpotCardView);
            console.log("STradingSpotCardView sTradingSpotCardView.sellspotcardinfolist", sTradingSpotCardView.sellspotcardinfolist);
            console.log("STradingSpotCardView sTradingSpotCardView.buyspotcardinfolist", sTradingSpotCardView.buyspotcardinfolist);
        };
        return S2C_STradingSpotCardView;
    }());
    hanlder.S2C_STradingSpotCardView = S2C_STradingSpotCardView;
    //SRoleTradingView
    var S2C_SRoleTradingView = /** @class */ (function () {
        function S2C_SRoleTradingView() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SRoleTradingView.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            var sRoleTradingView = Network._instance.protoTypePool.SRoleTradingView.decode(data);
            self.sellspotcardinfolist = sRoleTradingView.sellspotcardinfolist;
            self.buyspotcardinfolist = sRoleTradingView.buyspotcardinfolist;
            console.log("SRoleTradingView sRoleTradingView:", sRoleTradingView);
            console.log("SRoleTradingView sRoleTradingView.sellspotcardinfolist", sRoleTradingView.sellspotcardinfolist);
            console.log("SRoleTradingView sRoleTradingView.buyspotcardinfolist", sRoleTradingView.buyspotcardinfolist);
        };
        return S2C_SRoleTradingView;
    }());
    hanlder.S2C_SRoleTradingView = S2C_SRoleTradingView;
    //SRoleTradingRecordView
    var S2C_SRoleTradingRecordView = /** @class */ (function () {
        function S2C_SRoleTradingRecordView() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SRoleTradingRecordView.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            var sRoleTradingRecordView = Network._instance.protoTypePool.SRoleTradingRecordView.decode(data);
            self.roletradingrecordlist = sRoleTradingRecordView.roletradingrecordlist;
            console.log("SRoleTradingRecordView sRoleTradingRecordView:", sRoleTradingRecordView);
            console.log("SRoleTradingRecordView sRoleTradingRecordView.roletradingrecordlist", sRoleTradingRecordView.roletradingrecordlist);
        };
        return S2C_SRoleTradingRecordView;
    }());
    hanlder.S2C_SRoleTradingRecordView = S2C_SRoleTradingRecordView;
    //SCancelTrading
    var S2C_SCancelTrading = /** @class */ (function () {
        function S2C_SCancelTrading() {
        }
        //public optcode:number = 0;
        //public optname:string = "onCreateRole";
        //public roletradingrecordlist: Array<any>;//
        /**
        从输入二进制流中读取结构体
        */
        S2C_SCancelTrading.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            var sCancelTrading = Network._instance.protoTypePool.SCancelTrading.decode(data);
            //self.roletradingrecordlist = sCancelTrading.roletradingrecordlist;
            console.log("SCancelTrading sCancelTrading:", sCancelTrading);
            //console.log("SCancelTrading sCancelTrading.roletradingrecordlist",sCancelTrading.roletradingrecordlist);
        };
        return S2C_SCancelTrading;
    }());
    hanlder.S2C_SCancelTrading = S2C_SCancelTrading;
    //STradingOpenState
    var S2C_STradingOpenState = /** @class */ (function () {
        function S2C_STradingOpenState() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_STradingOpenState.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            var sTradingOpenState = Network._instance.protoTypePool.STradingOpenState.decode(data);
            self.openstate = sTradingOpenState.openstate;
            console.log("STradingOpenState sTradingOpenState:", sTradingOpenState);
            console.log("STradingOpenState sTradingOpenState.openstate", sTradingOpenState.openstate);
        };
        return S2C_STradingOpenState;
    }());
    hanlder.S2C_STradingOpenState = S2C_STradingOpenState;
    //SMonthCard
    var S2C_SMonthCard = /** @class */ (function () {
        function S2C_SMonthCard() {
        }
        S2C_SMonthCard.read = function (self, data) {
            self.endtime = data.readLong();
            self.grab = data.readInt32();
        };
        return S2C_SMonthCard;
    }());
    hanlder.S2C_SMonthCard = S2C_SMonthCard;
    //SBeginSchoolWheel
    var S2C_SBeginSchoolWheel = /** @class */ (function () {
        function S2C_SBeginSchoolWheel() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SBeginSchoolWheel.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            // var sBeginSchoolWheel = Network._instance.protoTypePool.SBeginSchoolWheel.decode(data);
            // self.wheelindex = sBeginSchoolWheel.wheelindex;
            // console.log("SBeginSchoolWheel sBeginSchoolWheel:",sBeginSchoolWheel);
            // console.log("SBeginSchoolWheel sBeginSchoolWheel.wheelindex",sBeginSchoolWheel.wheelindex);
            self.wheelindex = data.readUint32();
            console.log("S2C_SBeginSchoolWheel+++++++++++++++++++++", self.wheelindex);
        };
        return S2C_SBeginSchoolWheel;
    }());
    hanlder.S2C_SBeginSchoolWheel = S2C_SBeginSchoolWheel;
    //SBeginXueYueWheel
    var S2C_SBeginXueYueWheel = /** @class */ (function () {
        function S2C_SBeginXueYueWheel() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SBeginXueYueWheel.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            var sBeginXueYueWheel = Network._instance.protoTypePool.SBeginXueYueWheel.decode(data);
            self.wheelindex = sBeginXueYueWheel.wheelindex;
            console.log("SBeginXueYueWheel sBeginXueYueWheel:", sBeginXueYueWheel);
            console.log("SBeginXueYueWheel sBeginXueYueWheel.wheelindex", sBeginXueYueWheel.wheelindex);
        };
        return S2C_SBeginXueYueWheel;
    }());
    hanlder.S2C_SBeginXueYueWheel = S2C_SBeginXueYueWheel;
    //SUseXueYueKey
    var S2C_SUseXueYueKey = /** @class */ (function () {
        function S2C_SUseXueYueKey() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SUseXueYueKey.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            var sUseXueYueKey = Network._instance.protoTypePool.SUseXueYueKey.decode(data);
            self.npckid = sUseXueYueKey.npckid;
            self.npckey = sUseXueYueKey.npckey;
            self.mapid = sUseXueYueKey.mapid;
            self.xpos = sUseXueYueKey.xpos;
            self.ypos = sUseXueYueKey.ypos;
            console.log("SUseXueYueKey sUseXueYueKey:", sUseXueYueKey);
            console.log("SUseXueYueKey sUseXueYueKey.npckid", sUseXueYueKey.npckid);
            console.log("SUseXueYueKey sUseXueYueKey.npckey", sUseXueYueKey.npckey);
            console.log("SUseXueYueKey sUseXueYueKey.mapid", sUseXueYueKey.mapid);
            console.log("SUseXueYueKey sUseXueYueKey.xpos", sUseXueYueKey.xpos);
            console.log("SUseXueYueKey sUseXueYueKey.ypos", sUseXueYueKey.ypos);
        };
        return S2C_SUseXueYueKey;
    }());
    hanlder.S2C_SUseXueYueKey = S2C_SUseXueYueKey;
    //SRoleAccusation
    var S2C_SRoleAccusation = /** @class */ (function () {
        function S2C_SRoleAccusation() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SRoleAccusation.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            var sRoleAccusation = Network._instance.protoTypePool.SRoleAccusation.decode(data);
            self.isbereported = sRoleAccusation.isbereported;
            console.log("SRoleAccusation sRoleAccusation:", sRoleAccusation);
            console.log("SRoleAccusation sRoleAccusation.isbereported", sRoleAccusation.isbereported);
        };
        return S2C_SRoleAccusation;
    }());
    hanlder.S2C_SRoleAccusation = S2C_SRoleAccusation;
    //SRoleAccusationCheck
    var S2C_SRoleAccusationCheck = /** @class */ (function () {
        function S2C_SRoleAccusationCheck() {
        }
        S2C_SRoleAccusationCheck.read = function (self, data) {
            self.errorcode = data.readUint32();
            console.log("S2C_SRoleAccusationCheck+++++++++++++++++++++++++", self.errorcode);
        };
        return S2C_SRoleAccusationCheck;
    }());
    hanlder.S2C_SRoleAccusationCheck = S2C_SRoleAccusationCheck;
    //SRefreshRoleHookData
    var S2C_SRefreshRoleHookData = /** @class */ (function () {
        function S2C_SRefreshRoleHookData() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SRefreshRoleHookData.read = function (self, data) {
            //self.sessionkey = bytes. readString ();	
            //self.sign = bytes. readString ();
            //self.version = bytes. readString ();		
            var sRefreshRoleHookData = Network._instance.protoTypePool.SRefreshRoleHookData.decode(data);
            self.RoleHookData = sRefreshRoleHookData.RoleHookData;
            console.log("SRefreshRoleHookData sRefreshRoleHookData:", sRefreshRoleHookData);
            console.log("SRefreshRoleHookData sRefreshRoleHookData.RoleHookData", sRefreshRoleHookData.RoleHookData);
        };
        return S2C_SRefreshRoleHookData;
    }());
    hanlder.S2C_SRefreshRoleHookData = S2C_SRefreshRoleHookData;
    //SRefreshRoleHookBattleData
    var S2C_SRefreshRoleHookBattleData = /** @class */ (function () {
        function S2C_SRefreshRoleHookBattleData() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SRefreshRoleHookBattleData.read = function (self, data) {
            self.RoleHookBattleData = new game.modules.guaji.models.HookBattleDataVo();
            self.RoleHookBattleData.fromByteArray(data);
        };
        return S2C_SRefreshRoleHookBattleData;
    }());
    hanlder.S2C_SRefreshRoleHookBattleData = S2C_SRefreshRoleHookBattleData;
    //SRefreshRoleHookExpData
    var S2C_SRefreshRoleHookExpData = /** @class */ (function () {
        function S2C_SRefreshRoleHookExpData() {
        }
        S2C_SRefreshRoleHookExpData.read = function (self, data) {
            self.RoleHookExpData = new game.modules.activity.models.RoleHookExpVo();
            self.RoleHookExpData.fromByteArray(data);
        };
        return S2C_SRefreshRoleHookExpData;
    }());
    hanlder.S2C_SRefreshRoleHookExpData = S2C_SRefreshRoleHookExpData;
    //SFlushRoleFightAI
    var S2C_SFlushRoleFightAI = /** @class */ (function () {
        function S2C_SFlushRoleFightAI() {
        }
        /**
        从输入二进制流中读取结构体
        */
        S2C_SFlushRoleFightAI.read = function (self, data) {
            self.fightaiids = [];
            var dataSize = ByteArrayUtils.uncompact_uint32(data);
            for (var i = 0; i < dataSize; i++) {
                self.fightaiids.push(data.readInt32());
            }
        };
        return S2C_SFlushRoleFightAI;
    }());
    hanlder.S2C_SFlushRoleFightAI = S2C_SFlushRoleFightAI;
    //sugq服务端4
    //-------------CKL
    //--------------------CKL---------------------------------------------
    var S2C_title_err = /** @class */ (function () {
        function S2C_title_err() {
        }
        S2C_title_err.read = function (self, data) {
            var sTitleErr = Network._instance.protoTypePool.STitleErr.decode(data);
            self.titleerr = sTitleErr.titleerr;
            console.log("S2C_title_err sTitleErr:", sTitleErr);
            console.log("S2C_title_err sTitleErr.titleerr", sTitleErr.titleerr);
        };
        return S2C_title_err;
    }());
    hanlder.S2C_title_err = S2C_title_err;
    var S2C_off_title = /** @class */ (function () {
        function S2C_off_title() {
        }
        S2C_off_title.read = function (self, data) {
            self.roleid = ByteArrayUtils.readLong(data);
            ;
        };
        return S2C_off_title;
    }());
    hanlder.S2C_off_title = S2C_off_title;
    var S2C_on_title = /** @class */ (function () {
        function S2C_on_title() {
        }
        S2C_on_title.read = function (self, data) {
            self.roleid = ByteArrayUtils.readLong(data);
            self.titleid = data.readInt32();
            self.titlename = ByteArrayUtils.readUtf16String(data);
        };
        return S2C_on_title;
    }());
    hanlder.S2C_on_title = S2C_on_title;
    var S2C_remove_title = /** @class */ (function () {
        function S2C_remove_title() {
        }
        S2C_remove_title.read = function (self, data) {
            var sRemoveTitle = Network._instance.protoTypePool.SRemoveTitle.decode(data);
            self.titleid = sRemoveTitle.titleid;
            console.log("S2C_remove_title sRemoveTitle:", sRemoveTitle);
            console.log("S2C_remove_title sRemoveTitle.titleid", sRemoveTitle.titleid);
        };
        return S2C_remove_title;
    }());
    hanlder.S2C_remove_title = S2C_remove_title;
    var S2C_add_title = /** @class */ (function () {
        function S2C_add_title() {
        }
        S2C_add_title.read = function (self, data) {
            var RoleTitleVo;
            RoleTitleVo = new game.modules.bag.models.RoleTitleVo();
            RoleTitleVo.fromByteArray(data);
            self.Titleinfo = RoleTitleVo;
        };
        return S2C_add_title;
    }());
    hanlder.S2C_add_title = S2C_add_title;
    var S2C_request_clanfightteamrolenum = /** @class */ (function () {
        function S2C_request_clanfightteamrolenum() {
        }
        S2C_request_clanfightteamrolenum.read = function (self, data) {
            var sRequestClanFightTeamRoleNum = Network._instance.protoTypePool.SRequestClanFightTeamRoleNum.decode(data);
            self.teamnum = sRequestClanFightTeamRoleNum.teamnum;
            self.rolenum = sRequestClanFightTeamRoleNum.rolenum;
            console.log("S2C_request_clanfightteamrolenum sRequestClanFightTeamRoleNum:", sRequestClanFightTeamRoleNum);
            console.log("S2C_request_clanfightteamrolenum sRequestClanFightTeamRoleNum.teamnum", sRequestClanFightTeamRoleNum.teamnum);
            console.log("S2C_request_clanfightteamrolenum sRequestClanFightTeamRoleNum.rolenum", sRequestClanFightTeamRoleNum.rolenum);
        };
        return S2C_request_clanfightteamrolenum;
    }());
    hanlder.S2C_request_clanfightteamrolenum = S2C_request_clanfightteamrolenum;
    var S2C_request_clanfightrolelist = /** @class */ (function () {
        function S2C_request_clanfightrolelist() {
        }
        S2C_request_clanfightrolelist.read = function (self, data) {
            var sRequestClanFightRoleList = Network._instance.protoTypePool.SRequestClanFightRoleList.decode(data);
            self.isfresh = sRequestClanFightRoleList.isfresh;
            self.rolelist = sRequestClanFightRoleList.rolelist;
            self.ret = sRequestClanFightRoleList.ret;
            console.log("S2C_request_clanfightrolelist sRequestClanFightRoleList:", sRequestClanFightRoleList);
            console.log("S2C_request_clanfightrolelist sRequestClanFightRoleList.isfresh", sRequestClanFightRoleList.isfresh);
            console.log("S2C_request_clanfightrolelist sRequestClanFightRoleList.rolelist", sRequestClanFightRoleList.rolelist);
            console.log("S2C_request_clanfightrolelist sRequestClanFightRoleList.ret", sRequestClanFightRoleList.ret);
        };
        return S2C_request_clanfightrolelist;
    }());
    hanlder.S2C_request_clanfightrolelist = S2C_request_clanfightrolelist;
    var S2C_request_clanfightteamlist = /** @class */ (function () {
        function S2C_request_clanfightteamlist() {
        }
        S2C_request_clanfightteamlist.read = function (self, data) {
            var sRequestClanFightTeamList = Network._instance.protoTypePool.SRequestClanFightTeamList.decode(data);
            self.isfresh = sRequestClanFightTeamList.isfresh;
            self.teamlist = sRequestClanFightTeamList.teamlist;
            self.ret = sRequestClanFightTeamList.ret;
            console.log("S2C_request_clanfightteamlist sRequestClanFightTeamList:", sRequestClanFightTeamList);
            console.log("S2C_request_clanfightteamlist sRequestClanFightTeamList.isfresh", sRequestClanFightTeamList.isfresh);
            console.log("S2C_request_clanfightteamlist sRequestClanFightTeamList.teamlist", sRequestClanFightTeamList.teamlist);
            console.log("S2C_request_clanfightteamlist sRequestClanFightTeamList.ret", sRequestClanFightTeamList.ret);
        };
        return S2C_request_clanfightteamlist;
    }());
    hanlder.S2C_request_clanfightteamlist = S2C_request_clanfightteamlist;
    var S2C_formations_map = /** @class */ (function () {
        function S2C_formations_map() {
        }
        S2C_formations_map.read = function (self, data) {
            self.formationMap = new Laya.Dictionary();
            var formationMapSize = data.readUint8();
            var formBean;
            for (var index = 0; index < formationMapSize; index++) {
                formBean = new game.modules.huoban.models.FormBeanVo();
                self.formationMap.set(data.readUint32(), formBean);
                formBean.fromByteArray(data);
            }
        };
        return S2C_formations_map;
    }());
    hanlder.S2C_formations_map = S2C_formations_map;
    var S2C_set_myformation = /** @class */ (function () {
        function S2C_set_myformation() {
        }
        S2C_set_myformation.read = function (self, data) {
            console.log("S2C_set_myformation ----------------:");
        };
        return S2C_set_myformation;
    }());
    hanlder.S2C_set_myformation = S2C_set_myformation;
    var S2C_set_teamformation = /** @class */ (function () {
        function S2C_set_teamformation() {
        }
        S2C_set_teamformation.read = function (self, data) {
            self.SetTeamFormation = new game.modules.team.models.SetTeamFormationVo();
            self.SetTeamFormation.fromByteArray(data);
        };
        return S2C_set_teamformation;
    }());
    hanlder.S2C_set_teamformation = S2C_set_teamformation;
    var S2C_one_teamrollmelonunfo = /** @class */ (function () {
        function S2C_one_teamrollmelonunfo() {
        }
        S2C_one_teamrollmelonunfo.read = function (self, data) {
            console.log("S2C_one_teamrollmelonunfo ---------------:");
        };
        return S2C_one_teamrollmelonunfo;
    }());
    hanlder.S2C_one_teamrollmelonunfo = S2C_one_teamrollmelonunfo;
    var S2C_team_rollmeloninfo = /** @class */ (function () {
        function S2C_team_rollmeloninfo() {
        }
        S2C_team_rollmeloninfo.read = function (self, data) {
            self.melonid = data.readLong();
            self.rollinfolist = [];
            var rollinfolistSize = data.readUint8();
            var roleRollInfo;
            for (var index = 0; index < rollinfolistSize; index++) {
                roleRollInfo = new game.modules.team.models.RoleRollInfoVo();
                roleRollInfo.fromByteArray(data);
                self.rollinfolist.push(roleRollInfo);
            }
            self.grabroleid = data.readLong();
            self.grabrolename = data.readUTFBytes(data.readUint8());
            self.melonitemlist = [];
            var melonitemlistSize = data.readUint8();
            var melonItemBagInfo;
            for (var index = 0; index < melonitemlistSize; index++) {
                melonItemBagInfo = new game.modules.team.models.MelonItemBagInfoVo();
                melonItemBagInfo.fromByteArray(data);
                self.melonitemlist.push(melonItemBagInfo);
            }
        };
        return S2C_team_rollmeloninfo;
    }());
    hanlder.S2C_team_rollmeloninfo = S2C_team_rollmeloninfo;
    var S2C_team_rollmelon = /** @class */ (function () {
        function S2C_team_rollmelon() {
        }
        S2C_team_rollmelon.read = function (self, data) {
            self.melonlist = [];
            var melonlistSize = data.readUint8();
            var rollMelon;
            for (var index = 0; index < melonlistSize; index++) {
                rollMelon = new game.modules.team.models.RollMelonVo();
                rollMelon.fromByteArray(data);
                self.melonlist.push(rollMelon);
            }
            self.watcher = data.readInt32();
        };
        return S2C_team_rollmelon;
    }());
    hanlder.S2C_team_rollmelon = S2C_team_rollmelon;
    var S2C_one_keyapplyteaminfo = /** @class */ (function () {
        function S2C_one_keyapplyteaminfo() {
        }
        S2C_one_keyapplyteaminfo.read = function (self, data) {
            self.teamid = ByteArrayUtils.readLong(data);
            self.memberlist = new Array();
            var size = ByteArrayUtils.uncompact_uint32(data);
            for (var index = 0; index < size; index++) {
                var teamMemberSimpleVo = new game.modules.team.models.TeamMemberSimpleVo;
                teamMemberSimpleVo.fromByteArray(data);
                self.memberlist.push(teamMemberSimpleVo);
            }
        };
        return S2C_one_keyapplyteaminfo;
    }());
    hanlder.S2C_one_keyapplyteaminfo = S2C_one_keyapplyteaminfo;
    var S2C_request_haveteam = /** @class */ (function () {
        function S2C_request_haveteam() {
        }
        S2C_request_haveteam.read = function (self, data) {
            console.log("S2C_request_haveteam ---------------:");
        };
        return S2C_request_haveteam;
    }());
    hanlder.S2C_request_haveteam = S2C_request_haveteam;
    var S2C_request_matchinfo = /** @class */ (function () {
        function S2C_request_matchinfo() {
        }
        S2C_request_matchinfo.read = function (self, data) {
            self.teammatchnum = data.readInt32();
            self.playermatchnum = data.readInt32();
        };
        return S2C_request_matchinfo;
    }());
    hanlder.S2C_request_matchinfo = S2C_request_matchinfo;
    var S2C_force_invitejointteam = /** @class */ (function () {
        function S2C_force_invitejointteam() {
        }
        S2C_force_invitejointteam.read = function (self, data) {
            self.roleid = ByteArrayUtils.readLong(data);
        };
        return S2C_force_invitejointteam;
    }());
    hanlder.S2C_force_invitejointteam = S2C_force_invitejointteam;
    var S2C_request_teammatchlist = /** @class */ (function () {
        function S2C_request_teammatchlist() {
            this.tteamlist = [];
        }
        // <variable name="ret" type="int"/> 错误返回0正确1目标错误2数量错误3其他未知错误 by changhao
        // <variable name="targetid" type="int" /> 目标ID by changhao
        // <variable name="teamlist" type="list" value="TeamInfoBasicWithMembers"/> 一个队伍简单信息 by changhao
        S2C_request_teammatchlist.read = function (self, data) {
            self.ret = data.readInt32();
            self.targetid = data.readInt32();
            var teamListSize = data.readUint8();
            // let teamInfoBasicVo : game.modules.team.models.TeamInfoBasicVo; //obj
            // teamInfoBasicVo =  new game.modules.team.models.TeamInfoBasicVo();
            // let teamMemberSimple : game.modules.team.models.TeamMemberSimpleVo;//list
            // teamMemberSimple =  new game.modules.team.models.TeamMemberSimpleVo();
            var teamInfoBasicWithMembersVo;
            /** 最外面这一层的长度 */
            for (var teamListIndex = 0; teamListIndex < teamListSize; teamListIndex++) {
                teamInfoBasicWithMembersVo = new game.modules.team.models.TeamInfoBasicWithMembersVo();
                // let status : number;
                // teamInfoBasicVo.fromByteArray(data);
                // let teamMemberSimpleSize = data.readUint8();
                // for (var teamMemberSimpleIndex = 0; teamMemberSimpleIndex < teamMemberSimpleSize; teamMemberSimpleIndex++) 
                // {
                // 	teamMemberSimple.roleid = ByteArrayUtils.readLong(data);
                // 	teamMemberSimple.rolename = ByteArrayUtils.readUtf16String(data);
                // 	teamMemberSimple.level  = data.readInt32();
                // 	teamMemberSimple.school  = data.readInt32();
                // 	teamMemberSimple.shape  = data.readInt32();
                // }
                // status = data.readInt32();
                teamInfoBasicWithMembersVo.fromByteArray(data);
                self.tteamlist.push(teamInfoBasicWithMembersVo);
            }
        };
        return S2C_request_teammatchlist;
    }());
    hanlder.S2C_request_teammatchlist = S2C_request_teammatchlist;
    var S2C_one_keyteammatch = /** @class */ (function () {
        function S2C_one_keyteammatch() {
        }
        S2C_one_keyteammatch.read = function (self, data) {
            self.ret = data.readInt32();
        };
        return S2C_one_keyteammatch;
    }());
    hanlder.S2C_one_keyteammatch = S2C_one_keyteammatch;
    var S2C_stop_teammatch = /** @class */ (function () {
        function S2C_stop_teammatch() {
        }
        S2C_stop_teammatch.read = function (self, data) {
        };
        return S2C_stop_teammatch;
    }());
    hanlder.S2C_stop_teammatch = S2C_stop_teammatch;
    var S2C_update_teammembercomponent = /** @class */ (function () {
        function S2C_update_teammembercomponent() {
        }
        S2C_update_teammembercomponent.read = function (self, data) {
            console.log("S2C_update_teammembercomponent --------------------:");
        };
        return S2C_update_teammembercomponent;
    }());
    hanlder.S2C_update_teammembercomponent = S2C_update_teammembercomponent;
    var S2C_request_teammatch = /** @class */ (function () {
        function S2C_request_teammatch() {
        }
        S2C_request_teammatch.read = function (self, data) {
            self.requestTeamMatchVo = new game.modules.team.models.RequestTeamMatchVo();
            self.requestTeamMatchVo.fromByteArray(data);
        };
        return S2C_request_teammatch;
    }());
    hanlder.S2C_request_teammatch = S2C_request_teammatch;
    var S2C_respond_invite = /** @class */ (function () {
        function S2C_respond_invite() {
        }
        S2C_respond_invite.read = function (self, data) {
            console.log("S2C_respond_invite ----------------:");
        };
        return S2C_respond_invite;
    }());
    hanlder.S2C_respond_invite = S2C_respond_invite;
    var S2C_update_teammemberbasic = /** @class */ (function () {
        function S2C_update_teammemberbasic() {
        }
        S2C_update_teammemberbasic.read = function (self, data) {
            var TeamMemberBasicVo;
            TeamMemberBasicVo = new game.modules.team.models.TeamMemberBasicVo();
            TeamMemberBasicVo.fromByteArray(data);
            self.data = TeamMemberBasicVo;
        };
        return S2C_update_teammemberbasic;
    }());
    hanlder.S2C_update_teammemberbasic = S2C_update_teammemberbasic;
    var S2C_set_teamstate = /** @class */ (function () {
        function S2C_set_teamstate() {
        }
        S2C_set_teamstate.read = function (self, data) {
            console.log("S2C_set_teamstate ------------------------:");
        };
        return S2C_set_teamstate;
    }());
    hanlder.S2C_set_teamstate = S2C_set_teamstate;
    //SRequestSetLeaderSucc
    var S2C_request_setleadersucc = /** @class */ (function () {
        function S2C_request_setleadersucc() {
        }
        S2C_request_setleadersucc.read = function (self, data) {
            self.inviteeId = ByteArrayUtils.readLong(data);
        };
        return S2C_request_setleadersucc;
    }());
    hanlder.S2C_request_setleadersucc = S2C_request_setleadersucc;
    var S2C_invite_joinsucc = /** @class */ (function () {
        function S2C_invite_joinsucc() {
        }
        S2C_invite_joinsucc.read = function (self, data) {
            self.roleId = data.readLong();
        };
        return S2C_invite_joinsucc;
    }());
    hanlder.S2C_invite_joinsucc = S2C_invite_joinsucc;
    var S2C_send_singlecharacterlist = /** @class */ (function () {
        function S2C_send_singlecharacterlist() {
        }
        S2C_send_singlecharacterlist.read = function (self, data) {
            console.log("S2C_send_singlecharacterlist--------------------------");
        };
        return S2C_send_singlecharacterlist;
    }());
    hanlder.S2C_send_singlecharacterlist = S2C_send_singlecharacterlist;
    var S2C_update_memberposition = /** @class */ (function () {
        function S2C_update_memberposition() {
        }
        S2C_update_memberposition.read = function (self, data) {
            console.log("S2C_update_memberposition---------------------------0");
        };
        return S2C_update_memberposition;
    }());
    hanlder.S2C_update_memberposition = S2C_update_memberposition;
    var S2C_reques_tjoinsucc = /** @class */ (function () {
        function S2C_reques_tjoinsucc() {
        }
        S2C_reques_tjoinsucc.read = function (self, data) {
            self.rolename = ByteArrayUtils.readUtf16String(data);
        };
        return S2C_reques_tjoinsucc;
    }());
    hanlder.S2C_reques_tjoinsucc = S2C_reques_tjoinsucc;
    //STeamError
    var S2C_team_error = /** @class */ (function () {
        function S2C_team_error() {
        }
        S2C_team_error.read = function (self, data) {
            self.teamError = data.readUint32();
        };
        return S2C_team_error;
    }());
    hanlder.S2C_team_error = S2C_team_error;
    var S2C_member_sequence = /** @class */ (function () {
        function S2C_member_sequence() {
            this.teamMemeberIdList = [];
        }
        S2C_member_sequence.read = function (self, data) {
            var memeberSize = ByteArrayUtils.uncompact_uint32(data);
            for (var memeberIndex = 0; memeberIndex < memeberSize; memeberIndex++) {
                self.teamMemeberIdList.push(ByteArrayUtils.readLong(data));
            }
        };
        return S2C_member_sequence;
    }());
    hanlder.S2C_member_sequence = S2C_member_sequence;
    var S2C_dismiss_team = /** @class */ (function () {
        function S2C_dismiss_team() {
        }
        S2C_dismiss_team.read = function (self, data) {
        };
        return S2C_dismiss_team;
    }());
    hanlder.S2C_dismiss_team = S2C_dismiss_team;
    var S2C_set_teamlevel = /** @class */ (function () {
        function S2C_set_teamlevel() {
        }
        S2C_set_teamlevel.read = function (self, data) {
            console.log("S2C_set_teamlevel :------------------");
        };
        return S2C_set_teamlevel;
    }());
    hanlder.S2C_set_teamlevel = S2C_set_teamlevel;
    var S2C_update_membermaxhpmp = /** @class */ (function () {
        function S2C_update_membermaxhpmp() {
        }
        S2C_update_membermaxhpmp.read = function (self, data) {
            self.roleid = ByteArrayUtils.readLong(data);
            self.maxhp = data.readInt32();
            self.maxmp = data.readInt32();
        };
        return S2C_update_membermaxhpmp;
    }());
    hanlder.S2C_update_membermaxhpmp = S2C_update_membermaxhpmp;
    var S2C_update_memberhpmp = /** @class */ (function () {
        function S2C_update_memberhpmp() {
        }
        S2C_update_memberhpmp.read = function (self, data) {
            self.roleid = ByteArrayUtils.readLong(data);
            self.hp = data.readInt32();
            self.mp = data.readInt32();
        };
        return S2C_update_memberhpmp;
    }());
    hanlder.S2C_update_memberhpmp = S2C_update_memberhpmp;
    var S2C_update_memberlevel = /** @class */ (function () {
        function S2C_update_memberlevel() {
        }
        S2C_update_memberlevel.read = function (self, data) {
            console.log("S2C_update_memberlevel------------------------");
            self.roleid = ByteArrayUtils.readLong(data);
            self.level = data.readInt32();
        };
        return S2C_update_memberlevel;
    }());
    hanlder.S2C_update_memberlevel = S2C_update_memberlevel;
    var S2C_update_memberstate = /** @class */ (function () {
        function S2C_update_memberstate() {
        }
        S2C_update_memberstate.read = function (self, data) {
            self.roleid = ByteArrayUtils.readLong(data);
            self.state = data.readInt32();
        };
        return S2C_update_memberstate;
    }());
    hanlder.S2C_update_memberstate = S2C_update_memberstate;
    var S2C_askfor_callback = /** @class */ (function () {
        function S2C_askfor_callback() {
        }
        S2C_askfor_callback.read = function (self, data) {
            self.leaderid = ByteArrayUtils.readLong(data);
        };
        return S2C_askfor_callback;
    }());
    hanlder.S2C_askfor_callback = S2C_askfor_callback;
    var S2C_askfor_setleader = /** @class */ (function () {
        function S2C_askfor_setleader() {
        }
        S2C_askfor_setleader.read = function (self, data) {
            self.leaderid = ByteArrayUtils.readLong(data);
        };
        return S2C_askfor_setleader;
    }());
    hanlder.S2C_askfor_setleader = S2C_askfor_setleader;
    var S2C_swap_member = /** @class */ (function () {
        function S2C_swap_member() {
        }
        S2C_swap_member.read = function (self, data) {
            console.log("S2C_swap_member ---------------");
        };
        return S2C_swap_member;
    }());
    hanlder.S2C_swap_member = S2C_swap_member;
    var S2C_invite_jointeam = /** @class */ (function () {
        function S2C_invite_jointeam() {
        }
        S2C_invite_jointeam.read = function (self, data) {
            self.inviteJoinTeamVo = new game.modules.team.models.InviteJoinTeamVo();
            self.inviteJoinTeamVo.fromByteArray(data);
        };
        return S2C_invite_jointeam;
    }());
    hanlder.S2C_invite_jointeam = S2C_invite_jointeam;
    //SSetTeamLeader
    var S2C_set_teamleader = /** @class */ (function () {
        function S2C_set_teamleader() {
        }
        S2C_set_teamleader.read = function (self, data) {
            self.leaderId = ByteArrayUtils.readLong(data);
        };
        return S2C_set_teamleader;
    }());
    hanlder.S2C_set_teamleader = S2C_set_teamleader;
    var S2C_absent_returnteam = /** @class */ (function () {
        function S2C_absent_returnteam() {
        }
        S2C_absent_returnteam.read = function (self, data) {
            console.log("S2C_absent_returnteam---------------------");
        };
        return S2C_absent_returnteam;
    }());
    hanlder.S2C_absent_returnteam = S2C_absent_returnteam;
    /** 服务器返回 删除申请者 */
    var S2C_remove_teamapply = /** @class */ (function () {
        function S2C_remove_teamapply() {
            this.applyids = [];
        }
        S2C_remove_teamapply.read = function (self, data) {
            var memberSize = ByteArrayUtils.uncompact_uint32(data);
            for (var memberIndex = 0; memberIndex < memberSize; memberIndex++) {
                var memberid = ByteArrayUtils.readLong(data);
                self.applyids.push(memberid);
            }
        };
        return S2C_remove_teamapply;
    }());
    hanlder.S2C_remove_teamapply = S2C_remove_teamapply;
    var S2C_remove_teamMember = /** @class */ (function () {
        function S2C_remove_teamMember() {
            this.memberids = [];
        }
        S2C_remove_teamMember.read = function (self, data) {
            var memberSize = ByteArrayUtils.uncompact_uint32(data);
            for (var memberIndex = 0; memberIndex < memberSize; memberIndex++) {
                var memberid = ByteArrayUtils.readLong(data);
                self.memberids.push(memberid);
            }
        };
        return S2C_remove_teamMember;
    }());
    hanlder.S2C_remove_teamMember = S2C_remove_teamMember;
    var S2C_add_teamapply = /** @class */ (function () {
        function S2C_add_teamapply() {
            this.applylist = [];
        }
        S2C_add_teamapply.read = function (self, data) {
            self.applySize = ByteArrayUtils.uncompact_uint32(data);
            var TeamApplyBasicVo;
            TeamApplyBasicVo = new game.modules.team.models.TeamApplyBasicVo();
            for (var applyIndex = 0; applyIndex < self.applySize; applyIndex++) {
                TeamApplyBasicVo.fromByteArray(data);
                self.applylist.push(TeamApplyBasicVo);
            }
        };
        return S2C_add_teamapply;
    }());
    hanlder.S2C_add_teamapply = S2C_add_teamapply;
    var S2C_add_teammember = /** @class */ (function () {
        function S2C_add_teammember() {
        }
        S2C_add_teammember.read = function (self, data) {
            self.memberlist = new Array();
            self.teamSize = ByteArrayUtils.uncompact_uint32(data);
            // let teamMemberBasicVo :game.modules.team.models.TeamMemberBasicVo; 
            for (var index = 0; index < self.teamSize; index++) {
                self.teamMemberBasicVo = new game.modules.team.models.TeamMemberBasicVo();
                self.teamMemberBasicVo.fromByteArray(data);
                self.memberlist.push(self.teamMemberBasicVo);
            }
        };
        return S2C_add_teammember;
    }());
    hanlder.S2C_add_teammember = S2C_add_teammember;
    var S2C_create_team = /** @class */ (function () {
        function S2C_create_team() {
        }
        S2C_create_team.read = function (self, data) {
            self.sCreateTeamVo = new game.modules.team.models.SCreateTeamVo();
            self.sCreateTeamVo.fromByteArray(data);
        };
        return S2C_create_team;
    }());
    hanlder.S2C_create_team = S2C_create_team;
    var S2C_chat_helpresult = /** @class */ (function () {
        function S2C_chat_helpresult() {
        }
        S2C_chat_helpresult.read = function (self, data) {
            var sChatHelpResult = Network._instance.protoTypePool.SChatHelpResult.decode(data);
            self.result = sChatHelpResult.result;
            console.log("S2C_chat_helpresult sChatHelpResult:", sChatHelpResult);
            console.log("S2C_chat_helpresult sChatHelpResult.result", sChatHelpResult.result);
        };
        return S2C_chat_helpresult;
    }());
    hanlder.S2C_chat_helpresult = S2C_chat_helpresult;
    var S2C_exp_messagetips = /** @class */ (function () {
        function S2C_exp_messagetips() {
        }
        S2C_exp_messagetips.read = function (self, data) {
            self.messageid = data.readUint32();
            self.expvalue = data.readLong();
            var mapSize = data.readUint8();
            self.messageinfo = new Laya.Dictionary();
            for (var index = 0; index < mapSize; index++) {
                self.messageinfo.set(data.readUint32(), data.readLong());
            }
            console.log("S2C_exp_messagetips+++++++++++++++++++", self.expvalue);
        };
        return S2C_exp_messagetips;
    }());
    hanlder.S2C_exp_messagetips = S2C_exp_messagetips;
    var S2C_chatItem_tips = /** @class */ (function () {
        function S2C_chatItem_tips() {
            this.tips = {}; //
        }
        S2C_chatItem_tips.read = function (self, data) {
            var displayInfoVo;
            var foodIteamTipsVo;
            var PetItemTipsVo;
            self.tipsVo = new game.modules.strengThening.models.TipsVo();
            self.foodVo = new game.modules.strengThening.models.FoodVo();
            self.mapVo = new game.modules.strengThening.models.ArchMapVo();
            self.EnhancementVo = new game.modules.strengThening.models.EnhancementVo();
            // let displayinfosSize:number = data.readUint8();
            displayInfoVo = new game.modules.chat.models.DisplayInfoVo();
            self.displaytype = data.readUint32();
            self.roleid = data.readLong();
            self.shopid = data.readLong();
            self.counterid = data.readUint32();
            self.uniqid = data.readUint32();
            self.teamid = data.readLong();
            self.crosstt = data.readLong();
            self.serverid = data.readLong();
            self.displayinfos = displayInfoVo;
            var roleId = LoginModel.getInstance().roleDetail.roleid;
            if (roleId == self.roleid) { /** 自己 */
                if (self.displaytype == 1) {
                    var bag1 = BagModel.getInstance().getBagGameItemData(BagTypes.BAG);
                    var items1 = bag1.items;
                    for (var i = 0; i < items1.length; i++) {
                        var key = items1[i].key;
                        if (key == self.uniqid) {
                            var id = items1[i].id;
                            if (120000 <= id && id <= 126675 || 140000 <= id && id <= 140005 || 10000 <= id && id <= 10009) { //装备
                                self.tipsVo.fromByteArray(data);
                                self.tips = self.tipsVo;
                            }
                            else if (111000 <= id && id <= 111053) { /** 普通物品 */
                                self.foodVo.fromByteArray(data);
                                self.tips = self.foodVo;
                            }
                            else if (100000 <= id && id <= 107044 || 330100 <= id && id <= 340074) { /** 装备的附魔 */
                                if (101100 <= id && id <= 101108) {
                                    self.EnhancementVo.fromByteArray(data);
                                    self.tips = self.EnhancementVo;
                                }
                                else if (id == 101200 || id == 101201) { /** 地图 */
                                    self.mapVo.fromByteArray(data);
                                    self.tips = self.mapVo;
                                }
                            }
                        }
                    }
                } /** 宠物类型数据 */
                else if (self.displaytype == 2) {
                    PetItemTipsVo = new game.modules.chat.models.PetItemTipsVo();
                    var petsSize = data.readUint8();
                    for (var index = 0; index < petsSize; index++) {
                        PetItemTipsVo.fromByteArray(data);
                    }
                    self.pet.push(PetItemTipsVo);
                }
            }
            else { /** 别人查看的tips */
                if (self.displaytype == 1) { /** 物品 */
                    var id_1 = ChatModel.getInstance().viewItemId;
                    if (id_1 != 0) {
                        if (120000 <= id_1 && id_1 <= 126675 || 140000 <= id_1 && id_1 <= 140005 || 10000 <= id_1 && id_1 <= 10009) { //装备
                            self.tipsVo.fromByteArray(data);
                            self.tips = self.tipsVo;
                        }
                        else if (111000 <= id_1 && id_1 <= 111053) { /** 普通物品 */
                            self.foodVo.fromByteArray(data);
                            self.tips = self.foodVo;
                        }
                        else if (100000 <= id_1 && id_1 <= 107044 || 330100 <= id_1 && id_1 <= 340074) { /** 装备的附魔 */
                            if (101100 <= id_1 && id_1 <= 101108) {
                                self.EnhancementVo.fromByteArray(data);
                                self.tips = self.EnhancementVo;
                            }
                            else if (id_1 == 101200 || id_1 == 101201) { /** 地图 */
                                self.mapVo.fromByteArray(data);
                                self.tips = self.mapVo;
                            }
                        }
                    }
                }
                else if (self.displaytype == 2) { /** 宠物 */
                }
            }
        };
        return S2C_chatItem_tips;
    }());
    hanlder.S2C_chatItem_tips = S2C_chatItem_tips;
    var S2C_trans_chatmessagenotify2client = /** @class */ (function () {
        function S2C_trans_chatmessagenotify2client() {
        }
        S2C_trans_chatmessagenotify2client.read = function (self, data) {
            //var sTransChatMessageNotify2Client = Network._instance.protoTypePool.STransChatMessageNotify2Client.decode(data);
            // self.messageid = sTransChatMessageNotify2Client.messageid;
            // self.npcbaseid = sTransChatMessageNotify2Client.npcbaseid;
            // self.parameters = sTransChatMessageNotify2Client.parameters;
            // console.log("S2C_trans_chatmessagenotify2client sTransChatMessageNotify2Client:", sTransChatMessageNotify2Client);
            // console.log("S2C_trans_chatmessagenotify2client sTransChatMessageNotify2Client.messageid", sTransChatMessageNotify2Client.messageid);
            // console.log("S2C_trans_chatmessagenotify2client sTransChatMessageNotify2Client.npcbaseid", sTransChatMessageNotify2Client.npcbaseid);
            // console.log("S2C_trans_chatmessagenotify2client sTransChatMessageNotify2Client.parameters", sTransChatMessageNotify2Client.parameters);
            self.chatmessagenotify2client = new game.modules.chat.models.ChatMessageNotifyVo();
            self.chatmessagenotify2client.fromByteArray(data);
        };
        return S2C_trans_chatmessagenotify2client;
    }());
    hanlder.S2C_trans_chatmessagenotify2client = S2C_trans_chatmessagenotify2client;
    var S2C_dropInstance = /** @class */ (function () {
        function S2C_dropInstance() {
        }
        S2C_dropInstance.read = function (self, data) {
            self.messageid = data.readInt32();
            self.landname = ByteArrayUtils.readUtf16String(data);
        };
        return S2C_dropInstance;
    }());
    hanlder.S2C_dropInstance = S2C_dropInstance;
    var S2C_trans_chatmessage2client = /** @class */ (function () {
        function S2C_trans_chatmessage2client() {
            this.displayinfos = [];
        }
        S2C_trans_chatmessage2client.read = function (self, data) {
            //var sTransChatMessage2Client = Network._instance.protoTypePool.STransChatMessage2Client.decode(data);
            var displayInfoVo;
            self.roleid = data.readLong(); //sTransChatMessage2Client.roleid;
            self.rolename = ByteArrayUtils.readUtf16String(data); //data.readUTFBytes(data.readUint8());//sTransChatMessage2Client.rolename;
            self.shapeid = data.readUint32(); //TransChatMessage2Client.shapeid;
            self.titleid = data.readUint32(); //sTransChatMessage2Client.titleid;
            self.messagetype = data.readUint32(); //sTransChatMessage2Client.messagetype;
            self.message = ByteArrayUtils.readUtf16String(data); //sTransChatMessage2Client.message;
            //self.displayinfos = sTransChatMessage2Client.displayinfos;
            // self.displayinfos = [];
            // let displayInfo : game.modules.chat.models.DisplayInfoVo ;
            var displayinfosSize = ByteArrayUtils.uncompact_uint32(data);
            // for (var index = 0; index < displayinfosSize; index++) {
            // 	displayInfo = displayInfo[index];
            // 	self.displayinfos.push(displayInfo);
            // }
            displayInfoVo = new game.modules.chat.models.DisplayInfoVo();
            for (var index = 0; index < displayinfosSize; index++) {
                displayInfoVo.fromByteArray(data);
                self.displayinfos.push(displayInfoVo);
            }
        };
        return S2C_trans_chatmessage2client;
    }());
    hanlder.S2C_trans_chatmessage2client = S2C_trans_chatmessage2client;
    var S2C_use_roleshape = /** @class */ (function () {
        function S2C_use_roleshape() {
        }
        S2C_use_roleshape.read = function (self, data) {
            var sUseRoleShape = Network._instance.protoTypePool.SUseRoleShape.decode(data);
            self.shapecard = sUseRoleShape.shapecard;
            console.log("S2C_use_roleshape sUseRoleShape:", sUseRoleShape);
            console.log("S2C_use_roleshape sUseRoleShape.shapecard", sUseRoleShape.shapecard);
        };
        return S2C_use_roleshape;
    }());
    hanlder.S2C_use_roleshape = S2C_use_roleshape;
    var S2C_use_shapecard = /** @class */ (function () {
        function S2C_use_shapecard() {
        }
        S2C_use_shapecard.read = function (self, data) {
            var sUseShapeCard = Network._instance.protoTypePool.SUseShapeCard.decode(data);
            self.shapecard = sUseShapeCard.shapecard;
            console.log("S2C_use_shapecard sUseShapeCard:", sUseShapeCard);
            console.log("S2C_use_shapecard sUseShapeCard.shapecard", sUseShapeCard.shapecard);
        };
        return S2C_use_shapecard;
    }());
    hanlder.S2C_use_shapecard = S2C_use_shapecard;
    var S2C_add_shapecardpoint = /** @class */ (function () {
        function S2C_add_shapecardpoint() {
        }
        S2C_add_shapecardpoint.read = function (self, data) {
            var sAddShapeCardPoint = Network._instance.protoTypePool.SAddShapeCardPoint.decode(data);
            self.shapecard = sAddShapeCardPoint.shapecard;
            self.shapecardpoint = sAddShapeCardPoint.shapecardpoint;
            console.log("S2C_add_shapecardpoint sAddShapeCardPoint:", sAddShapeCardPoint);
            console.log("S2C_add_shapecardpoint sAddShapeCardPoint.shapecard", sAddShapeCardPoint.shapecard);
            console.log("S2C_add_shapecardpoint sAddShapeCardPoint.shapecardpoint", sAddShapeCardPoint.shapecardpoint);
        };
        return S2C_add_shapecardpoint;
    }());
    hanlder.S2C_add_shapecardpoint = S2C_add_shapecardpoint;
    var S2C_shape_cardInfolist = /** @class */ (function () {
        function S2C_shape_cardInfolist() {
        }
        S2C_shape_cardInfolist.read = function (self, data) {
            var sShapeCardInfoList = Network._instance.protoTypePool.SShapeCardInfoList.decode(data);
            self.shapecardpoints = sShapeCardInfoList.shapecardpoints;
            self.curshapecard = sShapeCardInfoList.curshapecard;
            self.useroleshape = sShapeCardInfoList.useroleshape;
            console.log("S2C_shape_cardInfolist sShapeCardInfoList:", sShapeCardInfoList);
            console.log("S2C_shape_cardInfolist sShapeCardInfoList.shapecardpoints", sShapeCardInfoList.shapecardpoints);
            console.log("S2C_shape_cardInfolist sShapeCardInfoList.curshapecard", sShapeCardInfoList.curshapecard);
            console.log("S2C_shape_cardInfolist sShapeCardInfoList.useroleshape", sShapeCardInfoList.useroleshape);
        };
        return S2C_shape_cardInfolist;
    }());
    hanlder.S2C_shape_cardInfolist = S2C_shape_cardInfolist;
    var S2C_live_skillmakecard = /** @class */ (function () {
        function S2C_live_skillmakecard() {
        }
        S2C_live_skillmakecard.read = function (self, data) {
            // var sLiveSkillMakeCard = Network._instance.protoTypePool.SLiveSkillMakeCard.decode(data);
            // self.level = sLiveSkillMakeCard.level;
            // console.log("S2C_live_skillmakecard sLiveSkillMakeCard:", sLiveSkillMakeCard);
            // console.log("S2C_live_skillmakecard sLiveSkillMakeCard.level", sLiveSkillMakeCard.level);
            self.level = data.readUint32();
            console.log("S2C_live_skillmakecard+++++++++++++++", self.level);
        };
        return S2C_live_skillmakecard;
    }());
    hanlder.S2C_live_skillmakecard = S2C_live_skillmakecard;
    var S2C_live_skillmakefarm = /** @class */ (function () {
        function S2C_live_skillmakefarm() {
        }
        S2C_live_skillmakefarm.read = function (self, data) {
            self.addgold = data.readUint32();
            console.log("S2C_live_skillmakefarm++++++++++++++++++++++", self.addgold);
        };
        return S2C_live_skillmakefarm;
    }());
    hanlder.S2C_live_skillmakefarm = S2C_live_skillmakefarm;
    var S2C_live_skillmakeenhancement = /** @class */ (function () {
        function S2C_live_skillmakeenhancement() {
        }
        S2C_live_skillmakeenhancement.read = function (self, data) {
            console.log("S2C_live_skillmakeenhancement+++++++++++++++++++++++++++++");
        };
        return S2C_live_skillmakeenhancement;
    }());
    hanlder.S2C_live_skillmakeenhancement = S2C_live_skillmakeenhancement;
    var S2C_live_skillmakefriendgift = /** @class */ (function () {
        function S2C_live_skillmakefriendgift() {
        }
        S2C_live_skillmakefriendgift.read = function (self, data) {
            var sLiveSkillMakeFriendGift = Network._instance.protoTypePool.SLiveSkillMakeFriendGift.decode(data);
            self.itemid = sLiveSkillMakeFriendGift.itemid;
            console.log("S2C_live_skillmakefriendgift sLiveSkillMakeFriendGift:", sLiveSkillMakeFriendGift);
            console.log("S2C_live_skillmakefriendgift sLiveSkillMakeFriendGift.itemid", sLiveSkillMakeFriendGift.itemid);
        };
        return S2C_live_skillmakefriendgift;
    }());
    hanlder.S2C_live_skillmakefriendgift = S2C_live_skillmakefriendgift;
    var S2C_live_skillsakefood = /** @class */ (function () {
        function S2C_live_skillsakefood() {
        }
        S2C_live_skillsakefood.read = function (self, data) {
            // var sLiveSkillMakeFood = Network._instance.protoTypePool.SLiveSkillMakeFood.decode(data);
            // self.itemid = sLiveSkillMakeFood.itemid;
            // self.ret = sLiveSkillMakeFood.ret;
            // console.log("S2C_live_skillsakefood sLiveSkillMakeFood:", sLiveSkillMakeFood);
            // console.log("S2C_live_skillsakefood sLiveSkillMakeFood.itemid", sLiveSkillMakeFood.itemid);
            // console.log("S2C_live_skillsakefood sLiveSkillMakeFood.ret", sLiveSkillMakeFood.ret);
            self.itemid = data.readUint32();
            self.ret = data.readUint32();
            console.log("S2C_live_skillsakefood +++++++++++++++++++++++++", self.itemid);
        };
        return S2C_live_skillsakefood;
    }());
    hanlder.S2C_live_skillsakefood = S2C_live_skillsakefood;
    var S2C_live_skillmakedrug = /** @class */ (function () {
        function S2C_live_skillmakedrug() {
        }
        S2C_live_skillmakedrug.read = function (self, data) {
            // var sLiveSkillMakeDrug = Network._instance.protoTypePool.SLiveSkillMakeDrug.decode(data);
            // self.itemid = sLiveSkillMakeDrug.itemid;
            // self.ret = sLiveSkillMakeDrug.ret;
            // console.log("S2C_live_skillmakedrug sLiveSkillMakeDrug:", sLiveSkillMakeDrug);
            // console.log("S2C_live_skillmakedrug sLiveSkillMakeDrug.itemid", sLiveSkillMakeDrug.itemid);
            // console.log("S2C_live_skillmakedrug sLiveSkillMakeDrug.ret", sLiveSkillMakeDrug.ret);
            self.itemid = data.readUint32();
            self.ret = data.readUint32();
            console.log("S2C_live_skillmakedrug++++++++++++++++++++++", self.itemid);
        };
        return S2C_live_skillmakedrug;
    }());
    hanlder.S2C_live_skillmakedrug = S2C_live_skillmakedrug;
    var S2C_live_skillmakestuff = /** @class */ (function () {
        function S2C_live_skillmakestuff() {
        }
        S2C_live_skillmakestuff.read = function (self, data) {
            // var sLiveSkillMakeStuff = Network._instance.protoTypePool.SLiveSkillMakeStuff.decode(data);
            // self.ret = sLiveSkillMakeStuff.ret;
            // console.log("S2C_live_skillmakestuff sLiveSkillMakeStuff:", sLiveSkillMakeStuff);
            // console.log("S2C_live_skillmakestuff sLiveSkillMakeStuff.ret", sLiveSkillMakeStuff.ret);
            self.ret = data.readUint32();
            console.log("S2C_live_skillmakestuff++++++++++++++++++++++", self.ret);
        };
        return S2C_live_skillmakestuff;
    }());
    hanlder.S2C_live_skillmakestuff = S2C_live_skillmakestuff;
    var S2C_update_learnliveskill = /** @class */ (function () {
        function S2C_update_learnliveskill() {
        }
        S2C_update_learnliveskill.read = function (self, data) {
            // var sUpdateLearnLiveSkill = Network._instance.protoTypePool.SUpdateLearnLiveSkill.decode(data);
            // self.skill = sUpdateLearnLiveSkill.skill;
            // console.log("S2C_update_learnliveskill sUpdateLearnLiveSkill:", sUpdateLearnLiveSkill);
            // console.log("S2C_update_learnliveskill sUpdateLearnLiveSkill.skill", sUpdateLearnLiveSkill.skill);
            self.skill = new game.modules.skill.models.LiveSkillVo();
            self.skill.fromByteArray(data);
            console.log("S2C_update_learnliveskill+++++++++++++", self.skill);
        };
        return S2C_update_learnliveskill;
    }());
    hanlder.S2C_update_learnliveskill = S2C_update_learnliveskill;
    var S2C_request_liveskilllist = /** @class */ (function () {
        function S2C_request_liveskilllist() {
        }
        S2C_request_liveskilllist.read = function (self, data) {
            self.skilllist = new Array();
            var skilllistSize = data.readUint8();
            var skilllistInfo;
            for (var index = 0; index < skilllistSize; index++) {
                skilllistInfo = new game.modules.skill.models.LiveSkillVo();
                skilllistInfo.fromByteArray(data);
                self.skilllist.push(skilllistInfo);
            }
            console.log("S2C_request_liveskilllist+++++++++++++++++++++", self.skilllist);
        };
        return S2C_request_liveskilllist;
    }());
    hanlder.S2C_request_liveskilllist = S2C_request_liveskilllist;
    var S2C_update_learnparticleskill = /** @class */ (function () {
        function S2C_update_learnparticleskill() {
        }
        S2C_update_learnparticleskill.read = function (self, data) {
            // var sUpdateLearnParticleSkill = Network._instance.protoTypePool.SUpdateLearnParticleSkill.decode(data);
            // self.skill = sUpdateLearnParticleSkill.skill;
            // console.log("S2C_update_learnparticleskill sUpdateLearnParticleSkill:", sUpdateLearnParticleSkill);
            // console.log("S2C_update_learnparticleskill sUpdateLearnParticleSkill.skill", sUpdateLearnParticleSkill.skill);
            self.skill = new game.modules.skill.models.ParticleSkillVo();
            self.skill.fromByteArray(data);
            console.log("S2C_update_learnparticleskill++++++++++++", self.skill);
        };
        return S2C_update_learnparticleskill;
    }());
    hanlder.S2C_update_learnparticleskill = S2C_update_learnparticleskill;
    var S2C_request_particleskilllist = /** @class */ (function () {
        function S2C_request_particleskilllist() {
        }
        S2C_request_particleskilllist.read = function (self, data) {
            // var sRequestParticleSkillList = Network._instance.protoTypePool.SRequestParticleSkillList.decode(data);
            // self.skilllist = sRequestParticleSkillList.skilllist;
            // self.curcontribution = sRequestParticleSkillList.curcontribution;
            // self.factionlevel = sRequestParticleSkillList.factionlevel;
            // console.log("S2C_request_particleskilllist sRequestParticleSkillList:", sRequestParticleSkillList);
            // console.log("S2C_request_particleskilllist sRequestParticleSkillList.skilllist", sRequestParticleSkillList.skilllist);
            // console.log("S2C_request_particleskilllist sRequestParticleSkillList.curcontribution", sRequestParticleSkillList.curcontribution);
            // console.log("S2C_request_particleskilllist sRequestParticleSkillList.factionlevel", sRequestParticleSkillList.factionlevel);
            self.skilllist = new Array();
            var skilllistSize = data.readUint8();
            var skilllistInfo;
            for (var index = 0; index < skilllistSize; index++) {
                skilllistInfo = new game.modules.skill.models.ParticleSkillVo();
                skilllistInfo.fromByteArray(data);
                self.skilllist.push(skilllistInfo);
            }
            self.curcontribution = data.readInt32();
            self.factionlevel = data.readInt32();
            console.log("S2C_request_particleskilllist++++++++++++++++++", self.skilllist);
        };
        return S2C_request_particleskilllist;
    }());
    hanlder.S2C_request_particleskilllist = S2C_request_particleskilllist;
    var S2C_update_extskill = /** @class */ (function () {
        function S2C_update_extskill() {
        }
        S2C_update_extskill.read = function (self, data) {
            var sUpdateExtSkill = Network._instance.protoTypePool.SUpdateExtSkill.decode(data);
            self.extskilllists = sUpdateExtSkill.extskilllists;
            console.log("S2C_update_extskill sUpdateExtSkill:", sUpdateExtSkill);
            console.log("S2C_update_extskill sUpdateExtSkill.extskilllists", sUpdateExtSkill.extskilllists);
        };
        return S2C_update_extskill;
    }());
    hanlder.S2C_update_extskill = S2C_update_extskill;
    var S2C_send_inborns = /** @class */ (function () {
        function S2C_send_inborns() {
        }
        S2C_send_inborns.read = function (self, data) {
            // var sSendInborns = Network._instance.protoTypePool.SSendInborns.decode(data);
            // self.inborns = sSendInborns.inborns;
            // console.log("S2C_send_inborns sSendInborns:", sSendInborns);
            // console.log("S2C_send_inborns sSendInborns.inborns", sSendInborns.inborns);
            var mapSize = data.readUint8();
            self.inborns = new Laya.Dictionary();
            for (var index = 0; index < mapSize; index++) {
                self.inborns.set(data.readUint32(), data.readUint32());
            }
            console.log("S2C_send_inborns++++++++++", self.inborns);
        };
        return S2C_send_inborns;
    }());
    hanlder.S2C_send_inborns = S2C_send_inborns;
    var S2C_update_inborn = /** @class */ (function () {
        function S2C_update_inborn() {
        }
        S2C_update_inborn.read = function (self, data) {
            // var sUpdateInborn = Network._instance.protoTypePool.SUpdateInborn.decode(data);
            // self.flag = sUpdateInborn.flag;
            // self.inborns = sUpdateInborn.inborns;
            // console.log("S2C_update_inborn sUpdateInborn:", sUpdateInborn);
            // console.log("S2C_update_inborn sUpdateInborn.flag", sUpdateInborn.flag);
            // console.log("S2C_update_inborn sUpdateInborn.inborns", sUpdateInborn.inborns);
            self.flag = data.readByte();
            var mapSize = data.readUint8();
            self.inborns = new Laya.Dictionary();
            for (var index = 0; index < mapSize; index++) {
                self.inborns.set(data.readUint32(), data.readUint32());
            }
            console.log("S2C_update_inborn++++++++++++++", self.inborns);
        };
        return S2C_update_inborn;
    }());
    hanlder.S2C_update_inborn = S2C_update_inborn;
    var S2C_send_specialskills = /** @class */ (function () {
        function S2C_send_specialskills() {
        }
        S2C_send_specialskills.read = function (self, data) {
            var sSendSpecialSkills = Network._instance.protoTypePool.SSendSpecialSkills.decode(data);
            self.skills = sSendSpecialSkills.skills;
            self.effects = sSendSpecialSkills.effects;
            console.log("S2C_send_specialskills sSendSpecialSkills:", sSendSpecialSkills);
            console.log("S2C_send_specialskills sSendSpecialSkills.skills", sSendSpecialSkills.skills);
            console.log("S2C_send_specialskills sSendSpecialSkills.effects", sSendSpecialSkills.effects);
        };
        return S2C_send_specialskills;
    }());
    hanlder.S2C_send_specialskills = S2C_send_specialskills;
    var S2C_send_assistskillmaxlevels = /** @class */ (function () {
        function S2C_send_assistskillmaxlevels() {
        }
        S2C_send_assistskillmaxlevels.read = function (self, data) {
            var sSendAssistSkillMaxLevels = Network._instance.protoTypePool.SSendAssistSkillMaxLevels.decode(data);
            self.npckey = sSendAssistSkillMaxLevels.npckey;
            self.maxlevels = sSendAssistSkillMaxLevels.maxlevels;
            console.log("S2C_send_assistskillmaxlevels sSendAssistSkillMaxLevels:", sSendAssistSkillMaxLevels);
            console.log("S2C_send_assistskillmaxlevels sSendAssistSkillMaxLevels.npckey", sSendAssistSkillMaxLevels.npckey);
            console.log("S2C_send_assistskillmaxlevels sSendAssistSkillMaxLevels.maxlevels", sSendAssistSkillMaxLevels.maxlevels);
        };
        return S2C_send_assistskillmaxlevels;
    }());
    hanlder.S2C_send_assistskillmaxlevels = S2C_send_assistskillmaxlevels;
    var S2C_update_assistskill = /** @class */ (function () {
        function S2C_update_assistskill() {
        }
        S2C_update_assistskill.read = function (self, data) {
            var sUpdateAssistSkill = Network._instance.protoTypePool.SUpdateAssistSkill.decode(data);
            self.assistSkill = sUpdateAssistSkill.assistSkill;
            console.log("S2C_update_assistskill sUpdateAssistSkill:", sUpdateAssistSkill);
            console.log("S2C_update_assistskill sUpdateAssistSkill.assistSkill", sUpdateAssistSkill.assistSkill);
        };
        return S2C_update_assistskill;
    }());
    hanlder.S2C_update_assistskill = S2C_update_assistskill;
    var S2C_skill_error = /** @class */ (function () {
        function S2C_skill_error() {
        }
        S2C_skill_error.read = function (self, data) {
            self.skillError = data.readInt32();
        };
        return S2C_skill_error;
    }());
    hanlder.S2C_skill_error = S2C_skill_error;
    var S2C_item_orderbrowseblackmarket = /** @class */ (function () {
        function S2C_item_orderbrowseblackmarket() {
        }
        S2C_item_orderbrowseblackmarket.read = function (self, data) {
            var sItemOrderBrowseBlackMarket = Network._instance.protoTypePool.SItemOrderBrowseBlackMarket.decode(data);
            self.itemtype = sItemOrderBrowseBlackMarket.itemtype;
            self.salelist = sItemOrderBrowseBlackMarket.salelist;
            self.buylist = sItemOrderBrowseBlackMarket.buylist;
            console.log("S2C_item_orderbrowseblackmarket sItemOrderBrowseBlackMarket:", sItemOrderBrowseBlackMarket);
            console.log("S2C_item_orderbrowseblackmarket sItemOrderBrowseBlackMarket.itemtype", sItemOrderBrowseBlackMarket.itemtype);
            console.log("S2C_item_orderbrowseblackmarket sItemOrderBrowseBlackMarket.salelist", sItemOrderBrowseBlackMarket.salelist);
            console.log("S2C_item_orderbrowseblackmarket sItemOrderBrowseBlackMarket.buylist", sItemOrderBrowseBlackMarket.buylist);
        };
        return S2C_item_orderbrowseblackmarket;
    }());
    hanlder.S2C_item_orderbrowseblackmarket = S2C_item_orderbrowseblackmarket;
    var S2C_item_orderdownblackmarket = /** @class */ (function () {
        function S2C_item_orderdownblackmarket() {
        }
        S2C_item_orderdownblackmarket.read = function (self, data) {
            var sItemOrderDownBlackMarket = Network._instance.protoTypePool.SItemOrderDownBlackMarket.decode(data);
            self.itemtype = sItemOrderDownBlackMarket.itemtype;
            self.pid = sItemOrderDownBlackMarket.pid;
            console.log("S2C_item_orderdownblackmarket sItemOrderDownBlackMarket:", sItemOrderDownBlackMarket);
            console.log("S2C_item_orderdownblackmarket sItemOrderDownBlackMarket.itemtype", sItemOrderDownBlackMarket.itemtype);
            console.log("S2C_item_orderdownblackmarket sItemOrderDownBlackMarket.pid", sItemOrderDownBlackMarket.pid);
        };
        return S2C_item_orderdownblackmarket;
    }());
    hanlder.S2C_item_orderdownblackmarket = S2C_item_orderdownblackmarket;
    var S2C_refresh_itemorderstate = /** @class */ (function () {
        function S2C_refresh_itemorderstate() {
        }
        S2C_refresh_itemorderstate.read = function (self, data) {
            var sRefreshItemOrderState = Network._instance.protoTypePool.SRefreshItemOrderState.decode(data);
            self.itemtype = sRefreshItemOrderState.itemtype;
            self.pid = sRefreshItemOrderState.pid;
            self.state = sRefreshItemOrderState.state;
            console.log("S2C_refresh_itemorderstate sRefreshItemOrderState:", sRefreshItemOrderState);
            console.log("S2C_refresh_itemorderstate sRefreshItemOrderState.itemtype", sRefreshItemOrderState.itemtype);
            console.log("S2C_refresh_itemorderstate sRefreshItemOrderState.pid", sRefreshItemOrderState.pid);
            console.log("S2C_refresh_itemorderstate sRefreshItemOrderState.state", sRefreshItemOrderState.state);
        };
        return S2C_refresh_itemorderstate;
    }());
    hanlder.S2C_refresh_itemorderstate = S2C_refresh_itemorderstate;
    var S2C_item_orderupblackmarket = /** @class */ (function () {
        function S2C_item_orderupblackmarket() {
        }
        S2C_item_orderupblackmarket.read = function (self, data) {
            var sRefreshItemOrderState = Network._instance.protoTypePool.SItemOrderUpBlackMarket.decode(data);
            self.order = sRefreshItemOrderState.order;
            self.itemtype = sRefreshItemOrderState.itemtype;
            console.log("S2C_item_orderupblackmarket sRefreshItemOrderState:", sRefreshItemOrderState);
            console.log("S2C_item_orderupblackmarket sRefreshItemOrderState.order", sRefreshItemOrderState.order);
            console.log("S2C_item_orderupblackmarket sRefreshItemOrderState.itemtype", sRefreshItemOrderState.itemtype);
        };
        return S2C_item_orderupblackmarket;
    }());
    hanlder.S2C_item_orderupblackmarket = S2C_item_orderupblackmarket;
    var S2C_gold_orderdownblackmarket = /** @class */ (function () {
        function S2C_gold_orderdownblackmarket() {
        }
        S2C_gold_orderdownblackmarket.read = function (self, data) {
            var sGoldOrderDownBlackMarket = Network._instance.protoTypePool.SGoldOrderDownBlackMarket.decode(data);
            self.pid = sGoldOrderDownBlackMarket.pid;
            console.log("S2C_gold_orderdownblackmarket sGoldOrderDownBlackMarket:", sGoldOrderDownBlackMarket);
            console.log("S2C_gold_orderdownblackmarket sGoldOrderDownBlackMarket.pid", sGoldOrderDownBlackMarket.pid);
        };
        return S2C_gold_orderdownblackmarket;
    }());
    hanlder.S2C_gold_orderdownblackmarket = S2C_gold_orderdownblackmarket;
    var S2C_refresh_goldorderstate = /** @class */ (function () {
        function S2C_refresh_goldorderstate() {
        }
        S2C_refresh_goldorderstate.read = function (self, data) {
            var sRefreshGoldOrderState = Network._instance.protoTypePool.SRefreshGoldOrderState.decode(data);
            self.pid = sRefreshGoldOrderState.pid;
            self.state = sRefreshGoldOrderState.state;
            console.log("S2C_refresh_goldorderstate sRefreshGoldOrderState:", sRefreshGoldOrderState);
            console.log("S2C_refresh_goldorderstate sRefreshGoldOrderState.pid", sRefreshGoldOrderState.pid);
            console.log("S2C_refresh_goldorderstate sRefreshGoldOrderState.state", sRefreshGoldOrderState.state);
        };
        return S2C_refresh_goldorderstate;
    }());
    hanlder.S2C_refresh_goldorderstate = S2C_refresh_goldorderstate;
    var S2C_gold_orderupblackmarket = /** @class */ (function () {
        function S2C_gold_orderupblackmarket() {
        }
        S2C_gold_orderupblackmarket.read = function (self, data) {
            var sGoldOrderUpBlackMarket = Network._instance.protoTypePool.SGoldOrderUpBlackMarket.decode(data);
            self.order = sGoldOrderUpBlackMarket.order;
            console.log("S2C_gold_orderupblackmarket sGoldOrderUpBlackMarket:", sGoldOrderUpBlackMarket);
            console.log("S2C_gold_orderupblackmarket sGoldOrderUpBlackMarket.order", sGoldOrderUpBlackMarket.order);
        };
        return S2C_gold_orderupblackmarket;
    }());
    hanlder.S2C_gold_orderupblackmarket = S2C_gold_orderupblackmarket;
    var S2C_gold_orderbrowseblackmarket = /** @class */ (function () {
        function S2C_gold_orderbrowseblackmarket() {
        }
        S2C_gold_orderbrowseblackmarket.read = function (self, data) {
            var sGoldOrderBrowseBlackMarket = Network._instance.protoTypePool.SGoldOrderBrowseBlackMarket.decode(data);
            self.salelist = sGoldOrderBrowseBlackMarket.salelist;
            self.buylist = sGoldOrderBrowseBlackMarket.buylist;
            console.log("S2C_gold_orderbrowseblackmarket sGoldOrderBrowseBlackMarket:", sGoldOrderBrowseBlackMarket);
            console.log("S2C_gold_orderbrowseblackmarket sGoldOrderBrowseBlackMarket.salelist", sGoldOrderBrowseBlackMarket.salelist);
            console.log("S2C_gold_orderbrowseblackmarket sGoldOrderBrowseBlackMarket.buylist", sGoldOrderBrowseBlackMarket.buylist);
        };
        return S2C_gold_orderbrowseblackmarket;
    }());
    hanlder.S2C_gold_orderbrowseblackmarket = S2C_gold_orderbrowseblackmarket;
    var S2C_take_backtempmarketcontainerItem = /** @class */ (function () {
        function S2C_take_backtempmarketcontainerItem() {
        }
        S2C_take_backtempmarketcontainerItem.read = function (self, data) {
            var sTakeBackTempMarketContainerItem = Network._instance.protoTypePool.STakeBackTempMarketContainerItem.decode(data);
            self.succ = sTakeBackTempMarketContainerItem.succ;
            console.log("S2C_take_backtempmarketcontainerItem sTakeBackTempMarketContainerItem:", sTakeBackTempMarketContainerItem);
            console.log("S2C_take_backtempmarketcontainerItem sTakeBackTempMarketContainerItem.succ", sTakeBackTempMarketContainerItem.succ);
        };
        return S2C_take_backtempmarketcontainerItem;
    }());
    hanlder.S2C_take_backtempmarketcontainerItem = S2C_take_backtempmarketcontainerItem;
    var S2C_temp_marketcontainer = /** @class */ (function () {
        function S2C_temp_marketcontainer() {
        }
        S2C_temp_marketcontainer.read = function (self, data) {
            var sTempMarketContainer = Network._instance.protoTypePool.STempMarketContainer.decode(data);
            self.goodslist = sTempMarketContainer.goodslist;
            console.log("S2C_temp_marketcontainer sTempMarketContainer:", sTempMarketContainer);
            console.log("S2C_temp_marketcontainer sTempMarketContainer.goodslist", sTempMarketContainer.goodslist);
        };
        return S2C_temp_marketcontainer;
    }());
    hanlder.S2C_temp_marketcontainer = S2C_temp_marketcontainer;
    var S2C_marketItem_chatshow = /** @class */ (function () {
        function S2C_marketItem_chatshow() {
        }
        S2C_marketItem_chatshow.read = function (self, data) {
            var sMarketItemChatShow = Network._instance.protoTypePool.SMarketItemChatShow.decode(data);
            self.browsetype = sMarketItemChatShow.browsetype;
            self.firstno = sMarketItemChatShow.firstno;
            self.twono = sMarketItemChatShow.twono;
            self.threeno = sMarketItemChatShow.threeno;
            self.id = sMarketItemChatShow.id;
            self.currpage = sMarketItemChatShow.currpage;
            self.totalpage = sMarketItemChatShow.totalpage;
            self.goodslist = sMarketItemChatShow.goodslist;
            console.log("S2C_marketItem_chatshow sMarketItemChatShow:", sMarketItemChatShow);
            console.log("S2C_marketItem_chatshow sMarketItemChatShow.browsetype", sMarketItemChatShow.browsetype);
            console.log("S2C_marketItem_chatshow sMarketItemChatShow.firstno", sMarketItemChatShow.firstno);
            console.log("S2C_marketItem_chatshow sMarketItemChatShow.twono", sMarketItemChatShow.twono);
            console.log("S2C_marketItem_chatshow sMarketItemChatShow.threeno", sMarketItemChatShow.threeno);
            console.log("S2C_marketItem_chatshow sMarketItemChatShow.id", sMarketItemChatShow.id);
            console.log("S2C_marketItem_chatshow sMarketItemChatShow.currpage", sMarketItemChatShow.currpage);
            console.log("S2C_marketItem_chatshow sMarketItemChatShow.totalpage", sMarketItemChatShow.totalpage);
            console.log("S2C_marketItem_chatshow sMarketItemChatShow.goodslist", sMarketItemChatShow.goodslist);
        };
        return S2C_marketItem_chatshow;
    }());
    hanlder.S2C_marketItem_chatshow = S2C_marketItem_chatshow;
    var S2C_market_searchresult = /** @class */ (function () {
        function S2C_market_searchresult() {
            this.threeno = []; //三级页签类型
            this.goodslist = []; //查看物品列表
        }
        S2C_market_searchresult.read = function (self, data) {
            self.browsetype = data.readInt32();
            self.firstno = data.readInt32();
            self.twono = data.readInt32();
            var threenoSize = data.readInt8();
            for (var i = 0; i < threenoSize; i++) {
                self.threeno.push(data.readInt32());
            }
            self.currpage = data.readInt32();
            self.totalpage = data.readInt32();
            var MarketGoodsVo;
            var goodlistSize = data.readInt8();
            for (var i = 0; i < goodlistSize; i++) {
                MarketGoodsVo = new game.modules.sale.models.MarketGoodsVo();
                MarketGoodsVo.fromByteArray(data);
                self.goodslist.push(MarketGoodsVo);
            }
        };
        return S2C_market_searchresult;
    }());
    hanlder.S2C_market_searchresult = S2C_market_searchresult;
    var S2C_attention_goods = /** @class */ (function () {
        function S2C_attention_goods() {
        }
        S2C_attention_goods.read = function (self, data) {
            self.attentype = data.readInt32();
            self.id = ByteArrayUtils.readLong(data);
            self.attentiontype = data.readInt32();
            self.itemtype = data.readInt32();
        };
        return S2C_attention_goods;
    }());
    hanlder.S2C_attention_goods = S2C_attention_goods;
    /** 队员同意进入精英副本 */
    var S2C_EnterFuBen = /** @class */ (function () {
        function S2C_EnterFuBen() {
        }
        S2C_EnterFuBen.read = function (self, data) {
            self.taskid = data.readInt32();
        };
        return S2C_EnterFuBen;
    }());
    hanlder.S2C_EnterFuBen = S2C_EnterFuBen;
})(hanlder || (hanlder = {}));
//# sourceMappingURL=ResponderProtocols.js.map