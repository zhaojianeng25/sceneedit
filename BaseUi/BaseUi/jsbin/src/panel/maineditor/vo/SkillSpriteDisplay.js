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
            _this.roleChar = new layapan.LayaSceneChar();
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
        SkillSpriteDisplay.prototype.playNextSkill = function () {
            var _this = this;
            var tempScene = this._scene;
            var $skill = tempScene.skillManager.getSkill(this.skillStaticMesh.skillUrl, "skill_0022");
            if ($skill) {
                $skill.reset();
                $skill.isDeath = false;
            }
            $skill.configFixEffect(this.roleChar);
            tempScene.skillManager.playSkill($skill);
            Pan3d.TimeUtil.addTimeOut(5 * 1000, function () {
                _this.playNextSkill();
            });
            console.log("播放技能", $skill);
        };
        SkillSpriteDisplay.prototype.loadTempByUrl = function (value) {
            var _this = this;
            pack.PackSkillManager.getInstance().getPrefabByUrl(value, function (temp) {
                _this.skillStaticMesh = temp;
                _this.skillStaticMesh.roleUrl = "role/ssqx.txt";
                _this.skillStaticMesh.skillUrl = "pefab/技能/ssqx.txt";
                _this.skillStaticMesh.skillUrl = "skill/上杉谦信_byte.txt";
                var tempScene = _this._scene;
                _this.roleChar.setRoleUrl(_this.skillStaticMesh.roleUrl);
                tempScene.addMovieDisplay(_this.roleChar);
                _this.playNextSkill();
            });
            /*
 

*/
        };
        return SkillSpriteDisplay;
    }(Display3DSprite));
    maineditor.SkillSpriteDisplay = SkillSpriteDisplay;
})(maineditor || (maineditor = {}));
//# sourceMappingURL=SkillSpriteDisplay.js.map