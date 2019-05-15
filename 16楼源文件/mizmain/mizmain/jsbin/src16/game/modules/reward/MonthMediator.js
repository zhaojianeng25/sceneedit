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
* 月卡奖励
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var reward;
        (function (reward) {
            var MonthMediator = /** @class */ (function (_super) {
                __extends(MonthMediator, _super);
                function MonthMediator(uiLayer) {
                    var _this = _super.call(this, uiLayer) || this;
                    _this._viewUI = new ui.common.RewardMonthUI();
                    _this._viewUI.mouseThrough = true;
                    _this.isCenter = false;
                    _this._viewUI.buyCard_btn.on(LEvent.MOUSE_DOWN, _this, _this.buyCardHandler);
                    _this._viewUI.getReward_btn.on(LEvent.MOUSE_DOWN, _this, _this.getRewardHandler);
                    _this.btnListener();
                    return _this;
                }
                /** 月卡奖励数据加载 */
                MonthMediator.prototype.init = function () {
                    this.btnHandler();
                    this.monthDay();
                    var _itemAttrBinDic = BagModel.getInstance().itemAttrData;
                    var _monthCardConfigBinDic = RewardModel.getInstance().monthCardConfigBinDic;
                    var skinArr = ["common/ui/tongyong/baikuang.png", "common/ui/tongyong/lvkuang.png",
                        "common/ui/tongyong/lankuang.png", "common/ui/tongyong/zikuang.png",
                        "common/ui/tongyong/jinkuang.png"];
                    for (var i = 1; i <= 5; i++) {
                        var img = this._viewUI.month_box.getChildByName("month_img" + i);
                        var icon = this._viewUI.month_box.getChildByName("icon_img" + i);
                        var lab = this._viewUI.month_box.getChildByName("num_lab" + i);
                        img.skin = skinArr[_itemAttrBinDic[_monthCardConfigBinDic[i].itemid].nquality - 1];
                        icon.skin = this.getSrc(_itemAttrBinDic[_monthCardConfigBinDic[i].itemid].icon);
                        if (_monthCardConfigBinDic[i].itemnum > 1) {
                            lab.text = "X" + _monthCardConfigBinDic[i].itemnum;
                        }
                        else {
                            lab.text = "";
                        }
                    }
                };
                /** 月卡天数计算 */
                MonthMediator.prototype.monthDay = function () {
                    var date = new Date();
                    var nowtime = date.getTime();
                    var endTime = RewardModel.getInstance().monthCard.endtime;
                    var time = Math.floor((endTime - nowtime) / (1000 * 60 * 60 * 24));
                    if (time < 0) {
                        time = 0;
                    }
                    this._viewUI.remainDay_lab.text = "月卡剩余：" + time + "天";
                };
                /** 奖励领取按钮样式判断 */
                MonthMediator.prototype.btnHandler = function () {
                    var grab = RewardModel.getInstance().monthCard.grab;
                    if (grab == 0) {
                        this._viewUI.getReward_btn.disabled = true;
                        this._viewUI.getReward_btn.label = "已领取";
                    }
                    else {
                        this._viewUI.getReward_btn.disabled = false;
                        this._viewUI.getReward_btn.label = "领取奖励";
                    }
                };
                /** 购买月卡 */
                MonthMediator.prototype.buyCardHandler = function () {
                    var _this = this;
                    RequesterProtocols._instance.c2s_CBuyMonthCard();
                    RewardProxy.getInstance().once(reward.models.MONTH_EVENT, this, function () {
                        _this.monthDay();
                        _this.btnHandler();
                    });
                };
                /** 领取月卡奖励 */
                MonthMediator.prototype.getRewardHandler = function () {
                    var _this = this;
                    RequesterProtocols._instance.c2s_CGrabMonthCardRewardAll();
                    RewardProxy.getInstance().once(reward.models.MONTH_EVENT, this, function () {
                        _this.btnHandler();
                    });
                };
                /** 物品弹窗按钮监听 */
                MonthMediator.prototype.btnListener = function () {
                    this._viewUI.month_btn1.on(LEvent.MOUSE_DOWN, this, this.getTips, [1]);
                    this._viewUI.month_btn2.on(LEvent.MOUSE_DOWN, this, this.getTips, [2]);
                    this._viewUI.month_btn3.on(LEvent.MOUSE_DOWN, this, this.getTips, [3]);
                    this._viewUI.month_btn4.on(LEvent.MOUSE_DOWN, this, this.getTips, [4]);
                    this._viewUI.month_btn5.on(LEvent.MOUSE_DOWN, this, this.getTips, [5]);
                };
                /** 物品信息弹窗 */
                MonthMediator.prototype.getTips = function (index) {
                    var _monthCardConfigBinDic = RewardModel.getInstance().monthCardConfigBinDic;
                    var itemId = _monthCardConfigBinDic[index].itemid;
                    var parame = new Dictionary();
                    parame.set("itemId", itemId);
                    this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.commonItem, parame);
                };
                /** 获取物品图标 */
                MonthMediator.prototype.getSrc = function (index) {
                    var src = "";
                    if (index <= 10000) {
                        src = "common/icon/skill/" + index + ".png";
                    }
                    else if (index <= 10500) {
                        src = "common/icon/bustrole/" + index + ".png";
                    }
                    else if (index <= 11000) {
                        src = "common/icon/bustmonster/" + index + ".png";
                    }
                    else if (index <= 11100) {
                        src = "common/icon/bustpartner/" + index + ".png";
                    }
                    else if (index <= 11200) {
                        src = "common/icon/bustmount/" + index + ".png";
                    }
                    else if (index <= 12000) {
                        src = "common/icon/bustpet/" + index + ".png";
                    }
                    else if (index <= 30000) {
                        src = "common/icon/item/" + index + ".png";
                    }
                    else if (index <= 30500) {
                        src = "common/icon/avatarrole/" + index + ".png";
                    }
                    else if (index <= 31000) {
                        src = "common/icon/avatarmonster/" + index + ".png";
                    }
                    else if (index <= 31100) {
                        src = "common/icon/avatarpartner/" + index + ".png";
                    }
                    else if (index <= 31200) {
                        src = "common/icon/avatarmount/" + index + ".png";
                    }
                    else if (index <= 32000) {
                        src = "common/icon/avatarpet/" + index + ".png";
                    }
                    else if (index <= 40500) {
                        src = "common/icon/grayavatarrole/" + index + ".png";
                    }
                    else if (index <= 41000) {
                        src = "common/icon/grayavatarmonster/" + index + ".png";
                    }
                    else if (index <= 41100) {
                        src = "common/icon/grayavatarpartner/" + index + ".png";
                    }
                    else if (index <= 41200) {
                        src = "common/icon/grayavatarmount/" + index + ".png";
                    }
                    else if (index <= 42000) {
                        src = "common/icon/grayavatarpet/" + index + ".png";
                    }
                    return src;
                };
                MonthMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                    this.init();
                };
                MonthMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                MonthMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return MonthMediator;
            }(game.modules.UiMediator));
            reward.MonthMediator = MonthMediator;
        })(reward = modules.reward || (modules.reward = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=MonthMediator.js.map