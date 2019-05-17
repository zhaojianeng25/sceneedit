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
/**Rename.ui */
// import RenameUi = ui.common.component.GaiMingKaUI;
var game;
(function (game) {
    var modules;
    (function (modules) {
        var commonUI;
        (function (commonUI) {
            var RenameMediators = /** @class */ (function (_super) {
                __extends(RenameMediators, _super);
                function RenameMediators(uiLayer, app) {
                    var _this = _super.call(this, uiLayer) || this;
                    _this.uiLayer = app.uiRoot.general;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this._viewUI = new ui.common.component.GaiMingKaUI();
                    _this._viewUI.mouseThrough = true;
                    // 默认居中
                    _this.isCenter = true;
                    return _this;
                }
                RenameMediators.getInstance = function (uiLayer, app) {
                    if (!this._instance) {
                        this._instance = new RenameMediators(uiLayer, app);
                    }
                    return this._instance;
                };
                ////////////////
                ///业务逻辑
                ////////////////
                /**
                 * @describe  改名卡
                 *
                 */
                RenameMediators.prototype.onShow = function (renameKey) {
                    this.renameKey = renameKey;
                    _super.prototype.show.call(this);
                    this.onLoad();
                    this.registEvent();
                };
                /** 初始化数据 */
                RenameMediators.prototype.onLoad = function () {
                    var oldName = LoginModel.getInstance().roleDetail.rolename;
                    this._viewUI.oldname_lab.changeText(oldName);
                    var roleId = LoginModel.getInstance().roleDetail.roleid;
                    this._viewUI.IDnum_lab.text = "ID:" + roleId;
                };
                RenameMediators.prototype.registEvent = function () {
                    this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
                    this._viewUI.reName_btn.on(LEvent.MOUSE_DOWN, this, this.onRenameEvent);
                };
                /** 点击改名 */
                RenameMediators.prototype.onRenameEvent = function () {
                    var textInput = this._viewUI.text_input.text;
                    var islegitimate = this.chargeCharacter(textInput);
                    if (!islegitimate) {
                        var promp = "名字只能输入2-7个中文字符或4—11个英文字符";
                        this.DisappearMessageTipsMediator = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                        this.DisappearMessageTipsMediator.onShow(promp);
                    }
                    else {
                        var newName = this._viewUI.text_input.text;
                        RequesterProtocols._instance.c2s_CModifyRoleName(newName, this.renameKey);
                        this.hide();
                    }
                };
                /** 判断输入是否合法 */
                RenameMediators.prototype.chargeCharacter = function (text) {
                    var textInput = text;
                    if (textInput == null) {
                        var promp = "请输入要修改的名称";
                        this.DisappearMessageTipsMediator = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                        this.DisappearMessageTipsMediator.onShow(promp);
                        return false;
                    }
                    else {
                        /** 中文个数 */
                        var chinese = 0;
                        /** 数字个数 */
                        var number = 0;
                        /** 字母个数 包含26个大小写字母 */
                        var letter = 0;
                        var reg = new RegExp("[\u4E00-\u9FFF]+", "g");
                        for (var index = 0; index < textInput.length; index++) {
                            if (textInput.charCodeAt(index) > 255) {
                                chinese++;
                            }
                            else if (textInput.charCodeAt(index) >= 48 && textInput.charCodeAt(index) <= 57) {
                                number++;
                            }
                            else if ((textInput.charCodeAt(index) >= 65 && textInput.charCodeAt(index) <= 90) || (textInput.charCodeAt(index) >= 97 && textInput.charCodeAt(index) <= 122)) {
                                letter++;
                            }
                        }
                        if ((chinese >= 2 && chinese <= 7) || (letter >= 4 && letter <= 11) || (letter >= 4 && letter <= 11)) {
                            return true;
                        }
                        return false;
                    }
                };
                RenameMediators.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                RenameMediators.prototype.getView = function () {
                    return this._viewUI;
                };
                return RenameMediators;
            }(game.modules.UiMediator));
            commonUI.RenameMediators = RenameMediators;
        })(commonUI = modules.commonUI || (modules.commonUI = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=RenameMediators.js.map