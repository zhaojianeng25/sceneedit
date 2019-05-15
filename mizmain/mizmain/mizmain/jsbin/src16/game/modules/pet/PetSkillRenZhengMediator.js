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
*法术认证
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var pet;
        (function (pet) {
            var PetSkillRenZhengMediator = /** @class */ (function (_super) {
                __extends(PetSkillRenZhengMediator, _super);
                function PetSkillRenZhengMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    _this._viewUI = new ui.common.PetSkillRenZhengUI();
                    _this._viewUI.mouseThrough = true;
                    _this.isCenter = true;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this._viewUI.haveyinbi_lab.text = game.modules.bag.models.BagModel.getInstance().sliverIcon + "";
                    _this.skilinfo = new Laya.Dictionary();
                    _this.lastbox = null;
                    return _this;
                }
                PetSkillRenZhengMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                    this.init();
                };
                /**初始化数据*/
                PetSkillRenZhengMediator.prototype.init = function () {
                    this.currentselect = 0;
                    var petskill = PetModel._instance.petskill;
                    var num = 0;
                    var data = [];
                    for (var index = 0; index < petskill.length; index++) {
                        var allskillinfo = PetModel._instance.petSkillupgradeData[petskill[index].skillId];
                        if (allskillinfo.iscancertification == 1) { //已认证
                            var skillcolor = PetModel._instance.petSkillConfigData[petskill[index].skillId];
                            if (num == 0)
                                data.push({ skillicon_img: "common/icon/skill/" + skillcolor.icon + ".png", skillkuang_img: "common/ui/pet/zhuji" + skillcolor.color + ".png", skillname_lab: skillcolor.skillname });
                            else
                                data.push({ skillicon_img: "common/icon/skill/" + skillcolor.icon + ".png", skillkuang_img: "common/ui/pet/zhuji" + skillcolor.color + ".png", skillname_lab: skillcolor.skillname });
                            this.skilinfo.set(num, petskill[index]);
                            num += 1;
                        }
                    }
                    var petbase = PetModel.getInstance().petCPetAttrData[PetModel._instance.petbasedata.id];
                    this._viewUI.cosyinb_lab.text = petbase.certificationcost + "";
                    this._viewUI.petskill_list.array = data;
                    this._viewUI.petskill_list.vScrollBarSkin = "";
                    this._viewUI.petskill_list.repeatY = data.length;
                    this._viewUI.petskill_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.petskill_list.scrollBar.elasticDistance = 50;
                    this._viewUI.petskill_list.renderHandler = new Laya.Handler(this, this.initskill);
                    this._viewUI.close_btn.clickHandler = new Laya.Handler(this, this.hide);
                    var chattext = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11121];
                    this._viewUI.fsrenzheng_btn.label = chattext.msg;
                    this._viewUI.fsrenzheng_btn.clickHandler = new Laya.Handler(this, this.renzheng);
                    this.rznum = 1;
                };
                /**取消认证*/
                PetSkillRenZhengMediator.prototype.cancaleinit = function () {
                    _super.prototype.show.call(this);
                    this.currentselect = 0;
                    var petskill = PetModel._instance.petskill;
                    var num = 0;
                    var data = [];
                    for (var index = 0; index < petskill.length; index++) {
                        var allskillinfo = PetModel._instance.petSkillupgradeData[petskill[index].skillId];
                        if (allskillinfo.iscancertification != 1) { //是否法术认证
                            var skillcolor = PetModel._instance.petSkillConfigData[petskill[index].skillId];
                            if (num == 0) //可取消认证的技能数量
                                data.push({ skillicon_img: "common/icon/skill/" + skillcolor.icon + ".png", skillkuang_img: "common/ui/pet/zhuji" + skillcolor.color + ".png", skillname_lab: skillcolor.skillname });
                            else
                                data.push({ skillicon_img: "common/icon/skill/" + skillcolor.icon + ".png", skillkuang_img: "common/ui/pet/zhuji" + skillcolor.color + ".png", skillname_lab: skillcolor.skillname });
                            this.skilinfo.set(num, petskill[index]);
                            num += 1;
                        }
                    }
                    var petbase = PetModel.getInstance().petCPetAttrData[PetModel._instance.petbasedata.id];
                    this._viewUI.cosyinb_lab.text = petbase.cancelcertificationcost + "";
                    this._viewUI.petskill_list.array = data;
                    this._viewUI.petskill_list.vScrollBarSkin = "";
                    this._viewUI.petskill_list.repeatY = data.length;
                    this._viewUI.petskill_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.petskill_list.scrollBar.elasticDistance = 50;
                    this._viewUI.petskill_list.renderHandler = new Laya.Handler(this, this.initskill);
                    this._viewUI.close_btn.clickHandler = new Laya.Handler(this, this.hide);
                    var chattext = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11120];
                    this._viewUI.fsrenzheng_btn.label = chattext.msg;
                    this._viewUI.fsrenzheng_btn.clickHandler = new Laya.Handler(this, this.renzheng);
                    this.rznum = 0;
                };
                /**技能按钮响应事件*/
                PetSkillRenZhengMediator.prototype.initskill = function (cell, index) {
                    var btn = cell.getChildByName("selectskill_btn");
                    btn.on(LEvent.MOUSE_DOWN, this, this.selectskill, [cell, index]);
                    var img = cell.getChildByName("skillicon_img");
                    img.on(LEvent.MOUSE_DOWN, this, this.skillstips, [index]);
                    if (index == this.currentselect) { //是否为当前选择
                        this.selectskill(cell, index);
                    }
                };
                /**技能提示*/
                PetSkillRenZhengMediator.prototype.skillstips = function (index) {
                    if (index < this.skilinfo.keys.length) { //是否有效技能栏
                        var skill_1 = this.skilinfo.get(index);
                        var parame = new Dictionary();
                        parame.set("itemId", skill_1.skillId);
                        this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.SKILL, parame);
                    }
                };
                /**法术认证选择*/
                PetSkillRenZhengMediator.prototype.selectskill = function (cell, index) {
                    if (this.lastbox == cell) //是否选择同样的技能
                        return;
                    if (this.lastbox) { //是否多次选择
                        var lastbtn = this.lastbox.getChildByName("selectskill_btn");
                        lastbtn.selected = false;
                    }
                    var btn = cell.getChildByName("selectskill_btn");
                    btn.selected = true;
                    this.lastbox = cell;
                    this.currentselect = index;
                };
                PetSkillRenZhengMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                PetSkillRenZhengMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                /**确定认证*/
                PetSkillRenZhengMediator.prototype.renzheng = function () {
                    if (PetModel._instance.petbasedata.kind == 4) //神兽不能认证
                        return;
                    var petskill = this.skilinfo.get(this.currentselect);
                    if (petskill) { //认证技能信息
                        this.rzqueding = new game.modules.pet.PetSkillRenZhengQueRenMediator(this._app);
                        this.rzqueding.init(petskill.skillId, this.rznum);
                        _super.prototype.hide.call(this);
                    }
                };
                return PetSkillRenZhengMediator;
            }(game.modules.UiMediator));
            pet.PetSkillRenZhengMediator = PetSkillRenZhengMediator;
        })(pet = modules.pet || (modules.pet = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=PetSkillRenZhengMediator.js.map