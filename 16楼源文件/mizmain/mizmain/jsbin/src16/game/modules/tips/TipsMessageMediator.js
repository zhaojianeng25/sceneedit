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
* 通用客户端提示显示tips
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var tips;
        (function (tips) {
            var TipsMessageMediator = /** @class */ (function (_super) {
                __extends(TipsMessageMediator, _super);
                function TipsMessageMediator(uiLayer, app) {
                    var _this = _super.call(this, app.uiRoot.topUnder) || this;
                    /**客户端信息提示表 */
                    _this.chatMessageTips = game.modules.chat.models.ChatModel._instance.chatMessageTips;
                    /**程序内字符串表 */
                    _this.cstringResConfigData = game.modules.tips.models.TipsModel._instance.cstringResConfigData;
                    /**存储替换的字符串，以便再次替换 */
                    _this.str = "";
                    /** 传导模块 */
                    _this.moduleName = "";
                    /**最小的高度 */
                    _this.minHtmlHeight = 60;
                    _this._viewUI = new ui.common.component.TipsMessageUI();
                    _this._app = app;
                    _this._viewUI.cancel_btn.on(LEvent.MOUSE_DOWN, _this, _this.onCancelBtn);
                    _this._viewUI.cancel_btn.visible = true;
                    _this._viewUI.cancel_btn.x = 50;
                    _this._viewUI.ok_btn.on(LEvent.MOUSE_DOWN, _this, _this.onOkBtn);
                    _this._viewUI.ok_btn.visible = true;
                    _this._viewUI.ok_btn.x = 260;
                    return _this;
                }
                /**
                 * 显示客户端信息
                 * @param contentId 显示信息id
                 * @param parame   字典(标题title,参数parame[])
                 */
                TipsMessageMediator.prototype.showContent = function (parame, moduleName) {
                    if (moduleName)
                        this.moduleName = moduleName;
                    var msg = "";
                    var contentId = parame.get("contentId");
                    if (this.chatMessageTips[contentId] == null) {
                        msg = this.cstringResConfigData[contentId].msg;
                    }
                    else {
                        msg = this.chatMessageTips[contentId].msg;
                    }
                    this.str = msg;
                    if (parame.get("parame") != null) {
                        var m_parame = parame.get("parame");
                        for (var i = 1; i < m_parame.length + 1; i++) {
                            this.str = this.str.replace("$parameter" + i + "$", m_parame[i - 1]);
                        }
                    }
                    // else {
                    // 	this.str = "<span style='fontSize:24;color:#391104'>" + this.str + "</span><br>"(this._viewUI.content_html.contextHeight/24-1)
                    // }
                    // 判断字符串中是否存在样式，-1表示不存在
                    if (this.str.indexOf("<span") == -1) {
                        this.str = "<span style='fontSize:24;color:#391104'>" + this.str + "</span><br>";
                    }
                    this._viewUI.content_html.style.width = 430;
                    this._viewUI.content_html.style.align = "center";
                    this._viewUI.content_html.innerHTML = this.str;
                    var fontSizeLength = this.str.indexOf("fontSize:") + "fontSize:".length;
                    var fontSize = parseInt(this.str.substring(fontSizeLength, fontSizeLength + 2));
                    var contextHeight = Math.floor(this._viewUI.content_html.contextHeight);
                    //108为单行文本时垂直居中的y值坐标，文本行数倍数大于等于3时才需要变更坐标位置
                    if (contextHeight / fontSize > 3) {
                        this._viewUI.content_html.y = 108 - ((contextHeight / fontSize - 3) * fontSize);
                    }
                    else if (contextHeight / fontSize == 3) {
                        this._viewUI.content_html.y = 108 - ((contextHeight / fontSize - 2) * (fontSize / 2));
                    }
                    else {
                        this._viewUI.content_html.y = 108;
                    }
                    if (parame.get("btnName") != null) {
                        this._viewUI.ok_btn.label = parame.get("btnName");
                    }
                    else {
                        this._viewUI.ok_btn.label = "确定";
                    }
                };
                /** 设置确定按钮居中，隐藏取消按钮 */
                TipsMessageMediator.prototype.setBtnVisi = function () {
                    this._viewUI.cancel_btn.visible = false;
                    this._viewUI.ok_btn.x = 151;
                };
                /** 计时器 */
                TipsMessageMediator.prototype.counTime = function (time) {
                    this.currentSecond = time;
                    Laya.timer.loop(1000, this, this.updataTime);
                };
                /** 循环倒计时刷新UI */
                TipsMessageMediator.prototype.updataTime = function () {
                    this.currentSecond--;
                    if (this.currentSecond < 0) {
                        this.onCancelBtn();
                    }
                    else {
                        var prompt_1 = this.cstringResConfigData[2036].msg;
                        this._viewUI.cancel_btn.label = prompt_1 + "(" + this.currentSecond + ")";
                    }
                };
                /**点击取消按钮 */
                TipsMessageMediator.prototype.onCancelBtn = function () {
                    this.hide();
                    Laya.timer.clear(this, this.updataTime);
                    tips.models.TipsProxy.getInstance().event(tips.models.TIPS_ON_CANCEL);
                    tips.models.TipsProxy.getInstance().offAll(tips.models.TIPS_ON_OK);
                };
                /**点击ok按钮 */
                TipsMessageMediator.prototype.onOkBtn = function () {
                    this.hide();
                    Laya.timer.clear(this, this.updataTime);
                    if (this.moduleName != "") {
                        tips.models.TipsProxy.getInstance().event(tips.models.TIPS_ON_OK, this.moduleName);
                        this.moduleName = "";
                    }
                    else
                        tips.models.TipsProxy.getInstance().event(tips.models.TIPS_ON_OK);
                    tips.models.TipsProxy.getInstance().offAll(tips.models.TIPS_ON_CANCEL);
                };
                TipsMessageMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                };
                TipsMessageMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                TipsMessageMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return TipsMessageMediator;
            }(game.modules.UiMediator));
            tips.TipsMessageMediator = TipsMessageMediator;
        })(tips = modules.tips || (modules.tips = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=TipsMessageMediator.js.map