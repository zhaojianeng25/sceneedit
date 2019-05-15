/** 是否强行赠送标识 */
var isForceGive;
(function (isForceGive) {
    /** 否 */
    isForceGive[isForceGive["NO"] = 0] = "NO";
    /** 是 */
    isForceGive[isForceGive["YES"] = 1] = "YES";
})(isForceGive || (isForceGive = {}));
;
/** 赠送结果 */
var GiveResult;
(function (GiveResult) {
    /** 成功 */
    GiveResult[GiveResult["SUCCESS"] = 0] = "SUCCESS";
    /** 双方不是双向好友 */
    GiveResult[GiveResult["FAIL"] = 1] = "FAIL";
})(GiveResult || (GiveResult = {}));
var game;
(function (game) {
    var modules;
    (function (modules) {
        var friend;
        (function (friend) {
            var models;
            (function (models) {
                /**
             * 好友系统数据存放类
             * @author  TXX
             */
                var FriendModel = /** @class */ (function () {
                    function FriendModel() {
                        /**Z招募/招募奖励 */
                        this.CRecruitRewardBinDic = {};
                        /** 好友赠送道具配置表 */
                        this.CFriendsGiveItemConfigDic = {};
                        /** 好友系统是否加载 */
                        this.initFlag = false;
                        /**系统消息时间 */
                        this.systemMessageTimeArr = [];
                        /**系统消息内容 */
                        this.systemMessageContentParamArr = [];
                        /** 好友在自己离线期间赠送的道具 */
                        this.duringOfflineFriendGiveItem = [];
                        /** 判断是否显示过离线系统好友消息 */
                        this.isShowSystemFriendMsg = false;
                        /** 判断发起联系的对象角色是否自己的好友 */
                        this.currRoleIsNotMyFriend = false;
                        FriendModel._instance = this;
                        this.SSendSystemMessageToRoleData = new Laya.Dictionary();
                        this.SRecommendFriendData = new Laya.Dictionary();
                        this.SSearchFriendData = new Laya.Dictionary();
                        this.SAddFriendData = new Laya.Dictionary();
                        this.SStrangerMessageToRoleData = new Laya.Dictionary();
                        this.SFriendsInfoInitData = new Laya.Dictionary();
                        this.SSearchBlackRoleInfoData = new Laya.Dictionary();
                        this.SBlackRolesData = new Laya.Dictionary();
                        this.SFriendMessageToRoleData = new Laya.Dictionary();
                        this.SOffLineMsgMessageToRoleData = new Laya.Dictionary();
                        this.SRspServerIdData = new Laya.Dictionary();
                        this.SReqRecruitWheelData = new Laya.Dictionary();
                        this.SReqFortuneWheelData = new Laya.Dictionary();
                        this.SMailInfoData = new Laya.Dictionary();
                        this.SMailStateData = new Laya.Dictionary();
                        this.SMailListData = new Laya.Dictionary();
                        this.SGiveGiftData = new Laya.Dictionary();
                        this.SUpdateFriendLevelData = new Laya.Dictionary();
                        this.SGiveItemData = new Laya.Dictionary();
                        this.SBreakOffRelationData = new Laya.Dictionary();
                        this.SAnswerRoleTeamStateData = new Laya.Dictionary();
                        this.SRoleAccusationCheckData = new Laya.Dictionary();
                        this.SRequestUpdateRoleInfoData = new Laya.Dictionary();
                        this.touxiangImgArr = new Array();
                        this.touxiangIdArr = new Array();
                        this.zhiyeImgArr = new Array();
                        this.zhiyeIdArr = new Array();
                        this.friendNameArr = new Array();
                        this.friendLevelArr = new Array();
                        this.friendIdArr = new Array();
                        this.friendIsOnline = new Array();
                        this.friendDegreeDic = new Laya.Dictionary();
                        this.appBase = new AppBase();
                        this.needClickNameDic = new Laya.Dictionary();
                    }
                    /**获取FriendModel的单例 */
                    FriendModel.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new FriendModel();
                        }
                        return this._instance;
                    };
                    FriendModel.clearModelData = function () {
                        friend.models.FriendModel._instance.SSendSystemMessageToRoleData = new Laya.Dictionary();
                        friend.models.FriendModel._instance.SRecommendFriendData = new Laya.Dictionary();
                        friend.models.FriendModel._instance.SSearchFriendData = new Laya.Dictionary();
                        friend.models.FriendModel._instance.SAddFriendData = new Laya.Dictionary();
                        friend.models.FriendModel._instance.SStrangerMessageToRoleData = new Laya.Dictionary();
                        friend.models.FriendModel._instance.SFriendsInfoInitData = new Laya.Dictionary();
                        friend.models.FriendModel._instance.SSearchBlackRoleInfoData = new Laya.Dictionary();
                        friend.models.FriendModel._instance.SBlackRolesData = new Laya.Dictionary();
                        friend.models.FriendModel._instance.SFriendMessageToRoleData = new Laya.Dictionary();
                        friend.models.FriendModel._instance.SOffLineMsgMessageToRoleData = new Laya.Dictionary();
                        friend.models.FriendModel._instance.SRspServerIdData = new Laya.Dictionary();
                        friend.models.FriendModel._instance.SReqRecruitWheelData = new Laya.Dictionary();
                        friend.models.FriendModel._instance.SReqFortuneWheelData = new Laya.Dictionary();
                        friend.models.FriendModel._instance.SMailInfoData = new Laya.Dictionary();
                        friend.models.FriendModel._instance.SMailStateData = new Laya.Dictionary();
                        friend.models.FriendModel._instance.SMailListData = new Laya.Dictionary();
                        friend.models.FriendModel._instance.SGiveGiftData = new Laya.Dictionary();
                        friend.models.FriendModel._instance.SUpdateFriendLevelData = new Laya.Dictionary();
                        friend.models.FriendModel._instance.SGiveItemData = new Laya.Dictionary();
                        friend.models.FriendModel._instance.SBreakOffRelationData = new Laya.Dictionary();
                        friend.models.FriendModel._instance.SAnswerRoleTeamStateData = new Laya.Dictionary();
                        friend.models.FriendModel._instance.SRoleAccusationCheckData = new Laya.Dictionary();
                        friend.models.FriendModel._instance.SRequestUpdateRoleInfoData = new Laya.Dictionary();
                        friend.models.FriendModel._instance.touxiangImgArr = new Array();
                        friend.models.FriendModel._instance.touxiangIdArr = new Array();
                        friend.models.FriendModel._instance.zhiyeImgArr = new Array();
                        friend.models.FriendModel._instance.zhiyeIdArr = new Array();
                        friend.models.FriendModel._instance.friendNameArr = new Array();
                        friend.models.FriendModel._instance.friendLevelArr = new Array();
                        friend.models.FriendModel._instance.friendIdArr = new Array();
                        friend.models.FriendModel._instance.friendIsOnline = new Array();
                        friend.models.FriendModel._instance.friendDegreeDic = new Laya.Dictionary();
                        friend.models.FriendModel._instance.appBase = new AppBase();
                        friend.models.FriendModel._instance.initFlag = false;
                        friend.models.FriendModel._instance.systemMessageTimeArr = [];
                        friend.models.FriendModel._instance.systemMessageContentParamArr = [];
                        friend.models.FriendModel._instance.duringOfflineFriendGiveItem = [];
                        friend.models.FriendModel._instance.isShowSystemFriendMsg = false;
                        friend.models.FriendModel._instance.needClickNameDic = new Laya.Dictionary();
                        friend.models.FriendModel._instance.currRoleIsNotMyFriend = false;
                    };
                    /** 判断对方角色是否是自己的好友
                     * @param roleid 对方角色id
                     */
                    FriendModel.prototype.isMyFriend = function (roleid) {
                        if (this.friendIdArr.indexOf(roleid) != -1) {
                            return FriendEnum.FRIEND_KEY;
                        }
                        return FriendEnum.STRANGE_KEY;
                    };
                    /** 判断对方角色是否在自己的黑名单中
                     * @param roleid 对方角色id
                     * @param rolename 对方角色名字
                     */
                    FriendModel.prototype.isMyBlackList = function (roleid, rolename) {
                        var _sBlackRolesData = this.SBlackRolesData.get("data");
                        var _blackRoles = _sBlackRolesData.blackRoles;
                        if (rolename != undefined) {
                            for (var i = 0; i < _blackRoles.length; i++) {
                                if (rolename == _blackRoles[i]["name"]) {
                                    return true;
                                }
                            }
                            return false;
                        }
                        else {
                            for (var i = 0; i < _blackRoles.length; i++) {
                                if (roleid == _blackRoles[i]["roleId"]) {
                                    return true;
                                }
                            }
                            return false;
                        }
                    };
                    /** 好友相关信息数据移除 */
                    FriendModel.prototype.removeFriend = function (roleid) {
                        var index = FriendModel.getInstance().friendIdArr.indexOf(roleid);
                        if (index > -1) {
                            FriendModel.getInstance().friendIdArr.splice(index, 1);
                            FriendModel.getInstance().friendNameArr.splice(index, 1);
                            FriendModel.getInstance().friendLevelArr.splice(index, 1);
                            FriendModel.getInstance().touxiangIdArr.splice(index, 1);
                            FriendModel.getInstance().zhiyeIdArr.splice(index, 1);
                            FriendModel.getInstance().touxiangImgArr.splice(index, 1);
                            FriendModel.getInstance().zhiyeImgArr.splice(index, 1);
                            FriendModel.getInstance().friendDegreeDic.remove(roleid);
                            FriendModel.getInstance().friendIsOnline.splice(index, 1);
                        }
                    };
                    /** 从本地取出消息列表 */
                    FriendModel.prototype.setSystemMessageRecord = function () {
                        models.FriendModel.getInstance().systemMessageTimeArr = [];
                        models.FriendModel.getInstance().systemMessageContentParamArr = [];
                        var account = LocalStorage.getItem("daowang_userLoginAccount");
                        var length = parseInt(LocalStorage.getItem(account + "_MessageLength"));
                        if (length == null)
                            return;
                        for (var i = 1; i <= length; i++) {
                            //位置0为消息时间，位置1为消息内容
                            var arr = LocalStorage.getItem(account + "_Message" + i).split("_");
                            if (arr.length == 2) { //arr[0],装的是系统消息收到的时间  arr[1]装消息内容
                                arr[1] = models.FriendModel.getInstance().replaceSpecialMsgContentText(arr[1]);
                            }
                            else if (arr.length == 3) { //当出现了arr[2]，是因为ui/tongyong/common_jinb.png，该图片路径中有“_”，被split("_")给分割了，以至于多出了一个arr[2],是针对客户端提示表消息id为172008
                                var str1 = arr[1];
                                var str2 = arr[2];
                                var str3 = str1 + "_" + str2; //代码进行修正这个消息内容
                                arr[1] = str3;
                            }
                            models.FriendModel.getInstance().systemMessageTimeArr.push(arr[0]);
                            models.FriendModel.getInstance().systemMessageContentParamArr.push(arr[1]);
                        }
                        console.log("----系统消息时间---：", models.FriendModel.getInstance().systemMessageTimeArr);
                        console.log("----系统消息内容---：", models.FriendModel.getInstance().systemMessageContentParamArr);
                    };
                    /** 替换掉特殊的消息内容文本 */
                    FriendModel.prototype.replaceSpecialMsgContentText = function (msg) {
                        var targetStr_1 = "<G";
                        var targetIndex_1 = msg.indexOf(targetStr_1);
                        var targetStr_2 = "G>";
                        var targetIndex_2 = msg.indexOf(targetStr_2);
                        var targetStr = "";
                        var needShowStr = "";
                        var needShowName = "";
                        var targetid;
                        if (targetIndex_1 != -1 && targetIndex_2 != -1) {
                            targetStr = msg.substring(targetIndex_1, targetIndex_2 + 2);
                            var targetStr_npc = 'npcid="';
                            var targetIndex_npc = targetStr.indexOf(targetStr_npc);
                            var targetStr_3 = "</";
                            var targetIndex_3 = targetStr.indexOf(targetStr_3);
                            if (targetIndex_npc != -1) {
                                var npcid = targetStr.substring(targetIndex_npc + targetStr_npc.length, targetIndex_3);
                                targetid = Number(npcid);
                                if (/^[0-9]+$/.test(npcid)) { //判断这个id是否是有效的纯数字id
                                    var npcinfo = game.modules.mainhud.models.HudModel.getInstance().cNPCConfigData[npcid];
                                    var npcname = npcinfo.name;
                                    needShowName = npcname;
                                    needShowStr = "<span style='color:#13ff00;fontSize:24;underline:false' href='onClickName'>" + npcname + "</span>";
                                }
                            }
                            else { //另外处理这种<G t="$parameter1$" m="$parameter2$" x="$parameter3$" y="$parameter4$ c=33FF33;</G>
                                var target_t = 't="';
                                var targetIndex_t = targetStr.indexOf(target_t);
                                var target_m = '" m="';
                                var targetIndex_m = targetStr.indexOf(target_m);
                                var target_x = '" x="';
                                var targetIndex_x = targetStr.indexOf(target_x);
                                var target_y = '" y="';
                                var targetIndex_y = targetStr.indexOf(target_y);
                                var target_c = ' c=33FF33';
                                var targetIndex_c = targetStr.indexOf(target_c);
                                var targetname = targetStr.substring(targetIndex_t + target_t.length, targetIndex_m); //目标名字
                                needShowName = targetname;
                                var targetmapid = targetStr.substring(targetIndex_m + target_m.length, targetIndex_x); //目标所在地图id
                                var targetxPos = targetStr.substring(targetIndex_x + target_x.length, targetIndex_y); //目标所在地图里坐标x的值
                                var targetyPos = targetStr.substring(targetIndex_y + target_y.length, targetIndex_c); //目标所在地图里坐标y的值
                                needShowStr = "<span style='color:#13ff00;fontSize:24'>" + targetname + "</span>";
                            }
                        }
                        msg = msg.replace(targetStr, needShowStr);
                        if (needShowName != "" && targetid) {
                            models.FriendModel.getInstance().needClickNameDic.set(msg, [{ needShowName: needShowName, targetid: targetid }]);
                        }
                        return msg;
                    };
                    /**中文字符串存放 */
                    FriendModel.chineseStr = {
                        /**最近联系 */
                        recent_contact: "最近联系",
                        /**联系人 */
                        contact: "联系人",
                        /**我的好友( */
                        friend: "我的好友(",
                        /**"/100) */
                        friendNum: "/100)",
                        /**赠送礼物 */
                        give_gift: "赠送礼物",
                        /**赠送道具 */
                        give_daoju: "赠送道具",
                        /**昵称不雅 */
                        nicheng_buya: "昵称不雅",
                        /**言行不雅 */
                        yanxing_buya: "言行不雅",
                        /**外挂举报 */
                        waigua_jubao: "外挂举报",
                        /**线下交易 */
                        xianxia_jiaoyi: "线下交易",
                        /**举报诈骗 */
                        jubao_zhanpian: "举报诈骗",
                        /**其他举报 */
                        qita_jubao: "其他举报",
                        /**已领取 */
                        yilingqu: "已领取",
                        /**领取 */
                        lingqu: "领取",
                    };
                    return FriendModel;
                }());
                models.FriendModel = FriendModel;
            })(models = friend.models || (friend.models = {}));
        })(friend = modules.friend || (modules.friend = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=FriendModel.js.map