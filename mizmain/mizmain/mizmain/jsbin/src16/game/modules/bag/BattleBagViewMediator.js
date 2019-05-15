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
/** 战斗背包存放物品id最小值 */
var BATTLE_MIN_ID = 111000;
/** 战斗背包存放物品id最大值 */
var BATTLE_MAX_ID = 111053;
var game;
(function (game) {
    var modules;
    (function (modules) {
        var bag;
        (function (bag_1) {
            /** 战斗背包最大格子数 */
            bag_1.BATTLE_BAG_MAX_NUM = 20;
            var BattleBagViewMediator = /** @class */ (function (_super) {
                __extends(BattleBagViewMediator, _super);
                function BattleBagViewMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    /**战斗道具的List控件数据 */
                    _this._BattleGameItemListData = [];
                    /** 上个出现道具位置 */
                    _this.lastPos = -1;
                    /** 选中Index */
                    _this.selectIndex = -1;
                    /** 操作对象 */
                    _this._operater = -1;
                    /** 战斗药品使用次数 */
                    _this.drug_usetimes = new Laya.Dictionary;
                    /** d道具-复合表 */
                    _this.itemattr = BagModel.getInstance().itemAttrData; //{ [key: number]: RoleFighteAIBaseVo } = {};
                    _this._viewUI = new ui.common.BattleBagUI();
                    _this.isCenter = true;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this.ani = new Laya.Animation();
                    _this.registerEvent();
                    return _this;
                }
                BattleBagViewMediator.getInstance = function (app) {
                    if (!this._instance) {
                        this._instance = new BattleBagViewMediator(app);
                    }
                    return this._instance;
                };
                /** 事件注册 */
                BattleBagViewMediator.prototype.registerEvent = function () {
                    this._viewUI.close_btn.on(LEvent.CLICK, this, this.hide);
                    this._viewUI.use_btn.on(LEvent.CLICK, this, this._onUseItem);
                    this._viewUI.type_tab.selectHandler = new Handler(this, this.SelectItemTypeContent);
                };
                /** 初始化战斗背包的数据
                 * @param index 选中tab组件下标 0则为显示所有
                */
                BattleBagViewMediator.prototype.getBattleBag = function (tabIndex) {
                    var bag = BagModel.getInstance().getBagGameItemData(BagTypes.BAG);
                    if (!bag)
                        return;
                    this._BattleGameItemListData = [];
                    this._BattleGameItemListLength = bag.items.length;
                    this.lastPos = -1;
                    var arr = [];
                    var posArray = [];
                    var listItem;
                    // this._bagGameItemListPos =  new Laya.Dictionary();
                    for (var index = 0; index < this._BattleGameItemListLength; index++) {
                        var id = bag.items[index].id;
                        if (id < BATTLE_MIN_ID || id > BATTLE_MAX_ID)
                            continue;
                        // this._bagGameItemListPos.set(id, bag.items[index].key);
                        var obj = BagModel.getInstance().getItemAttrData(id);
                        var drugType = BagModel.getInstance().FightDrugTypeData[id].typeid;
                        if (drugType != 0) {
                            var show = this.judgeType(tabIndex, drugType);
                            if (!show)
                                continue;
                        }
                        if (obj.battleuser != 0 /* CAN_NOT_USE */) {
                            /** 如果操作对象是宠物的话则不能使用角色才能使用的物品 */
                            if (this._operater === 0 /* Pet */ && obj.battleuser === 1 /* ROLE_USER */)
                                continue; //1主角2宠物3主角和宠物
                            var icon = obj.icon;
                            var battleuse = obj.battleuse;
                            var nquality = obj.nquality;
                            var number = bag.items[index].number;
                            var pos_1 = bag.items[index].position;
                            var key = bag.items[index].key;
                            var battleuser = obj.battleuser;
                            var position = bag.items[index].position;
                            listItem =
                                {
                                    ID: id,
                                    icon: icon,
                                    number: number,
                                    position: pos_1,
                                    nquality: nquality,
                                    isLock: false,
                                    key: key,
                                    battleuser: battleuser,
                                    battleuse: battleuse,
                                };
                            arr.push(listItem);
                            this.lastPos++;
                            posArray.push(this.lastPos);
                        }
                    }
                    for (var index = 0; index < bag_1.BATTLE_BAG_MAX_NUM; index++) {
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
                                battleuser: -1,
                                battleuse: -1,
                            };
                        }
                        this._BattleGameItemListData.push(listItem);
                    }
                    this._viewUI.battleBag_list.array = this._BattleGameItemListData;
                };
                /** 判断类型
                 * @param tanNum tab组件下标
                 * @param type 战斗药品类型
                 */
                BattleBagViewMediator.prototype.judgeType = function (tanNum, type) {
                    /** 全部的药品 */
                    if (tanNum === 0)
                        return true;
                    else if (tanNum === type)
                        return true;
                };
                /**
                * @describe  控制GameItem_list
                * @param 选中tab组件下标
                */
                BattleBagViewMediator.prototype.controlGameItemList = function (index) {
                    if (index === void 0) { index = 0; }
                    var itemNumber = 1;
                    this._viewUI.battleBag_list.repeatX = 4;
                    this._viewUI.battleBag_list.repeatY = 5;
                    this._viewUI.battleBag_list.spaceX = 20;
                    this._viewUI.battleBag_list.spaceY = 16;
                    this.getBattleBag(index);
                    this.listScroll(this._viewUI.battleBag_list);
                };
                /**
                 * @describe  List控件的滚动回弹效果
                 * @param list  list控件
                 */
                BattleBagViewMediator.prototype.listScroll = function (list) {
                    list.vScrollBarSkin = "";
                    list.scrollBar.elasticBackTime = 200;
                    list.scrollBar.elasticDistance = 50;
                    list.selectEnable = true;
                    list.renderHandler = new Handler(this, this.onRenderListItem);
                };
                /**
                 * @describe 渲染List中的单元格
                 * @param cell  Laya.Box
                 * @param index  number
                 */
                BattleBagViewMediator.prototype.onRenderListItem = function (cell, index) {
                    if (index > this._BattleGameItemListLength)
                        return;
                    var itemData = this._BattleGameItemListData[index];
                    var gameItemBgImg = cell.getChildByName("gameItemBg_img");
                    var gameItemImg = cell.getChildByName("gameItem_Img");
                    var gameItemNumberLabel = cell.getChildByName("gameItemNumber_lab");
                    if (itemData.ID != -1) {
                        gameItemNumberLabel.visible = true;
                        var str = itemData.number > 1 ? itemData.number.toString() : "";
                        gameItemBgImg.skin = bag_1.BagSystemModule.getGameItemFrameColorResource(itemData.nquality);
                        gameItemImg.skin = "common/icon/item/" + itemData.icon + ".png";
                        gameItemNumberLabel.changeText(str);
                        gameItemImg.off(LEvent.CLICK, this, this.onSelectListItem);
                        gameItemImg.on(LEvent.CLICK, this, this.onSelectListItem, [index]);
                        // if(itemData.equipType != -1) gameItemImg.on(LEvent.DOUBLE_CLICK,this,this.opEquip,[OpEquip.PUTON,itemData.key,itemData.equipType]);
                    }
                    else {
                        gameItemBgImg.skin = "common/ui/tongyong/kuang94.png";
                        gameItemImg.skin = "";
                        gameItemNumberLabel.visible = false;
                    }
                };
                /**
                 * @describe  选择到List中的单元格
                 * @param cell  Laya.Box
                 * @param index  number
                 */
                BattleBagViewMediator.prototype.onSelectListItem = function (index) {
                    if (index == -1)
                        return;
                    if (!this._viewUI.left_times_box.visible)
                        this._viewUI.left_times_box.visible = true;
                    var itemData = this._BattleGameItemListData[index];
                    var can_usetimes;
                    var itemtype = this.itemattr[itemData.ID].itemtypeid;
                    //this.drug_usetimes.get(0) 为当前类型 为275 的物品的剩余使用次数
                    if (itemtype == 275 && this.drug_usetimes.get(0) > 0)
                        can_usetimes = 20;
                    //this.drug_usetimes.get(1) 为当前类型 290 或 291 的物品的剩余使用次数
                    else if ((itemtype == 290 || itemtype == 291 || itemtype == 323) && this.drug_usetimes.get(1) > 0)
                        can_usetimes = 10;
                    else
                        can_usetimes = 0;
                    var times = this.drug_usetimes.get(itemData.ID);
                    if (times == null)
                        this._viewUI.shengyucishu.text = can_usetimes.toString();
                    else if (can_usetimes == 0)
                        this._viewUI.shengyucishu.text = "0";
                    else
                        this._viewUI.shengyucishu.text = (can_usetimes - times).toString();
                    if ((can_usetimes - times) <= 0)
                        this._viewUI.use_btn.disabled = true;
                    else
                        this._viewUI.use_btn.disabled = false;
                    this.selectIndex = index;
                    this._viewUI.battleBag_list.selectedIndex = -1;
                    /** 播放选中特效 */
                    this.PlayEffect(this._viewUI.battleBag_list, index);
                };
                /** 使用 */
                BattleBagViewMediator.prototype._onUseItem = function () {
                    if (this.selectIndex == -1 || this._viewUI.use_btn.disabled)
                        return;
                    var listItem = this._BattleGameItemListData[this.selectIndex];
                    var key = listItem.key;
                    var battleuser = listItem.battleuser;
                    var roleid = LoginModel.getInstance().roleDetail.roleid;
                    var obj = BagModel.getInstance().getItemAttrData(listItem.ID);
                    battle.NotifyMgr.notify(5 /* BattleDrugInUse */, [listItem.battleuse, listItem.key, obj.name]);
                    this.hide();
                };
                /** tab组件自按钮点击
             * @param key tab组件下标
             */
                BattleBagViewMediator.prototype.SelectItemTypeContent = function (index) {
                    this._viewUI.use_btn.disabled = true;
                    this.controlGameItemList(index);
                    if (this.ani)
                        this.ani.clear();
                };
                BattleBagViewMediator.prototype.initUI = function () {
                    this._viewUI.use_btn.disabled = true;
                    this._viewUI.left_times_box.visible = false;
                    if (this.ani)
                        this.ani.clear();
                };
                /** 播放特效 */
                BattleBagViewMediator.prototype.PlayEffect = function (list, index) {
                    var cell = list.getCell(index);
                    var selectItem = cell.getChildByName("gameItemBg_img");
                    this.ani.loadAtlas("common/res/atlas/ui/tuji.atlas", Laya.Handler.create(this, this.onCreateFrame));
                    selectItem.addChild(this.ani);
                    this.ani.scaleX = 0.9;
                    this.ani.scaleY = 0.9;
                };
                /** 创建动画 */
                BattleBagViewMediator.prototype.onCreateFrame = function () {
                    var effecthPath = bagModel.getInstance().getEffectUrls("xuanzhong", 9);
                    Laya.Animation.createFrames(effecthPath, "xuanzhong");
                    this.ani.play(0, true, "xuanzhong");
                    this.ani.interval = 112;
                };
                BattleBagViewMediator.prototype.onshow = function (type, usetimes) {
                    _super.prototype.show.call(this);
                    this.drug_usetimes = usetimes;
                    this._operater = type;
                    this.controlGameItemList();
                    /** 初始化事件 */
                    this.initUI();
                };
                BattleBagViewMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                BattleBagViewMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return BattleBagViewMediator;
            }(game.modules.UiMediator));
            bag_1.BattleBagViewMediator = BattleBagViewMediator;
        })(bag = modules.bag || (modules.bag = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=BattleBagViewMediator.js.map