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
        var ranKingList;
        (function (ranKingList) {
            /** 帮派详情界面 */
            var GongHuiXiangQingMediator = /** @class */ (function (_super) {
                __extends(GongHuiXiangQingMediator, _super);
                function GongHuiXiangQingMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    _this._viewUI = new ui.common.GongHuiXiangQingUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    return _this;
                }
                GongHuiXiangQingMediator.prototype.onShow = function (dataArr) {
                    this._factionkey = dataArr[0].factionkey;
                    this._lastname = dataArr[0].lastname;
                    this._title = dataArr[0].title;
                    this._factionmasterid = dataArr[0].factionmasterid;
                    this.show();
                };
                GongHuiXiangQingMediator.prototype.show = function () {
                    this._init();
                    _super.prototype.show.call(this);
                    //注册事件
                    this.registerEvent();
                };
                /** 初始化界面 */
                GongHuiXiangQingMediator.prototype._init = function () {
                    //判断要联系的帮主就是自己本人
                    if (this._factionmasterid == LoginModel.getInstance().roleDetail.roleid) {
                        this._viewUI.contact_btn.visible = false;
                    }
                    else {
                        this._viewUI.contact_btn.visible = true;
                    }
                    this._viewUI.lastClanName_lab.text = this._lastname;
                    this._viewUI.xuanyan_lab.text = this._title;
                };
                /** 事件注册 */
                GongHuiXiangQingMediator.prototype.registerEvent = function () {
                    this._viewUI.close_btn.on(LEvent.CLICK, this, this.hide);
                    this._viewUI.applyClan_btn.on(LEvent.CLICK, this, this.applyClan);
                    this._viewUI.contact_btn.on(LEvent.CLICK, this, this.contactClanMaster);
                };
                /** 联系帮主 */
                GongHuiXiangQingMediator.prototype.contactClanMaster = function () {
                    var xPos = -20;
                    var yPos = 80;
                    RequesterProtocols._instance.c2s_CRequestUpdateRoleInfo(this._factionmasterid); //请求玩家信息
                    RequesterProtocols._instance.c2s_CReqRoleTeamState(this._factionmasterid); //客户端请求其他玩家的组队情况
                    var isFriendFlag = FriendModel.getInstance().isMyFriend(this._factionmasterid);
                    var _ContactCharacterMediator = new modules.friend.ContactCharacterMediator(this._viewUI, this._app);
                    _ContactCharacterMediator.onShow(xPos, yPos, isFriendFlag);
                };
                /** 申请帮派 */
                GongHuiXiangQingMediator.prototype.applyClan = function () {
                    RequesterProtocols._instance.c2s_CApplyClan(this._factionkey);
                    ;
                };
                GongHuiXiangQingMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                GongHuiXiangQingMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    this.removeEvent();
                };
                /** 移除事件 */
                GongHuiXiangQingMediator.prototype.removeEvent = function () {
                    this._viewUI.close_btn.off(LEvent.CLICK, this, this.hide);
                };
                return GongHuiXiangQingMediator;
            }(game.modules.UiMediator));
            ranKingList.GongHuiXiangQingMediator = GongHuiXiangQingMediator;
        })(ranKingList = modules.ranKingList || (modules.ranKingList = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=GongHuiXiangQingMediator.js.map