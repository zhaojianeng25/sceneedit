module maineditor {
    import Scene_data = Pan3d.Scene_data;
    import Vector3D = Pan3d.Vector3D;
    import Material = Pan3d.Material
    import PrefabStaticMesh = pack.PrefabStaticMesh
    import MetaDataView = prop.MetaDataView;
    import ReflectionData = prop.ReflectionData;


    export class ScenePojectMeshView extends MetaDataView {

 
        public getView(): Array<any> {
            var ary: Array<any> =
                [
                    { Type: ReflectionData.TEXT, Label: "场景名字:", FunKey: "mapname", target: this, Category: "属性" },
                    { Type: ReflectionData.Vec3Color, Label: "背景颜色:", FunKey: "bgcolor", target: this, Step: 0.1, Category: "属性" },
                    { Type: ReflectionData.ComboBox, Label: "坐标网格:", FunKey: "gridline", target: this, Data: [{ name: "false", type: 0 }, { name: "true", type: 1 }] },

                    { Type: ReflectionData.Vec3, Label: "坐标:", FunKey: "campos", target: this, Step: 1, Category: "镜头" },
                    { Type: ReflectionData.Vec3, Label: "角度:", FunKey: "camrotation", target: this, Step: 1, Category: "镜头" },

                    { Type: ReflectionData.MaterialPicUi, Label: "纹理:", FunKey: "texture", changFun: (value: Array<any>) => { this.textureChangeInfo(value) }, target: this, Suffix: "material", Category: "后期" },

                ];
            return ary;
        }
        private gridLineSprite: Pan3d.GridLineSprite;
        private isShowGridLine: boolean = false

        public get gridline(): number {
            return this.isShowGridLine ? 1 : 0;
        }
        public set gridline(value: number) {
            this.isShowGridLine = value==1
            if (!this.gridLineSprite) {
                this.gridLineSprite = new Pan3d.GridLineSprite()
            }
            if (this.isShowGridLine) {
                MainEditorProcessor.edItorSceneManager.addDisplay(this.gridLineSprite);
            } else {
                MainEditorProcessor.edItorSceneManager.removeDisplay(this.gridLineSprite);
            }
          
            this.refreshViewValue();
  
        }
        private textureChangeInfo(value: Array<any>): void {
        }
        public getParamItem(value: string): any {
            return null
        }
        public set texture(value: Material) {
            this.data.material = value

            this.gridline = 1;
            this.refreshViewValue()
        }
        public get texture(): Material {
            //console.log("材质", this.data.material)
            return this.data.material
        }
        public get mapname() {
            return BaseUiStart.mapOpenUrl;
        }
    
        public get data(): any {
            return this._data
        }

        public set data(value: any) {
            this._data = value



            this.refreshViewValue()
        }
        public get campos() {
            return new Vector3D()
        }
        public set campos(value: Vector3D) {

        }
        private _bgcolor: Vector3D = new Vector3D(11,11,11)
        public get bgcolor() {
            return this._bgcolor
        }
        public set bgcolor(value: Vector3D) {
            this._bgcolor = value
        }
        public get camrotation() {
            return new Vector3D( )
        }
        public set camrotation(value: Vector3D) {
       
        }
    


    }
}