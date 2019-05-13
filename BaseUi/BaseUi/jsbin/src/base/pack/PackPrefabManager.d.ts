declare module pack {
    import MaterialBaseParam = Pan3d.me.MaterialBaseParam;
    class PackPrefabManager {
        private static _instance;
        static getInstance(): PackPrefabManager;
        constructor();
        private dic;
        private loadDic;
        private playBfun;
        makeMaterialBaseParam(materialParam: MaterialBaseParam, paramInfo: Array<any>): void;
        private makeParamValue;
        private mekeParamTexture;
        getPrefabByUrl($url: string, bfun: Function): void;
    }
}
