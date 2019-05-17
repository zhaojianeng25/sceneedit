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
var game;
(function (game) {
    var modules;
    (function (modules) {
        var commonUI;
        (function (commonUI) {
            /** 珍品/珍宠找回 */
            var ShopRetrieveMediator = /** @class */ (function (_super) {
                __extends(ShopRetrieveMediator, _super);
                function ShopRetrieveMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    /** 找回对象列表数据 */
                    _this.datas = [];
                    _this._viewUI = new ui.common.ShopRetrieveUI();
                    _this.isCenter = true;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    return _this;
                }
                /** 给其它地方调用
                 * @param flag 判断是否是珍品找回，不是珍品找回就是珍宠找回
                 */
                ShopRetrieveMediator.prototype.onShow = function (flag) {
                    this._uniqId = -1;
                    this.registerEvent();
                    if (flag) {
                        this._viewUI.select_tab.selectedIndex = 0;
                    }
                    else {
                        this._viewUI.select_tab.selectedIndex = 1;
                    }
                };
                /** 注册事件 */
                ShopRetrieveMediator.prototype.registerEvent = function () {
                    this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
                    this._viewUI.retrieve_btn.on(LEvent.MOUSE_DOWN, this, this.retrieve);
                    this._viewUI.select_tab.selectHandler = new Handler(this, this.changeSelect);
                    modules.bag.models.BagProxy.getInstance().on(modules.bag.models.GET_ITEMRECOVERDATA, this, this.init);
                    modules.bag.models.BagProxy.getInstance().on(modules.bag.models.RECOVER_ITEM_SUCCESS, this, this.changeItemRecoverData);
                    modules.bag.models.BagProxy.getInstance().on(modules.bag.models.GET_RECOVERITEM_INFODATA, this, this.showRecoverItemInfo);
                    modules.pet.models.PetProxy.getInstance().on(modules.pet.models.GET_PETRECOVERDATA, this, this.init);
                    modules.pet.models.PetProxy.getInstance().on(modules.pet.models.RECOVER_PET_SUCCESS, this, this.changePetRecoverData);
                    modules.pet.models.PetProxy.getInstance().on(modules.pet.models.GET_PETRECOVER_INFODATA, this, this.showRecoverPetInfo);
                };
                /** 显示找回道具的信息 */
                ShopRetrieveMediator.prototype.showRecoverItemInfo = function (uniqId, tips) {
                    var recoverItems = BagModel.getInstance().itemRecoverInfoData;
                    var itemId = -1;
                    for (var i = 0; i < recoverItems.length; i++) {
                        var _uniqId = recoverItems[i].uniqId;
                        if (_uniqId == uniqId) {
                            itemId = recoverItems[i].itemId;
                            break;
                        }
                    }
                    if (tips != null && itemId != -1) {
                        var packid = tips.packid; //背包id
                        var key = tips.keyinpack; //在对应背包中的key
                        var itemAttrData = BagModel.getInstance().itemAttrData;
                        var outbattleuse = itemAttrData[itemId]["outbattleuse"]; //战斗外使用对象
                        var shopid = itemAttrData[itemId]["nshoptype"]; //商店类型
                        var number = 1; //装备道具数量写死为1，反正是不可叠加道具
                        var equipeffect = StrengTheningModel.getInstance().equipEffectData;
                        var eequiptype = equipeffect[itemId]["eequiptype"]; //部件id
                        var equip_parame = new Dictionary();
                        equip_parame.set("itemId", itemId);
                        equip_parame.set("key", key);
                        equip_parame.set("packid", packid);
                        equip_parame.set("outbattleuse", outbattleuse);
                        equip_parame.set("shopid", shopid);
                        equip_parame.set("number", number);
                        equip_parame.set("equiptype", eequiptype);
                        var _tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.BAG, equip_parame);
                    }
                    else if (itemId != -1) {
                        var other_parame = new Dictionary();
                        other_parame.set("itemId", itemId);
                        var _tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.commonItem, other_parame);
                    }
                };
                /** 更改道具找回的数据 */
                ShopRetrieveMediator.prototype.changeItemRecoverData = function (itemId, uniqId) {
                    var _recoverItems = BagModel.getInstance().itemRecoverInfoData;
                    var tempArr = [];
                    for (var i = 0; i < _recoverItems.length; i++) {
                        var _recoverItem = _recoverItems[i];
                        if (_recoverItem.itemId != itemId) {
                            tempArr.push(_recoverItem); //放入不是相同道具id的道具数据
                        }
                        else if (_recoverItem.uniqId != uniqId) {
                            tempArr.push(_recoverItem); //放入相同道具id，但是确是不同道具的数据
                        }
                    }
                    this.init(tempArr);
                    BagModel.getInstance().itemRecoverInfoData = tempArr;
                };
                /** 显示找回宠物的信息 */
                ShopRetrieveMediator.prototype.showRecoverPetInfo = function (petInfoData) {
                    var _petXiangQingMediator = new modules.pet.PetXiangQingMediator(this._app);
                    _petXiangQingMediator.init(petInfoData);
                };
                /** 更改宠物找回的数据 */
                ShopRetrieveMediator.prototype.changePetRecoverData = function (petId, uniqId) {
                    var _recoverPets = PetModel.getInstance().recoverPets;
                    var tempArr = [];
                    for (var i = 0; i < _recoverPets.length; i++) {
                        var _recoverPet = _recoverPets[i];
                        if (_recoverPet.petId != petId) {
                            tempArr.push(_recoverPet); //放入不是相同宠物id的道具数据
                        }
                        else if (_recoverPet.uniqId != uniqId) {
                            tempArr.push(_recoverPet); //放入相同宠物id，但是确是不同宠物的数据
                        }
                    }
                    this.init(tempArr);
                    PetModel.getInstance().recoverPets = tempArr;
                };
                /** 更改选项 */
                ShopRetrieveMediator.prototype.changeSelect = function () {
                    if (this._viewUI.select_tab.selectedIndex == 0) {
                        RequesterProtocols._instance.c2s_CItemRecover_List(); //珍品找回请求珍品列表
                    }
                    else {
                        RequesterProtocols._instance.c2s_pet_recoverlist(); //珍宠找回请求珍宠列表
                    }
                };
                /** 进行找回操作 */
                ShopRetrieveMediator.prototype.retrieve = function () {
                    //要先判断金币是否足够
                    if (this._viewUI.spendGold_lab.strokeColor == "#ff0000") {
                        //金币不够，进行补足
                        var needMoney = Number(this._viewUI.spendGold_lab.text); //找回所需的金币
                        var haveMoney = Number(this._viewUI.haveGold_lab.text); //玩家角色所持有的金币
                        //还差多少钱
                        var differMoney = needMoney - haveMoney;
                        //需要多少元宝来补足
                        var needYuanBao = Math.ceil(differMoney / 100); //100为元宝兑换成金币的兑换率
                        var jinBiBuZuView = new commonUI.JinBiBuZuViewMediator(this._viewUI, this._app);
                        jinBiBuZuView.onShow(true, differMoney.toString(), needYuanBao.toString());
                        jinBiBuZuView.once(commonUI.USE_YUANBAO_EXCHANGE_EVENT, this, this.goCharge, [needYuanBao]);
                        return;
                    }
                    //当金币足够，就可发起请求
                    if (this._uniqId != -1 && this._viewUI.select_tab.selectedIndex == 0) {
                        RequesterProtocols._instance.c2s_CItem_Recover(this._uniqId); //请求找回珍品
                    }
                    else if (this._uniqId != -1 && this._viewUI.select_tab.selectedIndex == 1) {
                        RequesterProtocols._instance.c2s_pet_recover(this._uniqId); //请求找回珍宠
                    }
                    else { //进行飘窗提示，请选择需要找回的对象
                    }
                };
                /**仙晶兑换 */
                ShopRetrieveMediator.prototype.goCharge = function (yuanbao) {
                    var fuShiNum = HudModel.getInstance().fuShiNum;
                    if (fuShiNum < yuanbao) {
                        var _TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
                        _TipsMessageMediator.show();
                        var param = new Dictionary();
                        param.set("contentId", RoleEnum.XIANJIN_TIP);
                        _TipsMessageMediator.showContent(param);
                        game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.goRecharge);
                    }
                    else {
                        modules.bag.models.BagProxy.getInstance().once(modules.bag.models.REFRESH_CURRENCY_EVENT, this, this.changeUI);
                        RequesterProtocols._instance.c2s_exchange_currency(MoneyTypes.MoneyType_HearthStone, MoneyTypes.MoneyType_GoldCoin, yuanbao);
                    }
                };
                /** 更改界面UI */
                ShopRetrieveMediator.prototype.changeUI = function () {
                    this._viewUI.haveGold_lab.text = BagModel.getInstance().globalIcon.toString();
                    this._viewUI.spendGold_lab.strokeColor = "#50321a";
                };
                /**充值 */
                ShopRetrieveMediator.prototype.goRecharge = function () {
                    modules.ModuleManager.jumpPage(modules.ModuleNames.SHOP, shopMediatorType.CHONGZHI, this._app);
                    game.modules.shop.models.ShopProxy._instance.event(game.modules.shop.models.Go_Charge); //前往充值界面。关闭当前界
                };
                /** 初始化
                 * @param data 所得到找回对象列表数据，珍品/珍宠
                 */
                ShopRetrieveMediator.prototype.init = function (data) {
                    this.lastSelectIndex = -1;
                    this.initUI(data);
                    this.show();
                };
                /** 初始化UI */
                ShopRetrieveMediator.prototype.initUI = function (data) {
                    this._viewUI.recover_lst.vScrollBarSkin = "";
                    this._viewUI.spendGold_lab.text = 0 + "";
                    this._viewUI.spendGold_lab.strokeColor = "#50321a";
                    this._viewUI.haveGold_lab.text = BagModel.getInstance().globalIcon.toString();
                    this.datas = data;
                    this._viewUI.recover_lst.array = data;
                    this._viewUI.recover_lst.renderHandler = new Laya.Handler(this, this.onRenderRecover);
                };
                /** 渲染找回列表 */
                ShopRetrieveMediator.prototype.onRenderRecover = function (cell, index) {
                    if (index < 0 || index > this.datas.length - 1) {
                        return;
                    }
                    var select_btn = cell.getChildByName("select_btn");
                    if (this.lastSelectIndex != -1 && this.lastSelectIndex == index) {
                        select_btn.skin = "common/ui/tongyong/common_list_textbg2.png";
                    }
                    else if (this.lastSelectIndex == -1) {
                        select_btn.skin = "common/ui/tongyong/common_list_textbg.png";
                    }
                    select_btn.on(LEvent.CLICK, this, this.clickRecover, [index]);
                    var frame_img = select_btn.getChildByName("frame_img");
                    var icon_img = select_btn.getChildByName("icon_img");
                    icon_img.on(LEvent.CLICK, this, this.clickShowInfo, [index]);
                    var name_lab = select_btn.getChildByName("name_lab");
                    this.setImgAndLab(frame_img, icon_img, name_lab, index);
                    var spendNeedGold_lab = select_btn.getChildByName("spendNeedGold_lab");
                    spendNeedGold_lab.text = this.datas[index]["cost"];
                    var laveDay_lab = select_btn.getChildByName("laveDay_lab");
                    var _remainTime = this.datas[index]["remainTime"];
                    laveDay_lab.text = this.getChangeTime(_remainTime);
                };
                /** 获取时间戳转换后的天数
                 * @param times 时间戳
                 * @descibe 不足一天的，转换成以时为单位计时
                 */
                ShopRetrieveMediator.prototype.getChangeTime = function (times) {
                    var days = Math.ceil(times / (60 * 60 * 24));
                    if (days <= 1) {
                        var hours = Math.ceil(times / (60 * 60));
                        return hours + "时";
                    }
                    else {
                        return days + "天";
                    }
                };
                /** 点击请求显示所要找回对象的信息 */
                ShopRetrieveMediator.prototype.clickShowInfo = function (index) {
                    var uniqId = this.datas[index]["uniqId"];
                    if (this._viewUI.select_tab.selectedIndex == 0) {
                        RequesterProtocols._instance.c2s_CRecoverItem_Info(uniqId); //请求查看珍品信息
                    }
                    else {
                        RequesterProtocols._instance.c2s_recover_petinfo(uniqId); //请求查看珍宠信息
                    }
                };
                /** 点击了所要找回的对象 */
                ShopRetrieveMediator.prototype.clickRecover = function (index) {
                    if (this.lastSelectIndex != -1) {
                        // let Box: Laya.Box = this._viewUI.recover_lst.getCell(this.lastSelectIndex) as Laya.Box;
                        // let last_select_btn: Laya.Button = Box.getChildByName("select_btn") as Laya.Button;
                        // last_select_btn.skin = "common/ui/tongyong/common_list_textbg.png";
                        this.select_btn.skin = "common/ui/tongyong/common_list_textbg.png";
                    }
                    var select_btn = this._viewUI.recover_lst.getCell(index).getChildByName("select_btn");
                    select_btn.skin = "common/ui/tongyong/common_list_textbg2.png";
                    this.select_btn = select_btn;
                    this.lastSelectIndex = index;
                    this._uniqId = this.datas[index]["uniqId"];
                    var _cost = this.datas[index]["cost"];
                    var _have = BagModel.getInstance().globalIcon;
                    if (_cost > _have) {
                        this._viewUI.spendGold_lab.strokeColor = "#ff0000";
                    }
                    else {
                        this._viewUI.spendGold_lab.strokeColor = "#50321a";
                    }
                    this._viewUI.spendGold_lab.text = _cost.toString();
                };
                /** 设置图片路径和文本内容 */
                ShopRetrieveMediator.prototype.setImgAndLab = function (img1, img2, lab, index) {
                    var str1, str2, str3;
                    if (this._viewUI.select_tab.selectedIndex == 0) {
                        var _itemId = this.datas[index].itemId;
                        var _itemquality = BagModel.getInstance().itemAttrData[_itemId]["nquality"];
                        str1 = modules.bag.BagSystemModule.getGameItemFrameColorResource(_itemquality);
                        var _itemicon = BagModel.getInstance().itemAttrData[_itemId]["icon"];
                        str2 = "common/icon/item/" + _itemicon + ".png";
                        var _itemname = BagModel.getInstance().itemAttrData[_itemId]["name"];
                        str3 = _itemname;
                    }
                    else {
                        var _petid = this.datas[index].petId;
                        var _petquality = PetModel.getInstance().petCPetAttrData[_petid]["quality"];
                        str1 = modules.bag.BagSystemModule.getGameItemFrameColorResource(_petquality);
                        var _petmodelid = PetModel.getInstance().petCPetAttrData[_petid]["modelid"];
                        var _peticon = LoginModel.getInstance().cnpcShapeInfo[_petmodelid]["littleheadID"];
                        str2 = "common/icon/avatarpet/" + _peticon + ".png";
                        var _petname = PetModel.getInstance().petCPetAttrData[_petid]["name"];
                        str3 = _petname;
                    }
                    img1.skin = str1;
                    img2.skin = str2;
                    lab.text = str3;
                };
                ShopRetrieveMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                };
                ShopRetrieveMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    this.removeEvent();
                };
                /** 移除事件 */
                ShopRetrieveMediator.prototype.removeEvent = function () {
                    this._viewUI.close_btn.off(LEvent.MOUSE_DOWN, this, this.hide);
                    this._viewUI.retrieve_btn.off(LEvent.MOUSE_DOWN, this, this.retrieve);
                    modules.bag.models.BagProxy.getInstance().off(modules.bag.models.GET_ITEMRECOVERDATA, this, this.init);
                    modules.bag.models.BagProxy.getInstance().off(modules.bag.models.RECOVER_ITEM_SUCCESS, this, this.changeItemRecoverData);
                    modules.bag.models.BagProxy.getInstance().off(modules.bag.models.GET_RECOVERITEM_INFODATA, this, this.showRecoverItemInfo);
                    modules.pet.models.PetProxy.getInstance().off(modules.pet.models.GET_PETRECOVERDATA, this, this.init);
                    modules.pet.models.PetProxy.getInstance().off(modules.pet.models.RECOVER_PET_SUCCESS, this, this.changePetRecoverData);
                    modules.pet.models.PetProxy.getInstance().off(modules.pet.models.GET_PETRECOVER_INFODATA, this, this.showRecoverPetInfo);
                };
                ShopRetrieveMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return ShopRetrieveMediator;
            }(game.modules.UiMediator));
            commonUI.ShopRetrieveMediator = ShopRetrieveMediator;
        })(commonUI = modules.commonUI || (modules.commonUI = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ShopRetrieveMediator.js.map