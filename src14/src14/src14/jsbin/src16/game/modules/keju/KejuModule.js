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
var KejuModel = game.modules.keju.models.KejuModel;
var KejuPoxy = game.modules.keju.models.KejuProxy;
var game;
(function (game) {
    var modules;
    (function (modules) {
        var keju;
        (function (keju) {
            var KejuModule = /** @class */ (function (_super) {
                __extends(KejuModule, _super);
                function KejuModule(app) {
                    var _this = _super.call(this) || this;
                    /** 当前选项的正确答案 */
                    _this.rightAnswer = -1;
                    /** 当前界面是否显示 */
                    _this.inshow = false;
                    _this.uiLayer = app.uiRoot.general;
                    _this._viewUI = new ui.common.ZhiHuiShiLianUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this.registerEvent();
                    return _this;
                }
                KejuModule.getInstance = function (app) {
                    if (!this._instance) {
                        this._instance = new KejuModule(app);
                    }
                    return this._instance;
                };
                /** 初始化配置表 */
                KejuModule.prototype.initialineConfig = function () {
                    var examType = KejuModel.getInstance().impexamtype;
                    this.testQuestionData = KejuModel.getInstance().getExamConfigData(examType);
                };
                /** 显示介绍 */
                KejuModule.prototype.showIntroduceTips = function () {
                    if (!this._viewUI.introduce_img.visible)
                        this._viewUI.introduce_img.visible = true;
                    /**程序内字符串表 */
                    var cstringResConfigData = game.modules.tips.models.TipsModel._instance.cstringResConfigData;
                    var type;
                    var impexamtype = KejuModel.getInstance().impexamtype;
                    if (impexamtype == ImpExamType.IMPEXAM_VILL)
                        type = kejuIntroduce.XIANGSHI_INT;
                    else if (impexamtype == ImpExamType.IMPEXAM_PROV)
                        type = kejuIntroduce.HUISHI_INT;
                    else if (impexamtype == ImpExamType.IMPEXAM_STATE)
                        type = kejuIntroduce.DIANSHI_INT;
                    else
                        return;
                    var Introduce = cstringResConfigData[type].msg;
                    this._viewUI.introduce_html.innerHTML = Introduce;
                    this._viewUI.introduce_html.style.leading = 3;
                };
                /** 隐藏tips*/
                KejuModule.prototype.hideIntroduceTips = function () {
                    if (this._viewUI.introduce_img.visible)
                        this._viewUI.introduce_img.visible = false;
                };
                /** 初始化界面 */
                KejuModule.prototype.init = function () {
                    var key;
                    this.testQue = {};
                    var examType = KejuModel.getInstance().impexamtype;
                    this.initialineConfig();
                    if (examType == ImpExamType.IMPEXAM_VILL) {
                        key = KejuModel.getInstance().ExamVill.keys;
                        this.testQue = KejuModel.getInstance().ExamVill.get(key[key.length - 1]);
                        this._viewUI.help_btn.visible = true;
                        this._viewUI.tenitem_bg.visible = true;
                        this._viewUI.twentyitem_bg.visible = true;
                    }
                    else if (examType == ImpExamType.IMPEXAM_PROV) {
                        key = KejuModel.getInstance().ExamProv.keys;
                        /** 重登情况下只有一道题目 */
                        this.testQue = KejuModel.getInstance().ExamProv.get(key[key.length - 1]);
                        this._viewUI.help_btn.visible = false;
                        this._viewUI.tenitem_bg.visible = true;
                        this._viewUI.twentyitem_bg.visible = true;
                    }
                    else if (examType == ImpExamType.IMPEXAM_STATE) {
                        key = KejuModel.getInstance().ExamState.keys;
                        /** 重登情况下只有一道题目 */
                        this.testQue = KejuModel.getInstance().ExamState.get(key[key.length - 1]);
                        this._viewUI.help_btn.visible = false;
                        this._viewUI.tenitem_bg.visible = false;
                        this._viewUI.twentyitem_bg.visible = false;
                    }
                    else
                        return;
                    if (typeof (this.testQue) == null)
                        return;
                    this._viewUI.dijiti_lab.text = "第" + (key.length) + "题:";
                    /** 界面打开设为true */
                    if (KejuModel.getInstance().isOpen) {
                        /** 判断上道题目的对错 */
                        this.judgeUpperQuestion(this.testQue.impexamdata.lastright);
                    }
                    else {
                        this._viewUI.right_img.visible = false;
                        this._viewUI.error_img.visible = false;
                        KejuModel.getInstance().isOpen = true;
                    }
                    this.updateUI(this.testQue);
                    this.chooseData = this.testQuestionData[this.testQue.impexamdata.questionid].optioins;
                    if (KejuModel.getInstance().assisttype == ImpExamAssistType.DELWRONG)
                        this.deleteChoose();
                    this.randomOption();
                    /** 刷新四个选项数据 */
                    this.refreshchoose();
                };
                /**随机删除一个选择 */
                KejuModule.prototype.deleteChoose = function () {
                    var deleteChooseData = parseInt((Math.random() * 3 + 1).toString());
                    this.chooseData.splice(deleteChooseData, 1);
                };
                /** 刷新ui
                 * @param testQue 配置表数据
                 */
                KejuModule.prototype.updateUI = function (testQue) {
                    this._viewUI.content_lab.text = this.testQuestionData[testQue.impexamdata.questionid].name;
                    this._viewUI.zhunquelv_lab.text = testQue.impexamdata.righttimes + "/" + (testQue.impexamdata.questionnum - 1);
                    this.lefttime = testQue.impexamdata.remaintime;
                    this._viewUI.shengyucishu_lab.text = "求助(" + testQue.impexamdata.helpcnt + "/3)";
                    Laya.timer.loop(1000, this, this.updTimer);
                    this._viewUI.contentBg_img.visible = true;
                    this._viewUI.over_img.visible = false;
                    this._viewUI.twentyItem_Img.skin = "common/icon/item/" + 20071 + ".png";
                    this._viewUI.tenItem_Img.skin = "common/icon/item/" + 20072 + ".png";
                    var qucuoNum = this.testQue.impexamdata.delwrongval; //取错玉
                    var zhenzhiNum = this.testQue.impexamdata.chorightval; //真知玉
                    if (qucuoNum >= 1) {
                        this._viewUI.tenitem_num_lab.visible = true;
                        this._viewUI.tenitem_num_lab.text = qucuoNum.toString();
                    }
                    else
                        this._viewUI.tenitem_num_lab.visible = false;
                    if (zhenzhiNum >= 1) {
                        this._viewUI.tewntyitem_num_lab.visible = true;
                        this._viewUI.tewntyitem_num_lab.text = zhenzhiNum.toString();
                    }
                    else
                        this._viewUI.tewntyitem_num_lab.visible = false;
                };
                /** 刷新计时器 */
                KejuModule.prototype.updTimer = function () {
                    var hour = Math.floor(this.lefttime / 1000 / 3600 % 24);
                    var hourstr = "";
                    if (hour < 10)
                        hourstr = ("0" + hour);
                    var min = Math.floor(this.lefttime / 1000 / 60 % 60);
                    var minstr = "";
                    if (min < 10)
                        minstr = ("0" + min);
                    var second = Math.floor(this.lefttime / 1000 % 60);
                    var secondstr = "";
                    if (second < 10)
                        secondstr = ("0" + second);
                    if (hourstr != "")
                        this._viewUI.time_lan.text = hourstr;
                    else
                        this._viewUI.time_lan.text = hour.toString();
                    if (minstr != "")
                        this._viewUI.time_lan.text += ":" + minstr;
                    else
                        this._viewUI.time_lan.text += ":" + min.toString();
                    if (secondstr != "")
                        this._viewUI.time_lan.text += ":" + secondstr;
                    else
                        this._viewUI.time_lan.text += ":" + second.toString();
                    // this._viewUI.time_lan.text = hour +":" + min+":"+second;
                    if (this.lefttime >= 1000)
                        this.lefttime -= 1000;
                };
                /** 打乱顺序 */
                /** 生成随机1~4的数 */
                KejuModule.prototype.randomOption = function () {
                    if (KejuModel.getInstance().assisttype != ImpExamAssistType.DELWRONG) {
                        this.rightAnswer = parseInt((Math.random() * 4 + 1).toString());
                    }
                    else {
                        this.rightAnswer = parseInt((Math.random() * 3 + 1).toString());
                    }
                    var rightAnswer = this.chooseData[0];
                    this.chooseData.splice(this.rightAnswer, 0, rightAnswer);
                    this.chooseData.splice(0, 1);
                };
                /**
                 * 判断上道题的对错并且刷新UI
                 * @param rightOrWrong 上一题答对了还是答错了,1表示对,0表示错 -1=第一次发出来题目
                 */
                KejuModule.prototype.judgeUpperQuestion = function (rightOrWrong) {
                    this._viewUI.right_img.visible = false;
                    this._viewUI.error_img.visible = false;
                    if (rightOrWrong == -1)
                        return;
                    else if (rightOrWrong == 1) {
                        if (KejuModel.getInstance().assisttype != ImpExamType.IMPEXAM_PROV) {
                            var prompt_1 = HudModel.getInstance().promptAssembleBack(PromptExplain.RIGHT_ANSWER);
                            Laya.timer.once(250, this, this.showDisappearTip, [prompt_1]);
                            this._viewUI.right_img.visible = true;
                        }
                    }
                    else if (rightOrWrong == 0) {
                        var prompt_2 = HudModel.getInstance().promptAssembleBack(PromptExplain.ERROR_ANSWER);
                        Laya.timer.once(250, this, this.showDisappearTip, [prompt_2]);
                        this._viewUI.error_img.visible = true;
                    }
                    this.showRightAndError(rightOrWrong);
                };
                /**
                 * 显示对错信息
                 * @param disappar 弹窗对象 @param prompt 弹窗语句
                 */
                KejuModule.prototype.showDisappearTip = function (prompt) {
                    var disappar = new DisappearMessageTipsMediator(this._app);
                    disappar.onShow(prompt);
                };
                /** 计时器 */
                KejuModule.prototype.showRightAndError = function (rightOrWrong) {
                    Laya.timer.once(1000, this, this.hiderightAndWrong, [rightOrWrong]);
                };
                /** 隐藏ui
                 * @param rightOrWrong 0 正确 1错误
                */
                KejuModule.prototype.hiderightAndWrong = function (rightOrWrong) {
                    if (rightOrWrong == 1)
                        this._viewUI.right_img.visible = false;
                    else if (rightOrWrong == 0)
                        this._viewUI.error_img.visible = false;
                    /** 清理计时器 */
                    Laya.timer.clear(this, this.hiderightAndWrong);
                };
                /** 刷新四个选项数据 */
                KejuModule.prototype.refreshchoose = function () {
                    this._viewUI.answer_list.vScrollBarSkin = "";
                    this._viewUI.answer_list.repeatX = 1;
                    this._viewUI.answer_list.repeatY = 4;
                    this._viewUI.answer_list.array = this.chooseData;
                    this._viewUI.answer_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.answer_list.scrollBar.elasticDistance = 100;
                    this._viewUI.answer_list.renderHandler = new Handler(this, this.onRenderChoose);
                    // this._viewUI.answer_list.selectHandler = new Handler(this,this.onSelectChoose);
                };
                /** 四个选项渲染 */
                KejuModule.prototype.onRenderChoose = function (cell, index) {
                    if (index < 0 || index >= this.chooseData.length)
                        return;
                    var answer_btn = cell.getChildByName("answer_btn");
                    var answer_lab = answer_btn.getChildByName("answer_lab");
                    var chooseIndex = KejuModel.getInstance().getchooseIndex(index);
                    answer_btn.on(LEvent.CLICK, this, this.onSelectChoose, [index]);
                    if (typeof (chooseIndex) == null)
                        return;
                    answer_lab.text = chooseIndex + " " + this.chooseData[index];
                };
                /** 选中答案
                 * @param index 选中下标
                 */
                KejuModule.prototype.onSelectChoose = function (index) {
                    if (index == -1)
                        return;
                    var type = KejuModel.getInstance().impexamtype;
                    if ((this.rightAnswer - 1) == index) {
                        RequesterProtocols._instance.c2s_send_impexamanswer(type, 1, ImpExamAssistType.NOASSIST);
                    }
                    else if (index != 0) { /** 如果选择不是第一个 */
                        RequesterProtocols._instance.c2s_send_impexamanswer(type, (index + 1), ImpExamAssistType.NOASSIST);
                    }
                    else { /**  */
                        RequesterProtocols._instance.c2s_send_impexamanswer(type, this.rightAnswer, ImpExamAssistType.NOASSIST);
                    }
                    this._viewUI.answer_list.selectedIndex = -1;
                };
                /** 注册事件 */
                KejuModule.prototype.registerEvent = function () {
                    /** 类型提前可确认 */
                    this._viewUI.introduce_lab.on(LEvent.CLICK, this, this.showIntroduceTips);
                    /** 答题介绍 */
                    this._viewUI.hideIntroduce_img.on(LEvent.CLICK, this, this.hideIntroduceTips);
                    /** 关闭按钮 */
                    this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.close);
                    /** 答题求助 */
                    this._viewUI.help_btn.on(LEvent.CLICK, this, this.onHelp);
                    /** 点击使用魅惑法珠 */
                    this._viewUI.tenuse_btn.on(LEvent.CLICK, this, this.onQuCuo);
                    /** 点击使用真视之眼 */
                    this._viewUI.twentyuse_btn.on(LEvent.CLICK, this, this.onZhenZhi, []);
                    keju.models.KejuProxy.getInstance().on(keju.models.OVER_IMP_EXAM, this, this.overExam);
                    keju.models.KejuProxy.getInstance().on(keju.models.PROP_DELETE_TOPIC, this, this.init);
                };
                /**点击使用魅惑法珠 */
                KejuModule.prototype.onQuCuo = function () {
                    var itemNum = this.testQue.impexamdata.delwrongval; //去错玉
                    var impexamtype = KejuModel.getInstance().impexamtype; //科举类型
                    if (impexamtype == ImpExamType.IMPEXAM_PROV) {
                        if (itemNum != 0) {
                            RequesterProtocols._instance.c2s_send_impexamanswer(impexamtype, -1, ImpExamAssistType.DELWRONG);
                        }
                        else {
                            var disappar = new DisappearMessageTipsMediator(this._app);
                            var prompt_3 = HudModel.getInstance().promptAssembleBack(PromptExplain.QUCUO_NO_ENOUGH);
                            disappar.onShow(prompt_3);
                        }
                    }
                    else {
                        var disappar = new DisappearMessageTipsMediator(this._app);
                        var prompt_4 = HudModel.getInstance().promptAssembleBack(PromptExplain.QUCUO_IMPERIAL_USE);
                        disappar.onShow(prompt_4);
                    }
                };
                /**点击使用真视之眼 */
                KejuModule.prototype.onZhenZhi = function () {
                    var itemNum = this.testQue.impexamdata.chorightval;
                    var impexamtype = KejuModel.getInstance().impexamtype;
                    if (impexamtype == ImpExamType.IMPEXAM_PROV) {
                        if (itemNum != 0) {
                            RequesterProtocols._instance.c2s_send_impexamanswer(impexamtype, -1, ImpExamAssistType.CHORIGHT);
                        }
                        else {
                            var disappar = new DisappearMessageTipsMediator(this._app);
                            var prompt_5 = HudModel.getInstance().promptAssembleBack(PromptExplain.ZHENZHI_NO_ENOUGH);
                            disappar.onShow(prompt_5);
                        }
                    }
                    else {
                        var disappar = new DisappearMessageTipsMediator(this._app);
                        var prompt_6 = HudModel.getInstance().promptAssembleBack(PromptExplain.ZHENZHI_IMPERIAL_USE);
                        disappar.onShow(prompt_6);
                    }
                };
                /** 考试结束
                 * @param lastright 是否正确
                */
                KejuModule.prototype.overExam = function (lastright) {
                    this._viewUI.contentBg_img.visible = false;
                    this._viewUI.over_img.visible = true;
                    var text = this._viewUI.zhunquelv_lab.text;
                    var arr = text.split("/");
                    if (arr.length != 2)
                        return;
                    this._viewUI.zhunquelv_lab.text = arr[0] + "/" + (Number(arr[1]) + 1);
                    this.judgeUpperQuestion(lastright);
                };
                /** 进行求助 */
                KejuModule.prototype.onHelp = function () {
                    /** 判断是否有工会 */
                    var clankey = HudModel.getInstance().clankey;
                    if (clankey == 0) {
                        var disappar = new DisappearMessageTipsMediator(this._app);
                        var prompt_7 = HudModel.getInstance().promptAssembleBack(PromptExplain.NO_FAMILY);
                        disappar.onShow(prompt_7);
                        return;
                    }
                    if (this.testQue.impexamdata.helpcnt >= 3)
                        return;
                    var impexamtype = KejuModel.getInstance().impexamtype;
                    this.CImpExamHelp(impexamtype);
                    this.hide();
                    LoginModel.getInstance().CommonPage = "keju";
                    /** 跳转到帮派频道 */
                    ChatModel.getInstance().Firstchannel = 4;
                    modules.ModuleManager.show(modules.ModuleNames.Chat, this._app);
                };
                /**
                 * 求助请求
                 * @param  impexamtype 试炼类型
                 */
                KejuModule.prototype.CImpExamHelp = function (impexamtype) {
                    RequesterProtocols._instance.c2s_imp_examhelp(impexamtype);
                };
                KejuModule.prototype.onShow = function (event) {
                    _super.prototype.onShow.call(this, event);
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.OPEN_EVENT);
                };
                KejuModule.prototype.close = function () {
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.CLOSEVIEW_EVENT);
                    this.hide();
                };
                KejuModule.prototype.hide = function () {
                    /** 清空计时器 */
                    Laya.timer.clear(this, this.updTimer);
                    /** 界面关闭设为false */
                    if (KejuModel.getInstance().isOpen)
                        KejuModel.getInstance().isOpen = false;
                    _super.prototype.hide.call(this);
                };
                KejuModule.prototype.getView = function () {
                    return this._viewUI;
                };
                KejuModule.prototype.show = function () {
                    _super.prototype.show.call(this);
                    this.init();
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.OPEN_EVENT);
                };
                return KejuModule;
            }(game.modules.ModuleMediator));
            keju.KejuModule = KejuModule;
        })(keju = modules.keju || (modules.keju = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=KejuModule.js.map