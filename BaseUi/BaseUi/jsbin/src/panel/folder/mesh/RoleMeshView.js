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
                { Type: ReflectionData.TEXT, Label: "名字:", FunKey: "roleurl", target: this, Category: "action" },
                { Type: ReflectionData.ComboBox, Label: "动作:", FunKey: "action", target: this, Data: [{ name: "state", type: 0 }, { name: "walk", type: 1 }], Category: "action" },
                { Type: ReflectionData.RoleMesh2DUI, Label: "mesh:", FunKey: "skinMesh", changFun: function (value) { _this.textureChangeInfo(value); }, target: this, Suffix: "md5mesh", Category: "mesh" },
            ];
            return ary;
        };
        Object.defineProperty(RoleMeshView.prototype, "skinMesh", {
            get: function () {
                return this._roleStaticMesh.skinMesh;
            },
            set: function (value) {
                this.refreshViewValue();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoleMeshView.prototype, "action", {
            get: function () {
                return 1;
            },
            set: function (value) {
                this.refreshViewValue();
            },
            enumerable: true,
            configurable: true
        });
        RoleMeshView.prototype.textureChangeInfo = function (value) {
            //this._roleStaticMesh.paramInfo = value;
            this.saveToSever();
            this.chuangeData();
        };
        RoleMeshView.prototype.chuangeData = function () {
            this._roleStaticMesh.dispatchEvent(new Pan3d.BaseEvent(Pan3d.BaseEvent.COMPLETE));
        };
        Object.defineProperty(RoleMeshView.prototype, "roleurl", {
            get: function () {
                return this._roleStaticMesh.url;
            },
            set: function (value) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoleMeshView.prototype, "texture", {
            get: function () {
                return this._roleStaticMesh.material;
            },
            set: function (value) {
                this._roleStaticMesh.material = value;
                this.refreshViewValue();
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
                this._roleStaticMesh = this._data;
                this.refreshViewValue();
            },
            enumerable: true,
            configurable: true
        });
        RoleMeshView.prototype.getChangeRoleStr = function () {
            if (this._roleStaticMesh.skinMesh) {
                var temp = {};
                temp.meshAry = this._roleStaticMesh.skinMesh.meshAry;
                temp.animDic = this._roleStaticMesh.animDic;
                temp.textureurl = "base.material";
                var $str = JSON.stringify(temp);
                return $str;
            }
            else {
                return null;
            }
        };
        RoleMeshView.prototype.saveToSever = function () {
            var $roleStr = this.getChangeRoleStr();
            if ($roleStr) {
                var $file = new File([$roleStr], "ossfile.txt");
                var pathUrl = Pan3d.Scene_data.fileRoot + this._roleStaticMesh.url;
                var pathurl = pathUrl.replace(Pan3d.Scene_data.ossRoot, "");
                pack.FileOssModel.upOssFile($file, pathurl, function () {
                    console.log("上传成功", pathurl);
                });
            }
            else {
                console.log("没有可上传mesh数据");
            }
        };
        return RoleMeshView;
    }(MetaDataView));
    filelist.RoleMeshView = RoleMeshView;
})(filelist || (filelist = {}));
//# sourceMappingURL=RoleMeshView.js.map