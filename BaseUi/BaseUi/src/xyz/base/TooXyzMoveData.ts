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

        public static getBase($arr: Array<Display3D>): TooXyzPosData {
            var tempXyz: TooXyzPosData = new TooXyzPosData()
            tempXyz.dataItem = []
            tempXyz.modelItem = []
            for (var i: number = 0; i < $arr.length; i++) {
                var k: TooXyzPosData = new TooXyzPosData;
                k.x = $arr[i].x
                k.y = $arr[i].y
                k.z = $arr[i].z
                k.scaleX = $arr[i].scaleX
                k.scaleY = $arr[i].scaleY
                k.scaleZ = $arr[i].scaleZ
                k.rotationX = $arr[i].rotationX
                k.rotationY = $arr[i].rotationY
                k.rotationZ = $arr[i].rotationZ
                tempXyz.dataItem.push(k)
                tempXyz.modelItem.push($arr[i])
            }
            tempXyz.x = $arr[0].x
            tempXyz.y = $arr[0].y
            tempXyz.z = $arr[0].z

            tempXyz.rotationX = $arr[0].rotationX
            tempXyz.rotationY = $arr[0].rotationY
            tempXyz.rotationZ = $arr[0].rotationZ


            return tempXyz
        }
    }
    
}