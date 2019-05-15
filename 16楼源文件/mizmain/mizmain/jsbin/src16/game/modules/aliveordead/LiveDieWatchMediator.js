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
        var aliveordead;
        (function (aliveordead) {
            /** 生死战观战界面 */
            var LiveDieWatchMediator = /** @class */ (function (_super) {
                __extends(LiveDieWatchMediator, _super);
                function LiveDieWatchMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    _this._viewUI = new ui.common.LiveDieWatchUI();
                    _this.isCenter = true;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    //获取造型配置表
                    _this._shapeConfig = LoginModel.getInstance().cnpcShapeInfo;
                    return _this;
                }
                /** 供其它地方使用该界面 */
                LiveDieWatchMediator.prototype.onShow = function () {
                    this.registerEvent();
                    this.requestWatchLstData();
                    this.show();
                };
                /** 请求生死战观战列表数据 */
                LiveDieWatchMediator.prototype.requestWatchLstData = function () {
                    RequesterProtocols._instance.c2s_CLiveDieBattleWatchView();
                };
                LiveDieWatchMediator.prototype.show = function () {
                    this._watchLstData = [];
                    _super.prototype.show.call(this);
                    this.init();
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.OPEN_EVENT);
                };
                /** 界面的初始化 */
                LiveDieWatchMediator.prototype.init = function () {
                    var lst = this._viewUI.watch_lst;
                    lst.vScrollBarSkin = "";
                    lst.scrollBar.elasticBackTime = 100;
                    lst.scrollBar.elasticDistance = 100;
                    lst.array = this._watchLstData;
                    lst.renderHandler = new Laya.Handler(this, this.watchLstRender);
                    lst.selectHandler = new Laya.Handler(this, this.watchLstSelect);
                    if (this._watchLstData.length == 0) {
                        lst.visible = false;
                        this._viewUI.noneDuel_box.visible = true;
                    }
                    else {
                        lst.visible = true;
                        this._viewUI.noneDuel_box.visible = false;
                    }
                };
                /** 观战列表的点击处理 */
                LiveDieWatchMediator.prototype.watchLstSelect = function (index) {
                };
                /** 观战列表的渲染 */
                LiveDieWatchMediator.prototype.watchLstRender = function (cell, index) {
                    var _watchdata = this._watchLstData[index];
                    var role1_box = cell.getChildByName("role1_box");
                    this.initRoleBox(role1_box, _watchdata.role1);
                    var role2_box = cell.getChildByName("role2_box");
                    this.initRoleBox(role2_box, _watchdata.role2);
                    var watch_btn = cell.getChildByName("watch_btn");
                    watch_btn.on(LEvent.CLICK, this, this.watchBattle, [_watchdata.battleId]);
                };
                /** 进行观战处理 */
                LiveDieWatchMediator.prototype.watchBattle = function (battleId) {
                    RequesterProtocols._instance.c2s_CLiveDieBattleWatchFight(battleId);
                };
                /** 处理对手信息Box的显示 */
                LiveDieWatchMediator.prototype.initRoleBox = function (rolebox, roledata) {
                    var role_img = rolebox.getChildByName("role_img");
                    var _littleheadID = this._shapeConfig[roledata.shape]["littleheadID"];
                    role_img.skin = "common/icon/avatarrole/" + _littleheadID + ".png";
                    var roleName_lab = rolebox.getChildByName("roleName_lab");
                    roleName_lab.text = roledata.rolename;
                    var school_img = rolebox.getChildByName("school_img");
                    school_img.skin = "common/ui/tongyong/" + roledata.school + ".png";
                    var selectType_lab = rolebox.getChildByName("selectType_lab");
                    var teamNum_lab = rolebox.getChildByName("teamNum_lab");
                    if (roledata.teamnum == 0 && roledata.teamnummax == 0) {
                        selectType_lab.text = "单人";
                        teamNum_lab.visible = false;
                    }
                    else {
                        selectType_lab.text = "组队";
                        teamNum_lab.visible = true;
                        teamNum_lab.text = roledata.teamnum + "/" + roledata.teamnummax;
                    }
                };
                /** 事件注册 */
                LiveDieWatchMediator.prototype.registerEvent = function () {
                    //UI控件事件监听            
                    this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
                    this._viewUI.refresh_btn.on(LEvent.MOUSE_DOWN, this, this.requestWatchLstData);
                    //消息事件监听
                    aliveordead.models.AliveOrDeadProxy.getInstance().on(aliveordead.models.GetWatchData, this, this.dataInit);
                };
                /** 数据的初始化 */
                LiveDieWatchMediator.prototype.dataInit = function (lst) {
                    this._watchLstData = [];
                    if (lst) {
                        this._watchLstData = lst;
                    }
                    this.init();
                };
                LiveDieWatchMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    this.removeEvent();
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.CLOSEVIEW_EVENT);
                };
                /** 移除事件 */
                LiveDieWatchMediator.prototype.removeEvent = function () {
                    this._viewUI.close_btn.off(LEvent.MOUSE_DOWN, this, this.hide);
                    this._viewUI.refresh_btn.off(LEvent.MOUSE_DOWN, this, this.requestWatchLstData);
                    aliveordead.models.AliveOrDeadProxy.getInstance().off(aliveordead.models.GetWatchData, this, this.dataInit);
                };
                LiveDieWatchMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return LiveDieWatchMediator;
            }(game.modules.UiMediator));
            aliveordead.LiveDieWatchMediator = LiveDieWatchMediator;
        })(aliveordead = modules.aliveordead || (modules.aliveordead = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=LiveDieWatchMediator.js.map