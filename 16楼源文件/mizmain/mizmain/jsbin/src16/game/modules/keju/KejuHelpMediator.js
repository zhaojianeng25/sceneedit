/**wanjiazhuangbei.ui */
// import KejuHelpUI = ui.common.ShiLianQiuZhuUI;
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
        var keju;
        (function (keju) {
            var KejuHelpMediator = /** @class */ (function (_super) {
                __extends(KejuHelpMediator, _super);
                function KejuHelpMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    /**装备背包中道具个数 */
                    _this._equipGameItemListLength = 5;
                    /** 考题 */
                    _this.questionId = -1;
                    /** 科举类型 */
                    _this.examtype = -1;
                    /** 被帮人名称 */
                    _this.rolename = "";
                    _this._viewUI = new ui.common.ShiLianQiuZhuUI();
                    _this._viewUI.mouseThrough = true;
                    _this.isCenter = true;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this.registerEvent();
                    _this.eventListener();
                    return _this;
                }
                /**注册事件监听 */
                KejuHelpMediator.prototype.eventListener = function () {
                    // game.modules.sale.models.SaleProxy._instance.on(game.modules.sale.models.SMarketPetTips, this, this.showPetDetails);
                };
                KejuHelpMediator.getInstance = function (app) {
                    if (!this._instance) {
                        this._instance = new KejuHelpMediator(app);
                    }
                    return this._instance;
                };
                /** 显示
                 * @param question 题目Id
                 * @param examtype 考试类型
                 * @param rolename 角色名称
                 */
                KejuHelpMediator.prototype.onShow = function (question, examtype, rolename) {
                    _super.prototype.show.call(this);
                    this.questionId = question;
                    this.examtype = examtype;
                    this.rolename = rolename;
                    this.showTitle();
                    /** 刷新四个选项数据 */
                    this.refreshchoose();
                };
                /** 刷新四个选项数据 */
                KejuHelpMediator.prototype.refreshchoose = function () {
                    this._viewUI.answer_list.vScrollBarSkin = "";
                    this._viewUI.answer_list.repeatX = 2;
                    this._viewUI.answer_list.repeatY = 2;
                    this._viewUI.answer_list.array = this.chooseData;
                    this._viewUI.answer_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.answer_list.scrollBar.elasticDistance = 100;
                    this._viewUI.answer_list.renderHandler = new Handler(this, this.onRenderChoose);
                };
                /** 四个选项渲染 */
                KejuHelpMediator.prototype.onRenderChoose = function (cell, index) {
                    if (index < 0 || index >= this.chooseData.length)
                        return;
                    var answer_btn = cell.getChildByName("answer_btn");
                    var answer_lab = answer_btn.getChildByName("answer_lab");
                    var chooseIndex = KejuModel.getInstance().getchooseIndex(index);
                    answer_btn.on(LEvent.CLICK, this, this.onSelectChoose, [this.chooseData[index]]);
                    if (typeof (chooseIndex) == null)
                        return;
                    answer_lab.text = chooseIndex + " " + this.chooseData[index];
                };
                /** 选中答案发送聊天
                 * @param answer 答案
                */
                KejuHelpMediator.prototype.onSelectChoose = function (answer) {
                    var type = KejuModel.getInstance().impexamtype;
                    var msg = "#ff6600*split" + this.rolename + "[" + answer + "]";
                    var displayInfo = [];
                    var funType = 0;
                    var taskId = 0;
                    RequesterProtocols._instance.c2s_CTransChatMessage2Serv(ChannelType.CHANNEL_CLAN, msg, msg, displayInfo, funType, taskId);
                    this.hide();
                };
                /** 显示题目 */
                KejuHelpMediator.prototype.showTitle = function () {
                    if (this.questionId == -1 || this.examtype == -1)
                        return;
                    this.testQuestionData = KejuModel.getInstance().getExamConfigData(this.examtype);
                    this.chooseData = this.testQuestionData[this.questionId].optioins;
                    this._viewUI.title_lab.text = this.testQuestionData[this.questionId].name;
                    this.randomOption();
                };
                /** 打乱顺序 */
                KejuHelpMediator.prototype.randomOption = function () {
                    /** 生成随机1~4的数 */
                    var rightAnswers = parseInt((Math.random() * 4 + 1).toString());
                    var rightAnswer = this.chooseData[0];
                    this.chooseData.splice(rightAnswers, 0, rightAnswer);
                    this.chooseData.splice(0, 1);
                };
                KejuHelpMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                KejuHelpMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                /**
                 * @describe  注册事件
                 */
                KejuHelpMediator.prototype.registerEvent = function () {
                    /** 发送信息 */
                    this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.closeEvent);
                };
                KejuHelpMediator.prototype.closeEvent = function () {
                    this.hide();
                    if (LoginModel.getInstance().CommonPage != "") {
                        modules.ModuleManager.show(LoginModel.getInstance().CommonPage, this._app);
                        LoginModel.getInstance().CommonPage = "";
                    }
                };
                return KejuHelpMediator;
            }(game.modules.UiMediator));
            keju.KejuHelpMediator = KejuHelpMediator;
        })(keju = modules.keju || (modules.keju = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=KejuHelpMediator.js.map