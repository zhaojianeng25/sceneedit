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
* 帮派活动界面
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var family;
        (function (family) {
            var FamilyActivityViewMediator = /** @class */ (function (_super) {
                __extends(FamilyActivityViewMediator, _super);
                function FamilyActivityViewMediator(uiLayer, app) {
                    var _this = _super.call(this, uiLayer) || this;
                    /**g公会活动表 */
                    _this.clanCFactionHuoDongData = family.models.FamilyModel.getInstance().clanCFactionHuoDongData;
                    _this._viewUI = new ui.common.FamilyHuoDongUI();
                    _this._app = app;
                    _this.isCenter = false;
                    return _this;
                }
                /**显示活动列表 */
                FamilyActivityViewMediator.prototype.showActivityView = function () {
                    var activityArr = [];
                    for (var i in this.clanCFactionHuoDongData) {
                        var name = this.clanCFactionHuoDongData[i].name;
                        var icon = this.clanCFactionHuoDongData[i].icon;
                        var leveldesc = this.clanCFactionHuoDongData[i].leveldesc;
                        var opentimedesc = this.clanCFactionHuoDongData[i].opentimedesc;
                        var huodongdesc = this.clanCFactionHuoDongData[i].huodongdesc;
                        var id = this.clanCFactionHuoDongData[i].id;
                        var m_icon = "common/ui/family/" + icon + ".png";
                        activityArr.push({ id: id, huoDongName_lab: name, huoDongIcon_img: m_icon, lv_lab: leveldesc, activityTime_label: opentimedesc, activityDesc_label: huodongdesc });
                    }
                    SaleModel._instance.showList(this._viewUI.clanActivity_list, activityArr);
                    this._viewUI.clanActivity_list.renderHandler = new Handler(this, this.clanActivityListRender, [activityArr]);
                };
                /**公会活动显示 */
                FamilyActivityViewMediator.prototype.clanActivityListRender = function (activityArr, cell, index) {
                    var id = activityArr[index].id;
                    var openBtn = cell.getChildByName("open_btn");
                    var guanLiBtn = cell.getChildByName("guanLi_btn");
                    guanLiBtn.visible = false;
                    if (id == 2) { //活动显示管理弹窗
                        guanLiBtn.visible = true;
                        guanLiBtn.on(LEvent.MOUSE_DOWN, this, this.onGuanli);
                    }
                    if (id == 3) { //活动显示传送或者打开
                        openBtn.label = family.models.FamilyModel.activityOpenOrTransfer.open;
                    }
                    else {
                        openBtn.label = family.models.FamilyModel.activityOpenOrTransfer.transfer;
                    }
                    openBtn.on(LEvent.MOUSE_DOWN, this, this.onOpenBtn, [cell, index, activityArr]);
                };
                /**管理 */
                FamilyActivityViewMediator.prototype.onGuanli = function () {
                    this.FamilyFuBenManagerViewMediator = new family.FamilyFuBenManagerViewMediator(this._viewUI, this._app);
                    this.FamilyFuBenManagerViewMediator.show();
                };
                /**打开 / 传送 */
                FamilyActivityViewMediator.prototype.onOpenBtn = function (cell, index, activityArr) {
                    var openBtn = cell.getChildByName("guanLi_btn");
                    if (activityArr[index].id == 3) { //打开公会战界面
                        this.FamilyBattleViewMediator = new family.FamilyBattleViewMediator(this._app);
                        modules.ModuleManager.hide(modules.ModuleNames.haveFamily);
                        this.FamilyBattleViewMediator.show();
                    }
                    else { //传送指定位置
                        var inTeamGroup = HudModel.getInstance().chargeInGroup();
                        if (inTeamGroup) //未处于组队
                         {
                            this.showDisappTips(PromptExplain.IN_TEAM_GROUP);
                            return;
                        }
                        this._app.sceneRoot.istask = 2;
                        modules.mainhud.models.HudModel.getInstance().useapp = this._app;
                        if (activityArr[index].id == 1) { //任务 找赵副管
                            modules.mainhud.models.HudModel.getInstance().jumpmap(1711, 19032);
                        }
                        else if (activityArr[index].id == 2) { //副本  找张副管
                            modules.mainhud.models.HudModel.getInstance().jumpmap(1711, 19034);
                        }
                        modules.ModuleManager.hide(modules.ModuleNames.haveFamily);
                    }
                };
                /** 弹窗飘字提示
                 * @param id 提示语句id
                 */
                FamilyActivityViewMediator.prototype.showDisappTips = function (id) {
                    var chattext = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[id];
                    var tips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                    tips.onShow(chattext.msg);
                };
                /**跳转地图 */
                FamilyActivityViewMediator.prototype.getpost = function (mapid) {
                    var MapData = MapModel.getInstance().WorldMapConfigData[mapid];
                    var mainUnit = this._app.sceneObjectMgr.mainUnit;
                    var x, y;
                    x = (Math.random() * (MapData.bottomx - MapData.topx) + MapData.topx);
                    y = (Math.random() * (MapData.bottomy - MapData.topy) + MapData.topy);
                    mainUnit.SetPosX(x);
                    mainUnit.SetPosY(y);
                    mainUnit.SetPos(x, y);
                };
                FamilyActivityViewMediator.prototype.show = function () {
                    this.showActivityView();
                    _super.prototype.show.call(this);
                };
                FamilyActivityViewMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                FamilyActivityViewMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return FamilyActivityViewMediator;
            }(game.modules.UiMediator));
            family.FamilyActivityViewMediator = FamilyActivityViewMediator;
        })(family = modules.family || (modules.family = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=FamilyActivityViewMediator.js.map