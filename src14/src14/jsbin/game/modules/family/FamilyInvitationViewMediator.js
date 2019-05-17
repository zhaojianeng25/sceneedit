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
        var family;
        (function (family) {
            /** 帮派邀请 */
            var FamilyInvitationViewMediator = /** @class */ (function (_super) {
                __extends(FamilyInvitationViewMediator, _super);
                function FamilyInvitationViewMediator(app) {
                    var _this = _super.call(this) || this;
                    /**职业配置表 */
                    _this.schoolInfo = LoginModel.getInstance().schoolInfo;
                    /**程序内字符串表 */
                    _this.cstringResConfigData = game.modules.tips.models.TipsModel._instance.cstringResConfigData;
                    /**当前选择的角色id */
                    _this.roleid = 0;
                    _this.uiLayer = app.uiRoot.general;
                    _this._viewUI = new ui.common.FamilyYaoQingUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this.roleid = 0;
                    _this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, _this, _this.closeThisView);
                    _this._viewUI.yaoQing_btn.on(LEvent.MOUSE_DOWN, _this, _this.invitation);
                    _this._viewUI.search_btn.on(LEvent.MOUSE_DOWN, _this, _this.search);
                    _this._viewUI.change_btn.on(LEvent.MOUSE_DOWN, _this, _this.clanInvitationView);
                    _this._viewUI.lianXi_btn.on(LEvent.MOUSE_DOWN, _this, _this.contactPlayer);
                    _this._viewUI.shaiXuan_btn.on(LEvent.MOUSE_DOWN, _this, _this.screenOutSearch);
                    family.models.FamilyProxy._instance.on(family.models.SClanInvitationView, _this, _this.showInvitationView);
                    return _this;
                }
                /**显示邀请界面 */
                FamilyInvitationViewMediator.prototype.showInvitationView = function () {
                    var invitationroleinfolist = family.models.FamilyModel.getInstance().invitationroleinfolist;
                    var invitationroleinfoArr = [];
                    for (var i = 0; i < invitationroleinfolist.length; i++) {
                        var roleid = invitationroleinfolist[i].roleid;
                        var rolename = invitationroleinfolist[i].rolename;
                        var level = invitationroleinfolist[i].level;
                        var sex = invitationroleinfolist[i].sex;
                        var school = invitationroleinfolist[i].school;
                        var fightvalue = invitationroleinfolist[i].fightvalue;
                        var vip = invitationroleinfolist[i].vip;
                        var shape = invitationroleinfolist[i].shape; //造型
                        var m_sex = "";
                        if (sex == Sex.man) { //性别是男的
                            m_sex = this.cstringResConfigData[1188].msg;
                        }
                        else {
                            m_sex = this.cstringResConfigData[1187].msg;
                        }
                        var m_school = this.schoolInfo[school].name;
                        var m_school_img = "common/ui/havefamily/" + school + ".png";
                        invitationroleinfoArr.push({
                            roleName_lab: rolename, roleid: roleid, sex_lab: m_sex, lv_lab: level, zhiYeIcon_img: m_school_img,
                            zhiYe_lab: m_school, wholePower_lab: fightvalue, vip_lab: vip, shape: shape
                        });
                    }
                    SaleModel._instance.showList(this._viewUI.role_list, invitationroleinfoArr);
                    this._viewUI.role_list.selectHandler = new Handler(this, this.roleListSelect, [invitationroleinfoArr]);
                };
                FamilyInvitationViewMediator.prototype.roleListSelect = function (invitationroleinfoArr, index) {
                    var roleid = invitationroleinfoArr[index].roleid;
                    this.roleid = roleid;
                };
                /**邀请 */
                FamilyInvitationViewMediator.prototype.invitation = function () {
                    if (this.roleid != 0) {
                        this.CClanInvitation(this.roleid);
                    }
                };
                /**被邀请 */
                FamilyInvitationViewMediator.prototype.showClanInvitation = function (ClanInvitation) {
                    var param = new Dictionary();
                    param.set("contentId", 145034);
                    var hostrolename = ClanInvitation.get("hostrolename");
                    var clannname = ClanInvitation.get("clannname");
                    var pa = [hostrolename, clannname];
                    param.set("parame", pa);
                    this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENT_TIPS_MESSAGE, param);
                };
                /**搜索 */
                FamilyInvitationViewMediator.prototype.search = function () {
                    var roleid = this._viewUI.search_input.text;
                    this.CRequestSearchRole(roleid);
                };
                /**默认请求邀请 */
                FamilyInvitationViewMediator.prototype.clanInvitationView = function () {
                    this.CClanInvitationView(1, -1, Sex.allman);
                };
                /**联系玩家 */
                FamilyInvitationViewMediator.prototype.contactPlayer = function () {
                    this.closeThisView();
                    this.FriendSystemModule = new game.modules.friend.FriendSystemModule(this._app);
                    this.FriendSystemModule.show();
                };
                /**筛选搜索 */
                FamilyInvitationViewMediator.prototype.screenOutSearch = function () {
                    this.FamilyScreeningViewMediator = new family.FamilyScreeningViewMediator(this._viewUI, this._app);
                    this.FamilyScreeningViewMediator.show();
                };
                /***************************************************************************************************************** */
                /**
                 * 客户端请求邀请界面
                 * @param type_level 等级删选  -1表示所有
                 * @param type_school 职业删选  -1表示所有
                 * @param type_sex 性别删选  1男  2女  -1表示所有
                 */
                FamilyInvitationViewMediator.prototype.CClanInvitationView = function (type_level, type_school, type_sex) {
                    RequesterProtocols._instance.c2s_CClanInvitationView(type_level, type_school, type_sex);
                };
                /**
                 * 公会邀请
                 * @param guestroleid
                 */
                FamilyInvitationViewMediator.prototype.CClanInvitation = function (guestroleid) {
                    RequesterProtocols._instance.c2s_CClanInvitation(guestroleid);
                };
                /**
                 * 搜索
                 * @param roleId
                 */
                FamilyInvitationViewMediator.prototype.CRequestSearchRole = function (roleId) {
                    RequesterProtocols._instance.c2s_CRequestSearchRole(roleId);
                };
                FamilyInvitationViewMediator.prototype.closeThisView = function () {
                    this.hide();
                    // ModuleManager.show(ModuleNames.haveFamily, this._app);
                };
                FamilyInvitationViewMediator.prototype.show = function () {
                    this.clanInvitationView();
                    _super.prototype.show.call(this);
                };
                FamilyInvitationViewMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                FamilyInvitationViewMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return FamilyInvitationViewMediator;
            }(game.modules.ModuleMediator));
            family.FamilyInvitationViewMediator = FamilyInvitationViewMediator;
        })(family = modules.family || (modules.family = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=FamilyInvitationViewMediator.js.map