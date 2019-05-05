declare module maineditor {
    import EventDispatcher = Pan3d.me.EventDispatcher;
    import MaterialBaseParam = Pan3d.me.MaterialBaseParam;
    class SceneProjectVo extends EventDispatcher {
        paramInfo: Array<any>;
        materialParam: MaterialBaseParam;
        gildline: boolean;
        material: materialui.MaterialTree;
        textureurl: string;
        constructor(value: any);
        meshObj(value: any): void;
        getSaveObj(): any;
    }
}
