declare module filelist {
    import Material = Pan3d.me.Material;
    import MetaDataView = prop.MetaDataView;
    class PrefabMeshView extends MetaDataView {
        private prefabStaticMesh;
        getView(): Array<any>;
        private textureChangeInfo;
        private chuangeData;
        getParamItem(value: string): any;
        prebaburl: string;
        texture: Material;
        objsurl: string;
        data: any;
        private isSaveNow;
        private lastTm;
        private saveTm;
        saveToSever(): void;
    }
}
