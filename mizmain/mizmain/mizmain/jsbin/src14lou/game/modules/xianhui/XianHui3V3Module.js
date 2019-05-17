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
* 战仙会3V3
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var xianhui;
        (function (xianhui) {
            var XianHui3V3Module = /** @class */ (function (_super) {
                __extends(XianHui3V3Module, _super);
                function XianHui3V3Module(app) {
                    var _this = _super.call(this) || this;
                    /** 战况信息 */
                    _this.battleInfos = [];
                    _this.uiLayer = app.uiRoot.general;
                    _this._viewUI = new ui.common.ZhanXianHui3v3UI();
                    _this.isCenter = true;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this.XianHuiRankMediator = new modules.xianhui.XianHuiRankMediator(_this._app);
                    _this.XianHuiPipeiMediator = new modules.xianhui.XianHuiPipeiMediator(_this._app);
                    _this.ani1 = new Laya.Animation();
                    _this.ani2 = new Laya.Animation();
                    _this.ani3 = new Laya.Animation();
                    _this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, _this, _this.hide);
                    xianhui.models.XianHuiProxy.getInstance().on(xianhui.models.REFRESH_PVP3_EVENT, _this, _this.getRoleInfo);
                    xianhui.models.XianHuiProxy.getInstance().on(xianhui.models.REFRESH_PVP3BATTLE_EVENT, _this, _this.getBattleInfo);
                    _this._viewUI.roles_list.renderHandler = new Handler(_this, _this.rolesHandler);
                    _this._viewUI.start_btn.on(LEvent.CLICK, _this, _this.pipei);
                    _this._viewUI.firstwin_img.on(LEvent.CLICK, _this, _this.getReward, [0]);
                    _this._viewUI.tenfight_img.on(LEvent.CLICK, _this, _this.getReward, [1]);
                    _this._viewUI.fivewin_img.on(LEvent.CLICK, _this, _this.getReward, [2]);
                    _this._viewUI.paihang_btn.on(LEvent.CLICK, _this, _this.getRankingView);
                    _this._viewUI.battleinfo_list.renderHandler = new Handler(_this, _this.battleHandler);
                    _this._viewUI.battles_check.on(LEvent.CLICK, _this, _this.getBattleInfo);
                    return _this;
                }
                XianHui3V3Module.prototype.init = function () {
                    this._viewUI.zhandoutimes_lab.text = "0";
                    this._viewUI.wintimes_lab.text = "0";
                    this._viewUI.liansheng_lab.text = "0";
                    this._viewUI.firstwin_img.skin = "common/ui/tongyong/baoxiang1.png";
                    this._viewUI.tenfight_img.skin = "common/ui/tongyong/baoxiang1.png";
                    this._viewUI.fivewin_img.skin = "common/ui/tongyong/baoxiang1.png";
                    this.getRoleInfo();
                    this.getBattleInfo();
                };
                /** 获取时间 */
                XianHui3V3Module.prototype.getTime = function (startTime) {
                    var date = new Date();
                    var date2 = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " 22:00:00";
                    var endTime = new Date(date2).getTime();
                    var time = endTime - startTime;
                    var m = time / 1000 / 60 % 60;
                    var s = time / 1000 % 60;
                    if (time <= 0) {
                        this._viewUI.shengyutime_lab.text = "00:00";
                    }
                    else {
                        this.timeM = Math.floor(m);
                        this.timeS = Math.ceil(s);
                        Laya.timer.loop(1000, this, this.showTime);
                    }
                    this.timeM = Math.floor(m);
                    this.timeS = Math.ceil(s);
                    Laya.timer.loop(1000, this, this.showTime);
                    this.init();
                    RequesterProtocols._instance.c2s_CPvP3MyInfo();
                    _super.prototype.show.call(this);
                };
                /** 定时器刷新时间显示 */
                XianHui3V3Module.prototype.showTime = function () {
                    var m = this.timeM + "";
                    var s = this.timeS + "";
                    if (this.timeM < 10) {
                        m = "0" + this.timeM;
                    }
                    else if (this.timeM <= 0) {
                        m = "00";
                    }
                    if (this.timeS < 10) {
                        s = "0" + this.timeS;
                    }
                    else if (this.timeS <= 0) {
                        s = "00";
                    }
                    this._viewUI.shengyutime_lab.text = m + ":" + s;
                    if (this.timeM <= 0 && this.timeS <= 0) {
                        Laya.timer.clear(this, this.showTime);
                        return;
                    }
                    this.timeS -= 1;
                    if (this.timeS < 0) {
                        this.timeM -= 1;
                        this.timeS = 59;
                    }
                };
                /** 获取界面信息 */
                XianHui3V3Module.prototype.getRoleInfo = function () {
                    this.PvP3MyInfo = xianhui.models.XianHuiModel.getInstance().PvP3MyInfo;
                    if (this.PvP3MyInfo) {
                        this._viewUI.zhandoutimes_lab.text = this.PvP3MyInfo.battlenum + "";
                        this._viewUI.wintimes_lab.text = this.PvP3MyInfo.winnum + "";
                        this._viewUI.liansheng_lab.text = this.PvP3MyInfo.combowinnum + "";
                        if (this.PvP3MyInfo.firstwin == 2) {
                            this._viewUI.firstwin_img.skin = "common/ui/tongyong/baoxiang0.png";
                        }
                        else if (this.PvP3MyInfo.firstwin == 1) {
                            if (this.ani1) {
                                this.ani1.clear();
                            }
                            this.ani1.loadAtlas("common/res/atlas/ui/tuji.atlas", Laya.Handler.create(this, this.onload));
                            this.ani1.scaleX = 0.96;
                            this.ani1.scaleY = 0.96;
                            this._viewUI.firstkuang_img.addChild(this.ani1);
                        }
                        if (this.PvP3MyInfo.tenfight == 2) {
                            this._viewUI.tenfight_img.skin = "common/ui/tongyong/baoxiang0.png";
                        }
                        else if (this.PvP3MyInfo.tenfight == 1) {
                            if (this.ani2) {
                                this.ani2.clear();
                            }
                            this.ani2.loadAtlas("common/res/atlas/ui/tuji.atlas", Laya.Handler.create(this, this.onload));
                            this.ani2.scaleX = 0.96;
                            this.ani2.scaleY = 0.96;
                            this._viewUI.tenkuang_img.addChild(this.ani2);
                        }
                        if (this.PvP3MyInfo.eightwin == 2) {
                            this._viewUI.fivewin_img.skin = "common/ui/tongyong/baoxiang0.png";
                        }
                        else if (this.PvP3MyInfo.eightwin == 1) {
                            if (this.ani3) {
                                this.ani3.clear();
                            }
                            this.ani3.loadAtlas("common/res/atlas/ui/tuji.atlas", Laya.Handler.create(this, this.onload));
                            this.ani3.scaleX = 0.96;
                            this.ani3.scaleY = 0.96;
                            this._viewUI.tenkuang_img.addChild(this.ani3);
                        }
                    }
                    //队伍信息
                    var _teaminfo = modules.team.models.TeamModel.getInstance().teamMemberBasic.values;
                    var data = [];
                    for (var i = 0; i < 3; i++) {
                        var jiahaoVisi = true;
                        var getteamVisi = true;
                        var roleVisi = false;
                        var roleSkin = "";
                        var rolenameVisi = false;
                        var rolenameText = "";
                        var levelVisi = false;
                        var levelText = "";
                        var shapeimgVisi = false;
                        var shapeimgSkin = "";
                        var shapeVisi = false;
                        var shapeText = "";
                        if (_teaminfo.length > 0 && i < _teaminfo.length) {
                            jiahaoVisi = false;
                            getteamVisi = false;
                            roleVisi = true;
                            roleSkin = "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + _teaminfo[i].shape) + ".png";
                            rolenameVisi = true;
                            rolenameText = _teaminfo[i].rolename;
                            levelVisi = true;
                            levelText = _teaminfo[i].level;
                            shapeimgVisi = true;
                            shapeimgSkin = RoleInfoModel.getInstance().setZhiyeImg(_teaminfo[i].school);
                            shapeVisi = true;
                            shapeText = modules.createrole.models.LoginModel.getInstance().schoolInfo[_teaminfo[i].school]["name"];
                        }
                        else if (i < 1) {
                            var roleDetail = game.modules.createrole.models.LoginModel.getInstance().roleDetail;
                            jiahaoVisi = false;
                            getteamVisi = false;
                            roleVisi = true;
                            roleSkin = "common/icon/avatarrole/" + (FriendEnum.ROLE_IMG_ID + roleDetail.shape) + ".png";
                            rolenameVisi = true;
                            rolenameText = roleDetail.rolename;
                            levelVisi = true;
                            levelText = roleDetail.level + "";
                            shapeimgVisi = true;
                            shapeimgSkin = RoleInfoModel.getInstance().setZhiyeImg(roleDetail.school);
                            shapeVisi = true;
                            shapeText = modules.createrole.models.LoginModel.getInstance().schoolInfo[roleDetail.school]["name"];
                        }
                        data.push({
                            jiahao_img: { visible: jiahaoVisi },
                            getteam_btn: { visible: getteamVisi },
                            role_img: { visible: roleVisi, skin: roleSkin },
                            rolename_lab: { visible: rolenameVisi, text: rolenameText },
                            level_lab: { visible: levelVisi, text: levelText },
                            shape_img: { visible: shapeimgVisi, skin: shapeimgSkin },
                            shape_lab: { visible: shapeVisi, text: shapeText }
                        });
                    }
                    this._viewUI.roles_list.array = data;
                    this._viewUI.roles_list.repeatX = 1;
                };
                /** 获取战况信息 */
                XianHui3V3Module.prototype.getBattleInfo = function () {
                    this._viewUI.battleinfo_list.visible = false;
                    var arr = [];
                    if (this._viewUI.battles_check.selected) { //只显示自己的战况
                        arr = xianhui.models.XianHuiModel.getInstance().PvP3BattleInfos.get(1);
                    }
                    else {
                        arr = xianhui.models.XianHuiModel.getInstance().PvP3BattleInfos.get(0);
                    }
                    this.battleInfos = [];
                    if (arr && arr.length > 0) {
                        //反转数据的顺序
                        for (var i = arr.length - 1; i >= 0; i--) {
                            this.battleInfos.push(arr[i]);
                        }
                        this._viewUI.battleinfo_list.visible = true;
                        this._viewUI.battleinfo_list.array = this.battleInfos;
                        this._viewUI.battleinfo_list.vScrollBarSkin = "";
                    }
                };
                /** 战况渲染 */
                XianHui3V3Module.prototype.battleHandler = function (cell, index) {
                    var battleHtml = cell.getChildByName("battleinfo_html");
                    if (this.battleInfos.length > 0 && this.battleInfos[index]) {
                        battleHtml.innerHTML = HudModel._instance.promptAssembleBack(this.battleInfos[index].msgId, this.battleInfos[index].parameters);
                    }
                };
                /** 打开队伍界面 */
                XianHui3V3Module.prototype.getTeamView = function () {
                    var _TeamOrganizeMediator = new game.modules.team.TeamOrganizeMediator(this._app);
                    this.hide();
                    LoginModel.getInstance().CommonPage = "zhanxianhui";
                    _TeamOrganizeMediator.onshow(TeamSetType.TIME_ACTIVITY);
                };
                /** 打开排行 */
                XianHui3V3Module.prototype.getRankingView = function () {
                    this.hide();
                    LoginModel.getInstance().CommonPage = "zhanxianhui";
                    this.XianHuiRankMediator.show();
                };
                /** 角色列表渲染 */
                XianHui3V3Module.prototype.rolesHandler = function (cell, index) {
                    var btn = cell.getChildByName("getteam_btn");
                    btn.on(LEvent.CLICK, this, this.getTeamView);
                };
                /** 获取奖励 */
                XianHui3V3Module.prototype.getReward = function (index) {
                    if (!this.PvP3MyInfo)
                        return;
                    switch (index) {
                        case 0:
                            if (this.PvP3MyInfo.firstwin != 1)
                                return;
                            this.ani1.clear();
                            RequesterProtocols._instance.c2s_CPvP3OpenBox(1);
                            this._viewUI.firstwin_img.skin = "common/ui/tongyong/baoxiang0.png";
                            break;
                        case 1:
                            if (this.PvP3MyInfo.tenfight != 1)
                                return;
                            this.ani2.clear();
                            RequesterProtocols._instance.c2s_CPvP3OpenBox(2);
                            this._viewUI.tenfight_img.skin = "common/ui/tongyong/baoxiang0.png";
                            break;
                        case 2:
                            if (this.PvP3MyInfo.eightwin != 1)
                                return;
                            this.ani3.clear();
                            RequesterProtocols._instance.c2s_CPvP3OpenBox(3);
                            this._viewUI.fivewin_img.skin = "common/ui/tongyong/baoxiang0.png";
                            break;
                    }
                };
                /** 点击匹配 */
                XianHui3V3Module.prototype.pipei = function () {
                    this.hide();
                    RequesterProtocols._instance.c2s_CPvP3ReadyFight(1);
                    xianhui.models.XianHuiProxy._instance.once(xianhui.models.REFRESH_MATCHSTATE_EVENT, this, this.XianHuiPipeiMediator.init, [3]);
                };
                /**特效*/
                XianHui3V3Module.prototype.onload = function () {
                    Laya.Animation.createFrames(this.anUrls("xuanzhong", 9), "xuanzhong");
                    this.ani1.play(0, true, "xuanzhong");
                    this.ani1.interval = 112;
                };
                /**特效路径*/
                XianHui3V3Module.prototype.anUrls = function (aniName, length) {
                    var urls = [];
                    for (var index = 1; index <= length; index++) {
                        urls.push("common/ui/tuji/" + aniName + index + ".png");
                    }
                    return urls;
                };
                XianHui3V3Module.prototype.onShow = function (event) {
                    this.show();
                };
                XianHui3V3Module.prototype.show = function () {
                    RequesterProtocols._instance.c2s_CGameTime();
                    modules.mainhud.models.HudProxy.getInstance().once(modules.mainhud.models.SERVER_TIME, this, this.getTime);
                    game.modules.mainhud.models.HudProxy.getInstance().event(game.modules.mainhud.models.OPEN_EVENT);
                };
                XianHui3V3Module.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    if (LoginModel.getInstance().CommonPage != "") {
                        modules.ModuleManager.show(LoginModel.getInstance().CommonPage, this._app);
                        LoginModel.getInstance().CommonPage = "";
                    }
                    game.modules.mainhud.models.HudProxy.getInstance().event(game.modules.mainhud.models.CLOSEVIEW_EVENT);
                };
                XianHui3V3Module.prototype.getView = function () {
                    return this._viewUI;
                };
                return XianHui3V3Module;
            }(game.modules.ModuleMediator));
            xianhui.XianHui3V3Module = XianHui3V3Module;
        })(xianhui = modules.xianhui || (modules.xianhui = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=XianHui3V3Module.js.map