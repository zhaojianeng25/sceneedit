module maineditor {
 

    export class SceneProjectVo {

        public gildline: boolean
        public material: materialui.MaterialTree
        public textureurl: string = "assets/base/base.material";
        public constructor(value: any) {
            this.meshObj(value)
        }
        public meshObj(value: any): void {
            for (var key in value) {
                 this[key] = value[key]
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