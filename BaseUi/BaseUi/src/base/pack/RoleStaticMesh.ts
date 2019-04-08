module pack {

    export class RoleStaticMesh extends Prefab {
 
        public skinMesh: any
        public animDic: any
 
 
        public constructor() {
            super();
 
        }
        public getObject(): any {
            var obj: any = {}
            obj.name = this.getName();
            return obj
        }

    }
}