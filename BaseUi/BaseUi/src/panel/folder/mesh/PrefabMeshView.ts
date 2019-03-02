module filelist {
    import Scene_data = Pan3d.Scene_data;
    import Vector3D = Pan3d.Vector3D;
    import PrefabStaticMesh = pack.PrefabStaticMesh
    import MetaDataView = prop.MetaDataView;
    import ReflectionData = prop.ReflectionData;


    export class PrefabMeshView extends MetaDataView {
        private prefabStaticMesh: PrefabStaticMesh
        public getView(): Array<any> {
            var ary: Array<any> =
                [
                    { Type: ReflectionData.Texturue2DUI, Label: "纹理:", FunKey: "textureurl", target: this, Suffix:"material", Category: "属性" },
                    { Type: ReflectionData.Texturue2DUI, Label: "动态:", FunKey: "otherurl", target: this, Category: "属性" },
                    { Type: ReflectionData.Vec3Color, Label: "名字:", FunKey: "sunDirect", target: this, Step: 0.1 },
                ];
            return ary;
        }
        public set textureurl(value: string) {
            this.prefabStaticMesh.textureurl = value
            this.refreshViewValue()
        }
        public get textureurl(): string {
            return this.prefabStaticMesh.textureurl
        }
        public set otherurl(value: string) {
            this.prefabStaticMesh.pic2 = value
        }
        public get otherurl(): string {
            return this.prefabStaticMesh.pic2 
        }

        public set data(value: any) {
            this._data = value;
            this.prefabStaticMesh = this._data
            console.log(this.prefabStaticMesh)
            this.refreshViewValue()
        }
        public get data(): any {
            return this._data
        }
        public get sunDirect(): Vector3D {
            return new Vector3D( );
        }
        public set sunDirect(value: Vector3D) {
 
        }

        public get sunColor(): Vector3D {
            return new Vector3D( );
        }
        public set sunColor(value: Vector3D) {
 
        }

        public get ambientColor(): Vector3D {
            return new Vector3D( );
        }
        public set ambientColor(value: Vector3D) {
     
        }


    }
}