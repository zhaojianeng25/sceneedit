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
/**好友系统底板类 */
// import FriendSystemUI = ui.common.FriendSystemUI;
var game;
(function (game) {
    var modules;
    (function (modules) {
        var friend;
        (function (friend) {
            var ButtonType;
            (function (ButtonType) {
                /**好友按钮 */
                ButtonType[ButtonType["FRIEND_BTN"] = 0] = "FRIEND_BTN";
                /**邮件按钮 */
                ButtonType[ButtonType["MAIL_BTN"] = 1] = "MAIL_BTN";
                /**招募按钮 */
                ButtonType[ButtonType["RECRUIT_BTN"] = 2] = "RECRUIT_BTN";
            })(ButtonType || (ButtonType = {}));
            /**标题名称 */
            var TitleName = [
                { name: "好友" },
                { name: "邮件" },
                { name: "招募" },
            ];
            var FriendSystemModule = /** @class */ (function (_super) {
                __extends(FriendSystemModule, _super);
                function FriendSystemModule(app) {
                    var _this = _super.call(this) || this;
                    //初始化
                    _this.uiLayer = app.uiRoot.general;
                    //底图
                    _this._viewUI = new ui.common.FriendSystemUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    //好友界面
                    _this._friendViewMediator = new friend.FriendViewMediator(_this._viewUI, _this._app);
                    // 邮件界面
                    _this._mailViewMediator = new friend.MailViewMediator(_this._viewUI);
                    //招募界面
                    _this._recruitViewMediator = new friend.RecruitViewMediator(_this._viewUI);
                    _this.registerEvent();
                    _this.eventListener();
                    friend.models.FriendModel.getInstance().appBase = _this._app;
                    return _this;
                }
                /**注册事件监听 */
                FriendSystemModule.prototype.eventListener = function () {
                    //收到消息
                    game.modules.friend.models.FriendProxy.getInstance().on(game.modules.friend.models.receiveMessage_EVENT, this, this.onMessageReceive);
                    //消息已被阅读
                    game.modules.friend.models.FriendProxy.getInstance().on(game.modules.friend.models.readMessage_EVENT, this, this.onMessageRead);
                    //有未读邮件
                    game.modules.friend.models.FriendProxy.getInstance().on(game.modules.friend.models.receiveMail_EVENT, this, this.onReceiveMail);
                    //邮件已被阅读
                    game.modules.friend.models.FriendProxy.getInstance().on(game.modules.friend.models.readMail_EVENT, this, this.onReadMail);
                };
                /**消息已被阅读 */
                FriendSystemModule.prototype.onMessageRead = function (e) {
                    this._viewUI.friendPoint_img.visible = false;
                };
                /**收到消息 */
                FriendSystemModule.prototype.onMessageReceive = function (e) {
                    this._viewUI.friendPoint_img.visible = true;
                };
                /** 有未读邮件*/
                FriendSystemModule.prototype.onReceiveMail = function (e) {
                    this._viewUI.mailPoint_img.visible = true;
                };
                /** 邮件已被阅读*/
                FriendSystemModule.prototype.onReadMail = function (e) {
                    this._viewUI.mailPoint_img.visible = false;
                };
                /**
                 * 切换子界面
                 * @param index : button的类型
                 */
                FriendSystemModule.prototype.switchChildUI = function (index) {
                    this._viewUI.friend_btn.selected = false;
                    this._viewUI.mail_btn.selected = false;
                    this._viewUI.recruit_btn.selected = false;
                    switch (index) {
                        case ButtonType.FRIEND_BTN:
                            this._viewUI.friend_btn.selected = true;
                            this._friendViewMediator.show();
                            this._mailViewMediator.hide();
                            this._recruitViewMediator.hide();
                            this._titleName = TitleName[ButtonType.FRIEND_BTN].name;
                            break;
                        case ButtonType.MAIL_BTN:
                            this._friendViewMediator.hide();
                            this._mailViewMediator.show();
                            this._recruitViewMediator.hide();
                            this._viewUI.mail_btn.selected = true;
                            this._titleName = TitleName[ButtonType.MAIL_BTN].name;
                            break;
                        case ButtonType.RECRUIT_BTN:
                            this._friendViewMediator.hide();
                            this._mailViewMediator.hide();
                            this._recruitViewMediator.show();
                            this._viewUI.recruit_btn.selected = true;
                            this._titleName = TitleName[ButtonType.RECRUIT_BTN].name;
                            break;
                        default:
                            console.log("FriendSystemModule.switchButton error");
                    }
                    this.setTileName(this._titleName);
                };
                /**注册按钮点击事件 */
                FriendSystemModule.prototype.registerEvent = function () {
                    this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.clickCloseBtnEvent);
                    this._viewUI.friend_btn.on(LEvent.MOUSE_DOWN, this, this.clickFriendBtnEvent);
                    this._viewUI.mail_btn.on(LEvent.MOUSE_DOWN, this, this.clickMailBtnEvent);
                    this._viewUI.recruit_btn.on(LEvent.MOUSE_DOWN, this, this.clickRecruitBtnEvent);
                };
                /**点击关闭按钮 */
                FriendSystemModule.prototype.clickCloseBtnEvent = function () {
                    this.hide();
                };
                /**点击好友按钮 */
                FriendSystemModule.prototype.clickFriendBtnEvent = function () {
                    if (!this._viewUI.friend_btn.selected) {
                        this.switchChildUI(ButtonType.FRIEND_BTN);
                    }
                };
                /**点击邮件按钮 */
                FriendSystemModule.prototype.clickMailBtnEvent = function () {
                    if (!this._viewUI.mail_btn.selected) {
                        this.switchChildUI(ButtonType.MAIL_BTN);
                    }
                };
                /**点击招募按钮 */
                FriendSystemModule.prototype.clickRecruitBtnEvent = function () {
                    if (!this._viewUI.recruit_btn.selected) {
                        this.switchChildUI(ButtonType.RECRUIT_BTN);
                    }
                };
                FriendSystemModule.prototype.show = function () {
                    _super.prototype.show.call(this);
                    this.onLoad();
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.OPEN_EVENT);
                };
                FriendSystemModule.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.CLOSEVIEW_EVENT);
                    this._friendViewMediator.hide();
                    this._mailViewMediator.hide();
                    this._recruitViewMediator.hide();
                    if (LoginModel.getInstance().CommonPage != "") {
                        modules.ModuleManager.show(LoginModel.getInstance().CommonPage, this._app);
                        LoginModel.getInstance().CommonPage = "";
                    }
                };
                FriendSystemModule.prototype.getView = function () {
                    return this._viewUI;
                };
                /**初始加载 */
                FriendSystemModule.prototype.onLoad = function () {
                    this.switchChildUI(ButtonType.FRIEND_BTN);
                };
                /**设置当前面板名 */
                FriendSystemModule.prototype.setTileName = function (name) {
                    this._viewUI.title_lab.text = name;
                };
                return FriendSystemModule;
            }(game.modules.ModuleMediator));
            friend.FriendSystemModule = FriendSystemModule;
        })(friend = modules.friend || (modules.friend = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=FriendSystemModule.js.map