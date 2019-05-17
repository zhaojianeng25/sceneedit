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
 * 援助统计类
 */
var game;
(function (game) {
    var modules;
    (function (modules) {
        var roleinfo;
        (function (roleinfo) {
            var RoleYuanZhuMediator = /** @class */ (function (_super) {
                __extends(RoleYuanZhuMediator, _super);
                function RoleYuanZhuMediator(uiLayer) {
                    var _this = _super.call(this, uiLayer) || this;
                    _this._viewUI = new ui.common.RoleYuanZhuUI();
                    _this._viewUI.mouseThrough = true;
                    _this.isCenter = false;
                    _this.registerEvent();
                    _this.eventListener();
                    return _this;
                }
                /**注册事件监听 */
                RoleYuanZhuMediator.prototype.eventListener = function () {
                    roleinfo.models.RoleInfoProxy.getInstance().on(roleinfo.models.SReqHelpCountView_EVENT, this, this.onReqHelpCountView);
                };
                /**援助统计面板 */
                RoleYuanZhuMediator.prototype.onReqHelpCountView = function (e) {
                    var data = roleinfo.models.RoleInfoModel.getInstance().SReqHelpCountViewData.get("data");
                    this._viewUI.yuanZhuBattle_lab.text = data.expvalue + "/" + data.expvaluemax; //援助战斗次数
                    this._viewUI.yuanZhuItem_lab.text = data.helpgiveitemnum + "/" + data.helpgiveitemnummax; //援助物品次数
                    this._viewUI.qiuZhuItem_lab.text = data.helpitemnum + "/" + data.helpitemnummax; //求助物品次数
                };
                /**注册点击监听 */
                RoleYuanZhuMediator.prototype.registerEvent = function () {
                    this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
                    this._viewUI.tip1_btn.on(LEvent.MOUSE_DOWN, this, this.showTip1);
                    this._viewUI.tip2_btn.on(LEvent.MOUSE_DOWN, this, this.showTip2);
                    this._viewUI.tip3_btn.on(LEvent.MOUSE_DOWN, this, this.showTip3);
                };
                /**援助战斗次数提示 */
                RoleYuanZhuMediator.prototype.showTip1 = function () {
                    var param = new Dictionary();
                    param.set("title", RoleEnum.YUANZHU_ZHANDOU);
                    param.set("contentId", RoleEnum.YUANZHU_ZHANDOU_TIP);
                    this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, RoleInfoModel.getInstance().appBase, TIPS_TYPE.CLIENTMESSAGE, param);
                };
                /**援助物品次数提示 */
                RoleYuanZhuMediator.prototype.showTip2 = function () {
                    var param = new Dictionary();
                    param.set("title", RoleEnum.YUANZHU_WUPIN);
                    param.set("contentId", RoleEnum.YUANZHU_WUPIN_TIP);
                    this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, RoleInfoModel.getInstance().appBase, TIPS_TYPE.CLIENTMESSAGE, param);
                };
                /**求助物品次数提示 */
                RoleYuanZhuMediator.prototype.showTip3 = function () {
                    var param = new Dictionary();
                    param.set("title", RoleEnum.QIUZHU_WUPIN);
                    param.set("contentId", RoleEnum.QIUZHU_WUPIN_TIP);
                    this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, RoleInfoModel.getInstance().appBase, TIPS_TYPE.CLIENTMESSAGE, param);
                };
                RoleYuanZhuMediator.prototype.show = function () {
                    roleinfo.models.RoleInfoProxy.getInstance().event(roleinfo.models.OPEN_ZHEZHAO);
                    _super.prototype.show.call(this);
                };
                RoleYuanZhuMediator.prototype.hide = function () {
                    roleinfo.models.RoleInfoProxy.getInstance().event(roleinfo.models.CLOSE_ZHEZHAO);
                    _super.prototype.hide.call(this);
                };
                RoleYuanZhuMediator.prototype.swap = function () {
                    _super.prototype.swap.call(this);
                };
                RoleYuanZhuMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return RoleYuanZhuMediator;
            }(game.modules.UiMediator));
            roleinfo.RoleYuanZhuMediator = RoleYuanZhuMediator;
        })(roleinfo = modules.roleinfo || (modules.roleinfo = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=RoleYuanZhuMediator.js.map