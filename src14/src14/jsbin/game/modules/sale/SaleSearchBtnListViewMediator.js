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
* list弹窗
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var sale;
        (function (sale) {
            var SaleSearchBtnListViewMediator = /** @class */ (function (_super) {
                __extends(SaleSearchBtnListViewMediator, _super);
                function SaleSearchBtnListViewMediator(uiLayer) {
                    var _this = _super.call(this, uiLayer) || this;
                    _this.itemAttrData = BagModel.getInstance().itemAttrData; //复合表
                    /**装备附加属性库by skill */
                    _this.equipAddattributelibDataBySkill = StrengTheningModel.getInstance().equipAddattributelibDataBySkill;
                    /**装备附加属性库 */
                    _this.equipAddattributelibData = StrengTheningModel.getInstance().equipAddattributelibData;
                    /**属性效果id表 */
                    _this.attributeDesConfigData = StrengTheningModel.getInstance().attributeDesConfigData;
                    _this._viewUI = new ui.common.SaleSearchBtnListUI();
                    _this.isCenter = false;
                    _this._viewUI.bg_img.on(LEvent.MOUSE_DOWN, _this, _this.hide);
                    return _this;
                }
                /**显示查询列表 */
                SaleSearchBtnListViewMediator.prototype.showSearchList = function (posX, posY, listArr, num) {
                    var listbox = this._viewUI.list_box;
                    listbox.pos(posX, posY);
                    var btnlist = this._viewUI.btn_list;
                    SaleModel._instance.showList(btnlist, listArr);
                    btnlist.renderHandler = new Handler(this, this.btnlistRender, [listArr, num]);
                };
                /**列表渲染 */
                SaleSearchBtnListViewMediator.prototype.btnlistRender = function (listArr, num, cell, index) {
                    var onebtn = cell.getChildByName("onebtn");
                    onebtn.label = listArr[index].name;
                    onebtn.on(LEvent.MOUSE_UP, this, this.onOneBtn, [listArr, cell, index, num]);
                };
                /**点击列表按钮 */
                SaleSearchBtnListViewMediator.prototype.onOneBtn = function (listArr, cell, index, num) {
                    var onebtn = cell.getChildByName("onebtn");
                    this.hide();
                    switch (num) {
                        case 1:
                            sale.models.SaleProxy._instance.event(sale.models.onSaleListTipsbtn, index); //装备部件
                            break;
                        case 2:
                            sale.models.SaleProxy._instance.event(sale.models.onSaleListEqulevelbtn, index); //搜索装备等级
                            break;
                        case 3:
                            sale.models.SaleProxy._instance.event(sale.models.onSaleListEquBastAttrbtn1, index); //搜索装备基础属性1
                            break;
                        case 4:
                            sale.models.SaleProxy._instance.event(sale.models.onSaleListEquBastAttrbtn2, index); //搜索装备基础属性2
                            break;
                        case 5:
                            sale.models.SaleProxy._instance.event(sale.models.onSaleListEquBastAttrbtn3, index); //搜索装备基础属性3
                            break;
                        case 6:
                            sale.models.SaleProxy._instance.event(sale.models.onSaleListEquTeXiao, index); //搜索装备特效
                            break;
                        case 7:
                            sale.models.SaleProxy._instance.event(sale.models.onSaleListEquTeJi, index); //搜索装备特技
                            break;
                        case 8:
                            sale.models.SaleProxy._instance.event(sale.models.onSaleListEquAddAttr, index); //搜索装备附加属性
                            break;
                        case 9:
                            sale.models.SaleProxy._instance.event(sale.models.onSalePetZizhi1, index); //宠物资质1
                            break;
                        case 10:
                            sale.models.SaleProxy._instance.event(sale.models.onSalePetZizhi2, index); //宠物资质2
                            break;
                        case 11:
                            sale.models.SaleProxy._instance.event(sale.models.onSalePetZizhi3, index); //宠物资质3
                            break;
                        case 12:
                            sale.models.SaleProxy._instance.event(sale.models.onSalePetBaseAttr1, index); //宠物基础属性1
                            break;
                        case 13:
                            sale.models.SaleProxy._instance.event(sale.models.onSalePetBaseAttr2, index); //宠物基础属性2
                            break;
                        case 14:
                            sale.models.SaleProxy._instance.event(sale.models.onSalePetBaseAttr3, index); //宠物基础属性3
                            break;
                    }
                };
                SaleSearchBtnListViewMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                };
                SaleSearchBtnListViewMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                SaleSearchBtnListViewMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return SaleSearchBtnListViewMediator;
            }(game.modules.UiMediator));
            sale.SaleSearchBtnListViewMediator = SaleSearchBtnListViewMediator;
        })(sale = modules.sale || (modules.sale = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=SaleSearchBtnListViewMediator.js.map