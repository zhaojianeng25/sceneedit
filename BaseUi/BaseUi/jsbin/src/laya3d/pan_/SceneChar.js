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
* name
*/
var pan;
(function (pan) {
    var SceneChar = /** @class */ (function (_super) {
        __extends(SceneChar, _super);
        function SceneChar() {
            return _super.call(this) || this;
        }
        return SceneChar;
    }(LayaPan3D.LayaScene2dSceneChar));
    pan.SceneChar = SceneChar;
})(pan || (pan = {}));
//# sourceMappingURL=SceneChar.js.map