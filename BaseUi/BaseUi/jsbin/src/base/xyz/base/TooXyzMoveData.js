var xyz;
(function (xyz) {
    var Matrix3D = Pan3d.Matrix3D;
    var TooXyzPosData = /** @class */ (function () {
        function TooXyzPosData() {
            this.oldscale_x = 1;
            this.oldscale_y = 1;
            this.oldscale_z = 1;
        }
        TooXyzPosData.prototype.changeModelMatrix3d = function () {
            this.updateMatrix();
        };
        TooXyzPosData.prototype.updateMatrix = function () {
            this.modeMatrx3D = new Matrix3D;
            this.modeMatrx3D.appendScale(this.scaleX, this.scaleY, this.scaleZ);
            this.modeMatrx3D.appendRotation(this.rotationX, Vector3D.X_AXIS);
            this.modeMatrx3D.appendRotation(this.rotationY, Vector3D.Y_AXIS);
            this.modeMatrx3D.appendRotation(this.rotationZ, Vector3D.Z_AXIS);
            this.modeMatrx3D.appendTranslation(this.x, this.y, this.z);
        };
        TooXyzPosData.getTemapXyzPosData = function (_id, _x, _y, _z) {
            var tempXyz = new TooXyzPosData();
            tempXyz.id = _id;
            tempXyz.x = _x;
            tempXyz.y = _y;
            tempXyz.z = _z;
            tempXyz.type = 1;
            return tempXyz;
        };
        TooXyzPosData.prototype.upRootMatrix3DToItem = function () {
            var inM = this.modeMatrx3D.clone();
            inM.invert();
            for (var i = 0; i < this.modelItem.length; i++) {
                var M = this.modeMatrx3D.clone();
                M.prepend(this.dataItem[i].modeMatrx3D);
                this.modelItem[i].x = M.position.x;
                this.modelItem[i].y = M.position.y;
                this.modelItem[i].z = M.position.z;
                var outVec3d = M.toEulerAngles();
                outVec3d.scaleBy(180 / Math.PI);
                this.modelItem[i].rotationX = outVec3d.x;
                this.modelItem[i].rotationY = outVec3d.y;
                this.modelItem[i].rotationZ = outVec3d.z;
                this.modelItem[i].posMatrix.m = M.m;
                this.dataUpDate();
            }
        };
        TooXyzPosData.getBase = function ($arr, isCenten) {
            if (isCenten === void 0) { isCenten = false; }
            var baseXyz = new TooXyzPosData();
            baseXyz.scaleX = 1;
            baseXyz.scaleY = 1;
            baseXyz.scaleZ = 1;
            baseXyz.dataItem = [];
            baseXyz.modelItem = [];
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
            var inM = baseXyz.modeMatrx3D.clone();
            inM.invert();
            for (var j = 0; j < $arr.length; j++) {
                var tempXyz = new TooXyzPosData;
                tempXyz.modeMatrx3D = $arr[j].posMatrix.clone(); //存放相对
                tempXyz.modeMatrx3D.prepend(inM);
                baseXyz.dataItem.push(tempXyz);
                baseXyz.modelItem.push($arr[j]);
            }
            return baseXyz;
        };
        return TooXyzPosData;
    }());
    xyz.TooXyzPosData = TooXyzPosData;
})(xyz || (xyz = {}));
//# sourceMappingURL=TooXyzMoveData.js.map