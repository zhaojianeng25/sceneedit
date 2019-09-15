declare module mars3D {
    class FileVo {
        name: string;
        type: string;
        data: Uint8Array;
    }
    class MarmosetModel {
        private static _instance;
        static getInstance(): MarmosetModel;
        static meshItem: Array<Mars3Dmesh>;
        private static preaMeshFile;
        viewFileName: string;
        static tSkySpecularTexture: WebGLTexture;
        private static makeSkyData;
        private overrideFun;
        static changerVshader: string;
        static changerFshader: string;
        static changerOutshader: string;
        upFileToSvever(): void;
        private saveObjData;
        private savePrefab;
        private needFoald;
        upObjDataToSever(): void;
        private makeTemapModeInfo;
        private saveMarmosetMap;
        static imgBolb: any;
        dataURLtoBlob(value: Blob, name: string): void;
        private dataURLtoFile;
        textureItem: Array<WebGLTexture>;
        constructor();
        initData(): void;
    }
}
