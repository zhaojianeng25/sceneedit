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
* 宠物合成结果
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var pet;
        (function (pet) {
            var PetHechongResultMediator = /** @class */ (function (_super) {
                __extends(PetHechongResultMediator, _super);
                function PetHechongResultMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    _this._viewUI = new ui.common.PetHechongResultUI();
                    _this._viewUI.mouseThrough = true;
                    _this.isCenter = true;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this.model = new ModelsCreate();
                    _this.scene2DPanel = new TestRole2dPanel();
                    _this._viewUI.addChild(_this.scene2DPanel);
                    return _this;
                }
                PetHechongResultMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                };
                /**创建模型*/
                PetHechongResultMediator.prototype.modelcreate = function (modelid) {
                    if (this.model.role3d) { //是否已经创建过模型
                        this.scene2DPanel.removeSceneChar(this.model.role3d);
                    }
                    this.model.role3d = new YxChar3d();
                    this.model.role3d.setRoleUrl(getRoleUrl(modelid + ""));
                    this.model.role3d.set2dPos((this._viewUI.petbk_img.x + this._viewUI.pet_img.width / 2 + this._viewUI.pet_img.x) * this._viewUI.globalScaleX, (this._viewUI.petbk_img.y + this._viewUI.pet_img.height / 3 * 2 + this._viewUI.pet_img.y) * this._viewUI.globalScaleY); //坐标
                    this.model.role3d.scale = 1;
                    this.model.role3d.rotationX = 0;
                    this.model.role3d.rotationY = 135;
                    this.scene2DPanel.addSceneChar(this.model.role3d);
                };
                /**初始化合宠宠物信息*/
                PetHechongResultMediator.prototype.init = function (petkey) {
                    _super.prototype.show.call(this);
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.OPEN_EVENT);
                    this.scene2DPanel.ape.x = this._viewUI.x * this._viewUI.globalScaleX;
                    this.scene2DPanel.ape.y = this._viewUI.y * this._viewUI.globalScaleY;
                    var petbasedata = PetModel._instance.pets.get(petkey);
                    if (petbasedata == null)
                        return;
                    var petCPetAttrBaseVo = PetModel.getInstance().petCPetAttrData[petbasedata.id];
                    var shape = LoginModel.getInstance().cnpcShapeInfo[petCPetAttrBaseVo.modelid];
                    this.modelcreate(parseInt(shape.shape));
                    this.petkey = petkey;
                    this._viewUI.gongji_lab.text = petbasedata.attackapt + "";
                    this._viewUI.fangyu_lab.text = petbasedata.defendapt + "";
                    this._viewUI.tili_lab.text = petbasedata.phyforceapt + "";
                    this._viewUI.speed_lab.text = petbasedata.speedapt + "";
                    this._viewUI.fali_lab.text = petbasedata.magicapt + "";
                    this._viewUI.petgrowgrate_lab.text = (petbasedata.growrate / 1000).toFixed(3) + "";
                    this._viewUI.petname_lab.text = petbasedata.name;
                    this._viewUI.petlv_lab.text = PetModel.chineseStr.dengji + petbasedata.level;
                    this._viewUI.petscore_lab.text = PetModel.chineseStr.pingjia + petbasedata.petscore + "";
                    this.skillinfo = [];
                    var petskill = petbasedata.skills;
                    this.skillinfo = petskill;
                    var data = [];
                    if (petskill != null) {
                        for (var index = 0; index < 12; index++) {
                            if (index < petskill.length) {
                                var petskillbase = PetModel._instance.petSkillConfigData[petskill[index].skillId];
                                if (petskillbase.skilltype == 1) { //被动
                                    data.push({ kuang_img: "common/ui/pet/beiji" + petskillbase.color + ".png", petskill_img: "common/icon/skill/" + petskillbase.icon + ".png" });
                                }
                                else {
                                    data.push({ kuang_img: "common/ui/pet/zhuji" + petskillbase.color + ".png", petskill_img: "common/icon/skill/" + petskillbase.icon + ".png" });
                                }
                            }
                            else {
                                data.push({ kuang_img: "common/ui/tongyong/kuang94.png", petskill_img: "" });
                            }
                        }
                    }
                    else {
                        for (var index = 0; index < 12; index++) {
                            data.push({});
                        }
                    }
                    this._viewUI.petskill_list.array = data;
                    this._viewUI.petskill_list.vScrollBarSkin = "";
                    this._viewUI.petskill_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.petskill_list.scrollBar.elasticDistance = 50;
                    this._viewUI.petskill_list.renderHandler = new Laya.Handler(this, this.initskill);
                    this._viewUI.close_btn.clickHandler = new Laya.Handler(this, this.hide);
                    this._viewUI.uiclose_btn.clickHandler = new Laya.Handler(this, this.hide);
                    this._viewUI.chakanxq_btn.clickHandler = new Laya.Handler(this, this.chakanxq);
                };
                /**初始化技能响应事件*/
                PetHechongResultMediator.prototype.initskill = function (cell, index) {
                    var img = cell.getChildByName("petskill_img");
                    img.on(LEvent.MOUSE_DOWN, this, this.skilltips, [index]);
                };
                /**技能tips*/
                PetHechongResultMediator.prototype.skilltips = function (index) {
                    if (index < this.skillinfo.length) {
                        var parame = new Dictionary();
                        parame.set("itemId", this.skillinfo[index].skillId);
                        this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.SKILL, parame);
                    }
                };
                /**查看详情*/
                PetHechongResultMediator.prototype.chakanxq = function () {
                    PetModel.getInstance().currentselect = this.petkey;
                    modules.ModuleManager.show(modules.ModuleNames.PET, this._app);
                    this.hide();
                    game.modules.mainhud.models.HudProxy.getInstance().event(game.modules.mainhud.models.CLOSEVIEW_EVENT);
                };
                PetHechongResultMediator.prototype.hide = function () {
                    this.model.modeldelt();
                    _super.prototype.hide.call(this);
                    //通知主界面关闭黑色蒙版
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.CLOSEVIEW_EVENT);
                };
                PetHechongResultMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return PetHechongResultMediator;
            }(game.modules.UiMediator));
            pet.PetHechongResultMediator = PetHechongResultMediator;
        })(pet = modules.pet || (modules.pet = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=PetHechongResultMediator.js.map