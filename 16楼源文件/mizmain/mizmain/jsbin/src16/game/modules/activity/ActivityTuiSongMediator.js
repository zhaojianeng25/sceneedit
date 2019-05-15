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
            var ActivityTuiSongMediator = /** @class */ (function (_super) {
                __extends(ActivityTuiSongMediator, _super);
                function ActivityTuiSongMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    _this._viewUI = new ui.common.ActivityTuiSongUI();
                    _this._viewUI.mouseThrough = true;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this._viewUI.close_btn.on(LEvent.CLICK, _this, function () {
                        modules.ModuleManager.jumpPage(modules.ModuleNames.ACTIVITY, 1, _this._app);
                        _this.hide();
                    });
                    return _this;
                }
                ActivityTuiSongMediator.prototype.init = function () {
                    var _tuiSongSettingBinDic = ActivityModel.getInstance().TuiSongSettingBinDic;
                    var dateSize = Object.getOwnPropertyNames(_tuiSongSettingBinDic).length;
                    var data = [];
                    var account = LocalStorage.getItem("daowang_userLoginAccount");
                    for (var num in _tuiSongSettingBinDic) {
                        var diban1Visi;
                        var diban2Visi;
                        var tuiSongX = 83;
                        var tuiSongVal = 1;
                        if (parseInt(num) % 2 === 0) {
                            diban1Visi = true;
                            diban2Visi = false;
                        }
                        else {
                            diban1Visi = false;
                            diban2Visi = true;
                        }
                        if (LocalStorage.getItem(account + num) != null && LocalStorage.getItem(account + num).split("_")[0] == "0") {
                            tuiSongX = 38;
                            tuiSongVal = 0;
                        }
                        data.push({
                            diban1_img: { visible: diban1Visi },
                            diban2_img: { visible: diban2Visi },
                            tuiSong_img: { x: tuiSongX },
                            tuiSong_bar: { value: tuiSongVal },
                            huoDongName_lab: { text: _tuiSongSettingBinDic[num].name },
                            huoDongWeek_lab: { text: _tuiSongSettingBinDic[num].day.split("每周").join("") },
                            huoDongTime_lab: { text: _tuiSongSettingBinDic[num].time },
                            huoDongPeople_lab: { text: _tuiSongSettingBinDic[num].pcount },
                        });
                    }
                    this._viewUI.showList_list.array = data;
                    this._viewUI.showList_list.vScrollBarSkin = "";
                    this._viewUI.showList_list.repeatX = 1;
                    this._viewUI.showList_list.scrollBar.elasticBackTime = 500;
                    this._viewUI.showList_list.scrollBar.elasticDistance = 20;
                    this._viewUI.showList_list.renderHandler = new Handler(this, this.dataLoad);
                };
                //数据操作
                ActivityTuiSongMediator.prototype.dataLoad = function (cell, index) {
                    var btn = cell.getChildByName("pro_btn");
                    btn.on(LEvent.MOUSE_DOWN, this, this.onBtn, [cell, index]);
                };
                //消息推送-0为关闭
                ActivityTuiSongMediator.prototype.onBtn = function (cell, index) {
                    var num = index + 2;
                    var img = cell.getChildByName("tuiSong_img");
                    var pro = cell.getChildByName("tuiSong_bar");
                    var lab = cell.getChildByName("huoDongName_lab");
                    var account = LocalStorage.getItem("daowang_userLoginAccount");
                    var view2 = ActivityModel.getInstance().ActivityNewBinDicAtType.get(2);
                    if (LocalStorage.getItem(account + num) != null && LocalStorage.getItem(account + num).split("_")[0] != "0") {
                        var isTuiSong = LocalStorage.getItem(account + num).split("_")[1];
                        var id = LocalStorage.getItem(account + num).split("_")[2];
                        img.x = 38;
                        pro.value = 0;
                        LocalStorage.setItem(account + num, "0_" + isTuiSong + "_" + id);
                    }
                    else {
                        img.x = 83;
                        pro.value = 1;
                        if (LocalStorage.getItem(account + num) != null) {
                            var isTuiSong = LocalStorage.getItem(account + num).split("_")[1];
                            var id = LocalStorage.getItem(account + num).split("_")[2];
                            LocalStorage.setItem(account + num, "1_" + isTuiSong + "_" + id);
                        }
                        else {
                            var newId;
                            for (var i = 0; i < view2.length; i++) {
                                if (view2[i].name == lab.text) {
                                    newId = view2[i].id;
                                    LocalStorage.setItem(account + num, "1_0_" + newId);
                                }
                            }
                        }
                        activity.models.ActivityProxy.getInstance().event(activity.models.TUISONG_EVENT);
                    }
                };
                ActivityTuiSongMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                    this.init();
                };
                ActivityTuiSongMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                ActivityTuiSongMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return ActivityTuiSongMediator;
            }(game.modules.UiMediator));
            activity.ActivityTuiSongMediator = ActivityTuiSongMediator;
        })(activity = modules.activity || (modules.activity = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ActivityTuiSongMediator.js.map