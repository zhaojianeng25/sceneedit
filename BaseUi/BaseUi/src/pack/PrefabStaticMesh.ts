module pack {
 
    export class PrefabStaticMesh extends Prefab   {
        private _materialInfoArr: Array<any>;
        public get materialInfoArr(): Array<any> {
            return this._materialInfoArr;
        }
        public set materialInfoArr(value: Array<any>) {
           this._materialInfoArr = value;
        }
    }
}