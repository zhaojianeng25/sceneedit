module filelist {
    import Scene_data = Pan3d.Scene_data;
    import Vector3D = Pan3d.Vector3D;
    import Material = Pan3d.Material
 
    import RoleStaticMesh = pack.RoleStaticMesh
    import MetaDataView = prop.MetaDataView;
    import ReflectionData = prop.ReflectionData;


    export class RoleMeshView extends MetaDataView {
        private _roleStaticMesh: RoleStaticMesh
        public getView(): Array<any> {
            var ary: Array<any> =
                [
                    { Type: ReflectionData.TEXT, Label: "名字:", FunKey: "roleurl", target: this, Category: "action" },
          
                    { Type: ReflectionData.ComboBox, Label: "动作:", FunKey: "action", target: this, Data: [{ name: "state", type: 0 }, { name: "walk", type: 1 }], Category: "action" },


                    { Type: ReflectionData.RoleMesh2DUI, Label: "mesh:", FunKey: "skinMesh", changFun: (value: Array<any>) => { this.textureChangeInfo(value) }, target: this, Suffix: "md5mesh", Category: "mesh" },


                    //{ Type: ReflectionData.MaterialPicUi, Label: "纹理:", FunKey: "texture", changFun: (value: Array<any>) => { this.textureChangeInfo(value) }, target: this, Suffix: "material", Category: "mesh" },
                ];
            return ary;
        }

        public set skinMesh(value: Array<any>) {
   
            this.refreshViewValue()
        }
        public get skinMesh(): Array<any> {
            return this._roleStaticMesh.skinMesh
        }


        public get action(): number {
            return 1
        }
        public set action(value: number) {
      
            this.refreshViewValue();

        }
      

        private textureChangeInfo(value: Array<any>): void {
            this._roleStaticMesh.paramInfo = value;
            this.saveToSever()
            this.chuangeData()

        }
        private chuangeData(): void {
            this._roleStaticMesh.dispatchEvent(new Pan3d.BaseEvent(Pan3d.BaseEvent.COMPLETE))
        }
        public getParamItem(value: string): any {
            for (var i: number = 0; this._roleStaticMesh.paramInfo && i < this._roleStaticMesh.paramInfo.length; i++) {
                if (this._roleStaticMesh.paramInfo[i].paramName == value) {
                    return this._roleStaticMesh.paramInfo[i].data
                }
            }
            return null
        }
        public set roleurl(value: string) {

        }
        public get roleurl(): string {
            return this._roleStaticMesh.url
        }

        public set texture(value: Material) {
            this._roleStaticMesh.material = value
            this.refreshViewValue()
        }
        public get texture(): Material {
            return this._roleStaticMesh.material
        }
  

        public set data(value: any) {
            this._data = value;
            this._roleStaticMesh = this._data
            this.refreshViewValue()
        }
        public get data(): any {
            return this._data
        }
 
        public saveToSever(): void {
     
        }


    }
}