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
* 公示
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var sale;
        (function (sale) {
            var SaleGongshiViewMediator = /** @class */ (function (_super) {
                __extends(SaleGongshiViewMediator, _super);
                function SaleGongshiViewMediator(uiLayer, app) {
                    var _this = _super.call(this, uiLayer) || this;
                    /**程序内字符串表 */
                    _this.cstringResConfigData = game.modules.tips.models.TipsModel._instance.cstringResConfigData;
                    /**
                     * 重新排序之后的一级摆摊列表
                     */
                    _this.m_cMarketFirstTableData = SaleModel._instance.m_cMarketFirstTableData;
                    /**
                     * 没有排序的一级摆摊配置表
                     */
                    _this.cMarketFirstTableData = SaleModel._instance.cMarketFirstTableData;
                    /**
                     * 二级摆摊配置表
                     */
                    _this.cMarketSecondTableData = SaleModel._instance.cMarketSecondTableData;
                    /**
                     * 三级摆摊配置表
                     */
                    _this.cMarketThreeTableData = SaleModel._instance.cMarketThreeTableData;
                    /**
                   * 三级摆摊配置表 通过物品 id 取值
                   */
                    _this.cMarketThreeTableDataForItemid = SaleModel._instance.cMarketThreeTableDataForItemid;
                    /**复合表 */
                    _this.itemAttrData = BagModel.getInstance().itemAttrData;
                    /**宠物信息表 */
                    _this.petCPetAttrData = game.modules.pet.models.PetModel._instance.petCPetAttrData;
                    /**npc造型表 */
                    _this.cnpcShapeData = game.modules.createrole.models.LoginModel.getInstance().cnpcShapeInfo;
                    /**物品数据 */
                    _this.goodArr = [];
                    /**区间list的数据 */
                    _this.qujianArr2 = [];
                    /**三级列表点击背景特效 */
                    _this.threeListSelectBgBtn = null;
                    /**保存当前点击列表的按钮 */
                    _this.isOnLeftbtn = null;
                    /**一级菜单选中index */
                    _this._oneindex = -1;
                    /** 品质选择index下标 */
                    _this._qualityIndex = 0;
                    /** map中存储是每个类型的默认显示名，key是装备表的类型+等级，value是装备 */
                    _this.resultMap = new Laya.Dictionary();
                    _this._viewUI = new ui.common.SalePaiMaiUI();
                    _this.isCenter = false;
                    _this._app = app;
                    _this._ChangeMoneyViewMediator = new modules.commonUI.ChangeMoneyViewMediator(app.uiRoot.topUnder, app);
                    _this._viewUI.qujian_box.visible = false;
                    _this._viewUI.btnBuy.visible = false;
                    _this.initFirstlist();
                    sale.models.SaleProxy._instance.on(sale.models.SMarketBrowse, _this, _this.showThreeList);
                    sale.models.SaleProxy._instance.on(sale.models.SGongShiAttentionGoods, _this, _this.flushAttent);
                    _this._viewUI.level_btn.on(LEvent.MOUSE_DOWN, _this, _this.onlevelBtn);
                    _this._viewUI.btnGuanZ.on(LEvent.MOUSE_DOWN, _this, _this.Attention);
                    _this._viewUI.btnSouS.on(LEvent.MOUSE_DOWN, _this, _this.onbtnSouS);
                    _this._viewUI.addMoney_btn.on(LEvent.MOUSE_DOWN, _this, _this.exchangeGold);
                    _this._viewUI.closeQujianBox_img.on(LEvent.MOUSE_DOWN, _this, _this.oncloseQujianBox);
                    _this._viewUI.closepriceBox_img.on(LEvent.MOUSE_DOWN, _this, function () { _this._viewUI.price_box.visible = false; });
                    _this._viewUI.price_btn.on(LEvent.MOUSE_DOWN, _this, function () { _this._viewUI.price_box.visible = true; });
                    game.modules.bag.models.BagProxy.getInstance().on(game.modules.bag.models.REFRESH_CURRENCY_EVENT, _this, _this.showSilverNumber);
                    sale.models.SaleProxy._instance.on(sale.models.attentionSearch, _this, _this.onSearch);
                    sale.models.SaleProxy._instance.on(sale.models.attentionGemEguipPetSeekSearch, _this, _this.showThreeList);
                    sale.models.SaleProxy._instance.on(sale.models.SMarketContainerBrowse, _this, _this.showThreeList[2]);
                    _this.showSilverNumber();
                    _this.RegisterMonitor();
                    return _this;
                }
                /**注册单选框监听事件 */
                SaleGongshiViewMediator.prototype.RegisterMonitor = function () {
                    //品质选择单选框点击
                    this._viewUI.first_box.clickHandler = new Laya.Handler(this, this.isCheckBox, [ScreenIndex.checkone]);
                    this._viewUI.second_box.clickHandler = new Laya.Handler(this, this.isCheckBox, [ScreenIndex.checktwo]);
                    this._viewUI.third_box.clickHandler = new Laya.Handler(this, this.isCheckBox, [ScreenIndex.checkthree]);
                };
                /**
                 * 判断单选框是否选中
                 * @param index 点击的index是第几个选中
                 */
                SaleGongshiViewMediator.prototype.isCheckBox = function (index) {
                    var firstCheck = this._viewUI.first_box.selected;
                    var secondCheck = this._viewUI.second_box.selected;
                    var thirdCheck = this._viewUI.third_box.selected;
                    switch (index) {
                        case ScreenIndex.checkone:
                            if (secondCheck)
                                this._viewUI.second_box.selected = true;
                            else if (thirdCheck)
                                this._viewUI.third_box.selected = true;
                            else
                                this._viewUI.first_box.selected = true;
                            break;
                        case ScreenIndex.checktwo:
                            if (firstCheck)
                                this._viewUI.first_box.selected = true;
                            else if (thirdCheck)
                                this._viewUI.third_box.selected = true;
                            else
                                this._viewUI.second_box.selected = true;
                            break;
                        case ScreenIndex.checkthree:
                            if (firstCheck)
                                this._viewUI.first_box.selected = true;
                            else if (secondCheck)
                                this._viewUI.second_box.selected = true;
                            else
                                this._viewUI.third_box.selected = true;
                            break;
                    }
                };
                /**关闭筛选界面监听*/
                SaleGongshiViewMediator.prototype.oncloseQujianBox = function () {
                    this._viewUI.qujian_box.visible = false;
                    this._viewUI.qujian_list.selectedIndex = this._qualityIndex;
                    this.showqujianBox(false);
                };
                /**
                 * 搜索处理
                 */
                SaleGongshiViewMediator.prototype.onSearch = function (searchResult) {
                    this._viewUI.second_list.visible = false;
                    this._viewUI.three_list.visible = true;
                    var id = searchResult.get("id");
                    var firstno = searchResult.get("firstno");
                    var twono = searchResult.get("twono");
                    var name = searchResult.get("name");
                    var itemid = searchResult.get("itemid");
                    var itemtype = searchResult.get("itemtype");
                    var valuerange = searchResult.get("valuerange");
                    var logictype = searchResult.get("logictype");
                    var limitmin = 0;
                    var limitmax = 0;
                    if (logictype == m_logictype.zero) {
                        this.CMarketBrowse(firstno, twono, [0], itemtype, limitmin, limitmax, 1, 1, 1);
                    }
                    else {
                        this.CMarketBrowse(firstno, twono, [id], itemtype, limitmin, limitmax, 1, 1, 1);
                    }
                };
                /**兑换金币 */
                SaleGongshiViewMediator.prototype.exchangeGold = function () {
                    var isShowGold = true;
                    var yuanBao = bagModel.getInstance().yuanbaoIcon;
                    this._ChangeMoneyViewMediator.onShowInModule(modules.ModuleNames.SALE, isShowGold, yuanBao);
                };
                /**去充值 */
                SaleGongshiViewMediator.prototype.goRecharge = function () {
                    modules.ModuleManager.jumpPage(modules.ModuleNames.SHOP, shopMediatorType.CHONGZHI, this._app);
                    modules.ModuleManager.hide(modules.ModuleNames.SALE);
                };
                /**
                 * 一级列表
                 */
                SaleGongshiViewMediator.prototype.initFirstlist = function () {
                    this._viewUI.first_list.selectedIndex = 0;
                    this._viewUI.second_list.visible = false;
                    this._viewUI.itemType_box.visible = false;
                    this._viewUI.price_btn.visible = false;
                    this._viewUI.three_list.visible = false;
                    var firstList = this._viewUI.first_list;
                    var firstListArr = [];
                    for (var i = 0; i < this.m_cMarketFirstTableData.length; i++) {
                        var isfloating = this.m_cMarketFirstTableData[i].cMarketFirstTableData.isfloating;
                        if (isfloating != 1) {
                            var name = this.m_cMarketFirstTableData[i].cMarketFirstTableData.name;
                            var secondmenus = this.m_cMarketFirstTableData[i].cMarketFirstTableData.secondmenus;
                            firstListArr.push({ typeName_label: name, secondmenus: secondmenus });
                        }
                    }
                    firstListArr.unshift(this.cstringResConfigData[11194].msg);
                    SaleModel._instance.showList(firstList, firstListArr);
                    firstList.selectHandler = new Handler(this, this.firstlistSelect, [firstListArr]);
                    firstList.renderHandler = new Handler(this, this.firstListRender);
                    this.firstlistSelect(firstListArr, 0);
                };
                /**点击等级按钮 */
                SaleGongshiViewMediator.prototype.onlevelBtn = function () {
                    if (this._viewUI.qujian_box.visible) {
                        this._viewUI.qujian_box.visible = false;
                    }
                    else {
                        this._viewUI.qujian_box.visible = true;
                    }
                };
                /**一级摆摊列表 */
                SaleGongshiViewMediator.prototype.firstlistSelect = function (firstListArr, index) {
                    if (this._viewUI.first_list.selectedIndex != -1) {
                        var nameLabel = this._viewUI.first_list.getCell(index).getChildByName("typeName_label");
                        this._viewUI.name_label.text = nameLabel.text;
                        if (index - 1 < 0) { //点击关注，
                            this.guanzhu();
                        }
                        else {
                            var secondmenu = firstListArr[index].secondmenus;
                            var secondListArr = [];
                            for (var i = 0; i < secondmenu.length; i++) {
                                var secondName = this.cMarketSecondTableData[secondmenu[i]].name;
                                var secondIconid = this.cMarketSecondTableData[secondmenu[i]].iconid;
                                var secondIcon = SaleModel.getInstance().getIcon(secondIconid);
                                var thirdmenus = this.cMarketSecondTableData[secondmenu[i]].thirdmenus;
                                secondListArr.push({ articlesLevel_label: secondName, icon_img: secondIcon, thirdmenus: thirdmenus });
                            }
                            SaleModel._instance.showList(this._viewUI.second_list, secondListArr);
                            this._viewUI.second_list.selectHandler = new Handler(this, this.secondListSelect, [secondListArr]);
                            this._viewUI.second_list.visible = true;
                            this._oneindex = index; //当前选中的一级栏目是什么
                            this._viewUI.first_list.selectedIndex = -1;
                            this._viewUI.three_list.visible = false;
                            this.InitItemNumerical();
                            this._viewUI.itemType_box.visible = true;
                        }
                    }
                };
                /**初始化一些选中的数据 */
                SaleGongshiViewMediator.prototype.InitItemNumerical = function () {
                    if (this._viewUI.three_list.selectedIndex != -1) {
                        var index = this._viewUI.three_list.selectedIndex;
                        var bg_btn = this._viewUI.three_list.getCell(index).getChildByName("bg_btn");
                        bg_btn.selected = false;
                    }
                    this._viewUI.three_list.selectedIndex = -1;
                    this._viewUI.btnGuanZ.label = this.cstringResConfigData[11194].msg; // 关注
                    this.initqualityUI();
                };
                /**一级列表中点击关注按钮 */
                SaleGongshiViewMediator.prototype.guanzhu = function () {
                    this._viewUI.second_list.visible = false;
                    this._viewUI.level_btn.visible = false;
                    this._viewUI.qujian_box.visible = false;
                    this._viewUI.itemType_box.visible = false;
                    this._viewUI.price_btn.visible = false;
                    this.CMarketAttentionBrowse();
                };
                /**一级列表渲染 */
                SaleGongshiViewMediator.prototype.firstListRender = function (cell, index) {
                    var btnLeft = cell.getChildByName("btnLeft");
                    btnLeft.on(LEvent.MOUSE_UP, this, this.onBtnLeft, [index, cell]);
                };
                /**列表点击效果 */
                SaleGongshiViewMediator.prototype.onBtnLeft = function (index, cell) {
                    var nowBtnleft = cell.getChildByName("btnLeft");
                    nowBtnleft.selected = true;
                    if (this.isOnLeftbtn == null) {
                        this.isOnLeftbtn = cell;
                        return;
                    }
                    if (this.isOnLeftbtn != cell) {
                        var btnLeft = this.isOnLeftbtn.getChildByName("btnLeft");
                        btnLeft.selected = false;
                        this.isOnLeftbtn = cell;
                    }
                };
                /**点击二级列表 */
                SaleGongshiViewMediator.prototype.secondListSelect = function (secondListArr, index) {
                    if (this._viewUI.second_list.selectedIndex != -1) {
                        this._viewUI.second_list.visible = false;
                        this._viewUI.three_list.visible = true;
                        this._viewUI.itemType_box.visible = false;
                        this._viewUI.second_list.selectedIndex = -1;
                        var thirdmenus = secondListArr[index].thirdmenus; //二级菜单中三级菜单id
                        var thirdnum = thirdmenus[0]; //默认第一个
                        var firstno = this.cMarketThreeTableData[thirdnum].firstno; //1级菜单id
                        var twono = this.cMarketThreeTableData[thirdnum].twono; //2级菜单id
                        var itemtype = this.cMarketThreeTableData[thirdnum].itemtype; //物品类型
                        var logictype = this.cMarketThreeTableData[thirdnum].logictype; //逻辑类型
                        var isfloating = this.cMarketFirstTableData[firstno].isfloating; //浮动开关，控制价格按钮的显示和隐藏,1：不显示  0：显示
                        this._logictype = logictype; // 逻辑类型
                        switch (logictype) {
                            case m_logictype.zero:
                                this.logicZero(firstno, twono, thirdnum, itemtype);
                                break;
                            case m_logictype.one:
                            case m_logictype.two:
                                this._viewUI.level_btn.visible = true;
                                this.resultMap = this.logicTwoRank(thirdmenus, firstno, twono, itemtype);
                                break;
                            case m_logictype.three:
                            case m_logictype.four:
                                this._viewUI.level_btn.visible = true;
                                this.resultMap = this.logicThree(thirdmenus, firstno, twono, itemtype);
                                break;
                        }
                        this.isfloating(isfloating);
                        this.registerBtnEvent(firstno, twono, [thirdnum], itemtype);
                        this.showqujianBox(true);
                    }
                };
                /**
                * 价格排序是否显示
                * @param isfloating 是否显示价格
                */
                SaleGongshiViewMediator.prototype.isfloating = function (isfloating) {
                    if (isfloating == 0)
                        this._viewUI.price_btn.visible = true;
                    else
                        this._viewUI.price_btn.visible = false;
                };
                /**没有区间 */
                SaleGongshiViewMediator.prototype.logicZero = function (firstno, twono, threeno, itemtype) {
                    this._viewUI.level_btn.visible = false;
                    this._viewUI.qujian_box.visible = false;
                    var screenVo = new game.modules.sale.models.ScreenVo;
                    this.screenDemand(firstno, twono, threeno, itemtype, screenVo.limitmin, screenVo.limitmax, screenVo.currpage, screenVo.priceSort, screenVo.issearch);
                };
                /**
                * logic1,2装备,等级类型的map组装
                * @param thirdmenus
                * @param screenVo
                */
                SaleGongshiViewMediator.prototype.logicTwoRank = function (thirdmenus, firstno, twono, itemtype) {
                    // map中存储是每个类型的默认显示名，key是装备表的类型+等级，value是装备
                    var resultMap = new Laya.Dictionary();
                    // map中存储是每个类型下的装备，key是装备表的类型+等级，value是装备
                    var tempMap = new Laya.Dictionary();
                    // thirdmenus配置的是所有的三级数据id
                    for (var i = 0; i < thirdmenus.length; i++) {
                        var id = thirdmenus[i];
                        var name = this.cMarketThreeTableData[id].name;
                        //获取具体道具id判断品质，品质白装就是要放在分类显示的名字
                        var itemid = this.cMarketThreeTableData[id].itemid;
                        var itemAttrData = this.itemAttrData[itemid];
                        if (!itemAttrData)
                            continue;
                        // 获取品质
                        var arrVo = [];
                        var screenVo = new game.modules.sale.models.ScreenVo;
                        screenVo.firstno = firstno;
                        screenVo.twono = twono;
                        screenVo.itemtype = itemtype;
                        screenVo.id = id;
                        screenVo.name = name;
                        screenVo.subType = itemAttrData.itemtypeid;
                        screenVo.level = itemAttrData.level;
                        // 判断一级菜单选中的 index是什么
                        switch (this._oneindex) {
                            case EquipTypeIndex.GEM:
                                screenVo.typeName = itemAttrData.nquality == NqualityType.VLOLET ? name : "";
                                var k = itemAttrData.itemtypeid + "_" + itemAttrData.level;
                                break;
                            case EquipTypeIndex.PUBLICITYPET:
                                screenVo.typeName = itemAttrData.nquality == NqualityType.GREEN ? name : "";
                                var k = itemAttrData.itemtypeid + "_" + itemAttrData.name + "_" + itemAttrData.level;
                                break;
                            default:
                                screenVo.typeName = name;
                                var k = itemAttrData.itemtypeid + "_" + itemAttrData.name + "_" + itemAttrData.level;
                                break;
                        }
                        // 判断k值 装备类型等级 是否有相同的
                        if (tempMap.indexOf(k) < 0) {
                            tempMap.set(k, [screenVo]);
                        }
                        else {
                            arrVo = tempMap.get(k);
                            // 防止策划没按品质顺序配置导致丢失类型名
                            screenVo.typeName = arrVo[0].typeName;
                            arrVo.push(screenVo);
                        }
                    }
                    // result重整方便上层使用
                    for (var j in tempMap.keys) {
                        var v = tempMap.get(tempMap.keys[j]);
                        resultMap.set(v[0].typeName, v);
                    }
                    // 把三级菜单id取出来
                    var result = resultMap.get(resultMap.keys[0]);
                    var threen = [];
                    for (var index = 0; index < result.length; index++) {
                        threen.push(result[index].id);
                    }
                    this.screenDemand(firstno, twono, threen, itemtype, screenVo.limitmin, screenVo.limitmax, screenVo.currpage, screenVo.priceSort, screenVo.issearch);
                    return resultMap;
                };
                /**logic3物品区间的map组装 */
                SaleGongshiViewMediator.prototype.logicThree = function (thirdmenus, firstno, twono, itemtype) {
                    var resultMap = new Laya.Dictionary();
                    var id = thirdmenus[0]; //三级菜单id
                    var valuerange = this.cMarketThreeTableData[id].valuerange;
                    var limitmin = valuerange[0] + 1;
                    var limitmax = valuerange[1];
                    var screenVo = new game.modules.sale.models.ScreenVo;
                    screenVo.id = id;
                    screenVo.twono = twono;
                    screenVo.firstno = firstno;
                    screenVo.itemtype = itemtype;
                    screenVo.valuerange = valuerange;
                    screenVo.limitmin = limitmin;
                    screenVo.limitmax = limitmax;
                    for (var i = 0; i < screenVo.valuerange.length - 1; i++) {
                        var k = screenVo.valuerange[i] + 1 + "~" + screenVo.valuerange[i + 1];
                        resultMap.set(k, screenVo);
                    }
                    this.screenDemand(firstno, twono, [id], itemtype, limitmin, limitmax, screenVo.currpage, screenVo.priceSort, screenVo.issearch);
                    return resultMap;
                };
                /** 筛选请求  价格上限和下限监听 */
                SaleGongshiViewMediator.prototype.screenDemand = function (firstno, twono, threeno, itemtype, limitmin, limitmax, currpage, priceSort, issearch) {
                    this.CMarketBrowse(firstno, twono, threeno, itemtype, limitmin, limitmax, currpage, priceSort, issearch);
                    this._viewUI.priceUp_btn.on(LEvent.MOUSE_DOWN, this, this.priceUpSort, [firstno, twono, threeno, itemtype, limitmin, limitmax, currpage, issearch]);
                    this._viewUI.priceDown_btn.on(LEvent.MOUSE_DOWN, this, this.priceDownSort, [firstno, twono, threeno, itemtype, limitmin, limitmax, currpage, issearch]);
                };
                /**注册翻页监听事件 */
                SaleGongshiViewMediator.prototype.registerBtnEvent = function (firstno, twono, _a, itemtype) {
                    var thirdnum = _a[0];
                    this._viewUI.btnLess.on(LEvent.MOUSE_DOWN, this, this.onbtnLess, [firstno, twono, [thirdnum], itemtype, 0, 0, 1, 0]);
                    this._viewUI.btnAdd.on(LEvent.MOUSE_DOWN, this, this.onbtnAdd, [firstno, twono, [thirdnum], itemtype, 0, 0, 1, 0]);
                };
                /**价格排序升序 */
                SaleGongshiViewMediator.prototype.priceUpSort = function (firstno, twono, threeno, itemtype, limitmin, limitmax, currpage, issearch) {
                    this.CMarketBrowse(firstno, twono, threeno, itemtype, limitmin, limitmax, currpage, 1, issearch);
                    this._viewUI.price_box.visible = false;
                    this._viewUI.peice_img.skin = "common/ui/tongyong/up.png";
                };
                /**价格排序降序 */
                SaleGongshiViewMediator.prototype.priceDownSort = function (firstno, twono, threeno, itemtype, limitmin, limitmax, currpage, issearch) {
                    this.CMarketBrowse(firstno, twono, threeno, itemtype, limitmin, limitmax, currpage, 2, issearch);
                    this._viewUI.price_box.visible = false;
                    this._viewUI.peice_img.skin = "common/ui/tongyong/dowm.png";
                };
                /**页数向上翻页选择 */
                SaleGongshiViewMediator.prototype.onbtnLess = function (firstno, twono, threeno, itemtype, limitmin, limitmax, priceSort, issearch) {
                    var totalPage = SaleModel._instance.totalPage; //总页数
                    var currpage = SaleModel._instance.currPage; //当前页
                    if (totalPage > 1 && currpage >= totalPage) {
                        this.CMarketBrowse(firstno, twono, threeno, itemtype, limitmin, limitmax, currpage - 1, priceSort, issearch);
                    }
                };
                /**页数向下翻页选择 */
                SaleGongshiViewMediator.prototype.onbtnAdd = function (firstno, twono, threeno, itemtype, limitmin, limitmax, priceSort, issearch) {
                    var totalPage = SaleModel._instance.totalPage; //总页数
                    var currpage = SaleModel._instance.currPage; //当前页
                    if (totalPage > 1 && currpage < totalPage) {
                        this.CMarketBrowse(firstno, twono, threeno, itemtype, limitmin, limitmax, currpage + 1, priceSort, issearch);
                    }
                };
                /**
                 * 三级菜单列表
                 * @param goodslist 返回的物品
                 */
                SaleGongshiViewMediator.prototype.showThreeList = function (num) {
                    this._viewUI.three_list.visible = true;
                    this._viewUI.second_list.visible = false;
                    this._viewUI.itemType_box.visible = false;
                    this.goodArr = [];
                    var goodslist = [];
                    if (num == actiontype.gongshi) {
                        goodslist = SaleModel._instance.bugGoodlist;
                    }
                    else if (num == actiontype.search) {
                        goodslist = SaleModel._instance.SearchResultData.get("goodslist");
                    }
                    else {
                        goodslist = SaleModel._instance.GoodList.get(attentype.gongshi);
                    }
                    if (goodslist != undefined) { //返回的物品
                        for (var i = 0; i < goodslist.length; i++) {
                            var good = goodslist[i];
                            var itemid = good.itemid;
                            var price = good.price;
                            var num = good.num;
                            var level = good.level;
                            var id = good.id;
                            var attentionnumber = good.attentionnumber;
                            var saleRoleid = good.saleRoleid;
                            var name = "";
                            var nquality = 0;
                            var iconid = 0;
                            var key = good.key;
                            if (43000 <= itemid && itemid < 43460) {
                                name = this.petCPetAttrData[itemid].name;
                                var modelid = this.petCPetAttrData[itemid].modelid;
                                iconid = this.cnpcShapeData[modelid].littleheadID; //iconid
                                nquality = this.petCPetAttrData[itemid].quality;
                            }
                            else {
                                name = this.itemAttrData[itemid].name;
                                iconid = this.itemAttrData[itemid].icon;
                                nquality = this.itemAttrData[itemid].nquality;
                            }
                            var itemIcon = SaleModel._instance.getIcon(iconid);
                            var frame = StrengTheningModel._instance.frameSkinArr[nquality - 1]; // 4紫色	5橙色
                            this.goodArr.push({
                                name_label: name, price_label: price, level_label: level, id: id,
                                num_label: num, bs_img: frame, icon_img: itemIcon, itemId: itemid,
                                attentionnumber: attentionnumber, saleRoleid: saleRoleid, nquality: nquality,
                                key: key,
                            });
                        }
                        SaleModel._instance.showList(this._viewUI.three_list, this.goodArr);
                        this._viewUI.three_list.renderHandler = new Handler(this, this.threelistRender);
                        this._viewUI.three_list.selectHandler = new Handler(this, this.threelistSelect);
                        this.publicitypage();
                    }
                    else {
                        this._viewUI.three_list.visible = false;
                    }
                };
                /**公示页数显示 */
                SaleGongshiViewMediator.prototype.publicitypage = function () {
                    if (this.goodArr.length > 0) {
                        var currpage = SaleModel._instance.currPage;
                        var totalpage = SaleModel._instance.totalPage;
                        this._viewUI.selectPage_label.text = currpage + "/" + totalpage;
                    }
                    else {
                        this._viewUI.selectPage_label.text = 0 + "/" + 0;
                    }
                };
                /**三级列表渲染 */
                SaleGongshiViewMediator.prototype.threelistRender = function (cell, index) {
                    if (index < this.goodArr.length) {
                        var levellabel = cell.getChildByName("level_label");
                        var numlabel = cell.getChildByName("num_label");
                        var guanzhu = cell.getChildByName("guanzhu_img");
                        var bg_btn = cell.getChildByName("bg_btn");
                        var zhenpin_img = cell.getChildByName("treasure_img");
                        var icon_img = cell.getChildByName("icon_img");
                        var key = this.goodArr[index].key; //key
                        var itemId = this.goodArr[index].itemId; //物品id
                        var num = this.goodArr[index].num_label; //数量
                        var level = this.goodArr[index].level_label; //等级
                        var saleRoleid = this.goodArr[index].saleRoleid; //拥有人角色id
                        var attentionnumber = this.goodArr[index].attentionnumber; // 0关注 1取消关注
                        var israrity = this.cMarketThreeTableDataForItemid[itemId].israrity; // 是否珍品
                        if (this.itemAttrData[itemId]) {
                            var itemtypeid = this.itemAttrData[itemId]["itemtypeid"]; // 物品描述类型id
                            var itemtypedescibe = StrengTheningModel.getInstance().itemTypeData[itemtypeid].name; //物品描述类型名字
                        }
                        this.chickmonitor(icon_img, bg_btn, index, cell, itemId, saleRoleid, key, itemtypeid);
                        if (attentionnumber > 0) {
                            guanzhu.visible = true;
                        }
                        else {
                            guanzhu.visible = false;
                        }
                        if (num > 1) {
                            numlabel.text = num;
                        }
                        else {
                            numlabel.text = "";
                        }
                        if (israrity > 0) {
                            levellabel.text = "";
                            zhenpin_img.visible = true;
                        }
                        else {
                            levellabel.text = this.cstringResConfigData[1].msg + level;
                            zhenpin_img.visible = false;
                        }
                    }
                };
                /**三级菜单里面的点击事件 */
                SaleGongshiViewMediator.prototype.chickmonitor = function (icon_img, bg_btn, index, cell, itemId, saleRoleid, key, itemtypeid) {
                    if (itemtypeid)
                        icon_img.on(LEvent.MOUSE_UP, this, this.onIconchick, [itemId, saleRoleid, key, itemtypeid]);
                    bg_btn.on(LEvent.MOUSE_UP, this, this.onBgBtn, [index, cell]);
                };
                /**icon点击tips */
                SaleGongshiViewMediator.prototype.onIconchick = function (itemId, saleRoleid, key, itemtypeid) {
                    var itemDetail = [];
                    SaleModel._instance.itemId = itemId;
                    itemDetail.push({ itemId: itemId, saleRoleid: saleRoleid, key: key, itemtypeid: itemtypeid });
                    //装备                                                                                                                                                                宠物装备
                    if (120000 <= itemId && itemId <= 126675 || 140000 <= itemId && itemId <= 140005 || 10000 <= itemId && itemId <= 10009 || 111000 <= itemId && 111053 || 130000 <= itemId && itemId <= 130099) {
                        RequesterProtocols._instance.c2s_COtherItem_Tips(saleRoleid, BagTypes.MARKET, key);
                        sale.models.SaleProxy._instance.on(sale.models.SOtherItemTips, this, this.iconitemtips, [itemDetail]);
                    }
                    else {
                        var parame = new Dictionary();
                        parame.set("itemId", itemDetail[0].itemId);
                        this.tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.commonItem, parame, true);
                    }
                };
                /**icontips显示 */
                SaleGongshiViewMediator.prototype.iconitemtips = function (itemDetail, SOtherItemTipsDsc) {
                    game.modules.sale.models.SaleModel.getInstance().SOtherItemTipsDsc = SOtherItemTipsDsc;
                    var tips = SOtherItemTipsDsc.get("tips");
                    var packid = SOtherItemTipsDsc.get("packid");
                    var key = SOtherItemTipsDsc.get("keyinpack");
                    var parame = new Dictionary();
                    parame.set("itemId", itemDetail[0].itemId);
                    parame.set("equiptype", itemDetail[0].itemtypeid);
                    parame.set("packid", packid); //背包id
                    parame.set("key", key); //key值
                    this.tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.AUCTION, parame, true);
                };
                /**三级列表选择 */
                SaleGongshiViewMediator.prototype.threelistSelect = function (index) {
                    var threelist = this._viewUI.three_list;
                    if (threelist.visible) {
                        var good = this.goodArr[index];
                        var id = good.id;
                        var attentionnumber = good.attentionnumber;
                        if (attentionnumber > 0) { // 取消关注
                            this._viewUI.btnGuanZ.label = this.cstringResConfigData[11454].msg; // 取消关注
                        }
                        else {
                            this._viewUI.btnGuanZ.label = this.cstringResConfigData[11194].msg; // 关注
                        }
                    }
                };
                /**三级菜单点击效果 */
                SaleGongshiViewMediator.prototype.onBgBtn = function (index, cell) {
                    var equip_btn = cell.getChildByName("bg_btn");
                    equip_btn.selected = true;
                    if (this.threeListSelectBgBtn == null) {
                        this.threeListSelectBgBtn = cell;
                        return;
                    }
                    if (this.threeListSelectBgBtn != cell) {
                        var btnLeft = this.threeListSelectBgBtn.getChildByName("bg_btn");
                        btnLeft.selected = false;
                        this.threeListSelectBgBtn = cell;
                    }
                };
                /**
                 * 显示选择区间的box
                 */
                SaleGongshiViewMediator.prototype.showqujianBox = function (isquality, searchName) {
                    var qujianlist = this._viewUI.qujian_list;
                    if (this._logictype == m_logictype.one || this._logictype == m_logictype.two) { //等级  物品id
                        if (searchName != undefined) {
                            this._viewUI.level_btn.label = searchName;
                        }
                        else {
                            this._viewUI.level_btn.label = this.resultMap.keys[0];
                        }
                    }
                    else if (this._logictype == m_logictype.three || this._logictype == m_logictype.four) {
                        var valuerange = this.resultMap.keys[0];
                        this._viewUI.level_btn.label = valuerange;
                    }
                    if (isquality)
                        this.qualityUI();
                    SaleModel._instance.showList(qujianlist, this.resultMap.keys);
                    qujianlist.selectHandler = new Handler(this, this.LogictypeSelect);
                    qujianlist.renderHandler = new Handler(this, this.LogictypeRender);
                };
                /**是否显示品质筛选界面*/
                SaleGongshiViewMediator.prototype.qualityUI = function () {
                    switch (this._oneindex) { // 一级菜单选中的index
                        case EquipTypeIndex.GEM:
                            this.gemqualityquip();
                            break;
                        case EquipTypeIndex.PUBLICITYPET:
                            this.gemqualityPet();
                            break;
                        default:
                            this._viewUI.quality.visible = false;
                            break;
                    }
                };
                /**区间列表渲染 */
                SaleGongshiViewMediator.prototype.LogictypeRender = function (cell, index) {
                    var onebtn = cell.getChildByName("onebtn");
                    onebtn.label = this.resultMap.keys[index];
                };
                /**选择区间 */
                SaleGongshiViewMediator.prototype.LogictypeSelect = function (index) {
                    if (this._viewUI.qujian_list.selectedIndex != -1) {
                        if (this._logictype == m_logictype.one || this._logictype == m_logictype.two) {
                            var name = this.resultMap.keys[index];
                            this._viewUI.level_btn.label = name;
                            var resultMap = this.resultMap.get(name);
                            this._qualityIndex = index;
                            this.qualitySelect(resultMap);
                        }
                        else if (this._logictype == m_logictype.three || this._logictype == m_logictype.four) {
                            var valuerange = this.resultMap.keys[index];
                            this._viewUI.level_btn.label = valuerange;
                            var resultMap = this.resultMap.get(valuerange);
                            this.CMarketBrowse(resultMap.firstno, resultMap.twono, [resultMap.id], resultMap.itemtype, resultMap.limitmin, resultMap.limitmax, resultMap.currpage, resultMap.priceSort, resultMap.issearch);
                        }
                        this._viewUI.qujian_box.visible = false;
                        this._viewUI.qujian_list.selectedIndex = -1;
                    }
                };
                /**品质筛选选择*/
                SaleGongshiViewMediator.prototype.qualitySelect = function (resultMap) {
                    switch (this._oneindex) {
                        case EquipTypeIndex.GEM: //珍品装备品质筛选
                            var violetRadio = this._viewUI.first_box.selected;
                            var orangeRadio = this._viewUI.second_box.selected;
                            if (!violetRadio)
                                this._viewUI.second_box.selected = true;
                            if (!orangeRadio)
                                this._viewUI.first_box.selected = true;
                            if (violetRadio && orangeRadio) {
                                var violetid = resultMap[TraitIndex.zero].id;
                                var orangeid = resultMap[TraitIndex.one].id;
                                var threeno = [violetid, orangeid];
                                this.qualityCMarketBrowse(resultMap, threeno);
                            }
                            else if (violetRadio) {
                                var violetid = resultMap[TraitIndex.zero].id;
                                this.qualityCMarketBrowse(resultMap, [violetid]);
                            }
                            else if (orangeRadio) {
                                var orangeid = resultMap[TraitIndex.one].id;
                                this.qualityCMarketBrowse(resultMap, [orangeid]);
                            }
                            break;
                        case EquipTypeIndex.PUBLICITYPET: //宠物装备品质筛选
                            var whiteRadio = this._viewUI.first_box.selected; //宠物装备绿色
                            var greenRadio = this._viewUI.second_box.selected; //宠物装备蓝色
                            var blueRadio = this._viewUI.third_box.selected; //宠物装备紫色
                            if (whiteRadio && greenRadio && blueRadio) { //三种品质全部选中
                                var whiteid = resultMap[TraitIndex.zero].id;
                                var greenid = resultMap[TraitIndex.one].id;
                                var blueid = resultMap[TraitIndex.two].id;
                                var threeno = [whiteid, greenid, blueid];
                                this.qualityCMarketBrowse(resultMap, threeno);
                            }
                            else if (whiteRadio && greenRadio) { //<绿、蓝>品质选中   
                                var whiteid = resultMap[TraitIndex.zero].id;
                                var greenid = resultMap[TraitIndex.one].id;
                                var threeno = [whiteid, greenid];
                                this.qualityCMarketBrowse(resultMap, threeno);
                            }
                            else if (whiteRadio && blueRadio) { //<绿、紫>品质选中
                                var whiteid = resultMap[TraitIndex.zero].id;
                                var blueid = resultMap[TraitIndex.two].id;
                                var threeno = [whiteid, blueid];
                                this.qualityCMarketBrowse(resultMap, threeno);
                            }
                            else if (greenRadio && blueRadio) { //<蓝、紫>品质选中
                                var greenid = resultMap[TraitIndex.one].id;
                                var blueid = resultMap[TraitIndex.two].id;
                                var threeno = [greenid, blueid];
                                this.qualityCMarketBrowse(resultMap, threeno);
                            }
                            else if (whiteRadio) { //只选中第一个单选框 
                                var whiteid = resultMap[TraitIndex.zero].id;
                                this.qualityCMarketBrowse(resultMap, [whiteid]);
                            }
                            else if (greenRadio) { //只选中第二个单选框
                                var greenid = resultMap[TraitIndex.one].id;
                                this.qualityCMarketBrowse(resultMap, [greenid]);
                            }
                            else if (blueRadio) { //只选中第三个单选框
                                var blueid = resultMap[TraitIndex.two].id;
                                this.qualityCMarketBrowse(resultMap, [blueid]);
                            }
                            break;
                        default:
                            this.CMarketBrowse(resultMap[0].firstno, resultMap[0].twono, [resultMap[0].id], resultMap[0].itemtype, resultMap[0].limitmin, resultMap[0].limitmax, resultMap[0].currpage, resultMap[0].priceSort, resultMap[0].issearch);
                            break;
                    }
                };
                /**品质请求筛选 */
                SaleGongshiViewMediator.prototype.qualityCMarketBrowse = function (resultMap, threeno) {
                    this.CMarketBrowse(resultMap[0].firstno, resultMap[0].twono, threeno, resultMap[0].itemtype, resultMap[0].limitmin, resultMap[0].limitmax, resultMap[0].currpage, resultMap[0].priceSort, resultMap[0].issearch);
                };
                /**关注  或者  取消关注 */
                SaleGongshiViewMediator.prototype.Attention = function () {
                    var threelist = this._viewUI.three_list;
                    var selectedIndex = threelist.selectedIndex;
                    if (selectedIndex >= 0) {
                        var good = this.goodArr[selectedIndex];
                        var id = good.id;
                        var itemid = good.itemId;
                        var attentionnumber = good.attentionnumber;
                        var itemtype = this.cMarketThreeTableDataForItemid[itemid].itemtype;
                        if (attentionnumber > 0) { //取消关注
                            this.CAttentionGoods(attentype.gongshi, id, attention.cancelAttent, itemtype);
                        }
                        else { //关注
                            this.CAttentionGoods(attentype.gongshi, id, attention.attent, itemtype);
                        }
                    }
                    else {
                        var prompt_1 = HudModel.getInstance().promptAssembleBack(PromptExplain.NOT_SELECT_ITEM);
                        var disappearMsgTips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                        disappearMsgTips.onShow(prompt_1);
                    }
                };
                /**公示关注成功刷新 */
                SaleGongshiViewMediator.prototype.flushAttent = function () {
                    var data = SaleModel.getInstance().GongshiGuanZhuData.get("data");
                    var index = this._viewUI.three_list.selectedIndex;
                    var guanzhu = this._viewUI.three_list.getCell(index).getChildByName("guanzhu_img"); // 关注img
                    if (data !== null) {
                        if (data.attentype == 2) { // 公示界面关注
                            if (data.attentiontype == 1) { // 关注
                                guanzhu.visible = true;
                                this._viewUI.btnGuanZ.label = this.cstringResConfigData[11454].msg; // 取消关注
                                this.goodArr[index].attentionnumber = 1;
                                var prompt_2 = HudModel.getInstance().promptAssembleBack(PromptExplain.ATTENTION_WIN);
                                var disappearMsgTips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                                disappearMsgTips.onShow(prompt_2);
                            }
                            else { // 非关注
                                guanzhu.visible = false;
                                this._viewUI.btnGuanZ.label = this.cstringResConfigData[11194].msg; // 关注
                                this.goodArr[index].attentionnumber = 0;
                                var prompt_3 = HudModel.getInstance().promptAssembleBack(PromptExplain.CANCEL_ATTENTION);
                                var disappearMsgTips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                                disappearMsgTips.onShow(prompt_3);
                            }
                        }
                    }
                };
                /**初始化栏目 品质筛选*/
                SaleGongshiViewMediator.prototype.initqualityUI = function () {
                    this._viewUI.qualitybg_img.height = 90;
                    this._viewUI.third_img.visible = false;
                    this._viewUI.third_box.selected = false;
                    this.gemqualityquip();
                };
                /**珍品装备栏目品质筛选*/
                SaleGongshiViewMediator.prototype.gemqualityquip = function () {
                    this._viewUI.first_label.color = "#c730db";
                    this._viewUI.first_label.text = "紫色品质";
                    this._viewUI.second_label.color = "#f38520";
                    this._viewUI.second_label.text = "橙色品质";
                    this._viewUI.quality.visible = true;
                    this._viewUI.first_box.selected = true;
                    this._viewUI.second_box.selected = true;
                };
                /**宠物装备栏目品质筛选*/
                SaleGongshiViewMediator.prototype.gemqualityPet = function () {
                    this._viewUI.first_label.color = "#00a32d";
                    this._viewUI.first_label.text = "绿色品质";
                    this._viewUI.second_label.color = "#00d9d9";
                    this._viewUI.second_label.text = "蓝色品质";
                    this._viewUI.third_label.color = "#c730db";
                    this._viewUI.third_label.text = "紫色品质";
                    this._viewUI.quality.visible = true;
                    this._viewUI.third_img.visible = true;
                    this._viewUI.qualitybg_img.height = 140;
                    this._viewUI.first_box.selected = true;
                    this._viewUI.second_box.selected = true;
                    this._viewUI.third_box.selected = true;
                };
                /**搜索 */
                SaleGongshiViewMediator.prototype.onbtnSouS = function () {
                    this._SaleSearchViewMediator = new sale.SaleSearchViewMediator(this._app);
                    this._SaleSearchViewMediator.show();
                    modules.ModuleManager.hide(modules.ModuleNames.SALE);
                };
                /**
                 * 显示拥有的钱
                 */
                SaleGongshiViewMediator.prototype.showSilverNumber = function () {
                    var str;
                    var score = BagModel.getInstance().globalIcon;
                    if (!isNaN(score)) {
                        str = game.utils.MoneyU.number2Thousands(score);
                    }
                    else {
                        str = "0";
                    }
                    this._viewUI.haveMoney_label.text = str;
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
                SaleGongshiViewMediator.prototype.CMarketBrowse = function (firstno, twono, threeno, itemtype, limitmin, limitmax, currpage, priceSort, issearch) {
                    RequesterProtocols._instance.c2s_market_browse(attentype.gongshi, firstno, twono, threeno, itemtype, limitmin, limitmax, currpage, priceSort, issearch);
                };
                /**
                 * 关注或者取消关注商品请求
                 * @param attentype 关注状态 1购买，2公示
                 * @param id 唯一id(是服务器数据库的id)
                 * @param attentiontype 关注类型 1关注  2取消关注
                 * @param itemtype 1普通道具 2宠物 3装备
                 */
                SaleGongshiViewMediator.prototype.CAttentionGoods = function (attentype, id, attentiontype, itemtype) {
                    RequesterProtocols._instance.c2s_attention_goods(attentype, id, attentiontype, itemtype);
                };
                /**请求关注信息 */
                SaleGongshiViewMediator.prototype.CMarketAttentionBrowse = function () {
                    RequesterProtocols._instance.c2s_CMarketAttentionBrowse(attentype.gongshi);
                };
                SaleGongshiViewMediator.prototype.show = function () {
                    if (!SaleModel.getInstance().isSeekback) {
                        this.initFirstlist();
                        this.CMarketAttentionBrowse();
                    }
                    _super.prototype.show.call(this);
                    SaleModel.getInstance().isSeekback = false;
                };
                SaleGongshiViewMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                SaleGongshiViewMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return SaleGongshiViewMediator;
            }(game.modules.UiMediator));
            sale.SaleGongshiViewMediator = SaleGongshiViewMediator;
        })(sale = modules.sale || (modules.sale = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=SaleGongshiViewMediator.js.map