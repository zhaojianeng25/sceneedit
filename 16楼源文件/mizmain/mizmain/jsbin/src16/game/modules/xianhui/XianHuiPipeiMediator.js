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
* 战仙会匹配
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var xianhui;
        (function (xianhui) {
            var XianHuiPipeiMediator = /** @class */ (function (_super) {
                __extends(XianHuiPipeiMediator, _super);
                function XianHuiPipeiMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    _this._viewUI = new ui.common.PiPeiUI();
                    _this.isCenter = true;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, _this, _this.hide);
                    _this._viewUI.cancel_btn.on(LEvent.CLICK, _this, _this.hide);
                    xianhui.models.XianHuiProxy._instance.on(xianhui.models.REFRESH_MATCHRESULE_EVENT, _this, _this.setOtherTeam);
                    return _this;
                }
                /** 设置自身匹配信息 */
                XianHuiPipeiMediator.prototype.init = function (index) {
                    _super.prototype.show.call(this);
                    this.rolesNum = index;
                    index == 1 ? this._viewUI.otherTeam_list.x = 530 : this._viewUI.otherTeam_list.x = 329;
                    game.modules.mainhud.models.HudProxy.getInstance().event(game.modules.mainhud.models.OPEN_EVENT);
                    //队伍信息
                    var _teaminfo = modules.team.models.TeamModel.getInstance().teamMemberBasic.values;
                    var data = [];
                    for (var i = 0; i < this.rolesNum; i++) {
                        var roleVisi = false;
                        var roleSkin = "";
                        var levelVisi = false;
                        var levelText = "";
                        var schoolVisi = false;
                        var schoolSkin = "";
                        if (_teaminfo.length > 0 && i < _teaminfo.length) {
                            roleVisi = true;
                            roleSkin = "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + _teaminfo[i].shape) + ".png";
                            levelVisi = true;
                            levelText = "Lv." + _teaminfo[i].level;
                            schoolVisi = true;
                            schoolSkin = RoleInfoModel.getInstance().setZhiyeImg(_teaminfo[i].school);
                        }
                        else if (i < 1) {
                            var roleDetail = game.modules.createrole.models.LoginModel.getInstance().roleDetail;
                            roleVisi = true;
                            roleSkin = "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + roleDetail.shape) + ".png";
                            levelVisi = true;
                            levelText = "Lv." + roleDetail.level;
                            schoolVisi = true;
                            schoolSkin = RoleInfoModel.getInstance().setZhiyeImg(roleDetail.school);
                        }
                        data.push({
                            role_img: { visible: roleVisi, skin: roleSkin },
                            level_lab: { visible: levelVisi, text: levelText },
                            school_img: { visible: schoolVisi, skin: schoolSkin }
                        });
                    }
                    this._viewUI.myteam_list.array = data;
                    this._viewUI.myteam_list.repeatY = 1;
                    this.setOtherTeam();
                    Laya.timer.loop(1000, this, this.setOtherTeam);
                };
                /** 获取其他队伍信息数据 */
                XianHuiPipeiMediator.prototype.setOtherTeam = function (targets) {
                    var _targets = [];
                    if (!targets) {
                        var roleDetail = game.modules.createrole.models.LoginModel.getInstance().roleDetail;
                        for (var i = 0; i < this.rolesNum; i++) {
                            //产生随机数
                            var shape = Math.floor(Math.random() * 6 + 1);
                            var school = Math.floor(Math.random() * 3);
                            var createRoleConfigBaseVo = LoginModel.getInstance().createRoleConfigBinDic[shape];
                            var PvP3RoleSingleMatch = new xianhui.models.PvP3RoleSingleMatchVo();
                            PvP3RoleSingleMatch.roleId = 0;
                            PvP3RoleSingleMatch.level = roleDetail.level;
                            PvP3RoleSingleMatch.shape = shape;
                            PvP3RoleSingleMatch.school = createRoleConfigBaseVo.schools[school];
                            _targets.push(PvP3RoleSingleMatch);
                        }
                    }
                    else {
                        Laya.timer.clear(this, this.setOtherTeam);
                        Laya.timer.once(3000, this, this.hide);
                        _targets = targets;
                    }
                    this.getOtherTeam(_targets);
                };
                /** 设置其他队伍信息 */
                XianHuiPipeiMediator.prototype.getOtherTeam = function (targets) {
                    var data = [];
                    for (var i = this.rolesNum - 1; i >= 0; i--) {
                        var roleVisi = false;
                        var roleSkin = "";
                        var levelVisi = false;
                        var levelText = "";
                        var schoolVisi = false;
                        var schoolSkin = "";
                        if (i < targets.length) {
                            roleVisi = true;
                            roleSkin = "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + targets[i].shape) + ".png";
                            levelVisi = true;
                            levelText = "Lv." + targets[i].level;
                            schoolVisi = true;
                            schoolSkin = RoleInfoModel.getInstance().setZhiyeImg(targets[i].school);
                        }
                        data.push({
                            role_img: { visible: roleVisi, skin: roleSkin },
                            level_lab: { visible: levelVisi, text: levelText },
                            school_img: { visible: schoolVisi, skin: schoolSkin }
                        });
                    }
                    this._viewUI.otherTeam_list.array = data;
                    this._viewUI.otherTeam_list.repeatY = 1;
                };
                XianHuiPipeiMediator.prototype.hide = function () {
                    RequesterProtocols._instance.c2s_CPvP3ReadyFight(0);
                    _super.prototype.hide.call(this);
                    if (LoginModel.getInstance().CommonPage != "") {
                        modules.ModuleManager.show(LoginModel.getInstance().CommonPage, this._app);
                        LoginModel.getInstance().CommonPage = "";
                    }
                    game.modules.mainhud.models.HudProxy.getInstance().event(game.modules.mainhud.models.CLOSEVIEW_EVENT);
                };
                XianHuiPipeiMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return XianHuiPipeiMediator;
            }(game.modules.UiMediator));
            xianhui.XianHuiPipeiMediator = XianHuiPipeiMediator;
        })(xianhui = modules.xianhui || (modules.xianhui = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=XianHuiPipeiMediator.js.map