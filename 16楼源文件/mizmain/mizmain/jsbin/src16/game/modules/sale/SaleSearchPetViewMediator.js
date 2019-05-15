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
* 宠物搜索tips
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var sale;
        (function (sale) {
            var SaleSearchPetViewMediator = /** @class */ (function (_super) {
                __extends(SaleSearchPetViewMediator, _super);
                function SaleSearchPetViewMediator(uiLayer) {
                    var _this = _super.call(this, uiLayer) || this;
                    /**复合表 */
                    _this.itemAttrData = BagModel.getInstance().itemAttrData;
                    /**选择的技能名称 */
                    _this.selectPetSkillName = [];
                    /**宠物技能 */
                    _this.petSkillIndexArr = [];
                    _this._viewUI = new ui.common.SaleSearchPetUI();
                    _this.isCenter = false;
                    _this._viewUI.bg_img.on(LEvent.MOUSE_DOWN, _this, _this.cancel);
                    _this._viewUI.cancel_btn.on(LEvent.MOUSE_DOWN, _this, _this.cancel);
                    _this._viewUI.reset_btn.on(LEvent.MOUSE_DOWN, _this, _this.reset);
                    _this._viewUI.ok_btn.on(LEvent.MOUSE_DOWN, _this, _this.ok);
                    return _this;
                }
                /**
                 * 显示宠物
                 */
                SaleSearchPetViewMediator.prototype.showPet = function (x, y, ordinaryPet, lingshou) {
                    this._viewUI.petSkill_box.visible = false;
                    var listBox = this._viewUI.listBox;
                    listBox.visible = true;
                    listBox.pos(x, y);
                    this._viewUI.selectPet_tab.selectHandler = new Handler(this, this.petTabSelect, [ordinaryPet, lingshou]);
                    this.petTabSelect(ordinaryPet, lingshou, 0);
                };
                /**宠物选择 */
                SaleSearchPetViewMediator.prototype.petTabSelect = function (ordinaryPet, lingshou, index) {
                    this._viewUI.petList_viewstack.selectedIndex = index;
                    if (index == 0) {
                        this.showOrdinaryPet(ordinaryPet);
                    }
                    else if (index == 1) {
                        this.showLingchong(lingshou);
                    }
                };
                /**
                 * 显示普通宠物
                 */
                SaleSearchPetViewMediator.prototype.showOrdinaryPet = function (ordinaryPet) {
                    var OrdinaryPetlist = this._viewUI.OrdinaryPet_list;
                    SaleModel._instance.showList(OrdinaryPetlist, ordinaryPet);
                    OrdinaryPetlist.renderHandler = new Handler(this, this.OrdinaryPetlistRender, [ordinaryPet]);
                };
                /**普通宠物列表渲染 */
                SaleSearchPetViewMediator.prototype.OrdinaryPetlistRender = function (ordinaryPet, cell, index) {
                    var onebtn = cell.getChildByName("onebtn");
                    var name = ordinaryPet[index].name;
                    onebtn.label = name;
                    onebtn.on(LEvent.MOUSE_UP, this, this.onOrdinaryPetBtn, [index]);
                };
                /**选择宠物 */
                SaleSearchPetViewMediator.prototype.onOrdinaryPetBtn = function (index) {
                    this.hide();
                    sale.models.SaleProxy._instance.event(sale.models.onSaleListordinaryPet, index);
                };
                /**
                 * 显示灵宠
                 */
                SaleSearchPetViewMediator.prototype.showLingchong = function (lingshou) {
                    var lingshoulist = this._viewUI.lingshou_list;
                    SaleModel._instance.showList(lingshoulist, lingshou);
                    lingshoulist.renderHandler = new Handler(this, this.lingshoulistRender, [lingshou]);
                };
                /**灵宠列表渲染 */
                SaleSearchPetViewMediator.prototype.lingshoulistRender = function (lingshou, cell, index) {
                    var onebtn = cell.getChildByName("onebtn");
                    var name = lingshou[index].name;
                    onebtn.label = name;
                    onebtn.on(LEvent.MOUSE_UP, this, this.onLingshouBtn, [index]);
                };
                /**灵宠选择 */
                SaleSearchPetViewMediator.prototype.onLingshouBtn = function (index) {
                    this.hide();
                    sale.models.SaleProxy._instance.event(sale.models.onSaleListlingchong, index);
                };
                /**
                 * 显示宠物技能  129 655
                 */
                SaleSearchPetViewMediator.prototype.showPetSkill = function (x, y, petSkill) {
                    this._viewUI.listBox.visible = false;
                    var petSkillBox = this._viewUI.petSkill_box;
                    petSkillBox.visible = true;
                    petSkillBox.pos(x, y);
                    SaleModel._instance.showList(this._viewUI.petSkill, petSkill);
                    this._viewUI.petSkill.renderHandler = new Handler(this, this.petSkilllistRender, [petSkill]);
                    this._viewUI.petSkill.selectHandler = new Handler(this, this.petSkillSelect, [petSkill]);
                };
                /**宠物技能列表渲染 */
                SaleSearchPetViewMediator.prototype.petSkilllistRender = function (petSkill, cell, index) {
                    var skillname = petSkill[index].skillname;
                    var icon = petSkill[index].icon;
                    var color = petSkill[index].color;
                    var skillIcon = SaleModel.getInstance().getIcon(icon);
                    var frame = StrengTheningModel._instance.frameSkinArr[color - 1];
                    var icon_img = cell.getChildByName("icon_img");
                    icon_img.skin = skillIcon + "";
                    var diban_img = cell.getChildByName("diban_img");
                    diban_img.skin = frame;
                    var select_img = cell.getChildByName("select_img");
                    if (this.petSkillIndexArr.indexOf(index) < 0) {
                        select_img.visible = false;
                    }
                    else {
                        select_img.visible = true;
                    }
                };
                /**点击图标 */
                SaleSearchPetViewMediator.prototype.onIconImage = function (cell, index, petSkill) {
                    var select_img = cell.getChildByName("select_img");
                    select_img.visible = true;
                    var skillname = petSkill[index].skillname;
                    this.selectPetSkillName.unshift(skillname);
                    this.showSkillName();
                };
                /**显示技能名称 */
                SaleSearchPetViewMediator.prototype.showSkillName = function () {
                    var selectPetSkill_label = this._viewUI.selectPetSkill_label;
                    var str = "";
                    for (var i = 0; i < this.selectPetSkillName.length; i++) {
                        str += this.selectPetSkillName[i] + "  ";
                    }
                    selectPetSkill_label.text = str;
                };
                /**宠物技能选择 */
                SaleSearchPetViewMediator.prototype.petSkillSelect = function (petSkill, index) {
                    if (this._viewUI.petSkill.selectedIndex != -1) {
                        if (this.petSkillIndexArr.length >= 20) { //选择技能的个数不能大于20
                            return;
                        }
                        var cell = this._viewUI.petSkill.getCell(index);
                        var select_img = cell.getChildByName("select_img");
                        if (this.petSkillIndexArr.indexOf(index) < 0) {
                            this.petSkillIndexArr.unshift(index);
                            var skillname = petSkill[index].skillname;
                            this.selectPetSkillName.unshift(skillname);
                        }
                        else {
                            var mindex = this.petSkillIndexArr.indexOf(index);
                            this.petSkillIndexArr.splice(mindex, 1);
                            var name = this.selectPetSkillName.indexOf(petSkill[index].skillname);
                            this.selectPetSkillName.splice(name, 1);
                        }
                        this.showSkillName();
                        this._viewUI.petSkill.selectedIndex = -1;
                    }
                };
                /**
                 * 宠物技能选择重置
                 */
                SaleSearchPetViewMediator.prototype.reset = function () {
                    this.selectPetSkillName = [];
                    this.petSkillIndexArr = [];
                    this._viewUI.selectPetSkill_label.text = "";
                };
                /**
                 * 确定
                 */
                SaleSearchPetViewMediator.prototype.ok = function () {
                    SaleModel._instance.petSkillIndexArr = this.petSkillIndexArr;
                    sale.models.SaleProxy._instance.event(sale.models.onSalePetSkill);
                    this.hide();
                };
                /**
                 * 取消
                 */
                SaleSearchPetViewMediator.prototype.cancel = function () {
                    this.reset();
                    this.hide();
                };
                SaleSearchPetViewMediator.prototype.show = function () {
                    this.selectPetSkillName = [];
                    this.petSkillIndexArr = [];
                    this._viewUI.selectPetSkill_label.text = "";
                    _super.prototype.show.call(this);
                };
                SaleSearchPetViewMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                SaleSearchPetViewMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return SaleSearchPetViewMediator;
            }(game.modules.UiMediator));
            sale.SaleSearchPetViewMediator = SaleSearchPetViewMediator;
        })(sale = modules.sale || (modules.sale = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=SaleSearchPetViewMediator.js.map