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
            /**技能按钮 */
            var ButtonType;
            (function (ButtonType) {
                ButtonType[ButtonType["fightSkill_btn"] = 1] = "fightSkill_btn";
                ButtonType[ButtonType["lifeSkill_btn"] = 2] = "lifeSkill_btn";
                ButtonType[ButtonType["specialtySkill_btn"] = 3] = "specialtySkill_btn";
                ButtonType[ButtonType["marrySkill_btn"] = 4] = "marrySkill_btn";
            })(ButtonType || (ButtonType = {}));
            var SkillModule = /** @class */ (function (_super) {
                __extends(SkillModule, _super);
                function SkillModule(app) {
                    var _this = _super.call(this) || this;
                    /** 是否关闭（给回退到帮派福利界面处做标识） */
                    _this.isClose = false;
                    _this.uiLayer = app.uiRoot.general;
                    _this._viewUI = new ui.common.SkillDibanUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    skill.models.SkillModel.getInstance().appBase = _this._app;
                    // 战斗技能界面
                    _this._SkillStudyMediator = new skill.SkillStudyMediator(_this._viewUI, _this._app);
                    // 生活技能界面
                    _this._SkillLifeMediator = new skill.SkillLifeMediator(_this._viewUI, _this._app);
                    // 专精技能界面
                    _this._SkillZhuanJingMediator = new skill.SkillZhuanJingMediator(_this._viewUI, _this._app);
                    // 结婚技能界面
                    _this._SkillMarryMediator = new skill.SkillMarryMediator(_this._viewUI);
                    _this.initialize();
                    _this.registerEvent();
                    return _this;
                }
                /**初始化 */
                SkillModule.prototype.initialize = function () {
                    this.ani = new Laya.Animation();
                    this.dianImg = new Laya.Image();
                };
                SkillModule.prototype.show = function () {
                    _super.prototype.show.call(this);
                };
                SkillModule.prototype.onShow = function (event) {
                    this._app.uiRoot.closeLoadProgress();
                    this.show();
                    //选中页面
                    var currentSelect = skill.models.SkillModel.getInstance().currenTabNum;
                    //通知主界面开启蒙版
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.OPEN_EVENT);
                    //点击生活技能引导
                    if (HudModel.getInstance().yindaoId == YinDaoEnum.LIFESKILL_YINDAO)
                        this.clicklifeYindao();
                    //点击专精引导
                    else if (HudModel.getInstance().yindaoId == YinDaoEnum.ZHUANJING_CLICK_YINDAO)
                        this.clickzhuangjingYindao();
                    this.switchButton(currentSelect);
                    this.switchChildUI(currentSelect);
                    //根据等级开放不同功能按钮
                    if (HudModel.getInstance().levelNum < 35) {
                        this._viewUI.lifeSkill_btn.visible = false; //生活技能
                        this._viewUI.specialtySkill_btn.visible = false; //专精技能
                        this._viewUI.marrySkill_btn.visible = false; //结婚技能
                    }
                    else if (HudModel.getInstance().levelNum >= 35 && HudModel.getInstance().levelNum < 45) {
                        this._viewUI.lifeSkill_btn.visible = true; //生活技能
                        this._viewUI.specialtySkill_btn.visible = false; //专精技能
                        this._viewUI.marrySkill_btn.visible = false; //结婚技能
                    }
                    else if (HudModel.getInstance().levelNum >= 45 && HudModel.getInstance().levelNum < 50) {
                        this._viewUI.lifeSkill_btn.visible = true; //生活技能
                        this._viewUI.specialtySkill_btn.visible = true; //专精技能
                        this._viewUI.marrySkill_btn.visible = false; //结婚技能
                    }
                    else {
                        this._viewUI.lifeSkill_btn.visible = true; //生活技能
                        this._viewUI.specialtySkill_btn.visible = true; //专精技能
                        this._viewUI.marrySkill_btn.visible = true; //结婚技能
                    }
                };
                /**点击专精引导 */
                SkillModule.prototype.clickzhuangjingYindao = function () {
                    var x1 = this._viewUI.specialtySkill_btn.x + this._viewUI.specialtySkill_btn.width;
                    var y1 = this._viewUI.specialtySkill_btn.y + this._viewUI.skilldiban_box.y;
                    var x2 = x1 - 60;
                    var y2 = y1 + 30;
                    this.setAniPos(x2, y2);
                    this.startYindao(0);
                    HudModel.getInstance().yindaoId = YinDaoEnum.RESET_YINDAO;
                    this.yindaoId = YinDaoEnum.ZHUANJING_CLICK_YINDAO;
                };
                /**点击生活技能引导 */
                SkillModule.prototype.clicklifeYindao = function () {
                    var x1 = this._viewUI.lifeSkill_btn.x + this._viewUI.lifeSkill_btn.width;
                    var y1 = this._viewUI.lifeSkill_btn.y + this._viewUI.skilldiban_box.y;
                    var x2 = x1 - 60;
                    var y2 = y1 + 30;
                    this.setAniPos(x2, y2);
                    this.startYindao(0);
                    HudModel.getInstance().yindaoId = YinDaoEnum.LIFESKILL_TIP_YINDAO;
                    this.yindaoId = YinDaoEnum.LIFESKILL_YINDAO;
                };
                /**引导开始 */
                SkillModule.prototype.startYindao = function (tipid) {
                    var tip = HudModel._instance.carroweffectData;
                    this.onload();
                    Laya.timer.loop(1000, this, this.moveImg);
                    Laya.timer.loop(5000, this, this.closeAni);
                    this._viewUI.addChild(this.ani);
                    this._viewUI.addChild(this.dianImg);
                };
                /**设置动画位置*/
                SkillModule.prototype.setAniPos = function (x, y) {
                    this.ani.x = x;
                    this.ani.y = y;
                    this.dianImg.x = x;
                    this.dianImg.y = y;
                };
                /**关闭动画 */
                SkillModule.prototype.closeAni = function () {
                    this.ani.clear();
                    Laya.timer.clear(this, this.closeAni);
                    Laya.timer.clear(this, this.moveImg);
                    this.dianImg.visible = false;
                    this.dianImg.mouseThrough = false;
                };
                /**播放动画 */
                SkillModule.prototype.onload = function () {
                    Laya.Animation.createFrames(this.anUrls("", 9), "yindao");
                    this.ani.play(0, true, "yindao");
                    this.ani.interval = 112;
                    this.dianImg.skin = "common/ui/mainhud/dian.png";
                    this.dianImg.mouseThrough = true;
                    this.ani.mouseThrough = true;
                };
                /**移动手指图标 */
                SkillModule.prototype.moveImg = function () {
                    this.dianImg.visible = true;
                    if (this.dianImg.y <= this.ani.y)
                        Laya.Tween.to(this.dianImg, { x: this.ani.x + 25, y: this.ani.y + 25 }, 1000, null, Laya.Handler.create(this, function () { }), null, false);
                    else
                        Laya.Tween.to(this.dianImg, { x: this.ani.x - 5, y: this.ani.y - 5 }, 1000, null, Laya.Handler.create(this, function () { }), null, false);
                };
                /**获取资源数据 */
                SkillModule.prototype.anUrls = function (aniName, length) {
                    var urls = [];
                    for (var index = 1; index <= length; index++) {
                        urls.push("common/ui/yindao/" + aniName + index + ".png");
                    }
                    return urls;
                };
                SkillModule.prototype.getView = function () {
                    return this._viewUI;
                };
                SkillModule.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    //设置下次打开时显示的子页面
                    skill.models.SkillModel.getInstance().currenTabNum = SkillEnum.ZHANDOU_KEY;
                    if (LoginModel.getInstance().CommonPage != "") {
                        modules.ModuleManager.show(LoginModel.getInstance().CommonPage, this._app);
                        LoginModel.getInstance().CommonPage = "";
                    }
                    var _isFlag = skill.models.SkillModel.getInstance().isFromClanWelfareJump; //获取是否从帮派福利中生活技能而来的标识
                    if (_isFlag && this.isClose) {
                        skill.models.SkillModel.getInstance().isFromClanWelfareJump = false;
                        this.isClose = false;
                        modules.family.models.FamilyModel.getInstance().clanCurrenTabNum = 2; //打开帮派福利子界面的索引
                        modules.ModuleManager.show(modules.ModuleNames.haveFamily, this._app);
                    }
                };
                /**注册按钮监听事件 */
                SkillModule.prototype.registerEvent = function () {
                    this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.clickCloseBtnEvent);
                    this._viewUI.fightSkill_btn.on(LEvent.MOUSE_DOWN, this, this.clickFightBtnEvent);
                    this._viewUI.lifeSkill_btn.on(LEvent.MOUSE_DOWN, this, this.clickLifeBtnEvent);
                    this._viewUI.specialtySkill_btn.on(LEvent.MOUSE_DOWN, this, this.clickSpecialtyBtnEvent);
                    this._viewUI.marrySkill_btn.on(LEvent.MOUSE_DOWN, this, this.clickMarryBtnEvent);
                };
                /**点击关闭按钮 */
                SkillModule.prototype.clickCloseBtnEvent = function () {
                    //通知主界面关闭黑色蒙版
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.CLOSEVIEW_EVENT);
                    var _isFlag = skill.models.SkillModel.getInstance().isFromClanWelfareJump; //获取是否从帮派福利中生活技能而来的标识
                    if (_isFlag) {
                        this.isClose = true;
                    }
                    this.hide();
                    this._SkillStudyMediator.hide();
                    this._SkillLifeMediator.hide();
                    this._SkillZhuanJingMediator.hide();
                    this._SkillMarryMediator.hide();
                };
                /**战斗按钮点击事件 */
                SkillModule.prototype.clickFightBtnEvent = function () {
                    if (!this._viewUI.fightSkill_btn.selected) {
                        this.switchButton(ButtonType.fightSkill_btn);
                        this.switchChildUI(ButtonType.fightSkill_btn);
                    }
                };
                /**生活技能点击事件 */
                SkillModule.prototype.clickLifeBtnEvent = function () {
                    if (!this._viewUI.lifeSkill_btn.selected) {
                        this.switchButton(ButtonType.lifeSkill_btn);
                        this.switchChildUI(ButtonType.lifeSkill_btn);
                        //如果有引导，关闭引导
                        if (this.yindaoId == YinDaoEnum.LIFESKILL_YINDAO)
                            this.closeAni();
                    }
                };
                /**专精技能点击事件 */
                SkillModule.prototype.clickSpecialtyBtnEvent = function () {
                    if (!this._viewUI.specialtySkill_btn.selected) {
                        this.switchButton(ButtonType.specialtySkill_btn);
                        this.switchChildUI(ButtonType.specialtySkill_btn);
                        //如果有引导，关闭引导
                        if (this.yindaoId == YinDaoEnum.ZHUANJING_CLICK_YINDAO)
                            this.closeAni();
                    }
                };
                /**结婚技能点击事件 */
                SkillModule.prototype.clickMarryBtnEvent = function () {
                    if (!this._viewUI.marrySkill_btn.selected) {
                        this.switchButton(ButtonType.marrySkill_btn);
                        this.switchChildUI(ButtonType.marrySkill_btn);
                    }
                };
                /**切换按钮 */
                SkillModule.prototype.switchButton = function (index) {
                    //初始化button的select状态
                    this._viewUI.fightSkill_btn.selected = false;
                    this._viewUI.lifeSkill_btn.selected = false;
                    this._viewUI.specialtySkill_btn.selected = false;
                    this._viewUI.marrySkill_btn.selected = false;
                    switch (index) {
                        case ButtonType.fightSkill_btn:
                            this._viewUI.fightSkill_btn.selected = true;
                            break;
                        case ButtonType.lifeSkill_btn:
                            this._viewUI.lifeSkill_btn.selected = true;
                            break;
                        case ButtonType.specialtySkill_btn:
                            this._viewUI.specialtySkill_btn.selected = true;
                            break;
                        case ButtonType.marrySkill_btn:
                            this._viewUI.marrySkill_btn.selected = true;
                            break;
                        default:
                            console.log("SkillModule.switchButton error");
                    }
                };
                /**切换子界面 */
                SkillModule.prototype.switchChildUI = function (index) {
                    switch (index) {
                        case ButtonType.fightSkill_btn:
                            this._SkillStudyMediator.show();
                            this._SkillLifeMediator.hide();
                            this._SkillZhuanJingMediator.hide();
                            this._SkillMarryMediator.hide();
                            break;
                        case ButtonType.lifeSkill_btn:
                            this._SkillStudyMediator.hide();
                            this._SkillLifeMediator.show();
                            this._SkillZhuanJingMediator.hide();
                            this._SkillMarryMediator.hide();
                            break;
                        case ButtonType.specialtySkill_btn:
                            this._SkillStudyMediator.hide();
                            this._SkillLifeMediator.hide();
                            this._SkillZhuanJingMediator.show();
                            this._SkillMarryMediator.hide();
                            break;
                        case ButtonType.marrySkill_btn:
                            this._SkillStudyMediator.hide();
                            this._SkillLifeMediator.hide();
                            this._SkillZhuanJingMediator.hide();
                            this._SkillMarryMediator.show();
                            break;
                        default:
                            console.log("SkillModule.switchChildUI error");
                    }
                };
                return SkillModule;
            }(game.modules.ModuleMediator));
            skill.SkillModule = SkillModule;
        })(skill = modules.skill || (modules.skill = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=SkillModule.js.map