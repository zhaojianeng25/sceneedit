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
        var sale;
        (function (sale) {
            /** 出售页面 */
            var SaleSellViewMediator = /** @class */ (function (_super) {
                __extends(SaleSellViewMediator, _super);
                function SaleSellViewMediator(uiLayer, app) {
                    var _this = _super.call(this, uiLayer) || this;
                    /**复合表 */
                    _this.itemAttrData = BagModel.getInstance().itemAttrData;
                    /**杂货表 */
                    _this.groceryEffectData = StrengTheningModel.getInstance().groceryEffectData;
                    /**宠物信息表 */
                    _this.petCPetAttrData = game.modules.pet.models.PetModel._instance.petCPetAttrData;
                    /**
                   * 三级摆摊配置表 通过物品 id 取值
                   */
                    _this.cMarketThreeTableDataForItemid = SaleModel._instance.cMarketThreeTableDataForItemid;
                    /**npc造型表 */
                    _this.cnpcShapeData = game.modules.createrole.models.LoginModel.getInstance().cnpcShapeInfo;
                    /**程序内字符串表 */
                    _this.cstringResConfigData = game.modules.tips.models.TipsModel._instance.cstringResConfigData;
                    /**客户端信息提示表 */
                    _this.chatMessageTips = game.modules.chat.models.ChatModel._instance.chatMessageTips;
                    /**排序后的一级摆摊配置表 */
                    _this.m_cMarketFirstTableData = [];
                    /**没有排序的一级摆摊配置表 */
                    _this.cMarketFirstTableData = SaleModel._instance.cMarketFirstTableData;
                    /**二级摆摊配置表 */
                    _this.cMarketSecondTableData = SaleModel._instance.cMarketSecondTableData;
                    /**三级摆摊配置表 */
                    _this.cMarketThreeTableData = SaleModel._instance.cMarketThreeTableData;
                    /**可以摆摊上架的物品 */
                    _this.CanSaleArr = [];
                    /**可以上架物品详细信息 */
                    _this.daojuArr = [];
                    /**上架物品详细信息 */
                    _this.detailsArr = [];
                    _this._viewUI = new ui.common.SaleChuShouUI();
                    _this.isCenter = false;
                    _this._app = app;
                    _this._SaleShelf = new sale.SaleShelfViewMediator(_this._viewUI, _this._app);
                    _this.DisappearMessageTipsMediator = new DisappearMessageTipsMediator(_this._app);
                    _this.init();
                    return _this;
                }
                /**初始化数据 */
                SaleSellViewMediator.prototype.init = function () {
                    this.CMarketGoods();
                    this.getPaimaiItem();
                    this.loadView(0);
                    this._viewUI.daojuBtn_tab.selectedIndex = 0;
                    this._viewUI.daojuBtn_tab.selectHandler = new Handler(this, this.loadView);
                    this._viewUI.daoju_list.selectHandler = new Handler(this, this.daojuListSelect);
                    this._viewUI.btnJiaoY.on(LEvent.MOUSE_DOWN, this, this.onbtnJiaoY);
                    sale.models.SaleProxy._instance.on(sale.models.SMarketContainerBrowse, this, this.showBooth);
                    /**物品删除刷新 */
                    game.modules.bag.models.BagProxy.getInstance().on(game.modules.bag.models.REFRESH_BAG_COUNT, this, this.flushItem);
                    /**物品数量改变刷新 */
                    game.modules.bag.models.BagProxy.getInstance().on(game.modules.bag.models.REFRESH_SALE_COUNT, this, this.flushItem);
                    /**物品添加刷新 */
                    game.modules.bag.models.BagProxy.getInstance().on(game.modules.bag.models.REFRESH_BAG_DEPOT_COUNT, this, this.flushItem);
                    /**拥有宠物栏增加刷新 */
                    game.modules.pet.models.PetProxy.getInstance().on(game.modules.pet.models.ADD_EVENT, this, this.showPet);
                    /**拥有宠物栏删除刷新 */
                    game.modules.pet.models.PetProxy.getInstance().on(game.modules.pet.models.DEL_PET, this, this.showPet);
                    /**上架成功 */
                    sale.models.SaleProxy._instance.on(sale.models.SMarketUpSucc, this, this.showSuccessView);
                };
                /**数据刷新 */
                SaleSellViewMediator.prototype.flushItem = function () {
                    this.getPaimaiItem();
                    this.CMarketContainerBrowse();
                    this.loadView(0);
                };
                /**选择显示道具还是宠物 */
                SaleSellViewMediator.prototype.loadView = function (index) {
                    this._viewUI.daojuView_ViewStack.selectedIndex = index;
                    if (index == 1) {
                        this.showPet();
                    }
                    else {
                        this.onDaoju();
                    }
                };
                /**获取拍卖的物品 */
                SaleSellViewMediator.prototype.getPaimaiItem = function () {
                    this.CanSaleArr = [];
                    var bag1 = BagModel.getInstance().getBagGameItemData(BagTypes.BAG).items;
                    if (bag1 != null) {
                        this.addCanSale(bag1, BagTypes.BAG);
                    }
                };
                /**将能拍卖的物品存起来 */
                SaleSellViewMediator.prototype.addCanSale = function (bag, bagType) {
                    for (var i = 0; i < bag.length; i++) {
                        var itemId = bag[i].id; //物品id
                        var key = bag[i].key; //key
                        var number = bag[i].number; //数量
                        var flags = bag[i].flags; //是否被绑定
                        var markettime = bag[i].markettime; //冻结时间
                        var bCanSale = this.itemAttrData[itemId].bCanSale; //可否上架摆摊
                        if (bCanSale == 1) {
                            this.CanSaleArr.push({ itemId: itemId, packid: bagType, key: key, number: number, flags: flags, markettime: markettime });
                        }
                    }
                };
                /**
                 * 宠物
                 */
                SaleSellViewMediator.prototype.showPet = function () {
                    var pets = game.modules.pet.models.PetModel._instance.pets;
                    var petKeys = pets.keys;
                    var petArr = [];
                    if (petKeys.length <= 0) {
                        this._viewUI.pet_list.visible = false;
                        return;
                    }
                    else {
                        this._viewUI.pet_list.visible = true;
                    }
                    for (var i = 0; i < petKeys.length; i++) {
                        var key = petKeys[i];
                        var pet = pets.get(key);
                        if (pet.flag > 0)
                            continue; //绑定或锁定的宠物不能出售
                        var petId = pet.id; //宠物id
                        var petKey = pet.key; //key
                        var petName = pet.name; //名称
                        var petLevel = pet.level; //等级
                        var petuseLevel = pet.useLevel; //参战等级
                        var quality = this.petCPetAttrData[petId].quality; //品质
                        var modelid = this.petCPetAttrData[petId].modelid; //造型id
                        var petIconId = this.cnpcShapeData[modelid].littleheadID; //iconid
                        var petIcon = SaleModel._instance.getIcon(petIconId);
                        var frameImg = StrengTheningModel._instance.frameSkinArr[quality - 1];
                        petArr.push({
                            petName_label: petName, petLevel_label: petLevel + this.cstringResConfigData[3].msg,
                            petIcon_img: petIcon, bs_img: frameImg,
                            key: petKey, pet: pet
                        });
                    }
                    var petIndex = game.modules.createrole.models.LoginModel.getInstance().roleDetail.petIndex; // 当前出战宠物的key
                    var canzhanPetId = -1;
                    if (petIndex != -1) {
                        canzhanPetId = pets.get(petIndex).id; //参战宠物id
                    }
                    SaleModel._instance.showList(this._viewUI.pet_list, petArr);
                    this._viewUI.pet_list.selectHandler = new Handler(this, this.petlistSelect, [petIndex, petArr]);
                    this._viewUI.pet_list.renderHandler = new Handler(this, this.petlistRender, [petIndex, petArr]);
                };
                /**宠物列表显示 */
                SaleSellViewMediator.prototype.petlistRender = function (petIndex, petArr, cell, index) {
                    var zp_img = cell.getChildByName("zp_img");
                    var isCanZhan_img = cell.getChildByName("isCanZhan_img");
                    zp_img.visible = false;
                    isCanZhan_img.visible = false;
                    var petId = petArr[index].pet.id;
                    var petkey = petArr[index].key;
                    if (petIndex != -1) {
                        if (petIndex == petkey) { // 出战的宠物
                            isCanZhan_img.visible = true;
                        }
                    }
                    var petscore = petArr[index].pet.petscore;
                    var treasureScore = this.petCPetAttrData[petId].treasureScore;
                    if (petscore >= treasureScore) {
                        zp_img.visible = true;
                    }
                };
                /**宠物列表选择 */
                SaleSellViewMediator.prototype.petlistSelect = function (petIndex, petArr, index) {
                    if (this._viewUI.pet_list.selectedIndex != -1) {
                        var petId = petArr[index].pet.id;
                        var petkey = petArr[index].pet.key;
                        var uselevel = this.petCPetAttrData[petId].uselevel; //当前宠物的参战等级
                        var kind = this.petCPetAttrData[petId].kind;
                        var unusualid = this.petCPetAttrData[petId].unusualid;
                        var marketfreezeexpire = petArr[index].pet.marketfreezeexpire; //冻结时间
                        if (marketfreezeexpire == 0) { //是否是拍卖上购买的宠物
                            if (petIndex != petkey) { //是否参战
                                if (kind == 4 || unusualid == 1) { //神兽
                                    this._SalePetViewMediator = new sale.SalePetViewMediator(this._viewUI, this._app);
                                    this._SalePetViewMediator.show();
                                    this._SalePetViewMediator.showPetDetails(SaleModel.salePetMarketUpOrDown.MarketUp, petArr[index].pet);
                                }
                                else {
                                    if (uselevel < 35) { //参战等级是否大于35
                                        var prompt_1 = this.chatMessageTips[150511].msg.replace("$parameter1$", 35);
                                        this.DisappearMessageTipsMediator.onShow(prompt_1);
                                    }
                                    else {
                                        var petscore = petArr[index].pet.petscore;
                                        var treasureScore = this.petCPetAttrData[petId].treasureScore;
                                        if (petscore >= treasureScore) { //是否珍品
                                            this._SalePetViewMediator = new sale.SalePetViewMediator(this._viewUI, this._app);
                                            this._SalePetViewMediator.show();
                                            this._SalePetViewMediator.showPetDetails(SaleModel.salePetMarketUpOrDown.MarketUp, petArr[index].pet);
                                        }
                                        else {
                                            var prompt_2 = this.chatMessageTips[160056].msg;
                                            this.DisappearMessageTipsMediator.onShow(prompt_2);
                                        }
                                    }
                                }
                            }
                            else {
                                var prompt_3 = this.chatMessageTips[150509].msg;
                                this.DisappearMessageTipsMediator.onShow(prompt_3);
                            }
                        }
                        else {
                            var prompt_4 = this.chatMessageTips[190021].msg;
                            var currentTime = (new Date()).valueOf();
                            var day = this.times2day(marketfreezeexpire - currentTime);
                            var m_prompt = prompt_4.replace("$parameter1$", day).replace("$parameter2$", day);
                            this.DisappearMessageTipsMediator.onShow(m_prompt);
                        }
                        this._viewUI.pet_list.selectedIndex = -1;
                    }
                };
                /**时间转换为天数 */
                SaleSellViewMediator.prototype.times2day = function (time) {
                    var mm = 60 * 1000;
                    var hh = 60 * mm;
                    var dd = hh * 24;
                    var day = parseInt((time / dd) + "");
                    return day;
                };
                /**
                 * 出售道具列表
                 */
                SaleSellViewMediator.prototype.onDaoju = function () {
                    this.daojuArr = [];
                    if (this.CanSaleArr.length <= 0) {
                        this._viewUI.daoju_list.visible = false;
                        return;
                    }
                    else {
                        this._viewUI.daoju_list.visible = true;
                    }
                    for (var i = 0; i < this.CanSaleArr.length; i++) {
                        var itemId = this.CanSaleArr[i].itemId;
                        var flags = this.CanSaleArr[i].flags; //是否绑定
                        var markettime = this.CanSaleArr[i].markettime; //冻结时间
                        var nquality = this.itemAttrData[itemId].nquality; //品质
                        var icon = this.itemAttrData[itemId].icon; //图标id
                        var itemIcon = SaleModel._instance.getIcon(icon);
                        var frameImg = StrengTheningModel._instance.frameSkinArr[nquality - 1];
                        var number = this.CanSaleArr[i].number;
                        var level = this.itemAttrData[itemId].level;
                        this.daojuArr.push({ itemIcon_img: itemIcon, bs_img: frameImg, itemNum_label: number, level: level, itemId: itemId, flags: flags, markettime: markettime });
                    }
                    SaleModel._instance.showList(this._viewUI.daoju_list, this.daojuArr);
                    this._viewUI.daoju_list.renderHandler = new Handler(this, this.daojuListRender);
                    this._viewUI.daoju_list.selectHandler = new Handler(this, this.daojuListSelect);
                };
                /**显示物品信息 */
                SaleSellViewMediator.prototype.showShelf = function () {
                    this._SaleShelf.show();
                };
                /**物品选择 */
                SaleSellViewMediator.prototype.daojuListSelect = function (index) {
                    if (index >= 0 && index <= this.daojuArr.length - 1) {
                        var item = this.CanSaleArr[index];
                        SaleModel._instance.saleItmeId = item.itemId;
                        this.item = item;
                        var flags = this.daojuArr[index].flags;
                        var markettime = this.daojuArr[index].markettime;
                        var isflags = BagModel.getInstance().itemIsBind(flags); //是否绑定
                        if (!isflags) {
                            if (markettime <= 0) { //是否有冻结时间
                                RequesterProtocols._instance.c2s_get_marketupprice(item.packid, item.key);
                                sale.models.SaleProxy._instance.on(sale.models.SGetMarketUpPrice, this, this.showSaleItem);
                            }
                            else {
                                var currentTime = (new Date()).valueOf(); // 当前系统时间
                                var marketresidue = markettime - currentTime; // 冻结时间剩余天数
                                var time = this.times2day(marketresidue);
                                var promptarr = [time];
                                var prompt_5 = HudModel.getInstance().promptAssembleBack(PromptExplain.MARKET_TIME_ITEM, promptarr);
                                this.DisappearMessageTipsMediator.onShow(prompt_5);
                            }
                        }
                        else {
                            var prompt_6 = HudModel.getInstance().promptAssembleBack(PromptExplain.FLAGS_ITEM);
                            this.DisappearMessageTipsMediator.onShow(prompt_6);
                        }
                        this._viewUI.daoju_list.selectedIndex = -1;
                    }
                };
                /** 查找在可出售道具中的索引位置 */
                SaleSellViewMediator.prototype.findItemIndex = function () {
                    var _currItemId = modules.tips.models.TipsModel.getInstance().currItemId;
                    var _currItemKey = modules.tips.models.TipsModel.getInstance().currItemKey;
                    if (_currItemId != -1 && _currItemKey != -1) {
                        for (var i = 0; i < this.CanSaleArr.length; i++) {
                            if (_currItemId == this.CanSaleArr[i].itemId && _currItemKey == this.CanSaleArr[i].key) {
                                this.daojuListSelect(i);
                                modules.tips.models.TipsModel.getInstance().currItemId = -1;
                                modules.tips.models.TipsModel.getInstance().currItemKey = -1;
                                sale.models.SaleModel.getInstance().tiaozhuanid = ViewIndex.BUY;
                                break;
                            }
                        }
                    }
                };
                /**显示出售物品 */
                SaleSellViewMediator.prototype.showSaleItem = function (SGetMarketUpPriceDic) {
                    this._SaleShelf = new sale.SaleShelfViewMediator(this._viewUI, this._app);
                    this._SaleShelf.show();
                    this._SaleShelf.showSaleItem(this.item, SGetMarketUpPriceDic);
                };
                /**道具列表显示 */
                SaleSellViewMediator.prototype.daojuListRender = function (cell, index) {
                    if (index < this.daojuArr.length) {
                        var itemNum_label = cell.getChildByName("itemNum_label");
                        var level_lab = cell.getChildByName("level_lab");
                        var lockimg_img = cell.getChildByName("lockimg_img");
                        var number = this.daojuArr[index].itemNum_label;
                        var itemId = this.daojuArr[index].itemId;
                        var level = this.daojuArr[index].level;
                        var flags = this.daojuArr[index].flags;
                        var markettime = this.daojuArr[index].markettime;
                        var isflags = BagModel.getInstance().itemIsBind(flags); //是否绑定
                        if (120000 <= itemId && itemId <= 126675 || 140000 <= itemId && itemId <= 140005 || 10000 <= itemId && itemId <= 10009 || 111000 <= itemId && itemId <= 111053) { //装备 食物
                            itemNum_label.visible = false;
                            level_lab.visible = true;
                            if (111000 <= itemId && itemId <= 111053) {
                                var item = this.CanSaleArr[index];
                                var packid = item.packid;
                                var key = item.key;
                                var tips = SaleModel._instance.getItemTips(packid, key);
                                if (tips != -1) {
                                    level_lab.text = this.cstringResConfigData[1].msg + tips.quality;
                                }
                            }
                            else {
                                level_lab.text = this.cstringResConfigData[1].msg + level;
                            }
                        }
                        else {
                            itemNum_label.visible = true;
                            level_lab.visible = false;
                            if (number > 1) {
                                itemNum_label.text = number;
                            }
                            else {
                                itemNum_label.text = "";
                            }
                        }
                        if (isflags || markettime > 0)
                            lockimg_img.visible = true;
                        else
                            lockimg_img.visible = false;
                    }
                };
                /**
                 * 显示上架的物品列表
                 */
                SaleSellViewMediator.prototype.showBooth = function () {
                    var pets = game.modules.pet.models.PetModel._instance.pets;
                    var boothList = this._viewUI.booth_list;
                    var GoodList = sale.models.SaleModel._instance.GoodList;
                    /**上架物品 */
                    var itemArr = GoodList.get(actiontype.gongshi);
                    if (itemArr == null)
                        return;
                    this.detailsArr = [];
                    var goodNum = itemArr.length; //上架物品的数量
                    this._viewUI.num_lab.text = goodNum + "/8";
                    for (var i = 0; i < itemArr.length; i++) {
                        var itemId = itemArr[i].itemid; //上架物品配置表 id
                        var id = itemArr[i].id; //服务器数据库唯一id
                        var num = itemArr[i].num; // 物品数量
                        var level = itemArr[i].level; // 物品的等级
                        var roleid = itemArr[i].saleRoleid; //角色id
                        var key = itemArr[i].key; // 物品的key值
                        var price = itemArr[i].price; // 上架物品的价格
                        var showtime = itemArr[i].showtime; //公示时间
                        var expiretime = itemArr[i].expiretime; //物品过期时间
                        if (43050 <= itemId && itemId <= 43519) {
                            var petName = this.petCPetAttrData[itemId].name;
                            var num = itemArr[i].num;
                            var quality = this.petCPetAttrData[itemId].quality; //品质
                            var modelid = this.petCPetAttrData[itemId].modelid; //造型id
                            var petIconId = this.cnpcShapeData[modelid].littleheadID; //iconid
                            var petIcon = SaleModel._instance.getIcon(petIconId);
                            var frameImg = StrengTheningModel._instance.frameSkinArr[quality - 1];
                            this.detailsArr.push({
                                bs_img: frameImg, itemIcon_img: petIcon,
                                itemName_label: petName, pirce_label: price,
                                level_label: level, itemNum_label: num,
                                itemId: itemId, id: id, key: key, roleid: roleid,
                                showtime: showtime, expiretime: expiretime,
                            });
                        }
                        else {
                            var iconid = this.itemAttrData[itemId].icon; //icon图
                            var nquality = this.itemAttrData[itemId].nquality; //品质
                            var frameImg = StrengTheningModel._instance.frameSkinArr[nquality - 1]; //图片地址
                            var itemIcon = SaleModel._instance.getIcon(iconid);
                            var name = this.itemAttrData[itemId].name;
                            this.detailsArr.push({
                                bs_img: frameImg, itemIcon_img: itemIcon,
                                itemName_label: name, pirce_label: price,
                                level_label: level, itemNum_label: num,
                                itemId: itemId, id: id, key: key, roleid: roleid,
                                showtime: showtime, expiretime: expiretime,
                            });
                        }
                    }
                    SaleModel._instance.showList(boothList, this.detailsArr);
                    boothList.renderHandler = new Handler(this, this.boothListRender); // 鼠标点击监听事件
                    boothList.selectHandler = new Handler(this, this.boothListSelect);
                };
                /**摆摊物品 */
                SaleSellViewMediator.prototype.boothListRender = function (cell, index) {
                    if (index < this.detailsArr.length) {
                        var itemNumlabel = cell.getChildByName("itemNum_label");
                        var level_label = cell.getChildByName("level_label");
                        var gongshi_img = cell.getChildByName("gongshi_img");
                        var gongshiTime_label = cell.getChildByName("gongshiTime_label");
                        var bg_btn = cell.getChildByName("bg_btn");
                        var guoqi_img = cell.getChildByName("guoqi_img");
                        bg_btn.on(LEvent.MOUSE_UP, this, this.onBgBtn, [index, cell]);
                        gongshi_img.visible = false; // 公示图片
                        guoqi_img.visible = false; // 过期图片
                        gongshiTime_label.visible = false; // 公式计时时间 文字
                        var num = this.detailsArr[index].itemNum_label; // 数量
                        var itemId = this.detailsArr[index].itemId; // 物品id
                        var showtime = this.detailsArr[index].showtime; // 公示时间
                        var israrity = this.cMarketThreeTableDataForItemid[itemId].israrity; // 是否珍品
                        if (israrity > 0) { //是否是珍品
                            gongshi_img.visible = true;
                            gongshiTime_label.visible = true;
                            var currentTime = (new Date()).valueOf(); // 当前系统时间
                            var gongshiTime = showtime - currentTime; // 公示时间剩余多少
                            var expiretime = this.detailsArr[index].expiretime; // 物品过期时间
                            if (gongshiTime > 0) {
                                var time = this.time2date(gongshiTime);
                                gongshiTime_label.text = time;
                            }
                            else {
                                gongshiTime_label.visible = false;
                                gongshi_img.visible = false;
                                if ((expiretime - currentTime) > 0) {
                                    guoqi_img.visible = false;
                                }
                                else {
                                    guoqi_img.visible = true;
                                }
                            }
                        }
                        else {
                            var currentTime = (new Date()).valueOf();
                            var expiretime = this.detailsArr[index].expiretime;
                            var yitianTime = expiretime - currentTime;
                            if (yitianTime > 0) {
                                guoqi_img.visible = false;
                                gongshiTime_label.visible = true;
                                var time = this.time2date(yitianTime);
                                gongshiTime_label.text = time;
                            }
                            else {
                                guoqi_img.visible = true;
                                gongshiTime_label.visible = false;
                            }
                        }
                        //装备 宠物
                        if (120000 <= itemId && itemId <= 126675 || 140000 <= itemId && itemId <= 140005 || 10000 <= itemId && itemId <= 10009 || 43050 <= itemId && itemId <= 43519 || 111000 <= itemId && 111053) {
                            itemNumlabel.visible = false;
                            level_label.visible = true;
                            var level = this.detailsArr[index].level_label;
                            level_label.text = this.cstringResConfigData[1].msg + level;
                        }
                        else {
                            level_label.visible = false;
                            itemNumlabel.visible = true;
                            if (num > 1) {
                                itemNumlabel.text = num;
                            }
                            else {
                                itemNumlabel.text = "";
                            }
                        }
                    }
                };
                /**点击效果 */
                SaleSellViewMediator.prototype.onBgBtn = function (index, cell) {
                    var equip_btn = cell.getChildByName("bg_btn");
                    equip_btn.selected = true;
                    if (this.bgSelectBtn == null) {
                        this.bgSelectBtn = cell;
                        return;
                    }
                    if (this.bgSelectBtn != cell) {
                        var btnLeft = this.bgSelectBtn.getChildByName("bg_btn");
                        btnLeft.selected = false;
                        this.bgSelectBtn = cell;
                    }
                };
                /**转换时间戳 */
                SaleSellViewMediator.prototype.time2date = function (time) {
                    var mytime = new Date(time);
                    var mm = 60 * 1000;
                    var h = 60 * 60 * 1000;
                    var hours = parseInt((time / h) + ""); //小时
                    var minutes = parseInt((time % h) / mm + ""); //分钟
                    if (minutes < 10)
                        return hours + ":" + ("0" + minutes); //如果分钟小于10 表示时间不会显示两位数
                    return hours + ":" + minutes;
                };
                /**
                 * 摊位物品点击
                 * @param index
                 */
                SaleSellViewMediator.prototype.boothListSelect = function (index) {
                    if (this._viewUI.booth_list.selectedIndex != -1) {
                        var itemDetail = this.detailsArr[index];
                        var itemId = itemDetail.itemId;
                        var roleid = itemDetail.roleid;
                        var key = itemDetail.key;
                        SaleModel._instance.itemId = itemId;
                        if (43050 <= itemId && itemId <= 43519) { //宠物
                            this._SalePetViewMediator = new sale.SalePetViewMediator(this._viewUI, this._app);
                            RequesterProtocols._instance.c2s_market_pettips(roleid, key, 1);
                            this._SalePetViewMediator.show();
                            var price = itemDetail.pirce_label;
                            this._SalePetViewMediator.getPetPrice(price);
                            // 装备   食品
                        }
                        else if (120000 <= itemId && itemId <= 126675 || 140000 <= itemId && itemId <= 140005 || 10000 <= itemId && itemId <= 10009 || 43050 <= itemId && itemId <= 43519 || 111000 <= itemId && 111053) {
                            RequesterProtocols._instance.c2s_COtherItem_Tips(roleid, BagTypes.MARKET, key);
                            sale.models.SaleProxy._instance.on(sale.models.SOtherItemTips, this, this.showSaleItemDetails, [itemDetail]);
                        }
                        else {
                            this._SaleXiajiaViewMediator = new game.modules.sale.SaleXiajiaViewMediator(this._viewUI);
                            this._SaleXiajiaViewMediator.show();
                            var SOtherItemTipsDsc = "";
                            this._SaleXiajiaViewMediator.showItem(itemDetail, SOtherItemTipsDsc);
                        }
                        this._viewUI.booth_list.selectedIndex = -1;
                    }
                };
                /**请求摆摊信息 */
                SaleSellViewMediator.prototype.CMarketContainerBrowse = function () {
                    RequesterProtocols._instance.c2s_market_containerbrowse();
                };
                /**显示上架成功*/
                SaleSellViewMediator.prototype.showSuccessView = function (israrity) {
                    this.SaleMarketUpSuccessViewMediator = new sale.SaleMarketUpSuccessViewMediator(this._viewUI, israrity);
                    this.SaleMarketUpSuccessViewMediator.show();
                };
                /**
                 * 获取摆摊物品信息
                 */
                SaleSellViewMediator.prototype.CMarketGoods = function () {
                    RequesterProtocols._instance.c2s_market_containerbrowse();
                };
                /**
                 * 显示上架物品的详细信息
                 * @param SOtherItemTipsDsc
                 */
                SaleSellViewMediator.prototype.showSaleItemDetails = function (itemDetail, SOtherItemTipsDsc) {
                    this._SaleXiajiaViewMediator = new game.modules.sale.SaleXiajiaViewMediator(this._viewUI);
                    this._SaleXiajiaViewMediator.show();
                    this._SaleXiajiaViewMediator.showItem(itemDetail, SOtherItemTipsDsc);
                };
                /**显示交易记录 */
                SaleSellViewMediator.prototype.onbtnJiaoY = function () {
                    this._SaleBuyRecordViewMediator = new sale.SaleBuyRecordViewMediator(this._viewUI);
                    this._SaleBuyRecordViewMediator.show();
                };
                /**
                 * 筛选物品请求
                 * @param firstno 一级页签类型
                 * @param twono 二级页签类型
                 * @param threeno 三级页签类型
                 * @param itemtype 物品类型
                 * @param limitmin 条件下限
                 * @param limitmax 条件上限
                 * @param currpage 当前页
                 * @param priceSort 价格排序  1升序  2降序
                 * @param issearch 0筛选 1搜索
                 */
                SaleSellViewMediator.prototype.CMarketBrowse = function (firstno, twono, threeno, itemtype, limitmin, limitmax, currpage, priceSort, issearch) {
                    /**上架界面搜索物品 */
                    RequesterProtocols._instance.c2s_market_browse(attentype.buy, firstno, twono, threeno, itemtype, limitmin, limitmax, currpage, priceSort, issearch);
                };
                SaleSellViewMediator.prototype.show = function () {
                    this.CMarketContainerBrowse(); //请求摆摊信息
                    this.init(); //初始化
                    _super.prototype.show.call(this);
                    this.findItemIndex();
                };
                SaleSellViewMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                SaleSellViewMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                SaleSellViewMediator.AUCTION_EVENT = "auctionEvent";
                return SaleSellViewMediator;
            }(game.modules.UiMediator));
            sale.SaleSellViewMediator = SaleSellViewMediator;
        })(sale = modules.sale || (modules.sale = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=SaleSellViewMediator.js.map