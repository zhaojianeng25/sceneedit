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
            this.updateMatrix();
            for (var i = 0; i < this.spriteItem.length; i++) {
                var a = this.baseMatrix3D.clone();
                var b = this.modeMatrx3D.clone();
                a.invert();
                var c = b.clone();
                c.prepend(a);
                c.prepend(this.dataItem[i].baseMatrix3D);
                var M = c.clone();
                var scale = M.getScaling();
                this.spriteItem[i].scaleX = scale.x;
                this.spriteItem[i].scaleY = scale.y;
                this.spriteItem[i].scaleZ = scale.z;
                var outVec3d = M.toEulerAngles(); //欧拉角
                outVec3d = M.getRotationing(); //新矩阵方法
                outVec3d.scaleBy(180 / Math.PI);
                this.spriteItem[i].rotationX = outVec3d.x;
                this.spriteItem[i].rotationY = outVec3d.y;
                this.spriteItem[i].rotationZ = outVec3d.z;
                this.spriteItem[i].x = M.position.x;
                this.spriteItem[i].y = M.position.y;
                this.spriteItem[i].z = M.position.z;
                this.spriteItem[i].posMatrix = c;
                this.dataUpDate();
            }
        };
        TooXyzPosData.getBase = function ($arr, isCenten) {
            if (isCenten === void 0) { isCenten = false; }
            var rootData = new TooXyzPosData();
            rootData.scaleX = 1;
            rootData.scaleY = 1;
            rootData.scaleZ = 1;
            rootData.dataItem = [];
            rootData.spriteItem = [];
            //第一个对象
            rootData.x = $arr[0].x;
            rootData.y = $arr[0].y;
            rootData.z = $arr[0].z;
            rootData.scaleX = $arr[0].scaleX;
            rootData.scaleY = $arr[0].scaleY;
            rootData.scaleZ = $arr[0].scaleZ;
            rootData.rotationX = $arr[0].rotationX;
            rootData.rotationY = $arr[0].rotationY;
            rootData.rotationZ = $arr[0].rotationZ;
            //rootData.x = 10
            //rootData.y =10
            //rootData.z =10
            //rootData.scaleX = $arr[0].scaleX
            //rootData.scaleY = $arr[0].scaleY
            //rootData.scaleZ = $arr[0].scaleZ
            //rootData.rotationX =40
            //rootData.rotationY = 40
            //rootData.rotationZ = 40
            rootData.updateMatrix();
            rootData.baseMatrix3D = rootData.modeMatrx3D.clone();
            var inM = rootData.modeMatrx3D.clone();
            inM.invert();
            for (var j = 0; j < $arr.length; j++) {
                var tempData = new TooXyzPosData;
                //  tempData.modeMatrx3D = $arr[j].posMatrix.clone(); //存放相对
                // tempData.modeMatrx3D.prepend(inM);
                tempData.baseMatrix3D = $arr[j].posMatrix.clone();
                tempData.scaleX = $arr[j].scaleX;
                tempData.scaleY = $arr[j].scaleY;
                tempData.scaleZ = $arr[j].scaleZ;
                tempData.x = $arr[j].x;
                tempData.y = $arr[j].y;
                tempData.z = $arr[j].z;
                tempData.rotationX = $arr[j].rotationX;
                tempData.rotationY = $arr[j].rotationY;
                tempData.rotationZ = $arr[j].rotationZ;
                rootData.dataItem.push(tempData);
                rootData.spriteItem.push($arr[j]);
            }
            return rootData;
        };
        return TooXyzPosData;
    }());
    xyz.TooXyzPosData = TooXyzPosData;
})(xyz || (xyz = {}));
//# sourceMappingURL=TooXyzMoveData.js.map