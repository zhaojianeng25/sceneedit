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
            var ChatModule = /** @class */ (function (_super) {
                __extends(ChatModule, _super);
                function ChatModule(app) {
                    var _this = _super.call(this) || this;
                    _this.uiLayer = app.uiRoot.general;
                    _this._viewUI = new ui.common.ChatUI();
                    //this._loginView = new ui.common.LoginUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this._chatViewMediator = new chat.ChatViewMediator(app);
                    Network._instance.addHanlder(ProtocolsEnum.STransChatMessage2Client, _this, _this.onRefreshChatData);
                    Network._instance.addHanlder(ProtocolsEnum.STransChatMessageNotify2Client, _this, _this.onRefreshSystemData);
                    _this.loginModel = game.modules.createrole.models.LoginModel.getInstance();
                    return _this;
                }
                ChatModule.prototype.onShow = function (event) {
                    this._chatViewMediator.show();
                };
                ChatModule.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    this._chatViewMediator.hide();
                };
                ChatModule.prototype.show = function () {
                    _super.prototype.show.call(this);
                };
                ChatModule.prototype.getView = function () {
                    return this._viewUI;
                };
                // 刷新数据
                ChatModule.prototype.onRefreshChatData = function (optcode, msg) {
                    var flag = true;
                    flag = msg.roleid == this.loginModel.roleDetail.roleid ? false : true;
                    var type = msg.messagetype;
                    switch (type) {
                        case ChannelType.CHANNEL_CURRENT:
                            this._chatViewMediator.getChatData(flag, type);
                            break;
                        case ChannelType.CHANNEL_PROFESSION:
                            this._chatViewMediator.getZhiYeChatData(flag, type);
                            break;
                        case ChannelType.CHANNEL_WORLD:
                            this._chatViewMediator.getWorldChatData(flag, type);
                            break;
                        case ChannelType.FAMILY_CHANNEL:
                            this._chatViewMediator.getFamilyChatData(flag, type);
                            break;
                        case ChannelType.CHANNEL_TEAM:
                            this._chatViewMediator.getTeamChatData(flag, type);
                            break;
                        case ChannelType.CHANNEL_TEAM_APPLY:
                            this._chatViewMediator.getZuDuiChatData(flag, type);
                            break;
                        default:
                            break;
                    }
                };
                ChatModule.prototype.onRefreshSystemData = function (optcode, msg) {
                    var data = ChatModel._instance.chatMessageTips[msg.chatmessagenotify2client.messageid];
                    if (typeof (data) == "undefined")
                        return;
                    var params = msg.chatmessagenotify2client.parameters;
                    var tempdata = data.msg;
                    var dataType = data.type;
                    if (params.length != 0) {
                        for (var paramsLength = 0; paramsLength < params.length; paramsLength++) {
                            console.log('paramsLength+1===============' + paramsLength + 1);
                            tempdata = tempdata.replace("$parameter" + [(paramsLength + 1)] + "$", params[paramsLength]);
                            console.log('"$parameter"+[(paramsLength+1)]+"$"======' + "$parameter" + [(paramsLength + 1)] + "$");
                        }
                    }
                    var arr = dataType.split(",");
                    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                        var key = arr_1[_i];
                        if (Number(key) == TipsMsgType.TIPS_POPMSG) { //1
                        }
                        if (Number(key) == TipsMsgType.TIPS_SYS_CHANNEL || Number(key) == TipsMsgType.TIPS_IN_CHAT_VIEW) { /** 系统消息 */
                            this._chatViewMediator.getSystemData(true);
                        }
                    }
                };
                return ChatModule;
            }(game.modules.ModuleMediator));
            chat.ChatModule = ChatModule;
        })(chat = modules.chat || (modules.chat = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ChatModule.js.map