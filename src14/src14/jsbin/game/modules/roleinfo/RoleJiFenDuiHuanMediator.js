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
 * 积分兑换类
 */
var game;
(function (game) {
    var modules;
    (function (modules) {
        var roleinfo;
        (function (roleinfo) {
            var ButtonType;
            (function (ButtonType) {
                /**声望值按钮 */
                ButtonType[ButtonType["countShengWang_btn"] = 1] = "countShengWang_btn";
                /**荣誉值按钮 */
                ButtonType[ButtonType["countRongYu_btn"] = 2] = "countRongYu_btn";
                /**门派贡献值按钮 */
                ButtonType[ButtonType["countGongXian_btn"] = 3] = "countGongXian_btn";
            })(ButtonType || (ButtonType = {}));
            /**透明提示 */
            var tip;
            (function (tip) {
                /** 达到每日限购上限*/
                tip[tip["LIMIT_NUM"] = 160400] = "LIMIT_NUM";
                /**声望不足 */
                tip[tip["SHENGWANG_NUM"] = 420011] = "SHENGWANG_NUM";
                /**荣誉不足 */
                tip[tip["RONGYU_NUM"] = 420012] = "RONGYU_NUM";
                /**门派贡献 */
                tip[tip["MENGPAIGONGXIAN_NUM"] = 420013] = "MENGPAIGONGXIAN_NUM";
            })(tip || (tip = {}));
            var RoleJiFenDuiHuanMediator = /** @class */ (function (_super) {
                __extends(RoleJiFenDuiHuanMediator, _super);
                function RoleJiFenDuiHuanMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    /**声望商店当前选中列表项下标 */
                    _this.selectNum = 0;
                    /**荣誉商店当前选中列表项下标 */
                    _this.selectRongYuNum = 0;
                    _this._viewUI = new ui.common.RoleJiFenDuiHuanUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this.isCenter = true;
                    _this._app = app;
                    _this._XiaoJianPanMediator = new modules.tips.XiaoJianPanMediator(_this._viewUI);
                    _this.tips = new game.modules.commonUI.DisappearMessageTipsMediator(_this._app);
                    _this.initialize();
                    _this.init();
                    _this.registerEvent();
                    _this.eventListener();
                    return _this;
                }
                /**注册事件监听 */
                RoleJiFenDuiHuanMediator.prototype.eventListener = function () {
                    modules.mainhud.models.HudProxy.getInstance().on(modules.mainhud.models.SRefreshRoleCurrency_EVENT, this, this.onRefreshRoleCurrency);
                    roleinfo.models.RoleInfoProxy.getInstance().on(roleinfo.models.SBeginSchoolWheel_EVENT, this, this.onBeginSchoolWheel);
                    roleinfo.models.RoleInfoProxy.getInstance().on(roleinfo.models.SQueryLimit_EVENT, this, this.onQueryLimit);
                    roleinfo.models.RoleInfoProxy.getInstance().on(roleinfo.models.SSendHelpSW_EVENT, this, this.onSendHelpSW);
                    modules.tips.models.TipsProxy.getInstance().on(modules.tips.models.ON_KRYBOARD, this, this.onKeyboard);
                };
                /**初始化 */
                RoleJiFenDuiHuanMediator.prototype.initialize = function () {
                    this.shengwangNameArr = new Array();
                    this.shengwangMoneyArr = new Array();
                    this.shengwangImgArr = new Array();
                    this.shengwangArr = new Array();
                    this.shengwangIdArr = new Array();
                    this.shengwangLimitNumDic = new Laya.Dictionary();
                    this.rongYuArr = new Array();
                    this.rongYuIdArr = new Array();
                    this.rongYuMoneyArr = new Array();
                    this.rongYuNameArr = new Array();
                    this.rongyuImageArr = new Array();
                    this.rongyuLimitNumDic = new Laya.Dictionary();
                    this.zhuanpanIdArr = new Array();
                    this.zhuanpanRateArr = new Array();
                    this.buyShengwangNumDic = new Laya.Dictionary();
                    this.buyRongyuNumDic = new Laya.Dictionary();
                    this.keyNumDic = new Dictionary();
                    this.CNpcSaleObj = RoleInfoModel.getInstance().CNpcSaleBinDic;
                    this.CGoodsObj = ShopModel.getInstance().GoodsBinDic;
                    this.CItemAttrObj = BagModel.getInstance().itemAttrData;
                    this.CSchoolWheelObj = RoleInfoModel.getInstance().CSchoolWheelBinDic;
                };
                /**注册点击监听 */
                RoleJiFenDuiHuanMediator.prototype.registerEvent = function () {
                    this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
                    this._viewUI.countShengWang_btn.on(LEvent.MOUSE_DOWN, this, this.clickShengwangBtnEvent);
                    this._viewUI.countRongYu_btn.on(LEvent.MOUSE_DOWN, this, this.clickRongyuBtnEvent);
                    this._viewUI.countGongXian_btn.on(LEvent.MOUSE_DOWN, this, this.clickGongxianBtnEvent);
                    this._viewUI.jiaShengWang_btn.on(LEvent.MOUSE_DOWN, this, this.jiaShengWang);
                    this._viewUI.jianShengWang_btn.on(LEvent.MOUSE_DOWN, this, this.jianShengWang);
                    this._viewUI.jiaRongYu_btn.on(LEvent.MOUSE_DOWN, this, this.jiaRongYu);
                    this._viewUI.jianRongYu_btn.on(LEvent.MOUSE_DOWN, this, this.jianRongYu);
                    this._viewUI.start_btn.on(LEvent.MOUSE_DOWN, this, this.xuanZhuan);
                    this._viewUI.shengWangBuy_btn.on(LEvent.MOUSE_DOWN, this, this.shengWangBuy);
                    this._viewUI.rongYuBuy_btn.on(LEvent.MOUSE_DOWN, this, this.rongYuBuy);
                    this._viewUI.shengWangItemNum_lab.on(LEvent.MOUSE_DOWN, this, this.xiaojianPan);
                    this._viewUI.rongYuItemNum_lab.on(LEvent.MOUSE_DOWN, this, this.xiaojianPan);
                    this._viewUI.tip_btn.on(LEvent.MOUSE_DOWN, this, this.showTip);
                };
                /**显示弹窗信息 */
                RoleJiFenDuiHuanMediator.prototype.showTip = function () {
                    //根据当前打开面板，显示不同提示
                    var param = new Dictionary();
                    if (this._viewUI.shengWangDuiHuan_box.visible) {
                        param.set("title", RoleEnum.SHENGWANG_TITLE);
                        param.set("contentId", RoleEnum.SHENGWANG_TIP);
                        var arr = [this.yuanzhuShengwangNum, RoleEnum.MAX_YUANZHU];
                        param.set("parame", arr);
                        this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENTMESSAGE, param);
                    }
                    else if (this._viewUI.rongYuDuiHuan_box.visible) {
                        param.set("title", RoleEnum.RONGYU_TITLE);
                        param.set("contentId", RoleEnum.RONGYU_TIP);
                        this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENTMESSAGE, param);
                    }
                    else if (this._viewUI.zhuanPanDuiHuan_box.visible) {
                        param.set("title", RoleEnum.SCHOOL_TITLE);
                        param.set("contentId", RoleEnum.SCHOOL_TIP);
                        this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENTMESSAGE, param);
                    }
                };
                /**接收小键盘输入 */
                RoleJiFenDuiHuanMediator.prototype.onKeyboard = function (num) {
                    //当前页面是否打开，否则会与药品商店的监听起冲突
                    if (this.key) {
                        //如果num不为-2，说明没有点击关闭按钮
                        if (num != -2) {
                            //点击清除按钮
                            if (num == -1) {
                                //声望商店打开
                                if (this._viewUI.shengWangDuiHuan_box.visible) {
                                    var moneyLab = this._viewUI.duihuan_list.getCell(this.selectNum).getChildByName("exchangeMoney_lab");
                                    var str = this.keyNumDic.get(RoleEnum.SHENGWANG_SHOP);
                                    //判断小键盘输入字符串长度
                                    if (str.length == 1) {
                                        str = (num + 2).toString();
                                        this.keyNumDic.set(RoleEnum.SHENGWANG_SHOP, "");
                                    }
                                    else if (str.length == 2) {
                                        str = str.substring(0, str.length - 1);
                                        this.keyNumDic.set(RoleEnum.SHENGWANG_SHOP, str);
                                    }
                                    else
                                        return;
                                    this._viewUI.shengWangHuaFei_lab.text = (parseInt(moneyLab.text) * parseInt(str)).toString(); //花费
                                    this._viewUI.shengWangItemNum_lab.text = str; //购买数量
                                    this.buyShengwangNumDic.set(this.selectNum, parseInt(str));
                                }
                                //荣誉商店打开
                                else if (this._viewUI.rongYuDuiHuan_box.visible) {
                                    var moneyLab = this._viewUI.rongYu_list.getCell(this.selectRongYuNum).getChildByName("exchangeMoney_lab");
                                    var str = this.keyNumDic.get(RoleEnum.RONGYU_SHOP);
                                    //判断小键盘输入字符串长度
                                    if (str.length == 1) {
                                        str = (num + 2).toString();
                                        this.keyNumDic.set(RoleEnum.RONGYU_SHOP, "");
                                    }
                                    else if (str.length == 2) {
                                        str = str.substring(0, str.length - 1);
                                        this.keyNumDic.set(RoleEnum.RONGYU_SHOP, str);
                                    }
                                    else
                                        return;
                                    this._viewUI.rongYuHuaFei_lab.text = (parseInt(moneyLab.text) * parseInt(str)).toString();
                                    this._viewUI.rongYuItemNum_lab.text = str;
                                    this.buyRongyuNumDic.set(this.selectRongYuNum, parseInt(str));
                                }
                            }
                            else {
                                //声望商店
                                if (this._viewUI.shengWangDuiHuan_box.visible) {
                                    var moneyLab = this._viewUI.duihuan_list.getCell(this.selectNum).getChildByName("exchangeMoney_lab");
                                    var limitNumLab = this._viewUI.duihuan_list.getCell(this.selectNum).getChildByName("limitNum_lab"); //限购数量
                                    var str = this.keyNumDic.get(RoleEnum.SHENGWANG_SHOP);
                                    if (str.length < 1) {
                                        //第一个输入的数字不能为0
                                        if (num == 0 && str.length == 0)
                                            return;
                                        //输入数字大于限购数量
                                        if (num > parseInt(limitNumLab.text)) {
                                            str += limitNumLab.text;
                                            var prompt_1 = HudModel.getInstance().promptAssembleBack(PromptExplain.INPUT_MAX_LIMIT);
                                            this.tips.onShow(prompt_1);
                                        }
                                        else
                                            str += num.toString();
                                        this.keyNumDic.set(RoleEnum.SHENGWANG_SHOP, str);
                                    }
                                    else if (str.length == 1) {
                                        str = limitNumLab.text;
                                        this.keyNumDic.set(RoleEnum.SHENGWANG_SHOP, str);
                                        var prompt_2 = HudModel.getInstance().promptAssembleBack(PromptExplain.INPUT_MAX_LIMIT);
                                        this.tips.onShow(prompt_2);
                                    }
                                    else {
                                        var prompt_3 = HudModel.getInstance().promptAssembleBack(PromptExplain.INPUT_MAX_LIMIT);
                                        this.tips.onShow(prompt_3);
                                    }
                                    this._viewUI.shengWangHuaFei_lab.text = (parseInt(moneyLab.text) * parseInt(str)).toString(); //公式 花费 = 单价 * 购买数量
                                    this._viewUI.shengWangItemNum_lab.text = str;
                                    this.buyShengwangNumDic.set(this.selectNum, parseInt(str));
                                }
                                // 荣誉商店
                                else if (this._viewUI.rongYuDuiHuan_box.visible) {
                                    var moneyLab = this._viewUI.rongYu_list.getCell(this.selectRongYuNum).getChildByName("exchangeMoney_lab");
                                    var limitNumLab = this._viewUI.rongYu_list.getCell(this.selectRongYuNum).getChildByName("limitNum_lab");
                                    //输入两位数
                                    var str = this.keyNumDic.get(RoleEnum.RONGYU_SHOP);
                                    if (str.length < 1) {
                                        //第一个输入的数字不能为0
                                        if (num == 0 && str.length == 0)
                                            return;
                                        //输入数字大于限购数量
                                        if (num > parseInt(limitNumLab.text)) {
                                            str += limitNumLab.text;
                                            var prompt_4 = HudModel.getInstance().promptAssembleBack(PromptExplain.INPUT_MAX_LIMIT);
                                            this.tips.onShow(prompt_4);
                                        }
                                        else
                                            str += num.toString();
                                        this.keyNumDic.set(RoleEnum.RONGYU_SHOP, str);
                                    }
                                    else if (str.length == 1) {
                                        str = limitNumLab.text;
                                        this.keyNumDic.set(RoleEnum.RONGYU_SHOP, str);
                                        var prompt_5 = HudModel.getInstance().promptAssembleBack(PromptExplain.INPUT_MAX_LIMIT);
                                        this.tips.onShow(prompt_5);
                                    }
                                    else {
                                        var prompt_6 = HudModel.getInstance().promptAssembleBack(PromptExplain.INPUT_MAX_LIMIT);
                                        this.tips.onShow(prompt_6);
                                    }
                                    this._viewUI.rongYuHuaFei_lab.text = (parseInt(moneyLab.text) * parseInt(str)).toString(); //公式 花费 = 单价 * 购买数量
                                    this._viewUI.rongYuItemNum_lab.text = str;
                                    this.buyRongyuNumDic.set(this.selectRongYuNum, parseInt(str));
                                }
                            }
                        }
                        else {
                            //关闭小键盘，清空记录
                            this.keyNumDic.set(RoleEnum.SHENGWANG_SHOP, "");
                            this.keyNumDic.set(RoleEnum.RONGYU_SHOP, "");
                        }
                    }
                };
                /** 援助声望当前值*/
                RoleJiFenDuiHuanMediator.prototype.onSendHelpSW = function (e) {
                    var data = roleinfo.models.RoleInfoModel.getInstance().SSendHelpSWData.get("data");
                    this.yuanzhuShengwangNum = data.helpsw;
                };
                /** 商品限购次数查询*/
                RoleJiFenDuiHuanMediator.prototype.onQueryLimit = function (e) {
                    var data = roleinfo.models.RoleInfoModel.getInstance().SQueryLimitData.get("data");
                    for (var i = 0; i < data.goodslimits.length; i++) {
                        //声望商店物品限购数量刷新
                        for (var j = 0; j < this.shengwangArr.length; j++) {
                            if (data.goodslimits[i].goodsid == this.shengwangArr[j]) {
                                var moneyLab = this._viewUI.duihuan_list.getCell(this.selectNum).getChildByName("exchangeMoney_lab");
                                var limitNum = RoleEnum.LIMIT_NUM - data.goodslimits[i].number;
                                this.shengwangLimitNumDic.set(this.shengwangArr[j], limitNum);
                                //刷新购买数量
                                if (limitNum != RoleEnum.LIMIT_NUM) {
                                    var str = "1";
                                    this._viewUI.shengWangHuaFei_lab.text = (parseInt(moneyLab.text) * parseInt(str)).toString();
                                    this._viewUI.shengWangItemNum_lab.text = str;
                                    this.buyShengwangNumDic.set(this.selectNum, parseInt(str));
                                }
                            }
                        }
                        //荣誉商店物品限购数量刷新
                        for (var k = 0; k < this.rongYuArr.length; k++) {
                            if (data.goodslimits[i].goodsid == this.rongYuArr[k]) {
                                var moneyLab = this._viewUI.rongYu_list.getCell(this.selectRongYuNum).getChildByName("exchangeMoney_lab");
                                var limitNum = RoleEnum.LIMIT_NUM - data.goodslimits[i].number;
                                this.rongyuLimitNumDic.set(this.rongYuArr[k], limitNum);
                                //刷新购买数量
                                if (limitNum != RoleEnum.LIMIT_NUM) {
                                    var str = "1";
                                    this._viewUI.rongYuHuaFei_lab.text = (parseInt(moneyLab.text) * parseInt(str)).toString();
                                    this._viewUI.rongYuItemNum_lab.text = str;
                                    this.buyRongyuNumDic.set(this.selectRongYuNum, parseInt(str));
                                }
                            }
                        }
                    }
                    this.getListData();
                };
                /**购买声望商店物品*/
                RoleJiFenDuiHuanMediator.prototype.shengWangBuy = function () {
                    //超出每日限购数量
                    var limitNumLab = this.shengwangLimitNumDic.get(this.shengwangArr[this.selectNum]);
                    if (limitNumLab == 0) {
                        var prompt_7 = HudModel.getInstance().promptAssembleBack(tip.LIMIT_NUM);
                        this.tips.onShow(prompt_7);
                        return;
                    }
                    //声望值不足
                    if (parseInt(this._viewUI.shengWangHuaFei_lab.text) > parseInt(this._viewUI.shengWangHaveNum_lab.text)) {
                        var prompt_8 = HudModel.getInstance().promptAssembleBack(tip.SHENGWANG_NUM);
                        this.tips.onShow(prompt_8);
                        return;
                    }
                    /**
                     * 声望商店购买协议
                     * 商店序号
                     * 商品id
                     * 买卖数量
                     * 购买类型
                     */
                    RequesterProtocols._instance.c2s_exchange_shop(RoleEnum.SHENGWANG_SHOP_ID, this.shengwangArr[this.selectNum], this.buyShengwangNumDic.get(this.selectNum), RoleEnum.BUY_TYPE);
                };
                /**购买荣誉商店物品 */
                RoleJiFenDuiHuanMediator.prototype.rongYuBuy = function () {
                    //超出每日限购数量
                    var limitNumLab = this.rongyuLimitNumDic.get(this.rongYuArr[this.selectRongYuNum]);
                    if (limitNumLab == 0) {
                        var prompt_9 = HudModel.getInstance().promptAssembleBack(tip.LIMIT_NUM);
                        this.tips.onShow(prompt_9);
                        return;
                    }
                    //荣誉值不足
                    if (parseInt(this._viewUI.rongYuHuaFei_lab.text) > parseInt(this._viewUI.rongYuHaveNum_lab.text)) {
                        var prompt_10 = HudModel.getInstance().promptAssembleBack(tip.RONGYU_NUM);
                        this.tips.onShow(prompt_10);
                        return;
                    }
                    /**
                     * 荣誉商店购买协议
                     * 商店序号
                     * 商品id
                     * 买卖数量
                     * 购买类型
                     */
                    RequesterProtocols._instance.c2s_exchange_shop(RoleEnum.RONGYU_SHOP_ID, this.rongYuArr[this.selectRongYuNum], this.buyRongyuNumDic.get(this.selectRongYuNum), RoleEnum.BUY_TYPE);
                };
                /**转盘旋转 */
                RoleJiFenDuiHuanMediator.prototype.xuanZhuan = function () {
                    //判断贡献是否足够
                    if (parseInt(this._viewUI.gongXianHaveNum_lab.text) > RoleEnum.COST_SCHOOL_NUM) {
                        this._viewUI.zhuanPan_img.rotation = 0;
                        this._viewUI.start_btn.visible = false;
                        RequesterProtocols._instance.c2s_CBeginSchoolWheeld(); //开始转盘协议
                        Laya.timer.frameLoop(1, this, this.animate);
                    }
                    else {
                        var prompt_11 = HudModel.getInstance().promptAssembleBack(tip.MENGPAIGONGXIAN_NUM);
                        this.tips.onShow(prompt_11);
                        return;
                    }
                };
                RoleJiFenDuiHuanMediator.prototype.animate = function (e) {
                    this._viewUI.zhuanPan_img.rotation += 3;
                    //根据结果旋转不同的角度
                    switch (this.randomNum) {
                        case this.zhuanpanIdArr[0]:
                            if (this._viewUI.zhuanPan_img.rotation == 945) {
                                Laya.timer.clear(this, this.animate);
                                this._viewUI.tipItem_img.skin = "common/icon/item/20131.png";
                                this._viewUI.start_btn.visible = true;
                                RequesterProtocols._instance.c2s_CEndSchoolWheel(); //结束转盘协议
                            }
                            break;
                        case this.zhuanpanIdArr[1]:
                            if (this._viewUI.zhuanPan_img.rotation == 990) {
                                Laya.timer.clear(this, this.animate);
                                this._viewUI.tipItem_img.skin = "common/icon/item/20096.png";
                                this._viewUI.start_btn.visible = true;
                                RequesterProtocols._instance.c2s_CEndSchoolWheel();
                            }
                            break;
                        case this.zhuanpanIdArr[2]:
                            if (this._viewUI.zhuanPan_img.rotation == 1035) {
                                Laya.timer.clear(this, this.animate);
                                this._viewUI.tipItem_img.skin = "common/icon/item/20060.png";
                                this._viewUI.start_btn.visible = true;
                                RequesterProtocols._instance.c2s_CEndSchoolWheel();
                            }
                            break;
                        case this.zhuanpanIdArr[3]:
                            if (this._viewUI.zhuanPan_img.rotation == 1080) {
                                Laya.timer.clear(this, this.animate);
                                this._viewUI.tipItem_img.skin = "common/icon/item/20097.png";
                                this._viewUI.start_btn.visible = true;
                                RequesterProtocols._instance.c2s_CEndSchoolWheel();
                            }
                            break;
                        case this.zhuanpanIdArr[4]:
                            if (this._viewUI.zhuanPan_img.rotation == 765) {
                                Laya.timer.clear(this, this.animate);
                                this._viewUI.tipItem_img.skin = "common/icon/item/20096.png";
                                this._viewUI.start_btn.visible = true;
                                RequesterProtocols._instance.c2s_CEndSchoolWheel();
                            }
                            break;
                        case this.zhuanpanIdArr[5]:
                            if (this._viewUI.zhuanPan_img.rotation == 810) {
                                Laya.timer.clear(this, this.animate);
                                this._viewUI.tipItem_img.skin = "common/icon/item/20053.png";
                                this._viewUI.start_btn.visible = true;
                                RequesterProtocols._instance.c2s_CEndSchoolWheel();
                            }
                            break;
                        case this.zhuanpanIdArr[6]:
                            if (this._viewUI.zhuanPan_img.rotation == 855) {
                                Laya.timer.clear(this, this.animate);
                                this._viewUI.tipItem_img.skin = "common/icon/item/20051.png";
                                this._viewUI.start_btn.visible = true;
                                RequesterProtocols._instance.c2s_CEndSchoolWheel();
                            }
                            break;
                        case this.zhuanpanIdArr[7]:
                            if (this._viewUI.zhuanPan_img.rotation == 900) {
                                Laya.timer.clear(this, this.animate);
                                this._viewUI.tipItem_img.skin = "common/icon/item/20094.png";
                                this._viewUI.start_btn.visible = true;
                                RequesterProtocols._instance.c2s_CEndSchoolWheel();
                            }
                            break;
                    }
                };
                /**刷新人物通货的消息 */
                RoleJiFenDuiHuanMediator.prototype.onRefreshRoleCurrency = function (e) {
                    this._viewUI.gongXianHaveNum_lab.text = HudModel.getInstance().zhiyeNum.toString(); //职业贡献
                    this._viewUI.shengWangHaveNum_lab.text = HudModel.getInstance().shengwangNum.toString(); //声望值
                    this._viewUI.rongYuHaveNum_lab.text = HudModel.getInstance().rongyuNum.toString(); //荣誉值
                };
                /**接受服务端发来的转盘结果 */
                RoleJiFenDuiHuanMediator.prototype.onBeginSchoolWheel = function (e) {
                    var data = roleinfo.models.RoleInfoModel.getInstance().SBeginSchoolWheelData.get("data");
                    if (data != undefined) {
                        this.randomNum = this.zhuanpanIdArr[data.wheelindex];
                    }
                };
                /**初始化界面 */
                RoleJiFenDuiHuanMediator.prototype.init = function () {
                    //转盘物品图片
                    this._viewUI.item0_img.skin = "common/icon/item/20131.png";
                    this._viewUI.item1_img.skin = "common/icon/item/20096.png";
                    this._viewUI.item2_img.skin = "common/icon/item/20060.png";
                    this._viewUI.item3_img.skin = "common/icon/item/20097.png";
                    this._viewUI.item4_img.skin = "common/icon/item/20096.png";
                    this._viewUI.item5_img.skin = "common/icon/item/20053.png";
                    this._viewUI.item6_img.skin = "common/icon/item/20051.png";
                    this._viewUI.item7_img.skin = "common/icon/item/20094.png";
                    this._viewUI.tipItem_img.skin = "common/icon/item/20097.png";
                    for (var i = 0; i < this.CSchoolWheelObj[1]["items"].length; i++) {
                        var str = this.CSchoolWheelObj[1]["items"][i];
                        var spit = str.split(";");
                        this.zhuanpanIdArr.push(spit[0]);
                        this.zhuanpanRateArr.push(spit[2]);
                    }
                    for (var i = 0; i < this.CNpcSaleObj[7]["goodsids"].length; i++) {
                        this.shengwangArr.push(this.CNpcSaleObj[7]["goodsids"][i]);
                    }
                    for (var i = 0; i < this.shengwangArr.length; i++) {
                        this.shengwangIdArr.push(this.CGoodsObj[this.shengwangArr[i]]["itemId"]);
                    }
                    //初始化声望商店物品兑换价格
                    for (var i = 0; i < this.shengwangArr.length; i++) {
                        var data = {};
                        data[i] = { Label: this.CGoodsObj[this.shengwangArr[i]]["prices"][0] };
                        this.shengwangMoneyArr.push(data[i]);
                    }
                    //初始化声望商店物品名称
                    for (var i = 0; i < this.shengwangIdArr.length; i++) {
                        var data = {};
                        data[i] = { Label: this.CItemAttrObj[this.shengwangIdArr[i]]["name"] };
                        this.shengwangNameArr.push(data[i]);
                    }
                    //初始化声望物品购买数量
                    for (var i = 0; i < this.shengwangNameArr.length; i++) {
                        this.buyShengwangNumDic.set(i, 0);
                    }
                    for (var i = 0; i < this.CNpcSaleObj[8]["goodsids"].length; i++) {
                        this.rongYuArr.push(this.CNpcSaleObj[8]["goodsids"][i]);
                    }
                    for (var i = 0; i < this.rongYuArr.length; i++) {
                        this.rongYuIdArr.push(this.CGoodsObj[this.rongYuArr[i]]["itemId"]);
                    }
                    //请求声望商店物品限购次数
                    RequesterProtocols._instance.c2s_query_limit(1, this.shengwangArr);
                    //初始化荣誉商店物品兑换价格
                    for (var i = 0; i < this.rongYuArr.length; i++) {
                        var data = {};
                        data[i] = { Label: this.CGoodsObj[this.rongYuArr[i]]["prices"][0] };
                        this.rongYuMoneyArr.push(data[i]);
                    }
                    //初始化声望商店物品名称
                    for (var i = 0; i < this.rongYuIdArr.length; i++) {
                        var data = {};
                        data[i] = { Label: this.CItemAttrObj[this.rongYuIdArr[i]]["name"] };
                        this.rongYuNameArr.push(data[i]);
                    }
                    //初始化荣誉物品购买数量
                    for (var i = 0; i < this.rongYuNameArr.length; i++) {
                        this.buyRongyuNumDic.set(i, 0);
                    }
                    //请求荣誉商店物品限购次数
                    RequesterProtocols._instance.c2s_query_limit(1, this.rongYuArr);
                    this.shengwangImgArr = [{ Label: "common/icon/item/20001.png" }, { Label: "common/icon/item/20002.png" }, { Label: "common/icon/item/20003.png" }, { Label: "common/icon/item/20004.png" }, { Label: "common/icon/item/20060.png" }, { Label: "common/icon/item/20061.png" }];
                    this.rongyuImageArr = [{ Label: "common/icon/item/20058.png" }];
                    this._viewUI.shengWangIcon1_img.skin = "common/icon/item/20109.png";
                    this._viewUI.shengWangIcon2_img.skin = "common/icon/item/20109.png";
                    this._viewUI.rongYuIcon1_img.skin = "common/icon/item/20107.png";
                    this._viewUI.rongYuIcon2_img.skin = "common/icon/item/20107.png";
                    //初始化小键盘map
                    this.keyNumDic.set(RoleEnum.SHENGWANG_SHOP, "");
                    this.keyNumDic.set(RoleEnum.RONGYU_SHOP, "");
                    this.getListData();
                };
                /**打开小键盘 */
                RoleJiFenDuiHuanMediator.prototype.xiaojianPan = function (e) {
                    var xPos = e.currentTarget.mouseX + 130;
                    var yPos = e.currentTarget.mouseY + 735;
                    this._XiaoJianPanMediator.onShow(xPos, yPos);
                };
                RoleJiFenDuiHuanMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                    this.switchButton(ButtonType.countShengWang_btn);
                    this.switchChildUI(ButtonType.countShengWang_btn);
                    this.initNum();
                    this.onSelect(0);
                    this.onRongyuSelect(0);
                    this.key = true;
                    RequesterProtocols._instance.c2s_CSendHelpSW(); //援助声望当前值
                };
                /**初始化角色身上货币 */
                RoleJiFenDuiHuanMediator.prototype.initNum = function () {
                    this._viewUI.gongXianHaveNum_lab.text = HudModel.getInstance().zhiyeNum.toString(); //职业贡献
                    this._viewUI.shengWangHaveNum_lab.text = HudModel.getInstance().shengwangNum.toString(); //声望值
                    this._viewUI.rongYuHaveNum_lab.text = HudModel.getInstance().rongyuNum.toString(); //荣誉值
                    this._viewUI.gongXianHuaFei_lab.text = RoleEnum.COST_SCHOOL_NUM.toString(); //初始化转盘花费值
                };
                /**渲染列表 */
                RoleJiFenDuiHuanMediator.prototype.getListData = function () {
                    this._viewUI.duihuan_list.vScrollBarSkin = "";
                    this._viewUI.duihuan_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.duihuan_list.scrollBar.elasticDistance = 50;
                    this._viewUI.duihuan_list.array = this.shengwangNameArr;
                    this._viewUI.duihuan_list.renderHandler = new Handler(this, this.onRender);
                    this._viewUI.duihuan_list.selectHandler = new Handler(this, this.onSelect);
                    this._viewUI.duihuan_list.selectedIndex = -1;
                    this._viewUI.rongYu_list.vScrollBarSkin = "";
                    this._viewUI.rongYu_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.rongYu_list.scrollBar.elasticDistance = 50;
                    this._viewUI.rongYu_list.array = this.rongYuArr;
                    this._viewUI.rongYu_list.renderHandler = new Handler(this, this.onRongyuRender);
                    this._viewUI.rongYu_list.selectHandler = new Handler(this, this.onRongyuSelect);
                    this._viewUI.rongYu_list.selectedIndex = -1;
                };
                RoleJiFenDuiHuanMediator.prototype.onRender = function (cell, index) {
                    if (index > this.shengwangArr.length)
                        return;
                    var nameLab = cell.getChildByName("itemName_lab");
                    var moneyLab = cell.getChildByName("exchangeMoney_lab");
                    var itemImg = cell.getChildByName("itemImg_img");
                    var moneyImg = cell.getChildByName("exchangeMoneyIcon_img");
                    var shoukongImg = cell.getChildByName("shoukong_img");
                    var itemBtn = cell.getChildByName("item_btn");
                    var limitNumLab = cell.getChildByName("limitNum_lab");
                    var bgImg = cell.getChildByName("bg_img");
                    //渲染除选中按钮外，列表其他按钮的颜色
                    if (index != this.selectNum) {
                        bgImg.skin = "common/ui/tongyong/btn2.png";
                    }
                    nameLab.changeText(this.shengwangNameArr[index].Label);
                    moneyLab.changeText(this.shengwangMoneyArr[index].Label);
                    //如果当前物品售空，显示售空图片
                    if (this.shengwangLimitNumDic.get(this.shengwangArr[index]) != 0) {
                        limitNumLab.visible = true;
                        shoukongImg.visible = false;
                        limitNumLab.text = this.shengwangLimitNumDic.get(this.shengwangArr[index]);
                    }
                    else {
                        limitNumLab.visible = false;
                        shoukongImg.visible = true;
                        limitNumLab.text = "1";
                    }
                    itemImg.skin = this.shengwangImgArr[index].Label;
                    moneyImg.skin = "common/icon/item/20109.png";
                };
                RoleJiFenDuiHuanMediator.prototype.onRongyuRender = function (cell, index) {
                    if (index > this.rongYuArr.length)
                        return;
                    var nameLab = cell.getChildByName("itemName_lab");
                    var moneyLab = cell.getChildByName("exchangeMoney_lab");
                    var itemImg = cell.getChildByName("itemImg_img");
                    var moneyImg = cell.getChildByName("exchangeMoneyIcon_img");
                    var shoukongImg = cell.getChildByName("shoukong_img");
                    var itemBtn = cell.getChildByName("item_btn");
                    var limitNumLab = cell.getChildByName("limitNum_lab");
                    var bgImg = cell.getChildByName("bg_img");
                    //渲染除选中按钮外，列表其他按钮的颜色
                    if (index != this.selectNum) {
                        bgImg.skin = "common/ui/tongyong/btn2.png";
                    }
                    nameLab.changeText(this.rongYuNameArr[index].Label);
                    moneyLab.changeText(this.rongYuMoneyArr[index].Label);
                    //如果当前物品售空，显示售空图片
                    if (this.rongyuLimitNumDic.get(this.rongYuArr[index]) != 0) {
                        limitNumLab.visible = true;
                        shoukongImg.visible = false;
                        limitNumLab.text = this.rongyuLimitNumDic.get(this.rongYuArr[index]);
                    }
                    else {
                        limitNumLab.visible = false;
                        shoukongImg.visible = true;
                        limitNumLab.text = "1";
                    }
                    itemImg.skin = this.rongyuImageArr[index].Label;
                    moneyImg.skin = "common/icon/item/20107.png";
                };
                RoleJiFenDuiHuanMediator.prototype.onSelect = function (index) {
                    if (index != -1) {
                        this.selectNum = index;
                        var moneyLab = this._viewUI.duihuan_list.getCell(this.selectNum).getChildByName("exchangeMoney_lab");
                        var bgImg = this._viewUI.duihuan_list.getCell(this.selectNum).getChildByName("bg_img");
                        var limitNumLab = this._viewUI.duihuan_list.getCell(this.selectNum).getChildByName("limitNum_lab");
                        //点击按钮更换图片
                        bgImg.skin = "common/ui/tongyong/btn1.png";
                        //初始化每个物品的购买数量
                        var tempNum = this.buyShengwangNumDic.get(this.selectNum);
                        //如果限售数量大于当前物品的购买数量
                        if (parseInt(limitNumLab.text) > tempNum) {
                            tempNum++;
                            this.buyShengwangNumDic.set(this.selectNum, tempNum);
                            for (var i = 0; i < this.shengwangNameArr.length; i++) {
                                if (i != this.selectNum)
                                    this.buyShengwangNumDic.set(i, 0);
                            }
                            this._viewUI.shengWangHuaFei_lab.text = (parseInt(moneyLab.text) * tempNum).toString();
                            this._viewUI.shengWangItemNum_lab.text = tempNum.toString();
                        }
                        this._viewUI.duihuan_list.selectedIndex = -1;
                    }
                };
                RoleJiFenDuiHuanMediator.prototype.onRongyuSelect = function (index) {
                    if (index != -1) {
                        this.selectRongYuNum = index;
                        var moneyLab = this._viewUI.rongYu_list.getCell(this.selectRongYuNum).getChildByName("exchangeMoney_lab");
                        var bgImg = this._viewUI.rongYu_list.getCell(this.selectNum).getChildByName("bg_img");
                        var limitNumLab = this._viewUI.rongYu_list.getCell(this.selectRongYuNum).getChildByName("limitNum_lab");
                        //点击按钮更换图片
                        bgImg.skin = "common/ui/tongyong/btn1.png";
                        //初始化每个物品的购买数量
                        var tempNum = this.buyRongyuNumDic.get(this.selectRongYuNum);
                        //如果限售数量大于当前物品的购买数量
                        if (parseInt(limitNumLab.text) > tempNum) {
                            tempNum++;
                            this.buyRongyuNumDic.set(this.selectRongYuNum, tempNum);
                            for (var i = 0; i < this.rongYuArr.length; i++) {
                                if (i != this.selectRongYuNum)
                                    this.buyRongyuNumDic.set(i, 0);
                            }
                            this._viewUI.rongYuHuaFei_lab.text = (parseInt(moneyLab.text) * tempNum).toString();
                            this._viewUI.rongYuItemNum_lab.text = tempNum.toString();
                        }
                        this._viewUI.rongYu_list.selectedIndex = -1;
                    }
                };
                /**点击声望物品购买加号 */
                RoleJiFenDuiHuanMediator.prototype.jiaShengWang = function () {
                    var tempNum = this.buyShengwangNumDic.get(this.selectNum);
                    var limitNumLab = this._viewUI.duihuan_list.getCell(this.selectNum).getChildByName("limitNum_lab");
                    //如果限售数量大于当前物品的购买数量
                    if (tempNum < parseInt(limitNumLab.text)) {
                        var moneyLab = this._viewUI.duihuan_list.getCell(this.selectNum).getChildByName("exchangeMoney_lab");
                        tempNum++;
                        this.buyShengwangNumDic.set(this.selectNum, tempNum);
                        for (var i = 0; i < this.shengwangNameArr.length; i++) {
                            if (i != this.selectNum)
                                this.buyShengwangNumDic.set(i, 0);
                        }
                        this._viewUI.shengWangHuaFei_lab.text = (parseInt(moneyLab.text) * tempNum).toString();
                        this._viewUI.shengWangItemNum_lab.text = tempNum.toString();
                    }
                };
                /**点击声望物品购买减号 */
                RoleJiFenDuiHuanMediator.prototype.jianShengWang = function () {
                    var tempNum = this.buyShengwangNumDic.get(this.selectNum);
                    if (tempNum > 1) {
                        var moneyLab = this._viewUI.duihuan_list.getCell(this.selectNum).getChildByName("exchangeMoney_lab");
                        tempNum--;
                        this.buyShengwangNumDic.set(this.selectNum, tempNum);
                        for (var i = 0; i < this.shengwangNameArr.length; i++) {
                            if (i != this.selectNum)
                                this.buyShengwangNumDic.set(i, 0);
                        }
                        this._viewUI.shengWangHuaFei_lab.text = (parseInt(moneyLab.text) * tempNum).toString();
                        this._viewUI.shengWangItemNum_lab.text = tempNum.toString();
                    }
                };
                /**点击荣誉物品购买加号 */
                RoleJiFenDuiHuanMediator.prototype.jiaRongYu = function () {
                    var tempNum = this.buyRongyuNumDic.get(this.selectRongYuNum);
                    var limitNumLab = this._viewUI.rongYu_list.getCell(this.selectRongYuNum).getChildByName("limitNum_lab");
                    //如果限售数量大于当前物品的购买数量
                    if (tempNum < parseInt(limitNumLab.text)) {
                        var moneyLab = this._viewUI.rongYu_list.getCell(this.selectRongYuNum).getChildByName("exchangeMoney_lab");
                        tempNum++;
                        this.buyRongyuNumDic.set(this.selectRongYuNum, tempNum);
                        for (var i = 0; i < this.rongYuArr.length; i++) {
                            if (i != this.selectRongYuNum)
                                this.buyRongyuNumDic.set(i, 0);
                        }
                        this._viewUI.rongYuHuaFei_lab.text = (parseInt(moneyLab.text) * tempNum).toString();
                        this._viewUI.rongYuItemNum_lab.text = tempNum.toString();
                    }
                };
                /**点击荣誉物品购买减号 */
                RoleJiFenDuiHuanMediator.prototype.jianRongYu = function () {
                    var tempNum = this.buyRongyuNumDic.get(this.selectRongYuNum);
                    if (tempNum > 1) {
                        var moneyLab = this._viewUI.rongYu_list.getCell(this.selectRongYuNum).getChildByName("exchangeMoney_lab");
                        tempNum--;
                        this.buyRongyuNumDic.set(this.selectRongYuNum, tempNum);
                        for (var i = 0; i < this.rongYuArr.length; i++) {
                            if (i != this.selectRongYuNum)
                                this.buyRongyuNumDic.set(i, 0);
                        }
                        this._viewUI.rongYuHuaFei_lab.text = (parseInt(moneyLab.text) * tempNum).toString();
                        this._viewUI.rongYuItemNum_lab.text = tempNum.toString();
                    }
                };
                RoleJiFenDuiHuanMediator.prototype.switchButton = function (index) {
                    //初始化button的select状态
                    this._viewUI.countShengWang_btn.selected = false;
                    this._viewUI.countRongYu_btn.selected = false;
                    this._viewUI.countGongXian_btn.selected = false;
                    switch (index) {
                        case ButtonType.countShengWang_btn:
                            this._viewUI.countShengWang_btn.selected = true;
                            break;
                        case ButtonType.countRongYu_btn:
                            this._viewUI.countRongYu_btn.selected = true;
                            break;
                        case ButtonType.countGongXian_btn:
                            this._viewUI.countGongXian_btn.selected = true;
                            break;
                        default:
                            console.log("rolejifenduihuan.switchButton error");
                    }
                };
                /**
                 *
                 * @param index : button的类型
                 */
                RoleJiFenDuiHuanMediator.prototype.switchChildUI = function (index) {
                    switch (index) {
                        case ButtonType.countShengWang_btn:
                            this._viewUI.duihuan_list.visible = true;
                            this._viewUI.zhuanPan_box.visible = false;
                            this._viewUI.rongYu_box.visible = false;
                            this._viewUI.shengWangDuiHuan_box.visible = true;
                            this._viewUI.zhuanPanDuiHuan_box.visible = false;
                            this._viewUI.rongYuDuiHuan_box.visible = false;
                            break;
                        case ButtonType.countRongYu_btn:
                            this._viewUI.duihuan_list.visible = false;
                            this._viewUI.zhuanPan_box.visible = false;
                            this._viewUI.rongYu_box.visible = true;
                            this._viewUI.shengWangDuiHuan_box.visible = false;
                            this._viewUI.zhuanPanDuiHuan_box.visible = false;
                            this._viewUI.rongYuDuiHuan_box.visible = true;
                            break;
                        case ButtonType.countGongXian_btn:
                            this._viewUI.duihuan_list.visible = false;
                            this._viewUI.zhuanPan_box.visible = true;
                            this._viewUI.rongYu_box.visible = false;
                            this._viewUI.shengWangDuiHuan_box.visible = false;
                            this._viewUI.zhuanPanDuiHuan_box.visible = true;
                            this._viewUI.rongYuDuiHuan_box.visible = false;
                            break;
                        default:
                            console.log("rolejifenduihuan.switchButton error");
                    }
                };
                RoleJiFenDuiHuanMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    this.key = false;
                    modules.tips.models.TipsProxy.getInstance().off(modules.tips.models.ON_KRYBOARD, this, this.onKeyboard);
                    roleinfo.models.RoleInfoModel.getInstance().currentKey = 2;
                    if (LoginModel.getInstance().CommonPage != "") {
                        modules.ModuleManager.show(LoginModel.getInstance().CommonPage, this._app);
                        LoginModel.getInstance().CommonPage = "";
                    }
                };
                RoleJiFenDuiHuanMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                /**点击声望值按钮 */
                RoleJiFenDuiHuanMediator.prototype.clickShengwangBtnEvent = function () {
                    if (!this._viewUI.countShengWang_btn.selected) {
                        this.switchButton(ButtonType.countShengWang_btn);
                        this.switchChildUI(ButtonType.countShengWang_btn);
                    }
                };
                /**点击荣誉值按钮 */
                RoleJiFenDuiHuanMediator.prototype.clickRongyuBtnEvent = function () {
                    if (!this._viewUI.countRongYu_btn.selected) {
                        this.switchButton(ButtonType.countRongYu_btn);
                        this.switchChildUI(ButtonType.countRongYu_btn);
                    }
                };
                /**点击门派贡献按钮 */
                RoleJiFenDuiHuanMediator.prototype.clickGongxianBtnEvent = function () {
                    if (!this._viewUI.countGongXian_btn.selected) {
                        this.switchButton(ButtonType.countGongXian_btn);
                        this.switchChildUI(ButtonType.countGongXian_btn);
                    }
                };
                return RoleJiFenDuiHuanMediator;
            }(game.modules.UiMediator));
            roleinfo.RoleJiFenDuiHuanMediator = RoleJiFenDuiHuanMediator;
        })(roleinfo = modules.roleinfo || (modules.roleinfo = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=RoleJiFenDuiHuanMediator.js.map