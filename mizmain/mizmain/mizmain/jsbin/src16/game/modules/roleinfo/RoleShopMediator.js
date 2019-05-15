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
        var roleinfo;
        (function (roleinfo) {
            /**
            * 酒馆、武器铺、药品商店复合
            */
            var RoleShopMediator = /** @class */ (function (_super) {
                __extends(RoleShopMediator, _super);
                /**
                * 酒馆、武器铺、药品商店复合
                */
                function RoleShopMediator(app, shoptype) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    /**当前选择列表项下标 */
                    _this.selectNum = 0;
                    _this._viewUI = new ui.common.RoleShopUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this.isCenter = true;
                    _this._app = app;
                    _this._XiaoJianPanMediator = new modules.tips.XiaoJianPanMediator(_this._viewUI);
                    _this.tips = new game.modules.commonUI.DisappearMessageTipsMediator(_this._app);
                    _this._JinBiBuZuViewMediator = new modules.commonUI.JinBiBuZuViewMediator(_this._viewUI, _this._app);
                    if (shoptype) {
                        _this.shoptype = shoptype;
                    }
                    _this.initialize();
                    _this.registerEvent();
                    _this.init();
                    return _this;
                }
                /**事件监听 */
                RoleShopMediator.prototype.eventListener = function () {
                    modules.mainhud.models.HudProxy.getInstance().on(modules.mainhud.models.SRefreshCurrency_EVENT, this, this.onRefreshCurrency);
                    modules.tips.models.TipsProxy.getInstance().on(modules.tips.models.ON_KRYBOARD, this, this.onKeyboard);
                };
                /**初始化 */
                RoleShopMediator.prototype.initialize = function () {
                    this.nameArr = new Array();
                    this.imageArr = new Array();
                    this.goodsIdArr = new Array();
                    this.itemIdArr = new Array();
                    this.moneyArr = new Array();
                    this.buyNumDic = new Dictionary();
                    this.keyNumDic = new Dictionary();
                };
                /**注册点击监听 */
                RoleShopMediator.prototype.registerEvent = function () {
                    this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
                    this._viewUI.buy_btn.on(LEvent.MOUSE_DOWN, this, this.buy);
                    this._viewUI.jia_btn.on(LEvent.MOUSE_DOWN, this, this.jia);
                    this._viewUI.jian_btn.on(LEvent.MOUSE_DOWN, this, this.jian);
                    this._viewUI.haveNum_lab.on(LEvent.MOUSE_DOWN, this, this.xiaojianPan);
                };
                /**
                 * 其它地方显示该界面
                 * @param id 要显示目标的id
                 */
                RoleShopMediator.prototype.onShow = function (id) {
                    if (id) {
                        this.targetId = id;
                    }
                    this.show();
                    // this.showTargetInShopPos();
                };
                /**
                 * 显示出物品在商店里的位置
                 */
                RoleShopMediator.prototype.showTargetInShopPos = function () {
                    if (this.targetPos) {
                        this._viewUI.wupin_list.scrollTo(this.targetPos);
                        this.clickItem(this.targetPos);
                    }
                };
                RoleShopMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                    this.key = true;
                    this.getListData();
                    var num = this.targetPos ? this.targetPos : 0;
                    this.clickItem(num);
                    this.eventListener();
                };
                /**打开小键盘 */
                RoleShopMediator.prototype.xiaojianPan = function (e) {
                    var xPos = e.currentTarget.mouseX + 130;
                    var yPos = e.currentTarget.mouseY + 800;
                    this._XiaoJianPanMediator.onShow(xPos, yPos);
                };
                /**接收小键盘输入 */
                RoleShopMediator.prototype.onKeyboard = function (num) {
                    if (this.key) {
                        if (num != -2) {
                            //点击清除按钮
                            if (num == -1) {
                                var yinbiTet = this._viewUI.wupin_list.getCell(this.selectNum).getChildByName("wupin_btn").getChildByName("yinbiNum_lab");
                                var str = this.keyNumDic.get(RoleEnum.DRUG_SHOP);
                                //判断小键盘输入字符串长度
                                if (str.length == 1) {
                                    str = (num + 2).toString();
                                    this.keyNumDic.set(RoleEnum.DRUG_SHOP, "");
                                }
                                else if (str.length == 2) {
                                    str = str.substring(0, str.length - 1);
                                    this.keyNumDic.set(RoleEnum.DRUG_SHOP, str);
                                }
                                else
                                    return;
                                this._viewUI.cost_lab.text = (parseInt(yinbiTet.text) * parseInt(str)).toString();
                                this._viewUI.haveNum_lab.text = str;
                                this.buyNumDic.set(this.selectNum, parseInt(str));
                            }
                            else {
                                var yinbiTet = this._viewUI.wupin_list.getCell(this.selectNum).getChildByName("wupin_btn").getChildByName("yinbiNum_lab");
                                var str = this.keyNumDic.get(RoleEnum.DRUG_SHOP);
                                if (str.length < 2) {
                                    //第一个输入的数字不能为0
                                    if (num == 0 && str.length == 0)
                                        return;
                                    str += num.toString();
                                    this.keyNumDic.set(RoleEnum.DRUG_SHOP, str);
                                }
                                else if (str.length == 2) {
                                    str = RoleEnum.MAXINPUT_VALUE.toString();
                                    this.keyNumDic.set(RoleEnum.DRUG_SHOP, str);
                                    var prompt_1 = HudModel.getInstance().promptAssembleBack(PromptExplain.INPUT_MAX_LIMIT);
                                    this.tips.onShow(prompt_1);
                                }
                                this._viewUI.cost_lab.text = (parseInt(yinbiTet.text) * parseInt(str)).toString();
                                this._viewUI.haveNum_lab.text = str;
                                this.buyNumDic.set(this.selectNum, parseInt(str));
                            }
                        }
                        else {
                            //关闭小键盘，清空记录
                            this.keyNumDic.set(RoleEnum.DRUG_SHOP, "");
                        }
                    }
                };
                /**购买*/
                RoleShopMediator.prototype.buy = function () {
                    //如果银币不够
                    var needMoney = parseInt(this._viewUI.cost_lab.text);
                    if (needMoney > HudModel.getInstance().sliverNum) {
                        /** 需要兑换的银币 */
                        var duihuanMoney = needMoney - HudModel.getInstance().sliverNum;
                        /** 兑换所需的仙晶 */
                        var _needFuShi;
                        if ((Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI) - HudModel.getInstance().fuShiNum) <= 0) {
                            _needFuShi = Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI);
                        }
                        else {
                            _needFuShi = (Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI) - HudModel.getInstance().fuShiNum);
                        }
                        /** 兑换所需的金币 */
                        var _needGold;
                        if ((Math.ceil(duihuanMoney / RoleEnum.JINBI_YINBI) - HudModel.getInstance().goldNum) <= 0) {
                            _needGold = Math.ceil(duihuanMoney / RoleEnum.JINBI_YINBI);
                        }
                        else {
                            _needGold = (Math.ceil(duihuanMoney / RoleEnum.JINBI_YINBI) - HudModel.getInstance().goldNum);
                        }
                        this._JinBiBuZuViewMediator.onShow(false, duihuanMoney.toString(), _needFuShi.toString(), _needGold.toString());
                        this._JinBiBuZuViewMediator.once(modules.commonUI.USE_SILVER_EXCHANGE_EVENT, this, this.buySliverFromYuanBao, [_needFuShi]);
                        this._JinBiBuZuViewMediator.once(modules.commonUI.USE_YUANBAO_EXCHANGE_EVENT, this, this.goCharge, [_needFuShi]);
                        this._JinBiBuZuViewMediator.once(modules.commonUI.USE_GOLD_EXCHANGE_EVENT, this, this.jinbiDuihuan);
                    }
                    else
                        /**
                         * 酒馆购买协议
                         * 商店序号
                         * 商品id
                         * 买卖数量
                         * 购买类型
                         */
                        RequesterProtocols._instance.c2s_exchange_shop(this.shoptype, this.goodsIdArr[this.selectNum], this.buyNumDic.get(this.selectNum), RoleEnum.BUY_TYPE);
                };
                /**金币兑换银币成功 */
                RoleShopMediator.prototype.jinbiDuihuan = function () {
                    //金币数量足够兑换银币，直接购买
                    RequesterProtocols._instance.c2s_exchange_shop(this.shoptype, this.goodsIdArr[this.selectNum], this.buyNumDic.get(this.selectNum), RoleEnum.BUY_TYPE); //商店购买协议
                };
                /**仙晶兑换 */
                RoleShopMediator.prototype.goCharge = function (yuanbao) {
                    var fuShiNum = HudModel.getInstance().fuShiNum;
                    if (fuShiNum < yuanbao) {
                        this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
                        this._TipsMessageMediator.show();
                        var param = new Dictionary();
                        param.set("contentId", RoleEnum.XIANJIN_TIP);
                        this._TipsMessageMediator.showContent(param);
                        game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.goRecharge);
                    }
                    else {
                        RequesterProtocols._instance.c2s_exchange_currency(3, 2, yuanbao);
                    }
                };
                /**通过元宝购买物品 */
                RoleShopMediator.prototype.buySliverFromYuanBao = function (yuanbao) {
                    var fuShiNum = HudModel.getInstance().fuShiNum;
                    if (fuShiNum < yuanbao) {
                        this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
                        this._TipsMessageMediator.show();
                        var param = new Dictionary();
                        param.set("contentId", RoleEnum.XIANJIN_TIP);
                        this._TipsMessageMediator.showContent(param);
                        game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.goRecharge);
                    }
                    else {
                        RequesterProtocols._instance.c2s_exchange_currency(3, 1, yuanbao);
                        //元宝数量足够兑换银币，直接购买
                        RequesterProtocols._instance.c2s_exchange_shop(this.shoptype, this.goodsIdArr[this.selectNum], this.buyNumDic.get(this.selectNum), RoleEnum.BUY_TYPE); //商店购买协议
                    }
                };
                /**充值 */
                RoleShopMediator.prototype.goRecharge = function () {
                    modules.ModuleManager.jumpPage(modules.ModuleNames.SHOP, shopMediatorType.CHONGZHI, this._app);
                    game.modules.shop.models.ShopProxy._instance.event(game.modules.shop.models.Go_Charge); //前往充值界面。关闭当前界
                };
                /**刷新银币 */
                RoleShopMediator.prototype.onRefreshCurrency = function (e) {
                    this._viewUI.moneyNum_lab.text = HudModel.getInstance().sliverNum.toString(); //银币
                };
                /**初始化数据 */
                RoleShopMediator.prototype.init = function () {
                    this.CNpcSaleObj = RoleInfoModel.getInstance().CNpcSaleBinDic;
                    this.CGoodsObj = ShopModel.getInstance().GoodsBinDic;
                    this.CItemAttrObj = BagModel.getInstance().itemAttrData;
                    this.goodsIdArr.length = 0;
                    this.itemIdArr.length = 0;
                    this.moneyArr.length = 0;
                    this.imageArr.length = 0;
                    this.nameArr.length = 0;
                    if (this.shoptype) { //如果商店类型有值，说明是通过NPC打开该界面
                        if (this.shoptype == shopType.WEAPON_SHOP) { //是兵器铺的类型
                            for (var i = 0; i < this.CNpcSaleObj[shopType.WEAPON_SHOP]["goodsids"].length; i++) {
                                this.goodsIdArr.push(this.CNpcSaleObj[shopType.WEAPON_SHOP]["goodsids"][i]); //获取兵器铺的商品信息
                            }
                            this._viewUI.title_lab.text = "兵器铺";
                        }
                        else if (this.shoptype == shopType.BAR_SHOP) { //是酒馆的类型
                            for (var i = 0; i < this.CNpcSaleObj[shopType.BAR_SHOP]["goodsids"].length; i++) {
                                this.goodsIdArr.push(this.CNpcSaleObj[shopType.BAR_SHOP]["goodsids"][i]); //获取酒馆的商品信息
                            }
                            this._viewUI.title_lab.text = "酒馆老板";
                        }
                        else if (this.shoptype == shopType.DRUG_SHOP) { //是药品商店类型
                            for (var i = 0; i < this.CNpcSaleObj[shopType.DRUG_SHOP]["goodsids"].length; i++) {
                                this.goodsIdArr.push(this.CNpcSaleObj[shopType.DRUG_SHOP]["goodsids"][i]); //获取药品商店的商品信息
                            }
                            this._viewUI.title_lab.text = "药品商店";
                        }
                    }
                    else { //没有则是通过人物属性界面打开该界面
                        for (var i = 0; i < this.CNpcSaleObj[shopType.BAR_SHOP]["goodsids"].length; i++) {
                            this.goodsIdArr.push(this.CNpcSaleObj[shopType.BAR_SHOP]["goodsids"][i]); //获取酒馆的商品信息
                        }
                        this.shoptype = shopType.BAR_SHOP; //并且给上商店类型
                        this._viewUI.title_lab.text = "酒馆老板";
                    }
                    for (var i = 0; i < this.goodsIdArr.length; i++) {
                        this.itemIdArr.push(this.CGoodsObj[this.goodsIdArr[i]]["itemId"]);
                    }
                    //初始化商店物品兑换价格
                    for (var i = 0; i < this.goodsIdArr.length; i++) {
                        var data = {};
                        data[i] = { Label: this.CGoodsObj[this.goodsIdArr[i]]["prices"][0] };
                        this.moneyArr.push(data[i]);
                    }
                    //初始化商店物品名称
                    for (var i = 0; i < this.itemIdArr.length; i++) {
                        var data = {};
                        data[i] = { Label: this.CItemAttrObj[this.itemIdArr[i]]["name"] };
                        this.nameArr.push(data[i]);
                        this.imageArr.push({ img: "common/icon/item/" + this.CItemAttrObj[this.itemIdArr[i]]["icon"] + ".png" });
                    }
                    //初始化物品购买数量
                    for (var i = 0; i < this.nameArr.length; i++) {
                        this.buyNumDic.set(i, 0);
                    }
                    //初始化小键盘map
                    this.keyNumDic.set(RoleEnum.DRUG_SHOP, "");
                    this.getListData();
                    this._viewUI.moneyNum_lab.text = HudModel.getInstance().sliverNum.toString(); //银币	
                };
                /**初始化物品列表 */
                RoleShopMediator.prototype.getListData = function () {
                    this._viewUI.wupin_list.vScrollBarSkin = "";
                    this._viewUI.wupin_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.wupin_list.scrollBar.elasticDistance = 50;
                    this._viewUI.wupin_list.array = this.nameArr;
                    this._viewUI.wupin_list.renderHandler = new Handler(this, this.onRender);
                    this._viewUI.wupin_list.selectHandler = new Handler(this, this.clickItem);
                    this._viewUI.wupin_list.selectedIndex = -1;
                };
                /**渲染物品列表 */
                RoleShopMediator.prototype.onRender = function (cell, index) {
                    if (index > this.nameArr.length)
                        return;
                    var nameLab = cell.getChildByName("wupin_btn").getChildByName("name_lab");
                    var itemImg = cell.getChildByName("wupin_btn").getChildByName("item_img");
                    var yinbiTet = cell.getChildByName("wupin_btn").getChildByName("yinbiNum_lab");
                    var xuqiu = cell.getChildByName("wupin_btn").getChildByName("shopxuqiu_img");
                    var wupinBtn = cell.getChildByName("wupin_btn");
                    var tipsBtn = cell.getChildByName("tips_btn");
                    tipsBtn.on(LEvent.CLICK, this, this.getItemTips, [index]);
                    //渲染除选中按钮外，列表其他按钮的颜色
                    if (index != this.selectNum) {
                        wupinBtn.skin = "common/ui/tongyong/common_list_textbg.png";
                    }
                    nameLab.changeText(this.nameArr[index].Label);
                    itemImg.skin = this.imageArr[index].img;
                    yinbiTet.changeText(this.moneyArr[index].Label);
                    if (this.itemIdArr[index] == this.targetId) {
                        // 	xuqiu.skin = "common/ui/shopui/shop_xuqiu.png"
                        this.targetPos = index;
                        // 	//获取默认被选中的按钮
                        // 	var wupinBtn_default: Laya.Button = this._viewUI.wupin_list.getCell(this.selectNum).getChildByName("wupin_btn") as Laya.Button;
                        // 	//更换其按钮图片
                        // 	wupinBtn_default.skin = "common/ui/tongyong/common_list_textbg.png";
                        // 	//当前这个目标按钮背景图为选中的背景图
                        // 	wupinBtn.skin = "common/ui/tongyong/common_list_textbg2.png";
                    }
                    else {
                        xuqiu.skin = "";
                    }
                };
                /**处理物品列表点击 */
                RoleShopMediator.prototype.clickItem = function (index) {
                    if (index != -1) {
                        this.selectNum = index;
                        var yinbiTet = this._viewUI.wupin_list.getCell(this.selectNum).getChildByName("wupin_btn").getChildByName("yinbiNum_lab");
                        var wupinBtn = this._viewUI.wupin_list.getCell(this.selectNum).getChildByName("wupin_btn");
                        //点击更换按钮图片
                        wupinBtn.skin = "common/ui/tongyong/common_list_textbg2.png";
                        //初始化每个物品的购买数量
                        var tempNum = this.buyNumDic.get(this.selectNum);
                        //如果没有超过最大值
                        if (RoleEnum.MAXINPUT_VALUE > tempNum) {
                            tempNum++;
                            this.buyNumDic.set(index, tempNum);
                            for (var i = 0; i < this.nameArr.length; i++) {
                                if (i != this.selectNum)
                                    this.buyNumDic.set(i, 0);
                            }
                            this._viewUI.cost_lab.text = (parseInt(yinbiTet.text) * tempNum).toString();
                            this._viewUI.haveNum_lab.text = tempNum.toString();
                        }
                        this._viewUI.wupin_list.selectedIndex = -1;
                    }
                };
                RoleShopMediator.prototype.getItemTips = function (index) {
                    var ypos = index <= 0 ? 100 : Math.ceil(this._viewUI.bg_img.mouseY);
                    var parame = new Dictionary();
                    parame.set("itemId", this.itemIdArr[index]);
                    parame.set("xpos", 250);
                    parame.set("ypos", ypos);
                    this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.commonItem, parame);
                };
                /**增加按钮 */
                RoleShopMediator.prototype.jia = function () {
                    var yinbiTet = this._viewUI.wupin_list.getCell(this.selectNum).getChildByName("wupin_btn").getChildByName("yinbiNum_lab");
                    var tempNum = this.buyNumDic.get(this.selectNum);
                    //如果没有超过最大值
                    if (RoleEnum.MAXINPUT_VALUE > tempNum) {
                        tempNum++;
                        this.buyNumDic.set(this.selectNum, tempNum);
                        for (var i = 0; i < this.nameArr.length; i++) {
                            if (i != this.selectNum)
                                this.buyNumDic.set(i, 0);
                        }
                        this._viewUI.cost_lab.text = (parseInt(yinbiTet.text) * tempNum).toString();
                        this._viewUI.haveNum_lab.text = tempNum.toString();
                    }
                };
                /**减少按钮 */
                RoleShopMediator.prototype.jian = function () {
                    var tempNum = this.buyNumDic.get(this.selectNum);
                    if (tempNum > 1) {
                        var yinbiTet = this._viewUI.wupin_list.getCell(this.selectNum).getChildByName("wupin_btn").getChildByName("yinbiNum_lab");
                        tempNum--;
                        this.buyNumDic.set(this.selectNum, tempNum);
                        for (var i = 0; i < this.nameArr.length; i++) {
                            if (i != this.selectNum)
                                this.buyNumDic.set(i, 0);
                        }
                        this._viewUI.cost_lab.text = (parseInt(yinbiTet.text) * tempNum).toString();
                        this._viewUI.haveNum_lab.text = tempNum.toString();
                    }
                };
                RoleShopMediator.prototype.hide = function () {
                    modules.tips.models.TipsProxy.getInstance().off(modules.tips.models.ON_KRYBOARD, this, this.onKeyboard);
                    this.key = false;
                    _super.prototype.hide.call(this);
                    roleinfo.models.RoleInfoModel.getInstance().currentKey = RoleEnum.XINXI_KEY;
                    if (this.shoptype) { //如果是通过NPC打开该界面，则不做任何操作
                    }
                    else { //如果是从查看人物信息购买生命存储或者法力存储跳到该界面，关闭后重新打开人物属性界面
                        modules.ModuleManager.show(modules.ModuleNames.ROLE_Info, this._app);
                    }
                    //初始化物品购买数量
                    for (var i = 0; i < this.nameArr.length; i++) {
                        this.buyNumDic.set(i, 0);
                    }
                    //通知主界面关闭蒙版
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.CLOSEVIEW_EVENT);
                };
                RoleShopMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return RoleShopMediator;
            }(game.modules.UiMediator));
            roleinfo.RoleShopMediator = RoleShopMediator;
        })(roleinfo = modules.roleinfo || (modules.roleinfo = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=RoleShopMediator.js.map