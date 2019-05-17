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
* 结婚技能类
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var skill;
        (function (skill) {
            var SkillMarryMediator = /** @class */ (function (_super) {
                __extends(SkillMarryMediator, _super);
                function SkillMarryMediator(uiLayer) {
                    var _this = _super.call(this, uiLayer) || this;
                    /**选中列表项下标 */
                    _this.selectNum = 0;
                    _this._viewUI = new ui.common.SkillMarryUI();
                    _this._viewUI.mouseThrough = true;
                    _this.isCenter = false;
                    _this.skillArr = new Array();
                    _this.skillImgArr = new Array();
                    _this.skillObj = skill.models.SkillModel.getInstance().CSchoolSkillitemBinDic;
                    _this.init();
                    return _this;
                }
                SkillMarryMediator.prototype.init = function () {
                    for (var i = SkillEnum.MARRY_START; i < SkillEnum.MARRY_END; i++) {
                        this.skillArr.push(this.skillObj[i]);
                        this.skillImgArr.push({ img: "common/icon/skill/" + this.skillObj[i]["normalIcon"] + ".png" });
                    }
                };
                /**初始化结婚技能列表 */
                SkillMarryMediator.prototype.getListData = function () {
                    this._viewUI.skill_list.vScrollBarSkin = "";
                    this._viewUI.skill_list.scrollBar.elasticBackTime = 200;
                    this._viewUI.skill_list.scrollBar.elasticDistance = 50;
                    this._viewUI.skill_list.array = this.skillArr;
                    this._viewUI.skill_list.repeatY = this.skillArr.length;
                    this._viewUI.skill_list.renderHandler = new Handler(this, this.onRender);
                    this._viewUI.skill_list.selectHandler = new Handler(this, this.onSelect);
                    this._viewUI.skill_list.selectedIndex = 0;
                };
                /**渲染结婚技能列表 */
                SkillMarryMediator.prototype.onRender = function (cell, index) {
                    if (index > this.skillArr.length)
                        return;
                    var nameLab = cell.getChildByName("name_lab");
                    var tubiaoImg = cell.getChildByName("icon_img");
                    var levelLab = this._viewUI.skill_list.getCell(index).getChildByName("level_lab");
                    nameLab.text = this.skillArr[index]["skillname"];
                    tubiaoImg.skin = this.skillImgArr[index].img;
                    if (this.skillArr[index]["frienddegree"] != 0)
                        levelLab.text = this.skillArr[index]["frienddegree"] + skill.models.SkillModel.chineseStr.haoyoudu_unlock;
                    else
                        levelLab.text = "";
                };
                /**处理结婚技能列表点击 */
                SkillMarryMediator.prototype.onSelect = function (index) {
                    this.selectNum = index;
                    var nameLab = this._viewUI.skill_list.getCell(index).getChildByName("name_lab");
                    this._viewUI.skillName_lab.text = nameLab.text;
                    this._viewUI.miaoshu_lab.text = this.skillArr[index]["sType"];
                    this._viewUI.tiaojian_lab.text = this.skillArr[index]["leveldescribezero"];
                    this._viewUI.xiaoguo_lab.text = this.skillArr[index]["skilldescribe"];
                };
                SkillMarryMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                    this.getListData();
                };
                SkillMarryMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                SkillMarryMediator.prototype.swap = function () {
                    _super.prototype.swap.call(this);
                };
                SkillMarryMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return SkillMarryMediator;
            }(game.modules.UiMediator));
            skill.SkillMarryMediator = SkillMarryMediator;
        })(skill = modules.skill || (modules.skill = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=SkillMarryMediator.js.map