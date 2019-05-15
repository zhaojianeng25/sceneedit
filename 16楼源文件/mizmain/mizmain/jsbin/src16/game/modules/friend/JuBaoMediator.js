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
 * 举报类
 */
// import JuBaoUI = ui.common.JuBaoUI;
var game;
(function (game) {
    var modules;
    (function (modules) {
        var friend;
        (function (friend) {
            var JuBaoMediator = /** @class */ (function (_super) {
                __extends(JuBaoMediator, _super);
                function JuBaoMediator(uiLayer) {
                    var _this = _super.call(this, uiLayer) || this;
                    /**选中列表下标 */
                    _this.selectNum = 0;
                    _this._viewUI = new ui.common.JuBaoUI();
                    _this.isCenter = false;
                    _this.initialize();
                    _this.registerEvent();
                    _this.eventListener();
                    return _this;
                }
                /**初始化 */
                JuBaoMediator.prototype.initialize = function () {
                    this.reasonArr = new Array();
                    //举报原因
                    this.reasonArr = [friend.models.FriendModel.chineseStr.nicheng_buya, friend.models.FriendModel.chineseStr.yanxing_buya, friend.models.FriendModel.chineseStr.waigua_jubao, friend.models.FriendModel.chineseStr.xianxia_jiaoyi, friend.models.FriendModel.chineseStr.jubao_zhanpian, friend.models.FriendModel.chineseStr.qita_jubao];
                };
                /**注册事件监听 */
                JuBaoMediator.prototype.eventListener = function () {
                    friend.models.FriendProxy.getInstance().on(friend.models.SRoleAccusationCheck_EVENT, this, this.onRoleAccusationCheck);
                };
                /**举报返回 */
                JuBaoMediator.prototype.onRoleAccusationCheck = function (e) {
                    var data = friend.models.FriendModel.getInstance().SRoleAccusationCheckData.get("data");
                };
                JuBaoMediator.prototype.getListData = function () {
                    this._viewUI.reason_list.vScrollBarSkin = "";
                    this._viewUI.reason_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.reason_list.scrollBar.elasticDistance = 50;
                    this._viewUI.reason_list.array = this.reasonArr;
                    this._viewUI.reason_list.renderHandler = new Handler(this, this.onRender);
                };
                JuBaoMediator.prototype.onRender = function (cell, index) {
                    var reasonBtn = cell.getChildByName("reason_btn");
                    reasonBtn.label = this.reasonArr[index];
                    reasonBtn.on(LEvent.MOUSE_DOWN, this, this.change, [index]);
                };
                JuBaoMediator.prototype.change = function (index) {
                    var reasonBtn = this._viewUI.reason_list.getCell(index).getChildByName("reason_btn");
                    reasonBtn.selected = true;
                    for (var i = 0; i < this.reasonArr.length; i++) {
                        if (i != index) {
                            var otherBtn = this._viewUI.reason_list.getCell(i).getChildByName("reason_btn");
                            otherBtn.selected = false;
                        }
                    }
                };
                /**注册事件 */
                JuBaoMediator.prototype.registerEvent = function () {
                    this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
                    this._viewUI.reason_tet.once(LEvent.MOUSE_DOWN, this, this.clean);
                    this._viewUI.cancle_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
                    this._viewUI.confirm_btn.on(LEvent.MOUSE_DOWN, this, this.confirm);
                };
                JuBaoMediator.prototype.confirm = function () {
                    RequesterProtocols._instance.c2s_CRoleAccusationCheck(); //举报时候客户端给服务器发消息,用于扣费
                    this.hide();
                };
                /**初始化界面*/
                JuBaoMediator.prototype.onShow = function (name) {
                    this.show();
                    this.getListData();
                    this._viewUI.rolename_lab.text = name;
                };
                JuBaoMediator.prototype.clean = function () {
                    this._viewUI.reason_tet.text = "";
                };
                JuBaoMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                };
                JuBaoMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                JuBaoMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return JuBaoMediator;
            }(game.modules.UiMediator));
            friend.JuBaoMediator = JuBaoMediator;
        })(friend = modules.friend || (modules.friend = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=JuBaoMediator.js.map