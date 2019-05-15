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
            var AppearRedPackMediator = /** @class */ (function (_super) {
                __extends(AppearRedPackMediator, _super);
                function AppearRedPackMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    _this._viewUI = new ui.common.component.AppearRedPackUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this._viewUI.mouseThrough = true;
                    _this.isCenter = true;
                    _this.regestEvent();
                    return _this;
                }
                /**
                 * 显示小红包图标
                 * @param roleName  玩家名字
                 * @param redpackid 红包id
                 * @param modeltype 红包类型
                 * @param UI 用于判断是否当前玩家是否有打开其他UI
                 */
                AppearRedPackMediator.prototype.onShow = function (roleName, redpackid, modeltype, UI) {
                    _super.prototype.show.call(this);
                    this.initPos();
                    this.onLoad(roleName, redpackid, modeltype);
                    if (UI) {
                        this._viewUI.visible = false;
                    }
                    else {
                        this._viewUI.visible = true;
                    }
                };
                /** 初始化小红包出现的位置 */
                AppearRedPackMediator.prototype.initPos = function () {
                    this.px = this._viewUI.xiaoRedPack_box.x;
                    this.py = this._viewUI.xiaoRedPack_box.y;
                };
                /**
                 * @describe 加载出小红包图标
                 * @param roleName  玩家名字
                 * @param redpackid 红包id
                 * @param modeltype 红包类型
                 */
                AppearRedPackMediator.prototype.onLoad = function (roleName, redpackid, modeltype) {
                    this._viewUI.roleName_label.text = roleName;
                    this._viewUI.xiaoRedPack_image.once(LEvent.CLICK, this, this.qiang_hongbao, [modeltype, redpackid]);
                };
                /**
                 * 响应抢红包事件
                 */
                AppearRedPackMediator.prototype.qiang_hongbao = function (modeltype, redpackid) {
                    RequesterProtocols._instance.c2s_CGetRedPack(modeltype, redpackid);
                    this._viewUI.xiaoRedPack_image.event(AppearRedPackMediator.IMAGE_CLICKED_EVENT);
                };
                AppearRedPackMediator.prototype.hide = function () {
                    this.removeEvent();
                    _super.prototype.hide.call(this);
                };
                /** 移除事件 */
                AppearRedPackMediator.prototype.removeEvent = function () {
                    this._viewUI.xiaoRedPack_image.off(AppearRedPackMediator.IMAGE_CLICKED_EVENT, this, this.hide);
                    this._viewUI.xiaoRedPack_image.off(LEvent.CLICK, this, this.qiang_hongbao);
                    modules.redPacket.models.RedPacketProxy.getInstance().off(modules.redPacket.models.GET_REDPACK_SUCCESS, this, this.hide);
                };
                AppearRedPackMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                /** 添加监听事件 */
                AppearRedPackMediator.prototype.regestEvent = function () {
                    this._viewUI.xiaoRedPack_image.on(AppearRedPackMediator.IMAGE_CLICKED_EVENT, this, this.hide);
                    modules.redPacket.models.RedPacketProxy.getInstance().on(modules.redPacket.models.GET_REDPACK_SUCCESS, this, this.hide);
                };
                /** 小红包图标被点击事件 */
                AppearRedPackMediator.IMAGE_CLICKED_EVENT = "imageClicked";
                return AppearRedPackMediator;
            }(game.modules.UiMediator));
            commonUI.AppearRedPackMediator = AppearRedPackMediator;
        })(commonUI = modules.commonUI || (modules.commonUI = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=AppearRedPackMediator.js.map