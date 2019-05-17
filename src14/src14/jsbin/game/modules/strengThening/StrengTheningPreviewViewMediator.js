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
* 装备预览
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var strengThening;
        (function (strengThening) {
            var StrengTheningPreviewViewMediator = /** @class */ (function (_super) {
                __extends(StrengTheningPreviewViewMediator, _super);
                function StrengTheningPreviewViewMediator(uiLayer, equipId) {
                    var _this = _super.call(this, uiLayer) || this;
                    /**装备生成基本属性表 */
                    _this.equipIteminfoData = StrengTheningModel.getInstance().equipIteminfoData;
                    /**属性效果id表 */
                    _this.attributeDesConfigData = StrengTheningModel.getInstance().attributeDesConfigData;
                    /**复合表 */
                    _this.itemAttrData = BagModel.getInstance().itemAttrData;
                    /**道具类型表 */
                    _this.itemTypeData = StrengTheningModel.getInstance().itemTypeData;
                    /**装备打造表 */
                    _this.equipMakeInfoData = StrengTheningModel.getInstance().equipMakeInfoData;
                    _this._viewUI = new ui.common.StrengTheningPreviewUI();
                    _this.isCenter = false;
                    _this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, _this, _this.hide);
                    _this.showEquip(equipId);
                    return _this;
                }
                /**显示装备 */
                StrengTheningPreviewViewMediator.prototype.showEquip = function (equipId) {
                    var icon = this.itemAttrData[equipId].icon;
                    var m_icon = SaleModel._instance.getIcon(icon);
                    this._viewUI.content_img.skin = m_icon;
                    var name = this.itemAttrData[equipId].name;
                    this._viewUI.equipName_lab.text = name;
                    var itemtypeid = this.itemAttrData[equipId].itemtypeid;
                    this._viewUI.equipType_lab.text = this.itemTypeData[itemtypeid].name;
                    this.showEquipAttr(equipId);
                };
                /**显示装备属性 */
                StrengTheningPreviewViewMediator.prototype.showEquipAttr = function (equipId) {
                    var attribute_list = this._viewUI.attribute_list;
                    var attributeArr = [];
                    var shuxing1id = this.equipIteminfoData[equipId].shuxing1id; //属性id1
                    if (shuxing1id != 0) {
                        var attrName1 = this.attributeDesConfigData[shuxing1id].name;
                        var vptdazhaoid = this.equipMakeInfoData[equipId].vptdazhaoid;
                        var phyattack_Attr1 = this.getphyattack_Attr(equipId);
                        var phyattack_Attr2 = this.getphyattack_Attr(vptdazhaoid[1]);
                        var phyattack_Attr3 = this.getphyattack_Attr(vptdazhaoid[2]);
                        attributeArr.push({ name_lab: attrName1, greenQuality_lab: phyattack_Attr1, blueQuality_lab: phyattack_Attr2, purpleQuality_lab: phyattack_Attr3 });
                    }
                    var shuxing2id = this.equipIteminfoData[equipId].shuxing2id; //属性id2
                    if (shuxing2id != 0) {
                        var attrName2 = this.attributeDesConfigData[shuxing2id].name;
                        var getmagicattack_Attr1 = this.getmagicattack_Attr(equipId);
                        var getmagicattack_Attr2 = this.getmagicattack_Attr(vptdazhaoid[1]);
                        var getmagicattack_Attr3 = this.getmagicattack_Attr(vptdazhaoid[2]);
                        attributeArr.push({ name_lab: attrName2, greenQuality_lab: getmagicattack_Attr1, blueQuality_lab: getmagicattack_Attr2, purpleQuality_lab: getmagicattack_Attr3 });
                    }
                    var shuxing3id = this.equipIteminfoData[equipId].shuxing3id; //属性id3
                    if (shuxing3id != 0) {
                        var attrName3 = this.attributeDesConfigData[shuxing3id].name;
                        var getzhiliao_Attr1 = this.getzhiliao_Attr(equipId);
                        var getzhiliao_Attr2 = this.getzhiliao_Attr(vptdazhaoid[1]);
                        var getzhiliao_Attr3 = this.getzhiliao_Attr(vptdazhaoid[2]);
                        attributeArr.push({ name_lab: attrName3, greenQuality_lab: getzhiliao_Attr1, blueQuality_lab: getzhiliao_Attr2, purpleQuality_lab: getzhiliao_Attr3 });
                    }
                    SaleModel._instance.showList(attribute_list, attributeArr);
                };
                /**获取物理属性 */
                StrengTheningPreviewViewMediator.prototype.getphyattack_Attr = function (equipId) {
                    var shuxing1bodongduanmin = this.equipIteminfoData[equipId].shuxing1bodongduanmin;
                    var shuxing1bodongduanmax = this.equipIteminfoData[equipId].shuxing1bodongduanmax;
                    var phyattack_Attr = "+" + shuxing1bodongduanmin[0] + "-" + shuxing1bodongduanmax[shuxing1bodongduanmax.length - 1];
                    return phyattack_Attr;
                };
                /**法术攻击属性 */
                StrengTheningPreviewViewMediator.prototype.getmagicattack_Attr = function (equipId) {
                    var shuxing2bodongduanmin = this.equipIteminfoData[equipId].shuxing2bodongduanmin;
                    var shuxing2bodongduanmax = this.equipIteminfoData[equipId].shuxing2bodongduanmax;
                    var magicattack_Attr = "+" + shuxing2bodongduanmin[0] + "-" + shuxing2bodongduanmax[shuxing2bodongduanmax.length - 1];
                    return magicattack_Attr;
                };
                /**治疗强度属性 */
                StrengTheningPreviewViewMediator.prototype.getzhiliao_Attr = function (equipId) {
                    var shuxing3bodongduanmin = this.equipIteminfoData[equipId].shuxing3bodongduanmin;
                    var shuxing3bodongduanmax = this.equipIteminfoData[equipId].shuxing3bodongduanmax;
                    var zhiliao_Attr = "+" + shuxing3bodongduanmin[0] + "-" + shuxing3bodongduanmax[shuxing3bodongduanmax.length - 1];
                    return zhiliao_Attr;
                };
                StrengTheningPreviewViewMediator.prototype.show = function () {
                    strengThening.models.StrengTheningProxy.getInstance().event(strengThening.models.OPENZHEZHAO);
                    _super.prototype.show.call(this);
                };
                StrengTheningPreviewViewMediator.prototype.hide = function () {
                    strengThening.models.StrengTheningProxy.getInstance().event(strengThening.models.CLOSEZHEZHAO);
                    _super.prototype.hide.call(this);
                };
                StrengTheningPreviewViewMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                StrengTheningPreviewViewMediator.LOGIN_EVENT = "strengTheningEvent";
                return StrengTheningPreviewViewMediator;
            }(game.modules.UiMediator));
            strengThening.StrengTheningPreviewViewMediator = StrengTheningPreviewViewMediator;
        })(strengThening = modules.strengThening || (modules.strengThening = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=StrengTheningPreviewViewMediator.js.map