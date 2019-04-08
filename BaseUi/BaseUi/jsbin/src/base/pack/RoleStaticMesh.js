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
var pack;
(function (pack) {
    var RoleStaticMesh = /** @class */ (function (_super) {
        __extends(RoleStaticMesh, _super);
        function RoleStaticMesh() {
            return _super.call(this) || this;
        }
        RoleStaticMesh.prototype.getObject = function () {
            var obj = {};
            obj.material = this.material;
            obj.name = this.getName();
            obj.paramInfo = this.paramInfo;
            obj.textureurl = this.textureurl;
            return obj;
        };
        return RoleStaticMesh;
    }(pack.Prefab));
    pack.RoleStaticMesh = RoleStaticMesh;
})(pack || (pack = {}));
//# sourceMappingURL=RoleStaticMesh.js.map