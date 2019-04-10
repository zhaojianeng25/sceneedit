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
            return _super.call(this) || this;
        }
        SkillSpriteDisplay.prototype.addSkillByUrl = function (value) {
            console.log("value", value);
        };
        return SkillSpriteDisplay;
    }(Display3DSprite));
    maineditor.SkillSpriteDisplay = SkillSpriteDisplay;
})(maineditor || (maineditor = {}));
//# sourceMappingURL=SkillSpriteDisplay.js.map