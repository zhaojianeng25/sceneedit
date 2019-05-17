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
        var friend;
        (function (friend) {
            /** 好友系统主界面 */
            var FriendViewMediator = /** @class */ (function (_super) {
                __extends(FriendViewMediator, _super);
                function FriendViewMediator(uiLayer, app) {
                    var _this = _super.call(this, uiLayer) || this;
                    /**任务 */
                    _this.task = [];
                    /**没有历史输入 */
                    _this.nohistory = [];
                    /**选中列表下标 */
                    _this.selectNum = -1;
                    /**选中黑名单用户列表下标 */
                    _this.selectBlackListNum = 0;
                    /**选中陌生人下标 */
                    _this.selectRecentContactNum = -1;
                    /**刷新好友状态排序 */
                    _this.refreshNum = 0;
                    /**角色头像 */
                    _this.roleinfo = [];
                    /**宠物列表 */
                    _this.petLits = [];
                    /**物品列表 */
                    _this.itemList = [];
                    /**附加信息 */
                    _this.displayInfo = [];
                    /** 是否加载过存储在本地的最近联系人数据 */
                    _this.isLoadRecentContactIdData = false;
                    /** 存放离线好友消息提示UI相关数据 */
                    _this.offlineFriendTipsUIData = new Laya.Dictionary();
                    _this._viewUI = new ui.common.FriendUI;
                    _this._app = app;
                    _this._addFriendViewViewMediator = new friend.AddFriendViewMediator(_this._app);
                    _this._ContactCharacterMediator = new friend.ContactCharacterMediator(_this._viewUI, app);
                    _this._viewUI.mouseThrough = true;
                    _this.isCenter = false;
                    _this.initialize();
                    _this.initUI();
                    _this.registerEvent();
                    return _this;
                }
                /** 加载出最近联系人 */
                FriendViewMediator.prototype.loadRecentContact = function () {
                    if (this.isLoadRecentContactIdData) { //防止重复加载最近联系人
                        return;
                    }
                    this.isLoadRecentContactIdData = true;
                    var roleid = LoginModel.getInstance().roleDetail.roleid;
                    var rolename = LoginModel.getInstance().roleDetail.rolename;
                    var recentContactIdCount = LocalStorage.getItem(roleid + "_" + rolename + "_" + "recentContactIdCount");
                    if (recentContactIdCount != null && recentContactIdCount != undefined) {
                        for (var i = 0; i < Number(recentContactIdCount); i++) {
                            var recentContactId = Number(LocalStorage.getItem(roleid + "_" + rolename + "_" + "recentContactId" + "_" + i));
                            if (recentContactId != undefined) {
                                var _flag = friend.models.FriendModel.getInstance().isMyFriend(recentContactId);
                                if (_flag == FriendEnum.FRIEND_KEY) {
                                    this.recentContactIdArr.push(recentContactId);
                                }
                            }
                        }
                        var _tempIdArr = [];
                        var _friendIdArr = FriendModel.getInstance().friendIdArr;
                        var _friendIsOnline = FriendModel.getInstance().friendIsOnline;
                        var _friendNameArr = FriendModel.getInstance().friendNameArr;
                        var _friendLevelArr = FriendModel.getInstance().friendLevelArr;
                        var _touxiangIdArr = FriendModel.getInstance().touxiangIdArr;
                        var _touxiangImgArr = FriendModel.getInstance().touxiangImgArr;
                        var _zhiyeImgArr = FriendModel.getInstance().zhiyeImgArr;
                        for (var i = 0; i < this.recentContactIdArr.length; i++) {
                            var _id = this.recentContactIdArr[i];
                            for (var j = 0; j < _friendIdArr.length; j++) {
                                if (_friendIdArr[j] == _id) {
                                    var name_1 = _friendNameArr[j];
                                    var level = _friendLevelArr[j];
                                    var touxiangid = _touxiangIdArr[j];
                                    var touxiangimg = _touxiangImgArr[j];
                                    var zhiyeimg = _zhiyeImgArr[j];
                                    if (_friendIsOnline[i] == FriendEnum.OFFLINE_STATE) {
                                        _tempIdArr.push(_friendIdArr[j]);
                                        this.recentContactNameArr.push(name_1);
                                        this.recentContactLevelArr.push(level);
                                        this.recentContactHeadIdArr.push(touxiangid);
                                        this.recentContactHeadImgArr.push(touxiangimg);
                                        this.recentContactZhiyeImgArr.push(zhiyeimg);
                                    }
                                    else {
                                        _tempIdArr.unshift(_friendIdArr[j]);
                                        this.recentContactNameArr.unshift(name_1);
                                        this.recentContactLevelArr.unshift(level);
                                        this.recentContactHeadIdArr.unshift(touxiangid);
                                        this.recentContactHeadImgArr.unshift(touxiangimg);
                                        this.recentContactZhiyeImgArr.unshift(zhiyeimg);
                                    }
                                }
                            }
                        }
                        this.recentContactIdArr = _tempIdArr;
                        //判断下离线好友消息对应的好友是否在最近联系人里有过
                        var keys = this.offlineFriendTipsUIData.keys;
                        for (var i = 0; i < keys.length; i++) {
                            for (var j = 0; j < this.recentContactIdArr.length; j++) {
                                if (this.recentContactIdArr[j] == keys[i]) {
                                    var index = this.offlineFriendTipsUIData.get(keys[i]);
                                    this.switchRedPoint(keys[i], index);
                                }
                            }
                        }
                    }
                };
                /**注册事件监听 */
                FriendViewMediator.prototype.eventListener = function () {
                    //监听查看物品信息事件
                    modules.chat.models.ChatProxy.getInstance().on(modules.chat.models.SHOW_ITEM_TIPS, this, this._ShowTips);
                    //监听查看别人分享物品事件
                    modules.chat.models.ChatProxy.getInstance().on(modules.chat.models.VIWE_OTHER_ITEM, this, this._ViewOtherItem);
                    //监听查看别人任务事件
                    modules.chat.models.ChatProxy.getInstance().on(modules.chat.models.VIWE_SHARE_TASK, this, this._ViewShareTask);
                    //监听查看宠物详情事件
                    modules.pet.models.PetProxy.getInstance().on(modules.pet.models.GETPETINFO, this, this.OpPetInfo);
                };
                /**初始化 */
                FriendViewMediator.prototype.initialize = function () {
                    this.blacklistuserNameArr = new Array();
                    this.blacklistuserLevelArr = new Array();
                    this.blacklistuserHeadImgArr = new Array();
                    this.blacklistuserZhiyeImgArr = new Array();
                    this.blacklistuserIdArr = new Array();
                    this.faceList = new Array();
                    this.quickChat = new Array();
                    this.historyInput = new Array();
                    this.shield_word = new Array();
                    this.myMsgArr = new Array();
                    this.friendMsgArr = new Array();
                    this.sendTimeArr = new Array();
                    this.friendTimeArr = new Array();
                    // this.systemMessageTimeArr = new Array<any>();
                    // this.systemMessageContentParamArr = new Array<any>();
                    this.recentContactNameArr = new Array();
                    this.recentContactLevelArr = new Array();
                    this.recentContactHeadImgArr = new Array();
                    this.recentContactZhiyeImgArr = new Array();
                    this.recentContactZhiyeIdArr = new Array();
                    this.recentContactIdArr = new Array();
                    this.torecentContactMsgArr = new Array();
                    this.recentContactMsgArr = new Array();
                    this.torecentContactTimeArr = new Array();
                    this.recentContactTimeArr = new Array();
                    this.recentContactHeadIdArr = new Array();
                    this.myMsgData = new Laya.Dictionary();
                    this.friendMsgData = new Laya.Dictionary();
                    this.sendTimeData = new Laya.Dictionary();
                    this.friendTimeData = new Laya.Dictionary();
                    this.torecentContactMsgData = new Laya.Dictionary();
                    this.recentContactMsgData = new Laya.Dictionary();
                    this.torecentContactTimeData = new Laya.Dictionary();
                    this.recentContactTimeData = new Laya.Dictionary();
                    this.selectNameArr = new Array();
                    this.selectNameArr = [friend.models.FriendModel.chineseStr.recent_contact, friend.models.FriendModel.chineseStr.contact];
                    this.banWords = modules.chat.models.ChatModel.getInstance().chatConfigBinDic;
                    this.myDisplayinfoArr = new Array();
                    this.friendDisplayinfoArr = new Array();
                    this.myDisplayinfoData = new Laya.Dictionary();
                    this.friendDisplayinfoData = new Laya.Dictionary();
                    this.torecentContactDisplayinfoArr = new Array();
                    this.recentContactDisplayinfoArr = new Array();
                    this.torecentContactDisplayinfoData = new Laya.Dictionary();
                    this.recentContactDisplayinfoData = new Laya.Dictionary();
                };
                /**好友列表刷新 */
                FriendViewMediator.prototype.onRequestUpdateRoleInfo = function (e) {
                    var _currRoleIsNotMyFriend = friend.models.FriendModel.getInstance().currRoleIsNotMyFriend;
                    if (!_currRoleIsNotMyFriend) {
                        if (this.key) {
                            this.refreshNum++;
                            //全部好友状态刷新完毕，刷新列表
                            if (this.refreshNum == FriendModel.getInstance().friendIdArr.length) {
                                this.refreshNum = 0;
                                this.getListData();
                            }
                        }
                    }
                    else {
                        var _sRequestUpdateRoleInfo = friend.models.FriendModel.getInstance().SRequestUpdateRoleInfoData.get("data").FriendInfoBean;
                        var _roleinfodata = [{
                                roleId: _sRequestUpdateRoleInfo.roleId,
                                name: _sRequestUpdateRoleInfo.name,
                                roleLevel: _sRequestUpdateRoleInfo.roleLevel,
                                shape: _sRequestUpdateRoleInfo.shape,
                                school: _sRequestUpdateRoleInfo.school,
                                online: _sRequestUpdateRoleInfo.online
                            }];
                        this.ontransMessage(_roleinfodata[0]);
                    }
                };
                /**发送消息给指定账号
                 * @param roleinfodata 所要发送消息给的对象角色信息数据
                 * @describe 取角色id 角色名字 角色等级时，做了判断，可能是从等级排行榜那边要发送消息
                 */
                FriendViewMediator.prototype.ontransMessage = function (roleinfodata) {
                    var roleid;
                    if (roleinfodata.roleid) {
                        roleid = roleinfodata.roleid; //等级排行榜的
                    }
                    else {
                        roleid = roleinfodata.roleId;
                    }
                    var rolename;
                    if (roleinfodata.rolename) {
                        rolename = roleinfodata.rolename; //等级排行榜的
                    }
                    else {
                        rolename = roleinfodata.name;
                    }
                    var rolelevel;
                    if (roleinfodata.roleLevel) {
                        rolelevel = roleinfodata.roleLevel;
                    }
                    else {
                        rolelevel = roleinfodata.level; //等级排行榜的
                    }
                    var isFriendIndex = FriendModel.getInstance().friendIdArr.indexOf(roleid);
                    var isRecentContactIndex = this.recentContactIdArr.indexOf(roleid);
                    if (isRecentContactIndex != -1) {
                        if (isFriendIndex != -1) { //并且还是好友
                            this.onSelect(isFriendIndex);
                        }
                        else {
                            this.onRecentContactSelect(isRecentContactIndex);
                        }
                        var _recentContactRoleInfo_btn_1 = this._viewUI.recentContact_list.getCell(isRecentContactIndex).getChildByName("recentContactRoleInfo_btn");
                        this.showSelected(_recentContactRoleInfo_btn_1, isRecentContactIndex);
                        return;
                    }
                    //是最新的谈话，不是最近联系过（指玩家当前角色在线期间）
                    if (roleinfodata.online == FriendEnum.OFFLINE_STATE) {
                        this.recentContactIdArr.push(roleid);
                        this.recentContactNameArr.push(rolename);
                        this.recentContactLevelArr.push(rolelevel);
                        this.recentContactHeadIdArr.push(roleinfodata.shape);
                        this.recentContactHeadImgArr.push({ img: "common/icon/grayavatarrole/" + (FriendEnum.GRAY_ROLE_IMG_ID + roleinfodata.shape) + ".png" });
                        this.setRecentContactZhiyeImg(roleinfodata.school);
                    }
                    else {
                        this.recentContactIdArr = this.arrayHeadInsert(roleid, this.recentContactIdArr);
                        this.recentContactNameArr = this.arrayHeadInsert(rolename, this.recentContactNameArr);
                        this.recentContactLevelArr = this.arrayHeadInsert(rolelevel, this.recentContactLevelArr);
                        this.recentContactHeadIdArr = this.arrayHeadInsert(roleinfodata.shape, this.recentContactHeadIdArr);
                        this.recentContactHeadImgArr = this.arrayHeadInsert({ img: "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + roleinfodata.shape) + ".png" }, this.recentContactHeadImgArr);
                        this.recentContactZhiyeImgArr = this.arrayHeadInsert(roleinfodata.school, this.recentContactZhiyeImgArr, roleinfodata.school);
                    }
                    this.getRecentContactListData();
                    if (isFriendIndex != -1) {
                        this.onSelect(isFriendIndex);
                    }
                    else {
                        isRecentContactIndex = this.recentContactIdArr.indexOf(roleid);
                        this.onRecentContactSelect(isRecentContactIndex);
                    }
                    var _recentContactRoleInfo_btn = this._viewUI.recentContact_list.getCell(0).getChildByName("recentContactRoleInfo_btn");
                    this.showSelected(_recentContactRoleInfo_btn, isRecentContactIndex);
                    this.chatDataWriteToLocalStorage(this.recentContactIdArr);
                };
                /** 将数据写入到本地文件 */
                FriendViewMediator.prototype.chatDataWriteToLocalStorage = function (idarr) {
                    var recentContactIdCount = idarr.length;
                    var roleid = LoginModel.getInstance().roleDetail.roleid;
                    var rolename = LoginModel.getInstance().roleDetail.rolename;
                    var flag;
                    for (var i = 0; i < recentContactIdCount; i++) {
                        var recentContactId = idarr[i];
                        //判断是否好友
                        flag = friend.models.FriendModel.getInstance().isMyFriend(recentContactId);
                        if (flag == FriendEnum.STRANGE_KEY)
                            continue; //是陌生人关系，跳过，继续循环
                        //判断是否聊过天
                        if (this.myMsgData.get(recentContactId) == undefined && this.friendMsgData.get(recentContactId) == undefined)
                            continue; //没有就跳过
                        LocalStorage.setItem(roleid + "_" + rolename + "_" + "recentContactId" + "_" + i, idarr[i].toString()); //再将最近联系人角色id写入本地存储
                    }
                    if (recentContactIdCount == 0) { //当最近联系人又都没有时
                        var last_recentContactIdCount = LocalStorage.getItem(roleid + "_" + rolename + "_" + "recentContactIdCount");
                        for (var i = 0; i < Number(last_recentContactIdCount); i++) {
                            LocalStorage.removeItem(roleid + "_" + rolename + "_" + "recentContactId" + "_" + i); //清空本地存储的最近联系人角色id
                        }
                    }
                    LocalStorage.setItem(roleid + "_" + rolename + "_" + "recentContactIdCount", recentContactIdCount.toString()); //将最近联系人角色id的总数量写入本地存储，用角色id和角色名字做为标识
                };
                /** 将某数据插入到数组的首位
                 * @param arrData 需要头插入的数据
                 * @param array 被插入的数组
                 */
                FriendViewMediator.prototype.arrayHeadInsert = function (arrData, array, isschool) {
                    var tempArr = [];
                    if (!isschool) {
                        tempArr.push(arrData);
                    }
                    else {
                        this.setRecentContactZhiyeImg(arrData);
                        tempArr.push(array[array.length - 1].img);
                        array.pop();
                    }
                    for (var i = 0; i < array.length; i++) {
                        tempArr.push(array[i]);
                    }
                    array = tempArr;
                    return array;
                };
                /**删除好友成功
                 * @param roleid 被删除的好友角色id
                 */
                FriendViewMediator.prototype.onBreakOffRelation = function (roleid) {
                    this._viewUI.myFriend_btn.label = friend.models.FriendModel.chineseStr.friend + FriendModel.getInstance().friendNameArr.length + friend.models.FriendModel.chineseStr.friendNum; //好友数量
                    this.friendsChatMsgs_insert_strangersChatMsgs(roleid);
                    this.getListData();
                };
                /** 好友关系的聊天消息内容插入到陌生人的聊天消息内容中去
                 * @param roleid 关系从好友变成陌生人的角色id
                 */
                FriendViewMediator.prototype.friendsChatMsgs_insert_strangersChatMsgs = function (roleid) {
                    if (this.friendMsgData.get(roleid) == null && this.friendMsgData.get(roleid) == undefined && this.myMsgData.get(roleid) == null && this.myMsgData.get(roleid) == undefined) {
                        return;
                    }
                    this.torecentContactMsgData.set(roleid, this.myMsgData.get(roleid));
                    this.recentContactMsgData.set(roleid, this.friendMsgData.get(roleid));
                    this.torecentContactTimeData.set(roleid, this.sendTimeData.get(roleid));
                    this.recentContactTimeData.set(roleid, this.friendTimeData.get(roleid));
                    this.torecentContactDisplayinfoData.set(roleid, this.myDisplayinfoData.get(roleid));
                    this.recentContactDisplayinfoData.set(roleid, this.friendDisplayinfoData.get(roleid));
                };
                /**服务器通知客户端刷新好友度 */
                FriendViewMediator.prototype.onUpdateFriendLevel = function (e) {
                    this.onSelect(this.selectNum); //手动刷新
                };
                /**陌生人聊天S-->C */
                FriendViewMediator.prototype.onStrangerMessageToRole = function (e) {
                    var data = friend.models.FriendModel.getInstance().SStrangerMessageToRoleData.get("data");
                    var roleid = data.strangerMessage.FriendInfoBean.roleId;
                    var _isBlackListFlag = friend.models.FriendModel.getInstance().isMyBlackList(roleid);
                    if (_isBlackListFlag)
                        return; //如果对方时在自己的黑名单中，就返回
                    this.updateRecentChat(roleid);
                    var time = this.getNowTime();
                    var torecentcontactmsgarr = []; //暂存发出消息
                    var recentContactmsgarr = []; //陌生人消息
                    var torecentContacttimearr = []; //发出消息时间
                    var recentContacttimearr = []; //收到消息时间
                    var torecentcontactdisplayinfoarr = []; //给陌生人附件
                    var recentcontactdisplayinfoarr = []; //陌生人附件
                    this.torecentContactMsgArr.push("");
                    this.recentContactMsgArr.push(data.strangerMessage.content);
                    this.torecentContactTimeArr.push("");
                    this.recentContactTimeArr.push(time);
                    this.torecentContactDisplayinfoArr.push("");
                    //是否有附件
                    if (data.strangerMessage.displayinfo.length > 0)
                        this.recentContactDisplayinfoArr.push(data.strangerMessage.displayinfo[0]);
                    else
                        this.recentContactDisplayinfoArr.push("");
                    for (var i = 0; i < this.torecentContactMsgArr.length; i++) {
                        torecentcontactmsgarr.push(this.torecentContactMsgArr[i]);
                    }
                    for (var i = 0; i < this.recentContactMsgArr.length; i++) {
                        recentContactmsgarr.push(this.recentContactMsgArr[i]);
                    }
                    for (var i = 0; i < this.torecentContactTimeArr.length; i++) {
                        torecentContacttimearr.push(this.torecentContactTimeArr[i]);
                    }
                    for (var i = 0; i < this.recentContactTimeArr.length; i++) {
                        recentContacttimearr.push(this.recentContactTimeArr[i]);
                    }
                    for (var i = 0; i < this.torecentContactDisplayinfoArr.length; i++) {
                        torecentcontactdisplayinfoarr.push(this.torecentContactDisplayinfoArr[i]);
                    }
                    for (var i = 0; i < this.recentContactDisplayinfoArr.length; i++) {
                        recentcontactdisplayinfoarr.push(this.recentContactDisplayinfoArr[i]);
                    }
                    this.torecentContactMsgData.set(roleid, torecentcontactmsgarr);
                    this.recentContactMsgData.set(roleid, recentContactmsgarr);
                    this.torecentContactTimeData.set(roleid, torecentContacttimearr);
                    this.recentContactTimeData.set(roleid, recentContacttimearr);
                    this.torecentContactDisplayinfoData.set(roleid, torecentcontactdisplayinfoarr);
                    this.recentContactDisplayinfoData.set(roleid, recentcontactdisplayinfoarr);
                    //初始化陌生人列表
                    var key = true;
                    for (var i = 0; i < this.recentContactIdArr.length; i++) {
                        //筛选重复id
                        if (this.recentContactIdArr[i] == roleid)
                            key = false;
                    }
                    //如果是不在陌生人列表中的陌生人发来的消息，将该陌生人添加到陌生人列表中
                    if (key) {
                        this.recentContactNameArr.push(data.strangerMessage.FriendInfoBean.name);
                        this.recentContactLevelArr.push(data.strangerMessage.FriendInfoBean.roleLevel);
                        this.recentContactIdArr.push(data.strangerMessage.FriendInfoBean.roleId);
                        if (data.strangerMessage.FriendInfoBean.online == FriendEnum.OFFLINE_STATE) {
                            this.recentContactHeadImgArr.push({ img: "common/icon/grayavatarrole/" + (FriendEnum.GRAY_ROLE_IMG_ID + data.strangerMessage.FriendInfoBean.shape) + ".png" });
                        }
                        else {
                            this.recentContactHeadImgArr.push({ img: "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + data.strangerMessage.FriendInfoBean.shape) + ".png" });
                        }
                        this.recentContactHeadIdArr.push(data.strangerMessage.FriendInfoBean.shape);
                        this.setRecentContactZhiyeImg(data.strangerMessage.FriendInfoBean.school);
                        this.recentContactZhiyeIdArr.push(data.strangerMessage.FriendInfoBean.school);
                    }
                    //收到陌生人列表中的人发来消息，在该发消息人的头像上加红点，并通知主界面加红点
                    for (var i = 0; i < this.recentContactIdArr.length; i++) {
                        if (this.recentContactIdArr[i] == roleid) {
                            var contactRolePointImg = this._viewUI.recentContact_list.getCell(i).getChildByName("recentContactRolePoint_img"); //联系人红点
                            var selectPoint = this._viewUI.select_list.getCell(0).getChildByName("selectPoint_img"); //选择按钮红点
                            selectPoint.visible = true;
                            contactRolePointImg.visible = true;
                            friend.models.FriendProxy.getInstance().event(friend.models.receiveMessage_EVENT); //收到消息事件
                        }
                    }
                    //如果与发送消息的人正在聊天，不显示消息红点
                    if (this.recentContactIdArr[this.selectRecentContactNum] == roleid && this.selectNum == -1) {
                        this.getRecentChatData();
                        var contactRolePointImg = this._viewUI.recentContact_list.getCell(this.selectRecentContactNum).getChildByName("recentContactRolePoint_img"); //联系人红点
                        var selectPoint = this._viewUI.select_list.getCell(0).getChildByName("selectPoint_img"); //选择按钮红点
                        selectPoint.visible = false;
                        friend.models.FriendProxy.getInstance().event(friend.models.readMessage_EVENT);
                        contactRolePointImg.visible = false;
                    }
                    this.getRecentContactListData();
                };
                /**角色上线客户端收到 离线消息*/
                FriendViewMediator.prototype.onOffLineMsgMessageToRole = function (e) {
                    var data = friend.models.FriendModel.getInstance().SOffLineMsgMessageToRoleData.get("data");
                    if (data != null) {
                        for (var m = data.offLineMsgList.length - 1; m >= 0; m--) {
                            var roleid = data.offLineMsgList[m]["strangerMessage"]["FriendInfoBean"]["roleId"]; //发送人id
                            var name_2 = data.offLineMsgList[m]["strangerMessage"]["FriendInfoBean"]["name"]; //发送人名字
                            var roleLevel = data.offLineMsgList[m]["strangerMessage"]["FriendInfoBean"]["roleLevel"]; //发送人等级
                            var time = data.offLineMsgList[m]["time"]; //发送时间
                            var content = data.offLineMsgList[m]["strangerMessage"]["content"]; //发送内容
                            var disPlayInfo = data.offLineMsgList[m]["strangerMessage"]["displayinfo"]; //发送附件   
                            var recentContactKey = true;
                            //好友发送的离线消息
                            for (var k = 0; k < FriendModel.getInstance().friendIdArr.length; k++) {
                                if (FriendModel.getInstance().friendIdArr[k] == roleid) {
                                    recentContactKey = false;
                                    this.updateMyChat(roleid);
                                    var mymsgarr = []; //暂存发出消息
                                    var friendmsgarr = []; //好友消息
                                    var sendtimearr = []; //发出消息时间
                                    var friendtimearr = []; //收到消息时间
                                    var mydisplayinfoarr = []; //发出附件
                                    var frienddisplayinfoarr = []; //好友附件
                                    this.myMsgArr.push("");
                                    this.friendMsgArr.push(content);
                                    this.sendTimeArr.push("");
                                    this.friendTimeArr.push(time);
                                    this.myDisplayinfoArr.push("");
                                    if (disPlayInfo.length > 0)
                                        this.friendDisplayinfoArr.push(disPlayInfo[0]);
                                    else
                                        this.friendDisplayinfoArr.push("");
                                    for (var i = 0; i < this.myMsgArr.length; i++) {
                                        mymsgarr.push(this.myMsgArr[i]);
                                    }
                                    for (var i = 0; i < this.friendMsgArr.length; i++) {
                                        friendmsgarr.push(this.friendMsgArr[i]);
                                    }
                                    for (var i = 0; i < this.sendTimeArr.length; i++) {
                                        sendtimearr.push(this.sendTimeArr[i]);
                                    }
                                    for (var i = 0; i < this.friendTimeArr.length; i++) {
                                        friendtimearr.push(this.friendTimeArr[i]);
                                    }
                                    for (var i = 0; i < this.myDisplayinfoArr.length; i++) {
                                        mydisplayinfoarr.push(this.myDisplayinfoArr[i]);
                                    }
                                    for (var i = 0; i < this.friendDisplayinfoArr.length; i++) {
                                        frienddisplayinfoarr.push(this.friendDisplayinfoArr[i]);
                                    }
                                    this.myMsgData.set(roleid, mymsgarr);
                                    this.friendMsgData.set(roleid, friendmsgarr);
                                    this.sendTimeData.set(roleid, sendtimearr);
                                    this.friendTimeData.set(roleid, friendtimearr);
                                    this.myDisplayinfoData.set(roleid, mydisplayinfoarr);
                                    this.friendDisplayinfoData.set(roleid, frienddisplayinfoarr);
                                    //显示消息红点
                                    for (var i = 0; i < FriendModel.getInstance().friendIdArr.length; i++) {
                                        if (FriendModel.getInstance().friendIdArr[i] == roleid) {
                                            var contactRolePointImg = this._viewUI.contact_list.getCell(i).getChildByName("contactRoleInfo_btn").getChildByName("contactRolePoint_img"); //联系人红点
                                            var selectPoint = this._viewUI.select_list.getCell(1).getChildByName("selectPoint_img"); //选择按钮红点
                                            selectPoint.visible = true;
                                            contactRolePointImg.visible = true;
                                            friend.models.FriendProxy.getInstance().event(friend.models.receiveMessage_EVENT); //收到消息事件
                                            this.offlineFriendTipsUIData.set(roleid, i);
                                        }
                                    }
                                    break;
                                }
                            }
                            //收到陌生人的离线消息
                            if (recentContactKey) {
                                this.updateRecentChat(roleid);
                                var torecentcontactmsgarr = []; //暂存发出消息
                                var recentContactmsgarr = []; //陌生人消息
                                var torecentContacttimearr = []; //发出消息时间
                                var recentContacttimearr = []; //收到消息时间
                                var torecentcontactdisplayinfoarr = []; //给陌生人附件
                                var recentcontactdisplayinfoarr = []; //陌生人附件
                                this.torecentContactMsgArr.push("");
                                this.recentContactMsgArr.push(content);
                                this.torecentContactTimeArr.push("");
                                this.recentContactTimeArr.push(time);
                                this.torecentContactDisplayinfoArr.push("");
                                if (disPlayInfo.length > 0)
                                    this.recentContactDisplayinfoArr.push(disPlayInfo[0]);
                                else
                                    this.recentContactDisplayinfoArr.push("");
                                for (var i = 0; i < this.torecentContactMsgArr.length; i++) {
                                    torecentcontactmsgarr.push(this.torecentContactMsgArr[i]);
                                }
                                for (var i = 0; i < this.recentContactMsgArr.length; i++) {
                                    recentContactmsgarr.push(this.recentContactMsgArr[i]);
                                }
                                for (var i = 0; i < this.torecentContactTimeArr.length; i++) {
                                    torecentContacttimearr.push(this.torecentContactTimeArr[i]);
                                }
                                for (var i = 0; i < this.recentContactTimeArr.length; i++) {
                                    recentContacttimearr.push(this.recentContactTimeArr[i]);
                                }
                                for (var i = 0; i < this.torecentContactDisplayinfoArr.length; i++) {
                                    torecentcontactdisplayinfoarr.push(this.torecentContactDisplayinfoArr[i]);
                                }
                                for (var i = 0; i < this.recentContactDisplayinfoArr.length; i++) {
                                    recentcontactdisplayinfoarr.push(this.recentContactDisplayinfoArr[i]);
                                }
                                this.torecentContactMsgData.set(roleid, torecentcontactmsgarr);
                                this.recentContactMsgData.set(roleid, recentContactmsgarr);
                                this.torecentContactTimeData.set(roleid, torecentContacttimearr);
                                this.recentContactTimeData.set(roleid, recentContacttimearr);
                                this.torecentContactDisplayinfoData.set(roleid, torecentcontactdisplayinfoarr);
                                this.recentContactDisplayinfoData.set(roleid, recentcontactdisplayinfoarr);
                                //初始化陌生人
                                var key = true;
                                for (var i = 0; i < this.recentContactIdArr.length; i++) {
                                    if (this.recentContactIdArr[i] == roleid)
                                        key = false;
                                }
                                if (key) {
                                    if (data.offLineMsgList[m]["strangerMessage"]["FriendInfoBean"]["online"] == 0) {
                                        this.recentContactHeadImgArr.push({ img: "common/icon/grayavatarrole/" + (FriendEnum.GRAY_ROLE_IMG_ID + data.offLineMsgList[m]["strangerMessage"]["FriendInfoBean"]["shape"]) + ".png" });
                                    }
                                    else {
                                        this.recentContactHeadImgArr.push({ img: "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + data.offLineMsgList[m]["strangerMessage"]["FriendInfoBean"]["shape"]) + ".png" });
                                    }
                                    this.setRecentContactZhiyeImg(data.offLineMsgList[m]["strangerMessage"]["FriendInfoBean"]["school"]);
                                    this.recentContactNameArr.push(name_2);
                                    this.recentContactLevelArr.push(roleLevel);
                                    this.recentContactIdArr.push(roleid);
                                    this.recentContactHeadIdArr.push(data.offLineMsgList[m]["strangerMessage"]["FriendInfoBean"]["shape"]);
                                    this.recentContactZhiyeIdArr.push(data.offLineMsgList[m]["strangerMessage"]["FriendInfoBean"]["school"]);
                                }
                                //显示消息红点
                                for (var i = 0; i < this.recentContactIdArr.length; i++) {
                                    if (this.recentContactIdArr[i] == roleid) {
                                        var contactRolePointImg = this._viewUI.recentContact_list.getCell(i).getChildByName("recentContactRolePoint_img"); //联系人红点
                                        var selectPoint = this._viewUI.select_list.getCell(0).getChildByName("selectPoint_img"); //选择按钮红点
                                        selectPoint.visible = true;
                                        contactRolePointImg.visible = true;
                                        friend.models.FriendProxy.getInstance().event(friend.models.receiveMessage_EVENT); //收到消息事件
                                    }
                                }
                                this.getRecentContactListData();
                            }
                        }
                    }
                };
                /**好友聊天聊天S-->C */
                FriendViewMediator.prototype.onFriendMessageToRole = function (e) {
                    var data = friend.models.FriendModel.getInstance().SFriendMessageToRoleData.get("data");
                    //判断自己的记录并将记录保存在指定存放历史记录的数组里
                    if (data.roleid == this.roleId) {
                        this.historyInput.push({ context: this.historyMsg });
                    }
                    else if (data.roleid != 0) {
                        this.updateMyChat(data.roleid);
                        var time = this.getNowTime();
                        var mymsgarr = []; //暂存发出消息
                        var friendmsgarr = []; //好友消息
                        var sendtimearr = []; //发出消息时间
                        var friendtimearr = []; //收到消息时间
                        var mydisplayinfoarr = []; //发出附件
                        var frienddisplayinfoarr = []; //好友附件
                        this.myMsgArr.push("");
                        this.friendMsgArr.push(data.content);
                        this.sendTimeArr.push("");
                        this.friendTimeArr.push(time);
                        this.myDisplayinfoArr.push("");
                        if (data.displayinfo.length > 0)
                            this.friendDisplayinfoArr.push(data.displayinfo[0]);
                        else
                            this.friendDisplayinfoArr.push("");
                        for (var i = 0; i < this.myMsgArr.length; i++) {
                            mymsgarr.push(this.myMsgArr[i]);
                        }
                        for (var i = 0; i < this.friendMsgArr.length; i++) {
                            friendmsgarr.push(this.friendMsgArr[i]);
                        }
                        for (var i = 0; i < this.sendTimeArr.length; i++) {
                            sendtimearr.push(this.sendTimeArr[i]);
                        }
                        for (var i = 0; i < this.friendTimeArr.length; i++) {
                            friendtimearr.push(this.friendTimeArr[i]);
                        }
                        for (var i = 0; i < this.myDisplayinfoArr.length; i++) {
                            mydisplayinfoarr.push(this.myDisplayinfoArr[i]);
                        }
                        for (var i = 0; i < this.friendDisplayinfoArr.length; i++) {
                            frienddisplayinfoarr.push(this.friendDisplayinfoArr[i]);
                        }
                        this.myMsgData.set(data.roleid, mymsgarr);
                        this.friendMsgData.set(data.roleid, friendmsgarr);
                        this.sendTimeData.set(data.roleid, sendtimearr);
                        this.friendTimeData.set(data.roleid, friendtimearr);
                        this.myDisplayinfoData.set(data.roleid, mydisplayinfoarr);
                        this.friendDisplayinfoData.set(data.roleid, frienddisplayinfoarr);
                        //显示消息红点
                        for (var i = 0; i < FriendModel.getInstance().friendIdArr.length; i++) {
                            //收到好友列表中的好友发来消息，在该好友头像上加红点，并通知主界面加红点
                            if (FriendModel.getInstance().friendIdArr[i] == data.roleid) {
                                var contactRolePointImg = this._viewUI.contact_list.getCell(i).getChildByName("contactRoleInfo_btn").getChildByName("contactRolePoint_img"); //联系人红点
                                var selectPoint = this._viewUI.select_list.getCell(1).getChildByName("selectPoint_img"); //选择按钮红点
                                selectPoint.visible = true;
                                contactRolePointImg.visible = true;
                                friend.models.FriendProxy.getInstance().event(friend.models.receiveMessage_EVENT); //收到消息事件
                            }
                            this.switchRedPoint(data.roleid, i);
                        }
                        //如果与发送消息的人正在聊天，不显示消息红点
                        if (FriendModel.getInstance().friendIdArr[this.selectNum] == data.roleid && this.selectRecentContactNum == -1) {
                            this.getMyChatData();
                            var contactRolePointImg = this._viewUI.contact_list.getCell(this.selectNum).getChildByName("contactRoleInfo_btn").getChildByName("contactRolePoint_img"); //联系人红点
                            var selectPoint = this._viewUI.select_list.getCell(1).getChildByName("selectPoint_img"); //选择按钮红点
                            selectPoint.visible = false;
                            friend.models.FriendProxy.getInstance().event(friend.models.readMessage_EVENT);
                            contactRolePointImg.visible = false;
                        }
                    }
                    else {
                        //当好友下线
                        this.historyInput.push({ context: this.historyMsg });
                    }
                    this.repstr = "";
                    this._viewUI.chatInput_tex.text = "";
                };
                /** 联系人切换到最近联系显示红点
                 * @param roleid 发起聊天的对方角色id
                 * @param index 联系人那边索引位置
                 * @describe 判断对方角色id是否添加到最近联系人
                 *          如果有，就切换到最近联系那显示红点
                 */
                FriendViewMediator.prototype.switchRedPoint = function (roleid, index) {
                    for (var i = 0; i < this.recentContactIdArr.length; i++) {
                        if (this.recentContactIdArr[i] == roleid) {
                            //联系人那边不显示红点
                            var contactRolePointImg1 = this._viewUI.contact_list.getCell(index).getChildByName("contactRoleInfo_btn").getChildByName("contactRolePoint_img"); //联系人红点
                            var selectPoint1 = this._viewUI.select_list.getCell(1).getChildByName("selectPoint_img"); //联系人选择按钮红点
                            selectPoint1.visible = false;
                            contactRolePointImg1.visible = false;
                            //最近联系人那边显示红点
                            var contactRolePointImg2 = this._viewUI.recentContact_list.getCell(i).getChildByName("recentContactRolePoint_img"); //最近联系人红点
                            var selectPoint2 = this._viewUI.select_list.getCell(0).getChildByName("selectPoint_img"); //最近联系人选择按钮红点
                            selectPoint2.visible = true;
                            contactRolePointImg2.visible = true;
                            var recentContactRoleInfo_btn = this._viewUI.recentContact_list.getCell(i).getChildByName("recentContactRoleInfo_btn");
                            recentContactRoleInfo_btn.once(LEvent.CLICK, this, this.hideRedPoint, [selectPoint2, contactRolePointImg2]);
                            this.getRecentChatData();
                        }
                    }
                };
                /** 隐藏红点 */
                FriendViewMediator.prototype.hideRedPoint = function (img1, img2) {
                    if (img1.visible == true && img2.visible == true) {
                        img1.visible = false;
                        img2.visible = false;
                        friend.models.FriendProxy.getInstance().event(friend.models.readMessage_EVENT);
                    }
                };
                /**更新陌生人聊天 */
                FriendViewMediator.prototype.updateRecentChat = function (roleid) {
                    //如果与陌生人对话的字典中有数据，取出，赋给当前陌生人对话数组
                    if (this.recentContactMsgData.get(roleid) != null) {
                        this.torecentContactMsgArr.length = 0;
                        this.recentContactMsgArr.length = 0;
                        this.torecentContactTimeArr.length = 0;
                        this.recentContactTimeArr.length = 0;
                        this.torecentContactDisplayinfoArr.length = 0;
                        this.recentContactDisplayinfoArr.length = 0;
                        for (var i = 0; i < this.torecentContactMsgData.get(roleid).length; i++) {
                            this.torecentContactMsgArr.push(this.torecentContactMsgData.get(roleid)[i]);
                        }
                        for (var i = 0; i < this.recentContactMsgData.get(roleid).length; i++) {
                            this.recentContactMsgArr.push(this.recentContactMsgData.get(roleid)[i]);
                        }
                        for (var i = 0; i < this.torecentContactTimeData.get(roleid).length; i++) {
                            this.torecentContactTimeArr.push(this.torecentContactTimeData.get(roleid)[i]);
                        }
                        for (var i = 0; i < this.recentContactTimeData.get(roleid).length; i++) {
                            this.recentContactTimeArr.push(this.recentContactTimeData.get(roleid)[i]);
                        }
                        for (var i = 0; i < this.torecentContactDisplayinfoData.get(roleid).length; i++) {
                            this.torecentContactDisplayinfoArr.push(this.torecentContactDisplayinfoData.get(roleid)[i]);
                        }
                        for (var i = 0; i < this.recentContactDisplayinfoData.get(roleid).length; i++) {
                            this.recentContactDisplayinfoArr.push(this.recentContactDisplayinfoData.get(roleid)[i]);
                        }
                    }
                    else if (this.recentContactMsgData.get(roleid) == null) {
                        this.torecentContactMsgArr.length = 0;
                        this.recentContactMsgArr.length = 0;
                        this.torecentContactTimeArr.length = 0;
                        this.recentContactTimeArr.length = 0;
                        this.torecentContactDisplayinfoArr.length = 0;
                        this.recentContactDisplayinfoArr.length = 0;
                    }
                };
                /**更新好友聊天 */
                FriendViewMediator.prototype.updateMyChat = function (roleid) {
                    //如果与好友对话的字典中有数据，取出，赋给当前好友对话数组
                    if (this.friendMsgData.get(roleid) != null) {
                        this.myMsgArr.length = 0;
                        this.sendTimeArr.length = 0;
                        this.friendMsgArr.length = 0;
                        this.friendTimeArr.length = 0;
                        this.myDisplayinfoArr.length = 0;
                        this.friendDisplayinfoArr.length = 0;
                        for (var i = 0; i < this.myMsgData.get(roleid).length; i++) {
                            this.myMsgArr.push(this.myMsgData.get(roleid)[i]);
                        }
                        for (var i = 0; i < this.friendMsgData.get(roleid).length; i++) {
                            this.friendMsgArr.push(this.friendMsgData.get(roleid)[i]);
                        }
                        for (var i = 0; i < this.sendTimeData.get(roleid).length; i++) {
                            this.sendTimeArr.push(this.sendTimeData.get(roleid)[i]);
                        }
                        for (var i = 0; i < this.friendTimeData.get(roleid).length; i++) {
                            this.friendTimeArr.push(this.friendTimeData.get(roleid)[i]);
                        }
                        for (var i = 0; i < this.myDisplayinfoData.get(roleid).length; i++) {
                            this.myDisplayinfoArr.push(this.myDisplayinfoData.get(roleid)[i]);
                        }
                        for (var i = 0; i < this.friendDisplayinfoData.get(roleid).length; i++) {
                            this.friendDisplayinfoArr.push(this.friendDisplayinfoData.get(roleid)[i]);
                        }
                    }
                    else if (this.friendMsgData.get(roleid) == null) {
                        this.myMsgArr.length = 0;
                        this.sendTimeArr.length = 0;
                        this.friendMsgArr.length = 0;
                        this.friendTimeArr.length = 0;
                        this.myDisplayinfoArr.length = 0;
                        this.friendDisplayinfoArr.length = 0;
                    }
                };
                /**与陌生人聊天列表初始化 */
                FriendViewMediator.prototype.getRecentChatData = function () {
                    this._viewUI.recentChatInfo_list.vScrollBarSkin = "";
                    this._viewUI.recentChatInfo_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.recentChatInfo_list.scrollBar.elasticDistance = 50;
                    this._viewUI.recentChatInfo_list.array = this.torecentContactMsgArr;
                    this._viewUI.recentChatInfo_list.renderHandler = new Handler(this, this.onRenderRecentChatItem);
                    //保持输入的值在第一视角
                    if (this.torecentContactMsgArr.length > 2)
                        this._viewUI.recentChatInfo_list.scrollTo(this.torecentContactMsgArr.length - 1);
                };
                /**陌生人聊天列表渲染 */
                FriendViewMediator.prototype.onRenderRecentChatItem = function (cell, index) {
                    //渲染自己发出的消息
                    var weChat = cell.getChildByName("weChatLogo_img");
                    weChat.visible = true;
                    if (this.torecentContactMsgArr[index] == "") {
                        weChat.visible = false;
                    }
                    var roleLogo = cell.getChildByName("weChatLogo_img").getChildByName("roleLogo_img");
                    this.chatContent = cell.getChildByName("weChatLogo_img").getChildByName("chat0_txtarea");
                    var weChat_img = cell.getChildByName("weChatLogo_img").getChildByName("weChat_img");
                    var timeLab1 = cell.getChildByName("weChatLogo_img").getChildByName("time_lab");
                    timeLab1.text = this.torecentContactTimeArr[index];
                    this.chatContent.innerHTML = "<span style='font:24px ;color:#50321a'>" + ChatModel.getInstance().getFaceHtmlText(this.torecentContactMsgArr[index]) + "</span>";
                    this.chatContent.style.width = 380;
                    if (this.chatContent.contextWidth >= 370) {
                        this.chatContent.style.align = "left";
                    }
                    else {
                        this.chatContent.style.align = "right";
                    }
                    weChat_img.height = this.chatContent.contextHeight + 15;
                    weChat_img.width = this.chatContent.contextWidth + 20;
                    roleLogo.skin = "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + this.shape) + ".png";
                    //如果发送的是道具，给文本添加监听事件，可以弹出信息
                    if (this.torecentContactDisplayinfoArr[index] != "" && this.torecentContactDisplayinfoArr[index].displaytype == DisplayType.DISPLAY_ITEM)
                        this.chatContent.on(LEvent.MOUSE_DOWN, this, this.showItemTips, [this.torecentContactDisplayinfoArr[index]]);
                    else if (this.torecentContactDisplayinfoArr[index] != "")
                        this.chatContent.on(LEvent.MOUSE_DOWN, this, this.otherOnItem, [this.torecentContactDisplayinfoArr[index], this.torecentContactMsgArr[index]]);
                    var otherChat = cell.getChildByName("otherChatLogo_img");
                    otherChat.visible = true;
                    if (this.recentContactMsgArr[index] == "") {
                        otherChat.visible = false;
                    }
                    this.chatContent = cell.getChildByName("otherChatLogo_img").getChildByName("chat0_txtarea");
                    var img = cell.getChildByName("otherChatLogo_img").getChildByName("otherChat_img");
                    var otherRoleLogo = cell.getChildByName("otherChatLogo_img").getChildByName("roleLogo_img");
                    var timeLab = cell.getChildByName("otherChatLogo_img").getChildByName("time_lab");
                    timeLab.text = this.recentContactTimeArr[index];
                    this.chatContent.innerHTML = "<span style='font:24px ;color:#50321a; SimHei'> " + ChatModel.getInstance().getFaceHtmlText(this.recentContactMsgArr[index]) + "</span>";
                    img.height = this.chatContent.contextHeight + 15;
                    img.width = this.chatContent.contextWidth + 25;
                    otherRoleLogo.skin = "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + this.recentContactHeadIdArr[this.selectRecentContactNum]) + ".png";
                    //如果发送的是道具，给文本添加监听事件，可以弹出信息
                    if (this.recentContactDisplayinfoArr[index] != "") {
                        this.chatContent.on(LEvent.MOUSE_DOWN, this, this.otherOnItem, [this.recentContactDisplayinfoArr[index], this.recentContactMsgArr[index]]);
                    }
                };
                /**好友聊天列表初始化 */
                FriendViewMediator.prototype.getMyChatData = function () {
                    this._viewUI.mychatInfo_list.vScrollBarSkin = "";
                    this._viewUI.mychatInfo_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.mychatInfo_list.scrollBar.elasticDistance = 50;
                    this._viewUI.mychatInfo_list.array = this.myMsgArr;
                    this._viewUI.mychatInfo_list.renderHandler = new Handler(this, this.onRenderMyChatItem);
                    //保持输入的值在第一视角
                    if (this.myMsgArr.length > 2)
                        this._viewUI.mychatInfo_list.scrollTo(this.myMsgArr.length - 1);
                    if (this.myMsgArr.length != 0 || this.friendMsgArr.length != 0) {
                        this.addRecentContacts();
                        this.chatDataWriteToLocalStorage(this.recentContactIdArr);
                    }
                };
                /** 将接受到好友最近聊天消息的对应好友添加到最近联系人中去 */
                FriendViewMediator.prototype.addRecentContacts = function () {
                    //定义临时角色id，角色名字，角色等级，角色模型id，角色职业id的变量，角色在线状态
                    var roleid, rolename, rolelevel, roleshape, roleschool, rolelinestate;
                    var friendModel = FriendModel.getInstance();
                    roleid = friendModel.friendIdArr[this.selectNum];
                    rolename = friendModel.friendNameArr[this.selectNum];
                    rolelevel = friendModel.friendLevelArr[this.selectNum];
                    roleshape = friendModel.touxiangIdArr[this.selectNum];
                    roleschool = friendModel.zhiyeIdArr[this.selectNum];
                    rolelinestate = friendModel.friendIsOnline[this.selectNum];
                    for (var i = 0; i < this.recentContactIdArr.length; i++) {
                        if (this.recentContactIdArr[i] == roleid) {
                            this.recentContactIdArr.splice(i, 1);
                            this.recentContactNameArr.splice(i, 1);
                            this.recentContactLevelArr.splice(i, 1);
                            this.recentContactHeadImgArr.splice(i, 1);
                            this.recentContactZhiyeImgArr.splice(i, 1);
                        }
                    }
                    this.recentContactIdArr.unshift(roleid);
                    this.recentContactNameArr.unshift(rolename);
                    this.recentContactLevelArr.unshift(rolelevel);
                    //this.recentContactHeadIdArr.unshift(roleshape);
                    if (rolelinestate != FriendEnum.OFFLINE_STATE) {
                        this.recentContactHeadImgArr.unshift({ img: "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + roleshape) + ".png" }); //在线的小头像
                    }
                    else {
                        this.recentContactHeadImgArr.unshift({ img: "common/icon/grayavatarrole/" + (FriendEnum.GRAY_ROLE_IMG_ID + roleshape) + ".png" }); //不在线的小头像
                    }
                    this.recentContactZhiyeImgArr = this.arrayHeadInsert(roleschool, this.recentContactZhiyeImgArr, roleschool);
                    // this.getRecentContactListData();
                    // this.onRecentContactSelect(0);
                };
                /**好友聊天列表渲染 */
                FriendViewMediator.prototype.onRenderMyChatItem = function (cell, index) {
                    //渲染自己发出的消息
                    var weChat = cell.getChildByName("weChatLogo_img");
                    weChat.visible = true;
                    if (this.myMsgArr[index] == "") {
                        weChat.visible = false;
                    }
                    var roleLogo = cell.getChildByName("weChatLogo_img").getChildByName("roleLogo_img");
                    this.chatContent = cell.getChildByName("weChatLogo_img").getChildByName("chat0_txtarea");
                    var weChat_img = cell.getChildByName("weChatLogo_img").getChildByName("weChat_img");
                    var timeLab1 = cell.getChildByName("weChatLogo_img").getChildByName("time_lab");
                    timeLab1.text = this.sendTimeArr[index];
                    this.chatContent.innerHTML = "<span style='font:24px ;color:#50321a'>" + ChatModel.getInstance().getFaceHtmlText(this.myMsgArr[index]) + "</span>";
                    this.chatContent.style.width = 380;
                    if (this.chatContent.contextWidth >= 370) {
                        this.chatContent.style.align = "left";
                    }
                    else {
                        this.chatContent.style.align = "right";
                    }
                    weChat_img.height = this.chatContent.contextHeight + 15;
                    weChat_img.width = this.chatContent.contextWidth + 20;
                    roleLogo.skin = "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + this.shape) + ".png";
                    if (this.myDisplayinfoArr[index] != "" && this.myDisplayinfoArr[index].displaytype == DisplayType.DISPLAY_ITEM)
                        this.chatContent.on(LEvent.MOUSE_DOWN, this, this.showItemTips, [this.myDisplayinfoArr[index]]);
                    else if (this.myDisplayinfoArr[index] != "")
                        this.chatContent.on(LEvent.MOUSE_DOWN, this, this.otherOnItem, [this.myDisplayinfoArr[index], this.myMsgArr[index]]);
                    var otherChat = cell.getChildByName("otherChatLogo_img");
                    otherChat.visible = true;
                    if (this.friendMsgArr[index] == "") {
                        otherChat.visible = false;
                    }
                    this.chatContent = cell.getChildByName("otherChatLogo_img").getChildByName("chat0_txtarea");
                    var img = cell.getChildByName("otherChatLogo_img").getChildByName("otherChat_img");
                    var otherRoleLogo = cell.getChildByName("otherChatLogo_img").getChildByName("roleLogo_img");
                    var timeLab = cell.getChildByName("otherChatLogo_img").getChildByName("time_lab");
                    timeLab.text = this.friendTimeArr[index];
                    this.chatContent.innerHTML = "<span style='font:24px ;color:#50321a; SimHei'> " + ChatModel.getInstance().getFaceHtmlText(this.friendMsgArr[index]) + "</span>";
                    img.height = this.chatContent.contextHeight + 15;
                    img.width = this.chatContent.contextWidth + 25;
                    otherRoleLogo.skin = "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + FriendModel.getInstance().touxiangIdArr[this.selectNum]) + ".png";
                    if (this.friendDisplayinfoArr[index] != "") {
                        this.chatContent.on(LEvent.MOUSE_DOWN, this, this.otherOnItem, [this.friendDisplayinfoArr[index], this.friendMsgArr[index]]);
                    }
                };
                /**获取时间戳 */
                FriendViewMediator.prototype.getNowTime = function () {
                    var date = new Date();
                    var str1 = "-";
                    var str2 = ":";
                    var strMonth = (date.getMonth() + 1).toString();
                    var strDate = (date.getDate()).toString();
                    var strHour = (date.getHours()).toString();
                    var strMinute = (date.getMinutes()).toString();
                    var strSeconds = (date.getSeconds()).toString();
                    if (parseInt(strMonth) >= 1 && parseInt(strMonth) <= 9) {
                        strMonth = "0" + strMonth;
                    }
                    if (parseInt(strDate) >= 1 && parseInt(strDate) <= 9) {
                        strDate = "0" + strDate;
                    }
                    if (parseInt(strHour) >= 1 && parseInt(strHour) <= 9) {
                        strHour = "0" + strHour;
                    }
                    if (parseInt(strMinute) >= 1 && parseInt(strMinute) <= 9) {
                        strMinute = "0" + strMinute;
                    }
                    if (parseInt(strSeconds) >= 1 && parseInt(strSeconds) <= 9) {
                        strSeconds = "0" + strSeconds;
                    }
                    var currentdate = date.getFullYear() + str1 + strMonth + str1 + strDate
                        + " " + strHour + str2 + strMinute
                        + str2 + strSeconds;
                    return currentdate;
                };
                /**服务器返回黑名单列表信息-->C */
                FriendViewMediator.prototype.onBlackRoles = function (e) {
                    this.blacklistuserNameArr.length = 0;
                    this.blacklistuserLevelArr.length = 0;
                    this.blacklistuserHeadImgArr.length = 0;
                    this.blacklistuserZhiyeImgArr.length = 0;
                    this.blacklistuserIdArr.length = 0;
                    var data = friend.models.FriendModel.getInstance().SBlackRolesData.get("data");
                    for (var i = 0; i < data.blackRoles.length; i++) {
                        this.blacklistuserNameArr.push(data.blackRoles[i]["name"]);
                        this.blacklistuserLevelArr.push(data.blackRoles[i]["level"]);
                        this.blacklistuserHeadImgArr.push({ img: "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + data.blackRoles[i]["shape"]) + ".png" });
                        this.setBlacklistuserZhiyeImg(data.blackRoles[i]["school"]);
                        this.blacklistuserIdArr.push(data.blackRoles[i]["roleId"]);
                        //判断是否还遗留在好友列表中
                        var _pos = friend.models.FriendModel.getInstance().friendIdArr.indexOf(data.blackRoles[i]["roleId"]);
                        if (_pos > -1) {
                            FriendModel.getInstance().removeFriend(data.blackRoles[i]["roleId"]);
                            this.getListData();
                        }
                    }
                    this.getBlackListData();
                    this._viewUI.blacklistNum_lab.text = this.blacklistuserNameArr.length.toString(); //黑名单人数
                };
                /**服务器返回搜索的角色信息-->C */
                FriendViewMediator.prototype.onSearchBlackRoleInfo = function (e) {
                    var data = friend.models.FriendModel.getInstance().SSearchBlackRoleInfoData.get("data");
                    this.blacklistuserNameArr.length = 0;
                    this.blacklistuserLevelArr.length = 0;
                    this.blacklistuserHeadImgArr.length = 0;
                    this.blacklistuserZhiyeImgArr.length = 0;
                    this.blacklistuserIdArr.length = 0;
                    this.blacklistuserNameArr.push(data.searchBlackRole["name"]);
                    this.blacklistuserLevelArr.push(data.searchBlackRole["roleLevel"]);
                    if (data.searchBlackRole["online"] == 0) {
                        this.blacklistuserHeadImgArr.push({ img: "common/icon/grayavatarrole/" + (FriendEnum.GRAY_ROLE_IMG_ID + data.searchBlackRole["shape"]) + ".png" });
                    }
                    else {
                        this.blacklistuserHeadImgArr.push({ img: "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + data.searchBlackRole["shape"]) + ".png" });
                    }
                    this.setBlacklistuserZhiyeImg(data.searchBlackRole["school"]);
                    this.blacklistuserIdArr.push(data.searchBlackRole["roleId"]);
                    this._viewUI.addBlackList_list.visible = true;
                    this.getAddBlackListData();
                };
                /**添加好友成功S-->C */
                FriendViewMediator.prototype.onAddFriend = function (e) {
                    this._viewUI.myFriend_btn.label = friend.models.FriendModel.chineseStr.friend + FriendModel.getInstance().friendNameArr.length + friend.models.FriendModel.chineseStr.friendNum; //好友数量
                    this.onRecentContactSelect(this.selectRecentContactNum);
                    this.getListData();
                };
                /**好友信息初始化加载 */
                FriendViewMediator.prototype.onFriendsInfoInit = function (e) {
                    this._viewUI.myFriend_btn.label = friend.models.FriendModel.chineseStr.friend + FriendModel.getInstance().friendNameArr.length + friend.models.FriendModel.chineseStr.friendNum; //好友数量
                    var myData = modules.createrole.models.LoginModel.getInstance().roleDetail;
                    this.roleId = myData.roleid; //本人id
                    this.shape = myData.shape;
                    this.getListData();
                };
                /** 系统消息 */
                FriendViewMediator.prototype.onSendSystemMessageToRole = function () {
                    var data = friend.models.FriendModel.getInstance().SSendSystemMessageToRoleData.get("data");
                    if (data != undefined) {
                        //如果是0 表示是系统消息 大于0的一定是好友发的消息
                        if (data.systemRoleId == FriendEnum.SYSTEM_FRIEND) {
                            //显示红点
                            this._viewUI.systemMsgPoing_img.visible = true;
                            this._viewUI.systemMsgPoint2_img.visible = true;
                            var selectPoint = this._viewUI.select_list.getCell(0).getChildByName("selectPoint_img"); //选择按钮红点
                            selectPoint.visible = true;
                            friend.models.FriendProxy.getInstance().event(friend.models.receiveMessage_EVENT); //收到消息事件
                        }
                    }
                    this.getSystemMessagePanelData();
                };
                /** 点击名字
                 * @param contentText 消息内容
                 */
                FriendViewMediator.prototype.onClickName = function (contentText) {
                    var dicValue = friend.models.FriendModel.getInstance().needClickNameDic.get(contentText);
                    if (dicValue) {
                        var npcid = dicValue[0].targetid;
                        var mapid = HudModel.getInstance().cNPCConfigData[npcid]["mapid"];
                        HudModel.getInstance().useapp = this._app;
                        HudModel.getInstance().useapp.sceneRoot.istask = 2;
                        game.modules.mainhud.models.HudModel.getInstance().jumpmap(mapid, npcid);
                        modules.ModuleManager.hide(modules.ModuleNames.FRIEND);
                    }
                };
                /**注册点击事件 */
                FriendViewMediator.prototype.registerEvent = function () {
                    this._viewUI.addFriend_btn.on(LEvent.MOUSE_DOWN, this, this.showAddFriendView);
                    this.setBtnImg(this._viewUI.systemMsg_btn);
                    this._viewUI.systemMsg_btn.on(LEvent.MOUSE_DOWN, this, this.showNotification, [this._viewUI.systemMsg_btn]);
                    this.setBtnImg(this._viewUI.systemMsg2_btn);
                    this._viewUI.systemMsg2_btn.on(LEvent.MOUSE_DOWN, this, this.showNotification, [this._viewUI.systemMsg2_btn]);
                    this._viewUI.blacklist_btn.on(LEvent.MOUSE_DOWN, this, this.showBlacklist);
                    this._viewUI.myFriend_btn.on(LEvent.MOUSE_DOWN, this, this.showMyFriend);
                    this._viewUI.give_btn.on(LEvent.MOUSE_DOWN, this, this.sendRequest);
                    this._viewUI.add_friend_btn.on(LEvent.MOUSE_DOWN, this, this.addFriend);
                    this._viewUI.addBlackListFind_btn.on(LEvent.MOUSE_DOWN, this, this.addBlackListFind);
                    this._viewUI.face_btn.on(LEvent.MOUSE_DOWN, this, this.openFace);
                    this._viewUI.close2_btn.on(LEvent.MOUSE_DOWN, this, this.closeFace);
                    this._viewUI.send_btn.on(LEvent.MOUSE_UP, this, this.sendChat);
                    this._viewUI.clean_btn.on(LEvent.MOUSE_UP, this, this.cleanChat);
                    this._viewUI.addBlackId_lab.on(LEvent.MOUSE_UP, this, this.showKeypad);
                    //监听系统好友消息
                    friend.models.FriendProxy.getInstance().on(friend.models.SSendSystemMessageToRole_EVENT, this, this.onSendSystemMessageToRole);
                    //监听添加好友结果
                    friend.models.FriendProxy.getInstance().on(friend.models.SAddFriend_EVENT, this, this.onAddFriend);
                    //监听人物弹窗发出消息事件
                    friend.models.FriendProxy.getInstance().on(friend.models.transMessage_EVENT, this, this.ontransMessage);
                    //监听玩家信息变化
                    friend.models.FriendProxy.getInstance().on(friend.models.SRequestUpdateRoleInfo_EVENT, this, this.onRequestUpdateRoleInfo);
                    //监听搜索黑名单返回的角色信息
                    friend.models.FriendProxy.getInstance().on(friend.models.SSearchBlackRoleInfo_EVENT, this, this.onSearchBlackRoleInfo);
                    //监听服务器返回的黑名单列表
                    friend.models.FriendProxy.getInstance().on(friend.models.SBlackRoles_EVENT, this, this.onBlackRoles);
                    //监听与好友之间的对话信息
                    friend.models.FriendProxy.getInstance().on(friend.models.SFriendMessageToRole_EVENT, this, this.onFriendMessageToRole);
                    //监听与陌生人之间的对话消息
                    friend.models.FriendProxy.getInstance().on(friend.models.SStrangerMessageToRole_EVENT, this, this.onStrangerMessageToRole);
                    //监听好友列表初始化信息
                    friend.models.FriendProxy.getInstance().on(friend.models.SFriendsInfoInit_EVENT, this, this.onFriendsInfoInit);
                    //监听角色下线期间收到的对话信息
                    friend.models.FriendProxy.getInstance().on(friend.models.SOffLineMsgMessageToRole_EVENT, this, this.onOffLineMsgMessageToRole);
                    //监听好友度变化
                    friend.models.FriendProxy.getInstance().on(friend.models.SUpdateFriendLevel_EVENT, this, this.onUpdateFriendLevel);
                    //监听删除好友结果
                    friend.models.FriendProxy.getInstance().on(friend.models.SBreakOffRelation_EVENT, this, this.onBreakOffRelation);
                };
                /** 显示小键盘 */
                FriendViewMediator.prototype.showKeypad = function () {
                    this._viewUI.addBlackId_lab.text = "";
                    this.currInputText = "";
                    modules.tips.models.TipsProxy.getInstance().on(modules.tips.models.ON_KRYBOARD, this, this.onKeyboard);
                    var _XiaoJianPanMediator = new modules.tips.XiaoJianPanMediator(this._viewUI);
                    _XiaoJianPanMediator.onShow(this._viewUI.addBlackId_lab.x + this._viewUI.addBlackId_lab.width, this._viewUI.addBlackId_lab.y + this._viewUI.addBlackList_box.y + 40);
                };
                /**
                 * 接收小键盘输入
                 * @param num  接收的小键盘值
                 */
                FriendViewMediator.prototype.onKeyboard = function (num) {
                    if (num != -2) { //点击了ok
                    }
                    if (num == -1) { //点击了删除
                        this.currInputText = this.currInputText.substring(0, this.currInputText.length - 1);
                        if (this.currInputText.length <= 0) {
                            this.currInputText = "";
                        }
                    }
                    if (num >= 0) { //点击了其它数字
                        var oneChar = this.currInputText.charAt(0);
                        if (oneChar != '0') {
                            this.currInputText += num.toString();
                        }
                        else if (this.currInputText.length > 10) {
                            this.currInputText = num.toString();
                        }
                    }
                    this._viewUI.addBlackId_lab.text = this.currInputText;
                };
                /** 添加好友 */
                FriendViewMediator.prototype.addFriend = function () {
                    RequesterProtocols._instance.c2s_CRequestAddFriend(this.recentContactIdArr[this.selectRecentContactNum]);
                };
                /**清空当前聊天记录 */
                FriendViewMediator.prototype.cleanChat = function () {
                    if (this._viewUI.select_list.selectedIndex == 1) { //联系人界面
                        var roleid = FriendModel.getInstance().friendIdArr[this.selectNum];
                        this.myMsgData.set(roleid, "");
                        this.friendMsgData.set(roleid, "");
                        this.sendTimeData.set(roleid, "");
                        this.friendTimeData.set(roleid, "");
                        this.myMsgArr.length = 0;
                        this.sendTimeArr.length = 0;
                        this.friendMsgArr.length = 0;
                        this.friendTimeArr.length = 0;
                        this.getMyChatData();
                    }
                    else { //最近人联系人界面
                        var recentRoleId = this.recentContactIdArr[this.selectRecentContactNum];
                        var _isFriendFlag = friend.models.FriendModel.getInstance().isMyFriend(recentRoleId);
                        if (_isFriendFlag == FriendEnum.FRIEND_KEY) {
                            this.myMsgData.set(recentRoleId, "");
                            this.friendMsgData.set(recentRoleId, "");
                            this.sendTimeData.set(recentRoleId, "");
                            this.friendTimeData.set(recentRoleId, "");
                            this.myMsgArr.length = 0;
                            this.sendTimeArr.length = 0;
                            this.friendMsgArr.length = 0;
                            this.friendTimeArr.length = 0;
                            this.getMyChatData();
                        }
                        this.torecentContactMsgData.set(recentRoleId, "");
                        this.torecentContactTimeData.set(recentRoleId, "");
                        this.recentContactMsgData.set(recentRoleId, "");
                        this.recentContactTimeData.set(recentRoleId, "");
                        this.torecentContactMsgArr.length = 0;
                        this.torecentContactTimeArr.length = 0;
                        this.recentContactMsgArr.length = 0;
                        this.recentContactTimeArr.length = 0;
                        this.getRecentChatData();
                    }
                };
                /**添加黑名单查找 */
                FriendViewMediator.prototype.addBlackListFind = function () {
                    RequesterProtocols._instance.c2s_search_blackrole(parseInt(this._viewUI.addBlackId_lab.text));
                };
                /**初始化陌生人列表*/
                FriendViewMediator.prototype.getRecentContactListData = function () {
                    this._viewUI.recentContact_list.vScrollBarSkin = "";
                    this._viewUI.recentContact_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.recentContact_list.scrollBar.elasticDistance = 50;
                    this._viewUI.recentContact_list.array = this.recentContactNameArr;
                    this._viewUI.recentContact_list.repeatY = this.recentContactNameArr.length;
                    this._viewUI.recentContact_list.repeatX = 1;
                    this._viewUI.recentContact_list.renderHandler = new Handler(this, this.onRecentContactRender);
                    this._viewUI.recentContact_list.selectHandler = new Handler(this, this.onRecentContactSelect);
                    this._viewUI.recentContact_list.selectedIndex = -1;
                };
                /**渲染陌生人列表 */
                FriendViewMediator.prototype.onRecentContactRender = function (cell, index) {
                    var recentContactRoleInfo_btn = cell.getChildByName("recentContactRoleInfo_btn");
                    recentContactRoleInfo_btn.on(LEvent.CLICK, this, this.showSelected, [recentContactRoleInfo_btn, index]);
                    this.setBtnImg(recentContactRoleInfo_btn);
                    var nameLab = cell.getChildByName("recentContactName_lab");
                    var levelLab = cell.getChildByName("recentContactLevel_lab");
                    var contactContentImg = cell.getChildByName("recentContactContent_img");
                    var contactSchoolImg = cell.getChildByName("recentContactSchool_img");
                    var recentContactCheckBtn = cell.getChildByName("recentContactCheck_btn");
                    nameLab.text = this.recentContactNameArr[index];
                    levelLab.text = this.recentContactLevelArr[index].toString();
                    contactContentImg.skin = this.recentContactHeadImgArr[index].img;
                    contactSchoolImg.skin = this.recentContactZhiyeImgArr[index].img;
                    recentContactCheckBtn.on(LEvent.MOUSE_DOWN, this, this.showContact, [this.recentContactIdArr[index], FriendEnum.STRANGE_KEY]);
                };
                /** 陌生人关系时聊天消息内容插入到好友关系的聊天消息内容中去
                 * @param roleid 关系从陌生人变成好友的角色id
                 */
                FriendViewMediator.prototype.strangersChatMsgs_insert_friendsChatMsgs = function (roleid) {
                    if (this.recentContactMsgData.get(roleid) == null && this.recentContactMsgData.get(roleid) == undefined && this.torecentContactMsgData.get(roleid) == null && this.torecentContactMsgData.get(roleid) == undefined) {
                        return;
                    }
                    this.myMsgData.set(roleid, this.torecentContactMsgData.get(roleid));
                    this.friendMsgData.set(roleid, this.recentContactMsgData.get(roleid));
                    this.sendTimeData.set(roleid, this.torecentContactTimeData.get(roleid));
                    this.friendTimeData.set(roleid, this.recentContactTimeData.get(roleid));
                    this.myDisplayinfoData.set(roleid, this.torecentContactDisplayinfoData.get(roleid));
                    this.friendDisplayinfoData.set(roleid, this.recentContactDisplayinfoData.get(roleid));
                };
                /**陌生人列表点击处理 */
                FriendViewMediator.prototype.onRecentContactSelect = function (index) {
                    if (index != -1) {
                        this.selectRecentContactNum = index;
                        //判断是否变成了好友
                        for (var i = 0; i < FriendModel.getInstance().friendIdArr.length; i++) {
                            if (FriendModel.getInstance().friendIdArr[i] == this.recentContactIdArr[index]) { //如果变成好友，还要把之前对方处于陌生人关系时聊天消息内容插入到好友关系的聊天消息内容中去
                                this.strangersChatMsgs_insert_friendsChatMsgs(this.recentContactIdArr[index]);
                                this.onSelect(i);
                                this._viewUI.recentContact_list.selectedIndex = -1;
                                return;
                            }
                        }
                        this._viewUI.friendChat_box.visible = true;
                        this._viewUI.relation_box.visible = true;
                        this._viewUI.add_friend_btn.visible = true;
                        this._viewUI.mychatInfo_list.visible = false;
                        this._viewUI.chatButton_box.visible = true;
                        this._viewUI.notification_panel.visible = false;
                        this._viewUI.recentChatInfo_list.visible = true;
                        this._viewUI.friendDegree_lab.text = "0";
                        this._viewUI.relation_lab.text = "陌生人";
                        var roleid = this.recentContactIdArr[this.selectRecentContactNum];
                        this.updateRecentChat(roleid);
                        this.getRecentChatData();
                        this._viewUI.recentContact_list.selectedIndex = -1;
                    }
                };
                /**初始化联系人列表 */
                FriendViewMediator.prototype.getListData = function () {
                    this._viewUI.contact_list.vScrollBarSkin = "";
                    this._viewUI.contact_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.contact_list.scrollBar.elasticDistance = 50;
                    this._viewUI.contact_list.array = FriendModel.getInstance().friendIdArr;
                    this._viewUI.contact_list.repeatY = FriendModel.getInstance().friendNameArr.length;
                    this._viewUI.contact_list.repeatX = 1;
                    this._viewUI.contact_list.renderHandler = new Handler(this, this.onRender);
                    this._viewUI.contact_list.selectHandler = new Handler(this, this.onSelect);
                    this._viewUI.contact_list.selectedIndex = -1;
                };
                /**渲染联系人列表 */
                FriendViewMediator.prototype.onRender = function (cell, index) {
                    var contactRoleInfo_btn = cell.getChildByName("contactRoleInfo_btn");
                    contactRoleInfo_btn.on(LEvent.CLICK, this, this.showSelected, [contactRoleInfo_btn]);
                    this.setBtnImg(contactRoleInfo_btn);
                    var nameLab = contactRoleInfo_btn.getChildByName("contactName_lab");
                    var levelLab = contactRoleInfo_btn.getChildByName("contactlevel_lab");
                    var contactContentImg = contactRoleInfo_btn.getChildByName("contactContent_img");
                    var contactSchoolImg = contactRoleInfo_btn.getChildByName("contactSchool_img");
                    var contactCheckBtn = contactRoleInfo_btn.getChildByName("contactCheck_btn");
                    nameLab.text = FriendModel.getInstance().friendNameArr[index];
                    levelLab.text = FriendModel.getInstance().friendLevelArr[index].toString();
                    contactContentImg.skin = FriendModel.getInstance().touxiangImgArr[index].img;
                    contactSchoolImg.skin = FriendModel.getInstance().zhiyeImgArr[index];
                    contactCheckBtn.on(LEvent.MOUSE_DOWN, this, this.showContact, [FriendModel.getInstance().friendIdArr[index], FriendEnum.FRIEND_KEY]);
                };
                /** 设置按钮的底图显示 */
                FriendViewMediator.prototype.setBtnImg = function (btn) {
                    if (this.lastBtn && this.lastBtn == btn) {
                        btn.skin = "common/ui/tongyong/common_list_3textbg2.png";
                    }
                    else {
                        btn.skin = "common/ui/tongyong/common_list_3textbg.png";
                    }
                };
                /** 显示出被选中的效果
                 * @param btn 被选中的按钮
                 * @param index 最近联系列表中第几个按钮被选中
                 */
                FriendViewMediator.prototype.showSelected = function (btn, index) {
                    if (this.lastBtn) {
                        this.lastBtn.skin = "common/ui/tongyong/common_list_3textbg.png";
                    }
                    btn.skin = "common/ui/tongyong/common_list_3textbg2.png";
                    this.lastBtn = btn;
                    if (index != undefined && this._viewUI.select_list.selectedIndex == 0) { //最近联系页面
                        var contactRolePointImg2 = this._viewUI.recentContact_list.getCell(index).getChildByName("recentContactRolePoint_img"); //最近联系人红点
                        var selectPoint2 = this._viewUI.select_list.getCell(0).getChildByName("selectPoint_img"); //最近联系人选择按钮红点
                        if (selectPoint2.visible == true && contactRolePointImg2.visible == true) { //如果有显示红点，被点击后，红点消失
                            selectPoint2.visible = false;
                            contactRolePointImg2.visible = false;
                            friend.models.FriendProxy.getInstance().event(friend.models.readMessage_EVENT);
                        }
                    }
                };
                /**联系人列表点击处理 */
                FriendViewMediator.prototype.onSelect = function (index) {
                    if (index != -1) {
                        this.selectNum = index;
                        this._viewUI.friendChat_box.visible = true;
                        this._viewUI.relation_box.visible = true;
                        this._viewUI.add_friend_btn.visible = false;
                        this._viewUI.mychatInfo_list.visible = true;
                        this._viewUI.chatButton_box.visible = true;
                        this._viewUI.notification_panel.visible = false;
                        this._viewUI.recentChatInfo_list.visible = false;
                        this._viewUI.relation_lab.text = "普通好友";
                        var friendid = FriendModel.getInstance().friendIdArr[this.selectNum]; //当前选中好友id
                        var _friendDegreeDic = FriendModel.getInstance().friendDegreeDic;
                        if (_friendDegreeDic.get(friendid) != undefined)
                            this._viewUI.friendDegree_lab.text = _friendDegreeDic.get(friendid); //好友度
                        var contactRolePointImg = this._viewUI.contact_list.getCell(index).getChildByName("contactRoleInfo_btn").getChildByName("contactRolePoint_img");
                        var selectPoint = this._viewUI.select_list.getCell(1).getChildByName("selectPoint_img");
                        if (contactRolePointImg.visible == true) {
                            selectPoint.visible = false;
                            contactRolePointImg.visible = false;
                            friend.models.FriendProxy.getInstance().event(friend.models.readMessage_EVENT); //读完当前消息，发送事件，通知主界面隐藏好友红点
                        }
                        this.updateMyChat(friendid);
                        this.getMyChatData();
                        this._viewUI.contact_list.selectedIndex = -1;
                    }
                };
                /**显示好友弹窗 */
                FriendViewMediator.prototype.showContact = function (id, key, e) {
                    var xPos = e.currentTarget.mouseX;
                    var yPos = e.currentTarget.mouseY;
                    RequesterProtocols._instance.c2s_CRequestUpdateRoleInfo(id); //请求玩家信息
                    RequesterProtocols._instance.c2s_CReqRoleTeamState(id); //客户端请求其他玩家的组队情况
                    var isFriendFlag = FriendModel.getInstance().isMyFriend(id);
                    this._ContactCharacterMediator.onShow(xPos, yPos, isFriendFlag);
                };
                /**初始化黑名单列表 */
                FriendViewMediator.prototype.getBlackListData = function () {
                    this._viewUI.blackList_list.vScrollBarSkin = "";
                    this._viewUI.blackList_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.blackList_list.scrollBar.elasticDistance = 50;
                    this._viewUI.blackList_list.array = this.blacklistuserNameArr;
                    this._viewUI.blackList_list.renderHandler = new Handler(this, this.onBlackListRender);
                };
                /**渲染黑名单列表 */
                FriendViewMediator.prototype.onBlackListRender = function (cell, index) {
                    var nameLab = cell.getChildByName("blackListRoleInfo_btn").getChildByName("blackListName_lab");
                    var levelLab = cell.getChildByName("blackListRoleInfo_btn").getChildByName("blackListLevel_lab");
                    var reduceBtn = cell.getChildByName("blackListRoleInfo_btn").getChildByName("blackListReduce_btn");
                    var blackListContentImg = cell.getChildByName("blackListRoleInfo_btn").getChildByName("blackListContent_img");
                    var blackListSchoolImg = cell.getChildByName("blackListRoleInfo_btn").getChildByName("blackListSchool_img");
                    reduceBtn.on(LEvent.MOUSE_DOWN, this, this.reduce, [index]);
                    nameLab.text = this.blacklistuserNameArr[index];
                    levelLab.text = this.blacklistuserLevelArr[index].toString();
                    blackListContentImg.skin = this.blacklistuserHeadImgArr[index].img;
                    blackListSchoolImg.skin = this.blacklistuserZhiyeImgArr[index].img;
                };
                /**客户端请求移除黑名单 */
                FriendViewMediator.prototype.reduce = function (index) {
                    RequesterProtocols._instance.c2s_remove_blackrole(this.blacklistuserIdArr[index]);
                };
                /**初始化添加黑名单列表 */
                FriendViewMediator.prototype.getAddBlackListData = function () {
                    this._viewUI.addBlackList_list.vScrollBarSkin = "";
                    this._viewUI.addBlackList_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.addBlackList_list.scrollBar.elasticDistance = 50;
                    this._viewUI.addBlackList_list.array = this.blacklistuserNameArr;
                    this._viewUI.addBlackList_list.renderHandler = new Handler(this, this.onAddBlackListRender);
                    this._viewUI.addBlackList_list.selectedIndex = 0;
                };
                /**渲染添加黑名单列表 */
                FriendViewMediator.prototype.onAddBlackListRender = function (cell, index) {
                    if (index > this.blacklistuserNameArr.length)
                        return;
                    var roleInfo_btn = cell.getChildByName("roleInfo_btn");
                    roleInfo_btn.on(LEvent.CLICK, this, this.showSelected, [roleInfo_btn]);
                    this.setBtnImg(roleInfo_btn);
                    var nameLab = roleInfo_btn.getChildByName("name_lab");
                    var levelLab = roleInfo_btn.getChildByName("level_lab");
                    var addBtn = roleInfo_btn.getChildByName("add_btn");
                    var contentImg = roleInfo_btn.getChildByName("content_img");
                    var schoolImg = roleInfo_btn.getChildByName("school_img");
                    addBtn.on(LEvent.MOUSE_DOWN, this, this.addBlackListUser);
                    nameLab.text = this.blacklistuserNameArr[index];
                    levelLab.text = this.blacklistuserLevelArr[index].toString();
                    contentImg.skin = this.blacklistuserHeadImgArr[index].img;
                    schoolImg.skin = this.blacklistuserZhiyeImgArr[index].img;
                };
                /**客户端请求屏蔽玩家 */
                FriendViewMediator.prototype.addBlackListUser = function () {
                    var _blackId = parseInt(this._viewUI.addBlackId_lab.text);
                    var _flag = friend.models.FriendModel.getInstance().isMyFriend(_blackId);
                    if (_flag == FriendEnum.FRIEND_KEY) { //如果添加黑名单的对象是自己的好友，就需要飘窗提示并且返回
                        var msg = modules.chat.models.ChatModel.getInstance().chatMessageTips[141405]["msg"];
                        var disMsgTips = new modules.commonUI.DisappearMessageTipsMediator(this._app);
                        disMsgTips.onShow(msg);
                        return;
                    }
                    RequesterProtocols._instance.c2s_add_blackrole(_blackId);
                    this.blacklistuserNameArr.length = 0;
                    this.blacklistuserLevelArr.length = 0;
                    this.blacklistuserHeadImgArr.length = 0;
                    this.blacklistuserZhiyeImgArr.length = 0;
                    this.blacklistuserIdArr.length = 0;
                    this.getAddBlackListData();
                };
                /**设置陌生人职业图标 */
                FriendViewMediator.prototype.setRecentContactZhiyeImg = function (school) {
                    //根据职业设置职业图标
                    switch (school) {
                        case zhiye.yunxiao:
                            this.recentContactZhiyeImgArr.push({ img: "common/ui/tongyong/11.png" });
                            break;
                        case zhiye.dahuang:
                            this.recentContactZhiyeImgArr.push({ img: "common/ui/tongyong/12.png" });
                            break;
                        case zhiye.cangyu:
                            this.recentContactZhiyeImgArr.push({ img: "common/ui/tongyong/13.png" });
                            break;
                        case zhiye.feixue:
                            this.recentContactZhiyeImgArr.push({ img: "common/ui/tongyong/14.png" });
                            break;
                        case zhiye.tianlei:
                            this.recentContactZhiyeImgArr.push({ img: "common/ui/tongyong/15.png" });
                            break;
                        case zhiye.wuliang:
                            this.recentContactZhiyeImgArr.push({ img: "common/ui/tongyong/16.png" });
                            break;
                        case zhiye.xuanming:
                            this.recentContactZhiyeImgArr.push({ img: "common/ui/tongyong/17.png" });
                            break;
                        case zhiye.qixing:
                            this.recentContactZhiyeImgArr.push({ img: "common/ui/tongyong/18.png" });
                            break;
                        case zhiye.danyang:
                            this.recentContactZhiyeImgArr.push({ img: "common/ui/tongyong/19.png" });
                            break;
                    }
                };
                /**设置黑名单用户职业图标 */
                FriendViewMediator.prototype.setBlacklistuserZhiyeImg = function (school) {
                    //根据职业设置职业图标
                    switch (school) {
                        case zhiye.yunxiao:
                            this.blacklistuserZhiyeImgArr.push({ img: "common/ui/tongyong/11.png" });
                            break;
                        case zhiye.dahuang:
                            this.blacklistuserZhiyeImgArr.push({ img: "common/ui/tongyong/12.png" });
                            break;
                        case zhiye.cangyu:
                            this.blacklistuserZhiyeImgArr.push({ img: "common/ui/tongyong/13.png" });
                            break;
                        case zhiye.feixue:
                            this.blacklistuserZhiyeImgArr.push({ img: "common/ui/tongyong/14.png" });
                            break;
                        case zhiye.tianlei:
                            this.blacklistuserZhiyeImgArr.push({ img: "common/ui/tongyong/15.png" });
                            break;
                        case zhiye.wuliang:
                            this.blacklistuserZhiyeImgArr.push({ img: "common/ui/tongyong/16.png" });
                            break;
                        case zhiye.xuanming:
                            this.blacklistuserZhiyeImgArr.push({ img: "common/ui/tongyong/17.png" });
                            break;
                        case zhiye.qixing:
                            this.blacklistuserZhiyeImgArr.push({ img: "common/ui/tongyong/18.png" });
                            break;
                        case zhiye.danyang:
                            this.blacklistuserZhiyeImgArr.push({ img: "common/ui/tongyong/19.png" });
                            break;
                    }
                };
                /**初始化聊天界面数据 */
                FriendViewMediator.prototype.initChatData = function () {
                    friend.models.FriendModel.getInstance().initFlag = true;
                    var objKeys = modules.chat.models.ChatModel.getInstance().chatQuickChat;
                    for (var i = 1; i <= Object.keys(objKeys).length; i++) {
                        this.quickChat.push(modules.chat.models.ChatModel.getInstance().chatQuickChat[i].tips);
                    }
                    for (var a = 1; a < 33; a++) {
                        this.shield_word.push(this.banWords[a].tips);
                    }
                    //表情素材加载
                    for (var a = 1; a <= 53; a++) {
                        this.faceList.push({ url: "ui/liaotian/1384592709_" + a + ".png" });
                    }
                    this._loginModel = game.modules.createrole.models.LoginModel.getInstance();
                    var roleIcon = this._loginModel.cnpcShapeInfo;
                    for (var index in roleIcon) {
                        this.roleinfo.push(roleIcon[index].littleheadID);
                    }
                };
                /**开启表情 */
                FriendViewMediator.prototype.openFace = function () {
                    if (this._viewUI.content_img.visible == false) {
                        this._viewUI.content_img.visible = true;
                    }
                    else
                        return;
                    for (var i = 1; i <= 6; i++) {
                        var btn = this._viewUI.friend_box.getChildByName("content_img").getChildByName("facebox_box").getChildByName("facebtn" + [i] + "_btn");
                        var name_3 = "facebtn" + [i] + "_btn";
                        btn.on(LEvent.MOUSE_UP, this, this.opFaceContent, [name_3]);
                    }
                    this.Face();
                };
                /**聊天表情的初始化 */
                FriendViewMediator.prototype.opFaceContent = function (name) {
                    for (var i = 1; i <= 6; i++) {
                        var img = this._viewUI.friend_box.getChildByName("content_img").getChildByName("facebox_box").getChildByName("facebtn" + [i] + "_btn").getChildByName("state" + [i] + "_img");
                        img.visible = false;
                    }
                    //点击不同按钮，初始化不同列表
                    switch (name) {
                        case "facebtn1_btn": //表情 
                            this.Face();
                            break;
                        case "facebtn2_btn": //常用语
                            this._viewUI.state2_img.visible = true;
                            this._viewUI.contentlist1_list.visible = true;
                            this._viewUI.contentlist2_list.visible = false;
                            this._viewUI.contentlist3_list.visible = false;
                            this._viewUI.contentlist4_list.visible = false;
                            this._viewUI.contentlist5_list.visible = false;
                            this._viewUI.face_list.visible = false;
                            this.CommonLanguage();
                            break;
                        case "facebtn3_btn": //任务
                            this._viewUI.state3_img.visible = true;
                            this._viewUI.contentlist1_list.visible = false;
                            this._viewUI.contentlist2_list.visible = true;
                            this._viewUI.contentlist3_list.visible = false;
                            this._viewUI.contentlist4_list.visible = false;
                            this._viewUI.contentlist5_list.visible = false;
                            this._viewUI.face_list.visible = false;
                            this.Task();
                            break;
                        case "facebtn4_btn": //历史输入
                            this._viewUI.state4_img.visible = true;
                            this._viewUI.contentlist1_list.visible = false;
                            this._viewUI.contentlist2_list.visible = false;
                            this._viewUI.contentlist3_list.visible = true;
                            this._viewUI.contentlist4_list.visible = false;
                            this._viewUI.contentlist5_list.visible = false;
                            this._viewUI.face_list.visible = false;
                            this.HistoryInput();
                            break;
                        case "facebtn5_btn": // 物品分享
                            this._viewUI.state5_img.visible = true;
                            this._viewUI.contentlist1_list.visible = false;
                            this._viewUI.contentlist2_list.visible = false;
                            this._viewUI.contentlist3_list.visible = false;
                            this._viewUI.contentlist4_list.visible = true;
                            this._viewUI.contentlist5_list.visible = false;
                            this._viewUI.face_list.visible = false;
                            this.Item();
                            break;
                        case "facebtn6_btn": //宠物分享
                            this._viewUI.state6_img.visible = true;
                            this._viewUI.contentlist1_list.visible = false;
                            this._viewUI.contentlist2_list.visible = false;
                            this._viewUI.contentlist3_list.visible = false;
                            this._viewUI.contentlist4_list.visible = false;
                            this._viewUI.contentlist5_list.visible = true;
                            this._viewUI.face_list.visible = false;
                            this.Pet();
                            break;
                        default:
                            break;
                    }
                };
                /**
                 * 计算页数
                 * @param pageNum 每页显示的数量  @param 数据源长度 @param ratio 滚动条比例
                 */
                FriendViewMediator.prototype.calculationNumPage = function (pageNum, length, ratio) {
                    /** 总页码 */
                    var totalPage = Math.ceil(length / pageNum);
                    /** 总共5个小球 */
                    var allBall = 5;
                    for (var pageIndex = 1; pageIndex <= allBall; pageIndex++) {
                        /** 先隐藏所有 */
                        var indexBall = this._viewUI.content_img.getChildByName("darkball" + pageIndex + "_img");
                        indexBall.visible = false;
                    }
                    for (var nowpage = 1; nowpage <= totalPage; nowpage++) {
                        /** 显示 */
                        var nowBall = this._viewUI.content_img.getChildByName("darkball" + nowpage + "_img");
                        nowBall.visible = true;
                    }
                    if (ratio) {
                        var ball = Math.ceil(totalPage * ratio);
                        for (var index = 1; index <= totalPage; index++) {
                            var allball = this._viewUI.content_img.getChildByName("darkball" + index + "_img").getChildByName("greenball" + index + "_img");
                            allball.visible = false;
                        }
                        if (ball <= 0)
                            ball = 1;
                        if (ball > totalPage)
                            ball = totalPage;
                        var nowball = this._viewUI.content_img.getChildByName("darkball" + ball + "_img").getChildByName("greenball" + ball + "_img");
                        nowball.visible = true;
                    }
                };
                /**
                 * 滑动到指定页码
                 * @param viewNum 单页的数量 @param datasourceLength 数据源长度 @param list 指定ui
                 */
                FriendViewMediator.prototype.countCurrentPage = function (viewNum, datasourceLength, list) {
                    var val = list.scrollBar.value;
                    var max = list.scrollBar.max;
                    var ratio = val / max;
                    /** 首先计算页数 */
                    this.calculationNumPage(viewNum, datasourceLength, ratio);
                };
                /**表情 */
                FriendViewMediator.prototype.Face = function () {
                    /** 首先计算页数 */
                    this.calculationNumPage(35, this.faceList.length);
                    this._viewUI.state1_img.visible = true;
                    this._viewUI.contentlist1_list.visible = false;
                    this._viewUI.contentlist2_list.visible = false;
                    this._viewUI.contentlist3_list.visible = false;
                    this._viewUI.contentlist4_list.visible = false;
                    this._viewUI.contentlist5_list.visible = false;
                    this._viewUI.face_list.visible = true;
                    var face = 0;
                    this._viewUI.face_list.hScrollBarSkin = "";
                    if (this.faceList.length <= 7) {
                        this._viewUI.face_list.repeatX = this.faceList.length;
                        this._viewUI.face_list.repeatY = 1;
                    }
                    else {
                        this._viewUI.face_list.repeatX = this.faceList.length;
                        this._viewUI.face_list.repeatY = 5;
                    }
                    this._viewUI.face_list.array = this.faceList;
                    this._viewUI.face_list.spaceX = 22;
                    this._viewUI.face_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.face_list.scrollBar.elasticDistance = 100;
                    this._viewUI.face_list.on(LEvent.MOUSE_UP, this, this.countCurrentPage, [35, this.faceList.length, this._viewUI.face_list]);
                    this._viewUI.face_list.renderHandler = new Handler(this, this.onContentListRender, [face]);
                };
                /** 常用语 */
                FriendViewMediator.prototype.CommonLanguage = function () {
                    /** 首先计算页数 */
                    this.calculationNumPage(8, this.quickChat.length);
                    var commonLanageArg = 1;
                    this._viewUI.contentlist1_list.hScrollBarSkin = "";
                    this._viewUI.contentlist1_list.repeatX = this.quickChat.length;
                    this._viewUI.contentlist1_list.array = this.quickChat;
                    this._viewUI.contentlist1_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.contentlist1_list.scrollBar.elasticDistance = 100;
                    this._viewUI.contentlist1_list.on(LEvent.MOUSE_UP, this, this.countCurrentPage, [8, this.quickChat.length, this._viewUI.contentlist1_list]);
                    this._viewUI.contentlist1_list.renderHandler = new Handler(this, this.onContentListRender, [commonLanageArg], false);
                };
                /** 任务 */
                FriendViewMediator.prototype.Task = function () {
                    var taskArg = 2;
                    this._viewUI.contentlist2_list.hScrollBarSkin = "";
                    var accepttask = Taskmodels.getInstance().accepttask;
                    var schooltask = Taskmodels.getInstance().schooltask;
                    var maintask = Taskmodels.getInstance().maintask;
                    /** 每次点击清空数据 */
                    this.task = [];
                    for (var accepttaskIndex = 0; accepttaskIndex < accepttask.keys.length; accepttaskIndex++) {
                        /** 存推荐任务的 key 任务iD */
                        this.task.push(accepttask.keys[accepttaskIndex]);
                    }
                    for (var schooltaskIndex = 0; schooltaskIndex < schooltask.keys.length; schooltaskIndex++) {
                        /** 存师门任务的 value 任务iD */
                        this.task.push(Taskmodels.getInstance().schooltask.keys[schooltaskIndex]);
                    }
                    for (var maintaskIndex = 0; maintaskIndex < maintask.keys.length; maintaskIndex++) {
                        /** 存主任务的 key 任务iD */
                        this.task.push(maintask.keys[maintaskIndex]);
                    }
                    /** 首先计算页数 */
                    this.calculationNumPage(8, this.task.length);
                    this._viewUI.contentlist2_list.repeatX = this.task.length;
                    this._viewUI.contentlist2_list.array = this.task;
                    this._viewUI.contentlist2_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.contentlist2_list.scrollBar.elasticDistance = 100;
                    this._viewUI.contentlist2_list.on(LEvent.MOUSE_UP, this, this.countCurrentPage, [8, this.task.length, this._viewUI.contentlist2_list]);
                    this._viewUI.contentlist2_list.renderHandler = new Handler(this, this.onContentListRender, [taskArg]);
                };
                /** 宠物 */
                FriendViewMediator.prototype.Pet = function () {
                    var petKeys = PetModel.getInstance().pets.keys;
                    if (petKeys.length <= 0) {
                        this._viewUI.contentlist5_list.visible = false;
                        return;
                    }
                    else {
                        this.petLits = [];
                        for (var petKey = 0; petKey < petKeys.length; petKey++) {
                            this.petLits.push(PetModel.getInstance().pets.get(petKeys[petKey]));
                        }
                    }
                    var petArg = 5;
                    this._viewUI.contentlist5_list.hScrollBarSkin = "";
                    /** 首先计算页数 */
                    this.calculationNumPage(4, this.petLits.length);
                    if (this.petLits.length <= 2) {
                        this._viewUI.contentlist5_list.repeatX = this.petLits.length;
                        this._viewUI.contentlist5_list.repeatY = 1;
                    }
                    else {
                        this._viewUI.contentlist5_list.repeatX = this.petLits.length;
                        this._viewUI.contentlist5_list.repeatY = 2;
                    }
                    this._viewUI.contentlist5_list.array = this.petLits;
                    this._viewUI.contentlist5_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.contentlist5_list.scrollBar.elasticDistance = 10;
                    this._viewUI.contentlist5_list.on(LEvent.MOUSE_UP, this, this.countCurrentPage, [4, this.petLits.length, this._viewUI.contentlist5_list]);
                    this._viewUI.contentlist5_list.renderHandler = new Handler(this, this.onContentListRender, [petArg]);
                };
                /** 背包道具 */
                FriendViewMediator.prototype.Item = function () {
                    this.itemList = bagModel.getInstance().getBagGameItemData(BagTypes.BAG).items;
                    if (this.itemList.length <= 0) {
                        this._viewUI.contentlist4_list.visible = false;
                        return;
                    }
                    var itemArg = 4;
                    /** 首先计算页数 */
                    this.calculationNumPage(24, this.itemList.length);
                    this._viewUI.contentlist4_list.hScrollBarSkin = "";
                    if (this.itemList.length <= 6) {
                        this._viewUI.contentlist4_list.repeatX = this.itemList.length;
                        this._viewUI.contentlist4_list.repeatY = 1;
                    }
                    else {
                        this._viewUI.contentlist4_list.repeatX = this.itemList.length;
                        this._viewUI.contentlist4_list.repeatY = 4;
                    }
                    this._viewUI.contentlist4_list.array = this.itemList;
                    this._viewUI.contentlist4_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.contentlist4_list.scrollBar.elasticDistance = 10;
                    this._viewUI.contentlist4_list.on(LEvent.MOUSE_UP, this, this.countCurrentPage, [24, this.itemList.length, this._viewUI.contentlist4_list]);
                    this._viewUI.contentlist4_list.renderHandler = new Handler(this, this.onContentListRender, [itemArg]);
                };
                /** 历史输入 */
                FriendViewMediator.prototype.HistoryInput = function () {
                    var historyInputArg = 3;
                    this._viewUI.contentlist3_list.hScrollBarSkin = "";
                    if (this.historyInput != null) {
                        this._viewUI.contentlist3_list.repeatX = this.historyInput.length;
                        this._viewUI.contentlist3_list.array = this.historyInput;
                    }
                    else {
                        this._viewUI.contentlist3_list.repeatX = this.nohistory.length;
                        this._viewUI.contentlist3_list.array = this.nohistory;
                    }
                    /** 首先计算页数 */
                    this.calculationNumPage(8, this.itemList.length);
                    this._viewUI.contentlist3_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.contentlist3_list.scrollBar.elasticDistance = 100;
                    this._viewUI.contentlist3_list.on(LEvent.MOUSE_UP, this, this.countCurrentPage, [8, this.itemList.length, this._viewUI.contentlist3_list]);
                    this._viewUI.contentlist3_list.renderHandler = new Handler(this, this.onContentListRender, [historyInputArg]);
                };
                /**聊天列表渲染 */
                FriendViewMediator.prototype.onContentListRender = function (arg, cell, index) {
                    //根据不同按钮点击来分开处理
                    switch (arg) {
                        //渲染聊天表情列表
                        case 0:
                            var img = cell.getChildByName("faceimg_img");
                            img.skin = this.faceList[index].url;
                            img.on(Laya.Event.CLICK, this, this.onFaceClick, ["@" + index + "@"]);
                            break;
                        //渲染聊天常用语列表
                        case 1:
                            var contentbox1_lab = cell.getChildByName("contentbox1_img").getChildByName("contentbox1_lab");
                            contentbox1_lab.text = this.quickChat[index];
                            contentbox1_lab.on(LEvent.CLICK, this, this.getCommonInput, [contentbox1_lab.text]);
                            break;
                        //渲染聊天任务列表
                        case 2: /** 任务点击 */
                            var contentbox2_lab = cell.getChildByName("contentbox2_img").getChildByName("contentbox2_lab");
                            var taskType = void 0;
                            if (this.task[index] >= FriendEnum.SCHOOL_TASK_START && this.task[index] <= FriendEnum.SCHOOL_TASK_END) {
                                /** 师门任务 */
                                var info = Taskmodels.getInstance().schooltask.get(this.task[index]);
                                var schoolinfo = Taskmodels.getInstance().cRepeatTaskData[info.questtype];
                                var titleinfo = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(schoolinfo.strtasktitletrack, info.round, 2);
                                var allcount = game.modules.task.models.TaskModel.getInstance().cSchoolTaskData[schoolinfo.nacceptchatid];
                                if (allcount) {
                                    titleinfo = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(titleinfo, allcount.maxnum, 7);
                                    contentbox2_lab.text = titleinfo;
                                }
                                taskType = FriendEnum.SHIMEN_TYPE; //师门任务
                            }
                            else {
                                var info = game.modules.task.models.TaskModel.getInstance().missionCMainMissionInfoData[this.task[index]];
                                contentbox2_lab.text = info.MissionName;
                                taskType = FriendEnum.ZHUXIAN_TYPE; //主线任务
                            }
                            contentbox2_lab.on(LEvent.MOUSE_DOWN, this, this.onTask, [index, contentbox2_lab.text, taskType, this.task[index]]);
                            break;
                        //渲染聊天历史输入列表
                        case 3:
                            var contentbox3_lab = cell.getChildByName("contentbox3_img").getChildByName("contentbox3_lab");
                            if (this.historyInput != null) {
                                contentbox3_lab.text = this.historyInput[index].context;
                                contentbox3_lab.on(LEvent.CLICK, this, this.getHistoryInput, [contentbox3_lab.text]);
                            }
                            else
                                contentbox3_lab.text = this.nohistory[index].context;
                            break;
                        //渲染聊天道具列表
                        case 4:
                            if (index > this.itemList.length)
                                return;
                            var id = this.itemList[index].id;
                            var itemDatas = BagModel.getInstance().getItemAttrData(id);
                            var itemName = itemDatas.name;
                            var gameItemBgImg = cell.getChildByName("gameItemBg_img");
                            var gameItemImg = cell.getChildByName("gameItem_Img");
                            var gameItemNumberLabel = cell.getChildByName("gameItemNumber_lab");
                            if (itemDatas != null) {
                                var str = this.itemList[index].number > 1 ? this.itemList[index].number.toString() : "";
                                gameItemNumberLabel.visible = true;
                                gameItemBgImg.skin = game.modules.bag.BagSystemModule.getGameItemFrameColorResource(itemDatas.nquality);
                                gameItemImg.skin = "common/icon/item/" + itemDatas.icon + ".png";
                                gameItemNumberLabel.changeText(str);
                                var type_1 = 1;
                                var shopId = 0;
                                /** 道具分享发送 */
                                gameItemBgImg.on(LEvent.MOUSE_UP, this, this.onItem, [itemName, this.itemList[index].key, type_1, shopId]);
                            }
                            else {
                                gameItemBgImg.skin = "";
                                gameItemImg.skin = "";
                                gameItemNumberLabel.visible = false;
                            }
                            break;
                        //渲染聊天宠物列表
                        case 5:
                            if (index > this.petLits.length)
                                return;
                            var petAttr = PetModel.getInstance().petCPetAttrData;
                            var shapeId = LoginModel.getInstance().cnpcShapeInfo;
                            var pet_1 = cell.getChildByName("contentbox3_img");
                            var petName = cell.getChildByName("contentbox3_img").getChildByName("petName_lab");
                            var petlevel = cell.getChildByName("contentbox3_img").getChildByName("petLevel_lab");
                            var petScore = cell.getChildByName("contentbox3_img").getChildByName("petScore_lab");
                            var petIcon = cell.getChildByName("contentbox3_img").getChildByName("petBg_img").getChildByName("pet_img");
                            var petQuality = cell.getChildByName("contentbox3_img").getChildByName("petBg_img");
                            var petId = this.petLits[index].id;
                            petName.color = petAttr[petId].colour;
                            var Quality = petAttr[petId].quality;
                            var modelid = petAttr[petId].modelid;
                            petName.text = this.petLits[index].name;
                            petlevel.text = this.petLits[index].level;
                            petScore.text = this.petLits[index].petscore;
                            var littleShapeId = LoginModel.getInstance().cnpcShapeInfo[modelid];
                            petIcon.skin = "common/icon/avatarpet/" + littleShapeId.littleheadID + ".png";
                            petQuality.skin = game.modules.bag.BagSystemModule.getGameItemFrameColorResource(Quality);
                            var type = 2;
                            pet_1.on(LEvent.MOUSE_DOWN, this, this.onItem, [this.petLits[index].name, this.petLits[index].key, type, petId]);
                            break;
                        default:
                            break;
                    }
                };
                /**发送道具 */
                FriendViewMediator.prototype.onItem = function (ItemName, key, type, petId) {
                    var shareItem = "[" + ItemName + "]";
                    this._viewUI.chatInput_tex.text = shareItem;
                    this.shareItem = shareItem;
                    var disPlayInfo;
                    disPlayInfo = new modules.chat.models.DisplayInfoVo();
                    disPlayInfo.displaytype = type;
                    disPlayInfo.roleid = this._loginModel.roleDetail.roleid;
                    disPlayInfo.shopid = petId;
                    disPlayInfo.counterid = 1;
                    disPlayInfo.uniqid = key;
                    disPlayInfo.teamid = 0;
                    disPlayInfo.crosstt = 0;
                    disPlayInfo.serverid = 0;
                    this.displayInfo = [];
                    this.displayInfo.push(disPlayInfo);
                    if (type == 1)
                        RequesterProtocols._instance.c2s_CChatItemTips(disPlayInfo);
                };
                /**表情点击 */
                FriendViewMediator.prototype.onFaceClick = function (str) {
                    this.closeFace();
                    this._viewUI.chatInput_tex.text += str;
                };
                /** 点击任务栏 */
                FriendViewMediator.prototype.onTask = function (index, taskTitle, tasktype, taskid) {
                    taskTitle = "[" + taskTitle + "]";
                    var disPlayInfo;
                    disPlayInfo = new modules.chat.models.DisplayInfoVo();
                    disPlayInfo.displaytype = DisplayType.DISPLAY_TASK;
                    disPlayInfo.roleid = this._loginModel.roleDetail.roleid;
                    disPlayInfo.shopid = tasktype;
                    disPlayInfo.counterid = 1;
                    disPlayInfo.uniqid = taskid;
                    disPlayInfo.teamid = 0; /** 任务类型为师门时，这里 */
                    disPlayInfo.crosstt = 0;
                    disPlayInfo.serverid = 0;
                    this.displayInfo = [];
                    this.displayInfo.push(disPlayInfo);
                    this._viewUI.chatInput_tex.text = taskTitle;
                    this.sendChat();
                    this._viewUI.content_img.visible = false;
                };
                FriendViewMediator.prototype.getHistoryInput = function (historyInput) {
                    this._viewUI.chatInput_tex.text = historyInput;
                    this.closeFace();
                };
                FriendViewMediator.prototype.getCommonInput = function (commonInput) {
                    this._viewUI.chatInput_tex.text = commonInput;
                    this.closeFace();
                };
                /**发送消息 */
                FriendViewMediator.prototype.sendChat = function () {
                    if (this._viewUI.chatInput_tex.text != "") {
                        this._viewUI.chatInput_tex.maxChars = 44;
                        this.repstr = this._viewUI.chatInput_tex.text;
                        //關鍵字屏蔽
                        for (var i = 0; i < this.shield_word.length; i++) {
                            var index = this.repstr.search(this.shield_word[i]);
                            if (index != -1) {
                                this.repstr = this.repstr.replace(this.shield_word[i], "**");
                            }
                        }
                        this.historyMsg = this.repstr;
                        var msg = this.repstr;
                        //与好友聊天
                        if (this._viewUI.mychatInfo_list.visible == true) {
                            var roleid = FriendModel.getInstance().friendIdArr[this.selectNum]; //当前聊天好友id
                            RequesterProtocols._instance.c2s_CSendMessageToRole(roleid, msg, this.repstr, this.displayInfo);
                            var time = this.getNowTime();
                            var mymsgarr = []; //暂存发出消息
                            var friendmsgarr = []; //好友消息
                            var sendtimearr = []; //发出消息时间
                            var friendtimearr = []; //收到消息时间
                            var mydisplayinfoarr = []; //发出附件
                            var frienddisplayinfoarr = []; //好友附件
                            this.myMsgArr.push(msg);
                            this.friendMsgArr.push("");
                            this.sendTimeArr.push(time);
                            this.friendTimeArr.push("");
                            if (this.displayInfo.length > 0)
                                this.myDisplayinfoArr.push(this.displayInfo[0]);
                            else
                                this.myDisplayinfoArr.push("");
                            this.friendDisplayinfoArr.push("");
                            for (var i = 0; i < this.myMsgArr.length; i++) {
                                mymsgarr.push(this.myMsgArr[i]);
                            }
                            for (var i = 0; i < this.friendMsgArr.length; i++) {
                                friendmsgarr.push(this.friendMsgArr[i]);
                            }
                            for (var i = 0; i < this.sendTimeArr.length; i++) {
                                sendtimearr.push(this.sendTimeArr[i]);
                            }
                            for (var i = 0; i < this.friendTimeArr.length; i++) {
                                friendtimearr.push(this.friendTimeArr[i]);
                            }
                            for (var i = 0; i < this.myDisplayinfoArr.length; i++) {
                                mydisplayinfoarr.push(this.myDisplayinfoArr[i]);
                            }
                            for (var i = 0; i < this.friendDisplayinfoArr.length; i++) {
                                frienddisplayinfoarr.push(this.friendDisplayinfoArr[i]);
                            }
                            this.myMsgData.set(roleid, mymsgarr);
                            this.friendMsgData.set(roleid, friendmsgarr);
                            this.sendTimeData.set(roleid, sendtimearr);
                            this.friendTimeData.set(roleid, friendtimearr);
                            this.myDisplayinfoData.set(roleid, mydisplayinfoarr);
                            this.friendDisplayinfoData.set(roleid, frienddisplayinfoarr);
                            this.getMyChatData();
                        }
                        //与陌生人聊天
                        else if (this._viewUI.recentChatInfo_list.visible == true) {
                            var roleid = this.recentContactIdArr[this.selectRecentContactNum]; //当前聊天对象id
                            RequesterProtocols._instance.c2s_CSendMessageToRole(roleid, msg, this.repstr, this.displayInfo);
                            var time = this.getNowTime();
                            var torecentcontactmsgarr = []; //暂存发出消息
                            var recentContactmsgarr = []; //陌生人消息
                            var torecentContacttimearr = []; //发出消息时间
                            var recentContacttimearr = []; //收到消息时间
                            var torecentcontactdisplayinfoarr = []; //给陌生人附件
                            var recentcontactdisplayinfoarr = []; //陌生人附件
                            this.torecentContactMsgArr.push(msg);
                            this.recentContactMsgArr.push("");
                            this.torecentContactTimeArr.push(time);
                            this.recentContactTimeArr.push("");
                            if (this.displayInfo.length > 0)
                                this.torecentContactDisplayinfoArr.push(this.displayInfo[0]);
                            else
                                this.torecentContactDisplayinfoArr.push("");
                            this.recentContactDisplayinfoArr.push("");
                            for (var i = 0; i < this.torecentContactMsgArr.length; i++) {
                                torecentcontactmsgarr.push(this.torecentContactMsgArr[i]);
                            }
                            for (var i = 0; i < this.recentContactMsgArr.length; i++) {
                                recentContactmsgarr.push(this.recentContactMsgArr[i]);
                            }
                            for (var i = 0; i < this.torecentContactTimeArr.length; i++) {
                                torecentContacttimearr.push(this.torecentContactTimeArr[i]);
                            }
                            for (var i = 0; i < this.recentContactTimeArr.length; i++) {
                                recentContacttimearr.push(this.recentContactTimeArr[i]);
                            }
                            for (var i = 0; i < this.torecentContactDisplayinfoArr.length; i++) {
                                torecentcontactdisplayinfoarr.push(this.torecentContactDisplayinfoArr[i]);
                            }
                            for (var i = 0; i < this.recentContactDisplayinfoArr.length; i++) {
                                recentcontactdisplayinfoarr.push(this.recentContactDisplayinfoArr[i]);
                            }
                            this.torecentContactMsgData.set(roleid, torecentcontactmsgarr);
                            this.recentContactMsgData.set(roleid, recentContactmsgarr);
                            this.torecentContactTimeData.set(roleid, torecentContacttimearr);
                            this.recentContactTimeData.set(roleid, recentContacttimearr);
                            this.torecentContactDisplayinfoData.set(roleid, torecentcontactdisplayinfoarr);
                            this.recentContactDisplayinfoData.set(roleid, recentcontactdisplayinfoarr);
                            this.getRecentChatData();
                        }
                    }
                    else {
                        this.tipsTweenTo(modules.tips.models.TipsModel.getInstance().cstringResConfigData[FriendEnum.INPUT_SOMTHING].msg);
                    }
                    this._viewUI.chatInput_tex.text = ""; //清空输入框
                };
                /** 关闭表情 */
                FriendViewMediator.prototype.closeFace = function () {
                    this._viewUI.content_img.visible = false;
                    for (var i = 1; i <= 6; i++) {
                        var img = this._viewUI.friend_box.getChildByName("content_img").getChildByName("facebox_box").getChildByName("facebtn" + [i] + "_btn").getChildByName("state" + [i] + "_img");
                        img.visible = false;
                    }
                };
                /** 显示背包道具Tips */
                FriendViewMediator.prototype._ShowTips = function () {
                    var parame;
                    var selectItem = this.getItemBack();
                    if (selectItem) {
                        parame = new Laya.Dictionary();
                        var obj = BagModel.getInstance().getItemAttrData(selectItem.id);
                        var equipType = void 0;
                        try {
                            equipType = StrengTheningModel.getInstance().equipEffectData[selectItem.id].eequiptype;
                        }
                        catch (error) {
                            equipType = -1;
                        }
                        parame.set("itemId", selectItem.id);
                        parame.set("key", selectItem.key);
                        parame.set("packid", 1);
                        parame.set("outbattleuse", obj.outbattleuse); //("packid",1)
                        parame.set("shopid", obj.bCanSaleToNpc);
                        parame.set("number", selectItem.number);
                        parame.set("equiptype", equipType);
                        var isShow = true;
                        this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.BAG, parame, isShow);
                    }
                };
                /** 其他人点击的道具分享 */
                FriendViewMediator.prototype.otherOnItem = function (displayinfo, ItemName) {
                    if (displayinfo.displaytype == DisplayType.DISPLAY_ITEM) { /** 道具相关 */
                        ItemName = ItemName.replace("[", "");
                        ItemName = ItemName.replace("]", "");
                        var itemID = void 0;
                        var itemAttrData = BagModel.getInstance().itemAttrData;
                        for (var itemId in itemAttrData) {
                            if (itemAttrData[itemId].name == ItemName) {
                                itemID = itemAttrData[itemId].id;
                                break;
                            }
                        }
                        if (itemID != 0) {
                            ChatModel.getInstance().viewItemId = itemID;
                        }
                        RequesterProtocols._instance.c2s_CChatItemTips(displayinfo);
                    }
                    else if (displayinfo.displaytype == DisplayType.DISPLAY_PET) { /** 宠物相关 */
                        RequesterProtocols._instance.c2s_get_petinfo(displayinfo.roleid, displayinfo.uniqid);
                    }
                    else if (displayinfo.displaytype == DisplayType.DISPLAY_TASK) { /** 任务相关 */
                        RequesterProtocols._instance.c2s_CChatItemTips(displayinfo);
                    }
                };
                /** 查看别人的Tips */
                FriendViewMediator.prototype._ViewOtherItem = function (viewUI, app) {
                    var parame;
                    if (ChatModel.getInstance().viewItemId != 0) {
                        var ItemId = ChatModel.getInstance().viewItemId;
                        var obj = BagModel.getInstance().getItemAttrData(ItemId);
                        parame = new Laya.Dictionary();
                        var equipType = void 0;
                        try {
                            equipType = StrengTheningModel.getInstance().equipEffectData[ItemId].eequiptype;
                        }
                        catch (error) {
                            equipType = -1;
                        }
                        parame.set("itemId", ItemId);
                        parame.set("key", ChatModel.getInstance().chatTips[ChatModel.getInstance().chatTips.length - 1].uniqid);
                        parame.set("packid", -1);
                        parame.set("outbattleuse", obj.outbattleuse);
                        parame.set("shopid", obj.bCanSaleToNpc);
                        parame.set("number", 1);
                        parame.set("equiptype", equipType);
                        var isShow = true;
                        if (!viewUI) {
                            this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.BAG, parame, isShow);
                        }
                        else {
                            /** 方便主界面调用 */
                            this._tipsModule = new game.modules.tips.tipsModule(viewUI, app, TIPS_TYPE.BAG, parame, isShow);
                        }
                    }
                };
                /** 打开任务说明 */
                FriendViewMediator.prototype._ViewShareTask = function (displayInfo) {
                    this.TaskDescriberMediators = game.modules.commonUI.TaskDescriberMediators.getInstance(this._app);
                    this.TaskDescriberMediators.onShow(displayInfo);
                };
                /** 打开宠物详情界面 */
                FriendViewMediator.prototype.OpPetInfo = function (petinfo, nowPage) {
                    modules.ModuleManager.hide(modules.ModuleNames.FRIEND);
                    var isShowInStage = _super.prototype.isShow.call(this);
                    this.PetXiangQingMediator = new game.modules.pet.PetXiangQingMediator(this._app);
                    this.PetXiangQingMediator.init(petinfo);
                    LoginModel.getInstance().CommonPage = modules.ModuleNames.FRIEND;
                };
                /**根据 item key 获取选中的道具信息 */
                FriendViewMediator.prototype.getItemBack = function (chatkey, fromBag) {
                    var TipsLength = ChatModel.getInstance().chatTips.length;
                    var key;
                    if (chatkey) {
                        key = chatkey;
                    }
                    else {
                        key = ChatModel.getInstance().chatTips[TipsLength - 1].uniqid;
                    }
                    if (!fromBag) {
                        for (var itemListIndex = 0; itemListIndex < this.itemList.length; itemListIndex++) {
                            if (this.itemList[itemListIndex].key == key) {
                                return this.itemList[itemListIndex];
                            }
                        }
                    }
                    else {
                        var itemList = bagModel.getInstance().getBagGameItemData(BagTypes.BAG).items;
                        for (var itemListIndex = 0; itemListIndex < itemList.length; itemListIndex++) {
                            if (itemList[itemListIndex].key == key) {
                                return itemList[itemListIndex];
                            }
                        }
                    }
                    return false;
                };
                /** 聊天频道点击显示物品的Tips */
                FriendViewMediator.prototype.showItemTips = function (displayinfo, fromBag, app, viewUI) {
                    /** 代码复用，后面是主界面的聊天点击传过来的参数 */
                    var chatkey = displayinfo.uniqid;
                    var item;
                    if (!fromBag) {
                        item = this.getItemBack(chatkey);
                    }
                    else {
                        item = this.getItemBack(chatkey, fromBag);
                    }
                    if (item) {
                        var parame = void 0;
                        parame = new Laya.Dictionary();
                        var obj = BagModel.getInstance().getItemAttrData(item.id);
                        var equipType = void 0;
                        try {
                            equipType = StrengTheningModel.getInstance().equipEffectData[item.id].eequiptype;
                        }
                        catch (error) {
                            equipType = -1;
                        }
                        parame.set("itemId", item.id);
                        parame.set("key", item.key);
                        parame.set("packid", 1);
                        parame.set("outbattleuse", obj.outbattleuse); //("packid",1)
                        parame.set("shopid", obj.bCanSaleToNpc);
                        parame.set("number", item.number);
                        parame.set("equiptype", equipType);
                        var isShow = true;
                        if (!app) {
                            this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.BAG, parame, isShow);
                        }
                        else {
                            this._tipsModule = new game.modules.tips.tipsModule(viewUI, app, TIPS_TYPE.BAG, parame, isShow);
                        }
                    }
                };
                /** 提示信息缓动*/
                FriendViewMediator.prototype.tipsTweenTo = function (data) {
                    var terminalY = 0;
                    this._viewUI.msgTips1_img.visible = true;
                    this._viewUI.msgTips_lab.visible = true;
                    this._viewUI.msgTips_lab.text = data;
                    Laya.Tween.to(this._viewUI.msgTips1_img, { y: terminalY }, 500, null, Laya.Handler.create(this, function () {
                        this._viewUI.msgTips1_img.visible = false;
                        this._viewUI.msgTips1_img.x = this.px;
                        this._viewUI.msgTips1_img.y = this.py;
                    }), null, false);
                };
                /**初始化界面 */
                FriendViewMediator.prototype.initUI = function () {
                    this._viewUI.contact_box.visible = false;
                    this._viewUI.friendChat_box.visible = false;
                    this._viewUI.addBlackList_box.visible = false;
                    this._viewUI.recentContact_list.visible = true;
                    this._viewUI.systemMsg_img.skin = "common/icon/avatarrole/30040.png";
                    this._viewUI.systemMsg2_img.skin = "common/icon/avatarrole/30040.png";
                    this.getRecentContactListData();
                    this._viewUI.myFriend_btn.label = friend.models.FriendModel.chineseStr.friend + FriendModel.getInstance().friendNameArr.length + friend.models.FriendModel.chineseStr.friendNum; //好友数量
                    this.getListData();
                    this.getBlackListData();
                    this._viewUI.blacklistNum_lab.text = this.blacklistuserNameArr.length.toString(); //黑名单人数
                    this.getAddBlackListData();
                };
                /** * 打开添加好友界面 */
                FriendViewMediator.prototype.showAddFriendView = function () {
                    this._addFriendViewViewMediator.show();
                    modules.ModuleManager.hide(modules.ModuleNames.FRIEND);
                    LoginModel.getInstance().CommonPage = modules.ModuleNames.FRIEND;
                };
                /**初始化选择列表 */
                FriendViewMediator.prototype.getSelectListData = function () {
                    this._viewUI.select_list.vScrollBarSkin = "";
                    this._viewUI.select_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.select_list.scrollBar.elasticDistance = 50;
                    this._viewUI.select_list.array = this.selectNameArr;
                    this._viewUI.select_list.renderHandler = new Handler(this, this.onselectRender);
                    this._viewUI.select_list.selectHandler = new Handler(this, this.onselectlist);
                    this._viewUI.select_list.selectedIndex = 0;
                };
                /**渲染选择列表 */
                FriendViewMediator.prototype.onselectRender = function (cell, index) {
                    var selectBtn = cell.getChildByName("select_btn");
                    selectBtn.label = this.selectNameArr[index];
                };
                /**处理选择列表点击 */
                FriendViewMediator.prototype.onselectlist = function (index) {
                    var selectBtn = this._viewUI.select_list.getCell(index).getChildByName("select_btn");
                    selectBtn.selected = true;
                    for (var i = 0; i < this.selectNameArr.length; i++) {
                        if (i != index) {
                            var otherBtn = this._viewUI.select_list.getCell(i).getChildByName("select_btn");
                            otherBtn.selected = false;
                        }
                    }
                    //默认打开最近联系人面板
                    if (this._viewUI.select_list.selectedIndex == 0) {
                        this._viewUI.recentContact_box.visible = true;
                        this._viewUI.friendChat_box.visible = false;
                        this._viewUI.contact_box.visible = false;
                        this._viewUI.addBlackList_box.visible = false;
                        this.selectNum = -1;
                        this.selectRecentContactNum = -1;
                        this.getRecentContactListData();
                    }
                    else {
                        this._viewUI.recentContact_box.visible = false;
                        this._viewUI.friendChat_box.visible = false;
                        this._viewUI.contact_box.visible = true;
                        this.selectNum = -1;
                        this.selectRecentContactNum = -1;
                        this.showMyFriend();
                    }
                    if (this.lastBtn) {
                        this.lastBtn.skin = "common/ui/tongyong/common_list_3textbg.png";
                        if (this.lastBtn && this.lastBtn != this._viewUI.systemMsg2_btn) {
                            this.lastBtn = undefined;
                        }
                    }
                };
                /** 显示黑名单*/
                FriendViewMediator.prototype.showBlacklist = function () {
                    this._viewUI.addBlackList_box.visible = true;
                    this._viewUI.blackList_list.visible = true;
                    this._viewUI.addBlackList_list.visible = false;
                    this._viewUI.contact_list.visible = false;
                    this._viewUI.systemMsg2_btn.visible = false;
                    this._viewUI.friendChat_box.visible = false;
                    this._viewUI.blacklist_btn.y = 45;
                };
                /**显示系统消息 */
                FriendViewMediator.prototype.showNotification = function (btn) {
                    if (btn)
                        this.showSelected(btn);
                    this._viewUI.friendChat_box.visible = true;
                    this._viewUI.relation_box.visible = false;
                    this._viewUI.mychatInfo_list.visible = false;
                    this._viewUI.chatButton_box.visible = false;
                    this._viewUI.notification_panel.visible = true;
                    this._viewUI.recentChatInfo_list.visible = false;
                    if (this._viewUI.systemMsgPoing_img.visible == true) {
                        this._viewUI.systemMsgPoing_img.visible = false;
                        this._viewUI.systemMsgPoint2_img.visible = false;
                        var selectPoint = this._viewUI.select_list.getCell(0).getChildByName("selectPoint_img"); //选择按钮红点
                        selectPoint.visible = false;
                        friend.models.FriendProxy.getInstance().event(friend.models.readMessage_EVENT); //读完当前消息，发送事件，通知主界面取消好友红点
                    }
                    this.getSystemMessagePanelData();
                };
                /** 初始化系统消息的面板 */
                FriendViewMediator.prototype.getSystemMessagePanelData = function () {
                    for (var i = 1;; i++) {
                        var render = this._viewUI.notification_panel.getChildByName("render" + i);
                        if (render) {
                            this._viewUI.notification_panel.removeChild(render);
                        }
                        else {
                            break;
                        }
                    }
                    this._viewUI.notification_panel.vScrollBarSkin = "";
                    this._viewUI.notification_panel.vScrollBar.elasticBackTime = 200;
                    this._viewUI.notification_panel.vScrollBar.elasticDistance = 50;
                    var render0 = this._viewUI.notification_panel.getChildByName("render0");
                    this.onSystemMsgRender(render0, 0);
                    var _systemMessageTimeArr = friend.models.FriendModel.getInstance().systemMessageTimeArr;
                    for (var i = 1; i < _systemMessageTimeArr.length; i++) {
                        var render = new Laya.Box;
                        render = this.copyUIComponent(render, render0, i);
                        render.name = "render" + i;
                        this._viewUI.notification_panel.addChild(render);
                        this.onSystemMsgRender(render, i);
                    }
                    this._viewUI.notification_panel.scrollTo(null, 1); //每次显示系统好友消息的最新消息
                };
                /** 拷贝一个UI组件 */
                FriendViewMediator.prototype.copyUIComponent = function (newUI, oldUI, index) {
                    //拷贝系统好友头像边框
                    var old_notificationFrame_img = oldUI.getChildByName("notificationFrame_img");
                    var new_notificationFrame_img = new Laya.Image;
                    new_notificationFrame_img.name = "notificationFrame_img";
                    newUI.addChild(new_notificationFrame_img);
                    this.setCopyedUIComponent(new_notificationFrame_img, old_notificationFrame_img, Laya.Image);
                    //拷贝系统好友头像
                    var old_contentImg = oldUI.getChildByName("notificationContent_img");
                    var new_contentImg = new Laya.Image;
                    new_contentImg.name = "notificationContent_img";
                    newUI.addChild(new_contentImg);
                    this.setCopyedUIComponent(new_contentImg, old_contentImg, Laya.Image);
                    //拷贝系统消息时间文本
                    var old_TimeLab = oldUI.getChildByName("notificationTime_lab");
                    var new_TimeLab = new Laya.Label;
                    new_TimeLab.name = "notificationTime_lab";
                    newUI.addChild(new_TimeLab);
                    this.setCopyedUIComponent(new_TimeLab, old_TimeLab, Laya.Label);
                    //拷贝系统消息文本背景图
                    var old_notificationBgImg = oldUI.getChildByName("notificationBg_img");
                    var new_notificationBgImg = new Laya.Image;
                    new_notificationBgImg.name = "notificationBg_img";
                    newUI.addChild(new_notificationBgImg);
                    this.setCopyedUIComponent(new_notificationBgImg, old_notificationBgImg, Laya.Image);
                    //拷贝系统消息富文本
                    var old_notificationContentHtm = oldUI.getChildByName("notificationContent_htm");
                    var new_notificationContentHtm = new Laya.HTMLDivElement;
                    new_notificationContentHtm.name = "notificationContent_htm";
                    newUI.addChild(new_notificationContentHtm);
                    this.setCopyedUIComponent(new_notificationContentHtm, old_notificationContentHtm, Laya.HTMLDivElement);
                    return newUI;
                };
                /** 设置所拷贝出来UI组件各属性值 */
                FriendViewMediator.prototype.setCopyedUIComponent = function (newUI, oldUI, uiType) {
                    newUI.x = oldUI.x;
                    newUI.y = oldUI.y;
                    newUI.width = oldUI.width;
                    newUI.height = oldUI.height;
                    if (uiType == Laya.Image) {
                        newUI.skin = oldUI.skin;
                        newUI.sizeGrid = oldUI.sizeGrid;
                    }
                    else if (uiType == Laya.Label) {
                        newUI.color = oldUI.color;
                        newUI.bold = oldUI.bold;
                        newUI.font = oldUI.font;
                        newUI.fontSize = oldUI.fontSize;
                    }
                };
                /** 渲染系统消息 */
                FriendViewMediator.prototype.onSystemMsgRender = function (render, index) {
                    var systemMessageTime = friend.models.FriendModel.getInstance().systemMessageTimeArr[index];
                    if (systemMessageTime == undefined) {
                        render.visible = false;
                        return;
                    }
                    else {
                        render.visible = true;
                    }
                    var contentImg = render.getChildByName("notificationContent_img");
                    var TimeLab = render.getChildByName("notificationTime_lab");
                    var notificationBgImg = render.getChildByName("notificationBg_img");
                    var notificationContentHtm = render.getChildByName("notificationContent_htm");
                    var systemMessageContentText = friend.models.FriendModel.getInstance().systemMessageContentParamArr[index];
                    TimeLab.text = systemMessageTime;
                    notificationContentHtm.innerHTML = "<span style='font:24px ;color:#50321a; SimHei'> " + systemMessageContentText + "</span>";
                    notificationBgImg.height = notificationContentHtm.contextHeight + 15;
                    contentImg.skin = "common/icon/avatarrole/30040.png";
                    notificationContentHtm.on(LEvent.LINK, this, this.onClickName, [systemMessageContentText]);
                    var diffHeight = notificationBgImg.height - 56; //56这个值是消息背景图原本的高
                    if (diffHeight < 0) {
                        diffHeight = 0;
                    }
                    if (index != 0) {
                        //上一条消息的格子
                        var preMsgBox = this._viewUI.notification_panel.getChildByName("render" + (index - 1));
                        //上一条消息格子的y轴坐标
                        var preMsgY = preMsgBox.y;
                        //上一条消息格子的height高
                        var preMsgHeight = preMsgBox.height;
                        //当前消息格子的y轴坐标
                        render.y = preMsgY + preMsgHeight;
                        if (diffHeight >= 0) {
                            render.height = 81 + diffHeight; //81这个值是消息容器Box原本的高
                        }
                    }
                    else {
                        render.y = 0;
                        if (diffHeight >= 0) {
                            render.height = 81 + diffHeight; //81这个值是消息容器Box原本的高
                        }
                    }
                };
                /** 发起请求 */
                FriendViewMediator.prototype.sendRequest = function () {
                    var _roleid;
                    if (this._viewUI.select_list.selectedIndex == 1) {
                        _roleid = FriendModel.getInstance().friendIdArr[this.selectNum];
                    }
                    else {
                        _roleid = this.recentContactIdArr[this.selectRecentContactNum];
                    }
                    RequesterProtocols._instance.c2s_CReqRoleTeamState(_roleid);
                    friend.models.FriendProxy.getInstance().once(friend.models.SRequestUpdateRoleInfo_EVENT, this, this.showGive);
                    RequesterProtocols._instance.c2s_CRequestUpdateRoleInfo(_roleid);
                };
                /**打开赠送礼物界面 */
                FriendViewMediator.prototype.showGive = function () {
                    var _roleInfoBean = FriendModel.getInstance().SRequestUpdateRoleInfoData.get("data").FriendInfoBean;
                    var data = [];
                    if (this._viewUI.select_list.selectedIndex == 1) { //联系人界面
                        data.push(FriendModel.getInstance().friendIdArr[this.selectNum], FriendModel.getInstance().friendNameArr[this.selectNum], FriendModel.getInstance().friendLevelArr[this.selectNum], FriendModel.getInstance().touxiangIdArr[this.selectNum], FriendModel.getInstance().zhiyeImgArr[this.selectNum], _roleInfoBean.online);
                    }
                    else { //最近联系人界面
                        var roleid = this.recentContactIdArr[this.selectRecentContactNum];
                        var _flag = friend.models.FriendModel.getInstance().isMyFriend(roleid);
                        if (_flag == FriendEnum.STRANGE_KEY) {
                            data.push(this.recentContactIdArr[this.selectRecentContactNum], this.recentContactNameArr[this.selectRecentContactNum], this.recentContactLevelArr[this.selectRecentContactNum], this.recentContactHeadIdArr[this.selectRecentContactNum], this.recentContactZhiyeImgArr[this.selectRecentContactNum], _roleInfoBean.online);
                        }
                        else {
                            var _i = friend.models.FriendModel.getInstance().friendIdArr.indexOf(roleid);
                            data.push(FriendModel.getInstance().friendIdArr[_i], FriendModel.getInstance().friendNameArr[_i], FriendModel.getInstance().friendLevelArr[_i], FriendModel.getInstance().touxiangIdArr[_i], FriendModel.getInstance().zhiyeImgArr[_i], _roleInfoBean.online);
                        }
                    }
                    //ModuleManager.hide(ModuleNames.FRIEND);
                    this.hide();
                    var _GiveGiftViewMediator = new friend.GiveGiftViewMediator(this._app);
                    _GiveGiftViewMediator.onShow(data);
                    LoginModel.getInstance().CommonPage = modules.ModuleNames.FRIEND;
                };
                /**我的好友按钮点击事件 */
                FriendViewMediator.prototype.showMyFriend = function () {
                    this._viewUI.addBlackList_box.visible = false;
                    this._viewUI.blackList_list.visible = false;
                    this._viewUI.contact_list.visible = true;
                    this._viewUI.systemMsg2_btn.visible = true;
                    this._viewUI.friendChat_box.visible = false;
                    this._viewUI.blacklist_btn.y = 322;
                };
                FriendViewMediator.prototype.show = function () {
                    this.eventListener();
                    _super.prototype.show.call(this);
                    //this.lastBtn = undefined;
                    this._viewUI.addBlackId_lab.text = "";
                    this.px = this._viewUI.msgTips1_img.x;
                    this.py = this._viewUI.msgTips1_img.y;
                    this.key = true;
                    for (var i = 0; i < FriendModel.getInstance().friendIdArr.length; i++) {
                        RequesterProtocols._instance.c2s_CRequestUpdateRoleInfo(FriendModel.getInstance().friendIdArr[i]); //请求玩家信息
                    }
                    //如果界面没有初始化
                    if (!friend.models.FriendModel.getInstance().initFlag)
                        this.initChatData();
                    this.getSelectListData();
                    //加载出最近联系人
                    this.loadRecentContact();
                    if (this.lastBtn && this.lastBtn != this._viewUI.systemMsg_btn && this.lastBtn != this._viewUI.systemMsg2_btn) {
                        this.showSelected(this.lastBtn);
                    }
                    else if (this.lastBtn == this._viewUI.systemMsg_btn) {
                        this.showSelected(this._viewUI.systemMsg_btn);
                        this.showNotification();
                    }
                    else if (this.lastBtn == this._viewUI.systemMsg2_btn) {
                        this._viewUI.select_list.selectedIndex = 1;
                        this.showSelected(this._viewUI.systemMsg2_btn);
                        this.showNotification();
                    }
                };
                FriendViewMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                FriendViewMediator.prototype.hide = function () {
                    friend.models.FriendModel.getInstance().initFlag = false;
                    if (this._viewUI.friendChat_box.visible && this.lastBtn == this._viewUI.systemMsg_btn) {
                        this.selectRecentContactNum = -1;
                    }
                    _super.prototype.hide.call(this);
                    this.key = false;
                    this._viewUI.content_img.visible = false;
                    modules.chat.models.ChatProxy.getInstance().off(modules.chat.models.SHOW_ITEM_TIPS, this, this._ShowTips);
                    modules.chat.models.ChatProxy.getInstance().off(modules.chat.models.VIWE_OTHER_ITEM, this, this._ViewOtherItem);
                    modules.pet.models.PetProxy.getInstance().off(modules.pet.models.GETPETINFO, this, this.OpPetInfo);
                    modules.tips.models.TipsProxy.getInstance().off(modules.tips.models.ON_KRYBOARD, this, this.onKeyboard);
                };
                return FriendViewMediator;
            }(game.modules.UiMediator));
            friend.FriendViewMediator = FriendViewMediator;
        })(friend = modules.friend || (modules.friend = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=FriendViewMediator.js.map