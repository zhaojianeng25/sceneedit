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
    var RoleMeshView = /** @class */ (function (_super) {
        __extends(RoleMeshView, _super);
        function RoleMeshView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RoleMeshView.prototype.getView = function () {
            var _this = this;
            var ary = [
                { Type: ReflectionData.TEXT, Label: "名字:", FunKey: "prebaburl", target: this, Category: "模型" },
                { Type: ReflectionData.Texturue2DUI, Label: "模型:", FunKey: "objsurl", target: this, Suffix: "objs", Category: "模型" },
                { Type: ReflectionData.MaterialPicUi, Label: "纹理:", FunKey: "texture", changFun: function (value) { _this.textureChangeInfo(value); }, target: this, Suffix: "material", Category: "材质" },
            ];
            return ary;
        };
        RoleMeshView.prototype.textureChangeInfo = function (value) {
            this.prefabStaticMesh.paramInfo = value;
            this.saveToSever();
            this.chuangeData();
        };
        RoleMeshView.prototype.chuangeData = function () {
            this.prefabStaticMesh.dispatchEvent(new Pan3d.BaseEvent(Pan3d.BaseEvent.COMPLETE));
        };
        RoleMeshView.prototype.getParamItem = function (value) {
            for (var i = 0; this.prefabStaticMesh.paramInfo && i < this.prefabStaticMesh.paramInfo.length; i++) {
                if (this.prefabStaticMesh.paramInfo[i].paramName == value) {
                    return this.prefabStaticMesh.paramInfo[i].data;
                }
            }
            return null;
        };
        Object.defineProperty(RoleMeshView.prototype, "prebaburl", {
            get: function () {
                return "";
            },
            set: function (value) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoleMeshView.prototype, "texture", {
            get: function () {
                return null;
            },
            set: function (value) {
                this.prefabStaticMesh.material = value;
                this.refreshViewValue();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoleMeshView.prototype, "objsurl", {
            get: function () {
                return "0111";
            },
            set: function (value) {
                this.prefabStaticMesh.objsurl = value;
                this.saveToSever();
                this.chuangeData();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoleMeshView.prototype, "data", {
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
        RoleMeshView.prototype.saveToSever = function () {
            var _this = this;
            this.lastTm = Pan3d.TimeUtil.getTimer();
            // this.isSaveNow = true
            if (!this.isSaveNow) {
                this.isSaveNow = true;
                this.saveTm = this.lastTm;
                var $byte = new Pan3d.Pan3dByteArray();
                var $fileUrl = Pan3d.Scene_data.fileRoot + this.prefabStaticMesh.url;
                console.log(this.prefabStaticMesh.material);
                this.prefabStaticMesh.textureurl = this.prefabStaticMesh.material.url;
                $byte.writeUTF(JSON.stringify(this.prefabStaticMesh.getObject()));
                console.log($fileUrl);
                var $file = new File([$byte.buffer], "cc.prefab");
                var pathurl = $fileUrl.replace(Pan3d.Scene_data.ossRoot, "");
                pack.FileOssModel.upOssFile($file, pathurl, function () {
                    if (_this.lastTm != _this.saveTm) {
                        console.log("不是最后一次，所以需要再存一次");
                        Pan3d.TimeUtil.addTimeOut(1000, function () {
                            _this.isSaveNow = false;
                            _this.saveToSever();
                        });
                    }
                    else {
                        _this.isSaveNow = false;
                        console.log("更新Prafab完成", pathurl + $file.name);
                    }
                });
            }
            else {
                console.log("正在处理保存");
            }
        };
        return RoleMeshView;
    }(MetaDataView));
    filelist.RoleMeshView = RoleMeshView;
})(filelist || (filelist = {}));
//# sourceMappingURL=RoleMeshView.js.map