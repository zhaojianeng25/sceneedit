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
var materialleft;
(function (materialleft) {
    var Scene_data = Pan3d.Scene_data;
    var Vector3D = Pan3d.Vector3D;
    var MetaDataView = prop.MetaDataView;
    var ReflectionData = prop.ReflectionData;
    var MateriaMeshView = /** @class */ (function (_super) {
        __extends(MateriaMeshView, _super);
        function MateriaMeshView(value) {
            return _super.call(this, value) || this;
        }
        Object.defineProperty(MateriaMeshView.prototype, "top", {
            set: function (value) {
                this._top = value;
                this.resize();
                console.log("MateriaMeshView", this._top);
            },
            enumerable: true,
            configurable: true
        });
        MateriaMeshView.prototype.getView = function () {
            var ary = [
                { Type: ReflectionData.MeshMaterialLeft2DUI, Label: "窗口:", FunKey: "materialTree", target: this, Category: "模型" },
                {
                    Type: ReflectionData.ComboBox, Label: "渲染模式:", FunKey: "blendMode", target: this, Data: [
                        { name: "普通模式", type: 0 },
                        { name: "透明模式", type: 1 },
                        { name: "叠加模式", type: 2 }
                    ],
                    Category: "设置"
                },
                { Type: ReflectionData.CheckBox, Label: "深度测试:", FunKey: "testzbuff", target: this, Category: "设置" },
                { Type: ReflectionData.CheckBox, Label: "写入深度:", FunKey: "writeZbuffer", target: this, Category: "设置" },
                { Type: ReflectionData.CheckBox, Label: "点灯光:", FunKey: "pointlight", target: this, Category: "设置" },
                { Type: ReflectionData.Vec3Color, Label: "模型列表:", FunKey: "sunDirect", target: this, Step: 0.1, Category: "属性" },
                { Type: ReflectionData.Vec3Color, Label: "sun颜色:", FunKey: "sunColor", target: this, Step: 0., Category: "属性" },
                { Type: ReflectionData.Vec3Color, Label: "基本颜色:", FunKey: "ambientColor", target: this, Step: 0.1, Category: "属性" },
            ];
            return ary;
        };
        Object.defineProperty(MateriaMeshView.prototype, "materialTree", {
            get: function () {
                return this._materialTree;
            },
            set: function (value) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MateriaMeshView.prototype, "blendMode", {
            get: function () {
                return this._materialTree.blendMode;
            },
            set: function (value) {
                this._materialTree.blendMode = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MateriaMeshView.prototype, "testzbuff", {
            get: function () {
                return this._materialTree.zbuff;
            },
            set: function (value) {
                this._materialTree.zbuff = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MateriaMeshView.prototype, "writeZbuffer", {
            get: function () {
                return this._materialTree.writeZbuffer;
            },
            set: function (value) {
                this._materialTree.writeZbuffer = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MateriaMeshView.prototype, "pointlight", {
            get: function () {
                return this._materialTree.pointlight;
            },
            set: function (value) {
                this._materialTree.pointlight = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MateriaMeshView.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
                this._materialTree = value;
                this.refreshViewValue();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MateriaMeshView.prototype, "sunDirect", {
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
        Object.defineProperty(MateriaMeshView.prototype, "sunColor", {
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
        Object.defineProperty(MateriaMeshView.prototype, "ambientColor", {
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
        MateriaMeshView.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        return MateriaMeshView;
    }(MetaDataView));
    materialleft.MateriaMeshView = MateriaMeshView;
})(materialleft || (materialleft = {}));
//# sourceMappingURL=MateriaMeshView.js.map