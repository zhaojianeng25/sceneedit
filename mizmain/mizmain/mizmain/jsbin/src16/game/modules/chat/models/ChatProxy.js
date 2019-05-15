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
        var chat;
        (function (chat) {
            var models;
            (function (models) {
                /** 消息提示Tips */
                models.SHOW_DISSAPEAR_MSG_TIPS = "showDisMsgTips";
                /** 显示物品Tips */
                models.SHOW_ITEM_TIPS = "showItemTips";
                /** 查看别人的分享Item */
                models.VIWE_OTHER_ITEM = " viewOtherItem";
                /** 查看任务 */
                models.VIWE_SHARE_TASK = " viewShareTask";
                /** 打开主界面监听宠物详情 */
                models.OPEN_MAINHUD_PET_LISTEN = "openHudPetListener";
                /** 关闭主界面监听宠物详情 */
                models.CLOSE_MAINHUD_PET_LISTEN = "closeHudPetListener";
                /** 跑马灯消息提示tips */
                models.SHOW_TIPS_ROLE_CHANNEL = "showTipsRoleChannel";
                /** 世界频道消息提示tips */
                models.SHOW_TIPS_WORLD = "showTipsWorld";
                /** NPC对话消息 */
                models.NPC_Dialog_Msg = "npcDialogEvent";
                /** 刷新各个系统消息在不同频道的表现 */
                models.SYS_MSG_IN_CHANNEL = "showMsgInChannel";
                /** 弹窗提示Tips */
                models.SHOW_TIPS_MESSAGE = "showTipsMessage";
                var ChatProxy = /** @class */ (function (_super) {
                    __extends(ChatProxy, _super);
                    function ChatProxy() {
                        var _this = _super.call(this) || this;
                        ChatProxy._instance = _this;
                        _this.init();
                        return _this;
                    }
                    ChatProxy.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new ChatProxy();
                        }
                        return this._instance;
                    };
                    ChatProxy.prototype.init = function () {
                        models.ChatModel.getInstance();
                        this.addNetworkListener();
                        this._battleEndTipsStorage();
                        /** l聊天屏蔽字.xlsx */
                        Laya.loader.load("common/data/temp/chat.cbanwords.bin", Handler.create(this, this.onloadedChatConfigComplete), null, Loader.BUFFER);
                        Laya.loader.load("common/data/temp/message.cmessagetip.bin", Handler.create(this, this.onloadedMessageTipsComplete), null, Loader.BUFFER);
                        Laya.loader.load("common/data/temp/chat.cquickchat.bin", Handler.create(this, this.onloadedQuickChatComplete), null, Loader.BUFFER);
                    };
                    ChatProxy.prototype.onloadedChatConfigComplete = function () {
                        //console.log("cbanwords聊天表格加载完毕------ completed");
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/chat.cbanwords.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.ChatModel._instance.chatConfigBinDic, game.data.template.CBanWordsBaseVo, "id");
                        console.log("onloadedChatConfigComplete:", models.ChatModel._instance.chatConfigBinDic);
                    };
                    ChatProxy.prototype.onloadedMessageTipsComplete = function () {
                        //console.log("cmessagetip聊天表格加载完毕------ completed");
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/message.cmessagetip.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.ChatModel._instance.chatMessageTips, game.data.template.CMessageTipBaseVo, "id");
                        console.log("onloadedMessageTipsComplete:", models.ChatModel._instance.chatMessageTips);
                    };
                    ChatProxy.prototype.onloadedQuickChatComplete = function () {
                        //console.log("QuickChat聊天表格加载完毕------ completed");
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/chat.cquickchat.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.ChatModel._instance.chatQuickChat, game.data.template.CquickchatBaseVo, "id");
                        console.log("onloadedQuickChatComplete:", models.ChatModel._instance.chatQuickChat);
                    };
                    // 添加监听
                    ChatProxy.prototype.addNetworkListener = function () {
                        Network._instance.addHanlder(ProtocolsEnum.STransChatMessage2Client, this, this.onTransChatMessage2Client);
                        Network._instance.addHanlder(ProtocolsEnum.STransChatMessageNotify2Client, this, this.onSTransChatMessageNotify2Client);
                        Network._instance.addHanlder(ProtocolsEnum.SChatItemTips, this, this.onSChatItemTips);
                        Network._instance.addHanlder(ProtocolsEnum.SExpMessageTips, this, this.onSExpMessageTips);
                        Network._instance.addHanlder(ProtocolsEnum.SChatHelpResult, this, this.onSChatHelpResult);
                        Network._instance.addHanlder(ProtocolsEnum.SDropInstance, this, this.onSDropInstance);
                    };
                    // 移除监听
                    ChatProxy.prototype.removeNetworkListener = function () {
                        Network._instance.removeHanlder(ProtocolsEnum.STransChatMessage2Client, this, this.onTransChatMessage2Client);
                        Network._instance.removeHanlder(ProtocolsEnum.STransChatMessageNotify2Client, this, this.onSTransChatMessageNotify2Client);
                        Network._instance.removeHanlder(ProtocolsEnum.SChatItemTips, this, this.onSChatItemTips);
                        Network._instance.removeHanlder(ProtocolsEnum.SExpMessageTips, this, this.onSExpMessageTips);
                        Network._instance.removeHanlder(ProtocolsEnum.SChatHelpResult, this, this.onSChatHelpResult);
                    };
                    // 聊天求助发送结果
                    ChatProxy.prototype.onSDropInstance = function (optcode, msg) {
                        this.event(models.SHOW_TIPS_MESSAGE, [msg.messageid, msg.landname]);
                    };
                    // 聊天求助发送结果
                    ChatProxy.prototype.onSChatHelpResult = function (optcode, msg) {
                        console.log("TransChatMessage2Client", msg.result);
                        var rolesNum = 2;
                    };
                    // 
                    ChatProxy.prototype.onSExpMessageTips = function (optcode, msg) {
                        console.log("TransChatMessage2Client", msg.expvalue);
                        var rolesNum = 2;
                    };
                    // 
                    ChatProxy.prototype.onTransChatMessage2Client = function (optcode, msg) {
                        var chatMessageVo = new models.ChatMessageVo();
                        chatMessageVo.roleid = msg.roleid;
                        chatMessageVo.rolename = msg.rolename;
                        chatMessageVo.shapeid = msg.shapeid;
                        chatMessageVo.messagetype = msg.messagetype;
                        chatMessageVo.message = msg.message;
                        chatMessageVo.titleid = msg.titleid;
                        chatMessageVo.displayinfos = msg.displayinfos;
                        models.ChatModel._instance.insertChatMessage(chatMessageVo);
                        this.event(models.SYS_MSG_IN_CHANNEL, chatMessageVo.messagetype);
                    };
                    // 
                    ChatProxy.prototype.onSTransChatMessageNotify2Client = function (optcode, msg) {
                        var chatMessageNotifyVo = new models.ChatMessageNotifyVo();
                        chatMessageNotifyVo.messageid = msg.chatmessagenotify2client.messageid;
                        chatMessageNotifyVo.npcbaseid = msg.chatmessagenotify2client.npcbaseid;
                        chatMessageNotifyVo.parameters = msg.chatmessagenotify2client.parameters;
                        var data = models.ChatModel._instance.chatMessageTips[chatMessageNotifyVo.messageid];
                        if (typeof (data) == "undefined" || data == null)
                            return;
                        var tempMsg = data.msg;
                        var dataType = data.type;
                        var params = chatMessageNotifyVo.parameters;
                        if (chatMessageNotifyVo.messageid == 140201) {
                            var _flag = modules.friend.models.FriendModel.getInstance().isMyBlackList(0, params[0]); //判断添加当前玩家为好友的角色名字是否是玩家自己黑名单存在
                            if (_flag)
                                return;
                        }
                        if (params.length != 0) { /** 参数替换 */
                            for (var paramsLength = 0; paramsLength < params.length; paramsLength++) {
                                tempMsg = tempMsg.replace("$parameter" + [(paramsLength + 1)] + "$", params[paramsLength]);
                            }
                            tempMsg = tempMsg.replace("$parameterjinb$", "<img src ='ui/tongyong/common_jinb.png' style = 'width:30px;valign:center; height:30px'></img>");
                            //<span style='color:#00c6ff;fontSize:24'>$parameter1$</span><span style='color:#261407;fontSize:24'>:</span><span style='color:#261407;fontSize:24'>$parameter2$</span><A t="[抢红包]" questionid="1111" name="$parameter3$" roleid="$parameter4$" type="300"  c="ff00ff00</span>
                        }
                        var arr = dataType.split(",");
                        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                            var key = arr_1[_i];
                            if (Number(key) == TipsMsgType.TIPS_SYS_CHANNEL || Number(key) == TipsMsgType.TIPS_IN_CHAT_VIEW || Number(key) == TipsMsgType.TIPS_SYSBOARD) {
                                models.ChatModel._instance.systemMsgList.push(chatMessageNotifyVo);
                                if (models.ChatModel._instance.systemMsgList.length > models.ChatModel.getInstance().chatLimitNum)
                                    models.ChatModel._instance.systemMsgList.shift();
                            }
                            else if (Number(key) == TipsMsgType.TIPS_POPMSG) {
                                var isBattle = battle.BattleProxy.inBattle; //是否处于战斗中
                                if (isBattle) {
                                    var endTip = this.chargeIsAwardTips(chatMessageNotifyVo.messageid, tempMsg);
                                    if (!endTip)
                                        this.event(models.SHOW_DISSAPEAR_MSG_TIPS, tempMsg);
                                }
                                else
                                    this.event(models.SHOW_DISSAPEAR_MSG_TIPS, tempMsg);
                            }
                            else if (Number(key) == TipsMsgType.TIPS_WORLD) { /** 世界频道消息 */
                                this.event(models.SHOW_TIPS_WORLD, tempMsg);
                            }
                            else if (Number(key) == TipsMsgType.TIPS_ROLE_CHANNEL) { /** 跑马灯消息 */
                                this.event(models.SHOW_TIPS_ROLE_CHANNEL, tempMsg);
                            }
                            else if (Number(key) == TipsMsgType.TIPS_NPCTALK) { /** NPC对话类型 */
                                this.event(models.NPC_Dialog_Msg, tempMsg);
                            }
                            else if (Number(key) == TipsMsgType.TIPS_CONFIRM) {
                                this.event(models.SHOW_TIPS_MESSAGE, chatMessageNotifyVo.messageid);
                            }
                            if (chatMessageNotifyVo.messageid == 172012) { /** 世界频道->红包拾取 数据组装 */
                                var chatMessageVo = new models.ChatMessageVo();
                                chatMessageVo.message = tempMsg;
                                if (params.length == 4) {
                                    var type = params[3];
                                    switch (Number(type)) {
                                        case RedPackType.TYPE_WORLD:
                                            chatMessageVo.messagetype = ChannelType.CHANNEL_WORLD;
                                            break;
                                        case RedPackType.TYPE_TEAM:
                                            chatMessageVo.messagetype = ChannelType.CHANNEL_TEAM;
                                            break;
                                        case RedPackType.TYPE_CLAN:
                                            chatMessageVo.messagetype = ChannelType.CHANNEL_CLAN;
                                            break;
                                        default:
                                            break;
                                    }
                                    chatMessageVo.roleid = params[2];
                                    models.ChatModel.getInstance().specialChannelData.set(params[2], params);
                                }
                                models.ChatModel.getInstance().insertChatMessage(chatMessageVo);
                                this.event(models.SYS_MSG_IN_CHANNEL, chatMessageVo.messagetype);
                            }
                        }
                    };
                    /** SChatItemTips 回调函数  */
                    ChatProxy.prototype.onSChatItemTips = function (optcode, msg) {
                        var _DisplayInfoVo = new models.DisplayInfoVo();
                        _DisplayInfoVo.displaytype = msg.displaytype;
                        _DisplayInfoVo.roleid = msg.roleid;
                        _DisplayInfoVo.shopid = msg.shopid;
                        _DisplayInfoVo.counterid = msg.counterid;
                        _DisplayInfoVo.uniqid = msg.uniqid;
                        _DisplayInfoVo.teamid = msg.teamid;
                        _DisplayInfoVo.crosstt = msg.crosstt;
                        _DisplayInfoVo.serverid = msg.serverid;
                        models.ChatModel.getInstance().chatTips.push({ uniqid: msg.uniqid, tips: msg.tips });
                        var roleid = LoginModel.getInstance().roleDetail.roleid;
                        if (roleid == _DisplayInfoVo.roleid && _DisplayInfoVo.displaytype == 1) { /** 自己查看 物品*/
                            this.event(models.SHOW_ITEM_TIPS);
                        }
                        else if (roleid == _DisplayInfoVo.roleid && _DisplayInfoVo.displaytype == 2) { /** 自己查看宠物 */
                        }
                        else if (roleid != _DisplayInfoVo.roleid && _DisplayInfoVo.displaytype == 2) { /** 别人查看宠物 */
                        }
                        else if (roleid != _DisplayInfoVo.roleid && _DisplayInfoVo.displaytype == 1) { /** 别人查看你的物品 */
                            this.event(models.VIWE_OTHER_ITEM);
                        }
                        else if (roleid == _DisplayInfoVo.roleid && _DisplayInfoVo.displaytype == 8) { /** 自己查看任务 */
                            this.event(models.VIWE_SHARE_TASK, _DisplayInfoVo);
                        }
                        else if (roleid != _DisplayInfoVo.roleid && _DisplayInfoVo.displaytype == 8) { /** 别人查看你的任务 */
                            this.event(models.VIWE_SHARE_TASK, _DisplayInfoVo);
                        }
                    };
                    /** 判断是否id是否是结束战斗奖励或者提示的id
                     * @param msgId 弹窗id
                     * @param str 弹窗字符串
                     */
                    ChatProxy.prototype.chargeIsAwardTips = function (msgId, str) {
                        if (models.ChatModel.getInstance().battleEndTipsArray.indexOf(msgId) != -1) {
                            models.ChatModel.getInstance().battleEndTips.set(msgId, str);
                            return true;
                        }
                        return false;
                    };
                    /** 存储战斗结算弹窗消息 */
                    ChatProxy.prototype._battleEndTipsStorage = function () {
                        models.ChatModel.getInstance().battleEndTipsArray.push(142381);
                        models.ChatModel.getInstance().battleEndTipsArray.push(141157);
                        models.ChatModel.getInstance().battleEndTipsArray.push(141404);
                        models.ChatModel.getInstance().battleEndTipsArray.push(160005);
                        models.ChatModel.getInstance().battleEndTipsArray.push(142508);
                        models.ChatModel.getInstance().battleEndTipsArray.push(141156);
                        models.ChatModel.getInstance().battleEndTipsArray.push(140982);
                        models.ChatModel.getInstance().battleEndTipsArray.push(160344);
                        models.ChatModel.getInstance().battleEndTipsArray.push(160347);
                        models.ChatModel.getInstance().battleEndTipsArray.push(180046);
                        models.ChatModel.getInstance().battleEndTipsArray.push(190024);
                        models.ChatModel.getInstance().battleEndTipsArray.push(162055);
                        models.ChatModel.getInstance().battleEndTipsArray.push(141154);
                        models.ChatModel.getInstance().battleEndTipsArray.push(160063);
                        models.ChatModel.getInstance().battleEndTipsArray.push(160126);
                        models.ChatModel.getInstance().battleEndTipsArray.push(180001);
                        models.ChatModel.getInstance().battleEndTipsArray.push(190024);
                    };
                    return ChatProxy;
                }(hanlder.ProxyBase));
                models.ChatProxy = ChatProxy;
            })(models = chat.models || (chat.models = {}));
        })(chat = modules.chat || (modules.chat = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ChatProxy.js.map