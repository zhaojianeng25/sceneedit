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
* 副本管理
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var family;
        (function (family) {
            var FamilyFuBenManagerViewMediator = /** @class */ (function (_super) {
                __extends(FamilyFuBenManagerViewMediator, _super);
                function FamilyFuBenManagerViewMediator(uiLayer, app) {
                    var _this = _super.call(this, uiLayer) || this;
                    /**公会副本参数表 */
                    _this.instanceCInstaceConfigData = family.models.FamilyModel.getInstance().instanceCInstaceConfigData;
                    /**选择的副本 */
                    _this.selectFuben = null;
                    /**公会副本数据 */
                    _this.fubenArr = [];
                    /**保存当前点击的副本列表的index */
                    _this.index = 0;
                    _this._viewUI = new ui.common.FamilyFuBenManagerUI();
                    _this._app = app;
                    _this.isCenter = false;
                    _this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, _this, _this.hide);
                    _this._viewUI.save_btn.on(LEvent.MOUSE_DOWN, _this, _this.saveSet);
                    _this.showThisView();
                    return _this;
                }
                FamilyFuBenManagerViewMediator.prototype.showThisView = function () {
                    var fubenArr = [];
                    for (var i in this.instanceCInstaceConfigData) {
                        var serversid = this.instanceCInstaceConfigData[i].serversid;
                        var name = this.instanceCInstaceConfigData[i].name;
                        var claninstservice = family.models.FamilyModel.getInstance().clanInfo[0].claninstservice;
                        if (claninstservice.get(serversid) != undefined) {
                            var value = claninstservice.get(serversid);
                            fubenArr.push({ serversid: serversid, fubenname_lab: name, value: value });
                        }
                    }
                    this.fubenArr = fubenArr;
                    SaleModel._instance.showList(this._viewUI.fuben_list, fubenArr);
                    this._viewUI.fuben_list.renderHandler = new Handler(this, this.fubenlistRender);
                };
                FamilyFuBenManagerViewMediator.prototype.fubenlistRender = function (cell, index) {
                    var gouxuantishiBtn = cell.getChildByName("gouxuantishi_btn");
                    var ischeck_check = cell.getChildByName("ischeck_check");
                    var value = this.fubenArr[index].value;
                    if (value == 1) {
                        this.index = index;
                        this.selectFuben = ischeck_check;
                    }
                    this.selectFuben.selected = true;
                    ischeck_check.clickHandler = new Handler(this, this.clickCheck, [cell, index]);
                    gouxuantishiBtn.on(LEvent.MOUSE_DOWN, this, this.onGouxuantishi, [index, this.fubenArr]);
                };
                /**提示 */
                FamilyFuBenManagerViewMediator.prototype.onGouxuantishi = function (index, fubenArr) {
                    var name = fubenArr[index].fubenname_lab;
                    this.showTips(name);
                };
                /**选择副本 */
                FamilyFuBenManagerViewMediator.prototype.clickCheck = function (cell, index) {
                    var ischeck_check = cell.getChildByName("ischeck_check");
                    if (this.selectFuben != ischeck_check) {
                        this.selectFuben.selected = false;
                        this.fubenArr[index].value = 1;
                        this.fubenArr[this.index].value = 0;
                        this.index = index;
                        this.selectFuben = ischeck_check;
                    }
                    else {
                        this.selectFuben.selected = true;
                    }
                };
                /**显示提示弹窗 */
                FamilyFuBenManagerViewMediator.prototype.showTips = function (name) {
                    var parameArr = new Dictionary();
                    parameArr.set("title", 11513);
                    parameArr.set("contentId", 11512);
                    var parame = [name];
                    parameArr.set("parame", parame);
                    this.tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENTMESSAGE, parameArr);
                };
                /**保存设置 */
                FamilyFuBenManagerViewMediator.prototype.saveSet = function () {
                    var claninstservice = family.models.FamilyModel.getInstance().clanInfo[0].claninstservice;
                    var serversid = this.fubenArr[this.index].serversid;
                    if (claninstservice.get(serversid) != 1) {
                        this.CChangeClanInst(serversid);
                    }
                    this.hide();
                };
                /**
                 * 改变公会副本
                 * @param claninstservice 进入副本服务编号
                 */
                FamilyFuBenManagerViewMediator.prototype.CChangeClanInst = function (claninstservice) {
                    RequesterProtocols._instance.c2s_CChangeClanInst(claninstservice);
                };
                FamilyFuBenManagerViewMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                };
                FamilyFuBenManagerViewMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                FamilyFuBenManagerViewMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return FamilyFuBenManagerViewMediator;
            }(game.modules.UiMediator));
            family.FamilyFuBenManagerViewMediator = FamilyFuBenManagerViewMediator;
        })(family = modules.family || (modules.family = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=FamilyFuBenManagerViewMediator.js.map