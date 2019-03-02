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
    var Material2DUI = /** @class */ (function (_super) {
        __extends(Material2DUI, _super);
        function Material2DUI() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Material2DUI.prototype.initView = function () {
            _super.prototype.initView.call(this);
            this.height = 200;
        };
        Object.defineProperty(Material2DUI.prototype, "data", {
            set: function (value) {
                this._data = value;
                console.log("data", value);
            },
            enumerable: true,
            configurable: true
        });
        Material2DUI.prototype.refreshViewValue = function () {
            _super.prototype.refreshViewValue.call(this);
            console.log("材质对象");
        };
        return Material2DUI;
    }(prop.Texturue2DUI));
    prop.Material2DUI = Material2DUI;
})(prop || (prop = {}));
//# sourceMappingURL=Material2DUI.js.map