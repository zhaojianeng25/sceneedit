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
        TooXyzPosData.prototype.upChangeToAll = function () {
            for (var i = 0; i < this.modelItem.length; i++) {
                var M = this.modeMatrx3D.clone();
                M.prepend(this.dataItem[i].modeMatrx3D);
                this.modelItem[i].x = M.position.x;
                this.modelItem[i].y = M.position.y;
                this.modelItem[i].z = M.position.z;
                var ro = M.toEulerAngles();
                this.modelItem[i].rotationX = ro.x * 180 / Math.PI;
                this.modelItem[i].rotationY = ro.y * 180 / Math.PI;
                this.modelItem[i].rotationZ = ro.z * 180 / Math.PI;
            }
        };
        TooXyzPosData.getBase = function ($arr, isCenten) {
            if (isCenten === void 0) { isCenten = false; }
            var baseXyz = new TooXyzPosData();
            baseXyz.dataItem = [];
            baseXyz.modelItem = [];
            //baseXyz.x = 0
            //baseXyz.y = 0
            //baseXyz.z = 0
            //baseXyz.rotationX =0
            //baseXyz.rotationY =0
            //baseXyz.rotationZ = 0
            if (isCenten) { //所有对象中间
                for (var i = 0; i < $arr.length; i++) {
                    baseXyz.x += $arr[i].x;
                    baseXyz.y += $arr[i].y;
                    baseXyz.z += $arr[i].z;
                    baseXyz.rotationX += $arr[i].rotationX;
                    baseXyz.rotationY += $arr[i].rotationY;
                    baseXyz.rotationZ += $arr[i].rotationZ;
                }
                baseXyz.x /= $arr.length;
                baseXyz.y /= $arr.length;
                baseXyz.z /= $arr.length;
                baseXyz.rotationX /= $arr.length;
                baseXyz.rotationY /= $arr.length;
                baseXyz.rotationZ /= $arr.length;
            }
            else {
                //第一个对象
                baseXyz.x = $arr[0].x;
                baseXyz.y = $arr[0].y;
                baseXyz.z = $arr[0].z;
                baseXyz.rotationX = $arr[0].rotationX;
                baseXyz.rotationY = $arr[0].rotationY;
                baseXyz.rotationZ = $arr[0].rotationZ;
            }
            baseXyz.updateMatrix();
            for (var j = 0; j < $arr.length; j++) {
                // var m: Matrix3D = $arr[j].posMatrix.clone();
                var tempXyz = new TooXyzPosData;
                tempXyz.modeMatrx3D = $arr[j].posMatrix.clone(); //存放相对
                var inM = baseXyz.posMatrix.clone();
                inM.invert();
                tempXyz.modeMatrx3D.prepend(inM);
                baseXyz.dataItem.push(tempXyz);
                baseXyz.modelItem.push($arr[j]);
            }
            return baseXyz;
        };
        return TooXyzPosData;
    }(Object3D));
    xyz.TooXyzPosData = TooXyzPosData;
})(xyz || (xyz = {}));
//# sourceMappingURL=TooXyzMoveData.js.map