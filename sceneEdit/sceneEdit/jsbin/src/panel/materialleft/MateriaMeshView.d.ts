declare module materialleft {
    import Vector3D = Pan3d.me.Vector3D;
    import MetaDataView = prop.MetaDataView;
    import UiMeshSprite = prop.UiMeshSprite;
    class MateriaMeshView extends MetaDataView {
        constructor(value: UiMeshSprite);
        getView(): Array<any>;
        materialTree: materialui.MaterialTree;
        private _materialTree;
        blendMode: number;
        testzbuff: boolean;
        writeZbuffer: boolean;
        pointlight: boolean;
        data: any;
        sunDirect: Vector3D;
        sunColor: Vector3D;
        ambientColor: Vector3D;
        resize(): void;
    }
}
