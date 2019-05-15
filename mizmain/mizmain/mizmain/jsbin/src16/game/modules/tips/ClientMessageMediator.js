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
        var tips;
        (function (tips) {
            /** 通用客户端提示显示tips */
            var ClientMessageMediator = /** @class */ (function (_super) {
                __extends(ClientMessageMediator, _super);
                function ClientMessageMediator(uiLayer) {
                    var _this = _super.call(this, uiLayer) || this;
                    /**客户端信息提示表 */
                    _this.chatMessageTips = game.modules.chat.models.ChatModel._instance.chatMessageTips;
                    /**程序内字符串表 */
                    _this.cstringResConfigData = game.modules.tips.models.TipsModel._instance.cstringResConfigData;
                    /**将替换之后的字符串存起来，以便后面再次替换 */
                    _this.str = "";
                    /**最小的高度 */
                    _this.minHtmlHeight = 120;
                    _this._viewUI = new ui.common.component.ClientMessageUI();
                    _this.isCenter = false;
                    _this.registBtnEvent();
                    return _this;
                }
                /**注册按钮点击事件 */
                ClientMessageMediator.prototype.registBtnEvent = function () {
                    this._viewUI.mask_img.on(LEvent.CLICK, this, this.closeWindow);
                };
                /** 关闭界面 */
                ClientMessageMediator.prototype.closeWindow = function () {
                    tips.models.TipsProxy.getInstance().event(tips.models.CLOSE_TIPS);
                };
                /**
                 * 显示客户端信息
                 * @param parame   各参数字典
                 */
                ClientMessageMediator.prototype.showContent = function (parame) {
                    if (parame.get("posX") != null) { //x坐标位置
                        var posX = parame.get("posX");
                        this._viewUI.bg_img.x = posX; //设置x坐标
                    }
                    else {
                        this._viewUI.bg_img.centerX = 0;
                    }
                    if (parame.get("posY") != null) { //y坐标位置
                        var posY = parame.get("posY");
                        this._viewUI.bg_img.y = posY; //设置y坐标
                    }
                    else {
                        this._viewUI.bg_img.centerY = 0;
                    }
                    if (parame.get("title") != null) { //标题id
                        var title = parame.get("title");
                        this._viewUI.tital_label.text = this.cstringResConfigData[title].msg;
                        this._viewUI.tital_label.centerX = 0;
                    }
                    var msg = "";
                    var contentId = parame.get("contentId"); //内容id
                    if (this.chatMessageTips[contentId] == null) {
                        msg = this.cstringResConfigData[contentId].msg;
                    }
                    else {
                        msg = this.chatMessageTips[contentId].msg;
                    }
                    this.str = msg;
                    if (parame.get("parame") != null) { //参数数组
                        var m_parame = parame.get("parame");
                        for (var i = 1; i < m_parame.length + 1; i++) {
                            this.str = this.str.replace("$parameter" + i + "$", m_parame[i - 1]);
                        }
                        if (parame.get("color") != null) { //颜色
                            var m_color = parame.get("color");
                            for (var i = 1; i < m_color.length + 1; i++) {
                                this.str = this.str.replace("$color" + i + "$", m_color[i - 1]);
                            }
                        }
                    }
                    this.setHtml(this.str);
                    this.show();
                };
                /**
                 * 重新设置背景的高度位置
                 * @param html
                 */
                ClientMessageMediator.prototype.setHtml = function (html) {
                    var bgHeight = this._viewUI.bg_img.height;
                    this._viewUI.content_html.innerHTML = html;
                    if (this._viewUI.content_html.height > this.minHtmlHeight) {
                        this._viewUI.bg_img.height = bgHeight - this.minHtmlHeight + this._viewUI.content_html.height;
                    }
                };
                ClientMessageMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                };
                ClientMessageMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                ClientMessageMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return ClientMessageMediator;
            }(game.modules.UiMediator));
            tips.ClientMessageMediator = ClientMessageMediator;
        })(tips = modules.tips || (modules.tips = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ClientMessageMediator.js.map