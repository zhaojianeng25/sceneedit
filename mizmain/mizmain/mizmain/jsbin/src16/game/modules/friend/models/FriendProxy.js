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
 * 好友系统的中转服务
 * @author  TXX
 */
var FriendModel = game.modules.friend.models.FriendModel;
/**好友系统枚举 */
var FriendEnum;
(function (FriendEnum) {
    /**离线状态 */
    FriendEnum[FriendEnum["OFFLINE_STATE"] = 0] = "OFFLINE_STATE";
    /** 在线状态 */
    FriendEnum[FriendEnum["ONLINE_STATE"] = 1] = "ONLINE_STATE";
    /**灰色头像序号起始区间 */
    FriendEnum[FriendEnum["GRAY_ROLE_IMG_ID"] = 40000] = "GRAY_ROLE_IMG_ID";
    /**列表开头添加元素 */
    FriendEnum[FriendEnum["PAIXU_QIAN"] = 0] = "PAIXU_QIAN";
    /**列表末尾添加元素 */
    FriendEnum[FriendEnum["PAIXU_HOU"] = 1] = "PAIXU_HOU";
    /**头像序号起始区间 */
    FriendEnum[FriendEnum["ROLE_IMG_ID"] = 30000] = "ROLE_IMG_ID";
    /** 初始好友度*/
    FriendEnum[FriendEnum["FRIEND_DRGREE"] = 1] = "FRIEND_DRGREE";
    /**暂无帮派 */
    FriendEnum[FriendEnum["NO_FACTION"] = 11523] = "NO_FACTION";
    /**邀请入队 */
    FriendEnum[FriendEnum["INVITE_TEAM"] = 2738] = "INVITE_TEAM";
    /**申请入队 */
    FriendEnum[FriendEnum["APPLY_TEAM"] = 2740] = "APPLY_TEAM";
    /**未组队 */
    FriendEnum[FriendEnum["NO_TEAM"] = 0] = "NO_TEAM";
    /**已组队 */
    FriendEnum[FriendEnum["HAVE_TEAM"] = 1] = "HAVE_TEAM";
    /**删除好友 */
    FriendEnum[FriendEnum["DELETE_FRIEND"] = 2741] = "DELETE_FRIEND";
    /**添加好友 */
    FriendEnum[FriendEnum["ADD_FRIEND"] = 11528] = "ADD_FRIEND";
    /** 观战 */
    FriendEnum[FriendEnum["WATCH_FIGHT"] = 2810] = "WATCH_FIGHT";
    /** 切磋一下 */
    FriendEnum[FriendEnum["COMPAR_FIGCHT"] = 2809] = "COMPAR_FIGCHT";
    /**好友关系 */
    FriendEnum[FriendEnum["FRIEND_KEY"] = 1] = "FRIEND_KEY";
    /**陌生人关系 */
    FriendEnum[FriendEnum["STRANGE_KEY"] = 2] = "STRANGE_KEY";
    /**无 */
    FriendEnum[FriendEnum["NOTHING"] = 3148] = "NOTHING";
    /**系统好友 */
    FriendEnum[FriendEnum["SYSTEM_FRIEND"] = 0] = "SYSTEM_FRIEND";
    /**输入点内容再发送吧 */
    FriendEnum[FriendEnum["INPUT_SOMTHING"] = 1446] = "INPUT_SOMTHING";
    /**师门任务序号起始区间 */
    FriendEnum[FriendEnum["SCHOOL_TASK_START"] = 1010000] = "SCHOOL_TASK_START";
    /**师门任务序号结束区间 */
    FriendEnum[FriendEnum["SCHOOL_TASK_END"] = 2000000] = "SCHOOL_TASK_END";
    /**师门任务类型 */
    FriendEnum[FriendEnum["SHIMEN_TYPE"] = 2] = "SHIMEN_TYPE";
    /**主线任务类型 */
    FriendEnum[FriendEnum["ZHUXIAN_TYPE"] = 1] = "ZHUXIAN_TYPE";
    /**可赠送道具序号起始 */
    FriendEnum[FriendEnum["SCENE_START"] = 111004] = "SCENE_START";
    /**可赠送道具序号结束 */
    FriendEnum[FriendEnum["SCENE_END"] = 111019] = "SCENE_END";
})(FriendEnum || (FriendEnum = {}));
var game;
(function (game) {
    var modules;
    (function (modules) {
        var friend;
        (function (friend) {
            var models;
            (function (models) {
                /**系统好友消息 */
                models.SSendSystemMessageToRole_EVENT = "SSendSystemMessageToRole";
                /**服务器返回推荐好友*/
                models.SRecommendFriend_EVENT = "SRecommendFriend";
                /**搜索好友成功S-->C */
                models.SSearchFriend_EVENT = "SSearchFriend";
                /**添加好友成功S-->C */
                models.SAddFriend_EVENT = "SAddFriend";
                /**陌生人聊天S-->C */
                models.SStrangerMessageToRole_EVENT = "SStrangerMessageToRole";
                /**好友信息初始化加载 */
                models.SFriendsInfoInit_EVENT = "SFriendsInfoInit";
                /**服务器返回搜索的角色信息 */
                models.SSearchBlackRoleInfo_EVENT = "SSearchBlackRoleInfo";
                /**服务器返回黑名单列表信息 */
                models.SBlackRoles_EVENT = "SBlackRoles";
                /**好友聊天聊天S-->C */
                models.SFriendMessageToRole_EVENT = "SFriendMessageToRole";
                /**角色上线客户端收到 离线消息 */
                models.SOffLineMsgMessageToRole_EVENT = "SOffLineMsgMessageToRole";
                /**返回服务器id */
                models.SRspServerId_EVENT = "SRspServerId";
                /**请求招募大转盘信息结果 */
                models.SReqRecruitWheel_EVENT = "SReqRecruitWheel";
                /**服务器发送抽奖 */
                models.SReqFortuneWheel_EVENT = "SReqFortuneWheel";
                /**通知客户端刷新邮件 */
                models.SMailInfo_EVENT = "SMailInfo";
                /**通知客户端刷新邮件状态 */
                models.SMailState_EVENT = "SMailState";
                /**通知客户端邮件列表 */
                models.SMailList_EVENT = "SMailList";
                /**赠送礼物结果 */
                models.SGiveGift_EVENT = "SGiveGift";
                /**服务器通知客户端刷新好友度 */
                models.SUpdateFriendLevel_EVENT = "SUpdateFriendLevel";
                /**赠送道具结果 */
                models.SGiveItem_EVENT = "SGiveItem";
                /**删除好友成功 */
                models.SBreakOffRelation_EVENT = "SBreakOffRelation";
                /**返回玩家请求的其他玩家的组队情况 */
                models.SAnswerRoleTeamState_EVENT = "SAnswerRoleTeamState";
                /**举报返回 */
                models.SRoleAccusationCheck_EVENT = "SRoleAccusationCheck";
                /**返回玩家信息 */
                models.SRequestUpdateRoleInfo_EVENT = "SRequestUpdateRoleInfo";
                /**人物弹窗发送消息 */
                models.transMessage_EVENT = "transMessage";
                /**收到消息 */
                models.receiveMessage_EVENT = "receiveMessage";
                /**阅读消息 */
                models.readMessage_EVENT = "readMessage";
                /**未读邮件 */
                models.receiveMail_EVENT = "receiveMail";
                /**邮件全部阅读 */
                models.readMail_EVENT = "readMail";
                /**切磋弹窗 */
                models.PK_EVENT = "PK";
                var FriendProxy = /** @class */ (function (_super) {
                    __extends(FriendProxy, _super);
                    function FriendProxy() {
                        var _this = _super.call(this) || this;
                        FriendProxy._instance = _this;
                        _this.init();
                        return _this;
                    }
                    FriendProxy.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new FriendProxy();
                        }
                        return this._instance;
                    };
                    /** 初始化 */
                    FriendProxy.prototype.init = function () {
                        FriendProxy.getInstance();
                        this.addNetworkListener();
                        Laya.loader.load("common/data/temp/friends.crecruitreward.bin", Handler.create(this, this.onloadedRecruitRewardComplete), null, Loader.BUFFER);
                        //加载好友赠送道具配置表
                        Laya.loader.load("common/data/temp/friends.cfriendgiveitem.bin", Handler.create(this, this.onloadedCFriendGiveItemComplete), null, Loader.BUFFER);
                    };
                    /** 加载好友赠送道具配置表 */
                    FriendProxy.prototype.onloadedCFriendGiveItemComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/friends.cfriendgiveitem.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.FriendModel.getInstance().CFriendsGiveItemConfigDic, game.data.template.FriendGiveItemBaseVo, "id");
                    };
                    /**Z招募/招募奖励 */
                    FriendProxy.prototype.onloadedRecruitRewardComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/friends.crecruitreward.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.FriendModel.getInstance().CRecruitRewardBinDic, game.data.template.RecruitRewardBaseVo, "id");
                    };
                    /**添加监听 */
                    FriendProxy.prototype.addNetworkListener = function () {
                        //监听系统好友消息
                        Network._instance.addHanlder(ProtocolsEnum.SSendSystemMessageToRole, this, this.onSendSystemMessageToRole);
                        //监听服务器返回推荐好友列表
                        Network._instance.addHanlder(ProtocolsEnum.SRecommendFriend, this, this.onRecommendFriend);
                        //监听搜索好友返回结果
                        Network._instance.addHanlder(ProtocolsEnum.SSearchFriend, this, this.onSearchFriend);
                        //监听添加好友结果
                        Network._instance.addHanlder(ProtocolsEnum.SAddFriend, this, this.onAddFriend);
                        //监听与陌生人之间的对话消息
                        Network._instance.addHanlder(ProtocolsEnum.SStrangerMessageToRole, this, this.onStrangerMessageToRole);
                        //监听好友列表初始化信息
                        Network._instance.addHanlder(ProtocolsEnum.SFriendsInfoInit, this, this.onFriendsInfoInit);
                        //监听搜索黑名单返回的角色信息
                        Network._instance.addHanlder(ProtocolsEnum.SSearchBlackRoleInfo, this, this.onSearchBlackRoleInfo);
                        //监听服务器返回的黑名单列表
                        Network._instance.addHanlder(ProtocolsEnum.SBlackRoles, this, this.onBlackRoles);
                        //监听与好友之间的对话信息
                        Network._instance.addHanlder(ProtocolsEnum.SFriendMessageToRole, this, this.onFriendMessageToRole);
                        //监听角色下线期间收到的对话信息
                        Network._instance.addHanlder(ProtocolsEnum.SOffLineMsgMessageToRole, this, this.onOffLineMsgMessageToRole);
                        //监听服务器id信息
                        Network._instance.addHanlder(ProtocolsEnum.SRspServerId, this, this.onRspServerId);
                        //监听招募转盘抽奖结果
                        Network._instance.addHanlder(ProtocolsEnum.SReqRecruitWheel, this, this.onReqRecruitWheel);
                        //监听服务器发送抽奖
                        Network._instance.addHanlder(ProtocolsEnum.SReqFortuneWheel, this, this.onReqFortuneWheel);
                        //监听服务器发送的邮件信息
                        Network._instance.addHanlder(ProtocolsEnum.SMailInfo, this, this.onMailInfo);
                        //监听服务器发送的刷新邮件状态信息
                        Network._instance.addHanlder(ProtocolsEnum.SMailState, this, this.onMailState);
                        //监听邮件列表信息
                        Network._instance.addHanlder(ProtocolsEnum.SMailList, this, this.onMailList);
                        //监听赠送礼物结果
                        Network._instance.addHanlder(ProtocolsEnum.SGiveGift, this, this.onGiveGift);
                        //监听好友度变化
                        Network._instance.addHanlder(ProtocolsEnum.SUpdateFriendLevel, this, this.onUpdateFriendLevel);
                        //监听赠送道具结果
                        Network._instance.addHanlder(ProtocolsEnum.SGiveItem, this, this.onGiveItem);
                        //监听删除好友结果
                        Network._instance.addHanlder(ProtocolsEnum.SBreakOffRelation, this, this.onBreakOffRelation);
                        //监听玩家请求的其他玩家的组队情况
                        Network._instance.addHanlder(ProtocolsEnum.SAnswerRoleTeamState, this, this.onAnswerRoleTeamState);
                        //监听举报结果
                        Network._instance.addHanlder(ProtocolsEnum.SRoleAccusationCheck, this, this.onRoleAccusationCheck);
                        //监听玩家信息变化
                        Network._instance.addHanlder(ProtocolsEnum.SRequestUpdateRoleInfo, this, this.onRequestUpdateRoleInfo);
                        //监听切磋邀请
                        Network._instance.addHanlder(ProtocolsEnum.SInvitationPlayPK, this, this.onInvitationPlayPK);
                    };
                    /**移除监听 */
                    FriendProxy.prototype.removeNetworkListener = function () {
                        Network._instance.removeHanlder(ProtocolsEnum.SSendSystemMessageToRole, this, this.onSendSystemMessageToRole);
                        Network._instance.removeHanlder(ProtocolsEnum.SRecommendFriend, this, this.onRecommendFriend);
                        Network._instance.removeHanlder(ProtocolsEnum.SSearchFriend, this, this.onSearchFriend);
                        Network._instance.removeHanlder(ProtocolsEnum.SAddFriend, this, this.onAddFriend);
                        Network._instance.removeHanlder(ProtocolsEnum.SStrangerMessageToRole, this, this.onStrangerMessageToRole);
                        Network._instance.removeHanlder(ProtocolsEnum.SFriendsInfoInit, this, this.onFriendsInfoInit);
                        Network._instance.removeHanlder(ProtocolsEnum.SSearchBlackRoleInfo, this, this.onSearchBlackRoleInfo);
                        Network._instance.removeHanlder(ProtocolsEnum.SBlackRoles, this, this.onBlackRoles);
                        Network._instance.removeHanlder(ProtocolsEnum.SFriendMessageToRole, this, this.onFriendMessageToRole);
                        Network._instance.removeHanlder(ProtocolsEnum.SOffLineMsgMessageToRole, this, this.onOffLineMsgMessageToRole);
                        Network._instance.removeHanlder(ProtocolsEnum.SRspServerId, this, this.onRspServerId);
                        Network._instance.removeHanlder(ProtocolsEnum.SReqRecruitWheel, this, this.onReqRecruitWheel);
                        Network._instance.removeHanlder(ProtocolsEnum.SReqFortuneWheel, this, this.onReqFortuneWheel);
                        Network._instance.removeHanlder(ProtocolsEnum.SMailInfo, this, this.onMailInfo);
                        Network._instance.removeHanlder(ProtocolsEnum.SMailState, this, this.onMailState);
                        Network._instance.removeHanlder(ProtocolsEnum.SMailList, this, this.onMailList);
                        Network._instance.removeHanlder(ProtocolsEnum.SGiveGift, this, this.onGiveGift);
                        Network._instance.removeHanlder(ProtocolsEnum.SUpdateFriendLevel, this, this.onUpdateFriendLevel);
                        Network._instance.removeHanlder(ProtocolsEnum.SGiveItem, this, this.onGiveItem);
                        Network._instance.removeHanlder(ProtocolsEnum.SBreakOffRelation, this, this.onBreakOffRelation);
                        Network._instance.removeHanlder(ProtocolsEnum.SAnswerRoleTeamState, this, this.onAnswerRoleTeamState);
                        Network._instance.removeHanlder(ProtocolsEnum.SRoleAccusationCheck, this, this.onRoleAccusationCheck);
                        Network._instance.removeHanlder(ProtocolsEnum.SRequestUpdateRoleInfo, this, this.onRequestUpdateRoleInfo);
                        Network._instance.removeHanlder(ProtocolsEnum.SFriendsOnline, this, this.onSFriendsOnline);
                    };
                    /** 切磋邀请 */
                    FriendProxy.prototype.onInvitationPlayPK = function (optcode, msg) {
                        this.event(models.PK_EVENT, [msg.sourceid, msg.rolename, msg.rolelevel]);
                    };
                    /** 好友上下线 */
                    FriendProxy.prototype.onSFriendsOnline = function (optcode, msg) {
                        var _friendIdArr = models.FriendModel.getInstance().friendIdArr;
                        for (var i = 0; i < _friendIdArr.length; i++) {
                            if (_friendIdArr[i] == msg.roleid) {
                                models.FriendModel.getInstance().friendIdArr.splice(i, 1);
                                models.FriendModel.getInstance().friendIsOnline.splice(i, 1);
                            }
                        }
                        if (msg.online == FriendEnum.OFFLINE_STATE) {
                            models.FriendModel.getInstance().friendIdArr.push(msg.roleid);
                            models.FriendModel.getInstance().friendIsOnline.push(msg.online);
                        }
                        else {
                            models.FriendModel.getInstance().friendIdArr.unshift(msg.roleid);
                            models.FriendModel.getInstance().friendIsOnline.unshift(msg.online);
                        }
                    };
                    /** * 陌生人聊天S-->C */
                    FriendProxy.prototype.onStrangerMessageToRole = function (optcode, msg) {
                        models.FriendModel.getInstance().SStrangerMessageToRoleData.set("data", msg);
                        models.FriendProxy.getInstance().event(models.SStrangerMessageToRole_EVENT);
                    };
                    /** * 系统好友消息 */
                    FriendProxy.prototype.onSendSystemMessageToRole = function (optcode, msg) {
                        models.FriendModel.getInstance().SSendSystemMessageToRoleData.set("data", msg);
                        //根据协议中的contentid，查找配置表中的消息
                        var str = ChatModel.getInstance().chatMessageTips[msg.contentId]["msg"];
                        //如果是0 表示是系统消息 大于0的一定是好友发的消息
                        if (msg.systemRoleId == FriendEnum.SYSTEM_FRIEND) {
                            //将配置表中的参数用协议中的数字替代
                            for (var i = 0; i < msg.contentParam.length; i++) {
                                var ch = "$parameter" + (i + 1) + "$";
                                str = str.replace(ch, msg.contentParam[i]);
                            }
                            //将系统消息存入本地
                            var account = LocalStorage.getItem("daowang_userLoginAccount");
                            if (LocalStorage.getItem(account + "_MessageLength") != null) {
                                var length = parseInt(LocalStorage.getItem(account + "_MessageLength"));
                                length += 1;
                                LocalStorage.setItem(account + "_MessageLength", length + "");
                                for (var i = length; i > 0; i--) {
                                    if (i > 20) {
                                        LocalStorage.removeItem(account + "_Message" + i);
                                        LocalStorage.setItem(account + "_MessageLength", length - 1 + "");
                                    }
                                    else if (i == 1) {
                                        LocalStorage.setItem(account + "_Message" + i, msg.time + "_" + str);
                                    }
                                    else {
                                        LocalStorage.setItem(account + "_Message" + i, LocalStorage.getItem(account + "_Message" + (i - 1)));
                                    }
                                }
                            }
                            else {
                                LocalStorage.setItem(account + "_Message1", msg.time + "_" + str);
                                LocalStorage.setItem(account + "_MessageLength", "1");
                            }
                            //以下判断是写死
                            if (msg.contentId == 180028) { //如果系统好友消息是好友赠送道具，代表好友曾在玩家角色离线期间赠送道具给了自己，玩家重新上线，会用系统消息代为提示玩家
                                var itemid = msg.contentParam[2]; //服务器传到客户端的msg.contentParam第三个参数是道具id，180028这条客户端消息提示信息，要求的第三个参数就是道具名字，需要替换一下
                                var itemname = modules.bag.models.BagModel.getInstance().itemAttrData[itemid]["name"];
                                str = str.replace(itemid, itemname);
                                models.FriendModel.getInstance().duringOfflineFriendGiveItem.push({ itemid: itemid, time: msg.time });
                            }
                            if (msg.contentId == 191046) {
                                str = models.FriendModel.getInstance().replaceSpecialMsgContentText(str);
                            }
                            /** 只有为类型为1的提示类型才飘窗 */
                            var data_1 = ChatModel.getInstance().chatMessageTips[msg.contentId];
                            var dataType = data_1.type;
                            var arr = dataType.split(",");
                            for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                                var key = arr_1[_i];
                                if ((Number(key) == TipsMsgType.TIPS_POPMSG)) {
                                    game.modules.chat.models.ChatProxy.getInstance().event(game.modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS, str);
                                }
                            }
                            //从本地取出消息列表
                            models.FriendModel.getInstance().setSystemMessageRecord();
                        }
                        models.FriendProxy.getInstance().event(models.SSendSystemMessageToRole_EVENT);
                    };
                    /** * 服务器返回推荐好友 */
                    FriendProxy.prototype.onRecommendFriend = function (optcode, msg) {
                        models.FriendModel.getInstance().SRecommendFriendData.set("data", msg);
                        models.FriendProxy.getInstance().event(models.SRecommendFriend_EVENT);
                    };
                    /** * 搜索好友成功S-->C */
                    FriendProxy.prototype.onSearchFriend = function (optcode, msg) {
                        models.FriendModel.getInstance().SSearchFriendData.set("data", msg);
                        models.FriendProxy.getInstance().event(models.SSearchFriend_EVENT);
                    };
                    /** * 添加好友成功S-->C */
                    FriendProxy.prototype.onAddFriend = function (optcode, msg) {
                        models.FriendModel.getInstance().SAddFriendData.set("data", msg);
                        //添加好友成功，按照好友在线状态，进行排序，在线好友在前，离线好友在后
                        if (msg.FriendInfoBean.online == FriendEnum.OFFLINE_STATE) {
                            models.FriendModel.getInstance().touxiangImgArr.push({ img: "common/icon/grayavatarrole/" + (FriendEnum.GRAY_ROLE_IMG_ID + msg.FriendInfoBean.shape) + ".png" });
                            this.setFriendZhiyeImg(msg.FriendInfoBean.school, FriendEnum.PAIXU_HOU);
                            models.FriendModel.getInstance().friendNameArr.push(msg.FriendInfoBean.name);
                            models.FriendModel.getInstance().friendLevelArr.push(msg.FriendInfoBean.roleLevel);
                            models.FriendModel.getInstance().friendIdArr.push(msg.FriendInfoBean.roleId);
                            models.FriendModel.getInstance().touxiangIdArr.push(msg.FriendInfoBean.shape);
                            models.FriendModel.getInstance().zhiyeIdArr.push(msg.FriendInfoBean.school);
                            models.FriendModel.getInstance().friendIsOnline.push(FriendEnum.OFFLINE_STATE);
                            models.FriendModel.getInstance().friendDegreeDic.set(msg.FriendInfoBean.roleId, FriendEnum.FRIEND_DRGREE); //初始好友度
                            FriendProxy.getInstance().event(models.SAddFriend_EVENT);
                        }
                        else {
                            models.FriendModel.getInstance().touxiangImgArr.unshift({ img: "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + msg.FriendInfoBean.shape) + ".png" });
                            this.setFriendZhiyeImg(msg.FriendInfoBean.school, FriendEnum.PAIXU_QIAN);
                            models.FriendModel.getInstance().friendNameArr.unshift(msg.FriendInfoBean.name);
                            models.FriendModel.getInstance().friendLevelArr.unshift(msg.FriendInfoBean.roleLevel);
                            models.FriendModel.getInstance().friendIdArr.unshift(msg.FriendInfoBean.roleId);
                            models.FriendModel.getInstance().touxiangIdArr.unshift(msg.FriendInfoBean.shape);
                            models.FriendModel.getInstance().zhiyeIdArr.unshift(msg.FriendInfoBean.school);
                            models.FriendModel.getInstance().friendIsOnline.unshift(FriendEnum.ONLINE_STATE);
                            models.FriendModel.getInstance().friendDegreeDic.set(msg.FriendInfoBean.roleId, FriendEnum.FRIEND_DRGREE); //初始好友度
                            FriendProxy.getInstance().event(models.SAddFriend_EVENT);
                        }
                    };
                    /** * 好友信息初始化加载*/
                    FriendProxy.prototype.onFriendsInfoInit = function (optcode, msg) {
                        models.FriendModel.getInstance().SFriendsInfoInitData.set("data", msg);
                        //按在线状态排序
                        for (var i = 0; i < msg.friends.length; i++) {
                            if (msg.friends[i]["FriendInfoBean"]["online"] == FriendEnum.OFFLINE_STATE) {
                                models.FriendModel.getInstance().touxiangImgArr.push({ img: "common/icon/grayavatarrole/" + (FriendEnum.GRAY_ROLE_IMG_ID + msg.friends[i]["FriendInfoBean"]["shape"]) + ".png" });
                                models.FriendModel.getInstance().touxiangIdArr.push(msg.friends[i]["FriendInfoBean"]["shape"]);
                                models.FriendModel.getInstance().zhiyeIdArr.push(msg.friends[i]["FriendInfoBean"]["school"]);
                                this.setFriendZhiyeImg(msg.friends[i]["FriendInfoBean"]["school"], FriendEnum.PAIXU_HOU);
                                models.FriendModel.getInstance().friendNameArr.push(msg.friends[i]["FriendInfoBean"]["name"]);
                                models.FriendModel.getInstance().friendLevelArr.push(msg.friends[i]["FriendInfoBean"]["roleLevel"]);
                                models.FriendModel.getInstance().friendIdArr.push(msg.friends[i]["FriendInfoBean"]["roleId"]);
                                models.FriendModel.getInstance().friendIsOnline.push(FriendEnum.OFFLINE_STATE);
                                models.FriendModel.getInstance().friendDegreeDic.set(msg.friends[i]["FriendInfoBean"]["roleId"], msg.friends[i]["friendLevel"]); //初始化好友度
                            }
                            else {
                                models.FriendModel.getInstance().touxiangImgArr.unshift({ img: "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + msg.friends[i]["FriendInfoBean"]["shape"]) + ".png" });
                                models.FriendModel.getInstance().touxiangIdArr.unshift(msg.friends[i]["FriendInfoBean"]["shape"]);
                                models.FriendModel.getInstance().zhiyeIdArr.unshift(msg.friends[i]["FriendInfoBean"]["school"]);
                                this.setFriendZhiyeImg(msg.friends[i]["FriendInfoBean"]["school"], FriendEnum.PAIXU_QIAN);
                                models.FriendModel.getInstance().friendNameArr.unshift(msg.friends[i]["FriendInfoBean"]["name"]);
                                models.FriendModel.getInstance().friendLevelArr.unshift(msg.friends[i]["FriendInfoBean"]["roleLevel"]);
                                models.FriendModel.getInstance().friendIdArr.unshift(msg.friends[i]["FriendInfoBean"]["roleId"]);
                                models.FriendModel.getInstance().friendIsOnline.unshift(FriendEnum.ONLINE_STATE);
                                models.FriendModel.getInstance().friendDegreeDic.set(msg.friends[i]["FriendInfoBean"]["roleId"], msg.friends[i]["friendLevel"]); //初始化好友度
                            }
                        }
                        FriendProxy.getInstance().event(models.SFriendsInfoInit_EVENT);
                    };
                    /**删除好友成功 */
                    FriendProxy.prototype.onBreakOffRelation = function (optcode, msg) {
                        models.FriendModel.getInstance().SBreakOffRelationData.set("data", msg);
                        //删除好友成功后，移除好友列表中对应的好友
                        models.FriendModel.getInstance().removeFriend(msg.roleid);
                        FriendProxy.getInstance().event(models.SBreakOffRelation_EVENT, msg.roleid);
                    };
                    /**服务器通知客户端刷新好友度 */
                    FriendProxy.prototype.onUpdateFriendLevel = function (optcode, msg) {
                        models.FriendModel.getInstance().SUpdateFriendLevelData.set("data", msg);
                        models.FriendModel.getInstance().friendDegreeDic.set(msg.friendid, msg.currentFriendLevel);
                        FriendProxy.getInstance().event(models.SUpdateFriendLevel_EVENT);
                    };
                    /** * 服务器返回搜索的角色信息*/
                    FriendProxy.prototype.onSearchBlackRoleInfo = function (optcode, msg) {
                        models.FriendModel.getInstance().SSearchBlackRoleInfoData.set("data", msg);
                        models.FriendProxy.getInstance().event(models.SSearchBlackRoleInfo_EVENT);
                    };
                    /** * 服务器返回黑名单列表信息*/
                    FriendProxy.prototype.onBlackRoles = function (optcode, msg) {
                        models.FriendModel.getInstance().SBlackRolesData.set("data", msg);
                        models.FriendProxy.getInstance().event(models.SBlackRoles_EVENT);
                    };
                    /** * 好友聊天聊天S-->C*/
                    FriendProxy.prototype.onFriendMessageToRole = function (optcode, msg) {
                        models.FriendModel.getInstance().SFriendMessageToRoleData.set("data", msg);
                        models.FriendProxy.getInstance().event(models.SFriendMessageToRole_EVENT);
                    };
                    /** * 角色上线客户端收到 离线消息*/
                    FriendProxy.prototype.onOffLineMsgMessageToRole = function (optcode, msg) {
                        models.FriendModel.getInstance().SOffLineMsgMessageToRoleData.set("data", msg);
                        models.FriendProxy.getInstance().event(models.SOffLineMsgMessageToRole_EVENT);
                    };
                    /** * 返回服务器id*/
                    FriendProxy.prototype.onRspServerId = function (optcode, msg) {
                        models.FriendModel.getInstance().SRspServerIdData.set("data", msg);
                        models.FriendProxy.getInstance().event(models.SRspServerId_EVENT);
                    };
                    /** * 请求招募大转盘信息结果*/
                    FriendProxy.prototype.onReqRecruitWheel = function (optcode, msg) {
                        models.FriendModel.getInstance().SReqRecruitWheelData.set("data", msg);
                        models.FriendProxy.getInstance().event(models.SReqRecruitWheel_EVENT);
                    };
                    /** * 服务器发送抽奖*/
                    FriendProxy.prototype.onReqFortuneWheel = function (optcode, msg) {
                        models.FriendModel.getInstance().SReqFortuneWheelData.set("data", msg);
                        models.FriendProxy.getInstance().event(models.SReqFortuneWheel_EVENT);
                        if (modules.activity.models.ActivityModel.getInstance().isOver) {
                            modules.activity.models.ActivityProxy._instance.event(modules.activity.models.PINGJI_EVENT);
                        }
                    };
                    /**通知客户端刷新邮件 */
                    FriendProxy.prototype.onMailInfo = function (optcode, msg) {
                        models.FriendModel.getInstance().SMailInfoData.set("data", msg);
                        models.FriendProxy.getInstance().event(models.SMailInfo_EVENT);
                    };
                    /**通知客户端刷新邮件状态 */
                    FriendProxy.prototype.onMailState = function (optcode, msg) {
                        models.FriendModel.getInstance().SMailStateData.set("data", msg);
                        models.FriendProxy.getInstance().event(models.SMailState_EVENT);
                    };
                    /**通知客户端邮件列表 */
                    FriendProxy.prototype.onMailList = function (optcode, msg) {
                        models.FriendModel.getInstance().SMailListData.set("data", msg);
                        models.FriendProxy.getInstance().event(models.SMailList_EVENT);
                    };
                    /**赠送礼物结果 */
                    FriendProxy.prototype.onGiveGift = function (optcode, msg) {
                        models.FriendModel.getInstance().SGiveGiftData.set("data", msg);
                        models.FriendProxy.getInstance().event(models.SGiveGift_EVENT, [msg.result]);
                    };
                    /**赠送道具结果 */
                    FriendProxy.prototype.onGiveItem = function (optcode, msg) {
                        models.FriendModel.getInstance().SGiveItemData.set("data", msg);
                        models.FriendProxy.getInstance().event(models.SGiveItem_EVENT);
                    };
                    /**返回玩家请求的其他玩家的组队情况 */
                    FriendProxy.prototype.onAnswerRoleTeamState = function (optcode, msg) {
                        models.FriendModel.getInstance().SAnswerRoleTeamStateData.set("data", msg);
                        models.FriendProxy.getInstance().event(models.SAnswerRoleTeamState_EVENT);
                    };
                    /**举报返回 */
                    FriendProxy.prototype.onRoleAccusationCheck = function (optcode, msg) {
                        models.FriendModel.getInstance().SRoleAccusationCheckData.set("data", msg);
                        models.FriendProxy.getInstance().event(models.SRoleAccusationCheck_EVENT);
                    };
                    /**返回玩家信息 */
                    FriendProxy.prototype.onRequestUpdateRoleInfo = function (optcode, msg) {
                        models.FriendModel.getInstance().SRequestUpdateRoleInfoData.set("data", msg);
                        var index = models.FriendModel.getInstance().friendIdArr.indexOf(msg.FriendInfoBean.roleId);
                        models.FriendModel.getInstance().currRoleIsNotMyFriend = false;
                        //重新排序好友列表，按照在线和离线
                        if (index > -1) {
                            //先将该好友从好友列表中移除
                            models.FriendModel.getInstance().touxiangImgArr.splice(index, 1);
                            models.FriendModel.getInstance().zhiyeImgArr.splice(index, 1);
                            models.FriendModel.getInstance().friendNameArr.splice(index, 1);
                            models.FriendModel.getInstance().friendLevelArr.splice(index, 1);
                            models.FriendModel.getInstance().friendIdArr.splice(index, 1);
                            models.FriendModel.getInstance().touxiangIdArr.splice(index, 1);
                            models.FriendModel.getInstance().zhiyeIdArr.splice(index, 1);
                            if (msg.FriendInfoBean.online == FriendEnum.OFFLINE_STATE) {
                                models.FriendModel.getInstance().touxiangImgArr.push({ img: "common/icon/grayavatarrole/" + (FriendEnum.GRAY_ROLE_IMG_ID + msg.FriendInfoBean.shape) + ".png" });
                                this.setFriendZhiyeImg(msg.FriendInfoBean.school, FriendEnum.PAIXU_HOU);
                                models.FriendModel.getInstance().friendNameArr.push(msg.FriendInfoBean.name);
                                models.FriendModel.getInstance().friendLevelArr.push(msg.FriendInfoBean.roleLevel);
                                models.FriendModel.getInstance().friendIdArr.push(msg.FriendInfoBean.roleId);
                                models.FriendModel.getInstance().touxiangIdArr.push(msg.FriendInfoBean.shape);
                                models.FriendModel.getInstance().zhiyeIdArr.push(msg.FriendInfoBean.school);
                                FriendProxy.getInstance().event(models.SAddFriend_EVENT);
                            }
                            else {
                                models.FriendModel.getInstance().touxiangImgArr.unshift({ img: "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + msg.FriendInfoBean.shape) + ".png" });
                                this.setFriendZhiyeImg(msg.FriendInfoBean.school, FriendEnum.PAIXU_QIAN);
                                models.FriendModel.getInstance().friendNameArr.unshift(msg.FriendInfoBean.name);
                                models.FriendModel.getInstance().friendLevelArr.unshift(msg.FriendInfoBean.roleLevel);
                                models.FriendModel.getInstance().friendIdArr.unshift(msg.FriendInfoBean.roleId);
                                models.FriendModel.getInstance().touxiangIdArr.unshift(msg.FriendInfoBean.shape);
                                models.FriendModel.getInstance().zhiyeIdArr.unshift(msg.FriendInfoBean.school);
                                FriendProxy.getInstance().event(models.SAddFriend_EVENT);
                            }
                        }
                        else {
                            models.FriendModel.getInstance().currRoleIsNotMyFriend = true;
                        }
                        models.FriendProxy.getInstance().event(models.SRequestUpdateRoleInfo_EVENT);
                    };
                    /**设置好友职业图标
                     * pos决定从数组开头插入数据还是末尾插入数据
                     */
                    FriendProxy.prototype.setFriendZhiyeImg = function (school, pos) {
                        switch (school) {
                            case zhiye.yunxiao:
                                if (pos == FriendEnum.PAIXU_QIAN)
                                    models.FriendModel.getInstance().zhiyeImgArr.unshift("common/ui/tongyong/11.png");
                                else
                                    models.FriendModel.getInstance().zhiyeImgArr.push("common/ui/tongyong/11.png");
                                break;
                            case zhiye.dahuang:
                                if (pos == FriendEnum.PAIXU_QIAN)
                                    models.FriendModel.getInstance().zhiyeImgArr.unshift("common/ui/tongyong/12.png");
                                else
                                    models.FriendModel.getInstance().zhiyeImgArr.push("common/ui/tongyong/12.png");
                                break;
                            case zhiye.cangyu:
                                if (pos == FriendEnum.PAIXU_QIAN)
                                    models.FriendModel.getInstance().zhiyeImgArr.unshift("common/ui/tongyong/13.png");
                                else
                                    models.FriendModel.getInstance().zhiyeImgArr.push("common/ui/tongyong/13.png");
                                break;
                            case zhiye.feixue:
                                if (pos == FriendEnum.PAIXU_QIAN)
                                    models.FriendModel.getInstance().zhiyeImgArr.unshift("common/ui/tongyong/14.png");
                                else
                                    models.FriendModel.getInstance().zhiyeImgArr.push("common/ui/tongyong/14.png");
                                break;
                            case zhiye.tianlei:
                                if (pos == FriendEnum.PAIXU_QIAN)
                                    models.FriendModel.getInstance().zhiyeImgArr.unshift("common/ui/tongyong/15.png");
                                else
                                    models.FriendModel.getInstance().zhiyeImgArr.push("common/ui/tongyong/15.png");
                                break;
                            case zhiye.wuliang:
                                if (pos == FriendEnum.PAIXU_QIAN)
                                    models.FriendModel.getInstance().zhiyeImgArr.unshift("common/ui/tongyong/16.png");
                                else
                                    models.FriendModel.getInstance().zhiyeImgArr.push("common/ui/tongyong/16.png");
                                break;
                            case zhiye.xuanming:
                                if (pos == FriendEnum.PAIXU_QIAN)
                                    models.FriendModel.getInstance().zhiyeImgArr.unshift("common/ui/tongyong/17.png");
                                else
                                    models.FriendModel.getInstance().zhiyeImgArr.push("common/ui/tongyong/17.png");
                                break;
                            case zhiye.qixing:
                                if (pos == FriendEnum.PAIXU_QIAN)
                                    models.FriendModel.getInstance().zhiyeImgArr.unshift("common/ui/tongyong/18.png");
                                else
                                    models.FriendModel.getInstance().zhiyeImgArr.push("common/ui/tongyong/18.png");
                                break;
                            case zhiye.danyang:
                                if (pos == FriendEnum.PAIXU_QIAN)
                                    models.FriendModel.getInstance().zhiyeImgArr.unshift("common/ui/tongyong/19.png");
                                else
                                    models.FriendModel.getInstance().zhiyeImgArr.push("common/ui/tongyong/19.png");
                                break;
                        }
                    };
                    return FriendProxy;
                }(hanlder.ProxyBase));
                models.FriendProxy = FriendProxy;
            })(models = friend.models || (friend.models = {}));
        })(friend = modules.friend || (modules.friend = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=FriendProxy.js.map