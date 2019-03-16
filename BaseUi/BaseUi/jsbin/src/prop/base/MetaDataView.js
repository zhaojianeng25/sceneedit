var prop;
(function (prop) {
    var MetaDataView = /** @class */ (function () {
        function MetaDataView() {
            this._top = 0;
            this._width = 100;
            this._height = 100;
            this.categoryKey = {};
            this.hideCategoryKey = {};
            this.creat(this.getView());
        }
        Object.defineProperty(MetaDataView.prototype, "top", {
            get: function () {
                return this._top;
            },
            set: function (value) {
                this._top = value;
                this.resize();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MetaDataView.prototype, "width", {
            get: function () {
                return this._width;
            },
            set: function (value) {
                this._width = value;
                this.resize();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MetaDataView.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (value) {
                this._height = value;
                this.resize();
            },
            enumerable: true,
            configurable: true
        });
        MetaDataView.prototype.getView = function () {
            var ary = [];
            return ary;
        };
        Object.defineProperty(MetaDataView.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
                this.refreshViewValue();
            },
            enumerable: true,
            configurable: true
        });
        MetaDataView.prototype.creat = function (data) {
            this.ui = new Array;
            this.categoryKey = {};
            for (var i = 0; i < data.length; i++) {
                if (data[i].Category && !this.categoryKey[data[i].Category]) {
                    this.categoryKey[data[i].Category] = true;
                    var tempCategory2DUI = this.getCategoryUI(data[i].Category);
                    tempCategory2DUI.data = this.hideCategoryKey[data[i].Category];
                    this.ui.push(tempCategory2DUI);
                }
                if (!Boolean(this.hideCategoryKey[data[i].Category])) {
                    this.ui.push(this.creatComponent(data[i]));
                }
            }
            this.addComponentView();
        };
        MetaDataView.prototype.categoryClikUp = function (value) {
            this.destory();
            this.hideCategoryKey[value] = !this.hideCategoryKey[value];
            this.creat(this.getView());
            this.refreshViewValue();
            this.categoryFun && this.categoryFun();
        };
        MetaDataView.prototype.addComponentView = function () {
            this.resize();
        };
        MetaDataView.prototype.resize = function () {
            var ty = this._top;
            for (var i = 0; this.ui && i < this.ui.length; i++) {
                this.ui[i].y = ty;
                this.ui[i].x = 20;
                ty += this.ui[i].height;
                this.ui[i].width = this.width;
                this.ui[i].resize();
            }
            this._height = ty - this._top;
        };
        MetaDataView.prototype.creatComponent = function (obj) {
            var type = obj[prop.ReflectionData.Key_Type];
            if (type == prop.ReflectionData.NumberInput) {
                return this.getNumComponent(obj);
            }
            if (type == prop.ReflectionData.AgalFunUI) {
                return this.getAgalFunComponent(obj);
            }
            if (type == prop.ReflectionData.Texturue2DUI) {
                return this.getTexturue2DUI(obj);
            }
            if (type == prop.ReflectionData.MaterialPicUi) {
                return this.getMaterialPicUi(obj);
            }
            if (type == prop.ReflectionData.ComboBox) {
                return this.getComboBox(obj);
            }
            if (type == prop.ReflectionData.Vec3Color) {
                return this.getVec3Color(obj);
            }
            if (type == prop.ReflectionData.Vec3) {
                return this.getVec3(obj);
            }
            if (type == prop.ReflectionData.TEXT) {
                return this.getTextField2DUI(obj);
            }
            return null;
        };
        MetaDataView.prototype.getCategoryUI = function (value) {
            var _this = this;
            var $category2DUI = new prop.Category2DUI();
            $category2DUI.label = value;
            $category2DUI.changFun = function (value) { _this.categoryClikUp(value); };
            return $category2DUI;
        };
        MetaDataView.prototype.getTextField2DUI = function ($obj) {
            var $textCtrlInput = new prop.TextField2DUI();
            $textCtrlInput.label = $obj[prop.ReflectionData.Key_Label];
            $textCtrlInput.FunKey = $obj[prop.ReflectionData.FunKey];
            $textCtrlInput.target = this;
            return $textCtrlInput;
        };
        MetaDataView.prototype.getVec3 = function ($obj) {
            var $textCtrlInput = new prop.Vec3dCtrlUI();
            $textCtrlInput.label = $obj[prop.ReflectionData.Key_Label];
            $textCtrlInput.FunKey = $obj[prop.ReflectionData.FunKey];
            if ($obj[prop.ReflectionData.Key_Step]) {
                $textCtrlInput.KeyStep = $obj[prop.ReflectionData.Key_Step];
            }
            else {
                $textCtrlInput.KeyStep = 1;
            }
            $textCtrlInput.target = this;
            return $textCtrlInput;
        };
        MetaDataView.prototype.getVec3Color = function ($obj) {
            var $textCtrlInput = new prop.Vec3ColorCtrlUI();
            $textCtrlInput.label = $obj[prop.ReflectionData.Key_Label];
            $textCtrlInput.FunKey = $obj[prop.ReflectionData.FunKey];
            if ($obj[prop.ReflectionData.Key_Step]) {
                $textCtrlInput.KeyStep = $obj[prop.ReflectionData.Key_Step];
            }
            else {
                $textCtrlInput.KeyStep = 0.01;
            }
            $textCtrlInput.target = this;
            return $textCtrlInput;
        };
        MetaDataView.prototype.getComboBox = function ($obj) {
            var $ComBoBoxCtrl2D = new prop.ComBoBoxCtrl2D();
            $ComBoBoxCtrl2D.label = $obj[prop.ReflectionData.Key_Label];
            $ComBoBoxCtrl2D.FunKey = $obj[prop.ReflectionData.FunKey];
            $ComBoBoxCtrl2D.data = $obj[prop.ReflectionData.Key_Data];
            $ComBoBoxCtrl2D.target = this;
            return $ComBoBoxCtrl2D;
        };
        MetaDataView.prototype.getTexturue2DUI = function ($obj) {
            var $texturue2DUI = new prop.Texturue2DUI();
            $texturue2DUI.label = $obj[prop.ReflectionData.Key_Label];
            $texturue2DUI.suffix = $obj[prop.ReflectionData.Key_Suffix];
            $texturue2DUI.FunKey = $obj[prop.ReflectionData.FunKey];
            $texturue2DUI.target = this;
            return $texturue2DUI;
        };
        MetaDataView.prototype.getMaterialPicUi = function ($obj) {
            var $texturue2DUI = new prop.Material2DUI();
            $texturue2DUI.label = $obj[prop.ReflectionData.Key_Label];
            $texturue2DUI.suffix = $obj[prop.ReflectionData.Key_Suffix];
            $texturue2DUI.FunKey = $obj[prop.ReflectionData.FunKey];
            $texturue2DUI.changFun = $obj["changFun"];
            $texturue2DUI.target = this;
            return $texturue2DUI;
        };
        MetaDataView.prototype.getNumComponent = function ($obj) {
            var $textCtrlInput = new prop.TextCtrlInput();
            $textCtrlInput.label = $obj[prop.ReflectionData.Key_Label];
            $textCtrlInput.FunKey = $obj[prop.ReflectionData.FunKey];
            $textCtrlInput.KeyStep = $obj[prop.ReflectionData.Key_Step];
            $textCtrlInput.target = this;
            return $textCtrlInput;
        };
        MetaDataView.prototype.getAgalFunComponent = function ($obj) {
            var $textCtrlInput = new prop.AgalFunUI();
            $textCtrlInput.label = $obj[prop.ReflectionData.Key_Label];
            $textCtrlInput.FunKey = $obj[prop.ReflectionData.FunKey];
            $textCtrlInput.KeyStep = $obj[prop.ReflectionData.Key_Step];
            $textCtrlInput.target = this;
            return $textCtrlInput;
        };
        MetaDataView.prototype.refreshViewValue = function () {
            for (var i = 0; i < this.ui.length; i++) {
                this.ui[i].refreshViewValue();
            }
            this.resize();
        };
        MetaDataView.prototype.destory = function () {
            while (this.ui.length) {
                var $ui = this.ui.pop();
                $ui.destory();
            }
        };
        return MetaDataView;
    }());
    prop.MetaDataView = MetaDataView;
})(prop || (prop = {}));
//# sourceMappingURL=MetaDataView.js.map