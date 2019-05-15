/**messageTips.ui */
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
// import DissappearMessageTips = ui.common.component.DisappearTipsMessageUI;
var game;
(function (game) {
    var modules;
    (function (modules) {
        var commonUI;
        (function (commonUI) {
            var DisappearMessageTipsMediator = /** @class */ (function (_super) {
                __extends(DisappearMessageTipsMediator, _super);
                function DisappearMessageTipsMediator(app) {
                    var _this = _super.call(this) || this;
                    /** 存放数字皮肤地址 */
                    _this.numSkinStr = [];
                    _this.uiLayer = app.uiRoot.topUnder;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this._viewUI = new ui.common.component.DisappearTipsMessageUI();
                    _this._viewUI.mouseThrough = true;
                    _this.isCenter = true;
                    // this.regestEvent();
                    _this.px = _this._viewUI.msgTips_img.x;
                    _this.py = _this._viewUI.msgTips_img.y;
                    _this.x1 = _this._viewUI.msgTips1_img.x;
                    _this.y1 = _this._viewUI.msgTips1_img.y;
                    _this.x2 = _this._viewUI.msgTips2_img.x;
                    _this.y2 = _this._viewUI.msgTips2_img.y;
                    return _this;
                }
                ////////////////
                ///业务逻辑
                ////////////////
                /**
                 * @describe  显示提示UI
                 * @param
                 *
                 */
                DisappearMessageTipsMediator.prototype.onShow = function (promoto, id) {
                    this.show();
                    if (id == undefined)
                        this.onLoad(promoto);
                    else if (id == 1)
                        this.onLoad1(promoto);
                    else if (id == 2)
                        this.onLoad2(promoto);
                };
                DisappearMessageTipsMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                };
                DisappearMessageTipsMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                DisappearMessageTipsMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                /** 属性变化特效
                 * @param diff 差值
                 * @param flag true:增加，false:减少
                 * @param shuxingType 属性类型
                 */
                DisappearMessageTipsMediator.prototype.onLoadRolePropertyChangeEffect = function (diff, flag, shuxingType) {
                    this._viewUI.attrChange_box.visible = true;
                    var shuxingType_img = this._viewUI.shuxingType_img;
                    if (flag) { //增加属性
                        this._viewUI.changeType_img.skin = "common/ui/bag/greenjia_res.png";
                        switch (shuxingType) {
                            case shuxing.MAX_HP: //最大生命值
                                shuxingType_img.skin = "common/ui/bag/shengming_res000.png";
                                break;
                            case shuxing.MAX_MP: //最大魔法值
                                shuxingType_img.skin = "common/ui/bag/mofa2_res000.png";
                                break;
                            case shuxing.ATTACK: //物理攻击
                                shuxingType_img.skin = "common/ui/bag/wuligongji_res000.png";
                                break;
                            case shuxing.DEFEND: //物理防御
                                shuxingType_img.skin = "common/ui/bag/wulifangyu_res000.png";
                                break;
                            case shuxing.MAGIC_ATTACK: //法术攻击
                                shuxingType_img.skin = "common/ui/bag/fashugongji_res000.png";
                                break;
                            case shuxing.MAGIC_DEF: //法术防御
                                shuxingType_img.skin = "common/ui/bag/fashufangyu_res000.png";
                                break;
                            case shuxing.MEDICAL: //治疗强度
                                shuxingType_img.skin = "common/ui/bag/zhiliaoqiangdu_res000.png";
                                break;
                            case shuxing.SEAL: //控制命中
                                shuxingType_img.skin = "common/ui/bag/kongzhimingzhong_res000.png";
                                break;
                            case shuxing.UNSEAL: //控制抗性
                                shuxingType_img.skin = "common/ui/bag/kongzhikangxing_res000.png";
                                break;
                            case shuxing.SPEED: //速度
                                shuxingType_img.skin = "common/ui/bag/sudu_res000.png";
                                break;
                        }
                    }
                    else { //减少属性                
                        this._viewUI.changeType_img.skin = "common/ui/bag/redjian_res.png";
                        switch (shuxingType) {
                            case shuxing.MAX_HP: //最大生命值
                                shuxingType_img.skin = "common/ui/bag/shengming2_res000.png";
                                break;
                            case shuxing.MAX_MP: //最大魔法值
                                shuxingType_img.skin = "common/ui/bag/mofa_res000.png";
                                break;
                            case shuxing.ATTACK: //物理攻击
                                shuxingType_img.skin = "common/ui/bag/wuligongji2_res000.png";
                                break;
                            case shuxing.DEFEND: //物理防御
                                shuxingType_img.skin = "common/ui/bag/wulifangyu2_res000.png";
                                break;
                            case shuxing.MAGIC_ATTACK: //法术攻击
                                shuxingType_img.skin = "common/ui/bag/fashugongji2_res000.png";
                                break;
                            case shuxing.MAGIC_DEF: //法术防御
                                shuxingType_img.skin = "common/ui/bag/fashufangyu2_res000.png";
                                break;
                            case shuxing.MEDICAL: //治疗强度
                                shuxingType_img.skin = "common/ui/bag/zhiliaoqiangdu2_res000.png";
                                break;
                            case shuxing.SEAL: //控制命中
                                shuxingType_img.skin = "common/ui/bag/kongzhimingzhong2_res000.png";
                                break;
                            case shuxing.UNSEAL: //控制抗性
                                shuxingType_img.skin = "common/ui/bag/kongzhikangxing2_res000.png";
                                break;
                            case shuxing.SPEED: //速度
                                shuxingType_img.skin = "common/ui/bag/sudu2_res000.png";
                                break;
                        }
                    }
                    this.updateDiff(diff, flag);
                    var terminalY = 300;
                    Laya.Tween.to(this._viewUI.attrChange_box, { y: terminalY }, 1500, Laya.Ease.circOut, Laya.Handler.create(this, function () {
                        this._viewUI.attrChange_box.visible = false;
                        this._viewUI.attrChange_box.x = this.px;
                        this._viewUI.attrChange_box.y = this.py;
                    }), null, true);
                    this.show();
                };
                /** 更新差值 */
                DisappearMessageTipsMediator.prototype.updateDiff = function (diff, flag) {
                    var temp = Math.abs(diff);
                    var diffArray = [];
                    var i = 0;
                    do {
                        var num = Math.floor(temp % 10);
                        temp = temp / 10;
                        diffArray[i] = num;
                        i++;
                    } while (temp >= 1);
                    var skinArray = [];
                    for (var k = 0; k <= i - 1; k++) {
                        skinArray[k] = this.getSkinSource(diffArray[i - k - 1], flag);
                    }
                    this.numSkinStr = skinArray;
                    this._viewUI.diff_lst.array = skinArray;
                    this._viewUI.diff_lst.renderHandler = new Laya.Handler(this, this.numRender);
                };
                /** 数字渲染 */
                DisappearMessageTipsMediator.prototype.numRender = function (cell, index) {
                    if (index >= this.numSkinStr.length || index < 0)
                        return;
                    var diffvalue = cell.getChildByName("diffvalue");
                    diffvalue.skin = this.numSkinStr[index];
                };
                /** 获取图片地址 */
                DisappearMessageTipsMediator.prototype.getSkinSource = function (index, flag) {
                    var skinStr;
                    if (flag) {
                        switch (index) {
                            case 0:
                                skinStr = "common/ui/bag/green0_res.png";
                                break;
                            case 1:
                                skinStr = "common/ui/bag/green1_res.png";
                                break;
                            case 2:
                                skinStr = "common/ui/bag/green2_res.png";
                                break;
                            case 3:
                                skinStr = "common/ui/bag/green3_res.png";
                                break;
                            case 4:
                                skinStr = "common/ui/bag/green4_res.png";
                                break;
                            case 5:
                                skinStr = "common/ui/bag/green5_res.png";
                                break;
                            case 6:
                                skinStr = "common/ui/bag/green6_res.png";
                                break;
                            case 7:
                                skinStr = "common/ui/bag/green7_res.png";
                                break;
                            case 8:
                                skinStr = "common/ui/bag/green8_res.png";
                                break;
                            case 9:
                                skinStr = "common/ui/bag/green9_res.png";
                                break;
                        }
                    }
                    else {
                        switch (index) {
                            case 0:
                                skinStr = "common/ui/bag/red0_res.png";
                                break;
                            case 1:
                                skinStr = "common/ui/bag/red1_res.png";
                                break;
                            case 2:
                                skinStr = "common/ui/bag/red2_res.png";
                                break;
                            case 3:
                                skinStr = "common/ui/bag/red3_res.png";
                                break;
                            case 4:
                                skinStr = "common/ui/bag/red4_res.png";
                                break;
                            case 5:
                                skinStr = "common/ui/bag/red5_res.png";
                                break;
                            case 6:
                                skinStr = "common/ui/bag/red6_res.png";
                                break;
                            case 7:
                                skinStr = "common/ui/bag/red7_res.png";
                                break;
                            case 8:
                                skinStr = "common/ui/bag/red8_res.png";
                                break;
                            case 9:
                                skinStr = "common/ui/bag/red9_res.png";
                                break;
                        }
                    }
                    if (skinStr) {
                        return skinStr;
                    }
                };
                /**
                 * @describe
                 * @param  data 提示语句
                 */
                DisappearMessageTipsMediator.prototype.onLoad = function (promoto) {
                    var terminalY = 300;
                    this._viewUI.msgTips_img.visible = true;
                    this._viewUI.msgTips1_lab.visible = false;
                    this._viewUI.msgTips_lab.visible = true;
                    this._viewUI.msgTips_lab.style.width = 409;
                    this._viewUI.msgTips_lab.style.align = "center";
                    this._viewUI.msgTips_lab.innerHTML = promoto;
                    /** 文本垂直居中 */
                    this._viewUI.msgTips_lab.y = (this._viewUI.msgTips_img.height - this._viewUI.msgTips_lab.contextHeight) / 2;
                    Laya.Tween.to(this._viewUI.msgTips_img, { y: terminalY }, 1500, Laya.Ease.circOut, Laya.Handler.create(this, function () {
                        this._viewUI.msgTips_img.visible = false;
                        this._viewUI.msgTips_img.x = this.px;
                        this._viewUI.msgTips_img.y = this.py;
                    }), null, true);
                };
                /**升级提示 */
                DisappearMessageTipsMediator.prototype.onLoad1 = function (promoto) {
                    var terminalY = 580;
                    this._viewUI.msgTips1_img.visible = true;
                    this._viewUI.msgTips1_htm.visible = true;
                    this._viewUI.msgTips1_htm.style.width = 409;
                    this._viewUI.msgTips1_htm.style.align = "center";
                    this._viewUI.msgTips1_htm.innerHTML = promoto;
                    /** 文本垂直居中 */
                    this._viewUI.msgTips1_htm.y = (this._viewUI.msgTips1_img.height - this._viewUI.msgTips1_htm.contextHeight) / 2;
                    Laya.Tween.to(this._viewUI.msgTips1_img, { y: terminalY }, 1500, Laya.Ease.circOut, Laya.Handler.create(this, function () {
                        this._viewUI.msgTips1_img.visible = false;
                        this._viewUI.msgTips1_img.x = this.x1;
                        this._viewUI.msgTips1_img.y = this.y1;
                        this._viewUI.sheng_img.visible = false;
                        this._viewUI.ji_img.visible = false;
                        this._viewUI.unlock_img.visible = false;
                        this._viewUI.guangxiao_img.visible = false;
                    }), null, false);
                };
                /**加经验提示 */
                DisappearMessageTipsMediator.prototype.onLoad2 = function (promoto) {
                    var terminalY = 244;
                    this._viewUI.msgTips2_img.visible = true;
                    this._viewUI.msgTips2_htm.visible = true;
                    this._viewUI.msgTips2_htm.style.width = 409;
                    this._viewUI.msgTips2_htm.style.align = "center";
                    this._viewUI.msgTips2_htm.innerHTML = promoto;
                    /** 文本垂直居中 */
                    this._viewUI.msgTips2_htm.y = (this._viewUI.msgTips2_img.height - this._viewUI.msgTips2_htm.contextHeight) / 2;
                    Laya.Tween.to(this._viewUI.msgTips2_img, { y: terminalY }, 1500, Laya.Ease.circOut, Laya.Handler.create(this, function () { this._viewUI.msgTips2_img.visible = false; this._viewUI.msgTips2_img.x = this.x2; this._viewUI.msgTips2_img.y = this.y2; }), null, false);
                };
                DisappearMessageTipsMediator.prototype.xingongneng = function () {
                    this._viewUI.unlock_img.visible = true;
                    this._viewUI.guangxiao_img.visible = true;
                    this._viewUI.guangxiao_img.alpha = 0.1;
                    Laya.timer.frameLoop(2, this, this.guangxiao);
                };
                DisappearMessageTipsMediator.prototype.guangxiao = function (e) {
                    this._viewUI.guangxiao_img.alpha += 0.1;
                    if (this._viewUI.guangxiao_img.alpha == 1) {
                        Laya.timer.clear(this, this.guangxiao);
                    }
                };
                DisappearMessageTipsMediator.prototype.xuanzhuan = function () {
                    this._viewUI.sheng_img.scaleX = -1;
                    this._viewUI.sheng_img.visible = true;
                    Laya.timer.frameLoop(1, this, this.animate);
                };
                DisappearMessageTipsMediator.prototype.animate = function (e) {
                    this._viewUI.sheng_img.scaleX += 0.1;
                    if (this._viewUI.sheng_img.scaleX > 1) {
                        this._viewUI.sheng_img.scaleX = 1;
                        Laya.timer.clear(this, this.animate);
                        this._viewUI.ji_img.scaleX = -1;
                        this._viewUI.ji_img.visible = true;
                        Laya.timer.frameLoop(1, this, this.animate2);
                    }
                };
                DisappearMessageTipsMediator.prototype.animate2 = function (e) {
                    this._viewUI.ji_img.scaleX += 0.1;
                    if (this._viewUI.ji_img.scaleX > 1) {
                        this._viewUI.ji_img.scaleX = 1;
                        this._viewUI.sheng_img.visible = false;
                        this._viewUI.ji_img.visible = false;
                        Laya.timer.clear(this, this.animate2);
                    }
                };
                // private regestEvent():void
                // {
                //     game.modules.chat.models.ChatProxy.getInstance().on(game.modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS,this,this.onShow);
                // }
                /**
                 * @param promoto 提示信息 @param isshowInlab 是否用Label显示
                 */
                DisappearMessageTipsMediator.prototype.onShowData = function (promoto, isshowInlab) {
                    this.show();
                    if (typeof (isshowInlab) == "undefined") {
                        this.onLoad(promoto);
                    }
                    else if (isshowInlab == true) {
                        var terminalY = 300;
                        this._viewUI.msgTips_img.visible = true;
                        this._viewUI.msgTips1_lab.visible = true;
                        this._viewUI.msgTips_lab.innerHTML = "";
                        this._viewUI.msgTips1_lab.text = promoto;
                        Laya.Tween.to(this._viewUI.msgTips_img, { y: terminalY }, 1500, Laya.Ease.circOut, Laya.Handler.create(this, function () {
                            this._viewUI.msgTips_img.visible = false;
                            this._viewUI.msgTips1_lab.visible = false;
                            this._viewUI.msgTips_img.x = this.px;
                            this._viewUI.msgTips_img.y = this.py;
                        }), null, true);
                    }
                };
                ////////////////
                ///UI
                ////////////////
                DisappearMessageTipsMediator.prototype.hideTips = function () {
                };
                return DisappearMessageTipsMediator;
            }(game.modules.ModuleMediator));
            commonUI.DisappearMessageTipsMediator = DisappearMessageTipsMediator;
        })(commonUI = modules.commonUI || (modules.commonUI = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=DisappearMessageTipsMediator.js.map