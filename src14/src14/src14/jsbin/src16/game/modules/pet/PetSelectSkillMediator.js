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
* 选择技能书
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var pet;
        (function (pet) {
            var PetSelectSkillMediator = /** @class */ (function (_super) {
                __extends(PetSelectSkillMediator, _super);
                function PetSelectSkillMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    _this._viewUI = new ui.common.PetSelectSkillUI();
                    _this._viewUI.mouseThrough = true;
                    _this.isCenter = true;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    pet.models.PetProxy.getInstance().on(pet.models.REFRESH_EVENT, _this, _this.init);
                    return _this;
                }
                PetSelectSkillMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                    this.init();
                };
                /**初始化可用技能技能书*/
                PetSelectSkillMediator.prototype.init = function () {
                    this.lastbox = null;
                    var data = [];
                    this.itemid = [];
                    var bag = BagModel.getInstance().bagMap[1]; //获取背包中技能书
                    var petSkillConfigData = PetModel.getInstance().petSkillConfigData;
                    for (var id = 0; id < bag.items.length; id++) {
                        var item = bag.items[id];
                        // let skillbase: PetItemEffectBaseVo = BagModel.getInstance().petItemEffectData as PetItemEffectBaseVo;
                        for (var skillid in BagModel.getInstance().petItemEffectData) {
                            if (item.id == parseInt(skillid) && item.id >= 109008) { //道具ID范围且是否拥有该道具
                                this.itemid.push(item.id);
                                data.push({ skillname_lab: petSkillConfigData[BagModel.getInstance().petItemEffectData[skillid].petskillid].skillname, skillicon_img: "common/icon/item/20139.png" });
                                break;
                            }
                        }
                    }
                    this._viewUI.skill_list.array = data;
                    this._viewUI.skill_list.vScrollBarSkin = "";
                    this._viewUI.skill_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.skill_list.scrollBar.elasticDistance = 50;
                    this._viewUI.skill_list.renderHandler = new Laya.Handler(this, this.initskillbook);
                    this._viewUI.close_btn.clickHandler = new Laya.Handler(this, this.hide);
                };
                /**初始化技能列表响应事件*/
                PetSelectSkillMediator.prototype.initskillbook = function (cell, index) {
                    var btn = cell.getChildByName("selectskill_btn");
                    var color = PetModel.getInstance().petSkillConfigData[BagModel.getInstance().petItemEffectData[this.itemid[index]].petskillid].color;
                    var skillname_lab = cell.getChildByName("skillname_lab");
                    this.SkillLabColor(color, skillname_lab);
                    btn.on(LEvent.MOUSE_DOWN, this, this.selectskillbook, [cell, index]);
                    var skill = cell.getChildByName("skillicon_img");
                    skill.on(LEvent.MOUSE_DOWN, this, this.skillstips, [index]);
                };
                /** 更改技能名称颜色
                 * @param color 颜色
                 * @param name 技能名称ui
                */
                PetSelectSkillMediator.prototype.SkillLabColor = function (color, name) {
                    switch (color) {
                        case 1:
                            name.color = "#06cc11";
                            break;
                        case 2:
                            name.color = "#00b1ff";
                            break;
                        case 3:
                            name.color = "#ff46f0";
                            break;
                        case 4:
                            name.color = "#ffa500";
                            break;
                        default:
                            name.color = "#06cc11";
                            break;
                    }
                };
                /**技能书tips*/
                PetSelectSkillMediator.prototype.skillstips = function (index) {
                    if (index < this.itemid.length) { //是否有效tips
                        var parame = new Dictionary();
                        parame.set("itemId", this.itemid[index]);
                        this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.BAG, parame);
                    }
                };
                /**选择技能书*/
                PetSelectSkillMediator.prototype.selectskillbook = function (cell, index) {
                    var num = [];
                    var bag = BagModel.getInstance().bagMap[1]; //获取背包中技能书		
                    if (this.lastbox) { //是否多次选择
                        var lastbtn = this.lastbox.getChildByName("selectskill_btn");
                        lastbtn.selected = false;
                    }
                    var btn = cell.getChildByName("selectskill_btn");
                    btn.selected = true;
                    this.lastbox = cell;
                    for (var id = 0; id < bag.items.length; id++) {
                        var item = bag.items[id];
                        var skillbase = BagModel.getInstance().petItemEffectData[this.itemid[index]];
                        if (item.id == this.itemid[index] && item.id >= 109008) { //是否拥有该道具
                            num[0] = skillbase.petskillid;
                            num[1] = item.key;
                            break;
                        }
                    }
                    pet.models.PetProxy.getInstance().event(pet.models.STUDYPETSELECT_EVENT, [num[0], num[1]]);
                };
                PetSelectSkillMediator.prototype.hide = function () {
                    if (this.lastbox) {
                        var lastbtn = this.lastbox.getChildByName("selectskill_btn");
                        lastbtn.selected = false;
                    }
                    pet.models.PetProxy.getInstance().off(pet.models.REFRESH_EVENT, this, this.init);
                    _super.prototype.hide.call(this);
                };
                PetSelectSkillMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return PetSelectSkillMediator;
            }(game.modules.UiMediator));
            pet.PetSelectSkillMediator = PetSelectSkillMediator;
        })(pet = modules.pet || (modules.pet = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=PetSelectSkillMediator.js.map