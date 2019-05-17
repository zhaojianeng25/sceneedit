/**
 * 邮件类
 */
// import MailUI = ui.common.FriendMailUI;
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
            var MailViewMediator = /** @class */ (function (_super) {
                __extends(MailViewMediator, _super);
                function MailViewMediator(uiLayer) {
                    var _this = _super.call(this, uiLayer) || this;
                    _this._viewUI = new ui.common.FriendMailUI();
                    _this._viewUI.mouseThrough = true;
                    _this.isCenter = false;
                    _this.initialize();
                    _this.registerEvent();
                    _this.eventListener();
                    return _this;
                }
                /**初始化 */
                MailViewMediator.prototype.initialize = function () {
                    this.mailNameArr = new Array();
                    this.mailDateArr = new Array();
                    this.mailContent = new Array();
                    this.accessoryArr = new Array();
                    this.accessoryNumArr = new Array();
                    this.accessoryDic = new Laya.Dictionary();
                    this.accessoryNumDic = new Laya.Dictionary();
                    this.getStateDic = new Laya.Dictionary();
                    this.readStateDic = new Laya.Dictionary();
                    this.mailIdArr = new Array();
                    this.cItemAttrObj = BagModel.getInstance().itemAttrData;
                };
                /**注册事件监听 */
                MailViewMediator.prototype.eventListener = function () {
                    //监听服务器发送的邮件信息
                    friend.models.FriendProxy.getInstance().on(friend.models.SMailInfo_EVENT, this, this.onMailInfo);
                    //监听服务器发送的刷新邮件状态信息
                    friend.models.FriendProxy.getInstance().on(friend.models.SMailState_EVENT, this, this.onMailState);
                    //监听邮件列表信息
                    friend.models.FriendProxy.getInstance().on(friend.models.SMailList_EVENT, this, this.onMailList);
                };
                /**通知客户端邮件列表*/
                MailViewMediator.prototype.onMailList = function (e) {
                    var data = friend.models.FriendModel.getInstance().SMailListData.get("data");
                    for (var i = 0; i < data.mailList.length; i++) {
                        this.mailNameArr.push(data.mailList[i].title);
                        this.mailDateArr.push(data.mailList[i].time);
                        this.mailContent.push(data.mailList[i].content);
                        this.mailIdArr.push(data.mailList[i].id);
                        var fujianarr = [];
                        var fujiannumarr = [];
                        for (var j = 0; j < data.mailList[i].items.keys.length; j++) {
                            fujianarr.push(data.mailList[i].items.keys[j]);
                            fujiannumarr.push(data.mailList[i].items.get(data.mailList[i].items.keys[j]));
                        }
                        this.accessoryDic.set(data.mailList[i].id, fujianarr);
                        this.accessoryNumDic.set(data.mailList[i].id, fujiannumarr);
                        if (data.mailList[i].readflag == 0) {
                            friend.models.FriendProxy.getInstance().event(friend.models.receiveMail_EVENT); //通知主界面，有未读邮件 
                        }
                        this.readStateDic.set(data.mailList[i].id, data.mailList[i].readflag);
                    }
                    this.getListData();
                    this.updateFlag();
                };
                /**通知客户端刷新邮件状态*/
                MailViewMediator.prototype.onMailState = function (e) {
                    var data = friend.models.FriendModel.getInstance().SMailStateData.get("data");
                    //已领取附件
                    if (data.statetype == 1) {
                        this.getStateDic.set(data.id, 1);
                        this._viewUI.get_btn.skin = "common/ui/tongyong/hui63.png";
                        this._viewUI.get_btn.label = friend.models.FriendModel.chineseStr.yilingqu;
                        this._viewUI.get_btn.mouseEnabled = false;
                    }
                    //读取状态改变
                    else if (data.statetype == 0) {
                        var mailPointImg = this._viewUI.mail_list.getCell(this.selectNum).getChildByName("receiveMail_btn").getChildByName("mailPoint_img");
                        mailPointImg.visible = false;
                        this.readStateDic.set(data.id, data.statevalue);
                        this.updateFlag();
                    }
                };
                /**刷新邮件是否读取标志 */
                MailViewMediator.prototype.updateFlag = function () {
                    var flag = true;
                    for (var i = 0; i < this.readStateDic.keys.length; i++) {
                        if (this.readStateDic.values[i] == 0)
                            flag = false;
                    }
                    if (flag)
                        friend.models.FriendProxy.getInstance().event(friend.models.readMail_EVENT); //邮件全部已读  
                };
                /**通知客户端刷新邮件*/
                MailViewMediator.prototype.onMailInfo = function (e) {
                    var data = friend.models.FriendModel.getInstance().SMailInfoData.get("data");
                    this.mailNameArr.push(data.mail.title);
                    this.mailDateArr.push(data.mail.time);
                    this.mailContent.push(data.mail.content);
                    this.mailIdArr.push(data.mail.id);
                    var fujianarr = [];
                    var fujiannumarr = [];
                    for (var i = 0; i < data.mail.items.keys.length; i++) {
                        fujianarr.push(data.mail.items.keys[i]);
                        fujiannumarr.push(data.mail.items.get(data.mail.items.keys[i]));
                    }
                    this.accessoryDic.set(data.mail.id, fujianarr);
                    this.accessoryNumDic.set(data.mail.id, fujiannumarr);
                    if (data.mail.readflag == 0) {
                        friend.models.FriendProxy.getInstance().event(friend.models.receiveMail_EVENT); //未读邮件 
                    }
                    this.readStateDic.set(data.mail.id, data.mail.readflag);
                    this.getListData();
                    this.updateFlag();
                };
                /**初始化邮件列表 */
                MailViewMediator.prototype.getListData = function () {
                    this._viewUI.mail_list.vScrollBarSkin = "";
                    this._viewUI.mail_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.mail_list.scrollBar.elasticDistance = 50;
                    this._viewUI.mail_list.array = this.mailNameArr;
                    this._viewUI.mail_list.renderHandler = new Handler(this, this.onRender);
                    this._viewUI.mail_list.selectHandler = new Handler(this, this.onSelect);
                    this._viewUI.mail_list.selectedIndex = -1;
                };
                /**渲染邮件列表 */
                MailViewMediator.prototype.onRender = function (cell, index) {
                    var nameLab = cell.getChildByName("receiveMail_btn").getChildByName("mailName_lab");
                    var dateLab = cell.getChildByName("receiveMail_btn").getChildByName("date_lab");
                    var contentImg = cell.getChildByName("receiveMail_btn").getChildByName("content_img");
                    var mailPointImg = cell.getChildByName("receiveMail_btn").getChildByName("mailPoint_img");
                    //未读邮件标上红点
                    if (this.readStateDic.get(this.mailIdArr[index]) == 0) {
                        mailPointImg.visible = true;
                    }
                    else
                        mailPointImg.visible = false;
                    nameLab.text = this.mailNameArr[index];
                    dateLab.text = this.mailDateArr[index];
                    contentImg.skin = "common/icon/avatarrole/30040.png";
                };
                /**处理邮件列表点击 */
                MailViewMediator.prototype.onSelect = function (index) {
                    if (index != -1) {
                        this.selectNum = index;
                        this._viewUI.mailContent_box.visible = true;
                        this._viewUI.mailText_lab.text = this.mailContent[index]; //邮件内容
                        var fujianarr = [];
                        var fujiannumarr = [];
                        fujianarr = this.accessoryDic.get(this.mailIdArr[index]);
                        fujiannumarr = this.accessoryNumDic.get(this.mailIdArr[index]);
                        //如果该邮件为未读状态
                        if (this.readStateDic.get(this.mailIdArr[index]) == 0) {
                            RequesterProtocols._instance.c2s_CMailRead(1, this.mailIdArr[this.selectNum]); //客户端申请设置邮件已读
                        }
                        //是否有附件
                        if (fujianarr.length == 0) {
                            this._viewUI.accessory_list.visible = false;
                            this._viewUI.get_btn.visible = false;
                        }
                        else {
                            this._viewUI.accessory_list.visible = true;
                            this._viewUI.get_btn.visible = true;
                            var flag = true;
                            //区分附件是否已被领取
                            for (var i = 0; i < this.getStateDic.keys.length; i++) {
                                if (this.mailIdArr[index] == this.getStateDic.keys[i]) {
                                    flag = false;
                                }
                            }
                            if (flag) {
                                this._viewUI.get_btn.skin = "common/ui/tongyong/hongniu.png";
                                this._viewUI.get_btn.label = friend.models.FriendModel.chineseStr.lingqu;
                                this._viewUI.get_btn.mouseEnabled = true;
                            }
                            else {
                                this._viewUI.get_btn.skin = "common/ui/tongyong/hui63.png";
                                this._viewUI.get_btn.label = friend.models.FriendModel.chineseStr.yilingqu;
                                this._viewUI.get_btn.mouseEnabled = false;
                            }
                            this.accessoryArr.length = 0;
                            this.accessoryNumArr.length = 0;
                            for (var i = 0; i < fujianarr.length; i++) {
                                this.accessoryArr.push(fujianarr[i]);
                                this.accessoryNumArr.push(fujiannumarr[i]);
                            }
                            this.getAccessoryListData();
                        }
                        this._viewUI.mail_list.selectedIndex = -1;
                    }
                };
                /**初始化附件列表 */
                MailViewMediator.prototype.getAccessoryListData = function () {
                    this._viewUI.accessory_list.vScrollBarSkin = "";
                    this._viewUI.accessory_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.accessory_list.scrollBar.elasticDistance = 50;
                    this._viewUI.accessory_list.array = this.accessoryArr;
                    this._viewUI.accessory_list.renderHandler = new Handler(this, this.onAccessoryRender);
                    this._viewUI.accessory_list.selectHandler = new Handler(this, this.onAccessorySelect);
                    this._viewUI.accessory_list.selectedIndex = -1;
                };
                /**渲染附件列表 */
                MailViewMediator.prototype.onAccessoryRender = function (cell, index) {
                    var contentImg = cell.getChildByName("accessory_btn").getChildByName("content_img");
                    var accessoryNumLab = cell.getChildByName("accessory_btn").getChildByName("accessoryNum_lab");
                    accessoryNumLab.text = this.accessoryNumArr[index].toString();
                    contentImg.skin = "common/icon/item/" + this.cItemAttrObj[this.accessoryArr[index]]["icon"] + ".png";
                };
                /**处理附件列表点击 */
                MailViewMediator.prototype.onAccessorySelect = function (index) {
                    if (index != -1) {
                        //显示点击物品提示
                        this._viewUI.accessory_list.selectedIndex = -1;
                        var itemId = this.accessoryArr[index];
                        var parame = new Dictionary();
                        parame.set("itemId", itemId);
                        this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.commonItem, parame);
                    }
                };
                /**领取附件 */
                MailViewMediator.prototype.getAccessory = function () {
                    RequesterProtocols._instance.c2s_CMailGet_Award(1, this.mailIdArr[this.selectNum]); //客户端申请获取邮件奖励
                };
                MailViewMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                    this.getListData();
                    this._viewUI.mailContent_box.visible = false;
                };
                MailViewMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                MailViewMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                /** * 注册点击事件*/
                MailViewMediator.prototype.registerEvent = function () {
                    this._viewUI.get_btn.on(LEvent.MOUSE_DOWN, this, this.getAccessory);
                };
                return MailViewMediator;
            }(game.modules.UiMediator));
            friend.MailViewMediator = MailViewMediator;
        })(friend = modules.friend || (modules.friend = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=MailViewMediator.js.map