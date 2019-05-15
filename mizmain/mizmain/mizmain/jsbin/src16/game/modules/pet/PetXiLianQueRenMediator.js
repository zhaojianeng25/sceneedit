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
        var pet;
        (function (pet) {
            /*** 宠物洗练确认 */
            var PetXiLianQueRenMediator = /** @class */ (function (_super) {
                __extends(PetXiLianQueRenMediator, _super);
                function PetXiLianQueRenMediator(uiLayaer) {
                    var _this = _super.call(this, uiLayaer) || this;
                    _this._viewUI = new ui.common.PetXiLianQueRenUI();
                    _this._viewUI.mouseThrough = true;
                    _this.isCenter = false;
                    return _this;
                }
                PetXiLianQueRenMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                };
                /**初始化数据*/
                PetXiLianQueRenMediator.prototype.init = function (textid, parame) {
                    this.show();
                    this._viewUI.queding_btn.on(LEvent.MOUSE_DOWN, this, this.queren);
                    this._viewUI.quxiao_btn.on(LEvent.MOUSE_DOWN, this, this.quxiao);
                    if (textid == 11532) { //是否为满技能洗练 11532满技能提示
                        var chattext = game.modules.tips.models.TipsModel._instance.cstringResConfigData[textid];
                        //let text:CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11401]
                        var petdata = PetModel._instance.petbasedata;
                        var pets = PetModel._instance.petCPetAttrData[petdata.id];
                        // if(petdata.kind==5 || (pets.unusualid==1 && petdata.kind == 4)){//变异的
                        // 	this._viewUI.text1_html.innerHTML = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(chattext.msg,petdata.name,11)
                        // }
                        // else{
                        // 	this._viewUI.text1_html.innerHTML = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(chattext.msg,text.msg+petdata.name,11)
                        // }
                        this._viewUI.text1_html.innerHTML = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(chattext.msg, petdata.name, 11);
                        this._viewUI.text_html.visible = false;
                        this._viewUI.text1_html.visible = true;
                        this._viewUI.skill_list.visible = true;
                        var petCPetAttrBaseVo = PetModel.getInstance().petCPetAttrData[PetModel._instance.petbasedata.id];
                        //所有技能ID
                        var data = [];
                        for (var index = 0; index < petCPetAttrBaseVo.skillid.length; index++) {
                            var petskill = PetModel.getInstance().petSkillConfigData[petCPetAttrBaseVo.skillid[index]];
                            data.push({ skill_img: "common/icon/skill/" + petskill.icon + ".png" });
                        }
                        this._viewUI.skill_list.array = data;
                        this._viewUI.skill_list.repeatX = data.length;
                        this._viewUI.skill_list.renderHandler = new Laya.Handler(this, this.initskill);
                    }
                    else {
                        this._viewUI.text_html.visible = true;
                        this._viewUI.text1_html.visible = false;
                        this._viewUI.skill_list.visible = false;
                        var chattext = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[textid];
                        this._viewUI.text_html.innerHTML = chattext.msg;
                    }
                };
                /**初始化技能响应事件*/
                PetXiLianQueRenMediator.prototype.initskill = function (cell, index) {
                    var img = cell.getChildByName("skill_img");
                    img.on(LEvent.MOUSE_DOWN, this, this.skilltips, [index]);
                };
                /**技能tips*/
                PetXiLianQueRenMediator.prototype.skilltips = function (index) {
                    var petdata = PetModel._instance.petbasedata;
                    var pets = PetModel._instance.petCPetAttrData[petdata.id];
                    var parame = new Dictionary();
                    parame.set("itemId", pets.skillid[index]);
                    this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.SKILL, parame);
                };
                PetXiLianQueRenMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                PetXiLianQueRenMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                /**取消洗练*/
                PetXiLianQueRenMediator.prototype.quxiao = function () {
                    game.modules.pet.models.PetProxy.getInstance().event(game.modules.pet.models.CANCEL);
                    this.hide();
                };
                /**确定洗练*/
                PetXiLianQueRenMediator.prototype.queren = function () {
                    game.modules.pet.models.PetProxy.getInstance().event(game.modules.pet.models.QUEDING);
                    this.hide();
                };
                return PetXiLianQueRenMediator;
            }(game.modules.UiMediator));
            pet.PetXiLianQueRenMediator = PetXiLianQueRenMediator;
        })(pet = modules.pet || (modules.pet = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=PetXiLianQueRenMediator.js.map