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
            _this.children = [];
            return _this;
        }
        Sprite.prototype.addChild = function (value) {
            value.perent = this;
            this.children.push(value);
        };
        Sprite.prototype.update = function () {
            _super.prototype.update.call(this);
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].update();
            }
        };
        Sprite.prototype.resize = function () {
            _super.prototype.resize.call(this);
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].resize();
            }
        };
        Object.defineProperty(Sprite.prototype, "x", {
            get: function () {
                return this.rect.x;
            },
            set: function (value) {
                this.rect.x = value;
                this.changeSize();
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
                this.changeSize();
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
                this.changeSize();
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
                this.changeSize();
            },
            enumerable: true,
            configurable: true
        });
        Sprite.prototype.mouseEvetData = function (evt, point) {
            for (var i = this.children.length - 1; i >= 0; i--) {
                var temp = this.children[i].mouseEvetData(evt, point);
                if (temp) {
                    return temp;
                }
            }
            return _super.prototype.mouseEvetData.call(this, evt, point);
        };
        Sprite.prototype.changeSize = function () {
        };
        return Sprite;
    }(layout.LayUIManager));
    layout.Sprite = Sprite;
})(layout || (layout = {}));
//# sourceMappingURL=Sprite.js.map