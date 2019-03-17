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
            _this._bgcolor = new Vector3D(11, 11, 11);
            return _this;
        }
        ScenePojectMeshView.prototype.getView = function () {
            var ary = [
                { Type: ReflectionData.TEXT, Label: "场景名字:", FunKey: "mapname", target: this, Category: "属性" },
                { Type: ReflectionData.Vec3Color, Label: "背景颜色:", FunKey: "bgcolor", target: this, Step: 0.1, Category: "属性" },
                { Type: ReflectionData.Vec3, Label: "坐标:", FunKey: "campos", target: this, Step: 1, Category: "镜头" },
                { Type: ReflectionData.Vec3, Label: "角度:", FunKey: "camrotation", target: this, Step: 1, Category: "镜头" },
            ];
            return ary;
        };
        Object.defineProperty(ScenePojectMeshView.prototype, "mapname", {
            get: function () {
                return "test.map";
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
                console.log(this._data);
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