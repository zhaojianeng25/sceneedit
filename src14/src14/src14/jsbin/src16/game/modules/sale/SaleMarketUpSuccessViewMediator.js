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
* 上架成功
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var sale;
        (function (sale) {
            var SaleMarketUpSuccessViewMediator = /** @class */ (function (_super) {
                __extends(SaleMarketUpSuccessViewMediator, _super);
                function SaleMarketUpSuccessViewMediator(uiLayer, israrity) {
                    var _this = _super.call(this, uiLayer) || this;
                    _this.ispitch = false; //是否选中七天不提示
                    _this._viewUI = new ui.common.SaleShelfSuccessUI();
                    _this.isCenter = false;
                    _this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, _this, _this.hide);
                    _this._viewUI.confirm_btn.on(LEvent.MOUSE_DOWN, _this, _this.hide);
                    _this._viewUI.noHint_check.on(LEvent.CLICK, _this, _this.onHintcheck);
                    _this.showDetails(israrity);
                    return _this;
                }
                /**显示上架成功信息 */
                SaleMarketUpSuccessViewMediator.prototype.showDetails = function (israrity) {
                    if (israrity == 1) {
                        this._viewUI.rarity_label.visible = true;
                        this._viewUI.noRarity_label.visible = false;
                    }
                    else {
                        this._viewUI.rarity_label.visible = false;
                        this._viewUI.noRarity_label.visible = true;
                    }
                };
                /**七天不在提示 */
                SaleMarketUpSuccessViewMediator.prototype.onHintcheck = function () {
                    if (this._viewUI.noHint_check.selected)
                        this.ispitch = true;
                    else
                        this.ispitch = false;
                };
                SaleMarketUpSuccessViewMediator.prototype.show = function () {
                    var isshow = this.exanineTime();
                    if (isshow)
                        return;
                    _super.prototype.show.call(this);
                };
                /**返回物品七天是否显示 */
                SaleMarketUpSuccessViewMediator.prototype.exanineTime = function () {
                    var isAuctionTime = LoginModel.getInstance().isAuctionTime;
                    if (isAuctionTime != "") {
                        var currentTime = (new Date()).valueOf();
                        // 隐藏7天提示
                        if (Number(isAuctionTime) > currentTime)
                            return true;
                        else
                            return false;
                    }
                };
                SaleMarketUpSuccessViewMediator.prototype.hide = function () {
                    if (this.ispitch) {
                        this.pitchPast();
                        _super.prototype.hide.call(this);
                    }
                    _super.prototype.hide.call(this);
                };
                /**七天过期时间 */
                SaleMarketUpSuccessViewMediator.prototype.pitchPast = function () {
                    var currentTime = (new Date()).valueOf() + 604800000; // 过期的毫秒  
                    LoginModel.getInstance().isAuctionTime = currentTime.toString(); // 赋值给login里面的时间
                    var currRoleId = LoginModel.getInstance().roleDetail.roleid; // 角色id
                    var currAccount = LoginModel.getInstance().userLoginAccount; // 账号
                    LocalStorage.setItem(currAccount + currRoleId.toString() + "timeStr", currentTime.toString()); // 写入缓存
                };
                SaleMarketUpSuccessViewMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return SaleMarketUpSuccessViewMediator;
            }(game.modules.UiMediator));
            sale.SaleMarketUpSuccessViewMediator = SaleMarketUpSuccessViewMediator;
        })(sale = modules.sale || (modules.sale = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=SaleMarketUpSuccessViewMediator.js.map