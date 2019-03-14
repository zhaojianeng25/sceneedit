module maineditor {
    import Scene_data = Pan3d.Scene_data;
    import Vector3D = Pan3d.Vector3D;
    import Material = Pan3d.Material
    import PrefabStaticMesh = pack.PrefabStaticMesh
    import MetaDataView = prop.MetaDataView;
    import ReflectionData = prop.ReflectionData;


    export class PropertyMeshView extends MetaDataView {

        private xyzPosData: xyz. TooXyzPosData
        public getView(): Array<any> {
            var ary: Array<any> =
                [
                    { Type: ReflectionData.Vec3Color, Label: "坐标:", FunKey: "pos", target: this, Step: 1, Category: "属性" },
                    { Type: ReflectionData.Vec3Color, Label: "角度:", FunKey: "rotation", target: this, Step: 1, Category: "属性" },
     
                ];
            return ary;
        }
        public get data(): any {
            return this._data
        }
        public set data(value: any) {
            this._data = value
            this.xyzPosData = this.data
            this.xyzPosData.dataUpDate = () => {
                this.refreshViewValue()
            }
        }
        public get pos(): Vector3D {
            return new Vector3D(this.xyzPosData.x, this.xyzPosData.y, this.xyzPosData.z)
        }
        public set pos(value: Vector3D) {
            this.xyzPosData.x = value.x
            this.xyzPosData.y = value.y
            this.xyzPosData.z = value.z
            this.xyzPosData.upChangeToAll();
        }
        public get rotation(): Vector3D {
            return new Vector3D(this.xyzPosData.rotationX, this.xyzPosData.rotationY, this.xyzPosData.rotationZ)
        }
        public set rotation(value: Vector3D) {
            this.xyzPosData.rotationX = value.x
            this.xyzPosData.rotationY = value.y
            this.xyzPosData.rotationZ = value.z
            this.xyzPosData.upChangeToAll();
        }


    }
}