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
    var SkillMeshView = /** @class */ (function (_super) {
        __extends(SkillMeshView, _super);
        function SkillMeshView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SkillMeshView.prototype.getView = function () {
            var ary = [
                { Type: ReflectionData.TEXT, Label: "名字:", FunKey: "filename", target: this, Category: "属性" },
                { Type: ReflectionData.Texturue2DUI, Label: "角色:", FunKey: "roleurl", Suffix: "zzw", target: this, Category: "属性" },
                { Type: ReflectionData.Texturue2DUI, Label: "技能:", FunKey: "skillurl", Suffix: "txt", target: this, Category: "属性" },
            ];
            return ary;
        };
        Object.defineProperty(SkillMeshView.prototype, "filename", {
            get: function () {
                return this._skillStaticMesh.url;
            },
            set: function (value) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SkillMeshView.prototype, "roleurl", {
            get: function () {
                return this._skillStaticMesh.roleUrl;
            },
            set: function (value) {
                this._skillStaticMesh.roleUrl = value;
                this.saveToSever();
                this.refreshViewValue();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SkillMeshView.prototype, "skillurl", {
            get: function () {
                return this._skillStaticMesh.skillUrl;
            },
            set: function (value) {
                this._skillStaticMesh.skillUrl = value;
                this.saveToSever();
                this.refreshViewValue();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SkillMeshView.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
                this._skillStaticMesh = value;
                this.refreshViewValue();
            },
            enumerable: true,
            configurable: true
        });
        SkillMeshView.prototype.saveToSever = function () {
            var _this = this;
            this.lastTm = Pan3d.TimeUtil.getTimer();
            // this.isSaveNow = true
            if (!this.isSaveNow) {
                this.isSaveNow = true;
                this.saveTm = this.lastTm;
                var $temp = this._skillStaticMesh.getObject();
                var $roleStr = JSON.stringify($temp);
                var $file = new File([$roleStr], "ossfile.txt");
                var pathUrl = Pan3d.Scene_data.fileRoot + this._skillStaticMesh.url;
                var pathurl = pathUrl.replace(Pan3d.Scene_data.ossRoot, "");
                console.log("提交上传ing...", pathurl);
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
                        console.log("更新角色完成", pathurl + $file.name);
                    }
                });
            }
            else {
                console.log("正在处理保存");
            }
        };
        return SkillMeshView;
    }(MetaDataView));
    filelist.SkillMeshView = SkillMeshView;
})(filelist || (filelist = {}));
//# sourceMappingURL=SkillMeshView.js.map