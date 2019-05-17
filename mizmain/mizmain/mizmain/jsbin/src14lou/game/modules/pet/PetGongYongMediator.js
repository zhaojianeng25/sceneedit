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
* 宠物公用提示框
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var pet;
        (function (pet) {
            var PetGongYongMediator = /** @class */ (function (_super) {
                __extends(PetGongYongMediator, _super);
                function PetGongYongMediator(uiLayaer) {
                    var _this = _super.call(this, uiLayaer) || this;
                    /**点击小键盘后的数字 */
                    _this.totalNum = "";
                    _this._viewUI = new ui.common.PetGongYongUI();
                    _this._viewUI.mouseThrough = true;
                    _this.isCenter = false;
                    _this._viewUI.inputname_textinput.maxChars = 6;
                    _this._viewUI.inputname_textinput.on(Laya.Event.KEY_DOWN, _this, _this.keydown);
                    return _this;
                }
                PetGongYongMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                };
                /**更改名字*/
                PetGongYongMediator.prototype.changename = function () {
                    _super.prototype.show.call(this);
                    this._viewUI.fangsheng_box.visible = false;
                    this._viewUI.changename_box.visible = true;
                    this._viewUI.quxiao_btn.clickHandler = new Laya.Handler(this, this.quxiao);
                    this._viewUI.queding_btn.clickHandler = new Laya.Handler(this, this.queding);
                };
                /**宠物放生确定*/
                PetGongYongMediator.prototype.fangsheng = function (index) {
                    _super.prototype.show.call(this);
                    var chattext = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11829];
                    var tips = chattext.msg.replace("$petname$", PetModel.getInstance().petbasedata.name);
                    tips = tips.replace("$petlv$", PetModel.getInstance().petbasedata.level + "");
                    this._viewUI.text_lab.changeText(tips);
                    this._viewUI.fangsheng_box.visible = true;
                    this._viewUI.changename_box.visible = false;
                    this._viewUI.yzm_lab.changeText((Math.random() * 8999 + 1000).toFixed(0));
                    this._viewUI.quxiao_btn.clickHandler = new Laya.Handler(this, this.quxiao);
                    this._viewUI.queding_btn.clickHandler = new Laya.Handler(this, this.fsqueding);
                    this._viewUI.yzm_label.on(LEvent.MOUSE_DOWN, this, this.onPrice);
                };
                /**取消放生或更改名字*/
                PetGongYongMediator.prototype.quxiao = function () {
                    this.hide();
                };
                /**确定更改名字*/
                PetGongYongMediator.prototype.queding = function () {
                    var newpetname = this._viewUI.inputname_textinput.text;
                    if (this._viewUI.inputname_textinput.text != "") {
                        if (this._viewUI.inputname_textinput.text.length <= 6) {
                            RequesterProtocols._instance.c2s_mod_petname(PetModel._instance.petbasedata.key, newpetname);
                        }
                    }
                    else {
                        this.baywindows(420041);
                    }
                    this.hide();
                };
                /** 键盘落下监听-判断输入是否超过限制 */
                PetGongYongMediator.prototype.keydown = function () {
                    var newpetname = this._viewUI.inputname_textinput.text;
                    var characterByte = this.judgebyte(newpetname);
                    if (characterByte >= 6) {
                        this.baywindows(142995);
                    }
                };
                /**
                 * 飘窗方法提示
                 * @param count 传过来的数字就是配置表里面的数字
                 */
                PetGongYongMediator.prototype.baywindows = function (count) {
                    if (count != null) {
                        try {
                            var prompt_1 = HudModel.getInstance().promptAssembleBack(count);
                            var disappearMsgTips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                            disappearMsgTips.onShow(prompt_1);
                        }
                        catch (ex) {
                            console.log(ex);
                        }
                    }
                };
                /**
                 * 判断英文数字 或者中文 占用多少字节
                 * @param str 传过来的字
                 */
                PetGongYongMediator.prototype.judgebyte = function (str) {
                    var Englishrecord = 0; // 英语占用多少字节
                    for (var i = 0; i < str.length; i++) {
                        if (str[i].charCodeAt(0) < 299) {
                            Englishrecord++;
                        }
                    }
                    return Englishrecord;
                };
                /**确定放生*/
                PetGongYongMediator.prototype.fsqueding = function () {
                    if (this._viewUI.yzm_label.text == this._viewUI.yzm_lab.text) {
                        pet.models.PetProxy.getInstance().event(pet.models.RELEASEPET_EVENT);
                        this.hide();
                    }
                    else { //验证码错误
                        this.tips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                        var chattext = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[150075];
                        this.tips.onShow(chattext.msg);
                    }
                };
                /**显示小键盘 */
                PetGongYongMediator.prototype.onPrice = function () {
                    this._XiaoJianPanMediator = new game.modules.tips.XiaoJianPanMediator(this._viewUI);
                    this._XiaoJianPanMediator.onShow(150, 400);
                    game.modules.tips.models.TipsProxy.getInstance().on(game.modules.tips.models.ON_KRYBOARD, this, this.setPetPrice);
                };
                /**通过小键盘设置价格 */
                PetGongYongMediator.prototype.setPetPrice = function (num) {
                    if (num == -2) { //点击了ok
                        if (this.totalNum == "" || this.totalNum.charAt(0) == "0") {
                            this.totalNum = "";
                        }
                    }
                    if (num == -1) { //点击了删除
                        this.totalNum = this.totalNum.substring(0, this.totalNum.length - 1);
                        if (this.totalNum.length <= 0) {
                            this.totalNum = "0";
                        }
                    }
                    if (this.totalNum.length >= 4)
                        return;
                    var onePriceLabel = this._viewUI.yzm_label;
                    if (num >= 0) {
                        if (typeof (this.totalNum) === "number") {
                            this.totalNum = "";
                        }
                        var oneChar = this.totalNum.charAt(0);
                        if (oneChar != '0') {
                            this.totalNum += num;
                        }
                        else {
                            this.totalNum = num;
                        }
                    }
                    onePriceLabel.text = this.totalNum;
                };
                PetGongYongMediator.prototype.hide = function () {
                    game.modules.tips.models.TipsProxy.getInstance().off(game.modules.tips.models.ON_KRYBOARD, this, this.setPetPrice);
                    _super.prototype.hide.call(this);
                };
                PetGongYongMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return PetGongYongMediator;
            }(game.modules.UiMediator));
            pet.PetGongYongMediator = PetGongYongMediator;
        })(pet = modules.pet || (modules.pet = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=PetGongYongMediator.js.map