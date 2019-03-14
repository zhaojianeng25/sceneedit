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
    var CombineReflectionView = /** @class */ (function (_super) {
        __extends(CombineReflectionView, _super);
        function CombineReflectionView() {
            var _this = _super.call(this) || this;
            _this.list = [];
            return _this;
        }
        CombineReflectionView.prototype.addView = function ($view) {
            this.list.push($view);
        };
        CombineReflectionView.prototype.refreshViewValue = function () {
            for (var i = 0; i < this.list.length; i++) {
                this.list[i].top = i * 100 + this.top;
                this.list[i].refreshViewValue();
            }
            _super.prototype.refreshViewValue.call(this);
        };
        CombineReflectionView.prototype.destory = function () {
            while (this.list.length) {
                var temp = this.list.pop();
                temp.destory();
            }
            _super.prototype.destory.call(this);
        };
        CombineReflectionView.prototype.resize = function () {
            _super.prototype.resize.call(this);
            for (var i = 0; this.list && i < this.list.length; i++) {
                this.list[i].width = this.width;
                this.list[i].resize();
            }
        };
        return CombineReflectionView;
    }(prop.MetaDataView));
    prop.CombineReflectionView = CombineReflectionView;
})(prop || (prop = {}));
//# sourceMappingURL=CombineReflectionView.js.map