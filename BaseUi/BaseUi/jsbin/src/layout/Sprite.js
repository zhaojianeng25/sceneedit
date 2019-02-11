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
var layout;
(function (layout) {
    var Rectangle = Pan3d.Rectangle;
    var Sprite = /** @class */ (function (_super) {
        __extends(Sprite, _super);
        function Sprite() {
            var _this = _super.call(this) || this;
            _this.rect = new Rectangle(0, 0, 250, 250);
            _this.winBg = new layout.LayBaseTab();
            _this.addUIContainer(_this.winBg);
            _this.changeSize();
            return _this;
        }
        Sprite.prototype.update = function () {
            for (var i = 0; i < this.winBg.renderList.length; i++) {
                this.winBg.renderList[i].update();
            }
            _super.prototype.update.call(this);
        };
        Sprite.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        Object.defineProperty(Sprite.prototype, "x", {
            get: function () {
                return this.rect.x;
            },
            set: function (value) {
                this.rect.x = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Sprite.prototype, "y", {
            get: function () {
                return this.rect.y;
            },
            set: function (value) {
                this.rect.y = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Sprite.prototype, "width", {
            get: function () {
                return this.rect.width;
            },
            set: function (value) {
                this.rect.width = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Sprite.prototype, "height", {
            get: function () {
                return this.rect.height;
            },
            set: function (value) {
                this.rect.height = value;
            },
            enumerable: true,
            configurable: true
        });
        Sprite.prototype.changeSize = function () {
            this.winBg.pageRect = this.rect;
        };
        return Sprite;
    }(layout.LayUIManager));
    layout.Sprite = Sprite;
})(layout || (layout = {}));
//# sourceMappingURL=Sprite.js.map