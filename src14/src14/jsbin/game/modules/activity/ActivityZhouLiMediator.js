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
* ActivityZhouLiMediator
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var activity;
        (function (activity) {
            var ActivityZhouLiMediator = /** @class */ (function (_super) {
                __extends(ActivityZhouLiMediator, _super);
                function ActivityZhouLiMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    _this._viewUI = new ui.common.ActivityZhouLiUI();
                    _this._viewUI.mouseThrough = true;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this._viewUI.close_btn.on(LEvent.CLICK, _this, function () {
                        modules.ModuleManager.jumpPage(modules.ModuleNames.ACTIVITY, 1, _this._app);
                        _this.hide();
                    });
                    var date1 = new Date();
                    _this.day = date1.getDay();
                    Laya.timer.loop(1000, _this, function () {
                        var date2 = new Date();
                        if (date2.getDay() == _this.day)
                            return;
                        _this.day = date2.getDay();
                        _this.init();
                    });
                    _this._viewUI.huoDongMon_List.renderHandler = new Handler(_this, _this.getTips1);
                    _this._viewUI.huoDongTue_List.renderHandler = new Handler(_this, _this.getTips2);
                    _this._viewUI.huoDongWed_List.renderHandler = new Handler(_this, _this.getTips3);
                    _this._viewUI.huoDongThu_List.renderHandler = new Handler(_this, _this.getTips4);
                    _this._viewUI.huoDongFri_List.renderHandler = new Handler(_this, _this.getTips5);
                    _this._viewUI.huoDongSat_List.renderHandler = new Handler(_this, _this.getTips6);
                    _this._viewUI.huoDongSun_List.renderHandler = new Handler(_this, _this.getTips7);
                    return _this;
                }
                ActivityZhouLiMediator.prototype.init = function () {
                    var _weekListBinDic = ActivityModel.getInstance().WeekListBinDic;
                    var _activityNewBinDic = ActivityModel.getInstance().ActivityNewBinDic;
                    for (var i = 1; i <= 7; i++) {
                        var list = this.getList(i);
                        var data = [];
                        for (var j = 1; j <= 5; j++) {
                            var id = this.getId(j, _weekListBinDic[i]);
                            var bgVisi = true;
                            var name;
                            var btn = list.getCell(j - 1).getChildByName("getTips_btn" + i);
                            if (_activityNewBinDic[id] != undefined && _activityNewBinDic[id] != null) {
                                name = _activityNewBinDic[id].name;
                                btn.visible = true;
                            }
                            else {
                                name = "";
                                btn.visible = false;
                            }
                            if (i == this.day) {
                                var time_lab = this._viewUI.time_list.getCell(j - 1).getChildByName("time_lab");
                                time_lab.text = this.getTime(j, _weekListBinDic[i]);
                                bgVisi = false;
                            }
                            data.push({
                                huoDongBg_img: { visible: bgVisi },
                                huoDongName_lab: { text: name }
                            });
                        }
                        list.array = data;
                    }
                };
                ActivityZhouLiMediator.prototype.getList = function (index) {
                    var list;
                    switch (index) {
                        case 1:
                            list = this._viewUI.huoDongMon_List;
                            break;
                        case 2:
                            list = this._viewUI.huoDongTue_List;
                            break;
                        case 3:
                            list = this._viewUI.huoDongWed_List;
                            break;
                        case 4:
                            list = this._viewUI.huoDongThu_List;
                            break;
                        case 5:
                            list = this._viewUI.huoDongFri_List;
                            break;
                        case 6:
                            list = this._viewUI.huoDongSat_List;
                            break;
                        case 7:
                            list = this._viewUI.huoDongSun_List;
                            break;
                    }
                    return list;
                };
                ActivityZhouLiMediator.prototype.getId = function (index, _weekListBinDic) {
                    var time;
                    switch (index) {
                        case 1:
                            time = _weekListBinDic.time1;
                            break;
                        case 2:
                            time = _weekListBinDic.time2;
                            break;
                        case 3:
                            time = _weekListBinDic.time3;
                            break;
                        case 4:
                            time = _weekListBinDic.time4;
                            break;
                        case 5:
                            time = _weekListBinDic.time5;
                            break;
                    }
                    return time;
                };
                ActivityZhouLiMediator.prototype.getTime = function (index, _weekListBinDic) {
                    var text;
                    switch (index) {
                        case 1:
                            text = _weekListBinDic.text1;
                            break;
                        case 2:
                            text = _weekListBinDic.text2;
                            break;
                        case 3:
                            text = _weekListBinDic.text3;
                            break;
                        case 4:
                            text = _weekListBinDic.text4;
                            break;
                        case 5:
                            text = _weekListBinDic.text5;
                            break;
                    }
                    return text;
                };
                ActivityZhouLiMediator.prototype.getTips1 = function (cell, index) {
                    var btn = cell.getChildByName("getTips_btn1");
                    btn.on(LEvent.MOUSE_DOWN, this, this.btnHandler, [cell, index, 1]);
                };
                ActivityZhouLiMediator.prototype.getTips2 = function (cell, index) {
                    var btn = cell.getChildByName("getTips_btn2");
                    btn.on(LEvent.MOUSE_DOWN, this, this.btnHandler, [cell, index, 2]);
                };
                ActivityZhouLiMediator.prototype.getTips3 = function (cell, index) {
                    var btn = cell.getChildByName("getTips_btn3");
                    btn.on(LEvent.MOUSE_DOWN, this, this.btnHandler, [cell, index, 3]);
                };
                ActivityZhouLiMediator.prototype.getTips4 = function (cell, index) {
                    var btn = cell.getChildByName("getTips_btn4");
                    btn.on(LEvent.MOUSE_DOWN, this, this.btnHandler, [cell, index, 4]);
                };
                ActivityZhouLiMediator.prototype.getTips5 = function (cell, index) {
                    var btn = cell.getChildByName("getTips_btn5");
                    btn.on(LEvent.MOUSE_DOWN, this, this.btnHandler, [cell, index, 5]);
                };
                ActivityZhouLiMediator.prototype.getTips6 = function (cell, index) {
                    var btn = cell.getChildByName("getTips_btn6");
                    btn.on(LEvent.MOUSE_DOWN, this, this.btnHandler, [cell, index, 6]);
                };
                ActivityZhouLiMediator.prototype.getTips7 = function (cell, index) {
                    var btn = cell.getChildByName("getTips_btn7");
                    btn.on(LEvent.MOUSE_DOWN, this, this.btnHandler, [cell, index, 7]);
                };
                ActivityZhouLiMediator.prototype.btnHandler = function (cell, index, day) {
                    var _weekListBinDic = ActivityModel.getInstance().WeekListBinDic;
                    var _activityNewBinDic = ActivityModel.getInstance().ActivityNewBinDic;
                    var id = this.getId(index + 1, _weekListBinDic[day]);
                    var parame = new Dictionary();
                    parame.set("itemId", id);
                    this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.ACTIVITY, parame);
                };
                ActivityZhouLiMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                    this.init();
                };
                ActivityZhouLiMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    if (LoginModel.getInstance().CommonPage != "") {
                        modules.ModuleManager.show(LoginModel.getInstance().CommonPage, this._app);
                        LoginModel.getInstance().CommonPage = "";
                    }
                };
                ActivityZhouLiMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return ActivityZhouLiMediator;
            }(game.modules.UiMediator));
            activity.ActivityZhouLiMediator = ActivityZhouLiMediator;
        })(activity = modules.activity || (modules.activity = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ActivityZhouLiMediator.js.map