module pack {
 
    export class PrefabStaticMesh extends Prefab   {
        private _materialInfoArr: Array<any>;
        public needSave: boolean
        public sunColor: Vector3D;
        public constructor() {
            super();
            this.sunColor = new Vector3D(2,3,4,1)
        }
        public get materialInfoArr(): Array<any> {
            return this._materialInfoArr;
        }
        public set materialInfoArr(value: Array<any>) {
           this._materialInfoArr = value;
        }
    }
}