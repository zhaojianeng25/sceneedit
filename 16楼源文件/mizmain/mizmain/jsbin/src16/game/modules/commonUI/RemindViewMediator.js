/**Remind.ui */
// import ReminUI = ui.common.component.RemindUI;
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
        var commonUI;
        (function (commonUI) {
            /**右边按钮(确定、重试)接受的事件*/
            commonUI.RIGHT_BUTTON_EVENT = "rightButtonEvent";
            /**左边按钮接受的事件 */
            commonUI.LEFT_BUTTON_EVENT = "leftButtonEvent";
            var RemindViewMediator = /** @class */ (function (_super) {
                __extends(RemindViewMediator, _super);
                function RemindViewMediator(uiLayer, app) {
                    var _this = _super.call(this, uiLayer) || this;
                    _this.uiLayer = app.uiRoot.general;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this._viewUI = new ui.common.component.RemindUI();
                    _this._viewUI.mouseThrough = false;
                    // 默认居中
                    _this.isCenter = true;
                    return _this;
                }
                RemindViewMediator.getInstance = function (uiLayer, app) {
                    if (!this._instance) {
                        this._instance = new RemindViewMediator(uiLayer, app);
                    }
                    return this._instance;
                };
                ////////////////
                ///业务逻辑
                ////////////////
                /**
                 * @describe  显示提示UI
                 * @param prompt   提示语句
                 * @param rightButtonName 右边按钮名称，默认是重试
                 */
                RemindViewMediator.prototype.onShow = function (prompt, rightButtonName, leftButtonName) {
                    this.onLoad(prompt, rightButtonName, leftButtonName);
                    this._viewUI.tips_html.visible = false;
                    this._viewUI.tip_lab.visible = true;
                    _super.prototype.show.call(this);
                };
                //html格式的显示
                RemindViewMediator.prototype.onhtmlShow = function (prompt, rightButtonName, leftButtonName) {
                    this.onhtmlLoad(prompt, rightButtonName, leftButtonName);
                    this._viewUI.tips_html.visible = true;
                    this._viewUI.tip_lab.visible = false;
                    _super.prototype.show.call(this);
                };
                /** 特殊情况，计时需要 */
                RemindViewMediator.prototype.addSecond = function (time) {
                    this.currentSecond = time;
                    Laya.timer.loop(1000, this, this.updataTime);
                };
                RemindViewMediator.prototype.updataTime = function () {
                    this.currentSecond--;
                    if (this.currentSecond < 0) {
                        Laya.timer.clear(this, this.updataTime);
                        this.hide();
                    }
                    else {
                        var prompt_1 = HudModel.getInstance().promptAssembleBack(PromptExplain.REJECT);
                        this._viewUI.cancel_btn.label = prompt_1 + "(" + this.currentSecond + ")";
                    }
                };
                RemindViewMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                RemindViewMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                /**
                 * @describe  开始加载
                 * @param prompt   提示语句
                 */
                RemindViewMediator.prototype.onLoad = function (prompt, rightButtonName, leftButtonName) {
                    this.setPromptString(prompt);
                    this.setButtonName(rightButtonName, leftButtonName);
                    // 注册事件
                    this._viewUI.cancel_btn.on(LEvent.MOUSE_DOWN, this, this.onClickLeftBtnEvent);
                    this._viewUI.retry_btn.on(LEvent.MOUSE_DOWN, this, this.onClickRightBtnEvent);
                };
                RemindViewMediator.prototype.onhtmlLoad = function (prompt, rightButtonName, leftButtonName) {
                    this.setPrompthtmlString(prompt);
                    this.setButtonName(rightButtonName, leftButtonName);
                    // 注册事件
                    this._viewUI.cancel_btn.on(LEvent.MOUSE_DOWN, this, this.onClickLeftBtnEvent);
                    this._viewUI.retry_btn.on(LEvent.MOUSE_DOWN, this, this.onClickRightBtnEvent);
                };
                ////////////////
                ///UI
                ////////////////
                /**
                 * @describe  设置提示语
                 * @param prompt   提示语
                 */
                RemindViewMediator.prototype.setPromptString = function (prompt) {
                    this._viewUI.tip_lab.text = prompt;
                };
                RemindViewMediator.prototype.setPrompthtmlString = function (prompt) {
                    this._viewUI.tips_html.innerHTML = prompt;
                    this._viewUI.tips_html.style.align = "center";
                    this._viewUI.tips_html.style.valign = "middle";
                };
                /**
                 * @describe  设置右侧按钮的名称
                 * @param btnName   按钮名称
                 */
                RemindViewMediator.prototype.setButtonName = function (righttBtnName, leftBtnName) {
                    if (typeof (righttBtnName) != "undefined") {
                        this._viewUI.retry_btn.label = righttBtnName;
                    }
                    if (typeof (leftBtnName) != "undefined") {
                        this._viewUI.cancel_btn.label = leftBtnName;
                    }
                };
                ////////////////
                ///事件
                ////////////////
                /**
                 * @describe  左侧按钮点击事件
                 */
                RemindViewMediator.prototype.onClickLeftBtnEvent = function () {
                    this.event(commonUI.LEFT_BUTTON_EVENT);
                    this.hide();
                };
                /**
                 * @describe  右侧按钮事件
                 */
                RemindViewMediator.prototype.onClickRightBtnEvent = function () {
                    this.event(commonUI.RIGHT_BUTTON_EVENT);
                    this.hide();
                };
                return RemindViewMediator;
            }(game.modules.UiMediator));
            commonUI.RemindViewMediator = RemindViewMediator;
        })(commonUI = modules.commonUI || (modules.commonUI = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=RemindViewMediator.js.map