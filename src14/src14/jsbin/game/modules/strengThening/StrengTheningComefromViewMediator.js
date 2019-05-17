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
* 物品获取途径
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var strengThening;
        (function (strengThening) {
            var StrengTheningComefromViewMediator = /** @class */ (function (_super) {
                __extends(StrengTheningComefromViewMediator, _super);
                function StrengTheningComefromViewMediator(uiLayer, app, itemId) {
                    var _this = _super.call(this, uiLayer) || this;
                    /**装备生成基本属性表 */
                    _this.equipIteminfoData = StrengTheningModel.getInstance().equipIteminfoData;
                    /**属性效果id表 */
                    _this.attributeDesConfigData = StrengTheningModel.getInstance().attributeDesConfigData;
                    /**复合表 */
                    _this.itemAttrData = BagModel.getInstance().itemAttrData;
                    /**装备表-宝石-修理 */
                    _this.equipItemAttrData = StrengTheningModel.getInstance().equipItemAttrData;
                    /**道具类型表 */
                    _this.itemTypeData = StrengTheningModel.getInstance().itemTypeData;
                    /**装备打造表 */
                    _this.equipMakeInfoData = StrengTheningModel.getInstance().equipMakeInfoData;
                    /**程序内字符串表 */
                    _this.cstringResConfigData = game.modules.tips.models.TipsModel._instance.cstringResConfigData;
                    /**获取途径表 */
                    _this.comeFromData = strengThening.models.StrengTheningModel._instance.comeFromData;
                    _this._viewUI = new ui.common.StrengTheningGainUI();
                    _this.isCenter = false;
                    _this._app = app;
                    _this._viewUI.close_img.on(LEvent.MOUSE_DOWN, _this, _this.hide);
                    _this.showBaseItem(itemId);
                    return _this;
                }
                /**
                     * 显示物品tips中的名称、类型、功能、图标、边框
                     * @param itemId
                     */
                StrengTheningComefromViewMediator.prototype.showBaseItem = function (itemId) {
                    var destribe = this.itemAttrData[itemId].destribe; //描述
                    var effectdes = this.itemAttrData[itemId].effectdes; //功能说明
                    var itemName = this.itemAttrData[itemId].name; //物品名称
                    var itemtypeid = this.itemAttrData[itemId].itemtypeid; //类型
                    var itemtypeName = this.itemTypeData[itemtypeid].name; //类型名
                    var iconid = this.itemAttrData[itemId].icon; //iconid
                    var itemIcon = SaleModel.getInstance().getIcon(iconid); //icon
                    var nquality = this.itemAttrData[itemId].nquality; //品质
                    var itemnquality = StrengTheningModel._instance.frameSkinArr[nquality - 1];
                    this._viewUI.name_lab.text = itemName;
                    this._viewUI.typeName_lab.text = tipsModel.stringType.equipType + itemtypeName;
                    if (100100 <= itemId && itemId <= 100352) {
                        this._viewUI.number_lab.text = this.cstringResConfigData[1].msg + this.itemAttrData[itemId].level;
                    }
                    else {
                        this._viewUI.number_lab.text = this.cstringResConfigData[11032].msg + effectdes;
                    }
                    this._viewUI.icon_img.skin = itemIcon + "";
                    this._viewUI.frame_img.skin = itemnquality;
                    var tishi = this.cstringResConfigData[11029].msg;
                    this._viewUI.comefromDesc_label.text = tishi.replace("$parameter1$", itemName);
                    this.getWay(itemId);
                };
                /**获取途径 */
                StrengTheningComefromViewMediator.prototype.getWay = function (itemid) {
                    var vcomefrom = this.itemAttrData[itemid].vcomefrom;
                    var comefromArr = [];
                    for (var i = 0; i < vcomefrom.length; i++) {
                        var strname = this.comeFromData[vcomefrom[i]].strname;
                        var stricon2 = this.comeFromData[vcomefrom[i]].stricon2;
                        var nuiidornpcid = this.comeFromData[vcomefrom[i]].nuiidornpcid;
                        var etype = this.comeFromData[vcomefrom[i]].etype;
                        var m_icon = SaleModel.getInstance().getIcon(stricon2);
                        comefromArr.push({ content_img: m_icon, name_lab: strname, etype: etype, nuiidornpcid: nuiidornpcid });
                    }
                    SaleModel._instance.showList(this._viewUI.way_list, comefromArr);
                    this._viewUI.way_list.selectHandler = new Handler(this, this.waylistSelect, [comefromArr, itemid]);
                };
                /**物品获取途径选择 */
                StrengTheningComefromViewMediator.prototype.waylistSelect = function (comefromArr, itemid, index) {
                    var nuiidornpcid = comefromArr[index].nuiidornpcid;
                    switch (nuiidornpcid) {
                        case 1:
                            this.goShanghui(itemid); //商会
                            break;
                        case 2:
                            this.goSale(itemid); //拍卖
                            break;
                        case 3:
                            this.goLifeSkill(); //生活技能
                            break;
                        case 4:
                            this.goShop(itemid); //商城
                            break;
                        case 161521:
                            this.goBingfengwangzuo(); //冰封王座
                            break;
                        case 64:
                            this.goJifenDuihuan(); //积分兑换
                            break;
                    }
                };
                /**商会 */
                StrengTheningComefromViewMediator.prototype.goShanghui = function (itemid) {
                    var tabNum = game.modules.strengThening.models.StrengTheningModel._instance.tabNum;
                    game.modules.shop.models.ShopModel._instance.itemId = itemid;
                    modules.ModuleManager.show(modules.ModuleNames.SHOP, this._app);
                    modules.ModuleManager.hide(modules.ModuleNames.STRENG_THENING);
                    this.hide();
                    LoginModel.getInstance().CommonPage = modules.ModuleNames.STRENG_THENING;
                    game.modules.strengThening.models.StrengTheningModel._instance.tabNum = tabNum;
                };
                /**拍卖 */
                StrengTheningComefromViewMediator.prototype.goSale = function (itemid) {
                    var tabNum = game.modules.strengThening.models.StrengTheningModel._instance.tabNum;
                    modules.ModuleManager.show(modules.ModuleNames.SALE, this._app);
                    modules.ModuleManager.hide(modules.ModuleNames.STRENG_THENING);
                    modules.sale.models.SaleModel.getInstance().saleTargetId = itemid;
                    game.modules.sale.models.SaleProxy._instance.event(game.modules.sale.models.SearchItemResult);
                    this.hide();
                    LoginModel.getInstance().CommonPage = modules.ModuleNames.STRENG_THENING;
                    game.modules.strengThening.models.StrengTheningModel._instance.tabNum = tabNum;
                };
                /**生活技能 */
                StrengTheningComefromViewMediator.prototype.goLifeSkill = function () {
                    var tabNum = game.modules.strengThening.models.StrengTheningModel._instance.tabNum;
                    modules.skill.models.SkillModel.getInstance().currenTabNum = 2; //切换到生活技能界面
                    modules.ModuleManager.show(modules.ModuleNames.SKILL, this._app);
                    modules.ModuleManager.hide(modules.ModuleNames.STRENG_THENING);
                    this.hide();
                    LoginModel.getInstance().CommonPage = modules.ModuleNames.STRENG_THENING;
                    game.modules.strengThening.models.StrengTheningModel._instance.tabNum = tabNum;
                };
                /**商城 */
                StrengTheningComefromViewMediator.prototype.goShop = function (itemid) {
                    var tabNum = game.modules.strengThening.models.StrengTheningModel._instance.tabNum;
                    game.modules.shop.models.ShopModel._instance.scItemId = itemid;
                    modules.ModuleManager.hide(modules.ModuleNames.STRENG_THENING);
                    modules.ModuleManager.jumpPage(modules.ModuleNames.SHOP, shopMediatorType.SHANGCHANG, this._app);
                    this.hide();
                    LoginModel.getInstance().CommonPage = modules.ModuleNames.STRENG_THENING;
                    game.modules.strengThening.models.StrengTheningModel._instance.tabNum = tabNum;
                };
                /**冰封王座 */
                StrengTheningComefromViewMediator.prototype.goBingfengwangzuo = function () {
                    this.hide();
                };
                /**积分兑换 */
                StrengTheningComefromViewMediator.prototype.goJifenDuihuan = function () {
                    var tabNum = game.modules.strengThening.models.StrengTheningModel._instance.tabNum;
                    var RoleJiFenDuiHuanMediator = new game.modules.roleinfo.RoleJiFenDuiHuanMediator(this._app);
                    RoleJiFenDuiHuanMediator.show();
                    modules.ModuleManager.hide(modules.ModuleNames.STRENG_THENING);
                    this.hide();
                    LoginModel.getInstance().CommonPage = modules.ModuleNames.STRENG_THENING;
                    game.modules.strengThening.models.StrengTheningModel._instance.tabNum = tabNum;
                };
                StrengTheningComefromViewMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                };
                StrengTheningComefromViewMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                StrengTheningComefromViewMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return StrengTheningComefromViewMediator;
            }(game.modules.UiMediator));
            strengThening.StrengTheningComefromViewMediator = StrengTheningComefromViewMediator;
        })(strengThening = modules.strengThening || (modules.strengThening = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=StrengTheningComefromViewMediator.js.map