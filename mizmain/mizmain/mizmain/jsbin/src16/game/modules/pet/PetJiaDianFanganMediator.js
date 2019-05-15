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
* 宠物加点方案
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var pet;
        (function (pet) {
            var PetJiaDianFanganMediator = /** @class */ (function (_super) {
                __extends(PetJiaDianFanganMediator, _super);
                function PetJiaDianFanganMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    _this._viewUI = new ui.common.PetJiaDianFanganUI();
                    _this._viewUI.mouseThrough = true;
                    _this.isCenter = true;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this.model = new ModelsCreate();
                    _this.scene2DPanel = new TestRole2dPanel();
                    _this._viewUI.petbk_img.addChild(_this.scene2DPanel);
                    return _this;
                }
                PetJiaDianFanganMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                    this.init();
                };
                /**创建模型*/
                PetJiaDianFanganMediator.prototype.modelcreate = function (modelid) {
                    if (this.model.role3d) {
                        this.scene2DPanel.removeSceneChar(this.model.role3d);
                    }
                    this.model.role3d = new YxChar3d();
                    this.model.role3d.setRoleUrl(getRoleUrl(modelid + ""));
                    this.model.role3d.set2dPos((this._viewUI.petbk_img.x + this._viewUI.petbk_img.width / 2 + this._viewUI.bk_img.x) * this._viewUI.globalScaleX, (this._viewUI.petbk_img.y + this._viewUI.petbk_img.height / 4 * 3 + this._viewUI.bk_img.y) * this._viewUI.globalScaleY); //坐标
                    this.model.role3d.scale = 1;
                    this.model.role3d.rotationY = 135;
                    this.model.role3d.rotationX = 0;
                    this.scene2DPanel.addSceneChar(this.model.role3d);
                };
                /**初始化宠物数据*/
                PetJiaDianFanganMediator.prototype.init = function () {
                    this.scene2DPanel.ape.x = this._viewUI.x * this._viewUI.globalScaleX;
                    this.scene2DPanel.ape.y = this._viewUI.y * this._viewUI.globalScaleY;
                    var petdata = PetModel.getInstance().petbasedata;
                    var petCPetAttrBaseVo = PetModel.getInstance().petCPetAttrData[petdata.id];
                    this.modelcreate(petCPetAttrBaseVo.modelid);
                    this._viewUI.py_lab.changeText(petdata.autoaddcons + "");
                    this._viewUI.iq_lab.changeText(petdata.autoaddiq + "");
                    this._viewUI.str_lab.changeText(petdata.autoaddstr + "");
                    this._viewUI.endu_lab.changeText(petdata.autoaddendu + "");
                    this._viewUI.speed_lab.changeText(petdata.autoaddagi + "");
                    var chattext = game.modules.tips.models.TipsModel.getInstance().cstringResConfigData[11828];
                    this._viewUI.petlevel_lab.changeText(chattext.msg + petdata.level);
                    this.initaddbtn();
                    this.initreducebtn();
                    this.click();
                };
                /**按钮响应事件*/
                PetJiaDianFanganMediator.prototype.click = function () {
                    this._viewUI.close_btn.clickHandler = new Laya.Handler(this, this.hide);
                    this._viewUI.tpyadd_btn.clickHandler = new Laya.Handler(this, this.addpypoint);
                    this._viewUI.tiqadd_btn.clickHandler = new Laya.Handler(this, this.addiqpoint);
                    this._viewUI.tenduadd_btn.clickHandler = new Laya.Handler(this, this.addendupoint);
                    this._viewUI.tstradd_btn.clickHandler = new Laya.Handler(this, this.addstrpoint);
                    this._viewUI.tspeedadd_btn.clickHandler = new Laya.Handler(this, this.addspeedpoint);
                    this._viewUI.tpyreduce_btn.clickHandler = new Laya.Handler(this, this.reducepypoint);
                    this._viewUI.tiqreduce_btn.clickHandler = new Laya.Handler(this, this.reduceiqpoint);
                    this._viewUI.tendureduce_btn.clickHandler = new Laya.Handler(this, this.reduceendupoint);
                    this._viewUI.tstrreduce_btn.clickHandler = new Laya.Handler(this, this.reducestrpoint);
                    this._viewUI.tspeedreduce_btn.clickHandler = new Laya.Handler(this, this.reducespeedpoint);
                };
                /**体质加点*/
                PetJiaDianFanganMediator.prototype.addpypoint = function () {
                    this._viewUI.py_lab.changeText(parseInt(this._viewUI.py_lab.text) + 1 + "");
                    this.initaddbtn();
                    this.initreducebtn();
                };
                /**智力加点*/
                PetJiaDianFanganMediator.prototype.addiqpoint = function () {
                    this._viewUI.iq_lab.changeText(parseInt(this._viewUI.iq_lab.text) + 1 + "");
                    this.initaddbtn();
                    this.initreducebtn();
                };
                /**耐力加点*/
                PetJiaDianFanganMediator.prototype.addendupoint = function () {
                    this._viewUI.endu_lab.changeText(parseInt(this._viewUI.endu_lab.text) + 1 + "");
                    this.initaddbtn();
                    this.initreducebtn();
                };
                /**力量加点*/
                PetJiaDianFanganMediator.prototype.addstrpoint = function () {
                    this._viewUI.str_lab.changeText(parseInt(this._viewUI.str_lab.text) + 1 + "");
                    this.initaddbtn();
                    this.initreducebtn();
                };
                /**速度加点*/
                PetJiaDianFanganMediator.prototype.addspeedpoint = function () {
                    this._viewUI.speed_lab.changeText(parseInt(this._viewUI.speed_lab.text) + 1 + "");
                    this.initaddbtn();
                    this.initreducebtn();
                };
                /**体质减少*/
                PetJiaDianFanganMediator.prototype.reducepypoint = function () {
                    this._viewUI.py_lab.changeText(parseInt(this._viewUI.py_lab.text) - 1 + "");
                    this.initaddbtn();
                    this.initreducebtn();
                };
                /**智力减少*/
                PetJiaDianFanganMediator.prototype.reduceiqpoint = function () {
                    this._viewUI.iq_lab.changeText(parseInt(this._viewUI.iq_lab.text) - 1 + "");
                    this.initaddbtn();
                    this.initreducebtn();
                };
                /**耐力减少*/
                PetJiaDianFanganMediator.prototype.reduceendupoint = function () {
                    this._viewUI.endu_lab.changeText(parseInt(this._viewUI.endu_lab.text) - 1 + "");
                    this.initaddbtn();
                    this.initreducebtn();
                };
                /**力量减少*/
                PetJiaDianFanganMediator.prototype.reducestrpoint = function () {
                    this._viewUI.str_lab.changeText(parseInt(this._viewUI.str_lab.text) - 1 + "");
                    this.initaddbtn();
                    this.initreducebtn();
                };
                /**速度减少*/
                PetJiaDianFanganMediator.prototype.reducespeedpoint = function () {
                    this._viewUI.speed_lab.changeText(parseInt(this._viewUI.speed_lab.text) - 1 + "");
                    this.initaddbtn();
                    this.initreducebtn();
                };
                /**刷新可加点数值*/
                PetJiaDianFanganMediator.prototype.initaddbtn = function () {
                    var py = parseInt(this._viewUI.py_lab.text);
                    var iq = parseInt(this._viewUI.iq_lab.text);
                    var str = parseInt(this._viewUI.str_lab.text);
                    var endu = parseInt(this._viewUI.endu_lab.text);
                    var speed = parseInt(this._viewUI.speed_lab.text);
                    if (py + iq + str + endu + speed < 5) { //加点方案值最多为5
                        this._viewUI.tpyadd_btn.visible = true;
                        this._viewUI.tiqadd_btn.visible = true;
                        this._viewUI.tstradd_btn.visible = true;
                        this._viewUI.tenduadd_btn.visible = true;
                        this._viewUI.tspeedadd_btn.visible = true;
                        this._viewUI.fpyadd_btn.visible = false;
                        this._viewUI.fiqadd_btn.visible = false;
                        this._viewUI.fstradd_btn.visible = false;
                        this._viewUI.fenduadd_btn.visible = false;
                        this._viewUI.fspeedadd_btn.visible = false;
                    }
                    else {
                        this._viewUI.tpyadd_btn.visible = false;
                        this._viewUI.tiqadd_btn.visible = false;
                        this._viewUI.tstradd_btn.visible = false;
                        this._viewUI.tenduadd_btn.visible = false;
                        this._viewUI.tspeedadd_btn.visible = false;
                        this._viewUI.fpyadd_btn.visible = true;
                        this._viewUI.fiqadd_btn.visible = true;
                        this._viewUI.fstradd_btn.visible = true;
                        this._viewUI.fenduadd_btn.visible = true;
                        this._viewUI.fspeedadd_btn.visible = true;
                    }
                };
                /**刷新可减少数值的按钮*/
                PetJiaDianFanganMediator.prototype.initreducebtn = function () {
                    //判断是否有值
                    if (this._viewUI.py_lab.text != "0") { //体质
                        this._viewUI.tpyreduce_btn.visible = true;
                        this._viewUI.fpyreduce_btn.visible = false;
                    }
                    else {
                        this._viewUI.tpyreduce_btn.visible = false;
                        this._viewUI.fpyreduce_btn.visible = true;
                    }
                    if (this._viewUI.iq_lab.text != "0") { //智力
                        this._viewUI.tiqreduce_btn.visible = true;
                        this._viewUI.fiqreduce_btn.visible = false;
                    }
                    else {
                        this._viewUI.tiqreduce_btn.visible = false;
                        this._viewUI.fiqreduce_btn.visible = true;
                    }
                    if (this._viewUI.str_lab.text != "0") { //力量
                        this._viewUI.tstrreduce_btn.visible = true;
                        this._viewUI.fstrreduce_btn.visible = false;
                    }
                    else {
                        this._viewUI.tstrreduce_btn.visible = false;
                        this._viewUI.fstrreduce_btn.visible = true;
                    }
                    if (this._viewUI.endu_lab.text != "0") { //耐力
                        this._viewUI.tendureduce_btn.visible = true;
                        this._viewUI.fendureduce_btn.visible = false;
                    }
                    else {
                        this._viewUI.tendureduce_btn.visible = false;
                        this._viewUI.fendureduce_btn.visible = true;
                    }
                    if (this._viewUI.speed_lab.text != "0") { //敏捷
                        this._viewUI.tspeedreduce_btn.visible = true;
                        this._viewUI.fspeedreduce_btn.visible = false;
                    }
                    else {
                        this._viewUI.tspeedreduce_btn.visible = false;
                        this._viewUI.fspeedreduce_btn.visible = true;
                    }
                };
                PetJiaDianFanganMediator.prototype.hide = function () {
                    var petdata = PetModel.getInstance().petbasedata;
                    if (petdata.autoaddcons != parseInt(this._viewUI.py_lab.text) || petdata.autoaddiq != parseInt(this._viewUI.iq_lab.text) || petdata.autoaddstr != parseInt(this._viewUI.str_lab.text)
                        || petdata.autoaddendu != parseInt(this._viewUI.endu_lab.text) || petdata.autoaddagi != parseInt(this._viewUI.speed_lab.text)) {
                        var param = [this._viewUI.py_lab.text, this._viewUI.iq_lab.text, this._viewUI.str_lab.text, this._viewUI.endu_lab.text, this._viewUI.speed_lab.text];
                        var str = game.modules.mainhud.models.HudModel.getInstance().promptAssembleBack(150108, param);
                        var _tips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                        _tips.onShow(str);
                    }
                    PetModel.getInstance().petbasedata.autoaddcons = parseInt(this._viewUI.py_lab.text);
                    PetModel.getInstance().petbasedata.autoaddiq = parseInt(this._viewUI.iq_lab.text);
                    PetModel.getInstance().petbasedata.autoaddstr = parseInt(this._viewUI.str_lab.text);
                    PetModel.getInstance().petbasedata.autoaddendu = parseInt(this._viewUI.endu_lab.text);
                    PetModel.getInstance().petbasedata.autoaddagi = parseInt(this._viewUI.speed_lab.text);
                    PetModel.getInstance().pets.set(PetModel.getInstance().petbasedata.id, PetModel.getInstance().petbasedata);
                    RequesterProtocols._instance.c2s_pet_setautoaddpoint(PetModel._instance.petbasedata.key, PetModel._instance.petbasedata.autoaddstr, PetModel._instance.petbasedata.autoaddiq, PetModel._instance.petbasedata.autoaddcons, PetModel._instance.petbasedata.autoaddendu, PetModel._instance.petbasedata.autoaddagi);
                    _super.prototype.hide.call(this);
                };
                PetJiaDianFanganMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return PetJiaDianFanganMediator;
            }(game.modules.UiMediator));
            pet.PetJiaDianFanganMediator = PetJiaDianFanganMediator;
        })(pet = modules.pet || (modules.pet = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=PetJiaDianFanganMediator.js.map