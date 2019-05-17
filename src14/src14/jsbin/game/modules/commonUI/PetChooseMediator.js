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
        var commonUI;
        (function (commonUI) {
            /** 选择宠物 */
            var PetChooseMediator = /** @class */ (function (_super) {
                __extends(PetChooseMediator, _super);
                function PetChooseMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    _this._viewUI = new ui.common.PetChooseUI();
                    _this.isCenter = true;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this.pet1model = new ModelsCreate();
                    _this.pet2model = new ModelsCreate();
                    _this.scene2DPanel1 = new TestRole2dPanel();
                    _this.scene2DPanel2 = new TestRole2dPanel();
                    _this._viewUI.pet1_img.addChild(_this.scene2DPanel1);
                    _this._viewUI.pet2_img.addChild(_this.scene2DPanel2);
                    return _this;
                }
                /**宠物1id 宠物2id*/
                PetChooseMediator.prototype.init = function (pet1id, pet2id) {
                    _super.prototype.show.call(this);
                    this.show_and_hide_UI(false);
                    this.delaytime = 0;
                    var petinfo1 = game.modules.pet.models.PetModel.getInstance().petCPetAttrData[pet1id];
                    var petinfo2 = game.modules.pet.models.PetModel.getInstance().petCPetAttrData[pet2id];
                    var shape1 = LoginModel.getInstance().cnpcShapeInfo[petinfo1.modelid];
                    var shape2 = LoginModel.getInstance().cnpcShapeInfo[petinfo2.modelid];
                    this._viewUI.pet1name.text = petinfo1.name;
                    this._viewUI.pet2name.text = petinfo2.name;
                    this.scene2DPanel1.ape.x = this._viewUI.x * this._viewUI.globalScaleX;
                    this.scene2DPanel1.ape.y = this._viewUI.y * this._viewUI.globalScaleY;
                    this.scene2DPanel2.ape.x = this._viewUI.x * this._viewUI.globalScaleX;
                    this.scene2DPanel2.ape.y = this._viewUI.y * this._viewUI.globalScaleY;
                    this.modelcreate1(parseInt(shape1.shape));
                    this.modelcreate2(parseInt(shape2.shape));
                    this._viewUI.pet1_box.on(LEvent.MOUSE_DOWN, this, this.selectpet1, [pet1id]);
                    this._viewUI.pet2_box.on(LEvent.MOUSE_DOWN, this, this.selectpet2, [pet2id]);
                    if (AutoHangUpModels.getInstance().autotask == 1) { //自动选择宠物
                        Laya.timer.loop(1000, this, this.delayselect);
                    }
                };
                /**模型创建*/
                PetChooseMediator.prototype.modelcreate1 = function (modelid) {
                    if (this.pet1model.role3d) {
                        this.scene2DPanel1.removeSceneChar(this.pet1model.role3d);
                    }
                    this.pet1model.role3d = new YxChar3d();
                    this.pet1model.role3d.setRoleUrl(getRoleUrl(modelid + ""));
                    this.pet1model.role3d.set2dPos((this._viewUI.pet1_box.x + this._viewUI.pet1_img.width / 2) * this._viewUI.globalScaleX, (this._viewUI.pet1_box.y + this._viewUI.pet1_img.height / 3 * 2) * this._viewUI.globalScaleY); //坐标
                    this.pet1model.role3d.scale = 1;
                    this.pet1model.role3d.rotationX = 0;
                    this.pet1model.role3d.rotationY = 135;
                    this.scene2DPanel1.addSceneChar(this.pet1model.role3d);
                    this.pet1model.mouseEnabled = false;
                    this.pet1model.mouseThrough = true;
                };
                /**模型创建*/
                PetChooseMediator.prototype.modelcreate2 = function (modelid) {
                    if (this.pet2model.role3d) {
                        this.scene2DPanel2.removeSceneChar(this.pet2model.role3d);
                    }
                    this.pet2model.role3d = new YxChar3d();
                    this.pet2model.role3d.setRoleUrl(getRoleUrl(modelid + ""));
                    this.pet2model.role3d.set2dPos((this._viewUI.pet2_box.x + this._viewUI.pet2_img.width / 2) * this._viewUI.globalScaleX, (this._viewUI.pet2_box.y + this._viewUI.pet2_img.height / 3 * 2) * this._viewUI.globalScaleY); //坐标
                    this.pet2model.role3d.scale = 1;
                    this.pet2model.role3d.rotationX = 0;
                    this.pet2model.role3d.rotationY = 135;
                    this.scene2DPanel2.addSceneChar(this.pet2model.role3d);
                    this.pet2model.mouseEnabled = false;
                    this.pet2model.mouseThrough = true;
                };
                /**第一只宠物选择*/
                PetChooseMediator.prototype.selectpet1 = function (petid) {
                    game.modules.task.models.TaskProxy.getInstance().event(game.modules.task.models.SELECTPET, [petid]);
                    this.pet1model.modeldelt();
                };
                /**第二只宠物选择*/
                PetChooseMediator.prototype.selectpet2 = function (petid) {
                    game.modules.task.models.TaskProxy.getInstance().event(game.modules.task.models.SELECTPET, [petid]);
                    this.pet2model.modeldelt();
                };
                /**自动任务时默认选择第一只宠物*/
                PetChooseMediator.prototype.delayselect = function () {
                    this.delaytime += 1;
                    if (this.delaytime >= 3) {
                        this.selectpet1(43000);
                        Laya.timer.clear(this, this.delayselect);
                    }
                };
                PetChooseMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                };
                PetChooseMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                PetChooseMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                /** 神兽重置调用该方法 */
                PetChooseMediator.prototype.onShow = function (petId, shenShouKey) {
                    this._shenShouKey = shenShouKey;
                    this.registEvent();
                    this.shenShouDataInt(petId);
                    this.show_and_hide_UI(true);
                    this.UI_init();
                    this.show();
                };
                /** 事件注册 */
                PetChooseMediator.prototype.registEvent = function () {
                    this._viewUI.bg_img.on(LEvent.CLICK, this, this.onHide);
                    modules.pet.models.PetProxy.getInstance().on(modules.pet.models.ADD_EVENT, this, this.onHide);
                };
                /** 关闭该界面的UI */
                PetChooseMediator.prototype.onHide = function () {
                    var _haveShenShouDic = modules.pet.models.PetModel.getInstance().getShenshouDatas();
                    if (_haveShenShouDic.keys.length == 1) {
                        this.hide();
                    }
                    else {
                        var _petBattleChangeMediator = new commonUI.PetBattleChangeMediator(this._app);
                        _petBattleChangeMediator.onShow();
                        this.hide();
                    }
                    this.removeEvent();
                };
                /** 移除事件 */
                PetChooseMediator.prototype.removeEvent = function () {
                    this._viewUI.bg_img.off(LEvent.CLICK, this, this.onHide);
                    modules.pet.models.PetProxy.getInstance().off(modules.pet.models.ADD_EVENT, this, this.onHide);
                };
                /** 界面UI的初始化 */
                PetChooseMediator.prototype.UI_init = function () {
                    this._viewUI.choosePet_lst.vScrollBarSkin = "";
                    this._viewUI.choosePet_lst.array = this._shenShouIdArr;
                    this._viewUI.choosePet_lst.renderHandler = new Laya.Handler(this, this.choosePetLstRender);
                    this._viewUI.choosePet_lst.selectHandler = new Laya.Handler(this, this.choosePetLstSelect);
                };
                /** 选择宠物列表点击 */
                PetChooseMediator.prototype.choosePetLstSelect = function (index) {
                    RequesterProtocols._instance.c2s_shen_shouchongzhi(this._shenShouKey, this._shenShouIdArr[index]);
                };
                /** 选择宠物列表渲染 */
                PetChooseMediator.prototype.choosePetLstRender = function (cell, index) {
                    var shenShouName_lab = cell.getChildByName("shenShouName_lab");
                    var _shenShouId = this._shenShouIdArr[index];
                    shenShouName_lab.text = this._petAttrData[_shenShouId]["name"];
                };
                /** 能兑换的神兽数据初始化
                 * @param petId 不需要兑换的神兽id
                 */
                PetChooseMediator.prototype.shenShouDataInt = function (petId) {
                    this._shenShouIdArr = [];
                    this._shenshouIncConfig = PetModel.getInstance().petCPetShenShouIncdata; //神兽提升配置表
                    this._petAttrData = PetModel.getInstance().petCPetAttrData; //宠物数据表
                    var _incKeys = Object.keys(this._shenshouIncConfig);
                    for (var i = 0; i < _incKeys.length; i++) {
                        var _petid = this._shenshouIncConfig[_incKeys[i]]["petid"];
                        if (_petid && this._shenShouIdArr.indexOf(_petid) == -1 && _petid != petId) {
                            this._shenShouIdArr.push(_petid);
                        }
                    }
                };
                /** 显示与隐藏部分UI
                 * @param isReset true:是神兽重置，false:不是神兽重置
                 */
                PetChooseMediator.prototype.show_and_hide_UI = function (isReset) {
                    if (isReset) {
                        this._viewUI.tips1_lab.visible = false;
                        this._viewUI.pet1_box.visible = false;
                        this._viewUI.pet2_box.visible = false;
                        this._viewUI.tips2_lab.visible = true;
                        this._viewUI.choosePet_lst.visible = true;
                    }
                    else {
                        this._viewUI.tips1_lab.visible = true;
                        this._viewUI.pet1_box.visible = true;
                        this._viewUI.pet2_box.visible = true;
                        this._viewUI.tips2_lab.visible = false;
                        this._viewUI.choosePet_lst.visible = false;
                    }
                };
                return PetChooseMediator;
            }(game.modules.UiMediator));
            commonUI.PetChooseMediator = PetChooseMediator;
        })(commonUI = modules.commonUI || (modules.commonUI = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=PetChooseMediator.js.map