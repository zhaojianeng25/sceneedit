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
* 每日签到
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var reward;
        (function (reward) {
            var SigninMediator = /** @class */ (function (_super) {
                __extends(SigninMediator, _super);
                function SigninMediator(uiLayer) {
                    var _this = _super.call(this, uiLayer) || this;
                    /** 特效 */
                    _this.ani = new Laya.Animation();
                    _this._viewUI = new ui.common.RewardSigninUI();
                    _this._viewUI.mouseThrough = true;
                    _this.isCenter = false;
                    _this._viewUI.SignReward_list.renderHandler = new Handler(_this, _this.renderHandler);
                    return _this;
                }
                /** 每日签到数据加载 */
                SigninMediator.prototype.init = function () {
                    this.fillData();
                    var list = this._viewUI.SignReward_list;
                    var regData = RewardModel.getInstance().regData;
                    var _month = regData.month;
                    this._times = regData.times;
                    this._rewardflag = regData.rewardflag;
                    //可补签的次数-与当前vip等级相关
                    var _suppregtimes = regData.suppregtimes;
                    //可补签的次数-与创号日期有关
                    var _cansuppregtimes = regData.cansuppregtimes;
                    var _itemAttrBinDic = BagModel.getInstance().itemAttrData;
                    var _qianDaoJiangLiBinDic = RewardModel.getInstance().qianDaoJiangLiBinDic;
                    list.repeatX = 4;
                    list.vScrollBarSkin = "";
                    // var date = new Date();
                    // var nowMonth = date.getMonth() + 1;
                    this.monthArr = [];
                    for (var i = 1; i <= this.getDays(_month); i++) {
                        if (i < 10) {
                            this.monthArr.push(_qianDaoJiangLiBinDic[_month + "0" + i]);
                        }
                        else {
                            this.monthArr.push(_qianDaoJiangLiBinDic[_month + "" + i]);
                        }
                    }
                    var skinArr = ["common/ui/tongyong/baikuang.png", "common/ui/tongyong/lvkuang.png",
                        "common/ui/tongyong/lankuang.png", "common/ui/tongyong/zikuang.png",
                        "common/ui/tongyong/jinkuang.png"];
                    var buQianNum = 0;
                    var addLength = 0;
                    if (_suppregtimes > 0 && _cansuppregtimes > 0) {
                        if (this._rewardflag != 1) {
                            buQianNum = this._times + 1;
                        }
                        else {
                            buQianNum = this._times;
                        }
                        if (_suppregtimes < _cansuppregtimes) {
                            addLength = _suppregtimes;
                        }
                        else {
                            addLength = _cansuppregtimes;
                        }
                    }
                    if (this._rewardflag != 1) {
                        this.ani.loadAtlas("common/res/atlas/ui/texiao.atlas", Laya.Handler.create(this, this.onCreateFrame));
                        var img = this._viewUI.SignReward_list.getCell(this._times).getChildByName("signin_img");
                        img.addChild(this.ani);
                        this.ani.scaleX = 0.47;
                        this.ani.scaleY = 0.48;
                    }
                    var data = [];
                    for (var i = 1; i <= this.getDays(_month); i++) {
                        var _itemNum;
                        var _signinSkin;
                        var _showImgVisible = false;
                        var _buQianVisi = false;
                        var _nqualitySkin = skinArr[_itemAttrBinDic[this.monthArr[i - 1].itemId].nquality - 1];
                        var _icon = _itemAttrBinDic[this.monthArr[i - 1].itemId].icon;
                        if (_suppregtimes > 0 && _cansuppregtimes > 0) {
                            if (buQianNum < i && i <= buQianNum + addLength) {
                                _buQianVisi = true;
                            }
                        }
                        if (i <= this._times) {
                            _showImgVisible = true;
                        }
                        if (this.monthArr[i - 1].itemNum > 1) {
                            _itemNum = "X" + this.monthArr[i - 1].itemNum;
                        }
                        else {
                            _itemNum = "";
                        }
                        if (this.monthArr[i - 1].borderpic != null && this.monthArr[i - 1].borderpic !== "") {
                            _signinSkin = "common/ui/reward/hong.png";
                        }
                        else {
                            _signinSkin = "common/ui/reward/lan.png";
                        }
                        data.push({
                            day_lab: { text: i + "天" },
                            show_img: { visible: _showImgVisible },
                            signin_img: { skin: _signinSkin },
                            day_img: { skin: _nqualitySkin },
                            icon_img: { skin: "common/icon/item/" + _icon + ".png" },
                            num_lab: { text: _itemNum },
                            buQian_img: { visible: _buQianVisi },
                        });
                    }
                    list.array = data;
                };
                /** 当月已签次数显示 */
                SigninMediator.prototype.fillData = function () {
                    var regData = RewardModel.getInstance().regData;
                    this._viewUI.times_lab.text = "本月累计签到" + regData.times + "天";
                    this._viewUI.canSuppregTimes_lab.text = "本月剩余补签次数" + regData.suppregtimes + "次";
                };
                /** 每日签到-获取当月总天数 */
                SigninMediator.prototype.getDays = function (month) {
                    var date = new Date();
                    var y = date.getFullYear();
                    if (month == 2) {
                        return y % 4 == 0 ? 29 : 28;
                    }
                    else if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
                        return 31;
                    }
                    else {
                        return 30;
                    }
                };
                /** 每日签到-数据操作 */
                SigninMediator.prototype.renderHandler = function (cell, index) {
                    var btn = cell.getChildByName("day_btn");
                    btn.on(LEvent.MOUSE_DOWN, this, this.signinLoda, [cell, index]);
                };
                /** 领取奖励或物品信息弹窗 */
                SigninMediator.prototype.signinLoda = function (cell, index) {
                    var _this = this;
                    var times = RewardModel.getInstance().regData.times;
                    var suppregtimes = RewardModel.getInstance().regData.suppregtimes;
                    var cansuppregtimes = RewardModel.getInstance().regData.cansuppregtimes;
                    var rewardflag = RewardModel.getInstance().regData.rewardflag;
                    if (index < times || times + 1 <= index) { //信息弹窗
                        var num = -1;
                        if (times + 1 <= index) {
                            num = index - times + 1;
                        }
                        var parame = new Dictionary();
                        parame.set("itemId", this.monthArr[index].itemId);
                        parame.set("parame", [num]);
                        this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.commonItem, parame);
                    }
                    else { //领取奖励
                        if (rewardflag == 1 && suppregtimes == 0)
                            return;
                        if (rewardflag == 1 && cansuppregtimes == 0)
                            return;
                        RequesterProtocols._instance.c2s_CReg(RewardModel.getInstance().regData.month);
                        RewardProxy.getInstance().on(reward.models.REGDATA_EVENT, this, function () {
                            if (_this._rewardflag != 1) {
                                var img = _this._viewUI.SignReward_list.getCell(_this._times).getChildByName("signin_img");
                                img.removeChild(_this.ani);
                            }
                            _this.init();
                            RewardModel.getInstance().pointDic.set(0, 0);
                            RewardProxy.getInstance().event(reward.models.EVERYDAY_EVENT); //发送每日签到
                        });
                    }
                };
                /** 创建领取特效 */
                SigninMediator.prototype.onCreateFrame = function (ani) {
                    var effecthPath = this.getEffectUrls("", 20);
                    Laya.Animation.createFrames(effecthPath, "texiao");
                    this.ani.play(0, true, "texiao");
                    this.ani.interval = 112;
                };
                /** 获取特效资源 */
                SigninMediator.prototype.getEffectUrls = function (aniName, length) {
                    var urls = [];
                    for (var index = 1; index <= length; index++) {
                        urls.push("common/ui/texiao/" + aniName + index + ".png");
                    }
                    return urls;
                };
                SigninMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                    this.init();
                };
                SigninMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                SigninMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return SigninMediator;
            }(game.modules.UiMediator));
            reward.SigninMediator = SigninMediator;
        })(reward = modules.reward || (modules.reward = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=SigninMediator.js.map