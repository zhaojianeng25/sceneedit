module pack {

    export class RoleStaticMesh extends Prefab {
        public paramInfo: Array<any>;
 
        public constructor() {
            super();
 
        }
        public getObject(): any {
            var obj: any = {}
            obj.material = this.material;
            obj.name = this.getName();
            obj.paramInfo = this.paramInfo
            obj.textureurl = this.textureurl;
            return obj
        }

    }
}