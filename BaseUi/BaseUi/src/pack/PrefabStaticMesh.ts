module pack {
 
    export class PrefabStaticMesh extends Prefab   {
        public paramInfo: Array<any>;
        public needSave: boolean
        public sunColor: Vector3D;
        public constructor() {
            super();
            this.sunColor = new Vector3D(2,3,4,1)
        }
    
    }
}