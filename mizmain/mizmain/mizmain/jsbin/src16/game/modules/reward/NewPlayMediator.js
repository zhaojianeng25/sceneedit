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
* NewPlayMediator
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var reward;
        (function (reward) {
            var NewPlayMediator = /** @class */ (function (_super) {
                __extends(NewPlayMediator, _super);
                function NewPlayMediator(uiLayer) {
                    var _this = _super.call(this, uiLayer) || this;
                    _this.timeNum = 1; //领取的次数,从1开始
                    _this._viewUI = new ui.common.RewardNewPlayUI();
                    _this._viewUI.mouseThrough = true;
                    _this.isCenter = false;
                    _this._viewUI.getNewPlayerReward_btn.on(LEvent.MOUSE_DOWN, _this, _this.getTimeReward);
                    _this._viewUI.timeTips_btn.on(LEvent.MOUSE_DOWN, _this, _this.getTips);
                    return _this;
                }
                /** 领取新手奖励 */
                NewPlayMediator.prototype.getTimeReward = function () {
                    var _this = this;
                    RequesterProtocols._instance.c2s_CGetTime_Award(this.timeNum);
                    RewardProxy.getInstance().once(reward.models.TIMEAWARD_EVENT, this, function () {
                        _this.timeOut();
                        RewardModel.getInstance().pointDic.set(4, 0);
                        //发送新手礼包领取事件
                        RewardProxy.getInstance().event(reward.models.NEWPLAYERGET_EVENT);
                    });
                };
                /** 新手奖励数据加载 */
                NewPlayMediator.prototype.timeOut = function () {
                    var _itemAttrBinDic = BagModel.getInstance().itemAttrData;
                    var _onLineGiftBinDic = RewardModel.getInstance().onLineGiftBinDic;
                    this.timeNum = RewardModel.getInstance().awardid;
                    var skinArr = ["common/ui/tongyong/baikuang.png", "common/ui/tongyong/lvkuang.png",
                        "common/ui/tongyong/lankuang.png", "common/ui/tongyong/zikuang.png",
                        "common/ui/tongyong/jinkuang.png"];
                    var _waittime;
                    if (this.timeNum == -1) {
                        this.timeNum = 7;
                        this._viewUI.getNewPlayerReward_btn.disabled = true;
                        this._viewUI.getNewPlayerReward_btn.label = "已领取";
                    }
                    else {
                        var nowTime = new Date().getTime();
                        if (RewardModel.getInstance().endtime - nowTime <= 0) {
                            _waittime = 0;
                        }
                        else {
                            _waittime = RewardModel.getInstance().endtime - nowTime;
                        }
                        if (Math.floor(_waittime / 60000) < 1) {
                            this.minutes = 0;
                            this.seconds = Math.floor(_waittime / 1000);
                        }
                        else {
                            this.minutes = Math.floor(_waittime / 60000);
                            this.seconds = Math.floor((_waittime - this.minutes * 60000) / 1000);
                        }
                        this._viewUI.getNewPlayerReward_btn.label = "领取奖励";
                        if (_waittime == 0) {
                            this._viewUI.getNewPlayerReward_btn.disabled = false;
                        }
                        else {
                            this._viewUI.getNewPlayerReward_btn.disabled = true;
                        }
                        Laya.timer.loop(1000, this, this.onLoop);
                    }
                    var _num;
                    if (_onLineGiftBinDic[this.timeNum].itemnum1 > 1) {
                        _num = "" + _onLineGiftBinDic[this.timeNum].itemnum1;
                    }
                    else {
                        _num = "";
                    }
                    var _icon = _itemAttrBinDic[_onLineGiftBinDic[this.timeNum].itemidnew1].icon;
                    var _diban = skinArr[_itemAttrBinDic[_onLineGiftBinDic[this.timeNum].itemidnew1].nquality - 1];
                    this._viewUI.icon_img.skin = this.getSrc(_icon);
                    this._viewUI.num_lab.text = _num;
                    this._viewUI.diban_img.skin = _diban;
                };
                /** 倒计时显示设置 */
                NewPlayMediator.prototype.onLoop = function () {
                    if (this.minutes <= -1) {
                        this.seconds = 0;
                        Laya.timer.clear(this, this.onLoop);
                        this._viewUI.getNewPlayerReward_btn.disabled = false;
                        return;
                    }
                    var _minutes;
                    var _seconds;
                    if (this.minutes < 10) {
                        _minutes = "0" + this.minutes;
                    }
                    else {
                        _minutes = "" + this.minutes;
                    }
                    if (this.seconds < 10) {
                        _seconds = "0" + this.seconds;
                    }
                    else {
                        _seconds = "" + this.seconds;
                    }
                    this._viewUI.daojishi_label.text = _minutes + ":" + _seconds;
                    if (this.seconds <= 0) {
                        this.minutes--;
                        this.seconds = 60;
                    }
                    this.seconds--;
                };
                /** 获取物品图标 */
                NewPlayMediator.prototype.getSrc = function (index) {
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
                /** 物品信息弹窗 */
                NewPlayMediator.prototype.getTips = function () {
                    var _onLineGiftBinDic = RewardModel.getInstance().onLineGiftBinDic;
                    var itemId = _onLineGiftBinDic[this.timeNum].itemidnew1;
                    var parame = new Dictionary();
                    parame.set("itemId", itemId);
                    this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.commonItem, parame);
                };
                NewPlayMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                    this.timeOut();
                };
                NewPlayMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                NewPlayMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return NewPlayMediator;
            }(game.modules.UiMediator));
            reward.NewPlayMediator = NewPlayMediator;
        })(reward = modules.reward || (modules.reward = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=NewPlayMediator.js.map