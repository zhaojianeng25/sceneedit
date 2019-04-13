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
            _this.skipNum = 0;
            _this.waitLoadUrl = [];
            _this.roleChar = new left.MaterialRoleSprite();
            return _this;
        }
        SkillSpriteDisplay.prototype.updateMatrix = function () {
            _super.prototype.updateMatrix.call(this);
            this.roleChar.x = this.x;
            this.roleChar.y = this.y;
            this.roleChar.z = this.z;
            //this.roleChar.scaleX = 1
            //this.roleChar.scaleY =1
            //this.roleChar.scaleZ = 1
            this.roleChar.rotationX = this.rotationX;
            this.roleChar.rotationY = this.rotationY;
            this.roleChar.rotationZ = this.rotationZ;
        };
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
            var skillNameItem = [];
            for (var tempKey in Pan3d.SkillManager.getInstance()._skillDic) {
                var keyStr = tempKey;
                if (keyStr.indexOf(this.skillStaticMesh.skillUrl) != -1) {
                    var skillname = keyStr.replace(this.skillStaticMesh.skillUrl, "");
                    skillNameItem.push(skillname);
                }
            }
            if (skillNameItem.length) {
                var playName = skillNameItem[this.skipNum % skillNameItem.length];
                var $skill = tempScene.skillManager.getSkill(this.skillStaticMesh.skillUrl, playName); //skill_0022
                if ($skill) {
                    $skill.reset();
                    $skill.isDeath = false;
                }
                $skill.configFixEffect(this.roleChar);
                tempScene.skillManager.playSkill($skill);
                this.skipNum++;
            }
            Pan3d.TimeUtil.addTimeOut(5 * 1000, function () {
                _this.playNextSkill();
            });
        };
        SkillSpriteDisplay.prototype.loadTempByUrl = function (value) {
            var _this = this;
            pack.PackSkillManager.getInstance().getPrefabByUrl(value, function (temp) {
                _this.skillStaticMesh = temp;
                _this.skillStaticMesh.roleUrl = "pefab/上杉谦信/ssqx.zzw";
                //      this.skillStaticMesh.skillUrl = "pefab/技能/ssqx.txt"
                _this.skillStaticMesh.skillUrl = "skill/上杉谦信_byte.txt";
                var tempScene = _this._scene;
                _this.roleChar.setRoleZwwUrl(_this.skillStaticMesh.roleUrl);
                tempScene.addMovieDisplay(_this.roleChar);
                _this.roleChar.scale = 0.3;
                var tempScene = _this._scene;
                tempScene.skillManager.preLoadSkill(_this.skillStaticMesh.skillUrl);
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