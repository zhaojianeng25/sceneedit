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
var maineditor;
(function (maineditor) {
    var Vector3D = Pan3d.Vector3D;
    var MetaDataView = prop.MetaDataView;
    var ReflectionData = prop.ReflectionData;
    var ScenePojectMeshView = /** @class */ (function (_super) {
        __extends(ScenePojectMeshView, _super);
        function ScenePojectMeshView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.isShowGridLine = false;
            _this._bgcolor = new Vector3D(11, 11, 11);
            return _this;
        }
        ScenePojectMeshView.prototype.getView = function () {
            var _this = this;
            var ary = [
                { Type: ReflectionData.TEXT, Label: "场景名字:", FunKey: "mapname", target: this, Category: "属性" },
                { Type: ReflectionData.Vec3Color, Label: "背景颜色:", FunKey: "bgcolor", target: this, Step: 0.1, Category: "属性" },
                { Type: ReflectionData.ComboBox, Label: "坐标网格:", FunKey: "gridline", target: this, Data: [{ name: "false", type: 0 }, { name: "true", type: 1 }] },
                { Type: ReflectionData.Vec3, Label: "坐标:", FunKey: "campos", target: this, Step: 1, Category: "镜头" },
                { Type: ReflectionData.Vec3, Label: "角度:", FunKey: "camrotation", target: this, Step: 1, Category: "镜头" },
                { Type: ReflectionData.MaterialPicUi, Label: "纹理:", FunKey: "texture", changFun: function (value) { _this.textureChangeInfo(value); }, target: this, Suffix: "material", Category: "后期" },
            ];
            return ary;
        };
        Object.defineProperty(ScenePojectMeshView.prototype, "gridline", {
            get: function () {
                return this.isShowGridLine ? 1 : 0;
            },
            set: function (value) {
                this.isShowGridLine = value == 1;
                if (!this.gridLineSprite) {
                    this.gridLineSprite = new Pan3d.GridLineSprite();
                }
                if (this.isShowGridLine) {
                    maineditor.MainEditorProcessor.edItorSceneManager.addDisplay(this.gridLineSprite);
                }
                else {
                    maineditor.MainEditorProcessor.edItorSceneManager.removeDisplay(this.gridLineSprite);
                }
                this.refreshViewValue();
            },
            enumerable: true,
            configurable: true
        });
        ScenePojectMeshView.prototype.textureChangeInfo = function (value) {
        };
        ScenePojectMeshView.prototype.getParamItem = function (value) {
            return null;
        };
        Object.defineProperty(ScenePojectMeshView.prototype, "texture", {
            get: function () {
                //console.log("材质", this.data.material)
                return this.data.material;
            },
            set: function (value) {
                this.data.material = value;
                this.gridline = 1;
                this.refreshViewValue();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScenePojectMeshView.prototype, "mapname", {
            get: function () {
                return BaseUiStart.mapOpenUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScenePojectMeshView.prototype, "data", {
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
        Object.defineProperty(ScenePojectMeshView.prototype, "campos", {
            get: function () {
                return new Vector3D();
            },
            set: function (value) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScenePojectMeshView.prototype, "bgcolor", {
            get: function () {
                return this._bgcolor;
            },
            set: function (value) {
                this._bgcolor = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScenePojectMeshView.prototype, "camrotation", {
            get: function () {
                return new Vector3D();
            },
            set: function (value) {
            },
            enumerable: true,
            configurable: true
        });
        return ScenePojectMeshView;
    }(MetaDataView));
    maineditor.ScenePojectMeshView = ScenePojectMeshView;
})(maineditor || (maineditor = {}));
//# sourceMappingURL=ScenePojectMeshView.js.map