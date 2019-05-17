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
var StrengTheningModel = game.modules.strengThening.models.StrengTheningModel;
var game;
(function (game) {
    var modules;
    (function (modules) {
        var strengThening;
        (function (strengThening) {
            /**是否强化打造 */
            var isStrengThening;
            (function (isStrengThening) {
                isStrengThening[isStrengThening["NO"] = 0] = "NO";
                isStrengThening[isStrengThening["YES"] = 1] = "YES"; //强化
            })(isStrengThening = strengThening.isStrengThening || (strengThening.isStrengThening = {}));
            /** 装备打造 */
            var StrengTheningMakeViewMediator = /** @class */ (function (_super) {
                __extends(StrengTheningMakeViewMediator, _super);
                function StrengTheningMakeViewMediator(uiLayer, app) {
                    var _this = _super.call(this, uiLayer) || this;
                    /**程序内字符串表 */
                    _this.cstringResConfigData = game.modules.tips.models.TipsModel._instance.cstringResConfigData;
                    /**创角标 */
                    _this.createRoleConfigBinDic = game.modules.createrole.models.LoginModel.getInstance().createRoleConfigBinDic;
                    // equArr:Array<any> = [];
                    /**分了等级之后的打造装备 */
                    _this.equArr2 = [];
                    /**所有的打造装备 */
                    _this.equArr3 = [];
                    /**杂货表 */
                    _this.groceryEffectData = StrengTheningModel.getInstance().groceryEffectData;
                    /**装备打造表 */
                    _this.equipMakeInfoData = StrengTheningModel.getInstance().equipMakeInfoData;
                    /**装备表1 */
                    _this.equipEffectData = StrengTheningModel.getInstance().equipEffectData;
                    /**装备表2 */
                    _this.equipItemAttrData = StrengTheningModel.getInstance().equipItemAttrData;
                    /**复合表 */
                    _this.itemAttrData = BagModel.getInstance().itemAttrData;
                    /**宝石表 */
                    _this.gemEffectData = StrengTheningModel.getInstance().gemEffectData;
                    /**道具类型表 */
                    _this.itemTypeData = StrengTheningModel.getInstance().itemTypeData;
                    /**客户端信息提示表 */
                    _this.chatMessageTips = game.modules.chat.models.ChatModel._instance.chatMessageTips;
                    /**宝石 */
                    _this.m_haveGemArr = []; //
                    /**装备 */
                    _this.m_haveEquArr = [];
                    /**杂货 */
                    _this.m_havegroceryEffectArr = [];
                    /**装备打造表的id */
                    _this.idArr = [];
                    /**保存点击装备列表时的cell */
                    _this.equipSelectCell = null;
                    _this._viewUI = new ui.common.StrengTheningMakeUI();
                    _this.isCenter = false;
                    _this._app = app;
                    _this.initData();
                    _this.initArr2();
                    _this.onCheck();
                    _this.initHaveEqu();
                    _this._viewUI.qianghua_btn.on(LEvent.MOUSE_DOWN, _this, _this.onMakeBtn);
                    _this._viewUI.check_ckbox.on(LEvent.CLICK, _this, _this.onCheck);
                    StrengTheningModel._instance.inintHaveMoney(_this._viewUI.haveMoney_lab);
                    game.modules.bag.models.BagProxy.getInstance().on(game.modules.bag.models.REFRESH_CURRENCY_EVENT, _this, StrengTheningModel._instance.inintHaveMoney, [_this._viewUI.haveMoney_lab]);
                    _this._viewUI.selectLevel_btn.on(LEvent.MOUSE_DOWN, _this, _this.onSelectLevel);
                    strengThening.models.StrengTheningProxy.getInstance().on(strengThening.models.onProductMadeUp, _this, _this.onEvent);
                    _this._viewUI.addMoney_btn.on(LEvent.MOUSE_DOWN, _this, _this.addMoney);
                    _this._StrengTheningInsertViewMediator = new strengThening.StrengTheningInsertViewMediator(_this._viewUI, _this._app);
                    return _this;
                }
                /**显示兑换银币界面 */
                StrengTheningMakeViewMediator.prototype.addMoney = function () {
                    this.ChangeMoneyViewMediator = new game.modules.commonUI.ChangeMoneyViewMediator(this._viewUI, this._app);
                    this.ChangeMoneyViewMediator.onShowInModule(modules.ModuleNames.STRENG_THENING, false, game.modules.bag.models.BagModel.getInstance().yuanbaoIcon, game.modules.bag.models.BagModel.getInstance().globalIcon);
                };
                /**打造错误返回 */
                StrengTheningMakeViewMediator.prototype.showError = function (errorCode) {
                    this.DisappearMessageTipsMediator = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                    if (errorCode == SErrorCode.MONEY_NOT_ENOUGH) {
                        this.DisappearMessageTipsMediator.onShow(this.chatMessageTips[420025].msg);
                    }
                    else if (errorCode == SErrorCode.QIANG_HUA_SHI_NOT_ENOUGH) {
                        this.DisappearMessageTipsMediator.onShow(this.chatMessageTips[420026].msg);
                    }
                    else if (errorCode == SErrorCode.TIE_NOT_ENOUGH) {
                        this.DisappearMessageTipsMediator.onShow(this.chatMessageTips[420027].msg);
                    }
                    else if (errorCode == SErrorCode.TUZHI_NOT_ENOUGH) {
                        this.DisappearMessageTipsMediator.onShow(this.chatMessageTips[420028].msg);
                    }
                    else if (errorCode == SErrorCode.XIU_LI_CAI_LIAO_NOT_ENOUGH) {
                        this.DisappearMessageTipsMediator.onShow(this.chatMessageTips[420029].msg);
                    }
                    else if (errorCode == SErrorCode.ZHI_ZHAO_FU_NOT_ENOUGH) {
                        this.DisappearMessageTipsMediator.onShow(this.chatMessageTips[420030].msg);
                    }
                };
                /**打造返回数据刷新 */
                StrengTheningMakeViewMediator.prototype.onEvent = function () {
                    StrengTheningModel._instance.haveGemIdArr = [];
                    StrengTheningModel._instance.haveEquIdArr = [];
                    StrengTheningModel._instance.havegroceryEffectArr = [];
                    this.initHaveEqu();
                    this.initLists();
                };
                /**点击check显示不同的打造概率 */
                StrengTheningMakeViewMediator.prototype.onCheck = function () {
                    var isCheck = this._viewUI.check_ckbox.selected;
                    var vptdazhaorate = this.equArr2[0].m_equipMakeInfoData.vptdazhaorate;
                    var vqhdazhaorate = this.equArr2[0].m_equipMakeInfoData.vqhdazhaorate;
                    if (isCheck) {
                        this._viewUI.tipLabel_label.text = strengThening.models.StrengTheningModel.makeType.make_qinghua;
                        this.gailv(vqhdazhaorate);
                        this._viewUI.qianghua_btn.label = this.cstringResConfigData[11005].msg;
                    }
                    else {
                        this._viewUI.tipLabel_label.text = strengThening.models.StrengTheningModel.makeType.make_putong;
                        this.gailv(vptdazhaorate);
                        this._viewUI.qianghua_btn.label = this.cstringResConfigData[11004].msg;
                    }
                };
                /**显示强化和不强化的概率 */
                StrengTheningMakeViewMediator.prototype.gailv = function (arr) {
                    this._viewUI.lv_label.text = arr[0] / 100 + ".00%";
                    this._viewUI.lan_label.text = arr[1] / 100 + ".00%";
                    this._viewUI.zi_label.text = arr[2] / 100 + ".00%";
                };
                /**初始化数据 */
                StrengTheningMakeViewMediator.prototype.initData = function () {
                    var id = StrengTheningModel.getInstance().id;
                    this.idArr.length = 0;
                    for (var index in this.equipMakeInfoData) {
                        this.idArr.push(this.equipMakeInfoData[index].id);
                    }
                    this.equArr3.length = 0;
                    for (var i = 0; i < this.idArr.length; i++) {
                        var m_equipMakeInfoData = this.equipMakeInfoData[this.idArr[i]]; //装备打造表数据
                        var m_itemAttrData = this.itemAttrData[m_equipMakeInfoData.id]; //获取装备表数据
                        this.equArr3.push({ m_itemAttrData: m_itemAttrData, m_equipMakeInfoData: m_equipMakeInfoData }); //所有的打造装备
                    }
                    this.initArr2();
                    this.initLevelList();
                };
                /**初始化等级列表 */
                StrengTheningMakeViewMediator.prototype.initLevelList = function () {
                    var levelListArr = [];
                    for (var i = 0; i < this.equArr3.length; i++) {
                        var equLevel = this.equArr3[i].m_equipMakeInfoData.nlevel;
                        if (levelListArr.indexOf(equLevel) < 0) {
                            levelListArr.push(equLevel);
                        }
                    }
                    SaleModel._instance.showList(this._viewUI.level_list, levelListArr);
                    this._viewUI.level_list.renderHandler = new Handler(this, this.levelListRender, [levelListArr]);
                    this._viewUI.level_list.selectHandler = new Handler(this, this.levelListSelecet, [levelListArr]);
                };
                /**显示等级列表数据 */
                StrengTheningMakeViewMediator.prototype.levelListRender = function (levelListArr, cell, index) {
                    var levellab = cell.getChildByName("level_lab");
                    levellab.text = levelListArr[index] + this.cstringResConfigData[3].msg;
                };
                /**选择等级 */
                StrengTheningMakeViewMediator.prototype.levelListSelecet = function (levelListArr, index) {
                    this._viewUI.level_box.visible = false;
                    var equLevel = levelListArr[index];
                    this._viewUI.selectLevel_btn.label = equLevel + this.cstringResConfigData[3].msg;
                    this.initArr2();
                };
                /**显示等级列表 */
                StrengTheningMakeViewMediator.prototype.onSelectLevel = function () {
                    var _this = this;
                    if (this._viewUI.level_box.visible) {
                        this._viewUI.level_box.visible = false;
                    }
                    else {
                        this._viewUI.level_box.visible = true;
                    }
                    this._viewUI.closeLevelList_img.on(LEvent.MOUSE_DOWN, this, function () {
                        _this._viewUI.level_box.visible = false;
                    });
                };
                /**初始化数据 */
                StrengTheningMakeViewMediator.prototype.initArr2 = function () {
                    this.equArr2.length = 0;
                    var selectLabel = this._viewUI.selectLevel_btn.label;
                    for (var i = 0; i < this.equArr3.length; i++) {
                        if (selectLabel == this.equArr3[i].m_itemAttrData.level + "级") {
                            var c = this.equArr3[i];
                            this.equArr2.push({ m_itemAttrData: c.m_itemAttrData, m_equipMakeInfoData: c.m_equipMakeInfoData }); //分了等级之后的打造装备
                        }
                    }
                    this.initLists();
                };
                /**预览装备属性 */
                StrengTheningMakeViewMediator.prototype.onPreviewBtn = function (equipId) {
                    this._StrengTheningPreviewViewMediator = new strengThening.StrengTheningPreviewViewMediator(this._viewUI, equipId);
                    this._StrengTheningPreviewViewMediator.show();
                };
                /**装备列表初始化数据 */
                StrengTheningMakeViewMediator.prototype.initLists = function () {
                    var equip_list = this._viewUI.equip_list;
                    this.showList(equip_list, this.equArr2);
                    equip_list.renderHandler = new Handler(this, this.equlistRender);
                    equip_list.selectHandler = new Handler(this, this.equlistSelect);
                    this._viewUI.equip_list.selectedIndex = 0;
                    this._viewUI.mould_lab.text = this.itemAttrData[this.equArr2[0].m_equipMakeInfoData.zhizaofuid].name;
                    this._viewUI.dzEquName_lab.text = this.itemAttrData[this.equArr2[0].m_equipMakeInfoData.tuzhiid].name;
                    this._viewUI.material_lab.text = this.itemAttrData[this.equArr2[0].m_equipMakeInfoData.hantieid].name;
                    this._viewUI.cailiaoName_label.text = this.itemAttrData[this.equArr2[0].m_equipMakeInfoData.qianghuaid].name;
                    var needqianghuaNum = this.equArr2[0].m_equipMakeInfoData.qianghuanum;
                    var isHaveQhNum = this.isHaveCailiaoNum(this.equArr2[0].m_equipMakeInfoData.qianghuaid);
                    this.showNeedNum(needqianghuaNum, isHaveQhNum, this._viewUI.qianghuaNum_label, false);
                    this._viewUI.needMoney_lab.text = this.equArr2[0].moneynum;
                    this.showNeedNum(this.equArr2[0].m_equipMakeInfoData.moneynum, bagModel.getInstance().sliverIcon, this._viewUI.needMoney_lab, true); //显示打造装备需要的银币
                    var tuzhiid = this.equArr2[0].m_equipMakeInfoData.tuzhiid; //图纸id
                    this.showNeedNum(this.equArr2[0].m_equipMakeInfoData.tuzhinum, this.isHaveCailiaoNum(tuzhiid), this._viewUI.equNum_label, false); //打造装需要的图纸数量显示
                    this.equlistSelect(0);
                };
                /**显示装备列表 */
                StrengTheningMakeViewMediator.prototype.equlistRender = function (cell, index) {
                    var equName = cell.getChildByName("equip_btn").getChildByName("equName_label"); //名称
                    var equLevel = cell.getChildByName("equip_btn").getChildByName("equLevel_label"); //等级
                    var equType_label = cell.getChildByName("equip_btn").getChildByName("equType_label"); //类型
                    var equIcon_img = cell.getChildByName("equip_btn").getChildByName("equIcon_img"); //icon
                    var equMark_img = cell.getChildByName("equip_btn").getChildByName("equMark_img"); //是否可穿戴
                    equName.text = this.equArr2[index].m_itemAttrData.name;
                    equLevel.text = this.equArr2[index].m_itemAttrData.level + "级";
                    var iconSkin = "common/icon/item/" + this.equArr2[index].m_itemAttrData.icon + ".png";
                    equIcon_img.skin = iconSkin;
                    var equipId = this.equArr2[index].m_itemAttrData.id;
                    var needCareer = this.equipEffectData[equipId].needCareer;
                    var sexNeed = this.equipEffectData[equipId].sexNeed;
                    var needCareerArr = needCareer.split(";");
                    equMark_img.visible = false;
                    var isCanWear = this.isCanWear(needCareerArr, sexNeed);
                    if (isCanWear == 1) {
                        equMark_img.visible = true;
                    }
                    equType_label.text = this.itemTypeData[this.equArr2[index].m_itemAttrData.itemtypeid].name;
                    var equipBtn = cell.getChildByName("equip_btn");
                    equipBtn.on(LEvent.MOUSE_UP, this, this.onEquipBtn, [index, cell]);
                };
                /** 点击装备*/
                StrengTheningMakeViewMediator.prototype.onEquipBtn = function (index, cell) {
                    var equip_btn = cell.getChildByName("equip_btn");
                    equip_btn.selected = true;
                    if (this.equipSelectCell == null) {
                        this.equipSelectCell = cell;
                        return;
                    }
                    if (this.equipSelectCell != cell) {
                        var btnLeft = this.equipSelectCell.getChildByName("equip_btn");
                        btnLeft.selected = false;
                        this.equipSelectCell = cell;
                    }
                };
                /**
                 * 判断是否能穿戴  0:不能 1：能
                 */
                StrengTheningMakeViewMediator.prototype.isCanWear = function (needCareerArr, sexNeed) {
                    var equipCanWear = 0;
                    var school = game.modules.createrole.models.LoginModel.getInstance().roleDetail.school;
                    var shape = game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape;
                    var sex = this.createRoleConfigBinDic[shape].sex;
                    for (var i in needCareerArr) {
                        if (needCareerArr[i] == school + "") {
                            if (sexNeed == 0 || sex == sexNeed) {
                                equipCanWear = 1;
                            }
                        }
                    }
                    return equipCanWear;
                };
                /**装备列表选择 */
                StrengTheningMakeViewMediator.prototype.equlistSelect = function (index) {
                    var box = this._viewUI.equip_list.getCell(index);
                    var levelLabel = box.getChildByName("equip_btn").getChildByName("equLevel_label");
                    this._viewUI.dzEquLevel_lab.text = levelLabel.text;
                    var icon = this.equArr2[index].m_itemAttrData.icon;
                    this._viewUI.dzequIcon_img.skin = "common/icon/item/" + icon + ".png";
                    var vcailiaotie = this.equArr2[index].m_equipMakeInfoData.vcailiaotie; //材料 寒铁 数组
                    var returnHantieId = this.isHaveCailiao(vcailiaotie);
                    if (returnHantieId > 0) {
                        this._viewUI.material_lab.text = this.itemAttrData[returnHantieId].name; //寒铁名称
                        this._viewUI.htEquLevel_lab.text = this.itemAttrData[returnHantieId].level + "级"; //等级
                        this.showNeedNum(this.equArr2[index].m_equipMakeInfoData.hantienum, this.isHaveCailiaoNum(returnHantieId), this._viewUI.hantieNum_label, false); //数量
                        var hantieIconId = this.itemAttrData[returnHantieId].icon;
                        this._viewUI.hantie_img.skin = "common/icon/item/" + hantieIconId + ".png";
                    }
                    else {
                        var hantieId = this.equArr2[index].m_equipMakeInfoData.hantieid;
                        this._viewUI.material_lab.text = this.itemAttrData[hantieId].name; //寒铁名称
                        this._viewUI.htEquLevel_lab.text = this.itemAttrData[hantieId].level + "级";
                        this.showNeedNum(this.equArr2[index].m_equipMakeInfoData.hantienum, 0, this._viewUI.hantieNum_label, false);
                        var hantieIconId = this.itemAttrData[hantieId].icon;
                        this._viewUI.hantie_img.skin = "common/icon/item/" + hantieIconId + ".png";
                    }
                    var vcailiaozhizaofu = this.equArr2[index].m_equipMakeInfoData.vcailiaozhizaofu; //材料 制造符 数组
                    var returnZhizaofId = this.isHaveCailiao(vcailiaozhizaofu);
                    if (returnZhizaofId > 0) {
                        this._viewUI.mould_lab.text = this.itemAttrData[returnZhizaofId].name; //名称
                        this.showNeedNum(this.equArr2[index].m_equipMakeInfoData.qianghuanum, this.isHaveCailiaoNum(returnZhizaofId), this._viewUI.mujuNum_label, false); //数量
                        var zhizaofuIconId = this.itemAttrData[returnZhizaofId].icon;
                        this._viewUI.mojuIcon_img.skin = "common/icon/item/" + zhizaofuIconId + ".png";
                    }
                    else {
                        var zhizaofuid = this.equArr2[index].m_equipMakeInfoData.zhizaofuid;
                        this._viewUI.mould_lab.text = this.itemAttrData[zhizaofuid].name;
                        this.showNeedNum(this.equArr2[index].m_equipMakeInfoData.qianghuanum, this.isHaveCailiaoNum(returnZhizaofId), this._viewUI.mujuNum_label, false);
                        var zhizaofuIconId = this.itemAttrData[zhizaofuid].icon;
                        this._viewUI.mojuIcon_img.skin = "common/icon/item/" + zhizaofuIconId + ".png";
                    }
                    this._viewUI.dzEquName_lab.text = this.itemAttrData[this.equArr2[index].m_equipMakeInfoData.tuzhiid].name; //图纸名称
                    this._viewUI.cailiaoName_label.text = this.itemAttrData[this.equArr2[index].m_equipMakeInfoData.qianghuaid].name; //材料名称
                    var needqianghuaNum = this.equArr2[index].m_equipMakeInfoData.qianghuanum;
                    var tuzhiid = this.equArr2[index].m_equipMakeInfoData.tuzhiid; //图纸id
                    var qianghuaid = this.equArr2[index].m_equipMakeInfoData.qianghuaid; //强化材料id
                    var isHaveQhNum = this.isHaveCailiaoNum(this.equArr2[index].m_equipMakeInfoData.qianghuaid);
                    this.showNeedNum(needqianghuaNum, isHaveQhNum, this._viewUI.qianghuaNum_label, false);
                    this.showNeedNum(this.equArr2[index].m_equipMakeInfoData.tuzhinum, this.isHaveCailiaoNum(tuzhiid), this._viewUI.equNum_label, false);
                    var tuzhiIconId = this.itemAttrData[tuzhiid].icon; //icon id
                    var qianghuaIconId = this.itemAttrData[qianghuaid].icon;
                    this._viewUI.tuzhi_img.skin = "common/icon/item/" + tuzhiIconId + ".png";
                    this._viewUI.dzqhIcon_img.skin = "common/icon/item/" + qianghuaIconId + ".png";
                    this._viewUI.material_btn.on(LEvent.MOUSE_DOWN, this, this.onItemBtn, [this.equArr2[index].m_equipMakeInfoData.hantieid]);
                    this._viewUI.muju_btn.on(LEvent.MOUSE_DOWN, this, this.onItemBtn, [this.equArr2[index].m_equipMakeInfoData.zhizaofuid]);
                    this._viewUI.paper_btn.on(LEvent.MOUSE_DOWN, this, this.onItemBtn, [this.equArr2[index].m_equipMakeInfoData.tuzhiid]);
                    this._viewUI.specialMaterial_btn.on(LEvent.MOUSE_DOWN, this, this.onItemBtn, [this.equArr2[index].m_equipMakeInfoData.qianghuaid]);
                    var id = this.equArr2[index].m_itemAttrData.id;
                    this._viewUI.preview_btn.on(LEvent.MOUSE_DOWN, this, this.onPreviewBtn, [id]);
                };
                /**显示物品的详情*/
                StrengTheningMakeViewMediator.prototype.onItemBtn = function (itemId) {
                    var parame = new Dictionary();
                    parame.set("itemId", itemId);
                    this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this.app, TIPS_TYPE.QIANGHUA, parame);
                    game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.onComeformBtn, this, this.showComefrom);
                };
                /**显示物品的获取途径 */
                StrengTheningMakeViewMediator.prototype.showComefrom = function (equipid) {
                    this.StrengTheningComefromViewMediator = new strengThening.StrengTheningComefromViewMediator(this._viewUI, this._app, equipid);
                    this.StrengTheningComefromViewMediator.show();
                };
                /**
                 * 查看是否拥有打造材料,返回数量
                 */
                StrengTheningMakeViewMediator.prototype.isHaveCailiaoNum = function (cailiaoId) {
                    for (var i = 0; i < this.m_havegroceryEffectArr.length; i++) {
                        if (this.m_havegroceryEffectArr[i].itemId == cailiaoId) {
                            return this.m_havegroceryEffectArr[i].itemNum;
                        }
                    }
                    return 0;
                };
                /**
                 * 打造材料数组中材料是否拥有，返回材料id
                 */
                StrengTheningMakeViewMediator.prototype.isHaveCailiao = function (vcailiaotie) {
                    for (var i = 0; i < vcailiaotie.length; i++) {
                        for (var j = 0; j < this.m_havegroceryEffectArr.length; j++) {
                            if (vcailiaotie[i] == this.m_havegroceryEffectArr[j].itemId) {
                                return vcailiaotie[i];
                            }
                        }
                    }
                    return -1;
                };
                /**
                 * //显示打造装备材料的数量和银币数量    需要的数量、拥有的数量、label、是不是显示银币(是银币显示的label颜色不同)
                 */
                StrengTheningMakeViewMediator.prototype.showNeedNum = function (needNum, haveNum, label, isMoney) {
                    if (isMoney) {
                        label.text = needNum + "";
                        if (haveNum == undefined) {
                            haveNum == 0;
                        }
                        if (haveNum >= needNum) {
                            label.color = "#FFF2DF";
                        }
                        else {
                            label.color = "#FF2800";
                        }
                    }
                    else {
                        var iHaveNum = 0;
                        if (haveNum > 0) {
                            iHaveNum = haveNum;
                        }
                        label.text = iHaveNum + "/" + needNum;
                        if (haveNum >= needNum) {
                            label.color = "#0A6404";
                        }
                        else {
                            label.color = "#FF2800";
                        }
                    }
                };
                /**显示列表 */
                StrengTheningMakeViewMediator.prototype.showList = function (lsit, arr) {
                    lsit.vScrollBarSkin = "";
                    lsit.array = arr;
                    lsit.repeatY = arr.length;
                    lsit.scrollBar.elasticBackTime = 200;
                    lsit.scrollBar.elasticDistance = 50;
                };
                /**点击打造按钮 */
                StrengTheningMakeViewMediator.prototype.onMakeBtn = function () {
                    var selectIndex = this._viewUI.equip_list.selectedIndex;
                    var makeEquId = this.equArr2[selectIndex].m_equipMakeInfoData.id;
                    var isCheck = this._viewUI.check_ckbox.selected;
                    if (isCheck) {
                        RequesterProtocols._instance.c2s_make_equip(makeEquId, isStrengThening.YES);
                    }
                    else {
                        RequesterProtocols._instance.c2s_make_equip(makeEquId, isStrengThening.NO);
                    }
                    strengThening.models.StrengTheningProxy.getInstance().once(strengThening.models.onErrorCode, this, this.showError);
                };
                /**获取拥有的装备id  宝石id */
                StrengTheningMakeViewMediator.prototype.initHaveEqu = function () {
                    var bag1 = bagModel.getInstance().bagMap[BagTypes.BAG].items;
                    var bag3 = bagModel.getInstance().bagMap[BagTypes.EQUIP].items;
                    var returnBag3 = this.getItems(bag3);
                    var returnBag1 = this.getItems(bag1);
                    this.pushToArr(returnBag3);
                    this.pushToArr(returnBag1);
                };
                /**获取背包数据 */
                StrengTheningMakeViewMediator.prototype.getItems = function (bag) {
                    var idArr = [];
                    for (var i = 0; i < bag.length; i++) {
                        var itemId = bag[i].id; //item id
                        var itemNum = bag[i].number; //item id
                        idArr.push({ itemId: itemId, itemNum: itemNum });
                    }
                    return idArr;
                };
                /**将背包中的物品分类 */
                StrengTheningMakeViewMediator.prototype.pushToArr = function (returnBag) {
                    this.m_havegroceryEffectArr = [];
                    this.m_haveEquArr = [];
                    if (returnBag.length == 0)
                        return;
                    for (var i = 0; i < returnBag.length; i++) {
                        if (108000 <= returnBag[i].itemId && returnBag[i].itemId <= 108812) { //宝石
                            StrengTheningModel._instance.haveGemIdArr.push({ itemId: returnBag[i].itemId, itemNum: returnBag[i].itemNum });
                        }
                        else if (120000 <= returnBag[i].itemId && returnBag[i].itemId <= 126675) { //装备
                            StrengTheningModel._instance.haveEquIdArr.push({ itemId: returnBag[i].itemId, itemNum: returnBag[i].itemNum });
                            this.m_haveEquArr.push({ itemId: returnBag[i].itemId, itemNum: returnBag[i].itemNum });
                        }
                        else if (140000 <= returnBag[i].itemId && returnBag[i].itemId <= 140005) { //策划装备
                            StrengTheningModel._instance.haveEquIdArr.push({ itemId: returnBag[i].itemId, itemNum: returnBag[i].itemNum });
                            this.m_haveEquArr.push({ itemId: returnBag[i].itemId, itemNum: returnBag[i].itemNum });
                        }
                        else if (100000 <= returnBag[i].itemId && returnBag[i].itemId <= 107044) { //杂货
                            StrengTheningModel._instance.havegroceryEffectArr.push({ itemId: returnBag[i].itemId, itemNum: returnBag[i].itemNum });
                            this.m_havegroceryEffectArr.push({ itemId: returnBag[i].itemId, itemNum: returnBag[i].itemNum });
                        }
                    }
                };
                StrengTheningMakeViewMediator.prototype.show = function () {
                    this.initHaveEqu();
                    this.initData();
                    this._StrengTheningInsertViewMediator.initLists();
                    _super.prototype.show.call(this);
                    strengThening.models.StrengTheningProxy.getInstance().on(strengThening.models.OPENZHEZHAO, this, this.openZheZhao);
                    strengThening.models.StrengTheningProxy.getInstance().on(strengThening.models.CLOSEZHEZHAO, this, this.closeZheZhao);
                };
                /** 打开遮罩 */
                StrengTheningMakeViewMediator.prototype.openZheZhao = function () {
                    this._viewUI.zhezhao_img.visible = true;
                };
                /** 关闭遮罩 */
                StrengTheningMakeViewMediator.prototype.closeZheZhao = function () {
                    this._viewUI.zhezhao_img.visible = false;
                };
                StrengTheningMakeViewMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    strengThening.models.StrengTheningProxy.getInstance().off(strengThening.models.OPENZHEZHAO, this, this.openZheZhao);
                    strengThening.models.StrengTheningProxy.getInstance().off(strengThening.models.CLOSEZHEZHAO, this, this.closeZheZhao);
                };
                StrengTheningMakeViewMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return StrengTheningMakeViewMediator;
            }(game.modules.UiMediator));
            strengThening.StrengTheningMakeViewMediator = StrengTheningMakeViewMediator;
        })(strengThening = modules.strengThening || (modules.strengThening = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=StrengTheningMakeViewMediator.js.map