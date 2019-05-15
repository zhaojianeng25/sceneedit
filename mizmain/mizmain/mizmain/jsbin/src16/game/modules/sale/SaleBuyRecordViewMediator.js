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
* 交易记录界面
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var sale;
        (function (sale) {
            var SaleBuyRecordViewMediator = /** @class */ (function (_super) {
                __extends(SaleBuyRecordViewMediator, _super);
                function SaleBuyRecordViewMediator(uiLayer) {
                    var _this = _super.call(this, uiLayer) || this;
                    /**复合表 */
                    _this.itemAttrData = BagModel.getInstance().itemAttrData;
                    /**装备附加属性库by skill */
                    _this.equipAddattributelibDataBySkill = StrengTheningModel.getInstance().equipAddattributelibDataBySkill;
                    /**装备附加属性库 */
                    _this.equipAddattributelibData = StrengTheningModel.getInstance().equipAddattributelibData;
                    /**属性效果id表 */
                    _this.attributeDesConfigData = StrengTheningModel.getInstance().attributeDesConfigData;
                    /**食品表 */
                    _this.foodAndDrugEffectData = SaleModel._instance.foodAndDrugEffectData;
                    /**食品公示表 */
                    _this.foodAndDrugFormulaData = SaleModel._instance.foodAndDrugFormulaData;
                    _this._viewUI = new ui.common.ShopTransactionRecordUI();
                    _this.isCenter = false;
                    _this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, _this, _this.hide);
                    sale.models.SaleProxy._instance.on(sale.models.SMarketTradeLog, _this, _this.showRecord);
                    return _this;
                }
                /**显示购买记录 */
                SaleBuyRecordViewMediator.prototype.showRecord = function () {
                    var buyRecord = SaleModel._instance.buyRecordArr;
                    var saleRecord = SaleModel._instance.saleRecordArr;
                    var saleRecordList = this._viewUI.sellRecord_list;
                    var buyRecordList = this._viewUI.buyRecord_list;
                    if (buyRecord.length > 0) { //是否有购买记录
                        this._viewUI.buyRecordNull_img.visible = false;
                        var recordArr = this.showList(buyRecord);
                        SaleModel._instance.showList(buyRecordList, recordArr);
                    }
                    else {
                        buyRecordList.visible = false;
                        this._viewUI.buyRecordNull_img.visible = true;
                    }
                    if (saleRecord.length > 0) { //是否有出售记录
                        this._viewUI.sellRecordNull_img.visible = false;
                        var recordArr = this.showList(saleRecord);
                        SaleModel._instance.showList(saleRecordList, recordArr);
                    }
                    else {
                        saleRecordList.visible = false;
                        this._viewUI.sellRecordNull_img.visible = true;
                    }
                };
                /**显示记录 */
                SaleBuyRecordViewMediator.prototype.showList = function (arr) {
                    var recordArr = [];
                    for (var i = 0; i < arr.length; i++) {
                        var log = arr[i];
                        var itemid = log.itemid;
                        var level = log.level;
                        var num = log.num;
                        var price = log.price;
                        var name = this.itemAttrData[itemid].name;
                        var iconid = this.itemAttrData[itemid].icon;
                        var itemIcon = SaleModel._instance.getIcon(iconid);
                        var nquality = this.itemAttrData[itemid].nquality;
                        var frame = StrengTheningModel._instance.frameSkinArr[nquality - 1];
                        recordArr.push({ frame_img: frame, icon_img: itemIcon, name_label: name, price_label: price });
                    }
                    return recordArr;
                };
                SaleBuyRecordViewMediator.prototype.show = function () {
                    RequesterProtocols._instance.c2s_market_tradelog();
                    _super.prototype.show.call(this);
                };
                SaleBuyRecordViewMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                SaleBuyRecordViewMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return SaleBuyRecordViewMediator;
            }(game.modules.UiMediator));
            sale.SaleBuyRecordViewMediator = SaleBuyRecordViewMediator;
        })(sale = modules.sale || (modules.sale = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=SaleBuyRecordViewMediator.js.map