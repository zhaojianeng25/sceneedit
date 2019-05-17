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
* 升级礼包
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var reward;
        (function (reward) {
            var LevelUpMediator = /** @class */ (function (_super) {
                __extends(LevelUpMediator, _super);
                function LevelUpMediator(uiLayer) {
                    var _this = _super.call(this, uiLayer) || this;
                    /** 礼包数据 */
                    _this.dataArr = [];
                    _this._viewUI = new ui.common.RewardLevelUpUI();
                    _this._viewUI.mouseThrough = true;
                    _this.isCenter = false;
                    _this._viewUI.LevelUpReward_list.renderHandler = new Handler(_this, _this.setData);
                    return _this;
                }
                /** 升级礼包数据加载 */
                LevelUpMediator.prototype.init = function (itemId) {
                    var list = this._viewUI.LevelUpReward_list;
                    list.repeatY = 1;
                    list.hScrollBarSkin = "";
                    var _itemAttrBinDic = BagModel.getInstance().itemAttrData;
                    var skinArr = ["common/ui/tongyong/baikuang.png", "common/ui/tongyong/lvkuang.png",
                        "common/ui/tongyong/lankuang.png", "common/ui/tongyong/zikuang.png",
                        "common/ui/tongyong/jinkuang.png"];
                    var _shape = LoginModel.getInstance().roleDetail.shape; //角色
                    var _school = LoginModel.getInstance().roleDetail.school; //职业
                    var _level; //等级
                    if (HudModel.getInstance().levelNum != 0) {
                        _level = HudModel.getInstance().levelNum;
                    }
                    else {
                        _level = LoginModel.getInstance().roleDetail.level;
                    }
                    this.dataArr = RewardModel.getInstance().presentConfigBinDicAtDutyallow.get(_shape);
                    for (var i = this.dataArr.length - 1; i >= 0; i--) {
                        if (this.dataArr[i].careerallow != _school || this.dataArr[i].itemid < itemId || this.dataArr[i].itemid > 105009) {
                            this.dataArr.splice(i, 1);
                        }
                    }
                    var data = [];
                    for (var i = 0; i < this.dataArr.length; i++) {
                        var _disabled = true;
                        var _vipLevelName = _itemAttrBinDic[this.dataArr[i].itemid].name;
                        if (this.dataArr[i].itemid == 105000) {
                            _vipLevelName = "1级大礼包";
                        }
                        if (i == 0 && _level >= _itemAttrBinDic[itemId].needLevel) {
                            _disabled = false;
                            RewardModel.getInstance().pointDic.set(5, 1);
                        }
                        data.push({
                            vipLevelName: { text: _vipLevelName },
                            get_btn: { disabled: _disabled }
                        });
                    }
                    list.array = data;
                };
                /** 界面数据记载-及物品弹窗监听 */
                LevelUpMediator.prototype.setData = function (cell, index) {
                    var list = this._viewUI.LevelUpReward_list;
                    var _itemAttrBinDic = BagModel.getInstance().itemAttrData;
                    var skinArr = ["common/ui/tongyong/baikuang.png", "common/ui/tongyong/lvkuang.png",
                        "common/ui/tongyong/lankuang.png", "common/ui/tongyong/zikuang.png",
                        "common/ui/tongyong/jinkuang.png"];
                    for (var j = 1; j <= 9; j++) {
                        var icon_img = cell.getChildByName("icon_img" + j);
                        var diban_img = cell.getChildByName("diban_img" + j);
                        var getTips_btn = cell.getChildByName("levelTips_btn" + j);
                        if (this.dataArr[index].itemids[j - 1] != undefined) {
                            icon_img.skin = this.getSrc(_itemAttrBinDic[this.dataArr[index].itemids[j - 1]].icon);
                            diban_img.skin = skinArr[_itemAttrBinDic[this.dataArr[index].itemids[j - 1]].nquality - 1];
                            getTips_btn.visible = true;
                        }
                        else {
                            icon_img.skin = "";
                            diban_img.skin = "";
                            getTips_btn.visible = false;
                        }
                    }
                    var btn = cell.getChildByName("get_btn");
                    btn.on(LEvent.MOUSE_DOWN, this, this.getReward);
                    var getTips1 = cell.getChildByName("levelTips_btn1");
                    var getTips2 = cell.getChildByName("levelTips_btn2");
                    var getTips3 = cell.getChildByName("levelTips_btn3");
                    var getTips4 = cell.getChildByName("levelTips_btn4");
                    var getTips5 = cell.getChildByName("levelTips_btn5");
                    var getTips6 = cell.getChildByName("levelTips_btn6");
                    var getTips7 = cell.getChildByName("levelTips_btn7");
                    var getTips8 = cell.getChildByName("levelTips_btn8");
                    var getTips9 = cell.getChildByName("levelTips_btn9");
                    getTips1.on(LEvent.MOUSE_DOWN, this, this.getTips, [0, index]);
                    getTips2.on(LEvent.MOUSE_DOWN, this, this.getTips, [1, index]);
                    getTips3.on(LEvent.MOUSE_DOWN, this, this.getTips, [2, index]);
                    getTips4.on(LEvent.MOUSE_DOWN, this, this.getTips, [3, index]);
                    getTips5.on(LEvent.MOUSE_DOWN, this, this.getTips, [4, index]);
                    getTips6.on(LEvent.MOUSE_DOWN, this, this.getTips, [5, index]);
                    getTips7.on(LEvent.MOUSE_DOWN, this, this.getTips, [6, index]);
                    getTips8.on(LEvent.MOUSE_DOWN, this, this.getTips, [7, index]);
                    getTips9.on(LEvent.MOUSE_DOWN, this, this.getTips, [8, index]);
                };
                /** 物品信息弹窗 */
                LevelUpMediator.prototype.getTips = function (num, index) {
                    var itemId = this.dataArr[index].itemids[num];
                    var parame = new Dictionary();
                    parame.set("itemId", itemId);
                    this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.commonItem, parame);
                };
                /** 奖励领取 */
                LevelUpMediator.prototype.getReward = function () {
                    RequesterProtocols._instance.c2s_CAppend_Item(this.getBagItemKey(), 0, game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid);
                    RewardModel.getInstance().pointDic.set(5, 0);
                    RewardProxy.getInstance().event(reward.models.LEVELUP_EVENT);
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.CLOSEVIEW_EVENT);
                    modules.ModuleManager.hide(modules.ModuleNames.REWARD);
                };
                /** 背包获取升级礼包物品id */
                LevelUpMediator.prototype.getBagItemKey = function () {
                    var itemArr = game.modules.bag.models.BagModel.getInstance().getBagGameItemData(BagTypes.BAG).items;
                    if (itemArr.length <= 0)
                        return 0;
                    for (var i = 0; i < itemArr.length; i++) {
                        var id = itemArr[i].id;
                        if (id >= 105000 && id <= 105009) {
                            return itemArr[i].key;
                        }
                    }
                    return 0;
                };
                /** 获取物品图标 */
                LevelUpMediator.prototype.getSrc = function (index) {
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
                LevelUpMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                };
                LevelUpMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                LevelUpMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return LevelUpMediator;
            }(game.modules.UiMediator));
            reward.LevelUpMediator = LevelUpMediator;
        })(reward = modules.reward || (modules.reward = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=LevelUpMediator.js.map