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
/** 战斗失败界面
* by ljm
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var commonUI;
        (function (commonUI) {
            var BattleFaildMediator = /** @class */ (function (_super) {
                __extends(BattleFaildMediator, _super);
                function BattleFaildMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    /** 死亡提醒 */
                    _this.deatNote = {};
                    _this._viewUI = new ui.common.LoseUI();
                    _this.isCenter = true;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this._viewUI.mengban_img.on(LEvent.CLICK, _this, _this.hide);
                    _this.deatNote = game.modules.guaji.models.GuaJiModel.getInstance().deatNote;
                    return _this;
                }
                BattleFaildMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                    this.suggestGo();
                };
                BattleFaildMediator.prototype.suggestGo = function () {
                    var levelNum = HudModel.getInstance().levelNum;
                    this.hideAll();
                    var petNum = game.modules.pet.models.PetModel.getInstance().pets.keys.length;
                    if (levelNum >= 10 && levelNum < 14) { //小于等于14
                        this.setBtnAttr(this._viewUI.suggesst1_btn, this._viewUI.suggesst1_lab, "common/ui/mainhud/main_active.png", modules.ModuleNames.ACTIVITY, 1);
                        this.setBtnAttr(this._viewUI.suggesst2_btn, this._viewUI.suggesst2_lab, "common/ui/mainhud/main_team.png", modules.ModuleNames.Team, 4);
                        if (petNum >= 1) {
                            this.setBtnAttr(this._viewUI.suggesst3_btn, this._viewUI.suggesst3_lab, "common/ui/mainhud/battle_call.png", modules.ModuleNames.PET, 5);
                        }
                    }
                    else if (levelNum >= 14 && levelNum <= 31) {
                        if (petNum >= 1) {
                            this.setBtnAttr(this._viewUI.suggesst1_btn, this._viewUI.suggesst1_lab, "common/ui/mainhud/main_skill.png", modules.ModuleNames.SKILL, 2, 1);
                            this.setBtnAttr(this._viewUI.suggesst2_btn, this._viewUI.suggesst2_lab, "common/ui/mainhud/main_helper.png", modules.ModuleNames.HUOBAN, 3);
                            this.setBtnAttr(this._viewUI.suggesst3_btn, this._viewUI.suggesst3_lab, "common/ui/mainhud/main_team.png", modules.ModuleNames.Team, 4);
                            this.setBtnAttr(this._viewUI.suggesst4_btn, this._viewUI.suggesst4_lab, "common/ui/mainhud/battle_call.png", modules.ModuleNames.PET, 5);
                        }
                        else {
                            this.setBtnAttr(this._viewUI.suggesst2_btn, this._viewUI.suggesst2_lab, "common/ui/mainhud/main_skill.png", modules.ModuleNames.SKILL, 2, 1);
                            this.setBtnAttr(this._viewUI.suggesst3_btn, this._viewUI.suggesst3_lab, "common/ui/mainhud/main_helper.png", modules.ModuleNames.HUOBAN, 3);
                            this.setBtnAttr(this._viewUI.suggesst4_btn, this._viewUI.suggesst4_lab, "common/ui/mainhud/main_team.png", modules.ModuleNames.Team, 4);
                            this.setBtnAttr(this._viewUI.suggesst1_btn, this._viewUI.suggesst1_lab, "common/ui/mainhud/main_active.png", modules.ModuleNames.ACTIVITY, 1);
                        }
                    }
                    else if (levelNum == 32) {
                        if (petNum >= 1) {
                            this.setBtnAttr(this._viewUI.suggesst3_btn, this._viewUI.suggesst3_lab, "common/ui/mainhud/battle_call.png", modules.ModuleNames.PET, 5);
                            this.setBtnAttr(this._viewUI.suggesst1_btn, this._viewUI.suggesst1_lab, "common/ui/mainhud/main_helper.png", modules.ModuleNames.HUOBAN, 3);
                            this.setBtnAttr(this._viewUI.suggesst2_btn, this._viewUI.suggesst2_lab, "common/ui/mainhud/main_team.png", modules.ModuleNames.Team, 4);
                            this.setBtnAttr(this._viewUI.suggesst4_btn, this._viewUI.suggesst4_lab, "common/ui/mainhud/main_streng1.png", modules.ModuleNames.STRENG_THENING, 6, 0);
                        }
                        else {
                            this.setBtnAttr(this._viewUI.suggesst1_btn, this._viewUI.suggesst1_lab, "common/ui/mainhud/main_skill.png", modules.ModuleNames.SKILL, 2, 1);
                            this.setBtnAttr(this._viewUI.suggesst2_btn, this._viewUI.suggesst2_lab, "common/ui/mainhud/main_helper.png", modules.ModuleNames.HUOBAN, 3);
                            this.setBtnAttr(this._viewUI.suggesst3_btn, this._viewUI.suggesst3_lab, "common/ui/mainhud/main_team.png", modules.ModuleNames.Team, 4);
                            this.setBtnAttr(this._viewUI.suggesst4_btn, this._viewUI.suggesst4_lab, "common/ui/mainhud/main_streng1.png", modules.ModuleNames.STRENG_THENING, 6, 0);
                        }
                    }
                    else if (levelNum >= 33 && levelNum < 40) {
                        if (petNum >= 1) {
                            this.setBtnAttr(this._viewUI.suggesst2_btn, this._viewUI.suggesst2_lab, "common/ui/mainhud/battle_call.png", modules.ModuleNames.PET, 5);
                            this.setBtnAttr(this._viewUI.suggesst3_btn, this._viewUI.suggesst3_lab, "common/ui/mainhud/main_streng1.png", modules.ModuleNames.STRENG_THENING, 6, 0);
                            this.setBtnAttr(this._viewUI.suggesst1_btn, this._viewUI.suggesst1_lab, "common/ui/mainhud/main_team.png", modules.ModuleNames.Team, 4);
                            this.setBtnAttr(this._viewUI.suggesst4_btn, this._viewUI.suggesst4_lab, "common/ui/mainhud/main_streng1.png", modules.ModuleNames.STRENG_THENING, 7, 1);
                        }
                        else {
                            this.setBtnAttr(this._viewUI.suggesst2_btn, this._viewUI.suggesst2_lab, "common/ui/mainhud/main_team.png", modules.ModuleNames.Team, 4);
                            this.setBtnAttr(this._viewUI.suggesst1_btn, this._viewUI.suggesst1_lab, "common/ui/mainhud/main_helper.png", modules.ModuleNames.HUOBAN, 3);
                            this.setBtnAttr(this._viewUI.suggesst3_btn, this._viewUI.suggesst3_lab, "common/ui/mainhud/main_streng1.png", modules.ModuleNames.STRENG_THENING, 6, 0);
                            this.setBtnAttr(this._viewUI.suggesst4_btn, this._viewUI.suggesst4_lab, "common/ui/mainhud/main_streng1.png", modules.ModuleNames.STRENG_THENING, 7, 1);
                        }
                    }
                    else if (levelNum >= 40 && levelNum < 55) {
                        if (petNum >= 1) {
                            this.setBtnAttr(this._viewUI.suggesst1_btn, this._viewUI.suggesst1_lab, "common/ui/mainhud/battle_call.png", modules.ModuleNames.PET, 5);
                        }
                        else {
                            this.setBtnAttr(this._viewUI.suggesst1_btn, this._viewUI.suggesst1_lab, "common/ui/mainhud/main_team.png", modules.ModuleNames.Team, 4);
                        }
                        this.setBtnAttr(this._viewUI.suggesst2_btn, this._viewUI.suggesst2_lab, "common/ui/mainhud/main_streng1.png", modules.ModuleNames.STRENG_THENING, 6, 0);
                        this.setBtnAttr(this._viewUI.suggesst3_btn, this._viewUI.suggesst3_lab, "common/ui/mainhud/main_streng1.png", modules.ModuleNames.STRENG_THENING, 7, 1);
                        this.setBtnAttr(this._viewUI.suggesst4_btn, this._viewUI.suggesst4_lab, "common/ui/mainhud/main_streng1.png", modules.ModuleNames.STRENG_THENING, 9, 2);
                    }
                    else if (levelNum >= 55) {
                        this.setBtnAttr(this._viewUI.suggesst1_btn, this._viewUI.suggesst1_lab, "common/ui/mainhud/main_streng1.png", modules.ModuleNames.STRENG_THENING, 6, 0);
                        this.setBtnAttr(this._viewUI.suggesst2_btn, this._viewUI.suggesst2_lab, "common/ui/mainhud/main_streng1.png", modules.ModuleNames.STRENG_THENING, 7, 1);
                        this.setBtnAttr(this._viewUI.suggesst3_btn, this._viewUI.suggesst3_lab, "common/ui/mainhud/main_skill.png", modules.ModuleNames.SKILL, 8, 3);
                        this.setBtnAttr(this._viewUI.suggesst4_btn, this._viewUI.suggesst4_lab, "common/ui/mainhud/main_streng1.png", modules.ModuleNames.STRENG_THENING, 9, 2);
                    }
                };
                /** 设置按钮的事件和属性
                 * @param btn 设置目标
                 * @param label 设置Label
                 * @param skin 按钮skin
                 * @param _toModule 点击模块
                 * @param desc 描述编号
                 * @param ziInter 子页面
                 */
                BattleFaildMediator.prototype.setBtnAttr = function (btn, label, skin, _toModule, desc, ziInter) {
                    btn.visible = true;
                    btn.skin = skin;
                    btn.on(LEvent.CLICK, this, this._toModule, [_toModule, ziInter]);
                    label.text = this.deatNote[desc].text;
                };
                /** 显示模块
                 * @param _toModule 模块名称
                 * @param ziInter 子页面
                 */
                BattleFaildMediator.prototype._toModule = function (_toModule, ziInter) {
                    if (ziInter === void 0) { ziInter = -1; }
                    var levelNum = HudModel.getInstance().levelNum;
                    if (_toModule == modules.ModuleNames.ACTIVITY) {
                        if (levelNum < 19) {
                            var disappear = new commonUI.DisappearMessageTipsMediator(this._app);
                            var prompt_1 = HudModel.getInstance().promptAssembleBack(PromptExplain.ACTIVITY_LEVEL_LIMIT);
                            disappear.onShow(prompt_1);
                        }
                        else
                            modules.ModuleManager.show(_toModule, this._app);
                    }
                    else if (_toModule == modules.ModuleNames.SKILL && ziInter != -1) {
                        game.modules.skill.models.SkillModel.getInstance().currenTabNum = ziInter;
                        modules.ModuleManager.show(_toModule, this._app);
                    }
                    else if (_toModule == modules.ModuleNames.STRENG_THENING && ziInter != -1) {
                        modules.strengThening.models.StrengTheningModel.getInstance().tabNum = ziInter;
                        modules.ModuleManager.show(_toModule, this._app);
                    }
                    else
                        modules.ModuleManager.show(_toModule, this._app);
                };
                BattleFaildMediator.prototype.hideAll = function () {
                    this._viewUI.suggesst1_btn.visible = false;
                    this._viewUI.suggesst2_btn.visible = false;
                    this._viewUI.suggesst3_btn.visible = false;
                    this._viewUI.suggesst4_btn.visible = false;
                };
                BattleFaildMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                BattleFaildMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return BattleFaildMediator;
            }(game.modules.UiMediator));
            commonUI.BattleFaildMediator = BattleFaildMediator;
        })(commonUI = modules.commonUI || (modules.commonUI = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=BattleFaildMediator.js.map