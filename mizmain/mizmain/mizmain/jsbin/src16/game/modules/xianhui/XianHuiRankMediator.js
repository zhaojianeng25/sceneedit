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
* 战仙会PVP3排行榜
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var xianhui;
        (function (xianhui) {
            var XianHuiRankMediator = /** @class */ (function (_super) {
                __extends(XianHuiRankMediator, _super);
                function XianHuiRankMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    _this._viewUI = new ui.common.ZhanXianHuiPaiHangUI();
                    _this.isCenter = true;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, _this, _this.hide);
                    _this._viewUI.btns_tab.selectHandler = new Handler(_this, _this.cutView);
                    xianhui.models.XianHuiProxy._instance.on(xianhui.models.REFRESH_PVP3RANKING_EVENT, _this, _this.getData);
                    return _this;
                }
                /** 设置界面，默认本次排行 */
                XianHuiRankMediator.prototype.cutView = function (index) {
                    RequesterProtocols._instance.c2s_CPvP3RankingList(index);
                    this._viewUI.btns_tab.selectedIndex = index;
                };
                /** 设置界面数据 */
                XianHuiRankMediator.prototype.getData = function () {
                    this._viewUI.ranking_list.visible = false;
                    this._viewUI.rankingNum_lab.text = "";
                    this._viewUI.name_lab.text = "";
                    this._viewUI.level_lab.text = "";
                    if (!xianhui.models.XianHuiModel._instance.PvP3Ranking)
                        return;
                    var rankings = xianhui.models.XianHuiModel._instance.PvP3Ranking.get(this._viewUI.btns_tab.selectedIndex);
                    //自己的名次
                    var myScore = rankings[1][0];
                    //排行数据
                    var roleScores = rankings[0];
                    if (!myScore || !roleScores)
                        return;
                    this._viewUI.ranking_list.visible = true;
                    this._viewUI.rankingNum_lab.text = myScore.index + "";
                    this._viewUI.name_lab.text = myScore.rolename + "";
                    this._viewUI.level_lab.text = myScore.score + "";
                    var data = [];
                    for (var i = 0; i < roleScores.length; i++) {
                        var tubiaoVisi = false;
                        var tubiaoSkin = "common/ui/paihangbang/diyiditu.png";
                        var rankingNumVisi = true;
                        var rankingNum = i + 1 + "";
                        var ditu1Visi = false;
                        var ditu2Visi = false;
                        if (i < 3) {
                            tubiaoVisi = true;
                            rankingNumVisi = false;
                            if (i == 1)
                                tubiaoSkin = "common/ui/paihangbang/dierditu.png";
                            if (i == 2)
                                tubiaoSkin = "common/ui/paihangbang/disanditu.png";
                        }
                        if (i == 0 || i % 2 == 0) {
                            ditu1Visi = true;
                        }
                        else {
                            ditu2Visi = true;
                        }
                        data.push({
                            tubiao_img: { visible: tubiaoVisi, skin: tubiaoSkin },
                            rankingNum_lab: { visible: rankingNumVisi, text: rankingNum },
                            name_lab: { text: roleScores[i].rolename },
                            jifen_lab: { text: roleScores[i].score },
                            ditu1_img: { visible: ditu1Visi },
                            ditu2_img: { visible: ditu2Visi }
                        });
                    }
                    this._viewUI.ranking_list.array = data;
                    this._viewUI.ranking_list.repeatX = 1;
                };
                XianHuiRankMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                    this.cutView(0);
                    game.modules.mainhud.models.HudProxy.getInstance().event(game.modules.mainhud.models.OPEN_EVENT);
                };
                XianHuiRankMediator.prototype.hide = function () {
                    game.modules.mainhud.models.HudProxy.getInstance().event(game.modules.mainhud.models.CLOSEVIEW_EVENT);
                    _super.prototype.hide.call(this);
                    if (LoginModel.getInstance().CommonPage != "") {
                        modules.ModuleManager.show(LoginModel.getInstance().CommonPage, this._app);
                        LoginModel.getInstance().CommonPage = "";
                    }
                };
                XianHuiRankMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return XianHuiRankMediator;
            }(game.modules.UiMediator));
            xianhui.XianHuiRankMediator = XianHuiRankMediator;
        })(xianhui = modules.xianhui || (modules.xianhui = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=XianHuiRankMediator.js.map