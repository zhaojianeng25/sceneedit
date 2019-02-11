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
    var ResponseSprite = /** @class */ (function (_super) {
        __extends(ResponseSprite, _super);
        function ResponseSprite() {
            var _this = _super.call(this) || this;
            _this.widthNum = 30;
            _this.baseHeightNum = 20;
            return _this;
        }
        Object.defineProperty(ResponseSprite.prototype, "spWidth", {
            get: function () {
                return this._spWidth;
            },
            set: function (value) {
                this._spWidth = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResponseSprite.prototype, "spHeight", {
            get: function () {
                return this._spHeight;
            },
            set: function (value) {
                this._spHeight = value;
            },
            enumerable: true,
            configurable: true
        });
        return ResponseSprite;
    }(Pan3d.UICompenent));
    layout.ResponseSprite = ResponseSprite;
})(layout || (layout = {}));
//# sourceMappingURL=ResponseSprite.js.map