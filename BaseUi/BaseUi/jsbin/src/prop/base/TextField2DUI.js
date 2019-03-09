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
var prop;
(function (prop) {
    var TextField2DUI = /** @class */ (function (_super) {
        __extends(TextField2DUI, _super);
        function TextField2DUI() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TextField2DUI.prototype.initView = function () {
            this.textLabelUI = new prop.TextLabelUI();
            this.inputTextUi = new prop.InputTextUi();
            this.height = 40;
        };
        TextField2DUI.prototype.destory = function () {
            this.textLabelUI.destory();
            this.inputTextUi.destory();
        };
        Object.defineProperty(TextField2DUI.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
            },
            enumerable: true,
            configurable: true
        });
        TextField2DUI.prototype.refreshViewValue = function () {
            this.inputTextUi.text = this.target[this.FunKey];
        };
        TextField2DUI.prototype.getNumStr = function (num) {
            var n = Math.floor(num * 100) / 100;
            return n.toString();
        };
        Object.defineProperty(TextField2DUI.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (value) {
                this._x = value;
                this.textLabelUI.x = this._x + 0;
                this.inputTextUi.x = this._x + 75;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextField2DUI.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (value) {
                this._y = value;
                this.textLabelUI.y = this._y;
                this.inputTextUi.y = this._y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextField2DUI.prototype, "label", {
            get: function () {
                return this._label;
            },
            set: function (value) {
                this._label = value;
                this.textLabelUI.label = value;
            },
            enumerable: true,
            configurable: true
        });
        return TextField2DUI;
    }(prop.BaseReflComponent));
    prop.TextField2DUI = TextField2DUI;
})(prop || (prop = {}));
//# sourceMappingURL=TextField2DUI.js.map