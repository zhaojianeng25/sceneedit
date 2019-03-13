module maineditor {
    import Scene_data = Pan3d.Scene_data;
    import Vector3D = Pan3d.Vector3D;
    import Material = Pan3d.Material
    import PrefabStaticMesh = pack.PrefabStaticMesh
    import MetaDataView = prop.MetaDataView;
    import ReflectionData = prop.ReflectionData;


    export class HieraichyModelMeshView extends MetaDataView {

        private dis: ModelSprite
        public getView(): Array<any> {
            var ary: Array<any> =
                [
                    { Type: ReflectionData.Vec3Color, Label: "位置:", FunKey: "pos", target: this, Step: 0.1 },
                ];
            return ary;
        }
        public get data(): any {
            return this._data
        }
        public set data(value: any) {
            this._data = value
            this.dis = this.data
        }
        public get pos(): Vector3D {
            return new Vector3D(this.dis.x, this.dis.y, this.dis.z)
        }
        public set pos(value: Vector3D) {
            this.dis.x = value.x
            this.dis.y = value.y
            this.dis.z = value.z

            console.log(this.dis.x)
 

        }


    }
}