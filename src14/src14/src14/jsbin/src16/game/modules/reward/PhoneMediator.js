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
* 手机关联显示
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var reward;
        (function (reward) {
            var PhoneMediator = /** @class */ (function (_super) {
                __extends(PhoneMediator, _super);
                function PhoneMediator(uiLayer) {
                    var _this = _super.call(this, uiLayer) || this;
                    _this._viewUI = new ui.common.RewardPhoneUI();
                    _this._viewUI.mouseThrough = true;
                    _this.isCenter = false;
                    _this._viewUI.goRelationPhone_btn.on(LEvent.MOUSE_DOWN, _this, _this.cutView);
                    _this._viewUI.getPhoneReward_btn.on(LEvent.MOUSE_DOWN, _this, function () {
                        RequesterProtocols._instance.c2s_CGetBindTelAward();
                        RewardProxy.getInstance().on(reward.models.BINDTELAWARD_EVENT, _this, function () {
                            _this.hide();
                        });
                    });
                    return _this;
                }
                /** 手机关联数据加载 */
                PhoneMediator.prototype.init = function () {
                    var _itemAttrBinDic = BagModel.getInstance().itemAttrData;
                    var _bindTelAwardBinDic = RewardModel.getInstance().bindTelAwardBinDic;
                    if (RewardModel.getInstance().bindTel.tel != 0) {
                        this._viewUI.getPhoneReward_btn.visible = true;
                        this._viewUI.goRelationPhone_btn.visible = false;
                    }
                    else {
                        this._viewUI.getPhoneReward_btn.visible = false;
                        this._viewUI.goRelationPhone_btn.visible = true;
                    }
                    if (RewardModel.getInstance().bindTel.isGetBindTelAward != 0) {
                        this._viewUI.getPhoneReward_btn.disabled = true;
                        this._viewUI.getPhoneReward_btn.label = "已领取";
                    }
                    else {
                        this._viewUI.getPhoneReward_btn.disabled = false;
                        this._viewUI.getPhoneReward_btn.label = "领取奖励";
                    }
                    var skinArr = ["common/ui/tongyong/baikuang.png", "common/ui/tongyong/lvkuang.png",
                        "common/ui/tongyong/lankuang.png", "common/ui/tongyong/zikuang.png",
                        "common/ui/tongyong/jinkuang.png"];
                    var _icon = _itemAttrBinDic[_bindTelAwardBinDic[1].itemid[1]].icon;
                    var _diban = skinArr[_itemAttrBinDic[_bindTelAwardBinDic[1].itemid[1]].nquality - 1];
                    this._viewUI.diban_img.skin = _diban;
                    this._viewUI.icon_img.skin = this.getSrc(_icon);
                    if (_bindTelAwardBinDic[1].itemnum[1] > 1) {
                        this._viewUI.num_lab.text = "X" + _bindTelAwardBinDic[1].itemnum[1];
                    }
                    else {
                        this._viewUI.num_lab.text = "";
                    }
                    this._viewUI.getPhoneReward_btn.visible = false;
                };
                PhoneMediator.prototype.cutView = function () {
                    modules.ModuleManager.hide(modules.ModuleNames.REWARD);
                    // ModuleManager.jumpPage(ModuleNames.PHONE, null, this._app);
                };
                PhoneMediator.prototype.getSrc = function (index) {
                    var src = "";
                    if (index <= 10000) {
                        src = "common/icon/skillicon/" + index + ".png";
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
                PhoneMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                    this.init();
                };
                PhoneMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                PhoneMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return PhoneMediator;
            }(game.modules.UiMediator));
            reward.PhoneMediator = PhoneMediator;
        })(reward = modules.reward || (modules.reward = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=PhoneMediator.js.map