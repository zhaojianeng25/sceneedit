module xyz {
    import Object3D = Pan3d.Object3D
    import Matrix3D = Pan3d.Matrix3D
    import Display3D = Pan3d.Display3D


    export class TooXyzPosData  {
        public id: number;
        public type: number;
        public oldx: number;
        public oldy: number;
        public oldz: number;
        public oldangle_x: number;
        public oldangle_y: number;
        public oldangle_z: number;
        public oldscale_x: number = 1;
        public oldscale_y: number = 1;
        public oldscale_z: number = 1;

        public x: number;
        public y: number;
        public z: number;

        public scaleX: number;
        public scaleY: number;
        public scaleZ: number;

        public rotationX: number;
        public rotationY: number;
        public rotationZ: number;


        public changeModelMatrix3d(): void {

            this.updateMatrix()
        }
        public updateMatrix(): void {
            this.modeMatrx3D = new Matrix3D;
            this.modeMatrx3D.appendScale(this.scaleX, this.scaleY, this.scaleZ);
            this.modeMatrx3D.appendRotation(this.rotationX, Vector3D.X_AXIS);
            this.modeMatrx3D.appendRotation(this.rotationY, Vector3D.Y_AXIS);
            this.modeMatrx3D.appendRotation(this.rotationZ, Vector3D.Z_AXIS);
            this.modeMatrx3D.appendTranslation(this.x, this.y, this.z)
        }

        public modeMatrx3D: Matrix3D
        public dataItem: Array<TooXyzPosData>//复制出来胡数据
        public modelItem: Array<Display3D>; //存放基础模型
 
        public dataChangeFun: Function
        public dataUpDate: Function

   

        public static getTemapXyzPosData(_id: number, _x: number, _y: number, _z: number): TooXyzPosData {
            var tempXyz: TooXyzPosData = new TooXyzPosData()
            tempXyz.id = _id;
            tempXyz.x = _x;
            tempXyz.y = _y;
            tempXyz.z = _z;
            tempXyz.type = 1
            return tempXyz;
        }
  
        public upRootMatrix3DToItem(): void {
      
            var inM: Matrix3D = this.modeMatrx3D.clone();
            inM.invert();
            for (var i: number = 0; i < this.modelItem.length; i++) {
                var M: Matrix3D = this.modeMatrx3D.clone();
                M.prepend(this.dataItem[i].modeMatrx3D);

                this.modelItem[i].x = M.position.x
                this.modelItem[i].y = M.position.y
                this.modelItem[i].z = M.position.z

                var outVec3d: Vector3D = M.toEulerAngles();
                outVec3d.scaleBy(180 / Math.PI)
                this.modelItem[i].rotationX = outVec3d.x
                this.modelItem[i].rotationY = outVec3d.y
                this.modelItem[i].rotationZ = outVec3d.z
 
                //this.modelItem[i].scaleX = this.scaleX 
                //this.modelItem[i].scaleY = this.scaleY 
                //this.modelItem[i].scaleZ = this.scaleZ

                this.modelItem[i].posMatrix.m = M.m;
   
                this.dataUpDate();
            }

           
        }


        public static getBase($arr: Array<Display3D>, isCenten: boolean = false): TooXyzPosData {
            var baseXyz: TooXyzPosData = new TooXyzPosData()
            baseXyz.scaleX = 1;
            baseXyz.scaleY = 1;
            baseXyz.scaleZ = 1;
            baseXyz.dataItem = []
            baseXyz.modelItem = []

            if (isCenten) { //所有对象中间
                for (var i: number = 0; i < $arr.length; i++) {
                    baseXyz.x += $arr[i].x
                    baseXyz.y += $arr[i].y
                    baseXyz.z += $arr[i].z
                    baseXyz.rotationX += $arr[i].rotationX
                    baseXyz.rotationY += $arr[i].rotationY
                    baseXyz.rotationZ += $arr[i].rotationZ

                }

                baseXyz.x /= $arr.length
                baseXyz.y /= $arr.length
                baseXyz.z /= $arr.length
                baseXyz.rotationX /= $arr.length
                baseXyz.rotationY /= $arr.length
                baseXyz.rotationZ /= $arr.length
            } else {
                //第一个对象
                baseXyz.x = $arr[0].x
                baseXyz.y = $arr[0].y
                baseXyz.z = $arr[0].z
                baseXyz.scaleX = $arr[0].scaleX
                baseXyz.scaleY = $arr[0].scaleX
                baseXyz.scaleZ = $arr[0].scaleZ
                baseXyz.rotationX = $arr[0].rotationX
                baseXyz.rotationY = $arr[0].rotationY
                baseXyz.rotationZ = $arr[0].rotationZ
            }
          

            baseXyz.updateMatrix();

            var inM: Matrix3D = baseXyz.modeMatrx3D.clone();
            inM.invert()

            for (var j: number = 0; j < $arr.length; j++) {
                var tempXyz: TooXyzPosData = new TooXyzPosData;
                tempXyz.modeMatrx3D = $arr[j].posMatrix.clone(); //存放相对
                tempXyz.modeMatrx3D.prepend(inM);
                tempXyz.scaleX = $arr[j].scaleX;
                tempXyz.scaleY = $arr[j].scaleY;
                tempXyz.scaleZ = $arr[j].scaleZ;

                baseXyz.dataItem.push(tempXyz)
                baseXyz.modelItem.push($arr[j])
            }




            return baseXyz
        }
    }
    
}