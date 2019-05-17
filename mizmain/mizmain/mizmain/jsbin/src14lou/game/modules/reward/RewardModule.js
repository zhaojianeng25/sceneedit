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
* 奖励主窗口
*/
var RewardModel = game.modules.reward.models.RewardModel;
var RewardProxy = game.modules.reward.models.RewardProxy;
var game;
(function (game) {
    var modules;
    (function (modules) {
        var reward;
        (function (reward) {
            var RewardModule = /** @class */ (function (_super) {
                __extends(RewardModule, _super);
                function RewardModule(app) {
                    var _this = _super.call(this) || this;
                    _this.uiLayer = app.uiRoot.general;
                    _this._viewUI = new ui.common.RewardUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this._chargeMediator = new reward.ChargeMediator(_this._viewUI);
                    _this._levelUpMediator = new reward.LevelUpMediator(_this._viewUI);
                    _this._monthMediator = new reward.MonthMediator(_this._viewUI);
                    _this._newPlayMediator = new reward.NewPlayMediator(_this._viewUI);
                    _this._phoneMediator = new reward.PhoneMediator(_this._viewUI);
                    _this._sevenDayMediator = new reward.SevenDayMediator(_this._viewUI);
                    _this._signinMediator = new reward.SigninMediator(_this._viewUI);
                    _this._chargeMediator.app = _this._app;
                    _this._levelUpMediator.app = _this._app;
                    _this._monthMediator.app = _this._app;
                    _this._newPlayMediator.app = _this._app;
                    _this._phoneMediator.app = _this._app;
                    _this._sevenDayMediator.app = _this._app;
                    _this._signinMediator.app = _this._app;
                    _this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, _this, _this.clickCloseBtn);
                    _this._viewUI.btns_list.renderHandler = new Handler(_this, _this.onSelect);
                    _this.eventListener();
                    return _this;
                }
                /**初始化界面 */
                RewardModule.prototype.initUI = function () {
                    for (var i = 0; i < 6; i++) {
                        if (RewardModel.getInstance().pointDic.get(i) != 0) {
                            var pointImg = this._viewUI.btns_list.getCell(i).getChildByName("point_img");
                            pointImg.visible = true;
                        }
                    }
                };
                /**注册事件监听 */
                RewardModule.prototype.eventListener = function () {
                    reward.models.RewardProxy.getInstance().on(reward.models.NEWPLAYERPOINT_EVENT, this, this.onnewplayerPoint);
                    reward.models.RewardProxy.getInstance().on(reward.models.NEWPLAYERGET_EVENT, this, this.onnewplayerGet);
                    reward.models.RewardProxy.getInstance().on(reward.models.EVERYDAY_EVENT, this, this.oneveryDay);
                    reward.models.RewardProxy.getInstance().on(reward.models.SEVENDAY_EVENT, this, this.onsevenDay);
                    reward.models.RewardProxy.getInstance().on(reward.models.LEVELUP_EVENT, this, this.onlevelUp);
                    reward.models.RewardProxy.getInstance().on(reward.models.STATE_EVENT, this, this.changeText);
                    reward.models.RewardProxy.getInstance().on(reward.models.REFRESH, this, this.init, [rewardBtnType.SIGNIN]);
                };
                /**升级礼包红点隐藏 */
                RewardModule.prototype.onlevelUp = function () {
                    var pointImg = this._viewUI.btns_list.getCell(5).getChildByName("point_img");
                    pointImg.visible = false;
                    this.hideRewardPoint();
                };
                /**七日签到红点隐藏 */
                RewardModule.prototype.onsevenDay = function () {
                    var pointImg = this._viewUI.btns_list.getCell(3).getChildByName("point_img");
                    pointImg.visible = false;
                    this.hideRewardPoint();
                };
                /**主界面奖励系统红点隐藏 */
                RewardModule.prototype.hideRewardPoint = function () {
                    var key = true;
                    for (var i = 0; i < 6; i++) {
                        if (RewardModel.getInstance().pointDic.get(i) != 0) {
                            key = false;
                        }
                    }
                    if (key) {
                        RewardProxy.getInstance().event(reward.models.REWARDPOINT_EVENT); //主界面奖励系统红点隐藏
                    }
                };
                /**每日签到红点隐藏 */
                RewardModule.prototype.oneveryDay = function () {
                    var pointImg = this._viewUI.btns_list.getCell(0).getChildByName("point_img");
                    pointImg.visible = false;
                    this.hideRewardPoint();
                };
                /**新手礼包红点 */
                RewardModule.prototype.onnewplayerPoint = function () {
                    var pointImg = this._viewUI.btns_list.getCell(4).getChildByName("point_img");
                    pointImg.visible = true;
                };
                /**新手礼包红点隐藏 */
                RewardModule.prototype.onnewplayerGet = function () {
                    var pointImg = this._viewUI.btns_list.getCell(4).getChildByName("point_img");
                    pointImg.visible = false;
                    this.hideRewardPoint();
                };
                /** 改变首充礼包文字监听 */
                RewardModule.prototype.changeText = function () {
                    var lab = this._viewUI.btns_list.getCell(rewardBtnType.CHARGE).getChildByName("btns_lab");
                    if (RewardModel.getInstance().state > 1) {
                        lab.text = "贵礼包";
                    }
                    else {
                        lab.text = "首充礼包";
                    }
                };
                RewardModule.prototype.init = function (index) {
                    if (this.selectIndex != undefined) {
                        this.viewHide();
                    }
                    this.selectIndex = -1;
                    //_rewardType中相对应的模块的isShow为0时，表示该模块不显示
                    var _rewardType = RewardModel.getInstance().rewardType;
                    //------------手机关联功能暂时关闭--------------
                    /** 是否显示手机关联 */
                    // RequesterProtocols._instance.c2s_CGetBindTel();
                    // RewardProxy.getInstance().once(models.GETBINDTEL_EVENT, this, () => {
                    // 	if (RewardModel.getInstance().bindTel.isGetBindTelAward != 0) {
                    _rewardType.get(rewardBtnType.PHONE).isShow = 0;
                    // } else {
                    // 	_rewardType.get(rewardBtnType.PHONE).isShow = 1;
                    // }
                    // });
                    //是否显示升级礼包
                    var itemId = this.getBagItemId();
                    if (itemId == 0) {
                        _rewardType.get(rewardBtnType.LEVELUP).isShow = 0;
                    }
                    else {
                        this.levelUpItemId = itemId;
                        this._levelUpMediator.init(this.levelUpItemId);
                        _rewardType.get(rewardBtnType.LEVELUP).isShow = 1;
                    }
                    //是否显示 首充/贵礼包
                    var vipInfo = RewardModel.getInstance().vipInfo;
                    if (vipInfo.viplevel == 11 && vipInfo.gotbounus == vipInfo.bounus) {
                        _rewardType.get(rewardBtnType.CHARGE).isShow = 0;
                    }
                    //是否显示七日签到
                    if (!RewardModel.getInstance().mulDayLogin) {
                        _rewardType.get(rewardBtnType.SEVENDAY).isShow = 0;
                    }
                    else if (RewardModel.getInstance().mulDayLogin.logindays >= 7) {
                        for (var i = 0; i < RewardModel.getInstance().mulDayLogin.rewardmap.values.length; i++) {
                            if (RewardModel.getInstance().mulDayLogin.rewardmap.values[i] == 0) {
                                _rewardType.get(rewardBtnType.SEVENDAY).isShow = 1;
                                break;
                            }
                            if (i == RewardModel.getInstance().mulDayLogin.rewardmap.values.length - 1 && RewardModel.getInstance().mulDayLogin.rewardmap.values[i] != 0) {
                                _rewardType.get(rewardBtnType.SEVENDAY).isShow = 0;
                            }
                        }
                    }
                    else {
                        _rewardType.get(rewardBtnType.SEVENDAY).isShow = 1;
                    }
                    //是否显示新手奖励
                    if (RewardModel.getInstance().awardid == -1 || !RewardModel.getInstance().awardid) {
                        _rewardType.get(rewardBtnType.NEWPLAYER).isShow = 0;
                    }
                    this.rewardBtns = [];
                    for (var i = 0; i < _rewardType.keys.length; i++) {
                        if (_rewardType.get(i).isShow != 0) {
                            this.rewardBtns.push(_rewardType.get(i));
                        }
                    }
                    var data = [];
                    for (var i = 0; i < this.rewardBtns.length; i++) {
                        var name = this.rewardBtns[i].name;
                        if (this.rewardBtns[rewardBtnType.CHARGE].type == i && RewardModel.getInstance().state <= 1) {
                            name = "首充礼包";
                        }
                        data.push({
                            cell_btn: { selected: false },
                            btns_img: { skin: this.rewardBtns[i].skin },
                            btns_lab: { text: name },
                        });
                    }
                    this._viewUI.btns_list.array = data;
                    for (var i = 0; i < this.rewardBtns.length; i++) {
                        if (this.rewardBtns[i].type == index) {
                            this.cutView(i);
                        }
                    }
                };
                /** 当前选中的模块按钮监听 */
                RewardModule.prototype.onSelect = function (cell, index) {
                    var btn = cell.getChildByName("cell_btn");
                    btn.on(LEvent.MOUSE_DOWN, this, this.cutView, [index]);
                };
                /** 按钮样式设置并切换界面 */
                RewardModule.prototype.cutView = function (index) {
                    if (this.selectIndex != index) {
                        if (this.selectIndex != -1) {
                            this.viewHide();
                            var data = { cell_btn: { selected: false } };
                            this._viewUI.btns_list.setItem(this.selectIndex, data);
                        }
                        var data = { cell_btn: { selected: true } };
                        this._viewUI.btns_list.setItem(index, data);
                        this.selectIndex = index;
                        this.viewShow(index);
                    }
                };
                /** 界面显示 */
                RewardModule.prototype.viewShow = function (index) {
                    var _this = this;
                    var num = this.rewardBtns[index].type;
                    switch (num) {
                        case rewardBtnType.SIGNIN:
                            RequesterProtocols._instance.c2s_queryregdata();
                            RewardProxy.getInstance().once(reward.models.REGDATA_EVENT, this, function () {
                                _this._signinMediator.show();
                            });
                            break;
                        case rewardBtnType.CHARGE:
                            // RequesterProtocols._instance.c2s_CRequestVipInfo();
                            // RewardProxy.getInstance().once(models.VIP_EVENT, this, () => {
                            this._chargeMediator.show();
                            // });
                            break;
                        case rewardBtnType.MONTH:
                            // RequesterProtocols._instance.c2s_CRequestMonthCard();
                            // RewardProxy.getInstance().once(models.MONTH_EVENT, this, () => {
                            this._monthMediator.show();
                            // });
                            break;
                        case rewardBtnType.SEVENDAY:
                            this._sevenDayMediator.show();
                            break;
                        case rewardBtnType.NEWPLAYER:
                            this._newPlayMediator.show();
                            break;
                        case rewardBtnType.PHONE:
                            this._phoneMediator.show();
                            break;
                        case rewardBtnType.LEVELUP:
                            this._levelUpMediator.init(this.levelUpItemId);
                            this._levelUpMediator.show();
                            break;
                    }
                };
                /** 界面隐藏 */
                RewardModule.prototype.viewHide = function () {
                    var type = this.rewardBtns[this.selectIndex].type;
                    switch (type) {
                        case rewardBtnType.SIGNIN:
                            this._signinMediator.hide();
                            break;
                        case rewardBtnType.CHARGE:
                            this._chargeMediator.hide();
                            break;
                        case rewardBtnType.MONTH:
                            this._monthMediator.hide();
                            break;
                        case rewardBtnType.SEVENDAY:
                            this._sevenDayMediator.hide();
                            break;
                        case rewardBtnType.NEWPLAYER:
                            this._newPlayMediator.hide();
                            break;
                        case rewardBtnType.PHONE:
                            this._phoneMediator.hide();
                            break;
                        case rewardBtnType.LEVELUP:
                            this._levelUpMediator.hide();
                            break;
                    }
                };
                /** 判断背包中是否有升级礼包，没有不显示该模块的入口 */
                RewardModule.prototype.getBagItemId = function () {
                    var bagArr = game.modules.bag.models.BagModel.getInstance().getBagGameItemData(BagTypes.BAG).items;
                    if (bagArr.length <= 0)
                        return 0;
                    for (var i = 0; i < bagArr.length; i++) {
                        var id = bagArr[i].id;
                        if (id >= 105000 && id <= 105009) {
                            return id;
                        }
                    }
                    return 0;
                };
                RewardModule.prototype.onShow = function (event) {
                    var _this = this;
                    RequesterProtocols._instance.c2s_CRequestVipInfo();
                    RewardProxy.getInstance().once(reward.models.VIP_EVENT, this, function () {
                        _this._app.uiRoot.closeLoadProgress();
                        modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.OPEN_EVENT);
                        _this.init(rewardBtnType.SIGNIN);
                        _this.show();
                        _this.initUI();
                    });
                    // RequesterProtocols._instance.c2s_queryregdata();
                    // RewardProxy.getInstance().once(game.modules.reward.models.REGDATA_EVENT, RewardProxy.getInstance(), () => {
                    // mainhud.models.HudProxy.getInstance().event(mainhud.models.OPEN_EVENT);
                    // this.init(rewardBtnType.SIGNIN);
                    // this.show();
                    // this.initUI();
                    // });
                };
                RewardModule.prototype.show = function () {
                    _super.prototype.show.call(this);
                };
                RewardModule.prototype.clickCloseBtn = function () {
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.CLOSEVIEW_EVENT);
                    this.hide();
                };
                RewardModule.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    if (LoginModel.getInstance().CommonPage != "") {
                        modules.ModuleManager.show(LoginModel.getInstance().CommonPage, this._app);
                        LoginModel.getInstance().CommonPage = "";
                    }
                };
                RewardModule.prototype.getView = function () {
                    return this._viewUI;
                };
                RewardModule.prototype.onJump = function (event) {
                    this.jumpPage(event);
                };
                RewardModule.prototype.jumpPage = function (index) {
                    var _this = this;
                    RequesterProtocols._instance.c2s_CRequestVipInfo();
                    RewardProxy.getInstance().once(reward.models.VIP_EVENT, this, function () {
                        _this.init(index);
                        _this.show();
                    });
                };
                return RewardModule;
            }(game.modules.ModuleMediator));
            reward.RewardModule = RewardModule;
        })(reward = modules.reward || (modules.reward = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=RewardModule.js.map