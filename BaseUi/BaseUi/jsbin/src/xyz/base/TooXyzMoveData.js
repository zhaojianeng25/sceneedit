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
var xyz;
(function (xyz) {
    var Object3D = Pan3d.Object3D;
    var TooXyzPosData = /** @class */ (function (_super) {
        __extends(TooXyzPosData, _super);
        function TooXyzPosData() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.oldscale_x = 1;
            _this.oldscale_y = 1;
            _this.oldscale_z = 1;
            return _this;
        }
        TooXyzPosData.getTemapXyzPosData = function (_id, _x, _y, _z) {
            var tempXyz = new TooXyzPosData();
            tempXyz.id = _id;
            tempXyz.x = _x;
            tempXyz.y = _y;
            tempXyz.z = _z;
            tempXyz.type = 1;
            return tempXyz;
        };
        TooXyzPosData.getBase = function ($arr) {
            var tempXyz = new TooXyzPosData();
            tempXyz.dataItem = [];
            tempXyz.modelItem = [];
            for (var i = 0; i < $arr.length; i++) {
                var k = new TooXyzPosData;
                k.x = $arr[i].x;
                k.y = $arr[i].y;
                k.z = $arr[i].z;
                k.scaleX = $arr[i].scaleX;
                k.scaleY = $arr[i].scaleY;
                k.scaleZ = $arr[i].scaleZ;
                k.rotationX = $arr[i].rotationX;
                k.rotationY = $arr[i].rotationY;
                k.rotationZ = $arr[i].rotationZ;
                tempXyz.dataItem.push(k);
                tempXyz.modelItem.push($arr[i]);
            }
            tempXyz.x = $arr[0].x;
            tempXyz.y = $arr[0].y;
            tempXyz.z = $arr[0].z;
            tempXyz.rotationX = $arr[0].rotationX;
            tempXyz.rotationY = $arr[0].rotationY;
            tempXyz.rotationZ = $arr[0].rotationZ;
            return tempXyz;
        };
        return TooXyzPosData;
    }(Object3D));
    xyz.TooXyzPosData = TooXyzPosData;
})(xyz || (xyz = {}));
//# sourceMappingURL=TooXyzMoveData.js.map