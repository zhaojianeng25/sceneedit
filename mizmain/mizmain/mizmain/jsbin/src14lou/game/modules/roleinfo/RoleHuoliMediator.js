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
        var roleinfo;
        (function (roleinfo) {
            var RoleHuoliMediator = /** @class */ (function (_super) {
                __extends(RoleHuoliMediator, _super);
                function RoleHuoliMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    /** 图片路径 */
                    _this.skinArr = [];
                    _this._viewUI = new ui.common.RoleHuoliUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this.isCenter = true;
                    _this._app = app;
                    _this.registerEvent();
                    _this.eventListener();
                    _this.skinArr = ["common/icon/item/20101.png", "common/icon/item/20042.png", "common/icon/skill/233.png"]; //第一个是打工图片路径，第二个是制作附魔卷轴的图片路径，第三个是生活技能的图片路径（该数据写死的）
                    return _this;
                }
                /**初始化 */
                RoleHuoliMediator.prototype.initialize = function () {
                    this.skillObj = game.modules.skill.models.SkillModel.getInstance().CSchoolSkillitemBinDic;
                    this.skillGridObj = game.modules.skill.models.SkillModel.getInstance().AcupointInfoBinDic;
                    var skillGridId = game.modules.skill.models.SkillModel.getInstance().EnhancementSkillId; //附魔技能格id
                    //如果skillGridId为0，说明没学附魔技能
                    if (skillGridId != 0) {
                        var skillid = this.skillGridObj[skillGridId]["pointToSkillList"][0]; //附魔技能id
                        var levelNum = game.modules.skill.models.SkillModel.getInstance().makeEnhancementLevel; //附魔技能等级
                        var cost = Math.floor(levelNum * this.skillObj[skillid]["paramA"] + this.skillObj[skillid]["paramB"]); //消耗数值公式：等级*paramA+paramB
                        var str = this.skillObj[skillid]["costA"];
                        this.costArr = [RoleEnum.WORK_COST, cost, ""];
                    }
                    else {
                        this.costArr = [RoleEnum.WORK_COST, RoleEnum.NO_SKILL_COST, ""];
                    }
                    this.costNameArr = [roleinfo.models.RoleInfoModel.chineseStr.xiaohao_huoli, roleinfo.models.RoleInfoModel.chineseStr.xiaohao_huoli, ""];
                    this.arr = [roleinfo.models.RoleInfoModel.chineseStr.dagong, roleinfo.models.RoleInfoModel.chineseStr.fumo, roleinfo.models.RoleInfoModel.chineseStr.life_skill];
                    this.btnNameArr = [roleinfo.models.RoleInfoModel.chineseStr.dagong_btn, roleinfo.models.RoleInfoModel.chineseStr.zhizuo_btn, roleinfo.models.RoleInfoModel.chineseStr.zhizuo_btn];
                    this.myData = LoginModel.getInstance().roleDetail;
                    this._viewUI.huoliNum_tet.text = this.myData.energy + "/" + this.myData.enlimit; //初始化活力
                };
                /**注册点击监听 */
                RoleHuoliMediator.prototype.registerEvent = function () {
                    this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
                };
                /**注册事件监听 */
                RoleHuoliMediator.prototype.eventListener = function () {
                    modules.mainhud.models.HudProxy.getInstance().on(modules.mainhud.models.SRefreshRoleData_EVENT, this, this.onRefreshRoleData);
                    roleinfo.models.RoleInfoProxy.getInstance().on(roleinfo.models.SLiveSkillMakeFarm_EVENT, this, this.onLiveSkillMakeFarm);
                    modules.skill.models.SkillProxy.getInstance().on(modules.skill.models.EnergyNotEnough_EVENT, this, this.showEnergyNotEnoughTips);
                };
                /** 显示活力不足的提示信息 */
                RoleHuoliMediator.prototype.showEnergyNotEnoughTips = function () {
                    var _tipsMsg = ChatModel.getInstance().chatMessageTips[143432]["msg"];
                    _tipsMsg = _tipsMsg.replace("$parameter1$", "100");
                    this.show_distipsmsg(_tipsMsg);
                };
                /**打工赚钱返回
                 * @param addgold 打工所赚到的金币数量
                 */
                RoleHuoliMediator.prototype.onLiveSkillMakeFarm = function (addgold) {
                    var _tipsMsg = ChatModel.getInstance().chatMessageTips[160050]["msg"];
                    _tipsMsg = _tipsMsg.replace("$parameter1$", addgold.toString());
                    this.show_distipsmsg(_tipsMsg);
                };
                /** 显示飘窗 */
                RoleHuoliMediator.prototype.show_distipsmsg = function (msg) {
                    var _distipsmsg = new modules.commonUI.DisappearMessageTipsMediator(this._app);
                    _distipsmsg.onShow(msg);
                };
                /**刷新人物属性 */
                RoleHuoliMediator.prototype.onRefreshRoleData = function (e) {
                    if (HudModel.getInstance().enlimitNum != 0)
                        this._viewUI.huoliNum_tet.text = HudModel.getInstance().energyNum + "/" + HudModel.getInstance().enlimitNum; //活力值
                };
                RoleHuoliMediator.prototype.show = function () {
                    this._viewUI.tip_btn.on(LEvent.CLICK, this, this.showTips);
                    this.initialize();
                    _super.prototype.show.call(this);
                    this.getListData();
                };
                /** 显示出活力相关方面tips信息 */
                RoleHuoliMediator.prototype.showTips = function () {
                    var tipsParame = new Laya.Dictionary();
                    tipsParame.set("posY", 883);
                    tipsParame.set("title", 10032);
                    tipsParame.set("contentId", 10033);
                    //参数为3+0.09*玩家等级
                    var _roleLevel = HudModel.getInstance().levelNum;
                    tipsParame.set("parame", [Math.round(3 + 0.09 * _roleLevel)]);
                    var _tipsModule = new modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENTMESSAGE, tipsParame);
                };
                RoleHuoliMediator.prototype.hide = function () {
                    this._viewUI.tip_btn.off(LEvent.CLICK, this, this.showTips);
                    _super.prototype.hide.call(this);
                    roleinfo.models.RoleInfoModel.getInstance().currentKey = RoleEnum.SHUXING_KEY;
                    modules.ModuleManager.show(modules.ModuleNames.ROLE_Info, this._app);
                    if (LoginModel.getInstance().CommonPage != "") {
                        modules.ModuleManager.hide(modules.ModuleNames.ROLE_Info);
                        modules.skill.models.SkillModel.getInstance().currenTabNum = SkillEnum.LIFE_KEY; //切换到生活技能界面
                        modules.ModuleManager.show(modules.ModuleNames.SKILL, this._app);
                        LoginModel.getInstance().CommonPage = modules.ModuleNames.ROLE_Info;
                    }
                };
                RoleHuoliMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                /**初始化打工列表 */
                RoleHuoliMediator.prototype.getListData = function () {
                    this._viewUI.dagong_list.vScrollBarSkin = "";
                    this._viewUI.dagong_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.dagong_list.scrollBar.elasticDistance = 50;
                    this._viewUI.dagong_list.repeatY = this.arr.length;
                    this._viewUI.dagong_list.array = this.arr;
                    this._viewUI.dagong_list.renderHandler = new Handler(this, this.onRender);
                    this._viewUI.dagong_list.selectHandler = new Handler(this, this.onSelect);
                    this._viewUI.dagong_list.selectedIndex = -1;
                };
                /**渲染打工列表 */
                RoleHuoliMediator.prototype.onRender = function (cell, index) {
                    if (index > this.arr.length)
                        return;
                    var nameLab = cell.getChildByName("typeName_lab");
                    var costNumLab = cell.getChildByName("costNum_lab");
                    var costNameLab = cell.getChildByName("costName_lab");
                    var dagongBtn = cell.getChildByName("dagong_btn");
                    var skin_img = cell.getChildByName("skin_img");
                    skin_img.skin = this.skinArr[index];
                    nameLab.changeText(this.arr[index]);
                    costNameLab.changeText(this.costNameArr[index]);
                    costNumLab.text = this.costArr[index];
                    dagongBtn.label = this.btnNameArr[index];
                };
                /**处理打工列表点击 */
                RoleHuoliMediator.prototype.onSelect = function (index) {
                    if (index != -1) {
                        //根据选中列表项下标处理
                        switch (index) {
                            case 0:
                                RequesterProtocols._instance.c2s_CLiveSkillMakeFarm(); //打工
                                break;
                            case 1:
                                this.judgeSkill();
                                break;
                            case 2:
                                //跳转到生活技能界面
                                LoginModel.getInstance().CommonPage = modules.ModuleNames.SKILL;
                                this.hide();
                                break;
                        }
                        this._viewUI.dagong_list.selectedIndex = -1;
                    }
                };
                /** 判断附魔的技能
                 * @describe 学了就发请求，没学就进行飘窗提示
                 */
                RoleHuoliMediator.prototype.judgeSkill = function () {
                    var _skillArr = modules.skill.models.SkillModel.getInstance().skillArr;
                    var _SchoolSkillitemBaseVo = _skillArr[6];
                    //附魔技能id
                    var _skillId = _SchoolSkillitemBaseVo.id;
                    var _skillLevelDic = modules.skill.models.SkillModel.getInstance().skillLevelDic;
                    if (_skillLevelDic.get(_skillId)) {
                        RequesterProtocols._instance.c2s_CLiveSkillMakeEnhancement(); //制作附魔卷轴（跟战斗技能中的一致）
                    }
                    else {
                        var _tipsMsg = ChatModel.getInstance().chatMessageTips[150095]["msg"];
                        var _skillName = _SchoolSkillitemBaseVo.skillname;
                        if (!_skillName) {
                            console.log("-------------------------获取不到技能名字！------------------------");
                            return;
                        }
                        _tipsMsg = _tipsMsg.replace("$parameter1$", _skillName);
                        this.show_distipsmsg(_tipsMsg);
                    }
                };
                return RoleHuoliMediator;
            }(game.modules.UiMediator));
            roleinfo.RoleHuoliMediator = RoleHuoliMediator;
        })(roleinfo = modules.roleinfo || (modules.roleinfo = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=RoleHuoliMediator.js.map