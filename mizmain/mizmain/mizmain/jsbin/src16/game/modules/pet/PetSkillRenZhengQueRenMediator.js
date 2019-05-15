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
* 认证确认
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var pet;
        (function (pet) {
            var PetSkillRenZhengQueRenMediator = /** @class */ (function (_super) {
                __extends(PetSkillRenZhengQueRenMediator, _super);
                function PetSkillRenZhengQueRenMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    _this._viewUI = new ui.common.component.renzhengquerenUI;
                    _this._viewUI.mouseThrough = true;
                    _this.isCenter = true;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this._viewUI.cancel_btn.on(LEvent.MOUSE_DOWN, _this, _this.hide);
                    return _this;
                }
                //**初始化数据*/
                PetSkillRenZhengQueRenMediator.prototype.init = function (skillid, rznumber) {
                    this.show();
                    var petinfo = game.modules.pet.models.PetModel.getInstance().pets.get(PetModel._instance.petbasedata.key);
                    var petdata = game.modules.pet.models.PetModel.getInstance().petCPetAttrData[PetModel._instance.petbasedata.id];
                    var skillinfo = game.modules.pet.models.PetModel.getInstance().petSkillConfigData[skillid];
                    var str = [];
                    str.push(petinfo.name);
                    str.push(petinfo.level);
                    for (var index = 0; index < petinfo.skills.length; index++) {
                        var skillsinfo = petinfo.skills[index];
                        if (skillsinfo.certification == 1) { //是否已经认证 1为认证
                            var skills = game.modules.pet.models.PetModel.getInstance().petSkillConfigData[petinfo.skills[index].skillId];
                            str.push(skills.skillname);
                            break;
                        }
                    }
                    str.push(skillinfo.skillname);
                    if (rznumber == 1) { //1为法术认证 2为取消认证
                        this._viewUI.text_html.innerHTML = game.modules.mainhud.models.HudModel.getInstance().promptAssembleBack(150065, str);
                        this._viewUI.costyinbi_lab.text = petdata.certificationcost + "";
                    }
                    else {
                        this._viewUI.text_html.innerHTML = game.modules.mainhud.models.HudModel.getInstance().promptAssembleBack(150066, str);
                        this._viewUI.costyinbi_lab.text = petdata.cancelcertificationcost + "";
                    }
                    this._viewUI.queding_btn.on(LEvent.MOUSE_DOWN, this, this.renzheng, [skillid, rznumber]);
                };
                /**认证确定*/
                PetSkillRenZhengQueRenMediator.prototype.renzheng = function (skillid, rznumber) {
                    if (parseInt(this._viewUI.costyinbi_lab.text) <= game.modules.bag.models.BagModel.getInstance().sliverIcon) { //认证
                        RequesterProtocols._instance.c2s_pet_skillcertification(PetModel._instance.petbasedata.key, skillid, rznumber);
                    }
                    else { //否则兑换银币
                        this.change = new game.modules.commonUI.ChangeMoneyViewMediator(this._viewUI, this._app);
                        this.change.onShow(false, game.modules.bag.models.BagModel.getInstance().globalIcon, parseInt(this._viewUI.costyinbi_lab.text));
                    }
                    this.hide();
                };
                PetSkillRenZhengQueRenMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                };
                PetSkillRenZhengQueRenMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                PetSkillRenZhengQueRenMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return PetSkillRenZhengQueRenMediator;
            }(game.modules.UiMediator));
            pet.PetSkillRenZhengQueRenMediator = PetSkillRenZhengQueRenMediator;
        })(pet = modules.pet || (modules.pet = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=PetSkillRenZhengQueRenMediator.js.map