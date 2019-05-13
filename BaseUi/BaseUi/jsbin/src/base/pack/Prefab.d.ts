declare module pack {
    import Material = Pan3d.me.Material;
    import ObjData = Pan3d.me.ObjData;
    import EventDispatcher = Pan3d.me.EventDispatcher;
    class Prefab extends EventDispatcher implements ITile {
        getName(): string;
        url: string;
        objsurl: string;
        objData: ObjData;
        textureurl: string;
        material: Material;
        version: number;
    }
}
