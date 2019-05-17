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
* 属性加点
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var pet;
        (function (pet) {
            var PetAddShuXingdianMediator = /** @class */ (function (_super) {
                __extends(PetAddShuXingdianMediator, _super);
                function PetAddShuXingdianMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    _this._viewUI = new ui.common.PetAddShuXingdianUI();
                    _this._viewUI.mouseThrough = true;
                    _this.isCenter = true;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this.iswash = 0;
                    _this.remind = new game.modules.commonUI.RemindViewMediator(_this._viewUI, _this._app);
                    _this.change = new game.modules.commonUI.ChangeMoneyViewMediator(_this._viewUI, _this._app);
                    _this.initialize();
                    return _this;
                }
                /**初始化 */
                PetAddShuXingdianMediator.prototype.initialize = function () {
                    this.yindaoAni = new Laya.Animation();
                    this.dianImg = new Laya.Image();
                };
                PetAddShuXingdianMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                    this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
                    this._viewUI.jiadianfangan_btn.on(LEvent.MOUSE_DOWN, this, this.jiadianfangan);
                    this._viewUI.tquerenjiadian_btn.on(LEvent.MOUSE_DOWN, this, this.quedingjiadian);
                    this._viewUI.xidian_btn.on(LEvent.MOUSE_DOWN, this, this.resetpoint);
                    this._viewUI.ttizhijia_btn.on(LEvent.MOUSE_DOWN, this, this.consadd);
                    this._viewUI.ttizhijian_btn.on(LEvent.MOUSE_DOWN, this, this.consreduce);
                    this._viewUI.tzhilijia_btn.on(LEvent.MOUSE_DOWN, this, this.iqadd);
                    this._viewUI.tzhilijian_btn.on(LEvent.MOUSE_DOWN, this, this.iqreduce);
                    this._viewUI.tpowerjia_btn.on(LEvent.MOUSE_DOWN, this, this.stradd);
                    this._viewUI.tpowerjian_btn.on(LEvent.MOUSE_DOWN, this, this.strreduce);
                    this._viewUI.tnailijia_btn.on(LEvent.MOUSE_DOWN, this, this.enduadd);
                    this._viewUI.tnailijian_btn.on(LEvent.MOUSE_DOWN, this, this.endureduce);
                    this._viewUI.tminjiejia_btn.on(LEvent.MOUSE_DOWN, this, this.speedadd);
                    this._viewUI.tminjiejian_btn.on(LEvent.MOUSE_DOWN, this, this.speedreduce);
                    this.cons = 0;
                    this.iq = 0;
                    this.str = 0;
                    this.endu = 0;
                    this.speed = 0;
                    this.init();
                    pet.models.PetProxy.getInstance().on(pet.models.REFRESHSHOUMING_EVENT, this, this.adddata);
                    //宠物加点引导
                    if (HudModel.getInstance().yindaoId == YinDaoEnum.PET_FANGAN_YINDAO)
                        this.petPointYindao();
                };
                /**宠物加点引导 */
                PetAddShuXingdianMediator.prototype.petPointYindao = function () {
                    var x1 = this._viewUI.jiadianfangan_btn.x + this._viewUI.jiadianfangan_btn.width - 300;
                    var y1 = this._viewUI.jiadianfangan_btn.y - 100;
                    var x2 = x1 + 50;
                    var y2 = y1 + 90;
                    this.setTipPos(x1, y1);
                    this.setAniPos(x2, y2);
                    this.startYindao(YinDaoEnum.PET_YINDAO_TIP);
                    this.yindaoId = YinDaoEnum.PET_FANGAN_YINDAO;
                    HudModel.getInstance().yindaoId = YinDaoEnum.RESET_YINDAO;
                };
                /**引导开始 */
                PetAddShuXingdianMediator.prototype.startYindao = function (tipid) {
                    var tip = HudModel._instance.carroweffectData;
                    this.onAniload();
                    Laya.timer.loop(1000, this, this.moveImg);
                    Laya.timer.loop(5000, this, this.closeAni);
                    this._viewUI.yindaoTip_htm.text = tip[tipid].text;
                    this._viewUI.addChild(this.yindaoAni);
                    this._viewUI.addChild(this.dianImg);
                    this._viewUI.yindaoTip_img.visible = true;
                    this.dianImg.visible = true;
                };
                /**设置引导提示位置 */
                PetAddShuXingdianMediator.prototype.setTipPos = function (x, y) {
                    this._viewUI.yindaoTip_img.x = x;
                    this._viewUI.yindaoTip_img.y = y;
                };
                /**设置动画位置*/
                PetAddShuXingdianMediator.prototype.setAniPos = function (x, y) {
                    this.yindaoAni.x = x;
                    this.yindaoAni.y = y;
                    this.dianImg.x = x;
                    this.dianImg.y = y;
                };
                /**关闭动画 */
                PetAddShuXingdianMediator.prototype.closeAni = function () {
                    this.yindaoAni.clear();
                    Laya.timer.clear(this, this.closeAni);
                    Laya.timer.clear(this, this.moveImg);
                    this._viewUI.yindaoTip_img.visible = false;
                    this.dianImg.visible = false;
                };
                /**播放动画 */
                PetAddShuXingdianMediator.prototype.onAniload = function () {
                    Laya.Animation.createFrames(this.aUrls("", 9), "yindao");
                    this.yindaoAni.play(0, true, "yindao");
                    this.yindaoAni.interval = 112;
                    this.dianImg.skin = "common/ui/mainhud/dian.png";
                    this.yindaoAni.mouseThrough = true;
                    this.dianImg.mouseThrough = true;
                };
                /**移动手指图标 */
                PetAddShuXingdianMediator.prototype.moveImg = function () {
                    if (this.dianImg.y <= this.yindaoAni.y)
                        Laya.Tween.to(this.dianImg, { x: this.yindaoAni.x + 25, y: this.yindaoAni.y + 25 }, 1000, null, Laya.Handler.create(this, function () { }), null, false);
                    else
                        Laya.Tween.to(this.dianImg, { x: this.yindaoAni.x - 5, y: this.yindaoAni.y - 5 }, 1000, null, Laya.Handler.create(this, function () { }), null, false);
                };
                /**特效路径*/
                PetAddShuXingdianMediator.prototype.aUrls = function (aniName, length) {
                    var urls = [];
                    for (var index = 1; index <= length; index++) {
                        urls.push("common/ui/yindao/" + aniName + index + ".png");
                    }
                    return urls;
                };
                /**初始化数据*/
                PetAddShuXingdianMediator.prototype.init = function () {
                    var petinfo = PetModel.getInstance().petbasedata;
                    var basicproper = PetModel.getInstance().petbasicfight;
                    this._viewUI.name_lab.text = petinfo.name;
                    this._viewUI.hp_lab.text = Math.floor(petinfo.maxhp) + "";
                    this._viewUI.mp_lab.text = Math.floor(petinfo.maxmp) + "";
                    this._viewUI.wuliattack_lab.text = Math.floor(petinfo.attack) + "";
                    this._viewUI.wulidefense_lab.text = Math.floor(petinfo.defend) + "";
                    this._viewUI.mgattack_lab.text = Math.floor(petinfo.magicattack) + "";
                    this._viewUI.mgdefense_lab.text = Math.floor(petinfo.magicdef) + "";
                    this._viewUI.speed_lab.text = Math.floor(petinfo.speed) + "";
                    this._viewUI.shengyuqianli_lab.text = petinfo.point + "";
                    this._viewUI.tizhizhi_lab.text = basicproper.cons + "";
                    this._viewUI.zhilizhi_lab.text = basicproper.iq + "";
                    this._viewUI.powerzhi_lab.text = basicproper.str + "";
                    this._viewUI.nailizhi_lab.text = basicproper.endu + "";
                    this._viewUI.minjizhi_lab.text = basicproper.agi + "";
                    //体质 体质 * 成长 * 7 + 体力资质 * 等级 * 0.0028
                    this._viewUI.py_progressbar.value = (PetModel._instance.petinitfight.cons + petinfo.level) / (PetModel._instance.petinitfight.cons + petinfo.level * 6);
                    this._viewUI.cons_img.width = (PetModel._instance.petbasicfight.cons) / (PetModel._instance.petinitfight.cons + petinfo.level * 6) * 129 - (PetModel._instance.petinitfight.cons + petinfo.level) / (PetModel._instance.petinitfight.cons + petinfo.level * 6) * 129 + 0.01;
                    this._viewUI.cons_img.x = (PetModel._instance.petinitfight.cons + petinfo.level) / (PetModel._instance.petinitfight.cons + petinfo.level * 6) * 129 + this._viewUI.py_progressbar.x;
                    this._viewUI.py_slider.max = PetModel._instance.petinitfight.cons + petinfo.level * 6;
                    this._viewUI.py_slider.value = petinfo.bfp.cons;
                    this._viewUI.py_slider.min = 0;
                    var consimg = this._viewUI.py_slider.getChildAt(0);
                    consimg.alpha = 0;
                    var consimg1 = this._viewUI.py_slider.getChildAt(1);
                    consimg1.alpha = 0;
                    this._viewUI.py_slider.changeHandler = new Laya.Handler(this, this.changevalue1);
                    this.currentcons = this._viewUI.py_slider.value;
                    //智力  智力 * 成长 * 5 + 法术资质 * 等级 * 0.0025
                    this._viewUI.iq_progressbar.value = (PetModel._instance.petinitfight.iq + petinfo.level) / (PetModel._instance.petinitfight.iq + petinfo.level * 6);
                    this._viewUI.iq_img.width = (PetModel._instance.petbasicfight.iq) / (PetModel._instance.petinitfight.iq + petinfo.level * 6) * 129 - (PetModel._instance.petinitfight.iq + petinfo.level) / (PetModel._instance.petinitfight.iq + petinfo.level * 6) * 129 + 0.01;
                    this._viewUI.iq_img.x = (PetModel._instance.petinitfight.iq + petinfo.level) / (PetModel._instance.petinitfight.iq + petinfo.level * 6) * 129 + this._viewUI.py_progressbar.x;
                    this._viewUI.iq_slider.max = PetModel._instance.petinitfight.iq + petinfo.level * 6;
                    this._viewUI.iq_slider.value = petinfo.bfp.iq;
                    this._viewUI.iq_slider.min = 0;
                    var iqimg = this._viewUI.iq_slider.getChildAt(0);
                    iqimg.alpha = 0;
                    var iqimg1 = this._viewUI.iq_slider.getChildAt(1);
                    iqimg1.alpha = 0;
                    this._viewUI.iq_slider.changeHandler = new Laya.Handler(this, this.changevalue2);
                    this.currentiq = this._viewUI.iq_slider.value;
                    //力量 力量 * 成长 * 1.6 + 攻击资质 * 等级 * 0.0025
                    this._viewUI.str_progressbar.value = (PetModel._instance.petinitfight.str + petinfo.level) / (PetModel._instance.petinitfight.str + petinfo.level * 6);
                    this._viewUI.str_img.width = (PetModel._instance.petbasicfight.str) / (PetModel._instance.petinitfight.str + petinfo.level * 6) * 129 - (PetModel._instance.petinitfight.str + petinfo.level) / (PetModel._instance.petinitfight.str + petinfo.level * 6) * 129 + 0.01;
                    this._viewUI.str_img.x = (PetModel._instance.petinitfight.str + petinfo.level) / (PetModel._instance.petinitfight.str + petinfo.level * 6) * 129 + this._viewUI.py_progressbar.x;
                    this._viewUI.str_slider.max = PetModel._instance.petinitfight.str + petinfo.level * 6;
                    this._viewUI.str_slider.value = petinfo.bfp.str;
                    this._viewUI.str_slider.min = 0;
                    var strimg = this._viewUI.str_slider.getChildAt(0);
                    strimg.alpha = 0;
                    var strimg1 = this._viewUI.str_slider.getChildAt(1);
                    strimg1.alpha = 0;
                    this._viewUI.str_slider.changeHandler = new Laya.Handler(this, this.changevalue3);
                    this.currentstr = this._viewUI.str_slider.value;
                    //耐力 耐力 * 成长 * 2.4 + 防御资质 * 等级 * 0.0033
                    this._viewUI.endu_progressbar.value = (PetModel._instance.petinitfight.endu + petinfo.level) / (PetModel._instance.petinitfight.endu + petinfo.level * 6);
                    this._viewUI.endu_img.width = (PetModel._instance.petbasicfight.endu) / (PetModel._instance.petinitfight.endu + petinfo.level * 6) * 129 - (PetModel._instance.petinitfight.endu + petinfo.level) / (PetModel._instance.petinitfight.endu + petinfo.level * 6) * 129 + 0.01;
                    this._viewUI.endu_img.x = (PetModel._instance.petinitfight.endu + petinfo.level) / (PetModel._instance.petinitfight.endu + petinfo.level * 6) * 129 + this._viewUI.py_progressbar.x;
                    this._viewUI.endu_slider.max = PetModel._instance.petinitfight.endu + petinfo.level * 6;
                    this._viewUI.endu_slider.value = petinfo.bfp.endu;
                    this._viewUI.endu_slider.min = 0;
                    var enduimg = this._viewUI.endu_slider.getChildAt(0);
                    enduimg.alpha = 0;
                    var enduimg1 = this._viewUI.endu_slider.getChildAt(1);
                    enduimg1.alpha = 0;
                    this._viewUI.endu_slider.changeHandler = new Laya.Handler(this, this.changevalue4);
                    this.currentendu = this._viewUI.endu_slider.value;
                    //速度 敏捷 * 成长 * 1.6 + 速度资质 * 等级 * 0.0021
                    this._viewUI.speed_progressbar.value = (PetModel._instance.petinitfight.agi + petinfo.level) / (PetModel._instance.petinitfight.agi + petinfo.level * 6);
                    this._viewUI.speed_img.width = (PetModel._instance.petbasicfight.agi) / (PetModel._instance.petinitfight.agi + petinfo.level * 6) * 129 - (PetModel._instance.petinitfight.agi + petinfo.level) / (PetModel._instance.petinitfight.agi + petinfo.level * 6) * 129 + 0.01;
                    this._viewUI.speed_img.x = (PetModel._instance.petinitfight.agi + petinfo.level) / (PetModel._instance.petinitfight.agi + petinfo.level * 6) * 129 + this._viewUI.py_progressbar.x;
                    this._viewUI.speed_slider.max = PetModel._instance.petinitfight.agi + petinfo.level * 6;
                    this._viewUI.speed_slider.value = petinfo.bfp.agi;
                    this._viewUI.speed_slider.min = 0;
                    var speedimg = this._viewUI.speed_slider.getChildAt(0);
                    speedimg.alpha = 0;
                    var speedimg1 = this._viewUI.speed_slider.getChildAt(1);
                    speedimg1.alpha = 0;
                    this._viewUI.speed_slider.changeHandler = new Laya.Handler(this, this.changevalue5);
                    this.currentspeed = this._viewUI.speed_slider.value;
                    this._viewUI.tquerenjiadian_btn.visible = false;
                    this._viewUI.fquerenjiadian_btn.visible = true;
                    this._viewUI.addagi_lab.text = "";
                    this._viewUI.addcons_lab.text = "";
                    this._viewUI.addendu_lab.text = "";
                    this._viewUI.addiq_lab.text = "";
                    this._viewUI.addstr_lab.text = "";
                    this._viewUI.addattack_lab.text = "";
                    this._viewUI.addmagic_lab.text = "";
                    this._viewUI.addlift_lab.text = "";
                    this._viewUI.addmagicatt_lab.text = "";
                    this._viewUI.addmagicdef_lab.text = "";
                    this._viewUI.addattdefen_lab.text = "";
                    this._viewUI.addspeed_lab.text = "";
                    if (PetModel._instance.petbasedata.point == 0) {
                        this._viewUI.py_slider.mouseEnabled = false;
                        this._viewUI.iq_slider.mouseEnabled = false;
                        this._viewUI.str_slider.mouseEnabled = false;
                        this._viewUI.endu_slider.mouseEnabled = false;
                        this._viewUI.speed_slider.mouseEnabled = false;
                    }
                    else {
                        this._viewUI.py_slider.mouseEnabled = true;
                        this._viewUI.iq_slider.mouseEnabled = true;
                        this._viewUI.str_slider.mouseEnabled = true;
                        this._viewUI.endu_slider.mouseEnabled = true;
                        this._viewUI.speed_slider.mouseEnabled = true;
                    }
                    this.initaddbutton();
                    this.initreducebutton();
                };
                /**初始化按钮*/
                PetAddShuXingdianMediator.prototype.initaddbutton = function () {
                    if (PetModel._instance.petbasedata.point == 0) { //剩余点数
                        this._viewUI.ttizhijia_btn.visible = false;
                        this._viewUI.tzhilijia_btn.visible = false;
                        this._viewUI.tpowerjia_btn.visible = false;
                        this._viewUI.tnailijia_btn.visible = false;
                        this._viewUI.tminjiejia_btn.visible = false;
                        this._viewUI.ftizhijia_btn.visible = true;
                        this._viewUI.fzhilijia_btn.visible = true;
                        this._viewUI.fpowerjia_btn.visible = true;
                        this._viewUI.fnailijia_btn.visible = true;
                        this._viewUI.fminjiejia_btn.visible = true;
                    }
                    else {
                        this._viewUI.ttizhijia_btn.visible = true;
                        this._viewUI.tzhilijia_btn.visible = true;
                        this._viewUI.tpowerjia_btn.visible = true;
                        this._viewUI.tnailijia_btn.visible = true;
                        this._viewUI.tminjiejia_btn.visible = true;
                        this._viewUI.ftizhijia_btn.visible = false;
                        this._viewUI.fzhilijia_btn.visible = false;
                        this._viewUI.fpowerjia_btn.visible = false;
                        this._viewUI.fnailijia_btn.visible = false;
                        this._viewUI.fminjiejia_btn.visible = false;
                    }
                    if (this.cons + this.iq + this.str + this.endu + this.speed > 0) { //已加过的点数是否大于0
                        this._viewUI.tquerenjiadian_btn.visible = true;
                        this._viewUI.fquerenjiadian_btn.visible = false;
                    }
                    else {
                        this._viewUI.tquerenjiadian_btn.visible = false;
                        this._viewUI.fquerenjiadian_btn.visible = true;
                    }
                };
                /**初始化按钮*/
                PetAddShuXingdianMediator.prototype.initreducebutton = function () {
                    if (this.cons != 0) { //是否有加点
                        this._viewUI.ttizhijian_btn.visible = true;
                        this._viewUI.ftizhijian_btn.visible = false;
                    }
                    else {
                        this._viewUI.ttizhijian_btn.visible = false;
                        this._viewUI.ftizhijian_btn.visible = true;
                    }
                    if (this.iq != 0) { //是否有加点
                        this._viewUI.tzhilijian_btn.visible = true;
                        this._viewUI.fzhilijian_btn.visible = false;
                    }
                    else {
                        this._viewUI.tzhilijian_btn.visible = false;
                        this._viewUI.fzhilijian_btn.visible = true;
                    }
                    if (this.str != 0) { //是否有加点
                        this._viewUI.tpowerjian_btn.visible = true;
                        this._viewUI.fpowerjian_btn.visible = false;
                    }
                    else {
                        this._viewUI.tpowerjian_btn.visible = false;
                        this._viewUI.fpowerjian_btn.visible = true;
                    }
                    if (this.endu != 0) { //是否有加点
                        this._viewUI.tnailijian_btn.visible = true;
                        this._viewUI.fnailijian_btn.visible = false;
                    }
                    else {
                        this._viewUI.tnailijian_btn.visible = false;
                        this._viewUI.fnailijian_btn.visible = true;
                    }
                    if (this.speed != 0) { //是否有加点
                        this._viewUI.tminjiejian_btn.visible = true;
                        this._viewUI.fminjiejian_btn.visible = false;
                    }
                    else {
                        this._viewUI.tminjiejian_btn.visible = false;
                        this._viewUI.fminjiejian_btn.visible = true;
                    }
                    this._viewUI.shengyuqianli_lab.text = PetModel.getInstance().petbasedata.point + "";
                };
                /**体质增加*/
                PetAddShuXingdianMediator.prototype.consadd = function () {
                    this.cons += 1;
                    PetModel._instance.petbasedata.point -= 1;
                    this._viewUI.addcons_lab.text = "+" + this.cons;
                    this.initaddbutton();
                    this.initreducebutton();
                    this.addalldata();
                };
                /**体质减少*/
                PetAddShuXingdianMediator.prototype.consreduce = function () {
                    this.cons -= 1;
                    PetModel._instance.petbasedata.point += 1;
                    if (this.cons != 0) { //加点数值
                        this._viewUI.addcons_lab.text = "+" + this.cons;
                    }
                    else {
                        this._viewUI.addcons_lab.text = "";
                    }
                    this.initaddbutton();
                    this.initreducebutton();
                    this.addalldata();
                };
                /**智力增加*/
                PetAddShuXingdianMediator.prototype.iqadd = function () {
                    this.iq += 1;
                    PetModel._instance.petbasedata.point -= 1;
                    this._viewUI.addiq_lab.text = "+" + this.iq;
                    this.initaddbutton();
                    this.initreducebutton();
                    this.addalldata();
                };
                /**智力减少*/
                PetAddShuXingdianMediator.prototype.iqreduce = function () {
                    this.iq -= 1;
                    PetModel._instance.petbasedata.point += 1;
                    if (this.iq != 0) { //加点数值
                        this._viewUI.addiq_lab.text = "+" + this.iq;
                    }
                    else {
                        this._viewUI.addiq_lab.text = "";
                    }
                    this.initaddbutton();
                    this.initreducebutton();
                    this.addalldata();
                };
                /**力量增加*/
                PetAddShuXingdianMediator.prototype.stradd = function () {
                    this.str += 1;
                    PetModel._instance.petbasedata.point -= 1;
                    this._viewUI.addstr_lab.text = "+" + this.str;
                    this.initaddbutton();
                    this.initreducebutton();
                    this.addalldata();
                };
                /**力量减少*/
                PetAddShuXingdianMediator.prototype.strreduce = function () {
                    this.str -= 1;
                    PetModel._instance.petbasedata.point += 1;
                    if (this.str != 0) { //加点数值
                        this._viewUI.addstr_lab.text = "+" + this.str;
                    }
                    else {
                        this._viewUI.addstr_lab.text = "";
                    }
                    this.initaddbutton();
                    this.initreducebutton();
                    this.addalldata();
                };
                /**耐力增加*/
                PetAddShuXingdianMediator.prototype.enduadd = function () {
                    this.endu += 1;
                    PetModel._instance.petbasedata.point -= 1;
                    this._viewUI.addendu_lab.text = "+" + this.endu;
                    this.initaddbutton();
                    this.initreducebutton();
                    this.addalldata();
                };
                /**耐力减少*/
                PetAddShuXingdianMediator.prototype.endureduce = function () {
                    this.endu -= 1;
                    PetModel._instance.petbasedata.point += 1;
                    if (this.endu != 0) { //加点数值
                        this._viewUI.addendu_lab.text = "+" + this.endu;
                    }
                    else {
                        this._viewUI.addendu_lab.text = "";
                    }
                    this.initaddbutton();
                    this.initreducebutton();
                    this.addalldata();
                };
                /**速度增加*/
                PetAddShuXingdianMediator.prototype.speedadd = function () {
                    this.speed += 1;
                    PetModel._instance.petbasedata.point -= 1;
                    this._viewUI.addagi_lab.text = "+" + this.speed;
                    this.initaddbutton();
                    this.initreducebutton();
                    this.addalldata();
                };
                /**速度减少*/
                PetAddShuXingdianMediator.prototype.speedreduce = function () {
                    this.speed -= 1;
                    PetModel._instance.petbasedata.point += 1;
                    if (this.speed != 0) { //加点数值
                        this._viewUI.addagi_lab.text = "+" + this.speed;
                    }
                    else {
                        this._viewUI.addagi_lab.text = "";
                    }
                    this.initaddbutton();
                    this.initreducebutton();
                    this.addalldata();
                };
                PetAddShuXingdianMediator.prototype.hide = function () {
                    PetModel._instance.petbasedata.point += this.cons + this.iq + this.str + this.endu + this.speed;
                    modules.ModuleManager.show(modules.ModuleNames.PET, this._app);
                    _super.prototype.hide.call(this);
                };
                PetAddShuXingdianMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                /**确定加点*/
                PetAddShuXingdianMediator.prototype.quedingjiadian = function () {
                    //发送加点信息
                    RequesterProtocols._instance.c2s_pet_addpoint(PetModel._instance.petbasedata.key, this.str, this.iq, this.cons, this.endu, this.speed);
                };
                /**加点方案*/
                PetAddShuXingdianMediator.prototype.jiadianfangan = function () {
                    this._jiadian = new pet.PetJiaDianFanganMediator(this._app);
                    this._jiadian.show();
                    if (HudModel.getInstance().yindaoId == YinDaoEnum.PET_FANGAN_YINDAO)
                        this.closeAni();
                };
                /**重置加点*/
                PetAddShuXingdianMediator.prototype.resetpoint = function () {
                    var rest = 0;
                    if (PetModel._instance.petbasedata.point == PetModel._instance.petbasedata.level * 5) { //自己分配的潜力为等级*5
                        this.tips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                        var chattext = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[150109];
                        this.tips.onShow(chattext.msg);
                        return;
                    }
                    if (PetModel._instance.petbasedata.pointresetcount < 2) { //重置加点的次数
                        var chattext = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[150042];
                        var text = game.modules.tips.models.TipsModel._instance.cstringResConfigData[1556];
                        this.remind.onhtmlShow(game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(chattext.msg, PetModel._instance.petbasedata.pointresetcount + 1, 11), text.msg);
                    }
                    else {
                        rest = PetModel._instance.petbasedata.pointresetcount + 1;
                        if (PetModel._instance.petbasedata.pointresetcount + 1 > 5) { //重置加点次数大于5时，所花费的银币不再增加
                            rest = 5;
                        }
                        var petcost = game.modules.pet.models.PetModel.getInstance().petCPetResetPointConfigData[rest];
                        var arr = [];
                        var text = game.modules.tips.models.TipsModel._instance.cstringResConfigData[1556];
                        arr.push(PetModel._instance.petbasedata.pointresetcount + 1);
                        arr.push(petcost.cost);
                        this.remind.onhtmlShow(game.modules.mainhud.models.HudModel.getInstance().promptAssembleBack(150043, arr), text.msg);
                    }
                    this.remind.once(modules.commonUI.RIGHT_BUTTON_EVENT, this, this.reset, [rest]);
                    this.remind.once(modules.commonUI.LEFT_BUTTON_EVENT, this, this.cancel);
                };
                /**拖拉数值改变 体质*/
                PetAddShuXingdianMediator.prototype.changevalue1 = function () {
                    if (this.iswash == 1) { //是否为洗点
                        return;
                    }
                    var petinfo = PetModel.getInstance().petbasedata;
                    if (this._viewUI.py_slider.value < petinfo.bfp.cons) { //是否小于未加点时的值
                        this._viewUI.py_slider.value = petinfo.bfp.cons;
                    }
                    else if (this._viewUI.py_slider.value > PetModel._instance.petbasedata.point + PetModel._instance.petbasicfight.cons + this.cons) { //超过上限
                        this._viewUI.py_slider.value = PetModel._instance.petbasedata.point + PetModel._instance.petbasicfight.cons + this.cons;
                    }
                    this._viewUI.cons_img.width = (this._viewUI.py_slider.value) / (PetModel._instance.petinitfight.cons + petinfo.level * 6) * 129 - (PetModel._instance.petinitfight.cons + petinfo.level) / (PetModel._instance.petinitfight.cons + petinfo.level * 6) * 129 + 0.01;
                    if (this._viewUI.py_slider.value > this.currentcons) { //是否超过当前值
                        PetModel._instance.petbasedata.point -= (this._viewUI.py_slider.value - this.currentcons);
                    }
                    else if (this._viewUI.py_slider.value < this.currentcons) { //是否低于当前值
                        PetModel._instance.petbasedata.point += (this.currentcons - this._viewUI.py_slider.value);
                    }
                    this.currentcons = this._viewUI.py_slider.value;
                    this.cons = this._viewUI.py_slider.value - PetModel._instance.petbasicfight.cons;
                    if (this.cons == 0) { //加点数值
                        this._viewUI.addcons_lab.text = "";
                    }
                    else {
                        this._viewUI.addcons_lab.text = "+" + this.cons;
                    }
                    this.initaddbutton();
                    this.initreducebutton();
                    this.addalldata();
                };
                /**拖拉数值改变 智力*/
                PetAddShuXingdianMediator.prototype.changevalue2 = function () {
                    if (this.iswash == 1) { //是否为洗点
                        return;
                    }
                    var petinfo = PetModel.getInstance().petbasedata;
                    if (this._viewUI.iq_slider.value < petinfo.bfp.iq) { //是否小于未加点时的值
                        this._viewUI.iq_slider.value = petinfo.bfp.iq;
                    }
                    else if (this._viewUI.iq_slider.value > PetModel._instance.petbasedata.point + PetModel._instance.petbasicfight.iq + this.iq) { //超过上限
                        this._viewUI.iq_slider.value = PetModel._instance.petbasedata.point + PetModel._instance.petbasicfight.iq + this.iq;
                    }
                    this._viewUI.iq_img.width = (this._viewUI.iq_slider.value) / (PetModel._instance.petinitfight.iq + petinfo.level * 6) * 129 - (PetModel._instance.petinitfight.iq + petinfo.level) / (PetModel._instance.petinitfight.iq + petinfo.level * 6) * 129 + 0.01;
                    if (this._viewUI.iq_slider.value > this.currentiq) { //是否超过当前值
                        PetModel._instance.petbasedata.point -= (this._viewUI.iq_slider.value - this.currentiq);
                    }
                    else if (this._viewUI.iq_slider.value < this.currentiq) { //是否低于当前值
                        PetModel._instance.petbasedata.point += (this.currentiq - this._viewUI.iq_slider.value);
                    }
                    this.currentiq = this._viewUI.iq_slider.value;
                    this.iq = this._viewUI.iq_slider.value - PetModel._instance.petbasicfight.iq;
                    if (this.iq == 0) { //加点数值
                        this._viewUI.addiq_lab.text = "";
                    }
                    else {
                        this._viewUI.addiq_lab.text = "+" + this.iq;
                    }
                    this.initaddbutton();
                    this.initreducebutton();
                    this.addalldata();
                };
                /**拖拉数值改变 力量*/
                PetAddShuXingdianMediator.prototype.changevalue3 = function () {
                    if (this.iswash == 1) { //是否为洗点
                        return;
                    }
                    var petinfo = PetModel.getInstance().petbasedata;
                    if (this._viewUI.str_slider.value < petinfo.bfp.str) { //是否小于未加点时的值
                        this._viewUI.str_slider.value = petinfo.bfp.str;
                    }
                    else if (this._viewUI.str_slider.value > PetModel._instance.petbasedata.point + PetModel._instance.petbasicfight.str + this.str) { //超过上限
                        this._viewUI.str_slider.value = PetModel._instance.petbasedata.point + PetModel._instance.petbasicfight.str + this.str;
                    }
                    this._viewUI.str_img.width = (this._viewUI.str_slider.value) / (PetModel._instance.petinitfight.str + petinfo.level * 6) * 129 - (PetModel._instance.petinitfight.str + petinfo.level) / (PetModel._instance.petinitfight.str + petinfo.level * 6) * 129 + 0.01;
                    if (this._viewUI.str_slider.value > this.currentstr) { //是否超过当前值
                        PetModel._instance.petbasedata.point -= (this._viewUI.str_slider.value - this.currentstr);
                    }
                    else if (this._viewUI.str_slider.value < this.currentstr) { //是否低于当前值
                        PetModel._instance.petbasedata.point += (this.currentstr - this._viewUI.str_slider.value);
                    }
                    this.currentstr = this._viewUI.str_slider.value;
                    this.str = this._viewUI.str_slider.value - PetModel._instance.petbasicfight.str;
                    if (this.str == 0) { //加点数值
                        this._viewUI.addstr_lab.text = "";
                    }
                    else {
                        this._viewUI.addstr_lab.text = "+" + this.str;
                    }
                    this.initaddbutton();
                    this.initreducebutton();
                    this.addalldata();
                };
                /**拖拉数值改变 耐力*/
                PetAddShuXingdianMediator.prototype.changevalue4 = function () {
                    if (this.iswash == 1) { //是否为洗点
                        return;
                    }
                    var petinfo = PetModel.getInstance().petbasedata;
                    if (this._viewUI.endu_slider.value < petinfo.bfp.endu) { //是否小于未加点时的值
                        this._viewUI.endu_slider.value = petinfo.bfp.endu;
                    }
                    else if (this._viewUI.endu_slider.value > PetModel._instance.petbasedata.point + PetModel._instance.petbasicfight.endu + this.endu) { //超过上限
                        this._viewUI.endu_slider.value = PetModel._instance.petbasedata.point + PetModel._instance.petbasicfight.endu + this.endu;
                    }
                    this._viewUI.endu_img.width = (this._viewUI.endu_slider.value) / (PetModel._instance.petinitfight.endu + petinfo.level * 6) * 129 - (PetModel._instance.petinitfight.endu + petinfo.level) / (PetModel._instance.petinitfight.endu + petinfo.level * 6) * 129 + 0.01;
                    if (this._viewUI.endu_slider.value > this.currentendu) { //是否超过当前值
                        PetModel._instance.petbasedata.point -= (this._viewUI.endu_slider.value - this.currentendu);
                    }
                    else if (this._viewUI.endu_slider.value < this.currentendu) { //是否低于当前值
                        PetModel._instance.petbasedata.point += (this.currentendu - this._viewUI.endu_slider.value);
                    }
                    this.currentendu = this._viewUI.endu_slider.value;
                    this.endu = this._viewUI.endu_slider.value - PetModel._instance.petbasicfight.endu;
                    if (this.endu == 0) { //加点数值
                        this._viewUI.addendu_lab.text = "";
                    }
                    else {
                        this._viewUI.addendu_lab.text = "+" + this.endu;
                    }
                    this.initaddbutton();
                    this.initreducebutton();
                    this.addalldata();
                };
                /**拖拉数值改变 速度*/
                PetAddShuXingdianMediator.prototype.changevalue5 = function () {
                    if (this.iswash == 1) { //是否为洗点
                        return;
                    }
                    var petinfo = PetModel.getInstance().petbasedata;
                    if (this._viewUI.speed_slider.value < petinfo.bfp.agi) { //是否小于未加点时的值
                        this._viewUI.speed_slider.value = petinfo.bfp.agi;
                    }
                    else if (this._viewUI.speed_slider.value > PetModel._instance.petbasedata.point + PetModel._instance.petbasicfight.agi + this.speed) { //超过上限
                        this._viewUI.speed_slider.value = PetModel._instance.petbasedata.point + PetModel._instance.petbasicfight.agi + this.speed;
                    }
                    this._viewUI.speed_img.width = (this._viewUI.speed_slider.value) / (PetModel._instance.petinitfight.agi + petinfo.level * 6) * 129 - (PetModel._instance.petinitfight.agi + petinfo.level) / (PetModel._instance.petinitfight.agi + petinfo.level * 6) * 129 + 0.01;
                    if (this._viewUI.speed_slider.value > this.currentspeed) { //是否超过当前值
                        PetModel._instance.petbasedata.point -= (this._viewUI.speed_slider.value - this.currentspeed);
                    }
                    else if (this._viewUI.speed_slider.value < this.currentspeed) { //是否低于当前值
                        PetModel._instance.petbasedata.point += (this.currentspeed - this._viewUI.speed_slider.value);
                    }
                    this.currentspeed = this._viewUI.speed_slider.value;
                    this.speed = this._viewUI.speed_slider.value - PetModel._instance.petbasicfight.agi;
                    if (this.speed == 0) { //加点数值
                        this._viewUI.addagi_lab.text = "";
                    }
                    else {
                        this._viewUI.addagi_lab.text = "+" + this.speed;
                    }
                    this.initaddbutton();
                    this.initreducebutton();
                    this.addalldata();
                };
                /**重新设置加点方案的tips*/
                PetAddShuXingdianMediator.prototype.refresh = function (e) {
                    this.iswash = 1;
                    this.init();
                    this.tips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                    var petinfo = PetModel.getInstance().petbasedata;
                    var promoto = [];
                    promoto.push(petinfo.autoaddcons);
                    promoto.push(petinfo.autoaddiq);
                    promoto.push(petinfo.autoaddstr);
                    promoto.push(petinfo.autoaddendu);
                    promoto.push(petinfo.autoaddagi);
                    this.tips.onShow(game.modules.mainhud.models.HudModel.getInstance().promptAssembleBack(150108, promoto));
                    this.iswash = 0;
                };
                /**重置加点*/
                PetAddShuXingdianMediator.prototype.adddata = function (e) {
                    this.cons = 0;
                    this.iq = 0;
                    this.str = 0;
                    this.endu = 0;
                    this.speed = 0;
                    this.currentcons = 0;
                    this.currentiq = 0;
                    this.currentstr = 0;
                    this.currentendu = 0;
                    this.currentspeed = 0;
                    this.iswash = 1;
                    this.init();
                    this.iswash = 0;
                };
                /**数据增加引起的数值变化*/
                PetAddShuXingdianMediator.prototype.addalldata = function () {
                    var petbase = PetModel._instance.petbasicfight;
                    var petdata = PetModel._instance.petbasedata;
                    var hp = this.cons * petdata.growrate * 7 / 1000; //(parseInt(((this.cons+petbase.cons)*petdata.growrate*7/1000).toFixed(0))+parseInt((petdata.phyforceapt*petdata.level*0.0028).toFixed(0)))-petdata.maxhp;
                    var mp = this.iq * petdata.growrate * 5 / 1000;
                    var attack = this.str * petdata.growrate * 1.6 / 1000;
                    var magicattack = this.iq * petdata.growrate * 1.3 / 1000;
                    var defence = this.endu * petdata.growrate * 2.4 / 1000;
                    var magicdef = (this.cons * 0.32 + this.iq * 0.8 + this.str * 0.48 + this.endu * 0.16) * petdata.growrate / 1000;
                    var speed = this.speed * petdata.growrate * 1.6 / 1000;
                    if (hp >= 1) { //变化的数值是否大于1
                        this._viewUI.addlift_lab.text = "+" + hp.toFixed(0);
                    }
                    else {
                        this._viewUI.addlift_lab.text = "";
                    }
                    if (mp >= 1) { //变化的数值是否大于1
                        this._viewUI.addmagic_lab.text = "+" + mp.toFixed(0);
                    }
                    else {
                        this._viewUI.addmagic_lab.text = "";
                    }
                    if (attack >= 1) { //变化的数值是否大于1
                        this._viewUI.addattack_lab.text = "+" + attack.toFixed(0);
                    }
                    else {
                        this._viewUI.addattack_lab.text = "";
                    }
                    if (magicattack >= 1) { //变化的数值是否大于1
                        this._viewUI.addmagicatt_lab.text = "+" + magicattack.toFixed(0);
                    }
                    else {
                        this._viewUI.addmagicatt_lab.text = "";
                    }
                    if (defence >= 1) { //变化的数值是否大于1
                        this._viewUI.addattdefen_lab.text = "+" + defence.toFixed(0);
                    }
                    else {
                        this._viewUI.addattdefen_lab.text = "";
                    }
                    if (magicdef >= 1) { //变化的数值是否大于1
                        this._viewUI.addmagicdef_lab.text = "+" + magicdef.toFixed(0);
                    }
                    else {
                        this._viewUI.addmagicdef_lab.text = "";
                    }
                    if (speed >= 1) { //变化的数值是否大于1
                        this._viewUI.addspeed_lab.text = "+" + speed.toFixed(0);
                    }
                    else {
                        this._viewUI.addspeed_lab.text = "";
                    }
                };
                /**重置加点*/
                PetAddShuXingdianMediator.prototype.reset = function (rest) {
                    var petcost = game.modules.pet.models.PetModel.getInstance().petCPetResetPointConfigData[rest];
                    if (petcost && petcost.cost > game.modules.bag.models.BagModel.getInstance().sliverIcon) { //花费的银币是否足够
                        //银币不足，跳到兑换界面
                        var costyuanbao = void 0;
                        var costjinbi = void 0;
                        if (petcost.cost / 10000 <= parseInt((petcost.cost / 10000).toFixed(0))) { //银币元宝比例兑换
                            costyuanbao = parseInt((petcost.cost / 10000).toFixed(0));
                        }
                        else {
                            costyuanbao = parseInt((petcost.cost / 10000).toFixed(0)) + 1;
                        }
                        if (petcost.cost / 100 <= parseInt((petcost.cost / 100).toFixed(0))) { //银币金币比例兑换
                            costjinbi = parseInt((petcost.cost / 100).toFixed(0));
                        }
                        else {
                            costjinbi = parseInt((petcost.cost / 1000).toFixed(0)) + 1;
                        }
                        this.change.onShow(false, costyuanbao, costjinbi);
                    }
                    else {
                        pet.models.PetProxy.getInstance().once(pet.models.REFRESH_EVENT, this, this.refresh);
                        RequesterProtocols._instance.c2s_pet_resetpoint(PetModel._instance.petbasedata.key);
                    }
                };
                PetAddShuXingdianMediator.prototype.cancel = function () {
                    this.remind.off(modules.commonUI.RIGHT_BUTTON_EVENT, this, this.reset);
                };
                return PetAddShuXingdianMediator;
            }(game.modules.UiMediator));
            pet.PetAddShuXingdianMediator = PetAddShuXingdianMediator;
        })(pet = modules.pet || (modules.pet = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=PetAddShuXingdianMediator.js.map