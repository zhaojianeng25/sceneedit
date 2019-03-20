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
var popmodel;
(function (popmodel) {
    var Scene_data = Pan3d.Scene_data;
    var Vector3D = Pan3d.Vector3D;
    var MetaDataView = prop.MetaDataView;
    var ReflectionData = prop.ReflectionData;
    var MetriMeshSprite = /** @class */ (function (_super) {
        __extends(MetriMeshSprite, _super);
        function MetriMeshSprite() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MetriMeshSprite.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        return MetriMeshSprite;
    }(prop.UiMeshSprite));
    popmodel.MetriMeshSprite = MetriMeshSprite;
    var MetriSpriteMesh = /** @class */ (function (_super) {
        __extends(MetriSpriteMesh, _super);
        function MetriSpriteMesh(value) {
            return _super.call(this, value) || this;
        }
        MetriSpriteMesh.prototype.getView = function () {
            var ary = [
                { Type: ReflectionData.Vec3Color, Label: "模型列表:", FunKey: "sunDirect", target: this, Step: 0.1, Category: "属性" },
                { Type: ReflectionData.Vec3Color, Label: "sun颜色:", FunKey: "sunColor", target: this, Step: 0., Category: "属性" },
                { Type: ReflectionData.Vec3Color, Label: "基本颜色:", FunKey: "ambientColor", target: this, Step: 0.1, Category: "属性" },
                { Type: ReflectionData.Vec3Color, Label: "基本颜色:", FunKey: "ambientColor", target: this, Step: 0.1, Category: "属性" },
                { Type: ReflectionData.Vec3Color, Label: "基本颜色:", FunKey: "ambientColor", target: this, Step: 0.1, Category: "属性" },
                { Type: ReflectionData.Vec3Color, Label: "基本颜色:", FunKey: "ambientColor", target: this, Step: 0.1, Category: "属性" },
            ];
            return ary;
        };
        Object.defineProperty(MetriSpriteMesh.prototype, "data", {
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
        Object.defineProperty(MetriSpriteMesh.prototype, "sunDirect", {
            get: function () {
                return new Vector3D(Scene_data.light.sunDirect[0], Scene_data.light.sunDirect[1], Scene_data.light.sunDirect[2]);
            },
            set: function (value) {
                Scene_data.light.sunDirect[0] = value.x;
                Scene_data.light.sunDirect[1] = value.y;
                Scene_data.light.sunDirect[2] = value.z;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MetriSpriteMesh.prototype, "sunColor", {
            get: function () {
                return new Vector3D(Scene_data.light.sunColor[0], Scene_data.light.sunColor[1], Scene_data.light.sunColor[2]);
            },
            set: function (value) {
                Scene_data.light.sunColor[0] = value.x;
                Scene_data.light.sunColor[1] = value.y;
                Scene_data.light.sunColor[2] = value.z;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MetriSpriteMesh.prototype, "ambientColor", {
            get: function () {
                return new Vector3D(Scene_data.light.ambientColor[0], Scene_data.light.ambientColor[1], Scene_data.light.ambientColor[2]);
            },
            set: function (value) {
                Scene_data.light.ambientColor[0] = value.x;
                Scene_data.light.ambientColor[1] = value.y;
                Scene_data.light.ambientColor[2] = value.z;
            },
            enumerable: true,
            configurable: true
        });
        MetriSpriteMesh.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        return MetriSpriteMesh;
    }(MetaDataView));
    popmodel.MetriSpriteMesh = MetriSpriteMesh;
})(popmodel || (popmodel = {}));
//# sourceMappingURL=MetriSpriteMesh.js.map