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
var ComposeGemInfoBeanVo = game.modules.strengThening.models.ComposeGemInfoBeanVo;
var game;
(function (game) {
    var modules;
    (function (modules) {
        var strengThening;
        (function (strengThening) {
            /** 宝石合成 */
            var StrengTheningCompoundViewMediator = /** @class */ (function (_super) {
                __extends(StrengTheningCompoundViewMediator, _super);
                function StrengTheningCompoundViewMediator(uiLayer, app) {
                    var _this = _super.call(this, uiLayer) || this;
                    /**宝石表 */
                    _this.gemEffectData = StrengTheningModel.getInstance().gemEffectData;
                    /**宝石类型表 */
                    _this.gemTypeData = StrengTheningModel.getInstance().gemTypeData;
                    /**装备-宝石-复合表 */
                    _this.itemAttrData = BagModel.getInstance().itemAttrData;
                    /** 道具合成表*/
                    _this.cequipCombinData = StrengTheningModel.getInstance().cequipCombinData;
                    /**商品表、根据物品id存储的 */
                    _this.cGoodsDataForItemId = ShopModel.getInstance().cGoodsDataForItemId;
                    /**选择拥有的宝石 */
                    _this.haveGemDictionary = new Dictionary();
                    /**选择购买的宝石 */
                    _this.buyGemDictionary = new Dictionary(); //key是宝石类型，例如：0为一级宝石，1为二级宝石；value是[需要个数, 剩余个数]
                    /**宝石类型列表数据 */
                    _this.gemTypeArr = [];
                    /**合成宝石 */
                    _this.hcgemArr = [];
                    /**拥有宝石列表 */
                    _this.haveGemArr = [];
                    _this.allSelectNum = 0;
                    // selectGem = 0;
                    _this.selectBuyGem = 0;
                    /**商会购买宝石列表 */
                    _this.GemShopArr = [];
                    _this.allShopGemNum = 0;
                    /**拥有的宝石 */
                    _this.m_gem = [];
                    /**当前先择合成的宝石类型 */
                    _this.gemType = 0;
                    /**当前先择合成的宝石定位id */
                    _this.nitemid = 0;
                    /**当前选择的宝石类型的列表的index */
                    _this.gemTypeListIndex = 0;
                    /** 当前先择的宝石列表的cell，用于显示点击特效 */
                    _this.bgBtn = null;
                    // /** 判断在购买宝石是否减少 */
                    // private isReduce:boolean = false;
                    /** 当前正使用的融合剂道具id */
                    _this.mixItemid = 0;
                    _this._viewUI = new ui.common.StrengTheningCompoundUI();
                    _this.isCenter = false;
                    _this._app = app;
                    _this.initGemTypeListsData();
                    _this._viewUI.gemType_box.visible = false;
                    _this._viewUI.material_box.visible = false;
                    _this._viewUI.compound_box.x = 66;
                    _this.getGentype(0);
                    _this._viewUI.selectGem_btn.on(LEvent.MOUSE_DOWN, _this, _this.onSelectGemBtn);
                    _this._viewUI.compound_btn.on(LEvent.MOUSE_DOWN, _this, _this.onCompoundBtn);
                    _this._viewUI.addMoney_btn.on(LEvent.MOUSE_DOWN, _this, _this.addMoney);
                    _this._viewUI.hcitem3_img.on(LEvent.MOUSE_DOWN, _this, _this.showItemIfo);
                    StrengTheningModel._instance.inintHaveMoney(_this._viewUI.haveMoney_lab);
                    _this.CRequstShopPrice();
                    return _this;
                }
                /** 显示道具的信息 */
                StrengTheningCompoundViewMediator.prototype.showItemIfo = function () {
                    if (this.mixItemid != 0) {
                        var parame = new Laya.Dictionary();
                        parame.set("itemId", this.mixItemid);
                        var _tipsModule = new modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.commonItem, parame);
                    }
                };
                /** 刷新银币 */
                StrengTheningCompoundViewMediator.prototype.redreshYinBi = function () {
                    StrengTheningModel._instance.inintHaveMoney(this._viewUI.haveMoney_lab);
                    this.judgeMoneyIsEnough(this._viewUI.needMoney_lab);
                };
                /**显示兑换银币界面 */
                StrengTheningCompoundViewMediator.prototype.addMoney = function () {
                    this.ChangeMoneyViewMediator = new game.modules.commonUI.ChangeMoneyViewMediator(this._viewUI, this._app);
                    this.ChangeMoneyViewMediator.onShowInModule(modules.ModuleNames.STRENG_THENING, false, game.modules.bag.models.BagModel.getInstance().yuanbaoIcon, game.modules.bag.models.BagModel.getInstance().globalIcon);
                };
                /**初始化宝石类型列表 */
                StrengTheningCompoundViewMediator.prototype.initGemTypeListsData = function () {
                    // this._viewUI.gemType_box.visible = true;
                    for (var i = 1; i <= 9; i++) {
                        var strname = this.gemTypeData[i].strname; //宝石类型名称
                        var stradddes = this.gemTypeData[i].stradddes; //提升文本
                        var nicon = this.gemTypeData[i].nicon; //图标
                        var gemIcon = "common/icon/item/" + nicon + ".png"; //资源路径
                        var nitemid = this.gemTypeData[i].nitemid; //定位物品id
                        var ngemtype = this.gemEffectData[nitemid].ngemtype; //宝石类型
                        this.gemTypeArr.push({ gemName_label: strname, gemAttribute_label: stradddes, gemIcon_img: gemIcon, nitemid: nitemid, ngemtype: ngemtype });
                    }
                };
                /**选择宝石 */
                StrengTheningCompoundViewMediator.prototype.onSelectGemBtn = function () {
                    if (this._viewUI.gemType_box.visible) {
                        this._viewUI.gemType_box.visible = false;
                    }
                    else {
                        this._viewUI.gemType_box.visible = true;
                    }
                    var gemType_list = this._viewUI.gemType_list;
                    this.showList(gemType_list, this.gemTypeArr);
                    this._viewUI.gemType_list.selectHandler = new Handler(this, this.gemTypeSelect);
                };
                /**宝石类型选择 */
                StrengTheningCompoundViewMediator.prototype.gemTypeSelect = function (index) {
                    this.initHaveEqu();
                    this.requestShopLimit();
                    this.gemTypeListIndex = index;
                    this.clean();
                    this.getGentype(index);
                    this._viewUI.gemType_box.visible = false;
                    var nitemid = this.gemTypeArr[index].nitemid; //定位物品id
                    var gemIcon_img = this.gemTypeArr[index].gemIcon_img; //皮肤
                    this.hcgemArr = [];
                    for (var i = 1; i <= 12; i++) {
                        var gemid = nitemid + i;
                        //  console.log("宝石id：",gemid);
                        var gemEffect = this.gemEffectData[gemid];
                        var name_1 = gemEffect.name; //宝石显示名
                        var effectdes = gemEffect.effectdes; //功能说明
                        var nquality = this.itemAttrData[gemid].nquality; //宝石颜色品质
                        var frame_img = StrengTheningModel._instance.frameSkinArr[nquality - 1];
                        var level = gemEffect.level;
                        this.hcgemArr.push({ name_lab: name_1, attribute_lab: effectdes, gemIcon_img: gemIcon_img, frame_img: frame_img, gemId: gemid, level: level });
                    }
                    this.showbuyGem_list(index, nitemid);
                    this.showHaveGemLsit(index);
                    this.showList(this._viewUI.hcOneTypeGem_lsit, this.hcgemArr);
                    this._viewUI.hcOneTypeGem_lsit.selectHandler = new Handler(this, this.onHcOneTypeGemlist, [index, nitemid]);
                    var _ngemtype = this.gemTypeArr[index].ngemtype;
                    this._viewUI.hcOneTypeGem_lsit.renderHandler = new Handler(this, this.HcOneTypeGemlistRender, [_ngemtype]);
                    this.nitemid = nitemid;
                    this.gemType = index;
                    //game.modules.shop.models.ShopProxy._instance.once(game.modules.shop.models.QUERYLIMIT_EVENT, this, this.showbuyGem_list, [index, nitemid]);
                    this.onHcOneTypeGemlist(index, nitemid, 0);
                    this._viewUI.hcOneTypeGem_lsit.selectedIndex = 0;
                    this.onBgBtn(0, this._viewUI.hcOneTypeGem_lsit.getCell(0));
                };
                /**显示同一类型的宝石 */
                StrengTheningCompoundViewMediator.prototype.HcOneTypeGemlistRender = function (ngemtype, cell, index) {
                    var bgBtn = cell.getChildByName("gem_btn");
                    var point_img = cell.getChildByName("point_img");
                    point_img.visible = false;
                    bgBtn.on(LEvent.MOUSE_DOWN, this, this.onBgBtn, [index, cell]);
                    var gemid = this.hcgemArr[index].gemId; //当前宝石id
                    var hcNeedGemid = this.cequipCombinData[gemid].lastequipid; //合成当前宝石需要的宝石id
                    var haveGem = this.getTypeHaveGemList(ngemtype); //拥有的当前类型的宝石
                    for (var i in haveGem) {
                        var itemid = haveGem[i].itemId;
                        if (hcNeedGemid == itemid) {
                            var itemNum = haveGem[i].itemNum;
                            if (itemNum >= 2) {
                                point_img.visible = true;
                            }
                        }
                    }
                };
                /**点击特效 */
                StrengTheningCompoundViewMediator.prototype.onBgBtn = function (index, cell) {
                    var bgBtn = cell.getChildByName("gem_btn");
                    bgBtn.selected = true;
                    if (this.bgBtn == null) {
                        this.bgBtn = cell;
                        return;
                    }
                    if (this.bgBtn != cell) {
                        var btnLeft = this.bgBtn.getChildByName("gem_btn");
                        btnLeft.selected = false;
                        this.bgBtn = cell;
                    }
                };
                /**宝石选择 */
                StrengTheningCompoundViewMediator.prototype.onHcOneTypeGemlist = function (gemType, nitemid, index) {
                    this.clean();
                    // if(index == 0){
                    // 	let gem_btn:Button = this._viewUI.hcOneTypeGem_lsit.getCell(index).getChildByName("gem_btn") as Button;
                    // 	gem_btn.selected = true;
                    // }
                    // else{
                    // 	let gem_btn:Button = this._viewUI.hcOneTypeGem_lsit.getCell(0).getChildByName("gem_btn") as Button;
                    // 	gem_btn.selected = false;
                    // }
                    this._viewUI.hcframe_img.skin = this.hcgemArr[index].frame_img;
                    this._viewUI.gemIcon_img.skin = this.hcgemArr[index].gemIcon_img;
                    this._viewUI.hcgemName_label.text = this.hcgemArr[index].name_lab;
                    var gemid = this.hcgemArr[index].gemId; //当前宝石id
                    var level = this.hcgemArr[index].level;
                    var hcNeedGemid = this.cequipCombinData[gemid].lastequipid; //合成当前宝石需要的宝石id
                    var needgemData = this.gemEffectData[hcNeedGemid];
                    var name = needgemData.name;
                    var nquality = this.itemAttrData[hcNeedGemid].nquality; //宝石颜色品质
                    var frame_img = StrengTheningModel._instance.frameSkinArr[nquality - 1];
                    var hechengrate = this.cequipCombinData[hcNeedGemid].hechengrate; //合成当前宝石需要的宝石的合成概率
                    var ngemtype = this.gemEffectData[hcNeedGemid].ngemtype;
                    var nicon = this.gemTypeData[ngemtype].nicon;
                    var gemIcon_img = "common/icon/item/" + nicon + ".png";
                    this._viewUI.hcframe2_img.skin = frame_img;
                    this._viewUI.gemIcon2_img.skin = gemIcon_img;
                    this._viewUI.hcgemName2_label.text = name;
                    this._viewUI.rate_label.text = hechengrate + "%";
                    this._viewUI.needhammernum_label.visible = false;
                    this._viewUI.slash_lab.visible = false;
                    this._viewUI.havehammernum_label.visible = false;
                    this._viewUI.hcitem3_img.skin = "";
                    this._viewUI.hcframe3_img.skin = "common/ui/tongyong/baikuang.png";
                    var needGemNum = Math.round(Math.pow(2, level - 1));
                    this._viewUI.hcneedNum_lab.text = needGemNum + "";
                    var havegemNum = this.getHaveGemNum(hcNeedGemid);
                    if (havegemNum > 0) {
                        this._viewUI.gemHaveNum_label.text = havegemNum; //当前合成拥有的宝石的数量
                    }
                    else {
                        this._viewUI.gemHaveNum_label.text = "0";
                    }
                    this.hcNeedhammer(gemid, hechengrate);
                    this._viewUI.hchaveNum_label.text = "0";
                    this.selectCompoundGem(gemType, nitemid, hcNeedGemid);
                };
                /**自动选择合成当前宝石需要的宝石
                 * @param gemType
                 * @param nitemid
                 * @param hcNeedGemid 合成目标高级宝石所需最近的低一级宝石的id
                 */
                StrengTheningCompoundViewMediator.prototype.selectCompoundGem = function (gemType, nitemid, hcNeedGemid) {
                    /** 宝石类型 */
                    var _ngemtype = this.gemTypeArr[gemType].ngemtype;
                    /** 玩家拥有这一类型的所有宝石数据 */
                    var returnHaveGem = this.getTypeHaveGemList(_ngemtype);
                    /** 合成宝石需要1级宝石的数量 */
                    var hcneedNum = parseInt(this._viewUI.hcneedNum_lab.text);
                    /** 合成所需最近低一级宝石的等级 */
                    var needGemLevel = this.gemEffectData[hcNeedGemid]["level"];
                    /** 宝石表字典的key的数组 */
                    var gemDicKeys = Object.keys(this.gemEffectData);
                    /** 临时存放宝石道具数据的数组 */
                    var gemItemData = [];
                    for (var k = 0; k < gemDicKeys.length; k++) { //遍历宝石表
                        if (this.gemEffectData[gemDicKeys[k]]["ngemtype"] == _ngemtype) { //如果与合成所需用的宝石类型相等
                            gemItemData.push(this.gemEffectData[gemDicKeys[k]]);
                        }
                    }
                    if (returnHaveGem.length > 0) { //有宝石
                        this.countIsEnough(needGemLevel, hcneedNum, gemItemData, returnHaveGem);
                    }
                    else { //没有当前类型的宝石，通过商会购买宝石合成
                        this.countIsLack_and_revise(needGemLevel, this.getGemNum(this.gemEffectData[hcNeedGemid]["level"] + 1), gemItemData);
                    }
                };
                /**
                 * 计算商店补足合成宝石所缺少的并修正
                 * @param needGemLevel 合成所需最高的宝石的等级
                 * @param hcneedNum 还需要多少一级宝石来合成的数量
                 * @param gemItemData	某一类的宝石数据
                 */
                StrengTheningCompoundViewMediator.prototype.countIsLack_and_revise = function (needGemLevel, hcneedNum, gemItemData) {
                    if (hcneedNum <= 0) { //可能需要商会补足的一级宝石数量小于等于0，因为背包有足够的宝石用来合成
                        hcneedNum = 0;
                    }
                    for (var index = 0; index < 3; index++) {
                        this.initGemSelectState(this._viewUI.buyGem_list.getCell(index));
                    }
                    this.GemShopArr;
                    var _cell;
                    for (var i = this.GemShopArr.length - 1; i > -1; i--) {
                        _cell = this._viewUI.buyGem_list.getCell(i);
                        var gemlevel = this.GemShopArr[i]["level"]; //从高等级宝石开始获得其对应的宝石等级
                        //预计需要购买到的数量
                        var wantBuyNum = parseInt((hcneedNum / this.getGemNum(gemlevel)).toString());
                        if (gemlevel == needGemLevel + 1) { //排除特殊情况，例如：还需要2个一级宝石合成，恰好又是要合成2级宝石，拿2级宝石来计算过后要把wantBuyNum的值设为零
                            wantBuyNum = 0;
                        }
                        //商会能购买的数量
                        var lastNum = this.GemShopArr[i]["haveGemNum_lab"];
                        if (wantBuyNum != 0) {
                            wantBuyNum = wantBuyNum < lastNum ? wantBuyNum : lastNum;
                        }
                        hcneedNum = hcneedNum - wantBuyNum * this.getGemNum(gemlevel);
                        //this.buyGemDictionary.set(gemlevel - 1, [wantBuyNum, lastNum]);
                        for (var j = 0; j < wantBuyNum; j++) {
                            this.onGemBtn(i, _cell, this.buyGemDictionary, this.GemShopArr, false, false, true);
                        }
                        if (hcneedNum <= 0) {
                            break;
                        }
                    }
                    //this.showbuyGem_list(gemItemData[0]["ngemtype"] - 1, gemItemData[0]["id"]);
                };
                /**
                 * 返回以2为底数的对数值
                 */
                StrengTheningCompoundViewMediator.prototype.getLog2 = function (num) {
                    return Math.log(num) / Math.log(2);
                };
                /**
                 * 计算本人所拥有的宝石是否满足合成所需
                 * @param needGemLevel
                 * @param hcneedNum 合成所需的一级宝石数量
                 * @param gemItemData	某一类的宝石数据
                 * @param returnHaveGem 所拥有宝石的数据
                 */
                StrengTheningCompoundViewMediator.prototype.countIsEnough = function (needGemLevel, hcneedNum, gemItemData, returnHaveGem) {
                    for (var i = returnHaveGem.length - 1; i > -1; i--) {
                        var _cell = this._viewUI.haveGem_list.getCell(i);
                        this.initGemSelectState(_cell);
                        for (var j = 0; j < needGemLevel; j++) {
                            if (needGemLevel - j == 0) {
                                break;
                            }
                            for (var k = 0; k < gemItemData.length; k++) { //遍历某一个类型宝石
                                if (gemItemData[k]["level"] == needGemLevel - j && gemItemData[k]["id"] == returnHaveGem[i]["itemId"]) { //如果与合成所需用的这一级宝石等级相等，并且背包有这个宝石
                                    var inBagGemNum = BagModel.getInstance().chargeItemNum(gemItemData[k]["id"]); //获得其在背包中数量
                                    // /** 花费掉背包里拥有的宝石数量 */	
                                    // let costBagGemNum = 2 >= inBagGemNum ? inBagGemNum : 2;
                                    // this.haveGemDictionary.set(needGemLevel - j - 1,[costBagGemNum,inBagGemNum]);
                                    // hcneedNum = hcneedNum - this.getGemNum(needGemLevel - j) * costBagGemNum;	
                                    hcneedNum = hcneedNum - this.getGemNum(needGemLevel - j) * inBagGemNum;
                                    for (var l = 0; l < inBagGemNum; l++) {
                                        this.onGemBtn(i, _cell, this.haveGemDictionary, this.haveGemArr, false, false);
                                    }
                                }
                            }
                        }
                    }
                    this.countIsLack_and_revise(needGemLevel, hcneedNum, gemItemData);
                };
                /**
                 * 初始化下某列表下某种类型的宝石们被选的状态
                 */
                StrengTheningCompoundViewMediator.prototype.initGemSelectState = function (cell) {
                    var reduce_btn = cell.getChildByName("reduce_btn");
                    var gem_btn = cell.getChildByName("gem_btn");
                    var number_lab = cell.getChildByName("needGemNum_lab");
                    reduce_btn.visible = false;
                    gem_btn.skin = "common/ui/tongyong/common_list_3textbg.png";
                    number_lab.text = "0";
                };
                /**当前等级的宝石一个能够兑换多少个一级宝石 */
                StrengTheningCompoundViewMediator.prototype.getGemNum = function (level) {
                    return Math.pow(2, level - 1);
                };
                /**
                 * 获取拥有宝石的数量
                 */
                StrengTheningCompoundViewMediator.prototype.getHaveGemNum = function (hcNeedGemid) {
                    var haveGemIdArr = this.m_gem;
                    for (var i = 0; i < haveGemIdArr.length; i++) {
                        if (haveGemIdArr[i].itemId == hcNeedGemid) {
                            return haveGemIdArr[i].itemNum;
                        }
                    }
                    return -1;
                };
                /**显示合成宝石
                 * @param hcNeedGemid 所要合成目标的宝石
                 * @param hechengrate 合成概率
                 */
                StrengTheningCompoundViewMediator.prototype.hcNeedhammer = function (gemid, hechengrate) {
                    var hammerid = this.cequipCombinData[gemid].hammerid; //合成当前宝石需要的宝石的强化道具id
                    var hammerrate = 0;
                    var hammernum = 0;
                    if (hammerid) {
                        this._viewUI.material_box.visible = true;
                        this._viewUI.compound_box.x = 0;
                        this._viewUI.check_checkbox.selected = false;
                        hammerrate = this.cequipCombinData[gemid].hammerrate; //强化之后的成功率
                        hammernum = this.cequipCombinData[gemid].hammernum; //强化道具的数量
                    }
                    else {
                        this._viewUI.material_box.visible = false;
                        this._viewUI.compound_box.x = 66;
                    }
                    this._viewUI.check_checkbox.on(LEvent.MOUSE_DOWN, this, this.onCheckBox, [hammerrate, hechengrate, hammerid, hammernum]);
                };
                /**是否选择使用强化剂
                 * @param hammerrate 加入融合剂后的合成宝石概率
                 * @param hechengrate 不加入融合剂后的合成宝石概率
                 * @param hammerid 融合剂道具id
                 * @param hammernum 融合剂所需数量
                 */
                StrengTheningCompoundViewMediator.prototype.onCheckBox = function (hammerrate, hechengrate, hammerid, hammernum) {
                    var isCheck = this._viewUI.check_checkbox.selected;
                    if (!isCheck) {
                        var _mixItemNum = BagModel.getInstance().chargeItemNum(hammerid);
                        this._viewUI.rate_label.text = hammerrate + "%"; //强化概率
                        this._viewUI.needhammernum_label.visible = true;
                        this._viewUI.slash_lab.visible = true;
                        this._viewUI.havehammernum_label.visible = true;
                        this._viewUI.needhammernum_label.text = hammernum.toString(); //合成所需融合剂的数量
                        this._viewUI.havehammernum_label.text = _mixItemNum.toString(); //身上持有融合剂的数量
                        this._viewUI.havehammernum_label.color = "#ffffff";
                        this._viewUI.hcitem3_img.skin = "common/icon/item/" + BagModel.getInstance().itemAttrData[hammerid]["icon"] + ".png";
                        var _nquality = BagModel.getInstance().itemAttrData[hammerid]["nquality"];
                        this._viewUI.hcframe3_img.skin = modules.bag.BagSystemModule.getGameItemFrameColorResource(_nquality);
                        if (_mixItemNum == 0) { //如果所需融合剂道具在背包了没有，就弹出提示
                            this._viewUI.havehammernum_label.color = "#ff0000";
                            var _tipsMsg = ChatModel.getInstance().chatMessageTips["162206"]["msg"];
                            var _disappTips = new modules.commonUI.DisappearMessageTipsMediator(this._app);
                            _disappTips.onShow(_tipsMsg);
                            this._viewUI.check_checkbox.selected = false;
                            return;
                        }
                        this.mixItemid = hammerid;
                    }
                    else {
                        this._viewUI.rate_label.text = hechengrate + "%"; //普通概率
                        this._viewUI.needhammernum_label.visible = false;
                        this._viewUI.slash_lab.visible = false;
                        this._viewUI.havehammernum_label.visible = false;
                        this._viewUI.hcitem3_img.skin = "";
                        this._viewUI.hcframe3_img.skin = "common/ui/tongyong/baikuang.png";
                        this.mixItemid = 0;
                    }
                };
                /**获取宝石类型 */
                StrengTheningCompoundViewMediator.prototype.getGentype = function (index) {
                    var strname = this.gemTypeArr[index].gemName_label;
                    var stradddes = this.gemTypeArr[index].gemAttribute_label;
                    var gemIcon = this.gemTypeArr[index].gemIcon_img;
                    this._viewUI.hcGemName_label.text = strname;
                    this._viewUI.hcGemAttribute_label.text = stradddes;
                    this._viewUI.hcGemIcon_img.skin = gemIcon;
                };
                /**显示列表 */
                StrengTheningCompoundViewMediator.prototype.showList = function (list, arr) {
                    list.vScrollBarSkin = "";
                    list.scrollBar.elasticBackTime = 200;
                    list.scrollBar.elasticDistance = 50;
                    list.repeatY = arr.length;
                    list.array = arr;
                };
                /**
                 * 购买宝石列表  gemType:宝石类型  nitemid:宝石定位id
                 */
                StrengTheningCompoundViewMediator.prototype.showbuyGem_list = function (gemType, nitemid) {
                    var shop = game.modules.bag.models.BagModel._instance.getGoods;
                    var goodslimitsBinDic = game.modules.shop.models.ShopModel._instance.goodslimitsBinDic;
                    var buyGem_list = this._viewUI.buyGem_list;
                    this.GemShopArr = [];
                    var gemIcon_img = this.gemTypeArr[gemType].gemIcon_img; //宝石icon
                    for (var i = 0; i < 3; i++) {
                        var gemId = nitemid + i; //id
                        var name_2 = this.gemEffectData[gemId].name; //名称
                        var nquality = this.itemAttrData[gemId].nquality; //宝石颜色品质
                        var frame_img = StrengTheningModel._instance.frameSkinArr[nquality - 1];
                        var level = this.gemEffectData[gemId].level;
                        var shopGemId = this.cGoodsDataForItemId[gemId].id;
                        var gemPrice = 0;
                        if (shop.get(shopGemId) != undefined) {
                            gemPrice = shop.get(shopGemId).price;
                        }
                        else {
                            gemPrice = this.cGoodsDataForItemId[gemId].prices[0];
                        }
                        var limitNum = this.cGoodsDataForItemId[gemId].limitNum;
                        var buyNum = goodslimitsBinDic.get(shopGemId);
                        var m_limitNum = limitNum - buyNum;
                        this.GemShopArr.push({
                            shopGemIcon_img: gemIcon_img, name_lab: name_2, frame_img: frame_img,
                            level: level, moneyNum_lab: gemPrice, gemId: shopGemId, haveGemNum_lab: m_limitNum
                        });
                    }
                    this.showList(buyGem_list, this.GemShopArr);
                    buyGem_list.renderHandler = new Handler(this, this.buyGemLsitRender);
                };
                /**显示购买宝石 */
                StrengTheningCompoundViewMediator.prototype.buyGemLsitRender = function (cell, index) {
                    var gem_btn = cell.getChildByName("gem_btn");
                    var reduce_btn = cell.getChildByName("reduce_btn");
                    var needGemNum_lab = cell.getChildByName("needGemNum_lab");
                    gem_btn.on(LEvent.MOUSE_UP, this, this.onGemBtn, [index, cell, this.buyGemDictionary, this.GemShopArr, false, true, true]);
                    reduce_btn.on(LEvent.MOUSE_UP, this, this.onReduceBtn, [index, cell, this.buyGemDictionary, this.GemShopArr]);
                    if (this.buyGemDictionary.get(index) == null) {
                        reduce_btn.visible = false;
                        needGemNum_lab.text = "0";
                    }
                    // else {
                    // 	this.onGemBtn(index, cell, this.buyGemDictionary, this.GemShopArr, true, false, true);
                    // }
                };
                /**购买宝石选择 */
                StrengTheningCompoundViewMediator.prototype.buyGemLsitSelect = function (index) {
                    var cell = this._viewUI.buyGem_list.getCell(index);
                    var buyNum_lab = cell.getChildByName("buyNum_lab");
                };
                /**
                 * 拥有宝石列表
                 */
                StrengTheningCompoundViewMediator.prototype.showHaveGemLsit = function (gemType) {
                    var haveGem_list = this._viewUI.haveGem_list;
                    this.haveGemArr = [];
                    var gemIcon_img = this.gemTypeArr[gemType].gemIcon_img; //宝石icon
                    var _ngemtype = this.gemTypeArr[gemType].ngemtype; //宝石类型
                    var returnHaveGem = this.getTypeHaveGemList(_ngemtype);
                    for (var i = 0; i < returnHaveGem.length; i++) {
                        var gemId = returnHaveGem[i].itemId; //宝石id
                        var name_3 = this.gemEffectData[gemId].name; //名称
                        var nquality = this.itemAttrData[gemId].nquality; //品质
                        var frame_img = StrengTheningModel._instance.frameSkinArr[nquality - 1];
                        var effectdes = this.itemAttrData[gemId].effectdes; //描述
                        var haveGemNum_lab = returnHaveGem[i].itemNum; //宝石数量
                        var level = this.itemAttrData[gemId].level; //等级
                        this.haveGemArr.push({
                            name_lab: name_3, attribute_lab: effectdes, frame_img: frame_img,
                            gemIcon_img: gemIcon_img, haveGemNum_lab: haveGemNum_lab, level: level,
                            moneyNum_lab: 0, gemId: gemId
                        });
                    }
                    this.showList(haveGem_list, this.haveGemArr);
                    haveGem_list.renderHandler = new Handler(this, this.haveGemlistRender);
                };
                /**显示拥有宝石 */
                StrengTheningCompoundViewMediator.prototype.haveGemlistRender = function (cell, index) {
                    var disboard_btn = cell.getChildByName("disboard_btn");
                    var reduce_btn = cell.getChildByName("reduce_btn");
                    disboard_btn.visible = false;
                    var needNumber_lab = cell.getChildByName("needGemNum_lab");
                    var gem_btn = cell.getChildByName("gem_btn");
                    gem_btn.on(LEvent.MOUSE_UP, this, this.onGemBtn, [index, cell, this.haveGemDictionary, this.haveGemArr, false, true]);
                    reduce_btn.on(LEvent.MOUSE_UP, this, this.onReduceBtn, [index, cell, this.haveGemDictionary, this.haveGemArr]);
                    if (this.haveGemDictionary.get(index) == null) {
                        reduce_btn.visible = false;
                        needNumber_lab.text = "0";
                    }
                };
                /**
                 * 点击宝石
                 * @param isClick 用来判断是否被点击了
                 * @param flag 用来判断是从商会购买宝石列表来的
                 */
                StrengTheningCompoundViewMediator.prototype.onGemBtn = function (index, cell, gemDictionary, gemArr, isSelect, isClick, flag) {
                    var number_lab = cell.getChildByName("needGemNum_lab");
                    var reduce_btn = cell.getChildByName("reduce_btn");
                    var gem_btn = cell.getChildByName("gem_btn");
                    var hchaveNum = parseInt(this._viewUI.hchaveNum_label.text);
                    var hcneedNum = parseInt(this._viewUI.hcneedNum_lab.text);
                    var selectedIndex = this._viewUI.hcOneTypeGem_lsit.selectedIndex;
                    var gmLevel = this.hcgemArr[selectedIndex].level;
                    var level = gemArr[index].level;
                    if (level >= gmLevel)
                        return;
                    if (hchaveNum >= hcneedNum)
                        return; //当所需的宝石数量被满足或者被超过，就不再接受增加宝石数量的点击事件
                    var haveGemNum = parseInt(gemArr[index].haveGemNum_lab);
                    var selectNum = parseInt(number_lab.text);
                    if (gemArr == this.haveGemArr && selectNum == haveGemNum) { //如果是拥有宝石的列表进入此方法，点击选中的宝石不能大于等于自己所拥有
                        return;
                    }
                    else if (gemArr == this.GemShopArr && (haveGemNum == 0 || selectNum == haveGemNum)) { //如果是商会宝石的列表进入此方法，点击选中的宝石剩余数量为0或者已达到商会购买限制
                        return;
                    }
                    var clickedValue = gemDictionary.get(index);
                    if (!clickedValue) {
                        gemDictionary.set(index, [1, haveGemNum]); //默认先选1个低级宝石
                    }
                    else {
                        var addNum = clickedValue[0];
                        addNum++;
                        if (addNum > haveGemNum) {
                            return;
                        }
                        gemDictionary.set(index, [addNum, haveGemNum]);
                    }
                    // if (gemDictionary.get(index) == null) {
                    // 	if(flag && !isClick){//商会列表，但为被鼠标点击
                    // 		gemDictionary.set(index, [2, haveGemNum]);//默认直接购买2个低级宝石
                    // 	}
                    // 	else if(flag && isClick){
                    // 		gemDictionary.set(index, [1, haveGemNum]);
                    // 	}
                    // 	else{//背包宝石列表
                    // 		gemDictionary.set(index, [1, haveGemNum]);//默认先选1个低级宝石
                    // 	}
                    // } else {
                    // 	let addnum = gemDictionary.get(index)[0];
                    // 	if (flag) {//如果是购买商会宝石列表
                    // 		if(isClick && addnum < haveGemNum){//点击了购买宝石，并且数量符合限制
                    // 			addnum += 1;
                    // 		}
                    // 	}
                    // 	else if (addnum < haveGemNum) {
                    // 		addnum += 1;
                    // 	}
                    // 	if (!isSelect) {
                    // 		gemDictionary.set(index, [addnum, haveGemNum]);
                    // 	}
                    // }
                    number_lab.text = gemDictionary.get(index)[0];
                    // if(gemDictionary.get(index)[0] >= haveGemNum) return;
                    if (gemDictionary.get(index)[0] > 0) {
                        reduce_btn.visible = true;
                        gem_btn.skin = "common/ui/tongyong/common_list_3textbg2.png";
                    }
                    else {
                        reduce_btn.visible = false;
                        gem_btn.skin = "common/ui/tongyong/common_list_3textbg.png";
                    }
                    this.hcAllSelectAddNum(index, gemArr, gemDictionary);
                    var shopNum = gemArr[index].moneyNum_lab;
                    this.allShopGemNum += shopNum;
                    this._viewUI.needMoney_lab.text = this.allShopGemNum + "";
                    this.judgeMoneyIsEnough(this._viewUI.needMoney_lab);
                    // this.showhcNeedGem(gemDictionary);
                };
                /**
                 * 判断背包里银币是否满足购买商会里的宝石所需要的银币
                 * @param moneylab 所需要的银币数量的文本
                 */
                StrengTheningCompoundViewMediator.prototype.judgeMoneyIsEnough = function (moneylab) {
                    /** 所需银币数量 */
                    var yinbiNum = Number(moneylab.text);
                    /** 角色本人持有的银币数量 */
                    var roleHaveYinbiNum = HudModel.getInstance().sliverNum;
                    if (yinbiNum > roleHaveYinbiNum) { //如果银币不足
                        moneylab.color = "#ff0400"; //文本变红
                    }
                    else {
                        moneylab.color = "#610500"; //文本变黑
                    }
                };
                /**点击去掉宝石 */
                StrengTheningCompoundViewMediator.prototype.onReduceBtn = function (index, cell, gemDictionary, gemArr) {
                    var number_lab = cell.getChildByName("needGemNum_lab");
                    var haveGemNum_lab = cell.getChildByName("haveGemNum_lab");
                    var reduce_btn = cell.getChildByName("reduce_btn");
                    var gem_btn = cell.getChildByName("gem_btn");
                    var needGemNum = parseInt(number_lab.text);
                    var haveGemNum = parseInt(haveGemNum_lab.text);
                    if (gemDictionary.get(index) == null)
                        return;
                    var num = gemDictionary.get(index)[0];
                    num -= 1;
                    if (num < 0) {
                        for (var i = 0; i < gemDictionary.keys.length; i++) {
                            gemDictionary.set(gemDictionary.keys[i], [0, gemDictionary.get(gemDictionary.keys[i])[1]]);
                        }
                    }
                    else {
                        gemDictionary.set(index, [num, haveGemNum]);
                    }
                    number_lab.text = gemDictionary.get(index)[0];
                    if (gemDictionary.get(index)[0] <= 0) {
                        reduce_btn.visible = false;
                        gem_btn.skin = "common/ui/tongyong/common_list_3textbg.png";
                    }
                    this.hcAllSelectReduceNum(index, gemArr, gemDictionary);
                    var shopNum = gemArr[index].moneyNum_lab;
                    this.allShopGemNum -= shopNum;
                    if (this.allShopGemNum < 0) {
                        this.allShopGemNum = 0;
                    }
                    this._viewUI.needMoney_lab.text = this.allShopGemNum + "";
                    this.judgeMoneyIsEnough(this._viewUI.needMoney_lab);
                };
                /**增加时显示选择宝石的总数 */
                StrengTheningCompoundViewMediator.prototype.hcAllSelectAddNum = function (index, gemArr, gemDictionary) {
                    // if (this.isReduce && gemDictionary == this.buyGemDictionary) {//如果是在购买宝石因减少宝石间接进入此方法，就返回
                    // 	this.isReduce = false
                    // 	return;
                    // }
                    var level = gemArr[index].level; //选择宝石的等级
                    var num = Math.pow(2, level - 1);
                    var needNum = parseInt(this._viewUI.hcneedNum_lab.text); //需要的个数
                    if (this.allSelectNum < needNum) {
                        this.allSelectNum += num;
                    }
                    var dicKeys = gemDictionary.keys;
                    var limitNum = gemDictionary.get(index)[1];
                    if (limitNum == 0) { //如果商会已经没有宝石可以购买
                        this.allSelectNum = 0;
                    }
                    this._viewUI.hchaveNum_label.text = this.allSelectNum.toString();
                };
                // /**增加或者减少选择的宝石时，显示的总数 */
                // public showhcNeedGem(gemDictionary){
                // 	let keys = gemDictionary.keys();
                // 	for(let i=0; i < keys; i++){
                // 		if(keys[1]){
                // 		}
                // 	}
                // }
                /**减少时显示选择宝石总数 */
                StrengTheningCompoundViewMediator.prototype.hcAllSelectReduceNum = function (index, gemArr, gemDictionary) {
                    var level = gemArr[index].level;
                    var num = Math.pow(2, level - 1);
                    if (this.allSelectNum > 0) {
                        this.allSelectNum -= num;
                    }
                    // if(gemDictionary == this.buyGemDictionary){
                    // 	this.isReduce = true;
                    // }
                    // else{
                    // 	this.isReduce = false;
                    // }
                    this._viewUI.hchaveNum_label.text = this.allSelectNum.toString();
                };
                /**根据当前选择的宝石类型筛选出拥有的同类型宝石
                 * @param ngemtype 宝石类型
                 * @describe 根据宝石类型，先到宝石表找出同类型所有宝石对应的道具id，放到临时数组中去
                 * 			再从那临时数组取出道具id到背包中遍历查找搜索
                 */
                StrengTheningCompoundViewMediator.prototype.getTypeHaveGemList = function (ngemtype) {
                    var haveGemIdArr = [];
                    /** 宝石表字典的key的数组 */
                    var gemDicKeys = Object.keys(this.gemEffectData);
                    /** 临时存放宝石道具id的数组 */
                    var gemItemId = [];
                    for (var i = 0; i < gemDicKeys.length; i++) { //遍历宝石表
                        if (this.gemEffectData[gemDicKeys[i]]["ngemtype"] == ngemtype) { //如果与所选择的宝石类型相等
                            gemItemId.push(this.gemEffectData[gemDicKeys[i]]["id"]); //就放入宝石对应道具id
                        }
                    }
                    for (var i = 0; i < gemItemId.length; i++) {
                        /** 宝石道具数量 */
                        var itemNum = modules.bag.models.BagModel.getInstance().chargeItemNum(gemItemId[i]);
                        if (itemNum > 0) { //如果数量大于零
                            //宝石对应的道具id
                            var _itemid = gemItemId[i];
                            //宝石显示的名字
                            var _name = this.gemEffectData[gemItemId[i]]["name"];
                            //宝石的品质
                            var _nquality = this.itemAttrData[gemItemId[i]].nquality;
                            //宝石的功能描述
                            var _effectdes = this.gemEffectData[gemItemId[i]]["effectdes"];
                            //宝石的数量
                            var _itemNum = itemNum;
                            //宝石的等级
                            var _level = this.gemEffectData[gemItemId[i]]["level"];
                            haveGemIdArr.push({ itemId: _itemid, name: _name, nquality: _nquality, effectdes: _effectdes, itemNum: _itemNum, level: _level });
                        }
                    }
                    return haveGemIdArr;
                };
                /**初始化拥有的装备 */
                StrengTheningCompoundViewMediator.prototype.initHaveEqu = function () {
                    this.m_gem = [];
                    var bag1 = bagModel.getInstance().bagMap[BagTypes.BAG].items;
                    var returnBag1 = this.getItems(bag1);
                    this.pushToArr(returnBag1, BagTypes.BAG);
                };
                /**获取背包的物品 */
                StrengTheningCompoundViewMediator.prototype.getItems = function (bag) {
                    var idArr = [];
                    for (var i = 0; i < bag.length; i++) {
                        var itemId = bag[i].id; //item id
                        var itemNum = bag[i].number; //item id
                        idArr.push({ itemId: itemId, itemNum: itemNum, key: bag[i].key });
                    }
                    return idArr;
                };
                /**获取宝石 */
                StrengTheningCompoundViewMediator.prototype.pushToArr = function (returnBag, packid) {
                    if (returnBag.length == 0)
                        return;
                    for (var i = 0; i < returnBag.length; i++) {
                        if (108000 <= returnBag[i].itemId && returnBag[i].itemId <= 108812) { //宝石
                            this.m_gem.push({ itemId: returnBag[i].itemId, itemNum: returnBag[i].itemNum, key: returnBag[i].key, packid: packid });
                        }
                    }
                };
                /**
                 * 点击合成按钮
                 */
                StrengTheningCompoundViewMediator.prototype.onCompoundBtn = function () {
                    if (this._viewUI.needMoney_lab.color == "#ff0000") { //如果所持银币文本字颜色为红色，说明本人角色身上银币不足
                        var tipsMessage = ChatModel.getInstance().chatMessageTips["120025"]["msg"]; //获得提示身上银币不足的提示语句
                        var piaochuang = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                        piaochuang.onShow(tipsMessage); //飘窗显示提示语句
                        return;
                    }
                    //合成请求
                    var selectedIndex = this._viewUI.hcOneTypeGem_lsit.selectedIndex;
                    var hcGemId = -1;
                    if (selectedIndex != -1) {
                        hcGemId = this.hcgemArr[selectedIndex].gemId;
                    }
                    var checkboxSelected = this._viewUI.check_checkbox.selected;
                    var useItem = 0; //使用融合剂
                    var _gemLevel = Number(this.gemEffectData[hcGemId]["level"]);
                    if (checkboxSelected && _gemLevel > 8) {
                        var _mixItemNum = Number(this._viewUI.havehammernum_label.text);
                        var _needRongHeJiNum = Math.pow(2, _gemLevel - 8) - 1; //合成9级至13级宝石所需的融合剂数量
                        if (_mixItemNum < _needRongHeJiNum) {
                            var _tipsMsg = ChatModel.getInstance().chatMessageTips["162206"]["msg"];
                            var _disappTips = new modules.commonUI.DisappearMessageTipsMediator(this._app);
                            _disappTips.onShow(_tipsMsg);
                            return;
                        }
                        useItem = 1;
                    }
                    var bagGems = [];
                    var havegemkeys = this.haveGemDictionary.keys;
                    for (var i = 0; i < havegemkeys.length; i++) {
                        var index = havegemkeys[i];
                        var gemid = this.haveGemArr[index].gemId;
                        var gemNum = this.haveGemDictionary.get(index)[0];
                        if (gemNum > 0) {
                            var ComposeGemInfoBean = new ComposeGemInfoBeanVo();
                            ComposeGemInfoBean.itemIdOrGoodId = gemid;
                            ComposeGemInfoBean.num = gemNum;
                            bagGems.push(ComposeGemInfoBean);
                        }
                    }
                    var shopGems = [];
                    var buygemkeys = this.buyGemDictionary.keys;
                    for (var j = 0; j < buygemkeys.length; j++) {
                        var index = buygemkeys[j];
                        var gemid = this.GemShopArr[index].gemId;
                        var gemNum = this.buyGemDictionary.get(index)[0];
                        if (gemNum > 0) {
                            var ComposeGemInfoBean = new ComposeGemInfoBeanVo();
                            ComposeGemInfoBean.itemIdOrGoodId = gemid;
                            ComposeGemInfoBean.num = gemNum;
                            shopGems.push(ComposeGemInfoBean);
                        }
                    }
                    this.flushGem();
                    RequesterProtocols._instance.c2s_CCompose_Gem(useItem, hcGemId, bagGems, shopGems);
                };
                /**刷新宝石 */
                StrengTheningCompoundViewMediator.prototype.flushGem = function () {
                    strengThening.models.StrengTheningProxy.getInstance().on(strengThening.models.SHeChengItem, this, this.gemTypeSelect, [this.gemTypeListIndex]);
                };
                /**清除数据 */
                StrengTheningCompoundViewMediator.prototype.clean = function () {
                    this.haveGemDictionary.clear();
                    this.buyGemDictionary.clear();
                    this.allSelectNum = 0;
                    this.allShopGemNum = 0;
                    this.mixItemid = 0;
                };
                /**请求宝石价格 */
                StrengTheningCompoundViewMediator.prototype.requestShopLimit = function () {
                    var shop = game.modules.bag.models.BagModel._instance.getGoods;
                    var shopkeys = shop.keys;
                    this.CQueryLimit(shopkeys);
                };
                /**请求商品价格 */
                StrengTheningCompoundViewMediator.prototype.CRequstShopPrice = function () {
                    RequesterProtocols._instance.c2s_requst_shopprice(5);
                };
                /**查询商品限购次数 */
                StrengTheningCompoundViewMediator.prototype.CQueryLimit = function (goodsids) {
                    RequesterProtocols._instance.c2s_query_limit(1, goodsids);
                };
                StrengTheningCompoundViewMediator.prototype.show = function () {
                    this.registerEvent();
                    this.gemTypeSelect(0);
                    _super.prototype.show.call(this);
                };
                /** 注册事件 */
                StrengTheningCompoundViewMediator.prototype.registerEvent = function () {
                    game.modules.bag.models.BagProxy.getInstance().on(game.modules.bag.models.REFRESH_CURRENCY_EVENT, this, this.redreshYinBi);
                    game.modules.pet.models.PetProxy.getInstance().on(game.modules.pet.models.SHOPPRICE_EVENT, this, this.requestShopLimit);
                };
                StrengTheningCompoundViewMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    this.removeEvent();
                };
                /** 移除事件 */
                StrengTheningCompoundViewMediator.prototype.removeEvent = function () {
                    game.modules.bag.models.BagProxy.getInstance().off(game.modules.bag.models.REFRESH_CURRENCY_EVENT, this, this.redreshYinBi);
                    game.modules.pet.models.PetProxy.getInstance().off(game.modules.pet.models.SHOPPRICE_EVENT, this, this.requestShopLimit);
                    strengThening.models.StrengTheningProxy.getInstance().off(strengThening.models.SHeChengItem, this, this.gemTypeSelect);
                };
                StrengTheningCompoundViewMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return StrengTheningCompoundViewMediator;
            }(game.modules.UiMediator));
            strengThening.StrengTheningCompoundViewMediator = StrengTheningCompoundViewMediator;
        })(strengThening = modules.strengThening || (modules.strengThening = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=StrengTheningCompoundViewMediator.js.map