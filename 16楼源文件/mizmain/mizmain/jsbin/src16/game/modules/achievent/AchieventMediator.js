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
* LJM
*/
var AchieventModel = game.modules.achievent.models.AchieventModel;
var AchieventInfoVo = game.modules.achievent.models.AchieventInfoVo;
var game;
(function (game) {
    var modules;
    (function (modules) {
        var achievent;
        (function (achievent) {
            var AchieventMediator = /** @class */ (function (_super) {
                __extends(AchieventMediator, _super);
                function AchieventMediator(uiLayer, app) {
                    var _this = _super.call(this, uiLayer) || this;
                    /** 成就等级 渲染数据 */
                    _this._achieventLevelArray = [];
                    /** 成就等级分类字典容器 */
                    _this._achieventContentArray = new Laya.Dictionary;
                    /** 当前选中标签 */
                    _this.selectIndex = 0;
                    /** 配置表初始化标志位 */
                    _this.initTableFlag = false;
                    /**  */
                    _this.achiNoFinished = [];
                    /** 存储已完成的成就id */
                    _this.achiFinished = [];
                    /** 存储已领取的成就Id */
                    _this.achiHasGet = [];
                    /** 当前选中的等级按钮 */
                    _this.saveLevelChannel = 1;
                    /** 是否选中 */
                    _this.chooseFlag = false;
                    /** 二级菜单选中对象 */
                    _this.MainselectIndex = -1;
                    /** 成就id百位数 */
                    _this.isPercentIle = [];
                    /** 已经显示过红点等级标签 不显示第二次 */
                    _this.levelRedDot = [];
                    /** 存储成就等级分类数据 */
                    _this.Group1 = [];
                    _this.Group2 = [];
                    _this.Group3 = [];
                    _this.Group4 = [];
                    _this.Group5 = [];
                    _this.Group6 = [];
                    _this.Group7 = [];
                    _this.Group8 = [];
                    _this._viewUI = new ui.common.AchievementUI();
                    _this._app = app;
                    _this.isCenter = false;
                    _this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, _this, _this.hide);
                    _this._initAchidata();
                    return _this;
                }
                /** 初始化等级数据 */
                AchieventMediator.prototype.initLevel = function () {
                    console.log("achieventLevelArray.length" + this._achieventLevelArray);
                    if (this._achieventLevelArray.length == 0)
                        return;
                    this._viewUI.achievementLevel_list.visible = true;
                    this._viewUI.achievementLevel_list.vScrollBarSkin = "";
                    this._viewUI.achievementLevel_list.repeatX = 2;
                    this._viewUI.achievementLevel_list.repeatY = this._achieventLevelArray.length / 2 + this._achieventLevelArray.length % 2;
                    this._viewUI.achievementLevel_list.array = this._achieventLevelArray;
                    this._viewUI.achievementLevel_list.spaceX = 5;
                    this._viewUI.achievementLevel_list.spaceY = 1;
                    this._viewUI.achievementLevel_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.achievementLevel_list.scrollBar.elasticDistance = 100;
                    this._viewUI.achievementLevel_list.scrollTo(this.selectIndex);
                    this._viewUI.achievementLevel_list.renderHandler = new Handler(this, this._showAchievenmentLevelRender);
                };
                /** 渲染等级数据 */
                AchieventMediator.prototype._showAchievenmentLevelRender = function (cell, index) {
                    var achvLv_btn = cell.getChildByName("achvLv_btn");
                    var red_dot_img = cell.getChildByName("red_dot_img");
                    red_dot_img.visible = false;
                    if (this.selectIndex != index)
                        achvLv_btn.selected = false;
                    if (!this.chooseFlag && index == 0)
                        achvLv_btn.selected = true;
                    this.isShowRedPot(index, red_dot_img);
                    achvLv_btn.on(LEvent.CLICK, this, this.selectButton, [achvLv_btn, index]);
                    achvLv_btn.label = this._achieventLevelArray[index];
                };
                /** p判断红点并显示
                 * @param _index 等级下标
                 * @param red_dot_img 红点ui
                */
                AchieventMediator.prototype.isShowRedPot = function (_lev_index, red_dot_img) {
                    if (_lev_index != -1 && red_dot_img) // 渲染传值
                     {
                        for (var _index = 0; _index < this.achiFinished.length; _index++) {
                            var digit = this.getGroup(this.achiFinished[_index]);
                            if (_lev_index == (digit - 1)) { /** 当前等级下标存在一个已完成数据 */
                                red_dot_img.visible = true;
                                break;
                            }
                        }
                    }
                };
                /** 选中等级按钮 */
                AchieventMediator.prototype.selectButton = function (btn, index) {
                    console.log("鼠标点击的index....." + index);
                    if (this.MainselectIndex != -1)
                        this.MainselectIndex = -1;
                    this.chooseFlag = true;
                    this.selectIndex = index;
                    this.initLevel();
                    btn.selected = true;
                    /** 每次点击刷新数据 */
                    RequesterProtocols._instance.c2s_get_archive_info();
                    this.saveLevelChannel = index + 1;
                };
                /** 初始化配置表 */
                AchieventMediator.prototype.initTable = function () {
                    this.initTableFlag = true;
                    var achieventLevel = achievent.models.AchieventModel.getInstance().guideCourseLabelDic;
                    console.log("achieventLevel..." + achieventLevel);
                    /** 初始化成就等级标签 */
                    var levellimit = HudModel.getInstance().levelNum + 10;
                    this._achieventLevelArray = [];
                    for (var index = 1; index <= Object.keys(achieventLevel).length; index++) {
                        var level = achieventLevel[index].level;
                        if (levellimit >= level) // 只显示 <= 当前等级+10的等级数据
                            this._achieventLevelArray.push(achieventLevel[index].name);
                    }
                };
                /** 成就配置表分类 */
                AchieventMediator.prototype._initAchidata = function () {
                    var achieventData = achievent.models.AchieventModel.getInstance().guideCourseDic;
                    /** 初始化成就等级内容标签 */
                    for (var i in achieventData) {
                        switch (Number(achieventData[i].group)) {
                            case 1:
                                this.Group1.push(achieventData[i]);
                                this._achieventContentArray.set(Number(achieventData[i].group), this.Group1);
                                break;
                            case 2:
                                this.Group2.push(achieventData[i]);
                                this._achieventContentArray.set(Number(achieventData[i].group), this.Group2);
                                break;
                            case 3:
                                this.Group3.push(achieventData[i]);
                                this._achieventContentArray.set(Number(achieventData[i].group), this.Group3);
                                break;
                            case 4:
                                this.Group4.push(achieventData[i]);
                                this._achieventContentArray.set(Number(achieventData[i].group), this.Group4);
                                break;
                            case 5:
                                this.Group5.push(achieventData[i]);
                                this._achieventContentArray.set(Number(achieventData[i].group), this.Group5);
                                break;
                            case 6:
                                this.Group6.push(achieventData[i]);
                                this._achieventContentArray.set(Number(achieventData[i].group), this.Group6);
                                break;
                            case 7:
                                this.Group7.push(achieventData[i]);
                                this._achieventContentArray.set(Number(achieventData[i].group), this.Group7);
                                break;
                            case 8:
                                this.Group8.push(achieventData[i]);
                                this._achieventContentArray.set(Number(achieventData[i].group), this.Group8);
                                break;
                            default:
                                break;
                        }
                    }
                };
                /** 初始化成就内容 */
                AchieventMediator.prototype.initContent = function (index) {
                    this._viewUI.achivContent_list.array = [];
                    this.achieventContent = this._achieventContentArray.get(index);
                    if (this.achieventContent.length == 0)
                        return;
                    this._viewUI.achivContent_list.visible = true;
                    this._viewUI.achivContent_list.vScrollBarSkin = "";
                    this._viewUI.achivContent_list.repeatY = this.achieventContent.length;
                    this._viewUI.achivContent_list.array = this.achieventContent;
                    this._viewUI.achivContent_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.achivContent_list.scrollBar.elasticDistance = 100;
                    if (this.MainselectIndex && this.MainselectIndex != -1) {
                        this._viewUI.achivContent_list.scrollTo(this.MainselectIndex);
                    }
                    this._viewUI.achivContent_list.renderHandler = new Handler(this, this._showAchievenmentContentRender);
                };
                /** 渲染成就数据 */
                AchieventMediator.prototype._showAchievenmentContentRender = function (cell, index) {
                    var isFinish_img = cell.getChildByName("isFinish_img");
                    var achv_btn = cell.getChildByName("achv_btn");
                    var achvDetails_lab = cell.getChildByName("achvDetails_lab");
                    var achvReward_lab = cell.getChildByName("achvReward_lab");
                    var achvName_lab = cell.getChildByName("achvName_lab");
                    var achvIcon_img = cell.getChildByName("whiteBg_img").getChildByName("achvIcon_img");
                    achvDetails_lab.text = this.achieventContent[index].info;
                    if (achvDetails_lab.text.length <= 11) { /** 一行 */
                        achvDetails_lab.top = 50;
                    }
                    else if (achvDetails_lab.text.length > 11 && achvDetails_lab.text.length <= 22) {
                        achvDetails_lab.top = 40;
                    }
                    else if (achvDetails_lab.text.length > 22) {
                        achvDetails_lab.top = 37;
                    }
                    achvName_lab.innerHTML = this.achieventContent[index].name;
                    /** 奖励数据填充 */
                    for (var num = 0; num < this.achieventContent[index].itemtexts.length; num++) {
                        if (this.achieventContent[index].itemtexts[num] != "0") {
                            var reward = this.achieventContent[index].itemtexts[num];
                            break;
                        }
                    }
                    if (this.achiHasGet.length != 0 && this.achiHasGet.indexOf(this.achieventContent[index].id) != -1) {
                        console.log("已领奖...");
                        achv_btn.visible = false;
                        isFinish_img.visible = true;
                    }
                    else if (this.achiFinished.length != 0 && this.achiFinished.indexOf(this.achieventContent[index].id) != -1) {
                        achv_btn.visible = true;
                        achv_btn.label = "领取奖励";
                        isFinish_img.visible = true;
                        var state = 1;
                        achv_btn.off(LEvent.MOUSE_UP, this, this.goLogic);
                        achv_btn.on(LEvent.MOUSE_UP, this, this.AskReward, [this.achieventContent[index].id]);
                    }
                    else {
                        achv_btn.visible = true;
                        achv_btn.label = "前往";
                        isFinish_img.visible = false;
                        var state = 0;
                        achv_btn.off(LEvent.MOUSE_UP, this, this.AskReward);
                        achv_btn.on(LEvent.MOUSE_UP, this, this.goLogic, [this.achieventContent[index], index]);
                    }
                    achvReward_lab.text = "奖励:  " + reward;
                    achvReward_lab.y = 100;
                    var icon = Number(this.achieventContent[index].image);
                    if (icon > 0 && icon <= 10000) { //技能区间
                        achvIcon_img.skin = "icon/skill/" + this.achieventContent[index].image + ".png";
                    }
                    else if (icon > 20000 && icon <= 30000) { //物品区间
                        achvIcon_img.skin = "icon/item/" + this.achieventContent[index].image + ".png";
                    }
                    else if (icon > 30000 && icon <= 30500) { //主角，NPC
                        achvIcon_img.skin = "icon/avatarrole/" + this.achieventContent[index].image + ".png";
                    }
                    else if (icon > 30500 && icon <= 31000) { //怪物
                        achvIcon_img.skin = "icon/avatarmonster/" + this.achieventContent[index].image + ".png";
                    }
                    else if (icon > 31000 && icon <= 31100) { //助战
                        achvIcon_img.skin = "icon/avatarpartner/" + this.achieventContent[index].image + ".png";
                    }
                    else if (icon > 31100 && icon <= 31200) { //坐骑
                        achvIcon_img.skin = "icon/avatarmount/" + this.achieventContent[index].image + ".png";
                    }
                    else if (icon > 31200 && icon <= 32000) { //宠物
                        achvIcon_img.skin = "icon/avatarpet/" + this.achieventContent[index].image + ".png";
                    }
                };
                /** 完成成就 领取奖励请求
                 * @param AchiId 成就ID
                */
                AchieventMediator.prototype.AskReward = function (AchiId) {
                    console.log("请求的成就Id......" + AchiId);
                    RequesterProtocols._instance.c2s_get_archive_award(AchiId);
                };
                /** 刷新数据 */
                AchieventMediator.prototype.refreshData = function () {
                    // this.isPercentIle = [];
                    this.AchieventInfoArray = AchieventModel._instance.AchieventInfo; //
                    if (this.AchieventInfoArray == undefined)
                        return;
                    this._isclear(this.AchieventInfoArray.length);
                    console.log("this.AchieventInfoArray.length....vv." + this.AchieventInfoArray.length);
                    console.log("this.AchieventInfoArray....vv." + this.AchieventInfoArray);
                    for (var index = 0; index < this.AchieventInfoArray.length; index++) {
                        console.log("this.AchieventInfoArray[index].state..refreshData....." + this.AchieventInfoArray[index].state);
                        if (this.AchieventInfoArray[index].state == 1) { //已完成
                            this.achiFinished.push(this.AchieventInfoArray[index].archiveid);
                            console.log('this.achiFinished====================' + this.achiFinished);
                            var hasGetId = this.AchieventInfoArray[index].archiveid;
                            this.updateGet(hasGetId);
                        }
                        else if (this.AchieventInfoArray[index].state == 2) { //已领奖
                            this.achiHasGet.push(this.AchieventInfoArray[index].archiveid);
                            console.log("this.achiHasGet..refreshData..." + this.achiHasGet);
                            var hasRewardId = this.AchieventInfoArray[index].archiveid; //101
                            this.updataRewarded(hasRewardId);
                            this.judgeIsTips(hasRewardId);
                            console.log("hasRewardId+++++++++" + hasRewardId);
                        }
                    }
                    this.initLevel();
                    /** 刷新等级红点 */
                    this.initContent(this.saveLevelChannel);
                };
                /** 判断是否是银币奖励并弹窗。客户端组装 */
                AchieventMediator.prototype.judgeIsTips = function (hasRewardId) {
                    if (this.AchieventInfoArray.length > 1)
                        return;
                    var achieventData = achievent.models.AchieventModel.getInstance().guideCourseDic;
                    var isYinBi = achieventData[hasRewardId].itemtexts[9]; //9是银币专属值
                    if (isYinBi == "0")
                        return;
                    var _yinbi = isYinBi.split("银币");
                    var disappearMessageTipsMediator = new DisappearMessageTipsMediator(this._app);
                    var chatdata = HudModel.getInstance().promptAssembleBack(PromptExplain.GetYINBI, _yinbi);
                    disappearMessageTipsMediator.onShow(chatdata);
                };
                /** 根据成就数据判断刷新已完成和已领奖数组 */
                AchieventMediator.prototype._isclear = function (len) {
                    if (len == 1) //刷新单条数据
                     {
                        var hasGetId = this.AchieventInfoArray[0].archiveid;
                        var state = this.AchieventInfoArray[0].state;
                        var index = this.achiFinished.indexOf(hasGetId);
                        /** 条件变为已领奖，移除在已完成的数组的位置 */
                        if (state == 2 && index != -1)
                            this.achiFinished.splice(index, 1);
                    }
                    else {
                        this.achiHasGet = [];
                        this.achiFinished = [];
                    }
                };
                /** 更新已领取的奖励位置 */
                AchieventMediator.prototype.updataRewarded = function (hasGetId) {
                    console.log("hasRewarded+++++++++" + hasGetId);
                    // this.percentIle(hasGetId);
                    /**  判断组别*/
                    var digit = this.getGroup(hasGetId);
                    if (this.selectIndex != (digit - 1))
                        return;
                    /** 数组中的位置 */
                    var num = hasGetId % 10 - 1;
                    switch (digit) {
                        case 1:
                            for (var gp1 = 0; gp1 < this.Group1.length; gp1++) {
                                if (Number(this.Group1[gp1].id) == hasGetId) {
                                    num = gp1;
                                }
                            }
                            var moveDom = this.Group1[num];
                            if (typeof (moveDom) != "undefined") {
                                this.Group1.splice(num, 1);
                                this.Group1.push(moveDom);
                            }
                            break;
                        case 2:
                            for (var gp2 = 0; gp2 < this.Group2.length; gp2++) {
                                if (Number(this.Group2[gp2].id) == hasGetId)
                                    num = gp2;
                            }
                            var moveDom = this.Group2[num];
                            if (typeof (moveDom) != "undefined") {
                                this.Group2.splice(num, 1);
                                this.Group2.push(moveDom);
                            }
                            break;
                        case 3:
                            for (var gp3 = 0; gp3 < this.Group3.length; gp3++) {
                                if (Number(this.Group3[gp3].id) == hasGetId)
                                    num = gp3;
                            }
                            var moveDom = this.Group3[num];
                            if (typeof (moveDom) != "undefined") {
                                this.Group3.splice(num, 1);
                                this.Group3.push(moveDom);
                            }
                            break;
                        case 4:
                            for (var gp4 = 0; gp4 < this.Group4.length; gp4++) {
                                if (Number(this.Group4[gp4].id) == hasGetId)
                                    num = gp4;
                            }
                            var moveDom = this.Group4[num];
                            if (typeof (moveDom) != "undefined") {
                                this.Group4.splice(num, 1);
                                this.Group4.push(moveDom);
                            }
                            break;
                        case 5:
                            for (var gp5 = 0; gp5 < this.Group5.length; gp5++) {
                                if (Number(this.Group5[gp5].id) == hasGetId)
                                    num = gp5;
                            }
                            var moveDom = this.Group5[num];
                            if (typeof (moveDom) != "undefined") {
                                this.Group5.splice(num, 1);
                                this.Group5.push(moveDom);
                            }
                            break;
                        case 6:
                            for (var gp6 = 0; gp6 < this.Group6.length; gp6++) {
                                if (Number(this.Group6[gp6].id) == hasGetId)
                                    num = gp6;
                            }
                            var moveDom = this.Group6[num];
                            if (typeof (moveDom) != "undefined") {
                                this.Group6.splice(num, 1);
                                this.Group6.push(moveDom);
                            }
                            break;
                        case 7:
                            for (var gp7 = 0; gp7 < this.Group7.length; gp7++) {
                                if (Number(this.Group7[gp7].id) == hasGetId)
                                    num = gp7;
                            }
                            var moveDom = this.Group7[num];
                            if (typeof (moveDom) != "undefined") {
                                this.Group7.splice(num, 1);
                                this.Group7.push(moveDom);
                            }
                            break;
                        case 8:
                            for (var gp8 = 0; gp8 < this.Group8.length; gp8++) {
                                if (Number(this.Group8[gp8].id) == hasGetId)
                                    num = gp8;
                            }
                            var moveDom = this.Group8[num];
                            if (typeof (moveDom) != "undefined") {
                                this.Group8.splice(num, 1);
                                this.Group8.push(moveDom);
                            }
                            break;
                        default:
                            break;
                    }
                };
                /** 根据成就Id 获取成就的组别
                 * @param getId 成就id
                 */
                AchieventMediator.prototype.getGroup = function (getId) {
                    do {
                        getId = parseInt((getId / 10).toString());
                    } while (getId >= 10);
                    return getId;
                };
                /** 更新已完成奖励的位置 */
                AchieventMediator.prototype.updateGet = function (hasGetId) {
                    console.log("hasGet+++++++++" + hasGetId);
                    // this.percentIle(hasGetId);
                    /**  判断组别*/
                    var digit = this.getGroup(hasGetId);
                    if (this.selectIndex != (digit - 1))
                        return;
                    /** 在数组位置 */
                    var num = hasGetId % 10 - 1;
                    switch (digit) {
                        case 1:
                            for (var gp1 = 0; gp1 < this.Group1.length; gp1++) {
                                if (Number(this.Group1[gp1].id) == hasGetId)
                                    num = gp1;
                            }
                            var moveDom = this.Group1[num];
                            if (typeof (moveDom) != "undefined") {
                                this.Group1.splice(num, 1);
                                this.Group1.splice(0, 0, moveDom);
                            }
                            break;
                        case 2:
                            for (var gp2 = 0; gp2 < this.Group2.length; gp2++) {
                                if (Number(this.Group2[gp2].id) == hasGetId)
                                    num = gp2;
                            }
                            var moveDom = this.Group2[num];
                            if (typeof (moveDom) != "undefined") {
                                this.Group2.splice(num, 1);
                                this.Group2.splice(0, 0, moveDom);
                            }
                            break;
                        case 3:
                            for (var gp3 = 0; gp3 < this.Group3.length; gp3++) {
                                if (Number(this.Group3[gp3].id) == hasGetId)
                                    num = gp3;
                            }
                            var moveDom = this.Group3[num];
                            if (typeof (moveDom) != "undefined") {
                                this.Group3.splice(num, 1);
                                this.Group3.splice(0, 0, moveDom);
                            }
                            break;
                        case 4:
                            for (var gp4 = 0; gp4 < this.Group4.length; gp4++) {
                                if (Number(this.Group4[gp4].id) == hasGetId)
                                    num = gp4;
                            }
                            var moveDom = this.Group4[num];
                            if (typeof (moveDom) != "undefined") {
                                this.Group4.splice(num, 1);
                                this.Group4.splice(0, 0, moveDom);
                            }
                            break;
                        case 5:
                            for (var gp5 = 0; gp5 < this.Group5.length; gp5++) {
                                if (Number(this.Group5[gp5].id) == hasGetId)
                                    num = gp5;
                            }
                            var moveDom = this.Group5[num];
                            if (typeof (moveDom) != "undefined") {
                                this.Group5.splice(num, 1);
                                this.Group5.splice(0, 0, moveDom);
                            }
                            break;
                        case 6:
                            for (var gp6 = 0; gp6 < this.Group6.length; gp6++) {
                                if (Number(this.Group6[gp6].id) == hasGetId)
                                    num = gp6;
                            }
                            var moveDom = this.Group6[num];
                            if (typeof (moveDom) != "undefined") {
                                this.Group6.splice(num, 1);
                                this.Group6.splice(0, 0, moveDom);
                            }
                            break;
                        case 7:
                            for (var gp7 = 0; gp7 < this.Group7.length; gp7++) {
                                if (Number(this.Group7[gp7].id) == hasGetId)
                                    num = gp7;
                            }
                            var moveDom = this.Group7[num];
                            if (typeof (moveDom) != "undefined") {
                                this.Group7.splice(num, 1);
                                this.Group7.splice(0, 0, moveDom);
                            }
                            break;
                        case 8:
                            for (var gp8 = 0; gp8 < this.Group8.length; gp8++) {
                                if (Number(this.Group8[gp8].id) == hasGetId)
                                    num = gp8;
                            }
                            var moveDom = this.Group8[num];
                            if (typeof (moveDom) != "undefined") {
                                this.Group8.splice(num, 1);
                                this.Group8.splice(0, 0, moveDom);
                            }
                            break;
                        default:
                            break;
                    }
                };
                /** 元素去重 */
                AchieventMediator.prototype.duplicateRemoval = function (array) {
                    var temp = [];
                    for (var temps = 0; temps < array.length; temps++) {
                        if (temp.indexOf(array[temps]) == -1) {
                            temp.push(array[temps]);
                        }
                    }
                    return temp;
                };
                // /** 计算个位数 */
                // private percentIle(hasGetId:number):void
                // {
                // 			if(hasGetId/10 >=10)
                // 			{
                // 				this.percentIle(hasGetId/10);
                // 			}else
                // 			{
                // 			var integer = Math.floor(hasGetId/10) ;
                // 			this.isPercentIle.push(integer);
                // 			}
                // }
                AchieventMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                    console.log("AchieventMediator show() :::初始化界面时向服务端请求成就数据~");
                    RequesterProtocols._instance.c2s_get_archive_info();
                    this._achieventLevel = achievent.models.AchieventModel.getInstance().guideCourseLabelDic;
                    // if(!this.initTableFlag){
                    this.initTable();
                    // }else{
                    // 	console.log("已经初始化过成就类表格，不再初始化~");
                    // }	
                    // this.initLevel();
                    if (!this.chooseFlag)
                        this.initContent(1);
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.OPEN_EVENT);
                };
                /** 前往逻辑事件 */
                AchieventMediator.prototype.goLogic = function (guidebasevo, index) {
                    this.MainselectIndex = this._viewUI.achivContent_list.startIndex;
                    /** 前往逻辑 */
                    var enterlgic = guidebasevo.enter;
                    /** 完成逻辑 */
                    var finish = guidebasevo.finish;
                    var enterlink = guidebasevo.enterlink;
                    /** 前往等级 */
                    var enterlevel = guidebasevo.enterlevel;
                    var currentlevel = HudModel.getInstance().levelNum; //LoginModel.getInstance().roleDetail.level;
                    /** 当前等级小于前往等级 弹窗提示 */
                    if (currentlevel < enterlevel) {
                        var arr = [];
                        arr.push(enterlevel);
                        var prompt_1 = HudModel.getInstance().promptAssembleBack(PromptExplain.ACHI_LEVELlIMIT, arr);
                        this.DisappearMessageTipsMediator = new DisappearMessageTipsMediator(this._app);
                        this.DisappearMessageTipsMediator.onShow(prompt_1);
                        return;
                    }
                    if (enterlgic == AchieventGoLogic.OPEN_INTERFACE) { /** 打开界面 */
                        if (finish == 2) { /** 好友界面添加 */
                            this.onLoadAddFriendsSystem();
                        }
                        else if (finish == 4) { /** 助战界面 */
                            this.onLoadZhuZhanSystem();
                        }
                        else if (finish == 7 || finish == 19) { /** 战斗技能 */
                            this.onLoadSkillSystem(1);
                        }
                        else if (finish == 24) { /** 红包界面 */
                            this.onLoadRedPacketSystem();
                        }
                        else if (finish == 26) { /** 好友界面 */
                            this.onLoadFriendSystem();
                        }
                        else if (finish == 8) { /** 聊天界面 */
                            this.onLoadWorldCaht();
                        }
                        else if (finish == 10) { /** 活动表中的内容 */
                            this.onLoadActivitySystem();
                        }
                        else if (finish == 25) { /** 好友赠送礼物 */
                            this.onLoadGiftView();
                        }
                        else if (finish == 27 || finish == 33 || finish == 34 || finish == 40) { /** 骑坐骑 背包界面 */
                            this.onLoadBagSystem();
                        }
                        else if (finish == 13 || finish == 32) { /** 打造界面 */
                            this.onLoadStrengthSystem(0);
                        }
                        else if (finish == 14 || finish == 46) { /** 镶嵌界面 */
                            this.onLoadStrengthSystem(1);
                        }
                        else if (finish == 15) { /** 排行榜界面 */
                            this.onLoadRankingListView();
                        }
                        else if (finish == 29) { /** 周历 */
                            this.onLoadZhouLiView();
                        }
                        else if (finish == 30) { /** 练宠界面 */
                            this.onLoadPetSystem(1);
                        }
                        else if (finish == 28) { /** 属性界面 */
                            this.onLoadPetSystem(0);
                        }
                        else if (finish == 48) { /** 积分兑换 */
                            this.onLoadExchangeView();
                        }
                        else if (finish == 16) { /** 专精技能 */
                            this.onLoadSkillSystem(2);
                        }
                        else if (finish == 47) { /** 工会副本 */
                        }
                        else if (finish == 38 || finish == 20) { /** 镶嵌界面 */
                            this.onLoadStrengthSystem(1);
                        }
                        else if (finish == 39) { /** 角色信息 */
                            this.onLoadRoleInfo();
                        }
                        else if (finish == 35) { /**援助战斗20次 练宠？ */
                            this.onLoadPetSystem(1);
                        }
                        else if (finish == 1) { /** 宠物图鉴 */
                            this.onLoadPetSystem(3);
                        }
                        else if (finish == 36 || finish == 37) { /** 宠物学习技能 或 法术认证*/
                            this.onLoadPetSystem(1);
                        }
                        else if (finish == 41) { /** 练宠界面 合宠子界面 */
                            this.onLoadPetSystem(1);
                        }
                        else if (finish == 47) { /** 装备修理 */
                            this.onLoadStrengthSystem(3);
                        }
                        else if (finish == 42) { /** 生活技能 */
                            this.onLoadSkillSystem(1);
                        }
                        else if (finish == 31) { /** 宠物 属性界面 */
                            this.onLoadPetSystem(0);
                        }
                        else if (finish == 21) { /** 宠物图鉴 */
                            this.onLoadPetSystem(3);
                        }
                        else if (finish == 44) { /** 练宠 的合宠 */
                            this.onLoadPetSystem(1);
                        }
                        modules.ModuleManager.hide(modules.ModuleNames.ACHIEVENT);
                        LoginModel.getInstance().CommonPage = "Achievement";
                    }
                    else if (enterlgic == AchieventGoLogic.FIND_NPC) { /** 找NPC */
                        var isinteam = this._isInTeam();
                        if (isinteam)
                            return;
                        var npcinfo = game.modules.mainhud.models.HudModel.getInstance().cNPCInfoData[enterlink];
                        if (typeof (npcinfo) == "undefined") {
                            modules.ModuleManager.hide(modules.ModuleNames.ACHIEVENT);
                            return;
                        }
                        var mapId = npcinfo.mapid;
                        HudModel.getInstance().useapp = this._app;
                        this._app.sceneRoot.istask = 2;
                        HudModel.getInstance().jumpmap(mapId, enterlink);
                        modules.ModuleManager.hide(modules.ModuleNames.ACHIEVENT);
                    }
                    else if (enterlgic == AchieventGoLogic.CONTAIN_MAIN_TASK) { /** 继续主线任务 */
                        var isinteam = this._isInTeam();
                        if (isinteam)
                            return;
                        var currentMainTaskKey = Taskmodels.getInstance().maintask.keys;
                        var info = game.modules.task.models.TaskModel.getInstance().missionCMainMissionInfoData[currentMainTaskKey[0]];
                        HudModel.getInstance().jumpmapid = info.ActiveInfoMapID;
                        HudModel.getInstance().tasktype = info.MissionType;
                        HudModel.getInstance().desnpc.x = info.ActiveInfoLeftPos;
                        HudModel.getInstance().desnpc.y = info.ActiveInfoTopPos;
                        HudModel.getInstance().npcid = info.ActiveInfoNpcID;
                        HudModel.getInstance().eventid = info.id;
                        HudModel.getInstance().useapp = this._app;
                        HudModel.getInstance().taskid = currentMainTaskKey[0];
                        this._app.sceneRoot.istask = 2;
                        HudModel.getInstance().taskstart();
                        modules.ModuleManager.hide(modules.ModuleNames.ACHIEVENT);
                    }
                    else if (enterlgic == AchieventGoLogic.FIND_NPC_MASTER) { /** 找师傅Npc */
                        var isinteam = this._isInTeam();
                        if (isinteam)
                            return;
                        var school = LoginModel.getInstance().roleDetail.school;
                        var masterId = AchieventModel.getInstance().MasterNpcDic[school].masterid;
                        var schoolInfo = modules.createrole.models.LoginModel.getInstance().schoolInfo[school]; //z职业配置表中的内容
                        var MapId = schoolInfo.schoolmapid;
                        HudModel.getInstance().useapp = this._app;
                        this._app.sceneRoot.istask = 2;
                        HudModel.getInstance().jumpmap(MapId, masterId);
                        modules.ModuleManager.hide(modules.ModuleNames.ACHIEVENT);
                    }
                    else if (enterlgic == AchieventGoLogic.FAMILY_EVENT) { /** 帮会相关 */
                        /** 首先判断是否加入工会，有跳到相关界面 没有则跳到帮派申请界面 */
                        var clanNum = HudModel.getInstance().clankey;
                        var flag = false;
                        flag = clanNum > 0 ? true : false;
                        if (!flag) { /** 没有帮派 */
                            var FamilyJoinViewMediator = void 0;
                            FamilyJoinViewMediator = new modules.family.FamilyJoinViewMediator(this._app);
                            modules.ModuleManager.hide(modules.ModuleNames.ACHIEVENT);
                            LoginModel.getInstance().CommonPage = "Achievement";
                            FamilyJoinViewMediator.show();
                        }
                        else { /** 有帮派 判断相应的逻辑线 */
                            if (finish == 5) { /** 帮派发言 */
                                ChatModel.getInstance().Firstchannel = 4;
                                modules.ModuleManager.show(modules.ModuleNames.Chat, this._app);
                                modules.ModuleManager.hide(modules.ModuleNames.ACHIEVENT);
                            }
                            else if (finish == 43) { /** 工会符文 */
                                var FamilyFuWenViewMediator = void 0;
                                FamilyFuWenViewMediator = new modules.family.FamilyFuWenViewMediator(this._app);
                                FamilyFuWenViewMediator.show();
                                modules.ModuleManager.hide(modules.ModuleNames.ACHIEVENT);
                                LoginModel.getInstance().CommonPage = "Achievement";
                            }
                        }
                    }
                };
                /** 判断组队状态 */
                AchieventMediator.prototype._isInTeam = function () {
                    var inTeamGroup = HudModel.getInstance().chargeInGroup();
                    if (inTeamGroup) //处于组队
                     {
                        var chattext = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[PromptExplain.IN_TEAM_GROUP];
                        var tips_1 = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                        tips_1.onShow(chattext.msg);
                        return true;
                    }
                    else
                        return false;
                };
                /** 角色信息界面 */
                AchieventMediator.prototype.onLoadRoleInfo = function () {
                    modules.ModuleManager.show(modules.ModuleNames.ROLE_Info, this._app);
                    RoleInfoModel.getInstance().currentKey = 2;
                };
                /** 积分兑换 */
                AchieventMediator.prototype.onLoadExchangeView = function () {
                    var RoleJiFenDuiHuanMediator;
                    RoleJiFenDuiHuanMediator = new game.modules.roleinfo.RoleJiFenDuiHuanMediator(this._app);
                    RoleJiFenDuiHuanMediator.show();
                };
                /** 宠物界面 */
                AchieventMediator.prototype.onLoadPetSystem = function (index) {
                    var petNum = game.modules.pet.models.PetModel.getInstance().pets.keys.length;
                    if (petNum == 0) { /** 没有宠物弹窗 */
                        var promptId = PromptExplain.COMLE_MAIN_PET_TASK;
                        var prompt_2 = HudModel.getInstance().promptAssembleBack(promptId);
                        this.DisappearMessageTipsMediator = new DisappearMessageTipsMediator(this._app);
                        this.DisappearMessageTipsMediator.onShow(prompt_2);
                    }
                    else {
                        PetModel.getInstance().tabnum = index;
                        modules.ModuleManager.show(modules.ModuleNames.PET, this._app);
                    }
                };
                /** 周历界面 */
                AchieventMediator.prototype.onLoadZhouLiView = function () {
                    var ActivityZhouLiMediator;
                    ActivityZhouLiMediator = new game.modules.activity.ActivityZhouLiMediator(this._app);
                    ActivityZhouLiMediator.show();
                };
                /** 排行榜界面 */
                AchieventMediator.prototype.onLoadRankingListView = function () {
                    modules.ModuleManager.show(modules.ModuleNames.RANKING_LIST, this._app);
                };
                /** 强化界面 */
                AchieventMediator.prototype.onLoadStrengthSystem = function (index) {
                    StrengTheningModel.getInstance().tabNum = index;
                    modules.ModuleManager.show(modules.ModuleNames.STRENG_THENING, this._app);
                    LoginModel.getInstance().transferInterface = modules.ModuleNames.STRENG_THENING;
                };
                /** 背包界面 */
                AchieventMediator.prototype.onLoadBagSystem = function () {
                    modules.ModuleManager.show(modules.ModuleNames.BAG, this._app);
                };
                /** 好友赠送礼物 */
                AchieventMediator.prototype.onLoadGiftView = function () {
                    var GiveGiftViewMediator;
                    GiveGiftViewMediator = new game.modules.friend.GiveGiftViewMediator(this._app);
                    GiveGiftViewMediator.show(true);
                };
                /** 活动表中的内容 */
                AchieventMediator.prototype.onLoadActivitySystem = function () {
                    ActivityModel.getInstance().firstInterface = 1;
                    modules.ModuleManager.show(modules.ModuleNames.ACTIVITY, this._app);
                };
                /** 世界聊天频道 */
                AchieventMediator.prototype.onLoadWorldCaht = function () {
                    ChatModel.getInstance().Firstchannel = 1;
                    modules.ModuleManager.show(modules.ModuleNames.Chat, this._app);
                };
                /** 好友界面 */
                AchieventMediator.prototype.onLoadFriendSystem = function () {
                    modules.ModuleManager.show(modules.ModuleNames.FRIEND, this._app);
                };
                /** 红包界面 */
                AchieventMediator.prototype.onLoadRedPacketSystem = function () {
                    modules.ModuleManager.show(modules.ModuleNames.RED_PACKET, this._app);
                };
                /** 战斗技能 */
                AchieventMediator.prototype.onLoadSkillSystem = function (index) {
                    game.modules.skill.models.SkillModel.getInstance().currenTabNum = index;
                    modules.ModuleManager.show(modules.ModuleNames.SKILL, this._app);
                };
                /** 助战界面 */
                AchieventMediator.prototype.onLoadZhuZhanSystem = function () {
                    modules.ModuleManager.show(modules.ModuleNames.HUOBAN, this._app);
                };
                /** 好友界面 */
                AchieventMediator.prototype.onLoadAddFriendsSystem = function () {
                    var AddFriendViewMediator;
                    AddFriendViewMediator = new game.modules.friend.AddFriendViewMediator(this._app);
                    AddFriendViewMediator.show();
                };
                AchieventMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    modules.ModuleManager.hide(modules.ModuleNames.ACHIEVENT);
                };
                AchieventMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return AchieventMediator;
            }(game.modules.UiMediator));
            achievent.AchieventMediator = AchieventMediator;
        })(achievent = modules.achievent || (modules.achievent = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=AchieventMediator.js.map