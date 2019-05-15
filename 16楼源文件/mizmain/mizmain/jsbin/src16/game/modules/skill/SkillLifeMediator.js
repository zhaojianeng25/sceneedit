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
 * 生活技能类
 */
var game;
(function (game) {
    var modules;
    (function (modules) {
        var skill;
        (function (skill) {
            var SkillLifeMediator = /** @class */ (function (_super) {
                __extends(SkillLifeMediator, _super);
                function SkillLifeMediator(uiLayer, app) {
                    var _this = _super.call(this, uiLayer) || this;
                    /**当前选择列表项下标 */
                    _this.selectNum = 0;
                    /**用于变身卡翻页*/
                    _this.kapianNum = 1;
                    /**锻造级别 */
                    _this.dazaoNum = 0;
                    /**当前活力 */
                    _this.huoliNum = 0; //
                    /**消耗活力 */
                    _this.huolixiaohao = 0; //
                    /**制造变身卡级别 */
                    _this.shouhuoId = 1;
                    _this._viewUI = new ui.common.SkillLifeUI();
                    _this._viewUI.mouseThrough = true;
                    _this.isCenter = false;
                    _this._app = app;
                    _this._SkillLianJinMediator = new skill.SkillLianJinMediator(_this._app);
                    _this._JinBiBuZuViewMediator = new modules.commonUI.JinBiBuZuViewMediator(_this._viewUI, _this._app);
                    _this.tips = new game.modules.commonUI.DisappearMessageTipsMediator(_this._app);
                    _this.initialize();
                    _this.init();
                    _this.registerEvent();
                    _this.eventListener();
                    return _this;
                }
                /**事件监听 */
                SkillLifeMediator.prototype.eventListener = function () {
                    modules.mainhud.models.HudProxy.getInstance().on(modules.mainhud.models.SRefreshCurrency_EVENT, this, this.onRefreshCurrency);
                    modules.mainhud.models.HudProxy.getInstance().on(modules.mainhud.models.SRefreshRoleCurrency_EVENT, this, this.onRefreshRoleCurrency);
                    modules.mainhud.models.HudProxy.getInstance().on(modules.mainhud.models.SRefreshRoleData_EVENT, this, this.onRefreshRoleData);
                    skill.models.SkillProxy.getInstance().on(skill.models.SUpdateLearnLiveSkill_EVENT, this, this.onUpdateLearnLiveSkil);
                    skill.models.SkillProxy.getInstance().on(skill.models.SLiveSkillMakeFood_EVENT, this, this.onLiveSkillMakeFood);
                    skill.models.SkillProxy.getInstance().on(skill.models.SLiveSkillMakeStuff_EVENT, this, this.onLiveSkillMakeStuff);
                    skill.models.SkillProxy.getInstance().on(skill.models.SLiveSkillMakeCard_EVENT, this, this.onLiveSkillMakeCard);
                    skill.models.SkillProxy.getInstance().on(skill.models.SRequestLiveSkillList_EVENT, this, this.onRequestLiveSkillList);
                };
                /**初始化 */
                SkillLifeMediator.prototype.initialize = function () {
                    this.skillArr = new Array();
                    this.skillImgArr = new Array();
                    this.foodArr = new Array();
                    this.foodImgArr = new Array();
                    this.drugArr = new Array();
                    this.drugImgArr = new Array();
                    this.dazaoImgArr = new Array();
                    this.wuqiArr = new Array();
                    this.wuqiNameArr = new Array();
                    this.fangjuArr = new Array();
                    this.fangjuNameArr = new Array();
                    this.shipinArr = new Array();
                    this.shipinNameArr = new Array();
                    this.kapianArr = new Array();
                    this.skillObj = skill.models.SkillModel.getInstance().CLifeSkillBinDic;
                    this.foodObj = SaleModel.getInstance().foodAndDrugEffectData;
                    this.zahuoObj = StrengTheningModel.getInstance().groceryEffectData;
                    this.dazaoObj = BagModel.getInstance().itemAttrData;
                    this.shouhuoObj = skill.models.SkillModel.getInstance().CInheritCostBinDic;
                    this.costObj = skill.models.SkillModel.getInstance().CLifeSkillCostBinDic;
                };
                /**初始化数据 */
                SkillLifeMediator.prototype.init = function () {
                    this.skillArr.push(this.skillObj[lifeSkill.DUANLIAN]);
                    this.skillArr.push(this.skillObj[lifeSkill.GUANXIANG]);
                    this.skillArr.push(this.skillObj[lifeSkill.PENGREN]);
                    this.skillArr.push(this.skillObj[lifeSkill.LIANJIN]);
                    this.skillArr.push(this.skillObj[lifeSkill.DUANZAO]);
                    this.skillArr.push(this.skillObj[lifeSkill.CAIFENG]);
                    this.skillArr.push(this.skillObj[lifeSkill.ZHUBAO]);
                    this.skillArr.push(this.skillObj[lifeSkill.SHOUHUO]);
                    for (var i = 0; i < this.skillArr.length; i++) {
                        this.skillImgArr.push({ img: "common/icon/skill/" + this.skillArr[i]["icon"] + ".png" });
                    }
                    //初始化食品
                    for (var i = SkillEnum.FOOD_START; i < SkillEnum.FOOD_END; i++) {
                        this.foodArr.push(this.foodObj[i]);
                    }
                    for (var i = SkillEnum.FOOD_IMG_START; i < SkillEnum.FOOD_IMG_END; i++) {
                        this.foodImgArr.push({ img: "common/icon/item/" + i + ".png" });
                    }
                    //初始化药品
                    this.drugArr.push(this.foodObj[drug.XIANLUJIU]);
                    this.drugArr.push(this.foodObj[drug.XICHENDAN]);
                    this.drugArr.push(this.foodObj[drug.HUANMINGYAO]);
                    this.drugArr.push(this.foodObj[drug.JULINGJIANG]);
                    this.drugArr.push(this.foodObj[drug.XUEQIDAN]);
                    this.drugArr.push(this.foodObj[drug.POWANGCHEN]);
                    this.drugImgArr.push({ img: "common/icon/item/" + drug.XIANLUJIU_IMG + ".png" });
                    this.drugImgArr.push({ img: "common/icon/item/" + drug.XICHENDAN_IMG + ".png" });
                    this.drugImgArr.push({ img: "common/icon/item/" + drug.HUANMINGYAO_IMG + ".png" });
                    this.drugImgArr.push({ img: "common/icon/item/" + drug.JULINGJIANG_IMG + ".png" });
                    this.drugImgArr.push({ img: "common/icon/item/" + drug.XUEQIDAN_IMG + ".png" });
                    this.drugImgArr.push({ img: "common/icon/item/" + drug.POWANGCHEN_IMG + ".png" });
                    //初始化打造
                    this.dazaoImgArr.push({ img: "common/icon/item/" + dazao.WUQI_IMG + ".png" });
                    this.dazaoImgArr.push({ img: "common/icon/item/" + dazao.FANGJU_IMG + ".png" });
                    this.dazaoImgArr.push({ img: "common/icon/item/" + dazao.SHIPIN_IMG + ".png" });
                    for (var i = SkillEnum.WIQI_START; i < SkillEnum.WIQI_END; i++) {
                        this.wuqiArr.push(this.zahuoObj[i]);
                        this.wuqiNameArr.push(this.dazaoObj[i]);
                    }
                    for (var i = SkillEnum.FANGJU_START; i < SkillEnum.FANGJU_END; i++) {
                        this.fangjuArr.push(this.zahuoObj[i]);
                        this.fangjuNameArr.push(this.dazaoObj[i]);
                    }
                    for (var i = SkillEnum.SHIPIN_START; i < SkillEnum.SHIPIN_END; i++) {
                        this.shipinArr.push(this.zahuoObj[i]);
                        this.shipinNameArr.push(this.dazaoObj[i]);
                    }
                };
                /** 返回已经学习的所有生活技能*/
                SkillLifeMediator.prototype.onRequestLiveSkillList = function (e) {
                    var data = skill.models.SkillModel.getInstance().SRequestLiveSkillListData.get("data");
                    for (var i = 0; i < data.skilllist.length; i++) {
                        for (var j = 0; j < this.skillArr.length; j++) {
                            if (this.skillArr[j]["id"] == data.skilllist[i]["id"]) {
                                var levelLab = this._viewUI.skill_list.getCell(j).getChildByName("level_lab");
                                levelLab.text = data.skilllist[i]["level"]; //刷新等级
                            }
                        }
                    }
                    this.getListData();
                    this.onSelect(0);
                };
                /**获取已修炼技能等级 */
                SkillLifeMediator.prototype.getSkillLevel = function () {
                    RequesterProtocols._instance.c2s_CRequestLiveSkillList(); //请求已经学习的生活技能链表
                };
                /**获取所需货币数量 */
                SkillLifeMediator.prototype.initMoney = function () {
                    RequesterProtocols._instance.c2s_CRequestAttr([shuxing.ENERGY]); //请求得到当前活力
                    this._viewUI.yongYou1_lab.text = HudModel.getInstance().sliverNum.toString(); //银币
                    this._viewUI.yongYou2_lab.text = HudModel.getInstance().gonghuiNum.toString(); //帮贡
                };
                /**刷新银币 */
                SkillLifeMediator.prototype.onRefreshCurrency = function (e) {
                    this._viewUI.yongYou1_lab.text = HudModel.getInstance().sliverNum.toString(); //银币
                    //根据升级费用改变颜色
                    if (parseInt(this._viewUI.xuQiu_lab.text) > parseInt(this._viewUI.yongYou1_lab.text)) {
                        this._viewUI.xuQiu_lab.color = skill.models.SkillModel.chineseStr.red; //更换需要银币的字体颜色
                    }
                    else
                        this._viewUI.xuQiu_lab.color = skill.models.SkillModel.chineseStr.green;
                };
                /**刷新帮贡 */
                SkillLifeMediator.prototype.onRefreshRoleCurrency = function (e) {
                    this._viewUI.yongYou2_lab.text = HudModel.getInstance().gonghuiNum.toString(); //帮贡
                    if (parseInt(this._viewUI.xuQIu2_lab.text) > parseInt(this._viewUI.yongYou2_lab.text)) {
                        this._viewUI.xuQIu2_lab.color = skill.models.SkillModel.chineseStr.red; //更换需要帮贡的字体颜色
                    }
                    else
                        this._viewUI.xuQIu2_lab.color = skill.models.SkillModel.chineseStr.green;
                };
                /**刷新人物属性 */
                SkillLifeMediator.prototype.onRefreshRoleData = function (e) {
                    this.huoliNum = HudModel.getInstance().energyNum; //活力
                };
                /**刷新等级 */
                SkillLifeMediator.prototype.onUpdateLearnLiveSkil = function (e) {
                    var data = skill.models.SkillModel.getInstance().SUpdateLearnLiveSkillData.get("data");
                    var levelLab = this._viewUI.skill_list.getCell(this.selectNum).getChildByName("level_lab");
                    levelLab.text = data.skill["level"].toString(); //刷新等级
                    var skiliData = [this.skillArr[this.selectNum]["name"], data.skill["level"]]; //技能名字 技能等级
                    this._viewUI.xuQiu_lab.text = this.costObj[parseInt(levelLab.text) + 1]["silverCostList"][this.skillArr[this.selectNum]["studyCostRule"] - 1]; //升级银两费用
                    this._viewUI.xuQIu2_lab.text = this.costObj[parseInt(levelLab.text) + 1]["guildContributeCostList"][this.skillArr[this.selectNum]["studyCostRule"] - 1]; //升级帮贡费用
                    this._viewUI.titleLevel_lab.text = levelLab.text;
                    this._viewUI.xiaoHaoHuoLi_lab.text = this.huoliNum + "/" + this.costObj[parseInt(levelLab.text)]["strengthCostList"][this.skillArr[this.selectNum]["strengthCostRule"] - 1]; //消耗活力
                    this.huolixiaohao = this.costObj[parseInt(levelLab.text)]["strengthCostList"][this.skillArr[this.selectNum]["strengthCostRule"] - 1]; //消耗活力
                    //让打造界面翻页
                    if (parseInt(levelLab.text) % SkillEnum.TEN_LEVEL == 0 && parseInt(levelLab.text) > 10) {
                        this.clickRightBtn();
                        this.clickRight();
                    }
                    this.getPengrenData();
                    this.onSelect(this.selectNum);
                    this.liveSkillBay(skiliData);
                };
                /**生活技能每升一级弹窗 */
                SkillLifeMediator.prototype.liveSkillBay = function (skiliData) {
                    var prompt = HudModel.getInstance().promptAssembleBack(150099, skiliData);
                    var disappearMsgTips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                    disappearMsgTips.onShow(prompt);
                };
                /**制作食物返回 */
                SkillLifeMediator.prototype.onLiveSkillMakeFood = function (e) {
                    var data = skill.models.SkillModel.getInstance().SLiveSkillMakeFoodData.get("data");
                    var levelLab = this._viewUI.skill_list.getCell(this.selectNum).getChildByName("level_lab");
                    //显示获得食物名称
                    var param = [this.foodObj[data.itemid].name];
                    var prompt = HudModel.getInstance().promptAssembleBack(150102, param);
                    this.tips.onShow(prompt);
                    this._viewUI.xiaoHaoHuoLi_lab.text = this.huoliNum + "/" + this.costObj[parseInt(levelLab.text)]["strengthCostList"][this.skillArr[this.selectNum]["strengthCostRule"] - 1]; //消耗活力
                };
                /**锻造返回 */
                SkillLifeMediator.prototype.onLiveSkillMakeStuff = function (e) {
                    var data = skill.models.SkillModel.getInstance().SLiveSkillMakeStuffData.get("data");
                    var levelLab = this._viewUI.skill_list.getCell(this.selectNum).getChildByName("level_lab");
                    //显示获得物品
                    var param;
                    //根据当前选中列表下标
                    switch (this.selectNum) {
                        case 4:
                            param = [this.wuqiNameArr[this.dazaoNum]["name"]]; //武器打造符
                            break;
                        case 5:
                            param = [this.fangjuNameArr[this.dazaoNum]["name"]]; //防具打造符
                            break;
                        case 6:
                            param = [this.shipinNameArr[this.dazaoNum]["name"]]; //饰品打造符
                            break;
                    }
                    var prompt = HudModel.getInstance().promptAssembleBack(150107, param);
                    this.tips.onShow(prompt);
                    this._viewUI.xiaoHaoHuoLi_lab.text = this.huoliNum + "/" + this.costObj[parseInt(levelLab.text)]["strengthCostList"][this.skillArr[this.selectNum]["strengthCostRule"] - 1]; //消耗活力
                };
                /**服务器返回制作变身卡成功 */
                SkillLifeMediator.prototype.onLiveSkillMakeCard = function (e) {
                    var data = skill.models.SkillModel.getInstance().SLiveSkillMakeCardData.get("data");
                    var levelLab = this._viewUI.skill_list.getCell(this.selectNum).getChildByName("level_lab");
                    //刷新所需道具数量
                    this._viewUI.needNum_lab.text = (BagModel.getInstance().chargeItemNum(this.shouhuoObj[this.shouhuoId]["costitem"])).toString();
                    this._viewUI.xiaoHaoHuoLi_lab.text = this.huoliNum + "/" + this.costObj[parseInt(levelLab.text)]["strengthCostList"][this.skillArr[this.selectNum]["strengthCostRule"] - 1]; //消耗活力
                };
                /**初始化界面 */
                SkillLifeMediator.prototype.getListData = function () {
                    //生活技能
                    this._viewUI.skill_list.vScrollBarSkin = "";
                    this._viewUI.skill_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.skill_list.scrollBar.elasticDistance = 50;
                    this._viewUI.skill_list.array = this.skillArr;
                    this._viewUI.skill_list.repeatY = 4;
                    this._viewUI.skill_list.renderHandler = new Handler(this, this.onRender);
                    this._viewUI.skill_list.selectHandler = new Handler(this, this.onSelect);
                    this._viewUI.skill_list.selectedIndex = 0;
                    //炼金
                    this._viewUI.lianJin_list.vScrollBarSkin = "";
                    this._viewUI.lianJin_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.lianJin_list.scrollBar.elasticDistance = 50;
                    this._viewUI.lianJin_list.repeatY = this.drugArr.length;
                    this._viewUI.lianJin_list.array = this.drugArr;
                    this._viewUI.lianJin_list.renderHandler = new Handler(this, this.onDrugRender);
                    this._viewUI.lianJin_list.selectedIndex = 0;
                };
                /**初始化烹饪面板 */
                SkillLifeMediator.prototype.getPengrenData = function () {
                    //烹饪
                    this._viewUI.pengRen_list.vScrollBarSkin = "";
                    this._viewUI.pengRen_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.pengRen_list.scrollBar.elasticDistance = 50;
                    this._viewUI.pengRen_list.repeatY = this.foodArr.length;
                    this._viewUI.pengRen_list.array = this.foodArr;
                    this._viewUI.pengRen_list.renderHandler = new Handler(this, this.onFoodRender);
                    this._viewUI.pengRen_list.selectedIndex = 0;
                };
                /**初始化锻造面板 */
                SkillLifeMediator.prototype.getDuanzaoData = function () {
                    //锻造
                    this._viewUI.daZao_list.array = this.wuqiArr;
                    this._viewUI.daZao_list.repeatX = 1;
                    this._viewUI.daZao_list.renderHandler = new Handler(this, this.onDazaoRender);
                    this._viewUI.daZao_list.selectedIndex = 0;
                    this._viewUI.daZao_list.scrollTo(this.dazaoNum);
                };
                /**初始化收获面板 */
                SkillLifeMediator.prototype.getShouhuoData = function () {
                    //收获
                    this._viewUI.kapian_list.hScrollBarSkin = "";
                    this._viewUI.kapian_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.kapian_list.scrollBar.elasticDistance = 50;
                    this._viewUI.kapian_list.array = this.kapianArr;
                    this._viewUI.kapian_list.repeatX = 3;
                    this._viewUI.kapian_list.renderHandler = new Handler(this, this.onKapianRender);
                };
                /**渲染技能列表 */
                SkillLifeMediator.prototype.onRender = function (cell, index) {
                    if (index > this.skillArr.length)
                        return;
                    //收获技能65级开放
                    if (HudModel.getInstance().levelNum < SkillEnum.SHOUHUO_LEVEL && index > 6) {
                        this._viewUI.skill_list.getCell(index).visible = false;
                        return;
                    }
                    var nameLab = cell.getChildByName("name_lab");
                    var tubiaoImg = cell.getChildByName("touxiang_img");
                    var levelLab = cell.getChildByName("level_lab");
                    var jinengBtn = cell.getChildByName("jineng_btn");
                    //如果不是选中状态，改变按钮颜色
                    if (index != this.selectNum) {
                        jinengBtn.skin = "common/ui/tongyong/common_list_textbg2.png";
                    }
                    nameLab.text = this.skillArr[index]["name"];
                    tubiaoImg.skin = this.skillImgArr[index].img;
                };
                /**渲染烹饪列表 */
                SkillLifeMediator.prototype.onFoodRender = function (cell, index) {
                    if (index > this.foodArr.length)
                        return;
                    var levelLab = cell.getChildByName("level_lab");
                    var foodImg = cell.getChildByName("food_img");
                    var pengrenLevel = this._viewUI.skill_list.getCell(2).getChildByName("level_lab");
                    //如果烹饪等级大于该食物解锁等级
                    if (parseInt(pengrenLevel.text) >= this.foodArr[index]["needPengrenLevel"])
                        levelLab.text = "";
                    else
                        levelLab.text = skill.models.SkillModel.chineseStr.dengji + this.foodArr[index]["needPengrenLevel"];
                    foodImg.skin = this.foodImgArr[index].img;
                    foodImg.on(LEvent.MOUSE_DOWN, this, this.clickFood, [index]);
                    var foodFrame_img = cell.getChildByName("foodFrame_img");
                    var _quality = BagModel.getInstance().itemAttrData[this.foodArr[index]["id"]]["nquality"];
                    foodFrame_img.skin = modules.bag.BagSystemModule.getGameItemFrameColorResource(_quality); //设置炼金产物的品质边框图
                };
                /**点击烹饪图片 */
                SkillLifeMediator.prototype.clickFood = function (index) {
                    var itemId = this.foodArr[index].id;
                    var parame = new Dictionary();
                    parame.set("itemId", itemId);
                    this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.commonItem, parame);
                };
                /**渲染炼金列表 */
                SkillLifeMediator.prototype.onDrugRender = function (cell, index) {
                    if (index > this.drugArr.length)
                        return;
                    var drugFrame_img = cell.getChildByName("drugFrame_img");
                    var _quality = BagModel.getInstance().itemAttrData[this.drugArr[index]["id"]]["nquality"];
                    drugFrame_img.skin = modules.bag.BagSystemModule.getGameItemFrameColorResource(_quality); //设置炼金产物的品质边框图
                    var drugImg = cell.getChildByName("drug_img");
                    drugImg.skin = this.drugImgArr[index].img;
                    drugImg.on(LEvent.MOUSE_DOWN, this, this.clickDrug, [index]);
                };
                /**点击药品图片 */
                SkillLifeMediator.prototype.clickDrug = function (index) {
                    var itemId = this.drugArr[index].id;
                    var parame = new Dictionary();
                    parame.set("itemId", itemId);
                    this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.commonItem, parame);
                };
                /**渲染锻造列表 */
                SkillLifeMediator.prototype.onDazaoRender = function (cell, index) {
                    if (index > this.wuqiArr.length)
                        return;
                    var tip = modules.tips.models.TipsModel.getInstance().cstringResConfigData; //程序内字符串
                    //根据当前选中下标
                    var skillid = this.skillArr[this.selectNum]["id"]; // 技能id
                    var skillLevel = skill.models.SkillModel.getInstance().LiveSkilllevelData.get(skillid);
                    var showLevel;
                    switch (this.selectNum) {
                        case 4:
                            var wuqiImg = cell.getChildByName("duanZaoTouXiang_img");
                            var nameLab = cell.getChildByName("name_lab");
                            var levelLab = cell.getChildByName("level_lab");
                            wuqiImg.skin = this.dazaoImgArr[0].img;
                            nameLab.text = this.wuqiNameArr[index]["name"];
                            levelLab.text = this.wuqiNameArr[index]["level"] + tip[SkillEnum.JI_TEXT].msg;
                            showLevel = this.wuqiNameArr[index]["level"];
                            break;
                        case 5:
                            var fangjuImg = cell.getChildByName("duanZaoTouXiang_img");
                            var nameLab = cell.getChildByName("name_lab");
                            var levelLab = cell.getChildByName("level_lab");
                            fangjuImg.skin = this.dazaoImgArr[1].img;
                            nameLab.text = this.fangjuNameArr[index]["name"];
                            levelLab.text = this.fangjuNameArr[index]["level"] + tip[SkillEnum.JI_TEXT].msg;
                            showLevel = this.fangjuNameArr[index]["level"];
                            break;
                        case 6:
                            var shipinImg = cell.getChildByName("duanZaoTouXiang_img");
                            var nameLab = cell.getChildByName("name_lab");
                            var levelLab = cell.getChildByName("level_lab");
                            shipinImg.skin = this.dazaoImgArr[2].img;
                            nameLab.text = this.shipinNameArr[index]["name"];
                            levelLab.text = this.shipinNameArr[index]["level"] + tip[SkillEnum.JI_TEXT].msg;
                            showLevel = this.shipinNameArr[index]["level"];
                            break;
                    }
                    if (skillLevel < 20) {
                        this._viewUI.left_btn.visible = false;
                        this._viewUI.right_btn.visible = false;
                    }
                    else {
                        this._viewUI.left_btn.visible = true;
                        if (showLevel <= 10) {
                            this._viewUI.left_btn.visible = false;
                        }
                        this._viewUI.right_btn.visible = false;
                        if (showLevel + 10 <= skillLevel) {
                            this._viewUI.right_btn.visible = true;
                        }
                    }
                };
                /**渲染变身卡列表 */
                SkillLifeMediator.prototype.onKapianRender = function (cell, index) {
                    var kapianImg = cell.getChildByName("kapian_img");
                    if (this.dazaoObj[this.kapianArr[index]]["icon"] > SkillEnum.KAPIAN_IMG)
                        kapianImg.skin = "common/icon/avatarpartner/" + this.dazaoObj[this.kapianArr[index]]["icon"] + ".png";
                    else
                        kapianImg.skin = "common/icon/avatarrole/" + this.dazaoObj[this.kapianArr[index]]["icon"] + ".png";
                };
                /**注册点击监听 */
                SkillLifeMediator.prototype.registerEvent = function () {
                    this._viewUI.right_img.on(LEvent.MOUSE_DOWN, this, this.clickRight);
                    this._viewUI.left_img.on(LEvent.MOUSE_DOWN, this, this.clickLeft);
                    this._viewUI.right_btn.on(LEvent.MOUSE_DOWN, this, this.clickRightBtn);
                    this._viewUI.left_btn.on(LEvent.MOUSE_DOWN, this, this.clickLeftBtn);
                    this._viewUI.xueXiJiNeng_btn.on(LEvent.MOUSE_DOWN, this, this.clickUpdate);
                    this._viewUI.pengren_btn.on(LEvent.MOUSE_DOWN, this, this.clickPengren);
                    this._viewUI.lianjin_btn.on(LEvent.MOUSE_DOWN, this, this.clickLianjin);
                    this._viewUI.dazao_btn.on(LEvent.MOUSE_DOWN, this, this.clickDazao);
                    this._viewUI.shouhuo_btn.on(LEvent.MOUSE_DOWN, this, this.clickShouhuo);
                };
                /**收获技能翻页 */
                SkillLifeMediator.prototype.clickRight = function () {
                    var levelLab = this._viewUI.skill_list.getCell(this.selectNum).getChildByName("level_lab");
                    if (this.kapianNum > SkillEnum.MAX_SHOUHUO_LEVEL || Math.floor(this.kapianNum) / SkillEnum.TEN_LEVEL >= Math.floor(parseInt(levelLab.text) / SkillEnum.TEN_LEVEL) - 1)
                        return;
                    this.kapianNum += SkillEnum.TEN_LEVEL;
                    this.initShouhuo(this.kapianNum);
                    this.getShouhuoData();
                };
                SkillLifeMediator.prototype.clickLeft = function () {
                    if (this.kapianNum < SkillEnum.TEN_LEVEL)
                        return;
                    this.kapianNum -= SkillEnum.TEN_LEVEL;
                    this.initShouhuo(this.kapianNum);
                    this.getShouhuoData();
                };
                /**打造界面翻页 */
                SkillLifeMediator.prototype.clickRightBtn = function () {
                    var levelLab = this._viewUI.skill_list.getCell(this.selectNum).getChildByName("level_lab");
                    if (this.dazaoNum > 8 || this.dazaoNum >= Math.floor(parseInt(levelLab.text) / SkillEnum.TEN_LEVEL) - 1)
                        return;
                    this.dazaoNum += 1;
                    this._viewUI.daZao_list.scrollTo(this.dazaoNum);
                    this._viewUI.xiaoHaoHuoLi_lab.text = this.huoliNum + "/" + this.costObj[(this.dazaoNum + 1) * SkillEnum.TEN_LEVEL]["strengthCostList"][this.skillArr[this.selectNum]["strengthCostRule"] - 1]; //消耗活力
                };
                SkillLifeMediator.prototype.clickLeftBtn = function () {
                    if (this.dazaoNum <= 0)
                        return;
                    this.dazaoNum -= 1;
                    this._viewUI.daZao_list.scrollTo(this.dazaoNum);
                    this._viewUI.xiaoHaoHuoLi_lab.text = this.huoliNum + "/" + this.costObj[(this.dazaoNum + 1) * SkillEnum.TEN_LEVEL]["strengthCostList"][this.skillArr[this.selectNum]["strengthCostRule"] - 1]; //消耗活力
                };
                /** 点击升级*/
                SkillLifeMediator.prototype.clickUpdate = function () {
                    var needMoney = parseInt(this._viewUI.xuQiu_lab.text);
                    var needBanggong = parseInt(this._viewUI.xuQIu2_lab.text);
                    var skillid = this.skillArr[this.selectNum]["id"]; // 技能id
                    var skillzidianDataLevel = skill.models.SkillModel.getInstance().LiveSkilllevelData.get(skillid); // 通过id取他的等级
                    //当前等级大于玩家等级10级
                    if (skillzidianDataLevel >= HudModel.getInstance().levelNum + 10) {
                        var prompt_1 = HudModel.getInstance().promptAssembleBack(150016);
                        var disappearMsgTips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                        disappearMsgTips.onShow(prompt_1);
                    }
                    //如果银币不够
                    if (needMoney > HudModel.getInstance().sliverNum) {
                        var duihuanMoney = needMoney - HudModel.getInstance().sliverNum; //需要兑换的钱
                        this._JinBiBuZuViewMediator.onShow(false, duihuanMoney.toString(), Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI).toString(), Math.ceil(duihuanMoney / RoleEnum.JINBI_YINBI).toString());
                        this._JinBiBuZuViewMediator.once(modules.commonUI.USE_SILVER_EXCHANGE_EVENT, this, this.buySliverFromYuanBao, [Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI)]);
                        this._JinBiBuZuViewMediator.once(modules.commonUI.USE_YUANBAO_EXCHANGE_EVENT, this, this.goCharge, [Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI)]);
                    }
                    //如果帮贡不够
                    else if (needBanggong > HudModel.getInstance().gonghuiNum) {
                        var prompt_2 = HudModel.getInstance().promptAssembleBack(SkillEnum.BANGGONG_BUZU);
                        this.tips.onShow(prompt_2);
                    }
                    else
                        RequesterProtocols._instance.c2s_CRequestLearnLiveSkill(this.skillArr[this.selectNum]["id"]); //学习技能
                };
                /**仙晶兑换 */
                SkillLifeMediator.prototype.goCharge = function (yuanbao) {
                    var fuShiNum = HudModel.getInstance().fuShiNum;
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
                SkillLifeMediator.prototype.buySliverFromYuanBao = function (yuanbao) {
                    var fuShiNum = HudModel.getInstance().fuShiNum;
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
                SkillLifeMediator.prototype.goRecharge = function () {
                    modules.ModuleManager.jumpPage(modules.ModuleNames.SHOP, shopMediatorType.CHONGZHI, this._app);
                    game.modules.shop.models.ShopProxy._instance.event(game.modules.shop.models.Go_Charge); //前往充值界面。关闭当前界
                };
                /**烹饪 */
                SkillLifeMediator.prototype.clickPengren = function () {
                    var levelLab = this._viewUI.skill_list.getCell(this.selectNum).getChildByName("level_lab");
                    var needhuoli = this.costObj[parseInt(levelLab.text)]["strengthCostList"][this.skillArr[this.selectNum]["strengthCostRule"] - 1]; //当前技能所需活力
                    if (this.huoliNum < needhuoli) {
                        var prompt_3 = HudModel.getInstance().promptAssembleBack(SkillEnum.HUOLI_BUZU); //活力不足
                        this.tips.onShow(prompt_3);
                    }
                    else
                        RequesterProtocols._instance.c2s_CLiveSkillMakeFood(); //烹饪
                };
                /**打开炼金界面 */
                SkillLifeMediator.prototype.clickLianjin = function () {
                    this._SkillLianJinMediator.show();
                    this._SkillLianJinMediator.init(this.huolixiaohao);
                    modules.ModuleManager.hide(modules.ModuleNames.SKILL);
                };
                /**锻造 */
                SkillLifeMediator.prototype.clickDazao = function () {
                    var levelLab = this._viewUI.skill_list.getCell(this.selectNum).getChildByName("level_lab");
                    var needhuoli = this.costObj[parseInt(levelLab.text)]["strengthCostList"][this.skillArr[this.selectNum]["strengthCostRule"] - 1]; //当前技能所需活力
                    if (this.huoliNum < needhuoli) {
                        var prompt_4 = HudModel.getInstance().promptAssembleBack(SkillEnum.HUOLI_BUZU); //活力不足
                        this.tips.onShow(prompt_4);
                    }
                    else {
                        switch (this.selectNum) {
                            case 4:
                                RequesterProtocols._instance.c2s_CLiveSkillMakeStuff(this.wuqiArr[this.dazaoNum]["id"], 1); //锻造
                                break;
                            case 5:
                                RequesterProtocols._instance.c2s_CLiveSkillMakeStuff(this.fangjuArr[this.dazaoNum]["id"], 1); //裁缝
                                break;
                            case 6:
                                RequesterProtocols._instance.c2s_CLiveSkillMakeStuff(this.shipinArr[this.dazaoNum]["id"], 1); //珠宝
                                break;
                        }
                    }
                };
                /**制造变身卡 */
                SkillLifeMediator.prototype.clickShouhuo = function () {
                    var levelLab = this._viewUI.skill_list.getCell(this.selectNum).getChildByName("level_lab");
                    var needhuoli = this.costObj[parseInt(levelLab.text)]["strengthCostList"][this.skillArr[this.selectNum]["strengthCostRule"] - 1]; //当前技能所需活力
                    //如果道具不足
                    if (parseInt(this._viewUI.needNum_lab.text) == 0) {
                        var prompt_5 = HudModel.getInstance().promptAssembleBack(SkillEnum.DAOJU_BUZU);
                        this.tips.onShow(prompt_5);
                    }
                    //活力不足
                    else if (this.huoliNum < needhuoli) {
                        var prompt_6 = HudModel.getInstance().promptAssembleBack(SkillEnum.HUOLI_BUZU);
                        this.tips.onShow(prompt_6);
                    }
                    else
                        RequesterProtocols._instance.c2s_CLiveSkillMakeCard(this.shouhuoId);
                };
                /**初始化收获界面 */
                SkillLifeMediator.prototype.initShouhuo = function (level) {
                    //根据等级区间初始化不同的变身卡列表
                    if (0 <= level && level <= 10) {
                        this._viewUI.kapianName_lab.text = this.shouhuoObj[1]["desc"];
                        this._viewUI.costItem_img.skin = "common/icon/item/" + this.dazaoObj[this.shouhuoObj[1]["costitem"]]["icon"] + ".png";
                        this._viewUI.costItemName_lab.text = this.dazaoObj[this.shouhuoObj[1]["costitem"]]["name"];
                        this.shouhuoId = this.shouhuoObj[1]["id"];
                        this.kapianArr.length = 0;
                        for (var i = 0; i < this.shouhuoObj[1]["veccard"].length; i++) {
                            if (this.shouhuoObj[1]["veccard"][i] > SkillEnum.VCARD_START) {
                                this.kapianArr.push(this.shouhuoObj[1]["veccard"][i]);
                            }
                        }
                    }
                    else if (10 < level && level <= 20) {
                        this._viewUI.kapianName_lab.text = this.shouhuoObj[2]["desc"];
                        this._viewUI.costItem_img.skin = "common/icon/item/" + this.dazaoObj[this.shouhuoObj[2]["costitem"]]["icon"] + ".png";
                        this._viewUI.costItemName_lab.text = this.dazaoObj[this.shouhuoObj[2]["costitem"]]["name"];
                        this.shouhuoId = this.shouhuoObj[2]["id"];
                        this.kapianArr.length = 0;
                        for (var i = 0; i < this.shouhuoObj[2]["veccard"].length; i++) {
                            if (this.shouhuoObj[2]["veccard"][i] > SkillEnum.VCARD_START) {
                                this.kapianArr.push(this.shouhuoObj[2]["veccard"][i]);
                            }
                        }
                    }
                    else if (20 < level && level <= 30) {
                        this._viewUI.kapianName_lab.text = this.shouhuoObj[3]["desc"];
                        this._viewUI.costItem_img.skin = "common/icon/item/" + this.dazaoObj[this.shouhuoObj[3]["costitem"]]["icon"] + ".png";
                        this._viewUI.costItemName_lab.text = this.dazaoObj[this.shouhuoObj[3]["costitem"]]["name"];
                        this.shouhuoId = this.shouhuoObj[3]["id"];
                        this.kapianArr.length = 0;
                        for (var i = 0; i < this.shouhuoObj[3]["veccard"].length; i++) {
                            if (this.shouhuoObj[3]["veccard"][i] > SkillEnum.VCARD_START) {
                                this.kapianArr.push(this.shouhuoObj[3]["veccard"][i]);
                            }
                        }
                    }
                    else if (30 < level && level <= 40) {
                        this._viewUI.kapianName_lab.text = this.shouhuoObj[4]["desc"];
                        this._viewUI.costItem_img.skin = "common/icon/item/" + this.dazaoObj[this.shouhuoObj[4]["costitem"]]["icon"] + ".png";
                        this._viewUI.costItemName_lab.text = this.dazaoObj[this.shouhuoObj[4]["costitem"]]["name"];
                        this.shouhuoId = this.shouhuoObj[4]["id"];
                        this.kapianArr.length = 0;
                        for (var i = 0; i < this.shouhuoObj[4]["veccard"].length; i++) {
                            if (this.shouhuoObj[4]["veccard"][i] > SkillEnum.VCARD_START) {
                                this.kapianArr.push(this.shouhuoObj[4]["veccard"][i]);
                            }
                        }
                    }
                    else if (40 < level && level <= 50) {
                        this._viewUI.kapianName_lab.text = this.shouhuoObj[5]["desc"];
                        this._viewUI.costItem_img.skin = "common/icon/item/" + this.dazaoObj[this.shouhuoObj[5]["costitem"]]["icon"] + ".png";
                        this._viewUI.costItemName_lab.text = this.dazaoObj[this.shouhuoObj[5]["costitem"]]["name"];
                        this.shouhuoId = this.shouhuoObj[5]["id"];
                        this.kapianArr.length = 0;
                        for (var i = 0; i < this.shouhuoObj[5]["veccard"].length; i++) {
                            if (this.shouhuoObj[5]["veccard"][i] > SkillEnum.VCARD_START) {
                                this.kapianArr.push(this.shouhuoObj[5]["veccard"][i]);
                            }
                        }
                    }
                    else if (50 < level && level <= 60) {
                        this._viewUI.kapianName_lab.text = this.shouhuoObj[6]["desc"];
                        this._viewUI.costItem_img.skin = "common/icon/item/" + this.dazaoObj[this.shouhuoObj[6]["costitem"]]["icon"] + ".png";
                        this._viewUI.costItemName_lab.text = this.dazaoObj[this.shouhuoObj[6]["costitem"]]["name"];
                        this.shouhuoId = this.shouhuoObj[6]["id"];
                        this.kapianArr.length = 0;
                        for (var i = 0; i < this.shouhuoObj[6]["veccard"].length; i++) {
                            if (this.shouhuoObj[6]["veccard"][i] > SkillEnum.VCARD_START) {
                                this.kapianArr.push(this.shouhuoObj[6]["veccard"][i]);
                            }
                        }
                    }
                    else if (60 < level && level <= 70) {
                        this._viewUI.kapianName_lab.text = this.shouhuoObj[7]["desc"];
                        this._viewUI.costItem_img.skin = "common/icon/item/" + this.dazaoObj[this.shouhuoObj[7]["costitem"]]["icon"] + ".png";
                        this._viewUI.costItemName_lab.text = this.dazaoObj[this.shouhuoObj[7]["costitem"]]["name"];
                        this.shouhuoId = this.shouhuoObj[7]["id"];
                        this.kapianArr.length = 0;
                        for (var i = 0; i < this.shouhuoObj[7]["veccard"].length; i++) {
                            if (this.shouhuoObj[7]["veccard"][i] > SkillEnum.VCARD_START) {
                                this.kapianArr.push(this.shouhuoObj[7]["veccard"][i]);
                            }
                        }
                    }
                    else if (70 < level && level <= 80) {
                        this._viewUI.kapianName_lab.text = this.shouhuoObj[8]["desc"];
                        this._viewUI.costItem_img.skin = "common/icon/item/" + this.dazaoObj[this.shouhuoObj[8]["costitem"]]["icon"] + ".png";
                        this._viewUI.costItemName_lab.text = this.dazaoObj[this.shouhuoObj[8]["costitem"]]["name"];
                        this.shouhuoId = this.shouhuoObj[8]["id"];
                        this.kapianArr.length = 0;
                        for (var i = 0; i < this.shouhuoObj[8]["veccard"].length; i++) {
                            if (this.shouhuoObj[8]["veccard"][i] > SkillEnum.VCARD_START) {
                                this.kapianArr.push(this.shouhuoObj[8]["veccard"][i]);
                            }
                        }
                    }
                    else if (80 < level && level <= 100) {
                        this._viewUI.kapianName_lab.text = this.shouhuoObj[9]["desc"];
                        this._viewUI.costItem_img.skin = "common/icon/item/" + this.dazaoObj[this.shouhuoObj[9]["costitem"]]["icon"] + ".png";
                        this._viewUI.costItemName_lab.text = this.dazaoObj[this.shouhuoObj[9]["costitem"]]["name"];
                        this.shouhuoId = this.shouhuoObj[9]["id"];
                        this.kapianArr.length = 0;
                        for (var i = 0; i < this.shouhuoObj[9]["veccard"].length; i++) {
                            if (this.shouhuoObj[9]["veccard"][i] > SkillEnum.VCARD_START) {
                                this.kapianArr.push(this.shouhuoObj[9]["veccard"][i]);
                            }
                        }
                    }
                    //需要初始化所需道具的数量并变色
                    this._viewUI.needNum_lab.text = (BagModel.getInstance().chargeItemNum(this.shouhuoObj[this.shouhuoId]["costitem"])).toString();
                    if (parseInt(this._viewUI.needNum_lab.text) == 0) {
                        this._viewUI.needNum_lab.color = skill.models.SkillModel.chineseStr.red;
                        this._viewUI.costItemNum_lab.color = skill.models.SkillModel.chineseStr.red;
                    }
                    else {
                        this._viewUI.needNum_lab.color = skill.models.SkillModel.chineseStr.brown;
                        this._viewUI.costItemNum_lab.color = skill.models.SkillModel.chineseStr.brown;
                    }
                };
                /**处理技能列表点击 */
                SkillLifeMediator.prototype.onSelect = function (index) {
                    this.selectNum = index;
                    var nameLab = this._viewUI.skill_list.getCell(index).getChildByName("name_lab");
                    var levelLab = this._viewUI.skill_list.getCell(index).getChildByName("level_lab");
                    var jinengBtn = this._viewUI.skill_list.getCell(index).getChildByName("jineng_btn");
                    //点击更换按钮图片
                    jinengBtn.skin = "common/ui/tongyong/common_list_3textbg_dwn.png";
                    this._viewUI.titleName_lab.text = nameLab.text;
                    this._viewUI.titleLevel_lab.text = levelLab.text;
                    this._viewUI.xuQiu_lab.text = this.costObj[parseInt(levelLab.text) + 1]["silverCostList"][this.skillArr[index]["studyCostRule"] - 1]; //升级银两费用
                    this._viewUI.xuQIu2_lab.text = this.costObj[parseInt(levelLab.text) + 1]["guildContributeCostList"][this.skillArr[index]["studyCostRule"] - 1]; //升级帮贡费用
                    //根据升级费用改变颜色
                    if (parseInt(this._viewUI.xuQiu_lab.text) > parseInt(this._viewUI.yongYou1_lab.text)) {
                        this._viewUI.xuQiu_lab.color = skill.models.SkillModel.chineseStr.red; //更换需要银币的字体颜色
                    }
                    else
                        this._viewUI.xuQiu_lab.color = skill.models.SkillModel.chineseStr.green;
                    if (parseInt(this._viewUI.xuQIu2_lab.text) > parseInt(this._viewUI.yongYou2_lab.text)) {
                        this._viewUI.xuQIu2_lab.color = skill.models.SkillModel.chineseStr.red; //更换需要帮贡的字体颜色
                    }
                    else
                        this._viewUI.xuQIu2_lab.color = skill.models.SkillModel.chineseStr.green;
                    switch (index) {
                        case 0:
                        case 1:
                            this._viewUI.beiDong_box.visible = true;
                            this._viewUI.pengRen_box.visible = false;
                            this._viewUI.lianJin_box.visible = false;
                            this._viewUI.duanZao_box.visible = false;
                            this._viewUI.shouhuo_box.visible = false;
                            this._viewUI.huoli_box.visible = false;
                            this._viewUI.description_tet.text = this.skillArr[index]["description"]; //描述
                            this._viewUI.upgradeDesc1_lab.text = this.skillArr[index]["upgradeDesc"]; //效果
                            this._viewUI.upgradeDesc2_lab.text = this.skillArr[index]["upgradeDesc"];
                            this._viewUI.beiDongTouXiang_img.skin = this.skillImgArr[index].img;
                            this._viewUI.nowLife_lab.text = (parseInt(levelLab.text) * SkillEnum.TEN_LEVEL).toString(); //当前提升属性
                            this._viewUI.nextLife_lab.text = ((parseInt(levelLab.text) + 1) * SkillEnum.TEN_LEVEL).toString(); //下级提升属性
                            break;
                        case 2:
                            this._viewUI.beiDong_box.visible = false;
                            this._viewUI.pengRen_box.visible = true;
                            this._viewUI.lianJin_box.visible = false;
                            this._viewUI.duanZao_box.visible = false;
                            this._viewUI.shouhuo_box.visible = false;
                            this._viewUI.huoli_box.visible = true;
                            //达到等级，按钮可以点击
                            if (parseInt(levelLab.text) > 0)
                                this._viewUI.pengren_btn.disabled = false;
                            else
                                this._viewUI.pengren_btn.disabled = true;
                            this._viewUI.description_tet.text = this.skillArr[index]["description"]; //描述
                            this._viewUI.xiaoHaoHuoLi_lab.text = this.huoliNum + "/" + this.costObj[parseInt(levelLab.text) + 1]["strengthCostList"][this.skillArr[index]["strengthCostRule"] - 1]; //消耗活力
                            this.getPengrenData();
                            break;
                        case 3:
                            this._viewUI.beiDong_box.visible = false;
                            this._viewUI.pengRen_box.visible = false;
                            this._viewUI.lianJin_box.visible = true;
                            this._viewUI.duanZao_box.visible = false;
                            this._viewUI.shouhuo_box.visible = false;
                            this._viewUI.huoli_box.visible = true;
                            //达到等级，按钮可以点击
                            if (parseInt(levelLab.text) > 0)
                                this._viewUI.lianjin_btn.disabled = false;
                            else
                                this._viewUI.lianjin_btn.disabled = true;
                            this._viewUI.description_tet.text = this.skillArr[index]["description"]; //描述
                            this._viewUI.xiaoHaoHuoLi_lab.text = this.huoliNum + "/" + this.costObj[parseInt(levelLab.text) + 1]["strengthCostList"][this.skillArr[index]["strengthCostRule"] - 1]; //消耗活力
                            this.huolixiaohao = this.costObj[parseInt(levelLab.text) + 1]["strengthCostList"][this.skillArr[index]["strengthCostRule"] - 1];
                            break;
                        case 4:
                        case 5:
                        case 6:
                            this._viewUI.beiDong_box.visible = false;
                            this._viewUI.pengRen_box.visible = false;
                            this._viewUI.lianJin_box.visible = false;
                            this._viewUI.duanZao_box.visible = true;
                            this._viewUI.shouhuo_box.visible = false;
                            this._viewUI.huoli_box.visible = true;
                            this._viewUI.description_tet.text = this.skillArr[index]["description"]; //描述
                            if (0 <= parseInt(levelLab.text) && parseInt(levelLab.text) < SkillEnum.TEN_LEVEL) {
                                this.dazaoNum = 0;
                                this._viewUI.dazao_btn.disabled = true;
                            }
                            else {
                                this.dazaoNum = Math.floor(parseInt(levelLab.text) / SkillEnum.TEN_LEVEL) - 1;
                                this._viewUI.dazao_btn.disabled = false;
                            }
                            this._viewUI.xiaoHaoHuoLi_lab.text = this.huoliNum + "/" + this.costObj[parseInt(levelLab.text) + 1]["strengthCostList"][this.skillArr[index]["strengthCostRule"] - 1]; //消耗活力
                            this.getDuanzaoData();
                            break;
                        case 7:
                            this._viewUI.beiDong_box.visible = false;
                            this._viewUI.pengRen_box.visible = false;
                            this._viewUI.lianJin_box.visible = false;
                            this._viewUI.duanZao_box.visible = false;
                            this._viewUI.shouhuo_box.visible = true;
                            this._viewUI.huoli_box.visible = true;
                            //达到等级，按钮可以点击
                            if (parseInt(levelLab.text) >= SkillEnum.TEN_LEVEL)
                                this._viewUI.shouhuo_btn.disabled = false;
                            else
                                this._viewUI.shouhuo_btn.disabled = true;
                            this._viewUI.description_tet.text = this.skillArr[index]["description"]; //描述
                            this._viewUI.xiaoHaoHuoLi_lab.text = this.huoliNum + "/" + this.costObj[parseInt(levelLab.text) + 1]["strengthCostList"][this.skillArr[index]["strengthCostRule"] - 1]; //消耗活力
                            this.initShouhuo(parseInt(levelLab.text));
                            this.getShouhuoData();
                            break;
                    }
                };
                SkillLifeMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                    this.getSkillLevel();
                    this.initMoney();
                    //生活技能提示
                    if (HudModel.getInstance().yindaoId == YinDaoEnum.LIFESKILL_TIP_YINDAO)
                        this.lifeTipYindao();
                };
                /**显示提示 */
                SkillLifeMediator.prototype.lifeTipYindao = function () {
                    var tip = HudModel._instance.carroweffectData;
                    Laya.timer.loop(SkillEnum.YINDAO_TIME, this, this.closeAni);
                    this._viewUI.yindaoTip_htm.text = tip[SkillEnum.YINDAO_TIP].text;
                    this._viewUI.yindaoTip_img.visible = true;
                    HudModel.getInstance().yindaoId = YinDaoEnum.RESET_YINDAO;
                };
                /**关闭动画 */
                SkillLifeMediator.prototype.closeAni = function () {
                    Laya.timer.clear(this, this.closeAni);
                    this._viewUI.yindaoTip_img.visible = false;
                };
                SkillLifeMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                SkillLifeMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return SkillLifeMediator;
            }(game.modules.UiMediator));
            skill.SkillLifeMediator = SkillLifeMediator;
        })(skill = modules.skill || (modules.skill = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=SkillLifeMediator.js.map