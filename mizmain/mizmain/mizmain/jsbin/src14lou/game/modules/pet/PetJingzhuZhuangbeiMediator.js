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
* 宠物精铸装备
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var pet;
        (function (pet) {
            var PetJingzhuZhuangbeiMediator = /** @class */ (function (_super) {
                __extends(PetJingzhuZhuangbeiMediator, _super);
                function PetJingzhuZhuangbeiMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    /**给list列表添加控件名字*/
                    _this.buweidata = [];
                    /**宠物装备名字*/
                    _this.data = [];
                    /**装备类型ID 0为全部 42为护环 58为宝坠 74项圈 106头冠*/
                    _this.typeid = [0, 106, 58, 74, 42];
                    /**货币类型*/
                    _this.huobiicon = ["common_yinb.png", "common_jinb.png", "yuanbao.png"];
                    /**宠物地板图片*/
                    _this.colour = ["baikuang.png", "lvkuang.png", "lankuang.png", "zikuang.png", "jinkuang.png"];
                    /**所有装备的ID*/
                    _this.equipid = [];
                    /**所有装备的KEY*/
                    _this.equipkey = [];
                    /**所有装备的品质*/
                    _this.equipnq = [];
                    /**所有装备的部位ID*/
                    _this.equipbuwei = [];
                    _this._viewUI = new ui.common.PetJingzhuZhuangbeiUI();
                    _this._viewUI.mouseThrough = true;
                    _this.isCenter = true;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this.tips = new game.modules.commonUI.DisappearMessageTipsMediator(_this._app);
                    _this._viewUI.select_box.on(LEvent.MOUSE_DOWN, _this, _this.yincang);
                    return _this;
                }
                /**隐藏选择部位类型选项*/
                PetJingzhuZhuangbeiMediator.prototype.yincang = function () {
                    this._viewUI.select_box.visible = false;
                };
                /**显示*/
                PetJingzhuZhuangbeiMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                    game.modules.bag.models.BagProxy.getInstance().on(game.modules.bag.models.REFRESH_CURRENCY_EVENT, this, this.showMoneyNumber);
                    this.addbuweiname();
                    this.init();
                    this._viewUI.jingzhu_btn.clickHandler = new Laya.Handler(this, this.jingzhupetequip);
                    this._viewUI.dhjinbi_btn.on(LEvent.MOUSE_DOWN, this, this.duihuan);
                    game.modules.pet.models.PetProxy.getInstance().on(game.modules.pet.models.JINZHURESULT, this, this.result);
                };
                /**填充宠物装备部位名字*/
                PetJingzhuZhuangbeiMediator.prototype.addbuweiname = function () {
                    this.data = [];
                    this.buweidata = [];
                    for (var index = 11739; index <= 11743; index++) {
                        var chattext = game.modules.tips.models.TipsModel._instance.cstringResConfigData[index];
                        this.data.push(chattext.msg);
                        this.buweidata.push({ buweiselect_btn: chattext.msg });
                    }
                };
                /**初始化数据*/
                PetJingzhuZhuangbeiMediator.prototype.init = function () {
                    this.initequiplist();
                    this._viewUI.buwei_list.array = this.buweidata;
                    this._viewUI.buwei_list.vScrollBarSkin = "";
                    this._viewUI.buwei_list.renderHandler = new Laya.Handler(this, this.initbuwei);
                    this.equip1id = -1;
                    this.equip1key = -1;
                    this.equip2id = -1;
                    this.equip2key = -1;
                    this.equip1nq = -1;
                    this.equip2nq = -1;
                    this.equip1buwei = -1;
                    this.equip2buwei = -1;
                    this.equip1box = null;
                    this.equip2box = null;
                    this.scell = null;
                    this._viewUI.needusejinbi_lab.text = 0 + "";
                    this._viewUI.havejinbi_lab.text = game.modules.bag.models.BagModel.getInstance().globalIcon + "";
                    this._viewUI.lvzhuang1_img.skin = "";
                    this._viewUI.lvzhuang2_img.skin = "";
                    this._viewUI.equip1_lab.text = "";
                    this._viewUI.equip2_lab.text = "";
                    this._viewUI.xiaochuzhuangbei1_btn.visible = false;
                    this._viewUI.xiaochuzhuangbei2_btn.visible = false;
                };
                /**初始化装备*/
                PetJingzhuZhuangbeiMediator.prototype.initequiplist = function () {
                    var bag = BagModel.getInstance().bagMap[BagTypes.BAG];
                    this.equipid = [];
                    this.equipkey = [];
                    this.equipnq = [];
                    this.equipbuwei = [];
                    var data = [];
                    var itemArrConfig = BagModel.getInstance().itemAttrData;
                    for (var index in bag.items) {
                        var item = itemArrConfig[bag.items[index].id];
                        var itemtypeid = item["itemtypeid"];
                        var itemtype = StrengTheningModel.getInstance().itemTypeData[itemtypeid];
                        if (this.typeid.indexOf(itemtypeid) != -1) {
                            data.push({ kuang_img: "common/ui/tongyong/" + this.colour[item.nquality - 1], item_img: "common/icon/item/" + item.icon + ".png", name_lab: item.name, LV_lab: item.level, buweiname_lab: itemtype.name });
                            this.equipid.push(item.id);
                            this.equipkey.push(bag.items[index].key);
                            this.equipnq.push(item.nquality);
                            this.equipbuwei.push(itemtypeid);
                        }
                    }
                    this.initPetZBList(data);
                    this._viewUI.xiaochuzhuangbei1_btn.clickHandler = new Laya.Handler(this, this.delequip1);
                    this._viewUI.xiaochuzhuangbei2_btn.clickHandler = new Laya.Handler(this, this.delequip2);
                    this._viewUI.close_btn.clickHandler = new Laya.Handler(this, this.hide);
                    this._viewUI.select_btn.clickHandler = new Laya.Handler(this, this.selectlist);
                    this._viewUI.select_img.on(Laya.Event.MOUSE_DOWN, this, this.quitselect);
                };
                /** 宠物装备列表初始化 */
                PetJingzhuZhuangbeiMediator.prototype.initPetZBList = function (data) {
                    this._viewUI.petzb_list.array = data;
                    this._viewUI.petzb_list.repeatY = data.length;
                    this._viewUI.petzb_list.vScrollBarSkin = "";
                    this._viewUI.petzb_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.petzb_list.scrollBar.elasticDistance = 50;
                    this._viewUI.petzb_list.renderHandler = new Laya.Handler(this, this.selectequip);
                };
                PetJingzhuZhuangbeiMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    modules.ModuleManager.show(modules.ModuleNames.PET, this._app);
                };
                /**装备选择响应事件*/
                PetJingzhuZhuangbeiMediator.prototype.selectequip = function (cell, index) {
                    var petequip = cell.getChildByName("hc_btn");
                    var img = cell.getChildByName("item_img");
                    petequip.on(Laya.Event.CLICK, this, this.equipselect, [cell, index]);
                };
                /**宠物装备选择*/
                PetJingzhuZhuangbeiMediator.prototype.equipselect = function (cell, index) {
                    var img = cell.getChildByName("item_img");
                    var petequip = cell.getChildByName("hc_btn");
                    petequip.selected = true;
                    if (this.scell != null) {
                        var btn = this.scell.getChildByName("hc_btn");
                        btn.selected = false;
                    }
                    this.scell = cell;
                    //选择两件装备key不能一样 当其中一个key为-1时说明该位置上没有选择装备
                    if (this.equip1key == -1 && this.equipkey[index] != this.equip2key && (this.equipnq[index] == this.equip2nq || this.equip2nq == -1) && (this.equipbuwei[index] == this.equip2buwei || this.equip2buwei == -1)) {
                        img.gray = true;
                        this.equip1box = cell;
                        this.equip1key = this.equipkey[index];
                        this.equip1id = this.equipid[index];
                        this.equip1nq = this.equipnq[index];
                        this.equip1buwei = this.equipbuwei[index];
                        var item = BagModel.getInstance().itemAttrData[this.equip1id];
                        this._viewUI.normal1_img.skin = "common/ui/tongyong/" + this.colour[item.nquality - 1];
                        this._viewUI.lvzhuang1_img.skin = "common/icon/item/" + item.icon + ".png";
                        this._viewUI.equip1_lab.text = item.name;
                        this._viewUI.xiaochuzhuangbei1_btn.visible = true;
                    }
                    else if (this.equip2key == -1 && this.equipkey[index] != this.equip1key && (this.equipnq[index] == this.equip1nq || this.equip1nq == -1) && (this.equipbuwei[index] == this.equip1buwei || this.equip1buwei == -1)) {
                        img.gray = true;
                        this.equip2box = cell;
                        this.equip2key = this.equipkey[index];
                        this.equip2id = this.equipid[index];
                        this.equip2nq = this.equipnq[index];
                        this.equip2buwei = this.equipbuwei[index];
                        var item = BagModel.getInstance().itemAttrData[this.equip2id];
                        this._viewUI.normal2_img.skin = "common/ui/tongyong/" + this.colour[item.nquality - 1];
                        this._viewUI.lvzhuang2_img.skin = "common/icon/item/" + item.icon + ".png";
                        this.equip2id = this.equipid[index];
                        this._viewUI.equip2_lab.text = item.name;
                        this._viewUI.xiaochuzhuangbei2_btn.visible = true;
                    }
                    else {
                        if (img.gray)
                            return; // 如果选中变暗的则不提示
                        var prompt_1 = HudModel.getInstance().promptAssembleBack(191053);
                        var disappearMsgTips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                        disappearMsgTips.onShow(prompt_1);
                    }
                    this.cost();
                };
                /**删除选择的第一个装备*/
                PetJingzhuZhuangbeiMediator.prototype.delequip1 = function () {
                    var img1 = this.equip1box.getChildByName("item_img");
                    img1.gray = false;
                    this.equip1key = -1;
                    this.equip1id = -1;
                    this.equip1nq = -1;
                    this.equip1buwei = -1;
                    this._viewUI.normal1_img.skin = "common/ui/tongyong/kuang94.png";
                    this._viewUI.lvzhuang1_img.skin = "";
                    this._viewUI.equip1_lab.text = "";
                    this._viewUI.xiaochuzhuangbei1_btn.visible = false;
                    this.cost();
                };
                /**删除选择的第二个装备*/
                PetJingzhuZhuangbeiMediator.prototype.delequip2 = function () {
                    var img2 = this.equip2box.getChildByName("item_img");
                    img2.gray = false;
                    this.equip2key = -1;
                    this.equip2id = -1;
                    this.equip2nq = -1;
                    this.equip2buwei = -1;
                    this._viewUI.lvzhuang2_img.skin = "";
                    this._viewUI.normal2_img.skin = "common/ui/tongyong/kuang94.png";
                    this._viewUI.equip2_lab.text = "";
                    this._viewUI.xiaochuzhuangbei2_btn.visible = false;
                    this.cost();
                };
                /**精铸需要花费的金币*/
                PetJingzhuZhuangbeiMediator.prototype.cost = function () {
                    if (this.equip1key != -1 && this.equip2key != -1) {
                        var equiphc = PetModel.getInstance().petEquipHeChengData[this.equip1id];
                        if (equiphc)
                            this._viewUI.needusejinbi_lab.text = equiphc.money + "";
                        else
                            this._viewUI.needusejinbi_lab.text = 0 + "";
                    }
                    else {
                        this._viewUI.needusejinbi_lab.text = 0 + "";
                    }
                };
                PetJingzhuZhuangbeiMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                /**显示选择部位类型的列表*/
                PetJingzhuZhuangbeiMediator.prototype.selectlist = function () {
                    this._viewUI.select_box.visible = true;
                };
                /**隐藏选择部位类型的列表*/
                PetJingzhuZhuangbeiMediator.prototype.quitselect = function () {
                    this._viewUI.select_box.visible = false;
                };
                /**初始化所有宠物装备*/
                PetJingzhuZhuangbeiMediator.prototype.initbuwei = function (cell, index) {
                    var btn = cell.getChildByName("buweiselect_btn");
                    btn.on(LEvent.MOUSE_DOWN, this, this.selectbuwei, [index]);
                };
                /**选择部位对应的所有宠物装备*/
                PetJingzhuZhuangbeiMediator.prototype.selectbuwei = function (index) {
                    this._viewUI.select_box.visible = false;
                    this._viewUI.select_btn.label = this.data[index];
                    this.refreshdata(index);
                };
                /**刷新精铸装备的数据*/
                PetJingzhuZhuangbeiMediator.prototype.refreshdata = function (index) {
                    this._viewUI.petzb_list.selectedIndex = -1;
                    if (this.equip1box != null) {
                        this.delequip1();
                    }
                    if (this.equip2box != null) {
                        this.delequip2();
                    }
                    this.equip1box = null;
                    this.equip2box = null;
                    this.scell = null;
                    this._viewUI.needusejinbi_lab.text = 0 + "";
                    if (index == 0) { //0为显示全部装备数据
                        this.initequiplist();
                    }
                    else {
                        this.equipid = [];
                        this.equipkey = [];
                        this.equipnq = [];
                        this.equipbuwei = [];
                        var bag_1 = BagModel.getInstance().bagMap[BagTypes.BAG];
                        var data_1 = [];
                        for (var id = 0; id < bag_1.items.length; id++) {
                            var item = BagModel.getInstance().itemAttrData[bag_1.items[id].id];
                            if (item.itemtypeid == this.typeid[index]) {
                                var itemtype = StrengTheningModel.getInstance().itemTypeData[item.itemtypeid];
                                data_1.push({ kuang_img: "common/ui/tongyong/" + this.colour[item.nquality - 1], item_img: "common/icon/item/" + item.icon + ".png", name_lab: item.name, LV_lab: item.level, buweiname_lab: itemtype.name });
                                this.equipid.push(item.id);
                                this.equipkey.push(bag_1.items[id].key);
                                this.equipnq.push(item.nquality);
                                this.equipbuwei.push(item.itemtypeid);
                            }
                        }
                        this.initPetZBList(data_1);
                    }
                };
                /**精铸装备*/
                PetJingzhuZhuangbeiMediator.prototype.jingzhupetequip = function () {
                    if (parseInt(this._viewUI.needusejinbi_lab.text) == 0) { //精铸金币显示为0时
                        var chattext = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[150167];
                        this.tips.onShow(chattext.msg);
                        return;
                    }
                    if (parseInt(this._viewUI.needusejinbi_lab.text) > parseInt(this._viewUI.havejinbi_lab.text)) { //精铸金币不够时跳转
                        //金币不足跳转金币兑换界面
                        this.change = new game.modules.commonUI.ChangeMoneyViewMediator(this._viewUI, this._app);
                        this.change.once(modules.commonUI.CHANGEMONEY_CONFIRM_EVENT, this, this.onClickChangeMoneyConfirmBtnEvent);
                        this.change.onShow(true, game.modules.bag.models.BagModel.getInstance().yuanbaoIcon, 100);
                        return;
                    }
                    if (this.equip1key != -1 && this.equip2key != -1) { //key都不为-1时对应的装备显示灰色
                        var img1 = this.equip1box.getChildByName("item_img");
                        var img2 = this.equip2box.getChildByName("item_img");
                        img1.gray = false;
                        img2.gray = false;
                        game.modules.bag.models.BagProxy.getInstance().once(game.modules.bag.models.REFRESH_BAG_DEPOT_COUNT, this, this.show);
                        RequesterProtocols._instance.c2s_CHeChengPet_Equip(this.equip1key, this.equip2key);
                    }
                };
                /**兑换界面*/
                PetJingzhuZhuangbeiMediator.prototype.duihuan = function () {
                    this.change = new game.modules.commonUI.ChangeMoneyViewMediator(this._viewUI, this._app);
                    this.change.once(modules.commonUI.CHANGEMONEY_CONFIRM_EVENT, this, this.onClickChangeMoneyConfirmBtnEvent);
                    this.change.onShow(true, game.modules.bag.models.BagModel.getInstance().yuanbaoIcon, 100);
                };
                /**兑换界面*/
                PetJingzhuZhuangbeiMediator.prototype.onClickChangeMoneyConfirmBtnEvent = function (parame) {
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
                /**精铸需要的金币数量*/
                PetJingzhuZhuangbeiMediator.prototype.showMoneyNumber = function () {
                    this._viewUI.havejinbi_lab.text = game.modules.bag.models.BagModel.getInstance().globalIcon + "";
                };
                PetJingzhuZhuangbeiMediator.prototype.result = function () {
                    this.init();
                };
                return PetJingzhuZhuangbeiMediator;
            }(game.modules.UiMediator));
            pet.PetJingzhuZhuangbeiMediator = PetJingzhuZhuangbeiMediator;
        })(pet = modules.pet || (modules.pet = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=PetJingzhuZhuangbeiMediator.js.map