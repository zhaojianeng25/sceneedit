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
* 帮派福利界面
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var family;
        (function (family) {
            var FamilyWelfareViewMediator = /** @class */ (function (_super) {
                __extends(FamilyWelfareViewMediator, _super);
                function FamilyWelfareViewMediator(uiLayer, app) {
                    var _this = _super.call(this, uiLayer) || this;
                    /**公会福利配置表 */
                    _this.clanCFactionFuLiData = family.models.FamilyModel.getInstance().clanCFactionFuLiData;
                    /**程序内字符串表 */
                    _this.cstringResConfigData = game.modules.tips.models.TipsModel._instance.cstringResConfigData;
                    /**客户端信息提示表 */
                    _this.chatMessageTips = game.modules.chat.models.ChatModel._instance.chatMessageTips;
                    _this._viewUI = new ui.common.FamilyFuLiUI();
                    _this._app = app;
                    _this.isCenter = false;
                    family.models.FamilyProxy._instance.on(family.models.SBonusQuery, _this, _this.showWelfareView);
                    return _this;
                }
                /**显示公会福利 */
                FamilyWelfareViewMediator.prototype.showWelfareView = function () {
                    var welfareArr = [];
                    for (var i = 1; i <= Object.keys(this.clanCFactionFuLiData).length; i++) {
                        var name = this.clanCFactionFuLiData[i].name;
                        var icon = this.clanCFactionFuLiData[i].icon;
                        var desc = this.clanCFactionFuLiData[i].desc;
                        var isgive = this.clanCFactionFuLiData[i].isgive;
                        var id = this.clanCFactionFuLiData[i].id;
                        var m_icon = SaleModel._instance.getIcon(icon);
                        if (id == 6) {
                            m_icon = "common/ui/redpacket/" + icon + ".png";
                        }
                        welfareArr.push({ name_label: name, miaoShu_label: desc, fuLiIcon_img: m_icon, isgive: isgive, id: id });
                    }
                    SaleModel._instance.showList(this._viewUI.fuli_list, welfareArr);
                    this._viewUI.fuli_list.renderHandler = new Handler(this, this.fuliListRender, [welfareArr]);
                };
                /**福利列表渲染 */
                FamilyWelfareViewMediator.prototype.fuliListRender = function (welfareArr, cell, index) {
                    var gz_box = cell.getChildByName("gz_box");
                    var openortake_btn = cell.getChildByName("openortake_btn");
                    var gongZi_lab = cell.getChildByName("gz_box").getChildByName("gongZi_lab");
                    var fuLiIcon_img = cell.getChildByName("fuLiIcon_img");
                    var isgive = welfareArr[index].isgive;
                    if (isgive == 1) {
                        gz_box.visible = true;
                        openortake_btn.label = this.cstringResConfigData[2939].msg;
                        var bonus = family.models.FamilyModel.getInstance().bonus;
                        if (bonus <= 0) {
                            openortake_btn.disabled = true;
                        }
                        else {
                            openortake_btn.disabled = false;
                        }
                        gongZi_lab.text = bonus + "";
                    }
                    else {
                        gz_box.visible = false;
                    }
                    openortake_btn.on(LEvent.MOUSE_DOWN, this, this.onOpenBtn, [welfareArr, index]);
                };
                /**打开福利中不同的界面 */
                FamilyWelfareViewMediator.prototype.onOpenBtn = function (welfareArr, index) {
                    var isgive = welfareArr[index].isgive;
                    var id = welfareArr[index].id;
                    switch (id) {
                        case 1:
                            this.showFuWen();
                            break;
                        case 2:
                            this.showLifeSkill();
                            break;
                        case 3:
                            this.showZhuanJing();
                            break;
                        case 4:
                            this.showPharmacy();
                            break;
                        case 5:
                            this.getBonus();
                            break;
                        case 6:
                            this.showRedBag();
                            break;
                    }
                };
                /**打开帮派符文 */
                FamilyWelfareViewMediator.prototype.showFuWen = function () {
                    family.models.FamilyProxy._instance.event(family.models.CloseModule);
                    this.FamilyFuWenViewMediator = new family.FamilyFuWenViewMediator(this._app);
                    this.FamilyFuWenViewMediator.show();
                };
                /**生活技能 */
                FamilyWelfareViewMediator.prototype.showLifeSkill = function () {
                    modules.ModuleManager.hide(modules.ModuleNames.haveFamily);
                    modules.skill.models.SkillModel.getInstance().currenTabNum = 2; //切换到生活技能界面
                    modules.skill.models.SkillModel.getInstance().isFromClanWelfareJump = true;
                    modules.ModuleManager.show(modules.ModuleNames.SKILL, this._app);
                };
                /**帮派专精 */
                FamilyWelfareViewMediator.prototype.showZhuanJing = function () {
                    modules.ModuleManager.hide(modules.ModuleNames.haveFamily);
                    // RequesterProtocols._instance.c2s_CRequestParticleSkillList();//请求已经学习的修炼技能链表
                    modules.skill.models.SkillModel.getInstance().currenTabNum = 3; //切换到生活技能界面
                    modules.ModuleManager.show(modules.ModuleNames.SKILL, this._app);
                    LoginModel.getInstance().CommonPage = modules.ModuleNames.haveFamily;
                };
                /**打开帮派药房 */
                FamilyWelfareViewMediator.prototype.showPharmacy = function () {
                    var clanInfo = family.models.FamilyModel.getInstance().clanInfo;
                    var house = clanInfo[0].house;
                    var yaofangLevel = house.get(clanHouse.BuildYaoFang);
                    if (yaofangLevel > 0) {
                        var _FanilyPharmacyViewMediator = new family.FanilyPharmacyViewMediator(this._app);
                        _FanilyPharmacyViewMediator.show();
                        family.models.FamilyProxy._instance.event(family.models.CloseModule);
                    }
                    else {
                        this.DisappearMessageTipsMediator = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                        this.DisappearMessageTipsMediator.onShow(this.chatMessageTips[160318].msg);
                    }
                };
                /**领取工资 */
                FamilyWelfareViewMediator.prototype.getBonus = function () {
                    this.CGrabBonus();
                };
                /**帮派红包 */
                FamilyWelfareViewMediator.prototype.showRedBag = function () {
                    modules.ModuleManager.hide(modules.ModuleNames.haveFamily);
                    this.RedPacketMediator = new game.modules.redPacket.RedPacketMediator(this._app);
                    this.RedPacketMediator.show(RedPackType.TYPE_CLAN);
                    LoginModel.getInstance().CommonPage = modules.ModuleNames.haveFamily;
                };
                /**查询分红 */
                FamilyWelfareViewMediator.prototype.CBonusQuery = function () {
                    RequesterProtocols._instance.c2s_CBonusQuery();
                };
                /**领取分红 */
                FamilyWelfareViewMediator.prototype.CGrabBonus = function () {
                    RequesterProtocols._instance.c2s_CGrabBonus();
                };
                FamilyWelfareViewMediator.prototype.show = function () {
                    // this.showWelfareView();
                    this.CBonusQuery();
                    _super.prototype.show.call(this);
                };
                FamilyWelfareViewMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                FamilyWelfareViewMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return FamilyWelfareViewMediator;
            }(game.modules.UiMediator));
            family.FamilyWelfareViewMediator = FamilyWelfareViewMediator;
        })(family = modules.family || (modules.family = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=FamilyWelfareViewMediator.js.map