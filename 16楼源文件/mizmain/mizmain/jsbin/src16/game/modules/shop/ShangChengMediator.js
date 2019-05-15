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
* 商城
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var shop;
        (function (shop) {
            var ShangChengMediator = /** @class */ (function (_super) {
                __extends(ShangChengMediator, _super);
                function ShangChengMediator(uiLayer, app) {
                    var _this = _super.call(this, uiLayer) || this;
                    /** 杂货商品 */
                    _this.viewArr1 = [];
                    /** 强化材料 */
                    _this.viewArr2 = [];
                    /** 每周限购 */
                    _this.viewArr3 = [];
                    /** 是否显示小键盘 */
                    _this.isShowKeyboard = 0;
                    /** 0表示刚开启键盘，点击按钮不与原显示数字叠加（1+1→11）*/
                    _this.selectTimes = 0;
                    /** 金币兑换银币 */
                    _this.needJinBi = 0;
                    /** 元宝兑换银币 */
                    _this.needYuanBao = 0;
                    /** 元宝兑换金币 */
                    _this.wantYuanBao = 0;
                    _this._viewUI = new ui.common.ShopShangChengUI();
                    _this._viewUI.mouseThrough = true;
                    _this.isCenter = false;
                    _this._app = app;
                    _this._xiaoJianPanMediator = new game.modules.tips.XiaoJianPanMediator(_this._viewUI);
                    _this._yinBiTips = new modules.commonUI.JinBiBuZuViewMediator(_this._viewUI, _this._app);
                    _this._remindViewMediator = modules.commonUI.RemindViewMediator.getInstance(_this._viewUI, app);
                    _this._viewUI.showList_list.renderHandler = new Handler(_this, _this.onSelect);
                    _this._viewUI.shangCheng_tab.selectHandler = new Handler(_this, _this.tebBtnOn);
                    _this._viewUI.showKeyboard_btn.on(LEvent.MOUSE_DOWN, _this, function () {
                        _this._xiaoJianPanMediator.show();
                        _this.isShowKeyboard = 1;
                        _this.selectTimes = 0;
                        _this._xiaoJianPanMediator.getView().x = 48;
                        _this._xiaoJianPanMediator.getView().y = 446;
                        game.modules.tips.models.TipsProxy.getInstance().on(game.modules.tips.models.ON_KRYBOARD, _this, _this.setKeyboardBtns);
                    });
                    _this._viewUI.reduceNum_btn.on(LEvent.MOUSE_DOWN, _this, _this.reduceNumBtnHandler);
                    _this._viewUI.addNum_btn.on(LEvent.MOUSE_DOWN, _this, _this.addNumBtnHandler);
                    _this._viewUI.buy_btn.on(LEvent.MOUSE_DOWN, _this, _this.buyBtnHandler);
                    return _this;
                }
                /**
                 * @describe 商会窗口初始化
                 * @param  viewType 页面类型
                 */
                ShangChengMediator.prototype.init = function (viewType) {
                    this.show();
                    this._yinBiTips.on(modules.commonUI.USE_GOLD_EXCHANGE_EVENT, this, this.jinbijiesuo);
                    this._yinBiTips.on(modules.commonUI.USE_SILVER_EXCHANGE_EVENT, this, this.yuanbaojiesuo);
                    this._yinBiTips.on(modules.commonUI.USE_YUANBAO_EXCHANGE_EVENT, this, this.jinbibuzu);
                    this._remindViewMediator.on(modules.commonUI.RIGHT_BUTTON_EVENT, this, this.jumpToCharge);
                    this._remindViewMediator.on(modules.commonUI.LEFT_BUTTON_EVENT, this, this.cancleToJump);
                    this._viewUI.buySuccess_box.visible = false;
                    this.scItemId = shop.models.ShopModel.getInstance().scItemId;
                    //获取玩家银币，金币，元宝数量
                    this.hadYuanBao = game.modules.mainhud.models.HudModel.getInstance().fuShiNum;
                    this.hadYinBi = game.modules.mainhud.models.HudModel.getInstance().sliverNum;
                    this.hadJinBi = game.modules.mainhud.models.HudModel.getInstance().goldNum;
                    this._viewUI.hadNum_lab.text = this.setNumStyle(this.hadYinBi);
                    this._viewUI.spendNum_lab.text = "0";
                    this._viewUI.num_lab.text = "0";
                    this._viewUI.shangCheng_tab.selectedIndex = viewType - 1;
                    this.cutView(viewType - 1);
                };
                /** 选中物品的按钮监听 */
                ShangChengMediator.prototype.onSelect = function (cell, index) {
                    var arr = [];
                    switch (this._viewUI.shangCheng_tab.selectedIndex) {
                        case 0:
                            arr = this.viewArr1;
                            break;
                        case 1:
                            arr = this.viewArr2;
                            break;
                        case 2:
                            arr = this.viewArr3;
                            break;
                    }
                    var btn = cell.getChildByName("cell_btn");
                    btn.on(LEvent.MOUSE_DOWN, this, this.btnHandler, [index, arr]);
                    var getTips = cell.getChildByName("getTips_btn");
                    getTips.on(LEvent.MOUSE_DOWN, this, this.getTips, [index, arr]);
                };
                /** 物品信息弹窗 */
                ShangChengMediator.prototype.getTips = function (index, arr) {
                    var _goodsBinDic = ShopModel.getInstance().GoodsBinDic;
                    var itemId = _goodsBinDic[arr[index].id].itemId;
                    var parame = new Dictionary();
                    parame.set("itemId", itemId);
                    this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.commonItem, parame);
                };
                /** 选中后的按钮样式 */
                ShangChengMediator.prototype.setBtnStyle = function (index) {
                    if (this.selectIndex != index) {
                        if (this.selectIndex != -1) {
                            var data = { cell_btn: { selected: false } };
                            this._viewUI.showList_list.setItem(this.selectIndex, data);
                        }
                        var data = { cell_btn: { selected: true } };
                        this._viewUI.showList_list.setItem(index, data);
                        this.selectIndex = index;
                    }
                    else {
                        var data = { cell_btn: { selected: true } };
                        this._viewUI.showList_list.setItem(index, data);
                        this.selectIndex = -1;
                    }
                };
                /** 为当前选中物品的后续操作准备 */
                ShangChengMediator.prototype.btnHandler = function (index, arr) {
                    if (this.selectIndex == index) {
                        this.addNumBtnHandler();
                        return;
                    }
                    this.setBtnStyle(index);
                    this._viewUI.showKeyboard_btn.visible = true;
                    var _goodsBinDic = ShopModel.getInstance().GoodsBinDic;
                    var _goodslimitsBinDic = ShopModel.getInstance().goodslimitsBinDic;
                    this.goodsBaseVo = _goodsBinDic[arr[index].id];
                    var _currencys = this.goodsBaseVo.currencys[0]; //货币类型
                    this.setMoneyStyle(_currencys);
                    if (_goodslimitsBinDic != undefined) {
                        this.hadBuyNum = _goodslimitsBinDic.get(arr[index].id);
                    }
                    else {
                        this.hadBuyNum = 0;
                    }
                    //购买数量和花费金额
                    this.buyNum = 1;
                    this.setBuyNum(this.buyNum);
                };
                /** 设置货币样式 */
                ShangChengMediator.prototype.setMoneyStyle = function (_currencys) {
                    this.hadYuanBao = game.modules.mainhud.models.HudModel.getInstance().fuShiNum;
                    this.hadYinBi = game.modules.mainhud.models.HudModel.getInstance().sliverNum;
                    this.hadJinBi = game.modules.mainhud.models.HudModel.getInstance().goldNum;
                    this._viewUI.money_img2.skin = this.getHuoBi(_currencys);
                    this._viewUI.money_img3.skin = this.getHuoBi(_currencys);
                    if (_currencys == 1) {
                        this._viewUI.hadNum_lab.text = this.setNumStyle(this.hadYinBi);
                    }
                    else if (_currencys == 2) {
                        this._viewUI.hadNum_lab.text = this.setNumStyle(this.hadJinBi);
                    }
                    else if (_currencys == 3) {
                        this._viewUI.hadNum_lab.text = this.setNumStyle(this.hadYuanBao);
                    }
                    else {
                        this._viewUI.hadNum_lab.text = "0";
                    }
                };
                /** 减少购买物品数量 */
                ShangChengMediator.prototype.reduceNumBtnHandler = function () {
                    if (this.buyNum == 1 || this.selectIndex == -1 || this.selectIndex == undefined)
                        return;
                    this.buyNum = parseInt(this.buyNum + "") - 1;
                    this.setBuyNum(this.buyNum);
                };
                /** 添加购买物品数量 */
                ShangChengMediator.prototype.addNumBtnHandler = function () {
                    if (this.selectIndex == -1 || this.selectIndex == undefined)
                        return;
                    if (this.goodsBaseVo.limitType > 0 && (this.goodsBaseVo.limitNum - ShopModel.getInstance().goodslimitsBinDic.get(this.viewArr3[this.selectIndex].id)) <= this.buyNum)
                        return;
                    this.buyNum = parseInt(this.buyNum + "") + 1;
                    this.setBuyNum(this.buyNum);
                };
                /** 小键盘点击数据显示 */
                ShangChengMediator.prototype.setKeyboardBtns = function (index) {
                    if (index == 0) {
                        if (this.selectTimes == 0) {
                            this.buyNum = 1;
                            this.selectTimes += 1;
                        }
                        else if (this.selectTimes == 1 || this.selectTimes == 2) {
                            this.buyNum *= 10;
                            this.selectTimes += 1;
                        }
                        else {
                            this.buyNum = 999;
                        }
                    }
                    else if (index > 0) {
                        if (this.selectTimes == 0) {
                            this.buyNum = index;
                            this.selectTimes += 1;
                        }
                        else if (this.selectTimes == 1 || this.selectTimes == 2) {
                            this.buyNum += index;
                            this.selectTimes += 1;
                        }
                        else {
                            this.buyNum = 999;
                        }
                    }
                    else if (index == -1) {
                        var length = (this.buyNum + "").length;
                        if (length == 3) {
                            this.buyNum = parseInt((this.buyNum + "").substr(0, length - 1));
                            this.selectTimes = length - 1;
                        }
                        else if (length == 2) {
                            this.buyNum = parseInt((this.buyNum + "").substr(0, length - 1));
                            this.selectTimes = length - 1;
                        }
                        else {
                            this.buyNum = 1;
                            this.selectTimes = 0;
                        }
                    }
                    if (this.goodsBaseVo.limitType > 0 &&
                        (this.goodsBaseVo.limitNum - ShopModel.getInstance().goodslimitsBinDic.get(this.viewArr3[this.selectIndex].id)) <= this.buyNum) {
                        var num = this.goodsBaseVo.limitNum - ShopModel.getInstance().goodslimitsBinDic.get(this.viewArr3[this.selectIndex].id);
                        if (num <= 0) {
                            this.buyNum = 1;
                        }
                        else {
                            this.buyNum = this.goodsBaseVo.limitNum - ShopModel.getInstance().goodslimitsBinDic.get(this.viewArr3[this.selectIndex].id);
                        }
                        // game.modules.tips.models.TipsProxy.getInstance().off(game.modules.tips.models.ON_KRYBOARD, this, this.setKeyboardBtns);
                    }
                    this.setBuyNum(this.buyNum);
                };
                /** 点击购买按钮 */
                ShangChengMediator.prototype.buyBtnHandler = function () {
                    if (bagModel.getInstance().chargeBagIsFull()) {
                        var promoto = HudModel.getInstance().promptAssembleBack(PromptExplain.FULL_OF_BAG);
                        var disappearMessageTipsMediator = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                        disappearMessageTipsMediator.onShow(promoto);
                    }
                    else if (this.goodsBaseVo.limitType > 0 &&
                        (this.goodsBaseVo.limitNum - ShopModel.getInstance().goodslimitsBinDic.get(this.viewArr3[this.selectIndex].id)) <= 0) {
                        var promoto = HudModel.getInstance().promptAssembleBack(PromptExplain.UPLIMIT_SC);
                        var disappearMessageTipsMediator = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                        disappearMessageTipsMediator.onShow(promoto);
                    }
                    else if (this.goodsBaseVo.currencys[0] == 1 && this.goodsBaseVo.prices[0] * this.buyNum > this.hadYinBi) {
                        var wantYinBi = this.goodsBaseVo.prices[0] * this.buyNum - this.hadYinBi;
                        this._yinBiTips.onShow(false, wantYinBi + "", Math.ceil(wantYinBi / 10000) + "", Math.ceil(wantYinBi / 100) + "");
                        // this._yinBiTips.once(commonUI.USE_GOLD_EXCHANGE_EVENT, this, this.jinbijiesuo, [Math.ceil(wantYinBi / 100)]);
                        // this._yinBiTips.once(commonUI.USE_SILVER_EXCHANGE_EVENT, this, this.yuanbaojiesuo, [Math.ceil(wantYinBi / 10000)]);
                        this.needJinBi = Math.ceil(wantYinBi / 100);
                        this.needYuanBao = Math.ceil(wantYinBi / 10000);
                    }
                    else if (this.goodsBaseVo.currencys[0] == 2 && this.goodsBaseVo.prices[0] * this.buyNum > this.hadJinBi) {
                        var wantJinBi = this.goodsBaseVo.prices[0] * this.buyNum - this.hadJinBi;
                        this._yinBiTips.onShow(true, wantJinBi + "", Math.ceil(wantJinBi / 100) + "");
                        // this._yinBiTips.once(commonUI.USE_YUANBAO_EXCHANGE_EVENT, this, this.jinbibuzu, [Math.ceil(wantJinBi / 100)]);
                        this.wantYuanBao = Math.ceil(wantJinBi / 100);
                    }
                    else if (this.goodsBaseVo.currencys[0] == 3 && this.goodsBaseVo.prices[0] * this.buyNum > this.hadYuanBao) {
                        var prompto = HudModel.getInstance().promptAssembleBack(PromptExplain.CHARGE_TIPS);
                        var cstringResConfigData = game.modules.tips.models.TipsModel._instance.cstringResConfigData;
                        var rightBtnName = cstringResConfigData[Intra_ProgramString.ENSURE].msg;
                        this._remindViewMediator.onShow(prompto, rightBtnName);
                        this._remindViewMediator.once(modules.commonUI.RIGHT_BUTTON_EVENT, this, this.jumpToCharge);
                        this._remindViewMediator.once(modules.commonUI.LEFT_BUTTON_EVENT, this, this.cancleToJump);
                    }
                    else {
                        RequesterProtocols._instance.c2s_buy_mallshop(6, 0, this.goodsBaseVo.id, this.buyNum);
                    }
                    game.modules.shop.models.ShopProxy.getInstance().once(game.modules.shop.models.BUYSUCCESS_EVENT, this, this.shopOn);
                };
                ShangChengMediator.prototype.jinbijiesuo = function () {
                    var _this = this;
                    this._yinBiTips.hide();
                    if (this.needJinBi < this.hadJinBi) {
                        RequesterProtocols._instance.c2s_exchange_currency(MoneyTypes.MoneyType_GoldCoin, MoneyTypes.MoneyType_SilverCoin, this.needJinBi);
                        modules.bag.models.BagProxy.getInstance().once(modules.bag.models.REFRESH_CURRENCY_EVENT, this, function () {
                            RequesterProtocols._instance.c2s_buy_mallshop(6, 0, _this.goodsBaseVo.id, _this.buyNum);
                        });
                    }
                    else {
                        this._yinBiTips.onShow(true, this.needJinBi - this.hadJinBi + "", Math.ceil((this.needJinBi - this.hadJinBi) / 100) + "");
                        this._yinBiTips.once(modules.commonUI.USE_YUANBAO_EXCHANGE_EVENT, this, this.jinbibuzu, [Math.ceil((this.needJinBi - this.hadJinBi) / 100)]);
                    }
                };
                ShangChengMediator.prototype.yuanbaojiesuo = function () {
                    var _this = this;
                    this._yinBiTips.hide();
                    if (this.needYuanBao < this.hadYuanBao) {
                        RequesterProtocols._instance.c2s_exchange_currency(MoneyTypes.MoneyType_HearthStone, MoneyTypes.MoneyType_SilverCoin, this.needYuanBao);
                        modules.bag.models.BagProxy.getInstance().once(modules.bag.models.REFRESH_CURRENCY_EVENT, this, function () {
                            RequesterProtocols._instance.c2s_buy_mallshop(6, 0, _this.goodsBaseVo.id, _this.buyNum);
                        });
                    }
                    else {
                        var prompto = HudModel.getInstance().promptAssembleBack(PromptExplain.CHARGE_TIPS);
                        this._remindViewMediator.onShow(prompto, "确定");
                        this._remindViewMediator.once(modules.commonUI.RIGHT_BUTTON_EVENT, this, this.jumpToCharge);
                        this._remindViewMediator.once(modules.commonUI.LEFT_BUTTON_EVENT, this, this.cancleToJump);
                    }
                };
                ShangChengMediator.prototype.jinbibuzu = function () {
                    var _this = this;
                    this._yinBiTips.hide();
                    if (this.wantYuanBao < this.hadYuanBao) {
                        RequesterProtocols._instance.c2s_exchange_currency(MoneyTypes.MoneyType_HearthStone, MoneyTypes.MoneyType_GoldCoin, this.wantYuanBao);
                        modules.bag.models.BagProxy.getInstance().once(modules.bag.models.REFRESH_CURRENCY_EVENT, this, function () {
                            RequesterProtocols._instance.c2s_buy_mallshop(6, 0, _this.goodsBaseVo.id, _this.buyNum);
                        });
                    }
                    else {
                        var prompto = HudModel.getInstance().promptAssembleBack(PromptExplain.CHARGE_TIPS);
                        this._remindViewMediator.onShow(prompto, "确定");
                        this._remindViewMediator.once(modules.commonUI.RIGHT_BUTTON_EVENT, this, this.jumpToCharge);
                        this._remindViewMediator.once(modules.commonUI.LEFT_BUTTON_EVENT, this, this.cancleToJump);
                    }
                };
                /** 元宝补足跳转至充值界面 */
                ShangChengMediator.prototype.jumpToCharge = function () {
                    this._remindViewMediator.off(modules.commonUI.LEFT_BUTTON_EVENT, this, this.cancleToJump);
                    modules.ModuleManager.hide(modules.ModuleNames.SHOP);
                    modules.ModuleManager.jumpPage(modules.ModuleNames.SHOP, shopMediatorType.CHONGZHI, this._app);
                };
                /** 元宝补足界面按钮操作监听 */
                ShangChengMediator.prototype.cancleToJump = function () {
                    this._remindViewMediator.off(modules.commonUI.RIGHT_BUTTON_EVENT, this, this.jumpToCharge);
                    this._remindViewMediator.hide();
                };
                /** 购买物品成功后的商品列表刷新 */
                ShangChengMediator.prototype.shopOn = function () {
                    this._viewUI.buySuccess_box.visible = true;
                    this._viewUI.buyNum_lab.text = "你购买了" + this.buyNum + "个" + BagModel.getInstance().itemAttrData[this.goodsBaseVo.itemId].name;
                    Laya.timer.once(2000, this, this.clearTime);
                    if (this.goodsBaseVo.limitType > 0) {
                        this.setList(this.viewArr3);
                    }
                    var _currencys = this.goodsBaseVo.currencys[0]; //货币类型
                    this.setMoneyStyle(_currencys);
                    this.buyNum = 1;
                    this.setBuyNum(this.buyNum);
                };
                /** 清除定时器-隐藏购买成功提示 */
                ShangChengMediator.prototype.clearTime = function () {
                    this._viewUI.buySuccess_box.visible = false;
                    Laya.timer.clear(this, this.clearTime);
                };
                /** 购买数量，花费金额显示 */
                ShangChengMediator.prototype.setBuyNum = function (num) {
                    this._viewUI.num_lab.text = num + "";
                    if (num == 0) {
                        this._viewUI.spendNum_lab.text = "0";
                        this._viewUI.spendNum_lab.stroke = 0;
                        this._viewUI.spendNum_lab.strokeColor = "#000000";
                        return;
                    }
                    this._viewUI.spendNum_lab.text = this.setNumStyle(this.goodsBaseVo.prices[0] * num);
                    if (this.goodsBaseVo.currencys[0] == 1 && this.goodsBaseVo.prices[0] * num > this.hadYinBi) {
                        this._viewUI.spendNum_lab.stroke = 5;
                        this._viewUI.spendNum_lab.strokeColor = "#f46563";
                    }
                    else if (this.goodsBaseVo.currencys[0] == 2 && this.goodsBaseVo.prices[0] * num > this.hadJinBi) {
                        this._viewUI.spendNum_lab.stroke = 5;
                        this._viewUI.spendNum_lab.strokeColor = "#f46563";
                    }
                    else if (this.goodsBaseVo.currencys[0] == 3 && this.goodsBaseVo.prices[0] * num > this.hadYuanBao) {
                        this._viewUI.spendNum_lab.stroke = 5;
                        this._viewUI.spendNum_lab.strokeColor = "#f46563";
                    }
                    else {
                        this._viewUI.spendNum_lab.stroke = 0;
                        this._viewUI.spendNum_lab.strokeColor = "#000000";
                    }
                };
                /** 页签类型按钮监听 */
                ShangChengMediator.prototype.tebBtnOn = function (index) {
                    this.selectIndex = -1;
                    this._viewUI.showKeyboard_btn.visible = false;
                    // this.btnHandler();
                    this.cutView(index);
                };
                /** 切换界面 */
                ShangChengMediator.prototype.cutView = function (index) {
                    this.buyNum = 0;
                    this.setBuyNum(0);
                    this._viewUI.hadNum_lab.text = this.setNumStyle(this.hadYuanBao);
                    this._viewUI.spendNum_lab.text = "0";
                    this._viewUI.num_lab.text = "0";
                    var arr = [];
                    switch (index) {
                        case 0:
                            arr = this.viewArr1;
                            break;
                        case 1:
                            arr = this.viewArr2;
                            break;
                        case 2:
                            arr = this.viewArr3;
                            break;
                    }
                    this.setList(arr);
                    this._viewUI.showList_list.vScrollBarSkin = "";
                    this._viewUI.showList_list.repeatX = 1;
                    this._viewUI.showList_list.scrollBar.elasticBackTime = 500;
                    this._viewUI.showList_list.scrollBar.elasticDistance = 20;
                };
                /** 商品列表设置数据 */
                ShangChengMediator.prototype.setList = function (arr) {
                    var _itemAttrBinDic = BagModel.getInstance().itemAttrData;
                    var _goodsBinDic = ShopModel.getInstance().GoodsBinDic;
                    var _goodslimitsBinDic = ShopModel.getInstance().goodslimitsBinDic;
                    var skinArr = ["common/ui/tongyong/baikuang.png", "common/ui/tongyong/lvkuang.png",
                        "common/ui/tongyong/lankuang.png", "common/ui/tongyong/zikuang.png",
                        "common/ui/tongyong/jinkuang.png"];
                    var data = [];
                    for (var i = 0; i < arr.length - 1; i++) {
                        var _goodsVo = _goodsBinDic[arr[i].id];
                        var _numText;
                        var _remaiVisi = false;
                        var _remaiSkin = "";
                        var _daZheVisi = false;
                        var _daZheText = "";
                        var _cellBtn = false;
                        //是否显示标签
                        if (this.scItemId != 0 && _goodsVo.itemId == this.scItemId) {
                            _remaiVisi = true;
                            _remaiSkin = "common/ui/tongyong/shop_xuqiu.png";
                        }
                        else if (arr[i].cuxiaotype == 1) {
                            _remaiVisi = true;
                            _remaiSkin = "common/ui/shopui/shop_xinpin.png";
                        }
                        else if (arr[i].cuxiaotype == 2) {
                            _remaiVisi = true;
                            _remaiSkin = "common/ui/shopui/shop_remai.png";
                        }
                        //是否显示打折
                        var daZhe = _goodsVo.prices[0] / _goodsVo.oldprices[0];
                        if (daZhe != 1) {
                            _daZheVisi = true;
                            var text = (Math.round(daZhe * 1000) / 100) + "";
                            _daZheText = (text.substring(0, text.indexOf(".") + 2)) + " 折";
                        }
                        //剩余数量设置
                        if (_goodsVo.limitType == 0 && _goodsVo.limitNum == 0) {
                            _numText = "";
                        }
                        else {
                            //限购
                            if (_goodsVo.limitNum <= _goodslimitsBinDic.get(arr[i].id)) {
                                _numText = "";
                                _remaiVisi = true;
                                _remaiSkin = "common/ui/shopui/shop_shoukong.png";
                            }
                            else {
                                if (_goodsVo.limitNum - _goodslimitsBinDic.get(arr[i].id) == 1) {
                                    _numText = "1";
                                }
                                else {
                                    _numText = _goodsVo.limitNum - _goodslimitsBinDic.get(arr[i].id) + "";
                                }
                            }
                        }
                        if (this.selectIndex == i) {
                            _cellBtn = true;
                        }
                        data.push({
                            cell_btn: { selected: _cellBtn },
                            num_lab: { text: _numText },
                            icon_img: { skin: shop.models.ShopModel.getInstance().getSrc(_itemAttrBinDic[_goodsVo.itemId].icon) },
                            diban_img: { skin: skinArr[_itemAttrBinDic[_goodsVo.itemId].nquality - 1] },
                            name_lab: { text: _itemAttrBinDic[_goodsVo.itemId].name },
                            biaoQian_img: { visible: _remaiVisi, skin: _remaiSkin },
                            money_lab: { text: this.setNumStyle(_goodsVo.prices[0]) },
                            money_img: { skin: this.getHuoBi(_goodsVo.currencys[0]) },
                            daZhe_lab: { text: _daZheText },
                            daZhe_img: { visible: _daZheVisi },
                        });
                    }
                    this._viewUI.showList_list.array = data;
                };
                /** 设置钱的数量显示样式 */
                ShangChengMediator.prototype.setNumStyle = function (num) {
                    var _num = num.toString();
                    var len = _num.length;
                    if (len <= 3 || num == 0)
                        return _num;
                    var r = len % 3;
                    return r > 0 ? _num.slice(0, r) + "," + _num.slice(r, len).match(/\d{3}/g).join(",") : _num.slice(r, len).match(/\d{3}/g).join(",");
                };
                /** 获取货币样式 */
                ShangChengMediator.prototype.getHuoBi = function (index) {
                    switch (index) {
                        case 1: //银币
                            return "common/ui/tongyong/common_yinb.png";
                        case 2: //金币
                            return "common/ui/tongyong/common_jinb.png";
                        case 3: //元宝
                            return "common/ui/tongyong/yuanbao.png";
                    }
                };
                ShangChengMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                };
                ShangChengMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    this._yinBiTips.off(modules.commonUI.USE_GOLD_EXCHANGE_EVENT, this, this.jinbijiesuo);
                    this._yinBiTips.off(modules.commonUI.USE_SILVER_EXCHANGE_EVENT, this, this.yuanbaojiesuo);
                    this._yinBiTips.off(modules.commonUI.USE_YUANBAO_EXCHANGE_EVENT, this, this.jinbibuzu);
                    this._remindViewMediator.off(modules.commonUI.RIGHT_BUTTON_EVENT, this, this.jumpToCharge);
                    this._remindViewMediator.off(modules.commonUI.LEFT_BUTTON_EVENT, this, this.cancleToJump);
                };
                ShangChengMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return ShangChengMediator;
            }(game.modules.UiMediator));
            shop.ShangChengMediator = ShangChengMediator;
        })(shop = modules.shop || (modules.shop = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ShangChengMediator.js.map