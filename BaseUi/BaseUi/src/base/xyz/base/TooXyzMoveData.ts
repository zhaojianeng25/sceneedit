module xyz {
    import Object3D = Pan3d.Object3D
    import Matrix3D = Pan3d.Matrix3D
    import Display3D = Pan3d.Display3D


    export class TooXyzPosData extends Object3D {
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
        public upChangeToAll(): void {
            for (var i: number = 0; i < this.modelItem.length; i++) {
                var M: Matrix3D = this.modeMatrx3D.clone();
                M.prepend(this.dataItem[i].modeMatrx3D);
                this.modelItem[i].x = M.position.x;
                this.modelItem[i].y = M.position.y;
                this.modelItem[i].z = M.position.z;

                var ro: Vector3D = M.toEulerAngles();
                this.modelItem[i].rotationX = ro.x * 180 / Math.PI;
                this.modelItem[i].rotationY = ro.y * 180 / Math.PI;
                this.modelItem[i].rotationZ = ro.z * 180 / Math.PI;
            }
            
        }


        public static getBase($arr: Array<Display3D>, isCenten: boolean = false): TooXyzPosData {
            var baseXyz: TooXyzPosData = new TooXyzPosData()
            baseXyz.dataItem = []
            baseXyz.modelItem = []
            //baseXyz.x = 0
            //baseXyz.y = 0
            //baseXyz.z = 0
            //baseXyz.rotationX =0
            //baseXyz.rotationY =0
            //baseXyz.rotationZ = 0
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
                baseXyz.rotationX = $arr[0].rotationX
                baseXyz.rotationY = $arr[0].rotationY
                baseXyz.rotationZ = $arr[0].rotationZ
            }
          

            baseXyz.updateMatrix();

 

            for (var j: number = 0; j < $arr.length; j++) {
       
               // var m: Matrix3D = $arr[j].posMatrix.clone();
                var tempXyz: TooXyzPosData = new TooXyzPosData;
                tempXyz.modeMatrx3D = $arr[j].posMatrix.clone(); //存放相对
                var inM: Matrix3D = baseXyz.posMatrix.clone();
                inM.invert()
                tempXyz.modeMatrx3D.prepend(inM)
 
           
                

                baseXyz.dataItem.push(tempXyz)
                baseXyz.modelItem.push($arr[j])
            }




            return baseXyz
        }
    }
    
}