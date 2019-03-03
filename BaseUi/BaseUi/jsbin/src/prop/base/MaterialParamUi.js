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
        MaterialParamUi.prototype.getParamTaget = function (paramName) {
            for (var i = 0; this.prefabStaticMesh.materialInfoArr && i < this.prefabStaticMesh.materialInfoArr.length; i++) {
                if (this.prefabStaticMesh.materialInfoArr[i].paramName == paramName) {
                    return this.prefabStaticMesh.materialInfoArr[i];
                }
            }
            return null;
        };
        MaterialParamUi.prototype.setData = function ($materialTree, $prefabStaticMesh) {
            var _this = this;
            this.destory();
            this.prefabStaticMesh = $prefabStaticMesh;
            if (this.prefabStaticMesh.materialInfoArr) {
                console.log(this.prefabStaticMesh.materialInfoArr);
            }
            var $changFun = function (value) { _this.changeDataEvtFun(value); };
            for (var i = 0; i < $materialTree.data.length; i++) {
                if ($materialTree.data[i].data.isDynamic) {
                    var tempBaseReflComponent;
                    if ($materialTree.data[i].type == materialui.NodeTree.TEX) {
                        tempBaseReflComponent = new prop.Texturue2DUI();
                        tempBaseReflComponent.FunKey = "url";
                    }
                    if ($materialTree.data[i].type == materialui.NodeTree.VEC3) {
                        tempBaseReflComponent = new prop.Vec3ColorCtrlUI();
                        tempBaseReflComponent.FunKey = "constValue";
                    }
                    if ($materialTree.data[i].type == materialui.NodeTree.FLOAT) {
                        tempBaseReflComponent = new prop.TextCtrlInput();
                        tempBaseReflComponent.FunKey = "constValue";
                    }
                    if (tempBaseReflComponent) {
                        var tempTaget = this.getParamTaget($materialTree.data[i].data.paramName);
                        if (tempTaget) {
                            tempBaseReflComponent.target = tempTaget;
                        }
                        else {
                            tempBaseReflComponent.target = $materialTree.data[i].data;
                        }
                        tempBaseReflComponent.label = $materialTree.data[i].data.paramName;
                        tempBaseReflComponent.changFun = $changFun;
                        this.uiItem.push(tempBaseReflComponent);
                    }
                }
            }
            this.refreshViewValue();
        };
        MaterialParamUi.prototype.changeDataEvtFun = function (temp) {
            var infoArr = [];
            for (var i = 0; i < this.uiItem.length; i++) {
                if (this.uiItem[i].target.isDynamic) {
                    infoArr.push(this.uiItem[i].target);
                }
            }
            this.prefabStaticMesh.materialInfoArr = infoArr;
        };
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
                this.height = 50;
                for (var i = 0; i < this.uiItem.length; i++) {
                    this.uiItem[i].y = this.y + ty;
                    if (this.uiItem[i] instanceof prop.Vec3ColorCtrlUI) {
                        ty += 50;
                        this.uiItem[i].x = 50;
                        this.height += 50;
                    }
                    if (this.uiItem[i] instanceof prop.TextCtrlInput) {
                        ty += 50;
                        this.uiItem[i].x = 50;
                        this.height += 50;
                    }
                    if (this.uiItem[i] instanceof prop.Texturue2DUI) {
                        ty += 100;
                        this.uiItem[i].x = 50;
                        this.height += 100;
                    }
                }
                this.height += 50;
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