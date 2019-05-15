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
var ShopModel = game.modules.shop.models.ShopModel;
var ShopProxy = game.modules.shop.models.ShopProxy;
var game;
(function (game) {
    var modules;
    (function (modules) {
        var shop;
        (function (shop) {
            /** 商城主界面 */
            var ShopModule = /** @class */ (function (_super) {
                __extends(ShopModule, _super);
                function ShopModule(app) {
                    var _this = _super.call(this) || this;
                    _this.uiLayer = app.uiRoot.general;
                    _this._viewUI = new ui.common.ShopUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this._viewUI.cutView_tab.selectHandler = new Handler(_this, _this.cutView);
                    _this._shangHuiMediator = new shop.ShangHuiMediator(_this._viewUI, _this._app);
                    _this._shangChengMediator = new shop.ShangChengMediator(_this._viewUI, _this._app);
                    _this._chongZhiMediator = new shop.ChongZhiMediator(_this._viewUI);
                    _this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, _this, function () {
                        _this.clickCloseBtn();
                    });
                    return _this;
                }
                ShopModule.prototype.init = function (index) {
                    RequesterProtocols._instance.c2s_CRequestVipInfo();
                    //点击物品跳转商会菜单列表检擦
                    if (index == 0 && ShopModel.getInstance().itemId != undefined && ShopModel.getInstance().itemId != 0) {
                        for (var secondId in ShopModel.getInstance().CommerceSecondMenuBinDic) {
                            var _goodsids = ShopModel.getInstance().CommerceSecondMenuBinDic[secondId].goodsids;
                            for (var i = 0; i < _goodsids.length; i++) {
                                if (ShopModel.getInstance().itemId == ShopModel.getInstance().GoodsBinDic[_goodsids[i]].itemId) {
                                    this.selectNum = i;
                                    for (var firstId in ShopModel.getInstance().CommerceFirstMenuBinDic) {
                                        var _secondmenu = ShopModel.getInstance().CommerceFirstMenuBinDic[firstId].secondmenu;
                                        for (var j = 0; j < _secondmenu.length; j++) {
                                            if (_secondmenu[j] == secondId) {
                                                this.firstType = parseInt(firstId);
                                                this.secondType = j;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    //点击物品跳转商城页面类型检擦
                    if (index == 1 && ShopModel.getInstance().scItemId != undefined && ShopModel.getInstance().scItemId != 0) {
                        for (var scId in ShopModel.getInstance().MallShopBinDic) {
                            var scItemId = ShopModel.getInstance().GoodsBinDic[scId].itemId;
                            if (ShopModel.getInstance().scItemId == scItemId) {
                                this.scViewType = ShopModel.getInstance().MallShopBinDic[scId].type;
                                break;
                            }
                        }
                    }
                    this.show();
                    this.cutView(index);
                };
                /** 页面加载 */
                ShopModule.prototype.cutView = function (index) {
                    var _this = this;
                    this._viewUI.cutView_tab.selectedIndex = index;
                    switch (index) {
                        case 0: //商会
                            RequesterProtocols._instance.c2s_requst_shopprice(shopType.SHANGHUI_SHOP);
                            game.modules.pet.models.PetProxy.getInstance().once(game.modules.pet.models.SHOPPRICE_EVENT, this, function () {
                                ShopModel.getInstance().scItemId = 0;
                                if (ShopModel.getInstance().itemId != undefined && ShopModel.getInstance().itemId != 0) {
                                    _this._shangHuiMediator.selectIndex = _this.selectNum;
                                    _this._shangHuiMediator.init(_this.firstType, _this.secondType, ShopModel.getInstance().itemId);
                                    _this._shangHuiMediator.btnHandler(_this.selectNum);
                                }
                                else {
                                    _this._shangHuiMediator.selectIndex = -1;
                                    _this._shangHuiMediator.init(firstMenuType.BAOSHI, 0, 0);
                                }
                                _this._shangChengMediator.hide();
                                _this._chongZhiMediator.hide();
                            });
                            break;
                        case 1: //商城
                            this.clear_SH_Select(1);
                            ShopModel.getInstance().itemId = 0;
                            var _mallShopAtType = ShopModel.getInstance().MallShopAtType;
                            this._shangChengMediator.viewArr1 = this.setData(_mallShopAtType.get(1));
                            this._shangChengMediator.viewArr2 = this.setData(_mallShopAtType.get(2));
                            this._shangChengMediator.viewArr3 = this.setData(_mallShopAtType.get(3));
                            if (ShopModel.getInstance().scItemId != undefined && ShopModel.getInstance().scItemId != 0) {
                                var arr;
                                if (this.scViewType == 1) {
                                    arr = this._shangChengMediator.viewArr1;
                                }
                                else if (this.scViewType == 2) {
                                    arr = this._shangChengMediator.viewArr2;
                                }
                                else if (this.scViewType == 3) {
                                    arr = this._shangChengMediator.viewArr3;
                                }
                                var _goodsBinDic = ShopModel.getInstance().GoodsBinDic;
                                for (var i = 0; i < arr.length; i++) {
                                    var _goodsVo = _goodsBinDic[arr[i].id];
                                    if (_goodsVo.itemId == ShopModel.getInstance().scItemId) {
                                        this._shangChengMediator.init(this.scViewType);
                                        this._shangChengMediator.btnHandler(i, arr);
                                        break;
                                    }
                                }
                            }
                            else {
                                this._shangChengMediator.selectIndex = -1;
                                this._shangChengMediator.init(1);
                            }
                            this._shangHuiMediator.hide();
                            this._chongZhiMediator.hide();
                            break;
                        case 2: //充值
                            this.clear_SH_Select(2);
                            RequesterProtocols._instance.c2s_CReqCharge();
                            game.modules.shop.models.ShopProxy.getInstance().once(game.modules.shop.models.REGCHARGE_EVENT, this, function () {
                                ShopModel.getInstance().itemId = 0;
                                ShopModel.getInstance().scItemId = 0;
                                _this._shangHuiMediator.hide();
                                _this._shangChengMediator.hide();
                                _this._chongZhiMediator.show();
                            });
                            break;
                    }
                };
                /** 商城所有物品筛选 */
                ShopModule.prototype.setData = function (arr) {
                    for (var i = 0; i < arr.length - 1; i++) {
                        for (var j = 0; j < arr.length - 1 - i; j++) {
                            if (arr[j].order > arr[j + 1].order) {
                                var vo = arr[j];
                                arr[j] = arr[j + 1];
                                arr[j + 1] = vo;
                            }
                        }
                    }
                    for (var i = arr.length - 1; i >= 0; i--) {
                        if (arr[i].viplevel > game.modules.reward.models.RewardModel.getInstance().vipInfo) {
                            arr.splice(i, 1);
                        }
                    }
                    return arr;
                };
                /** 清除商会选中编号 */
                ShopModule.prototype.clear_SH_Select = function (num) {
                    if (num != 1) {
                        this._shangHuiMediator.selectIndex = -1;
                        this._shangHuiMediator.firstId = firstMenuType.BAOSHI;
                        this._shangHuiMediator.selectNum = 0;
                    }
                };
                ShopModule.prototype.onShow = function (event) {
                    this._app.uiRoot.closeLoadProgress();
                    this.init(0);
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.OPEN_EVENT);
                };
                ShopModule.prototype.clickCloseBtn = function () {
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.CLOSEVIEW_EVENT);
                    this.hide();
                };
                ShopModule.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    this.clear_SH_Select(0);
                    ShopModel.getInstance().itemId = 0;
                    ShopModel.getInstance().scItemId = 0;
                    if (LoginModel.getInstance().transferInterface != "") {
                        if (LoginModel.getInstance().transferInterface == modules.ModuleNames.STRENG_THENING)
                            StrengTheningModel.getInstance().tabNum = 1;
                        modules.ModuleManager.show(LoginModel.getInstance().transferInterface, this._app);
                        LoginModel.getInstance().transferInterface = "";
                    }
                    else if (LoginModel.getInstance().CommonPage != "") {
                        modules.ModuleManager.show(LoginModel.getInstance().CommonPage, this._app);
                        LoginModel.getInstance().CommonPage = "";
                    }
                };
                ShopModule.prototype.getView = function () {
                    return this._viewUI;
                };
                ShopModule.prototype.onJump = function (event) {
                    this.jumpPage(event);
                };
                ShopModule.prototype.jumpPage = function (index) {
                    this.init(index);
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.OPEN_EVENT);
                };
                return ShopModule;
            }(game.modules.ModuleMediator));
            shop.ShopModule = ShopModule;
        })(shop = modules.shop || (modules.shop = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ShopModule.js.map