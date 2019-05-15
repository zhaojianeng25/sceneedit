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
        var team;
        (function (team) {
            var TeamInfoMediator = /** @class */ (function (_super) {
                __extends(TeamInfoMediator, _super);
                function TeamInfoMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    _this._viewUI = new ui.common.component.TeamInfoUI();
                    _this._viewUI.mouseThrough = true;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this.isCenter = true;
                    _this.schoolInfo = LoginModel.getInstance().schoolInfo;
                    return _this;
                }
                /** 显示界面
                 * @param teaminfo TeamMemberSimpleVo类型的数组
                 */
                TeamInfoMediator.prototype.onshow = function (teaminfo) {
                    if (teaminfo.length == 0)
                        return;
                    this.show();
                    this.teaminfo = teaminfo;
                    /** 填充的数据长度 */
                    var fullLen = 5 - this.teaminfo.length;
                    for (var index = 1; index <= fullLen; index++) {
                        this.teaminfo.push(null);
                    }
                    this.getTeamData(this._viewUI.teaminfo_list);
                };
                /** 获取队伍数据
                 * @param list Laya.list
                 */
                TeamInfoMediator.prototype.getTeamData = function (list) {
                    list.hScrollBarSkin = "";
                    list.repeatX = this.teaminfo.length;
                    list.repeatY = 1;
                    list.spaceX = 55;
                    list.spaceY = 26;
                    list.array = this.teaminfo;
                    list.renderHandler = new Laya.Handler(this, this.onRenderTeamIfo);
                };
                /** 渲染队伍数据 */
                TeamInfoMediator.prototype.onRenderTeamIfo = function (cell, index) {
                    var roleBg_img = cell.getChildByName("gameItemBg_img");
                    var role_img = cell.getChildByName("ownGameItem_img");
                    var naem_lab = cell.getChildByName("name_lab");
                    var zhiye_lab = cell.getChildByName("zhiye_lab");
                    var level_lab = cell.getChildByName("level_lab");
                    var data = this.teaminfo[index];
                    if (data != null) { /** 有数据 */
                        var shape = data.shape;
                        roleBg_img.skin = "common/ui/tongyong/baikuang.png";
                        role_img.skin = "icon/avatarrole/" + (30000 + shape) + ".png";
                        naem_lab.text = data.rolename;
                        var school = data.school;
                        zhiye_lab.text = this.schoolInfo[school].name;
                        level_lab.text = data.level;
                    }
                    else { /** 空数据 */
                        role_img.skin = "";
                        naem_lab.text = "";
                        zhiye_lab.text = "";
                        level_lab.text = "";
                        roleBg_img.skin = "common/ui/tongtong/kuang94.png";
                    }
                };
                TeamInfoMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                    this.registerEvent();
                };
                /** 事件注册 */
                TeamInfoMediator.prototype.registerEvent = function () {
                    this._viewUI.mask_img.on(LEvent.MOUSE_DOWN, this, this.hide);
                };
                TeamInfoMediator.prototype.hide = function () {
                    if (LoginModel.getInstance().CommonPage != "") {
                        modules.ModuleManager.show(LoginModel.getInstance().CommonPage, this._app);
                        LoginModel.getInstance().CommonPage = "";
                    }
                    _super.prototype.hide.call(this);
                };
                TeamInfoMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                TeamInfoMediator.prototype.onShow = function (event) {
                    this.show();
                };
                return TeamInfoMediator;
            }(game.modules.UiMediator));
            team.TeamInfoMediator = TeamInfoMediator;
        })(team = modules.team || (modules.team = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=TeamInfoMediator.js.map