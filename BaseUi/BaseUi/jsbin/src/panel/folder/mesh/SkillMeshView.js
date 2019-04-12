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
                { Type: ReflectionData.Texturue2DUI, Label: "纹理:", FunKey: "roleurl", target: this, Category: "属性" },
                { Type: ReflectionData.Texturue2DUI, Label: "纹理:", FunKey: "skillurl", target: this, Category: "属性" },
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
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SkillMeshView.prototype, "skillurl", {
            get: function () {
                return this._skillStaticMesh.skillUrl;
            },
            set: function (value) {
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
        return SkillMeshView;
    }(MetaDataView));
    filelist.SkillMeshView = SkillMeshView;
})(filelist || (filelist = {}));
//# sourceMappingURL=SkillMeshView.js.map