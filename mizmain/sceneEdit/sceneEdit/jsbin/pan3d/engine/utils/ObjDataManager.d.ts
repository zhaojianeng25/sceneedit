declare module Pan3d {
    class ObjDataManager extends ResGC {
        private _loadList;
        constructor();
        private static _instance;
        static getInstance(): ObjDataManager;
        getObjData($url: string, $fun: Function): void;
        registerUrl($url: string): void;
        releaseUrl($url: string): void;
        gc(): void;
        readFloatNrm(byte: Pan3dByteArray, vertices: Array<number>): void;
        private readcollisionItem;
        private getFloadNum;
        loadObjCom($byte: ArrayBuffer, $url: string): ObjData;
        readObj2OneBuffer(byte: Pan3dByteArray, $objData: ObjData): void;
        creatTBNBuffer($objData: ObjData): void;
    }
}
