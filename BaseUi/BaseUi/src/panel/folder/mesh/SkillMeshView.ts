module filelist {
    import Scene_data = Pan3d.Scene_data;
    import Vector3D = Pan3d.Vector3D;
    import Material = Pan3d.Material

    import RoleStaticMesh = pack.RoleStaticMesh
    import MetaDataView = prop.MetaDataView;
    import ReflectionData = prop.ReflectionData;


    export class SkillMeshView extends MetaDataView {
        private _skillStaticMesh: pack.SkillStatcMesh
        public getView(): Array<any> {
            var ary: Array<any> =
                [
                    { Type: ReflectionData.TEXT, Label: "名字:", FunKey: "filename", target: this, Category: "属性" },

                    { Type: ReflectionData.Texturue2DUI, Label: "纹理:", FunKey: "roleurl", target: this, Category: "属性" },
                    { Type: ReflectionData.Texturue2DUI, Label: "纹理:", FunKey: "skillurl", target: this, Category: "属性" },
  
                ];
            return ary;
        }
        public set filename(value: string) {

        }
        public get filename(): string {
            return this._skillStaticMesh.url

        }
        public set roleurl(value: string) {

        }
        public get roleurl(): string {
            return this._skillStaticMesh.roleUrl

        }
        public set skillurl(value: string) {

        }
        public get skillurl(): string {
            return this._skillStaticMesh.skillUrl

        }
        public set data(value: any) {
            this._data = value;

            this._skillStaticMesh = value
 
            this.refreshViewValue()
        }
        public get data(): any {
            return this._data
        }

 


    }
}