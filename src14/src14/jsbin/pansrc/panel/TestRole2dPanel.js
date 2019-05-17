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
var TestRole2dPanel = /** @class */ (function (_super) {
    __extends(TestRole2dPanel, _super);
    function TestRole2dPanel() {
        var _this = _super.call(this) || this;
        _this.ape = new BaseWinPanel();
        _this.addChild(_this.ape);
        _this.ape.pos(300, 100);
        _this.layaSceneLevel = new BaseLaya3dSprite();
        _this.addChild(_this.layaSceneLevel);
        return _this;
    }
    TestRole2dPanel.prototype.render = function (context, x, y) {
        _super.prototype.render.call(this, context, x, y);
        this.layaSceneLevel.x = this.ape.x;
        this.layaSceneLevel.y = this.ape.y;
    };
    TestRole2dPanel.prototype.addSceneChar = function (value) {
        this.layaSceneLevel.scene.addMovieDisplay(value);
    };
    TestRole2dPanel.prototype.removeSceneChar = function (value) {
        this.layaSceneLevel.scene.removeMovieDisplay(value);
    };
    return TestRole2dPanel;
}(Laya.Sprite));
//# sourceMappingURL=TestRole2dPanel.js.map