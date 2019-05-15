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
* name
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var team;
        (function (team) {
            var TeamSetType;
            (function (TeamSetType) {
                TeamSetType[TeamSetType["STORY_TASK"] = 1] = "STORY_TASK";
                TeamSetType[TeamSetType["DAILY_FUBEN"] = 3] = "DAILY_FUBEN";
                TeamSetType[TeamSetType["SUPERIOR_FUBEN"] = 4] = "SUPERIOR_FUBEN";
                TeamSetType[TeamSetType["TIME_ACTIVITY"] = 5] = "TIME_ACTIVITY";
                TeamSetType[TeamSetType["FAMILY_ACTIVITY"] = 6] = "FAMILY_ACTIVITY";
                TeamSetType[TeamSetType["YUANGU_MOXIANG"] = 7] = "YUANGU_MOXIANG";
                TeamSetType[TeamSetType["LEVEL_TASK"] = 8] = "LEVEL_TASK";
                TeamSetType[TeamSetType["SHANGGU_SHEN"] = 9] = "SHANGGU_SHEN";
                TeamSetType[TeamSetType["DiroBS"] = 10] = "DiroBS";
                TeamSetType[TeamSetType["ZHANGJIE_TASK"] = 11] = "ZHANGJIE_TASK";
            })(TeamSetType || (TeamSetType = {}));
            var TeamSetMediator = /** @class */ (function (_super) {
                __extends(TeamSetMediator, _super);
                function TeamSetMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    /** 一级菜单数据 */
                    _this.firstMenu = [];
                    /** 二级菜单数据 */
                    _this.secondMenu = [];
                    /** 是否初始化 */
                    _this.initFlag = false;
                    /** 等级最小限制 */
                    _this._levelLimitMin = 10;
                    /** 等级最大限制 */
                    _this._levelLimitMax = 10;
                    /** 左等级限制数据源 */
                    _this._lefleveltData = [];
                    /** 右等级限制数据源 */
                    _this._rightleveltData = [];
                    /** 当前二级类型 */
                    _this.currentSecondType = 1;
                    /** 当前二级选中下标 */
                    _this.currentSecondSelectIndex = 0;
                    /** 当前一级选中下标 */
                    _this.currentFirstSelectIndex = 0;
                    _this._viewUI = new ui.common.TeamSetUI();
                    _this._viewUI.mouseThrough = true;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this.isCenter = true;
                    // this._RoleChenweiMediator = new RoleChenweiMediator(this._viewUI);
                    _this.MenuData = new Laya.Dictionary();
                    // models.RoleInfoProxy.getInstance().on(models.SRspRoleInfo_EVENT,this,this.refresh);
                    _this.registerEvent();
                    return _this;
                }
                /**
                 * 注册事件
                 */
                TeamSetMediator.prototype.registerEvent = function () {
                    this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.closeTeamSet);
                    this._viewUI.ok_btn.on(LEvent.MOUSE_DOWN, this, this._EnsureEvent);
                };
                /** 刷新一级菜单数据源 */
                TeamSetMediator.prototype.refreshFirstMenuData = function () {
                    this._viewUI.firstMenu_list.vScrollBarSkin = "";
                    this._viewUI.firstMenu_list.repeatY = this.firstMenu.length;
                    this._viewUI.firstMenu_list.array = this.firstMenu;
                    this._viewUI.firstMenu_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.firstMenu_list.scrollBar.elasticDistance = 100;
                    this._viewUI.firstMenu_list.renderHandler = new Handler(this, this.onRendeFirstMenu);
                    //   this._viewUI.firstMenu_list.scrollTo(this.currentFirstSelectIndex);
                };
                /** 刷新二级菜单数据源
                 * @param type 类型
                 * @param requirement 需求条件
                 * @param opentime 开启时间
                 * @param selectBtn 选中按钮
                 * @param selectIndex 选中下标
                */
                TeamSetMediator.prototype.refreshSecondMenuData = function (type, requirement, opentime, selectBtn, selectIndex) {
                    this.currentSecondType = type;
                    this._viewUI.match_image.visible = true;
                    this.secondMenu = this.MenuData.get(type);
                    if (this.secondMenu == null)
                        this.secondMenu = [];
                    if (typeof (requirement) != "undefined") {
                        this.requirement = requirement;
                        this.opentime = opentime;
                        this.refreshConditionLabel(requirement, opentime);
                    }
                    /** 只选中一级菜单 */
                    if (this.secondMenu.length > 0) {
                        this.targetId = this.secondMenu[0].id;
                        this.target = this.secondMenu[0].target;
                    }
                    if (typeof (selectBtn) != "undefined") { /** 选中二级菜单某选项 */
                        this.currentFirstSelectIndex = selectIndex;
                        this.currentSecondSelectIndex = 0;
                        if (this.currentSelectFirstButton && this.currentSelectFirstButton.selected)
                            this.currentSelectFirstButton.selected = false;
                        this.currentSelectFirstButton = selectBtn;
                        this.currentSelectFirstButton.selected = true;
                        this.refreshLevelSilder(this.secondMenu[0].minlevel, this.secondMenu[0].maxlevel, this.secondMenu[0].id, this.secondMenu[0].target);
                    }
                    this._viewUI.secondMenu_list.vScrollBarSkin = "";
                    this._viewUI.secondMenu_list.repeatY = this.secondMenu.length;
                    this._viewUI.secondMenu_list.array = this.secondMenu;
                    this._viewUI.secondMenu_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.secondMenu_list.scrollBar.elasticDistance = 100;
                    this._viewUI.secondMenu_list.renderHandler = new Handler(this, this.onRendeSecondMenu);
                    //   this._viewUI.secondMenu_list.scrollTo(this.currentSecondSelectIndex); 
                };
                /** 二级菜单渲染 */
                TeamSetMediator.prototype.onRendeSecondMenu = function (cell, index) {
                    if (index > (this.secondMenu.length - 1) || index < 0)
                        return;
                    var secondMenu_btn = cell.getChildByName("secondMenu_btn");
                    secondMenu_btn.label = this.secondMenu[index].target;
                    var minLevel = this.secondMenu[index].minlevel;
                    var maxLevel = this.secondMenu[index].maxlevel;
                    var target = this.secondMenu[index].target;
                    var targetId = this.secondMenu[index].id;
                    if (this.currentSecondSelectIndex != index) {
                        secondMenu_btn.selected = false;
                    }
                    else {
                        this.currentSelectSecondButton = secondMenu_btn;
                        this.currentSelectSecondButton.selected = true;
                        /** 如果选中框未选中则选中它 */
                        if (!this._viewUI.match_checkboc.selected)
                            this._viewUI.match_checkboc.selected = true;
                    }
                    secondMenu_btn.on(LEvent.CLICK, this, this.refreshLevelSilder, [minLevel, maxLevel, targetId, target, secondMenu_btn, index]);
                };
                /** 一级菜单渲染 */
                TeamSetMediator.prototype.onRendeFirstMenu = function (cell, index) {
                    if (index > (this.firstMenu.length - 1) || index < 0)
                        return;
                    var firstMenu_btn = cell.getChildByName("firstMenu_btn");
                    firstMenu_btn.label = this.firstMenu[index].content;
                    var type = this.firstMenu[index].type;
                    var requirement = this.firstMenu[index].requirement;
                    var opTime = this.firstMenu[index].opentime;
                    if (this.currentFirstSelectIndex != index) {
                        firstMenu_btn.selected = false;
                    }
                    else {
                        this.currentSelectFirstButton = firstMenu_btn;
                        this.currentSelectFirstButton.selected = true;
                    }
                    firstMenu_btn.on(LEvent.MOUSE_DOWN, this, this.refreshSecondMenuData, [type, requirement, opTime, firstMenu_btn, index]);
                };
                /**
                 * 刷新副本条件
                 *  @param requirement 进入条件
                 *  @param opentime    开放时间
                 */
                TeamSetMediator.prototype.refreshConditionLabel = function (requirement, opentime) {
                    this._viewUI.condition_label.text = requirement;
                    this._viewUI.openTime_label.text = opentime;
                };
                TeamSetMediator.prototype.closeTeamSet = function () {
                    this.hide();
                };
                /** 初始化数据 */
                TeamSetMediator.prototype.init = function () {
                    var tempData1 = [];
                    var tempData2 = [];
                    var tempData3 = [];
                    var tempData4 = [];
                    var tempData5 = [];
                    var tempData6 = [];
                    var tempData7 = [];
                    var tempData8 = [];
                    var tempData9 = [];
                    var tempData10 = [];
                    var data = TeamModel.getInstance().teamListConfig;
                    var _roleLevel = HudModel.getInstance().levelNum;
                    for (var index in data) {
                        if (_roleLevel < data[index].minlevel)
                            continue;
                        if (data[index].type == TeamSetType.STORY_TASK) {
                            tempData1.push(data[index]);
                        }
                        else if (data[index].type == TeamSetType.DAILY_FUBEN) {
                            tempData2.push(data[index]);
                        }
                        else if (data[index].type == TeamSetType.SUPERIOR_FUBEN) {
                            tempData3.push(data[index]);
                        }
                        else if (data[index].type == TeamSetType.TIME_ACTIVITY) {
                            tempData4.push(data[index]);
                        }
                        else if (data[index].type == TeamSetType.FAMILY_ACTIVITY) {
                            tempData5.push(data[index]);
                        }
                        else if (data[index].type == TeamSetType.YUANGU_MOXIANG) {
                            tempData6.push(data[index]);
                        }
                        else if (data[index].type == TeamSetType.LEVEL_TASK) {
                            tempData7.push(data[index]);
                        }
                        else if (data[index].type == TeamSetType.SHANGGU_SHEN) {
                            tempData8.push(data[index]);
                        }
                        else if (data[index].type == TeamSetType.DiroBS) {
                            tempData9.push(data[index]);
                        }
                        else if (data[index].type == TeamSetType.ZHANGJIE_TASK) {
                            tempData10.push(data[index]);
                        }
                    }
                    this.MenuData.clear();
                    if (tempData10.length != 0)
                        this.MenuData.set(TeamSetType.ZHANGJIE_TASK, tempData10);
                    if (tempData9.length != 0)
                        this.MenuData.set(TeamSetType.DiroBS, tempData9);
                    if (tempData8.length != 0)
                        this.MenuData.set(TeamSetType.SHANGGU_SHEN, tempData8);
                    if (tempData7.length != 0)
                        this.MenuData.set(TeamSetType.LEVEL_TASK, tempData7);
                    if (tempData6.length != 0)
                        this.MenuData.set(TeamSetType.YUANGU_MOXIANG, tempData6);
                    if (tempData5.length != 0)
                        this.MenuData.set(TeamSetType.FAMILY_ACTIVITY, tempData5);
                    if (tempData4.length != 0)
                        this.MenuData.set(TeamSetType.TIME_ACTIVITY, tempData4);
                    if (tempData3.length != 0)
                        this.MenuData.set(TeamSetType.SUPERIOR_FUBEN, tempData3);
                    if (tempData2.length != 0)
                        this.MenuData.set(TeamSetType.DAILY_FUBEN, tempData2);
                    if (tempData1.length != 0)
                        this.MenuData.set(TeamSetType.STORY_TASK, tempData1);
                    this.firstMenu = [];
                    for (var temp = 1; temp <= 11; temp++) {
                        var typeData = this.MenuData.get(temp);
                        if (typeData == null)
                            continue;
                        this.firstMenu.push(typeData[0]);
                    }
                    if (this.firstMenu.length == 0)
                        this._viewUI.notarget_btn.visible = true;
                    else
                        this._viewUI.notarget_btn.visible = false;
                };
                TeamSetMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                    this.init();
                    this.refreshFirstMenuData();
                    this.controUI();
                };
                /** 初始化左边的等级数据 */
                TeamSetMediator.prototype.leftLevelData = function () {
                    this._lefleveltData = [];
                    for (var index = this._levelLimitMin; index <= this._levelLimitMax; index++) {
                        if (index == this._levelLimitMin) {
                            for (var emptyIndex = 0; emptyIndex < 2; emptyIndex++) {
                                this._lefleveltData.push({ level: "" });
                            }
                        }
                        this._lefleveltData.push({ level: index });
                        if (index == 150) {
                            for (var emptyIndexs = 0; emptyIndexs < 2; emptyIndexs++) {
                                this._lefleveltData.push({ level: "" });
                            }
                        }
                    }
                    this._viewUI.numLeft_list.vScrollBarSkin = "";
                    this._viewUI.numLeft_list.repeatY = this._lefleveltData.length;
                    this._viewUI.numLeft_list.array = this._lefleveltData;
                    this._viewUI.numLeft_list.scrollBar.elasticBackTime = 200;
                    //  this._viewUI.numLeft_list.scrollBar.changeHandler = new Handler(this,this.onChangeValue);
                    // this._viewUI.numLeft_list.scrollBar.tick
                    this._viewUI.numLeft_list.scrollBar.scrollSize = 20;
                    this._viewUI.numLeft_list.scrollBar.elasticDistance = 100;
                    // this._viewUI.numLeft_list.scrollBar.setScroll(0,this._lefleveltData.length,this._lefleveltData.length);
                    this._viewUI.numLeft_list.scrollBar.on(LEvent.END, this, this.ongetLeftlevelValue);
                    this._viewUI.numLeft_list.renderHandler = new Handler(this, this.onRenderLeftLevelData);
                };
                /** 初始化右边的等级数据 */
                TeamSetMediator.prototype.rightLevelData = function () {
                    this._rightleveltData = [];
                    for (var index = this._levelLimitMin; index <= this._levelLimitMax; index++) {
                        if (index == this._levelLimitMin) {
                            for (var emptyIndex = 0; emptyIndex < 2; emptyIndex++) {
                                this._rightleveltData.push({ level: "" });
                            }
                        }
                        this._rightleveltData.push({ level: index });
                        if (index == this._levelLimitMax) {
                            for (var emptyIndexs = 0; emptyIndexs < 2; emptyIndexs++) {
                                this._rightleveltData.push({ level: "" });
                            }
                        }
                    }
                    this._viewUI.numRight_list.vScrollBarSkin = "";
                    this._viewUI.numRight_list.repeatY = this._rightleveltData.length;
                    this._viewUI.numRight_list.array = this._rightleveltData;
                    this._viewUI.numRight_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.numRight_list.scrollBar.elasticDistance = 100;
                    this._viewUI.numRight_list.scrollTo(this._rightleveltData.length);
                    this._viewUI.numRight_list.scrollBar.on(LEvent.END, this, this.ongetRightlevelValue);
                    this._viewUI.numRight_list.renderHandler = new Handler(this, this.onRenderRightLevelData);
                };
                /** 渲染左边数据 */
                TeamSetMediator.prototype.onRenderLeftLevelData = function (cell, index) {
                    if (index < 0 || index >= this._lefleveltData.length)
                        return;
                    var levelleft_lab = cell.getChildByName("levelleft_lab");
                    levelleft_lab.text = this._lefleveltData[index].level;
                };
                /** 渲染右边数据 */
                TeamSetMediator.prototype.onRenderRightLevelData = function (cell, index) {
                    if (index < 0 || index >= this._rightleveltData.length)
                        return;
                    var levelright_lab = cell.getChildByName("levelright_lab");
                    levelright_lab.text = this._rightleveltData[index].level;
                };
                /** 左等级滑动停止选中 */
                TeamSetMediator.prototype.ongetLeftlevelValue = function () {
                    var startIndex = this._viewUI.numLeft_list.startIndex;
                    this._viewUI.numLeft_list.tweenTo(startIndex);
                    /** 选中对象为(startindex+2) 显示区域的下两条 */
                    this.leftLvel = this._lefleveltData[startIndex + 2].level;
                };
                /** 右等级滑动停止选中 */
                TeamSetMediator.prototype.ongetRightlevelValue = function () {
                    var startIndex = this._viewUI.numRight_list.startIndex;
                    this._viewUI.numRight_list.tweenTo(startIndex);
                    /** 选中对象为(startindex+2) 显示区域的下两条 */
                    this.rightLevel = this._rightleveltData[startIndex + 2].level;
                };
                /** 点击确认按钮事件 */
                TeamSetMediator.prototype._EnsureEvent = function () {
                    var minlevel = this.leftLvel;
                    var maxlevel = this.rightLevel;
                    // this._TeamModule  = new TeamModule(this.app);
                    if (this.targetId == 0) { /** 没有选中目标 */
                        RequesterProtocols._instance.c2s_CRequestSetTeamMatchInfo(this.targetId, minlevel, maxlevel);
                    }
                    else if (this._viewUI.match_checkboc.selected == true) { /** 目标不为空并且自动匹配 typemactch类型为0是个人组队匹配1是队伍匹配 3是只设置队伍目标 */
                        RequesterProtocols._instance.c2s_CRequestTeamMatch(1, this.targetId, minlevel, maxlevel);
                    }
                    else if (this._viewUI.match_checkboc.selected == false) { /** 目标不为空但是未勾选自动匹配 */
                        RequesterProtocols._instance.c2s_CRequestSetTeamMatchInfo(this.targetId, minlevel, maxlevel);
                    }
                    team.models.TeamProxy.getInstance().event(team.models.REFRESH_TARGET, [minlevel, maxlevel, this.target, this.targetId]);
                    this.hide();
                };
                /** 初始化UI */
                TeamSetMediator.prototype.controUI = function () {
                    this._viewUI.match_image.visible = false;
                    if (this.requirement != "")
                        this.refreshSecondMenuData(this.currentSecondType, this.requirement, this.opentime);
                    else
                        this.refreshSecondMenuData(this.currentSecondType, "无限制", "全天");
                    this.refreshLevelSilder(10, 150, 0, "无");
                };
                /** 等级限制滑动条(暂替) */
                TeamSetMediator.prototype.refreshLevelSilder = function (minlevel, maxlevel, targetId, target, selectBtn, selectIndex) {
                    if (typeof (selectBtn) != "undefined") {
                        selectBtn.selected = true;
                        this.currentSecondSelectIndex = selectIndex;
                        if (this.currentSelectSecondButton && this.currentSelectSecondButton.selected)
                            this.currentSelectSecondButton.selected = false;
                        this.currentSelectSecondButton = selectBtn;
                        this.currentSelectSecondButton.selected = true;
                        /** 如果选中框未选中则选中它 */
                        if (!this._viewUI.match_checkboc.selected)
                            this._viewUI.match_checkboc.selected = true;
                    }
                    // this.refreshSecondMenuData(this.currentSecondType);
                    if (targetId != 0) {
                        this.targetId = targetId;
                        this.target = target;
                    }
                    this._levelLimitMin = minlevel;
                    this._levelLimitMax = maxlevel;
                    this.leftLvel = minlevel;
                    this.rightLevel = maxlevel;
                    this.leftLevelData();
                    this.rightLevelData();
                };
                // 人物信息界面回复
                TeamSetMediator.prototype.refresh = function (e) {
                    // var data:hanlder.S2C_SRspRoleInfo = models.RoleInfoModel.getInstance().SRspRoleInfoData.get("data");
                };
                TeamSetMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                TeamSetMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                TeamSetMediator.prototype.onShow = function (event) {
                    this.show();
                };
                TeamSetMediator.prototype.showChenwei = function () {
                    // this._RoleChenweiMediator.show();
                };
                TeamSetMediator.prototype.showTip = function () {
                    // this._RoleTipMediator.show();
                };
                TeamSetMediator.prototype.showJiuguan = function () {
                    // this._RoleShopMediator.show();
                };
                TeamSetMediator.prototype.showJifen = function () {
                    // this._RoleJiFenDuiHuanMediator.show();
                };
                return TeamSetMediator;
            }(game.modules.UiMediator));
            team.TeamSetMediator = TeamSetMediator;
        })(team = modules.team || (modules.team = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=TeamSetMediator.js.map