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
        var bag;
        (function (bag_1) {
            /**固定的任务物品格子数量 */
            var TASK_GAM_ITEM_NUMBER = 25;
            /**装备影子图 */
            var EquipShadow = [
                { url: "common/ui/tongyong/toubu.png" },
                { url: "common/ui/tongyong/shipin.png" },
                { url: "common/ui/tongyong/wuqi.png" },
                { url: "common/ui/tongyong/yifu.png" },
                { url: "common/ui/tongyong/yaodai.png" },
                { url: "common/ui/tongyong/jiao.png" }
            ];
            var BagsViewMediator = /** @class */ (function (_super) {
                __extends(BagsViewMediator, _super);
                function BagsViewMediator(uiLayer, app) {
                    var _this = _super.call(this, uiLayer) || this;
                    /**背包中道具数据*/
                    _this._bagGameItemListData = [];
                    /**任务中道具的数据 */
                    _this._taskGameItemListData = [];
                    /**装备背包中道具个数 */
                    _this._equipGameItemListLength = 5;
                    /**装备中道具数据 */
                    _this._equipGameItemListData = [];
                    /**是否解锁背包 */
                    _this._isLockBag = false;
                    /** 整理背包间隔数 */
                    _this.arrangeTimer = 0;
                    /** 背包格子达到上限 */
                    _this.bagLatticereachUpperLimit = false;
                    /**属性效果id表 */
                    _this.attributeDesConfigData = StrengTheningModel.getInstance().attributeDesConfigData;
                    /**滚动下标 */
                    _this.scrollNum = -1;
                    _this._app = app;
                    _this._viewUI = new ui.common.BagsUI();
                    _this._ChangeMoneyViewMediator = new modules.commonUI.ChangeMoneyViewMediator(app.uiRoot.topUnder, app);
                    _this._remindViewMediator = modules.commonUI.RemindViewMediator.getInstance(app.uiRoot.topUnder, app);
                    _this._jinBiBuZuViewMediator = new modules.commonUI.JinBiBuZuViewMediator(app.uiRoot.topUnder, app);
                    _this._viewUI.mouseThrough = true;
                    _this.scene2DPanel = new TestRole2dPanel();
                    _this._viewUI.hero_box.addChild(_this.scene2DPanel);
                    _this.isCenter = false;
                    _this.ani = new Laya.Animation();
                    _this.model = new ModelsCreate();
                    _this.roleShapeData = LoginModel.getInstance().createRoleConfigBinDic;
                    _this.initialize();
                    return _this;
                }
                /**初始化 */
                BagsViewMediator.prototype.initialize = function () {
                    this.yindaoAni = new Laya.Animation();
                    this.dianImg = new Laya.Image();
                };
                /**人物模型 */
                BagsViewMediator.prototype.modelcreate = function (modelid) {
                    if (this.model.role3d) {
                        this.scene2DPanel.removeSceneChar(this.model.role3d);
                    }
                    var parentui = this._viewUI.parent;
                    if (parentui) {
                        this.model.role3d = new YxChar3d();
                        this.model.role3d.setRoleUrl(getRoleUrl(modelid + ""));
                        var globalScaleX = parentui.globalScaleX;
                        var globalScaleY = parentui.globalScaleY;
                        this.model.role3d.set2dPos((this._viewUI.heroBg_img.width * 13 / 16 + this._viewUI.heroBg_img.x - 5) * parentui.globalScaleX, (this._viewUI.heroBg_img.height + this._viewUI.heroBg_img.y * 2.5) * parentui.globalScaleY); //坐标
                        this.model.role3d.scale = 1.5;
                        this.model.role3d.rotationY = 180;
                        this.scene2DPanel.addSceneChar(this.model.role3d);
                        BagModel.chargeToWeapon(this.model.role3d);
                    }
                };
                ////////////////
                ///业务逻辑
                ////////////////
                BagsViewMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                    var parentui = this._viewUI.parent;
                    this.scene2DPanel.ape.x = parentui.x * parentui.globalScaleX;
                    this.scene2DPanel.ape.y = parentui.y * parentui.globalScaleY;
                    var shapeId = LoginModel.getInstance().roleDetail.shape;
                    var modelId = this.roleShapeData[shapeId].model;
                    /** 读的是创角配置表的模型 由于创角配置表被改过，原Id是将首个2换成1 比如2010101 原1010101 */
                    modelId = parseInt((modelId + "").replace("2", "1"));
                    this.onLoad();
                    this.modelcreate(modelId);
                    if (HudModel.getInstance().yindaoId > YinDaoEnum.CHUANDAI_YINDAO)
                        this.tenYindao(HudModel.getInstance().yindaoId);
                };
                /**穿装引导 */
                BagsViewMediator.prototype.tenYindao = function (itemid) {
                    var pos = bagModel.getInstance().chargeItemPos(BagTypes.BAG, itemid); //获取装备在背包的位置
                    //背包一打开显示位置0-14的物品，目前背包列表无法使用代码控制滚动，所以如果需指引装备的位置大于15，取消引导
                    if (pos > 15) {
                        HudModel.getInstance().yindaoId = YinDaoEnum.RESET_YINDAO;
                        return;
                    }
                    //如果位置大于15，让列表以15为起始位置，目前有问题
                    // var newPos = Math.floor(pos/15);
                    // this.scrollNum = 15 * newPos;
                    // this._viewUI.bagGameItem_list.scrollTo(this.scrollNum);
                    var x1 = this._viewUI.bagGameItem_list.getCell(pos).x + this._viewUI.bagGameItem_list.getCell(pos).width - 200;
                    var y1 = this._viewUI.bagAndTask_box.y + this._viewUI.bagGameItem_list.getCell(pos).y;
                    var x2 = x1 + 200;
                    var y2 = y1 + 200;
                    this.setTipPos(x1, y1);
                    this.setAniPos(x2, y2);
                    this.startYindao(YinDaoEnum.CHUANDAI_YINDAO_TIP);
                    HudModel.getInstance().yindaoId = YinDaoEnum.RESET_YINDAO;
                    this.yindaoId = YinDaoEnum.CHUANDAI_YINDAO;
                };
                /**引导开始 */
                BagsViewMediator.prototype.startYindao = function (tipid) {
                    var tip = HudModel._instance.carroweffectData;
                    this.onload();
                    Laya.timer.loop(1000, this, this.moveImg);
                    Laya.timer.loop(5000, this, this.closeAni);
                    this._viewUI.yindaoTip_htm.text = tip[tipid].text;
                    this._viewUI.addChild(this.yindaoAni);
                    this._viewUI.addChild(this.dianImg);
                    this._viewUI.yindaoTip_img.visible = true;
                    this.dianImg.visible = true;
                };
                /**设置引导提示位置 */
                BagsViewMediator.prototype.setTipPos = function (x, y) {
                    this._viewUI.yindaoTip_img.x = x;
                    this._viewUI.yindaoTip_img.y = y;
                };
                /**设置动画位置*/
                BagsViewMediator.prototype.setAniPos = function (x, y) {
                    this.yindaoAni.x = x;
                    this.yindaoAni.y = y;
                    this.dianImg.x = x;
                    this.dianImg.y = y;
                };
                /**关闭动画 */
                BagsViewMediator.prototype.closeAni = function () {
                    this.yindaoAni.clear();
                    Laya.timer.clear(this, this.closeAni);
                    Laya.timer.clear(this, this.moveImg);
                    this._viewUI.yindaoTip_img.visible = false;
                    this.dianImg.visible = false;
                };
                /**播放动画 */
                BagsViewMediator.prototype.onload = function () {
                    Laya.Animation.createFrames(this.anUrls("", 9), "yindao");
                    this.yindaoAni.play(0, true, "yindao");
                    this.yindaoAni.interval = 112;
                    this.dianImg.skin = "common/ui/mainhud/dian.png";
                    this.dianImg.mouseThrough = true;
                };
                /**移动手指图标 */
                BagsViewMediator.prototype.moveImg = function () {
                    if (this.dianImg.y <= this.yindaoAni.y)
                        Laya.Tween.to(this.dianImg, { x: this.yindaoAni.x + 25, y: this.yindaoAni.y + 25 }, 1000, null, Laya.Handler.create(this, function () { }), null, false);
                    else
                        Laya.Tween.to(this.dianImg, { x: this.yindaoAni.x - 5, y: this.yindaoAni.y - 5 }, 1000, null, Laya.Handler.create(this, function () { }), null, false);
                };
                BagsViewMediator.prototype.anUrls = function (aniName, length) {
                    var urls = [];
                    for (var index = 1; index <= length; index++) {
                        urls.push("common/ui/yindao/" + aniName + index + ".png");
                    }
                    return urls;
                };
                BagsViewMediator.prototype.hide = function () {
                    /** 移除通讯事件 */
                    this._remindViewMediator.off(modules.commonUI.RIGHT_BUTTON_EVENT, this, this.clickEnSureBtnEvent);
                    this._remindViewMediator.off(modules.commonUI.LEFT_BUTTON_EVENT, this, this.clickCancelBtnEvent);
                    this._remindViewMediator.off(modules.commonUI.RIGHT_BUTTON_EVENT, this, this.jumpToCharge);
                    this._remindViewMediator.off(modules.commonUI.LEFT_BUTTON_EVENT, this, this.cancleToJump);
                    _super.prototype.hide.call(this);
                };
                BagsViewMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                /**
                 * @describe  初始化加载
                 */
                BagsViewMediator.prototype.onLoad = function () {
                    this.initUI();
                    this.registerEvent();
                    //List控件数据的加载和显示
                    this.controlBagGameItemList();
                    this.controlEquipGameItemList();
                    this.controlTaskGameItemList();
                    if (this.ani) {
                        this.ani.clear();
                    }
                };
                /**
                 * @describe  初始化界面，默认选中bag_btn,task_btn为未选中
                 */
                BagsViewMediator.prototype.initUI = function () {
                    this._viewUI.bag_btn.selected = true;
                    this._viewUI.task_btn.selected = false;
                    this._viewUI.bagGameItem_list.visible = true;
                    this._viewUI.taskGameItem_list.visible = false;
                    this.showMoneyNumber();
                    this.showHeroScore();
                };
                /**
                 * @describe  获取背包数据
                 */
                BagsViewMediator.prototype.getBagGameItemListData = function (bagType) {
                    var bag = BagModel.getInstance().getBagGameItemData(bagType);
                    // 数据为空则返回
                    if (!bag)
                        return;
                    // 置空
                    this._bagGameItemListData = [];
                    var items = bag.items;
                    /**临时存储服务端发送的道具数组 */
                    var arr = [];
                    var posArray = [];
                    var listItem;
                    this._bagGameItemListPos = new Laya.Dictionary();
                    //插入Item到arr数组
                    for (var index = 0; index < items.length; index++) {
                        // let id = bag.getItem(index).id;
                        var id = items[index].id;
                        this._bagGameItemListPos.set(id, items[index].key);
                        var obj = BagModel.getInstance().getItemAttrData(id);
                        try {
                            var equipType = StrengTheningModel.getInstance().equipEffectData[id].eequiptype;
                        }
                        catch (error) {
                            equipType = -1;
                        }
                        var icon = obj.icon;
                        var nquality = obj.nquality;
                        var outbattleuse = obj.outbattleuse;
                        var number = items[index].number;
                        var pos_1 = items[index].position;
                        var key = bag.items[index].key;
                        var shopId = obj.bCanSaleToNpc;
                        var flag = items[index].flags;
                        try {
                            var isTreasures = StrengTheningModel.getInstance().groceryEffectData[id].treasure;
                        }
                        catch (error) {
                            isTreasures = -1;
                        }
                        // equipType = typeof(equipType) == "undefined"?-1:equipType;
                        listItem = {
                            ID: id,
                            icon: icon,
                            number: number,
                            position: pos_1,
                            nquality: nquality,
                            isLock: false,
                            key: key,
                            equipType: equipType,
                            outbattleuse: outbattleuse,
                            shopId: shopId,
                            flags: flag,
                            isTreasures: isTreasures
                        };
                        arr.push(listItem);
                        // 1，4，5，7，12
                        // 0, 1, 2, 3, 4
                        posArray.push(pos_1);
                    }
                    // let listItem: ListItem;
                    for (var index = 0; index < this._bagGameItemListLength; index++) {
                        /** 背包格子未达到上限并且位置在后十个格子 */
                        if (!this.bagLatticereachUpperLimit && index >= this._bagGameItemListLength - 10) {
                            listItem = {
                                ID: -1,
                                icon: -1,
                                number: -1,
                                position: -1,
                                nquality: -1,
                                isLock: true,
                                key: -1,
                                equipType: -1,
                                outbattleuse: -1,
                                shopId: -1,
                                flags: -1,
                                isTreasures: -1
                            };
                        }
                        else {
                            var tempIndex = posArray.indexOf(index);
                            // 找到
                            if (tempIndex != -1) {
                                listItem = arr[tempIndex];
                            }
                            else {
                                listItem = {
                                    ID: -1,
                                    icon: -1,
                                    number: -1,
                                    position: -1,
                                    nquality: -1,
                                    isLock: false,
                                    key: -1,
                                    equipType: -1,
                                    outbattleuse: -1,
                                    shopId: -1,
                                    flags: -1,
                                    isTreasures: -1
                                };
                            }
                        }
                        this._bagGameItemListData.push(listItem);
                    }
                    this._viewUI.bagGameItem_list.array = this._bagGameItemListData;
                };
                /**
                 * @describe  获取任务list的数据
                 */
                BagsViewMediator.prototype.getTaskGameItemListData = function (bagType) {
                    var bag = BagModel.getInstance().getBagGameItemData(bagType);
                    // 数据为空则返回
                    if (!bag)
                        return;
                    // 置空
                    this._taskGameItemListData = [];
                    var items = bag.items;
                    /**临时存储服务端发送的道具数组 */
                    var arr = [];
                    var posArray = [];
                    var listItem;
                    //插入Item到arr数组
                    for (var index = 0; index < items.length; index++) {
                        // let id = bag.getItem(index).id;
                        var id = items[index].id;
                        var obj = BagModel.getInstance().getItemAttrData(id);
                        var icon = obj.icon;
                        var outbattleuse = obj.outbattleuse;
                        var nquality = obj.nquality;
                        var number = items[index].number;
                        var pos_2 = items[index].position;
                        var shopId = obj.bCanSaleToNpc;
                        var flags = items[index].flags;
                        listItem = {
                            ID: id,
                            icon: icon,
                            number: number,
                            position: pos_2,
                            nquality: nquality,
                            key: -1,
                            equipType: -1,
                            outbattleuse: -1,
                            shopId: shopId,
                            flags: flags,
                            isTreasures: -1
                        };
                        arr.push(listItem);
                        // 1，4，5，7，12
                        // 0, 1, 2, 3, 4
                        posArray.push(pos_2);
                    }
                    // let listItem: ListItem;
                    for (var index = 0; index < this._taskGameItemListLength; index++) {
                        var tempIndex = posArray.indexOf(index);
                        // 找到
                        if (tempIndex != -1) {
                            listItem = arr[tempIndex];
                        }
                        else {
                            listItem = {
                                ID: -1,
                                icon: -1,
                                number: -1,
                                position: -1,
                                nquality: -1,
                                key: -1,
                                equipType: -1,
                                outbattleuse: -1,
                                shopId: -1,
                                flags: -1,
                                isTreasures: -1
                            };
                        }
                        this._taskGameItemListData.push(listItem);
                    }
                    this._viewUI.taskGameItem_list.array = this._taskGameItemListData;
                };
                /**
                 * @describe  获取装备数据并显示
                 * @param bagType   背包类型
                 */
                BagsViewMediator.prototype.getOwnGameItemListData = function (bagType) {
                    // let bag1: game.modules.bag.models.BagVo = BagModel.getInstance().getBagGameItemData(BagTypes.BAG);
                    // let bag2: game.modules.bag.models.BagVo = BagModel.getInstance().getBagGameItemData(BagTypes.EQUIP);
                    var bag = BagModel.getInstance().getBagGameItemData(bagType);
                    if (!bag)
                        return;
                    // 置空
                    this._equipGameItemListData = [];
                    var arr = [];
                    var posArray = [];
                    var listItem;
                    //插入Item到arr数组
                    for (var index = 0; index < bag.items.length; index++) {
                        var id = bag.items[index].id;
                        var obj = BagModel.getInstance().getItemAttrData(id);
                        var equipType = StrengTheningModel.getInstance().equipEffectData[id].eequiptype;
                        var icon = obj.icon;
                        var outbattleuse = obj.outbattleuse;
                        var nquality = obj.nquality;
                        var number = bag.items[index].number;
                        var pos_3 = bag.items[index].position;
                        var key = bag.items[index].key;
                        var flags = bag.items[index].flags;
                        try {
                            var isTreasures = StrengTheningModel.getInstance().groceryEffectData[id].treasure;
                        }
                        catch (error) {
                            isTreasures = -1;
                        }
                        listItem = {
                            ID: id,
                            icon: icon,
                            number: number,
                            position: pos_3,
                            nquality: nquality,
                            isLock: false,
                            key: key,
                            equipType: equipType,
                            outbattleuse: outbattleuse,
                            shopId: -1,
                            flags: flags,
                            isTreasures: isTreasures
                        };
                        arr.push(listItem);
                        // 1，4，5，7，12
                        // 0, 1, 2, 3, 4
                        posArray.push(equipType);
                    }
                    // let listItem: ListItem;
                    for (var index = 0; index <= this._equipGameItemListLength; index++) {
                        var tempIndex = posArray.indexOf(index);
                        // 找到
                        if (tempIndex != -1) {
                            listItem = arr[tempIndex];
                        }
                        else {
                            listItem = {
                                ID: -1,
                                icon: -1,
                                number: -1,
                                position: -1,
                                nquality: -1,
                                isLock: false,
                                key: -1,
                                equipType: -1,
                                outbattleuse: -1,
                                shopId: -1,
                                flags: -1,
                                isTreasures: -1
                            };
                        }
                        this._equipGameItemListData.push(listItem);
                    }
                    /** 重新进行排版,针对武器的位置 */
                    var weapion = this._equipGameItemListData[0]; //武器
                    this._equipGameItemListData.splice(0, 1);
                    this._equipGameItemListData.splice(2, 0, weapion);
                    this._viewUI.equipGameItem_list.array = this._equipGameItemListData;
                };
                /**
                 * @describe 渲染任务List中的单元格
                 * @param cell  Laya.Box
                 * @param index  number
                 */
                BagsViewMediator.prototype.onRenderListItemOfTaskGameItem = function (cell, index) {
                    if (index > this._taskGameItemListLength)
                        return;
                    var itemData = this._taskGameItemListData[index];
                    var lockimg_img = cell.getChildByName("lockimg_img");
                    var gameItemBgImg = cell.getChildByName("gameItemBg_img");
                    var gameItemImg = cell.getChildByName("gameItem_Img");
                    var gameItemNumberLabel = cell.getChildByName("gameItemNumber_lab");
                    if (itemData.ID != -1) {
                        var str = itemData.number > 1 ? itemData.number.toString() : "";
                        lockimg_img.visible = true;
                        gameItemBgImg.skin = bag_1.BagSystemModule.getGameItemFrameColorResource(itemData.nquality);
                        gameItemImg.skin = "common/icon/item/" + itemData.icon + ".png";
                        gameItemNumberLabel.changeText(str);
                    }
                    else {
                        lockimg_img.visible = false;
                        gameItemBgImg.skin = "common/ui/tongyong/kuang94.png";
                        gameItemImg.skin = "";
                        gameItemNumberLabel.visible = false;
                    }
                };
                /**
                 * @describe 渲染背包List中的单元格
                 * @param cell  Laya.Box
                 * @param index  number
                 */
                BagsViewMediator.prototype.onRenderListItemOfBagGameItem = function (cell, index) {
                    if (index > this._bagGameItemListLength)
                        return;
                    var itemData = this._bagGameItemListData[index];
                    var lockImg = cell.getChildByName("gameItemLock_Img");
                    lockImg.skin = "";
                    var gameItemBgImg = cell.getChildByName("gameItemBg_img");
                    var gameItemImg = cell.getChildByName("gameItem_Img");
                    var gameItemTreasure_img = cell.getChildByName("gameItemTreasure_img");
                    var lockimg_img = cell.getChildByName("lockimg_img");
                    var gameItemNumberLabel = cell.getChildByName("gameItemNumber_lab");
                    if (itemData.ID != -1) {
                        gameItemNumberLabel.visible = true;
                        var str = itemData.number > 1 ? itemData.number.toString() : "";
                        gameItemBgImg.skin = bag_1.BagSystemModule.getGameItemFrameColorResource(itemData.nquality);
                        gameItemImg.skin = "common/icon/item/" + itemData.icon + ".png";
                        gameItemNumberLabel.changeText(str);
                        if (itemData.isTreasures == 1) {
                            gameItemTreasure_img.visible = true;
                            gameItemTreasure_img.skin = "common/ui/tongyong/zhenpin.png";
                        }
                        if (bag_1.models.BagModel.getInstance().itemIsBind(itemData.flags)) {
                            lockimg_img.visible = true;
                        }
                        else {
                            lockimg_img.visible = false;
                        }
                        if (itemData.equipType != -1)
                            gameItemImg.on(LEvent.DOUBLE_CLICK, this, this.opEquip, [OpEquip.PUTON, itemData.key, itemData.equipType]);
                    }
                    else if (itemData.isLock) {
                        lockImg.skin = "common/ui/tongyong/suo.png";
                        gameItemBgImg.skin = "common/ui/tongyong/kuang94.png";
                        gameItemImg.skin = "";
                        gameItemNumberLabel.visible = false;
                        gameItemTreasure_img.visible = false;
                        lockimg_img.visible = false;
                    }
                    else {
                        gameItemBgImg.skin = "common/ui/tongyong/kuang94.png";
                        gameItemImg.skin = "";
                        gameItemNumberLabel.visible = false;
                        gameItemTreasure_img.visible = false;
                        lockimg_img.visible = false;
                    }
                };
                /**
                 * @describe 渲染装备List中的单元格
                 * @param cell  Laya.Box
                 * @param index  number
                 */
                BagsViewMediator.prototype.onRenderListItemOfEquipGameItem = function (cell, index) {
                    if (index > this._equipGameItemListLength)
                        return;
                    var itemData = this._equipGameItemListData[index];
                    var gameItemImg = cell.getChildByName("ownGameItem_img");
                    var gameItemShadowImg = cell.getChildByName("ownGameItemShadow_img");
                    var gameItemBgImg = cell.getChildByName("gameItemBg_img");
                    if (itemData.ID != -1) {
                        var icon = itemData.icon;
                        gameItemImg.skin = "common/icon/item/" + icon + ".png";
                        gameItemBgImg.skin = bag_1.BagSystemModule.getGameItemFrameColorResource(itemData.nquality);
                        gameItemImg.on(LEvent.RIGHT_CLICK, this, this.opEquip, [OpEquip.TAKEOFF, itemData.key, itemData.equipType]);
                        gameItemShadowImg.skin = "";
                    }
                    else {
                        gameItemShadowImg.skin = EquipShadow[index].url;
                        gameItemImg.skin = "";
                        gameItemBgImg.skin = "common/ui/tongyong/baikuang.png";
                    }
                };
                /**
                 * 操作装备
                 */
                BagsViewMediator.prototype.opEquip = function (opType, equipkey, posinpack) {
                    if (opType == OpEquip.PUTON) {
                        /** 穿上装备请求 */
                        RequesterProtocols._instance.c2s_CPutOn_Equip(equipkey, posinpack);
                    }
                    else if (opType == OpEquip.TAKEOFF) {
                        /** 脱下装备请求 */
                        RequesterProtocols._instance.c2s_CTakeOff_Equip(equipkey, posinpack);
                    }
                };
                /**
                 * @describe  装备栏中选中子单元
                 * @param index   在list控件的下标
                 */
                BagsViewMediator.prototype.onSelectOfEquipGameItem = function (index) {
                    // let listItem = this._viewUI.equipGameItem_list.selectedItem as ListItem;
                    if (index == -1)
                        return;
                    var itemData = this._equipGameItemListData[index];
                    if (typeof (itemData) == "undefined" || itemData == null)
                        return;
                    if (itemData.ID != -1) {
                        var parame = new Dictionary();
                        parame.set("itemId", itemData.ID);
                        parame.set("key", itemData.key);
                        parame.set("packid", BagTypes.EQUIP);
                        parame.set("outbattleuse", itemData.outbattleuse); //("packid",1)
                        parame.set("shopid", itemData.shopId);
                        parame.set("number", itemData.number);
                        parame.set("equiptype", itemData.equipType);
                        parame.set("isWearEqu", 1);
                        // parame.set("title","")
                        // parame.set("parame",[])
                        // console.log("----当前点击装备的id:",itemData.ID,"--------key:",itemData.key)
                        this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.BAG, parame);
                    }
                    /** 播放选中特效 */
                    this.PlayEffect(this._viewUI.equipGameItem_list, index);
                    this._viewUI.equipGameItem_list.selectedIndex = -1;
                };
                /** 任务  tips入口 */
                BagsViewMediator.prototype.onSelectOfTaskGameItem = function (index) {
                    if (index == -1)
                        return;
                    var itemData = this._taskGameItemListData[index];
                    if (typeof (itemData) == "undefined" || itemData == null)
                        return;
                    if (itemData.ID != -1) {
                        var parame = new Dictionary();
                        parame.set("itemId", itemData.ID);
                        parame.set("key", itemData.key);
                        parame.set("packid", BagTypes.QUEST);
                        parame.set("outbattleuse", itemData.outbattleuse); //("packid",1)
                        parame.set("shopid", itemData.shopId);
                        parame.set("number", itemData.number);
                        parame.set("equiptype", itemData.equipType);
                        this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.BAG, parame);
                    }
                    /** 播放选中特效 */
                    this.PlayEffect(this._viewUI.taskGameItem_list, index);
                    this._viewUI.taskGameItem_list.selectedIndex = -1;
                };
                /**
                 * @describe  选择背包中的单元格
                 * @param index   下标
                 */
                BagsViewMediator.prototype.onSelcetOfBagGameItem = function (index) {
                    if (index == -1)
                        return;
                    var itemData = this._bagGameItemListData[index];
                    if (itemData.isLock) {
                        var prompt_1 = this.calculateNeedOfLockBagSilverNumber();
                        this._remindViewMediator.onShow(prompt_1, "确定");
                        this._isLockBag = true;
                        /** 这里每次点击添加一次监听 */
                        /** 公共界面 */
                        this._remindViewMediator.once(modules.commonUI.RIGHT_BUTTON_EVENT, this, this.clickEnSureBtnEvent);
                        this._remindViewMediator.once(modules.commonUI.LEFT_BUTTON_EVENT, this, this.clickCancelBtnEvent);
                        /** 银币兑换界面使用金币兑换 */
                        this._jinBiBuZuViewMediator.once(modules.commonUI.USE_GOLD_EXCHANGE_EVENT, this, this.onClickUseGoldBtnEvent);
                        /** 银币兑换界面使用元宝兑换 */
                        this._jinBiBuZuViewMediator.once(modules.commonUI.USE_SILVER_EXCHANGE_EVENT, this, this.onClickUseYuanBaoOfSilverBtnEvent); //onClickUseYuanBaoOfSilverBtnEvent
                        /** 金币兑换界面使用元宝兑换 */
                        this._jinBiBuZuViewMediator.once(modules.commonUI.USE_YUANBAO_EXCHANGE_EVENT, this, this.onClickUseYuanBaoBtnEvent);
                    }
                    else {
                        /** 无锁状态下播放选中特效 */
                        this.PlayEffect(this._viewUI.bagGameItem_list, index);
                    }
                    if (itemData.ID != -1) {
                        var parame = new Dictionary();
                        parame.set("itemId", itemData.ID);
                        parame.set("key", itemData.key);
                        parame.set("packid", 1);
                        parame.set("outbattleuse", itemData.outbattleuse); //("packid",1)
                        parame.set("shopid", itemData.shopId);
                        parame.set("number", itemData.number);
                        parame.set("equiptype", itemData.equipType);
                        modules.tips.models.TipsModel.getInstance().whichView = modules.ModuleNames.BAG;
                        modules.tips.models.TipsModel.getInstance().currItemId = itemData.ID;
                        modules.tips.models.TipsModel.getInstance().currItemKey = itemData.key;
                        this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.BAG, parame);
                    }
                    /** 选中对象清空 */
                    this._viewUI.bagGameItem_list.selectedIndex = -1;
                    if (this.yindaoId == YinDaoEnum.CHUANDAI_YINDAO)
                        this.closeAni();
                };
                /** 播放特效 */
                BagsViewMediator.prototype.PlayEffect = function (list, index) {
                    var cell = list.getCell(index);
                    var selectItem = cell.getChildByName("gameItemBg_img");
                    this.ani.loadAtlas("common/res/atlas/ui/tuji.atlas", Laya.Handler.create(this, this.onCreateFrame));
                    selectItem.addChild(this.ani);
                    this.ani.scaleX = 0.9;
                    this.ani.scaleY = 0.9;
                };
                /**
                  * @describe  计算解锁一个背包格子（5个）需要多少银币
                  * @return  提示信息
                  */
                BagsViewMediator.prototype.calculateNeedOfLockBagSilverNumber = function () {
                    //有10格是锁着的
                    var bagItem = this._bagGameItemListLength - 10;
                    this._deblockingBagSilverNumber = BagModel.getInstance().getDeblockingBagSilverNumber(bagItem);
                    this._deblockingBagGoldNumber = this._deblockingBagSilverNumber / 100;
                    this._deblockingBagFushiNumber = this._deblockingBagSilverNumber / 10000;
                    var prompt = "增加5个包裹格，需要花费" + this._deblockingBagSilverNumber + "银币";
                    return prompt;
                };
                ////////////////
                ///事件
                ////////////////
                /**
                 * 注册事件
                 */
                BagsViewMediator.prototype.registerEvent = function () {
                    // UI界面事件
                    this._viewUI.bag_btn.on(LEvent.MOUSE_DOWN, this, this.clickBagBtnEvent);
                    this._viewUI.task_btn.on(LEvent.MOUSE_DOWN, this, this.clickTaskBtnEvent);
                    this._viewUI.exchangeGlobal_btn.on(LEvent.MOUSE_DOWN, this, this.clickExchangeGlobalBtnEvent);
                    this._viewUI.exchangeSilver_btn.on(LEvent.MOUSE_DOWN, this, this.clickExchageSilverBtnEvent);
                    this._viewUI.gameChamber_btn.on(LEvent.MOUSE_DOWN, this, this.clickGameChamberBtnEvent);
                    this._viewUI.arrange_btn.on(LEvent.MOUSE_DOWN, this, this.clickArrangeBtnEvent);
                    // 通讯事件
                    bag_1.models.BagProxy.getInstance().on(bag_1.models.ARRANGE_BAG, this, this.arrangeBag);
                    bag_1.models.BagProxy.getInstance().on(bag_1.models.REFRESH_CURRENCY_EVENT, this, this.showMoneyNumber);
                    bag_1.models.BagProxy.getInstance().on(bag_1.models.REFRESH_BAG_COUNT, this, this.refreshBagAndEquip); //controlBagGameItemList
                    bag_1.models.BagProxy.getInstance().on(bag_1.models.ROLE_PUT_OFF, this, this.refreshEquipUI);
                    bag_1.models.BagProxy.getInstance().on(bag_1.models.CURR_ROLENAME_CHANGE, this, this.changeMainUnitRoleName);
                    bag_1.models.BagProxy.getInstance().on(bag_1.models.UNLOADING_EQUIP_CHECK, this, this.unloadEquipCheck);
                    this._ChangeMoneyViewMediator.on(modules.commonUI.CHANGEMONEY_CANL_EVENT, this, this.onClickChangeMoneyCancelBtnEvent);
                    this._ChangeMoneyViewMediator.on(modules.commonUI.CHANGEMONEY_CONFIRM_EVENT, this, this.onClickChangeMoneyConfirmBtnEvent);
                    game.modules.bag.models.BagProxy.getInstance().on(bag.models.INSPECT_EQUIP_GEM, this, this.onChargeEquipGem);
                };
                /** 更改主玩家单元的名字 */
                BagsViewMediator.prototype.changeMainUnitRoleName = function (roleName) {
                    this._app.sceneObjectMgr.mainUnit.SetName(roleName, true);
                };
                /** 卸下装备检查武器模型 */
                BagsViewMediator.prototype.unloadEquipCheck = function (equipId) {
                    var equipType = StrengTheningModel.getInstance().equipEffectData[equipId].eequiptype;
                    if (equipType == EquipType.ARMS)
                        this._app.sceneObjectMgr.mainUnit.Weapon = -1;
                    BagModel.chargeToWeapon(this.model.role3d);
                };
                /** 替换装备检查是否有宝石可替换 */
                BagsViewMediator.prototype.onChargeEquipGem = function (item) {
                    var _this = this;
                    var equipType = StrengTheningModel.getInstance().equipEffectData[item.id].eequiptype;
                    if (equipType == EquipType.ARMS) {
                        var weaponNum = StrengTheningModel.getInstance().equipEffectData[item.id].weaponid;
                        this._app.sceneObjectMgr.mainUnit.Weapon = weaponNum;
                        BagModel.chargeToWeapon(this.model.role3d);
                    }
                    var equipRelace = BagModel.getInstance().equipRelace;
                    if (equipRelace.keys.length == 0)
                        return;
                    var key_equtype = equipRelace.keys[0]; //准备类型
                    var id_value = equipRelace.get(key_equtype); //装备id
                    if (key_equtype != equipType) //部位不同则返回清空
                     {
                        BagModel.getInstance().equipRelace.clear();
                        return;
                    }
                    Laya.timer.once(500, this, function () {
                        var key = BagModel.getInstance().chargeItemKey(BagTypes.BAG, id_value); //装备key
                        //被替换的装备镶嵌数据
                        var equippedGemArr = StrengTheningModel.getInstance().equGem(BagTypes.BAG, key);
                        //新装备镶嵌宝石数据
                        var equipGemArr = StrengTheningModel.getInstance().equGem(BagTypes.EQUIP, item.key);
                        console.log('equippedGemArr被替换的装备镶嵌数据===' + equippedGemArr);
                        console.log('equipGemArr新装备镶嵌宝石数据===' + equippedGemArr);
                        if (equipGemArr.length < equippedGemArr.length) {
                            var _TipsMessageMediator = new game.modules.tips.TipsMessageMediator(_this._viewUI, _this._app);
                            _TipsMessageMediator.show();
                            _this._newEquipItem = item;
                            var param = new Dictionary();
                            param.set("contentId", PromptExplain.REPLACE_GEM_IN_NEWEQUIP);
                            _TipsMessageMediator.showContent(param);
                            game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, _this, _this.SetGem);
                        }
                    });
                };
                /**为新装备镶嵌宝石 */
                BagsViewMediator.prototype.SetGem = function () {
                    var equipRelace = BagModel.getInstance().equipRelace;
                    if (equipRelace.keys.length == 0)
                        return;
                    var key_equtype = equipRelace.keys[0]; //准备类型
                    var id_value = equipRelace.get(key_equtype); //装备id
                    var key = BagModel.getInstance().chargeItemKey(BagTypes.BAG, id_value); //装备key
                    //取消镶嵌
                    RequesterProtocols._instance.c2s_CDel_Gem(key, 0, 0);
                    //被替换的装备镶嵌数据
                    var equippedGemArr = StrengTheningModel.getInstance().equGem(BagTypes.BAG, key);
                    var gemkey = BagModel.getInstance().chargeItemKey(BagTypes.BAG, equippedGemArr[0]);
                    //镶嵌新宝石
                    RequesterProtocols._instance.c2s_CAttach_Gem(this._newEquipItem.key, 1, gemkey);
                };
                /**
                 * 刷新背包信息
                 * @param type 背包类型
                 */
                BagsViewMediator.prototype.arrangeBag = function (type) {
                    if (type == BagTypes.BAG) {
                        this.controlBagGameItemList();
                    }
                    else if (type == BagTypes.QUEST) {
                        this.controlTaskGameItemList();
                    }
                };
                /** 刷新装备评分 */
                BagsViewMediator.prototype.refreshEquipUI = function (num) {
                    if (num == 0) { /** 脱下装备 */
                    }
                    else { /** 穿上装备 */
                        var equipTips = StrengTheningModel.getInstance().equipTips;
                        var bag_2 = BagModel.getInstance().getBagGameItemData(BagTypes.EQUIP);
                        var equipKey = bagModel.getInstance().chargeItemKey(BagTypes.EQUIP, num);
                        var equipItems = bag_2.items;
                        for (var itemIndex = 0; itemIndex < equipTips.length; itemIndex++) {
                            var equKey = equipTips[itemIndex].keyinpack; //装备的key
                            var equPackid = equipTips[itemIndex].packid; //装备的value
                            if (equPackid == BagTypes.EQUIP && equKey == equipKey) {
                                var baseAttr = equipTips[itemIndex].tips.baseAttr;
                                if (baseAttr != null) {
                                    var baseAttrKeys = baseAttr.keys;
                                    for (var j = 0; j < baseAttrKeys.length; j++) {
                                        var baseAttrId = baseAttrKeys[j]; //基础属性的id
                                        var baseAttrValue = baseAttr.get(baseAttrId); //值
                                        var 
                                        // var baseAttrName = this.attributeDesConfigData[baseAttrKeys[j]].name ;
                                        baseAttrValue;
                                    }
                                }
                            }
                        }
                    }
                };
                /**
                 * 刷新背包界面
                 */
                BagsViewMediator.prototype.refreshBagAndEquip = function () {
                    /** 刷新背包数据 */
                    this.controlBagGameItemList();
                    /** 刷新装备数据 */
                    this.controlEquipGameItemList();
                    /** 刷新人物评分 */
                    this.showHeroScore();
                };
                /**
                 * @describe  兑换界面中点击取消按钮的事件
                 */
                BagsViewMediator.prototype.onClickChangeMoneyCancelBtnEvent = function () {
                    this._ChangeMoneyViewMediator.hide();
                };
                /**
                 * @describe  兑换界面中点击兑换按钮的事件
                 */
                BagsViewMediator.prototype.onClickChangeMoneyConfirmBtnEvent = function (parame) {
                    // this._ChangeMoneyViewMediator.hide();
                    var type = parame.get("changetype");
                    var changeNum = parame.get("changenum");
                    if (type == MoneyTypes.MoneyType_SupFushi) { /** 元宝兑换金币 */
                        RequesterProtocols._instance.c2s_exchange_currency(MoneyTypes.MoneyType_HearthStone, MoneyTypes.MoneyType_GoldCoin, changeNum);
                    }
                    else if (type == MoneyTypes.MoneyType_GoldCoin) { /** 金币兑换银币 */
                        RequesterProtocols._instance.c2s_exchange_currency(MoneyTypes.MoneyType_GoldCoin, MoneyTypes.MoneyType_SilverCoin, changeNum);
                    }
                    else if (type == MoneyTypes.MoneyType_HearthStone) { /** 元宝兑换银币 */
                        RequesterProtocols._instance.c2s_exchange_currency(MoneyTypes.MoneyType_HearthStone, MoneyTypes.MoneyType_SilverCoin, changeNum);
                    }
                };
                /**
                 * @describe  点击背包按钮事件
                 */
                BagsViewMediator.prototype.clickBagBtnEvent = function () {
                    if (!this._viewUI.bag_btn.selected) {
                        this._viewUI.taskGameItem_list.visible = false;
                        this._viewUI.bagGameItem_list.visible = true;
                        this._viewUI.bag_btn.selected = true;
                        this._viewUI.task_btn.selected = false;
                    }
                };
                /**
                 * @describe  点击任务按钮触发的事件
                 */
                BagsViewMediator.prototype.clickTaskBtnEvent = function () {
                    if (!this._viewUI.task_btn.selected) {
                        this._viewUI.bagGameItem_list.visible = false;
                        this._viewUI.taskGameItem_list.visible = true;
                        this._viewUI.task_btn.selected = true;
                        this._viewUI.bag_btn.selected = false;
                    }
                };
                /**
                 * @describe  点击兑换金币按钮的触发事件
                 */
                BagsViewMediator.prototype.clickExchangeGlobalBtnEvent = function () {
                    var isShowGold = true;
                    var yuanBao = bagModel.getInstance().yuanbaoIcon;
                    this._ChangeMoneyViewMediator.onShowInModule(modules.ModuleNames.BAG, isShowGold, yuanBao);
                    // this._ChangeMoneyViewMediator.show();
                };
                /**
                 * @describe  点击兑换银币按钮的触发事件
                 */
                BagsViewMediator.prototype.clickExchageSilverBtnEvent = function () {
                    var isShowGold = false;
                    var yuanBao = bagModel.getInstance().yuanbaoIcon;
                    var goldNumber = BagModel.getInstance().globalIcon;
                    this._ChangeMoneyViewMediator.onShowInModule(modules.ModuleNames.BAG, isShowGold, yuanBao, goldNumber);
                    // this._ChangeMoneyViewMediator.show();
                };
                /**
                 * @describe  点击商会按钮触的触发事件
                 */
                BagsViewMediator.prototype.clickGameChamberBtnEvent = function () {
                    modules.ModuleManager.hide(modules.ModuleNames.BAG);
                    modules.ModuleManager.show(modules.ModuleNames.SHOP, this._app);
                    LoginModel.getInstance().CommonPage = "Bag";
                };
                /**
                 * @describe  点击整理按钮触发的事件
                 */
                BagsViewMediator.prototype.clickArrangeBtnEvent = function () {
                    if (this.arrangeTimer > 0) { /** 计时中，不给于请求 */
                        this.disappearMessageTipsMediator = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                        var promp = "<span style='color:#ffffff;fontSize:24'>你整理的太频繁了</span>";
                        this.disappearMessageTipsMediator.onShow(promp);
                    }
                    else {
                        this.arrangeTimer = 5;
                        Laya.timer.loop(1000, this, this.arrangeBagTimer, null, false);
                        if (this._viewUI.bag_btn.selected)
                            RequesterProtocols._instance.c2s_CList_Pack(BagTypes.BAG, 0);
                        else if (this._viewUI.task_btn.selected)
                            RequesterProtocols._instance.c2s_CList_Pack(BagTypes.QUEST, 0);
                    }
                };
                /** 整理背包计时器 */
                BagsViewMediator.prototype.arrangeBagTimer = function () {
                    if (this.arrangeTimer > 0) { /** 计时中 */
                        this.arrangeTimer--;
                    }
                    else { /** 移除计时器 */
                        Laya.timer.clear(this, this.arrangeBagTimer);
                    }
                };
                /**
                 * @describe  在提示界面(解锁背包时候)时候的确定按钮事件
                 */
                BagsViewMediator.prototype.clickEnSureBtnEvent = function () {
                    /** 先把取消的事件移除 */
                    this._remindViewMediator.off(modules.commonUI.LEFT_BUTTON_EVENT, this, this.clickCancelBtnEvent);
                    if (this._isLockBag) {
                        var sliverIcon = bag_1.models.BagModel.getInstance().sliverIcon;
                        var diff = this._deblockingBagSilverNumber - sliverIcon;
                        this._remindViewMediator.hide();
                        this._isLockBag = false;
                        // 银币足够
                        if (diff <= 0) {
                            RequesterProtocols._instance.c2s_CExtpack_Size(BagTypes.BAG);
                            //银币不够，调用银币补助界面
                        }
                        else {
                            /** 解锁需要花费的元宝石 */
                            var _yuanBaoNum = "50";
                            var isShowGold = false;
                            var needSilverNumber = game.utils.MoneyU.number2Thousands(diff);
                            var needGoldNumber = Math.ceil(diff / bag_1.models.BagModel.getInstance().exchangeRateOfGold).toString(); //game.utils.MoneyU.number2Thousands(diff / models.BagModel.getInstance().exchangeRateOfGold);
                            var needYuanBaoNumber = _yuanBaoNum; //game.utils.MoneyU.number2Thousands(diff / models.BagModel.getInstance().exchangeRateOfYuanBao);
                            this._jinBiBuZuViewMediator.onShow(isShowGold, needSilverNumber, needYuanBaoNumber, needGoldNumber);
                        }
                    }
                };
                /**
                 * @describe  在提示界面(解锁仓库时候)时候的确定按钮事件
                 */
                BagsViewMediator.prototype.clickCancelBtnEvent = function () {
                    /** 先把确认事件移除 */
                    this._remindViewMediator.off(modules.commonUI.RIGHT_BUTTON_EVENT, this, this.clickEnSureBtnEvent);
                    this._remindViewMediator.hide();
                    this._isLockBag = false;
                };
                BagsViewMediator.prototype.onClickUseGoldBtnEvent = function () {
                    /** 玩家拥有的金币 */
                    var Gold = bag_1.models.BagModel.getInstance().globalIcon;
                    var isEnough = this._deblockingBagGoldNumber - Gold;
                    this._jinBiBuZuViewMediator.hide();
                    /** 金币足够 */
                    if (isEnough <= 0) {
                        /** 先请求钱币兑换 -->金币转银币 */
                        RequesterProtocols._instance.c2s_exchange_currency(MoneyTypes.MoneyType_GoldCoin, MoneyTypes.MoneyType_SilverCoin, 5000);
                        RequesterProtocols._instance.c2s_CExtpack_Size(BagTypes.BAG);
                    }
                    else {
                        /** 解锁需要花费的元宝石 */
                        var _yuanBaoNum = "50";
                        var isShowGold = true;
                        var needSilverNumber = game.utils.MoneyU.number2Thousands(isEnough);
                        var needGoldNumber = Math.ceil(isEnough / bag_1.models.BagModel.getInstance().exchangeRateOfGold).toString(); //game.utils.MoneyU.number2Thousands(isEnough / models.BagModel.getInstance().exchangeRateOfGold);
                        var needYuanBaoNumber = _yuanBaoNum; // game.utils.MoneyU.number2Thousands(isEnough / models.BagModel.getInstance().exchangeRateOfYuanBao * 100);
                        this._jinBiBuZuViewMediator.onShow(isShowGold, needSilverNumber, needYuanBaoNumber, needGoldNumber);
                    }
                };
                /**
                 * 金币补足界面，点击使用元宝代替按钮事件
                 */
                BagsViewMediator.prototype.onClickUseYuanBaoBtnEvent = function () {
                    /** 玩家拥有的符石数 */
                    var FuShi_Num = bag_1.models.BagModel.getInstance().yuanbaoIcon;
                    var isEnough = this._deblockingBagFushiNumber - FuShi_Num;
                    this._jinBiBuZuViewMediator.hide();
                    /** 符石足够 */
                    if (isEnough <= 0) {
                        /** 先请求钱币兑换 -->符石转金币 */
                        RequesterProtocols._instance.c2s_exchange_currency(MoneyTypes.MoneyType_HearthStone, MoneyTypes.MoneyType_GoldCoin, 5000);
                    }
                    else {
                        var prompto = HudModel.getInstance().promptAssembleBack(PromptExplain.CHARGE_TIPS);
                        this._remindViewMediator.onShow(prompto);
                        this._remindViewMediator.once(modules.commonUI.RIGHT_BUTTON_EVENT, this, this.jumpToCharge);
                        this._remindViewMediator.once(modules.commonUI.LEFT_BUTTON_EVENT, this, this.cancleToJump);
                    }
                };
                /**  银币兑换界面使用元宝兑换 */
                BagsViewMediator.prototype.onClickUseYuanBaoOfSilverBtnEvent = function () {
                    /** 玩家拥有的符石数 */
                    var FuShi_Num = bag_1.models.BagModel.getInstance().fuShiIcon;
                    var isEnough = this._deblockingBagFushiNumber - FuShi_Num;
                    this._jinBiBuZuViewMediator.hide();
                    /** 符石足够 */
                    if (isEnough <= 0) {
                        /** 先请求钱币兑换 -->符石转银币 */
                        RequesterProtocols._instance.c2s_exchange_currency(MoneyTypes.MoneyType_HearthStone, MoneyTypes.MoneyType_SilverCoin, 50);
                        RequesterProtocols._instance.c2s_CExtpack_Size(BagTypes.BAG);
                    }
                    else {
                        var prompto = HudModel.getInstance().promptAssembleBack(PromptExplain.CHARGE_TIPS);
                        this._remindViewMediator.onShow(prompto);
                        this._remindViewMediator.once(modules.commonUI.RIGHT_BUTTON_EVENT, this, this.jumpToCharge);
                        this._remindViewMediator.once(modules.commonUI.LEFT_BUTTON_EVENT, this, this.cancleToJump);
                    }
                };
                /** 跳到充值界面 */
                BagsViewMediator.prototype.jumpToCharge = function () {
                    /** 先把取消事件移除 */
                    this._remindViewMediator.off(modules.commonUI.LEFT_BUTTON_EVENT, this, this.cancleToJump);
                    /** 跳转到充值界面 */
                    modules.ModuleManager.jumpPage(modules.ModuleNames.SHOP, shopMediatorType.CHONGZHI, this._app);
                    modules.ModuleManager.hide(modules.ModuleNames.BAG);
                    LoginModel.getInstance().CommonPage = "Bag";
                };
                /** 取消不跳转 */
                BagsViewMediator.prototype.cancleToJump = function () {
                    /** 把右键事件移除 */
                    this._remindViewMediator.off(modules.commonUI.RIGHT_BUTTON_EVENT, this, this.jumpToCharge);
                    this._remindViewMediator.hide();
                };
                ////////////////
                ///UI
                ////////////////
                /**
                 * @describe  控制task GameItem_list
                 */
                BagsViewMediator.prototype.controlTaskGameItemList = function () {
                    this._taskGameItemListLength = TASK_GAM_ITEM_NUMBER;
                    this._viewUI.taskGameItem_list.spaceX = 5;
                    this._viewUI.taskGameItem_list.spaceY = 5;
                    this._viewUI.taskGameItem_list.repeatX = 5;
                    this._viewUI.taskGameItem_list.repeatY = this._bagGameItemListLength / this._viewUI.taskGameItem_list.repeatX;
                    this.getTaskGameItemListData(BagTypes.QUEST);
                    this.listScrollOfTaskGameItem(this._viewUI.taskGameItem_list);
                };
                /**
                 * @describe  控制bagGameItem_list
                 */
                BagsViewMediator.prototype.controlBagGameItemList = function () {
                    if (bag_1.models.BagModel.getInstance().actBagNum < 100)
                        this._bagGameItemListLength = bag_1.models.BagModel.getInstance().actBagNum + 10;
                    else {
                        this._bagGameItemListLength = bag_1.models.BagModel.getInstance().actBagNum;
                        this.bagLatticereachUpperLimit = true;
                    }
                    this._viewUI.bagGameItem_list.spaceX = 5;
                    this._viewUI.bagGameItem_list.spaceY = 5;
                    //每次滑动，系统会自行计算
                    this._viewUI.bagGameItem_list.repeatX = 5;
                    this._viewUI.bagGameItem_list.repeatY = this._bagGameItemListLength / this._viewUI.bagGameItem_list.repeatX;
                    this.getBagGameItemListData(BagTypes.BAG);
                    this.listScrollOfBagGameItem(this._viewUI.bagGameItem_list);
                };
                /**
                 * @describe  控制quipGameItem_list
                 */
                BagsViewMediator.prototype.controlEquipGameItemList = function () {
                    this._viewUI.equipGameItem_list.spaceX = 237;
                    this._viewUI.equipGameItem_list.spaceY = 26;
                    // this._viewUI.equipGameItem_list.repeatY = 3;
                    // this._viewUI.equipGameItem_list.repeatX = 2;
                    this._viewUI.equipGameItem_list.selectEnable = true;
                    this.getOwnGameItemListData(BagTypes.EQUIP);
                    this.listScrollOfEquipGameItem(this._viewUI.equipGameItem_list);
                };
                /**
                 * @describe   背包控件的滚动回弹效果
                 * @param list  list控件
                 */
                BagsViewMediator.prototype.listScrollOfBagGameItem = function (list) {
                    list.vScrollBarSkin = "";
                    list.scrollBar.elasticBackTime = 200;
                    list.scrollBar.elasticDistance = 50;
                    list.selectEnable = true;
                    list.renderHandler = new Handler(this, this.onRenderListItemOfBagGameItem);
                    list.selectHandler = new Handler(this, this.onSelcetOfBagGameItem);
                };
                /**
                 * @ describe  任务栏的滚动回弹效果
                 * @param list  list控件
                 */
                BagsViewMediator.prototype.listScrollOfTaskGameItem = function (list) {
                    list.vScrollBarSkin = "";
                    list.scrollBar.elasticBackTime = 200;
                    list.scrollBar.elasticDistance = 50;
                    list.selectEnable = true;
                    list.renderHandler = new Handler(this, this.onRenderListItemOfTaskGameItem);
                    list.selectHandler = new Handler(this, this.onSelectOfTaskGameItem);
                };
                /**
                 * @describe  List控件
                 * @param list
                 */
                BagsViewMediator.prototype.listScrollOfEquipGameItem = function (list) {
                    list.renderHandler = new Handler(this, this.onRenderListItemOfEquipGameItem);
                    list.selectHandler = new Handler(this, this.onSelectOfEquipGameItem);
                };
                /**
                 * @describe  显示人物评分
                 */
                BagsViewMediator.prototype.showHeroScore = function () {
                    var str;
                    var score = BagModel.getInstance().roleScore;
                    if (!isNaN(score)) {
                        str = score.toString();
                    }
                    else {
                        str = "0";
                    }
                    this._viewUI.heroScore_lab.text = str;
                };
                /**
                 * @describe  显示钱币
                 */
                BagsViewMediator.prototype.showMoneyNumber = function () {
                    this.showGlobalNumber();
                    this.showSilverNumber();
                };
                /**
                 * @describe 显示金币
                 */
                BagsViewMediator.prototype.showGlobalNumber = function () {
                    var str;
                    var score = BagModel.getInstance().globalIcon;
                    if (!isNaN(score)) {
                        // str = score.toString();
                        str = game.utils.MoneyU.number2Thousands(score);
                    }
                    else {
                        str = "0";
                    }
                    this._viewUI.globalNumber_lab.text = str;
                };
                /**
                 * @describe  显示银币
                 */
                BagsViewMediator.prototype.showSilverNumber = function () {
                    var str;
                    var score = BagModel.getInstance().sliverIcon;
                    if (!isNaN(score)) {
                        str = game.utils.MoneyU.number2Thousands(score);
                    }
                    else {
                        str = "0";
                    }
                    this._viewUI.silverNumber_lab.text = str;
                };
                /** 创建动画 */
                BagsViewMediator.prototype.onCreateFrame = function () {
                    var effecthPath = bagModel.getInstance().getEffectUrls("xuanzhong", 9);
                    Laya.Animation.createFrames(effecthPath, "xuanzhong");
                    this.ani.play(0, true, "xuanzhong");
                    this.ani.interval = 112;
                };
                return BagsViewMediator;
            }(game.modules.UiMediator));
            bag_1.BagsViewMediator = BagsViewMediator;
        })(bag = modules.bag || (modules.bag = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=BagsViewMediator.js.map