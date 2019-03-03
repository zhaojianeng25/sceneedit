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
    var MaterialParamUi = /** @class */ (function (_super) {
        __extends(MaterialParamUi, _super);
        function MaterialParamUi() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MaterialParamUi.prototype.initView = function () {
            this.height = 100;
            this.uiItem = [];
        };
        MaterialParamUi.prototype.setData = function ($materialTree, $prefabStaticMesh) {
            this.destory();
            for (var i = 0; i < $materialTree.data.length; i++) {
                if ($materialTree.data[i].data.isDynamic) {
                    if ($materialTree.data[i].type == "tex") {
                        var temp = new prop.Texturue2DUI();
                        temp.target = $materialTree.data[i].data;
                        temp.label = $materialTree.data[i].data.name;
                        temp.FunKey = "url";
                        this.uiItem.push(temp);
                    }
                }
            }
            this.refreshViewValue();
        };
        Object.defineProperty(MaterialParamUi.prototype, "paramInfo", {
            get: function () {
                return "c.png";
            },
            set: function (value) {
            },
            enumerable: true,
            configurable: true
        });
        MaterialParamUi.prototype.refreshViewValue = function () {
            for (var i = 0; i < this.uiItem.length; i++) {
                this.uiItem[i].refreshViewValue();
            }
        };
        MaterialParamUi.prototype.destory = function () {
            for (var i = 0; i < this.uiItem.length; i++) {
                this.uiItem[i].destory();
            }
            this.uiItem = [];
        };
        Object.defineProperty(MaterialParamUi.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaterialParamUi.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (value) {
                this._x = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaterialParamUi.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (value) {
                this._y = value;
                var ty = 10;
                this.height = 60;
                for (var i = 0; i < this.uiItem.length; i++) {
                    this.uiItem[i].y = this.y + ty;
                    if (this.uiItem[i] instanceof prop.Texturue2DUI) {
                        ty += 30;
                        this.uiItem[i].x = 10;
                    }
                    if (this.uiItem[i] instanceof prop.Texturue2DUI) {
                        ty += 70;
                        this.uiItem[i].x = 50;
                        this.height += 70;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaterialParamUi.prototype, "label", {
            get: function () {
                return this._label;
            },
            set: function (value) {
                this._label = value;
            },
            enumerable: true,
            configurable: true
        });
        return MaterialParamUi;
    }(prop.BaseReflComponent));
    prop.MaterialParamUi = MaterialParamUi;
})(prop || (prop = {}));
//# sourceMappingURL=MaterialParamUi.js.map