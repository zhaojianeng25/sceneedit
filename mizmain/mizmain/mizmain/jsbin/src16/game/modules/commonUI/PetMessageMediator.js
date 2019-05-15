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
* 宠物信息弹窗
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var commonUI;
        (function (commonUI) {
            /** 关闭宠物信息弹窗事件 */
            commonUI.CLOSE_PET_TIPS = "closePetTipsEvent";
            var PetMessageMediator = /** @class */ (function (_super) {
                __extends(PetMessageMediator, _super);
                function PetMessageMediator(petId, app, frombattle) {
                    if (frombattle === void 0) { frombattle = false; }
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    /** 来自战斗 */
                    _this.frombattle = false;
                    _this._viewUI = new ui.common.PetMessageUI();
                    _this.isCenter = true;
                    _this._petMessageModel = new PetMessageModel(petId, _this._viewUI);
                    _this._app = app;
                    _this.petId = petId;
                    _this.frombattle = frombattle;
                    _this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, _this, _this.hide);
                    _this._viewUI.skill_list.renderHandler = new Handler(_this, _this.skillHandler);
                    return _this;
                }
                /** 宠物信息加载 */
                PetMessageMediator.prototype.init = function () {
                    var _petCPetAttrData = PetModel.getInstance().petCPetAttrData;
                    var _petSkillConfigData = PetModel.getInstance().petSkillConfigData;
                    //宠物名称
                    this._viewUI.petName_lab.text = _petCPetAttrData[this.petId].name;
                    //名称颜色
                    var _petColor = _petCPetAttrData[this.petId].colour;
                    this._viewUI.petName_lab.color = "#" + _petColor;
                    //参战等级
                    this._viewUI.level_lab.text = "参战等级：" + _petCPetAttrData[this.petId].uselevel;
                    this._SetUI();
                    if (!this.frombattle) {
                        //攻击资质
                        this._viewUI.gongJi_lab.text = _petCPetAttrData[this.petId].attackaptmin + "-" + _petCPetAttrData[this.petId].attackaptmax;
                        //体力资质
                        this._viewUI.tiLi_lab.text = _petCPetAttrData[this.petId].phyforceaptmin + "-" + _petCPetAttrData[this.petId].phyforceaptmax;
                        //速度资质
                        this._viewUI.suDu_lab.text = _petCPetAttrData[this.petId].speedaptmin + "-" + _petCPetAttrData[this.petId].speedaptmax;
                        //防御资质
                        this._viewUI.fangYu_lab.text = _petCPetAttrData[this.petId].defendaptmin + "-" + _petCPetAttrData[this.petId].defendaptmax;
                        //法术资质
                        this._viewUI.faShu_lab.text = _petCPetAttrData[this.petId].magicaptmin + "-" + _petCPetAttrData[this.petId].magicaptmax;
                        //成长资质
                        this._viewUI.chengZhang_lab.text = _petCPetAttrData[this.petId].growrate[0] / 1000 + "-" + _petCPetAttrData[this.petId].growrate[6] / 1000;
                    }
                    else {
                        for (var key in PetModel.getInstance().pets.keys) {
                            var petinfo = PetModel._instance.pets.get(PetModel._instance.pets.keys[key]);
                            if (petinfo.id == this.petId) {
                                //生命
                                this._viewUI.life_lab.text = Math.floor(petinfo.hp).toString();
                                //攻击
                                this._viewUI.attack_lab.text = Math.floor(petinfo.attack).toString();
                                //防御
                                this._viewUI.defense_lab.text = Math.floor(petinfo.defend).toString();
                                //法攻
                                this._viewUI.legal_attack_lab.text = Math.floor(petinfo.magicattack).toString();
                                //法防
                                this._viewUI.law_prevention_lab.text = Math.floor(petinfo.magicdef).toString();
                                //速度
                                this._viewUI.speed_lab.text = Math.floor(petinfo.speed).toString();
                                break;
                            }
                        }
                    }
                    //技能数组
                    var _skillid = _petCPetAttrData[this.petId].skillid;
                    var data = [];
                    for (var i = 0; i < 6; i++) {
                        var _colorVisi = false;
                        var _colorSkin = "";
                        var _skillVisi = false;
                        var _skillSkin = "";
                        var _tipsVisi = false;
                        if (i < _skillid.length) {
                            //图标
                            var _icon = _petSkillConfigData[_skillid[i]].icon;
                            //品质
                            var _color = _petSkillConfigData[_skillid[i]].color;
                            //主被动
                            var _skilltype = _petSkillConfigData[_skillid[i]].skilltype;
                            _colorVisi = true;
                            _skillVisi = true;
                            _tipsVisi = true;
                            if (_skilltype == 1) {
                                _colorSkin = "common/ui/pet/beiji" + _color + ".png";
                            }
                            else if (_skilltype == 2) {
                                _colorSkin = "common/ui/pet/zhuji" + _color + ".png";
                            }
                            _skillSkin = "common/icon/skill/" + _icon + ".png";
                        }
                        data.push({
                            waiKuang_img: { visible: _colorVisi, skin: _colorSkin },
                            jiNeng_img: { visible: _skillVisi, skin: _skillSkin },
                            tips_btn: { visible: _tipsVisi },
                        });
                    }
                    this._viewUI.skill_list.array = data;
                };
                /** 修改ui显示 */
                PetMessageMediator.prototype._SetUI = function () {
                    if (this.frombattle) { //来自召唤宠物界面
                        this._viewUI.attr_box.visible = true;
                        this._viewUI.zizhi_box.visible = false;
                        //设置背景位置
                        this._viewUI.attr_bg_img.x = 425;
                        this._viewUI.attr_bg_img.width = 250;
                    }
                    else if (!this.frombattle) { //首充
                        this._viewUI.attr_box.visible = false;
                        this._viewUI.zizhi_box.visible = true;
                        //设置背景位置
                        this._viewUI.attr_bg_img.x = 372;
                        this._viewUI.attr_bg_img.width = 308;
                    }
                };
                /** 技能按钮监听 */
                PetMessageMediator.prototype.skillHandler = function (cell, index) {
                    var btn = cell.getChildByName("tips_btn");
                    btn.on(LEvent.MOUSE_DOWN, this, this.getTips, [cell, index]);
                };
                /** 获取技能弹窗 */
                PetMessageMediator.prototype.getTips = function (cell, index) {
                    var _petCPetAttrData = PetModel.getInstance().petCPetAttrData;
                    var _skillid = _petCPetAttrData[this.petId].skillid;
                    var itemId = _skillid[index];
                    var parame = new Dictionary();
                    parame.set("itemId", itemId);
                    this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.SKILL, parame);
                };
                PetMessageMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                    this.init();
                    this._petMessageModel.show();
                };
                PetMessageMediator.prototype.hide = function () {
                    this.event(commonUI.CLOSE_PET_TIPS);
                    _super.prototype.hide.call(this);
                };
                PetMessageMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return PetMessageMediator;
            }(game.modules.UiMediator));
            commonUI.PetMessageMediator = PetMessageMediator;
            var PetMessageModel = /** @class */ (function (_super) {
                __extends(PetMessageModel, _super);
                function PetMessageModel(petId, uiLayer) {
                    var _this = _super.call(this, uiLayer) || this;
                    _this._viewUI = new ui.common.PetMessageModelUI();
                    _this._viewUI.mouseThrough = true;
                    _this.isCenter = false;
                    _this.petId = petId;
                    return _this;
                }
                /** 创建宠物模型 */
                PetMessageModel.prototype.modelcreate = function (modelid) {
                    if (this.model.role3d) {
                        this.scene2DPanel.removeSceneChar(this.model.role3d);
                    }
                    var parentui = this._viewUI.parent;
                    if (parentui) {
                        this.model.role3d = new YxChar3d();
                        this.model.role3d.setRoleUrl(getRoleUrl(modelid + ""));
                        //坐标
                        this.model.role3d.set2dPos((this._viewUI.chongwu_img.x + this._viewUI.chongwu_img.width / 2.2) * parentui.globalScaleX, (this._viewUI.chongwu_img.y + this._viewUI.chongwu_img.height) * parentui.globalScaleY);
                        this.model.role3d.scale = 1.2;
                        this.model.role3d.rotationY = 135;
                        this.model.role3d.rotationX = 0;
                        this.scene2DPanel.addSceneChar(this.model.role3d);
                    }
                };
                PetMessageModel.prototype.show = function () {
                    _super.prototype.show.call(this);
                    this.model = new ModelsCreate();
                    this.scene2DPanel = new TestRole2dPanel();
                    this._viewUI.chongwu_img.addChild(this.scene2DPanel);
                    var parentui = this._viewUI.parent;
                    this.scene2DPanel.ape.x = parentui.x * parentui.globalScaleX;
                    this.scene2DPanel.ape.y = parentui.y * parentui.globalScaleY;
                    this.modelcreate(PetModel.getInstance().petCPetAttrData[this.petId].modelid);
                };
                PetMessageModel.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                PetMessageModel.prototype.getView = function () {
                    return this._viewUI;
                };
                return PetMessageModel;
            }(game.modules.UiMediator));
            commonUI.PetMessageModel = PetMessageModel;
        })(commonUI = modules.commonUI || (modules.commonUI = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=PetMessageMediator.js.map