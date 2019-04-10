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
var maineditor;
(function (maineditor) {
    var Display3DSprite = Pan3d.Display3DSprite;
    var SkillSpriteDisplay = /** @class */ (function (_super) {
        __extends(SkillSpriteDisplay, _super);
        function SkillSpriteDisplay() {
            var _this = _super.call(this) || this;
            _this.waitLoadUrl = [];
            return _this;
        }
        SkillSpriteDisplay.prototype.addSkillByUrl = function ($url) {
            if (this._scene) {
                this.loadTempByUrl($url);
            }
            else {
                this.waitLoadUrl.push($url);
            }
        };
        SkillSpriteDisplay.prototype.addStage = function () {
            _super.prototype.addStage.call(this);
            while (this.waitLoadUrl.length) {
                this.loadTempByUrl(this.waitLoadUrl.pop());
            }
        };
        SkillSpriteDisplay.prototype.loadTempByUrl = function (value) {
            var tempScene = this._scene;
            var $skill = tempScene.skillManager.getSkill(value, "skill_0022");
            var mainChar = new left.MaterialRoleSprite();
            tempScene.addMovieDisplay(mainChar);
            if ($skill) {
                $skill.reset();
                $skill.isDeath = false;
            }
            mainChar.playSkill($skill);
        };
        return SkillSpriteDisplay;
    }(Display3DSprite));
    maineditor.SkillSpriteDisplay = SkillSpriteDisplay;
})(maineditor || (maineditor = {}));
//# sourceMappingURL=SkillSpriteDisplay.js.map