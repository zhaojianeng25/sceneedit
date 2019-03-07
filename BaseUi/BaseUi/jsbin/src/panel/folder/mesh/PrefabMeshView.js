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
    var MetaDataView = prop.MetaDataView;
    var ReflectionData = prop.ReflectionData;
    var PrefabMeshView = /** @class */ (function (_super) {
        __extends(PrefabMeshView, _super);
        function PrefabMeshView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PrefabMeshView.prototype.getView = function () {
            var _this = this;
            var ary = [
                { Type: ReflectionData.MaterialPicUi, Label: "纹理:", FunKey: "texture", changFun: function (value) { _this.textureChangeInfo(value); }, target: this, Suffix: "material", Category: "属性" },
                { Type: ReflectionData.Texturue2DUI, Label: "模型:", FunKey: "objsurl", target: this, Suffix: "objs", Category: "属性" },
                { Type: ReflectionData.Vec3Color, Label: "名字:", FunKey: "sunColor", target: this, Step: 0.1 },
            ];
            return ary;
        };
        PrefabMeshView.prototype.textureChangeInfo = function (value) {
            this.prefabStaticMesh.paramInfo = value;
            this.prefabStaticMesh.needSave = true;
        };
        PrefabMeshView.prototype.getParamItem = function (value) {
            for (var i = 0; this.prefabStaticMesh.paramInfo && i < this.prefabStaticMesh.paramInfo.length; i++) {
                if (this.prefabStaticMesh.paramInfo[i].paramName == value) {
                    return this.prefabStaticMesh.paramInfo[i].data;
                }
            }
            return null;
        };
        Object.defineProperty(PrefabMeshView.prototype, "texture", {
            get: function () {
                return this.prefabStaticMesh.material;
            },
            set: function (value) {
                this.prefabStaticMesh.material = value;
                this.refreshViewValue();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PrefabMeshView.prototype, "objsurl", {
            get: function () {
                return this.prefabStaticMesh.objsurl;
            },
            set: function (value) {
                this.prefabStaticMesh.objsurl = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PrefabMeshView.prototype, "picurl", {
            get: function () {
                return "c.png";
            },
            set: function (value) {
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
                this.refreshViewValue();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PrefabMeshView.prototype, "sunColor", {
            get: function () {
                return this.prefabStaticMesh.sunColor;
            },
            set: function (value) {
                this.prefabStaticMesh.sunColor = value;
                console.log("颜色变化");
            },
            enumerable: true,
            configurable: true
        });
        PrefabMeshView.prototype.saveToSever = function () {
            if (this.prefabStaticMesh.needSave) {
                console.log("保存", this.prefabStaticMesh);
                var $byte = new Pan3d.Pan3dByteArray();
                var $fileName = "newfiletxt.prefab";
                var $obj = JSON.stringify(this.prefabStaticMesh);
                $byte.writeUTF($obj);
                var $file = new File([$byte.buffer], $fileName);
                var pathurl = Pan3d.Scene_data.fileRoot.replace(Pan3d.Scene_data.ossRoot, "");
                filemodel.FileModel.getInstance().upOssFile($file, pathurl + $file.name, function () {
                    console.log("更新Prafab完成", pathurl + $file.name);
                });
            }
            else {
                console.log("不需要改变");
            }
            //materialInfoArr: undefined
            //name: "temp.prefab"
            //objsurl: "ccsss.objs"
            //textureurl: "texture/5.material"
        };
        return PrefabMeshView;
    }(MetaDataView));
    filelist.PrefabMeshView = PrefabMeshView;
})(filelist || (filelist = {}));
//# sourceMappingURL=PrefabMeshView.js.map