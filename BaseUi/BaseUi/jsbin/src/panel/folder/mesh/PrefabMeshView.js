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
var filelist;
(function (filelist) {
    var Vector3D = Pan3d.Vector3D;
    var MetaDataView = prop.MetaDataView;
    var ReflectionData = prop.ReflectionData;
    var PrefabMeshView = /** @class */ (function (_super) {
        __extends(PrefabMeshView, _super);
        function PrefabMeshView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PrefabMeshView.prototype.getView = function () {
            var ary = [
                { Type: ReflectionData.Texturue2DUI, Label: "纹理:", FunKey: "picurl", target: this, Category: "属性" },
                { Type: ReflectionData.Texturue2DUI, Label: "动态:", FunKey: "otherurl", target: this, Category: "属性" },
                { Type: ReflectionData.Vec3Color, Label: "名字:", FunKey: "sunDirect", target: this, Step: 0.1 },
                { Type: ReflectionData.Vec3Color, Label: "sun颜色:", FunKey: "sunColor", target: this, Step: 0.1 },
            ];
            return ary;
        };
        Object.defineProperty(PrefabMeshView.prototype, "picurl", {
            get: function () {
                return this.prefabStaticMesh.pic1;
            },
            set: function (value) {
                this.prefabStaticMesh.pic1 = value;
                this.refreshViewValue();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PrefabMeshView.prototype, "otherurl", {
            get: function () {
                return this.prefabStaticMesh.pic2;
            },
            set: function (value) {
                this.prefabStaticMesh.pic2 = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PrefabMeshView.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
                this.prefabStaticMesh = this._data;
                console.log(this.prefabStaticMesh);
                this.refreshViewValue();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PrefabMeshView.prototype, "sunDirect", {
            get: function () {
                return new Vector3D();
            },
            set: function (value) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PrefabMeshView.prototype, "sunColor", {
            get: function () {
                return new Vector3D();
            },
            set: function (value) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PrefabMeshView.prototype, "ambientColor", {
            get: function () {
                return new Vector3D();
            },
            set: function (value) {
            },
            enumerable: true,
            configurable: true
        });
        return PrefabMeshView;
    }(MetaDataView));
    filelist.PrefabMeshView = PrefabMeshView;
})(filelist || (filelist = {}));
//# sourceMappingURL=PrefabMeshView.js.map