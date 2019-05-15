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
        var family;
        (function (family) {
            /** 帮派符文捐赠 */
            var FamilyFuWenJZMediator = /** @class */ (function (_super) {
                __extends(FamilyFuWenJZMediator, _super);
                function FamilyFuWenJZMediator(app) {
                    var _this = _super.call(this) || this;
                    /** 存放能被捐赠的符文附魔卷轴所在背包中的key值 */
                    _this.itemKeys = [];
                    /** 哪个符文附魔卷轴要被捐赠的索引 */
                    _this.itemKeysIndex = 0;
                    _this.uiLayer = app.uiRoot.general;
                    _this._viewUI = new ui.common.component.FuWenJuanZengUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this._viewUI.closeBtn_btn.on(LEvent.CLICK, _this, _this.hide);
                    _this._viewUI.huoLi_checkBox.on(LEvent.CLICK, _this, _this.checkSelect, [0]);
                    _this._viewUI.fuwen_checkBox.on(LEvent.CLICK, _this, _this.checkSelect, [1]);
                    _this._viewUI.fuwen_list.renderHandler = new Handler(_this, _this.fuwenSelect);
                    _this._viewUI.juanZeng_btn.on(LEvent.CLICK, _this, _this.juanZeng);
                    _this.ani = new Laya.Animation();
                    return _this;
                }
                /** 初始化界面
                 * @param  roleid    捐赠人角色id
                 * @param  itemId    捐赠的物品id
                 */
                FamilyFuWenJZMediator.prototype.init = function (roleid, itemid) {
                    if (this.ani) {
                        this.ani.clear();
                    }
                    this.roleid = roleid;
                    this.itemid = itemid;
                    this.show();
                    this._viewUI.huoLi_checkBox.visible = true;
                    this._viewUI.huoLi_checkBox.selected = true;
                    this._viewUI.fuwen_checkBox.visible = true;
                    this._viewUI.fuwen_checkBox.selected = false;
                    var itemArr = game.modules.bag.models.BagModel.getInstance().getBagGameItemData(BagTypes.BAG).items;
                    var data = [];
                    if (itemArr.length > 0) {
                        var skinArr = ["common/ui/tongyong/baikuang.png", "common/ui/tongyong/lvkuang.png",
                            "common/ui/tongyong/lankuang.png", "common/ui/tongyong/zikuang.png",
                            "common/ui/tongyong/jinkuang.png"];
                        var _itemAttrBinDic = BagModel.getInstance().itemAttrData;
                        for (var i = 0; i < itemArr.length; i++) {
                            var id = itemArr[i].id;
                            if (itemArr[i].id == itemid && !game.modules.bag.models.BagModel.getInstance().itemIsBind(itemArr[i].flags)) {
                                this.itemKeys.push(itemArr[i].key);
                                data.push({
                                    diban_img: { skin: skinArr[_itemAttrBinDic[itemid].nquality - 1] },
                                    icon_img: { skin: game.modules.shop.models.ShopModel.getInstance().getSrc(_itemAttrBinDic[itemid].icon) },
                                });
                            }
                        }
                    }
                    this._viewUI.fuwen_list.array = data;
                };
                FamilyFuWenJZMediator.prototype.fuwenSelect = function (cell, index) {
                    var img = cell.getChildByName("icon_img");
                    img.on(LEvent.MOUSE_DOWN, this, this.getTips, [index]);
                };
                /** 物品信息弹窗 */
                FamilyFuWenJZMediator.prototype.getTips = function (index) {
                    var parame = new Dictionary();
                    parame.set("itemId", this.itemid);
                    parame.set("packid", BagTypes.BAG);
                    parame.set("key", this.itemKeys[index]);
                    this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.BAG, parame, true);
                    //添加选中的动画效果
                    this.PlayEffect(this._viewUI.fuwen_list, index);
                    this.itemKeysIndex = index;
                };
                /** 播放特效 */
                FamilyFuWenJZMediator.prototype.PlayEffect = function (list, index) {
                    var cell = list.getCell(index);
                    var diban_img = cell.getChildByName("diban_img");
                    this.ani.loadAtlas("common/res/atlas/ui/tuji.atlas", Laya.Handler.create(this, this.onCreateFrame));
                    diban_img.addChild(this.ani);
                    this.ani.scaleX = 0.9;
                    this.ani.scaleY = 0.9;
                };
                /** 创建动画 */
                FamilyFuWenJZMediator.prototype.onCreateFrame = function () {
                    var effecthPath = bagModel.getInstance().getEffectUrls("xuanzhong", 9);
                    Laya.Animation.createFrames(effecthPath, "xuanzhong");
                    this.ani.play(0, true, "xuanzhong");
                    this.ani.interval = 112;
                };
                /** checkbox选中设置（只能二选一） */
                FamilyFuWenJZMediator.prototype.checkSelect = function (index) {
                    if (!this._viewUI.huoLi_checkBox.visible && index == 1)
                        return;
                    switch (index) {
                        case 0:
                            if (this._viewUI.huoLi_checkBox.selected) {
                                this._viewUI.fuwen_checkBox.selected = false;
                            }
                            break;
                        case 1:
                            if (this._viewUI.fuwen_checkBox.selected) {
                                this._viewUI.huoLi_checkBox.selected = false;
                            }
                            break;
                    }
                    if (this._viewUI.huoLi_checkBox.selected || this._viewUI.fuwen_checkBox.selected) {
                        this._viewUI.juanZeng_btn.disabled = false;
                    }
                    else {
                        this._viewUI.juanZeng_btn.disabled = true;
                    }
                };
                /** 捐赠 */
                FamilyFuWenJZMediator.prototype.juanZeng = function () {
                    if (this._viewUI.huoLi_checkBox.selected) { //消耗活力捐赠
                        // var energyNum = game.modules.createrole.models.LoginModel.getInstance().roleDetail.energy;
                        var energyNum = game.modules.mainhud.models.HudModel._instance.energyNum;
                        if (energyNum < 100) {
                            //活力不足时飘窗提示
                            var promot = HudModel.getInstance().promptAssembleBack(PromptExplain.LACK_OF_VITALITY);
                            game.modules.chat.models.ChatProxy.getInstance().event(game.modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS, promot);
                        }
                        else {
                            RequesterProtocols._instance.c2s_CRuneGive(this.roleid, FuWenSeletType.HuoLi, this.itemid, 0, BagTypes.BAG);
                            this.hide();
                        }
                    }
                    else if (this._viewUI.fuwen_checkBox.selected) { //消耗符文捐赠 —— 只能选中一个进行赠送
                        if (this.itemKeys.length <= 0) {
                            //道具不足时飘窗提示
                            var arr = [];
                            arr.push(BagModel.getInstance().itemAttrData[this.itemid].name);
                            var promot = HudModel.getInstance().promptAssembleBack(PromptExplain.LACK_OF_ITEM, arr);
                            game.modules.chat.models.ChatProxy.getInstance().event(game.modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS, promot);
                        }
                        else {
                            RequesterProtocols._instance.c2s_CRuneGive(this.roleid, FuWenSeletType.FuWen, this.itemid, this.itemKeys[this.itemKeysIndex], BagTypes.BAG);
                            this.hide();
                        }
                    }
                };
                FamilyFuWenJZMediator.prototype.onShow = function (event) {
                    this.show();
                };
                FamilyFuWenJZMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    RequesterProtocols._instance.c2s_CRequestRuneInfo();
                    if (this.ani) {
                        this.ani.clear();
                    }
                };
                FamilyFuWenJZMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return FamilyFuWenJZMediator;
            }(game.modules.ModuleMediator));
            family.FamilyFuWenJZMediator = FamilyFuWenJZMediator;
        })(family = modules.family || (modules.family = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=FamilyFuWenJZMediator.js.map