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
                { Type: ReflectionData.TEXT, Label: "名字:", FunKey: "roleurl", target: this, Category: "模型" },
                { Type: ReflectionData.MaterialPicUi, Label: "纹理:", FunKey: "texture", changFun: function (value) { _this.textureChangeInfo(value); }, target: this, Suffix: "material", Category: "材质" },
            ];
            return ary;
        };
        RoleMeshView.prototype.textureChangeInfo = function (value) {
            this._roleStaticMesh.paramInfo = value;
            this.saveToSever();
            this.chuangeData();
        };
        RoleMeshView.prototype.chuangeData = function () {
            this._roleStaticMesh.dispatchEvent(new Pan3d.BaseEvent(Pan3d.BaseEvent.COMPLETE));
        };
        RoleMeshView.prototype.getParamItem = function (value) {
            for (var i = 0; this._roleStaticMesh.paramInfo && i < this._roleStaticMesh.paramInfo.length; i++) {
                if (this._roleStaticMesh.paramInfo[i].paramName == value) {
                    return this._roleStaticMesh.paramInfo[i].data;
                }
            }
            return null;
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
        RoleMeshView.prototype.saveToSever = function () {
        };
        return RoleMeshView;
    }(MetaDataView));
    filelist.RoleMeshView = RoleMeshView;
})(filelist || (filelist = {}));
//# sourceMappingURL=RoleMeshView.js.map