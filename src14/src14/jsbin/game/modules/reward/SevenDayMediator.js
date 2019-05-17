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
* 七日签到
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var reward;
        (function (reward) {
            var type;
            (function (type) {
                type[type["CAREER"] = 0] = "CAREER";
                type[type["ITEMID"] = 1] = "ITEMID";
                type[type["DIBAN"] = 0] = "DIBAN";
                type[type["ICON"] = 1] = "ICON";
            })(type || (type = {}));
            var SevenDayMediator = /** @class */ (function (_super) {
                __extends(SevenDayMediator, _super);
                function SevenDayMediator(uiLayer) {
                    var _this = _super.call(this, uiLayer) || this;
                    _this._viewUI = new ui.common.RewardSevenDayUI();
                    _this._viewUI.mouseThrough = true;
                    _this.isCenter = false;
                    _this._viewUI.SigninSevenReward_list.renderHandler = new Handler(_this, _this.signinSevenLoad);
                    return _this;
                }
                /** 七日签到数据加载 */
                SevenDayMediator.prototype.init = function () {
                    var list = this._viewUI.SigninSevenReward_list;
                    var _mulDayLogin = RewardModel.getInstance().mulDayLogin;
                    var _shape = LoginModel.getInstance().roleDetail.shape - 1; //角色
                    var _school = LoginModel.getInstance().roleDetail.school; //职业
                    var _loginawardBinDic = RewardModel.getInstance().loginawardBinDic;
                    list.repeatX = 1;
                    list.vScrollBarSkin = "";
                    var data = [];
                    for (var i = 1; i <= 7; i++) {
                        var haveImgVisible = false;
                        var getRewardBtnVisible = true;
                        var getRewardBtnDisabled = false;
                        if (i <= _mulDayLogin.logindays && _mulDayLogin.rewardmap.get(i) != 0) {
                            haveImgVisible = true;
                            getRewardBtnVisible = false;
                        }
                        if (i > _mulDayLogin.logindays) {
                            getRewardBtnDisabled = true;
                        }
                        for (var j = 1; j <= 3; j++) {
                            var num_lab = list.getCell(i - 1).getChildByName("num_lab" + j);
                            var icon_img = list.getCell(i - 1).getChildByName("icon_img" + j);
                            var diban_img = list.getCell(i - 1).getChildByName("diban_img" + j);
                            var _petId = this.getPetId(j, _shape, _loginawardBinDic[i]);
                            var items = this.getItems(j, _shape, _loginawardBinDic[i]);
                            var _itemId = this.getItemId(_school, items);
                            diban_img.skin = this.getSkin(_itemId, _petId)[type.DIBAN];
                            num_lab.text = this.getNum(j, _shape, _loginawardBinDic[i]);
                            icon_img.skin = this.getSkin(_itemId, _petId)[type.ICON];
                        }
                        data.push({
                            sevenDay_lab: { skin: "common/ui/reward/di" + i + "tian.png" },
                            have_img: { visible: haveImgVisible },
                            getReward_btn: { visible: getRewardBtnVisible, disabled: getRewardBtnDisabled }
                        });
                    }
                    list.array = data;
                };
                /** 获取底板品质类型 */
                SevenDayMediator.prototype.getSkin = function (_itemId, _petId) {
                    var _petAttrBinDic = PetModel.getInstance().petCPetAttrData;
                    var _itemAttrBinDic = BagModel.getInstance().itemAttrData;
                    var _npcShapeBinDic = LoginModel.getInstance().cnpcShapeInfo;
                    var skinArr = ["common/ui/tongyong/baikuang.png", "common/ui/tongyong/lvkuang.png",
                        "common/ui/tongyong/lankuang.png", "common/ui/tongyong/zikuang.png",
                        "common/ui/tongyong/jinkuang.png"];
                    var diban;
                    var icon;
                    if (_itemId != undefined && _itemId != 0) {
                        diban = skinArr[_itemAttrBinDic[_itemId].nquality - 1];
                        icon = this.getSrc(_itemAttrBinDic[_itemId].icon);
                    }
                    else if (_petId != undefined && _petId != 0) {
                        diban = skinArr[_petAttrBinDic[_petId].quality - 1];
                        icon = this.getSrc(_npcShapeBinDic[_petAttrBinDic[_petId].modelid].littleheadID);
                    }
                    else {
                        diban = "";
                        icon = "";
                    }
                    return [diban, icon];
                };
                /** 获取物品数量 */
                SevenDayMediator.prototype.getNum = function (index, shape, _loginawardBinDic) {
                    var num;
                    switch (index) {
                        case 1:
                            num = _loginawardBinDic.item1num[shape];
                            break;
                        case 2:
                            num = _loginawardBinDic.item2num[shape];
                            break;
                        case 3:
                            num = _loginawardBinDic.item3num[shape];
                            break;
                    }
                    if (num > 1) {
                        return "X" + num;
                    }
                    return "";
                };
                /** 获取宠物id */
                SevenDayMediator.prototype.getPetId = function (index, shape, _loginawardBinDic) {
                    var petId;
                    switch (index) {
                        case 1:
                            petId = _loginawardBinDic.pet1id[shape];
                            break;
                        case 2:
                            petId = _loginawardBinDic.pet2id[shape];
                            break;
                        case 3:
                            petId = _loginawardBinDic.pet3id[shape];
                            break;
                    }
                    return petId;
                };
                /** 获取物品集合 */
                SevenDayMediator.prototype.getItems = function (index, shape, _loginawardBinDic) {
                    var items;
                    switch (index) {
                        case 1:
                            items = _loginawardBinDic.item1id[shape];
                            break;
                        case 2:
                            items = _loginawardBinDic.item2id[shape];
                            break;
                        case 3:
                            items = _loginawardBinDic.item3id[shape];
                            break;
                    }
                    return items;
                };
                /** 获取物品id */
                SevenDayMediator.prototype.getItemId = function (career, idStr) {
                    var ids = idStr.split(";");
                    if (ids.length > 1) {
                        for (var i = 0; i < ids.length; i++) {
                            if (ids[i].split(",")[type.CAREER] === (career + "")) {
                                return parseInt(ids[i].split(",")[type.ITEMID]);
                            }
                        }
                    }
                    else {
                        return parseInt(ids[type.CAREER].split(",")[type.ITEMID]);
                    }
                };
                /** 物品操作监听-物品弹窗或奖励领取 */
                SevenDayMediator.prototype.signinSevenLoad = function (cell, index) {
                    var getReward = cell.getChildByName("getReward_btn");
                    getReward.on(LEvent.MOUSE_DOWN, this, this.getReward, [cell, index]);
                    var getTips1 = cell.getChildByName("sevenDay_btn1");
                    var getTips2 = cell.getChildByName("sevenDay_btn2");
                    var getTips3 = cell.getChildByName("sevenDay_btn3");
                    getTips1.on(LEvent.MOUSE_DOWN, this, this.getTips, [cell, 1, index + 1]);
                    getTips2.on(LEvent.MOUSE_DOWN, this, this.getTips, [cell, 2, index + 1]);
                    getTips3.on(LEvent.MOUSE_DOWN, this, this.getTips, [cell, 3, index + 1]);
                };
                /** 领取奖励 */
                SevenDayMediator.prototype.getReward = function (cell, index) {
                    var _this = this;
                    var logindays = RewardModel.getInstance().mulDayLogin.logindays;
                    if (logindays <= index)
                        return;
                    RequesterProtocols._instance.c2s_CGetMulDayLogin_Gift(index + 1);
                    RewardProxy.getInstance().once(reward.models.MULDAY_EVENT, this, function () {
                        _this.init();
                    });
                };
                /** 物品信息弹窗 */
                SevenDayMediator.prototype.getTips = function (cell, num, index) {
                    var _shape = LoginModel.getInstance().roleDetail.shape - 1; //角色
                    var _school = LoginModel.getInstance().roleDetail.school; //职业
                    var _loginawardBinDic = RewardModel.getInstance().loginawardBinDic;
                    var _petId = this.getPetId(num, _shape, _loginawardBinDic[index]);
                    var items = this.getItems(num, _shape, _loginawardBinDic[index]);
                    var _itemId = this.getItemId(_school, items);
                    if (_itemId != undefined && _itemId != 0) {
                        var parame = new Dictionary();
                        parame.set("itemId", _itemId);
                        this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.commonItem, parame);
                    }
                    else if (_petId != undefined && _petId != 0) {
                        this._petTips = new game.modules.commonUI.PetMessageMediator(_petId, this._app);
                        modules.ModuleManager.hide(modules.ModuleNames.REWARD);
                        this._petTips.show();
                        this._petTips.once(modules.commonUI.CLOSE_PET_TIPS, this, this.jumpToReward);
                    }
                    else {
                        var btn = cell.getChildByName("sevenDay_btn" + num);
                        btn.visible = false;
                    }
                };
                /** 宠物信息弹窗关闭后跳转会七日签到模块 */
                SevenDayMediator.prototype.jumpToReward = function () {
                    this._petTips.off(modules.commonUI.CLOSE_PET_TIPS, this, this.jumpToReward);
                    modules.ModuleManager.jumpPage(modules.ModuleNames.REWARD, rewardBtnType.SEVENDAY, this._app);
                };
                /** 获取物品图标 */
                SevenDayMediator.prototype.getSrc = function (index) {
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
                SevenDayMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                    this.init();
                };
                SevenDayMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                SevenDayMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return SevenDayMediator;
            }(game.modules.UiMediator));
            reward.SevenDayMediator = SevenDayMediator;
        })(reward = modules.reward || (modules.reward = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=SevenDayMediator.js.map