module maineditor {
    import EventDispatcher = Pan3d.me.EventDispatcher
    import MaterialBaseParam = Pan3d.me.MaterialBaseParam

    export class SceneProjectVo extends EventDispatcher {
        public paramInfo: Array<any>;
        public materialParam: MaterialBaseParam;
        public gildline: boolean
        public material: materialui.MaterialTree
        public textureurl: string ;
        public constructor(value: any) {
            super();
            this.meshObj(value)
        }
        public meshObj(value: any): void {
            for (var key in value) {
                 this[key] = value[key]
            }
            if (this.textureurl) {
                pack.PackMaterialManager.getInstance().getMaterialByUrl(this.textureurl, ($materialTree: materialui.MaterialTree) => {
                    this.material = $materialTree;

                    this.materialParam = new Pan3d.me.MaterialBaseParam;
                    this.materialParam.material = this.material
                    pack.PackPrefabManager.getInstance().makeMaterialBaseParam(this.materialParam, this.paramInfo);

                   
                })
            }
        }
        public getSaveObj(): any {
            var obj: any = {}
            if (this.material) {
                this.textureurl = this.material.url;
            }
            
            obj.paramInfo = this.paramInfo;
            obj.textureurl = this.textureurl;
            obj.gildline = this.gildline;
            return obj
        }

    }

}