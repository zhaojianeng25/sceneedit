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
        var skill;
        (function (skill) {
            var SkillLianJinMediator = /** @class */ (function (_super) {
                __extends(SkillLianJinMediator, _super);
                function SkillLianJinMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    /**活力 */
                    _this.huoliNum = 0;
                    /**当前选择下标 */
                    _this.selectNum = 0;
                    /**开关 */
                    _this.flag = false;
                    _this._viewUI = new ui.common.SkillLianJinUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this.isCenter = true;
                    _this._app = app;
                    _this._SkillShopMediator = new game.modules.roleinfo.RoleShopMediator(_this._app, shopType.DRUG_SHOP);
                    _this.tips = new game.modules.commonUI.DisappearMessageTipsMediator(_this._app);
                    _this._JinBiBuZuViewMediator = new modules.commonUI.JinBiBuZuViewMediator(_this._viewUI, _this._app);
                    _this.initialize();
                    _this.registerEvent();
                    _this.eventListener();
                    return _this;
                }
                /**初始化 */
                SkillLianJinMediator.prototype.initialize = function () {
                    this.drugArr = new Array();
                    this.bagItemArr = new Array();
                    this.drugImgArr = new Array();
                    this.drugNumArr = new Array();
                    this.haveDrugArr = new Array();
                    this.hechengImgArr = new Array();
                    this.hechengArr = new Array();
                    this.drugObj = BagModel.getInstance().itemAttrData;
                    this.foodObj = SaleModel.getInstance().foodAndDrugEffectData;
                    this.hechengDrugDataDic = new Laya.Dictionary();
                    this.haveDrugDataDic = new Laya.Dictionary();
                };
                /**注册点击监听 */
                SkillLianJinMediator.prototype.registerEvent = function () {
                    this._viewUI.lianJin_btn.on(LEvent.MOUSE_DOWN, this, this.clickLianJin);
                    this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.close);
                    this._viewUI.lock_btn.on(LEvent.CLICK, this, this.onLock);
                    this._viewUI.select1_btn.on(LEvent.MOUSE_DOWN, this, this.onselect1);
                    this._viewUI.select2_btn.on(LEvent.MOUSE_DOWN, this, this.onselect2);
                };
                /**注册事件监听 */
                SkillLianJinMediator.prototype.eventListener = function () {
                    modules.mainhud.models.HudProxy.getInstance().on(modules.mainhud.models.SRefreshRoleData_EVENT, this, this.onRefreshRoleData);
                    skill.models.SkillProxy.getInstance().on(skill.models.SLiveSkillMakeDrug_EVENT, this, this.onLiveSkillMakeDrug);
                    modules.bag.models.BagProxy.getInstance().on(modules.bag.models.REFRESH_BAG_COUNT, this, this.initItem);
                };
                /**方式一 */
                SkillLianJinMediator.prototype.onselect1 = function () {
                    switch (this._viewUI.select1_btn.selected) {
                        case true:
                            this._viewUI.select2_btn.selected = true;
                        case false:
                            this._viewUI.select2_btn.selected = false;
                    }
                };
                /**方式二 */
                SkillLianJinMediator.prototype.onselect2 = function () {
                    switch (this._viewUI.select2_btn.selected) {
                        case true:
                            this._viewUI.select1_btn.selected = true;
                        case false:
                            this._viewUI.select1_btn.selected = false;
                    }
                };
                /**一键添加 */
                SkillLianJinMediator.prototype.onLock = function () {
                    if (!this.flag) { /** 左关-->右开 */
                        this._viewUI.opLock.play(null, false);
                        this.flag = true;
                        this.autoAddNeedDrug();
                    }
                    else if (this.flag) { /** 开-->关 */
                        this._viewUI.clsoeLock.play(null, false);
                        this.flag = false;
                    }
                    skill.models.SkillModel.getInstance().isAutoAddNeedDrug = this.flag;
                };
                /** 自动添加炼金所需的药材 */
                SkillLianJinMediator.prototype.autoAddNeedDrug = function () {
                    var _drugNumCount = 0;
                    for (var i = 0; i < this.drugNumArr.length; i++) {
                        _drugNumCount += this.drugNumArr[i];
                        if (_drugNumCount >= 4) {
                            break;
                        }
                    }
                    var hechengNum = 0;
                    for (var i = 0; i < this.hechengArr.length; i++) {
                        if (this.hechengArr[i] != "") {
                            hechengNum++;
                        }
                    }
                    var totalNum = hechengNum + Number(_drugNumCount);
                    if (totalNum < 4) {
                        return;
                    }
                    var stillNeedNum = totalNum - hechengNum;
                    for (var i = 0; i < stillNeedNum; i++) {
                        this.onSelect(0);
                    }
                };
                /**刷新活力 */
                SkillLianJinMediator.prototype.onRefreshRoleData = function (e) {
                    this.huoliNum = HudModel.getInstance().energyNum; //活力
                    this._viewUI.dangQianHuoLi_lab.text = this.huoliNum.toString();
                };
                // 制作药品返回
                SkillLianJinMediator.prototype.onLiveSkillMakeDrug = function (e) {
                    var data = skill.models.SkillModel.getInstance().SLiveSkillMakeDrugData.get("data");
                    if (data.itemid != 0) {
                        //生成栏显示获得物品图标
                        this._viewUI.item5_img.skin = "common/icon/item/" + this.drugObj[data.itemid]["icon"] + ".png";
                        //显示获得食物名称
                        var param = [this.foodObj[data.itemid].name];
                        var prompt_1 = HudModel.getInstance().promptAssembleBack(SkillEnum.LIANYAO_SUCCESS, param);
                        this.tips.onShow(prompt_1);
                    }
                    this.initItem();
                };
                /**初始化活力消耗 */
                SkillLianJinMediator.prototype.init = function (huoli) {
                    this._viewUI.xiaoHaoHuoLi_lab.text = huoli.toString(); //消耗活力
                    this.initItem();
                };
                /**点击炼金 */
                SkillLianJinMediator.prototype.clickLianJin = function () {
                    var dangqianhuoli = parseInt(this._viewUI.dangQianHuoLi_lab.text); //当前活力
                    var xiaohaohuoli = parseInt(this._viewUI.xiaoHaoHuoLi_lab.text); //消耗活力
                    //活力不足
                    if (dangqianhuoli < xiaohaohuoli) {
                        var prompt_2 = HudModel.getInstance().promptAssembleBack(SkillEnum.HUOLI_BUZU);
                        this.tips.onShow(prompt_2);
                    }
                    //方式一
                    if (this._viewUI.select1_btn.selected == true) {
                        var data = [];
                        for (var i = 0; i < this.hechengArr.length; i++) {
                            if (this.hechengArr[i] != null) {
                                data.push(this.hechengArr[i]["id"]);
                            }
                        }
                        if (data.length == 0 || data.length == 1) { //过滤掉没放材料，防止被服务器判断为消耗金币的炼金；也过滤掉只放一个材料，服务器会吞掉该材料，并下发协议告诉客户端炼金产生错误（参考SkillError）
                            var msg = ChatModel.getInstance().chatMessageTips[160304]["msg"];
                            var _disTipsMsg = new modules.commonUI.DisappearMessageTipsMediator(this._app);
                            _disTipsMsg.onShow(msg);
                        }
                        else {
                            RequesterProtocols._instance.c2s_CLiveSkillMakeDrug(data);
                        }
                    }
                    //方式二
                    else if (this._viewUI.select2_btn.selected == true) {
                        var needMoney = SkillEnum.LIANYAO_YINBI;
                        //如果银币不够
                        if (needMoney > HudModel.getInstance().sliverNum) {
                            var duihuanMoney = needMoney - HudModel.getInstance().sliverNum; //需要兑换的钱
                            this._JinBiBuZuViewMediator.onShow(false, duihuanMoney.toString(), Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI).toString(), Math.ceil(duihuanMoney / RoleEnum.JINBI_YINBI).toString());
                            this._JinBiBuZuViewMediator.once(modules.commonUI.USE_SILVER_EXCHANGE_EVENT, this, this.buySliverFromYuanBao, [Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI)]);
                            this._JinBiBuZuViewMediator.once(modules.commonUI.USE_YUANBAO_EXCHANGE_EVENT, this, this.goCharge, [Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI)]);
                        }
                        else
                            RequesterProtocols._instance.c2s_CLiveSkillMakeDrug([]);
                    }
                };
                /**仙晶兑换 */
                SkillLianJinMediator.prototype.goCharge = function (yuanbao) {
                    var fuShiNum = HudModel.getInstance().fuShiNum;
                    //元宝不足
                    if (fuShiNum < yuanbao) {
                        this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
                        this._TipsMessageMediator.show();
                        var param = new Dictionary();
                        param.set("contentId", RoleEnum.XIANJIN_TIP);
                        this._TipsMessageMediator.showContent(param);
                        game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.goRecharge);
                    }
                    else {
                        RequesterProtocols._instance.c2s_exchange_currency(3, 2, yuanbao);
                    }
                };
                /**通过元宝购买物品 */
                SkillLianJinMediator.prototype.buySliverFromYuanBao = function (yuanbao) {
                    var fuShiNum = HudModel.getInstance().fuShiNum;
                    //元宝不足
                    if (fuShiNum < yuanbao) {
                        this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
                        this._TipsMessageMediator.show();
                        var param = new Dictionary();
                        param.set("contentId", RoleEnum.XIANJIN_TIP);
                        this._TipsMessageMediator.showContent(param);
                        game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.goRecharge);
                    }
                    else {
                        RequesterProtocols._instance.c2s_exchange_currency(3, 1, yuanbao);
                    }
                };
                /**充值 */
                SkillLianJinMediator.prototype.goRecharge = function () {
                    modules.ModuleManager.jumpPage(modules.ModuleNames.SHOP, shopMediatorType.CHONGZHI, this._app);
                    game.modules.shop.models.ShopProxy._instance.event(game.modules.shop.models.Go_Charge); //前往充值界面。关闭当前界
                };
                /**初始化相关数据 */
                SkillLianJinMediator.prototype.initItem = function () {
                    this.drugArr.length = 0;
                    this.drugImgArr.length = 0;
                    this.drugNumArr.length = 0;
                    this.haveDrugArr.length = 0;
                    this.hechengArr.length = 0;
                    this.hechengImgArr.length = 0;
                    //存放药材信息
                    for (var i = SkillEnum.DRUG_START; i < SkillEnum.DRUG_END; i++) {
                        this.drugArr.push(this.drugObj[i]);
                    }
                    //初始化药材数量和图片
                    for (var i = 0; i < this.drugArr.length; i++) {
                        if (BagModel.getInstance().chargeItemNum(this.drugArr[i]["id"]) != 0) {
                            this.haveDrugArr.push(this.drugArr[i]);
                        }
                    }
                    for (var i = 0; i < this.haveDrugArr.length; i++) {
                        this.drugImgArr.push({ img: "common/icon/item/" + this.haveDrugArr[i]["icon"] + ".png" });
                        this.drugNumArr.push(BagModel.getInstance().chargeItemNum(this.haveDrugArr[i]["id"]));
                    }
                    //初始化剩余的格子图片
                    for (var i = this.drugImgArr.length; i < 15; i++) {
                        if (i == this.drugImgArr.length) {
                            this.drugImgArr.push({ img: "common/ui/tongyong/huoban_jiahao.png" });
                            this.drugNumArr.push("");
                        }
                        this.drugImgArr.push({ img: "" });
                        this.drugNumArr.push("");
                    }
                    for (var i = 0; i < 4; i++) {
                        this.hechengImgArr.push({ img: "" });
                    }
                    this.getListData();
                    this.getHechengListData();
                    this.flag = !skill.models.SkillModel.getInstance().isAutoAddNeedDrug;
                    this.onLock();
                };
                /**初始化药材列表 */
                SkillLianJinMediator.prototype.getListData = function () {
                    this._viewUI.item_list.vScrollBarSkin = "";
                    this._viewUI.item_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.item_list.scrollBar.elasticDistance = 50;
                    this._viewUI.item_list.array = this.drugImgArr;
                    this._viewUI.item_list.renderHandler = new Handler(this, this.onRender);
                    this._viewUI.item_list.selectHandler = new Handler(this, this.onSelect);
                };
                /**渲染药材列表 */
                SkillLianJinMediator.prototype.onRender = function (cell, index) {
                    var numLab = cell.getChildByName("num_lab");
                    var tubiaoImg = cell.getChildByName("icon_img");
                    tubiaoImg.skin = this.drugImgArr[index].img;
                    if (this.drugNumArr[index] != 0)
                        numLab.text = this.drugNumArr[index];
                    else
                        numLab.text = "";
                };
                /**处理药材列表点击 */
                SkillLianJinMediator.prototype.onSelect = function (index) {
                    if (index != -1) {
                        if (this.drugImgArr[index].img == "") {
                            return;
                        }
                        //如果点击加号图片，跳转到药材商店
                        if (this.drugImgArr[index].img == "common/ui/tongyong/huoban_jiahao.png") {
                            this._SkillShopMediator.show();
                        }
                    }
                    //点击药材图片
                    if (index != -1 && this.drugImgArr[index].img != "common/ui/tongyong/huoban_jiahao.png") {
                        this.selectNum = index;
                        var numLab = this._viewUI.item_list.getCell(index).getChildByName("num_lab");
                        var tubiaoImg = this._viewUI.item_list.getCell(index).getChildByName("icon_img");
                        //添加材料
                        for (var i = 0; i < 4; i++) {
                            if (this.hechengImgArr[i].img == "") {
                                this.hechengImgArr[i] = { img: tubiaoImg.skin };
                                this.hechengArr[i] = this.haveDrugArr[index];
                                this.drugNumArr[index] -= 1;
                                this.hechengDrugDataDic.set(i, this.hechengArr[i]["id"]); //保存下合成材料列表所添加的药材id
                                break;
                            }
                            else if (i == 3 && this.hechengImgArr[3].img != "") {
                                this.replaceDrug(index);
                            }
                        }
                        //当前数量改变
                        if (this.drugNumArr[index] == 0) {
                            this.haveDrugArr[index] = null;
                        }
                        this.sort();
                        this.getListData();
                        this.getHechengListData();
                    }
                    this._viewUI.item_list.selectedIndex = -1;
                };
                /** 替换药草（当合成材料列表满的时候）
                 * @param index 最新点击拥有药材列表里的药材所在列表的位置索引
                 * @describe 先把合成材料列表中的药材依次点击下架
                 * 			再根据之前保存在字典hechengDrugDataDic中的药材id到haveDrugDataDic取出位置，除了第一个材料，是要被替换下来
                 * 			接着用位置点击拥有药材列表重新上架
                 * 			最后上架，替换上最新点击拥有药材列表里的药材
                 */
                SkillLianJinMediator.prototype.replaceDrug = function (index) {
                    for (var i = 3; i > -1; i--) {
                        this.onHechengSelect(i);
                    }
                    var _tempDrugIdArr = [];
                    for (var i = 1; i < this.hechengDrugDataDic.keys.length; i++) {
                        _tempDrugIdArr.push(this.hechengDrugDataDic.get(this.hechengDrugDataDic.keys[i]));
                    }
                    var _tempHaveDrugLstPos;
                    for (var i = 0; i < _tempDrugIdArr.length; i++) {
                        _tempHaveDrugLstPos = this.haveDrugDataDic.get(_tempDrugIdArr[i])["listpos"];
                        this.onSelect(_tempHaveDrugLstPos);
                    }
                    this.onSelect(index);
                };
                /**初始化合成材料列表 */
                SkillLianJinMediator.prototype.getHechengListData = function () {
                    this._viewUI.drug_list.vScrollBarSkin = "";
                    this._viewUI.drug_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.drug_list.scrollBar.elasticDistance = 50;
                    this._viewUI.drug_list.array = this.hechengImgArr;
                    this._viewUI.drug_list.renderHandler = new Handler(this, this.onHechengRender);
                    this._viewUI.drug_list.selectHandler = new Handler(this, this.onHechengSelect);
                };
                /**渲染材料列表 */
                SkillLianJinMediator.prototype.onHechengRender = function (cell, index) {
                    var tubiaoImg = cell.getChildByName("drug_img");
                    tubiaoImg.skin = this.hechengImgArr[index].img;
                    if (index == 0 && tubiaoImg.skin != "") {
                        this._viewUI.item5_img.skin = "";
                    }
                };
                /**处理材料列表点击 */
                SkillLianJinMediator.prototype.onHechengSelect = function (index) {
                    //减少材料
                    if (index != -1) {
                        if (this.hechengImgArr[index].img == "") {
                            return;
                        }
                        var key = false;
                        for (var i = 0; i < this.drugImgArr.length; i++) {
                            //将材料列表的材料退回到对应的药材列表中
                            if (this.hechengImgArr[index].img == this.drugImgArr[i].img) {
                                this.drugNumArr[i] += 1;
                                this.haveDrugDataDic.set(this.hechengArr[index]["id"], { listpos: i, lastnum: this.drugNumArr[i] });
                                key = true;
                            }
                        }
                        if (!key) {
                            for (var i = 0; i < this.haveDrugArr.length; i++) {
                                if (this.haveDrugArr[i] == null) {
                                    this.haveDrugArr[i] = this.hechengArr[index];
                                    this.drugNumArr[i] += 1;
                                    this.haveDrugDataDic.set(this.hechengArr[index]["id"], { listpos: i, lastnum: this.drugNumArr[i] });
                                    break;
                                }
                            }
                        }
                        this.hechengImgArr[index] = { img: "" };
                        this.hechengArr[index] = null;
                        this.sort();
                        this.sortHecheng();
                        this.getHechengListData();
                        this.getListData();
                        this._viewUI.drug_list.selectedIndex = -1;
                    }
                };
                /**拥有药材排序 */
                SkillLianJinMediator.prototype.sort = function () {
                    this.drugImgArr.length = 0;
                    for (var i = 0; i < this.haveDrugArr.length; i++) {
                        if (this.haveDrugArr[i] == null) {
                            if (i + 1 < this.haveDrugArr.length) {
                                this.haveDrugArr[i] = this.haveDrugArr[i + 1];
                                this.haveDrugArr[i + 1] = null;
                                this.drugNumArr[i] = this.drugNumArr[i + 1];
                                this.drugNumArr[i + 1] = 0;
                            }
                        }
                    }
                    for (var i = 0; i < this.haveDrugArr.length; i++) {
                        if (this.haveDrugArr[i] != null)
                            this.drugImgArr.push({ img: "common/icon/item/" + this.haveDrugArr[i]["icon"] + ".png" });
                    }
                    for (var i = this.haveDrugArr.length; i < this.haveDrugArr.length + 15; i++) {
                        if (i == this.haveDrugArr.length) {
                            this.drugImgArr.push({ img: "common/ui/tongyong/huoban_jiahao.png" });
                            this.drugNumArr.push("");
                        }
                        this.drugImgArr.push({ img: "" });
                        this.drugNumArr.push("");
                    }
                };
                /**合成列表排序 */
                SkillLianJinMediator.prototype.sortHecheng = function () {
                    for (var i = 0; i < 4; i++) {
                        if (this.hechengImgArr[i].img == "") {
                            if (i + 1 < 4) {
                                this.hechengImgArr[i].img = this.hechengImgArr[i + 1].img;
                                this.hechengImgArr[i + 1].img = "";
                                this.hechengArr[i] = this.hechengArr[i + 1];
                                this.hechengArr[i + 1] = null;
                            }
                        }
                    }
                };
                SkillLianJinMediator.prototype.hide = function () {
                    this._viewUI.item5_img.skin = "";
                    _super.prototype.hide.call(this);
                };
                SkillLianJinMediator.prototype.close = function () {
                    this.hide();
                    skill.models.SkillModel.getInstance().currenTabNum = SkillEnum.LIFE_KEY;
                    modules.ModuleManager.show(modules.ModuleNames.SKILL, this._app);
                };
                SkillLianJinMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                };
                SkillLianJinMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return SkillLianJinMediator;
            }(game.modules.UiMediator));
            skill.SkillLianJinMediator = SkillLianJinMediator;
        })(skill = modules.skill || (modules.skill = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=SkillLianJinMediator.js.map