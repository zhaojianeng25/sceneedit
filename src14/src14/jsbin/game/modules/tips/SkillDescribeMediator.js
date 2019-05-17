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
* 伙伴技能详细信息显示
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var tips;
        (function (tips) {
            var SkillDescribeMediator = /** @class */ (function (_super) {
                __extends(SkillDescribeMediator, _super);
                function SkillDescribeMediator(uiLayer) {
                    var _this = _super.call(this, uiLayer) || this;
                    /**伙伴技能显示表 */
                    _this.friendSkillData = game.modules.huoban.models.HuoBanModel._instance.friendSkillData;
                    /**最小的高度 */
                    _this.minHtmlHeight = 120;
                    _this._viewUI = new ui.common.component.partnerSkillUI();
                    _this.isCenter = false;
                    _this._viewUI.bk_img.on(LEvent.MOUSE_DOWN, _this, _this.closeTips);
                    return _this;
                }
                /**
                 * 显示技能
                 * @param skillId
                 */
                SkillDescribeMediator.prototype.showSkillDescribe = function (skillId) {
                    var name = this.friendSkillData[skillId].name;
                    var desc = this.friendSkillData[skillId].desc;
                    var imageID = this.friendSkillData[skillId].imageID;
                    this._viewUI.name_lab.text = name;
                    this._viewUI.name_lab.centerX = 0;
                    this._viewUI.skillIocn_img.skin = "common/icon/skill/" + imageID + ".png";
                    var bgHeight = this._viewUI.bg_img.height;
                    this._viewUI.skillDescribe_html.innerHTML = desc;
                    if (this._viewUI.skillDescribe_html.height > this.minHtmlHeight) {
                        this._viewUI.bg_img.height = bgHeight - this.minHtmlHeight + this._viewUI.skillDescribe_html.height;
                    }
                    this._viewUI.bg_img.centerY = 0;
                };
                /**关闭tips */
                SkillDescribeMediator.prototype.closeTips = function () {
                    tips.models.TipsProxy.getInstance().event(tips.models.CLOSE_TIPS);
                };
                SkillDescribeMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                };
                SkillDescribeMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                SkillDescribeMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return SkillDescribeMediator;
            }(game.modules.UiMediator));
            tips.SkillDescribeMediator = SkillDescribeMediator;
        })(tips = modules.tips || (modules.tips = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=SkillDescribeMediator.js.map