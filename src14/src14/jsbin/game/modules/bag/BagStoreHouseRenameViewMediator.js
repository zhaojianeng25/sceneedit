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
        var bag;
        (function (bag) {
            /**最大的输入字数控制 */
            var BagStoreHouseRenameViewMediator = /** @class */ (function (_super) {
                __extends(BagStoreHouseRenameViewMediator, _super);
                function BagStoreHouseRenameViewMediator(uiLayer, app) {
                    var _this = _super.call(this, uiLayer) || this;
                    _this._viewUI = new ui.common.BagStorehouseRenameUI();
                    _this._viewUI.mouseThrough = false;
                    _this.isCenter = false;
                    _this._app = app;
                    // 显示5个字，UTF-8编码下，一个字占据3个字符
                    _this._viewUI.storehouseRename_text.maxChars = bag.models.BagModel.getInstance().getStoreHouseRenameNumber();
                    return _this;
                }
                ////////////////
                ///业务逻辑
                ////////////////
                // 实现的接口
                BagStoreHouseRenameViewMediator.prototype.onShow = function (nowPage) {
                    this.getNowPageInfo(nowPage);
                    this.onLoad();
                    _super.prototype.show.call(this);
                };
                BagStoreHouseRenameViewMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                BagStoreHouseRenameViewMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                BagStoreHouseRenameViewMediator.prototype.onLoad = function () {
                    // 初始化提示符
                    this.initUI();
                    // this.setEnsueBtnIsOrNotClick(false);
                    // this._viewUI.storehouseRename_text.
                    this.registerEvent();
                };
                /**
                 * @describe  初始化UI
                 */
                BagStoreHouseRenameViewMediator.prototype.initUI = function () {
                    this._viewUI.storehouseRename_text.prompt = bag.models.BagModel.getInstance().getStoreHouseRenamePrompt();
                    this._viewUI.storehouseRename_text.text = "";
                };
                BagStoreHouseRenameViewMediator.prototype.getNowPageInfo = function (nowPage) {
                    this._pageId = nowPage;
                };
                ////////////////
                ///事件
                ////////////////
                /**
                 * @describe  注册事件
                 */
                BagStoreHouseRenameViewMediator.prototype.registerEvent = function () {
                    this._viewUI.cancel_btn.on(LEvent.MOUSE_DOWN, this, this.clickCancelBtnEvent);
                    this._viewUI.enSure_btn.on(LEvent.MOUSE_DOWN, this, this.clickEnsureBtnEvent);
                    // this._viewUI.on(LEvent.MOUSE_DOWN,this,this.clickUIEvent);
                };
                /**
                 * @describe  取消按钮点击事件
                 */
                BagStoreHouseRenameViewMediator.prototype.clickCancelBtnEvent = function () {
                    bag.models.BagProxy.getInstance().event(bag.models.STOREHOUSE_RENAME_EVENT);
                };
                /**
                 * @describe  确定按钮点击事件1
                 */
                BagStoreHouseRenameViewMediator.prototype.clickEnsureBtnEvent = function () {
                    var tempName = "";
                    this._storeHouseName = this.getStoreHouseRenameText();
                    var isPanel = false; // 判断界面隐藏还是显示
                    if (this._storeHouseName != tempName) {
                        RequesterProtocols._instance.c2s_CModifyDepot_Name(this._pageId, this._storeHouseName);
                        bag.models.BagProxy.getInstance().event(bag.models.STOREHOUSE_RENAME_EVENT, isPanel);
                        // 对输入的仓库的名称进行关键词的筛选 如果含有敏感字，则提示
                        // let isBadWorld = modules.chat.models.ChatModel.getInstance().judgeBanWords(this._storeHouseName);
                        // if (isBadWorld == false) {
                        // } else {
                        //     let prompt = HudModel.getInstance().promptAssembleBack(142260);
                        //     let disappearMsgTips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                        //     disappearMsgTips.onShow(prompt);
                        // }
                    }
                };
                ////////////////
                ///UI
                ////////////////
                /**
                 * @describe  返回输入框的内容
                 * @return  输入内容
                 */
                BagStoreHouseRenameViewMediator.prototype.getStoreHouseRenameText = function () {
                    return this._viewUI.storehouseRename_text.text;
                };
                return BagStoreHouseRenameViewMediator;
            }(game.modules.UiMediator));
            bag.BagStoreHouseRenameViewMediator = BagStoreHouseRenameViewMediator;
        })(bag = modules.bag || (modules.bag = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=BagStoreHouseRenameViewMediator.js.map