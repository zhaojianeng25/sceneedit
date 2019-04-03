module maineditor {
 

    export class SceneProjectVo {

        public gildline: boolean
        public material: materialui.MaterialTree
        public textureurl: string ;
        public constructor(value: any) {
            this.meshObj(value)
        }
        public meshObj(value: any): void {
            for (var key in value) {
                 this[key] = value[key]
            }
            if (this.textureurl) {
                pack.PackMaterialManager.getInstance().getMaterialByUrl(this.textureurl, ($materialTree: materialui.MaterialTree) => {
                    this.material = $materialTree;
                })
            }
        }
        public getSaveObj(): any {
            var obj: any = {}
            if (this.material) {
                this.textureurl = this.material.url;
            }
            obj.textureurl = this.textureurl;
            obj.gildline = this.gildline;
            return obj
        }

    }

}