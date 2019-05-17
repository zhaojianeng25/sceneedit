/**
* name
*/
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
        var createrole;
        (function (createrole) {
            /** 登陆创建模块 */
            var CreateRoleModule = /** @class */ (function (_super) {
                __extends(CreateRoleModule, _super);
                function CreateRoleModule(app) {
                    var _this = _super.call(this) || this;
                    _this.uiLayer = app.uiRoot.general;
                    _this._viewUI = new ui.common.KongUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this._createRoleMediator = new createrole.CreateRoleMediator(_this._viewUI, _this._app);
                    _this._loginViewMediator = new createrole.LoginViewMediator(_this._app);
                    return _this;
                }
                /**
                 * 移除动画
                 */
                CreateRoleModule.prototype.removeAnima = function () {
                    if (this._skeleton) {
                        this._viewUI.removeChild(this._skeleton);
                    }
                    this.hide();
                };
                /**
                 * 添加加载动画
                 */
                CreateRoleModule.prototype.loadingAnima = function () {
                    // this._skeleton = new Laya.Skeleton();
                    // this._skeleton.load("res/loading_1/loading_000.sk");
                    // this._skeleton.scale(1.175,1.175);
                    // this._viewUI.addChild(this._skeleton);
                    // this._skeleton.pos(330,665);
                };
                CreateRoleModule.prototype.onShow = function (event) {
                    createrole.models.LoginModel.getInstance().referUI = this._viewUI;
                    //运行加载动画
                    // this.loadingAnima();
                    this.registerEvent();
                    _super.prototype.show.call(this);
                    this._loginViewMediator.show();
                    this._app.uiRoot.closeLoadProgress();
                };
                /**
                 * 注册事件
                 */
                CreateRoleModule.prototype.registerEvent = function () {
                    Network._instance.addHanlder(ProtocolsEnum.SEnterWorld, this, this.removeAnima);
                    Network._instance.addHanlder(ProtocolsEnum.SReturnLogin, this, this.loadingAnima);
                };
                CreateRoleModule.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                CreateRoleModule.prototype.getView = function () {
                    return this._viewUI;
                };
                return CreateRoleModule;
            }(game.modules.ModuleMediator));
            createrole.CreateRoleModule = CreateRoleModule;
        })(createrole = modules.createrole || (modules.createrole = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=CreateRoleModule.js.map