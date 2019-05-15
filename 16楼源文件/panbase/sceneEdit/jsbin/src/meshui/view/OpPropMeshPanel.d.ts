declare module prop {
    import Vector3D = Pan3d.me.Vector3D;
    class OpPropMeshPanel extends MetaDataView {
        private resultNodeUI;
        getView(): Array<any>;
        data: any;
        directLight: number;
        sunDirect: Vector3D;
        sunColor: Vector3D;
        ambientColor: Vector3D;
        private changeData;
    }
}
