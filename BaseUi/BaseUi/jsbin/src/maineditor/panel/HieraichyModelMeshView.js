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
var maineditor;
(function (maineditor) {
    var Vector3D = Pan3d.Vector3D;
    var MetaDataView = prop.MetaDataView;
    var ReflectionData = prop.ReflectionData;
    var HieraichyModelMeshView = /** @class */ (function (_super) {
        __extends(HieraichyModelMeshView, _super);
        function HieraichyModelMeshView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HieraichyModelMeshView.prototype.getView = function () {
            var ary = [
                { Type: ReflectionData.Vec3Color, Label: "位置:", FunKey: "pos", target: this, Step: 0.1 },
            ];
            return ary;
        };
        Object.defineProperty(HieraichyModelMeshView.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
                this.dis = this.data;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HieraichyModelMeshView.prototype, "pos", {
            get: function () {
                return new Vector3D(this.dis.x, this.dis.y, this.dis.z);
            },
            set: function (value) {
                this.dis.x = value.x;
                this.dis.y = value.y;
                this.dis.z = value.z;
                console.log(this.dis.x);
            },
            enumerable: true,
            configurable: true
        });
        return HieraichyModelMeshView;
    }(MetaDataView));
    maineditor.HieraichyModelMeshView = HieraichyModelMeshView;
})(maineditor || (maineditor = {}));
//# sourceMappingURL=HieraichyModelMeshView.js.map